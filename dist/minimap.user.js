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
!function(){"use strict";function t(t,e,a,s){if("a"===a&&!s)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof e?t!==e||!s:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===a?s:"a"===a?s.call(t):s?s.value:e.get(t)}function e(t,e,a,s,n){if("m"===s)throw new TypeError("Private method is not writable");if("a"===s&&!n)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof e?t!==e||!n:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===s?n.call(t,a):n?n.value=a:e.set(t,a),a}var a,s;class n{constructor(){a.set(this,[]),s.set(this,!1)}enqueue(n){return new Promise(((i,o)=>{t(this,a,"f").push({work:n,resolve:i,reject:o}),t(this,s,"f")||(e(this,s,!0,"f"),this.workLoop())}))}async workLoop(){for(;t(this,a,"f").length;){const e=t(this,a,"f").shift();try{const t=await e.work();e.resolve(t)}catch(t){e.reject(t)}}e(this,s,!1,"f")}}function i(t){return new Promise((e=>setTimeout((()=>{e()}),t)))}a=new WeakMap,s=new WeakMap;class o extends EventTarget{constructor(){super();var t=document.createDocumentFragment();["addEventListener","dispatchEvent","removeEventListener"].forEach((e=>this[e]=(...a)=>t[e](...a)))}}class r{constructor(t){this.baseURL="",this.baseURL=t}getTemplateUrl(t,e){return`${this.baseURL}/${e}.png`}getTemplate(t,e){return{canvasUrl:this.getTemplateUrl(t,"autopick"),autoPickUrl:e.autoPick?this.getTemplateUrl(t,"autopick"):void 0,maskUrl:e.mask?this.getTemplateUrl(t,"mask"):void 0}}}let l;const c=new Uint8Array(16);function h(){if(!l&&(l="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!l))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return l(c)}const d=[];for(let t=0;t<256;++t)d.push((t+256).toString(16).slice(1));var p,m,u,g,v={randomUUID:"undefined"!=typeof crypto&&crypto.randomUUID&&crypto.randomUUID.bind(crypto)};function f(t,e,a){if(v.randomUUID&&!e&&!t)return v.randomUUID();const s=(t=t||{}).random||(t.rng||h)();if(s[6]=15&s[6]|64,s[8]=63&s[8]|128,e){a=a||0;for(let t=0;t<16;++t)e[a+t]=s[t];return e}return function(t,e=0){return(d[t[e+0]]+d[t[e+1]]+d[t[e+2]]+d[t[e+3]]+"-"+d[t[e+4]]+d[t[e+5]]+"-"+d[t[e+6]]+d[t[e+7]]+"-"+d[t[e+8]]+d[t[e+9]]+"-"+d[t[e+10]]+d[t[e+11]]+d[t[e+12]]+d[t[e+13]]+d[t[e+14]]+d[t[e+15]]).toLowerCase()}(s)}function y(...t){return t.map((t=>Array.isArray(t)||"object"==typeof t&&null!==t?JSON.stringify(t):t)).join(" ")}class w{constructor(t){p.set(this,void 0),m.set(this,void 0),e(this,p,t,"f"),e(this,m,f(),"f")}send(e){GM.xmlHttpRequest({url:t(this,p,"f").toString(),method:"POST",data:JSON.stringify(e),headers:{"Content-Type":"application/json"}})}async placedPixel(e,a,s,n,i,o){const r={id:t(this,m,"f"),event:"pixel",type:e,template:a,pos:{x:s.x,y:s.y},color:n,timestamp:i/1e3,nextPixelPlace:o};this.send(r)}async logError(...e){const a={id:t(this,m,"f"),event:"error",timestamp:Date.now()/1e3,message:y(...e)};this.send(a)}async statusUpdate(e,a,s){const n={id:t(this,m,"f"),event:"status",timestamp:Date.now()/1e3,template:e,correctPixels:a,totalPixels:s};this.send(n)}}p=new WeakMap,m=new WeakMap;class b{log(...t){console.log(`[${(new Date).toISOString()}]`,...t)}logError(...t){console.error(`[${(new Date).toISOString()}]`,...t)}}class x extends b{constructor(t){super(),this.analytics=t}logError(...t){super.logError(...t),this.analytics.logError(...t)}}!function(t){t.rPlacePixelSize=1,t.MaxSiteSpecificDetectAttempts=5,t.SiteSpecificDetectRetryDelayMs=1e3,t.ScriptReloadCheckPeriodMs=6e4}(u||(u={}));class C extends o{getCoordinates(){return{zoom:Math.ceil(this.rPlace.embed.camera.zoom),x:Math.ceil(this.rPlace.embed.camera.cx-.5),y:Math.ceil(this.rPlace.embed.camera.cy-.5)}}isEquals(t,e){return t.x===e.x&&(t.y===e.y&&t.zoom===e.zoom)}constructor(t){super();var e=this;this.rPlace=t,this.pos={x:0,y:0,zoom:0},requestAnimationFrame((function t(a){const s=e.getCoordinates();e.isEquals(e.pos,s)||(e.pos=s,e.dispatchEvent(new Event("posChanged"))),requestAnimationFrame(t)}))}}class k{constructor(t,e){this.canvas=t,this.embed=e,this.palette=[],this.canvas=t,this.embed=e,this.camera=this.embed.camera,this.position=new C(this),this.paletteButtons=this.embed.shadowRoot.querySelector("garlic-bread-color-picker").shadowRoot.querySelectorAll(".palette button.color");for(const t of this.paletteButtons){const e=t.children[0].style.backgroundColor.match(/rgb\(([0-9]{1,3}), ([0-9]{1,3}), ([0-9]{1,3})\)/),a=parseInt(t.getAttribute("data-color"));e?this.palette.push([+e[1],+e[2],+e[3],a]):this.palette.push([0,0,0,-1])}}}class P{constructor(t,a){g.set(this,void 0),e(this,g,t,"f"),this.cacheKey=a}getWidth(){return t(this,g,"f").width}getHeight(){return t(this,g,"f").height}getImageData(){return t(this,g,"f").data}drawTo(e){e.putImageData(t(this,g,"f"),0,0)}getDithered3x(){const e=new ImageData(3*t(this,g,"f").width,3*t(this,g,"f").height);for(let a=0;a<t(this,g,"f").height;++a)for(let s=0;s<t(this,g,"f").width;++s){const n=4*(a*t(this,g,"f").width+s),i=4*((3*a+1)*e.width+(3*s+1));for(let a=0;a<4;++a)e.data[i+a]=t(this,g,"f").data[n+a]}return e}}g=new WeakMap;class S{constructor(t,e,a,s,n,i){this.template=a,this.templateURL=s,this.mask=n,this.maskURL=i,this.width=t,this.height=e}async update(t,e){const a=await S.fetchURL(e,{headers:{}});if(200!=a.status)throw a;return{template:await S.pixelsFromResponse(a),response:a}}async updateIfDifferent(){let t="NotChanged";const e=await this.update(this.template,this.templateURL);if(this.template=e.template,e.response,t="MaybeChangedNotCached",this.mask){const e=await this.update(this.mask,this.maskURL);this.mask=e.template,e.response,t="MaybeChangedNotCached"}return t}static async fetchURL(t,e){return await(a={...e,method:"GET",responseType:"arraybuffer",url:`${t}?t=${Date.now()}`},new Promise(((t,e)=>{a.onload=t,a.onerror=e,a.onabort=e,a.ontimeout=e,GM.xmlHttpRequest(a)})));var a}static async pixelsFromResponse(t){const e=await createImageBitmap(new Blob([new Uint8ClampedArray(t.response)])),a=document.createElement("canvas");a.width=e.width,a.height=e.height;const s=a.getContext("2d");s.drawImage(e,0,0);const n=s.getImageData(0,0,e.width,e.height);return new P(n,(i=t.responseHeaders,Object.fromEntries(i.split("\r\n").filter((t=>!!t)).map((t=>{const e=t.split(": ").map((t=>t.trim().replace(/^"+/,"").replace(/"+$/,"")));return e[0]=e[0].toLowerCase(),e})))).ETag);var i}static async fetchTemplatePixels(t){const e=await this.fetchURL(t);if(200!=e.status)throw e;return await this.pixelsFromResponse(e)}static async fetchTemplate(t,e){const a=await this.fetchTemplatePixels(t);let s=e?await this.fetchTemplatePixels(e):void 0;return!s||s.getHeight()==a.getHeight()&&s.getWidth()==a.getWidth()||(s=void 0),new S(a.getWidth(),a.getHeight(),a,t,s,e)}palettize(t){const e=this.template.getImageData();for(let a=0;a<e.length/4;a++){const s=4*a,n=e.slice(s,s+3);if(n[0]+n[1]+n[2]===0)continue;let i,o=1/0;for(const e of t){const t=Math.abs(n[0]-e[0])+Math.abs(n[1]-e[1])+Math.abs(n[2]-e[2]);if(0===t)return e;t<o&&(o=t,i=e)}i||(i=[0,0,0]),e[s]=i[0],e[s+1]=i[1],e[s+2]=i[2]}}}async function E(t,e,a){for(await i(3e5);;)try{const s=await t.enqueue((async()=>{const t=await e().updateIfDifferent();return t.startsWith("MaybeChanged")&&a(),t}));"MaybeChangedCached"==s||"NotChanged"==s?await i(3e4):"MaybeChangedNotCached"==s&&await i(3e5)}catch(t){console.error("Error updating template",t),await i(6e4)}}class M{constructor(t,e,a){this.canvas=t,this.templateDict=e,this.template=a,this.overlayCanvas=document.createElement("canvas"),this.overlayContext=this.overlayCanvas.getContext("2d"),this.inject(),this.updateOverlayStyle()}static async create(t,e){const a=await S.fetchTemplate(e.canvasUrl);return new M(t,e,a)}inject(){this.canvas.parentElement.appendChild(this.overlayCanvas);new MutationObserver((()=>{this.updateOverlayStyle()})).observe(this.canvas,{attributes:!0})}updateOverlayStyle(){let t=getComputedStyle(this.canvas),e=!1;const a=3*this.template.width,s=3*this.template.height;this.overlayCanvas.width!=a&&(e=!0,this.overlayCanvas.width=a),this.overlayCanvas.height!=a&&(e=!0,this.overlayCanvas.height=s),this.overlayCanvas.style.position="absolute";const n=t=>"auto"==t?"0":t;this.overlayCanvas.style.top=n(t.top),this.overlayCanvas.style.left=n(t.left),this.overlayCanvas.style.translate=t.translate,this.overlayCanvas.style.transform=t.transform;const i=parseFloat(t.width)/this.canvas.width,o=parseFloat(t.height)/this.canvas.height;this.overlayCanvas.style.width=this.template.width*i+"px",this.overlayCanvas.style.height=this.template.height*o+"px",this.overlayCanvas.style.zIndex=`${parseInt(t.zIndex)+1}`,this.overlayCanvas.style.pointerEvents="none",this.overlayCanvas.style.imageRendering="pixelated",e&&(this.overlayContext=this.overlayCanvas.getContext("2d"),this.applyTemplate())}applyTemplate(t=undefined){t instanceof S&&(this.template=t);const e=this.template.template.getDithered3x();this.overlayContext.putImageData(e,0,0)}hide(){this.overlayCanvas.style.display="none"}show(){this.overlayCanvas.style.display="unset"}}class T extends o{constructor(t,e,a){super(),this.currentLocationIndex=null,this._countOfAllPixels=0,this._diff=[],this.updateInterval=void 0,this.rPlaceCanvas=t,this.templateCanvas=e,this.maskCanvas=a,this.compareCanvas=document.createElement("canvas"),this.compareCanvas.width=t.width,this.compareCanvas.height=t.height}findNextArt(){const t=this.templateCanvas.getContext("2d").getImageData(0,0,this.rPlaceCanvas.width,this.rPlaceCanvas.height).data,e=[];for(let a=0;a<t.length;a+=4){if(0===t[a+3])continue;const s=a/4%this.rPlaceCanvas.width,n=Math.floor(a/4/this.rPlaceCanvas.width);!!e.find((t=>Math.abs(s-t.x)<100&&Math.abs(n-t.y)<100))||e.push({x:s,y:n})}const a=e.sort(((t,e)=>t.x<e.x?-1:t.x>e.x?1:t.y<e.y?-1:t.y>e.y?1:0));if(a.length>0)return null===this.currentLocationIndex?this.currentLocationIndex=0:(this.currentLocationIndex++,this.currentLocationIndex>=a.length&&(this.currentLocationIndex=0)),a[this.currentLocationIndex]}shuffle(t){for(let e=t.length;e>0;){const a=Math.floor(Math.random()*e--),s=t[e];t[e]=t[a],t[a]=s}}pickFromBuckets(t,e){const a=[...t.entries()].sort((([t],[e])=>e-t));for(const[,t]of a){if(!(t.length<=e))return this.shuffle(t),t[e];e-=t.length}const s=Array.from(t.keys()).reduce(((t,e)=>Math.max(t,e)),0),n=t.get(s);return n[Math.floor(Math.random()*n.length)]}selectRandomPixelWeighted(t){const e=this.maskCanvas.getContext("2d").getImageData(0,0,this.maskCanvas.width,this.maskCanvas.height).data,a=new Array(this.maskCanvas.width*this.maskCanvas.height);for(let t=0;t<a.length;t++)a[t]=e[4*t+1];const s=new Map;var n=0;for(let e=0;e<t.length;e++){const i=t[e],[o,r]=i,l=a[o+r*this.rPlaceCanvas.width];if(0===l)continue;n++;const c=s.get(l);void 0===c?s.set(l,[i]):c.push(i)}const i=Math.floor(Math.random()*Math.min(75,n));return this.pickFromBuckets(s,i)}get countOfWrongPixels(){return this._diff.length}get countOfAllPixels(){return this._countOfAllPixels}get countOfRightPixels(){return this.countOfAllPixels-this.countOfWrongPixels}computeDiff(){const t=this.compareCanvas.getContext("2d");t.clearRect(0,0,this.compareCanvas.width,this.compareCanvas.height),t.drawImage(this.templateCanvas,0,0),t.globalCompositeOperation="source-in",t.drawImage(this.rPlaceCanvas,0,0),t.globalCompositeOperation="source-over";const e=t.getImageData(0,0,this.compareCanvas.width,this.compareCanvas.height).data,a=this.templateCanvas.getContext("2d").getImageData(0,0,this.compareCanvas.width,this.compareCanvas.height).data;this._diff=[],this._countOfAllPixels=0;for(let t=0;t<a.length/4;t++)if(0!==e[4*t+3]&&(this._countOfAllPixels++,a[4*t+0]!==e[4*t+0]||a[4*t+1]!==e[4*t+1]||a[4*t+2]!==e[4*t+2])){const e=t%this.compareCanvas.width,a=(t-e)/this.compareCanvas.width;this._diff.push([e,a])}return this.dispatchEvent(new Event("computed")),[this._diff,this._countOfAllPixels]}selectRandomPixelFromDiff(){let t;t=this.maskCanvas.getContext("2d").getImageData(0,0,this.maskCanvas.width,this.maskCanvas.height).data.some((t=>0!==t))?this.selectRandomPixelWeighted(this._diff):this._diff[Math.floor(Math.random()*this._diff.length)];const[e,a]=t;return{x:e,y:a}}setInterval(t){this.updateInterval=setInterval((()=>{this.computeDiff()}),t)}clearInterval(){clearInterval(this.updateInterval)}}class I extends Map{set(t,e){return super.set(t,e),e}}class $ extends WeakMap{set(t,e){return super.set(t,e),e}}
/*! (c) Andrea Giammarchi - ISC */const A=/^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i,D=/<([a-z]+[a-z0-9:._-]*)([^>]*?)(\/?)>/g,R=/([^\s\\>"'=]+)\s*=\s*(['"]?)\x01/g,L=/[\x01\x02]/g;const O=(t,e)=>111===t.nodeType?1/e<0?e?(({firstChild:t,lastChild:e})=>{const a=document.createRange();return a.setStartAfter(t),a.setEndAfter(e),a.deleteContents(),t})(t):t.lastChild:e?t.valueOf():t.firstChild:t,{isArray:U}=Array,N=t=>null==t?t:t.valueOf(),F=(t,e)=>{let a,s,n=e.slice(2);return!(e in t)&&(s=e.toLowerCase())in t&&(n=s.slice(2)),e=>{const s=U(e)?e:[e,!1];a!==s[0]&&(a&&t.removeEventListener(n,a,s[1]),(a=s[0])&&t.addEventListener(n,a,s[1]))}};const{isArray:z,prototype:q}=Array,{indexOf:j}=q,{createDocumentFragment:B,createElement:W,createElementNS:_,createTextNode:H,createTreeWalker:V,importNode:G}=new Proxy(document,{get:(t,e)=>t[e].bind(t)});let Q;const X=(t,e)=>e?(t=>{Q||(Q=_("http://www.w3.org/2000/svg","svg")),Q.innerHTML=t;const e=B();return e.append(...Q.childNodes),e})(t):(t=>{const e=W("template");return e.innerHTML=t,e.content})(t),Y=({childNodes:t},e)=>t[e],J=(t,e,a)=>((t,e,a,s,n)=>{const i=a.length;let o=e.length,r=i,l=0,c=0,h=null;for(;l<o||c<r;)if(o===l){const e=r<i?c?s(a[c-1],-0).nextSibling:s(a[r-c],0):n;for(;c<r;)t.insertBefore(s(a[c++],1),e)}else if(r===c)for(;l<o;)h&&h.has(e[l])||t.removeChild(s(e[l],-1)),l++;else if(e[l]===a[c])l++,c++;else if(e[o-1]===a[r-1])o--,r--;else if(e[l]===a[r-1]&&a[c]===e[o-1]){const n=s(e[--o],-1).nextSibling;t.insertBefore(s(a[c++],1),s(e[l++],-1).nextSibling),t.insertBefore(s(a[--r],1),n),e[o]=a[r]}else{if(!h){h=new Map;let t=c;for(;t<r;)h.set(a[t],t++)}if(h.has(e[l])){const n=h.get(e[l]);if(c<n&&n<r){let i=l,d=1;for(;++i<o&&i<r&&h.get(e[i])===n+d;)d++;if(d>n-c){const i=s(e[l],0);for(;c<n;)t.insertBefore(s(a[c++],1),i)}else t.replaceChild(s(a[c++],1),s(e[l++],-1))}else l++}else t.removeChild(s(e[l++],-1))}return a})(t.parentNode,e,a,O,t),K=(t,e)=>{switch(e[0]){case"?":return((t,e,a)=>s=>{const n=!!N(s);a!==n&&((a=n)?t.setAttribute(e,""):t.removeAttribute(e))})(t,e.slice(1),!1);case".":return((t,e)=>"dataset"===e?(({dataset:t})=>e=>{for(const a in e){const s=e[a];null==s?delete t[a]:t[a]=s}})(t):a=>{t[e]=a})(t,e.slice(1));case"@":return F(t,"on"+e.slice(1));case"o":if("n"===e[1])return F(t,e)}switch(e){case"ref":return(t=>{let e;return a=>{e!==a&&(e=a,"function"==typeof a?a(t):a.current=t)}})(t);case"aria":return(t=>e=>{for(const a in e){const s="role"===a?a:`aria-${a}`,n=e[a];null==n?t.removeAttribute(s):t.setAttribute(s,n)}})(t)}return((t,e)=>{let a,s=!0;const n=document.createAttributeNS(null,e);return e=>{const i=N(e);a!==i&&(null==(a=i)?s||(t.removeAttributeNode(n),s=!0):(n.value=i,s&&(t.setAttributeNodeNS(n),s=!1)))}})(t,e)};function Z(t){const{type:e,path:a}=t,s=a.reduceRight(Y,this);return"node"===e?(t=>{let e,a,s=[];const n=i=>{switch(typeof i){case"string":case"number":case"boolean":e!==i&&(e=i,a||(a=H("")),a.data=i,s=J(t,s,[a]));break;case"object":case"undefined":if(null==i){e!=i&&(e=i,s=J(t,s,[]));break}if(z(i)){e=i,0===i.length?s=J(t,s,[]):"object"==typeof i[0]?s=J(t,s,i):n(String(i));break}if(e!==i)if("ELEMENT_NODE"in i)e=i,s=J(t,s,11===i.nodeType?[...i.childNodes]:[i]);else{const t=i.valueOf();t!==i&&n(t)}break;case"function":n(i(t))}};return n})(s):"attr"===e?K(s,t.name):(t=>{let e;return a=>{const s=N(a);e!=s&&(e=s,t.textContent=null==s?"":s)}})(s)}const tt=t=>{const e=[];let{parentNode:a}=t;for(;a;)e.push(j.call(a.childNodes,t)),t=a,({parentNode:a}=t);return e},et="isµ",at=new $,st=/^(?:textarea|script|style|title|plaintext|xmp)$/,nt=(t,e)=>{const a="svg"===t,s=((t,e,a)=>{let s=0;return t.join("").trim().replace(D,((t,e,s,n)=>{let i=e+s.replace(R,"=$2$1").trimEnd();return n.length&&(i+=a||A.test(e)?" /":"></"+e),"<"+i+">"})).replace(L,(t=>""===t?"\x3c!--"+e+s+++"--\x3e":e+s++))})(e,et,a),n=X(s,a),i=V(n,129),o=[],r=e.length-1;let l=0,c=`${et}${l}`;for(;l<r;){const t=i.nextNode();if(!t)throw`bad template: ${s}`;if(8===t.nodeType)t.data===c&&(o.push({type:"node",path:tt(t)}),c=`${et}${++l}`);else{for(;t.hasAttribute(c);)o.push({type:"attr",path:tt(t),name:t.getAttribute(c)}),t.removeAttribute(c),c=`${et}${++l}`;st.test(t.localName)&&t.textContent.trim()===`\x3c!--${c}--\x3e`&&(t.textContent="",o.push({type:"text",path:tt(t)}),c=`${et}${++l}`)}}return{content:n,nodes:o}},it=(t,e)=>{const{content:a,nodes:s}=at.get(e)||at.set(e,nt(t,e)),n=G(a,!0);return{content:n,updates:s.map(Z,n)}},ot=(t,{type:e,template:a,values:s})=>{const n=rt(t,s);let{entry:i}=t;i&&i.template===a&&i.type===e||(t.entry=i=((t,e)=>{const{content:a,updates:s}=it(t,e);return{type:t,template:e,content:a,updates:s,wire:null}})(e,a));const{content:o,updates:r,wire:l}=i;for(let t=0;t<n;t++)r[t](s[t]);return l||(i.wire=(t=>{const{firstChild:e,lastChild:a}=t;if(e===a)return a||t;const{childNodes:s}=t,n=[...s];return{ELEMENT_NODE:1,nodeType:111,firstChild:e,lastChild:a,valueOf:()=>(s.length!==n.length&&t.append(...n),t)}})(o))},rt=({stack:t},e)=>{const{length:a}=e;for(let s=0;s<a;s++){const a=e[s];a instanceof lt?e[s]=ot(t[s]||(t[s]={stack:[],entry:null,wire:null}),a):z(a)?rt(t[s]||(t[s]={stack:[],entry:null,wire:null}),a):t[s]=null}return a<t.length&&t.splice(a),a};class lt{constructor(t,e,a){this.type=t,this.template=e,this.values=a}}const ct=t=>{const e=new $;return Object.assign(((e,...a)=>new lt(t,e,a)),{for(a,s){const n=e.get(a)||e.set(a,new I);return n.get(s)||n.set(s,(e=>(a,...s)=>ot(e,{type:t,template:a,values:s}))({stack:[],entry:null,wire:null}))},node:(e,...a)=>ot({stack:[],entry:null,wire:null},new lt(t,e,a)).valueOf()})},ht=new $,dt=ct("html");ct("svg");class pt{constructor(t,e=!1,a=function(t){}){this.name=t,this._enabled=e,this.callback=a}get enabled(){return this._enabled}set enabled(t){this._enabled=t,this.callback(this)}onclick(){this.enabled=!this.enabled}htmlFor(t,e){const a=["clickable"];return this.enabled&&a.push("alwaysshow"),dt.for(t,e)`<div data-id=${e} class=${a.join(" ")} onclick=${()=>this.onclick()}>
      ${this.name}: <span>${this.enabled?"Enabled":"Disabled"}</span>
    </div>`}}class mt{constructor(t,e=["Unset"],a=0,s=function(t){},n=!1){this.name=t,this.values=e,this.valueIx=a,this.callback=s,this.alwaysShow=n}get value(){return this.values[this.valueIx]}onclick(){this.valueIx=(this.valueIx+1)%this.values.length,this.callback(this)}htmlFor(t,e){const a=["clickable"];return this.alwaysShow&&a.push("alwaysshow"),dt.for(t,e)`<div data-id=${e} class=${a.join(" ")} onclick=${()=>this.onclick()}>
      ${this.name}: <span>${this.value}</span>
    </div>`}}class ut{constructor(t,e=function(t){},a=!1){this.name=t,this.callback=e,this.alwaysShow=a}onclick(){this.callback(this)}htmlFor(t,e){const a=["clickable"];return this.alwaysShow&&a.push("alwaysshow"),dt.for(t,e)`<div data-id=${e} class=${a.join(" ")} onclick=${()=>this.onclick()}>
      ${this.name}
    </div>`}}class gt{constructor(t,e,a=!1){this.name=t,this.content=e,this.alwaysShow=a}htmlFor(t,e){const a=[];return this.alwaysShow&&a.push("alwaysshow"),dt.for(t,e)`<div data-id=${e} class=${a.join(" ")}>${this.name}: ${this.content}</div>`}}class vt{constructor(t,e){this.settings=[],this.settingNames=new Map,this.settingsByName=new Map;const a=this;requestAnimationFrame((function s(n){((t,e)=>{const a="function"==typeof e?e():e,s=ht.get(t)||ht.set(t,{stack:[],entry:null,wire:null}),n=a instanceof lt?ot(s,a):a;n!==s.wire&&(s.wire=n,t.replaceChildren(n.valueOf()))})(t,a.htmlFor(e,"settings")),requestAnimationFrame(s)}))}htmlFor(t,e){return dt.for(t,e)`${this.settings.map((t=>t.htmlFor(this,this.settingNames.get(t))))}`}addSetting(t,e){this.settings.push(e),this.settingNames.set(e,t),this.settingsByName.set(t,e)}getSetting(t){return this.settingsByName.get(t)}}class ft{constructor(t,e,a=(()=>{})){var s,n,i,o;function r(t){e.style.width=i-t.clientX+s+"px",e.style.height=o+t.clientY-n+"px",a()}function l(t){document.documentElement.removeEventListener("mousemove",r,!1),document.documentElement.removeEventListener("mouseup",l,!1)}t.addEventListener("mousedown",(function(t){s=t.clientX,n=t.clientY,i=parseInt(document.defaultView.getComputedStyle(e).width,10),o=parseInt(document.defaultView.getComputedStyle(e).height,10),document.documentElement.addEventListener("mousemove",r,!1),document.documentElement.addEventListener("mouseup",l,!1)}),!1)}}class yt{constructor(t,e,a,s,n){this.lastPos={x:0,y:0,zoom:0},this.mlpMinimapBlock=t,this.imageCanvas=e,this.imageCanvasCtx=a,this.crosshairBlock=s,this.settingsBlock=n;const i=this,o=this.mlpMinimapBlock.querySelector("#resizer");new ft(o,t,(()=>{i.recalculateImagePos()}))}setTemplate(t){this.imageCanvas.width=t.template.getWidth(),this.imageCanvas.height=t.template.getHeight(),t.template.drawTo(this.imageCanvasCtx)}recalculateImagePos(t=undefined){void 0===t&&(t=this.lastPos);const e=u.rPlacePixelSize,a=this.getMinimapSize();this.imageCanvas.style.width=this.imageCanvas.width*e*t.zoom+"px",this.imageCanvas.style.height=this.imageCanvas.height*e*t.zoom+"px",this.imageCanvas.style["margin-left"]=-((t.x*e+e/2)*t.zoom-a.width/2)+"px",this.imageCanvas.style["margin-top"]=-((t.y*e+e/2)*t.zoom-a.height/2)+"px",this.crosshairBlock.style.width=e*t.zoom+"px",this.crosshairBlock.style.height=e*t.zoom+"px",this.lastPos=t}getMinimapSize(){return{width:this.mlpMinimapBlock.clientWidth,height:this.mlpMinimapBlock.clientHeight}}}class wt extends o{constructor(){super(),this.templates=new Map,this.currentTemplate={name:"",url:void 0,obj:void 0},this.templateWorkQueue=new n;const t=this;E(this.templateWorkQueue,(()=>this.currentTemplate.obj),(()=>{t.dispatchEvent(new Event("templateFetched"))}))}add(t,e){this.templates.set(t,e)}set(t){const e=this.templates.get(t);if(void 0===e)throw{message:`Invalid /r/place template name: ${t}`};this.currentTemplate.name=t,this.currentTemplate.url=e}fetch(t){const e=this;return this.templateWorkQueue.enqueue((async()=>{const a=void 0!==e.currentTemplate.url.autoPickUrl&&t?e.currentTemplate.url.autoPickUrl:e.currentTemplate.url.canvasUrl;e.currentTemplate.obj=await S.fetchTemplate(a,e.currentTemplate.url.maskUrl),e.dispatchEvent(new Event("templateFetched"))}))}get keys(){return Array.from(this.templates.keys())}}class bt{constructor(t){this.rPlace=void 0,this.overlay=void 0,this.rPlaceCanvas=void 0,this.templateCanvas=void 0,this.maskCanvas=void 0,this.comparer=void 0,this.settings=void 0,this.ui=void 0,this.templates=new wt,this.logger=t}async takeScreenshotOfCanvas(){this.rPlace.camera.applyPosition({x:Math.floor(this.rPlaceCanvas.width/2),y:Math.floor(this.rPlaceCanvas.height/2),zoom:0}),await i(1e3);const t=document.createElement("a");t.setAttribute("download","rplace.png"),this.rPlaceCanvas.toBlob((e=>{const a=URL.createObjectURL(e);t.setAttribute("href",a),t.click()}))}selectRandPix(){if(this.comparer.computeDiff(),this.comparer.countOfWrongPixels>0)try{const t=this.comparer.selectRandomPixelFromDiff(),e=this.templateCanvas.getContext("2d").getImageData(t.x,t.y,1,1),a=this.rPlaceCanvas.getContext("2d").getImageData(t.x,t.y,1,1);this.pickColorFromPixel(e),this.rPlace.camera.applyPosition(t),this.rPlace.embed.showColorPicker=!0;const s=this.rPlace.embed.selectedColor;this.logger.log(`Ready to place pixel [x: ${t.x}, y: ${t.y}, color: ${s}, current-color: ${a.data}, new-color: ${e.data}]`)}catch(t){console.error("Error getting pixel to place",t)}}async initialize(){if(this.templates.set(this.templates.keys[0]),await new Promise((t=>{"complete"==document.readyState&&t();const e=function(){"complete"==document.readyState&&(document.removeEventListener("readystatechange",e),t())};document.addEventListener("readystatechange",e)})),await i(1e3),this.rPlace=await async function(){for(let t=u.MaxSiteSpecificDetectAttempts;0!=t;--t)try{const e=document.querySelector("garlic-bread-embed");if(!e){console.log("Failed to find `garlic-bread-embed`");continue}const a=e.shadowRoot.querySelector("div > garlic-bread-share-container > garlic-bread-camera > garlic-bread-canvas").shadowRoot.querySelector("canvas");if(!a){console.log("Failed to find `garlic-bread-canvas`");continue}if(0===e.shadowRoot.querySelector("garlic-bread-color-picker").shadowRoot.querySelectorAll(".palette button.color").length&&t>1){console.log("rPlace is exists but pallete is empty!");continue}return new k(a,e)}catch(t){console.log("Failed to get the reddit canvas: ",t)}finally{console.log(`Retries left: ${t}`),await i(u.SiteSpecificDetectRetryDelayMs)}}(),!this.rPlace){const t=this.rPlace.canvas;return this.logger.logError("Failed to find site specific handler. Falling back to overlay."),void await async function(t,e){const a=await M.create(t,e);E(new n,(()=>a.template),(()=>{a.applyTemplate()}))}(t,this.templates.currentTemplate.url)}this.ui=function(t){var e;const a=t.createElement("div");a.innerHTML='<style>\nmlpminimap {\n  display: block;\n  color: white;\n  width: 400px;\n  height: 300px;\n  position: absolute;\n  top: 0%;\n  right: 0%;\n  background-color: rgba(0,0,0,.75);\n  border: 1px solid black;\n  overflow: hidden;\n}\n\nmlpminimap .map {\n  position: absolute;\n  margin: 0;\n  max-width: unset;\n  display: block;\n  image-rendering: pixelated;\n  pointer-events: none;\n}\n\nmlpminimap .crosshair {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  border: 2px solid red;\n  transform: translateX(-50%) translateY(-50%);\n}\n\nmlpminimap #resizer {\n  position: absolute;\n  bottom: 0%;\n  left: 0%;\n  width: 0px;\n  height: 0px;\n  border-bottom: 10px solid red;\n  border-left: 10px solid red;\n  border-top: 10px solid transparent;\n  border-right: 10px solid transparent;\n}\n\nmlpminimap .settings {\n  position: absolute;\n  background-color: rgba(0,0,0,.75);\n}\n\nmlpminimap .settings > div{\n  display: none;\n}\n\nmlpminimap .settings > .alwaysshow{\n  display: block;\n}\n\nmlpminimap:hover .settings > div{\n  display: block;\n}\n\nmlpminimap .settings .clickable {\n  cursor: pointer;\n  user-select: none;\n}\n\nmlpminimap #noSleep {\ndisplay: none;\n}\n</style>\n<mlpminimap>\n  <canvas class="map"></canvas>\n  <div class="crosshair"></div>\n  <div class="settings"></div>\n  <div id="resizer"></div>\n</mlpminimap>',null===(e=t.querySelector("body"))||void 0===e||e.appendChild(a);const s=a.querySelector("mlpminimap"),n=s.querySelector(".map"),i=n.getContext("2d"),o=s.querySelector(".crosshair"),r=s.querySelector(".settings");return new yt(s,n,i,o,r)}(document),this.rPlaceCanvas=this.rPlace.canvas,this.settings=new vt(this.ui.settingsBlock,this.ui.mlpMinimapBlock),this.templateCanvas=this.ui.imageCanvas,this.maskCanvas=document.createElement("canvas"),this.maskCanvas.width=this.rPlaceCanvas.width,this.maskCanvas.height=this.rPlaceCanvas.height,this.comparer=new T(this.rPlaceCanvas,this.templateCanvas,this.maskCanvas),this.settings.addSetting("templateName",new mt("Template",this.templates.keys,0,(t=>{this.templates.set(t.value),this.templates.fetch(this.settings.getSetting("autoPick").enabled)}),!0)),this.settings.addSetting("findArt",new ut("Find our art!",(()=>{const t=this.comparer.findNextArt();if(!t)throw{message:"Next location not found!"};this.logger.log(`Moving to art at: [x: ${t.x}, y: ${t.y}]`),this.rPlace.camera.applyPosition(t)})));const t=await GM.getValue("enableAutoColor",!1);this.settings.addSetting("autoColor",new pt("Auto color picker",t,(t=>{GM.setValue("enableAutoColor",t.enabled)})));const e=await GM.getValue("enableAutoPick",!1);this.settings.addSetting("autoPick",new pt("Use the priority-based template",e,(t=>{GM.setValue("enableAutoPick",t.enabled),this.templates.fetch(t.enabled)})));const a=await GM.getValue("enableOverlay",!1);this.settings.addSetting("overlay",new pt("Fullscreen overlay",a,(t=>{GM.setValue("enableOverlay",t.enabled),t.enabled?this.overlay.show():this.overlay.hide()}))),this.settings.addSetting("pixelDisplayProgress",new gt("Current progress","Unknown",!0)),this.settings.addSetting("downloadCanvas",new ut("Download r/place Canvas",(()=>{this.takeScreenshotOfCanvas()}))),this.templates.addEventListener("templateFetched",(()=>{const t=this.templates.currentTemplate.obj;t.palettize(this.rPlace.palette),this.ui.setTemplate(t),this.ui.recalculateImagePos(this.rPlace.position.pos),this.overlay instanceof M?this.overlay.applyTemplate(t):(this.overlay=new M(this.rPlaceCanvas,null,t),this.settings.getSetting("overlay").enabled||this.overlay.hide());const e=this.maskCanvas.getContext("2d");e.clearRect(0,0,this.maskCanvas.width,this.maskCanvas.height),t.mask&&t.mask.drawTo(e)}));const s=this.rPlace.embed.shadowRoot.querySelector("garlic-bread-color-picker").shadowRoot.querySelector("div > div > div.actions"),o=document.createElement("button");o.innerText="Pick Priority Pixel",o.setAttribute("style","height:44px; min-width: 44px; padding: 0px; border: var(--pixel-border); box-sizing: border-box; background-color: #ffffff; flex: 1 1 0%; cursor:pointer;  color: rgb(18, 18, 18); font-size 20px; position:relative; --button-border-width: 4px; border-image-slice: 1; margin-left: 16px;"),o.onclick=()=>{this.selectRandPix()},s.appendChild(o),this.comparer.setInterval(5e3),this.comparer.addEventListener("computed",(()=>{const t=(100*this.comparer.countOfRightPixels/this.comparer.countOfAllPixels).toPrecision(3);this.settings.getSetting("pixelDisplayProgress").content=dt`<span style="font-weight: bold;">${t}
          % (${this.comparer.countOfRightPixels}/${this.comparer.countOfAllPixels})</span>`})),this.rPlace.position.addEventListener("posChanged",(()=>{if(this.ui.recalculateImagePos(this.rPlace.position.pos),this.settings.getSetting("autoColor").enabled)try{const t=this.ui.imageCanvasCtx.getImageData(this.rPlace.position.pos.x,this.rPlace.position.pos.y,1,1);this.pickColorFromPixel(t)}catch(t){console.error(t)}})),await this.templates.fetch(this.settings.getSetting("autoPick").enabled)}pickColorFromPixel(t){if(255!==t.data[3])return;const e=t.data[0],a=t.data[1],s=t.data[2];let n=[];for(const t of this.rPlace.palette)n.push(Math.abs(e-t[0])+Math.abs(a-t[1])+Math.abs(s-t[2]));let i=0;for(let t=0;t<n.length;t++)n[i]>n[t]&&(i=t);this.rPlace.embed.selectedColor=this.rPlace.palette[i][3]}}!async function(){const t=new w(new URL("http://ponyplace-compute.ferrictorus.com/analytics/placepixel")),e=new x(t),a=new bt(e),s=new r("https://raw.githubusercontent.com/uis246/template/master");a.templates.add("mlp",s.getTemplate("mlp",{autoPick:!0,mask:!0})),await a.initialize(),a.rPlace.embed._events._getEventTarget().addEventListener("confirm-pixel",(()=>{const e=Date.now(),s=e+1e3*a.rPlace.embed.nextTileAvailableIn,n=s+3e3;t.placedPixel("manual-browser-srpb",a.templates.currentTemplate.name,a.rPlace.position.pos,a.rPlace.embed.selectedColor,e,{reddit:s,safe:n})}))}()}();
//# sourceMappingURL=minimap.user.js.map
