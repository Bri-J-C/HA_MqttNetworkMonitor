/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,o=Symbol(),s=new WeakMap;let i=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==o)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const o=this.t;if(e&&void 0===t){const e=void 0!==o&&1===o.length;e&&(t=s.get(o)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(o,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,o,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+t[s+1],t[0]);return new i(s,t,o)},n=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const o of t.cssRules)e+=o.cssText;return(t=>new i("string"==typeof t?t:t+"",void 0,o))(e)})(t):t,{is:a,defineProperty:d,getOwnPropertyDescriptor:l,getOwnPropertyNames:c,getOwnPropertySymbols:p,getPrototypeOf:h}=Object,u=globalThis,g=u.trustedTypes,m=g?g.emptyScript:"",f=u.reactiveElementPolyfillSupport,b=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let o=t;switch(e){case Boolean:o=null!==t;break;case Number:o=null===t?null:Number(t);break;case Object:case Array:try{o=JSON.parse(t)}catch(t){o=null}}return o}},_=(t,e)=>!a(t,e),x={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:_};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let y=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=x){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const o=Symbol(),s=this.getPropertyDescriptor(t,o,e);void 0!==s&&d(this.prototype,t,s)}}static getPropertyDescriptor(t,e,o){const{get:s,set:i}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const r=s?.call(this);i?.call(this,e),this.requestUpdate(t,r,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??x}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const t=h(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const t=this.properties,e=[...c(t),...p(t)];for(const o of e)this.createProperty(o,t[o])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,o]of e)this.elementProperties.set(t,o)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const o=this._$Eu(t,e);void 0!==o&&this._$Eh.set(o,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const o=new Set(t.flat(1/0).reverse());for(const t of o)e.unshift(n(t))}else void 0!==t&&e.push(n(t));return e}static _$Eu(t,e){const o=e.attribute;return!1===o?void 0:"string"==typeof o?o:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const o of e.keys())this.hasOwnProperty(o)&&(t.set(o,this[o]),delete this[o]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const o=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((o,s)=>{if(e)o.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of s){const s=document.createElement("style"),i=t.litNonce;void 0!==i&&s.setAttribute("nonce",i),s.textContent=e.cssText,o.appendChild(s)}})(o,this.constructor.elementStyles),o}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,o){this._$AK(t,o)}_$ET(t,e){const o=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,o);if(void 0!==s&&!0===o.reflect){const i=(void 0!==o.converter?.toAttribute?o.converter:v).toAttribute(e,o.type);this._$Em=t,null==i?this.removeAttribute(s):this.setAttribute(s,i),this._$Em=null}}_$AK(t,e){const o=this.constructor,s=o._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=o.getPropertyOptions(s),i="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=s;const r=i.fromAttribute(e,t.type);this[s]=r??this._$Ej?.get(s)??r,this._$Em=null}}requestUpdate(t,e,o,s=!1,i){if(void 0!==t){const r=this.constructor;if(!1===s&&(i=this[t]),o??=r.getPropertyOptions(t),!((o.hasChanged??_)(i,e)||o.useDefault&&o.reflect&&i===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,o))))return;this.C(t,e,o)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:o,reflect:s,wrapped:i},r){o&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==i||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||o||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,o]of t){const{wrapped:t}=o,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,o,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[b("elementProperties")]=new Map,y[b("finalized")]=new Map,f?.({ReactiveElement:y}),(u.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $=globalThis,w=t=>t,k=$.trustedTypes,S=k?k.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",D=`lit$${Math.random().toFixed(9).slice(2)}$`,E="?"+D,A=`<${E}>`,T=document,F=()=>T.createComment(""),z=t=>null===t||"object"!=typeof t&&"function"!=typeof t,G=Array.isArray,N="[ \t\n\f\r]",P=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,O=/-->/g,M=/>/g,L=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),I=/'/g,j=/"/g,U=/^(?:script|style|textarea|title)$/i,R=t=>(e,...o)=>({_$litType$:t,strings:e,values:o}),B=R(1),H=R(2),V=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),J=new WeakMap,W=T.createTreeWalker(T,129);function Y(t,e){if(!G(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const X=(t,e)=>{const o=t.length-1,s=[];let i,r=2===e?"<svg>":3===e?"<math>":"",n=P;for(let e=0;e<o;e++){const o=t[e];let a,d,l=-1,c=0;for(;c<o.length&&(n.lastIndex=c,d=n.exec(o),null!==d);)c=n.lastIndex,n===P?"!--"===d[1]?n=O:void 0!==d[1]?n=M:void 0!==d[2]?(U.test(d[2])&&(i=RegExp("</"+d[2],"g")),n=L):void 0!==d[3]&&(n=L):n===L?">"===d[0]?(n=i??P,l=-1):void 0===d[1]?l=-2:(l=n.lastIndex-d[2].length,a=d[1],n=void 0===d[3]?L:'"'===d[3]?j:I):n===j||n===I?n=L:n===O||n===M?n=P:(n=L,i=void 0);const p=n===L&&t[e+1].startsWith("/>")?" ":"";r+=n===P?o+A:l>=0?(s.push(a),o.slice(0,l)+C+o.slice(l)+D+p):o+D+(-2===l?e:p)}return[Y(t,r+(t[o]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class K{constructor({strings:t,_$litType$:e},o){let s;this.parts=[];let i=0,r=0;const n=t.length-1,a=this.parts,[d,l]=X(t,e);if(this.el=K.createElement(d,o),W.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=W.nextNode())&&a.length<n;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(C)){const e=l[r++],o=s.getAttribute(t).split(D),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:i,name:n[2],strings:o,ctor:"."===n[1]?ot:"?"===n[1]?st:"@"===n[1]?it:et}),s.removeAttribute(t)}else t.startsWith(D)&&(a.push({type:6,index:i}),s.removeAttribute(t));if(U.test(s.tagName)){const t=s.textContent.split(D),e=t.length-1;if(e>0){s.textContent=k?k.emptyScript:"";for(let o=0;o<e;o++)s.append(t[o],F()),W.nextNode(),a.push({type:2,index:++i});s.append(t[e],F())}}}else if(8===s.nodeType)if(s.data===E)a.push({type:2,index:i});else{let t=-1;for(;-1!==(t=s.data.indexOf(D,t+1));)a.push({type:7,index:i}),t+=D.length-1}i++}}static createElement(t,e){const o=T.createElement("template");return o.innerHTML=t,o}}function Z(t,e,o=t,s){if(e===V)return e;let i=void 0!==s?o._$Co?.[s]:o._$Cl;const r=z(e)?void 0:e._$litDirective$;return i?.constructor!==r&&(i?._$AO?.(!1),void 0===r?i=void 0:(i=new r(t),i._$AT(t,o,s)),void 0!==s?(o._$Co??=[])[s]=i:o._$Cl=i),void 0!==i&&(e=Z(t,i._$AS(t,e.values),i,s)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:o}=this._$AD,s=(t?.creationScope??T).importNode(e,!0);W.currentNode=s;let i=W.nextNode(),r=0,n=0,a=o[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new tt(i,i.nextSibling,this,t):1===a.type?e=new a.ctor(i,a.name,a.strings,this,t):6===a.type&&(e=new rt(i,this,t)),this._$AV.push(e),a=o[++n]}r!==a?.index&&(i=W.nextNode(),r++)}return W.currentNode=T,s}p(t){let e=0;for(const o of this._$AV)void 0!==o&&(void 0!==o.strings?(o._$AI(t,o,e),e+=o.strings.length-2):o._$AI(t[e])),e++}}class tt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,o,s){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=o,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),z(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==V&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>G(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==q&&z(this._$AH)?this._$AA.nextSibling.data=t:this.T(T.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:o}=t,s="number"==typeof o?this._$AC(t):(void 0===o.el&&(o.el=K.createElement(Y(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new Q(s,this),o=t.u(this.options);t.p(e),this.T(o),this._$AH=t}}_$AC(t){let e=J.get(t.strings);return void 0===e&&J.set(t.strings,e=new K(t)),e}k(t){G(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let o,s=0;for(const i of t)s===e.length?e.push(o=new tt(this.O(F()),this.O(F()),this,this.options)):o=e[s],o._$AI(i),s++;s<e.length&&(this._$AR(o&&o._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=w(t).nextSibling;w(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class et{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,o,s,i){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=i,o.length>2||""!==o[0]||""!==o[1]?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=q}_$AI(t,e=this,o,s){const i=this.strings;let r=!1;if(void 0===i)t=Z(this,t,e,0),r=!z(t)||t!==this._$AH&&t!==V,r&&(this._$AH=t);else{const s=t;let n,a;for(t=i[0],n=0;n<i.length-1;n++)a=Z(this,s[o+n],e,n),a===V&&(a=this._$AH[n]),r||=!z(a)||a!==this._$AH[n],a===q?t=q:t!==q&&(t+=(a??"")+i[n+1]),this._$AH[n]=a}r&&!s&&this.j(t)}j(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class ot extends et{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===q?void 0:t}}class st extends et{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}}class it extends et{constructor(t,e,o,s,i){super(t,e,o,s,i),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??q)===V)return;const o=this._$AH,s=t===q&&o!==q||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,i=t!==q&&(o===q||s);s&&this.element.removeEventListener(this.name,this,o),i&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class rt{constructor(t,e,o){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}}const nt=$.litHtmlPolyfillSupport;nt?.(K,tt),($.litHtmlVersions??=[]).push("3.3.2");const at=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class dt extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,o)=>{const s=o?.renderBefore??e;let i=s._$litPart$;if(void 0===i){const t=o?.renderBefore??null;s._$litPart$=i=new tt(e.insertBefore(F(),t),t,void 0,o??{})}return i._$AI(t),i})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return V}}dt._$litElement$=!0,dt.finalized=!0,at.litElementHydrateSupport?.({LitElement:dt});const lt=at.litElementPolyfillSupport;lt?.({LitElement:dt}),(at.litElementVersions??=[]).push("4.2.2");const ct=r`
  :host {
    --bg-primary: #0a0a1a;
    --bg-card: #0d0d1f;
    --bg-surface: #1a1a2e;
    --bg-hover: rgba(255,255,255,0.08);
    --bg-input: rgba(255,255,255,0.06);
    --bg-subtle: rgba(255,255,255,0.05);
    --border: rgba(255,255,255,0.1);
    --border-hover: rgba(255,255,255,0.2);
    --text-primary: #fff;
    --text-secondary: rgba(255,255,255,0.6);
    --text-dim: rgba(255,255,255,0.4);
    --accent: #00D4FF;
    --accent-bg: rgba(0,212,255,0.1);
    --success: #04d65c;
    --success-bg: rgba(4,214,92,0.15);
    --danger: #ef5350;
    --danger-bg: rgba(239,83,80,0.1);
    --warning: #ffb74d;
    --warning-bg: rgba(255,183,77,0.1);
    --radius-sm: 4px;
    --radius-md: 8px;
    --radius-lg: 12px;
    --radius-pill: 16px;
    --shadow-dropdown: 0 8px 24px rgba(0,0,0,0.6);
    --shadow-modal: 0 20px 60px rgba(0,0,0,0.5);
    --transition: 0.2s ease;
  }
`;const pt=new class{constructor(){this._ws=null,this._listeners=[],this._reconnectDelay=1e3,this._reconnectAttempts=0,this._maxReconnectAttempts=50}connect(){const t="https:"===location.protocol?"wss:":"ws:",e=location.pathname.match(/^(\/api\/hassio_ingress\/[^/]+)/),o=e?e[1]:"",s=`${t}//${location.host}${o}/api/ws`;this._ws=new WebSocket(s),this._ws.onmessage=t=>{try{const e=JSON.parse(t.data);this._listeners.forEach(t=>t(e))}catch(t){console.error("WebSocket parse error:",t)}},this._ws.onclose=()=>{this._reconnectAttempts>=this._maxReconnectAttempts?console.error("WebSocket: max reconnect attempts reached"):(this._reconnectAttempts++,setTimeout(()=>this.connect(),this._reconnectDelay),this._reconnectDelay=Math.min(2*this._reconnectDelay,3e4))},this._ws.onopen=()=>{this._reconnectDelay=1e3,this._reconnectAttempts=0}}onMessage(t){return this._listeners.push(t),()=>{this._listeners=this._listeners.filter(e=>e!==t)}}disconnect(){this._ws&&this._ws.close()}};function ht(t,e){if(null==t||!e)return t;if("duration"===e){const e=Number(t);if(isNaN(e))return t;const o=[],s=Math.floor(e/86400),i=Math.floor(e%86400/3600),r=Math.floor(e%3600/60),n=Math.floor(e%60);return s&&o.push(`${s}d`),i&&o.push(`${i}h`),r&&o.push(`${r}m`),o.length||o.push(`${n}s`),o.join(" ")}if("bytes"===e){const e=Number(t);return isNaN(e)?t:e>=1e12?(e/1e12).toFixed(1)+" TB":e>=1e9?(e/1e9).toFixed(1)+" GB":e>=1e6?(e/1e6).toFixed(1)+" MB":e>=1e3?(e/1e3).toFixed(1)+" KB":e+" B"}if("percentage"===e){const e=Number(t);return isNaN(e)?t:(100*e).toFixed(1)+"%"}if(e.startsWith("round:")){const o=parseInt(e.split(":")[1])||0,s=Number(t);return isNaN(s)?t:s.toFixed(o)}if(e.startsWith("prefix:"))return e.slice(7)+t;if(e.startsWith("suffix:"))return t+e.slice(7);if(e.startsWith("custom:")){const o=ut.find(t=>t.id===e);if(o)try{return new Function("value","return ("+o.expression+")")(t)}catch{return t}}return t}let ut=[];function gt(t){ut=Array.isArray(t)?t:[]}function mt(){const t=ut.map(t=>({value:t.id,label:t.name}));return[...ft,...t]}const ft=[{value:"",label:"None"},{value:"duration",label:"Duration (seconds → 2d 5h)"},{value:"bytes",label:"Bytes (→ KB/MB/GB)"},{value:"percentage",label:"Percentage (0-1 → %)"},{value:"round:0",label:"Round (0 decimals)"},{value:"round:1",label:"Round (1 decimal)"},{value:"round:2",label:"Round (2 decimals)"}];const bt=function(){const t=location.pathname.match(/^(\/api\/hassio_ingress\/[^/]+)/);return t?t[1]:""}();async function vt(t,e={}){const o=await fetch(t,e);if(!o.ok){const t=await o.text().catch(()=>o.statusText);throw new Error(`API error ${o.status}: ${t}`)}const s=o.headers.get("content-type");return s&&s.includes("application/json")?o.json():null}async function _t(t=0){return vt(t>0?`${bt}/api/devices?since=${t}`:`${bt}/api/devices`)}async function xt(t){return vt(`${bt}/api/devices/${encodeURIComponent(t)}`)}async function yt(t){return vt(`${bt}/api/devices/${encodeURIComponent(t)}`,{method:"DELETE"})}async function $t(t,e){return vt(`${bt}/api/devices/${encodeURIComponent(t)}/attributes/${encodeURIComponent(e)}`,{method:"DELETE"})}async function wt(t,e){return vt(`${bt}/api/devices/${encodeURIComponent(t)}/attributes/${encodeURIComponent(e)}/unhide`,{method:"POST"})}async function kt(t,e){return vt(`${bt}/api/devices/${encodeURIComponent(t)}/commands/${encodeURIComponent(e)}`,{method:"DELETE"})}async function St(t,e){return vt(`${bt}/api/devices/${encodeURIComponent(t)}/commands/${encodeURIComponent(e)}/unhide`,{method:"POST"})}async function Ct(){return vt(`${bt}/api/topology`)}async function Dt(){return vt(`${bt}/api/topology/layouts`)}async function Et(t){return vt(`${bt}/api/topology/layouts`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})}async function At(t){return vt(`${bt}/api/topology/layouts/${encodeURIComponent(t)}`,{method:"DELETE"})}async function Tt(t,e,o={}){return vt(`${bt}/api/devices/${encodeURIComponent(t)}/command`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({command:e,params:o})})}async function Ft(){return vt(`${bt}/api/groups`)}async function zt(t,e,o=[]){return vt(`${bt}/api/groups`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:t,name:e,device_ids:o})})}async function Gt(t,{name:e,device_ids:o,custom_commands:s,custom_sensors:i,thresholds:r,crit_thresholds:n,hidden_commands:a,interval:d,attribute_transforms:l}){return vt(`${bt}/api/groups/${encodeURIComponent(t)}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:e,device_ids:o,custom_commands:s,custom_sensors:i,thresholds:r,crit_thresholds:n,hidden_commands:a,interval:d,attribute_transforms:l})})}async function Nt(t){return vt(`${bt}/api/groups/${encodeURIComponent(t)}`,{method:"DELETE"})}async function Pt(t,e){return vt(`${bt}/api/devices/${encodeURIComponent(t)}/tags/add`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({tags:e})})}async function Ot(t,e){return vt(`${bt}/api/devices/${encodeURIComponent(t)}/tags/${encodeURIComponent(e)}`,{method:"DELETE"})}async function Mt(){return vt(`${bt}/api/tags`)}async function Lt(t){return vt(`${bt}/api/tags`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({tag:t})})}async function It(t,e){return vt(`${bt}/api/tags/${encodeURIComponent(t)}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({new_name:e})})}async function jt(t){return vt(`${bt}/api/tags/${encodeURIComponent(t)}`,{method:"DELETE"})}async function Ut(){return vt(`${bt}/api/settings`)}async function Rt(t){return vt(`${bt}/api/settings`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})}async function Bt(){return vt(`${bt}/api/settings/export`)}async function Ht(t){return vt(`${bt}/api/settings/import`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})}async function Vt(t){return vt(`${bt}/api/devices/${encodeURIComponent(t)}/effective-settings`)}async function qt(t,e){return vt(`${bt}/api/devices/${encodeURIComponent(t)}/settings`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}async function Jt(t,e){return vt(`${bt}/api/groups/${encodeURIComponent(t)}/push-config`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}var Wt=Object.freeze({__proto__:null,addDeviceTags:Pt,addServerCommand:async function(t,e,o){return vt(`${bt}/api/devices/${encodeURIComponent(t)}/server-commands`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:e,shell:o})})},addServerSensor:async function(t,e,o){return vt(`${bt}/api/devices/${encodeURIComponent(t)}/server-sensors`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:e,...o})})},createGroup:zt,createTag:Lt,deleteAttribute:$t,deleteDevice:yt,deleteGroup:Nt,deleteLayout:At,deleteTag:jt,exportSettings:Bt,fetchDevice:xt,fetchDevices:_t,fetchEffectiveSettings:Vt,fetchGroups:Ft,fetchLayouts:Dt,fetchSettings:Ut,fetchTags:Mt,fetchTopology:Ct,hideCommand:kt,importSettings:Ht,pushGroupConfig:Jt,removeDeviceTag:Ot,removeServerCommand:async function(t,e){return vt(`${bt}/api/devices/${encodeURIComponent(t)}/server-commands/${encodeURIComponent(e)}`,{method:"DELETE"})},removeServerSensor:async function(t,e){return vt(`${bt}/api/devices/${encodeURIComponent(t)}/server-sensors/${encodeURIComponent(e)}`,{method:"DELETE"})},renameTag:It,saveLayout:Et,sendCommand:Tt,setDeviceInterval:async function(t,e){return vt(`${bt}/api/devices/${encodeURIComponent(t)}/config-interval`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({interval:e})})},unhideAttribute:wt,unhideCommand:St,updateDeviceSettings:qt,updateGroup:Gt,updateSettings:Rt});class Yt extends dt{static properties={currentView:{type:String}};static styles=[ct,r`
    /* ── Desktop top bar ── */
    :host {
      display: block;
      background: #0d0d1f;
      border-bottom: 1px solid rgba(255,255,255,0.05);
    }
    nav {
      display: flex;
      align-items: center;
      padding: 0 20px;
      height: 56px;
      max-width: 1400px;
      margin: 0 auto;
    }
    .logo {
      font-size: 18px;
      font-weight: 700;
      color: var(--accent, #00D4FF);
      margin-right: 32px;
    }
    .nav-links {
      display: flex;
      gap: 4px;
    }
    button {
      background: none;
      border: none;
      color: #fff;
      padding: 8px 16px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.2s;
    }
    button:hover {
      color: rgba(255,255,255,0.8);
      background: rgba(255,255,255,0.05);
    }
    button.active {
      color: var(--accent, #00D4FF);
      background: rgba(0,212,255,0.1);
    }
    .version {
      font-size: 10px;
      color: #666;
      margin-left: auto;
    }

    /* ── Mobile header (simple logo bar) ── */
    .mobile-header {
      display: none;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;
      height: 48px;
      background: #0d0d1f;
      border-bottom: 1px solid rgba(255,255,255,0.05);
    }
    .mobile-header .logo {
      margin-right: 0;
    }
    .mobile-header .version {
      font-size: 10px;
      color: rgba(255,255,255,0.3);
    }

    /* ── Mobile bottom tab bar ── */
    .bottom-bar {
      display: none;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: calc(56px + env(safe-area-inset-bottom));
      padding-bottom: env(safe-area-inset-bottom);
      background: #0d0d1f;
      border-top: 1px solid rgba(255,255,255,0.08);
      z-index: 1000;
      justify-content: space-around;
      align-items: stretch;
    }
    .tab {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 4px;
      background: none;
      border: none;
      color: rgba(255,255,255,0.45);
      cursor: pointer;
      font-size: 11px;
      font-family: inherit;
      padding: 0;
      transition: color 0.2s;
    }
    .tab svg {
      width: 24px;
      height: 24px;
      fill: currentColor;
    }
    .tab.active {
      color: var(--accent, #00D4FF);
    }
    .tab:hover {
      color: rgba(255,255,255,0.8);
    }

    /* ── Switch layouts at 768px ── */
    @media (max-width: 768px) {
      nav {
        display: none;
      }
      .mobile-header {
        display: flex;
      }
      .bottom-bar {
        display: flex;
      }
    }
  `];render(){return B`
      <!-- Desktop top bar -->
      <nav role="navigation" aria-label="Main navigation">
        <span class="logo">Network Monitor</span>
        <div class="nav-links">
          <button
            class=${"dashboard"===this.currentView?"active":""}
            aria-current=${"dashboard"===this.currentView?"page":"false"}
            @click=${()=>this._navigate("dashboard")}
          >Devices</button>
          <button
            class=${"topology"===this.currentView?"active":""}
            aria-current=${"topology"===this.currentView?"page":"false"}
            @click=${()=>this._navigate("topology")}
          >Topology</button>
          <button
            class=${"settings"===this.currentView?"active":""}
            aria-current=${"settings"===this.currentView?"page":"false"}
            @click=${()=>this._navigate("settings")}
          >Settings</button>
        </div>
        <span class="version">v0.2.1 build ${"4/4 15:09"}</span>
      </nav>

      <!-- Mobile simple header -->
      <div class="mobile-header" aria-hidden="true">
        <span class="logo">Network Monitor</span>
        <span class="version">build ${"4/4 15:09"}</span>
      </div>

      <!-- Mobile bottom tab bar -->
      <nav class="bottom-bar" role="navigation" aria-label="Main navigation">
        <button
          class="tab ${"dashboard"===this.currentView?"active":""}"
          aria-current=${"dashboard"===this.currentView?"page":"false"}
          @click=${()=>this._navigate("dashboard")}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 3h8v8H3V3zm0 10h8v8H3v-8zm10-10h8v8h-8V3zm0 10h8v8h-8v-8z"/>
          </svg>
          Devices
        </button>
        <button
          class="tab ${"topology"===this.currentView?"active":""}"
          aria-current=${"topology"===this.currentView?"page":"false"}
          @click=${()=>this._navigate("topology")}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm-7 9a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm14 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM5.24 13.56l1.43-.83A4 4 0 0 0 10 14.9V16a4 4 0 0 0 4 4 4 4 0 0 0 4-4v-1.1a4 4 0 0 0 3.33-2.17l1.43.83A6 6 0 0 1 17 19.93V20a6 6 0 0 1-10 0v-.07a6 6 0 0 1-5.76-5.54l1.43-.83zM12 6a4 4 0 0 0-3.85 2.93L6.72 8.1A6 6 0 0 1 12 4a6 6 0 0 1 5.28 4.1l-1.43.83A4 4 0 0 0 12 6z"/>
          </svg>
          Topology
        </button>
        <button
          class="tab ${"settings"===this.currentView?"active":""}"
          aria-current=${"settings"===this.currentView?"page":"false"}
          @click=${()=>this._navigate("settings")}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19.14 12.94c.04-.3.06-.61.06-.94s-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96a7.02 7.02 0 0 0-1.62-.94l-.36-2.54a.48.48 0 0 0-.48-.41h-3.84a.48.48 0 0 0-.47.41l-.36 2.54a7.1 7.1 0 0 0-1.62.94l-2.39-.96a.48.48 0 0 0-.59.22L2.74 8.87a.47.47 0 0 0 .12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94L2.86 14.52a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.36 1.04.67 1.62.94l.36 2.54c.07.26.29.41.48.41h3.84c.26 0 .45-.18.47-.41l.36-2.54a7.1 7.1 0 0 0 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32a.47.47 0 0 0-.12-.61l-2.01-1.58zM12 15.6a3.6 3.6 0 1 1 0-7.2 3.6 3.6 0 0 1 0 7.2z"/>
          </svg>
          Settings
        </button>
      </nav>
    `}_navigate(t){this.dispatchEvent(new CustomEvent("view-change",{detail:{view:t}}))}}customElements.define("nav-bar",Yt);class Xt extends dt{static properties={selectedTags:{type:Array},_allTags:{type:Array,state:!0},_open:{type:Boolean,state:!0},_showCreate:{type:Boolean,state:!0},_newTagName:{type:String,state:!0},_creating:{type:Boolean,state:!0}};static styles=[ct,r`
    :host { display: inline-block; position: relative; }

    .trigger {
      background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #fff;
      padding: 6px 14px; border-radius: 16px; cursor: pointer; font-size: 13px;
      transition: all 0.2s; display: flex; align-items: center; gap: 6px;
      user-select: none;
    }
    .trigger:hover { background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.8); border-color: rgba(255,255,255,0.15); }
    .trigger.has-selected { border-color: #00D4FF; color: #00D4FF; }
    .arrow { font-size: 10px; }

    .dropdown {
      position: absolute; top: calc(100% + 4px); left: 0;
      background: var(--bg-surface); border: 1px solid var(--border-hover); border-radius: 8px;
      min-width: 200px; max-height: 280px; overflow-y: auto;
      z-index: 200; box-shadow: var(--shadow-dropdown);
    }

    .dropdown-item {
      display: flex; align-items: center; gap: 8px;
      padding: 8px 14px; cursor: pointer; font-size: 13px; color: rgba(255,255,255,0.8);
      transition: background 0.15s;
    }
    .dropdown-item:hover { background: rgba(255,255,255,0.1); }
    .checkbox {
      width: 16px; height: 16px; border: 1.5px solid rgba(255,255,255,0.12); border-radius: 3px;
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
      font-size: 11px; color: #0d0d1f; transition: all 0.15s;
    }
    .dropdown-item.checked .checkbox {
      background: #00D4FF; border-color: #00D4FF;
    }

    .dropdown-divider {
      border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 4px 0;
    }

    .create-row {
      padding: 8px 14px; display: flex; gap: 6px; align-items: center;
    }
    .create-link {
      font-size: 12px; color: #fff; cursor: pointer; transition: color 0.15s;
    }
    .create-link:hover { color: #00D4FF; }

    .create-input {
      flex: 1; background: #0d0d1f; border: 1px solid rgba(255,255,255,0.1);
      border-radius: 4px; color: #fff; padding: 4px 8px;
      font-size: 12px; min-width: 0;
    }
    .create-input:focus { outline: none; border-color: #00D4FF; }
    .create-btn {
      background: #00D4FF; border: none; color: #0d0d1f; padding: 4px 10px;
      border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: 600;
      white-space: nowrap;
    }
    .create-btn:disabled { opacity: 0.5; cursor: default; }
    .cancel-btn {
      background: none; border: none; color: #fff; cursor: pointer;
      font-size: 16px; line-height: 1; padding: 0 2px;
    }
    .cancel-btn:hover { color: rgba(255,255,255,0.8); }

    .empty { padding: 12px 14px; color: #fff; font-size: 12px; text-align: center; }
  `];constructor(){super(),this.selectedTags=[],this._allTags=[],this._open=!1,this._showCreate=!1,this._newTagName="",this._creating=!1,this._onDocClick=this._onDocClick.bind(this)}connectedCallback(){super.connectedCallback(),this._loadTags(),document.addEventListener("click",this._onDocClick)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._onDocClick)}async _loadTags(){try{const t=await Mt();Array.isArray(t)&&(this._allTags=t.map(t=>"string"==typeof t?t:t.tag).sort())}catch(t){console.error("Failed to load tags:",t)}}_onDocClick(t){if(!this._open)return;t.composedPath().includes(this)||(this._open=!1,this._showCreate=!1)}_toggle(t){t.stopPropagation(),this._open=!this._open,this._open||(this._showCreate=!1)}_toggleTag(t){(this.selectedTags||[]).includes(t)?this.dispatchEvent(new CustomEvent("tag-remove",{detail:{tag:t},bubbles:!0,composed:!0})):this.dispatchEvent(new CustomEvent("tag-add",{detail:{tag:t},bubbles:!0,composed:!0}))}async _createTag(){const t=this._newTagName.trim();if(t&&!this._creating){this._creating=!0;try{await Lt(t),await this._loadTags(),this.dispatchEvent(new CustomEvent("tag-add",{detail:{tag:t},bubbles:!0,composed:!0})),this._newTagName="",this._showCreate=!1}catch(t){console.error("Failed to create tag:",t)}finally{this._creating=!1}}}render(){const t=this.selectedTags||[],e=t.length>0;return B`
      <button class="trigger ${e?"has-selected":""}" @click=${this._toggle}>
        Tags${e?` (${t.length})`:""}
        <span class="arrow">${this._open?"▲":"▼"}</span>
      </button>

      ${this._open?B`
        <div class="dropdown" @click=${t=>t.stopPropagation()}>
          ${0!==this._allTags.length||this._showCreate?this._allTags.map(e=>B`
              <div class="dropdown-item ${t.includes(e)?"checked":""}"
                @click=${()=>this._toggleTag(e)}>
                <span class="checkbox">${t.includes(e)?"✓":""}</span>
                ${e}
              </div>
            `):B`<div class="empty">No tags in registry</div>`}

          <hr class="dropdown-divider">

          ${this._showCreate?B`
            <div class="create-row">
              <input class="create-input" type="text" placeholder="New tag name..."
                .value=${this._newTagName}
                @input=${t=>this._newTagName=t.target.value}
                @keydown=${t=>"Enter"===t.key&&this._createTag()}
                autofocus>
              <button class="create-btn" ?disabled=${this._creating||!this._newTagName.trim()}
                @click=${this._createTag}>
                ${this._creating?"...":"Create"}
              </button>
              <button class="cancel-btn" @click=${()=>{this._showCreate=!1,this._newTagName=""}}>&times;</button>
            </div>
          `:B`
            <div class="create-row">
              <span class="create-link" @click=${()=>this._showCreate=!0}>+ Create new tag</span>
            </div>
          `}
        </div>
      `:""}
    `}}customElements.define("tag-picker",Xt);class Kt extends dt{static properties={device:{type:Object},effectiveSettings:{type:Object},haOverrides:{type:Object},groups:{type:Object},cardAttributes:{type:Array},attributeTransforms:{type:Object},groupTransforms:{type:Object},_showHidden:{type:Boolean,state:!0}};static styles=[ct,r`
    /* Attributes + HA exposure */
    .section {
      background: rgba(255,255,255,0.05); border-radius: 8px; padding: 16px;
      margin-bottom: 16px;
    }
    .section-title {
      font-size: 12px; color: #238ecc; text-transform: uppercase;
      letter-spacing: 1px; margin-bottom: 12px; font-weight: 600;
    }
    .attr-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      gap: 12px;
    }
    .attr-tile {
      background: #0d0d1f; border-radius: 8px; padding: 12px;
      position: relative; transition: opacity 0.2s;
    }
    /* dimmed class no longer reduces opacity — toggle is sufficient */
    .attr-tile-top {
      display: flex; justify-content: space-between; align-items: flex-start;
      margin-bottom: 6px;
    }
    .attr-label {
      font-size: 10px; color: #fff; text-transform: uppercase;
      letter-spacing: 0.5px; display: flex; align-items: center; gap: 4px;
    }
    .attr-delete {
      font-size: 14px; color: #fff; cursor: pointer; line-height: 1;
    }
    .attr-delete:hover { color: #ef5350; }
    .attr-val {
      font-size: 18px; font-weight: 700; margin-top: 4px; color: #00D4FF;
      transition: color 0.2s;
    }
    /* dimmed-val no longer changes color — toggle is sufficient */
    .attr-unit { font-size: 11px; color: rgba(255,255,255,0.5); font-weight: 400; }
    .attr-tile.exceeded { border: 1px solid #ffb74d; }
    .attr-tile.critical { border: 1px solid #ef5350; }
    .attr-val.exceeded-val { color: #ffb74d; }
    .attr-val.critical-val { color: #ef5350; }
    .attr-thresholds {
      margin-top: 8px; padding-top: 6px; border-top: 1px solid rgba(255,255,255,0.05);
      display: flex; flex-direction: column; gap: 4px;
    }
    .attr-threshold-row {
      display: flex; align-items: center; gap: 4px;
    }
    .threshold-label {
      font-size: 11px; text-transform: uppercase;
      letter-spacing: 0.5px; width: 36px; flex-shrink: 0; font-weight: 600;
    }
    .threshold-label.warn { color: rgba(255,183,77,0.7); }
    .threshold-label.crit { color: rgba(239,83,80,0.7); }
    .threshold-op {
      background: #0d0d1f; border: none; border-radius: 3px;
      color: rgba(255,255,255,0.5); padding: 2px 4px; font-size: 11px; cursor: pointer;
      appearance: none; -webkit-appearance: none; -moz-appearance: none;
    }
    .threshold-op option { background: #0d0d1f; color: #fff; }
    .threshold-op:hover, .threshold-op:focus { outline: none; color: #00D4FF; }
    .threshold-inline {
      width: 44px; background: none; border: none; border-bottom: 1px solid rgba(255,255,255,0.1);
      color: rgba(255,255,255,0.5); padding: 2px 2px; font-size: 11px;
      text-align: center;
    }
    .threshold-inline:focus { outline: none; border-bottom-color: #00D4FF; color: #fff; }
    .threshold-inline::placeholder { color: rgba(255,255,255,0.15); }
    .threshold-source {
      font-size: 8px; color: rgba(255,255,255,0.2); margin-left: auto;
    }

    /* Transform select */
    .attr-transform {
      margin-top: 6px; padding-top: 4px; border-top: 1px solid rgba(255,255,255,0.05);
      display: flex; align-items: center; gap: 4px;
    }
    .transform-select {
      flex: 1; min-width: 0; background: #0d0d1f; border: 1px solid rgba(255,255,255,0.08);
      border-radius: 4px; color: rgba(255,255,255,0.5); padding: 2px 4px;
      font-size: 10px; cursor: pointer;
      appearance: none; -webkit-appearance: none; -moz-appearance: none;
    }
    .transform-select option { background: #0d0d1f; color: #fff; }
    .transform-select:hover, .transform-select:focus { outline: none; border-color: #00D4FF; color: #fff; }
    .transform-label {
      font-size: 8px; color: rgba(255,255,255,0.3); text-transform: uppercase;
      letter-spacing: 0.3px; white-space: nowrap;
    }
    .transform-source {
      font-size: 8px; color: rgba(255,255,255,0.25); font-style: italic; white-space: nowrap;
    }

    /* Pin icon */
    .attr-pin {
      font-size: 10px; cursor: pointer; opacity: 0.3;
      transition: opacity 0.15s; line-height: 1; user-select: none;
    }
    .attr-pin:hover { opacity: 0.7; }
    .attr-pin.pinned { opacity: 1; }

    /* Toggle switch */
    .toggle-wrap { cursor: pointer; flex-shrink: 0; }
    .toggle {
      width: 32px; height: 18px; border-radius: 9px; position: relative;
      transition: background 0.2s;
    }
    .toggle.on  { background: #00D4FF; }
    .toggle.off { background: #444; }
    .toggle-knob {
      width: 14px; height: 14px; border-radius: 50%; background: #fff;
      position: absolute; top: 2px; transition: left 0.2s;
    }
    .toggle.on  .toggle-knob { left: 16px; }
    .toggle.off .toggle-knob { left: 2px; }

    @media (max-width: 768px) {
      .attr-grid { grid-template-columns: 1fr; }
    }
  `];constructor(){super(),this.device=null,this.effectiveSettings=null,this.haOverrides={},this.groups={},this.cardAttributes=[],this.attributeTransforms={},this.groupTransforms={},this._showHidden=!1}_isExposed(t){if(void 0!==this.haOverrides[t])return this.haOverrides[t];const e=this.effectiveSettings;return void 0===e?.ha_exposure_overrides?.[t]||e.ha_exposure_overrides[t]}_getThresholdForAttr(t){const e=this.effectiveSettings;if(!e)return null;const o=(e.thresholds||{})[t];if(null==o)return null;const s="object"==typeof o?o.value:o;if(null==s)return null;const i=this.device?.threshold_overrides||{},r=this.device?.group_policy,n=r?this.groups[r]:null;let a="global";return null!=i[t]?a="device":null!=n?.thresholds?.[t]&&(a="Group Policy"),{value:s,source:a}}_checkThreshold(t,e){if(!e||null==t||"number"!=typeof t)return!1;const o="object"==typeof e?e.value:e,s="object"==typeof e&&e.op||">";if(null==o)return!1;switch(s){case">":default:return t>o;case"<":return t<o;case">=":return t>=o;case"<=":return t<=o;case"==":return t===o;case"!=":return t!==o}}_getThresholdOp(t){const e=(this.device?.threshold_overrides||{})[t];if(null!=e&&"object"==typeof e)return e.op||">";const o=this.effectiveSettings;if(!o)return">";const s=(o.thresholds||{})[t];return null!=s&&"object"==typeof s&&s.op||">"}_getThresholdVal(t){const e=(this.device?.threshold_overrides||{})[t];if(null!=e)return"object"==typeof e?e.value:e;const o=this._getThresholdForAttr(t);return o?o.value:null}_getCritThresholdOp(t){const e=(this.device?.crit_threshold_overrides||{})[t];return null!=e&&"object"==typeof e&&e.op||">"}_getCritThresholdVal(t){const e=(this.device?.crit_threshold_overrides||{})[t];return null!=e?"object"==typeof e?e.value:e:null}render(){if(!this.device)return B``;const t=Object.entries(this.device.attributes||{}).sort(([t],[e])=>t.localeCompare(e)),e=this.device.hidden_attributes||[],o=t.filter(([t])=>!e.includes(t)),s=t.filter(([t])=>e.includes(t));return 0===t.length?B``:B`
      <div class="section">
        <div class="section-title">Attributes</div>
        <div class="attr-grid">
          ${o.map(([t,e])=>this._renderAttrTile(t,e))}
        </div>
        ${s.length>0?B`
          <div style="margin-top: 12px;">
            <div style="font-size: 10px; color: #fff; margin-bottom: 6px; cursor: pointer;"
              @click=${()=>this._showHidden=!this._showHidden}>
              ${this._showHidden?"▾":"▸"} ${s.length} hidden attribute${1!==s.length?"s":""}
            </div>
            ${this._showHidden?B`
              <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                ${s.map(([t])=>B`
                  <span style="font-size: 11px; background: #0d0d1f; color: #fff; padding: 3px 10px; border-radius: 4px; display: flex; align-items: center; gap: 4px;">
                    ${t.replace(/_/g," ")}
                    <span style="cursor: pointer; color: #00D4FF; font-size: 10px;"
                      @click=${()=>this._onUnhide(t)}>show</span>
                  </span>
                `)}
              </div>
            `:""}
          </div>
        `:""}
      </div>
    `}_renderAttrTile(t,e){const o=this._isExposed(t),s=this._getThresholdForAttr(t),i=null!=e.value?e.value:null,r=(this.device?.threshold_overrides||{})[t],n=null!=r?r:s?s.value:null,a=this._checkThreshold(i,n),d=this._getThresholdOp(t),l=this._getThresholdVal(t),c=(this.cardAttributes||[]).includes(t),p=(this.attributeTransforms||{})[t]||"",h=this._getCritThresholdOp(t),u=this._getCritThresholdVal(t),g=this.device?.crit_threshold_overrides||{},m=null!=g[t]?g[t]:null,f=this._checkThreshold(i,m),b=f?"critical-val":a?"exceeded-val":"";return B`
      <div class="attr-tile ${o?"":"dimmed"} ${f?"critical":a?"exceeded":""}">
        <div class="attr-tile-top">
          <span class="attr-label">${t.replace(/_/g," ")}
            <span class="attr-pin ${c?"pinned":""}"
              title="${c?"Unpin from card":"Pin to card"}"
              @click=${e=>{e.stopPropagation(),this._togglePin(t)}}>&#x1F4CC;</span>
            <span class="attr-delete" title="Remove attribute"
              @click=${()=>this._onDelete(t)}>&times;</span>
          </span>
          <span class="toggle-wrap"
            role="switch"
            aria-checked=${o?"true":"false"}
            aria-label="Expose ${t.replace(/_/g," ")} to Home Assistant"
            tabindex="0"
            @click=${()=>this._onToggleExposure(t)}
            @keydown=${e=>("Enter"===e.key||" "===e.key)&&this._onToggleExposure(t)}>
            <div class="toggle ${o?"on":"off"}">
              <div class="toggle-knob"></div>
            </div>
          </span>
        </div>
        <div class="attr-val ${o?"":"dimmed-val"} ${b}">
          ${this._formatValue(i,e.unit,p)}
        </div>
        <div class="attr-thresholds">
          <div class="attr-threshold-row">
            ${a?B`<span style="color: #ffb74d; font-size: 11px;">\u26A0</span>`:""}
            <span class="threshold-label warn">warn</span>
            <select class="threshold-op"
              aria-label="Warning threshold operator for ${t.replace(/_/g," ")}"
              .value=${d}
              @change=${e=>this._onThresholdChange(t,l,e.target.value)}>
              <option value=">">&gt;</option>
              <option value="<">&lt;</option>
              <option value=">=">&gt;=</option>
              <option value="<=">&lt;=</option>
              <option value="==">==</option>
              <option value="!=">!=</option>
            </select>
            <input class="threshold-inline" type="number"
              aria-label="Warning threshold value for ${t.replace(/_/g," ")}"
              placeholder="\u2014"
              .value=${null!=l?String(l):""}
              @change=${e=>this._onThresholdChange(t,e.target.value,d)}>
            ${s&&"device"!==s.source&&null==r?B`
              <span class="threshold-source">${s.source}</span>
            `:""}
          </div>
          <div class="attr-threshold-row">
            ${f?B`<span style="color: #ef5350; font-size: 11px;">\u26A0</span>`:""}
            <span class="threshold-label crit">crit</span>
            <select class="threshold-op"
              aria-label="Critical threshold operator for ${t.replace(/_/g," ")}"
              .value=${h}
              @change=${e=>this._onCritThresholdChange(t,u,e.target.value)}>
              <option value=">">&gt;</option>
              <option value="<">&lt;</option>
              <option value=">=">&gt;=</option>
              <option value="<=">&lt;=</option>
              <option value="==">==</option>
              <option value="!=">!=</option>
            </select>
            <input class="threshold-inline" type="number"
              aria-label="Critical threshold value for ${t.replace(/_/g," ")}"
              placeholder="\u2014"
              .value=${null!=u?String(u):""}
              @change=${e=>this._onCritThresholdChange(t,e.target.value,h)}>
          </div>
        </div>
        <div class="attr-transform">
          <div class="transform-label">Transform</div>
          <select class="transform-select"
            aria-label="Value transform for ${t.replace(/_/g," ")}"
            .value=${p}
            @change=${e=>this._onTransformChange(t,e.target.value)}>
            ${mt().map(t=>B`
              <option value=${t.value} ?selected=${t.value===p}>${t.label}</option>
            `)}
          </select>
          ${(this.groupTransforms||{})[t]&&!(this.device?.attribute_transforms||{})[t]?B`<span class="transform-source">Group Policy</span>`:""}
        </div>
      </div>
    `}_onDelete(t){this.dispatchEvent(new CustomEvent("attribute-deleted",{detail:{name:t},bubbles:!0,composed:!0}))}_onUnhide(t){this.dispatchEvent(new CustomEvent("attribute-unhidden",{detail:{name:t},bubbles:!0,composed:!0}))}_onToggleExposure(t){this.dispatchEvent(new CustomEvent("ha-exposure-toggled",{detail:{name:t},bubbles:!0,composed:!0}))}_onThresholdChange(t,e,o){this.dispatchEvent(new CustomEvent("threshold-changed",{detail:{name:t,value:e,op:o},bubbles:!0,composed:!0}))}_onCritThresholdChange(t,e,o){this.dispatchEvent(new CustomEvent("crit-threshold-changed",{detail:{name:t,value:e,op:o},bubbles:!0,composed:!0}))}_formatValue(t,e,o){if(null==t)return"—";if(o){return ht(t,o)}return B`${t}<span class="attr-unit">${e||""}</span>`}_onTransformChange(t,e){this.dispatchEvent(new CustomEvent("transform-changed",{detail:{attr:t,transform:e||null},bubbles:!0,composed:!0}))}_togglePin(t){this.dispatchEvent(new CustomEvent("pin-attribute",{detail:{name:t,pinned:!(this.cardAttributes||[]).includes(t)},bubbles:!0,composed:!0}))}}customElements.define("device-attributes",Kt);const Zt=["shutdown","halt","poweroff","destroy"];class Qt extends dt{static properties={device:{type:Object},serverCommands:{type:Object},commandResult:{type:String},_showHiddenCmds:{type:Boolean,state:!0},_showAddCommand:{type:Boolean,state:!0},_editingCommandName:{type:String,state:!0},_editCommandForm:{type:Object,state:!0}};static styles=[ct,r`
    .section {
      background: rgba(255,255,255,0.05); border-radius: 8px; padding: 16px;
      margin-bottom: 16px;
    }
    .section-title {
      font-size: 12px; color: #238ecc; text-transform: uppercase;
      letter-spacing: 1px; margin-bottom: 12px; font-weight: 600;
    }
    .commands { display: flex; gap: 6px; flex-wrap: wrap; }
    .cmd-wrap {
      display: inline-flex; position: relative;
    }
    .cmd-btn {
      background: rgba(255,255,255,0.1); border: none; color: rgba(255,255,255,0.8); padding: 8px 14px;
      border-radius: 6px; cursor: pointer; font-size: 13px; transition: all 0.2s;
    }
    .cmd-btn:hover { background: rgba(255,255,255,0.15); }
    .cmd-btn.danger { background: #5a2a2a; color: #ef5350; }
    .cmd-btn.danger:hover { background: #6a3a3a; }
    .cmd-eye {
      position: absolute; top: -4px; right: -4px;
      background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 50%;
      width: 16px; height: 16px; display: flex; align-items: center;
      justify-content: center; cursor: pointer; font-size: 9px;
      color: #fff; transition: all 0.15s; line-height: 1;
    }
    .cmd-eye:hover { color: #00D4FF; border-color: #00D4FF; background: rgba(0,212,255,0.1); }
    .cmd-result {
      margin-top: 8px; padding: 8px 12px; background: #0d0d1f;
      border-radius: 4px; font-size: 12px; color: #fff; font-family: monospace;
    }
    .sensor-table { width: 100%; border-collapse: collapse; margin-bottom: 12px; }
    .sensor-table th {
      text-align: left; font-size: 10px; color: #fff; text-transform: uppercase;
      letter-spacing: 0.5px; padding: 6px 8px; border-bottom: 1px solid rgba(255,255,255,0.1);
    }
    .sensor-table td {
      font-size: 12px; color: rgba(255,255,255,0.8); padding: 7px 8px; border-bottom: 1px solid rgba(255,255,255,0.05);
    }
    .sensor-table td.mono { font-family: monospace; font-size: 11px; }
    .sensor-table tr:last-child td { border-bottom: none; }
    .sensor-actions { display: flex; gap: 4px; }
    .sensor-btn {
      background: none; border: none; cursor: pointer; font-size: 11px;
      padding: 2px 6px; border-radius: 3px; transition: all 0.15s;
    }
    .sensor-btn.edit   { color: #00D4FF; }
    .sensor-btn.edit:hover  { background: rgba(0,212,255,0.1); }
    .sensor-btn.remove { color: #fff; }
    .sensor-btn.remove:hover { color: #ef5350; background: rgba(239,83,80,0.1); }
    .sensor-form {
      background: #0d0d1f; border-radius: 6px; padding: 14px; margin-bottom: 12px;
    }
    .sensor-form-grid {
      display: grid; grid-template-columns: 1fr 2fr; gap: 8px; margin-bottom: 10px;
    }
    .sensor-form-grid input {
      background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 4px;
      color: #fff; padding: 5px 8px; font-size: 12px;
    }
    .sensor-form-grid input:focus { outline: none; border-color: #00D4FF; }
    .sensor-form-grid input::placeholder { color: #fff; }
    .sensor-form-actions { display: flex; gap: 6px; }
    .form-btn {
      border: none; padding: 5px 14px; border-radius: 4px; cursor: pointer; font-size: 12px;
    }
    .form-btn.save   { background: #00D4FF; color: #0d0d1f; font-weight: 600; }
    .form-btn.cancel { background: rgba(255,255,255,0.1); color: #fff; }
    .add-btn {
      background: none; border: 1px dashed rgba(255,255,255,0.1); color: #fff; padding: 6px 14px;
      border-radius: 6px; cursor: pointer; font-size: 12px; transition: all 0.15s;
      margin-top: 8px;
    }
    .add-btn:hover { border-color: #00D4FF; color: #00D4FF; }

    @media (max-width: 768px) {
      .commands { grid-template-columns: 1fr; }
    }
  `];constructor(){super(),this.device=null,this.serverCommands={},this.commandResult="",this._showHiddenCmds=!1,this._showAddCommand=!1,this._editingCommandName=null,this._editCommandForm=null}render(){if(!this.device)return B``;const t=this.device.allowed_commands||[],e=this.serverCommands||{},o=Object.keys(e),s=[...new Set([...t,...o])],i=this.device.hidden_commands||[],r=s.filter(t=>!i.includes(t)),n=s.filter(t=>i.includes(t)),a=(this.device.active_plugins||[]).includes("custom_command");return B`
      <div class="section">
        <div class="section-title">Commands</div>

        ${r.length>0?B`
          <div class="commands" style="margin-bottom: 12px;">
            ${r.map(t=>B`
              <span class="cmd-wrap">
                <button class="cmd-btn ${function(t){const e=t.toLowerCase();return Zt.some(t=>e.includes(t))}(t)?"danger":""}"
                  @click=${()=>this._onSend(t)}>${t}</button>
                <span class="cmd-eye" title="Hide command"
                  @click=${e=>{e.stopPropagation(),this._onHide(t)}}>&#128065;</span>
              </span>
            `)}
          </div>
        `:""}
        ${this.commandResult?B`<div class="cmd-result">${this.commandResult}</div>`:""}

        ${o.length>0?B`
          <div style="margin-top: 8px; font-size: 11px; color: #fff; margin-bottom: 6px;">Server-managed commands</div>
          <table class="sensor-table">
            <thead><tr><th>Name</th><th>Shell Command</th><th></th></tr></thead>
            <tbody>
              ${Object.entries(e).map(([t,e])=>B`
                <tr>
                  <td>${t}</td>
                  <td class="mono">${e}</td>
                  <td>
                    <div class="sensor-actions">
                      ${a?B`<button class="sensor-btn edit" @click=${()=>this._startEdit(t,e)}>Edit</button>`:""}
                      <button class="sensor-btn remove" @click=${()=>this._onRemove(t)}>Delete</button>
                    </div>
                  </td>
                </tr>
              `)}
            </tbody>
          </table>
        `:""}

        ${a&&(this._editingCommandName||this._showAddCommand)?B`
          <div class="sensor-form" style="margin-top: 8px;">
            <div class="sensor-form-grid">
              <input type="text" placeholder="Command name"
                .value=${this._editCommandForm?.name||""}
                ?disabled=${!!this._editingCommandName}
                @input=${t=>this._editCommandForm={...this._editCommandForm,name:t.target.value}}>
              <input type="text" placeholder="Shell command (e.g. notify-send 'Hello')"
                .value=${this._editCommandForm?.shell||""}
                @input=${t=>this._editCommandForm={...this._editCommandForm,shell:t.target.value}}
                @keydown=${t=>"Enter"===t.key&&this._saveForm()}>
            </div>
            <div class="sensor-form-actions">
              <button class="form-btn save" @click=${this._saveForm}>${this._editingCommandName?"Update":"Add"}</button>
              <button class="form-btn cancel" @click=${this._cancelForm}>Cancel</button>
            </div>
          </div>
        `:a?B`
          <button class="add-btn" @click=${this._startAdd}>+ Add Command</button>
        `:""}

        ${n.length>0?B`
          <div style="margin-top: 12px;">
            <div style="font-size: 10px; color: #fff; margin-bottom: 6px; cursor: pointer;"
              @click=${()=>this._showHiddenCmds=!this._showHiddenCmds}>
              ${this._showHiddenCmds?"▾":"▸"} ${n.length} hidden
            </div>
            ${this._showHiddenCmds?B`
              <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                ${n.map(t=>B`
                  <span style="font-size: 11px; background: #0d0d1f; color: #fff; padding: 3px 10px; border-radius: 4px; display: flex; align-items: center; gap: 6px;">
                    ${t}
                    <span style="cursor: pointer; color: #00D4FF; font-size: 10px;"
                      @click=${()=>this._onUnhide(t)}>show</span>
                  </span>
                `)}
              </div>
            `:""}
          </div>
        `:""}
      </div>
    `}_startAdd(){this._showAddCommand=!0,this._editingCommandName=null,this._editCommandForm={name:"",shell:""}}_startEdit(t,e){this._editingCommandName=t,this._showAddCommand=!1,this._editCommandForm={name:t,shell:e}}_saveForm(){const t=this._editCommandForm;if(!t)return;const e=(t.name||"").trim(),o=(t.shell||"").trim();e&&o&&(this.dispatchEvent(new CustomEvent("server-command-save",{detail:{name:e,shell:o,editing:this._editingCommandName},bubbles:!0,composed:!0})),this._cancelForm())}_cancelForm(){this._showAddCommand=!1,this._editingCommandName=null,this._editCommandForm=null}_onSend(t){this.dispatchEvent(new CustomEvent("command-send",{detail:{command:t},bubbles:!0,composed:!0}))}_onHide(t){this.dispatchEvent(new CustomEvent("command-hide",{detail:{name:t},bubbles:!0,composed:!0}))}_onUnhide(t){this.dispatchEvent(new CustomEvent("command-unhide",{detail:{name:t},bubbles:!0,composed:!0}))}_onRemove(t){this.dispatchEvent(new CustomEvent("server-command-remove",{detail:{name:t},bubbles:!0,composed:!0}))}}customElements.define("device-commands",Qt);class te extends dt{static properties={device:{type:Object},configInterval:{type:Number},customSensors:{type:Object},_showAddSensor:{type:Boolean,state:!0},_editSensorKey:{type:String,state:!0},_sensorForm:{type:Object,state:!0}};static styles=[ct,r`
    .section {
      background: rgba(255,255,255,0.05); border-radius: 8px; padding: 16px;
      margin-bottom: 16px;
    }
    .section-title {
      font-size: 12px; color: #238ecc; text-transform: uppercase;
      letter-spacing: 1px; margin-bottom: 12px; font-weight: 600;
    }

    .config-row { display: flex; gap: 10px; align-items: center; margin-bottom: 14px; }
    .config-label { font-size: 12px; color: #fff; min-width: 120px; }
    .config-input {
      background: #0d0d1f; border: 1px solid rgba(255,255,255,0.1); border-radius: 4px;
      color: #fff; padding: 5px 10px; font-size: 13px; width: 100px;
    }
    .config-input:focus { outline: none; border-color: #00D4FF; }
    .plugins-list { display: flex; gap: 6px; flex-wrap: wrap; }
    .plugin-badge {
      background: #0d0d1f; color: #fff; padding: 3px 10px;
      border-radius: 4px; font-size: 11px;
    }

    /* Sensor table */
    .sensor-table { width: 100%; border-collapse: collapse; margin-bottom: 12px; }
    .sensor-table th {
      text-align: left; font-size: 10px; color: #fff; text-transform: uppercase;
      letter-spacing: 0.5px; padding: 6px 8px; border-bottom: 1px solid rgba(255,255,255,0.1);
    }
    .sensor-table td {
      font-size: 12px; color: rgba(255,255,255,0.8); padding: 7px 8px; border-bottom: 1px solid rgba(255,255,255,0.05);
      font-family: monospace;
    }
    .sensor-table tr:last-child td { border-bottom: none; }
    .sensor-actions { display: flex; gap: 4px; }
    .sensor-btn {
      background: none; border: none; cursor: pointer; font-size: 11px;
      padding: 2px 6px; border-radius: 3px; transition: all 0.15s;
    }
    .sensor-btn.edit   { color: #00D4FF; }
    .sensor-btn.edit:hover  { background: rgba(0,212,255,0.1); }
    .sensor-btn.remove { color: #fff; }
    .sensor-btn.remove:hover { color: #ef5350; background: rgba(239,83,80,0.1); }

    /* Sensor form */
    .sensor-form {
      background: #0d0d1f; border-radius: 6px; padding: 14px; margin-bottom: 12px;
    }
    .sensor-form-grid {
      display: grid; grid-template-columns: 1fr 2fr 80px 80px; gap: 8px; margin-bottom: 10px;
    }
    .sensor-form-grid input {
      background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 4px;
      color: #fff; padding: 5px 8px; font-size: 12px;
    }
    .sensor-form-grid input:focus { outline: none; border-color: #00D4FF; }
    .sensor-form-grid input::placeholder { color: #fff; }
    .sensor-form-actions { display: flex; gap: 6px; }
    .form-btn {
      border: none; padding: 5px 14px; border-radius: 4px; cursor: pointer; font-size: 12px;
    }
    .form-btn.save   { background: #00D4FF; color: #0d0d1f; font-weight: 600; }
    .form-btn.cancel { background: rgba(255,255,255,0.1); color: #fff; }

    /* cmd-btn (used for Add Sensor button) */
    .cmd-btn {
      background: rgba(255,255,255,0.1); border: none; color: rgba(255,255,255,0.8); padding: 8px 16px;
      border-radius: 6px; cursor: pointer; font-size: 13px; transition: all 0.2s;
    }
    .cmd-btn:hover { background: rgba(255,255,255,0.15); }

    /* Push config */
    .push-row { display: flex; align-items: center; gap: 12px; margin-top: 14px; flex-wrap: wrap; }
    .push-btn {
      background: #2e7d32; border: none; color: #fff; padding: 8px 20px;
      border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 600;
      transition: all 0.2s;
    }
    .push-btn:hover    { background: #388e3c; }
    .push-btn:disabled { opacity: 0.5; cursor: default; }
    .push-status        { font-size: 12px; color: #fff; }
    .push-status.synced { color: #04d65c; }
    .push-status.pending{ color: #ffb74d; }

    @media (max-width: 768px) {
      .sensor-table { font-size: 11px; }
      .sensor-form-grid { flex-direction: column; }
      .sensor-form-grid input { width: 100%; box-sizing: border-box; }
    }
  `];constructor(){super(),this.device=null,this.configInterval=30,this.customSensors={},this.pushing=!1,this.pushStatus="",this.lastPushed="",this._showAddSensor=!1,this._editSensorKey=null,this._sensorForm={name:"",command:"",interval:30,unit:""}}render(){if(!this.device)return B``;const t=this.device.remote_config||{},e=this.device.active_plugins||(t.plugins?Object.keys(t.plugins):[]),o=this.customSensors;return B`
      <div class="section">
        <div class="section-title">Agent Configuration</div>

        <div class="config-row">
          <span class="config-label">Collection interval</span>
          <input class="config-input" type="number" min="5"
            .value=${String(this.configInterval)}
            @input=${t=>this._onIntervalChange(Number(t.target.value))}>
          <span style="font-size: 12px; color: #fff; margin-left: 4px;">seconds</span>
        </div>

        ${e.length>0?B`
          <div class="config-row">
            <span class="config-label">Active plugins</span>
            <div class="plugins-list">
              ${e.map(t=>B`<span class="plugin-badge">${t}</span>`)}
            </div>
          </div>
        `:""}

        <div style="margin-bottom: 10px;">
          <div class="section-title" style="margin-bottom: 8px;">Custom Sensors</div>
          ${Object.keys(o).length>0?B`
            <table class="sensor-table">
              <thead>
                <tr>
                  <th>Name</th><th>Command</th><th>Interval</th><th>Unit</th><th></th>
                </tr>
              </thead>
              <tbody>
                ${Object.entries(o).map(([t,e])=>B`
                  <tr>
                    <td>${t}</td>
                    <td>${e.command}</td>
                    <td>${e.interval}s</td>
                    <td>${e.unit||"—"}</td>
                    <td>
                      <div class="sensor-actions">
                        <button class="sensor-btn edit"   @click=${()=>this._startEdit(t,e)}>Edit</button>
                        <button class="sensor-btn remove" @click=${()=>this._onRemove(t)}>Remove</button>
                      </div>
                    </td>
                  </tr>
                `)}
              </tbody>
            </table>
          `:B`<div style="font-size: 13px; color: #fff; margin-bottom: 10px;">No custom sensors</div>`}

          ${this._showAddSensor||this._editSensorKey?this._renderSensorForm():B`
            <button class="cmd-btn" style="font-size: 12px; padding: 5px 12px;"
              @click=${this._startAdd}>+ Add Sensor</button>
          `}
        </div>


      </div>
    `}_renderSensorForm(){const t=this._sensorForm;return B`
      <div class="sensor-form">
        <div class="sensor-form-grid">
          <input type="text" placeholder="Name (e.g. ping_gw)"
            .value=${t.name}
            @input=${e=>this._sensorForm={...t,name:e.target.value}}>
          <input type="text" placeholder="Command (e.g. ping -c1 10.0.0.1)"
            .value=${t.command}
            @input=${e=>this._sensorForm={...t,command:e.target.value}}>
          <input type="number" placeholder="60"
            .value=${String(t.interval)}
            @input=${e=>this._sensorForm={...t,interval:Number(e.target.value)}}>
          <input type="text" placeholder="Unit"
            .value=${t.unit}
            @input=${e=>this._sensorForm={...t,unit:e.target.value}}>
        </div>
        <div class="sensor-form-actions">
          <button class="form-btn save"   @click=${this._saveForm}>Save</button>
          <button class="form-btn cancel" @click=${this._cancelForm}>Cancel</button>
        </div>
      </div>
    `}_startAdd(){this._showAddSensor=!0,this._editSensorKey=null,this._sensorForm={name:"",command:"",interval:30,unit:""}}_startEdit(t,e){this._editSensorKey=t,this._showAddSensor=!1,this._sensorForm={name:t,command:e.command,interval:e.interval||30,unit:e.unit||""}}_saveForm(){const{name:t,command:e,interval:o,unit:s}=this._sensorForm;t.trim()&&e.trim()&&(this.dispatchEvent(new CustomEvent("sensor-save",{detail:{key:t.trim(),sensor:{command:e,interval:o||30,unit:s},oldKey:this._editSensorKey},bubbles:!0,composed:!0})),this._cancelForm())}_cancelForm(){this._showAddSensor=!1,this._editSensorKey=null,this._sensorForm={name:"",command:"",interval:30,unit:""}}_onIntervalChange(t){this.dispatchEvent(new CustomEvent("interval-changed",{detail:{value:t},bubbles:!0,composed:!0}))}_onRemove(t){this.dispatchEvent(new CustomEvent("sensor-remove",{detail:{key:t},bubbles:!0,composed:!0}))}}customElements.define("device-config",te);class ee extends dt{static properties={deviceId:{type:String},groupId:{type:String},device:{type:Object},commandResult:{type:String},_groups:{type:Object,state:!0},_effectiveSettings:{type:Object,state:!0},_haOverrides:{type:Object,state:!0},_configInterval:{type:Number,state:!0},_customSensors:{type:Object,state:!0},_showGroupDialog:{type:Boolean,state:!0},_newGroupName:{type:String,state:!0},_serverCommands:{type:Object,state:!0}};static styles=[ct,r`
    :host { display: block; padding: 20px; max-width: 1000px; margin: 0 auto; }

    .close-btn {
      background: none; border: none; color: #fff; cursor: pointer;
      font-size: 20px; padding: 4px 8px; line-height: 1; border-radius: 4px;
      transition: all 0.15s;
    }
    .close-btn:hover { color: rgba(255,255,255,0.8); background: rgba(255,255,255,0.05); }

    .header {
      display: flex; justify-content: space-between; align-items: center;
      margin-bottom: 20px;
    }
    .header-left { display: flex; flex-direction: column; gap: 2px; }
    .title       { font-size: 24px; font-weight: 700; }
    .device-type { font-size: 12px; color: #fff; }
    .status-badge { padding: 4px 12px; border-radius: 12px; font-size: 13px; }

    .section {
      background: rgba(255,255,255,0.05); border-radius: 8px; padding: 16px;
      margin-bottom: 16px;
    }
    .section-title {
      font-size: 12px; color: #238ecc; text-transform: uppercase;
      letter-spacing: 1px; margin-bottom: 12px; font-weight: 600;
    }

    /* Tags */
    .tags-row { display: flex; gap: 6px; flex-wrap: wrap; align-items: center; margin-bottom: 10px; }
    .tag { display: flex; align-items: center; gap: 4px; font-size: 11px; padding: 3px 10px; border-radius: 4px; }
    .tag.client { background: rgba(0,212,255,0.15); color: #00D4FF; }
    .tag.server { background: rgba(99,102,241,0.15); color: #238ecc; }
    .tag .remove { cursor: pointer; font-size: 13px; line-height: 1; opacity: 0.6; }
    .tag .remove:hover { opacity: 1; }
    .tag-hint { font-size: 10px; color: #fff; margin-top: 8px; }

    /* Group policy */
    .group-policy-row { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }
    .group-select {
      background: #0d0d1f; border: 1px solid rgba(255,255,255,0.1); border-radius: 6px;
      color: #fff; padding: 6px 12px; font-size: 13px; min-width: 200px;
    }
    .group-select:focus { outline: none; border-color: #00D4FF; }
    .group-threshold-summary {
      font-size: 11px; color: #fff; display: flex; gap: 12px; flex-wrap: wrap;
      margin-top: 8px;
    }
    .group-hint { font-size: 10px; color: #fff; margin-top: 8px; }

    /* Network */
    .network-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 8px;
    }
    .net-item  { font-size: 13px; color: #fff; }
    .net-label { color: #fff; margin-right: 8px; }

    /* Shared cmd-btn used in header and group policy */
    .cmd-btn {
      background: rgba(255,255,255,0.1); border: none; color: rgba(255,255,255,0.8); padding: 8px 16px;
      border-radius: 6px; cursor: pointer; font-size: 13px; transition: all 0.2s;
    }
    .cmd-btn:hover        { background: rgba(255,255,255,0.15); }
    .cmd-btn.danger       { background: #5a2a2a; color: #ef5350; }
    .cmd-btn.danger:hover { background: #6a3a3a; }

    /* Dialog overlay */
    .overlay {
      position: fixed; top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.6); display: flex; align-items: center;
      justify-content: center; z-index: 1000;
    }
    .dialog {
      background: rgba(255,255,255,0.05); border-radius: 12px; padding: 24px;
      min-width: 320px; border: 1px solid rgba(255,255,255,0.1);
    }
    .dialog h3 { color: #fff; margin-bottom: 12px; font-size: 16px; margin-top: 0; }
    .dialog-field { margin-bottom: 12px; }
    .dialog-field label { display: block; font-size: 11px; color: #fff; margin-bottom: 4px; }
    .dialog-field input {
      width: 100%; background: #0d0d1f; border: 1px solid rgba(255,255,255,0.1);
      border-radius: 6px; color: #fff; padding: 8px 12px; font-size: 13px;
      box-sizing: border-box;
    }
    .dialog-field input:focus { outline: none; border-color: #00D4FF; }
    .dialog-buttons { display: flex; gap: 8px; justify-content: flex-end; margin-top: 16px; }
    .dialog-btn { border: none; padding: 8px 18px; border-radius: 6px; cursor: pointer; font-size: 13px; }
    .dialog-btn.save   { background: #00D4FF; color: #0d0d1f; font-weight: 600; }
    .dialog-btn.cancel { background: rgba(255,255,255,0.1); color: #fff; }
  `];constructor(){super(),this.device=null,this.commandResult="",this._groups={},this._effectiveSettings=null,this._haOverrides={},this._configInterval=30,this._customSensors={},this._showGroupDialog=!1,this._newGroupName="",this._serverCommands={}}get _isGroupMode(){return!!this.groupId&&!this.deviceId}connectedCallback(){super.connectedCallback(),this._loadGroups(),this._isGroupMode?this._loadGroupAggregate():this._loadDevice(),this._wsUnsub=pt.onMessage(t=>{if("device_update"===t.type)if(this._isGroupMode){const e=this._groups?.[this.groupId];e&&(e.device_ids||[]).includes(t.device_id)&&this._loadGroupAggregate()}else t.device_id===this.deviceId&&this._updateDeviceData(t.device)})}disconnectedCallback(){super.disconnectedCallback(),this._wsUnsub&&this._wsUnsub()}async _refreshDevice(){try{const t=await xt(this.deviceId);this._updateDeviceData(t)}catch(t){}}_updateDeviceData(t){if(!t)return;const e={...this.device||{},...t};JSON.stringify(this.device)!==JSON.stringify(e)&&(this.device=e)}async _loadGroupAggregate(){try{const t=await Ft();this._groups=t;const e=t[this.groupId];if(!e)return;const o=await _t(),s=e.device_ids||[],i=s.map(t=>o[t]).filter(Boolean),r={};for(const t of i)for(const[e,o]of Object.entries(t.attributes||{}))r[e]||(r[e]={...o});const n=new Set;for(const t of i)for(const e of t.allowed_commands||[])n.add(e);this.device={device_name:e.name,device_type:`Group · ${s.length} device${1!==s.length?"s":""}`,status:i.some(t=>"online"===t.status)?"online":"offline",attributes:r,attribute_transforms:e.attribute_transforms||{},threshold_overrides:e.thresholds||{},crit_threshold_overrides:e.crit_thresholds||{},allowed_commands:[...n],hidden_commands:e.hidden_commands||[],tags:[],server_tags:[],group_policy:this.groupId,_isGroupAggregate:!0},this._configInterval=e.interval??30,this._serverCommands={},this._customSensors=e.custom_sensors||{},this._haOverrides={},this._effectiveSettings=null}catch(t){console.error("Failed to load group aggregate:",t)}}async _loadDevice(){try{this.device=await xt(this.deviceId),this._haOverrides={...this.device.ha_exposure_overrides||{}};const t=this.device.server_commands;this._serverCommands=t&&!Array.isArray(t)?{...t}:{},this._configInterval=this.device.config_interval??this.device.collection_interval??this.device.remote_config?.interval??30;const e=this.device.server_sensors;this._customSensors=e&&"object"==typeof e?{...e}:{};try{this._effectiveSettings=await Vt(this.deviceId)}catch(t){}}catch(t){console.error("Failed to load device:",t)}}async _loadGroups(){try{this._groups=await Ft()}catch(t){console.error("Failed to load groups:",t)}}render(){if(!this.device)return B`<div style="padding: 40px; text-align: center; color: #fff;">Loading...</div>`;const t=this.device,e=this._isGroupMode,o="online"===t.status?"#04d65c":"offline"===t.status?"#ef5350":"#ffb74d";return B`
      <!-- 1. Header -->
      <div class="header">
        <div class="header-left">
          <span class="title">${e?"⚙ ":""}${t.device_name||this.deviceId||this.groupId}</span>
          <span class="device-type">${t.device_type||""}</span>
        </div>
        <div style="display: flex; align-items: center; gap: 10px;">
          ${e?B`
            <span style="font-size: 11px; color: rgba(255,255,255,0.4);">Group Policy Editor</span>
          `:B`
            <span class="status-badge" style="background: ${o}20; color: ${o}">
              ${t.status}
            </span>
            <button class="cmd-btn danger" style="font-size: 11px; padding: 4px 10px;"
              @click=${this._deleteDevice}>Delete</button>
          `}
          <button class="close-btn" @click=${()=>this.dispatchEvent(new CustomEvent("back"))}>&#10005;</button>
        </div>
      </div>

      ${e?"":B`
        <!-- 2. Tags -->
        ${this._renderTagsSection()}
        <!-- 3. Group Policy -->
        ${this._renderGroupPolicy()}
      `}

      <!-- 4. Attributes + HA Exposure + Thresholds -->
      <device-attributes
        .device=${this.device}
        .effectiveSettings=${this._effectiveSettings}
        .haOverrides=${this._haOverrides}
        .groups=${this._groups}
        .cardAttributes=${this.device?.card_attributes||[]}
        .attributeTransforms=${this._effectiveTransforms()}
        .groupTransforms=${this._groupTransforms()}
        @attribute-deleted=${t=>this._deleteAttribute(t.detail.name)}
        @attribute-unhidden=${t=>this._unhideAttribute(t.detail.name)}
        @ha-exposure-toggled=${t=>this._toggleHaExposure(t.detail.name)}
        @threshold-changed=${t=>this._setThreshold(t.detail.name,t.detail.value,t.detail.op)}
        @crit-threshold-changed=${t=>this._setCritThreshold(t.detail.name,t.detail.value,t.detail.op)}
        @pin-attribute=${t=>this._toggleCardAttribute(t.detail)}
        @transform-changed=${t=>this._setAttributeTransform(t.detail.attr,t.detail.transform)}
      ></device-attributes>

      ${e?"":B`
        <!-- 5. Network -->
        ${this._renderNetwork()}
      `}

      <!-- 6. Commands -->
      <device-commands
        .device=${this.device}
        .serverCommands=${e?this._groups?.[this.groupId]?.custom_commands||{}:this._serverCommands}
        .commandResult=${this.commandResult}
        @command-send=${t=>this._sendCmd(t.detail.command)}
        @command-hide=${t=>this._hideCommand(t.detail.name)}
        @command-unhide=${t=>this._unhideCommand(t.detail.name)}
        @server-command-save=${t=>e?this._saveGroupCommand(t.detail):this._saveServerCommand(t.detail)}
        @server-command-remove=${t=>e?this._removeGroupCommand(t.detail.name):this._removeServerCommand(t.detail.name)}
      ></device-commands>

      <!-- 7. Agent Configuration -->
      <device-config
        .device=${this.device}
        .configInterval=${this._configInterval}
        .customSensors=${this._customSensors}
        @interval-changed=${t=>e?this._setGroupInterval(t.detail.value):this._onIntervalChange(t.detail.value)}
        @sensor-save=${t=>e?this._saveGroupSensor(t.detail):this._saveSensor(t.detail)}
        @sensor-remove=${t=>e?this._removeGroupSensor(t.detail.key):this._removeSensor(t.detail.key)}
      ></device-config>

      ${this._showGroupDialog?this._renderGroupDialog():""}
    `}_renderTagsSection(){const t=this.device.tags||[],e=this.device.server_tags||[];return B`
      <div class="section">
        <div class="section-title">Tags</div>
        <div class="tags-row">
          ${t.map(t=>B`<span class="tag client">${t}</span>`)}
          ${e.map(t=>B`
            <span class="tag server">
              ${t}
              <span class="remove" @click=${()=>this._removeTag(t)}>&times;</span>
            </span>
          `)}
          <tag-picker
            .selectedTags=${e}
            @tag-add=${t=>this._addTag(t.detail.tag)}
            @tag-remove=${t=>this._removeTag(t.detail.tag)}
          ></tag-picker>
        </div>
        <div class="tag-hint">
          Client tags (blue) come from the device config. Server tags (purple) are managed here.
        </div>
      </div>
    `}async _addTag(t){t&&(await Pt(this.deviceId,[t]),await this._loadDevice())}async _removeTag(t){await Ot(this.deviceId,t),await this._loadDevice()}_renderGroupPolicy(){const t=Object.values(this._groups),e=this.device.group_policy||"";e&&this._groups[e];return B`
      <div class="section">
        <div class="section-title">Group Policy</div>
        <div class="group-policy-row">
          <select class="group-select"
            .value=${e}
            @change=${this._onGroupPolicyChange}>
            <option value="">None — use global defaults</option>
            ${t.map(t=>B`
              <option value=${t.id} ?selected=${t.id===e}>${t.name}</option>
            `)}
          </select>
        </div>


        <div class="group-hint">
          Group policy sets default thresholds and HA entity settings. Device-level overrides take priority.
          Manage groups in Settings.
        </div>
      </div>
    `}async _onGroupPolicyChange(t){const e=t.target.value||null;try{await qt(this.deviceId,{group_policy:e}),await this._loadDevice()}catch(t){console.error("Failed to update group policy:",t)}}_renderGroupDialog(){return B`
      <div class="overlay" @click=${()=>this._showGroupDialog=!1}>
        <div class="dialog" @click=${t=>t.stopPropagation()}>
          <h3>Create Group</h3>
          <div class="dialog-field">
            <label>Group Name</label>
            <input type="text" placeholder="e.g. Infrastructure, IoT Sensors"
              .value=${this._newGroupName}
              @input=${t=>this._newGroupName=t.target.value}
              @keydown=${t=>"Enter"===t.key&&this._createGroup()}>
          </div>
          <div class="dialog-buttons">
            <button class="dialog-btn cancel" @click=${()=>this._showGroupDialog=!1}>Cancel</button>
            <button class="dialog-btn save"   @click=${this._createGroup}>Create</button>
          </div>
        </div>
      </div>
    `}async _createGroup(){const t=this._newGroupName.trim();if(!t)return;const e=t.toLowerCase().replace(/[^a-z0-9]+/g,"_");await zt(e,t,[this.deviceId]),this._newGroupName="",this._showGroupDialog=!1,await this._loadGroups(),await this._loadDevice()}_renderNetwork(){const t=this.device.network||{};return 0===Object.keys(t).length?B``:B`
      <div class="section">
        <div class="section-title">Network</div>
        <div class="network-grid">
          ${Object.entries(t).map(([t,e])=>B`
            <div class="net-item">
              <span class="net-label">${t}:</span>${e}
            </div>
          `)}
        </div>
      </div>
    `}async _deleteAttribute(t){if(confirm(`Hide attribute "${t}"? Custom sensors will be removed from the client. Built-in attributes will be hidden.`))try{await $t(this.deviceId,t);const e=this.device?.card_attributes||[];if(e.includes(t)){const o=e.filter(e=>e!==t);await qt(this.deviceId,{card_attributes:o})}await this._loadDevice()}catch(t){console.error("Failed to hide attribute:",t)}}async _unhideAttribute(t){try{await wt(this.deviceId,t),await this._loadDevice()}catch(t){console.error("Failed to unhide attribute:",t)}}async _toggleHaExposure(t){const e=void 0!==this._haOverrides[t]?this._haOverrides[t]:void 0===this._effectiveSettings?.ha_exposure_overrides?.[t]||this._effectiveSettings.ha_exposure_overrides[t];this._haOverrides={...this._haOverrides,[t]:!e};try{await qt(this.deviceId,{ha_exposure_overrides:this._haOverrides})}catch(t){console.error("Failed to update HA exposure:",t)}}async _setThreshold(t,e,o){if(this._isGroupMode)return this._setGroupThreshold(t,e,o);const s={...this.device.threshold_overrides||{}};""===e||null==e?delete s[t]:s[t]={op:o||">",value:Number(e)};try{await qt(this.deviceId,{threshold_overrides:s}),this.device={...this.device,threshold_overrides:s},this._effectiveSettings=await Vt(this.deviceId)}catch(t){console.error("Failed to set threshold:",t)}}async _setCritThreshold(t,e,o){if(this._isGroupMode)return this._setGroupCritThreshold(t,e,o);const s={...this.device.crit_threshold_overrides||{}};""===e||null==e?delete s[t]:s[t]={op:o||">",value:Number(e)};try{await qt(this.deviceId,{crit_threshold_overrides:s}),this.device={...this.device,crit_threshold_overrides:s}}catch(t){console.error("Failed to set crit threshold:",t)}}_effectiveTransforms(){if(this._isGroupMode)return this.device?.attribute_transforms||{};const t=this.device?.group_policy,e=t?this._groups[t]:null;return{...e?.attribute_transforms||{},...this.device?.attribute_transforms||{}}}_groupTransforms(){if(this._isGroupMode)return{};const t=this.device?.group_policy,e=t?this._groups[t]:null;return e?.attribute_transforms||{}}async _setAttributeTransform(t,e){if(this._isGroupMode)return this._setGroupTransform(t,e);const o={...this.device?.attribute_transforms||{}};e?o[t]=e:delete o[t];try{await qt(this.deviceId,{attribute_transforms:o}),this.device={...this.device,attribute_transforms:o}}catch(t){console.error("Failed to update attribute transform:",t)}}async _saveGroupUpdate(t){const e=this._groups?.[this.groupId];if(e)try{await Gt(this.groupId,{...e,...t}),this._groups={...this._groups,[this.groupId]:{...e,...t}}}catch(t){console.error("Failed to update group:",t)}}async _setGroupThreshold(t,e,o){const s={...this.device.threshold_overrides||{}};""===e||null==e?delete s[t]:s[t]={op:o||">",value:Number(e)},this.device={...this.device,threshold_overrides:s},await this._saveGroupUpdate({thresholds:s})}async _setGroupCritThreshold(t,e,o){const s={...this.device.crit_threshold_overrides||{}};""===e||null==e?delete s[t]:s[t]={op:o||">",value:Number(e)},this.device={...this.device,crit_threshold_overrides:s},await this._saveGroupUpdate({crit_thresholds:s})}async _setGroupInterval(t){this._configInterval=t,await this._saveGroupUpdate({interval:t})}async _saveGroupCommand({name:t,shell:e}){const o=this._groups?.[this.groupId],s={...o?.custom_commands||{},[t]:e};await this._saveGroupUpdate({custom_commands:s}),this._groups={...this._groups,[this.groupId]:{...o,custom_commands:s}}}async _removeGroupCommand(t){const e=this._groups?.[this.groupId],o={...e?.custom_commands||{}};delete o[t],await this._saveGroupUpdate({custom_commands:o}),this._groups={...this._groups,[this.groupId]:{...e,custom_commands:o}}}async _saveGroupSensor({key:t,...e}){const o={...this._customSensors,[t]:e};this._customSensors=o,await this._saveGroupUpdate({custom_sensors:o})}async _removeGroupSensor(t){const e={...this._customSensors};delete e[t],this._customSensors=e,await this._saveGroupUpdate({custom_sensors:e})}async _setGroupTransform(t,e){const o={...this.device?.attribute_transforms||{}};e?o[t]=e:delete o[t],this.device={...this.device,attribute_transforms:o},await this._saveGroupUpdate({attribute_transforms:o})}async _toggleCardAttribute({name:t,pinned:e}){const o=[...this.device?.card_attributes||[]];let s;s=e?[...o,t]:o.filter(e=>e!==t);try{await qt(this.deviceId,{card_attributes:s}),this.device={...this.device,card_attributes:s}}catch(t){console.error("Failed to update card attributes:",t)}}async _sendCmd(t,e={}){if(!this._isGroupMode)try{this.commandResult=`Sending ${t}...`;const o=(await Tt(this.deviceId,t,e)).request_id;this.commandResult=`Sent ${t}... waiting for response`;const s=Date.now(),i=()=>{const t=(this.device?.command_history||[]).find(t=>t.request_id===o);t?this.commandResult=`${t.status}: ${t.output||"(no output)"}`:Date.now()-s<1e4?setTimeout(i,500):this.commandResult="Command sent (no response received)"};setTimeout(i,500)}catch(t){this.commandResult=`Error: ${t.message}`}}async _hideCommand(t){try{await kt(this.deviceId,t),await this._loadDevice()}catch(t){console.error("Failed to hide command:",t)}}async _unhideCommand(t){try{await St(this.deviceId,t),await this._loadDevice()}catch(t){console.error("Failed to unhide command:",t)}}async _saveServerCommand({name:t,shell:e}){const{addServerCommand:o}=await Promise.resolve().then(function(){return Wt});await o(this.deviceId,t,e),await this._loadDevice()}async _removeServerCommand(t){const{removeServerCommand:e}=await Promise.resolve().then(function(){return Wt});await e(this.deviceId,t),await this._loadDevice()}async _saveSensor({key:t,sensor:e,oldKey:o}){const{addServerSensor:s,removeServerSensor:i}=await Promise.resolve().then(function(){return Wt});o&&o!==t&&await i(this.deviceId,o),await s(this.deviceId,t,e),await this._loadDevice()}async _removeSensor(t){const{removeServerSensor:e}=await Promise.resolve().then(function(){return Wt});await e(this.deviceId,t),await this._loadDevice()}async _onIntervalChange(t){const{setDeviceInterval:e}=await Promise.resolve().then(function(){return Wt});await e(this.deviceId,t),await this._loadDevice()}async _deleteDevice(){if(confirm(`Delete device "${this.device?.device_name||this.deviceId}"? This removes it from the registry. It will reappear if the client agent is still running.`))try{await yt(this.deviceId),this.dispatchEvent(new CustomEvent("back"))}catch(t){console.error("Failed to delete device:",t)}}}customElements.define("device-detail",ee);class oe extends dt{static properties={_open:{type:Boolean,state:!0},_type:{type:String,state:!0},_title:{type:String,state:!0},_message:{type:String,state:!0},_placeholder:{type:String,state:!0},_confirmLabel:{type:String,state:!0},_confirmDanger:{type:Boolean,state:!0},_inputValue:{type:String,state:!0}};static styles=[ct,r`
    :host { display: contents; }

    .overlay {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1200;
      animation: fadeIn var(--transition) ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .dialog {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-modal);
      padding: 24px;
      min-width: 360px;
      max-width: 480px;
      width: 90vw;
      display: flex;
      flex-direction: column;
      gap: 16px;
      animation: slideUp var(--transition) ease;
    }

    @keyframes slideUp {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .dialog-title {
      font-size: 16px;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0;
    }

    .dialog-message {
      font-size: 13px;
      color: var(--text-secondary);
      line-height: 1.5;
      margin: 0;
    }

    .dialog-input {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid var(--border);
      border-radius: var(--radius-md, 8px);
      background: var(--bg-input);
      color: var(--text-primary);
      font-size: 14px;
      font-family: inherit;
      outline: none;
      transition: border-color var(--transition);
      box-sizing: border-box;
    }

    .dialog-input:focus {
      border-color: var(--accent);
    }

    .dialog-input::placeholder {
      color: var(--text-dim, rgba(255,255,255,0.4));
    }

    .dialog-footer {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      margin-top: 4px;
    }

    .btn {
      border: none;
      padding: 9px 20px;
      border-radius: var(--radius-md, 8px);
      cursor: pointer;
      font-size: 13px;
      font-family: inherit;
      transition: background var(--transition), opacity var(--transition);
    }

    .btn-cancel {
      background: var(--bg-hover);
      color: var(--text-secondary);
    }

    .btn-cancel:hover {
      background: var(--bg-subtle);
      color: var(--text-primary);
    }

    .btn-confirm {
      background: var(--accent);
      color: #0a0a1a;
      font-weight: 600;
    }

    .btn-confirm:hover {
      opacity: 0.85;
    }

    .btn-confirm.danger {
      background: var(--danger);
      color: #fff;
    }

    @media (max-width: 480px) {
      .dialog {
        min-width: unset;
        width: calc(100vw - 32px);
        max-width: none;
      }

      .dialog-footer {
        flex-direction: column;
      }

      .dialog-footer .btn {
        width: 100%;
        text-align: center;
      }
    }
  `];constructor(){super(),this._open=!1,this._type="confirm",this._title="",this._message="",this._placeholder="",this._confirmLabel="",this._confirmDanger=!1,this._inputValue="",this._resolve=null}show({type:t="confirm",title:e="",message:o="",placeholder:s="",defaultValue:i="",confirmLabel:r="",confirmDanger:n=!1}={}){return this._type=t,this._title=e,this._message=o,this._placeholder=s,this._confirmLabel=r||("prompt"===t?"Submit":"Confirm"),this._confirmDanger=n,this._inputValue=i,this._open=!0,new Promise(t=>{this._resolve=t})}_cancel(){this._open=!1,this._resolve&&(this._resolve("prompt"===this._type&&null),this._resolve=null)}_confirm(){this._open=!1,this._resolve&&(this._resolve("prompt"!==this._type||this._inputValue),this._resolve=null)}_onKeyDown(t){"Enter"===t.key&&(t.preventDefault(),this._confirm())}_onInput(t){this._inputValue=t.target.value}updated(t){t.has("_open")&&this._open&&"prompt"===this._type&&this.updateComplete.then(()=>{const t=this.renderRoot.querySelector(".dialog-input");t&&t.focus()})}render(){if(!this._open)return B``;const t=this._confirmDanger?"btn btn-confirm danger":"btn btn-confirm";return B`
      <div class="overlay" @click=${this._cancel}>
        <div class="dialog" @click=${t=>t.stopPropagation()}>
          <h3 class="dialog-title">${this._title}</h3>
          ${this._message?B`<p class="dialog-message">${this._message}</p>`:""}
          ${"prompt"===this._type?B`
            <input
              class="dialog-input"
              type="text"
              .value=${this._inputValue}
              placeholder=${this._placeholder}
              @input=${this._onInput}
              @keydown=${this._onKeyDown}
            />
          `:""}
          <div class="dialog-footer">
            <button class="btn btn-cancel" @click=${this._cancel}>Cancel</button>
            <button class=${t} @click=${this._confirm}>${this._confirmLabel}</button>
          </div>
        </div>
      </div>
    `}}customElements.define("themed-dialog",oe);const se={online:"#04d65c",offline:"#ef5350",warning:"#ffb74d",inferred:"#00D4FF",unknown:"#666"};class ie extends dt{static properties={topology:{type:Object},layouts:{type:Object},selectedLayout:{type:String},editMode:{type:Boolean},linkMode:{type:Boolean},selectedNode:{type:String},nodePositions:{type:Object},manualEdges:{type:Array},_dragging:{type:String,state:!0},_linkSource:{type:String,state:!0},_error:{type:String,state:!0},_loading:{type:Boolean,state:!0},_selectedEdge:{type:Number,state:!0},_selectedDeviceData:{type:Object,state:!0},_dirty:{type:Boolean,state:!0},_layoutDropdownOpen:{type:Boolean,state:!0},_showLabelDialog:{type:Boolean,state:!0},_labelEdgeIndex:{type:Number,state:!0},hideAutoEdges:{type:Boolean},_viewBox:{type:Object,state:!0}};static styles=[ct,r`
    :host { display: block; padding: 20px; max-width: 1400px; margin: 0 auto; }
    .toolbar {
      display: flex; justify-content: space-between; align-items: center;
      background: rgba(255,255,255,0.05); padding: 8px 14px; border-radius: 8px;
      margin-bottom: 8px; flex-wrap: wrap; gap: 8px;
    }
    .toolbar-secondary {
      margin-bottom: 12px; justify-content: flex-start;
    }
    .toolbar-left { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
    .toolbar-right { display: none; }
    .status-counts {
      position: absolute; bottom: 12px; left: 12px;
      display: flex; gap: 6px; z-index: 10;
    }
    .status-pill {
      display: flex; align-items: center; gap: 4px;
      font-size: 11px; color: rgba(255,255,255,0.7);
    }
    .status-pill::before {
      content: ''; width: 8px; height: 8px; border-radius: 50%;
    }
    .status-pill.online::before { background: #04d65c; }
    .status-pill.offline::before { background: #ef5350; }
    .status-pill.warning::before { background: #ffb74d; }

    /* Custom layout dropdown */
    .layout-dropdown { position: relative; }
    .layout-trigger {
      background: var(--bg-surface); color: var(--text-primary); border: 1px solid var(--border);
      border-radius: var(--radius-sm); padding: 5px 28px 5px 10px; font-size: 12px;
      cursor: pointer; white-space: nowrap; position: relative; min-width: 120px;
      text-align: left; transition: border-color var(--transition);
    }
    .layout-trigger:hover { border-color: var(--border-hover); }
    .layout-trigger::after {
      content: ''; position: absolute; right: 10px; top: 50%;
      border: 4px solid transparent; border-top-color: var(--text-secondary);
      transform: translateY(-25%);
    }
    .layout-trigger.open::after {
      border-top-color: transparent; border-bottom-color: var(--text-secondary);
      transform: translateY(-75%);
    }
    .layout-menu {
      position: absolute; top: calc(100% + 4px); left: 0; min-width: 200px;
      background: var(--bg-surface); border: 1px solid var(--border);
      border-radius: var(--radius-md); box-shadow: var(--shadow-dropdown);
      z-index: 100; overflow: hidden;
    }
    .layout-option {
      display: flex; align-items: center; gap: 6px;
      padding: 8px 12px; font-size: 12px; color: var(--text-primary);
      cursor: pointer; transition: background var(--transition);
    }
    .layout-option:hover { background: var(--bg-hover); }
    .layout-option.selected { color: var(--accent); }
    .layout-divider {
      height: 1px; background: var(--border); margin: 4px 0;
    }
    .default-badge {
      font-size: 9px; padding: 1px 5px; border-radius: var(--radius-sm);
      background: var(--accent-bg); color: var(--accent); margin-left: auto;
    }
    .layout-option.new-layout { color: var(--accent); }

    .tool-btn {
      background: none; border: none; color: #fff; cursor: pointer;
      font-size: 12px; padding: 4px 10px; border-radius: 4px; transition: all 0.2s;
    }
    .tool-btn:hover { background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.8); }
    .tool-btn.active { color: #00D4FF; background: rgba(0,212,255,0.1); }
    .tool-btn.link-mode { color: #ffb74d; }
    .tool-btn.link-mode.active { color: #0d0d1f; background: #ffb74d; }
    .tool-btn.danger { color: #ef5350; }
    .tool-btn.danger:hover { background: rgba(239,83,80,0.1); }
    .tool-btn.save { color: #04d65c; }
    .tool-btn.save:hover { background: rgba(129,199,132,0.15); color: #a5d6a7; }
    .tool-btn.done {
      color: var(--bg-card); background: var(--success); font-weight: 600;
      border-radius: var(--radius-sm); padding: 5px 14px;
    }
    .tool-btn.done:hover { background: #05e868; }
    .tool-btn.discard {
      color: var(--text-dim); background: none;
    }
    .tool-btn.discard:hover { color: var(--danger); background: var(--danger-bg); }
    .status-dot { font-size: 11px; }
    .separator { color: #666; }
    .canvas-container {
      background: #0d0d1f; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05);
      position: relative; overflow: hidden;
    }
    svg { width: 100%; height: calc(100vh - 200px); display: block; touch-action: none; cursor: grab; }
    svg.panning { cursor: grabbing; }
    .zoom-controls {
      position: absolute; bottom: 12px; right: 12px;
      display: flex; flex-direction: column; gap: 4px; z-index: 10;
    }
    .zoom-btn {
      width: 32px; height: 32px; border-radius: var(--radius-md, 8px);
      background: var(--bg-surface, #1a1a2e); border: 1px solid var(--border, rgba(255,255,255,0.1));
      color: var(--text-primary, #fff); font-size: 16px; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: all 0.2s;
    }
    .zoom-btn:hover { background: var(--bg-hover, rgba(255,255,255,0.08)); border-color: var(--border-hover, rgba(255,255,255,0.2)); }
    .zoom-btn.fit { font-size: 14px; }
    .detail-panel {
      background: rgba(255,255,255,0.05); border-radius: 8px; padding: 14px; margin-top: 12px;
    }
    .detail-header {
      display: flex; justify-content: space-between; align-items: center;
      margin-bottom: 10px;
    }
    .detail-name { font-size: 16px; font-weight: 600; }
    .link-hint {
      background: #3a2a1a; border: 1px solid #ffb74d; border-radius: 6px;
      padding: 8px 14px; margin-bottom: 12px; font-size: 12px; color: #ffb74d;
    }
    .edge-panel {
      background: rgba(255,255,255,0.05); border-radius: 8px; padding: 14px; margin-top: 12px;
    }
    .edge-panel-header {
      display: flex; justify-content: space-between; align-items: center;
      margin-bottom: 10px;
    }
    .edge-label-input {
      background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.1); border-radius: 4px;
      color: rgba(255,255,255,0.8); padding: 4px 8px; font-size: 12px; width: 200px;
    }
    .edge-list {
      margin-top: 8px;
    }
    .edge-item {
      display: flex; justify-content: space-between; align-items: center;
      padding: 6px 0; border-bottom: 1px solid rgba(255,255,255,0.1); font-size: 12px; color: #fff;
    }
    .edge-item:last-child { border-bottom: none; }
    .device-panel {
      background: rgba(255,255,255,0.05); border-radius: 8px; padding: 16px; margin-top: 12px;
    }
    .device-header {
      display: flex; justify-content: space-between; align-items: center;
      margin-bottom: 12px;
    }
    .device-title { font-size: 18px; font-weight: 700; }
    .device-type { font-size: 12px; color: #fff; }
    .device-status-badge {
      padding: 3px 10px; border-radius: 10px; font-size: 12px;
    }
    .device-section {
      margin-top: 14px;
    }
    .device-section-title {
      font-size: 11px; color: #fff; text-transform: uppercase;
      letter-spacing: 1px; margin-bottom: 8px;
    }
    .attr-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
      gap: 8px;
    }
    .attr-item {
      background: #0d0d1f; border-radius: 6px; padding: 10px; text-align: center;
    }
    .attr-label { font-size: 10px; color: #fff; text-transform: uppercase; }
    .attr-val { font-size: 18px; font-weight: 700; color: #00D4FF; margin-top: 2px; }
    .attr-unit { font-size: 11px; color: #fff; }
    .attr-val.warning { color: #ffb74d; }
    .network-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 6px;
    }
    .net-item { font-size: 12px; color: #fff; }
    .net-label { color: #fff; }
    .tags-row { display: flex; gap: 6px; flex-wrap: wrap; }
    .tag-badge {
      font-size: 10px; padding: 2px 8px; border-radius: 4px;
      background: rgba(0,212,255,0.15); color: #00D4FF;
    }
    .tag-badge.server { background: rgba(99,102,241,0.15); color: #6366F1; }
    .commands-row { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 8px; }
    .cmd-btn {
      background: rgba(255,255,255,0.1); border: none; color: rgba(255,255,255,0.8); padding: 6px 14px;
      border-radius: 5px; cursor: pointer; font-size: 12px; transition: all 0.2s;
    }
    .cmd-btn:hover { background: rgba(255,255,255,0.15); }
    .cmd-btn.danger { background: #5a2a2a; color: #ef5350; }
    .cmd-btn.danger:hover { background: #6a3a3a; }
    .cmd-result {
      margin-top: 6px; padding: 6px 10px; background: #0d0d1f;
      border-radius: 4px; font-size: 11px; color: #fff; font-family: monospace;
    }
    .close-btn {
      background: none; border: none; color: #fff; cursor: pointer;
      font-size: 18px; padding: 0 4px; line-height: 1;
    }
    .close-btn:hover { color: rgba(255,255,255,0.8); }
    .save-overlay {
      position: fixed; top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.6); display: flex; align-items: center;
      justify-content: center; z-index: 1000;
    }
    .save-dialog-buttons {
      display: flex; gap: 8px; justify-content: flex-end;
    }
    .dialog-btn {
      border: none; padding: 8px 18px; border-radius: 6px; cursor: pointer;
      font-size: 13px; transition: all 0.2s;
    }
    .dialog-btn.save { background: #00D4FF; color: #0d0d1f; font-weight: 600; }
    .dialog-btn.save:hover { background: #33DDFF; }
    .dialog-btn.cancel { background: rgba(255,255,255,0.1); color: #fff; }
    .dialog-btn.cancel:hover { background: rgba(255,255,255,0.15); }
    .dirty-indicator {
      font-size: 11px; color: #ffb74d; margin-left: 4px;
    }
    .label-dialog {
      background: var(--bg-surface, #1a1a2e); border-radius: 12px; padding: 24px;
      min-width: 360px; max-width: 440px; border: 1px solid var(--border-hover, rgba(255,255,255,0.2));
      box-shadow: var(--shadow-modal, 0 20px 60px rgba(0,0,0,0.5));
    }
    .label-dialog h3 { color: #fff; margin-bottom: 4px; font-size: 16px; }
    .label-dialog .subtitle { color: #fff; font-size: 12px; margin-bottom: 16px; }
    .label-field { margin-bottom: 14px; }
    .label-field label {
      display: block; font-size: 11px; color: #fff; text-transform: uppercase;
      letter-spacing: 0.5px; margin-bottom: 4px;
    }
    .label-field input {
      width: 100%; background: #0d0d1f; border: 1px solid rgba(255,255,255,0.1);
      border-radius: 6px; color: #fff; padding: 8px 12px; font-size: 13px;
      box-sizing: border-box;
    }
    .label-field input:focus {
      outline: none; border-color: #00D4FF;
    }
    .label-field .hint {
      font-size: 10px; color: #fff; margin-top: 3px;
    }
    @media (max-width: 768px) {
      .toolbar { flex-direction: column; align-items: stretch; }
      .toolbar-left { flex-wrap: wrap; }
      .toolbar-right { justify-content: center; }
      .separator { display: none; }
      .layout-trigger { width: 100%; box-sizing: border-box; }
      svg { height: 60vh; }
    }
  `];constructor(){super(),this.topology={nodes:[],edges:[]},this.layouts={},this.selectedLayout="",this.editMode=!1,this.linkMode=!1,this.selectedNode=null,this.nodePositions={},this.manualEdges=[],this._dragging=null,this._dragOffset={x:0,y:0},this._linkSource=null,this._error="",this._loading=!0,this._selectedEdge=-1,this._selectedDeviceData=null,this._commandResult="",this._dirty=!1,this._layoutDropdownOpen=!1,this._showLabelDialog=!1,this._labelEdgeIndex=-1,this._savedPositions=null,this._savedManualEdges=null,this.hideAutoEdges=!1,this._viewBox={x:0,y:0,width:900,height:500},this._isPanning=!1,this._panStart=null,this._pinchActive=!1,this._pinchAnchor0=null,this._pinchAnchor1=null,this._pinchPrevDist=0}connectedCallback(){super.connectedCallback(),this._loadTopology(),this._loadLayouts(),this._wsUnsub=pt.onMessage(t=>{"device_update"===t.type&&this._refreshNodeStatuses()}),this._onDocClick=t=>{if(this._layoutDropdownOpen){const e=this.shadowRoot?.querySelector(".layout-dropdown");e&&!t.composedPath().includes(e)&&(this._layoutDropdownOpen=!1)}},document.addEventListener("click",this._onDocClick)}disconnectedCallback(){super.disconnectedCallback(),this._wsUnsub&&this._wsUnsub(),this._onDocClick&&document.removeEventListener("click",this._onDocClick)}async _refreshNodeStatuses(){try{const t=await Ct();if(!t||!t.nodes)return;const e={};for(const o of t.nodes)e[o.id]=o.status;if(this.topology&&this.topology.nodes){let o=!1;const s=this.topology.nodes.map(t=>e[t.id]&&e[t.id]!==t.status?(o=!0,{...t,status:e[t.id]}):t);for(const e of t.nodes)this.topology.nodes.find(t=>t.id===e.id)||(s.push(e),o=!0);o&&(this.topology={...this.topology,nodes:s})}}catch(t){}}async _loadTopology(){try{this._loading=!0,this._error="";const t=await Ct();this.topology=t,this._autoLayout(),this._loading=!1}catch(t){console.error("Failed to load topology:",t),this._error=`Failed to load: ${t.message}`,this._loading=!1}}async _loadLayouts(){try{if(this.layouts=await Dt(),!this._layoutsLoaded){this._layoutsLoaded=!0;const t=Object.entries(this.layouts).find(([,t])=>t.isDefault);t&&(this.selectedLayout=t[0],this.nodePositions=t[1].positions||{},this.manualEdges=t[1].manualEdges||[],this.hideAutoEdges=t[1].hideAutoEdges||!1,t[1].viewBox&&(this._viewBox={...t[1].viewBox}))}}catch(t){console.error("Failed to load layouts:",t)}}_autoLayout(){const t=this.topology.nodes;if(!t.length)return;const e={...this.selectedLayout&&this.layouts[this.selectedLayout]&&this.layouts[this.selectedLayout].positions||{}},o=Math.ceil(Math.sqrt(t.length));t.forEach((t,s)=>{if(!e[t.id]){const i=s%o,r=Math.floor(s/o);e[t.id]={x:100+i*(800/(o+1)),y:80+100*r}}}),this.nodePositions=e,this.selectedLayout&&this.layouts[this.selectedLayout]&&(this.manualEdges=this.layouts[this.selectedLayout].manualEdges||[])}get _allEdges(){const t=this.hideAutoEdges?[]:this.topology.edges||[],e=this.manualEdges.map(t=>({...t,type:"manual"}));return[...t,...e]}_getNodeName(t){const e=this.topology.nodes.find(e=>e.id===t);return e&&e.name||t}render(){if(this._loading&&!this.topology.nodes.length)return B`<div style="padding: 40px; text-align: center; color: #fff;">Loading topology...</div>`;if(this._error)return B`<div style="padding: 40px; text-align: center; color: #ef5350;">${this._error}</div>`;const t=this.topology.nodes,e=this._allEdges,o=t.filter(t=>"online"===t.status).length,s=t.filter(t=>"offline"===t.status).length,i=t.filter(t=>"warning"===t.status).length;return B`
      <div class="toolbar">
        <div class="toolbar-left">
          ${this._renderLayoutDropdown()}
          ${this.editMode?B`
            <span class="separator">|</span>
            <button class="tool-btn done" @click=${this._doneEditing}>Done Editing</button>
            <button class="tool-btn discard" @click=${this._discardAndExit}>Discard</button>
            <span class="separator">|</span>
            <button class="tool-btn link-mode ${this.linkMode?"active":""}"
              @click=${this._toggleLinkMode}>
              ${this.linkMode?"Cancel Link":"+ Link"}
            </button>
            <button class="tool-btn ${this.hideAutoEdges?"active":""}"
              @click=${()=>{this.hideAutoEdges=!this.hideAutoEdges,this._markDirty()}}>
              ${this.hideAutoEdges?"Show Auto Links":"Auto Links"}
            </button>
            ${this._dirty?B`<span class="dirty-indicator">unsaved changes</span>`:""}
          `:B`
            <button class="tool-btn" @click=${this._enterEditMode}>Edit Mode</button>
          `}
        </div>
        <div class="toolbar-right">
        </div>
      </div>
      ${this.editMode?B`
        <div class="toolbar toolbar-secondary">
          <div class="toolbar-left">
            <button class="tool-btn save" @click=${this._saveAsLayout}>Save As</button>
            ${this.selectedLayout?B`
              <span class="separator">|</span>
              <button class="tool-btn" @click=${this._setAsDefault}>
                ${this.layouts[this.selectedLayout]?.isDefault?"Default":"Set Default"}
              </button>
              <button class="tool-btn danger" @click=${this._deleteCurrentLayout}>Delete</button>
            `:""}
          </div>
        </div>
      `:""}

      ${this.linkMode?B`
        <div class="link-hint">
          ${this._linkSource?`Click a second device to link it to "${this._getNodeName(this._linkSource)}"`:"Click a device to start a link"}
        </div>
      `:""}

      <div class="canvas-container">
        <svg class="${this._isMousePanning?"panning":""}"
          viewBox="${this._viewBox.x} ${this._viewBox.y} ${this._viewBox.width} ${this._viewBox.height}"
          @mousedown=${this._onSvgMouseDown}
          @mousemove=${this._onMouseMove}
          @mouseup=${this._onMouseUp}
          @mouseleave=${this._onMouseUp}
          @wheel=${this._onWheel}
          @touchstart=${this._onTouchStart}
          @touchmove=${this._onTouchMove}
          @touchend=${this._onTouchEnd}>
          ${e.map((t,e)=>this._renderEdgeLine(t,e))}
          ${this._renderLinkPreview()}
          ${t.map(t=>this._renderNode(t))}
          ${e.map((t,e)=>this._renderEdgeLabels(t,e))}
        </svg>
        <div class="zoom-controls">
          <button class="zoom-btn" @click=${this._zoomIn} title="Zoom in">+</button>
          <button class="zoom-btn" @click=${this._zoomOut} title="Zoom out">\u2212</button>
          <button class="zoom-btn fit" @click=${this._fitAll} title="Fit all">\u229E</button>
        </div>
        <div class="status-counts">
          <span class="status-pill online">${o}</span>
          <span class="status-pill offline">${s}</span>
          <span class="status-pill warning">${i}</span>
        </div>
      </div>

      ${this.selectedNode&&!this.linkMode?this._renderDetailPanel():""}
      ${this.editMode&&this.manualEdges.length>0?this._renderManualEdgesList():""}
      ${this._showLabelDialog?this._renderLabelDialog():""}
      <themed-dialog></themed-dialog>
    `}_renderNode(t){const e=this.nodePositions[t.id]||{x:100,y:100},o=se[t.status]||se.unknown,s=this.selectedNode===t.id,i=this._linkSource===t.id,r=s||i?2.5:1.5,n=s?"4,2":i?"2,2":"none",a=i?"#ffb74d":o;return"gateway"===t.type?H`
        <g transform="translate(${e.x}, ${e.y})"
          @click=${e=>this._onNodeClick(e,t.id)}
          @mousedown=${e=>this.editMode&&!this.linkMode&&this._onMouseDown(e,t.id)}
          @touchstart=${e=>this.editMode&&!this.linkMode&&this._onTouchNodeStart(e,t.id)}
          style="cursor:pointer">
          <circle r="22" fill="#1a1a2e" stroke="${a}" stroke-width="${r}"
            stroke-dasharray="${n}"/>
          <text text-anchor="middle" dy="4" fill="${a}" font-size="10">${t.name.substring(0,12)}</text>
        </g>
      `:H`
      <g transform="translate(${e.x}, ${e.y})"
        @click=${e=>this._onNodeClick(e,t.id)}
        @mousedown=${e=>this.editMode&&!this.linkMode&&this._onMouseDown(e,t.id)}
        @touchstart=${e=>this.editMode&&!this.linkMode&&this._onTouchNodeStart(e,t.id)}
        style="cursor:pointer">
        <rect x="-45" y="-18" width="90" height="36" rx="6"
          fill="#1a1a2e" stroke="${a}" stroke-width="${r}"
          stroke-dasharray="${n}"/>
        <text text-anchor="middle" dy="-3" fill="${a}" font-size="10">
          ${(t.name||t.id).substring(0,12)}
        </text>
        <text text-anchor="middle" dy="10" fill="#666" font-size="8">${t.status}</text>
      </g>
    `}_edgeGeometry(t){const e=this.nodePositions[t.source],o=this.nodePositions[t.target];if(!e||!o)return null;const s=o.x-e.x,i=o.y-e.y,r=Math.sqrt(s*s+i*i)||1,n=s/r,a=i/r;let d=-a,l=n;l>0&&(d=-d,l=-l);const c=this._boxExitDistance(n,a);return{from:e,to:o,ux:n,uy:a,perpX:d,perpY:l,len:r,srcDist:c+8,tgtDist:c+8}}_boxExitDistance(t,e){if(Math.abs(t)<.001)return 22;if(Math.abs(e)<.001)return 48;const o=48/Math.abs(t),s=22/Math.abs(e);return Math.min(o,s)}_renderEdgeLine(t,e){const o=this._edgeGeometry(t);if(!o)return H``;const s="manual"===t.type,i=s?"#00D4FF":"#555",r=s&&this._selectedEdge===e-(this.topology.edges?.length||0)?2.5:1.5,n=s?"none":"4,2";return H`
      <line x1="${o.from.x}" y1="${o.from.y}" x2="${o.to.x}" y2="${o.to.y}"
        stroke="${i}" stroke-width="${r}"
        stroke-dasharray="${n}"
        @click=${s&&this.editMode?()=>this._selectEdge(e-(this.topology.edges?.length||0)):null}
        style="${s&&this.editMode?"cursor:pointer":""}"/>
    `}_renderEdgeLabels(t,e){if(!t.label&&!t.sourceLabel&&!t.targetLabel)return H``;const o=this._edgeGeometry(t);if(!o)return H``;const{from:s,to:i,ux:r,uy:n,perpX:a,perpY:d,srcDist:l,tgtDist:c}=o,p=s.x+r*l,h=s.y+n*l,u=i.x-r*c,g=i.y-n*c,m=(s.x+i.x)/2+14*a,f=(s.y+i.y)/2+14*d;return H`
      ${t.label?H`
        <rect x="${m-3*t.label.length-3}" y="${f-9}"
          width="${6*t.label.length+6}" height="13" rx="2" fill="#0d0d1f" opacity="0.9"/>
        <text x="${m}" y="${f}" text-anchor="middle"
          fill="#888" font-size="9" style="pointer-events:none">${t.label}</text>
      `:H``}
      ${t.sourceLabel?H`
        <rect x="${p-2.5*t.sourceLabel.length-3}" y="${h-8}"
          width="${5*t.sourceLabel.length+6}" height="12" rx="2" fill="#0d0d1f" opacity="0.9"/>
        <text x="${p}" y="${h}" text-anchor="middle"
          fill="#00D4FF" font-size="8" style="pointer-events:none">${t.sourceLabel}</text>
      `:H``}
      ${t.targetLabel?H`
        <rect x="${u-2.5*t.targetLabel.length-3}" y="${g-8}"
          width="${5*t.targetLabel.length+6}" height="12" rx="2" fill="#0d0d1f" opacity="0.9"/>
        <text x="${u}" y="${g}" text-anchor="middle"
          fill="#00D4FF" font-size="8" style="pointer-events:none">${t.targetLabel}</text>
      `:H``}
    `}_renderLinkPreview(){if(!this._linkSource||!this._mousePos)return H``;const t=this.nodePositions[this._linkSource];return t?H`
      <line x1="${t.x}" y1="${t.y}" x2="${this._mousePos.x}" y2="${this._mousePos.y}"
        stroke="#ffb74d" stroke-width="1.5" stroke-dasharray="6,3" opacity="0.6"/>
    `:H``}_renderDetailPanel(){if(!this.selectedNode)return B``;const t=this.topology.nodes.find(t=>t.id===this.selectedNode);return t&&"gateway"!==t.type?B`
      <device-detail
        .deviceId=${this.selectedNode}
        @back=${()=>{this.selectedNode=null,this._selectedDeviceData=null}}
      ></device-detail>
    `:B`
        <div style="background: rgba(255,255,255,0.05); border-radius: 8px; padding: 14px; margin-top: 12px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 16px; font-weight: 600; color: #00D4FF;">${t?t.name:this.selectedNode}</span>
            <button class="tool-btn" @click=${()=>{this.selectedNode=null}}>✕</button>
          </div>
          <div style="color: #fff; font-size: 12px; margin-top: 4px;">${t?t.type:"unknown"}</div>
        </div>
      `}_renderManualEdgesList(){return B`
      <div class="edge-panel">
        <div class="edge-panel-header">
          <span style="font-size: 13px; color: rgba(255,255,255,0.8); font-weight: 600;">Manual Links</span>
        </div>
        <div class="edge-list">
          ${this.manualEdges.map((t,e)=>B`
            <div class="edge-item">
              <span>
                ${this._getNodeName(t.source)}
                ${t.sourceLabel?B`<span style="color: #00D4FF; font-size: 10px;"> [${t.sourceLabel}]</span>`:""}
                <span style="color: #fff;"> &#8594; </span>
                ${t.label?B`<span style="color: #fff; font-size: 10px;">(${t.label})</span><span style="color: #fff;"> &#8594; </span>`:""}
                ${t.targetLabel?B`<span style="color: #00D4FF; font-size: 10px;">[${t.targetLabel}] </span>`:""}
                ${this._getNodeName(t.target)}
              </span>
              <span style="display: flex; gap: 4px;">
                <button class="tool-btn" @click=${()=>this._labelEdge(e)}>Label</button>
                <button class="tool-btn danger" @click=${()=>this._removeEdge(e)}>Remove</button>
              </span>
            </div>
          `)}
        </div>
      </div>
    `}_renderLayoutDropdown(){const t=this.selectedLayout&&this.layouts[this.selectedLayout]?this.layouts[this.selectedLayout].name:"Auto Discovery";return B`
      <div class="layout-dropdown">
        <button class="layout-trigger ${this._layoutDropdownOpen?"open":""}"
          @click=${t=>{t.stopPropagation(),this._layoutDropdownOpen=!this._layoutDropdownOpen}}>
          ${t}
        </button>
        ${this._layoutDropdownOpen?B`
          <div class="layout-menu">
            <div class="layout-option ${this.selectedLayout?"":"selected"}"
              @click=${()=>this._selectLayout("")}>Auto Discovery</div>
            ${Object.entries(this.layouts).map(([t,e])=>B`
              <div class="layout-option ${this.selectedLayout===t?"selected":""}"
                @click=${()=>this._selectLayout(t)}>
                ${e.name}
                ${e.isDefault?B`<span class="default-badge">default</span>`:""}
              </div>
            `)}
            <div class="layout-divider"></div>
            <div class="layout-option new-layout" @click=${this._createNewLayout}>+ New Layout</div>
          </div>
        `:""}
      </div>
    `}_renderLabelDialog(){const t=this.manualEdges[this._labelEdgeIndex];if(!t)return B``;const e=this._getNodeName(t.source),o=this._getNodeName(t.target);return B`
      <div class="save-overlay" @click=${this._cancelLabelDialog}>
        <div class="label-dialog" @click=${t=>t.stopPropagation()}>
          <h3>Link Labels</h3>
          <div class="subtitle">${e} &#8594; ${o}</div>

          <div class="label-field">
            <label>Source Interface (${e})</label>
            <input id="source-label" type="text"
              .value=${t.sourceLabel||""}
              placeholder="e.g., eth0, port 24, WAN"
              @keydown=${t=>"Enter"===t.key&&this._saveLabelDialog()}>
            <div class="hint">Shown near the source device</div>
          </div>

          <div class="label-field">
            <label>Link Description</label>
            <input id="link-label" type="text"
              .value=${t.label||""}
              placeholder="e.g., 1Gbps, WiFi, VLAN 10"
              @keydown=${t=>"Enter"===t.key&&this._saveLabelDialog()}>
            <div class="hint">Shown in the middle of the link</div>
          </div>

          <div class="label-field">
            <label>Target Interface (${o})</label>
            <input id="target-label" type="text"
              .value=${t.targetLabel||""}
              placeholder="e.g., eth1, port 1, LAN"
              @keydown=${t=>"Enter"===t.key&&this._saveLabelDialog()}>
            <div class="hint">Shown near the target device</div>
          </div>

          <div class="save-dialog-buttons">
            <button class="dialog-btn cancel" @click=${this._cancelLabelDialog}>Cancel</button>
            <button class="dialog-btn save" @click=${this._saveLabelDialog}>Apply</button>
          </div>
        </div>
      </div>
    `}_onNodeClick(t,e){t.stopPropagation(),this.linkMode?this._handleLinkClick(e):this._selectNode(e)}_handleLinkClick(t){if(this._linkSource)if(this._linkSource===t)this._linkSource=null;else{const e=this.manualEdges.some(e=>e.source===this._linkSource&&e.target===t||e.source===t&&e.target===this._linkSource);e||(this.manualEdges=[...this.manualEdges,{source:this._linkSource,target:t,sourceLabel:"",label:"",targetLabel:""}],this._markDirty(),this._labelEdgeIndex=this.manualEdges.length-1,this._showLabelDialog=!0),this._linkSource=null}else this._linkSource=t}_enterEditMode(){this.editMode=!0,this._savedPositions=JSON.stringify(this.nodePositions),this._savedManualEdges=JSON.stringify(this.manualEdges),this._dirty=!1}_exitEditMode(){this.editMode=!1,this.linkMode=!1,this._linkSource=null,this._selectedEdge=-1,this._dirty=!1}_markDirty(){this.editMode&&(this._dirty=!0)}async _doneEditing(){if(this.selectedLayout)await this._saveToCurrentLayout(),this._exitEditMode();else{const t=this.shadowRoot.querySelector("themed-dialog"),e=await t.show({type:"prompt",title:"Save Layout",message:"Enter a name for this layout:",placeholder:"My Layout"});if(!e)return;await this._saveNewLayout(e),this._exitEditMode()}}_discardAndExit(){this._savedPositions&&(this.nodePositions=JSON.parse(this._savedPositions)),this._savedManualEdges&&(this.manualEdges=JSON.parse(this._savedManualEdges)),this._exitEditMode()}async _saveAsLayout(){const t=this.shadowRoot.querySelector("themed-dialog"),e=await t.show({type:"prompt",title:"Save As New Layout",message:"Enter a name for the new layout:",placeholder:"Layout copy"});e&&await this._saveNewLayout(e)}async _saveToCurrentLayout(){if(!this.selectedLayout||!this.layouts[this.selectedLayout])return;const t=this.layouts[this.selectedLayout];await Et({id:this.selectedLayout,name:t.name,positions:this.nodePositions,manualEdges:this.manualEdges,hideAutoEdges:this.hideAutoEdges,viewBox:this._viewBox,isDefault:t.isDefault||!1}),await this._loadLayouts(),this._dirty=!1,this._savedPositions=JSON.stringify(this.nodePositions),this._savedManualEdges=JSON.stringify(this.manualEdges)}async _saveNewLayout(t){const e=await Et({name:t,positions:this.nodePositions,manualEdges:this.manualEdges,hideAutoEdges:this.hideAutoEdges,viewBox:this._viewBox,isDefault:!1});this.selectedLayout=e.id,await this._loadLayouts(),this._dirty=!1,this._savedPositions=JSON.stringify(this.nodePositions),this._savedManualEdges=JSON.stringify(this.manualEdges)}_selectLayout(t){if(this._layoutDropdownOpen=!1,this.selectedLayout=t,t&&this.layouts[t]){const e=this.layouts[t];this.nodePositions=e.positions||{},this.manualEdges=e.manualEdges||[],this.hideAutoEdges=e.hideAutoEdges||!1,e.viewBox?this._viewBox=this._adaptViewBox(e.viewBox):this._fitAll()}else this.nodePositions={},this.manualEdges=[],this.hideAutoEdges=!1,this._autoLayout()}_createNewLayout(){this._layoutDropdownOpen=!1,this.selectedLayout="",this.nodePositions={},this.manualEdges=[],this.hideAutoEdges=!1,this._autoLayout(),this._enterEditMode()}_toggleLinkMode(){this.linkMode=!this.linkMode,this._linkSource=null,this.linkMode&&(this.selectedNode=null)}async _selectNode(t){if(this.selectedNode===t)return this.selectedNode=null,this._selectedDeviceData=null,void(this._commandResult="");this.selectedNode=t,this._selectedDeviceData=null,this._commandResult="";try{this._selectedDeviceData=await fetchDevice(t)}catch(t){this._selectedDeviceData={status:"inferred",attributes:{},tags:[]}}}async _sendCmd(t){if(this.selectedNode)try{this._commandResult=`Sending ${t}...`;const e=await sendCommand(this.selectedNode,t);this._commandResult=`Sent (request: ${e.request_id})`}catch(t){this._commandResult=`Error: ${t.message}`}}_selectEdge(t){this._selectedEdge=this._selectedEdge===t?-1:t}_labelEdge(t){this._labelEdgeIndex=t,this._showLabelDialog=!0}_saveLabelDialog(){const t=this.shadowRoot.querySelector(".label-dialog"),e=t.querySelector("#source-label").value,o=t.querySelector("#link-label").value,s=t.querySelector("#target-label").value,i=[...this.manualEdges];i[this._labelEdgeIndex]={...i[this._labelEdgeIndex],sourceLabel:e,label:o,targetLabel:s},this.manualEdges=i,this._markDirty(),this._showLabelDialog=!1,this._labelEdgeIndex=-1}_cancelLabelDialog(){this._showLabelDialog=!1,this._labelEdgeIndex=-1}_removeEdge(t){this.manualEdges=this.manualEdges.filter((e,o)=>o!==t),this._selectedEdge=-1,this._markDirty()}_onSvgMouseDown(t){if(!t.target.closest("g[transform]")){if(t.preventDefault(),this.linkMode)return this.linkMode=!1,this._linkSource=null,void(this._mousePos=null);this._isMousePanning=!0,this._mousePanStart={x:t.clientX,y:t.clientY},this._mousePanViewBox={...this._viewBox}}}_onMouseDown(t,e){this._dragging=e;const o=this.shadowRoot.querySelector("svg"),s=o.createSVGPoint();s.x=t.clientX,s.y=t.clientY;const i=s.matrixTransform(o.getScreenCTM().inverse()),r=this.nodePositions[e]||{x:0,y:0};this._dragOffset={x:i.x-r.x,y:i.y-r.y},t.preventDefault(),t.stopPropagation()}_onMouseMove(t){const e=this.shadowRoot.querySelector("svg"),o=e.createSVGPoint();o.x=t.clientX,o.y=t.clientY;const s=o.matrixTransform(e.getScreenCTM().inverse());if(this.linkMode&&this._linkSource&&(this._mousePos={x:s.x,y:s.y},this.requestUpdate()),this._isMousePanning){const o=e.getScreenCTM(),s=(t.clientX-this._mousePanStart.x)/o.a,i=(t.clientY-this._mousePanStart.y)/o.d;return void(this._viewBox={...this._mousePanViewBox,x:this._mousePanViewBox.x-s,y:this._mousePanViewBox.y-i})}this._dragging&&(this.nodePositions={...this.nodePositions,[this._dragging]:{x:s.x-this._dragOffset.x,y:s.y-this._dragOffset.y}})}_onWheel(t){if(!t.ctrlKey)return;t.preventDefault();const e=t.deltaY>0?1.1:.9;this._zoomAt(t.clientX,t.clientY,e)}_zoomAt(t,e,o){const s=this.shadowRoot.querySelector("svg");if(!s)return;const i=s.createSVGPoint();i.x=t,i.y=e;const r=i.matrixTransform(s.getScreenCTM().inverse()),n={...this._viewBox},a=Math.max(300,Math.min(2700,n.width*o)),d=Math.max(167,Math.min(1500,n.height*o)),l=a/n.width,c=d/n.height;n.x=r.x-(r.x-n.x)*l,n.y=r.y-(r.y-n.y)*c,n.width=a,n.height=d,this._viewBox=n}_zoomIn(){const t=this.shadowRoot.querySelector("svg")?.getBoundingClientRect();t&&this._zoomAt(t.left+t.width/2,t.top+t.height/2,.8)}_zoomOut(){const t=this.shadowRoot.querySelector("svg")?.getBoundingClientRect();t&&this._zoomAt(t.left+t.width/2,t.top+t.height/2,1.25)}_adaptViewBox(t){const e=this.shadowRoot?.querySelector(".canvas-container");if(!e||!e.clientWidth||!e.clientHeight)return{...t};const o=e.clientWidth/e.clientHeight,s=t.x+t.width/2,i=t.y+t.height/2,r=t.width*t.height,n=Math.sqrt(r*o),a=n/o;return{x:s-n/2,y:i-a/2,width:n,height:a}}_fitAll(){const t=Object.values(this.nodePositions);if(!t.length)return;const e=t.map(t=>t.x),o=t.map(t=>t.y),s=Math.min(...e)-80,i=Math.min(...o)-80,r=Math.max(...e)-Math.min(...e)+160,n=Math.max(...o)-Math.min(...o)+160,a=this.shadowRoot?.querySelector(".canvas-container");if(a&&a.clientWidth&&a.clientHeight){const t=a.clientWidth/a.clientHeight;let e=r,o=n;r/n<t?e=n*t:o=r/t,this._viewBox={x:s-(e-r)/2,y:i-(o-n)/2,width:e,height:o}}else this._viewBox={x:s,y:i,width:r,height:n}}_clientToSvg(t,e){const o=this.shadowRoot.querySelector("svg");if(!o)return null;const s=o.createSVGPoint();return s.x=t,s.y=e,s.matrixTransform(o.getScreenCTM().inverse())}_onTouchStart(t){if(2===t.touches.length){t.preventDefault();const e=t.touches[0].clientX-t.touches[1].clientX,o=t.touches[0].clientY-t.touches[1].clientY;return this._pinchPrevDist=Math.sqrt(e*e+o*o),this._pinchActive=!0,this._pinchAnchor0=this._clientToSvg(t.touches[0].clientX,t.touches[0].clientY),this._pinchAnchor1=this._clientToSvg(t.touches[1].clientX,t.touches[1].clientY),this._isPanning=!1,void(this._panStart=null)}if(1===t.touches.length){if(this.linkMode&&!t.target.closest("g[transform]"))return this.linkMode=!1,this._linkSource=null,void(this._mousePos=null);const e=t.touches[0];this._isPanning=!0,this._panStart={x:e.clientX,y:e.clientY,vbX:this._viewBox.x,vbY:this._viewBox.y}}}_onTouchMove(t){if(2===t.touches.length&&this._pinchActive){if(t.preventDefault(),!this._pinchAnchor0||!this._pinchAnchor1)return;const e=t.touches[0].clientX-t.touches[1].clientX,o=t.touches[0].clientY-t.touches[1].clientY,s=Math.sqrt(e*e+o*o);if(!this._pinchPrevDist||0===s)return void(this._pinchPrevDist=s);const i=this._pinchPrevDist/s,r=(this._pinchAnchor0.x+this._pinchAnchor1.x)/2,n=(this._pinchAnchor0.y+this._pinchAnchor1.y)/2,a=this._viewBox,d=Math.max(300,Math.min(2700,a.width*i)),l=d/a.width,c=Math.max(167,Math.min(1500,a.height*l));let p=r-(r-a.x)*l,h=n-(n-a.y)*(c/a.height);const u=this.shadowRoot.querySelector("svg");if(u){const e=u.getBoundingClientRect();if(e.width>0&&e.height>0){const o=(t.touches[0].clientX+t.touches[1].clientX)/2,s=(t.touches[0].clientY+t.touches[1].clientY)/2;p=r-(o-e.left)*(d/e.width),h=n-(s-e.top)*(c/e.height)}}if(this._viewBox={x:p,y:h,width:d,height:c},u){const e=u.getBoundingClientRect();if(e.width>0&&e.height>0){const o=t=>p+(t-e.left)*(d/e.width),s=t=>h+(t-e.top)*(c/e.height);this._pinchAnchor0={x:o(t.touches[0].clientX),y:s(t.touches[0].clientY)},this._pinchAnchor1={x:o(t.touches[1].clientX),y:s(t.touches[1].clientY)}}}return void(this._pinchPrevDist=s)}if(1===t.touches.length&&this._dragging){t.preventDefault();const e=t.touches[0],o=this._clientToSvg(e.clientX,e.clientY);if(!o)return;return void(this.nodePositions={...this.nodePositions,[this._dragging]:{x:o.x-this._dragOffset.x,y:o.y-this._dragOffset.y}})}if(1===t.touches.length&&this._isPanning&&this._panStart){const e=t.touches[0],o=this.shadowRoot.querySelector("svg");if(!o)return;const s=o.getScreenCTM(),i=(e.clientX-this._panStart.x)/s.a,r=(e.clientY-this._panStart.y)/s.d;this._viewBox={...this._viewBox,x:this._panStart.vbX-i,y:this._panStart.vbY-r}}}_onTouchEnd(t){if(t.touches.length<2&&(this._pinchActive=!1,this._pinchPrevDist=0,this._pinchAnchor0=null,this._pinchAnchor1=null,1===t.touches.length&&!this._dragging)){const e=t.touches[0];this._isPanning=!0,this._panStart={x:e.clientX,y:e.clientY,vbX:this._viewBox.x,vbY:this._viewBox.y}}0===t.touches.length&&(this._dragging&&this._markDirty(),this._dragging=null,this._isPanning=!1,this._panStart=null)}_onTouchNodeStart(t,e){if(1!==t.touches.length)return;t.stopPropagation(),this._isPanning=!1;const o=t.touches[0],s=this._clientToSvg(o.clientX,o.clientY);if(!s)return;const i=this.nodePositions[e]||{x:0,y:0};this._dragOffset={x:s.x-i.x,y:s.y-i.y},this._dragging=e}_onMouseUp(){this._dragging&&this._markDirty(),this._dragging=null,this._isMousePanning=!1}async _setAsDefault(){if(!this.selectedLayout)return;for(const[t,e]of Object.entries(this.layouts))e.isDefault&&(e.isDefault=!1,await Et(e));const t=this.layouts[this.selectedLayout];t&&(t.isDefault=!0,await Et(t)),await this._loadLayouts(),this._layoutsLoaded=!0}async _deleteCurrentLayout(){if(!this.selectedLayout)return;const t=this.layouts[this.selectedLayout]?.name||this.selectedLayout,e=this.shadowRoot.querySelector("themed-dialog");await e.show({type:"confirm",title:"Delete Layout",message:`Delete "${t}"? This cannot be undone.`,confirmLabel:"Delete",confirmDanger:!0})&&(await At(this.selectedLayout),this.selectedLayout="",this.nodePositions={},this.manualEdges=[],this.hideAutoEdges=!1,this._dirty=!1,await this._loadLayouts(),this._autoLayout())}}customElements.define("topology-view",ie);const re={online:"#04d65c",offline:"#ef5350",warning:"#ffb74d",unknown:"#666"};class ne extends dt{static properties={device:{type:Object},deviceId:{type:String}};static styles=[ct,r`
    :host {
      display: block;
      background: rgba(255,255,255,0.05);
      border-radius: 8px;
      padding: 14px;
      cursor: pointer;
      transition: all 0.2s;
      border-left: 3px solid var(--status-color, #666);
    }
    :host(:hover) {
      background: rgba(255,255,255,0.08);
      transform: translateY(-1px);
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 4px;
    }
    .name {
      font-size: 14px;
      font-weight: 600;
      color: #fff;
    }
    .status {
      font-size: 11px;
      padding: 2px 8px;
      border-radius: 10px;
    }
    .type {
      font-size: 11px;
      color: rgba(255,255,255,0.5);
      margin-bottom: 8px;
    }
    .attrs {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4px;
    }
    .attr {
      font-size: 11px;
      color: #fff;
    }
    .attr-value { color: #00D4FF; font-weight: 500; }
    .attr-value.warning { color: #ffb74d; }
    .tags {
      display: flex; gap: 4px; margin-top: 8px; flex-wrap: wrap; align-items: center;
    }
    .tag {
      font-size: 9px; color: rgba(0,212,255,0.45);
    }
    .tag-sep {
      font-size: 9px; color: rgba(255,255,255,0.1);
    }

    @media (max-width: 480px) {
      .attrs { grid-template-columns: 1fr; }
    }
  `];render(){if(!this.device)return B``;const t=this.device,e=re[t.status]||re.unknown,o=Object.entries(t.attributes||{}),s=t.hidden_attributes||[],i=t.card_attributes||[];let r;r=i.length>0?i.map(t=>o.find(([e])=>e===t)).filter(Boolean):o.filter(([t])=>!s.includes(t)).slice(0,4);const n=t.attribute_transforms||{},a=[...t.tags||[],...t.server_tags||[]],d=t.device_name||this.deviceId;return this.style.setProperty("--status-color",e),this.setAttribute("role","button"),this.setAttribute("tabindex","0"),this.setAttribute("aria-label",`${d}, ${t.status||"unknown"}`),B`
      <div class="header">
        <span class="name">${d}</span>
        <span class="status" style="background: ${e}20; color: ${e}">
          ${"online"===t.status||"offline"===t.status?"● ":"⚠ "}${t.status}
        </span>
      </div>
      <div class="type">${t.device_type||"unknown"}</div>
      ${r.length>0?B`
        <div class="attrs">
          ${r.map(([t,e])=>{const o=n[t],s=o?ht(e.value,o):`${e.value}${e.unit||""}`;return B`
              <div class="attr">
                ${t.replace(/_/g," ")}: <span class="attr-value ${this._isWarning(t,e)?"warning":""}">${s}</span>
              </div>
            `})}
        </div>
      `:""}
      ${a.length>0?B`
        <div class="tags">
          ${a.map((t,e)=>B`${e>0?B`<span class="tag-sep">·</span>`:""}<span class="tag">${t}</span>`)}
        </div>
      `:""}
    `}_isWarning(t,e){const o={cpu_usage:90,memory_usage:90,disk_usage:95,cpu_temp:80};return o[t]&&e.value>o[t]}}customElements.define("device-card",ne);class ae extends dt{static properties={devices:{type:Object},filter:{type:String},selectedTags:{type:Array},viewMode:{type:String},_groups:{type:Object,state:!0},_collapsedGroups:{type:Object,state:!0},_selectedUngrouped:{type:Array,state:!0}};static styles=[ct,r`
    :host { display: block; padding: 20px; max-width: 1400px; margin: 0 auto; }

    .filter-bar {
      display: flex; gap: 8px; align-items: center;
      margin-bottom: 12px; flex-wrap: wrap;
    }

    .status-filters {
      display: flex; gap: 6px;
    }
    .filter-btn {
      background: rgba(255,255,255,0.05); border: none; color: #fff; padding: 6px 14px;
      border-radius: 16px; cursor: pointer; font-size: 13px; transition: all 0.2s;
    }
    .filter-btn:hover { background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.8); }
    .filter-btn.active { background: #00D4FF; color: #0d0d1f; }

    .view-toggle {
      margin-left: auto; display: flex; gap: 4px;
      background: rgba(255,255,255,0.05); border-radius: 16px; padding: 3px;
    }
    .view-btn {
      background: none; border: none; color: #fff; padding: 4px 14px;
      border-radius: 13px; cursor: pointer; font-size: 13px; transition: all 0.2s;
    }
    .view-btn.active { background: #00D4FF; color: #0d0d1f; font-weight: 600; }
    .view-btn:not(.active):hover { color: rgba(255,255,255,0.8); }

    .active-tags {
      display: flex; gap: 6px; flex-wrap: wrap; align-items: center;
      margin-bottom: 12px;
    }
    .active-tag {
      display: flex; align-items: center; gap: 4px;
      background: rgba(0,212,255,0.15); color: #00D4FF; padding: 4px 10px;
      border-radius: 12px; font-size: 12px;
    }
    .active-tag .remove {
      cursor: pointer; font-size: 14px; line-height: 1;
      color: #00D4FF; opacity: 0.6; transition: opacity 0.15s;
    }
    .active-tag .remove:hover { opacity: 1; }
    .clear-all {
      background: none; border: none; color: #fff; font-size: 12px;
      cursor: pointer; padding: 4px 8px; transition: color 0.15s;
    }
    .clear-all:hover { color: #ef5350; }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 12px;
    }
    .empty {
      text-align: center; padding: 60px; color: #fff;
    }

    /* By Group view */
    .group-section { margin-bottom: 16px; }
    .group-section-header {
      display: flex; align-items: center; gap: 10px;
      background: rgba(255,255,255,0.05); border-radius: 8px; padding: 10px 16px;
      cursor: pointer; user-select: none; margin-bottom: 8px;
      transition: background 0.15s;
    }
    .group-section-header:hover { background: rgba(255,255,255,0.08); }
    .group-chevron { font-size: 10px; color: #fff; transition: transform 0.2s; }
    .group-chevron.open { transform: rotate(90deg); }
    .group-section-name { font-size: 14px; font-weight: 600; color: #fff; }
    .group-health {
      margin-left: auto; font-size: 12px; color: #fff;
      display: flex; gap: 10px;
    }
    .health-dot { display: flex; align-items: center; gap: 4px; }
    .group-device-count { font-size: 11px; color: #fff; }
    .group-body { padding: 0; }
    .ungrouped-header {
      font-size: 11px; color: #fff; text-transform: uppercase;
      letter-spacing: 1px; margin-bottom: 8px; margin-top: 4px;
    }
    .edit-policy-btn {
      background: rgba(0,212,255,0.1); border: 1px solid rgba(0,212,255,0.2);
      color: #00D4FF; padding: 3px 10px; border-radius: 4px;
      font-size: 11px; cursor: pointer; margin-left: 8px;
    }
    .edit-policy-btn:hover { background: rgba(0,212,255,0.2); }
    .select-toolbar {
      display: flex; gap: 8px; align-items: center; margin-bottom: 10px;
      background: rgba(0,212,255,0.05); border: 1px solid rgba(0,212,255,0.15);
      border-radius: 8px; padding: 8px 12px;
    }
    .select-toolbar span { font-size: 12px; color: rgba(255,255,255,0.7); }
    .select-toolbar select, .select-toolbar button {
      background: #0d0d1f; border: 1px solid rgba(255,255,255,0.1);
      color: #fff; padding: 4px 10px; border-radius: 4px; font-size: 11px; cursor: pointer;
    }
    .select-toolbar button { background: #00D4FF; color: #0d0d1f; border: none; font-weight: 600; }
    .device-checkbox {
      position: relative; cursor: pointer;
    }
    .device-checkbox input {
      position: absolute; top: 8px; left: 8px; z-index: 2; cursor: pointer;
      width: 16px; height: 16px; accent-color: #00D4FF;
    }

    @media (max-width: 768px) {
      :host { padding: 12px; }
      .filter-bar { gap: 6px; }
      .grid { grid-template-columns: 1fr; }
    }
  `];constructor(){super(),this.devices={},this.filter="all",this.selectedTags=[],this.viewMode="all",this._groups={},this._collapsedGroups={},this._selectedUngrouped=[],this._wsUnsub=null,this._lastFetchTime=0}connectedCallback(){super.connectedCallback(),this._loadDevices(),this._loadGroups(),this._wsUnsub=pt.onMessage(t=>{"device_update"===t.type&&(this.devices={...this.devices,[t.device_id]:t.device},this.requestUpdate())})}disconnectedCallback(){super.disconnectedCallback(),this._wsUnsub&&this._wsUnsub()}async _loadDevices(){try{const t=await _t(this._lastFetchTime);t&&Object.keys(t).length>0?this.devices={...this.devices,...t}:0===this._lastFetchTime&&(this.devices=t||{}),this._lastFetchTime=Date.now()/1e3}catch(t){console.error("Failed to load devices:",t)}}async _loadGroups(){try{this._groups=await Ft()}catch(t){console.error("Failed to load groups:",t)}}get _filteredDevices(){let t=Object.entries(this.devices);return"all"!==this.filter&&(t=t.filter(([,t])=>t.status===this.filter)),this.selectedTags.length>0&&(t=t.filter(([,t])=>{const e=[...t.tags||[],...t.server_tags||[]];return this.selectedTags.some(t=>e.includes(t))})),t}get _counts(){const t=Object.values(this.devices);return{all:t.length,online:t.filter(t=>"online"===t.status).length,offline:t.filter(t=>"offline"===t.status).length,warning:t.filter(t=>"warning"===t.status).length}}_onTagAdd(t){const e=t.detail.tag;this.selectedTags.includes(e)||(this.selectedTags=[...this.selectedTags,e])}_onTagRemove(t){this.selectedTags=this.selectedTags.filter(e=>e!==t.detail.tag)}render(){const t=this._counts;return B`
      <div class="filter-bar">
        <div class="status-filters">
          <button class="filter-btn ${"all"===this.filter?"active":""}"
            @click=${()=>this.filter="all"}>All (${t.all})</button>
          <button class="filter-btn ${"online"===this.filter?"active":""}"
            @click=${()=>this.filter="online"}>Online (${t.online})</button>
          <button class="filter-btn ${"offline"===this.filter?"active":""}"
            @click=${()=>this.filter="offline"}>Offline (${t.offline})</button>
          <button class="filter-btn ${"warning"===this.filter?"active":""}"
            @click=${()=>this.filter="warning"}>Warning (${t.warning})</button>
        </div>

        <tag-picker
          .selectedTags=${this.selectedTags}
          @tag-add=${this._onTagAdd}
          @tag-remove=${this._onTagRemove}
        ></tag-picker>

        <div class="view-toggle">
          <button class="view-btn ${"all"===this.viewMode?"active":""}"
            @click=${()=>this.viewMode="all"}>All</button>
          <button class="view-btn ${"group"===this.viewMode?"active":""}"
            @click=${()=>this.viewMode="group"}>By Group</button>
        </div>

      </div>

      ${this.selectedTags.length>0?B`
        <div class="active-tags">
          ${this.selectedTags.map(t=>B`
            <span class="active-tag">
              #${t}
              <span class="remove" @click=${()=>this.selectedTags=this.selectedTags.filter(e=>e!==t)}>&times;</span>
            </span>
          `)}
          <button class="clear-all" @click=${()=>{this.selectedTags=[],this.filter="all"}}>Clear all</button>
        </div>
      `:""}

      ${"group"===this.viewMode?this._renderByGroup():this._renderAll()}
    `}_renderAll(){const t=this._filteredDevices;return 0===t.length?B`<div class="empty">No devices found</div>`:B`
      <div class="grid">
        ${t.map(([t,e])=>B`
          <device-card
            .device=${e}
            .deviceId=${t}
            @click=${()=>this._selectDevice(t)}
          ></device-card>
        `)}
      </div>
    `}_renderByGroup(){const t=this._filteredDevices,e=Object.values(this._groups),o={},s=new Set;e.forEach(e=>{const i=t.filter(([t])=>(e.device_ids||[]).includes(t));o[e.id]=i,i.forEach(([t])=>s.add(t))});const i=t.filter(([t])=>!s.has(t));return B`
      ${e.map(t=>this._renderGroupSection(t,o[t.id]||[]))}
      ${i.length>0?B`
        <div class="group-section">
          <div class="ungrouped-header">Ungrouped (${i.length})</div>
          ${this._selectedUngrouped.length>0?B`
            <div class="select-toolbar">
              <span>${this._selectedUngrouped.length} selected</span>
              <select id="group-assign-select">
                ${e.map(t=>B`<option value=${t.id}>${t.name}</option>`)}
              </select>
              <button @click=${this._addSelectedToGroup}>Add to Group</button>
              <button style="background: rgba(255,255,255,0.1); color: #fff;"
                @click=${()=>{this._selectedUngrouped=[]}}>Cancel</button>
            </div>
          `:""}
          <div class="grid">
            ${i.map(([t,e])=>B`
              <div class="device-checkbox">
                <input type="checkbox"
                  .checked=${this._selectedUngrouped.includes(t)}
                  @change=${e=>this._toggleUngroupedSelection(t,e.target.checked)}
                  @click=${t=>t.stopPropagation()}>
                <device-card .device=${e} .deviceId=${t}
                  @click=${()=>this._selectDevice(t)}></device-card>
              </div>
            `)}
          </div>
        </div>
      `:""}
      ${0===t.length?B`<div class="empty">No devices found</div>`:""}
    `}_renderGroupSection(t,e){const o=!!this._collapsedGroups[t.id],s=Object.entries(this.devices).filter(([e])=>(t.device_ids||[]).includes(e)).map(([,t])=>t),i=s.filter(t=>"online"===t.status).length,r=s.length;return B`
      <div class="group-section">
        <div class="group-section-header"
          @click=${()=>this._toggleGroupCollapse(t.id)}>
          <span class="group-chevron ${o?"":"open"}">&#9658;</span>
          <span class="group-section-name">${t.name}</span>
          <span class="group-device-count">${e.length} device${1!==e.length?"s":""}</span>
          <div class="group-health">
            <span class="health-dot" style="color: #04d65c">
              ${i}/${r} online
            </span>
          </div>
          <button class="edit-policy-btn" @click=${e=>{e.stopPropagation(),this._editGroupPolicy(t.id)}}>Edit Policy</button>
        </div>
        ${o?"":B`
          <div class="group-body">
            ${0===e.length?B`<div style="color: #fff; font-size: 13px; padding: 8px 4px;">No devices match current filters</div>`:B`
                <div class="grid">
                  ${e.map(([t,e])=>B`
                    <device-card .device=${e} .deviceId=${t}
                      @click=${()=>this._selectDevice(t)}></device-card>
                  `)}
                </div>
              `}
          </div>
        `}
      </div>
    `}_toggleGroupCollapse(t){this._collapsedGroups={...this._collapsedGroups,[t]:!this._collapsedGroups[t]}}_selectDevice(t){this.dispatchEvent(new CustomEvent("device-select",{detail:{deviceId:t},bubbles:!0,composed:!0}))}_editGroupPolicy(t){this.dispatchEvent(new CustomEvent("group-edit",{detail:{groupId:t},bubbles:!0,composed:!0}))}_toggleUngroupedSelection(t,e){this._selectedUngrouped=e?[...this._selectedUngrouped,t]:this._selectedUngrouped.filter(e=>e!==t)}async _addSelectedToGroup(){const t=this.shadowRoot.querySelector("#group-assign-select");if(!t)return;const e=t.value,o=this._groups[e];if(!o)return;const s=[...new Set([...o.device_ids||[],...this._selectedUngrouped])];try{await Gt(e,{...o,device_ids:s}),this._selectedUngrouped=[],this._loadGroups()}catch(t){console.error("Failed to add devices to group:",t)}}}customElements.define("dashboard-view",ae);class de extends dt{static properties={_tags:{type:Array,state:!0},_loading:{type:Boolean,state:!0},_newTagName:{type:String,state:!0},_renamingTag:{type:String,state:!0},_renameValue:{type:String,state:!0},_selectedTags:{type:Object,state:!0}};static styles=[ct,r`
    :host { display: block; }

    .section {
      background: rgba(255,255,255,0.05); border-radius: 8px; padding: 20px;
      margin-bottom: 20px;
    }
    .section-title {
      font-size: 12px; color: #238ecc; text-transform: uppercase;
      letter-spacing: 1px; margin-bottom: 16px; font-weight: 600;
    }

    .tag-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 8px; margin-bottom: 8px;
    }
    .tag-card {
      background: #0d0d1f; border-radius: 8px; padding: 12px;
      border: 1px solid rgba(255,255,255,0.05); cursor: pointer; transition: all 0.15s;
    }
    .tag-card:hover { border-color: rgba(255,255,255,0.1); background: rgba(255,255,255,0.04); }
    .tag-card.selected { border-color: #00D4FF; background: rgba(0,212,255,0.1); }
    .tag-card-top { display: flex; align-items: center; gap: 8px; margin-bottom: 4px; }
    .tag-card-name { font-size: 14px; color: rgba(255,255,255,0.8); font-weight: 600; }
    .tag-card-count { font-size: 11px; color: #fff; margin-bottom: 8px; }
    .tag-card-actions { display: flex; gap: 4px; }
    .icon-btn {
      background: none; border: none; cursor: pointer; font-size: 12px;
      padding: 2px 8px; border-radius: 4px; transition: all 0.15s;
    }
    .icon-btn.delete { color: #fff; }
    .icon-btn.delete:hover { color: #ef5350; background: rgba(239,83,80,0.1); }
    .sensor-btn {
      background: none; border: none; cursor: pointer; font-size: 11px;
      padding: 2px 8px; border-radius: 4px;
    }
    .sensor-btn.edit { color: #00D4FF; }
    .sensor-btn.edit:hover { background: rgba(0,212,255,0.1); }
    .sensor-btn.remove { color: #fff; }
    .sensor-btn.remove:hover { color: #ef5350; background: rgba(239,83,80,0.1); }
    .sensor-form { background: rgba(255,255,255,0.03); border-radius: 6px; padding: 10px; margin-top: 6px; }
    .sensor-form-grid { display: grid; gap: 6px; margin-bottom: 6px; }
    .sensor-form-grid input {
      background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 4px;
      color: #fff; padding: 6px 8px; font-size: 12px;
    }
    .sensor-form-grid input:focus { outline: none; border-color: #00D4FF; }
    .sensor-form-actions { display: flex; gap: 6px; }
    .form-btn { border: none; padding: 5px 12px; border-radius: 4px; cursor: pointer; font-size: 12px; }
    .form-btn.save { background: #00D4FF; color: #0d0d1f; font-weight: 600; }
    .form-btn.cancel { background: rgba(255,255,255,0.1); color: #fff; }
    .small-input {
      background: #0d0d1f; border: 1px solid rgba(255,255,255,0.1); border-radius: 4px;
      color: #fff; padding: 4px 10px; font-size: 12px;
    }
    .small-input:focus { outline: none; border-color: #00D4FF; }
    .small-btn {
      background: #00D4FF; border: none; color: #0d0d1f; padding: 4px 12px;
      border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: 600;
    }
    .small-btn:hover { background: #33DDFF; }
    .small-btn.cancel { background: rgba(255,255,255,0.1); color: #fff; }
    .small-btn.cancel:hover { background: rgba(255,255,255,0.15); }
    .add-row { display: flex; gap: 8px; align-items: center; margin-top: 12px; }

    @media (max-width: 768px) {
      .tag-grid { grid-template-columns: 1fr; }
    }
  `];constructor(){super(),this._tags=[],this._loading=!0,this._newTagName="",this._renamingTag=null,this._renameValue="",this._selectedTags=new Set}connectedCallback(){super.connectedCallback(),this._loadTags()}async _loadTags(){this._loading=!0;try{const t=await Mt().catch(()=>[]);this._tags=Array.isArray(t)?t.map(t=>"string"==typeof t?{tag:t,count:0}:t).sort((t,e)=>t.tag.localeCompare(e.tag)):[]}finally{this._loading=!1}}render(){const t=this._selectedTags?this._selectedTags.size:0;return B`
      <div class="section">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <div class="section-title" style="margin-bottom: 0;">Tag Registry</div>
          <span style="font-size: 10px; color: #fff;">Server-managed tags only</span>
        </div>

        ${t>0?B`
          <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 12px; padding: 8px 12px; background: rgba(255,255,255,0.03); border-radius: 6px;">
            <span style="font-size: 12px; color: rgba(255,255,255,0.8);">${t} selected</span>
            <button class="small-btn cancel" style="font-size: 11px; padding: 3px 10px;"
              @click=${this._deleteSelectedTags}>Delete Selected</button>
            <button class="small-btn cancel" style="font-size: 11px; padding: 3px 10px;"
              @click=${()=>this._selectedTags=new Set}>Deselect All</button>
          </div>
        `:""}

        ${this._tags.length>0?B`
          <div class="tag-grid">
            ${this._tags.map(t=>this._renderTagCard(t))}
          </div>
        `:B`<div style="color: #fff; font-size: 13px; margin-bottom: 12px;">No tags created yet</div>`}

        ${this._renamingTag?B`
          <div class="sensor-form" style="margin-top: 12px;">
            <div style="font-size: 11px; color: #fff; margin-bottom: 6px;">Rename "${this._renamingTag}"</div>
            <div class="sensor-form-grid" style="grid-template-columns: 1fr;">
              <input type="text" .value=${this._renameValue}
                @input=${t=>this._renameValue=t.target.value}
                @keydown=${t=>{"Enter"===t.key&&this._saveRename(this._renamingTag),"Escape"===t.key&&this._cancelRename()}}>
            </div>
            <div class="sensor-form-actions">
              <button class="form-btn save" @click=${()=>this._saveRename(this._renamingTag)}>Rename</button>
              <button class="form-btn cancel" @click=${this._cancelRename}>Cancel</button>
            </div>
          </div>
        `:""}

        <div class="add-row" style="margin-top: 12px;">
          <input class="small-input" type="text" placeholder="New tag name..."
            .value=${this._newTagName}
            @input=${t=>this._newTagName=t.target.value}
            @keydown=${t=>"Enter"===t.key&&this._createTag()}>
          <button class="small-btn" @click=${this._createTag}>Create Tag</button>
        </div>
      </div>
    `}_renderTagCard(t){const e=this._selectedTags&&this._selectedTags.has(t.tag),o=t.device_count||t.count||0;return B`
      <div class="tag-card ${e?"selected":""}"
        role="checkbox"
        aria-checked=${e?"true":"false"}
        aria-label="Tag: ${t.tag}, used by ${o} device${1!==o?"s":""}"
        tabindex="0"
        @click=${()=>this._toggleTagSelection(t.tag)}
        @keydown=${e=>("Enter"===e.key||" "===e.key)&&this._toggleTagSelection(t.tag)}>
        <div class="tag-card-top">
          <span class="tag-card-name">${t.tag}</span>
        </div>
        <div class="tag-card-count">${o} device${1!==o?"s":""}</div>
        <div class="tag-card-actions">
          <button class="sensor-btn edit" aria-label="Rename tag ${t.tag}"
            @click=${e=>{e.stopPropagation(),this._startRename(t.tag)}}>Rename</button>
          <button class="sensor-btn remove" aria-label="Delete tag ${t.tag}"
            @click=${e=>{e.stopPropagation(),this._deleteTag(t.tag)}}>Delete</button>
        </div>
      </div>
    `}_toggleTagSelection(t){const e=new Set(this._selectedTags);e.has(t)?e.delete(t):e.add(t),this._selectedTags=e}async _deleteSelectedTags(){const t=[...this._selectedTags];if(confirm(`Delete ${t.length} tag${1!==t.length?"s":""}?`)){for(const e of t)try{await jt(e)}catch(t){console.error(t)}this._selectedTags=new Set,await this._loadTags()}}_startRename(t){this._renamingTag=t,this._renameValue=t}_cancelRename(){this._renamingTag=null,this._renameValue=""}async _saveRename(t){const e=this._renameValue.trim();if(e&&e!==t){try{await It(t,e),await this._loadTags()}catch(t){console.error("Failed to rename tag:",t)}this._cancelRename()}else this._cancelRename()}async _createTag(){const t=this._newTagName.trim();if(t)try{await Lt(t),this._newTagName="",await this._loadTags()}catch(t){console.error("Failed to create tag:",t)}}async _deleteTag(t){const e=this._tags.find(e=>e.tag===t);if(!(e&&e.count>0)||confirm(`"${t}" is used by ${e.count} device(s). Delete anyway?`))try{await jt(t),await this._loadTags()}catch(t){console.error("Failed to delete tag:",t)}}}customElements.define("tag-registry-settings",de);class le extends dt{static properties={_groups:{type:Object,state:!0},_devices:{type:Object,state:!0},_loading:{type:Boolean,state:!0},_expandedGroup:{type:String,state:!0},_newGroupName:{type:String,state:!0},_editGroupName:{type:String,state:!0},_editingGroupName:{type:String,state:!0},_groupSaveStatus:{type:Object,state:!0},_groupPushStatus:{type:Object,state:!0},_editingGroupCmd:{type:Object,state:!0},_showAddGroupCmd:{type:Object,state:!0},_groupCmdForm:{type:Object,state:!0},_editingGroupSensor:{type:Object,state:!0},_showAddGroupSensor:{type:Object,state:!0},_groupSensorForm:{type:Object,state:!0}};static styles=[ct,r`
    :host { display: block; }

    .section {
      background: rgba(255,255,255,0.05); border-radius: 8px; padding: 20px;
      margin-bottom: 20px;
    }
    .section-title {
      font-size: 12px; color: #238ecc; text-transform: uppercase;
      letter-spacing: 1px; margin-bottom: 16px; font-weight: 600;
    }

    /* Group policies */
    .group-list { display: flex; flex-direction: column; gap: 8px; }
    .group-header {
      display: flex; align-items: center; justify-content: space-between;
      background: #0d0d1f; border-radius: 6px; padding: 10px 14px;
      cursor: pointer; user-select: none;
    }
    .group-header:hover { background: rgba(255,255,255,0.06); }
    .group-header-left { display: flex; align-items: center; gap: 10px; }
    .group-header-name { font-size: 14px; color: rgba(255,255,255,0.8); font-weight: 600; }
    .group-member-count { font-size: 11px; color: #fff; }
    .chevron { font-size: 10px; color: #fff; transition: transform 0.2s; }
    .chevron.open { transform: rotate(90deg); }
    .group-body {
      background: #0d0d1f; border-radius: 0 0 6px 6px;
      padding: 14px; margin-top: -4px; border-top: 1px solid rgba(255,255,255,0.05);
    }
    .group-field { margin-bottom: 14px; }
    .group-field label {
      display: block; font-size: 11px; color: #fff; text-transform: uppercase;
      letter-spacing: 0.5px; margin-bottom: 6px;
    }
    .members-row { display: flex; gap: 6px; flex-wrap: wrap; align-items: center; }
    .member-pill {
      display: flex; align-items: center; gap: 4px;
      background: rgba(0,212,255,0.15); color: #00D4FF; padding: 3px 10px;
      border-radius: 12px; font-size: 12px;
    }
    .member-pill .remove {
      cursor: pointer; color: #00D4FF; font-size: 13px; line-height: 1;
      opacity: 0.5; transition: all 0.15s;
    }
    .member-pill .remove:hover { color: #ef5350; opacity: 1; }
    .threshold-input {
      width: 100%; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
      border-radius: 4px; color: #fff; padding: 6px 10px;
      font-size: 13px; box-sizing: border-box;
    }
    .threshold-input:focus { outline: none; border-color: #00D4FF; }
    .group-footer { display: flex; gap: 8px; margin-top: 12px; align-items: center; }
    .group-save-btn {
      background: #00D4FF; border: none; color: #0d0d1f; padding: 6px 16px;
      border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 600;
    }
    .group-save-btn:hover { background: #33DDFF; }
    .group-delete-btn {
      background: rgba(239,83,80,0.1); border: none; color: #ef5350;
      padding: 6px 16px; border-radius: 6px; cursor: pointer; font-size: 13px;
    }
    .group-delete-btn:hover { background: rgba(239,83,80,0.2); }
    .group-status-saved { font-size: 12px; color: #04d65c; }
    .group-status-error { font-size: 12px; color: #ef5350; }
    .group-status-pushing { font-size: 12px; color: #00D4FF; }
    .group-status-pushed { font-size: 12px; color: #04d65c; }

    /* Toggle switch (command discovered) */
    .cmd-toggle-wrap { cursor: pointer; flex-shrink: 0; }
    .cmd-toggle {
      width: 28px; height: 16px; border-radius: 8px; position: relative;
      transition: background 0.2s;
    }
    .cmd-toggle.on { background: #7e57c2; }
    .cmd-toggle.off { background: #333; }
    .cmd-toggle-knob {
      width: 12px; height: 12px; border-radius: 50%; background: #fff;
      position: absolute; top: 2px; transition: left 0.2s;
    }
    .cmd-toggle.on .cmd-toggle-knob { left: 14px; }
    .cmd-toggle.off .cmd-toggle-knob { left: 2px; }

    /* Sensor / command tables */
    .sensor-table { width: 100%; border-collapse: collapse; margin-bottom: 12px; }
    .sensor-table th {
      text-align: left; font-size: 10px; color: #fff; padding: 6px 8px;
      text-transform: uppercase; letter-spacing: 0.5px;
    }
    .sensor-table td {
      font-size: 12px; color: rgba(255,255,255,0.8); padding: 6px 8px;
      border-bottom: 1px solid rgba(255,255,255,0.05);
    }
    .sensor-table tr:last-child td { border-bottom: none; }
    .sensor-btn {
      background: none; border: none; cursor: pointer; font-size: 11px;
      padding: 2px 8px; border-radius: 4px;
    }
    .sensor-btn.edit { color: #00D4FF; }
    .sensor-btn.edit:hover { background: rgba(0,212,255,0.1); }
    .sensor-btn.remove { color: #fff; }
    .sensor-btn.remove:hover { color: #ef5350; background: rgba(239,83,80,0.1); }
    .sensor-actions { display: flex; gap: 4px; }
    .sensor-form { background: rgba(255,255,255,0.03); border-radius: 6px; padding: 10px; margin-top: 6px; }
    .sensor-form-grid { display: grid; gap: 6px; margin-bottom: 6px; }
    .sensor-form-grid input {
      background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 4px;
      color: #fff; padding: 6px 8px; font-size: 12px;
    }
    .sensor-form-grid input:focus { outline: none; border-color: #00D4FF; }
    .sensor-form-actions { display: flex; gap: 6px; }
    .form-btn { border: none; padding: 5px 12px; border-radius: 4px; cursor: pointer; font-size: 12px; }
    .form-btn.save { background: #00D4FF; color: #0d0d1f; font-weight: 600; }
    .form-btn.cancel { background: rgba(255,255,255,0.1); color: #fff; }

    .icon-btn {
      background: none; border: none; cursor: pointer; font-size: 12px;
      padding: 2px 8px; border-radius: 4px; transition: all 0.15s;
    }
    .icon-btn.delete { color: #fff; }
    .icon-btn.delete:hover { color: #ef5350; background: rgba(239,83,80,0.1); }

    .small-input {
      background: #0d0d1f; border: 1px solid rgba(255,255,255,0.1); border-radius: 4px;
      color: #fff; padding: 4px 10px; font-size: 12px;
    }
    .small-input:focus { outline: none; border-color: #00D4FF; }
    .small-btn {
      background: #00D4FF; border: none; color: #0d0d1f; padding: 4px 12px;
      border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: 600;
    }
    .small-btn:hover { background: #33DDFF; }
    .add-row { display: flex; gap: 8px; align-items: center; margin-top: 12px; }

    .subsection-label {
      font-size: 11px; color: #fff; margin-bottom: 6px; margin-top: 8px;
    }
    .add-cmd-btn {
      background: none; border: 1px solid rgba(255,255,255,0.1); color: #fff;
      padding: 4px 12px; border-radius: 4px; cursor: pointer; font-size: 11px;
      margin-top: 4px; transition: all 0.15s;
    }
    .add-cmd-btn:hover { border-color: #00D4FF; color: #00D4FF; }

    @media (max-width: 768px) {
      .sensor-form-grid { grid-template-columns: 1fr; }
      .add-row { flex-direction: column; }
      .add-row input, .add-row select { width: 100%; box-sizing: border-box; }
    }
  `];constructor(){super(),this._groups={},this._devices={},this._loading=!0,this._expandedGroup=null,this._newGroupName="",this._editGroupName="",this._editingGroupName=null,this._groupSaveStatus={},this._groupPushStatus={},this._editingGroupCmd=null,this._showAddGroupCmd=null,this._groupCmdForm={name:"",shell:""},this._editingGroupSensor=null,this._showAddGroupSensor=null,this._groupSensorForm={name:"",command:"",interval:"",unit:""}}connectedCallback(){super.connectedCallback(),this._loadAll()}async _loadAll(){this._loading=!0;try{const[t,e]=await Promise.all([Ft().catch(()=>({})),_t().catch(()=>({}))]);this._groups=t||{},this._devices=e||{}}finally{this._loading=!1}}render(){const t=Object.values(this._groups);return B`
      <div class="section">
        <div class="section-title">Group Policies</div>
        <div class="group-list">
          ${t.map(t=>this._renderGroup(t))}
        </div>
        <div class="add-row">
          <input class="small-input" type="text" placeholder="New group name..."
            .value=${this._newGroupName}
            @input=${t=>this._newGroupName=t.target.value}
            @keydown=${t=>"Enter"===t.key&&this._createGroup()}>
          <button class="small-btn" @click=${this._createGroup}>New Group</button>
        </div>
      </div>
    `}_renderGroup(t){const e=this._expandedGroup===t.id,o=(t.device_ids||[]).length;return B`
      <div>
        <div class="group-header" @click=${()=>this._toggleGroup(t.id)}>
          <div class="group-header-left">
            <span class="chevron ${e?"open":""}">&#9658;</span>
            <span class="group-header-name">${t.name}</span>
            <span class="group-member-count">${o} member${1!==o?"s":""}</span>
          </div>
        </div>
        ${e?B`
          <div class="group-body">
            <div class="group-field">
              <label>Name</label>
              <input class="threshold-input" type="text"
                .value=${this._editingGroupName===t.id?this._editGroupName:t.name||""}
                @input=${e=>{this._editingGroupName=t.id,this._editGroupName=e.target.value}}>
            </div>

            <div class="group-field">
              <label>Members</label>
              <div class="members-row">
                ${(t.device_ids||[]).map(e=>{const o=this._devices[e];return B`
                    <span class="member-pill">
                      ${o&&o.device_name||e}
                      <span class="remove" @click=${()=>this._removeMember(t,e)}>&times;</span>
                    </span>
                  `})}
                ${this._renderAddMemberDropdown(t)}
              </div>
            </div>

            <div class="group-field">
              <label>Collection Interval</label>
              <div style="display: flex; gap: 8px; align-items: center;">
                <input class="threshold-input" type="number" min="1" step="1"
                  placeholder="Default (seconds)" style="max-width: 220px;"
                  .value=${null!=t.interval?String(t.interval):""}
                  @change=${e=>this._setGroupInterval(t,e.target.value)}>
                ${null!=t.interval?B`
                  <button class="sensor-btn remove" style="white-space: nowrap;"
                    @click=${()=>this._setGroupInterval(t,null)}>Clear</button>
                `:""}
              </div>
            </div>

            <div class="group-field">
              <label>Thresholds</label>
              ${this._renderGroupThresholds(t)}
            </div>

            <div class="group-field">
              <label>Custom Commands</label>
              ${this._renderGroupCustomCommands(t)}
            </div>

            <div class="group-field">
              <label>Custom Sensors</label>
              ${this._renderGroupCustomSensors(t)}
            </div>

            <div class="group-footer">
              <button class="group-delete-btn" @click=${()=>this._deleteGroup(t)}>Delete Group</button>
              <div style="display: flex; gap: 8px; align-items: center; margin-left: auto;">
                ${"Deploying..."===this._groupPushStatus[t.id]?B`<span class="group-status-pushing">Deploying...</span>`:""}
                ${"Deployed!"===this._groupPushStatus[t.id]?B`<span class="group-status-pushed">Deployed!</span>`:""}
                ${(this._groupPushStatus[t.id]||"").startsWith("Error")?B`<span class="group-status-error">${this._groupPushStatus[t.id]}</span>`:""}
                <button class="group-save-btn" style="background: #2e7d32;"
                  @click=${()=>this._deployToDevices(t)}>Deploy to Devices</button>
              </div>
            </div>
          </div>
        `:""}
      </div>
    `}_getGroupDiscoveredData(t){const e=t.device_ids||[],o=new Set,s={},i={};for(const t of e){const e=this._devices[t];if(!e)continue;if(e.attributes&&"object"==typeof e.attributes)for(const t of Object.keys(e.attributes))o.add(t);if(Array.isArray(e.allowed_commands))for(const t of e.allowed_commands)t in s||(s[t]="");const r=e.remote_config;if(r&&r.plugins&&r.plugins.custom_command&&r.plugins.custom_command.commands)for(const[t,e]of Object.entries(r.plugins.custom_command.commands))i[t]||(i[t]=e)}return{attributes:Array.from(o).sort(),commands:s,sensors:i}}_renderGroupCustomCommands(t){const e=t.custom_commands||{},o=Object.entries(e).sort(([t],[e])=>t.localeCompare(e)),s=t.hidden_commands||[],i=o.filter(([t])=>!s.includes(t)),r=o.filter(([t])=>s.includes(t)),n=this._editingGroupCmd&&this._editingGroupCmd.groupId===t.id,a=this._showAddGroupCmd&&this._showAddGroupCmd.groupId===t.id;return B`
      ${i.length>0?B`
        <table class="sensor-table">
          <thead>
            <tr><th>Name</th><th>Shell Command</th><th></th></tr>
          </thead>
          <tbody>
            ${i.map(([e,o])=>B`
              <tr>
                <td style="font-family: monospace;">${e}</td>
                <td style="font-family: monospace; font-size: 11px;">${o||"—"}</td>
                <td>
                  <div class="sensor-actions">
                    <button class="sensor-btn edit"
                      @click=${()=>this._startEditGroupCmd(t.id,e,o)}>Edit</button>
                    <button class="sensor-btn remove"
                      @click=${()=>this._removeGroupCommand(t,e)}>Remove</button>
                  </div>
                </td>
              </tr>
            `)}
          </tbody>
        </table>
      `:B`
        <div style="font-size: 12px; color: #fff; margin-bottom: 8px;">No commands</div>
      `}

      ${r.length>0?B`
        <div style="margin-top: 6px;">
          <div style="font-size: 10px; color: #fff; margin-bottom: 4px; cursor: pointer;"
            @click=${()=>{t._showHiddenCmds=!t._showHiddenCmds,this.requestUpdate()}}>
            ${t._showHiddenCmds?"▾":"▸"} ${r.length} hidden
          </div>
          ${t._showHiddenCmds?B`
            <div style="display: flex; gap: 4px; flex-wrap: wrap;">
              ${r.map(([e])=>B`
                <span style="font-size: 11px; background: #0d0d1f; color: #fff; padding: 3px 10px; border-radius: 4px; display: flex; align-items: center; gap: 4px;">
                  ${e}
                  <span style="cursor: pointer; color: #00D4FF; font-size: 10px;"
                    @click=${()=>this._unhideGroupCommand(t,e)}>show</span>
                </span>
              `)}
            </div>
          `:""}
        </div>
      `:""}

      ${n||a?B`
        <div class="sensor-form">
          <div class="sensor-form-grid" style="grid-template-columns: 1fr 2fr;">
            <input type="text" placeholder="Command name"
              .value=${this._groupCmdForm.name}
              ?disabled=${!!n}
              @input=${t=>this._groupCmdForm={...this._groupCmdForm,name:t.target.value}}>
            <input type="text" placeholder="Shell command"
              .value=${this._groupCmdForm.shell}
              @input=${t=>this._groupCmdForm={...this._groupCmdForm,shell:t.target.value}}
              @keydown=${e=>"Enter"===e.key&&this._saveGroupCmd(t)}>
          </div>
          <div class="sensor-form-actions">
            <button class="form-btn save" @click=${()=>this._saveGroupCmd(t)}>${n?"Update":"Add"}</button>
            <button class="form-btn cancel" @click=${this._cancelGroupCmdForm}>Cancel</button>
          </div>
        </div>
      `:B`
        <button class="add-cmd-btn" @click=${()=>this._startAddGroupCmd(t.id)}>+ Add Command</button>
      `}
    `}_startAddGroupCmd(t){this._showAddGroupCmd={groupId:t},this._editingGroupCmd=null,this._groupCmdForm={name:"",shell:""}}_startEditGroupCmd(t,e,o){this._editingGroupCmd={groupId:t,name:e},this._showAddGroupCmd=null,this._groupCmdForm={name:e,shell:o}}_cancelGroupCmdForm(){this._editingGroupCmd=null,this._showAddGroupCmd=null,this._groupCmdForm={name:"",shell:""}}async _saveGroupCmd(t){const e=this._groupCmdForm?.name?.trim(),o=this._groupCmdForm?.shell?.trim();if(!e||!o)return;const s={...this._getLatestGroup(t).custom_commands||{},[e]:o};await Gt(t.id,{custom_commands:s}),await this._loadAll(),this._cancelGroupCmdForm()}async _removeGroupCommand(t,e){const o=this._getLatestGroup(t),s={...o.custom_commands||{}};delete s[e];try{await Gt(t.id,this._buildGroupPayload(o,{custom_commands:s}))}catch(t){console.error("Failed to remove group command:",t)}await this._loadAll()}_getLatestGroup(t){return this._groups[t.id]||t}_buildGroupPayload(t,e={}){return{name:t.name,device_ids:t.device_ids||[],custom_commands:t.custom_commands||{},custom_sensors:t.custom_sensors||{},thresholds:t.thresholds||{},hidden_commands:t.hidden_commands||[],attribute_transforms:t.attribute_transforms||{},...e}}async _hideGroupCommand(t,e){const o=this._getLatestGroup(t),s=[...o.hidden_commands||[]];s.includes(e)||s.push(e);try{await Gt(t.id,this._buildGroupPayload(o,{hidden_commands:s}))}catch(t){console.error("Failed to hide group command:",t)}await this._loadAll()}async _unhideGroupCommand(t,e){const o=this._getLatestGroup(t),s=(o.hidden_commands||[]).filter(t=>t!==e);try{await Gt(t.id,this._buildGroupPayload(o,{hidden_commands:s}))}catch(t){console.error("Failed to unhide group command:",t)}await this._loadAll()}_renderGroupThresholds(t){const e=t.thresholds||{},o=t.crit_thresholds||{},s=t.attribute_transforms||{},i=this._getGroupDiscoveredData(t).attributes,r=Object.keys(e).filter(t=>null!=e[t]&&!i.includes(t)),n=Object.keys(o).filter(t=>null!=o[t]&&!i.includes(t)&&!r.includes(t)),a=[...i,...r,...n];return 0===a.length?B`<div style="font-size: 13px; color: rgba(255,255,255,0.4); margin-bottom: 6px;">No attributes discovered from member devices yet.</div>`:B`
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 8px;">
        ${a.map(i=>{const r=e[i],n=null!=r,a=n&&"object"==typeof r&&r.op||">",d=n?"object"==typeof r?r.value:r:null,l=o[i],c=null!=l,p=c&&"object"==typeof l&&l.op||">",h=c?"object"==typeof l?l.value:l:null;return B`
            <div style="background: rgba(255,255,255,0.03); border-radius: 8px; padding: 10px 12px;
              ${c?"border: 1px solid rgba(239,83,80,0.2);":n?"border: 1px solid rgba(255,183,77,0.15);":"border: 1px solid transparent;"}">
              <div style="font-size: 12px; color: #fff; margin-bottom: 8px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.3px;">
                ${i.replace(/_/g," ")}
              </div>
              <div style="display: flex; align-items: center; gap: 4px; margin-bottom: 4px;">
                <span style="font-size: 11px; color: rgba(255,183,77,0.7); text-transform: uppercase; letter-spacing: 0.5px; width: 34px; font-weight: 600;">warn</span>
                <select style="background: #0d0d1f; border: none; border-radius: 3px; color: rgba(255,255,255,0.6); padding: 2px; font-size: 11px; width: 38px; appearance: none; -webkit-appearance: none;"
                  .value=${a}
                  @change=${e=>this._updateGroupThreshold(t.id,i,d,e.target.value)}>
                  <option value=">" style="background: #0d0d1f; color: #fff;">&gt;</option>
                  <option value="<" style="background: #0d0d1f; color: #fff;">&lt;</option>
                  <option value=">=" style="background: #0d0d1f; color: #fff;">&gt;=</option>
                  <option value="<=" style="background: #0d0d1f; color: #fff;">&lt;=</option>
                  <option value="==" style="background: #0d0d1f; color: #fff;">==</option>
                  <option value="!=" style="background: #0d0d1f; color: #fff;">!=</option>
                </select>
                <input type="number" placeholder="\u2014"
                  style="width: 55px; font-size: 11px; padding: 3px 4px; background: #0d0d1f; border: 1px solid rgba(255,255,255,0.08); border-radius: 3px; color: rgba(255,255,255,0.7); text-align: center;"
                  .value=${null!=d?String(d):""}
                  @change=${e=>this._updateGroupThreshold(t.id,i,e.target.value,a)}>
                ${n?B`
                  <span style="font-size: 12px; color: rgba(255,255,255,0.3); cursor: pointer;" title="Clear"
                    @click=${()=>this._removeGroupThreshold(t.id,i)}>&times;</span>
                `:""}
              </div>
              <div style="display: flex; align-items: center; gap: 4px;">
                <span style="font-size: 11px; color: rgba(239,83,80,0.7); text-transform: uppercase; letter-spacing: 0.5px; width: 34px; font-weight: 600;">crit</span>
                <select style="background: #0d0d1f; border: none; border-radius: 3px; color: rgba(255,255,255,0.6); padding: 2px; font-size: 11px; width: 38px; appearance: none; -webkit-appearance: none;"
                  .value=${p}
                  @change=${e=>this._updateGroupCritThreshold(t.id,i,h,e.target.value)}>
                  <option value=">" style="background: #0d0d1f; color: #fff;">&gt;</option>
                  <option value="<" style="background: #0d0d1f; color: #fff;">&lt;</option>
                  <option value=">=" style="background: #0d0d1f; color: #fff;">&gt;=</option>
                  <option value="<=" style="background: #0d0d1f; color: #fff;">&lt;=</option>
                  <option value="==" style="background: #0d0d1f; color: #fff;">==</option>
                  <option value="!=" style="background: #0d0d1f; color: #fff;">!=</option>
                </select>
                <input type="number" placeholder="\u2014"
                  style="width: 55px; font-size: 11px; padding: 3px 4px; background: #0d0d1f; border: 1px solid rgba(255,255,255,0.08); border-radius: 3px; color: rgba(255,255,255,0.7); text-align: center;"
                  .value=${null!=h?String(h):""}
                  @change=${e=>this._updateGroupCritThreshold(t.id,i,e.target.value,p)}>
                ${c?B`
                  <span style="font-size: 12px; color: rgba(255,255,255,0.3); cursor: pointer;" title="Clear"
                    @click=${()=>this._removeGroupCritThreshold(t.id,i)}>&times;</span>
                `:""}
              </div>
              <div style="display: flex; align-items: center; gap: 6px; margin-top: 6px; padding-top: 4px; border-top: 1px solid rgba(255,255,255,0.05);">
                <span style="font-size: 9px; color: rgba(255,255,255,0.3); text-transform: uppercase; letter-spacing: 0.5px; white-space: nowrap;">Transform</span>
                <select style="flex: 1; background: #0d0d1f; border: 1px solid rgba(255,255,255,0.08); border-radius: 4px; color: rgba(255,255,255,0.5); padding: 2px 4px; font-size: 10px; cursor: pointer; appearance: none; -webkit-appearance: none;"
                  .value=${s[i]||""}
                  @change=${e=>this._updateGroupTransform(t.id,i,e.target.value)}>
                  ${mt().map(t=>B`
                    <option value=${t.value} ?selected=${t.value===(s[i]||"")}
                      style="background: #0d0d1f; color: #fff;">${t.label}</option>
                  `)}
                </select>
              </div>
            </div>
          `})}
      </div>
    `}_updateGroupThreshold(t,e,o,s=">"){const i=this._groups[t];if(!i)return;const r={...i.thresholds||{}};""===o||null==o?delete r[e]:r[e]={op:s,value:Number(o)},this._groups={...this._groups,[t]:{...i,thresholds:r}}}_removeGroupThreshold(t,e){const o=this._groups[t];if(!o)return;const s={...o.thresholds||{}};delete s[e],this._groups={...this._groups,[t]:{...o,thresholds:s}}}_updateGroupCritThreshold(t,e,o,s=">"){const i=this._groups[t];if(!i)return;const r={...i.crit_thresholds||{}};""===o||null==o?delete r[e]:r[e]={op:s,value:Number(o)},this._groups={...this._groups,[t]:{...i,crit_thresholds:r}}}_removeGroupCritThreshold(t,e){const o=this._groups[t];if(!o)return;const s={...o.crit_thresholds||{}};delete s[e],this._groups={...this._groups,[t]:{...o,crit_thresholds:s}}}_updateGroupTransform(t,e,o){const s=this._groups[t];if(!s)return;const i={...s.attribute_transforms||{}};o?i[e]=o:delete i[e],this._groups={...this._groups,[t]:{...s,attribute_transforms:i}}}_renderGroupCustomSensors(t){const e=t.custom_sensors||{},o=this._editingGroupSensor&&this._editingGroupSensor.groupId===t.id,s=this._showAddGroupSensor&&this._showAddGroupSensor.groupId===t.id;return B`
      ${Object.keys(e).length>0?B`
        <table class="sensor-table">
          <thead>
            <tr><th>Name</th><th>Command</th><th>Interval</th><th>Unit</th><th></th></tr>
          </thead>
          <tbody>
            ${Object.entries(e).map(([e,o])=>B`
              <tr>
                <td style="font-family: monospace;">${e}</td>
                <td style="font-family: monospace; font-size: 11px;">${o.command||"—"}</td>
                <td>${o.interval?o.interval+"s":"—"}</td>
                <td>${o.unit||"—"}</td>
                <td>
                  <div class="sensor-actions">
                    <button class="sensor-btn edit"
                      @click=${()=>this._startEditGroupSensor(t.id,e,o)}>Edit</button>
                    <button class="sensor-btn remove"
                      @click=${()=>this._removeGroupSensor(t,e)}>Remove</button>
                  </div>
                </td>
              </tr>
            `)}
          </tbody>
        </table>
      `:B`
        <div style="font-size: 12px; color: #fff; margin-bottom: 8px;">No group sensors defined.</div>
      `}

      ${o||s?B`
        <div class="sensor-form">
          <div class="sensor-form-grid" style="grid-template-columns: 1fr 2fr 80px 80px;">
            <input type="text" placeholder="Name"
              .value=${this._groupSensorForm.name}
              ?disabled=${!!o}
              @input=${t=>this._groupSensorForm={...this._groupSensorForm,name:t.target.value}}>
            <input type="text" placeholder="Shell command"
              .value=${this._groupSensorForm.command}
              @input=${t=>this._groupSensorForm={...this._groupSensorForm,command:t.target.value}}>
            <input type="number" placeholder="Interval (s)"
              .value=${this._groupSensorForm.interval}
              @input=${t=>this._groupSensorForm={...this._groupSensorForm,interval:t.target.value}}>
            <input type="text" placeholder="Unit"
              .value=${this._groupSensorForm.unit}
              @input=${t=>this._groupSensorForm={...this._groupSensorForm,unit:t.target.value}}>
          </div>
          <div class="sensor-form-actions">
            <button class="form-btn save" @click=${()=>this._saveGroupSensor(t)}>${o?"Update":"Add"}</button>
            <button class="form-btn cancel" @click=${this._cancelGroupSensorForm}>Cancel</button>
          </div>
        </div>
      `:B`
        <button class="add-cmd-btn" @click=${()=>this._startAddGroupSensor(t.id)}>+ Add Sensor</button>
      `}
    `}_startAddGroupSensor(t){this._showAddGroupSensor={groupId:t},this._editingGroupSensor=null,this._groupSensorForm={name:"",command:"",interval:"",unit:""}}_startEditGroupSensor(t,e,o){this._editingGroupSensor={groupId:t,name:e},this._showAddGroupSensor=null,this._groupSensorForm={name:e,command:o.command||"",interval:null!=o.interval?String(o.interval):"",unit:o.unit||""}}_cancelGroupSensorForm(){this._editingGroupSensor=null,this._showAddGroupSensor=null,this._groupSensorForm={name:"",command:"",interval:"",unit:""}}async _saveGroupSensor(t){const e=this._groupSensorForm?.name?.trim(),o=this._groupSensorForm?.command?.trim();if(!e||!o)return;const s={command:o,unit:this._groupSensorForm?.unit||"",interval:parseInt(this._groupSensorForm?.interval)||void 0},i={...this._getLatestGroup(t).custom_sensors||{},[e]:s};await Gt(t.id,{custom_sensors:i}),await this._loadAll(),this._cancelGroupSensorForm()}async _removeGroupSensor(t,e){const o=this._getLatestGroup(t),s={...o.custom_sensors||{}};delete s[e];try{await Gt(t.id,this._buildGroupPayload(o,{custom_sensors:s}))}catch(t){console.error("Failed to remove group sensor:",t)}await this._loadAll()}_renderAddMemberDropdown(t){const e=t.device_ids||[],o=Object.entries(this._devices).filter(([t])=>!e.includes(t));return 0===o.length?B``:B`
      <select class="small-input" style="padding: 3px 8px;"
        @change=${e=>{e.target.value&&(this._addMember(t,e.target.value),e.target.value="")}}>
        <option value="">Add device...</option>
        ${o.map(([t,e])=>B`
          <option value=${t}>${e.device_name||t}</option>
        `)}
      </select>
    `}_toggleGroup(t){this._expandedGroup=this._expandedGroup===t?null:t}async _addMember(t,e){const o=[...t.device_ids||[],e];try{await Gt(t.id,{device_ids:o}),await this._loadAll()}catch(t){console.error("Failed to add member:",t)}}async _setGroupInterval(t,e){const o=null===e||""===e?null:parseInt(e,10);if(null===e||""===e||!(isNaN(o)||o<1))try{await Gt(t.id,{interval:o}),this._groups={...this._groups,[t.id]:{...this._groups[t.id],interval:o}}}catch(t){console.error("Failed to set group interval:",t)}}async _removeMember(t,e){const o=(t.device_ids||[]).filter(t=>t!==e);try{await Gt(t.id,{device_ids:o}),await this._loadAll()}catch(t){console.error("Failed to remove member:",t)}}async _updateGroup(t){const e=this._groups[t.id]||t,o=this._editingGroupName===t.id?this._editGroupName.trim():e.name,s={};for(const[t,o]of Object.entries(e.thresholds||{}))null!=o&&("object"==typeof o&&null!=o.value?s[t]=o:"number"!=typeof o||isNaN(o)||(s[t]=o));const i={};for(const[t,o]of Object.entries(e.crit_thresholds||{}))null!=o&&("object"==typeof o&&null!=o.value?i[t]=o:"number"!=typeof o||isNaN(o)||(i[t]=o));const r=o||e.name,n={name:r,device_ids:e.device_ids||[],custom_commands:e.custom_commands||{},custom_sensors:e.custom_sensors||{},thresholds:s,crit_thresholds:i,hidden_commands:e.hidden_commands||[],interval:null!=e.interval?e.interval:null,attribute_transforms:e.attribute_transforms||{}};console.log("Saving group:",t.id,n);try{await Gt(t.id,n),this._groups={...this._groups,[t.id]:{...e,name:r,thresholds:s,crit_thresholds:i,attribute_transforms:e.attribute_transforms||{}}},this._editingGroupName===t.id&&(this._editingGroupName=null),this._groupSaveStatus={...this._groupSaveStatus,[t.id]:"saved"},setTimeout(()=>{this._groupSaveStatus={...this._groupSaveStatus,[t.id]:""}},2e3)}catch(e){console.error("Failed to update group:",e),this._groupSaveStatus={...this._groupSaveStatus,[t.id]:"error"},setTimeout(()=>{this._groupSaveStatus={...this._groupSaveStatus,[t.id]:""}},2e3)}}async _createGroup(){const t=this._newGroupName.trim();if(!t)return;const e=t.toLowerCase().replace(/[^a-z0-9]+/g,"_");try{await zt(e,t,[]),this._newGroupName="",this._expandedGroup=e,await this._loadAll()}catch(t){console.error("Failed to create group:",t)}}async _deleteGroup(t){const e=(t.device_ids||[]).length;if(!(e>0)||confirm(`Delete group "${t.name}"? It has ${e} member(s).`))try{await Nt(t.id),this._expandedGroup===t.id&&(this._expandedGroup=null),await this._loadAll()}catch(t){console.error("Failed to delete group:",t)}}async _deployToDevices(t){await this._updateGroup(t),await this._doDeploy(t)}async _doDeploy(t){const e=this._groups[t.id]||t;this._groupPushStatus={...this._groupPushStatus,[t.id]:"Deploying..."};try{const o=await Jt(e.id,{});console.log("Deploy result:",o),this._groupPushStatus={...this._groupPushStatus,[t.id]:"Deployed!"},setTimeout(()=>{this._groupPushStatus={...this._groupPushStatus,[t.id]:""}},3e3),await this._loadAll()}catch(e){console.error("Failed to deploy group config:",e);const o=e&&e.message?`Error: ${e.message}`:"Error";this._groupPushStatus={...this._groupPushStatus,[t.id]:o},setTimeout(()=>{this._groupPushStatus={...this._groupPushStatus,[t.id]:""}},3e3)}}}customElements.define("group-policy-settings",le);const ce={attr:"",value:""},pe={name:"",expression:""};class he extends dt{static properties={_settings:{type:Object,state:!0},_loading:{type:Boolean,state:!0},_savingSettings:{type:Boolean,state:!0},_settingsSaved:{type:Boolean,state:!0},_editingTransformIndex:{type:Number,state:!0},_transformError:{type:String,state:!0},_importStatus:{type:String,state:!0}};static styles=[ct,r`
    :host { display: block; padding: 20px; max-width: 1000px; margin: 0 auto; }

    h2 { font-size: 20px; font-weight: 700; color: #fff; margin-bottom: 16px; margin-top: 0; }

    .section {
      background: rgba(255,255,255,0.05); border-radius: 8px; padding: 20px;
      margin-bottom: 20px;
    }
    .section-title {
      font-size: 12px; color: #238ecc; text-transform: uppercase;
      letter-spacing: 1px; margin-bottom: 16px; font-weight: 600;
    }
    .settings-input {
      width: 100%; background: #0d0d1f; border: 1px solid rgba(255,255,255,0.1);
      border-radius: 4px; color: #fff; padding: 6px 10px;
      font-size: 13px; box-sizing: border-box;
    }
    .settings-input:focus { outline: none; border-color: #00D4FF; }
    .save-btn {
      background: #00D4FF; border: none; color: #0d0d1f; padding: 8px 20px;
      border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 600;
    }
    .save-btn:hover { background: #33DDFF; }
    .save-btn:disabled { opacity: 0.5; cursor: default; }
    .saved-msg { font-size: 12px; color: #04d65c; margin-left: 10px; }
    .small-input {
      background: #0d0d1f; border: 1px solid rgba(255,255,255,0.1); border-radius: 4px;
      color: #fff; padding: 4px 10px; font-size: 12px;
    }
    .small-input:focus { outline: none; border-color: #00D4FF; }
    .small-btn {
      background: #00D4FF; border: none; color: #0d0d1f; padding: 4px 12px;
      border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: 600;
    }
    .small-btn:hover { background: #33DDFF; }
    .icon-btn {
      background: none; border: none; cursor: pointer; font-size: 12px;
      padding: 2px 8px; border-radius: 4px; transition: all 0.15s;
    }
    .icon-btn.delete { color: #fff; }
    .icon-btn.delete:hover { color: #ef5350; background: rgba(239,83,80,0.1); }

    .loading { padding: 40px; text-align: center; color: #fff; }

    @media (max-width: 768px) {
      :host { padding: 12px; }
    }
  `];constructor(){super(),this._settings=null,this._loading=!0,this._savingSettings=!1,this._settingsSaved=!1,this._transformError="",this._editingTransformIndex=-1}connectedCallback(){super.connectedCallback(),this._loadSettings()}async _loadSettings(){this._loading=!0;try{this._settings=await Ut().catch(()=>({}))}finally{this._loading=!1}}render(){return this._loading?B`<div class="loading">Loading settings...</div>`:B`
      <h2>Settings</h2>
      <tag-registry-settings></tag-registry-settings>
      <group-policy-settings></group-policy-settings>
      ${this._renderCustomTransforms()}
      ${this._renderGlobalDefaults()}
      ${this._renderDeviceManagement()}
      ${this._renderExportImport()}
    `}_renderCustomTransforms(){const t=(this._settings||{}).custom_transforms||[],e=pe;return B`
      <div class="section">
        <div class="section-title">Custom Transforms</div>
        <div style="font-size: 11px; color: rgba(255,255,255,0.5); margin-bottom: 12px;">
          Define JS expressions to transform attribute values. Use <code style="color: #00D4FF;">value</code> as the input variable.
        </div>

        ${t.map((t,e)=>B`
          <div style="display: flex; gap: 6px; align-items: center; margin-bottom: 6px;">
            <span style="font-size: 12px; color: rgba(255,255,255,0.8); min-width: 120px;">${t.name}</span>
            <code style="font-size: 11px; color: rgba(255,255,255,0.5); flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${t.expression}</code>
            <button class="icon-btn" style="color: #00D4FF;"
              @click=${()=>this._editCustomTransform(e)}>Edit</button>
            <button class="icon-btn delete"
              @click=${()=>this._removeCustomTransform(e)}>Remove</button>
          </div>
        `)}

        <div style="display: flex; gap: 6px; align-items: center; margin-top: 8px; flex-wrap: wrap;">
          <input class="small-input" type="text" placeholder="Name (e.g. C to F)"
            style="width: 150px;"
            .value=${e.name}
            @input=${t=>{pe.name=t.target.value,this.requestUpdate()}}>
          <input class="small-input" type="text" placeholder="Expression (e.g. value * 1.8 + 32)"
            style="flex: 1; min-width: 200px;"
            .value=${e.expression}
            @input=${t=>{pe.expression=t.target.value,this.requestUpdate()}}>
          <button class="small-btn" @click=${this._addCustomTransform.bind(this)}>${this._editingTransformIndex>=0?"Save":"Add"}</button>
          ${this._editingTransformIndex>=0?B`<button class="small-btn" style="background: rgba(255,255,255,0.1); color: #fff;" @click=${()=>this._cancelEditTransform()}>Cancel</button>`:""}
        </div>

        ${this._transformError?B`<div style="font-size: 11px; color: #ef5350; margin-top: 6px;">${this._transformError}</div>`:""}
      </div>
    `}_editCustomTransform(t){const e=((this._settings||{}).custom_transforms||[])[t];e&&(pe.name=e.name,pe.expression=e.expression,this._editingTransformIndex=t,this._transformError="",this.requestUpdate())}_cancelEditTransform(){pe.name="",pe.expression="",this._editingTransformIndex=-1,this._transformError="",this.requestUpdate()}_addCustomTransform(){const t=(pe.name||"").trim(),e=(pe.expression||"").trim();if(this._transformError="",!t||!e)return void(this._transformError="Name and expression are required.");try{new Function("value","return ("+e+")")}catch(t){return void(this._transformError=`Invalid expression: ${t.message}`)}const o=this._settings||{},s=[...o.custom_transforms||[]];if(this._editingTransformIndex>=0)s[this._editingTransformIndex]={...s[this._editingTransformIndex],name:t,expression:e},this._editingTransformIndex=-1;else{const o="custom:"+t.toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_|_$/g,"");if(s.some(t=>t.id===o))return void(this._transformError="A transform with this name already exists.");s.push({id:o,name:t,expression:e})}this._settings={...o,custom_transforms:s},pe.name="",pe.expression="",this.requestUpdate(),this._saveSettings()}_removeCustomTransform(t){const e=this._settings||{},o=[...e.custom_transforms||[]];o.splice(t,1),this._settings={...e,custom_transforms:o},this._saveSettings()}_renderGlobalDefaults(){const t=(this._settings||{}).default_thresholds||{},e=ce;return B`
      <div class="section">
        <div class="section-title">Global Defaults</div>

        <div style="font-size: 11px; color: #fff; margin-bottom: 10px;">Default Warning Thresholds</div>

        ${Object.keys(t).filter(e=>null!=t[e]).map(e=>B`
          <div style="display: flex; gap: 6px; align-items: center; margin-bottom: 6px;">
            <span style="font-size: 12px; color: rgba(255,255,255,0.8); min-width: 140px;">${e}</span>
            <input class="settings-input" type="number" style="width: 90px;"
              .value=${String(t[e])}
              @input=${t=>this._updateDefaultThreshold(e,t.target.value)}>
            <button class="icon-btn delete"
              @click=${()=>this._removeDefaultThreshold(e)}>Remove</button>
          </div>
        `)}

        <div style="display: flex; gap: 6px; align-items: center; margin-top: 8px; margin-bottom: 16px; flex-wrap: wrap;">
          <input class="small-input" type="text" placeholder="Attribute name..."
            style="width: 150px;"
            .value=${e.attr}
            @input=${t=>{ce.attr=t.target.value,this.requestUpdate()}}>
          <input class="small-input" type="number" placeholder="Value..."
            style="width: 90px;"
            .value=${e.value}
            @input=${t=>{ce.value=t.target.value,this.requestUpdate()}}>
          <button class="small-btn" @click=${this._addDefaultThreshold.bind(this)}>Add threshold</button>
        </div>

        <div style="display: flex; align-items: center; margin-top: 12px; padding-bottom: 4px;">
          <button class="save-btn" ?disabled=${this._savingSettings}
            @click=${this._saveSettings}>
            ${this._savingSettings?"Saving...":"Save Defaults"}
          </button>
          ${this._settingsSaved?B`<span class="saved-msg">Saved!</span>`:""}
        </div>
      </div>
    `}_updateDefaultThreshold(t,e){const o=this._settings||{};this._settings={...o,default_thresholds:{...o.default_thresholds||{},[t]:""===e?null:Number(e)}}}_removeDefaultThreshold(t){const e=this._settings||{},o={...e.default_thresholds||{}};delete o[t],this._settings={...e,default_thresholds:o}}_addDefaultThreshold(){const t=(ce.attr||"").trim(),e=(ce.value||"").trim();t&&""!==e&&(this._updateDefaultThreshold(t,e),ce.attr="",ce.value="",this.requestUpdate())}_renderDeviceManagement(){const t=this._settings||{},e=t.device_cleanup_days??0,o=t.alert_cooldown_minutes??30;return B`
      <div class="section">
        <div class="section-title">Device Management</div>

        <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 12px; flex-wrap: wrap;">
          <div style="flex: 1; min-width: 200px;">
            <div style="font-size: 11px; color: #fff; margin-bottom: 6px;">Auto-Cleanup Offline Devices</div>
            <div style="display: flex; gap: 6px; align-items: center;">
              <select class="small-input" style="width: 140px;"
                .value=${String(e)}
                @change=${t=>{this._settings={...this._settings,device_cleanup_days:Number(t.target.value)},this._saveSettings()}}>
                <option value="0">Disabled</option>
                <option value="1">After 1 day</option>
                <option value="3">After 3 days</option>
                <option value="7">After 7 days</option>
                <option value="14">After 14 days</option>
                <option value="30">After 30 days</option>
              </select>
            </div>
            <div style="font-size: 10px; color: rgba(255,255,255,0.3); margin-top: 4px;">
              Automatically remove devices that have been offline longer than this.
            </div>
          </div>

          <div style="flex: 1; min-width: 200px;">
            <div style="font-size: 11px; color: #fff; margin-bottom: 6px;">Alert Cooldown</div>
            <div style="display: flex; gap: 6px; align-items: center;">
              <select class="small-input" style="width: 140px;"
                .value=${String(o)}
                @change=${t=>{this._settings={...this._settings,alert_cooldown_minutes:Number(t.target.value)},this._saveSettings()}}>
                <option value="0">Disabled</option>
                <option value="5">5 minutes</option>
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="120">2 hours</option>
                <option value="360">6 hours</option>
              </select>
            </div>
            <div style="font-size: 10px; color: rgba(255,255,255,0.3); margin-top: 4px;">
              HA notification cooldown for critical threshold alerts.
            </div>
          </div>
        </div>
      </div>
    `}_renderExportImport(){return B`
      <div class="section">
        <div class="section-title">Export / Import</div>
        <div style="font-size: 11px; color: rgba(255,255,255,0.5); margin-bottom: 12px;">
          Export or import settings, group policies, and topology layouts as JSON.
        </div>
        <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
          <button class="save-btn" @click=${this._exportSettings}>Export</button>
          <button class="save-btn" style="background: rgba(255,255,255,0.1); color: #fff;"
            @click=${()=>this.shadowRoot.querySelector("#import-file").click()}>Import</button>
          <input id="import-file" type="file" accept=".json" style="display: none;"
            @change=${this._importFile}>
          ${this._importStatus?B`<span style="font-size: 12px; color: ${this._importStatus.startsWith("Error")?"#ef5350":"#04d65c"};">${this._importStatus}</span>`:""}
        </div>
      </div>
    `}async _exportSettings(){try{const t=await Bt(),e=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),o=URL.createObjectURL(e),s=document.createElement("a");s.href=o,s.download=`mqtt-monitor-settings-${(new Date).toISOString().slice(0,10)}.json`,s.click(),URL.revokeObjectURL(o)}catch(t){console.error("Export failed:",t)}}async _importFile(t){const e=t.target.files[0];if(e){this._importStatus="";try{const t=await e.text(),o=JSON.parse(t);if(!o.version)return void(this._importStatus="Error: Invalid export file.");await Ht(o),this._importStatus="Imported successfully!",this._loadSettings(),setTimeout(()=>{this._importStatus=""},3e3)}catch(t){this._importStatus=`Error: ${t.message}`}t.target.value=""}}async _saveSettings(){this._savingSettings=!0,this._settingsSaved=!1;try{await Rt(this._settings),gt(this._settings.custom_transforms||[]),this._settingsSaved=!0,setTimeout(()=>{this._settingsSaved=!1},2e3)}catch(t){console.error("Failed to save settings:",t)}finally{this._savingSettings=!1}}}customElements.define("settings-view",he);class ue extends dt{static properties={currentView:{type:String},selectedDevice:{type:String},selectedGroup:{type:String}};static styles=[ct,r`
    :host {
      display: block;
      min-height: 100vh;
      background: #0a0a1a;
    }
    @media (max-width: 768px) {
      :host { padding-bottom: 64px; }
    }
    .overlay {
      position: fixed; top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0, 0, 0, 0.6);
      z-index: 500;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      padding: 40px 20px;
      overflow-y: auto;
    }
    .overlay-content {
      background: #0d0d1f;
      border-radius: 12px;
      border: 1px solid rgba(255,255,255,0.05);
      width: 100%;
      max-width: 1000px;
      max-height: calc(100vh - 80px);
      overflow-y: auto;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    }
  `];constructor(){super(),this.currentView="dashboard",this.selectedDevice=null,this.selectedGroup=null}connectedCallback(){super.connectedCallback(),pt.connect(),Ut().then(t=>{t?.custom_transforms&&gt(t.custom_transforms)}).catch(()=>{})}disconnectedCallback(){super.disconnectedCallback(),pt.disconnect()}render(){return B`
      <nav-bar
        .currentView=${this.currentView}
        @view-change=${this._onViewChange}
      ></nav-bar>
      ${this._renderView()}
      ${this.selectedDevice||this.selectedGroup?this._renderOverlay():""}
    `}_renderView(){switch(this.currentView){case"topology":return B`<topology-view @device-select=${this._onDeviceSelect}></topology-view>`;case"settings":return B`<settings-view></settings-view>`;default:return B`<dashboard-view @device-select=${this._onDeviceSelect} @group-edit=${this._onGroupEdit}></dashboard-view>`}}_renderOverlay(){return B`
      <div class="overlay" @click=${this._onOverlayClick}>
        <div class="overlay-content" @click=${t=>t.stopPropagation()}>
          ${this.selectedGroup?B`<device-detail
                .groupId=${this.selectedGroup}
                @back=${()=>this.selectedGroup=null}
              ></device-detail>`:B`<device-detail
                .deviceId=${this.selectedDevice}
                @back=${()=>this.selectedDevice=null}
              ></device-detail>`}
        </div>
      </div>
    `}_onOverlayClick(){this.selectedDevice=null,this.selectedGroup=null}_onViewChange(t){this.currentView=t.detail.view,this.selectedDevice=null,this.selectedGroup=null}_onDeviceSelect(t){this.selectedDevice=t.detail.deviceId}_onGroupEdit(t){this.selectedGroup=t.detail.groupId}}customElements.define("network-monitor-app",ue);
//# sourceMappingURL=bundle.js.map
