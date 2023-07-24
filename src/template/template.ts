/**
 *
 * Part of the MLP r/place Project, under the Apache License v2.0 or ISC.
 * SPDX-License-Identifier: Apache-2.0 OR ISC
 * SPDX-FileCopyrightText: Copyright CONTRIBUTORS.md
 *
 **
 *
 * @file Interface for templates.
 *
 **/

import {AsyncWorkQueue, gm_fetch, headerStringToObject, waitMs} from "../utils";

export class TemplatePixels {
  #image: ImageData;
  cacheKey?: string;

  constructor(image: ImageData, cacheKey?: string) {
    this.#image = image;
    this.cacheKey = cacheKey;
  }

  getWidth(): number {
    return this.#image.width;
  }

  getHeight(): number {
    return this.#image.height;
  }

  getImageData(): Uint8ClampedArray {
    return this.#image.data;
  }

  drawTo(canvas: CanvasRenderingContext2D) {
    canvas.putImageData(this.#image, 0, 0);
  }

  getDithered3x(): ImageData {
    const ret = new ImageData(this.#image.width * 3, this.#image.height * 3);
    for (let y = 0; y < this.#image.height; ++y)
      for (let x = 0; x < this.#image.width; ++x) {
        const sourceLoc = (y * this.#image.width + x) * 4;
        const destLoc = ((y * 3 + 1) * ret.width + (x * 3 + 1)) * 4;
        for (let i = 0; i < 4; ++i)
          ret.data[destLoc + i] = this.#image.data[sourceLoc + i];
      }
    return ret;
  }
}

type UpdateResult = 'MaybeChangedCached' | 'MaybeChangedNotCached' | 'NotChanged';

function mergeResponse(current: UpdateResult, resp: GM.Response<any>): UpdateResult {
  return 'MaybeChangedNotCached';
}

export interface Template {
  template: TemplatePixels;
  mask?: TemplatePixels;

  updateIfDifferent(): Promise<UpdateResult>;
}

export class ImageTemplate implements Template {
  template: TemplatePixels;
  templateURL: URL;
  mask?: TemplatePixels;
  maskURL?: URL;
  width: number;
  height: number;

  private constructor(width: number, height: number, template: TemplatePixels, templateURL: URL,
                      mask?: TemplatePixels, maskURL?: URL) {
    this.template = template;
    this.templateURL = templateURL;
    this.mask = mask;
    this.maskURL = maskURL;
    this.width = width;
    this.height = height;
  }

  private async update(template: TemplatePixels, url: URL) {
    let headers = {};
    const resp = await ImageTemplate.fetchURL(url, {
      headers: headers
    });
    if (resp.status != 200)
      throw resp;
    return {
      template: await ImageTemplate.pixelsFromResponse(resp),
      response: resp
    };
  }

  async updateIfDifferent() {
    let changed: UpdateResult = 'NotChanged';
    const tr = await this.update(this.template, this.templateURL);
    this.template = tr.template;
    changed = mergeResponse(changed, tr.response);
    
    if (this.mask) {
      const mr = await this.update(this.mask, this.maskURL!);
      
      this.mask = mr.template;
      changed = mergeResponse(changed, mr.response);
    }
    return changed;
  }

  private static async fetchURL(url: URL, req?) {
    return await gm_fetch({
      ...req,
      method: "GET",
      responseType: "arraybuffer",
      url: `${url}?t=${Date.now()}`
    });
  }

  private static async pixelsFromResponse(resp: GM.Response<any>) {
    const bitmap = await createImageBitmap(new Blob([new Uint8ClampedArray(resp.response)]));
    const canvas = document.createElement('canvas');
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    const context = canvas.getContext('2d')!;
    context.drawImage(bitmap, 0 , 0);
    const imgData = context.getImageData(0, 0, bitmap.width, bitmap.height);
    return new TemplatePixels(imgData, headerStringToObject(resp.responseHeaders).ETag);
  }

  private static async fetchTemplatePixels(URL: URL): Promise<TemplatePixels> {
    const resp = await this.fetchURL(URL);
    if (resp.status != 200)
     throw resp;
    return await this.pixelsFromResponse(resp);
  }

  static async fetchTemplate(templateURL: URL, maskURL?: URL) {
    const template = await this.fetchTemplatePixels(templateURL);
    let mask = maskURL ? await this.fetchTemplatePixels(maskURL) : undefined;
    if (mask && ((mask.getHeight() != template.getHeight()) ||
                 (mask.getWidth() != template.getWidth()))) {
      mask = undefined;
    }
    return new ImageTemplate(template.getWidth(), template.getHeight(), template, templateURL, mask,
                             maskURL);
  }

  palettize(pallete) {
    const data = this.template.getImageData();
    for (let i = 0; i < data.length / 4; i++) {
      const base = i * 4;
      const currentColor = data.slice(base, base + 3);
      if (currentColor[0] + currentColor[1] + currentColor[2] === 0) continue;

      let newColor;
      let bestDiff = Infinity;
      for (const color of pallete) {
        const diff = Math.abs(currentColor[0] - color[0]) + Math.abs(currentColor[1] - color[1]) + Math.abs(currentColor[2] - color[2]);
        if (diff === 0)
          return color;
        if (diff < bestDiff) {
          bestDiff = diff;
          newColor = color;
        }
      }
      if (!newColor) newColor = [0, 0, 0];

      data[base] = newColor[0];
      data[base + 1] = newColor[1];
      data[base + 2] = newColor[2];
    }
  }
}

export async function updateLoop(workQueue: AsyncWorkQueue, getTemplate: () => Template,
                                 applyTemplate: () => void) {
  // Wait before trying to update.
  await waitMs(240 * 1000);
  while (true) {
    try {
      const result = await workQueue.enqueue(async () => {
        const result = await getTemplate().updateIfDifferent();
        if (result.startsWith("MaybeChanged"))
          applyTemplate();
        return result;
      });
      if (result == 'MaybeChangedCached' || result == 'NotChanged')
        await waitMs(30 * 1000);
      else if (result == 'MaybeChangedNotCached')
        await waitMs(300 * 1000);
    } catch(err) {
      console.error("Error updating template", err);
      await waitMs(60 * 1000);
    }
  }
}
