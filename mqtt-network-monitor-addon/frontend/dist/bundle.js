/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,t=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,o=Symbol(),s=new WeakMap;let i=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==o)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const o=this.t;if(t&&void 0===e){const t=void 0!==o&&1===o.length;t&&(e=s.get(o)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&s.set(o,e))}return e}toString(){return this.cssText}};const r=(e,...t)=>{const s=1===e.length?e[0]:t.reduce((t,o,s)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+e[s+1],e[0]);return new i(s,e,o)},n=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const o of e.cssRules)t+=o.cssText;return(e=>new i("string"==typeof e?e:e+"",void 0,o))(t)})(e):e,{is:a,defineProperty:d,getOwnPropertyDescriptor:l,getOwnPropertyNames:c,getOwnPropertySymbols:p,getPrototypeOf:h}=Object,u=globalThis,g=u.trustedTypes,m=g?g.emptyScript:"",b=u.reactiveElementPolyfillSupport,f=(e,t)=>e,v={toAttribute(e,t){switch(t){case Boolean:e=e?m:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let o=e;switch(t){case Boolean:o=null!==e;break;case Number:o=null===e?null:Number(e);break;case Object:case Array:try{o=JSON.parse(e)}catch(e){o=null}}return o}},_=(e,t)=>!a(e,t),x={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:_};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let y=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=x){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const o=Symbol(),s=this.getPropertyDescriptor(e,o,t);void 0!==s&&d(this.prototype,e,s)}}static getPropertyDescriptor(e,t,o){const{get:s,set:i}=l(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:s,set(t){const r=s?.call(this);i?.call(this,t),this.requestUpdate(e,r,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??x}static _$Ei(){if(this.hasOwnProperty(f("elementProperties")))return;const e=h(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(f("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(f("properties"))){const e=this.properties,t=[...c(e),...p(e)];for(const o of t)this.createProperty(o,e[o])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,o]of t)this.elementProperties.set(e,o)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const o=this._$Eu(e,t);void 0!==o&&this._$Eh.set(o,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const o=new Set(e.flat(1/0).reverse());for(const e of o)t.unshift(n(e))}else void 0!==e&&t.push(n(e));return t}static _$Eu(e,t){const o=t.attribute;return!1===o?void 0:"string"==typeof o?o:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const o of t.keys())this.hasOwnProperty(o)&&(e.set(o,this[o]),delete this[o]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const o=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((o,s)=>{if(t)o.adoptedStyleSheets=s.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const t of s){const s=document.createElement("style"),i=e.litNonce;void 0!==i&&s.setAttribute("nonce",i),s.textContent=t.cssText,o.appendChild(s)}})(o,this.constructor.elementStyles),o}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,o){this._$AK(e,o)}_$ET(e,t){const o=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,o);if(void 0!==s&&!0===o.reflect){const i=(void 0!==o.converter?.toAttribute?o.converter:v).toAttribute(t,o.type);this._$Em=e,null==i?this.removeAttribute(s):this.setAttribute(s,i),this._$Em=null}}_$AK(e,t){const o=this.constructor,s=o._$Eh.get(e);if(void 0!==s&&this._$Em!==s){const e=o.getPropertyOptions(s),i="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:v;this._$Em=s;const r=i.fromAttribute(t,e.type);this[s]=r??this._$Ej?.get(s)??r,this._$Em=null}}requestUpdate(e,t,o,s=!1,i){if(void 0!==e){const r=this.constructor;if(!1===s&&(i=this[e]),o??=r.getPropertyOptions(e),!((o.hasChanged??_)(i,t)||o.useDefault&&o.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,o))))return;this.C(e,t,o)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:o,reflect:s,wrapped:i},r){o&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,r??t??this[e]),!0!==i||void 0!==r)||(this._$AL.has(e)||(this.hasUpdated||o||(t=void 0),this._$AL.set(e,t)),!0===s&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,o]of e){const{wrapped:e}=o,s=this[t];!0!==e||this._$AL.has(t)||void 0===s||this.C(t,void 0,o,s)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[f("elementProperties")]=new Map,y[f("finalized")]=new Map,b?.({ReactiveElement:y}),(u.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $=globalThis,w=e=>e,k=$.trustedTypes,S=k?k.createPolicy("lit-html",{createHTML:e=>e}):void 0,C="$lit$",D=`lit$${Math.random().toFixed(9).slice(2)}$`,E="?"+D,A=`<${E}>`,T=document,F=()=>T.createComment(""),z=e=>null===e||"object"!=typeof e&&"function"!=typeof e,N=Array.isArray,G="[ \t\n\f\r]",P=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,O=/-->/g,L=/>/g,M=RegExp(`>|${G}(?:([^\\s"'>=/]+)(${G}*=${G}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),I=/'/g,j=/"/g,R=/^(?:script|style|textarea|title)$/i,U=e=>(t,...o)=>({_$litType$:e,strings:t,values:o}),H=U(1),B=U(2),V=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),Y=new WeakMap,J=T.createTreeWalker(T,129);function X(e,t){if(!N(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(t):t}const W=(e,t)=>{const o=e.length-1,s=[];let i,r=2===t?"<svg>":3===t?"<math>":"",n=P;for(let t=0;t<o;t++){const o=e[t];let a,d,l=-1,c=0;for(;c<o.length&&(n.lastIndex=c,d=n.exec(o),null!==d);)c=n.lastIndex,n===P?"!--"===d[1]?n=O:void 0!==d[1]?n=L:void 0!==d[2]?(R.test(d[2])&&(i=RegExp("</"+d[2],"g")),n=M):void 0!==d[3]&&(n=M):n===M?">"===d[0]?(n=i??P,l=-1):void 0===d[1]?l=-2:(l=n.lastIndex-d[2].length,a=d[1],n=void 0===d[3]?M:'"'===d[3]?j:I):n===j||n===I?n=M:n===O||n===L?n=P:(n=M,i=void 0);const p=n===M&&e[t+1].startsWith("/>")?" ":"";r+=n===P?o+A:l>=0?(s.push(a),o.slice(0,l)+C+o.slice(l)+D+p):o+D+(-2===l?t:p)}return[X(e,r+(e[o]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),s]};class K{constructor({strings:e,_$litType$:t},o){let s;this.parts=[];let i=0,r=0;const n=e.length-1,a=this.parts,[d,l]=W(e,t);if(this.el=K.createElement(d,o),J.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(s=J.nextNode())&&a.length<n;){if(1===s.nodeType){if(s.hasAttributes())for(const e of s.getAttributeNames())if(e.endsWith(C)){const t=l[r++],o=s.getAttribute(e).split(D),n=/([.?@])?(.*)/.exec(t);a.push({type:1,index:i,name:n[2],strings:o,ctor:"."===n[1]?oe:"?"===n[1]?se:"@"===n[1]?ie:te}),s.removeAttribute(e)}else e.startsWith(D)&&(a.push({type:6,index:i}),s.removeAttribute(e));if(R.test(s.tagName)){const e=s.textContent.split(D),t=e.length-1;if(t>0){s.textContent=k?k.emptyScript:"";for(let o=0;o<t;o++)s.append(e[o],F()),J.nextNode(),a.push({type:2,index:++i});s.append(e[t],F())}}}else if(8===s.nodeType)if(s.data===E)a.push({type:2,index:i});else{let e=-1;for(;-1!==(e=s.data.indexOf(D,e+1));)a.push({type:7,index:i}),e+=D.length-1}i++}}static createElement(e,t){const o=T.createElement("template");return o.innerHTML=e,o}}function Z(e,t,o=e,s){if(t===V)return t;let i=void 0!==s?o._$Co?.[s]:o._$Cl;const r=z(t)?void 0:t._$litDirective$;return i?.constructor!==r&&(i?._$AO?.(!1),void 0===r?i=void 0:(i=new r(e),i._$AT(e,o,s)),void 0!==s?(o._$Co??=[])[s]=i:o._$Cl=i),void 0!==i&&(t=Z(e,i._$AS(e,t.values),i,s)),t}class Q{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:o}=this._$AD,s=(e?.creationScope??T).importNode(t,!0);J.currentNode=s;let i=J.nextNode(),r=0,n=0,a=o[0];for(;void 0!==a;){if(r===a.index){let t;2===a.type?t=new ee(i,i.nextSibling,this,e):1===a.type?t=new a.ctor(i,a.name,a.strings,this,e):6===a.type&&(t=new re(i,this,e)),this._$AV.push(t),a=o[++n]}r!==a?.index&&(i=J.nextNode(),r++)}return J.currentNode=T,s}p(e){let t=0;for(const o of this._$AV)void 0!==o&&(void 0!==o.strings?(o._$AI(e,o,t),t+=o.strings.length-2):o._$AI(e[t])),t++}}class ee{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,o,s){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=o,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Z(this,e,t),z(e)?e===q||null==e||""===e?(this._$AH!==q&&this._$AR(),this._$AH=q):e!==this._$AH&&e!==V&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>N(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==q&&z(this._$AH)?this._$AA.nextSibling.data=e:this.T(T.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:o}=e,s="number"==typeof o?this._$AC(e):(void 0===o.el&&(o.el=K.createElement(X(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===s)this._$AH.p(t);else{const e=new Q(s,this),o=e.u(this.options);e.p(t),this.T(o),this._$AH=e}}_$AC(e){let t=Y.get(e.strings);return void 0===t&&Y.set(e.strings,t=new K(e)),t}k(e){N(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let o,s=0;for(const i of e)s===t.length?t.push(o=new ee(this.O(F()),this.O(F()),this,this.options)):o=t[s],o._$AI(i),s++;s<t.length&&(this._$AR(o&&o._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=w(e).nextSibling;w(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class te{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,o,s,i){this.type=1,this._$AH=q,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=i,o.length>2||""!==o[0]||""!==o[1]?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=q}_$AI(e,t=this,o,s){const i=this.strings;let r=!1;if(void 0===i)e=Z(this,e,t,0),r=!z(e)||e!==this._$AH&&e!==V,r&&(this._$AH=e);else{const s=e;let n,a;for(e=i[0],n=0;n<i.length-1;n++)a=Z(this,s[o+n],t,n),a===V&&(a=this._$AH[n]),r||=!z(a)||a!==this._$AH[n],a===q?e=q:e!==q&&(e+=(a??"")+i[n+1]),this._$AH[n]=a}r&&!s&&this.j(e)}j(e){e===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class oe extends te{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===q?void 0:e}}class se extends te{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==q)}}class ie extends te{constructor(e,t,o,s,i){super(e,t,o,s,i),this.type=5}_$AI(e,t=this){if((e=Z(this,e,t,0)??q)===V)return;const o=this._$AH,s=e===q&&o!==q||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,i=e!==q&&(o===q||s);s&&this.element.removeEventListener(this.name,this,o),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class re{constructor(e,t,o){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(e){Z(this,e)}}const ne=$.litHtmlPolyfillSupport;ne?.(K,ee),($.litHtmlVersions??=[]).push("3.3.2");const ae=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class de extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,o)=>{const s=o?.renderBefore??t;let i=s._$litPart$;if(void 0===i){const e=o?.renderBefore??null;s._$litPart$=i=new ee(t.insertBefore(F(),e),e,void 0,o??{})}return i._$AI(e),i})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return V}}de._$litElement$=!0,de.finalized=!0,ae.litElementHydrateSupport?.({LitElement:de});const le=ae.litElementPolyfillSupport;le?.({LitElement:de}),(ae.litElementVersions??=[]).push("4.2.2");const ce=r`
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
`;const pe=new class{constructor(){this._ws=null,this._listeners=[],this._reconnectDelay=1e3,this._reconnectAttempts=0,this._maxReconnectAttempts=50}connect(){const e="https:"===location.protocol?"wss:":"ws:",t=location.pathname.match(/^(\/api\/hassio_ingress\/[^/]+)/),o=t?t[1]:"",s=`${e}//${location.host}${o}/api/ws`;this._ws=new WebSocket(s),this._ws.onmessage=e=>{try{const t=JSON.parse(e.data);this._listeners.forEach(e=>e(t))}catch(e){console.error("WebSocket parse error:",e)}},this._ws.onclose=()=>{this._reconnectAttempts>=this._maxReconnectAttempts?console.error("WebSocket: max reconnect attempts reached"):(this._reconnectAttempts++,setTimeout(()=>this.connect(),this._reconnectDelay),this._reconnectDelay=Math.min(2*this._reconnectDelay,3e4))},this._ws.onopen=()=>{this._reconnectDelay=1e3,this._reconnectAttempts=0}}onMessage(e){return this._listeners.push(e),()=>{this._listeners=this._listeners.filter(t=>t!==e)}}disconnect(){this._ws&&this._ws.close()}};class he extends de{static properties={currentView:{type:String}};static styles=[ce,r`
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
  `];render(){return H`
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
        <span class="version">v0.2.1 build ${"4/2 17:50"}</span>
      </nav>

      <!-- Mobile simple header -->
      <div class="mobile-header" aria-hidden="true">
        <span class="logo">Network Monitor</span>
        <span class="version">build ${"4/2 17:50"}</span>
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
    `}_navigate(e){this.dispatchEvent(new CustomEvent("view-change",{detail:{view:e}}))}}customElements.define("nav-bar",he);const ue=function(){const e=location.pathname.match(/^(\/api\/hassio_ingress\/[^/]+)/);return e?e[1]:""}();async function ge(e,t={}){const o=await fetch(e,t);if(!o.ok){const e=await o.text().catch(()=>o.statusText);throw new Error(`API error ${o.status}: ${e}`)}const s=o.headers.get("content-type");return s&&s.includes("application/json")?o.json():null}async function me(e=0){return ge(e>0?`${ue}/api/devices?since=${e}`:`${ue}/api/devices`)}async function be(e){return ge(`${ue}/api/devices/${encodeURIComponent(e)}`)}async function fe(e){return ge(`${ue}/api/devices/${encodeURIComponent(e)}`,{method:"DELETE"})}async function ve(e,t){return ge(`${ue}/api/devices/${encodeURIComponent(e)}/attributes/${encodeURIComponent(t)}`,{method:"DELETE"})}async function _e(e,t){return ge(`${ue}/api/devices/${encodeURIComponent(e)}/attributes/${encodeURIComponent(t)}/unhide`,{method:"POST"})}async function xe(e,t){return ge(`${ue}/api/devices/${encodeURIComponent(e)}/commands/${encodeURIComponent(t)}`,{method:"DELETE"})}async function ye(e,t){return ge(`${ue}/api/devices/${encodeURIComponent(e)}/commands/${encodeURIComponent(t)}/unhide`,{method:"POST"})}async function $e(){return ge(`${ue}/api/topology`)}async function we(){return ge(`${ue}/api/topology/layouts`)}async function ke(e){return ge(`${ue}/api/topology/layouts`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}async function Se(e){return ge(`${ue}/api/topology/layouts/${encodeURIComponent(e)}`,{method:"DELETE"})}async function Ce(e,t,o={}){return ge(`${ue}/api/devices/${encodeURIComponent(e)}/command`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({command:t,params:o})})}async function De(){return ge(`${ue}/api/groups`)}async function Ee(e,t,o=[]){return ge(`${ue}/api/groups`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:e,name:t,device_ids:o})})}async function Ae(e,{name:t,device_ids:o,custom_commands:s,custom_sensors:i,thresholds:r,hidden_commands:n}){return ge(`${ue}/api/groups/${encodeURIComponent(e)}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:t,device_ids:o,custom_commands:s,custom_sensors:i,thresholds:r,hidden_commands:n})})}async function Te(e){return ge(`${ue}/api/groups/${encodeURIComponent(e)}`,{method:"DELETE"})}async function Fe(e,t){return ge(`${ue}/api/devices/${encodeURIComponent(e)}/tags/add`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({tags:t})})}async function ze(e,t){return ge(`${ue}/api/devices/${encodeURIComponent(e)}/tags/${encodeURIComponent(t)}`,{method:"DELETE"})}async function Ne(){return ge(`${ue}/api/tags`)}async function Ge(e){return ge(`${ue}/api/tags`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({tag:e})})}async function Pe(e,t){return ge(`${ue}/api/tags/${encodeURIComponent(e)}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({new_name:t})})}async function Oe(e){return ge(`${ue}/api/tags/${encodeURIComponent(e)}`,{method:"DELETE"})}async function Le(){return ge(`${ue}/api/settings`)}async function Me(e){return ge(`${ue}/api/settings`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}async function Ie(e){return ge(`${ue}/api/devices/${encodeURIComponent(e)}/effective-settings`)}async function je(e,t){return ge(`${ue}/api/devices/${encodeURIComponent(e)}/settings`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})}async function Re(e,t){return ge(`${ue}/api/groups/${encodeURIComponent(e)}/push-config`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})}var Ue=Object.freeze({__proto__:null,addDeviceTags:Fe,addServerCommand:async function(e,t,o){return ge(`${ue}/api/devices/${encodeURIComponent(e)}/server-commands`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:t,shell:o})})},addServerSensor:async function(e,t,o){return ge(`${ue}/api/devices/${encodeURIComponent(e)}/server-sensors`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:t,...o})})},createGroup:Ee,createTag:Ge,deleteAttribute:ve,deleteDevice:fe,deleteGroup:Te,deleteLayout:Se,deleteTag:Oe,fetchDevice:be,fetchDevices:me,fetchEffectiveSettings:Ie,fetchGroups:De,fetchLayouts:we,fetchSettings:Le,fetchTags:Ne,fetchTopology:$e,hideCommand:xe,pushGroupConfig:Re,removeDeviceTag:ze,removeServerCommand:async function(e,t){return ge(`${ue}/api/devices/${encodeURIComponent(e)}/server-commands/${encodeURIComponent(t)}`,{method:"DELETE"})},removeServerSensor:async function(e,t){return ge(`${ue}/api/devices/${encodeURIComponent(e)}/server-sensors/${encodeURIComponent(t)}`,{method:"DELETE"})},renameTag:Pe,saveLayout:ke,sendCommand:Ce,setDeviceInterval:async function(e,t){return ge(`${ue}/api/devices/${encodeURIComponent(e)}/config-interval`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({interval:t})})},unhideAttribute:_e,unhideCommand:ye,updateDeviceSettings:je,updateGroup:Ae,updateSettings:Me});class He extends de{static properties={selectedTags:{type:Array},_allTags:{type:Array,state:!0},_open:{type:Boolean,state:!0},_showCreate:{type:Boolean,state:!0},_newTagName:{type:String,state:!0},_creating:{type:Boolean,state:!0}};static styles=[ce,r`
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
  `];constructor(){super(),this.selectedTags=[],this._allTags=[],this._open=!1,this._showCreate=!1,this._newTagName="",this._creating=!1,this._onDocClick=this._onDocClick.bind(this)}connectedCallback(){super.connectedCallback(),this._loadTags(),document.addEventListener("click",this._onDocClick)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._onDocClick)}async _loadTags(){try{const e=await Ne();Array.isArray(e)&&(this._allTags=e.map(e=>"string"==typeof e?e:e.tag).sort())}catch(e){console.error("Failed to load tags:",e)}}_onDocClick(e){if(!this._open)return;e.composedPath().includes(this)||(this._open=!1,this._showCreate=!1)}_toggle(e){e.stopPropagation(),this._open=!this._open,this._open||(this._showCreate=!1)}_toggleTag(e){(this.selectedTags||[]).includes(e)?this.dispatchEvent(new CustomEvent("tag-remove",{detail:{tag:e},bubbles:!0,composed:!0})):this.dispatchEvent(new CustomEvent("tag-add",{detail:{tag:e},bubbles:!0,composed:!0}))}async _createTag(){const e=this._newTagName.trim();if(e&&!this._creating){this._creating=!0;try{await Ge(e),await this._loadTags(),this.dispatchEvent(new CustomEvent("tag-add",{detail:{tag:e},bubbles:!0,composed:!0})),this._newTagName="",this._showCreate=!1}catch(e){console.error("Failed to create tag:",e)}finally{this._creating=!1}}}render(){const e=this.selectedTags||[],t=e.length>0;return H`
      <button class="trigger ${t?"has-selected":""}" @click=${this._toggle}>
        Tags${t?` (${e.length})`:""}
        <span class="arrow">${this._open?"▲":"▼"}</span>
      </button>

      ${this._open?H`
        <div class="dropdown" @click=${e=>e.stopPropagation()}>
          ${0!==this._allTags.length||this._showCreate?this._allTags.map(t=>H`
              <div class="dropdown-item ${e.includes(t)?"checked":""}"
                @click=${()=>this._toggleTag(t)}>
                <span class="checkbox">${e.includes(t)?"✓":""}</span>
                ${t}
              </div>
            `):H`<div class="empty">No tags in registry</div>`}

          <hr class="dropdown-divider">

          ${this._showCreate?H`
            <div class="create-row">
              <input class="create-input" type="text" placeholder="New tag name..."
                .value=${this._newTagName}
                @input=${e=>this._newTagName=e.target.value}
                @keydown=${e=>"Enter"===e.key&&this._createTag()}
                autofocus>
              <button class="create-btn" ?disabled=${this._creating||!this._newTagName.trim()}
                @click=${this._createTag}>
                ${this._creating?"...":"Create"}
              </button>
              <button class="cancel-btn" @click=${()=>{this._showCreate=!1,this._newTagName=""}}>&times;</button>
            </div>
          `:H`
            <div class="create-row">
              <span class="create-link" @click=${()=>this._showCreate=!0}>+ Create new tag</span>
            </div>
          `}
        </div>
      `:""}
    `}}customElements.define("tag-picker",He);class Be extends de{static properties={device:{type:Object},effectiveSettings:{type:Object},haOverrides:{type:Object},groups:{type:Object},cardAttributes:{type:Array},_showHidden:{type:Boolean,state:!0}};static styles=[ce,r`
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
  `];constructor(){super(),this.device=null,this.effectiveSettings=null,this.haOverrides={},this.groups={},this.cardAttributes=[],this._showHidden=!1}_isExposed(e){if(void 0!==this.haOverrides[e])return this.haOverrides[e];const t=this.effectiveSettings;return void 0===t?.ha_exposure_overrides?.[e]||t.ha_exposure_overrides[e]}_getThresholdForAttr(e){const t=this.effectiveSettings;if(!t)return null;const o=(t.thresholds||{})[e];if(null==o)return null;const s="object"==typeof o?o.value:o;if(null==s)return null;const i=this.device?.threshold_overrides||{},r=this.device?.group_policy,n=r?this.groups[r]:null;let a="global";return null!=i[e]?a="device":null!=n?.thresholds?.[e]&&(a="group"),{value:s,source:a}}_checkThreshold(e,t){if(!t||null==e||"number"!=typeof e)return!1;const o="object"==typeof t?t.value:t,s="object"==typeof t&&t.op||">";if(null==o)return!1;switch(s){case">":default:return e>o;case"<":return e<o;case">=":return e>=o;case"<=":return e<=o;case"==":return e===o;case"!=":return e!==o}}_getThresholdOp(e){const t=(this.device?.threshold_overrides||{})[e];if(null!=t&&"object"==typeof t)return t.op||">";const o=this.effectiveSettings;if(!o)return">";const s=(o.thresholds||{})[e];return null!=s&&"object"==typeof s&&s.op||">"}_getThresholdVal(e){const t=(this.device?.threshold_overrides||{})[e];if(null!=t)return"object"==typeof t?t.value:t;const o=this._getThresholdForAttr(e);return o?o.value:null}_getCritThresholdOp(e){const t=(this.device?.crit_threshold_overrides||{})[e];return null!=t&&"object"==typeof t&&t.op||">"}_getCritThresholdVal(e){const t=(this.device?.crit_threshold_overrides||{})[e];return null!=t?"object"==typeof t?t.value:t:null}render(){if(!this.device)return H``;const e=Object.entries(this.device.attributes||{}).sort(([e],[t])=>e.localeCompare(t)),t=this.device.hidden_attributes||[],o=e.filter(([e])=>!t.includes(e)),s=e.filter(([e])=>t.includes(e));return 0===e.length?H``:H`
      <div class="section">
        <div class="section-title">Attributes</div>
        <div class="attr-grid">
          ${o.map(([e,t])=>this._renderAttrTile(e,t))}
        </div>
        ${s.length>0?H`
          <div style="margin-top: 12px;">
            <div style="font-size: 10px; color: #fff; margin-bottom: 6px; cursor: pointer;"
              @click=${()=>this._showHidden=!this._showHidden}>
              ${this._showHidden?"▾":"▸"} ${s.length} hidden attribute${1!==s.length?"s":""}
            </div>
            ${this._showHidden?H`
              <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                ${s.map(([e])=>H`
                  <span style="font-size: 11px; background: #0d0d1f; color: #fff; padding: 3px 10px; border-radius: 4px; display: flex; align-items: center; gap: 4px;">
                    ${e.replace(/_/g," ")}
                    <span style="cursor: pointer; color: #00D4FF; font-size: 10px;"
                      @click=${()=>this._onUnhide(e)}>show</span>
                  </span>
                `)}
              </div>
            `:""}
          </div>
        `:""}
      </div>
    `}_renderAttrTile(e,t){const o=this._isExposed(e),s=this._getThresholdForAttr(e),i=null!=t.value?t.value:null,r=(this.device?.threshold_overrides||{})[e],n=null!=r?r:s?s.value:null,a=this._checkThreshold(i,n),d=this._getThresholdOp(e),l=this._getThresholdVal(e),c=(this.cardAttributes||[]).includes(e),p=this._getCritThresholdOp(e),h=this._getCritThresholdVal(e),u=this.device?.crit_threshold_overrides||{},g=null!=u[e]?u[e]:null,m=this._checkThreshold(i,g),b=m?"critical-val":a?"exceeded-val":"";return H`
      <div class="attr-tile ${o?"":"dimmed"} ${m?"critical":a?"exceeded":""}">
        <div class="attr-tile-top">
          <span class="attr-label">${e.replace(/_/g," ")}
            <span class="attr-pin ${c?"pinned":""}"
              title="${c?"Unpin from card":"Pin to card"}"
              @click=${t=>{t.stopPropagation(),this._togglePin(e)}}>&#x1F4CC;</span>
            <span class="attr-delete" title="Remove attribute"
              @click=${()=>this._onDelete(e)}>&times;</span>
          </span>
          <span class="toggle-wrap"
            role="switch"
            aria-checked=${o?"true":"false"}
            aria-label="Expose ${e.replace(/_/g," ")} to Home Assistant"
            tabindex="0"
            @click=${()=>this._onToggleExposure(e)}
            @keydown=${t=>("Enter"===t.key||" "===t.key)&&this._onToggleExposure(e)}>
            <div class="toggle ${o?"on":"off"}">
              <div class="toggle-knob"></div>
            </div>
          </span>
        </div>
        <div class="attr-val ${o?"":"dimmed-val"} ${b}">
          ${null!=i?i:"—"}
          <span class="attr-unit">${t.unit||""}</span>
        </div>
        <div class="attr-thresholds">
          <div class="attr-threshold-row">
            ${a?H`<span style="color: #ffb74d; font-size: 11px;">\u26A0</span>`:""}
            <span class="threshold-label warn">warn</span>
            <select class="threshold-op"
              aria-label="Warning threshold operator for ${e.replace(/_/g," ")}"
              .value=${d}
              @change=${t=>this._onThresholdChange(e,l,t.target.value)}>
              <option value=">">&gt;</option>
              <option value="<">&lt;</option>
              <option value=">=">&gt;=</option>
              <option value="<=">&lt;=</option>
              <option value="==">==</option>
              <option value="!=">!=</option>
            </select>
            <input class="threshold-inline" type="number"
              aria-label="Warning threshold value for ${e.replace(/_/g," ")}"
              placeholder="\u2014"
              .value=${null!=l?String(l):""}
              @change=${t=>this._onThresholdChange(e,t.target.value,d)}>
            ${s&&"device"!==s.source&&null==r?H`
              <span class="threshold-source">${s.source}</span>
            `:""}
          </div>
          <div class="attr-threshold-row">
            ${m?H`<span style="color: #ef5350; font-size: 11px;">\u26A0</span>`:""}
            <span class="threshold-label crit">crit</span>
            <select class="threshold-op"
              aria-label="Critical threshold operator for ${e.replace(/_/g," ")}"
              .value=${p}
              @change=${t=>this._onCritThresholdChange(e,h,t.target.value)}>
              <option value=">">&gt;</option>
              <option value="<">&lt;</option>
              <option value=">=">&gt;=</option>
              <option value="<=">&lt;=</option>
              <option value="==">==</option>
              <option value="!=">!=</option>
            </select>
            <input class="threshold-inline" type="number"
              aria-label="Critical threshold value for ${e.replace(/_/g," ")}"
              placeholder="\u2014"
              .value=${null!=h?String(h):""}
              @change=${t=>this._onCritThresholdChange(e,t.target.value,p)}>
          </div>
        </div>
      </div>
    `}_onDelete(e){this.dispatchEvent(new CustomEvent("attribute-deleted",{detail:{name:e},bubbles:!0,composed:!0}))}_onUnhide(e){this.dispatchEvent(new CustomEvent("attribute-unhidden",{detail:{name:e},bubbles:!0,composed:!0}))}_onToggleExposure(e){this.dispatchEvent(new CustomEvent("ha-exposure-toggled",{detail:{name:e},bubbles:!0,composed:!0}))}_onThresholdChange(e,t,o){this.dispatchEvent(new CustomEvent("threshold-changed",{detail:{name:e,value:t,op:o},bubbles:!0,composed:!0}))}_onCritThresholdChange(e,t,o){this.dispatchEvent(new CustomEvent("crit-threshold-changed",{detail:{name:e,value:t,op:o},bubbles:!0,composed:!0}))}_togglePin(e){this.dispatchEvent(new CustomEvent("pin-attribute",{detail:{name:e,pinned:!(this.cardAttributes||[]).includes(e)},bubbles:!0,composed:!0}))}}customElements.define("device-attributes",Be);const Ve=["shutdown","halt","poweroff","destroy"];class qe extends de{static properties={device:{type:Object},serverCommands:{type:Object},commandResult:{type:String},_showHiddenCmds:{type:Boolean,state:!0},_showAddCommand:{type:Boolean,state:!0},_editingCommandName:{type:String,state:!0},_editCommandForm:{type:Object,state:!0}};static styles=[ce,r`
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
  `];constructor(){super(),this.device=null,this.serverCommands={},this.commandResult="",this._showHiddenCmds=!1,this._showAddCommand=!1,this._editingCommandName=null,this._editCommandForm=null}render(){if(!this.device)return H``;const e=this.device.allowed_commands||[],t=this.serverCommands||{},o=Object.keys(t),s=[...new Set([...e,...o])],i=this.device.hidden_commands||[],r=s.filter(e=>!i.includes(e)),n=s.filter(e=>i.includes(e));return H`
      <div class="section">
        <div class="section-title">Commands</div>

        ${r.length>0?H`
          <div class="commands" style="margin-bottom: 12px;">
            ${r.map(e=>H`
              <span class="cmd-wrap">
                <button class="cmd-btn ${function(e){const t=e.toLowerCase();return Ve.some(e=>t.includes(e))}(e)?"danger":""}"
                  @click=${()=>this._onSend(e)}>${e}</button>
                <span class="cmd-eye" title="Hide command"
                  @click=${t=>{t.stopPropagation(),this._onHide(e)}}>&#128065;</span>
              </span>
            `)}
          </div>
        `:""}
        ${this.commandResult?H`<div class="cmd-result">${this.commandResult}</div>`:""}

        ${o.length>0?H`
          <div style="margin-top: 8px; font-size: 11px; color: #fff; margin-bottom: 6px;">Server-managed commands</div>
          <table class="sensor-table">
            <thead><tr><th>Name</th><th>Shell Command</th><th></th></tr></thead>
            <tbody>
              ${Object.entries(t).map(([e,t])=>H`
                <tr>
                  <td>${e}</td>
                  <td class="mono">${t}</td>
                  <td>
                    <div class="sensor-actions">
                      <button class="sensor-btn edit" @click=${()=>this._startEdit(e,t)}>Edit</button>
                      <button class="sensor-btn remove" @click=${()=>this._onRemove(e)}>Delete</button>
                    </div>
                  </td>
                </tr>
              `)}
            </tbody>
          </table>
        `:""}

        ${this._editingCommandName||this._showAddCommand?H`
          <div class="sensor-form" style="margin-top: 8px;">
            <div class="sensor-form-grid">
              <input type="text" placeholder="Command name"
                .value=${this._editCommandForm?.name||""}
                ?disabled=${!!this._editingCommandName}
                @input=${e=>this._editCommandForm={...this._editCommandForm,name:e.target.value}}>
              <input type="text" placeholder="Shell command (e.g. notify-send 'Hello')"
                .value=${this._editCommandForm?.shell||""}
                @input=${e=>this._editCommandForm={...this._editCommandForm,shell:e.target.value}}
                @keydown=${e=>"Enter"===e.key&&this._saveForm()}>
            </div>
            <div class="sensor-form-actions">
              <button class="form-btn save" @click=${this._saveForm}>${this._editingCommandName?"Update":"Add"}</button>
              <button class="form-btn cancel" @click=${this._cancelForm}>Cancel</button>
            </div>
          </div>
        `:H`
          <button class="add-btn" @click=${this._startAdd}>+ Add Command</button>
        `}

        ${n.length>0?H`
          <div style="margin-top: 12px;">
            <div style="font-size: 10px; color: #fff; margin-bottom: 6px; cursor: pointer;"
              @click=${()=>this._showHiddenCmds=!this._showHiddenCmds}>
              ${this._showHiddenCmds?"▾":"▸"} ${n.length} hidden
            </div>
            ${this._showHiddenCmds?H`
              <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                ${n.map(e=>H`
                  <span style="font-size: 11px; background: #0d0d1f; color: #fff; padding: 3px 10px; border-radius: 4px; display: flex; align-items: center; gap: 6px;">
                    ${e}
                    <span style="cursor: pointer; color: #00D4FF; font-size: 10px;"
                      @click=${()=>this._onUnhide(e)}>show</span>
                  </span>
                `)}
              </div>
            `:""}
          </div>
        `:""}
      </div>
    `}_startAdd(){this._showAddCommand=!0,this._editingCommandName=null,this._editCommandForm={name:"",shell:""}}_startEdit(e,t){this._editingCommandName=e,this._showAddCommand=!1,this._editCommandForm={name:e,shell:t}}_saveForm(){const e=this._editCommandForm;if(!e)return;const t=(e.name||"").trim(),o=(e.shell||"").trim();t&&o&&(this.dispatchEvent(new CustomEvent("server-command-save",{detail:{name:t,shell:o,editing:this._editingCommandName},bubbles:!0,composed:!0})),this._cancelForm())}_cancelForm(){this._showAddCommand=!1,this._editingCommandName=null,this._editCommandForm=null}_onSend(e){this.dispatchEvent(new CustomEvent("command-send",{detail:{command:e},bubbles:!0,composed:!0}))}_onHide(e){this.dispatchEvent(new CustomEvent("command-hide",{detail:{name:e},bubbles:!0,composed:!0}))}_onUnhide(e){this.dispatchEvent(new CustomEvent("command-unhide",{detail:{name:e},bubbles:!0,composed:!0}))}_onRemove(e){this.dispatchEvent(new CustomEvent("server-command-remove",{detail:{name:e},bubbles:!0,composed:!0}))}}customElements.define("device-commands",qe);class Ye extends de{static properties={device:{type:Object},configInterval:{type:Number},customSensors:{type:Object},_showAddSensor:{type:Boolean,state:!0},_editSensorKey:{type:String,state:!0},_sensorForm:{type:Object,state:!0}};static styles=[ce,r`
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
  `];constructor(){super(),this.device=null,this.configInterval=30,this.customSensors={},this.pushing=!1,this.pushStatus="",this.lastPushed="",this._showAddSensor=!1,this._editSensorKey=null,this._sensorForm={name:"",command:"",interval:30,unit:""}}render(){if(!this.device)return H``;const e=this.device.remote_config||{},t=this.device.active_plugins||(e.plugins?Object.keys(e.plugins):[]),o=this.customSensors;return H`
      <div class="section">
        <div class="section-title">Agent Configuration</div>

        <div class="config-row">
          <span class="config-label">Collection interval</span>
          <input class="config-input" type="number" min="5"
            .value=${String(this.configInterval)}
            @input=${e=>this._onIntervalChange(Number(e.target.value))}>
          <span style="font-size: 12px; color: #fff; margin-left: 4px;">seconds</span>
        </div>

        ${t.length>0?H`
          <div class="config-row">
            <span class="config-label">Active plugins</span>
            <div class="plugins-list">
              ${t.map(e=>H`<span class="plugin-badge">${e}</span>`)}
            </div>
          </div>
        `:""}

        <div style="margin-bottom: 10px;">
          <div class="section-title" style="margin-bottom: 8px;">Custom Sensors</div>
          ${Object.keys(o).length>0?H`
            <table class="sensor-table">
              <thead>
                <tr>
                  <th>Name</th><th>Command</th><th>Interval</th><th>Unit</th><th></th>
                </tr>
              </thead>
              <tbody>
                ${Object.entries(o).map(([e,t])=>H`
                  <tr>
                    <td>${e}</td>
                    <td>${t.command}</td>
                    <td>${t.interval}s</td>
                    <td>${t.unit||"—"}</td>
                    <td>
                      <div class="sensor-actions">
                        <button class="sensor-btn edit"   @click=${()=>this._startEdit(e,t)}>Edit</button>
                        <button class="sensor-btn remove" @click=${()=>this._onRemove(e)}>Remove</button>
                      </div>
                    </td>
                  </tr>
                `)}
              </tbody>
            </table>
          `:H`<div style="font-size: 13px; color: #fff; margin-bottom: 10px;">No custom sensors</div>`}

          ${this._showAddSensor||this._editSensorKey?this._renderSensorForm():H`
            <button class="cmd-btn" style="font-size: 12px; padding: 5px 12px;"
              @click=${this._startAdd}>+ Add Sensor</button>
          `}
        </div>

        ${this.device.allowed_commands?.length>0?H`
          <div class="config-row" style="margin-bottom: 0;">
            <span class="config-label" style="color: #fff;">Allowed commands</span>
            <div style="font-size: 12px; color: #fff;">${(this.device.allowed_commands||[]).join(", ")}</div>
          </div>
        `:""}

      </div>
    `}_renderSensorForm(){const e=this._sensorForm;return H`
      <div class="sensor-form">
        <div class="sensor-form-grid">
          <input type="text" placeholder="Name (e.g. ping_gw)"
            .value=${e.name}
            @input=${t=>this._sensorForm={...e,name:t.target.value}}>
          <input type="text" placeholder="Command (e.g. ping -c1 10.0.0.1)"
            .value=${e.command}
            @input=${t=>this._sensorForm={...e,command:t.target.value}}>
          <input type="number" placeholder="60"
            .value=${String(e.interval)}
            @input=${t=>this._sensorForm={...e,interval:Number(t.target.value)}}>
          <input type="text" placeholder="Unit"
            .value=${e.unit}
            @input=${t=>this._sensorForm={...e,unit:t.target.value}}>
        </div>
        <div class="sensor-form-actions">
          <button class="form-btn save"   @click=${this._saveForm}>Save</button>
          <button class="form-btn cancel" @click=${this._cancelForm}>Cancel</button>
        </div>
      </div>
    `}_startAdd(){this._showAddSensor=!0,this._editSensorKey=null,this._sensorForm={name:"",command:"",interval:30,unit:""}}_startEdit(e,t){this._editSensorKey=e,this._showAddSensor=!1,this._sensorForm={name:e,command:t.command,interval:t.interval||30,unit:t.unit||""}}_saveForm(){const{name:e,command:t,interval:o,unit:s}=this._sensorForm;e.trim()&&t.trim()&&(this.dispatchEvent(new CustomEvent("sensor-save",{detail:{key:e.trim(),sensor:{command:t,interval:o||30,unit:s},oldKey:this._editSensorKey},bubbles:!0,composed:!0})),this._cancelForm())}_cancelForm(){this._showAddSensor=!1,this._editSensorKey=null,this._sensorForm={name:"",command:"",interval:30,unit:""}}_onIntervalChange(e){this.dispatchEvent(new CustomEvent("interval-changed",{detail:{value:e},bubbles:!0,composed:!0}))}_onRemove(e){this.dispatchEvent(new CustomEvent("sensor-remove",{detail:{key:e},bubbles:!0,composed:!0}))}}customElements.define("device-config",Ye);class Je extends de{static properties={deviceId:{type:String},device:{type:Object},commandResult:{type:String},_groups:{type:Object,state:!0},_effectiveSettings:{type:Object,state:!0},_haOverrides:{type:Object,state:!0},_configInterval:{type:Number,state:!0},_customSensors:{type:Object,state:!0},_showGroupDialog:{type:Boolean,state:!0},_newGroupName:{type:String,state:!0},_serverCommands:{type:Object,state:!0}};static styles=[ce,r`
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
  `];constructor(){super(),this.device=null,this.commandResult="",this._groups={},this._effectiveSettings=null,this._haOverrides={},this._configInterval=30,this._customSensors={},this._showGroupDialog=!1,this._newGroupName="",this._serverCommands={}}connectedCallback(){super.connectedCallback(),this._loadDevice(),this._loadGroups(),this._startPolling(),this._wsUnsub=pe.onMessage(e=>{"device_update"===e.type&&e.device_id===this.deviceId&&this._updateDeviceData(e.device)})}disconnectedCallback(){super.disconnectedCallback(),this._wsUnsub&&this._wsUnsub(),this._pollTimer&&clearInterval(this._pollTimer)}_startPolling(){this._pollTimer&&clearInterval(this._pollTimer);const e=1e3*parseInt(localStorage.getItem("mqtt-monitor-refresh")||"5");this._pollTimer=setInterval(()=>this._refreshDevice(),e)}async _refreshDevice(){try{const e=await be(this.deviceId);this._updateDeviceData(e)}catch(e){}}_updateDeviceData(e){e&&(this.device={...this.device||{},...e})}async _loadDevice(){try{this.device=await be(this.deviceId),this._haOverrides={...this.device.ha_exposure_overrides||{}};const e=this.device.server_commands;this._serverCommands=e&&!Array.isArray(e)?{...e}:{},this._configInterval=this.device.config_interval??this.device.collection_interval??this.device.remote_config?.interval??30;const t=this.device.server_sensors;this._customSensors=t&&"object"==typeof t?{...t}:{};try{this._effectiveSettings=await Ie(this.deviceId)}catch(e){}}catch(e){console.error("Failed to load device:",e)}}async _loadGroups(){try{this._groups=await De()}catch(e){console.error("Failed to load groups:",e)}}render(){if(!this.device)return H`<div style="padding: 40px; text-align: center; color: #fff;">Loading...</div>`;const e=this.device,t="online"===e.status?"#04d65c":"offline"===e.status?"#ef5350":"#ffb74d";return H`
      <!-- 1. Header -->
      <div class="header">
        <div class="header-left">
          <span class="title">${e.device_name||this.deviceId}</span>
          <span class="device-type">${e.device_type||""}</span>
        </div>
        <div style="display: flex; align-items: center; gap: 10px;">
          <span class="status-badge" style="background: ${t}20; color: ${t}">
            ${e.status}
          </span>
          <button class="cmd-btn danger" style="font-size: 11px; padding: 4px 10px;"
            @click=${this._deleteDevice}>Delete</button>
          <button class="close-btn" @click=${()=>this.dispatchEvent(new CustomEvent("back"))}>&#10005;</button>
        </div>
      </div>

      <!-- 2. Tags -->
      ${this._renderTagsSection()}

      <!-- 3. Group Policy -->
      ${this._renderGroupPolicy()}

      <!-- 4. Attributes + HA Exposure + Thresholds -->
      <device-attributes
        .device=${this.device}
        .effectiveSettings=${this._effectiveSettings}
        .haOverrides=${this._haOverrides}
        .groups=${this._groups}
        .cardAttributes=${this.device?.card_attributes||[]}
        @attribute-deleted=${e=>this._deleteAttribute(e.detail.name)}
        @attribute-unhidden=${e=>this._unhideAttribute(e.detail.name)}
        @ha-exposure-toggled=${e=>this._toggleHaExposure(e.detail.name)}
        @threshold-changed=${e=>this._setThreshold(e.detail.name,e.detail.value,e.detail.op)}
        @crit-threshold-changed=${e=>this._setCritThreshold(e.detail.name,e.detail.value,e.detail.op)}
        @pin-attribute=${e=>this._toggleCardAttribute(e.detail)}
      ></device-attributes>

      <!-- 5. Network -->
      ${this._renderNetwork()}

      <!-- 6. Commands -->
      <device-commands
        .device=${this.device}
        .serverCommands=${this._serverCommands}
        .commandResult=${this.commandResult}
        @command-send=${e=>this._sendCmd(e.detail.command)}
        @command-hide=${e=>this._hideCommand(e.detail.name)}
        @command-unhide=${e=>this._unhideCommand(e.detail.name)}
        @server-command-save=${e=>this._saveServerCommand(e.detail)}
        @server-command-remove=${e=>this._removeServerCommand(e.detail.name)}
      ></device-commands>

      <!-- 7. Agent Configuration -->
      <device-config
        .device=${this.device}
        .configInterval=${this._configInterval}
        .customSensors=${this._customSensors}
        @interval-changed=${e=>this._onIntervalChange(e.detail.value)}
        @sensor-save=${e=>this._saveSensor(e.detail)}
        @sensor-remove=${e=>this._removeSensor(e.detail.key)}
      ></device-config>

      ${this._showGroupDialog?this._renderGroupDialog():""}
    `}_renderTagsSection(){const e=this.device.tags||[],t=this.device.server_tags||[];return H`
      <div class="section">
        <div class="section-title">Tags</div>
        <div class="tags-row">
          ${e.map(e=>H`<span class="tag client">${e}</span>`)}
          ${t.map(e=>H`
            <span class="tag server">
              ${e}
              <span class="remove" @click=${()=>this._removeTag(e)}>&times;</span>
            </span>
          `)}
          <tag-picker
            .selectedTags=${t}
            @tag-add=${e=>this._addTag(e.detail.tag)}
            @tag-remove=${e=>this._removeTag(e.detail.tag)}
          ></tag-picker>
        </div>
        <div class="tag-hint">
          Client tags (blue) come from the device config. Server tags (purple) are managed here.
        </div>
      </div>
    `}async _addTag(e){e&&(await Fe(this.deviceId,[e]),await this._loadDevice())}async _removeTag(e){await ze(this.deviceId,e),await this._loadDevice()}_renderGroupPolicy(){const e=Object.values(this._groups),t=this.device.group_policy||"",o=t?this._groups[t]:null,s=o?.thresholds||{};return H`
      <div class="section">
        <div class="section-title">Group Policy</div>
        <div class="group-policy-row">
          <select class="group-select"
            .value=${t}
            @change=${this._onGroupPolicyChange}>
            <option value="">None — use global defaults</option>
            ${e.map(e=>H`
              <option value=${e.id} ?selected=${e.id===t}>${e.name}</option>
            `)}
          </select>
          <button class="cmd-btn" style="font-size: 12px; padding: 5px 12px;"
            @click=${()=>this._showGroupDialog=!0}>New Group</button>
        </div>

        ${o&&Object.keys(s).length>0?H`
          <div class="group-threshold-summary">
            ${Object.entries(s).map(([e,t])=>H`
              <span><span style="color: #fff;">${e.replace(/_/g," ")}:</span> ${t}</span>
            `)}
          </div>
        `:""}

        <div class="group-hint">
          Group policy sets default thresholds and HA entity settings. Device-level overrides take priority.
        </div>
      </div>
    `}async _onGroupPolicyChange(e){const t=e.target.value||null;try{await je(this.deviceId,{group_policy:t}),await this._loadDevice()}catch(e){console.error("Failed to update group policy:",e)}}_renderGroupDialog(){return H`
      <div class="overlay" @click=${()=>this._showGroupDialog=!1}>
        <div class="dialog" @click=${e=>e.stopPropagation()}>
          <h3>Create Group</h3>
          <div class="dialog-field">
            <label>Group Name</label>
            <input type="text" placeholder="e.g. Infrastructure, IoT Sensors"
              .value=${this._newGroupName}
              @input=${e=>this._newGroupName=e.target.value}
              @keydown=${e=>"Enter"===e.key&&this._createGroup()}>
          </div>
          <div class="dialog-buttons">
            <button class="dialog-btn cancel" @click=${()=>this._showGroupDialog=!1}>Cancel</button>
            <button class="dialog-btn save"   @click=${this._createGroup}>Create</button>
          </div>
        </div>
      </div>
    `}async _createGroup(){const e=this._newGroupName.trim();if(!e)return;const t=e.toLowerCase().replace(/[^a-z0-9]+/g,"_");await Ee(t,e,[this.deviceId]),this._newGroupName="",this._showGroupDialog=!1,await this._loadGroups(),await this._loadDevice()}_renderNetwork(){const e=this.device.network||{};return 0===Object.keys(e).length?H``:H`
      <div class="section">
        <div class="section-title">Network</div>
        <div class="network-grid">
          ${Object.entries(e).map(([e,t])=>H`
            <div class="net-item">
              <span class="net-label">${e}:</span>${t}
            </div>
          `)}
        </div>
      </div>
    `}async _deleteAttribute(e){if(confirm(`Hide attribute "${e}"? Custom sensors will be removed from the client. Built-in attributes will be hidden.`))try{await ve(this.deviceId,e);const t=this.device?.card_attributes||[];if(t.includes(e)){const o=t.filter(t=>t!==e);await je(this.deviceId,{card_attributes:o})}await this._loadDevice()}catch(e){console.error("Failed to hide attribute:",e)}}async _unhideAttribute(e){try{await _e(this.deviceId,e),await this._loadDevice()}catch(e){console.error("Failed to unhide attribute:",e)}}async _toggleHaExposure(e){const t=void 0!==this._haOverrides[e]?this._haOverrides[e]:void 0===this._effectiveSettings?.ha_exposure_overrides?.[e]||this._effectiveSettings.ha_exposure_overrides[e];this._haOverrides={...this._haOverrides,[e]:!t};try{await je(this.deviceId,{ha_exposure_overrides:this._haOverrides})}catch(e){console.error("Failed to update HA exposure:",e)}}async _setThreshold(e,t,o){const s={...this.device.threshold_overrides||{}};""===t||null==t?delete s[e]:s[e]={op:o||">",value:Number(t)};try{await je(this.deviceId,{threshold_overrides:s}),this.device={...this.device,threshold_overrides:s},this._effectiveSettings=await Ie(this.deviceId)}catch(e){console.error("Failed to set threshold:",e)}}async _setCritThreshold(e,t,o){const s={...this.device.crit_threshold_overrides||{}};""===t||null==t?delete s[e]:s[e]={op:o||">",value:Number(t)};try{await je(this.deviceId,{crit_threshold_overrides:s}),this.device={...this.device,crit_threshold_overrides:s}}catch(e){console.error("Failed to set crit threshold:",e)}}async _toggleCardAttribute({name:e,pinned:t}){const o=[...this.device?.card_attributes||[]];let s;s=t?[...o,e]:o.filter(t=>t!==e);try{await je(this.deviceId,{card_attributes:s}),this.device={...this.device,card_attributes:s}}catch(e){console.error("Failed to update card attributes:",e)}}async _sendCmd(e,t={}){try{this.commandResult=`Sending ${e}...`;const o=await Ce(this.deviceId,e,t);this.commandResult=`Command sent (request: ${o.request_id})`}catch(e){this.commandResult=`Error: ${e.message}`}}async _hideCommand(e){try{await xe(this.deviceId,e),await this._loadDevice()}catch(e){console.error("Failed to hide command:",e)}}async _unhideCommand(e){try{await ye(this.deviceId,e),await this._loadDevice()}catch(e){console.error("Failed to unhide command:",e)}}async _saveServerCommand({name:e,shell:t}){const{addServerCommand:o}=await Promise.resolve().then(function(){return Ue});await o(this.deviceId,e,t),await this._loadDevice()}async _removeServerCommand(e){const{removeServerCommand:t}=await Promise.resolve().then(function(){return Ue});await t(this.deviceId,e),await this._loadDevice()}async _saveSensor({key:e,sensor:t,oldKey:o}){const{addServerSensor:s,removeServerSensor:i}=await Promise.resolve().then(function(){return Ue});o&&o!==e&&await i(this.deviceId,o),await s(this.deviceId,e,t),await this._loadDevice()}async _removeSensor(e){const{removeServerSensor:t}=await Promise.resolve().then(function(){return Ue});await t(this.deviceId,e),await this._loadDevice()}async _onIntervalChange(e){const{setDeviceInterval:t}=await Promise.resolve().then(function(){return Ue});await t(this.deviceId,e),await this._loadDevice()}async _deleteDevice(){if(confirm(`Delete device "${this.device?.device_name||this.deviceId}"? This removes it from the registry. It will reappear if the client agent is still running.`))try{await fe(this.deviceId),this.dispatchEvent(new CustomEvent("back"))}catch(e){console.error("Failed to delete device:",e)}}}customElements.define("device-detail",Je);class Xe extends de{static properties={_open:{type:Boolean,state:!0},_type:{type:String,state:!0},_title:{type:String,state:!0},_message:{type:String,state:!0},_placeholder:{type:String,state:!0},_confirmLabel:{type:String,state:!0},_confirmDanger:{type:Boolean,state:!0},_inputValue:{type:String,state:!0}};static styles=[ce,r`
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
  `];constructor(){super(),this._open=!1,this._type="confirm",this._title="",this._message="",this._placeholder="",this._confirmLabel="",this._confirmDanger=!1,this._inputValue="",this._resolve=null}show({type:e="confirm",title:t="",message:o="",placeholder:s="",defaultValue:i="",confirmLabel:r="",confirmDanger:n=!1}={}){return this._type=e,this._title=t,this._message=o,this._placeholder=s,this._confirmLabel=r||("prompt"===e?"Submit":"Confirm"),this._confirmDanger=n,this._inputValue=i,this._open=!0,new Promise(e=>{this._resolve=e})}_cancel(){this._open=!1,this._resolve&&(this._resolve("prompt"===this._type&&null),this._resolve=null)}_confirm(){this._open=!1,this._resolve&&(this._resolve("prompt"!==this._type||this._inputValue),this._resolve=null)}_onKeyDown(e){"Enter"===e.key&&(e.preventDefault(),this._confirm())}_onInput(e){this._inputValue=e.target.value}updated(e){e.has("_open")&&this._open&&"prompt"===this._type&&this.updateComplete.then(()=>{const e=this.renderRoot.querySelector(".dialog-input");e&&e.focus()})}render(){if(!this._open)return H``;const e=this._confirmDanger?"btn btn-confirm danger":"btn btn-confirm";return H`
      <div class="overlay" @click=${this._cancel}>
        <div class="dialog" @click=${e=>e.stopPropagation()}>
          <h3 class="dialog-title">${this._title}</h3>
          ${this._message?H`<p class="dialog-message">${this._message}</p>`:""}
          ${"prompt"===this._type?H`
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
            <button class=${e} @click=${this._confirm}>${this._confirmLabel}</button>
          </div>
        </div>
      </div>
    `}}customElements.define("themed-dialog",Xe);const We={online:"#04d65c",offline:"#ef5350",warning:"#ffb74d",inferred:"#00D4FF",unknown:"#666"};class Ke extends de{static properties={topology:{type:Object},layouts:{type:Object},selectedLayout:{type:String},editMode:{type:Boolean},linkMode:{type:Boolean},selectedNode:{type:String},nodePositions:{type:Object},manualEdges:{type:Array},_dragging:{type:String,state:!0},_linkSource:{type:String,state:!0},_error:{type:String,state:!0},_loading:{type:Boolean,state:!0},_selectedEdge:{type:Number,state:!0},_selectedDeviceData:{type:Object,state:!0},_dirty:{type:Boolean,state:!0},_layoutDropdownOpen:{type:Boolean,state:!0},_showLabelDialog:{type:Boolean,state:!0},_labelEdgeIndex:{type:Number,state:!0},hideAutoEdges:{type:Boolean},_viewBox:{type:Object,state:!0}};static styles=[ce,r`
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
    .toolbar-right { display: flex; gap: 8px; font-size: 11px; }

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
    svg { width: 100%; height: 500px; display: block; touch-action: none; }
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
  `];constructor(){super(),this.topology={nodes:[],edges:[]},this.layouts={},this.selectedLayout="",this.editMode=!1,this.linkMode=!1,this.selectedNode=null,this.nodePositions={},this.manualEdges=[],this._dragging=null,this._dragOffset={x:0,y:0},this._linkSource=null,this._error="",this._loading=!0,this._selectedEdge=-1,this._selectedDeviceData=null,this._commandResult="",this._dirty=!1,this._layoutDropdownOpen=!1,this._showLabelDialog=!1,this._labelEdgeIndex=-1,this._savedPositions=null,this._savedManualEdges=null,this.hideAutoEdges=!1,this._viewBox={x:0,y:0,width:900,height:500},this._isPanning=!1,this._panStart=null,this._pinchActive=!1,this._pinchAnchor0=null,this._pinchAnchor1=null,this._pinchPrevDist=0}connectedCallback(){super.connectedCallback(),this._loadTopology(),this._loadLayouts();const e=1e3*parseInt(localStorage.getItem("mqtt-monitor-refresh")||"5");this._pollTimer=setInterval(()=>{this._refreshNodeStatuses()},e),this._wsUnsub=pe.onMessage(e=>{"device_update"===e.type&&this._refreshNodeStatuses()}),this._onDocClick=e=>{if(this._layoutDropdownOpen){const t=this.shadowRoot?.querySelector(".layout-dropdown");t&&!e.composedPath().includes(t)&&(this._layoutDropdownOpen=!1)}},document.addEventListener("click",this._onDocClick)}disconnectedCallback(){super.disconnectedCallback(),this._wsUnsub&&this._wsUnsub(),this._pollTimer&&clearInterval(this._pollTimer),this._onDocClick&&document.removeEventListener("click",this._onDocClick)}async _refreshNodeStatuses(){try{const e=await $e();if(!e||!e.nodes)return;const t={};for(const o of e.nodes)t[o.id]=o.status;if(this.topology&&this.topology.nodes){let o=!1;const s=this.topology.nodes.map(e=>t[e.id]&&t[e.id]!==e.status?(o=!0,{...e,status:t[e.id]}):e);for(const t of e.nodes)this.topology.nodes.find(e=>e.id===t.id)||(s.push(t),o=!0);o&&(this.topology={...this.topology,nodes:s})}}catch(e){}}async _loadTopology(){try{this._loading=!0,this._error="";const e=await $e();this.topology=e,this._autoLayout(),this._loading=!1}catch(e){console.error("Failed to load topology:",e),this._error=`Failed to load: ${e.message}`,this._loading=!1}}async _loadLayouts(){try{if(this.layouts=await we(),!this._layoutsLoaded){this._layoutsLoaded=!0;const e=Object.entries(this.layouts).find(([,e])=>e.isDefault);e&&(this.selectedLayout=e[0],this.nodePositions=e[1].positions||{},this.manualEdges=e[1].manualEdges||[],this.hideAutoEdges=e[1].hideAutoEdges||!1)}}catch(e){console.error("Failed to load layouts:",e)}}_autoLayout(){const e=this.topology.nodes;if(!e.length)return;const t={...this.selectedLayout&&this.layouts[this.selectedLayout]&&this.layouts[this.selectedLayout].positions||{}},o=Math.ceil(Math.sqrt(e.length));e.forEach((e,s)=>{if(!t[e.id]){const i=s%o,r=Math.floor(s/o);t[e.id]={x:100+i*(800/(o+1)),y:80+100*r}}}),this.nodePositions=t,this.selectedLayout&&this.layouts[this.selectedLayout]&&(this.manualEdges=this.layouts[this.selectedLayout].manualEdges||[])}get _allEdges(){const e=this.hideAutoEdges?[]:this.topology.edges||[],t=this.manualEdges.map(e=>({...e,type:"manual"}));return[...e,...t]}_getNodeName(e){const t=this.topology.nodes.find(t=>t.id===e);return t&&t.name||e}render(){if(this._loading&&!this.topology.nodes.length)return H`<div style="padding: 40px; text-align: center; color: #fff;">Loading topology...</div>`;if(this._error)return H`<div style="padding: 40px; text-align: center; color: #ef5350;">${this._error}</div>`;const e=this.topology.nodes,t=this._allEdges,o=e.filter(e=>"online"===e.status).length,s=e.filter(e=>"offline"===e.status).length,i=e.filter(e=>"warning"===e.status).length;return H`
      <div class="toolbar">
        <div class="toolbar-left">
          ${this._renderLayoutDropdown()}
          ${this.editMode?H`
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
            ${this._dirty?H`<span class="dirty-indicator">unsaved changes</span>`:""}
          `:H`
            <button class="tool-btn" @click=${this._enterEditMode}>Edit Mode</button>
          `}
        </div>
        <div class="toolbar-right">
          <span class="status-dot" style="color: #04d65c">${o} online</span>
          <span class="status-dot" style="color: #ef5350">${s} offline</span>
          <span class="status-dot" style="color: #ffb74d">${i} warning</span>
        </div>
      </div>
      ${this.editMode?H`
        <div class="toolbar toolbar-secondary">
          <div class="toolbar-left">
            <button class="tool-btn save" @click=${this._saveAsLayout}>Save As</button>
            ${this.selectedLayout?H`
              <span class="separator">|</span>
              <button class="tool-btn" @click=${this._setAsDefault}>
                ${this.layouts[this.selectedLayout]?.isDefault?"Default":"Set Default"}
              </button>
              <button class="tool-btn danger" @click=${this._deleteCurrentLayout}>Delete</button>
            `:""}
          </div>
        </div>
      `:""}

      ${this.linkMode?H`
        <div class="link-hint">
          ${this._linkSource?`Click a second device to link it to "${this._getNodeName(this._linkSource)}"`:"Click a device to start a link"}
        </div>
      `:""}

      <div class="canvas-container">
        <svg viewBox="${this._viewBox.x} ${this._viewBox.y} ${this._viewBox.width} ${this._viewBox.height}"
          @mousemove=${this._onMouseMove}
          @mouseup=${this._onMouseUp}
          @mouseleave=${this._onMouseUp}
          @wheel=${this._onWheel}
          @touchstart=${this._onTouchStart}
          @touchmove=${this._onTouchMove}
          @touchend=${this._onTouchEnd}>
          ${t.map((e,t)=>this._renderEdgeLine(e,t))}
          ${this._renderLinkPreview()}
          ${e.map(e=>this._renderNode(e))}
          ${t.map((e,t)=>this._renderEdgeLabels(e,t))}
        </svg>
        <div class="zoom-controls">
          <button class="zoom-btn" @click=${this._zoomIn} title="Zoom in">+</button>
          <button class="zoom-btn" @click=${this._zoomOut} title="Zoom out">\u2212</button>
          <button class="zoom-btn fit" @click=${this._fitAll} title="Fit all">\u229E</button>
        </div>
      </div>

      ${this.selectedNode&&!this.linkMode?this._renderDetailPanel():""}
      ${this.editMode&&this.manualEdges.length>0?this._renderManualEdgesList():""}
      ${this._showLabelDialog?this._renderLabelDialog():""}
      <themed-dialog></themed-dialog>
    `}_renderNode(e){const t=this.nodePositions[e.id]||{x:100,y:100},o=We[e.status]||We.unknown,s=this.selectedNode===e.id,i=this._linkSource===e.id,r=s||i?2.5:1.5,n=s?"4,2":i?"2,2":"none",a=i?"#ffb74d":o;return"gateway"===e.type?B`
        <g transform="translate(${t.x}, ${t.y})"
          @click=${t=>this._onNodeClick(t,e.id)}
          @mousedown=${t=>this.editMode&&!this.linkMode&&this._onMouseDown(t,e.id)}
          @touchstart=${t=>this.editMode&&!this.linkMode&&this._onTouchNodeStart(t,e.id)}
          style="cursor:pointer">
          <circle r="22" fill="#1a1a2e" stroke="${a}" stroke-width="${r}"
            stroke-dasharray="${n}"/>
          <text text-anchor="middle" dy="4" fill="${a}" font-size="10">${e.name.substring(0,12)}</text>
        </g>
      `:B`
      <g transform="translate(${t.x}, ${t.y})"
        @click=${t=>this._onNodeClick(t,e.id)}
        @mousedown=${t=>this.editMode&&!this.linkMode&&this._onMouseDown(t,e.id)}
        @touchstart=${t=>this.editMode&&!this.linkMode&&this._onTouchNodeStart(t,e.id)}
        style="cursor:pointer">
        <rect x="-45" y="-18" width="90" height="36" rx="6"
          fill="#1a1a2e" stroke="${a}" stroke-width="${r}"
          stroke-dasharray="${n}"/>
        <text text-anchor="middle" dy="-3" fill="${a}" font-size="10">
          ${(e.name||e.id).substring(0,12)}
        </text>
        <text text-anchor="middle" dy="10" fill="#666" font-size="8">${e.status}</text>
      </g>
    `}_edgeGeometry(e){const t=this.nodePositions[e.source],o=this.nodePositions[e.target];if(!t||!o)return null;const s=o.x-t.x,i=o.y-t.y,r=Math.sqrt(s*s+i*i)||1,n=s/r,a=i/r;let d=-a,l=n;l>0&&(d=-d,l=-l);const c=this._boxExitDistance(n,a);return{from:t,to:o,ux:n,uy:a,perpX:d,perpY:l,len:r,srcDist:c+8,tgtDist:c+8}}_boxExitDistance(e,t){if(Math.abs(e)<.001)return 22;if(Math.abs(t)<.001)return 48;const o=48/Math.abs(e),s=22/Math.abs(t);return Math.min(o,s)}_renderEdgeLine(e,t){const o=this._edgeGeometry(e);if(!o)return B``;const s="manual"===e.type,i=s?"#00D4FF":"#555",r=s&&this._selectedEdge===t-(this.topology.edges?.length||0)?2.5:1.5,n=s?"none":"4,2";return B`
      <line x1="${o.from.x}" y1="${o.from.y}" x2="${o.to.x}" y2="${o.to.y}"
        stroke="${i}" stroke-width="${r}"
        stroke-dasharray="${n}"
        @click=${s&&this.editMode?()=>this._selectEdge(t-(this.topology.edges?.length||0)):null}
        style="${s&&this.editMode?"cursor:pointer":""}"/>
    `}_renderEdgeLabels(e,t){if(!e.label&&!e.sourceLabel&&!e.targetLabel)return B``;const o=this._edgeGeometry(e);if(!o)return B``;const{from:s,to:i,ux:r,uy:n,perpX:a,perpY:d,srcDist:l,tgtDist:c}=o,p=s.x+r*l,h=s.y+n*l,u=i.x-r*c,g=i.y-n*c,m=(s.x+i.x)/2+14*a,b=(s.y+i.y)/2+14*d;return B`
      ${e.label?B`
        <rect x="${m-3*e.label.length-3}" y="${b-9}"
          width="${6*e.label.length+6}" height="13" rx="2" fill="#0d0d1f" opacity="0.9"/>
        <text x="${m}" y="${b}" text-anchor="middle"
          fill="#888" font-size="9" style="pointer-events:none">${e.label}</text>
      `:B``}
      ${e.sourceLabel?B`
        <rect x="${p-2.5*e.sourceLabel.length-3}" y="${h-8}"
          width="${5*e.sourceLabel.length+6}" height="12" rx="2" fill="#0d0d1f" opacity="0.9"/>
        <text x="${p}" y="${h}" text-anchor="middle"
          fill="#00D4FF" font-size="8" style="pointer-events:none">${e.sourceLabel}</text>
      `:B``}
      ${e.targetLabel?B`
        <rect x="${u-2.5*e.targetLabel.length-3}" y="${g-8}"
          width="${5*e.targetLabel.length+6}" height="12" rx="2" fill="#0d0d1f" opacity="0.9"/>
        <text x="${u}" y="${g}" text-anchor="middle"
          fill="#00D4FF" font-size="8" style="pointer-events:none">${e.targetLabel}</text>
      `:B``}
    `}_renderLinkPreview(){if(!this._linkSource||!this._mousePos)return B``;const e=this.nodePositions[this._linkSource];return e?B`
      <line x1="${e.x}" y1="${e.y}" x2="${this._mousePos.x}" y2="${this._mousePos.y}"
        stroke="#ffb74d" stroke-width="1.5" stroke-dasharray="6,3" opacity="0.6"/>
    `:B``}_renderDetailPanel(){if(!this.selectedNode)return H``;const e=this.topology.nodes.find(e=>e.id===this.selectedNode);return e&&"gateway"!==e.type?H`
      <device-detail
        .deviceId=${this.selectedNode}
        @back=${()=>{this.selectedNode=null,this._selectedDeviceData=null}}
      ></device-detail>
    `:H`
        <div style="background: rgba(255,255,255,0.05); border-radius: 8px; padding: 14px; margin-top: 12px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 16px; font-weight: 600; color: #00D4FF;">${e?e.name:this.selectedNode}</span>
            <button class="tool-btn" @click=${()=>{this.selectedNode=null}}>✕</button>
          </div>
          <div style="color: #fff; font-size: 12px; margin-top: 4px;">${e?e.type:"unknown"}</div>
        </div>
      `}_renderManualEdgesList(){return H`
      <div class="edge-panel">
        <div class="edge-panel-header">
          <span style="font-size: 13px; color: rgba(255,255,255,0.8); font-weight: 600;">Manual Links</span>
        </div>
        <div class="edge-list">
          ${this.manualEdges.map((e,t)=>H`
            <div class="edge-item">
              <span>
                ${this._getNodeName(e.source)}
                ${e.sourceLabel?H`<span style="color: #00D4FF; font-size: 10px;"> [${e.sourceLabel}]</span>`:""}
                <span style="color: #fff;"> &#8594; </span>
                ${e.label?H`<span style="color: #fff; font-size: 10px;">(${e.label})</span><span style="color: #fff;"> &#8594; </span>`:""}
                ${e.targetLabel?H`<span style="color: #00D4FF; font-size: 10px;">[${e.targetLabel}] </span>`:""}
                ${this._getNodeName(e.target)}
              </span>
              <span style="display: flex; gap: 4px;">
                <button class="tool-btn" @click=${()=>this._labelEdge(t)}>Label</button>
                <button class="tool-btn danger" @click=${()=>this._removeEdge(t)}>Remove</button>
              </span>
            </div>
          `)}
        </div>
      </div>
    `}_renderLayoutDropdown(){const e=this.selectedLayout&&this.layouts[this.selectedLayout]?this.layouts[this.selectedLayout].name:"Auto Discovery";return H`
      <div class="layout-dropdown">
        <button class="layout-trigger ${this._layoutDropdownOpen?"open":""}"
          @click=${e=>{e.stopPropagation(),this._layoutDropdownOpen=!this._layoutDropdownOpen}}>
          ${e}
        </button>
        ${this._layoutDropdownOpen?H`
          <div class="layout-menu">
            <div class="layout-option ${this.selectedLayout?"":"selected"}"
              @click=${()=>this._selectLayout("")}>Auto Discovery</div>
            ${Object.entries(this.layouts).map(([e,t])=>H`
              <div class="layout-option ${this.selectedLayout===e?"selected":""}"
                @click=${()=>this._selectLayout(e)}>
                ${t.name}
                ${t.isDefault?H`<span class="default-badge">default</span>`:""}
              </div>
            `)}
            <div class="layout-divider"></div>
            <div class="layout-option new-layout" @click=${this._createNewLayout}>+ New Layout</div>
          </div>
        `:""}
      </div>
    `}_renderLabelDialog(){const e=this.manualEdges[this._labelEdgeIndex];if(!e)return H``;const t=this._getNodeName(e.source),o=this._getNodeName(e.target);return H`
      <div class="save-overlay" @click=${this._cancelLabelDialog}>
        <div class="label-dialog" @click=${e=>e.stopPropagation()}>
          <h3>Link Labels</h3>
          <div class="subtitle">${t} &#8594; ${o}</div>

          <div class="label-field">
            <label>Source Interface (${t})</label>
            <input id="source-label" type="text"
              .value=${e.sourceLabel||""}
              placeholder="e.g., eth0, port 24, WAN"
              @keydown=${e=>"Enter"===e.key&&this._saveLabelDialog()}>
            <div class="hint">Shown near the source device</div>
          </div>

          <div class="label-field">
            <label>Link Description</label>
            <input id="link-label" type="text"
              .value=${e.label||""}
              placeholder="e.g., 1Gbps, WiFi, VLAN 10"
              @keydown=${e=>"Enter"===e.key&&this._saveLabelDialog()}>
            <div class="hint">Shown in the middle of the link</div>
          </div>

          <div class="label-field">
            <label>Target Interface (${o})</label>
            <input id="target-label" type="text"
              .value=${e.targetLabel||""}
              placeholder="e.g., eth1, port 1, LAN"
              @keydown=${e=>"Enter"===e.key&&this._saveLabelDialog()}>
            <div class="hint">Shown near the target device</div>
          </div>

          <div class="save-dialog-buttons">
            <button class="dialog-btn cancel" @click=${this._cancelLabelDialog}>Cancel</button>
            <button class="dialog-btn save" @click=${this._saveLabelDialog}>Apply</button>
          </div>
        </div>
      </div>
    `}_onNodeClick(e,t){e.stopPropagation(),this.linkMode?this._handleLinkClick(t):this._selectNode(t)}_handleLinkClick(e){if(this._linkSource)if(this._linkSource===e)this._linkSource=null;else{const t=this.manualEdges.some(t=>t.source===this._linkSource&&t.target===e||t.source===e&&t.target===this._linkSource);t||(this.manualEdges=[...this.manualEdges,{source:this._linkSource,target:e,sourceLabel:"",label:"",targetLabel:""}],this._markDirty(),this._labelEdgeIndex=this.manualEdges.length-1,this._showLabelDialog=!0),this._linkSource=null}else this._linkSource=e}_enterEditMode(){this.editMode=!0,this._savedPositions=JSON.stringify(this.nodePositions),this._savedManualEdges=JSON.stringify(this.manualEdges),this._dirty=!1}_exitEditMode(){this.editMode=!1,this.linkMode=!1,this._linkSource=null,this._selectedEdge=-1,this._dirty=!1}_markDirty(){this.editMode&&(this._dirty=!0)}async _doneEditing(){if(this.selectedLayout)await this._saveToCurrentLayout(),this._exitEditMode();else{const e=this.shadowRoot.querySelector("themed-dialog"),t=await e.show({type:"prompt",title:"Save Layout",message:"Enter a name for this layout:",placeholder:"My Layout"});if(!t)return;await this._saveNewLayout(t),this._exitEditMode()}}_discardAndExit(){this._savedPositions&&(this.nodePositions=JSON.parse(this._savedPositions)),this._savedManualEdges&&(this.manualEdges=JSON.parse(this._savedManualEdges)),this._exitEditMode()}async _saveAsLayout(){const e=this.shadowRoot.querySelector("themed-dialog"),t=await e.show({type:"prompt",title:"Save As New Layout",message:"Enter a name for the new layout:",placeholder:"Layout copy"});t&&await this._saveNewLayout(t)}async _saveToCurrentLayout(){if(!this.selectedLayout||!this.layouts[this.selectedLayout])return;const e=this.layouts[this.selectedLayout];await ke({id:this.selectedLayout,name:e.name,positions:this.nodePositions,manualEdges:this.manualEdges,hideAutoEdges:this.hideAutoEdges,isDefault:e.isDefault||!1}),await this._loadLayouts(),this._dirty=!1,this._savedPositions=JSON.stringify(this.nodePositions),this._savedManualEdges=JSON.stringify(this.manualEdges)}async _saveNewLayout(e){const t=await ke({name:e,positions:this.nodePositions,manualEdges:this.manualEdges,hideAutoEdges:this.hideAutoEdges,isDefault:!1});this.selectedLayout=t.id,await this._loadLayouts(),this._dirty=!1,this._savedPositions=JSON.stringify(this.nodePositions),this._savedManualEdges=JSON.stringify(this.manualEdges)}_selectLayout(e){if(this._layoutDropdownOpen=!1,this.selectedLayout=e,e&&this.layouts[e]){const t=this.layouts[e];this.nodePositions=t.positions||{},this.manualEdges=t.manualEdges||[],this.hideAutoEdges=t.hideAutoEdges||!1}else this.nodePositions={},this.manualEdges=[],this.hideAutoEdges=!1,this._autoLayout()}_createNewLayout(){this._layoutDropdownOpen=!1,this.selectedLayout="",this.nodePositions={},this.manualEdges=[],this.hideAutoEdges=!1,this._autoLayout(),this._enterEditMode()}_toggleLinkMode(){this.linkMode=!this.linkMode,this._linkSource=null,this.linkMode&&(this.selectedNode=null)}async _selectNode(e){if(this.selectedNode===e)return this.selectedNode=null,this._selectedDeviceData=null,void(this._commandResult="");this.selectedNode=e,this._selectedDeviceData=null,this._commandResult="";try{this._selectedDeviceData=await fetchDevice(e)}catch(e){this._selectedDeviceData={status:"inferred",attributes:{},tags:[]}}}async _sendCmd(e){if(this.selectedNode)try{this._commandResult=`Sending ${e}...`;const t=await sendCommand(this.selectedNode,e);this._commandResult=`Sent (request: ${t.request_id})`}catch(e){this._commandResult=`Error: ${e.message}`}}_selectEdge(e){this._selectedEdge=this._selectedEdge===e?-1:e}_labelEdge(e){this._labelEdgeIndex=e,this._showLabelDialog=!0}_saveLabelDialog(){const e=this.shadowRoot.querySelector(".label-dialog"),t=e.querySelector("#source-label").value,o=e.querySelector("#link-label").value,s=e.querySelector("#target-label").value,i=[...this.manualEdges];i[this._labelEdgeIndex]={...i[this._labelEdgeIndex],sourceLabel:t,label:o,targetLabel:s},this.manualEdges=i,this._markDirty(),this._showLabelDialog=!1,this._labelEdgeIndex=-1}_cancelLabelDialog(){this._showLabelDialog=!1,this._labelEdgeIndex=-1}_removeEdge(e){this.manualEdges=this.manualEdges.filter((t,o)=>o!==e),this._selectedEdge=-1,this._markDirty()}_onMouseDown(e,t){this._dragging=t;const o=this.shadowRoot.querySelector("svg"),s=o.createSVGPoint();s.x=e.clientX,s.y=e.clientY;const i=s.matrixTransform(o.getScreenCTM().inverse()),r=this.nodePositions[t]||{x:0,y:0};this._dragOffset={x:i.x-r.x,y:i.y-r.y},e.preventDefault()}_onMouseMove(e){const t=this.shadowRoot.querySelector("svg"),o=t.createSVGPoint();o.x=e.clientX,o.y=e.clientY;const s=o.matrixTransform(t.getScreenCTM().inverse());this.linkMode&&this._linkSource&&(this._mousePos={x:s.x,y:s.y},this.requestUpdate()),this._dragging&&(this.nodePositions={...this.nodePositions,[this._dragging]:{x:s.x-this._dragOffset.x,y:s.y-this._dragOffset.y}})}_onWheel(e){if(!e.ctrlKey)return;e.preventDefault();const t=e.deltaY>0?1.1:.9;this._zoomAt(e.clientX,e.clientY,t)}_zoomAt(e,t,o){const s=this.shadowRoot.querySelector("svg");if(!s)return;const i=s.createSVGPoint();i.x=e,i.y=t;const r=i.matrixTransform(s.getScreenCTM().inverse()),n={...this._viewBox},a=Math.max(300,Math.min(2700,n.width*o)),d=Math.max(167,Math.min(1500,n.height*o)),l=a/n.width,c=d/n.height;n.x=r.x-(r.x-n.x)*l,n.y=r.y-(r.y-n.y)*c,n.width=a,n.height=d,this._viewBox=n}_zoomIn(){const e=this.shadowRoot.querySelector("svg")?.getBoundingClientRect();e&&this._zoomAt(e.left+e.width/2,e.top+e.height/2,.8)}_zoomOut(){const e=this.shadowRoot.querySelector("svg")?.getBoundingClientRect();e&&this._zoomAt(e.left+e.width/2,e.top+e.height/2,1.25)}_fitAll(){const e=Object.values(this.nodePositions);if(!e.length)return;const t=e.map(e=>e.x),o=e.map(e=>e.y);this._viewBox={x:Math.min(...t)-80,y:Math.min(...o)-80,width:Math.max(...t)-Math.min(...t)+160,height:Math.max(...o)-Math.min(...o)+160}}_clientToSvg(e,t){const o=this.shadowRoot.querySelector("svg");if(!o)return null;const s=o.createSVGPoint();return s.x=e,s.y=t,s.matrixTransform(o.getScreenCTM().inverse())}_onTouchStart(e){if(2===e.touches.length){e.preventDefault();const t=e.touches[0].clientX-e.touches[1].clientX,o=e.touches[0].clientY-e.touches[1].clientY;return this._pinchPrevDist=Math.sqrt(t*t+o*o),this._pinchActive=!0,this._pinchAnchor0=this._clientToSvg(e.touches[0].clientX,e.touches[0].clientY),this._pinchAnchor1=this._clientToSvg(e.touches[1].clientX,e.touches[1].clientY),this._isPanning=!1,void(this._panStart=null)}if(1===e.touches.length){const t=e.touches[0];this._isPanning=!0,this._panStart={x:t.clientX,y:t.clientY,vbX:this._viewBox.x,vbY:this._viewBox.y}}}_onTouchMove(e){if(2===e.touches.length&&this._pinchActive){if(e.preventDefault(),!this._pinchAnchor0||!this._pinchAnchor1)return;const t=e.touches[0].clientX-e.touches[1].clientX,o=e.touches[0].clientY-e.touches[1].clientY,s=Math.sqrt(t*t+o*o);if(!this._pinchPrevDist||0===s)return void(this._pinchPrevDist=s);const i=this._pinchPrevDist/s,r=(this._pinchAnchor0.x+this._pinchAnchor1.x)/2,n=(this._pinchAnchor0.y+this._pinchAnchor1.y)/2,a=this._viewBox,d=Math.max(300,Math.min(2700,a.width*i)),l=d/a.width,c=Math.max(167,Math.min(1500,a.height*l));let p=r-(r-a.x)*l,h=n-(n-a.y)*(c/a.height);const u=this.shadowRoot.querySelector("svg");if(u){const t=u.getBoundingClientRect();if(t.width>0&&t.height>0){const o=(e.touches[0].clientX+e.touches[1].clientX)/2,s=(e.touches[0].clientY+e.touches[1].clientY)/2;p=r-(o-t.left)*(d/t.width),h=n-(s-t.top)*(c/t.height)}}if(this._viewBox={x:p,y:h,width:d,height:c},u){const t=u.getBoundingClientRect();if(t.width>0&&t.height>0){const o=e=>p+(e-t.left)*(d/t.width),s=e=>h+(e-t.top)*(c/t.height);this._pinchAnchor0={x:o(e.touches[0].clientX),y:s(e.touches[0].clientY)},this._pinchAnchor1={x:o(e.touches[1].clientX),y:s(e.touches[1].clientY)}}}return void(this._pinchPrevDist=s)}if(1===e.touches.length&&this._dragging){e.preventDefault();const t=e.touches[0],o=this._clientToSvg(t.clientX,t.clientY);if(!o)return;return void(this.nodePositions={...this.nodePositions,[this._dragging]:{x:o.x-this._dragOffset.x,y:o.y-this._dragOffset.y}})}if(1===e.touches.length&&this._isPanning&&this._panStart){const t=e.touches[0],o=this.shadowRoot.querySelector("svg");if(!o)return;const s=o.getScreenCTM(),i=(t.clientX-this._panStart.x)/s.a,r=(t.clientY-this._panStart.y)/s.d;this._viewBox={...this._viewBox,x:this._panStart.vbX-i,y:this._panStart.vbY-r}}}_onTouchEnd(e){if(e.touches.length<2&&(this._pinchActive=!1,this._pinchPrevDist=0,this._pinchAnchor0=null,this._pinchAnchor1=null,1===e.touches.length&&!this._dragging)){const t=e.touches[0];this._isPanning=!0,this._panStart={x:t.clientX,y:t.clientY,vbX:this._viewBox.x,vbY:this._viewBox.y}}0===e.touches.length&&(this._dragging&&this._markDirty(),this._dragging=null,this._isPanning=!1,this._panStart=null)}_onTouchNodeStart(e,t){if(1!==e.touches.length)return;e.stopPropagation(),this._isPanning=!1;const o=e.touches[0],s=this._clientToSvg(o.clientX,o.clientY);if(!s)return;const i=this.nodePositions[t]||{x:0,y:0};this._dragOffset={x:s.x-i.x,y:s.y-i.y},this._dragging=t}_onMouseUp(){this._dragging&&this._markDirty(),this._dragging=null}async _setAsDefault(){if(!this.selectedLayout)return;for(const[e,t]of Object.entries(this.layouts))t.isDefault&&(t.isDefault=!1,await ke(t));const e=this.layouts[this.selectedLayout];e&&(e.isDefault=!0,await ke(e)),await this._loadLayouts(),this._layoutsLoaded=!0}async _deleteCurrentLayout(){if(!this.selectedLayout)return;const e=this.layouts[this.selectedLayout]?.name||this.selectedLayout,t=this.shadowRoot.querySelector("themed-dialog");await t.show({type:"confirm",title:"Delete Layout",message:`Delete "${e}"? This cannot be undone.`,confirmLabel:"Delete",confirmDanger:!0})&&(await Se(this.selectedLayout),this.selectedLayout="",this.nodePositions={},this.manualEdges=[],this.hideAutoEdges=!1,this._dirty=!1,await this._loadLayouts(),this._autoLayout())}}customElements.define("topology-view",Ke);const Ze={online:"#04d65c",offline:"#ef5350",warning:"#ffb74d",unknown:"#666"};class Qe extends de{static properties={device:{type:Object},deviceId:{type:String}};static styles=[ce,r`
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
      color: rgba(255,255,255,0.5);
    }
    .attr-value { color: rgba(255,255,255,0.8); }
    .attr-value.warning { color: #ffb74d; }
    .tags {
      display: flex; gap: 4px; margin-top: 8px; flex-wrap: wrap;
    }
    .tag {
      font-size: 9px; background: rgba(0,212,255,0.15); color: #00D4FF;
      padding: 1px 6px; border-radius: 3px;
    }

    @media (max-width: 480px) {
      .attrs { grid-template-columns: 1fr; }
    }
  `];render(){if(!this.device)return H``;const e=this.device,t=Ze[e.status]||Ze.unknown,o=Object.entries(e.attributes||{}),s=e.hidden_attributes||[],i=e.card_attributes||[];let r;r=i.length>0?i.map(e=>o.find(([t])=>t===e)).filter(Boolean):o.filter(([e])=>!s.includes(e)).slice(0,4);const n=[...e.tags||[],...e.server_tags||[]],a=e.device_name||this.deviceId;return this.style.setProperty("--status-color",t),this.setAttribute("role","button"),this.setAttribute("tabindex","0"),this.setAttribute("aria-label",`${a}, ${e.status||"unknown"}`),H`
      <div class="header">
        <span class="name">${a}</span>
        <span class="status" style="background: ${t}20; color: ${t}">
          ${"online"===e.status||"offline"===e.status?"● ":"⚠ "}${e.status}
        </span>
      </div>
      <div class="type">${e.device_type||"unknown"}</div>
      ${r.length>0?H`
        <div class="attrs">
          ${r.map(([e,t])=>H`
            <div class="attr">
              ${e.replace(/_/g," ")}: <span class="attr-value ${this._isWarning(e,t)?"warning":""}">${t.value}${t.unit}</span>
            </div>
          `)}
        </div>
      `:""}
      ${n.length>0?H`
        <div class="tags">
          ${n.map(e=>H`<span class="tag">${e}</span>`)}
        </div>
      `:""}
    `}_isWarning(e,t){const o={cpu_usage:90,memory_usage:90,disk_usage:95,cpu_temp:80};return o[e]&&t.value>o[e]}}customElements.define("device-card",Qe);class et extends de{static properties={devices:{type:Object},filter:{type:String},selectedTags:{type:Array},viewMode:{type:String},_groups:{type:Object,state:!0},_collapsedGroups:{type:Object,state:!0},_refreshInterval:{type:Number,state:!0}};static styles=[ce,r`
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
    .refresh-control {
      display: flex; align-items: center; gap: 4px;
    }
    .refresh-select {
      background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #fff;
      padding: 4px 8px; border-radius: 12px; font-size: 11px; cursor: pointer;
    }
    .refresh-select:focus { outline: none; border-color: #00D4FF; }
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

    @media (max-width: 768px) {
      :host { padding: 12px; }
      .filter-bar { gap: 6px; }
      .grid { grid-template-columns: 1fr; }
    }
  `];constructor(){super(),this.devices={},this.filter="all",this.selectedTags=[],this.viewMode="all",this._groups={},this._collapsedGroups={},this._wsUnsub=null,this._refreshInterval=parseInt(localStorage.getItem("mqtt-monitor-refresh")||"5"),this._pollTimer=null,this._lastFetchTime=0}connectedCallback(){super.connectedCallback(),this._loadDevices(),this._loadGroups(),this._startPolling(),this._wsUnsub=pe.onMessage(e=>{"device_update"===e.type&&(this.devices={...this.devices,[e.device_id]:e.device},this.requestUpdate())})}disconnectedCallback(){super.disconnectedCallback(),this._wsUnsub&&this._wsUnsub(),this._pollTimer&&clearInterval(this._pollTimer)}_startPolling(){this._pollTimer&&clearInterval(this._pollTimer);const e=1e3*(this._refreshInterval||5);this._pollTimer=setInterval(()=>this._loadDevices(),e)}async _loadDevices(){try{const e=await me(this._lastFetchTime);e&&Object.keys(e).length>0?this.devices={...this.devices,...e}:0===this._lastFetchTime&&(this.devices=e||{}),this._lastFetchTime=Date.now()/1e3}catch(e){console.error("Failed to load devices:",e)}}async _loadGroups(){try{this._groups=await De()}catch(e){console.error("Failed to load groups:",e)}}get _filteredDevices(){let e=Object.entries(this.devices);return"all"!==this.filter&&(e=e.filter(([,e])=>e.status===this.filter)),this.selectedTags.length>0&&(e=e.filter(([,e])=>{const t=[...e.tags||[],...e.server_tags||[]];return this.selectedTags.some(e=>t.includes(e))})),e}get _counts(){const e=Object.values(this.devices);return{all:e.length,online:e.filter(e=>"online"===e.status).length,offline:e.filter(e=>"offline"===e.status).length,warning:e.filter(e=>"warning"===e.status).length}}_onTagAdd(e){const t=e.detail.tag;this.selectedTags.includes(t)||(this.selectedTags=[...this.selectedTags,t])}_onTagRemove(e){this.selectedTags=this.selectedTags.filter(t=>t!==e.detail.tag)}render(){const e=this._counts;return H`
      <div class="filter-bar">
        <div class="status-filters">
          <button class="filter-btn ${"all"===this.filter?"active":""}"
            @click=${()=>this.filter="all"}>All (${e.all})</button>
          <button class="filter-btn ${"online"===this.filter?"active":""}"
            @click=${()=>this.filter="online"}>Online (${e.online})</button>
          <button class="filter-btn ${"offline"===this.filter?"active":""}"
            @click=${()=>this.filter="offline"}>Offline (${e.offline})</button>
          <button class="filter-btn ${"warning"===this.filter?"active":""}"
            @click=${()=>this.filter="warning"}>Warning (${e.warning})</button>
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

        <div class="refresh-control">
          <select class="refresh-select"
            .value=${String(this._refreshInterval)}
            @change=${e=>{this._refreshInterval=Number(e.target.value),localStorage.setItem("mqtt-monitor-refresh",e.target.value),this._startPolling()}}>
            <option value="1">1s</option>
            <option value="2">2s</option>
            <option value="5">5s</option>
            <option value="10">10s</option>
            <option value="30">30s</option>
            <option value="60">60s</option>
          </select>
        </div>
      </div>

      ${this.selectedTags.length>0?H`
        <div class="active-tags">
          ${this.selectedTags.map(e=>H`
            <span class="active-tag">
              #${e}
              <span class="remove" @click=${()=>this.selectedTags=this.selectedTags.filter(t=>t!==e)}>&times;</span>
            </span>
          `)}
          <button class="clear-all" @click=${()=>{this.selectedTags=[],this.filter="all"}}>Clear all</button>
        </div>
      `:""}

      ${"group"===this.viewMode?this._renderByGroup():this._renderAll()}
    `}_renderAll(){const e=this._filteredDevices;return 0===e.length?H`<div class="empty">No devices found</div>`:H`
      <div class="grid">
        ${e.map(([e,t])=>H`
          <device-card
            .device=${t}
            .deviceId=${e}
            @click=${()=>this._selectDevice(e)}
          ></device-card>
        `)}
      </div>
    `}_renderByGroup(){const e=this._filteredDevices,t=Object.values(this._groups),o={},s=new Set;t.forEach(t=>{const i=e.filter(([e])=>(t.device_ids||[]).includes(e));o[t.id]=i,i.forEach(([e])=>s.add(e))});const i=e.filter(([e])=>!s.has(e));return H`
      ${t.map(e=>this._renderGroupSection(e,o[e.id]||[]))}
      ${i.length>0?H`
        <div class="group-section">
          <div class="ungrouped-header">Ungrouped (${i.length})</div>
          <div class="grid">
            ${i.map(([e,t])=>H`
              <device-card .device=${t} .deviceId=${e}
                @click=${()=>this._selectDevice(e)}></device-card>
            `)}
          </div>
        </div>
      `:""}
      ${0===e.length?H`<div class="empty">No devices found</div>`:""}
    `}_renderGroupSection(e,t){const o=!!this._collapsedGroups[e.id],s=Object.entries(this.devices).filter(([t])=>(e.device_ids||[]).includes(t)).map(([,e])=>e),i=s.filter(e=>"online"===e.status).length,r=s.length;return H`
      <div class="group-section">
        <div class="group-section-header"
          @click=${()=>this._toggleGroupCollapse(e.id)}>
          <span class="group-chevron ${o?"":"open"}">&#9658;</span>
          <span class="group-section-name">${e.name}</span>
          <span class="group-device-count">${t.length} device${1!==t.length?"s":""}</span>
          <div class="group-health">
            <span class="health-dot" style="color: #04d65c">
              ${i}/${r} online
            </span>
          </div>
        </div>
        ${o?"":H`
          <div class="group-body">
            ${0===t.length?H`<div style="color: #fff; font-size: 13px; padding: 8px 4px;">No devices match current filters</div>`:H`
                <div class="grid">
                  ${t.map(([e,t])=>H`
                    <device-card .device=${t} .deviceId=${e}
                      @click=${()=>this._selectDevice(e)}></device-card>
                  `)}
                </div>
              `}
          </div>
        `}
      </div>
    `}_toggleGroupCollapse(e){this._collapsedGroups={...this._collapsedGroups,[e]:!this._collapsedGroups[e]}}_selectDevice(e){this.dispatchEvent(new CustomEvent("device-select",{detail:{deviceId:e},bubbles:!0,composed:!0}))}}customElements.define("dashboard-view",et);class tt extends de{static properties={_tags:{type:Array,state:!0},_loading:{type:Boolean,state:!0},_newTagName:{type:String,state:!0},_renamingTag:{type:String,state:!0},_renameValue:{type:String,state:!0},_selectedTags:{type:Object,state:!0}};static styles=[ce,r`
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
  `];constructor(){super(),this._tags=[],this._loading=!0,this._newTagName="",this._renamingTag=null,this._renameValue="",this._selectedTags=new Set}connectedCallback(){super.connectedCallback(),this._loadTags()}async _loadTags(){this._loading=!0;try{const e=await Ne().catch(()=>[]);this._tags=Array.isArray(e)?e.map(e=>"string"==typeof e?{tag:e,count:0}:e).sort((e,t)=>e.tag.localeCompare(t.tag)):[]}finally{this._loading=!1}}render(){const e=this._selectedTags?this._selectedTags.size:0;return H`
      <div class="section">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <div class="section-title" style="margin-bottom: 0;">Tag Registry</div>
          <span style="font-size: 10px; color: #fff;">Server-managed tags only</span>
        </div>

        ${e>0?H`
          <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 12px; padding: 8px 12px; background: rgba(255,255,255,0.03); border-radius: 6px;">
            <span style="font-size: 12px; color: rgba(255,255,255,0.8);">${e} selected</span>
            <button class="small-btn cancel" style="font-size: 11px; padding: 3px 10px;"
              @click=${this._deleteSelectedTags}>Delete Selected</button>
            <button class="small-btn cancel" style="font-size: 11px; padding: 3px 10px;"
              @click=${()=>this._selectedTags=new Set}>Deselect All</button>
          </div>
        `:""}

        ${this._tags.length>0?H`
          <div class="tag-grid">
            ${this._tags.map(e=>this._renderTagCard(e))}
          </div>
        `:H`<div style="color: #fff; font-size: 13px; margin-bottom: 12px;">No tags created yet</div>`}

        ${this._renamingTag?H`
          <div class="sensor-form" style="margin-top: 12px;">
            <div style="font-size: 11px; color: #fff; margin-bottom: 6px;">Rename "${this._renamingTag}"</div>
            <div class="sensor-form-grid" style="grid-template-columns: 1fr;">
              <input type="text" .value=${this._renameValue}
                @input=${e=>this._renameValue=e.target.value}
                @keydown=${e=>{"Enter"===e.key&&this._saveRename(this._renamingTag),"Escape"===e.key&&this._cancelRename()}}>
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
            @input=${e=>this._newTagName=e.target.value}
            @keydown=${e=>"Enter"===e.key&&this._createTag()}>
          <button class="small-btn" @click=${this._createTag}>Create Tag</button>
        </div>
      </div>
    `}_renderTagCard(e){const t=this._selectedTags&&this._selectedTags.has(e.tag),o=e.device_count||e.count||0;return H`
      <div class="tag-card ${t?"selected":""}"
        role="checkbox"
        aria-checked=${t?"true":"false"}
        aria-label="Tag: ${e.tag}, used by ${o} device${1!==o?"s":""}"
        tabindex="0"
        @click=${()=>this._toggleTagSelection(e.tag)}
        @keydown=${t=>("Enter"===t.key||" "===t.key)&&this._toggleTagSelection(e.tag)}>
        <div class="tag-card-top">
          <span class="tag-card-name">${e.tag}</span>
        </div>
        <div class="tag-card-count">${o} device${1!==o?"s":""}</div>
        <div class="tag-card-actions">
          <button class="sensor-btn edit" aria-label="Rename tag ${e.tag}"
            @click=${t=>{t.stopPropagation(),this._startRename(e.tag)}}>Rename</button>
          <button class="sensor-btn remove" aria-label="Delete tag ${e.tag}"
            @click=${t=>{t.stopPropagation(),this._deleteTag(e.tag)}}>Delete</button>
        </div>
      </div>
    `}_toggleTagSelection(e){const t=new Set(this._selectedTags);t.has(e)?t.delete(e):t.add(e),this._selectedTags=t}async _deleteSelectedTags(){const e=[...this._selectedTags];if(confirm(`Delete ${e.length} tag${1!==e.length?"s":""}?`)){for(const t of e)try{await Oe(t)}catch(e){console.error(e)}this._selectedTags=new Set,await this._loadTags()}}_startRename(e){this._renamingTag=e,this._renameValue=e}_cancelRename(){this._renamingTag=null,this._renameValue=""}async _saveRename(e){const t=this._renameValue.trim();if(t&&t!==e){try{await Pe(e,t),await this._loadTags()}catch(e){console.error("Failed to rename tag:",e)}this._cancelRename()}else this._cancelRename()}async _createTag(){const e=this._newTagName.trim();if(e)try{await Ge(e),this._newTagName="",await this._loadTags()}catch(e){console.error("Failed to create tag:",e)}}async _deleteTag(e){const t=this._tags.find(t=>t.tag===e);if(!(t&&t.count>0)||confirm(`"${e}" is used by ${t.count} device(s). Delete anyway?`))try{await Oe(e),await this._loadTags()}catch(e){console.error("Failed to delete tag:",e)}}}customElements.define("tag-registry-settings",tt);class ot extends de{static properties={_groups:{type:Object,state:!0},_devices:{type:Object,state:!0},_loading:{type:Boolean,state:!0},_expandedGroup:{type:String,state:!0},_newGroupName:{type:String,state:!0},_editGroupName:{type:String,state:!0},_editingGroupName:{type:String,state:!0},_groupSaveStatus:{type:Object,state:!0},_groupPushStatus:{type:Object,state:!0},_editingGroupCmd:{type:Object,state:!0},_showAddGroupCmd:{type:Object,state:!0},_groupCmdForm:{type:Object,state:!0},_editingGroupSensor:{type:Object,state:!0},_showAddGroupSensor:{type:Object,state:!0},_groupSensorForm:{type:Object,state:!0}};static styles=[ce,r`
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
  `];constructor(){super(),this._groups={},this._devices={},this._loading=!0,this._expandedGroup=null,this._newGroupName="",this._editGroupName="",this._editingGroupName=null,this._groupSaveStatus={},this._groupPushStatus={},this._editingGroupCmd=null,this._showAddGroupCmd=null,this._groupCmdForm={name:"",shell:""},this._editingGroupSensor=null,this._showAddGroupSensor=null,this._groupSensorForm={name:"",command:"",interval:"",unit:""}}connectedCallback(){super.connectedCallback(),this._loadAll()}async _loadAll(){this._loading=!0;try{const[e,t]=await Promise.all([De().catch(()=>({})),me().catch(()=>({}))]);this._groups=e||{},this._devices=t||{}}finally{this._loading=!1}}render(){const e=Object.values(this._groups);return H`
      <div class="section">
        <div class="section-title">Group Policies</div>
        <div class="group-list">
          ${e.map(e=>this._renderGroup(e))}
        </div>
        <div class="add-row">
          <input class="small-input" type="text" placeholder="New group name..."
            .value=${this._newGroupName}
            @input=${e=>this._newGroupName=e.target.value}
            @keydown=${e=>"Enter"===e.key&&this._createGroup()}>
          <button class="small-btn" @click=${this._createGroup}>New Group</button>
        </div>
      </div>
    `}_renderGroup(e){const t=this._expandedGroup===e.id,o=(e.device_ids||[]).length;return H`
      <div>
        <div class="group-header" @click=${()=>this._toggleGroup(e.id)}>
          <div class="group-header-left">
            <span class="chevron ${t?"open":""}">&#9658;</span>
            <span class="group-header-name">${e.name}</span>
            <span class="group-member-count">${o} member${1!==o?"s":""}</span>
          </div>
        </div>
        ${t?H`
          <div class="group-body">
            <div class="group-field">
              <label>Name</label>
              <input class="threshold-input" type="text"
                .value=${this._editingGroupName===e.id?this._editGroupName:e.name||""}
                @input=${t=>{this._editingGroupName=e.id,this._editGroupName=t.target.value}}>
            </div>

            <div class="group-field">
              <label>Members</label>
              <div class="members-row">
                ${(e.device_ids||[]).map(t=>{const o=this._devices[t];return H`
                    <span class="member-pill">
                      ${o&&o.device_name||t}
                      <span class="remove" @click=${()=>this._removeMember(e,t)}>&times;</span>
                    </span>
                  `})}
                ${this._renderAddMemberDropdown(e)}
              </div>
            </div>

            <div class="group-field">
              <label>Thresholds</label>
              ${this._renderGroupThresholds(e)}
            </div>

            <div class="group-field">
              <label>Custom Commands</label>
              ${this._renderGroupCustomCommands(e)}
            </div>

            <div class="group-field">
              <label>Custom Sensors</label>
              ${this._renderGroupCustomSensors(e)}
            </div>

            <div class="group-footer">
              <button class="group-delete-btn" @click=${()=>this._deleteGroup(e)}>Delete Group</button>
              <div style="display: flex; gap: 8px; align-items: center; margin-left: auto;">
                ${"Deploying..."===this._groupPushStatus[e.id]?H`<span class="group-status-pushing">Deploying...</span>`:""}
                ${"Deployed!"===this._groupPushStatus[e.id]?H`<span class="group-status-pushed">Deployed!</span>`:""}
                ${(this._groupPushStatus[e.id]||"").startsWith("Error")?H`<span class="group-status-error">${this._groupPushStatus[e.id]}</span>`:""}
                <button class="group-save-btn" style="background: #2e7d32;"
                  @click=${()=>this._deployToDevices(e)}>Deploy to Devices</button>
              </div>
            </div>
          </div>
        `:""}
      </div>
    `}_getGroupDiscoveredData(e){const t=e.device_ids||[],o=new Set,s={},i={};for(const e of t){const t=this._devices[e];if(!t)continue;if(t.attributes&&"object"==typeof t.attributes)for(const e of Object.keys(t.attributes))o.add(e);if(Array.isArray(t.allowed_commands))for(const e of t.allowed_commands)e in s||(s[e]="");const r=t.remote_config;if(r&&r.plugins&&r.plugins.custom_command&&r.plugins.custom_command.commands)for(const[e,t]of Object.entries(r.plugins.custom_command.commands))i[e]||(i[e]=t)}return{attributes:Array.from(o).sort(),commands:s,sensors:i}}_renderGroupCustomCommands(e){const t=e.custom_commands||{},o=Object.entries(t).sort(([e],[t])=>e.localeCompare(t)),s=e.hidden_commands||[],i=o.filter(([e])=>!s.includes(e)),r=o.filter(([e])=>s.includes(e)),n=this._editingGroupCmd&&this._editingGroupCmd.groupId===e.id,a=this._showAddGroupCmd&&this._showAddGroupCmd.groupId===e.id;return H`
      ${i.length>0?H`
        <table class="sensor-table">
          <thead>
            <tr><th>Name</th><th>Shell Command</th><th></th></tr>
          </thead>
          <tbody>
            ${i.map(([t,o])=>H`
              <tr>
                <td style="font-family: monospace;">${t}</td>
                <td style="font-family: monospace; font-size: 11px;">${o||"—"}</td>
                <td>
                  <div class="sensor-actions">
                    <button class="sensor-btn edit"
                      @click=${()=>this._startEditGroupCmd(e.id,t,o)}>Edit</button>
                    <button class="sensor-btn remove"
                      @click=${()=>this._removeGroupCommand(e,t)}>Remove</button>
                  </div>
                </td>
              </tr>
            `)}
          </tbody>
        </table>
      `:H`
        <div style="font-size: 12px; color: #fff; margin-bottom: 8px;">No commands</div>
      `}

      ${r.length>0?H`
        <div style="margin-top: 6px;">
          <div style="font-size: 10px; color: #fff; margin-bottom: 4px; cursor: pointer;"
            @click=${()=>{e._showHiddenCmds=!e._showHiddenCmds,this.requestUpdate()}}>
            ${e._showHiddenCmds?"▾":"▸"} ${r.length} hidden
          </div>
          ${e._showHiddenCmds?H`
            <div style="display: flex; gap: 4px; flex-wrap: wrap;">
              ${r.map(([t])=>H`
                <span style="font-size: 11px; background: #0d0d1f; color: #fff; padding: 3px 10px; border-radius: 4px; display: flex; align-items: center; gap: 4px;">
                  ${t}
                  <span style="cursor: pointer; color: #00D4FF; font-size: 10px;"
                    @click=${()=>this._unhideGroupCommand(e,t)}>show</span>
                </span>
              `)}
            </div>
          `:""}
        </div>
      `:""}

      ${n||a?H`
        <div class="sensor-form">
          <div class="sensor-form-grid" style="grid-template-columns: 1fr 2fr;">
            <input type="text" placeholder="Command name"
              .value=${this._groupCmdForm.name}
              ?disabled=${!!n}
              @input=${e=>this._groupCmdForm={...this._groupCmdForm,name:e.target.value}}>
            <input type="text" placeholder="Shell command"
              .value=${this._groupCmdForm.shell}
              @input=${e=>this._groupCmdForm={...this._groupCmdForm,shell:e.target.value}}
              @keydown=${t=>"Enter"===t.key&&this._saveGroupCmd(e)}>
          </div>
          <div class="sensor-form-actions">
            <button class="form-btn save" @click=${()=>this._saveGroupCmd(e)}>${n?"Update":"Add"}</button>
            <button class="form-btn cancel" @click=${this._cancelGroupCmdForm}>Cancel</button>
          </div>
        </div>
      `:H`
        <button class="add-cmd-btn" @click=${()=>this._startAddGroupCmd(e.id)}>+ Add Command</button>
      `}
    `}_startAddGroupCmd(e){this._showAddGroupCmd={groupId:e},this._editingGroupCmd=null,this._groupCmdForm={name:"",shell:""}}_startEditGroupCmd(e,t,o){this._editingGroupCmd={groupId:e,name:t},this._showAddGroupCmd=null,this._groupCmdForm={name:t,shell:o}}_cancelGroupCmdForm(){this._editingGroupCmd=null,this._showAddGroupCmd=null,this._groupCmdForm={name:"",shell:""}}async _saveGroupCmd(e){const t=this._groupCmdForm?.name?.trim(),o=this._groupCmdForm?.shell?.trim();if(!t||!o)return;const s={...this._getLatestGroup(e).custom_commands||{},[t]:o};await Ae(e.id,{custom_commands:s}),await this._loadAll(),this._cancelGroupCmdForm()}async _removeGroupCommand(e,t){const o=this._getLatestGroup(e),s={...o.custom_commands||{}};delete s[t];try{await Ae(e.id,this._buildGroupPayload(o,{custom_commands:s}))}catch(e){console.error("Failed to remove group command:",e)}await this._loadAll()}_getLatestGroup(e){return this._groups[e.id]||e}_buildGroupPayload(e,t={}){return{name:e.name,device_ids:e.device_ids||[],custom_commands:e.custom_commands||{},custom_sensors:e.custom_sensors||{},thresholds:e.thresholds||{},hidden_commands:e.hidden_commands||[],...t}}async _hideGroupCommand(e,t){const o=this._getLatestGroup(e),s=[...o.hidden_commands||[]];s.includes(t)||s.push(t);try{await Ae(e.id,this._buildGroupPayload(o,{hidden_commands:s}))}catch(e){console.error("Failed to hide group command:",e)}await this._loadAll()}async _unhideGroupCommand(e,t){const o=this._getLatestGroup(e),s=(o.hidden_commands||[]).filter(e=>e!==t);try{await Ae(e.id,this._buildGroupPayload(o,{hidden_commands:s}))}catch(e){console.error("Failed to unhide group command:",e)}await this._loadAll()}_renderGroupThresholds(e){const t=e.thresholds||{},o=e.crit_thresholds||{},s=this._getGroupDiscoveredData(e).attributes,i=Object.keys(t).filter(e=>null!=t[e]&&!s.includes(e)),r=Object.keys(o).filter(e=>null!=o[e]&&!s.includes(e)&&!i.includes(e)),n=[...s,...i,...r];return 0===n.length?H`<div style="font-size: 13px; color: rgba(255,255,255,0.4); margin-bottom: 6px;">No attributes discovered from member devices yet.</div>`:H`
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 8px;">
        ${n.map(s=>{const i=t[s],r=null!=i,n=r&&"object"==typeof i&&i.op||">",a=r?"object"==typeof i?i.value:i:null,d=o[s],l=null!=d,c=l&&"object"==typeof d&&d.op||">",p=l?"object"==typeof d?d.value:d:null;return H`
            <div style="background: rgba(255,255,255,0.03); border-radius: 8px; padding: 10px 12px;
              ${l?"border: 1px solid rgba(239,83,80,0.2);":r?"border: 1px solid rgba(255,183,77,0.15);":"border: 1px solid transparent;"}">
              <div style="font-size: 12px; color: #fff; margin-bottom: 8px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.3px;">
                ${s.replace(/_/g," ")}
              </div>
              <div style="display: flex; align-items: center; gap: 4px; margin-bottom: 4px;">
                <span style="font-size: 11px; color: rgba(255,183,77,0.7); text-transform: uppercase; letter-spacing: 0.5px; width: 34px; font-weight: 600;">warn</span>
                <select style="background: #0d0d1f; border: none; border-radius: 3px; color: rgba(255,255,255,0.6); padding: 2px; font-size: 11px; width: 38px; appearance: none; -webkit-appearance: none;"
                  .value=${n}
                  @change=${t=>this._updateGroupThreshold(e.id,s,a,t.target.value)}>
                  <option value=">" style="background: #0d0d1f; color: #fff;">&gt;</option>
                  <option value="<" style="background: #0d0d1f; color: #fff;">&lt;</option>
                  <option value=">=" style="background: #0d0d1f; color: #fff;">&gt;=</option>
                  <option value="<=" style="background: #0d0d1f; color: #fff;">&lt;=</option>
                  <option value="==" style="background: #0d0d1f; color: #fff;">==</option>
                  <option value="!=" style="background: #0d0d1f; color: #fff;">!=</option>
                </select>
                <input type="number" placeholder="\u2014"
                  style="width: 55px; font-size: 11px; padding: 3px 4px; background: #0d0d1f; border: 1px solid rgba(255,255,255,0.08); border-radius: 3px; color: rgba(255,255,255,0.7); text-align: center;"
                  .value=${null!=a?String(a):""}
                  @change=${t=>this._updateGroupThreshold(e.id,s,t.target.value,n)}>
                ${r?H`
                  <span style="font-size: 12px; color: rgba(255,255,255,0.3); cursor: pointer;" title="Clear"
                    @click=${()=>this._removeGroupThreshold(e.id,s)}>&times;</span>
                `:""}
              </div>
              <div style="display: flex; align-items: center; gap: 4px;">
                <span style="font-size: 11px; color: rgba(239,83,80,0.7); text-transform: uppercase; letter-spacing: 0.5px; width: 34px; font-weight: 600;">crit</span>
                <select style="background: #0d0d1f; border: none; border-radius: 3px; color: rgba(255,255,255,0.6); padding: 2px; font-size: 11px; width: 38px; appearance: none; -webkit-appearance: none;"
                  .value=${c}
                  @change=${t=>this._updateGroupCritThreshold(e.id,s,p,t.target.value)}>
                  <option value=">" style="background: #0d0d1f; color: #fff;">&gt;</option>
                  <option value="<" style="background: #0d0d1f; color: #fff;">&lt;</option>
                  <option value=">=" style="background: #0d0d1f; color: #fff;">&gt;=</option>
                  <option value="<=" style="background: #0d0d1f; color: #fff;">&lt;=</option>
                  <option value="==" style="background: #0d0d1f; color: #fff;">==</option>
                  <option value="!=" style="background: #0d0d1f; color: #fff;">!=</option>
                </select>
                <input type="number" placeholder="\u2014"
                  style="width: 55px; font-size: 11px; padding: 3px 4px; background: #0d0d1f; border: 1px solid rgba(255,255,255,0.08); border-radius: 3px; color: rgba(255,255,255,0.7); text-align: center;"
                  .value=${null!=p?String(p):""}
                  @change=${t=>this._updateGroupCritThreshold(e.id,s,t.target.value,c)}>
                ${l?H`
                  <span style="font-size: 12px; color: rgba(255,255,255,0.3); cursor: pointer;" title="Clear"
                    @click=${()=>this._removeGroupCritThreshold(e.id,s)}>&times;</span>
                `:""}
              </div>
            </div>
          `})}
      </div>
    `}_updateGroupThreshold(e,t,o,s=">"){const i=this._groups[e];if(!i)return;const r={...i.thresholds||{}};""===o||null==o?delete r[t]:r[t]={op:s,value:Number(o)},this._groups={...this._groups,[e]:{...i,thresholds:r}}}_removeGroupThreshold(e,t){const o=this._groups[e];if(!o)return;const s={...o.thresholds||{}};delete s[t],this._groups={...this._groups,[e]:{...o,thresholds:s}}}_updateGroupCritThreshold(e,t,o,s=">"){const i=this._groups[e];if(!i)return;const r={...i.crit_thresholds||{}};""===o||null==o?delete r[t]:r[t]={op:s,value:Number(o)},this._groups={...this._groups,[e]:{...i,crit_thresholds:r}}}_removeGroupCritThreshold(e,t){const o=this._groups[e];if(!o)return;const s={...o.crit_thresholds||{}};delete s[t],this._groups={...this._groups,[e]:{...o,crit_thresholds:s}}}_renderGroupCustomSensors(e){const t=e.custom_sensors||{},o=this._editingGroupSensor&&this._editingGroupSensor.groupId===e.id,s=this._showAddGroupSensor&&this._showAddGroupSensor.groupId===e.id;return H`
      ${Object.keys(t).length>0?H`
        <table class="sensor-table">
          <thead>
            <tr><th>Name</th><th>Command</th><th>Interval</th><th>Unit</th><th></th></tr>
          </thead>
          <tbody>
            ${Object.entries(t).map(([t,o])=>H`
              <tr>
                <td style="font-family: monospace;">${t}</td>
                <td style="font-family: monospace; font-size: 11px;">${o.command||"—"}</td>
                <td>${o.interval?o.interval+"s":"—"}</td>
                <td>${o.unit||"—"}</td>
                <td>
                  <div class="sensor-actions">
                    <button class="sensor-btn edit"
                      @click=${()=>this._startEditGroupSensor(e.id,t,o)}>Edit</button>
                    <button class="sensor-btn remove"
                      @click=${()=>this._removeGroupSensor(e,t)}>Remove</button>
                  </div>
                </td>
              </tr>
            `)}
          </tbody>
        </table>
      `:H`
        <div style="font-size: 12px; color: #fff; margin-bottom: 8px;">No group sensors defined.</div>
      `}

      ${o||s?H`
        <div class="sensor-form">
          <div class="sensor-form-grid" style="grid-template-columns: 1fr 2fr 80px 80px;">
            <input type="text" placeholder="Name"
              .value=${this._groupSensorForm.name}
              ?disabled=${!!o}
              @input=${e=>this._groupSensorForm={...this._groupSensorForm,name:e.target.value}}>
            <input type="text" placeholder="Shell command"
              .value=${this._groupSensorForm.command}
              @input=${e=>this._groupSensorForm={...this._groupSensorForm,command:e.target.value}}>
            <input type="number" placeholder="Interval (s)"
              .value=${this._groupSensorForm.interval}
              @input=${e=>this._groupSensorForm={...this._groupSensorForm,interval:e.target.value}}>
            <input type="text" placeholder="Unit"
              .value=${this._groupSensorForm.unit}
              @input=${e=>this._groupSensorForm={...this._groupSensorForm,unit:e.target.value}}>
          </div>
          <div class="sensor-form-actions">
            <button class="form-btn save" @click=${()=>this._saveGroupSensor(e)}>${o?"Update":"Add"}</button>
            <button class="form-btn cancel" @click=${this._cancelGroupSensorForm}>Cancel</button>
          </div>
        </div>
      `:H`
        <button class="add-cmd-btn" @click=${()=>this._startAddGroupSensor(e.id)}>+ Add Sensor</button>
      `}
    `}_startAddGroupSensor(e){this._showAddGroupSensor={groupId:e},this._editingGroupSensor=null,this._groupSensorForm={name:"",command:"",interval:"",unit:""}}_startEditGroupSensor(e,t,o){this._editingGroupSensor={groupId:e,name:t},this._showAddGroupSensor=null,this._groupSensorForm={name:t,command:o.command||"",interval:null!=o.interval?String(o.interval):"",unit:o.unit||""}}_cancelGroupSensorForm(){this._editingGroupSensor=null,this._showAddGroupSensor=null,this._groupSensorForm={name:"",command:"",interval:"",unit:""}}async _saveGroupSensor(e){const t=this._groupSensorForm?.name?.trim(),o=this._groupSensorForm?.command?.trim();if(!t||!o)return;const s={command:o,unit:this._groupSensorForm?.unit||"",interval:parseInt(this._groupSensorForm?.interval)||void 0},i={...this._getLatestGroup(e).custom_sensors||{},[t]:s};await Ae(e.id,{custom_sensors:i}),await this._loadAll(),this._cancelGroupSensorForm()}async _removeGroupSensor(e,t){const o=this._getLatestGroup(e),s={...o.custom_sensors||{}};delete s[t];try{await Ae(e.id,this._buildGroupPayload(o,{custom_sensors:s}))}catch(e){console.error("Failed to remove group sensor:",e)}await this._loadAll()}_renderAddMemberDropdown(e){const t=e.device_ids||[],o=Object.entries(this._devices).filter(([e])=>!t.includes(e));return 0===o.length?H``:H`
      <select class="small-input" style="padding: 3px 8px;"
        @change=${t=>{t.target.value&&(this._addMember(e,t.target.value),t.target.value="")}}>
        <option value="">Add device...</option>
        ${o.map(([e,t])=>H`
          <option value=${e}>${t.device_name||e}</option>
        `)}
      </select>
    `}_toggleGroup(e){this._expandedGroup=this._expandedGroup===e?null:e}async _addMember(e,t){const o=[...e.device_ids||[],t];try{await Ae(e.id,{device_ids:o}),await this._loadAll()}catch(e){console.error("Failed to add member:",e)}}async _removeMember(e,t){const o=(e.device_ids||[]).filter(e=>e!==t);try{await Ae(e.id,{device_ids:o}),await this._loadAll()}catch(e){console.error("Failed to remove member:",e)}}async _updateGroup(e){const t=this._groups[e.id]||e,o=this._editingGroupName===e.id?this._editGroupName.trim():t.name,s={};for(const[e,o]of Object.entries(t.thresholds||{}))null!=o&&("object"==typeof o&&null!=o.value?s[e]=o:"number"!=typeof o||isNaN(o)||(s[e]=o));const i={};for(const[e,o]of Object.entries(t.crit_thresholds||{}))null!=o&&("object"==typeof o&&null!=o.value?i[e]=o:"number"!=typeof o||isNaN(o)||(i[e]=o));const r=o||t.name,n={name:r,device_ids:t.device_ids||[],custom_commands:t.custom_commands||{},custom_sensors:t.custom_sensors||{},thresholds:s,crit_thresholds:i,hidden_commands:t.hidden_commands||[]};console.log("Saving group:",e.id,n);try{await Ae(e.id,n),this._groups={...this._groups,[e.id]:{...t,name:r,thresholds:s,crit_thresholds:i}},this._editingGroupName===e.id&&(this._editingGroupName=null),this._groupSaveStatus={...this._groupSaveStatus,[e.id]:"saved"},setTimeout(()=>{this._groupSaveStatus={...this._groupSaveStatus,[e.id]:""}},2e3)}catch(t){console.error("Failed to update group:",t),this._groupSaveStatus={...this._groupSaveStatus,[e.id]:"error"},setTimeout(()=>{this._groupSaveStatus={...this._groupSaveStatus,[e.id]:""}},2e3)}}async _createGroup(){const e=this._newGroupName.trim();if(!e)return;const t=e.toLowerCase().replace(/[^a-z0-9]+/g,"_");try{await Ee(t,e,[]),this._newGroupName="",this._expandedGroup=t,await this._loadAll()}catch(e){console.error("Failed to create group:",e)}}async _deleteGroup(e){const t=(e.device_ids||[]).length;if(!(t>0)||confirm(`Delete group "${e.name}"? It has ${t} member(s).`))try{await Te(e.id),this._expandedGroup===e.id&&(this._expandedGroup=null),await this._loadAll()}catch(e){console.error("Failed to delete group:",e)}}async _deployToDevices(e){await this._updateGroup(e),await this._doDeploy(e)}async _doDeploy(e){const t=this._groups[e.id]||e;this._groupPushStatus={...this._groupPushStatus,[e.id]:"Deploying..."};try{const o=await Re(t.id,{});console.log("Deploy result:",o),this._groupPushStatus={...this._groupPushStatus,[e.id]:"Deployed!"},setTimeout(()=>{this._groupPushStatus={...this._groupPushStatus,[e.id]:""}},3e3),await this._loadAll()}catch(t){console.error("Failed to deploy group config:",t);const o=t&&t.message?`Error: ${t.message}`:"Error";this._groupPushStatus={...this._groupPushStatus,[e.id]:o},setTimeout(()=>{this._groupPushStatus={...this._groupPushStatus,[e.id]:""}},3e3)}}}customElements.define("group-policy-settings",ot);const st={attr:"",value:""};class it extends de{static properties={_settings:{type:Object,state:!0},_loading:{type:Boolean,state:!0},_savingSettings:{type:Boolean,state:!0},_settingsSaved:{type:Boolean,state:!0}};static styles=[ce,r`
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
  `];constructor(){super(),this._settings=null,this._loading=!0,this._savingSettings=!1,this._settingsSaved=!1}connectedCallback(){super.connectedCallback(),this._loadSettings()}async _loadSettings(){this._loading=!0;try{this._settings=await Le().catch(()=>({}))}finally{this._loading=!1}}render(){return this._loading?H`<div class="loading">Loading settings...</div>`:H`
      <h2>Settings</h2>
      <tag-registry-settings></tag-registry-settings>
      <group-policy-settings></group-policy-settings>
      ${this._renderGlobalDefaults()}
    `}_renderGlobalDefaults(){const e=(this._settings||{}).default_thresholds||{},t=st;return H`
      <div class="section">
        <div class="section-title">Global Defaults</div>

        <div style="font-size: 11px; color: #fff; margin-bottom: 10px;">Default Warning Thresholds</div>

        ${Object.keys(e).filter(t=>null!=e[t]).map(t=>H`
          <div style="display: flex; gap: 6px; align-items: center; margin-bottom: 6px;">
            <span style="font-size: 12px; color: rgba(255,255,255,0.8); min-width: 140px;">${t}</span>
            <input class="settings-input" type="number" style="width: 90px;"
              .value=${String(e[t])}
              @input=${e=>this._updateDefaultThreshold(t,e.target.value)}>
            <button class="icon-btn delete"
              @click=${()=>this._removeDefaultThreshold(t)}>Remove</button>
          </div>
        `)}

        <div style="display: flex; gap: 6px; align-items: center; margin-top: 8px; margin-bottom: 16px; flex-wrap: wrap;">
          <input class="small-input" type="text" placeholder="Attribute name..."
            style="width: 150px;"
            .value=${t.attr}
            @input=${e=>{st.attr=e.target.value,this.requestUpdate()}}>
          <input class="small-input" type="number" placeholder="Value..."
            style="width: 90px;"
            .value=${t.value}
            @input=${e=>{st.value=e.target.value,this.requestUpdate()}}>
          <button class="small-btn" @click=${this._addDefaultThreshold.bind(this)}>Add threshold</button>
        </div>

        <div style="display: flex; align-items: center;">
          <button class="save-btn" ?disabled=${this._savingSettings}
            @click=${this._saveSettings}>
            ${this._savingSettings?"Saving...":"Save Defaults"}
          </button>
          ${this._settingsSaved?H`<span class="saved-msg">Saved!</span>`:""}
        </div>
      </div>
    `}_updateDefaultThreshold(e,t){const o=this._settings||{};this._settings={...o,default_thresholds:{...o.default_thresholds||{},[e]:""===t?null:Number(t)}}}_removeDefaultThreshold(e){const t=this._settings||{},o={...t.default_thresholds||{}};delete o[e],this._settings={...t,default_thresholds:o}}_addDefaultThreshold(){const e=(st.attr||"").trim(),t=(st.value||"").trim();e&&""!==t&&(this._updateDefaultThreshold(e,t),st.attr="",st.value="",this.requestUpdate())}async _saveSettings(){this._savingSettings=!0,this._settingsSaved=!1;try{await Me(this._settings),this._settingsSaved=!0,setTimeout(()=>{this._settingsSaved=!1},2e3)}catch(e){console.error("Failed to save settings:",e)}finally{this._savingSettings=!1}}}customElements.define("settings-view",it);class rt extends de{static properties={currentView:{type:String},selectedDevice:{type:String}};static styles=[ce,r`
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
  `];constructor(){super(),this.currentView="dashboard",this.selectedDevice=null}connectedCallback(){super.connectedCallback(),pe.connect()}disconnectedCallback(){super.disconnectedCallback(),pe.disconnect()}render(){return H`
      <nav-bar
        .currentView=${this.currentView}
        @view-change=${this._onViewChange}
      ></nav-bar>
      ${this._renderView()}
      ${this.selectedDevice?this._renderOverlay():""}
    `}_renderView(){switch(this.currentView){case"topology":return H`<topology-view @device-select=${this._onDeviceSelect}></topology-view>`;case"settings":return H`<settings-view></settings-view>`;default:return H`<dashboard-view @device-select=${this._onDeviceSelect}></dashboard-view>`}}_renderOverlay(){return H`
      <div class="overlay" @click=${this._onOverlayClick}>
        <div class="overlay-content" @click=${e=>e.stopPropagation()}>
          <device-detail
            .deviceId=${this.selectedDevice}
            @back=${()=>this.selectedDevice=null}
          ></device-detail>
        </div>
      </div>
    `}_onOverlayClick(){this.selectedDevice=null}_onViewChange(e){this.currentView=e.detail.view,this.selectedDevice=null}_onDeviceSelect(e){this.selectedDevice=e.detail.deviceId}}customElements.define("network-monitor-app",rt);
//# sourceMappingURL=bundle.js.map
