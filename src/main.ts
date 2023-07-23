/**
 *
 * Part of the MLP r/place Project, under the Apache License v2.0 or ISC.
 * SPDX-License-Identifier: Apache-2.0 OR ISC
 * SPDX-FileCopyrightText: Copyright CONTRIBUTORS.md
 *
 **
 *
 * @file All of the minimap. This needs to be split up.
 *
 **/

import {BlobServer} from './utils';
import {Analytics} from './analytics';
import {AnalyticsLogger} from './logger';
import {Minimap} from './minimap/minimap';

const autoPickAfterPlaceTimeout = 3000;

(async function () {
  const analytics = new Analytics(new URL('http://ponyplace-compute.ferrictorus.com/analytics/placepixel'));
  const analyticsLogger = new AnalyticsLogger(analytics);

  const minimap = new Minimap(analyticsLogger);

  const blobServer = new BlobServer("https://raw.githubusercontent.com/uis246/template/master/");
  minimap.templates.add("mlp", blobServer.getTemplate("mlp", {autoPick: true, mask: true}));

  await minimap.initialize();

  // Analytics
  minimap.rPlace!.embed._events._getEventTarget().addEventListener("confirm-pixel", () => {
    const now = Date.now();
    const reddit = now + minimap.rPlace!.embed.nextTileAvailableIn * 1000;
    const safe = reddit + autoPickAfterPlaceTimeout;
    analytics.placedPixel('manual-browser-srpb', minimap.templates.currentTemplate.name, minimap.rPlace!.position.pos, minimap.rPlace!.embed.selectedColor, now, {
      reddit: reddit,
      safe: safe
    });
  });
})();
