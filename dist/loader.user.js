// ==UserScript==
// @name        r/place Sr/PB Minimap
// @description Minimap overlay and automatic selection of pixel + color for r/place (Sr/PB)
// @namespace   https://place.equestria.dev/
// @author      r/place MLP Minimap Authors
// @include     https://hot-potato.reddit.com/embed*
// @include     https://garlic-bread.reddit.com/embed*
// @include     https://place.equestria.dev/embed*
// @downloadURL https://raw.githubusercontent.com/marius851000/2023-minimap/main/dist/loader.user.jss
// @updateURL   https://raw.githubusercontent.com/marius851000/2023-minimap/main/dist/loader.user.js
// @connect     raw.githubusercontent.com
// @connect     media.githubusercontent.com
// @connect     ponyplace.z19.web.core.windows.net
// @connect     ponyplace-cdn.ferrictorus.com
// @connect     ponyplace-compute.ferrictorus.com
// @version     0.1.0
// @grant       GM.xmlHttpRequest
// @grant       GM.getValue
// @grant       GM.setValue
// ==/UserScript==
!function(){"use strict";var e;function t(e){return new Promise(((t,r)=>{e.onload=t,e.onerror=r,e.onabort=r,e.ontimeout=r,GM.xmlHttpRequest(e)}))}!function(e){e.rPlacePixelSize=1,e.MaxSiteSpecificDetectAttempts=5,e.SiteSpecificDetectRetryDelayMs=1e3,e.ScriptReloadCheckPeriodMs=6e4}(e||(e={}));const r="https://raw.githubusercontent.com/marius851000/2023-minimap/main/dist/minimap.user.js";!async function(){let o;try{const e=await t({method:"GET",url:`${r}?t=${Date.now()}`}),n=function(e){return Object.fromEntries(e.split("\r\n").filter((e=>!!e)).map((e=>{const t=e.split(": ").map((e=>e.trim().replace(/^"+/,"").replace(/"+$/,"")));return t[0]=t[0].toLowerCase(),t})))}(e.responseHeaders);o=n.etag,new Function("GM",e.responseText)(GM)}catch(e){console.error(`Failed to get primary script ${e}`)}o?setInterval((async()=>{try{200==(await t({method:"HEAD",url:`${r}?t=${Date.now()}`,headers:{"If-None-Match":o}})).status&&location.reload()}catch(e){console.warn(`Failed to refersh primary script ${e}`)}}),e.ScriptReloadCheckPeriodMs):console.log("No ETag in response. Auto refresh on update disabled.")}()}();
//# sourceMappingURL=loader.user.js.map
