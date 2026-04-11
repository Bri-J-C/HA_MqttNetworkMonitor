/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,t=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),i=new WeakMap;let o=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const s=this.t;if(t&&void 0===e){const t=void 0!==s&&1===s.length;t&&(e=i.get(s)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&i.set(s,e))}return e}toString(){return this.cssText}};const n=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,s,i)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+e[i+1],e[0]);return new o(i,e,s)},r=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const s of e.cssRules)t+=s.cssText;return(e=>new o("string"==typeof e?e:e+"",void 0,s))(t)})(e):e,{is:a,defineProperty:l,getOwnPropertyDescriptor:d,getOwnPropertyNames:c,getOwnPropertySymbols:p,getPrototypeOf:h}=Object,u=globalThis,g=u.trustedTypes,f=g?g.emptyScript:"",m=u.reactiveElementPolyfillSupport,b=(e,t)=>e,v={toAttribute(e,t){switch(t){case Boolean:e=e?f:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let s=e;switch(t){case Boolean:s=null!==e;break;case Number:s=null===e?null:Number(e);break;case Object:case Array:try{s=JSON.parse(e)}catch(e){s=null}}return s}},_=(e,t)=>!a(e,t),x={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:_};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let y=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=x){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(e,s,t);void 0!==i&&l(this.prototype,e,i)}}static getPropertyDescriptor(e,t,s){const{get:i,set:o}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:i,set(t){const n=i?.call(this);o?.call(this,t),this.requestUpdate(e,n,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??x}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const e=h(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const e=this.properties,t=[...c(e),...p(e)];for(const s of t)this.createProperty(s,e[s])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,s]of t)this.elementProperties.set(e,s)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const s=this._$Eu(e,t);void 0!==s&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const e of s)t.unshift(r(e))}else void 0!==e&&t.push(r(e));return t}static _$Eu(e,t){const s=t.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const s=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((s,i)=>{if(t)s.adoptedStyleSheets=i.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const t of i){const i=document.createElement("style"),o=e.litNonce;void 0!==o&&i.setAttribute("nonce",o),i.textContent=t.cssText,s.appendChild(i)}})(s,this.constructor.elementStyles),s}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ET(e,t){const s=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,s);if(void 0!==i&&!0===s.reflect){const o=(void 0!==s.converter?.toAttribute?s.converter:v).toAttribute(t,s.type);this._$Em=e,null==o?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(e,t){const s=this.constructor,i=s._$Eh.get(e);if(void 0!==i&&this._$Em!==i){const e=s.getPropertyOptions(i),o="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:v;this._$Em=i;const n=o.fromAttribute(t,e.type);this[i]=n??this._$Ej?.get(i)??n,this._$Em=null}}requestUpdate(e,t,s,i=!1,o){if(void 0!==e){const n=this.constructor;if(!1===i&&(o=this[e]),s??=n.getPropertyOptions(e),!((s.hasChanged??_)(o,t)||s.useDefault&&s.reflect&&o===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,s))))return;this.C(e,t,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:s,reflect:i,wrapped:o},n){s&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),!0!==o||void 0!==n)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),!0===i&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,s]of e){const{wrapped:e}=s,i=this[t];!0!==e||this._$AL.has(t)||void 0===i||this.C(t,void 0,s,i)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[b("elementProperties")]=new Map,y[b("finalized")]=new Map,m?.({ReactiveElement:y}),(u.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const w=globalThis,$=e=>e,k=w.trustedTypes,S=k?k.createPolicy("lit-html",{createHTML:e=>e}):void 0,C="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,T="?"+E,D=`<${T}>`,A=document,z=()=>A.createComment(""),F=e=>null===e||"object"!=typeof e&&"function"!=typeof e,M=Array.isArray,P="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,O=/-->/g,L=/>/g,I=RegExp(`>|${P}(?:([^\\s"'>=/]+)(${P}*=${P}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),G=/'/g,R=/"/g,U=/^(?:script|style|textarea|title)$/i,j=e=>(t,...s)=>({_$litType$:e,strings:t,values:s}),B=j(1),H=j(2),V=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),W=new WeakMap,Y=A.createTreeWalker(A,129);function J(e,t){if(!M(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(t):t}const X=(e,t)=>{const s=e.length-1,i=[];let o,n=2===t?"<svg>":3===t?"<math>":"",r=N;for(let t=0;t<s;t++){const s=e[t];let a,l,d=-1,c=0;for(;c<s.length&&(r.lastIndex=c,l=r.exec(s),null!==l);)c=r.lastIndex,r===N?"!--"===l[1]?r=O:void 0!==l[1]?r=L:void 0!==l[2]?(U.test(l[2])&&(o=RegExp("</"+l[2],"g")),r=I):void 0!==l[3]&&(r=I):r===I?">"===l[0]?(r=o??N,d=-1):void 0===l[1]?d=-2:(d=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?I:'"'===l[3]?R:G):r===R||r===G?r=I:r===O||r===L?r=N:(r=I,o=void 0);const p=r===I&&e[t+1].startsWith("/>")?" ":"";n+=r===N?s+D:d>=0?(i.push(a),s.slice(0,d)+C+s.slice(d)+E+p):s+E+(-2===d?t:p)}return[J(e,n+(e[s]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),i]};class K{constructor({strings:e,_$litType$:t},s){let i;this.parts=[];let o=0,n=0;const r=e.length-1,a=this.parts,[l,d]=X(e,t);if(this.el=K.createElement(l,s),Y.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(i=Y.nextNode())&&a.length<r;){if(1===i.nodeType){if(i.hasAttributes())for(const e of i.getAttributeNames())if(e.endsWith(C)){const t=d[n++],s=i.getAttribute(e).split(E),r=/([.?@])?(.*)/.exec(t);a.push({type:1,index:o,name:r[2],strings:s,ctor:"."===r[1]?se:"?"===r[1]?ie:"@"===r[1]?oe:te}),i.removeAttribute(e)}else e.startsWith(E)&&(a.push({type:6,index:o}),i.removeAttribute(e));if(U.test(i.tagName)){const e=i.textContent.split(E),t=e.length-1;if(t>0){i.textContent=k?k.emptyScript:"";for(let s=0;s<t;s++)i.append(e[s],z()),Y.nextNode(),a.push({type:2,index:++o});i.append(e[t],z())}}}else if(8===i.nodeType)if(i.data===T)a.push({type:2,index:o});else{let e=-1;for(;-1!==(e=i.data.indexOf(E,e+1));)a.push({type:7,index:o}),e+=E.length-1}o++}}static createElement(e,t){const s=A.createElement("template");return s.innerHTML=e,s}}function Z(e,t,s=e,i){if(t===V)return t;let o=void 0!==i?s._$Co?.[i]:s._$Cl;const n=F(t)?void 0:t._$litDirective$;return o?.constructor!==n&&(o?._$AO?.(!1),void 0===n?o=void 0:(o=new n(e),o._$AT(e,s,i)),void 0!==i?(s._$Co??=[])[i]=o:s._$Cl=o),void 0!==o&&(t=Z(e,o._$AS(e,t.values),o,i)),t}class Q{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:s}=this._$AD,i=(e?.creationScope??A).importNode(t,!0);Y.currentNode=i;let o=Y.nextNode(),n=0,r=0,a=s[0];for(;void 0!==a;){if(n===a.index){let t;2===a.type?t=new ee(o,o.nextSibling,this,e):1===a.type?t=new a.ctor(o,a.name,a.strings,this,e):6===a.type&&(t=new ne(o,this,e)),this._$AV.push(t),a=s[++r]}n!==a?.index&&(o=Y.nextNode(),n++)}return Y.currentNode=A,i}p(e){let t=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}}class ee{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,s,i){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Z(this,e,t),F(e)?e===q||null==e||""===e?(this._$AH!==q&&this._$AR(),this._$AH=q):e!==this._$AH&&e!==V&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>M(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==q&&F(this._$AH)?this._$AA.nextSibling.data=e:this.T(A.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:s}=e,i="number"==typeof s?this._$AC(e):(void 0===s.el&&(s.el=K.createElement(J(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(t);else{const e=new Q(i,this),s=e.u(this.options);e.p(t),this.T(s),this._$AH=e}}_$AC(e){let t=W.get(e.strings);return void 0===t&&W.set(e.strings,t=new K(e)),t}k(e){M(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let s,i=0;for(const o of e)i===t.length?t.push(s=new ee(this.O(z()),this.O(z()),this,this.options)):s=t[i],s._$AI(o),i++;i<t.length&&(this._$AR(s&&s._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=$(e).nextSibling;$(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class te{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,i,o){this.type=1,this._$AH=q,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=q}_$AI(e,t=this,s,i){const o=this.strings;let n=!1;if(void 0===o)e=Z(this,e,t,0),n=!F(e)||e!==this._$AH&&e!==V,n&&(this._$AH=e);else{const i=e;let r,a;for(e=o[0],r=0;r<o.length-1;r++)a=Z(this,i[s+r],t,r),a===V&&(a=this._$AH[r]),n||=!F(a)||a!==this._$AH[r],a===q?e=q:e!==q&&(e+=(a??"")+o[r+1]),this._$AH[r]=a}n&&!i&&this.j(e)}j(e){e===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class se extends te{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===q?void 0:e}}class ie extends te{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==q)}}class oe extends te{constructor(e,t,s,i,o){super(e,t,s,i,o),this.type=5}_$AI(e,t=this){if((e=Z(this,e,t,0)??q)===V)return;const s=this._$AH,i=e===q&&s!==q||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,o=e!==q&&(s===q||i);i&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class ne{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){Z(this,e)}}const re=w.litHtmlPolyfillSupport;re?.(K,ee),(w.litHtmlVersions??=[]).push("3.3.2");const ae=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class le extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,s)=>{const i=s?.renderBefore??t;let o=i._$litPart$;if(void 0===o){const e=s?.renderBefore??null;i._$litPart$=o=new ee(t.insertBefore(z(),e),e,void 0,s??{})}return o._$AI(e),o})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return V}}le._$litElement$=!0,le.finalized=!0,ae.litElementHydrateSupport?.({LitElement:le});const de=ae.litElementPolyfillSupport;de?.({LitElement:le}),(ae.litElementVersions??=[]).push("4.2.2");const ce=n`
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
    --font-display: 'Outfit', sans-serif;
    --font-data: 'JetBrains Mono', monospace;
  }
`;const pe=new class{constructor(){this._ws=null,this._listeners=[],this._reconnectDelay=1e3,this._reconnectAttempts=0,this._maxReconnectAttempts=50,this._shouldReconnect=!0}connect(){this._shouldReconnect=!0;const e="https:"===location.protocol?"wss:":"ws:",t=location.pathname.match(/^(\/api\/hassio_ingress\/[^/]+)/),s=t?t[1]:"",i=`${e}//${location.host}${s}/api/ws`;this._ws=new WebSocket(i),this._ws.onmessage=e=>{try{const t=JSON.parse(e.data);this._listeners.forEach(e=>e(t))}catch(e){console.error("WebSocket parse error:",e)}},this._ws.onclose=()=>{this._shouldReconnect&&(this._reconnectAttempts>=this._maxReconnectAttempts?console.error("WebSocket: max reconnect attempts reached"):(this._reconnectAttempts++,setTimeout(()=>this.connect(),this._reconnectDelay),this._reconnectDelay=Math.min(2*this._reconnectDelay,3e4)))},this._ws.onopen=()=>{this._reconnectDelay=1e3,this._reconnectAttempts=0}}onMessage(e){return this._listeners.push(e),()=>{this._listeners=this._listeners.filter(t=>t!==e)}}disconnect(){this._shouldReconnect=!1,this._ws&&this._ws.close()}};function he(e,t){const s=function(e){const t=/\s*(>=|<=|==|!=|[+\-*/%().,?:><]|Math|value|toFixed|\d+\.?\d*|'[^']*'|"[^"]*"|[a-zA-Z_]\w*)\s*/g,s=[];let i;for(;null!==(i=t.exec(e));)s.push(i[1]);return s}(e);let i=0;function o(){return s[i]}function n(e){const t=s[i++];if(e&&t!==e)throw new Error(`Expected ${e}, got ${t}`);return t}function r(){let e=function(){let e=a();const t=o();if([">","<",">=","<=","==","!="].includes(t)){n();const s=a();switch(t){case">":return e>s;case"<":return e<s;case">=":return e>=s;case"<=":return e<=s;case"==":return e==s;case"!=":return e!=s}}return e}();if("?"===o()){n("?");const t=r();n(":");const s=r();return e?t:s}return e}function a(){let e=l();for(;"+"===o()||"-"===o();){const t=n(),s=l();e="+"===t?e+s:e-s}return e}function l(){let e=d();for(;"*"===o()||"/"===o()||"%"===o();){const t=n(),s=d();"*"===t?e*=s:"/"===t?e=0!==s?e/s:0:e%=s}return e}function d(){return"-"===o()?(n(),-c()):"+"===o()?(n(),+c()):c()}function c(){let e=function(){const e=o();if("("===e){n("(");const e=r();return n(")"),e}if("value"===e)return n(),t;if("Math"===e){n(),n(".");const e=n(),t={round:Math.round,floor:Math.floor,ceil:Math.ceil,abs:Math.abs,min:Math.min,max:Math.max,pow:Math.pow};if(!t[e])throw new Error(`Unknown Math function: ${e}`);n("(");const s=[r()];for(;","===o();)n(),s.push(r());return n(")"),t[e](...s)}if("string"==typeof e&&(e.startsWith("'")||e.startsWith('"')))return n(),e.slice(1,-1);const s=Number(e);if(!isNaN(s)&&void 0!==e)return n(),s;throw new Error(`Unexpected token: ${e}`)}();for(;"."===o();){n(".");const t=n();if("toFixed"!==t)throw new Error(`Unknown method: ${t}`);{n("(");const t=r();n(")"),e=Number(e).toFixed(t)}}return e}const p=r();if(i<s.length)throw new Error(`Unexpected token: ${s[i]}`);return p}function ue(e,t){if(null==e||!t)return e;if("duration"===t){const t=Number(e);if(isNaN(t))return e;const s=[],i=Math.floor(t/86400),o=Math.floor(t%86400/3600),n=Math.floor(t%3600/60),r=Math.floor(t%60);return i&&s.push(`${i}d`),o&&s.push(`${o}h`),n&&s.push(`${n}m`),s.length||s.push(`${r}s`),s.join(" ")}if("bytes"===t){const t=Number(e);return isNaN(t)?e:t>=1e12?(t/1e12).toFixed(1)+" TB":t>=1e9?(t/1e9).toFixed(1)+" GB":t>=1e6?(t/1e6).toFixed(1)+" MB":t>=1e3?(t/1e3).toFixed(1)+" KB":t+" B"}if("percentage"===t){const t=Number(e);return isNaN(t)?e:(100*t).toFixed(1)+"%"}if(t.startsWith("round:")){const s=parseInt(t.split(":")[1])||0,i=Number(e);return isNaN(i)?e:i.toFixed(s)}if(t.startsWith("prefix:"))return t.slice(7)+e;if(t.startsWith("suffix:"))return e+t.slice(7);if(t.startsWith("custom:")){const s=ge.find(e=>e.id===t);if(s)try{return he(s.expression,e)}catch{return e}}return e}let ge=[];function fe(e){ge=Array.isArray(e)?e:[]}const me=[{value:"",label:"None"},{value:"duration",label:"Duration (seconds → 2d 5h)"},{value:"bytes",label:"Bytes (→ KB/MB/GB)"},{value:"percentage",label:"Percentage (0-1 → %)"},{value:"round:0",label:"Round (0 decimals)"},{value:"round:1",label:"Round (1 decimal)"},{value:"round:2",label:"Round (2 decimals)"}];class be extends le{static properties={_toasts:{type:Array,state:!0}};static styles=n`
    :host {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 10000;
      display: flex;
      flex-direction: column-reverse;
      gap: 8px;
      pointer-events: none;
    }

    .toast {
      pointer-events: auto;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 18px;
      min-width: 280px;
      max-width: 420px;
      background: #1a1a2e;
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 8px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.6);
      color: #fff;
      font-family: inherit;
      font-size: 13px;
      line-height: 1.4;
      animation: slide-in 0.25s ease forwards;
    }

    .toast.dismiss {
      animation: slide-out 0.2s ease forwards;
    }

    .toast.error {
      border-left: 3px solid #ef5350;
    }

    .toast.success {
      border-left: 3px solid #04d65c;
    }

    .toast.info {
      border-left: 3px solid #00D4FF;
    }

    .icon {
      flex-shrink: 0;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      font-weight: bold;
    }

    .error .icon {
      background: rgba(239,83,80,0.15);
      color: #ef5350;
    }

    .success .icon {
      background: rgba(4,214,92,0.15);
      color: #04d65c;
    }

    .info .icon {
      background: rgba(0,212,255,0.1);
      color: #00D4FF;
    }

    .message {
      flex: 1;
      word-break: break-word;
    }

    .close {
      flex-shrink: 0;
      background: none;
      border: none;
      color: rgba(255,255,255,0.4);
      cursor: pointer;
      padding: 2px;
      font-size: 16px;
      line-height: 1;
    }

    .close:hover {
      color: rgba(255,255,255,0.8);
    }

    @keyframes slide-in {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    @keyframes slide-out {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }
  `;constructor(){super(),this._toasts=[]}show(e,t="info"){const s=Date.now()+Math.random();this._toasts=[...this._toasts,{id:s,message:e,type:t}],setTimeout(()=>this._dismiss(s),4e3)}_dismiss(e){const t=this.shadowRoot?.querySelector(`[data-id="${e}"]`);t?(t.classList.add("dismiss"),t.addEventListener("animationend",()=>{this._toasts=this._toasts.filter(t=>t.id!==e)},{once:!0})):this._toasts=this._toasts.filter(t=>t.id!==e)}_iconFor(e){switch(e){case"error":return"✕";case"success":return"✓";default:return"i"}}render(){return B`
      ${this._toasts.map(e=>B`
        <div class="toast ${e.type}" data-id="${e.id}">
          <span class="icon">${this._iconFor(e.type)}</span>
          <span class="message">${e.message}</span>
          <button class="close" @click=${()=>this._dismiss(e.id)}>\u2715</button>
        </div>
      `)}
    `}}customElements.define("toast-notification",be);const ve={_el:null,_getEl(){return this._el||(this._el=document.querySelector("toast-notification"),this._el||(this._el=document.createElement("toast-notification"),document.body.appendChild(this._el))),this._el},success(e){this._getEl().show(e,"success")},error(e){this._getEl().show(e,"error")},info(e){this._getEl().show(e,"info")}};const _e=function(){const e=location.pathname.match(/^(\/api\/hassio_ingress\/[^/]+)/);return e?e[1]:""}();async function xe(e,t={}){const s=await fetch(e,t);if(!s.ok){const e=await s.text().catch(()=>s.statusText);throw new Error(`API error ${s.status}: ${e}`)}const i=s.headers.get("content-type");return i&&i.includes("application/json")?s.json():null}function ye(e,t){return async(...s)=>{try{return await t(...s)}catch(t){throw ve.error(`${e}: ${t.message}`),t}}}async function we(e=0){return xe(e>0?`${_e}/api/devices?since=${e}`:`${_e}/api/devices`)}async function $e(e){return xe(`${_e}/api/devices/${encodeURIComponent(e)}`)}const ke=ye("Delete device failed",async e=>xe(`${_e}/api/devices/${encodeURIComponent(e)}`,{method:"DELETE"})),Se=ye("Delete attribute failed",async(e,t)=>xe(`${_e}/api/devices/${encodeURIComponent(e)}/attributes/${encodeURIComponent(t)}`,{method:"DELETE"})),Ce=ye("Unhide attribute failed",async(e,t)=>xe(`${_e}/api/devices/${encodeURIComponent(e)}/attributes/${encodeURIComponent(t)}/unhide`,{method:"POST"})),Ee=ye("Hide command failed",async(e,t)=>xe(`${_e}/api/devices/${encodeURIComponent(e)}/commands/${encodeURIComponent(t)}`,{method:"DELETE"})),Te=ye("Unhide command failed",async(e,t)=>xe(`${_e}/api/devices/${encodeURIComponent(e)}/commands/${encodeURIComponent(t)}/unhide`,{method:"POST"}));async function De(){return xe(`${_e}/api/topology`)}async function Ae(){return xe(`${_e}/api/topology/layouts`)}const ze=ye("Save layout failed",async e=>xe(`${_e}/api/topology/layouts`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})),Fe=ye("Delete layout failed",async e=>xe(`${_e}/api/topology/layouts/${encodeURIComponent(e)}`,{method:"DELETE"})),Me=ye("Send command failed",async(e,t,s={})=>xe(`${_e}/api/devices/${encodeURIComponent(e)}/command`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({command:t,params:s})}));async function Pe(){return xe(`${_e}/api/groups`)}const Ne=ye("Create group failed",async(e,t,s=[])=>xe(`${_e}/api/groups`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:e,name:t,device_ids:s})})),Oe=ye("Update group failed",async(e,t)=>xe(`${_e}/api/groups/${encodeURIComponent(e)}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})),Le=ye("Delete group failed",async e=>xe(`${_e}/api/groups/${encodeURIComponent(e)}`,{method:"DELETE"})),Ie=ye("Set device tags failed",async(e,t)=>xe(`${_e}/api/devices/${encodeURIComponent(e)}/tags`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({tags:t})})),Ge=ye("Add device tags failed",async(e,t)=>xe(`${_e}/api/devices/${encodeURIComponent(e)}/tags/add`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({tags:t})})),Re=ye("Remove tag failed",async(e,t)=>xe(`${_e}/api/devices/${encodeURIComponent(e)}/tags/${encodeURIComponent(t)}`,{method:"DELETE"}));async function Ue(){return xe(`${_e}/api/tags`)}const je=ye("Create tag failed",async e=>xe(`${_e}/api/tags`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({tag:e})})),Be=ye("Rename tag failed",async(e,t)=>xe(`${_e}/api/tags/${encodeURIComponent(e)}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({new_name:t})})),He=ye("Delete tag failed",async e=>xe(`${_e}/api/tags/${encodeURIComponent(e)}`,{method:"DELETE"}));async function Ve(){return xe(`${_e}/api/settings`)}const qe=ye("Save settings failed",async e=>xe(`${_e}/api/settings`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}));async function We(){return xe(`${_e}/api/settings/export`)}const Ye=ye("Import settings failed",async e=>xe(`${_e}/api/settings/import`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}));async function Je(e){return xe(`${_e}/api/devices/${encodeURIComponent(e)}/effective-settings`)}const Xe=ye("Save device settings failed",async(e,t)=>xe(`${_e}/api/devices/${encodeURIComponent(e)}/settings`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})),Ke=ye("Push config failed",async(e,t)=>xe(`${_e}/api/devices/${encodeURIComponent(e)}/push-config`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})),Ze=ye("Send group command failed",async(e,t,s={})=>xe(`${_e}/api/groups/${encodeURIComponent(e)}/command`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({command:t,params:s})})),Qe=ye("Push group config failed",async(e,t)=>xe(`${_e}/api/groups/${encodeURIComponent(e)}/push-config`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})),et=ye("Force apply group failed",async e=>xe(`${_e}/api/groups/${encodeURIComponent(e)}/force-apply`,{method:"POST"}));const tt=ye("Add server command failed",async(e,t,s)=>xe(`${_e}/api/devices/${encodeURIComponent(e)}/server-commands`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:t,shell:s})})),st=ye("Remove server command failed",async(e,t)=>xe(`${_e}/api/devices/${encodeURIComponent(e)}/server-commands/${encodeURIComponent(t)}`,{method:"DELETE"})),it=ye("Add server sensor failed",async(e,t,s)=>xe(`${_e}/api/devices/${encodeURIComponent(e)}/server-sensors`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:t,...s})})),ot=ye("Remove server sensor failed",async(e,t)=>xe(`${_e}/api/devices/${encodeURIComponent(e)}/server-sensors/${encodeURIComponent(t)}`,{method:"DELETE"})),nt=ye("Set device interval failed",async(e,t)=>xe(`${_e}/api/devices/${encodeURIComponent(e)}/config-interval`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({interval:t})}));var rt=Object.freeze({__proto__:null,addDeviceTags:Ge,addServerCommand:tt,addServerSensor:it,checkGroupConflicts:async function(e,t=null){return xe(`${_e}/api/groups/${encodeURIComponent(e)}/check-conflicts`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t?{new_device_id:t}:{})})},createGroup:Ne,createTag:je,deleteAttribute:Se,deleteDevice:ke,deleteGroup:Le,deleteLayout:Fe,deleteTag:He,exportSettings:We,fetchAttributeHistory:async function(e,t,s=24){return xe(`${_e}/api/devices/${encodeURIComponent(e)}/history/${encodeURIComponent(t)}?hours=${s}`)},fetchDevice:$e,fetchDevices:we,fetchEffectiveSettings:Je,fetchGroups:Pe,fetchLayouts:Ae,fetchSettings:Ve,fetchTags:Ue,fetchTopology:De,forceApplyGroup:et,hideCommand:Ee,importSettings:Ye,pushDeviceConfig:Ke,pushGroupConfig:Qe,removeDeviceTag:Re,removeServerCommand:st,removeServerSensor:ot,renameTag:Be,saveLayout:ze,sendCommand:Me,sendGroupCommand:Ze,setDeviceInterval:nt,setDeviceTags:Ie,unhideAttribute:Ce,unhideCommand:Te,updateDeviceSettings:Xe,updateGroup:Oe,updateSettings:qe});class at extends le{static properties={currentView:{type:String}};static styles=[ce,n`
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
        <span class="version">v0.2.1 build ${"4/10 21:10"}</span>
      </nav>

      <!-- Mobile simple header -->
      <div class="mobile-header" aria-hidden="true">
        <span class="logo">Network Monitor</span>
        <span class="version">build ${"4/10 21:10"}</span>
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
    `}_navigate(e){this.dispatchEvent(new CustomEvent("view-change",{detail:{view:e}}))}}customElements.define("nav-bar",at);const lt={linux:e=>B`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>`,windows:e=>B`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="currentColor"><path d="M3 12V6.75l6-1.32v6.48L3 12zm17-9v8.75l-10 .08V5.98L20 3zm-10 9.04l10 .12V21l-10-1.91v-5.05zM3 13l6 .09v6.72l-6-1.01V13z"/></svg>`,laptop:e=>B`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="currentColor"><path d="M20 18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z"/></svg>`,esp32:e=>B`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="currentColor"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>`,server:e=>B`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="currentColor"><path d="M2 20h20v-4H2v4zm2-3h2v2H4v-2zM2 4v4h20V4H2zm4 3H4V5h2v2zm-4 7h20v-4H2v4zm2-3h2v2H4v-2z"/></svg>`,generic:e=>B`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="currentColor"><path d="M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7v2H8v2h8v-2h-2v-2h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H3V4h18v12z"/></svg>`},dt={linux:"#ffb74d",windows:"#4fc3f7",laptop:"#4fc3f7",esp32:"#04d65c",server:"#b388ff",generic:"rgba(255,255,255,0.4)"},ct={linux:"LNX",windows:"WIN",laptop:"WIN",esp32:"ESP",server:"SRV",generic:""},pt={linux:"badge-linux",windows:"badge-windows",laptop:"badge-windows",esp32:"badge-esp32",server:"badge-server",generic:"badge-generic"};function ht(e){const t=(e||"").toLowerCase();return t.includes("linux")||"raspberry_pi"===t?"linux":t.includes("windows")?"windows":t.includes("laptop")?"laptop":t.includes("esp")||t.includes("intercom")?"esp32":t.includes("server")||t.includes("nas")?"server":"generic"}function ut(e){return dt[ht(e)]}class gt extends le{static properties={selectedTags:{type:Array},_allTags:{type:Array,state:!0},_open:{type:Boolean,state:!0},_showCreate:{type:Boolean,state:!0},_newTagName:{type:String,state:!0},_creating:{type:Boolean,state:!0}};static styles=[ce,n`
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
  `];constructor(){super(),this.selectedTags=[],this._allTags=[],this._open=!1,this._showCreate=!1,this._newTagName="",this._creating=!1,this._onDocClick=this._onDocClick.bind(this)}connectedCallback(){super.connectedCallback(),this._loadTags(),document.addEventListener("click",this._onDocClick)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._onDocClick)}async _loadTags(){try{const e=await Ue();Array.isArray(e)&&(this._allTags=e.map(e=>"string"==typeof e?e:e.tag).sort())}catch(e){console.error("Failed to load tags:",e)}}_onDocClick(e){if(!this._open)return;e.composedPath().includes(this)||(this._open=!1,this._showCreate=!1)}_toggle(e){e.stopPropagation(),this._open=!this._open,this._open||(this._showCreate=!1)}_toggleTag(e){(this.selectedTags||[]).includes(e)?this.dispatchEvent(new CustomEvent("tag-remove",{detail:{tag:e},bubbles:!0,composed:!0})):this.dispatchEvent(new CustomEvent("tag-add",{detail:{tag:e},bubbles:!0,composed:!0}))}async _createTag(){const e=this._newTagName.trim();if(e&&!this._creating){this._creating=!0;try{await je(e),await this._loadTags(),this.dispatchEvent(new CustomEvent("tag-add",{detail:{tag:e},bubbles:!0,composed:!0})),this._newTagName="",this._showCreate=!1}catch(e){console.error("Failed to create tag:",e)}finally{this._creating=!1}}}render(){const e=this.selectedTags||[],t=e.length>0;return B`
      <button class="trigger ${t?"has-selected":""}" @click=${this._toggle}>
        Tags${t?` (${e.length})`:""}
        <span class="arrow">${this._open?"▲":"▼"}</span>
      </button>

      ${this._open?B`
        <div class="dropdown" @click=${e=>e.stopPropagation()}>
          ${0!==this._allTags.length||this._showCreate?this._allTags.map(t=>B`
              <div class="dropdown-item ${e.includes(t)?"checked":""}"
                @click=${()=>this._toggleTag(t)}>
                <span class="checkbox">${e.includes(t)?"✓":""}</span>
                ${t}
              </div>
            `):B`<div class="empty">No tags in registry</div>`}

          <hr class="dropdown-divider">

          ${this._showCreate?B`
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
          `:B`
            <div class="create-row">
              <span class="create-link" @click=${()=>this._showCreate=!0}>+ Create new tag</span>
            </div>
          `}
        </div>
      `:""}
    `}}customElements.define("tag-picker",gt);const ft="u-off",mt="u-label",bt="width",vt="height",_t="top",xt="bottom",yt="left",wt="right",$t="#000",kt=$t+"0",St="mousemove",Ct="mousedown",Et="mouseup",Tt="mouseenter",Dt="mouseleave",At="dblclick",zt="change",Ft="dppxchange",Mt="--",Pt="undefined"!=typeof window,Nt=Pt?document:null,Ot=Pt?window:null,Lt=Pt?navigator:null;let It,Gt;function Rt(e,t){if(null!=t){let s=e.classList;!s.contains(t)&&s.add(t)}}function Ut(e,t){let s=e.classList;s.contains(t)&&s.remove(t)}function jt(e,t,s){e.style[t]=s+"px"}function Bt(e,t,s,i){let o=Nt.createElement(e);return null!=t&&Rt(o,t),null!=s&&s.insertBefore(o,i),o}function Ht(e,t){return Bt("div",e,t)}const Vt=new WeakMap;function qt(e,t,s,i,o){let n="translate("+t+"px,"+s+"px)";n!=Vt.get(e)&&(e.style.transform=n,Vt.set(e,n),t<0||s<0||t>i||s>o?Rt(e,ft):Ut(e,ft))}const Wt=new WeakMap;function Yt(e,t,s){let i=t+s;i!=Wt.get(e)&&(Wt.set(e,i),e.style.background=t,e.style.borderColor=s)}const Jt=new WeakMap;function Xt(e,t,s,i){let o=t+""+s;o!=Jt.get(e)&&(Jt.set(e,o),e.style.height=s+"px",e.style.width=t+"px",e.style.marginLeft=i?-t/2+"px":0,e.style.marginTop=i?-s/2+"px":0)}const Kt={passive:!0},Zt={...Kt,capture:!0};function Qt(e,t,s,i){t.addEventListener(e,s,i?Zt:Kt)}function es(e,t,s,i){t.removeEventListener(e,s,Kt)}function ts(e,t,s,i){let o;s=s||0;let n=(i=i||t.length-1)<=2147483647;for(;i-s>1;)o=n?s+i>>1:xs((s+i)/2),t[o]<e?s=o:i=o;return e-t[s]<=t[i]-e?s:i}function ss(e){return(t,s,i)=>{let o=-1,n=-1;for(let n=s;n<=i;n++)if(e(t[n])){o=n;break}for(let o=i;o>=s;o--)if(e(t[o])){n=o;break}return[o,n]}}Pt&&function e(){let t=devicePixelRatio;It!=t&&(It=t,Gt&&es(zt,Gt,e),Gt=matchMedia(`(min-resolution: ${It-.001}dppx) and (max-resolution: ${It+.001}dppx)`),Qt(zt,Gt,e),Ot.dispatchEvent(new CustomEvent(Ft)))}();const is=e=>null!=e,os=e=>null!=e&&e>0,ns=ss(is),rs=ss(os);function as(e,t,s,i){let o=Cs(e),n=Cs(t);e==t&&(-1==o?(e*=s,t/=s):(e/=s,t*=s));let r=10==s?Es:Ts,a=1==n?ws:xs,l=(1==o?xs:ws)(r(_s(e))),d=a(r(_s(t))),c=Ss(s,l),p=Ss(s,d);return 10==s&&(l<0&&(c=Vs(c,-l)),d<0&&(p=Vs(p,-d))),i||2==s?(e=c*o,t=p*n):(e=Hs(e,c),t=Bs(t,p)),[e,t]}function ls(e,t,s,i){let o=as(e,t,s,i);return 0==e&&(o[0]=0),0==t&&(o[1]=0),o}const ds={mode:3,pad:.1},cs={pad:0,soft:null,mode:0},ps={min:cs,max:cs};function hs(e,t,s,i){return ti(s)?gs(e,t,s):(cs.pad=s,cs.soft=i?0:null,cs.mode=i?3:0,gs(e,t,ps))}function us(e,t){return null==e?t:e}function gs(e,t,s){let i=s.min,o=s.max,n=us(i.pad,0),r=us(o.pad,0),a=us(i.hard,-As),l=us(o.hard,As),d=us(i.soft,As),c=us(o.soft,-As),p=us(i.mode,0),h=us(o.mode,0),u=t-e,g=Es(u),f=ks(_s(e),_s(t)),m=Es(f),b=_s(m-g);(u<1e-24||b>10)&&(u=0,0!=e&&0!=t||(u=1e-24,2==p&&d!=As&&(n=0),2==h&&c!=-As&&(r=0)));let v=u||f||1e3,_=Es(v),x=Ss(10,xs(_)),y=Vs(Hs(e-v*(0==u?0==e?.1:1:n),x/10),24),w=e>=d&&(1==p||3==p&&y<=d||2==p&&y>=d)?d:As,$=ks(a,y<w&&e>=w?w:$s(w,y)),k=Vs(Bs(t+v*(0==u?0==t?.1:1:r),x/10),24),S=t<=c&&(1==h||3==h&&k>=c||2==h&&k<=c)?c:-As,C=$s(l,k>S&&t<=S?S:ks(S,k));return $==C&&0==$&&(C=100),[$,C]}const fs=new Intl.NumberFormat(Pt?Lt.language:"en-US"),ms=e=>fs.format(e),bs=Math,vs=bs.PI,_s=bs.abs,xs=bs.floor,ys=bs.round,ws=bs.ceil,$s=bs.min,ks=bs.max,Ss=bs.pow,Cs=bs.sign,Es=bs.log10,Ts=bs.log2,Ds=(e,t=1)=>bs.asinh(e/t),As=1/0;function zs(e){return 1+(0|Es((e^e>>31)-(e>>31)))}function Fs(e,t,s){return $s(ks(e,t),s)}function Ms(e){return"function"==typeof e}function Ps(e){return Ms(e)?e:()=>e}const Ns=e=>e,Os=(e,t)=>t,Ls=e=>null,Is=e=>!0,Gs=(e,t)=>e==t,Rs=/\.\d*?(?=9{6,}|0{6,})/gm,Us=e=>{if(Qs(e)||qs.has(e))return e;const t=`${e}`,s=t.match(Rs);if(null==s)return e;let i=s[0].length-1;if(-1!=t.indexOf("e-")){let[e,s]=t.split("e");return+`${Us(e)}e${s}`}return Vs(e,i)};function js(e,t){return Us(Vs(Us(e/t))*t)}function Bs(e,t){return Us(ws(Us(e/t))*t)}function Hs(e,t){return Us(xs(Us(e/t))*t)}function Vs(e,t=0){if(Qs(e))return e;let s=10**t,i=e*s*(1+Number.EPSILON);return ys(i)/s}const qs=new Map;function Ws(e){return((""+e).split(".")[1]||"").length}function Ys(e,t,s,i){let o=[],n=i.map(Ws);for(let r=t;r<s;r++){let t=_s(r),s=Vs(Ss(e,r),t);for(let a=0;a<i.length;a++){let l=10==e?+`${i[a]}e${r}`:i[a]*s,d=(r>=0?0:t)+(r>=n[a]?0:n[a]),c=10==e?l:Vs(l,d);o.push(c),qs.set(c,d)}}return o}const Js={},Xs=[],Ks=[null,null],Zs=Array.isArray,Qs=Number.isInteger;function ei(e){return"string"==typeof e}function ti(e){let t=!1;if(null!=e){let s=e.constructor;t=null==s||s==Object}return t}function si(e){return null!=e&&"object"==typeof e}const ii=Object.getPrototypeOf(Uint8Array),oi="__proto__";function ni(e,t=ti){let s;if(Zs(e)){let i=e.find(e=>null!=e);if(Zs(i)||t(i)){s=Array(e.length);for(let i=0;i<e.length;i++)s[i]=ni(e[i],t)}else s=e.slice()}else if(e instanceof ii)s=e.slice();else if(t(e)){s={};for(let i in e)i!=oi&&(s[i]=ni(e[i],t))}else s=e;return s}function ri(e){let t=arguments;for(let s=1;s<t.length;s++){let i=t[s];for(let t in i)t!=oi&&(ti(e[t])?ri(e[t],ni(i[t])):e[t]=ni(i[t]))}return e}function ai(e,t,s){for(let i,o=0,n=-1;o<t.length;o++){let r=t[o];if(r>n){for(i=r-1;i>=0&&null==e[i];)e[i--]=null;for(i=r+1;i<s&&null==e[i];)e[n=i++]=null}}}const li="undefined"==typeof queueMicrotask?e=>Promise.resolve().then(e):queueMicrotask;const di=["January","February","March","April","May","June","July","August","September","October","November","December"],ci=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function pi(e){return e.slice(0,3)}const hi=ci.map(pi),ui=di.map(pi),gi={MMMM:di,MMM:ui,WWWW:ci,WWW:hi};function fi(e){return(e<10?"0":"")+e}const mi={YYYY:e=>e.getFullYear(),YY:e=>(e.getFullYear()+"").slice(2),MMMM:(e,t)=>t.MMMM[e.getMonth()],MMM:(e,t)=>t.MMM[e.getMonth()],MM:e=>fi(e.getMonth()+1),M:e=>e.getMonth()+1,DD:e=>fi(e.getDate()),D:e=>e.getDate(),WWWW:(e,t)=>t.WWWW[e.getDay()],WWW:(e,t)=>t.WWW[e.getDay()],HH:e=>fi(e.getHours()),H:e=>e.getHours(),h:e=>{let t=e.getHours();return 0==t?12:t>12?t-12:t},AA:e=>e.getHours()>=12?"PM":"AM",aa:e=>e.getHours()>=12?"pm":"am",a:e=>e.getHours()>=12?"p":"a",mm:e=>fi(e.getMinutes()),m:e=>e.getMinutes(),ss:e=>fi(e.getSeconds()),s:e=>e.getSeconds(),fff:e=>{return((t=e.getMilliseconds())<10?"00":t<100?"0":"")+t;var t}};function bi(e,t){t=t||gi;let s,i=[],o=/\{([a-z]+)\}|[^{]+/gi;for(;s=o.exec(e);)i.push("{"==s[0][0]?mi[s[1]]:s[0]);return e=>{let s="";for(let o=0;o<i.length;o++)s+="string"==typeof i[o]?i[o]:i[o](e,t);return s}}const vi=(new Intl.DateTimeFormat).resolvedOptions().timeZone;const _i=e=>e%1==0,xi=[1,2,2.5,5],yi=Ys(10,-32,0,xi),wi=Ys(10,0,32,xi),$i=wi.filter(_i),ki=yi.concat(wi),Si="{YYYY}",Ci="\n"+Si,Ei="{M}/{D}",Ti="\n"+Ei,Di=Ti+"/{YY}",Ai="{aa}",zi="{h}:{mm}"+Ai,Fi="\n"+zi,Mi=":{ss}",Pi=null;function Ni(e){let t=1e3*e,s=60*t,i=60*s,o=24*i,n=30*o,r=365*o;return[(1==e?Ys(10,0,3,xi).filter(_i):Ys(10,-3,0,xi)).concat([t,5*t,10*t,15*t,30*t,s,5*s,10*s,15*s,30*s,i,2*i,3*i,4*i,6*i,8*i,12*i,o,2*o,3*o,4*o,5*o,6*o,7*o,8*o,9*o,10*o,15*o,n,2*n,3*n,4*n,6*n,r,2*r,5*r,10*r,25*r,50*r,100*r]),[[r,Si,Pi,Pi,Pi,Pi,Pi,Pi,1],[28*o,"{MMM}",Ci,Pi,Pi,Pi,Pi,Pi,1],[o,Ei,Ci,Pi,Pi,Pi,Pi,Pi,1],[i,"{h}"+Ai,Di,Pi,Ti,Pi,Pi,Pi,1],[s,zi,Di,Pi,Ti,Pi,Pi,Pi,1],[t,Mi,Di+" "+zi,Pi,Ti+" "+zi,Pi,Fi,Pi,1],[e,Mi+".{fff}",Di+" "+zi,Pi,Ti+" "+zi,Pi,Fi,Pi,1]],function(t){return(a,l,d,c,p,h)=>{let u=[],g=p>=r,f=p>=n&&p<r,m=t(d),b=Vs(m*e,3),v=Hi(m.getFullYear(),g?0:m.getMonth(),f||g?1:m.getDate()),_=Vs(v*e,3);if(f||g){let s=f?p/n:0,i=g?p/r:0,o=b==_?b:Vs(Hi(v.getFullYear()+i,v.getMonth()+s,1)*e,3),a=new Date(ys(o/e)),l=a.getFullYear(),d=a.getMonth();for(let n=0;o<=c;n++){let r=Hi(l+i*n,d+s*n,1),a=r-t(Vs(r*e,3));o=Vs((+r+a)*e,3),o<=c&&u.push(o)}}else{let n=p>=o?o:p,r=_+(xs(d)-xs(b))+Bs(b-_,n);u.push(r);let g=t(r),f=g.getHours()+g.getMinutes()/s+g.getSeconds()/i,m=p/i,v=h/a.axes[l]._space;for(;r=Vs(r+p,1==e?0:3),!(r>c);)if(m>1){let e=xs(Vs(f+m,6))%24,s=t(r).getHours()-e;s>1&&(s=-1),r-=s*i,f=(f+m)%24,Vs((r-u[u.length-1])/p,3)*v>=.7&&u.push(r)}else u.push(r)}return u}}]}const[Oi,Li,Ii]=Ni(1),[Gi,Ri,Ui]=Ni(.001);function ji(e,t){return e.map(e=>e.map((s,i)=>0==i||8==i||null==s?s:t(1==i||0==e[8]?s:e[1]+s)))}function Bi(e,t){return(s,i,o,n,r)=>{let a,l,d,c,p,h,u=t.find(e=>r>=e[0])||t[t.length-1];return i.map(t=>{let s=e(t),i=s.getFullYear(),o=s.getMonth(),n=s.getDate(),r=s.getHours(),g=s.getMinutes(),f=s.getSeconds(),m=i!=a&&u[2]||o!=l&&u[3]||n!=d&&u[4]||r!=c&&u[5]||g!=p&&u[6]||f!=h&&u[7]||u[1];return a=i,l=o,d=n,c=r,p=g,h=f,m(s)})}}function Hi(e,t,s){return new Date(e,t,s)}function Vi(e,t){return t(e)}Ys(2,-53,53,[1]);function qi(e,t){return(s,i,o,n)=>null==n?Mt:t(e(i))}const Wi={show:!0,live:!0,isolate:!1,mount:()=>{},markers:{show:!0,width:2,stroke:function(e,t){let s=e.series[t];return s.width?s.stroke(e,t):s.points.width?s.points.stroke(e,t):null},fill:function(e,t){return e.series[t].fill(e,t)},dash:"solid"},idx:null,idxs:null,values:[]};const Yi=[0,0];function Ji(e,t,s,i=!0){return e=>{0==e.button&&(!i||e.target==t)&&s(e)}}function Xi(e,t,s,i=!0){return e=>{(!i||e.target==t)&&s(e)}}const Ki={show:!0,x:!0,y:!0,lock:!1,move:function(e,t,s){return Yi[0]=t,Yi[1]=s,Yi},points:{one:!1,show:function(e,t){let s=e.cursor.points,i=Ht(),o=s.size(e,t);jt(i,bt,o),jt(i,vt,o);let n=o/-2;jt(i,"marginLeft",n),jt(i,"marginTop",n);let r=s.width(e,t,o);return r&&jt(i,"borderWidth",r),i},size:function(e,t){return e.series[t].points.size},width:0,stroke:function(e,t){let s=e.series[t].points;return s._stroke||s._fill},fill:function(e,t){let s=e.series[t].points;return s._fill||s._stroke}},bind:{mousedown:Ji,mouseup:Ji,click:Ji,dblclick:Ji,mousemove:Xi,mouseleave:Xi,mouseenter:Xi},drag:{setScale:!0,x:!0,y:!1,dist:0,uni:null,click:(e,t)=>{t.stopPropagation(),t.stopImmediatePropagation()},_x:!1,_y:!1},focus:{dist:(e,t,s,i,o)=>i-o,prox:-1,bias:0},hover:{skip:[void 0],prox:null,bias:0},left:-10,top:-10,idx:null,dataIdx:null,idxs:null,event:null},Zi={show:!0,stroke:"rgba(0,0,0,0.07)",width:2},Qi=ri({},Zi,{filter:Os}),eo=ri({},Qi,{size:10}),to=ri({},Zi,{show:!1}),so='12px system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',io="bold "+so,oo={show:!0,scale:"x",stroke:$t,space:50,gap:5,alignTo:1,size:50,labelGap:0,labelSize:30,labelFont:io,side:2,grid:Qi,ticks:eo,border:to,font:so,lineGap:1.5,rotate:0},no={show:!0,scale:"x",auto:!1,sorted:1,min:As,max:-As,idxs:[]};function ro(e,t,s,i,o){return t.map(e=>null==e?"":ms(e))}function ao(e,t,s,i,o,n,r){let a=[],l=qs.get(o)||0;for(let e=s=r?s:Vs(Bs(s,o),l);e<=i;e=Vs(e+o,l))a.push(Object.is(e,-0)?0:e);return a}function lo(e,t,s,i,o,n,r){const a=[],l=e.scales[e.axes[t].scale].log,d=xs((10==l?Es:Ts)(s));o=Ss(l,d),10==l&&(o=ki[ts(o,ki)]);let c=s,p=o*l;10==l&&(p=ki[ts(p,ki)]);do{a.push(c),c+=o,10!=l||qs.has(c)||(c=Vs(c,qs.get(o))),c>=p&&(p=(o=c)*l,10==l&&(p=ki[ts(p,ki)]))}while(c<=i);return a}function co(e,t,s,i,o,n,r){let a=e.scales[e.axes[t].scale].asinh,l=i>a?lo(e,t,ks(a,s),i,o):[a],d=i>=0&&s<=0?[0]:[];return(s<-a?lo(e,t,ks(a,-i),-s,o):[a]).reverse().map(e=>-e).concat(d,l)}const po=/./,ho=/[12357]/,uo=/[125]/,go=/1/,fo=(e,t,s,i)=>e.map((e,o)=>4==t&&0==e||o%i==0&&s.test(e.toExponential()[e<0?1:0])?e:null);function mo(e,t,s,i,o){let n=e.axes[s],r=n.scale,a=e.scales[r],l=e.valToPos,d=n._space,c=l(10,r),p=l(9,r)-c>=d?po:l(7,r)-c>=d?ho:l(5,r)-c>=d?uo:go;if(p==go){let e=_s(l(1,r)-c);if(e<d)return fo(t.slice().reverse(),a.distr,p,ws(d/e)).reverse()}return fo(t,a.distr,p,1)}function bo(e,t,s,i,o){let n=e.axes[s],r=n.scale,a=n._space,l=e.valToPos,d=_s(l(1,r)-l(2,r));return d<a?fo(t.slice().reverse(),3,po,ws(a/d)).reverse():t}function vo(e,t,s,i){return null==i?Mt:null==t?"":ms(t)}const _o={show:!0,scale:"y",stroke:$t,space:30,gap:5,alignTo:1,size:50,labelGap:0,labelSize:30,labelFont:io,side:3,grid:Qi,ticks:eo,border:to,font:so,lineGap:1.5,rotate:0};const xo={scale:null,auto:!0,sorted:0,min:As,max:-As},yo=(e,t,s,i,o)=>o,wo={show:!0,auto:!0,sorted:0,gaps:yo,alpha:1,facets:[ri({},xo,{scale:"x"}),ri({},xo,{scale:"y"})]},$o={scale:"y",auto:!0,sorted:0,show:!0,spanGaps:!1,gaps:yo,alpha:1,points:{show:function(e,t){let{scale:s,idxs:i}=e.series[0],o=e._data[0],n=e.valToPos(o[i[0]],s,!0),r=e.valToPos(o[i[1]],s,!0),a=_s(r-n)/(e.series[t].points.space*It);return i[1]-i[0]<=a},filter:null},values:null,min:As,max:-As,idxs:[],path:null,clip:null};function ko(e,t,s,i,o){return s/10}const So={time:!0,auto:!0,distr:1,log:10,asinh:1,min:null,max:null,dir:1,ori:0},Co=ri({},So,{time:!1,ori:1}),Eo={};function To(e,t){let s=Eo[e];return s||(s={key:e,plots:[],sub(e){s.plots.push(e)},unsub(e){s.plots=s.plots.filter(t=>t!=e)},pub(e,t,i,o,n,r,a){for(let l=0;l<s.plots.length;l++)s.plots[l]!=t&&s.plots[l].pub(e,t,i,o,n,r,a)}},null!=e&&(Eo[e]=s)),s}function Do(e,t,s){const i=e.mode,o=e.series[t],n=2==i?e._data[t]:e._data,r=e.scales,a=e.bbox;let l=n[0],d=2==i?n[1]:n[t],c=2==i?r[o.facets[0].scale]:r[e.series[0].scale],p=2==i?r[o.facets[1].scale]:r[o.scale],h=a.left,u=a.top,g=a.width,f=a.height,m=e.valToPosH,b=e.valToPosV;return 0==c.ori?s(o,l,d,c,p,m,b,h,u,g,f,Lo,Go,Uo,Bo,Vo):s(o,l,d,c,p,b,m,u,h,f,g,Io,Ro,jo,Ho,qo)}function Ao(e,t){let s=0,i=0,o=us(e.bands,Xs);for(let e=0;e<o.length;e++){let n=o[e];n.series[0]==t?s=n.dir:n.series[1]==t&&(1==n.dir?i|=1:i|=2)}return[s,1==i?-1:2==i?1:3==i?2:0]}function zo(e,t,s,i,o){let n=e.mode,r=e.series[t],a=2==n?r.facets[1].scale:r.scale,l=e.scales[a];return-1==o?l.min:1==o?l.max:3==l.distr?1==l.dir?l.min:l.max:0}function Fo(e,t,s,i,o,n){return Do(e,t,(e,t,r,a,l,d,c,p,h,u,g)=>{let f=e.pxRound;const m=a.dir*(0==a.ori?1:-1),b=0==a.ori?Go:Ro;let v,_;1==m?(v=s,_=i):(v=i,_=s);let x=f(d(t[v],a,u,p)),y=f(c(r[v],l,g,h)),w=f(d(t[_],a,u,p)),$=f(c(1==n?l.max:l.min,l,g,h)),k=new Path2D(o);return b(k,w,$),b(k,x,$),b(k,x,y),k})}function Mo(e,t,s,i,o,n){let r=null;if(e.length>0){r=new Path2D;const a=0==t?Uo:jo;let l=s;for(let t=0;t<e.length;t++){let s=e[t];if(s[1]>s[0]){let e=s[0]-l;e>0&&a(r,l,i,e,i+n),l=s[1]}}let d=s+o-l,c=10;d>0&&a(r,l,i-c/2,d,i+n+c)}return r}function Po(e,t,s,i,o,n,r){let a=[],l=e.length;for(let d=1==o?s:i;d>=s&&d<=i;d+=o){if(null===t[d]){let c=d,p=d;if(1==o)for(;++d<=i&&null===t[d];)p=d;else for(;--d>=s&&null===t[d];)p=d;let h=n(e[c]),u=p==c?h:n(e[p]),g=c-o;h=r<=0&&g>=0&&g<l?n(e[g]):h;let f=p+o;u=r>=0&&f>=0&&f<l?n(e[f]):u,u>=h&&a.push([h,u])}}return a}function No(e){return 0==e?Ns:1==e?ys:t=>js(t,e)}function Oo(e){let t=0==e?Lo:Io,s=0==e?(e,t,s,i,o,n)=>{e.arcTo(t,s,i,o,n)}:(e,t,s,i,o,n)=>{e.arcTo(s,t,o,i,n)},i=0==e?(e,t,s,i,o)=>{e.rect(t,s,i,o)}:(e,t,s,i,o)=>{e.rect(s,t,o,i)};return(e,o,n,r,a,l=0,d=0)=>{0==l&&0==d?i(e,o,n,r,a):(l=$s(l,r/2,a/2),d=$s(d,r/2,a/2),t(e,o+l,n),s(e,o+r,n,o+r,n+a,l),s(e,o+r,n+a,o,n+a,d),s(e,o,n+a,o,n,d),s(e,o,n,o+r,n,l),e.closePath())}}const Lo=(e,t,s)=>{e.moveTo(t,s)},Io=(e,t,s)=>{e.moveTo(s,t)},Go=(e,t,s)=>{e.lineTo(t,s)},Ro=(e,t,s)=>{e.lineTo(s,t)},Uo=Oo(0),jo=Oo(1),Bo=(e,t,s,i,o,n)=>{e.arc(t,s,i,o,n)},Ho=(e,t,s,i,o,n)=>{e.arc(s,t,i,o,n)},Vo=(e,t,s,i,o,n,r)=>{e.bezierCurveTo(t,s,i,o,n,r)},qo=(e,t,s,i,o,n,r)=>{e.bezierCurveTo(s,t,o,i,r,n)};function Wo(e){return(e,t,s,i,o)=>Do(e,t,(t,n,r,a,l,d,c,p,h,u,g)=>{let f,m,{pxRound:b,points:v}=t;0==a.ori?(f=Lo,m=Bo):(f=Io,m=Ho);const _=Vs(v.width*It,3);let x=(v.size-v.width)/2*It,y=Vs(2*x,3),w=new Path2D,$=new Path2D,{left:k,top:S,width:C,height:E}=e.bbox;Uo($,k-y,S-y,C+2*y,E+2*y);const T=e=>{if(null!=r[e]){let t=b(d(n[e],a,u,p)),s=b(c(r[e],l,g,h));f(w,t+x,s),m(w,t,s,x,0,2*vs)}};if(o)o.forEach(T);else for(let e=s;e<=i;e++)T(e);return{stroke:_>0?w:null,fill:w,clip:$,flags:3}})}function Yo(e){return(t,s,i,o,n,r)=>{i!=o&&(n!=i&&r!=i&&e(t,s,i),n!=o&&r!=o&&e(t,s,o),e(t,s,r))}}const Jo=Yo(Go),Xo=Yo(Ro);function Ko(e){const t=us(e?.alignGaps,0);return(e,s,i,o)=>Do(e,s,(n,r,a,l,d,c,p,h,u,g,f)=>{[i,o]=ns(a,i,o);let m,b,v=n.pxRound,_=e=>v(c(e,l,g,h)),x=e=>v(p(e,d,f,u));0==l.ori?(m=Go,b=Jo):(m=Ro,b=Xo);const y=l.dir*(0==l.ori?1:-1),w={stroke:new Path2D,fill:null,clip:null,band:null,gaps:null,flags:1},$=w.stroke;let k=!1;if(o-i>=4*g){let t,s,n,d=t=>e.posToVal(t,l.key,!0),c=null,p=null,h=_(r[1==y?i:o]),u=_(r[i]),g=_(r[o]),f=d(1==y?u+1:g-1);for(let e=1==y?i:o;e>=i&&e<=o;e+=y){let i=r[e],o=(1==y?i<f:i>f)?h:_(i),n=a[e];o==h?null!=n?(s=n,null==c?(m($,o,x(s)),t=c=p=s):s<c?c=s:s>p&&(p=s)):null===n&&(k=!0):(null!=c&&b($,h,x(c),x(p),x(t),x(s)),null!=n?(s=n,m($,o,x(s)),c=p=t=s):(c=p=null,null===n&&(k=!0)),h=o,f=d(h+y))}null!=c&&c!=p&&n!=h&&b($,h,x(c),x(p),x(t),x(s))}else for(let e=1==y?i:o;e>=i&&e<=o;e+=y){let t=a[e];null===t?k=!0:null!=t&&m($,_(r[e]),x(t))}let[S,C]=Ao(e,s);if(null!=n.fill||0!=S){let t=w.fill=new Path2D($),a=x(n.fillTo(e,s,n.min,n.max,S)),l=_(r[i]),d=_(r[o]);-1==y&&([d,l]=[l,d]),m(t,d,a),m(t,l,a)}if(!n.spanGaps){let d=[];k&&d.push(...Po(r,a,i,o,y,_,t)),w.gaps=d=n.gaps(e,s,i,o,d),w.clip=Mo(d,l.ori,h,u,g,f)}return 0!=C&&(w.band=2==C?[Fo(e,s,i,o,$,-1),Fo(e,s,i,o,$,1)]:Fo(e,s,i,o,$,C)),w})}function Zo(e,t,s,i,o,n,r=As){if(e.length>1){let a=null;for(let l=0,d=1/0;l<e.length;l++)if(void 0!==t[l]){if(null!=a){let t=_s(e[l]-e[a]);t<d&&(d=t,r=_s(s(e[l],i,o,n)-s(e[a],i,o,n)))}a=l}}return r}function Qo(e,t,s,i,o,n){const r=e.length;if(r<2)return null;const a=new Path2D;if(s(a,e[0],t[0]),2==r)i(a,e[1],t[1]);else{let s=Array(r),i=Array(r-1),n=Array(r-1),l=Array(r-1);for(let s=0;s<r-1;s++)n[s]=t[s+1]-t[s],l[s]=e[s+1]-e[s],i[s]=n[s]/l[s];s[0]=i[0];for(let e=1;e<r-1;e++)0===i[e]||0===i[e-1]||i[e-1]>0!=i[e]>0?s[e]=0:(s[e]=3*(l[e-1]+l[e])/((2*l[e]+l[e-1])/i[e-1]+(l[e]+2*l[e-1])/i[e]),isFinite(s[e])||(s[e]=0));s[r-1]=i[r-2];for(let i=0;i<r-1;i++)o(a,e[i]+l[i]/3,t[i]+s[i]*l[i]/3,e[i+1]-l[i]/3,t[i+1]-s[i+1]*l[i]/3,e[i+1],t[i+1])}return a}const en=new Set;function tn(){for(let e of en)e.syncRect(!0)}Pt&&(Qt("resize",Ot,tn),Qt("scroll",Ot,tn,!0),Qt(Ft,Ot,()=>{bn.pxRatio=It}));const sn=Ko(),on=Wo();function nn(e,t,s,i){return(i?[e[0],e[1]].concat(e.slice(2)):[e[0]].concat(e.slice(1))).map((e,i)=>rn(e,i,t,s))}function rn(e,t,s,i){return ri({},0==t?s:i,e)}function an(e,t,s){return null==t?Ks:[t,s]}const ln=an;function dn(e,t,s){return null==t?Ks:hs(t,s,.1,!0)}function cn(e,t,s,i){return null==t?Ks:as(t,s,e.scales[i].log,!1)}const pn=cn;function hn(e,t,s,i){return null==t?Ks:ls(t,s,e.scales[i].log,!1)}const un=hn;function gn(e,t,s,i,o){let n=ks(zs(e),zs(t)),r=t-e,a=ts(o/i*r,s);do{let e=s[a],t=i*e/r;if(t>=o&&n+(e<5?qs.get(e):0)<=17)return[e,t]}while(++a<s.length);return[0,0]}function fn(e){let t,s;return[e=e.replace(/(\d+)px/,(e,i)=>(t=ys((s=+i)*It))+"px"),t,s]}function mn(e){e.show&&[e.font,e.labelFont].forEach(e=>{let t=Vs(e[2]*It,1);e[0]=e[0].replace(/[0-9.]+px/,t+"px"),e[1]=t})}function bn(e,t,s){const i={mode:us(e.mode,1)},o=i.mode;function n(e,t,s,i){let o=t.valToPct(e);return i+s*(-1==t.dir?1-o:o)}function r(e,t,s,i){let o=t.valToPct(e);return i+s*(-1==t.dir?o:1-o)}function a(e,t,s,i){return 0==t.ori?n(e,t,s,i):r(e,t,s,i)}i.valToPosH=n,i.valToPosV=r;let l=!1;i.status=0;const d=i.root=Ht("uplot");if(null!=e.id&&(d.id=e.id),Rt(d,e.class),e.title){Ht("u-title",d).textContent=e.title}const c=Bt("canvas"),p=i.ctx=c.getContext("2d"),h=Ht("u-wrap",d);Qt("click",h,e=>{if(e.target===g){(gs!=Zt||fs!=ss)&&Bs.click(i,e)}},!0);const u=i.under=Ht("u-under",h);h.appendChild(c);const g=i.over=Ht("u-over",h),f=+us((e=ni(e)).pxAlign,1),m=No(f);(e.plugins||[]).forEach(t=>{t.opts&&(e=t.opts(i,e)||e)});const b=e.ms||.001,v=i.series=1==o?nn(e.series||[],no,$o,!1):function(e,t){return e.map((e,s)=>0==s?{}:ri({},t,e))}(e.series||[null],wo),_=i.axes=nn(e.axes||[],oo,_o,!0),x=i.scales={},y=i.bands=e.bands||[];y.forEach(e=>{e.fill=Ps(e.fill||null),e.dir=us(e.dir,-1)});const w=2==o?v[1].facets[0].scale:v[0].scale,$={axes:function(){for(let e=0;e<_.length;e++){let t=_[e];if(!t.show||!t._show)continue;let s,o,n=t.side,r=n%2,l=t.stroke(i,e),d=0==n||3==n?-1:1,[c,h]=t._found;if(null!=t.label){let a=t.labelGap*d,u=ys((t._lpos+a)*It);nt(t.labelFont[0],l,"center",2==n?_t:xt),p.save(),1==r?(s=o=0,p.translate(u,ys(ge+me/2)),p.rotate((3==n?-vs:vs)/2)):(s=ys(ue+fe/2),o=u);let g=Ms(t.label)?t.label(i,e,c,h):t.label;p.fillText(g,s,o),p.restore()}if(0==h)continue;let u=x[t.scale],g=0==r?fe:me,f=0==r?ue:ge,b=t._splits,v=2==u.distr?b.map(e=>et[e]):b,y=2==u.distr?et[b[1]]-et[b[0]]:c,w=t.ticks,$=t.border,k=w.show?w.size:0,S=ys(k*It),C=ys((2==t.alignTo?t._size-k-t.gap:t.gap)*It),E=t._rotate*-vs/180,T=m(t._pos*It),D=T+(S+C)*d;o=0==r?D:0,s=1==r?D:0,nt(t.font[0],l,1==t.align?yt:2==t.align?wt:E>0?yt:E<0?wt:0==r?"center":3==n?wt:yt,E||1==r?"middle":2==n?_t:xt);let A=t.font[1]*t.lineGap,z=b.map(e=>m(a(e,u,g,f))),F=t._values;for(let e=0;e<F.length;e++){let t=F[e];if(null!=t){0==r?s=z[e]:o=z[e],t=""+t;let i=-1==t.indexOf("\n")?[t]:t.split(/\n/gm);for(let e=0;e<i.length;e++){let t=i[e];E?(p.save(),p.translate(s,o+e*A),p.rotate(E),p.fillText(t,0,0),p.restore()):p.fillText(t,s,o+e*A)}}}w.show&&gt(z,w.filter(i,v,e,h,y),r,n,T,S,Vs(w.width*It,3),w.stroke(i,e),w.dash,w.cap);let M=t.grid;M.show&&gt(z,M.filter(i,v,e,h,y),r,0==r?2:1,0==r?ge:ue,0==r?me:fe,Vs(M.width*It,3),M.stroke(i,e),M.dash,M.cap),$.show&&gt([T],[1],0==r?1:0,0==r?1:2,1==r?ge:ue,1==r?me:fe,Vs($.width*It,3),$.stroke(i,e),$.dash,$.cap)}Qi("drawAxes")},series:function(){if(Re>0){let e=v.some(e=>e._focus)&&Qe!=Te.alpha;e&&(p.globalAlpha=Qe=Te.alpha),v.forEach((e,s)=>{if(s>0&&e.show&&(lt(s,!1),lt(s,!0),null==e._paths)){let n=Qe;Qe!=e.alpha&&(p.globalAlpha=Qe=e.alpha);let r=2==o?[0,t[s][0].length-1]:function(e){let t=Fs(Ue-1,0,Re-1),s=Fs(je+1,0,Re-1);for(;null==e[t]&&t>0;)t--;for(;null==e[s]&&s<Re-1;)s++;return[t,s]}(t[s]);e._paths=e.paths(i,s,r[0],r[1]),Qe!=n&&(p.globalAlpha=Qe=n)}}),v.forEach((e,t)=>{if(t>0&&e.show){let s=Qe;Qe!=e.alpha&&(p.globalAlpha=Qe=e.alpha),null!=e._paths&&dt(t,!1);{let s=null!=e._paths?e._paths.gaps:null,o=e.points.show(i,t,Ue,je,s),n=e.points.filter(i,t,o,s);(o||n)&&(e.points._paths=e.points.paths(i,t,Ue,je,n),dt(t,!0))}Qe!=s&&(p.globalAlpha=Qe=s),Qi("drawSeries",t)}}),e&&(p.globalAlpha=Qe=1)}}},k=(e.drawOrder||["axes","series"]).map(e=>$[e]);function S(e){const t=3==e.distr?t=>Es(t>0?t:e.clamp(i,t,e.min,e.max,e.key)):4==e.distr?t=>Ds(t,e.asinh):100==e.distr?t=>e.fwd(t):e=>e;return s=>{let i=t(s),{_min:o,_max:n}=e;return(i-o)/(n-o)}}function C(t){let s=x[t];if(null==s){let i=(e.scales||Js)[t]||Js;if(null!=i.from){C(i.from);let e=ri({},x[i.from],i,{key:t});e.valToPct=S(e),x[t]=e}else{s=x[t]=ri({},t==w?So:Co,i),s.key=t;let e=s.time,n=s.range,r=Zs(n);if((t!=w||2==o&&!e)&&(!r||null!=n[0]&&null!=n[1]||(n={min:null==n[0]?ds:{mode:1,hard:n[0],soft:n[0]},max:null==n[1]?ds:{mode:1,hard:n[1],soft:n[1]}},r=!1),!r&&ti(n))){let e=n;n=(t,s,i)=>null==s?Ks:hs(s,i,e)}s.range=Ps(n||(e?ln:t==w?3==s.distr?pn:4==s.distr?un:an:3==s.distr?cn:4==s.distr?hn:dn)),s.auto=Ps(!r&&s.auto),s.clamp=Ps(s.clamp||ko),s._min=s._max=null,s.valToPct=S(s)}}}C("x"),C("y"),1==o&&v.forEach(e=>{C(e.scale)}),_.forEach(e=>{C(e.scale)});for(let t in e.scales)C(t);const E=x[w],T=E.distr;let D,A;0==E.ori?(Rt(d,"u-hz"),D=n,A=r):(Rt(d,"u-vt"),D=r,A=n);const z={};for(let e in x){let t=x[e];null==t.min&&null==t.max||(z[e]={min:t.min,max:t.max},t.min=t.max=null)}const F=e.tzDate||(e=>new Date(ys(e/b))),M=e.fmtDate||bi,P=1==b?Ii(F):Ui(F),N=Bi(F,ji(1==b?Li:Ri,M)),O=qi(F,Vi("{YYYY}-{MM}-{DD} {h}:{mm}{aa}",M)),L=[],I=i.legend=ri({},Wi,e.legend),G=i.cursor=ri({},Ki,{drag:{y:2==o}},e.cursor),R=I.show,U=G.show,j=I.markers;let B,H,V;I.idxs=L,j.width=Ps(j.width),j.dash=Ps(j.dash),j.stroke=Ps(j.stroke),j.fill=Ps(j.fill);let q,W=[],Y=[],J=!1,X={};if(I.live){const e=v[1]?v[1].values:null;J=null!=e,q=J?e(i,1,0):{_:0};for(let e in q)X[e]=Mt}if(R)if(B=Bt("table","u-legend",d),V=Bt("tbody",null,B),I.mount(i,B),J){H=Bt("thead",null,B,V);let e=Bt("tr",null,H);for(var K in Bt("th",null,e),q)Bt("th",mt,e).textContent=K}else Rt(B,"u-inline"),I.live&&Rt(B,"u-live");const Z={show:!0},Q={show:!1};const ee=new Map;function te(e,t,s,o=!0){const n=ee.get(t)||{},r=G.bind[e](i,t,s,o);r&&(Qt(e,t,n[e]=r),ee.set(t,n))}function se(e,t,s){const i=ee.get(t)||{};for(let s in i)null!=e&&s!=e||(es(s,t,i[s]),delete i[s]);null==e&&ee.delete(t)}let ie=0,oe=0,ne=0,re=0,ae=0,le=0,de=ae,ce=le,pe=ne,he=re,ue=0,ge=0,fe=0,me=0;i.bbox={};let be=!1,ve=!1,_e=!1,xe=!1,ye=!1,we=!1;function $e(e,t,s){(s||e!=i.width||t!=i.height)&&ke(e,t),Pt(!1),_e=!0,ve=!0,zs()}function ke(e,t){i.width=ie=ne=e,i.height=oe=re=t,ae=le=0,function(){let e=!1,t=!1,s=!1,i=!1;_.forEach((o,n)=>{if(o.show&&o._show){let{side:n,_size:r}=o,a=n%2,l=r+(null!=o.label?o.labelSize:0);l>0&&(a?(ne-=l,3==n?(ae+=l,i=!0):s=!0):(re-=l,0==n?(le+=l,e=!0):t=!0))}}),Oe[0]=e,Oe[1]=s,Oe[2]=t,Oe[3]=i,ne-=Ge[1]+Ge[3],ae+=Ge[3],re-=Ge[2]+Ge[0],le+=Ge[0]}(),function(){let e=ae+ne,t=le+re,s=ae,i=le;function o(o,n){switch(o){case 1:return e+=n,e-n;case 2:return t+=n,t-n;case 3:return s-=n,s+n;case 0:return i-=n,i+n}}_.forEach((e,t)=>{if(e.show&&e._show){let t=e.side;e._pos=o(t,e._size),null!=e.label&&(e._lpos=o(t,e.labelSize))}})}();let s=i.bbox;ue=s.left=js(ae*It,.5),ge=s.top=js(le*It,.5),fe=s.width=js(ne*It,.5),me=s.height=js(re*It,.5)}const Se=3;if(i.setSize=function({width:e,height:t}){$e(e,t)},null==G.dataIdx){let e=G.hover,s=e.skip=new Set(e.skip??[]);s.add(void 0);let i=e.prox=Ps(e.prox),o=e.bias??=0;G.dataIdx=(e,n,r,a)=>{if(0==n)return r;let l=r,d=i(e,n,r,a)??As,c=d>=0&&d<As,p=0==E.ori?ne:re,h=G.left,u=t[0],g=t[n];if(s.has(g[r])){l=null;let e,t=null,i=null;if(0==o||-1==o)for(e=r;null==t&&e-- >0;)s.has(g[e])||(t=e);if(0==o||1==o)for(e=r;null==i&&e++<g.length;)s.has(g[e])||(i=e);if(null!=t||null!=i)if(c){let e=h-(null==t?-1/0:D(u[t],E,p,0)),s=(null==i?1/0:D(u[i],E,p,0))-h;e<=s?e<=d&&(l=t):s<=d&&(l=i)}else l=null==i?t:null==t?i:r-t<=i-r?t:i}else if(c){_s(h-D(u[r],E,p,0))>d&&(l=null)}return l}}const Ce=e=>{G.event=e};G.idxs=L,G._lock=!1;let Ee=G.points;Ee.show=Ps(Ee.show),Ee.size=Ps(Ee.size),Ee.stroke=Ps(Ee.stroke),Ee.width=Ps(Ee.width),Ee.fill=Ps(Ee.fill);const Te=i.focus=ri({},e.focus||{alpha:.3},G.focus),De=Te.prox>=0,Ae=De&&Ee.one;let ze=[],Fe=[],Me=[];function Pe(e,t){let s=Ee.show(i,t);if(s instanceof HTMLElement)return Rt(s,"u-cursor-pt"),Rt(s,e.class),qt(s,-10,-10,ne,re),g.insertBefore(s,ze[t]),s}function Ne(e,t){if(1==o||t>0){let t=1==o&&x[e.scale].time,s=e.value;e.value=t?ei(s)?qi(F,Vi(s,M)):s||O:s||vo,e.label=e.label||(t?"Time":"Value")}if(Ae||t>0){e.width=null==e.width?1:e.width,e.paths=e.paths||sn||Ls,e.fillTo=Ps(e.fillTo||zo),e.pxAlign=+us(e.pxAlign,f),e.pxRound=No(e.pxAlign),e.stroke=Ps(e.stroke||null),e.fill=Ps(e.fill||null),e._stroke=e._fill=e._paths=e._focus=null;let t=Vs((3+2*(ks(1,e.width)||1))*1,3),s=e.points=ri({},{size:t,width:ks(1,.2*t),stroke:e.stroke,space:2*t,paths:on,_stroke:null,_fill:null},e.points);s.show=Ps(s.show),s.filter=Ps(s.filter),s.fill=Ps(s.fill),s.stroke=Ps(s.stroke),s.paths=Ps(s.paths),s.pxAlign=e.pxAlign}if(R){let s=function(e,t){if(0==t&&(J||!I.live||2==o))return Ks;let s=[],n=Bt("tr","u-series",V,V.childNodes[t]);Rt(n,e.class),e.show||Rt(n,ft);let r=Bt("th",null,n);if(j.show){let e=Ht("u-marker",r);if(t>0){let s=j.width(i,t);s&&(e.style.border=s+"px "+j.dash(i,t)+" "+j.stroke(i,t)),e.style.background=j.fill(i,t)}}let a=Ht(mt,r);for(var l in e.label instanceof HTMLElement?a.appendChild(e.label):a.textContent=e.label,t>0&&(j.show||(a.style.color=e.width>0?j.stroke(i,t):j.fill(i,t)),te("click",r,t=>{if(G._lock)return;Ce(t);let s=v.indexOf(e);if((t.ctrlKey||t.metaKey)!=I.isolate){let e=v.some((e,t)=>t>0&&t!=s&&e.show);v.forEach((t,i)=>{i>0&&di(i,e?i==s?Z:Q:Z,!0,to.setSeries)})}else di(s,{show:!e.show},!0,to.setSeries)},!1),De&&te(Tt,r,t=>{G._lock||(Ce(t),di(v.indexOf(e),ui,!0,to.setSeries))},!1)),q){let e=Bt("td","u-value",n);e.textContent="--",s.push(e)}return[n,s]}(e,t);W.splice(t,0,s[0]),Y.splice(t,0,s[1]),I.values.push(null)}if(U){L.splice(t,0,null);let s=null;Ae?0==t&&(s=Pe(e,t)):t>0&&(s=Pe(e,t)),ze.splice(t,0,s),Fe.splice(t,0,0),Me.splice(t,0,0)}Qi("addSeries",t)}i.addSeries=function(e,t){t=null==t?v.length:t,e=1==o?rn(e,t,no,$o):rn(e,t,{},wo),v.splice(t,0,e),Ne(v[t],t)},i.delSeries=function(e){if(v.splice(e,1),R){I.values.splice(e,1),Y.splice(e,1);let t=W.splice(e,1)[0];se(null,t.firstChild),t.remove()}U&&(L.splice(e,1),ze.splice(e,1)[0].remove(),Fe.splice(e,1),Me.splice(e,1)),Qi("delSeries",e)};const Oe=[!1,!1,!1,!1];function Le(e,t,s,i){let[o,n,r,a]=s,l=t%2,d=0;return 0==l&&(a||n)&&(d=0==t&&!o||2==t&&!r?ys(oo.size/3):0),1==l&&(o||r)&&(d=1==t&&!n||3==t&&!a?ys(_o.size/2):0),d}const Ie=i.padding=(e.padding||[Le,Le,Le,Le]).map(e=>Ps(us(e,Le))),Ge=i._padding=Ie.map((e,t)=>e(i,t,Oe,0));let Re,Ue=null,je=null;const Be=1==o?v[0].idxs:null;let He,Ve,qe,We,Ye,Je,Xe,Ke,Ze,Qe,et=null,tt=!1;function st(e,s){if(t=null==e?[]:e,i.data=i._data=t,2==o){Re=0;for(let e=1;e<v.length;e++)Re+=t[e][0].length}else{0==t.length&&(i.data=i._data=t=[[]]),et=t[0],Re=et.length;let e=t;if(2==T){e=t.slice();let s=e[0]=Array(Re);for(let e=0;e<Re;e++)s[e]=e}i._data=t=e}if(Pt(!0),Qi("setData"),2==T&&(_e=!0),!1!==s){let e=E;e.auto(i,tt)?it():ai(w,e.min,e.max),xe=xe||G.left>=0,we=!0,zs()}}function it(){let e,s;tt=!0,1==o&&(Re>0?(Ue=Be[0]=0,je=Be[1]=Re-1,e=t[0][Ue],s=t[0][je],2==T?(e=Ue,s=je):e==s&&(3==T?[e,s]=as(e,e,E.log,!1):4==T?[e,s]=ls(e,e,E.log,!1):E.time?s=e+ys(86400/b):[e,s]=hs(e,s,.1,!0))):(Ue=Be[0]=e=null,je=Be[1]=s=null)),ai(w,e,s)}function ot(e,t,s,i,o,n){e??=kt,s??=Xs,i??="butt",o??=kt,n??="round",e!=He&&(p.strokeStyle=He=e),o!=Ve&&(p.fillStyle=Ve=o),t!=qe&&(p.lineWidth=qe=t),n!=Ye&&(p.lineJoin=Ye=n),i!=Je&&(p.lineCap=Je=i),s!=We&&p.setLineDash(We=s)}function nt(e,t,s,i){t!=Ve&&(p.fillStyle=Ve=t),e!=Xe&&(p.font=Xe=e),s!=Ke&&(p.textAlign=Ke=s),i!=Ze&&(p.textBaseline=Ze=i)}function rt(e,t,s,o,n=0){if(o.length>0&&e.auto(i,tt)&&(null==t||null==t.min)){let t=us(Ue,0),i=us(je,o.length-1),r=null==s.min?function(e,t,s,i=0,o=!1){let n=o?rs:ns,r=o?os:is;[t,s]=n(e,t,s);let a=e[t],l=e[t];if(t>-1)if(1==i)a=e[t],l=e[s];else if(-1==i)a=e[s],l=e[t];else for(let i=t;i<=s;i++){let t=e[i];r(t)&&(t<a?a=t:t>l&&(l=t))}return[a??As,l??-As]}(o,t,i,n,3==e.distr):[s.min,s.max];e.min=$s(e.min,s.min=r[0]),e.max=ks(e.max,s.max=r[1])}}i.setData=st;const at={min:null,max:null};function lt(e,t){let s=t?v[e].points:v[e];s._stroke=s.stroke(i,e),s._fill=s.fill(i,e)}function dt(e,s){let o=s?v[e].points:v[e],{stroke:n,fill:r,clip:a,flags:l,_stroke:d=o._stroke,_fill:c=o._fill,_width:h=o.width}=o._paths;h=Vs(h*It,3);let u=null,g=h%2/2;s&&null==c&&(c=h>0?"#fff":d);let f=1==o.pxAlign&&g>0;if(f&&p.translate(g,g),!s){let e=ue-h/2,t=ge-h/2,s=fe+h,i=me+h;u=new Path2D,u.rect(e,t,s,i)}s?pt(d,h,o.dash,o.cap,c,n,r,l,a):function(e,s,o,n,r,a,l,d,c,p,h){let u=!1;0!=c&&y.forEach((g,f)=>{if(g.series[0]==e){let e,m=v[g.series[1]],b=t[g.series[1]],_=(m._paths||Js).band;Zs(_)&&(_=1==g.dir?_[0]:_[1]);let x=null;m.show&&_&&function(e,t,s){for(t=us(t,0),s=us(s,e.length-1);t<=s;){if(null!=e[t])return!0;t++}return!1}(b,Ue,je)?(x=g.fill(i,f)||a,e=m._paths.clip):_=null,pt(s,o,n,r,x,l,d,c,p,h,e,_),u=!0}}),u||pt(s,o,n,r,a,l,d,c,p,h)}(e,d,h,o.dash,o.cap,c,n,r,l,u,a),f&&p.translate(-g,-g)}const ct=3;function pt(e,t,s,i,o,n,r,a,l,d,c,h){ot(e,t,s,i,o),(l||d||h)&&(p.save(),l&&p.clip(l),d&&p.clip(d)),h?(a&ct)==ct?(p.clip(h),c&&p.clip(c),ut(o,r),ht(e,n,t)):2&a?(ut(o,r),p.clip(h),ht(e,n,t)):1&a&&(p.save(),p.clip(h),c&&p.clip(c),ut(o,r),p.restore(),ht(e,n,t)):(ut(o,r),ht(e,n,t)),(l||d||h)&&p.restore()}function ht(e,t,s){s>0&&(t instanceof Map?t.forEach((e,t)=>{p.strokeStyle=He=t,p.stroke(e)}):null!=t&&e&&p.stroke(t))}function ut(e,t){t instanceof Map?t.forEach((e,t)=>{p.fillStyle=Ve=t,p.fill(e)}):null!=t&&e&&p.fill(t)}function gt(e,t,s,i,o,n,r,a,l,d){let c=r%2/2;1==f&&p.translate(c,c),ot(a,r,l,d,a),p.beginPath();let h,u,g,m,b=o+(0==i||3==i?-n:n);0==s?(u=o,m=b):(h=o,g=b);for(let i=0;i<e.length;i++)null!=t[i]&&(0==s?h=g=e[i]:u=m=e[i],p.moveTo(h,u),p.lineTo(g,m));p.stroke(),1==f&&p.translate(-c,-c)}function $t(e){let t=!0;return _.forEach((s,o)=>{if(!s.show)return;let n=x[s.scale];if(null==n.min)return void(s._show&&(t=!1,s._show=!1,Pt(!1)));s._show||(t=!1,s._show=!0,Pt(!1));let r=s.side,a=r%2,{min:l,max:d}=n,[c,p]=function(e,t,s,o){let n,r=_[e];if(o<=0)n=[0,0];else{let a=r._space=r.space(i,e,t,s,o);n=gn(t,s,r._incrs=r.incrs(i,e,t,s,o,a),o,a)}return r._found=n}(o,l,d,0==a?ne:re);if(0==p)return;let h=2==n.distr,u=s._splits=s.splits(i,o,l,d,c,p,h),g=2==n.distr?u.map(e=>et[e]):u,f=2==n.distr?et[u[1]]-et[u[0]]:c,m=s._values=s.values(i,s.filter(i,g,o,p,f),o,p,f);s._rotate=2==r?s.rotate(i,m,o,p):0;let b=s._size;s._size=ws(s.size(i,m,o,e)),null!=b&&s._size!=b&&(t=!1)}),t}function zt(e){let t=!0;return Ie.forEach((s,o)=>{let n=s(i,o,Oe,e);n!=Ge[o]&&(t=!1),Ge[o]=n}),t}function Pt(e){v.forEach((t,s)=>{s>0&&(t._paths=null,e&&(1==o?(t.min=null,t.max=null):t.facets.forEach(e=>{e.min=null,e.max=null})))})}let Lt,Gt,Vt,Wt,Jt,Kt,Zt,ss,cs,ps,gs,fs,ms=!1,xs=!1,Cs=[];function Ts(){xs=!1;for(let e=0;e<Cs.length;e++)Qi(...Cs[e]);Cs.length=0}function zs(){ms||(li(Ns),ms=!0)}function Ns(){if(be&&(!function(){for(let e in x){let t=x[e];null==z[e]&&(null==t.min||null!=z[w]&&t.auto(i,tt))&&(z[e]=at)}for(let e in x){let t=x[e];null==z[e]&&null!=t.from&&null!=z[t.from]&&(z[e]=at)}null!=z[w]&&Pt(!0);let e={};for(let t in z){let s=z[t];if(null!=s){let n=e[t]=ni(x[t],si);if(null!=s.min)ri(n,s);else if(t!=w||2==o)if(0==Re&&null==n.from){let e=n.range(i,null,null,t);n.min=e[0],n.max=e[1]}else n.min=As,n.max=-As}}if(Re>0){v.forEach((s,n)=>{if(1==o){let o=s.scale,r=z[o];if(null==r)return;let a=e[o];if(0==n){let e=a.range(i,a.min,a.max,o);a.min=e[0],a.max=e[1],Ue=ts(a.min,t[0]),je=ts(a.max,t[0]),je-Ue>1&&(t[0][Ue]<a.min&&Ue++,t[0][je]>a.max&&je--),s.min=et[Ue],s.max=et[je]}else s.show&&s.auto&&rt(a,r,s,t[n],s.sorted);s.idxs[0]=Ue,s.idxs[1]=je}else if(n>0&&s.show&&s.auto){let[i,o]=s.facets,r=i.scale,a=o.scale,[l,d]=t[n],c=e[r],p=e[a];null!=c&&rt(c,z[r],i,l,i.sorted),null!=p&&rt(p,z[a],o,d,o.sorted),s.min=o.min,s.max=o.max}});for(let t in e){let s=e[t],o=z[t];if(null==s.from&&(null==o||null==o.min)){let e=s.range(i,s.min==As?null:s.min,s.max==-As?null:s.max,t);s.min=e[0],s.max=e[1]}}}for(let t in e){let s=e[t];if(null!=s.from){let o=e[s.from];if(null==o.min)s.min=s.max=null;else{let e=s.range(i,o.min,o.max,t);s.min=e[0],s.max=e[1]}}}let s={},n=!1;for(let t in e){let i=e[t],o=x[t];if(o.min!=i.min||o.max!=i.max){o.min=i.min,o.max=i.max;let e=o.distr;o._min=3==e?Es(o.min):4==e?Ds(o.min,o.asinh):100==e?o.fwd(o.min):o.min,o._max=3==e?Es(o.max):4==e?Ds(o.max,o.asinh):100==e?o.fwd(o.max):o.max,s[t]=n=!0}}if(n){v.forEach((e,t)=>{2==o?t>0&&s.y&&(e._paths=null):s[e.scale]&&(e._paths=null)});for(let e in s)_e=!0,Qi("setScale",e);U&&G.left>=0&&(xe=we=!0)}for(let e in z)z[e]=null}(),be=!1),_e&&(!function(){let e=!1,t=0;for(;!e;){t++;let s=$t(t),o=zt(t);e=t==Se||s&&o,e||(ke(i.width,i.height),ve=!0)}}(),_e=!1),ve){if(jt(u,yt,ae),jt(u,_t,le),jt(u,bt,ne),jt(u,vt,re),jt(g,yt,ae),jt(g,_t,le),jt(g,bt,ne),jt(g,vt,re),jt(h,bt,ie),jt(h,vt,oe),c.width=ys(ie*It),c.height=ys(oe*It),_.forEach(({_el:e,_show:t,_size:s,_pos:i,side:o})=>{if(null!=e)if(t){let t=o%2==1;jt(e,t?"left":"top",i-(3===o||0===o?s:0)),jt(e,t?"width":"height",s),jt(e,t?"top":"left",t?le:ae),jt(e,t?"height":"width",t?re:ne),Ut(e,ft)}else Rt(e,ft)}),He=Ve=qe=Ye=Je=Xe=Ke=Ze=We=null,Qe=1,Ci(!0),ae!=de||le!=ce||ne!=pe||re!=he){Pt(!1);let e=ne/pe,t=re/he;if(U&&!xe&&G.left>=0){G.left*=e,G.top*=t,Vt&&qt(Vt,ys(G.left),0,ne,re),Wt&&qt(Wt,0,ys(G.top),ne,re);for(let s=0;s<ze.length;s++){let i=ze[s];null!=i&&(Fe[s]*=e,Me[s]*=t,qt(i,ws(Fe[s]),ws(Me[s]),ne,re))}}if(Qs.show&&!ye&&Qs.left>=0&&Qs.width>0){Qs.left*=e,Qs.width*=e,Qs.top*=t,Qs.height*=t;for(let e in Di)jt(ii,e,Qs[e])}de=ae,ce=le,pe=ne,he=re}Qi("setSize"),ve=!1}ie>0&&oe>0&&(p.clearRect(0,0,c.width,c.height),Qi("drawClear"),k.forEach(e=>e()),Qi("draw")),Qs.show&&ye&&(oi(Qs),ye=!1),U&&xe&&(wi(null,!0,!1),xe=!1),I.show&&I.live&&we&&(xi(),we=!1),l||(l=!0,i.status=1,Qi("ready")),tt=!1,ms=!1}function Rs(e,s){let o=x[e];if(null==o.from){if(0==Re){let t=o.range(i,s.min,s.max,e);s.min=t[0],s.max=t[1]}if(s.min>s.max){let e=s.min;s.min=s.max,s.max=e}if(Re>1&&null!=s.min&&null!=s.max&&s.max-s.min<1e-16)return;e==w&&2==o.distr&&Re>0&&(s.min=ts(s.min,t[0]),s.max=ts(s.max,t[0]),s.min==s.max&&s.max++),z[e]=s,be=!0,zs()}}i.batch=function(e,t=!1){ms=!0,xs=t,e(i),Ns(),t&&Cs.length>0&&queueMicrotask(Ts)},i.redraw=(e,t)=>{_e=t||!1,!1!==e?ai(w,E.min,E.max):zs()},i.setScale=Rs;let Us=!1;const Bs=G.drag;let Hs=Bs.x,Ys=Bs.y;U&&(G.x&&(Lt=Ht("u-cursor-x",g)),G.y&&(Gt=Ht("u-cursor-y",g)),0==E.ori?(Vt=Lt,Wt=Gt):(Vt=Gt,Wt=Lt),gs=G.left,fs=G.top);const Qs=i.select=ri({show:!0,over:!0,left:0,width:0,top:0,height:0},e.select),ii=Qs.show?Ht("u-select",Qs.over?g:u):null;function oi(e,t){if(Qs.show){for(let t in e)Qs[t]=e[t],t in Di&&jt(ii,t,e[t]);!1!==t&&Qi("setSelect")}}function ai(e,t,s){Rs(e,{min:t,max:s})}function di(e,t,s,n){null!=t.focus&&function(e){if(e!=hi){let t=null==e,s=1!=Te.alpha;v.forEach((i,n)=>{if(1==o||n>0){let o=t||0==n||n==e;i._focus=t?null:o,s&&function(e,t){v[e].alpha=t,U&&null!=ze[e]&&(ze[e].style.opacity=t);R&&W[e]&&(W[e].style.opacity=t)}(n,o?1:Te.alpha)}}),hi=e,s&&zs()}}(e),null!=t.show&&v.forEach((s,i)=>{i>0&&(e==i||null==e)&&(s.show=t.show,function(e){if(v[e].show)R&&Ut(W[e],ft);else if(R&&Rt(W[e],ft),U){let t=Ae?ze[0]:ze[e];null!=t&&qt(t,-10,-10,ne,re)}}(i),2==o?(ai(s.facets[0].scale,null,null),ai(s.facets[1].scale,null,null)):ai(s.scale,null,null),zs())}),!1!==s&&Qi("setSeries",e,t),n&&po("setSeries",i,e,t)}let ci,pi,hi;i.setSelect=oi,i.setSeries=di,i.addBand=function(e,t){e.fill=Ps(e.fill||null),e.dir=us(e.dir,-1),t=null==t?y.length:t,y.splice(t,0,e)},i.setBand=function(e,t){ri(y[e],t)},i.delBand=function(e){null==e?y.length=0:y.splice(e,1)};const ui={focus:!0};function gi(e,t,s){let i=x[t];s&&(e=e/It-(1==i.ori?le:ae));let o=ne;1==i.ori&&(o=re,e=o-e),-1==i.dir&&(e=o-e);let n=i._min,r=n+(i._max-n)*(e/o),a=i.distr;return 3==a?Ss(10,r):4==a?((e,t=1)=>bs.sinh(e)*t)(r,i.asinh):100==a?i.bwd(r):r}function fi(e,t){jt(ii,yt,Qs.left=e),jt(ii,bt,Qs.width=t)}function mi(e,t){jt(ii,_t,Qs.top=e),jt(ii,vt,Qs.height=t)}R&&De&&te(Dt,B,e=>{G._lock||(Ce(e),null!=hi&&di(null,ui,!0,to.setSeries))}),i.valToIdx=e=>ts(e,t[0]),i.posToIdx=function(e,s){return ts(gi(e,w,s),t[0],Ue,je)},i.posToVal=gi,i.valToPos=(e,t,s)=>0==x[t].ori?n(e,x[t],s?fe:ne,s?ue:0):r(e,x[t],s?me:re,s?ge:0),i.setCursor=(e,t,s)=>{gs=e.left,fs=e.top,wi(null,t,s)};let vi=0==E.ori?fi:mi,_i=1==E.ori?fi:mi;function xi(e,t){if(null!=e&&(e.idxs?e.idxs.forEach((e,t)=>{L[t]=e}):(e=>void 0===e)(e.idx)||L.fill(e.idx),I.idx=L[0]),R&&I.live){for(let e=0;e<v.length;e++)(e>0||1==o&&!J)&&yi(e,L[e]);!function(){if(R&&I.live)for(let e=2==o?1:0;e<v.length;e++){if(0==e&&J)continue;let t=I.values[e],s=0;for(let i in t)Y[e][s++].firstChild.nodeValue=t[i]}}()}we=!1,!1!==t&&Qi("setLegend")}function yi(e,s){let o,n=v[e],r=0==e&&2==T?et:t[e];J?o=n.values(i,e,s)??X:(o=n.value(i,null==s?null:r[s],e,s),o=null==o?X:{_:o}),I.values[e]=o}function wi(e,s,n){let r;cs=gs,ps=fs,[gs,fs]=G.move(i,gs,fs),G.left=gs,G.top=fs,U&&(Vt&&qt(Vt,ys(gs),0,ne,re),Wt&&qt(Wt,0,ys(fs),ne,re));let a=Ue>je;ci=As,pi=null;let l=0==E.ori?ne:re,d=1==E.ori?ne:re;if(gs<0||0==Re||a){r=G.idx=null;for(let e=0;e<v.length;e++){let t=ze[e];null!=t&&qt(t,-10,-10,ne,re)}De&&di(null,ui,!0,null==e&&to.setSeries),I.live&&(L.fill(r),we=!0)}else{let e,s,n;1==o&&(e=0==E.ori?gs:fs,s=gi(e,w),r=G.idx=ts(s,t[0],Ue,je),n=D(t[0][r],E,l,0));let a=-10,c=-10,p=0,h=0,u=!0,g="",f="";for(let e=2==o?1:0;e<v.length;e++){let m=v[e],b=L[e],_=null==b?null:1==o?t[e][b]:t[e][1][b],y=G.dataIdx(i,e,r,s),w=null==y?null:1==o?t[e][y]:t[e][1][y];if(we=we||w!=_||y!=b,L[e]=y,e>0&&m.show){let s=null==y?-10:y==r?n:D(1==o?t[0][y]:t[e][0][y],E,l,0),b=null==w?-10:A(w,1==o?x[m.scale]:x[m.facets[1].scale],d,0);if(De&&null!=w){let t=1==E.ori?gs:fs,s=_s(Te.dist(i,e,y,b,t));if(s<ci){let i=Te.bias;if(0!=i){let o=gi(t,m.scale),n=o>=0?1:-1;n==(w>=0?1:-1)&&(1==n?1==i?w>=o:w<=o:1==i?w<=o:w>=o)&&(ci=s,pi=e)}else ci=s,pi=e}}if(we||Ae){let t,o;0==E.ori?(t=s,o=b):(t=b,o=s);let n,r,l,d,m,v,_=!0,x=Ee.bbox;if(null!=x){_=!1;let t=x(i,e);l=t.left,d=t.top,n=t.width,r=t.height}else l=t,d=o,n=r=Ee.size(i,e);if(v=Ee.fill(i,e),m=Ee.stroke(i,e),Ae)e==pi&&ci<=Te.prox&&(a=l,c=d,p=n,h=r,u=_,g=v,f=m);else{let t=ze[e];null!=t&&(Fe[e]=l,Me[e]=d,Xt(t,n,r,_),Yt(t,v,m),qt(t,ws(l),ws(d),ne,re))}}}}if(Ae){let e=Te.prox;if(we||(null==hi?ci<=e:ci>e||pi!=hi)){let e=ze[0];null!=e&&(Fe[0]=a,Me[0]=c,Xt(e,p,h,u),Yt(e,g,f),qt(e,ws(a),ws(c),ne,re))}}}if(Qs.show&&Us)if(null!=e){let[t,s]=to.scales,[i,o]=to.match,[n,r]=e.cursor.sync.scales,a=e.cursor.drag;if(Hs=a._x,Ys=a._y,Hs||Ys){let a,c,p,h,u,{left:g,top:f,width:m,height:b}=e.select,v=e.scales[n].ori,_=e.posToVal,y=null!=t&&i(t,n),w=null!=s&&o(s,r);y&&Hs?(0==v?(a=g,c=m):(a=f,c=b),p=x[t],h=D(_(a,n),p,l,0),u=D(_(a+c,n),p,l,0),vi($s(h,u),_s(u-h))):vi(0,l),w&&Ys?(1==v?(a=g,c=m):(a=f,c=b),p=x[s],h=A(_(a,r),p,d,0),u=A(_(a+c,r),p,d,0),_i($s(h,u),_s(u-h))):_i(0,d)}else Ai()}else{let e=_s(cs-Jt),t=_s(ps-Kt);if(1==E.ori){let s=e;e=t,t=s}Hs=Bs.x&&e>=Bs.dist,Ys=Bs.y&&t>=Bs.dist;let s,i,o=Bs.uni;null!=o?Hs&&Ys&&(Hs=e>=o,Ys=t>=o,Hs||Ys||(t>e?Ys=!0:Hs=!0)):Bs.x&&Bs.y&&(Hs||Ys)&&(Hs=Ys=!0),Hs&&(0==E.ori?(s=Zt,i=gs):(s=ss,i=fs),vi($s(s,i),_s(i-s)),Ys||_i(0,d)),Ys&&(1==E.ori?(s=Zt,i=gs):(s=ss,i=fs),_i($s(s,i),_s(i-s)),Hs||vi(0,l)),Hs||Ys||(vi(0,0),_i(0,0))}if(Bs._x=Hs,Bs._y=Ys,null==e){if(n){if(null!=so){let[e,t]=to.scales;to.values[0]=null!=e?gi(0==E.ori?gs:fs,e):null,to.values[1]=null!=t?gi(1==E.ori?gs:fs,t):null}po(St,i,gs,fs,ne,re,r)}if(De){let e=n&&to.setSeries,t=Te.prox;null==hi?ci<=t&&di(pi,ui,!0,e):ci>t?di(null,ui,!0,e):pi!=hi&&di(pi,ui,!0,e)}}we&&(I.idx=r,xi()),!1!==s&&Qi("setCursor")}i.setLegend=xi;let Si=null;function Ci(e=!1){e?Si=null:(Si=g.getBoundingClientRect(),Qi("syncRect",Si))}function Ei(e,t,s,i,o,n,r){G._lock||Us&&null!=e&&0==e.movementX&&0==e.movementY||(Ti(e,t,s,i,o,n,r,!1,null!=e),null!=e?wi(null,!0,!0):wi(t,!0,!1))}function Ti(e,t,s,o,n,r,l,d,c){if(null==Si&&Ci(!1),Ce(e),null!=e)s=e.clientX-Si.left,o=e.clientY-Si.top;else{if(s<0||o<0)return gs=-10,void(fs=-10);let[e,i]=to.scales,l=t.cursor.sync,[d,c]=l.values,[p,h]=l.scales,[u,g]=to.match,f=t.axes[0].side%2==1,m=0==E.ori?ne:re,b=1==E.ori?ne:re,v=f?r:n,_=f?n:r,y=f?o:s,w=f?s:o;if(s=null!=p?u(e,p)?a(d,x[e],m,0):-10:m*(y/v),o=null!=h?g(i,h)?a(c,x[i],b,0):-10:b*(w/_),1==E.ori){let e=s;s=o,o=e}}!c||null!=t&&t.cursor.event.type!=St||((s<=1||s>=ne-1)&&(s=js(s,ne)),(o<=1||o>=re-1)&&(o=js(o,re))),d?(Jt=s,Kt=o,[Zt,ss]=G.move(i,s,o)):(gs=s,fs=o)}Object.defineProperty(i,"rect",{get:()=>(null==Si&&Ci(!1),Si)});const Di={width:0,height:0,left:0,top:0};function Ai(){oi(Di,!1)}let zi,Fi,Mi,Pi;function Ni(e,t,s,o,n,r,a){Us=!0,Hs=Ys=Bs._x=Bs._y=!1,Ti(e,t,s,o,n,r,0,!0,!1),null!=e&&(te(Et,Nt,Hi,!1),po(Ct,i,Zt,ss,ne,re,null));let{left:l,top:d,width:c,height:p}=Qs;zi=l,Fi=d,Mi=c,Pi=p}function Hi(e,t,s,o,n,r,a){Us=Bs._x=Bs._y=!1,Ti(e,t,s,o,n,r,0,!1,!0);let{left:l,top:d,width:c,height:p}=Qs,h=c>0||p>0,u=zi!=l||Fi!=d||Mi!=c||Pi!=p;if(h&&u&&oi(Qs),Bs.setScale&&h&&u){let e=l,t=c,s=d,i=p;if(1==E.ori&&(e=d,t=p,s=l,i=c),Hs&&ai(w,gi(e,w),gi(e+t,w)),Ys)for(let e in x){let t=x[e];e!=w&&null==t.from&&t.min!=As&&ai(e,gi(s+i,e),gi(s,e))}Ai()}else G.lock&&(G._lock=!G._lock,wi(t,!0,null!=e));null!=e&&(se(Et,Nt),po(Et,i,gs,fs,ne,re,null))}function Yi(e,t,s,o,n,r,a){G._lock||(Ce(e),it(),Ai(),null!=e&&po(At,i,gs,fs,ne,re,null))}function Ji(){_.forEach(mn),$e(i.width,i.height,!0)}Qt(Ft,Ot,Ji);const Xi={};Xi.mousedown=Ni,Xi.mousemove=Ei,Xi.mouseup=Hi,Xi.dblclick=Yi,Xi.setSeries=(e,t,s,o)=>{-1!=(s=(0,to.match[2])(i,t,s))&&di(s,o,!0,!1)},U&&(te(Ct,g,Ni),te(St,g,Ei),te(Tt,g,e=>{Ce(e),Ci(!1)}),te(Dt,g,function(e,t,s,i,o,n,r){if(G._lock)return;Ce(e);let a=Us;if(Us){let e,t,s=!0,i=!0,o=10;0==E.ori?(e=Hs,t=Ys):(e=Ys,t=Hs),e&&t&&(s=gs<=o||gs>=ne-o,i=fs<=o||fs>=re-o),e&&s&&(gs=gs<Zt?0:ne),t&&i&&(fs=fs<ss?0:re),wi(null,!0,!0),Us=!1}gs=-10,fs=-10,L.fill(null),wi(null,!0,!0),a&&(Us=a)}),te(At,g,Yi),en.add(i),i.syncRect=Ci);const Zi=i.hooks=e.hooks||{};function Qi(e,t,s){xs?Cs.push([e,t,s]):e in Zi&&Zi[e].forEach(e=>{e.call(null,i,t,s)})}(e.plugins||[]).forEach(e=>{for(let t in e.hooks)Zi[t]=(Zi[t]||[]).concat(e.hooks[t])});const eo=(e,t,s)=>s,to=ri({key:null,setSeries:!1,filters:{pub:Is,sub:Is},scales:[w,v[1]?v[1].scale:null],match:[Gs,Gs,eo],values:[null,null]},G.sync);2==to.match.length&&to.match.push(eo),G.sync=to;const so=to.key,io=To(so);function po(e,t,s,i,o,n,r){to.filters.pub(e,t,s,i,o,n,r)&&io.pub(e,t,s,i,o,n,r)}function ho(){Qi("init",e,t),st(t||e.data,!1),z[w]?Rs(w,z[w]):it(),ye=Qs.show&&(Qs.width>0||Qs.height>0),xe=we=!0,$e(e.width,e.height)}return io.sub(i),i.pub=function(e,t,s,i,o,n,r){to.filters.sub(e,t,s,i,o,n,r)&&Xi[e](null,t,s,i,o,n,r)},i.destroy=function(){io.unsub(i),en.delete(i),ee.clear(),es(Ft,Ot,Ji),d.remove(),B?.remove(),Qi("destroy")},v.forEach(Ne),_.forEach(function(e,t){if(e._show=e.show,e.show){let s=e.side%2,o=x[e.scale];null==o&&(e.scale=s?v[1].scale:w,o=x[e.scale]);let n=o.time;e.size=Ps(e.size),e.space=Ps(e.space),e.rotate=Ps(e.rotate),Zs(e.incrs)&&e.incrs.forEach(e=>{!qs.has(e)&&qs.set(e,Ws(e))}),e.incrs=Ps(e.incrs||(2==o.distr?$i:n?1==b?Oi:Gi:ki)),e.splits=Ps(e.splits||(n&&1==o.distr?P:3==o.distr?lo:4==o.distr?co:ao)),e.stroke=Ps(e.stroke),e.grid.stroke=Ps(e.grid.stroke),e.ticks.stroke=Ps(e.ticks.stroke),e.border.stroke=Ps(e.border.stroke);let r=e.values;e.values=Zs(r)&&!Zs(r[0])?Ps(r):n?Zs(r)?Bi(F,ji(r,M)):ei(r)?function(e,t){let s=bi(t);return(t,i,o,n,r)=>i.map(t=>s(e(t)))}(F,r):r||N:r||ro,e.filter=Ps(e.filter||(o.distr>=3&&10==o.log?mo:3==o.distr&&2==o.log?bo:Os)),e.font=fn(e.font),e.labelFont=fn(e.labelFont),e._size=e.size(i,null,t,0),e._space=e._rotate=e._incrs=e._found=e._splits=e._values=null,e._size>0&&(Oe[t]=!0,e._el=Ht("u-axis",h))}}),s?s instanceof HTMLElement?(s.appendChild(d),ho()):s(i,ho):ho(),i}bn.assign=ri,bn.fmtNum=ms,bn.rangeNum=hs,bn.rangeLog=as,bn.rangeAsinh=ls,bn.orient=Do,bn.pxRatio=It,bn.join=function(e,t){if(function(e){let t=e[0][0],s=t.length;for(let i=1;i<e.length;i++){let o=e[i][0];if(o.length!=s)return!1;if(o!=t)for(let e=0;e<s;e++)if(o[e]!=t[e])return!1}return!0}(e)){let t=e[0].slice();for(let s=1;s<e.length;s++)t.push(...e[s].slice(1));return function(e,t=100){const s=e.length;if(s<=1)return!0;let i=0,o=s-1;for(;i<=o&&null==e[i];)i++;for(;o>=i&&null==e[o];)o--;if(o<=i)return!0;const n=ks(1,xs((o-i+1)/t));for(let t=e[i],s=i+n;s<=o;s+=n){const i=e[s];if(null!=i){if(i<=t)return!1;t=i}}return!0}(t[0])||(t=function(e){let t=e[0],s=t.length,i=Array(s);for(let e=0;e<i.length;e++)i[e]=e;i.sort((e,s)=>t[e]-t[s]);let o=[];for(let t=0;t<e.length;t++){let n=e[t],r=Array(s);for(let e=0;e<s;e++)r[e]=n[i[e]];o.push(r)}return o}(t)),t}let s=new Set;for(let t=0;t<e.length;t++){let i=e[t][0],o=i.length;for(let e=0;e<o;e++)s.add(i[e])}let i=[Array.from(s).sort((e,t)=>e-t)],o=i[0].length,n=new Map;for(let e=0;e<o;e++)n.set(i[0][e],e);for(let s=0;s<e.length;s++){let r=e[s],a=r[0];for(let e=1;e<r.length;e++){let l=r[e],d=Array(o).fill(void 0),c=t?t[s][e]:1,p=[];for(let e=0;e<l.length;e++){let t=l[e],s=n.get(a[e]);null===t?0!=c&&(d[s]=t,2==c&&p.push(s)):d[s]=t}ai(d,p,o),i.push(d)}}return i},bn.fmtDate=bi,bn.tzDate=function(e,t){let s;return"UTC"==t||"Etc/UTC"==t?s=new Date(+e+6e4*e.getTimezoneOffset()):t==vi?s=e:(s=new Date(e.toLocaleString("en-US",{timeZone:t})),s.setMilliseconds(e.getMilliseconds())),s},bn.sync=To;{bn.addGap=function(e,t,s){let i=e[e.length-1];i&&i[0]==t?i[1]=s:e.push([t,s])},bn.clipGaps=Mo;let e=bn.paths={points:Wo};e.linear=Ko,e.stepped=function(e){const t=us(e.align,1),s=us(e.ascDesc,!1),i=us(e.alignGaps,0),o=us(e.extend,!1);return(e,n,r,a)=>Do(e,n,(l,d,c,p,h,u,g,f,m,b,v)=>{[r,a]=ns(c,r,a);let _=l.pxRound,{left:x,width:y}=e.bbox,w=e=>_(u(e,p,b,f)),$=e=>_(g(e,h,v,m)),k=0==p.ori?Go:Ro;const S={stroke:new Path2D,fill:null,clip:null,band:null,gaps:null,flags:1},C=S.stroke,E=p.dir*(0==p.ori?1:-1);let T=$(c[1==E?r:a]),D=w(d[1==E?r:a]),A=D,z=D;o&&-1==t&&(z=x,k(C,z,T)),k(C,D,T);for(let e=1==E?r:a;e>=r&&e<=a;e+=E){let s=c[e];if(null==s)continue;let i=w(d[e]),o=$(s);1==t?k(C,i,T):k(C,A,o),k(C,i,o),T=o,A=i}let F=A;o&&1==t&&(F=x+y,k(C,F,T));let[M,P]=Ao(e,n);if(null!=l.fill||0!=M){let t=S.fill=new Path2D(C),s=$(l.fillTo(e,n,l.min,l.max,M));k(t,F,s),k(t,z,s)}if(!l.spanGaps){let o=[];o.push(...Po(d,c,r,a,E,w,i));let h=l.width*It/2,u=s||1==t?h:-h,g=s||-1==t?-h:h;o.forEach(e=>{e[0]+=u,e[1]+=g}),S.gaps=o=l.gaps(e,n,r,a,o),S.clip=Mo(o,p.ori,f,m,b,v)}return 0!=P&&(S.band=2==P?[Fo(e,n,r,a,C,-1),Fo(e,n,r,a,C,1)]:Fo(e,n,r,a,C,P)),S})},e.bars=function(e){const t=us((e=e||Js).size,[.6,As,1]),s=e.align||0,i=e.gap||0;let o=e.radius;o=null==o?[0,0]:"number"==typeof o?[o,0]:o;const n=Ps(o),r=1-t[0],a=us(t[1],As),l=us(t[2],1),d=us(e.disp,Js),c=us(e.each,e=>{}),{fill:p,stroke:h}=d;return(e,t,o,u)=>Do(e,t,(g,f,m,b,v,_,x,y,w,$,k)=>{let S,C,E=g.pxRound,T=s,D=i*It,A=a*It,z=l*It;0==b.ori?[S,C]=n(e,t):[C,S]=n(e,t);const F=b.dir*(0==b.ori?1:-1);let M,P,N,O=0==b.ori?Uo:jo,L=0==b.ori?c:(e,t,s,i,o,n,r)=>{c(e,t,s,o,i,r,n)},I=us(e.bands,Xs).find(e=>e.series[0]==t),G=null!=I?I.dir:0,R=g.fillTo(e,t,g.min,g.max,G),U=E(x(R,v,k,w)),j=$,B=E(g.width*It),H=!1,V=null,q=null,W=null,Y=null;null==p||0!=B&&null==h||(H=!0,V=p.values(e,t,o,u),q=new Map,new Set(V).forEach(e=>{null!=e&&q.set(e,new Path2D)}),B>0&&(W=h.values(e,t,o,u),Y=new Map,new Set(W).forEach(e=>{null!=e&&Y.set(e,new Path2D)})));let{x0:J,size:X}=d;if(null!=J&&null!=X){T=1,f=J.values(e,t,o,u),2==J.unit&&(f=f.map(t=>e.posToVal(y+t*$,b.key,!0)));let s=X.values(e,t,o,u);P=2==X.unit?s[0]*$:_(s[0],b,$,y)-_(0,b,$,y),j=Zo(f,m,_,b,$,y,j),N=j-P+D}else j=Zo(f,m,_,b,$,y,j),N=j*r+D,P=j-N;N<1&&(N=0),B>=P/2&&(B=0),N<5&&(E=Ns);let K=N>0;P=E(Fs(j-N-(K?B:0),z,A)),M=(0==T?P/2:T==F?0:P)-T*F*((0==T?D/2:0)+(K?B/2:0));const Z={stroke:null,fill:null,clip:null,band:null,gaps:null,flags:0},Q=H?null:new Path2D;let ee=null;if(null!=I)ee=e.data[I.series[1]];else{let{y0:s,y1:i}=d;null!=s&&null!=i&&(m=i.values(e,t,o,u),ee=s.values(e,t,o,u))}let te=S*P,se=C*P;for(let s=1==F?o:u;s>=o&&s<=u;s+=F){let i=m[s];if(null==i)continue;if(null!=ee){let e=ee[s]??0;if(i-e==0)continue;U=x(e,v,k,w)}let o=_(2!=b.distr||null!=d?f[s]:s,b,$,y),n=x(us(i,R),v,k,w),r=E(o-M),a=E(ks(n,U)),l=E($s(n,U)),c=a-l;if(null!=i){let o=i<0?se:te,n=i<0?te:se;H?(B>0&&null!=W[s]&&O(Y.get(W[s]),r,l+xs(B/2),P,ks(0,c-B),o,n),null!=V[s]&&O(q.get(V[s]),r,l+xs(B/2),P,ks(0,c-B),o,n)):O(Q,r,l+xs(B/2),P,ks(0,c-B),o,n),L(e,t,s,r-B/2,l,P+B,c)}}return B>0?Z.stroke=H?Y:Q:H||(Z._fill=0==g.width?g._fill:g._stroke??g._fill,Z.width=0),Z.fill=H?q:Q,Z})},e.spline=function(e){return function(e,t){const s=us(t?.alignGaps,0);return(t,i,o,n)=>Do(t,i,(r,a,l,d,c,p,h,u,g,f,m)=>{[o,n]=ns(l,o,n);let b,v,_,x=r.pxRound,y=e=>x(p(e,d,f,u)),w=e=>x(h(e,c,m,g));0==d.ori?(b=Lo,_=Go,v=Vo):(b=Io,_=Ro,v=qo);const $=d.dir*(0==d.ori?1:-1);let k=y(a[1==$?o:n]),S=k,C=[],E=[];for(let e=1==$?o:n;e>=o&&e<=n;e+=$)if(null!=l[e]){let t=y(a[e]);C.push(S=t),E.push(w(l[e]))}const T={stroke:e(C,E,b,_,v,x),fill:null,clip:null,band:null,gaps:null,flags:1},D=T.stroke;let[A,z]=Ao(t,i);if(null!=r.fill||0!=A){let e=T.fill=new Path2D(D),s=w(r.fillTo(t,i,r.min,r.max,A));_(e,S,s),_(e,k,s)}if(!r.spanGaps){let e=[];e.push(...Po(a,l,o,n,$,y,s)),T.gaps=e=r.gaps(t,i,o,n,e),T.clip=Mo(e,d.ori,u,g,f,m)}return 0!=z&&(T.band=2==z?[Fo(t,i,o,n,D,-1),Fo(t,i,o,n,D,1)]:Fo(t,i,o,n,D,z)),T})}(Qo,e)}}class vn extends le{static properties={deviceId:{type:String},attrName:{type:String},hours:{type:Number,state:!0},_loading:{type:Boolean,state:!0},_error:{type:String,state:!0}};static styles=n`
    :host { display: block; }

    /* uPlot CSS — must be in shadow DOM for proper layout */
    .uplot, .uplot *, .uplot *::before, .uplot *::after { box-sizing: border-box; }
    .uplot { font-family: system-ui, sans-serif; line-height: 1.5; width: min-content; }
    .u-wrap { position: relative; user-select: none; }
    .u-over, .u-under { position: absolute; }
    .u-under { overflow: hidden; }
    .uplot canvas { display: block; position: relative; width: 100%; height: 100%; }
    .u-axis { position: absolute; }
    .u-legend { display: none; }
    .u-select { background: rgba(0,212,255,0.1); position: absolute; pointer-events: none; }
    .u-cursor-x, .u-cursor-y { position: absolute; left: 0; top: 0; pointer-events: none; will-change: transform; }
    .u-hz .u-cursor-x { height: 100%; border-right: 1px dashed rgba(255,255,255,0.3); }
    .u-hz .u-cursor-y { width: 100%; border-bottom: 1px dashed rgba(255,255,255,0.3); }
    .u-cursor-pt { position: absolute; top: 0; left: 0; border-radius: 50%; border: 0 solid; pointer-events: none; will-change: transform; background-clip: padding-box !important; }
    .u-axis.u-off, .u-select.u-off, .u-cursor-x.u-off, .u-cursor-y.u-off, .u-cursor-pt.u-off { display: none; }
    .overlay {
      position: fixed; top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0, 0, 0, 0.6);
      z-index: 1000;
      display: flex; justify-content: center; align-items: center;
      padding: 20px;
    }
    .chart-container {
      background: #0d0d1f;
      border-radius: 12px;
      border: 1px solid rgba(255,255,255,0.08);
      padding: 20px;
      width: 100%;
      max-width: 700px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
      overflow: hidden;
    }
    .chart-header {
      display: flex; justify-content: space-between; align-items: center;
      margin-bottom: 12px;
    }
    .chart-title {
      font-size: 16px; font-weight: 600; color: #fff;
    }
    .chart-subtitle {
      font-size: 11px; color: rgba(255,255,255,0.4); margin-top: 2px;
    }
    .close-btn {
      background: none; border: none; color: rgba(255,255,255,0.4);
      font-size: 20px; cursor: pointer; padding: 4px 8px;
    }
    .close-btn:hover { color: #fff; }
    .time-range {
      display: flex; gap: 6px; margin-bottom: 12px;
    }
    .range-btn {
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      color: rgba(255,255,255,0.5);
      padding: 4px 12px;
      border-radius: 6px;
      font-size: 11px;
      cursor: pointer;
    }
    .range-btn:hover { color: #fff; border-color: rgba(255,255,255,0.2); }
    .range-btn.active { background: rgba(0,212,255,0.15); color: #00D4FF; border-color: rgba(0,212,255,0.3); }
    .chart-wrap { width: 100%; height: 200px; position: relative; overflow: hidden; }
    .loading, .error, .no-data {
      display: flex; align-items: center; justify-content: center;
      height: 200px; font-size: 12px; color: rgba(255,255,255,0.4);
    }
    .error { color: #ef5350; }
  `;constructor(){super(),this.hours=24,this._loading=!1,this._error="",this._chart=null,this._data=null}connectedCallback(){super.connectedCallback(),this._fetchData()}disconnectedCallback(){super.disconnectedCallback(),this._chart&&(this._chart.destroy(),this._chart=null)}async _fetchData(){this._loading=!0,this._error="";try{const{fetchAttributeHistory:e}=await Promise.resolve().then(function(){return rt}),t=await e(this.deviceId,this.attrName,this.hours);this._data=t,this._loading=!1,await this.updateComplete,this._renderChart()}catch(e){this._error=e.message||"Failed to load history",this._loading=!1}}_renderChart(){this._data&&0!==this._data.length&&requestAnimationFrame(()=>this._doRenderChart())}_doRenderChart(){if(!this._data||0===this._data.length)return;const e=this.shadowRoot.querySelector(".chart-wrap");if(!e)return;this._chart&&(this._chart.destroy(),this._chart=null),e.innerHTML="";const t=[],s=[];for(const e of this._data){const i=new Date(e.last_changed).getTime()/1e3,o=parseFloat(e.state);isNaN(o)||(t.push(i),s.push(o))}if(0===t.length)return;const i={width:e.clientWidth||660,height:200,cursor:{show:!0},select:{show:!1},legend:{show:!1},axes:[{stroke:"rgba(255,255,255,0.2)",grid:{stroke:"rgba(255,255,255,0.05)",width:1},ticks:{stroke:"rgba(255,255,255,0.1)",width:1},font:"9px Segoe UI, sans-serif",values:(e,t)=>t.map(e=>{const t=new Date(1e3*e);return`${t.getHours()}:${String(t.getMinutes()).padStart(2,"0")}`})},{stroke:"rgba(255,255,255,0.2)",grid:{stroke:"rgba(255,255,255,0.05)",width:1},ticks:{stroke:"rgba(255,255,255,0.1)",width:1},font:"9px Segoe UI, sans-serif",size:40}],series:[{},{stroke:"#00D4FF",width:1.5,fill:"rgba(0,212,255,0.08)"}]};this._chart=new bn(i,[t,s],e)}_setHours(e){this.hours=e,this._fetchData()}_close(){this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}render(){return B`
      <div class="overlay" @click=${e=>{e.target===e.currentTarget&&this._close()}}>
        <div class="chart-container">
          <div class="chart-header">
            <div>
              <div class="chart-title">${this.attrName.replace(/_/g," ")}</div>
              <div class="chart-subtitle">${this.deviceId}</div>
            </div>
            <button class="close-btn" @click=${this._close}>✕</button>
          </div>
          <div class="time-range">
            ${[1,6,24,168].map(e=>B`
              <button class="range-btn ${this.hours===e?"active":""}"
                @click=${()=>this._setHours(e)}>
                ${e<=24?`${e}h`:"7d"}
              </button>
            `)}
          </div>
          ${this._loading?B`<div class="loading">Loading...</div>`:this._error?B`<div class="error">${this._error}</div>`:this._data&&0!==this._data.length||this._loading?B`<div class="chart-wrap"></div>`:B`<div class="no-data">No history data</div>`}
        </div>
      </div>
    `}}customElements.define("attribute-chart",vn);class _n extends le{static properties={attrName:{type:String},warnOp:{type:String},warnValue:{type:String},critOp:{type:String},critValue:{type:String},transform:{type:String},transforms:{type:Array},haExposed:{type:Boolean},pinned:{type:Boolean},thresholdSource:{type:String}};static styles=[ce,n`
    :host {
      position: absolute;
      top: calc(100% + 8px);
      left: 0;
      z-index: 100;
      font-family: var(--font-display);
    }
    .popover {
      width: 240px;
      background: #161630;
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 8px;
      padding: 12px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.6);
    }
    /* Arrow pointing up-left */
    .popover::before {
      content: '';
      position: absolute;
      top: -6px;
      left: 12px;
      width: 10px; height: 10px;
      background: #161630;
      border-left: 1px solid rgba(255,255,255,0.1);
      border-top: 1px solid rgba(255,255,255,0.1);
      transform: rotate(45deg);
    }

    .popover-title {
      font-size: 11px;
      font-weight: 600;
      color: #fff;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .popover-close {
      font-size: 14px;
      color: rgba(255,255,255,0.4);
      cursor: pointer;
      line-height: 1;
    }
    .popover-close:hover { color: #fff; }

    .divider {
      height: 1px;
      background: rgba(255,255,255,0.06);
      margin: 8px 0;
    }

    /* Threshold rows */
    .threshold-row {
      display: flex;
      align-items: center;
      gap: 4px;
      margin-bottom: 6px;
    }
    .threshold-row-label {
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      width: 32px;
      flex-shrink: 0;
      font-weight: 600;
    }
    .threshold-row-label.warn { color: rgba(255,183,77,0.7); }
    .threshold-row-label.crit { color: rgba(239,83,80,0.7); }

    .threshold-op {
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 3px;
      color: rgba(255,255,255,0.6);
      padding: 2px 4px;
      font-size: 11px;
      font-family: var(--font-data);
      cursor: pointer;
      appearance: none; -webkit-appearance: none; -moz-appearance: none;
    }
    .threshold-op option { background: #161630; color: #fff; }
    .threshold-op:hover, .threshold-op:focus { outline: none; color: #00D4FF; border-color: rgba(0,212,255,0.3); }

    .threshold-input {
      width: 52px;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 3px;
      color: rgba(255,255,255,0.6);
      padding: 2px 4px;
      font-size: 11px;
      font-family: var(--font-data);
      text-align: center;
    }
    .threshold-input:focus { outline: none; border-color: rgba(0,212,255,0.3); color: #fff; }
    .threshold-input::placeholder { color: rgba(255,255,255,0.15); }

    .threshold-source {
      font-size: 8px;
      color: rgba(255,255,255,0.25);
      margin-left: auto;
      font-style: italic;
    }

    /* Transform */
    .field-label {
      font-size: 9px;
      color: rgba(255,255,255,0.35);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
    }
    .transform-select {
      width: 100%;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 4px;
      color: rgba(255,255,255,0.6);
      padding: 4px 6px;
      font-size: 11px;
      font-family: var(--font-data);
      cursor: pointer;
      appearance: none; -webkit-appearance: none; -moz-appearance: none;
    }
    .transform-select option { background: #161630; color: #fff; }
    .transform-select:hover, .transform-select:focus { outline: none; border-color: rgba(0,212,255,0.3); color: #fff; }

    /* Toggle rows */
    .toggle-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 2px 0;
    }
    .toggle-label {
      font-size: 11px;
      color: rgba(255,255,255,0.6);
    }
    .toggle-wrap { cursor: pointer; flex-shrink: 0; }
    .toggle {
      width: 28px; height: 16px; border-radius: 8px;
      position: relative; transition: background 0.2s;
    }
    .toggle.on-green  { background: #04d65c; }
    .toggle.on-cyan   { background: #00D4FF; }
    .toggle.off       { background: #444; }
    .toggle-knob {
      width: 12px; height: 12px; border-radius: 50%; background: #fff;
      position: absolute; top: 2px; transition: left 0.2s;
    }
    .toggle.on-green .toggle-knob,
    .toggle.on-cyan  .toggle-knob { left: 14px; }
    .toggle.off .toggle-knob      { left: 2px; }

    /* View History link */
    .view-history {
      font-size: 11px;
      color: var(--accent);
      cursor: pointer;
      text-decoration: none;
    }
    .view-history:hover {
      text-decoration: underline;
    }
  `];constructor(){super(),this.attrName="",this.warnOp=">",this.warnValue="",this.critOp=">",this.critValue="",this.transform="",this.transforms=[],this.haExposed=!1,this.pinned=!1,this.thresholdSource=""}render(){const e=this.attrName.replace(/_/g," ");return B`
      <div class="popover" @click=${e=>e.stopPropagation()}>
        <div class="popover-title">
          <span>${e} Settings</span>
          <span class="popover-close" @click=${this._onClose}>&times;</span>
        </div>

        <!-- Warning threshold -->
        <div class="threshold-row">
          <span class="threshold-row-label warn">warn</span>
          <select class="threshold-op"
            aria-label="Warning threshold operator"
            .value=${this.warnOp||">"}
            @change=${e=>this._onWarnChanged(this.warnValue,e.target.value)}>
            <option value=">">&gt;</option>
            <option value="<">&lt;</option>
            <option value=">=">&gt;=</option>
            <option value="<=">&lt;=</option>
          </select>
          <input class="threshold-input" type="number"
            aria-label="Warning threshold value"
            placeholder="\u2014"
            .value=${this.warnValue||""}
            @change=${e=>this._onWarnChanged(e.target.value,this.warnOp||">")}>
          ${this.thresholdSource&&"device"!==this.thresholdSource?B`
            <span class="threshold-source">${this.thresholdSource}</span>
          `:""}
        </div>

        <!-- Critical threshold -->
        <div class="threshold-row">
          <span class="threshold-row-label crit">crit</span>
          <select class="threshold-op"
            aria-label="Critical threshold operator"
            .value=${this.critOp||">"}
            @change=${e=>this._onCritChanged(this.critValue,e.target.value)}>
            <option value=">">&gt;</option>
            <option value="<">&lt;</option>
            <option value=">=">&gt;=</option>
            <option value="<=">&lt;=</option>
          </select>
          <input class="threshold-input" type="number"
            aria-label="Critical threshold value"
            placeholder="\u2014"
            .value=${this.critValue||""}
            @change=${e=>this._onCritChanged(e.target.value,this.critOp||">")}>
        </div>

        <div class="divider"></div>

        <!-- Transform -->
        <div class="field-label">Transform</div>
        <select class="transform-select"
          aria-label="Value transform"
          .value=${this.transform||""}
          @change=${e=>this._onTransformChanged(e.target.value)}>
          ${(this.transforms||[]).map(e=>B`
            <option value=${e.value} ?selected=${e.value===this.transform}>${e.label}</option>
          `)}
        </select>

        <div class="divider"></div>

        <!-- HA Exposure toggle -->
        <div class="toggle-row">
          <span class="toggle-label">HA Exposure</span>
          <span class="toggle-wrap"
            role="switch"
            aria-checked=${this.haExposed?"true":"false"}
            aria-label="Expose to Home Assistant"
            tabindex="0"
            @click=${this._onToggleHA}
            @keydown=${e=>("Enter"===e.key||" "===e.key)&&this._onToggleHA()}>
            <div class="toggle ${this.haExposed?"on-green":"off"}">
              <div class="toggle-knob"></div>
            </div>
          </span>
        </div>

        <!-- Pin to Card toggle -->
        <div class="toggle-row" style="margin-top: 6px;">
          <span class="toggle-label">Pin to Card</span>
          <span class="toggle-wrap"
            role="switch"
            aria-checked=${this.pinned?"true":"false"}
            aria-label="Pin attribute to card"
            tabindex="0"
            @click=${this._onTogglePin}
            @keydown=${e=>("Enter"===e.key||" "===e.key)&&this._onTogglePin()}>
            <div class="toggle ${this.pinned?"on-cyan":"off"}">
              <div class="toggle-knob"></div>
            </div>
          </span>
        </div>

        <div class="divider"></div>

        <!-- View History -->
        <span class="view-history" @click=${this._onViewHistory}>View History</span>
      </div>
    `}_fire(e,t={}){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}_onWarnChanged(e,t){this._fire("threshold-changed",{name:this.attrName,value:e,op:t})}_onCritChanged(e,t){this._fire("crit-threshold-changed",{name:this.attrName,value:e,op:t})}_onTransformChanged(e){this._fire("transform-changed",{attr:this.attrName,transform:e||null})}_onToggleHA(){this._fire("ha-exposure-toggled",{name:this.attrName})}_onTogglePin(){this._fire("pin-attribute",{name:this.attrName,pinned:!this.pinned})}_onViewHistory(){this._fire("view-history",{name:this.attrName})}_onClose(){this._fire("close-popover")}}customElements.define("attribute-popover",_n);class xn extends le{static properties={device:{type:Object},effectiveSettings:{type:Object},haOverrides:{type:Object},groups:{type:Object},cardAttributes:{type:Array},attributeTransforms:{type:Object},groupTransforms:{type:Object},_showHidden:{type:Boolean,state:!0},_expandedChart:{type:String,state:!0},_openPopover:{type:String,state:!0}};static styles=[ce,n`
    :host { font-family: var(--font-display); }
    /* Attributes section */
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
    .attr-tile.ok { border: 1px solid #04d65c; }
    .attr-tile.exceeded { border: 1px solid #ffb74d; }
    .attr-tile.critical { border: 1px solid #ef5350; }
    .attr-label {
      font-size: 10px; color: #fff; text-transform: uppercase;
      letter-spacing: 0.5px; display: flex; align-items: center; gap: 4px;
    }
    .attr-pin {
      font-size: 10px; cursor: pointer; opacity: 0.3;
      transition: opacity 0.15s; line-height: 1; user-select: none;
    }
    .attr-pin:hover { opacity: 0.7; }
    .attr-pin.pinned { opacity: 1; }
    .attr-delete {
      position: absolute; top: 6px; right: 8px;
      font-size: 14px; color: #fff; cursor: pointer; line-height: 1;
    }
    .attr-delete:hover { color: #ef5350; }
    .val-row {
      display: flex; justify-content: space-between; align-items: baseline; margin-top: 4px;
    }
    .attr-val {
      font-size: 18px; font-weight: 700; color: #00D4FF;
      font-family: var(--font-data); transition: color 0.2s;
    }
    .attr-val.exceeded-val { color: #ffb74d; }
    .attr-val.critical-val { color: #ef5350; }
    .attr-unit { font-size: 11px; color: rgba(255,255,255,0.5); font-weight: 400; }
    .attr-cog {
      font-size: 14px; color: rgba(255,255,255,0.55); cursor: pointer;
      transition: color 0.2s; user-select: none;
    }
    .attr-cog:hover { color: #00D4FF; }
    .attr-cog.active { color: #00D4FF; }
    .popover-anchor { position: relative; }

    @media (max-width: 768px) {
      .attr-grid { grid-template-columns: 1fr; }
    }
  `];constructor(){super(),this.device=null,this.effectiveSettings=null,this.haOverrides={},this.groups={},this.cardAttributes=[],this.attributeTransforms={},this.groupTransforms={},this._showHidden=!1,this._expandedChart=null,this._openPopover=null,this._onDocClick=this._onDocClick.bind(this)}_isExposed(e){if(void 0!==this.haOverrides[e])return this.haOverrides[e];const t=this.effectiveSettings;return void 0!==t?.ha_exposure_overrides?.[e]?t.ha_exposure_overrides[e]:"all"===t?.ha_exposure||!!t?.ha_exposed_attributes?.includes(e)}_getThresholdForAttr(e){const t=this.effectiveSettings;if(!t)return null;const s=(t.thresholds||{})[e];if(null==s)return null;const i="object"==typeof s?s.value:s;if(null==i)return null;const o=this.device?.threshold_overrides||{},n=this.device?.group_policy,r=n?this.groups[n]:null;let a="global";return null!=o[e]?a="device":null!=r?.thresholds?.[e]&&(a="Group Policy"),{value:i,source:a}}_checkThreshold(e,t){if(!t||null==e||"number"!=typeof e)return!1;const s="object"==typeof t?t.value:t,i="object"==typeof t&&t.op||">";if(null==s)return!1;switch(i){case">":default:return e>s;case"<":return e<s;case">=":return e>=s;case"<=":return e<=s;case"==":return e===s;case"!=":return e!==s}}_getThresholdOp(e){const t=(this.device?.threshold_overrides||{})[e];if(null!=t&&"object"==typeof t)return t.op||">";const s=this.effectiveSettings;if(!s)return">";const i=(s.thresholds||{})[e];return null!=i&&"object"==typeof i&&i.op||">"}_getThresholdVal(e){const t=(this.device?.threshold_overrides||{})[e];if(null!=t)return"object"==typeof t?t.value:t;const s=this._getThresholdForAttr(e);return s?s.value:null}_getCritThresholdOp(e){const t=(this.device?.crit_threshold_overrides||{})[e];return null!=t&&"object"==typeof t&&t.op||">"}_getCritThresholdVal(e){const t=(this.device?.crit_threshold_overrides||{})[e];return null!=t?"object"==typeof t?t.value:t:null}render(){if(!this.device)return B``;const e=Object.entries(this.device.attributes||{}).sort(([e],[t])=>e.localeCompare(t)),t=this.device.hidden_attributes||[],s=e.filter(([e])=>!t.includes(e)),i=e.filter(([e])=>t.includes(e));return 0===e.length?B``:B`
      <div class="section">
        <div class="section-title">Attributes</div>
        <div class="attr-grid">
          ${s.map(([e,t])=>this._renderAttrTile(e,t))}
        </div>
        ${i.length>0?B`
          <div style="margin-top: 12px;">
            <div style="font-size: 10px; color: #fff; margin-bottom: 6px; cursor: pointer;"
              @click=${()=>this._showHidden=!this._showHidden}>
              ${this._showHidden?"▾":"▸"} ${i.length} hidden attribute${1!==i.length?"s":""}
            </div>
            ${this._showHidden?B`
              <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                ${i.map(([e])=>B`
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
    `}_renderAttrTile(e,t){const s=this._isExposed(e),i=this._getThresholdForAttr(e),o=null!=t.value?t.value:null,n=(this.device?.threshold_overrides||{})[e],r=null!=n?n:i?i.value:null,a=this._checkThreshold(o,r),l=this._getThresholdOp(e),d=this._getThresholdVal(e),c=(this.cardAttributes||[]).includes(e),p=(this.attributeTransforms||{})[e]||"",h=this._getCritThresholdOp(e),u=this._getCritThresholdVal(e),g=this.device?.crit_threshold_overrides||{},f=null!=g[e]?g[e]:null,m=this._checkThreshold(o,f),b=m?"critical":a?"exceeded":null!=r||null!=f?"ok":"",v=m?"critical-val":a?"exceeded-val":"",_=this._openPopover===e,x=i&&"device"!==i.source&&null==n?i.source:"";return B`
      <div class="attr-tile ${b}">
        <span class="attr-label">${e.replace(/_/g," ")}
          <span class="attr-pin ${c?"pinned":""}"
            title="${c?"Unpin from card":"Pin to card"}"
            @click=${t=>{t.stopPropagation(),this._togglePin(e)}}>&#x1F4CC;</span>
        </span>
        <span class="attr-delete" title="Remove attribute"
          @click=${()=>this._onDelete(e)}>&times;</span>
        <div class="val-row">
          <div class="attr-val ${v}">
            ${this._formatValue(o,t.unit,p)}
          </div>
          <div class="popover-anchor">
            <span class="attr-cog ${_?"active":""}"
              title="Settings"
              @click=${t=>{t.stopPropagation(),this._togglePopover(e)}}>&#x2699;</span>
            ${_?B`
              <attribute-popover
                .attrName=${e}
                .warnOp=${l}
                .warnValue=${null!=d?String(d):""}
                .critOp=${h}
                .critValue=${null!=u?String(u):""}
                .transform=${p}
                .transforms=${function(){const e=ge.map(e=>({value:e.id,label:e.name}));return[...me,...e]}()}
                .haExposed=${s}
                .pinned=${c}
                .thresholdSource=${x}
                @view-history=${t=>{t.stopPropagation(),this._expandedChart=e,this._openPopover=null}}
                @close-popover=${()=>{this._openPopover=null}}
              ></attribute-popover>
            `:""}
          </div>
        </div>
        ${this._expandedChart===e?B`
          <attribute-chart
            .deviceId=${this.device?.device_id||""}
            .attrName=${e}
            @close=${()=>{this._expandedChart=null}}
          ></attribute-chart>
        `:""}
      </div>
    `}connectedCallback(){super.connectedCallback(),document.addEventListener("click",this._onDocClick)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._onDocClick)}_onDocClick(){this._openPopover&&(this._openPopover=null)}_togglePopover(e){this._openPopover=this._openPopover===e?null:e}_onDelete(e){this.dispatchEvent(new CustomEvent("attribute-deleted",{detail:{name:e},bubbles:!0,composed:!0}))}_onUnhide(e){this.dispatchEvent(new CustomEvent("attribute-unhidden",{detail:{name:e},bubbles:!0,composed:!0}))}_onToggleExposure(e){this.dispatchEvent(new CustomEvent("ha-exposure-toggled",{detail:{name:e},bubbles:!0,composed:!0}))}_onThresholdChange(e,t,s){this.dispatchEvent(new CustomEvent("threshold-changed",{detail:{name:e,value:t,op:s},bubbles:!0,composed:!0}))}_onCritThresholdChange(e,t,s){this.dispatchEvent(new CustomEvent("crit-threshold-changed",{detail:{name:e,value:t,op:s},bubbles:!0,composed:!0}))}_formatValue(e,t,s){if(null==e)return"—";if(s){return ue(e,s)}return B`${e}<span class="attr-unit">${t||""}</span>`}_onTransformChange(e,t){this.dispatchEvent(new CustomEvent("transform-changed",{detail:{attr:e,transform:t||null},bubbles:!0,composed:!0}))}_togglePin(e){this.dispatchEvent(new CustomEvent("pin-attribute",{detail:{name:e,pinned:!(this.cardAttributes||[]).includes(e)},bubbles:!0,composed:!0}))}}customElements.define("device-attributes",xn);const yn=["shutdown","halt","poweroff","destroy"];class wn extends le{static properties={device:{type:Object},serverCommands:{type:Object},commandResult:{type:String},_showHiddenCmds:{type:Boolean,state:!0},_showAddCommand:{type:Boolean,state:!0},_editingCommandName:{type:String,state:!0},_editCommandForm:{type:Object,state:!0}};static styles=[ce,n`
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
  `];constructor(){super(),this.device=null,this.serverCommands={},this.commandResult="",this._showHiddenCmds=!1,this._showAddCommand=!1,this._editingCommandName=null,this._editCommandForm=null}render(){if(!this.device)return B``;const e=this.device.allowed_commands||[],t=this.serverCommands||{},s=Object.keys(t),i=[...new Set([...e,...s])],o=this.device.hidden_commands||[],n=i.filter(e=>!o.includes(e)),r=i.filter(e=>o.includes(e)),a=(this.device.active_plugins||[]).includes("custom_command");return B`
      <div class="section">
        <div class="section-title">Commands</div>

        ${n.length>0?B`
          <div class="commands" style="margin-bottom: 12px;">
            ${n.map(e=>B`
              <span class="cmd-wrap">
                <button class="cmd-btn ${function(e){const t=e.toLowerCase();return yn.some(e=>t.includes(e))}(e)?"danger":""}"
                  @click=${()=>this._onSend(e)}>${e}</button>
                <span class="cmd-eye" title="Hide command"
                  @click=${t=>{t.stopPropagation(),this._onHide(e)}}>&#128065;</span>
              </span>
            `)}
          </div>
        `:""}
        ${this.commandResult?B`<div class="cmd-result">${this.commandResult}</div>`:""}

        ${s.length>0?B`
          <div style="margin-top: 8px; font-size: 11px; color: #fff; margin-bottom: 6px;">Server-managed commands</div>
          <table class="sensor-table">
            <thead><tr><th>Name</th><th>Shell Command</th><th></th></tr></thead>
            <tbody>
              ${Object.entries(t).map(([e,t])=>B`
                <tr>
                  <td>${e}</td>
                  <td class="mono">${t}</td>
                  <td>
                    <div class="sensor-actions">
                      ${a?B`<button class="sensor-btn edit" @click=${()=>this._startEdit(e,t)}>Edit</button>`:""}
                      <button class="sensor-btn remove" @click=${()=>this._onRemove(e)}>Delete</button>
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
        `:a?B`
          <button class="add-btn" @click=${this._startAdd}>+ Add Command</button>
        `:""}

        ${r.length>0?B`
          <div style="margin-top: 12px;">
            <div style="font-size: 10px; color: #fff; margin-bottom: 6px; cursor: pointer;"
              @click=${()=>this._showHiddenCmds=!this._showHiddenCmds}>
              ${this._showHiddenCmds?"▾":"▸"} ${r.length} hidden
            </div>
            ${this._showHiddenCmds?B`
              <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                ${r.map(e=>B`
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
    `}_startAdd(){this._showAddCommand=!0,this._editingCommandName=null,this._editCommandForm={name:"",shell:""}}_startEdit(e,t){this._editingCommandName=e,this._showAddCommand=!1,this._editCommandForm={name:e,shell:t}}_saveForm(){const e=this._editCommandForm;if(!e)return;const t=(e.name||"").trim(),s=(e.shell||"").trim();t&&s&&(this.dispatchEvent(new CustomEvent("server-command-save",{detail:{name:t,shell:s,editing:this._editingCommandName},bubbles:!0,composed:!0})),this._cancelForm())}_cancelForm(){this._showAddCommand=!1,this._editingCommandName=null,this._editCommandForm=null}_onSend(e){this.dispatchEvent(new CustomEvent("command-send",{detail:{command:e},bubbles:!0,composed:!0}))}_onHide(e){this.dispatchEvent(new CustomEvent("command-hide",{detail:{name:e},bubbles:!0,composed:!0}))}_onUnhide(e){this.dispatchEvent(new CustomEvent("command-unhide",{detail:{name:e},bubbles:!0,composed:!0}))}_onRemove(e){this.dispatchEvent(new CustomEvent("server-command-remove",{detail:{name:e},bubbles:!0,composed:!0}))}}customElements.define("device-commands",wn);class $n extends le{static properties={device:{type:Object},configInterval:{type:Number},customSensors:{type:Object},_showAddSensor:{type:Boolean,state:!0},_editSensorKey:{type:String,state:!0},_sensorForm:{type:Object,state:!0}};static styles=[ce,n`
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
  `];constructor(){super(),this.device=null,this.configInterval=30,this.customSensors={},this.pushing=!1,this.pushStatus="",this.lastPushed="",this._showAddSensor=!1,this._editSensorKey=null,this._sensorForm={name:"",command:"",interval:30,unit:""}}render(){if(!this.device)return B``;const e=this.device.remote_config||{},t=this.device.active_plugins||(e.plugins?Object.keys(e.plugins):[]),s=this.customSensors;return B`
      <div class="section">
        <div class="section-title">Agent Configuration</div>

        <div class="config-row">
          <span class="config-label">Collection interval</span>
          <input class="config-input" type="number" min="5"
            .value=${String(this.configInterval)}
            @input=${e=>this._onIntervalChange(Number(e.target.value))}>
          <span style="font-size: 12px; color: #fff; margin-left: 4px;">seconds</span>
        </div>

        ${t.length>0?B`
          <div class="config-row">
            <span class="config-label">Active plugins</span>
            <div class="plugins-list">
              ${t.map(e=>B`<span class="plugin-badge">${e}</span>`)}
            </div>
          </div>
        `:""}

        <div style="margin-bottom: 10px;">
          <div class="section-title" style="margin-bottom: 8px;">Custom Sensors</div>
          ${Object.keys(s).length>0?B`
            <table class="sensor-table">
              <thead>
                <tr>
                  <th>Name</th><th>Command</th><th>Interval</th><th>Unit</th><th></th>
                </tr>
              </thead>
              <tbody>
                ${Object.entries(s).map(([e,t])=>B`
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
          `:B`<div style="font-size: 13px; color: #fff; margin-bottom: 10px;">No custom sensors</div>`}

          ${this._showAddSensor||this._editSensorKey?this._renderSensorForm():B`
            <button class="cmd-btn" style="font-size: 12px; padding: 5px 12px;"
              @click=${this._startAdd}>+ Add Sensor</button>
          `}
        </div>


      </div>
    `}_renderSensorForm(){const e=this._sensorForm;return B`
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
    `}_startAdd(){this._showAddSensor=!0,this._editSensorKey=null,this._sensorForm={name:"",command:"",interval:30,unit:""}}_startEdit(e,t){this._editSensorKey=e,this._showAddSensor=!1,this._sensorForm={name:e,command:t.command,interval:t.interval||30,unit:t.unit||""}}_saveForm(){const{name:e,command:t,interval:s,unit:i}=this._sensorForm;e.trim()&&t.trim()&&(this.dispatchEvent(new CustomEvent("sensor-save",{detail:{key:e.trim(),sensor:{command:t,interval:s||30,unit:i},oldKey:this._editSensorKey},bubbles:!0,composed:!0})),this._cancelForm())}_cancelForm(){this._showAddSensor=!1,this._editSensorKey=null,this._sensorForm={name:"",command:"",interval:30,unit:""}}_onIntervalChange(e){this.dispatchEvent(new CustomEvent("interval-changed",{detail:{value:e},bubbles:!0,composed:!0}))}_onRemove(e){this.dispatchEvent(new CustomEvent("sensor-remove",{detail:{key:e},bubbles:!0,composed:!0}))}}customElements.define("device-config",$n);class kn extends le{static properties={_open:{type:Boolean,state:!0},_type:{type:String,state:!0},_title:{type:String,state:!0},_message:{type:String,state:!0},_placeholder:{type:String,state:!0},_confirmLabel:{type:String,state:!0},_confirmDanger:{type:Boolean,state:!0},_inputValue:{type:String,state:!0}};static styles=[ce,n`
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
  `];constructor(){super(),this._open=!1,this._type="confirm",this._title="",this._message="",this._placeholder="",this._confirmLabel="",this._confirmDanger=!1,this._inputValue="",this._resolve=null}show({type:e="confirm",title:t="",message:s="",placeholder:i="",defaultValue:o="",confirmLabel:n="",confirmDanger:r=!1}={}){return this._type=e,this._title=t,this._message=s,this._placeholder=i,this._confirmLabel=n||("prompt"===e?"Submit":"Confirm"),this._confirmDanger=r,this._inputValue=o,this._open=!0,new Promise(e=>{this._resolve=e})}_cancel(){this._open=!1,this._resolve&&(this._resolve("prompt"===this._type&&null),this._resolve=null)}_confirm(){this._open=!1,this._resolve&&(this._resolve("prompt"!==this._type||this._inputValue),this._resolve=null)}_onKeyDown(e){"Enter"===e.key&&(e.preventDefault(),this._confirm())}_onInput(e){this._inputValue=e.target.value}updated(e){e.has("_open")&&this._open&&"prompt"===this._type&&this.updateComplete.then(()=>{const e=this.renderRoot.querySelector(".dialog-input");e&&e.focus()})}render(){if(!this._open)return B``;const e=this._confirmDanger?"btn btn-confirm danger":"btn btn-confirm";return B`
      <div class="overlay" @click=${this._cancel}>
        <div class="dialog" @click=${e=>e.stopPropagation()}>
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
            <button class=${e} @click=${this._confirm}>${this._confirmLabel}</button>
          </div>
        </div>
      </div>
    `}}customElements.define("themed-dialog",kn);class Sn extends le{static properties={deviceId:{type:String},groupId:{type:String},device:{type:Object},commandResult:{type:String},_groups:{type:Object,state:!0},_effectiveSettings:{type:Object,state:!0},_haOverrides:{type:Object,state:!0},_configInterval:{type:Number,state:!0},_customSensors:{type:Object,state:!0},_showGroupDialog:{type:Boolean,state:!0},_newGroupName:{type:String,state:!0},_serverCommands:{type:Object,state:!0}};static styles=[ce,n`
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
    .title[contenteditable] { cursor: text; border-bottom: 1px dashed rgba(255,255,255,0.3); }
    .title[contenteditable]:focus { outline: none; border-bottom-color: #00D4FF; }
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
  `];constructor(){super(),this.device=null,this.commandResult="",this._groups={},this._effectiveSettings=null,this._haOverrides={},this._configInterval=30,this._customSensors={},this._showGroupDialog=!1,this._newGroupName="",this._serverCommands={},this._loading=!1}get _isGroupMode(){return!!this.groupId&&!this.deviceId}connectedCallback(){super.connectedCallback(),this._loadGroups(),this._isGroupMode?this._loadGroupAggregate():this._loadDevice(),this._wsUnsub=pe.onMessage(e=>{if("device_update"===e.type){if(this._isGroupMode)return;e.device_id===this.deviceId&&this._updateDeviceData(e.device)}})}disconnectedCallback(){super.disconnectedCallback(),this._wsUnsub&&this._wsUnsub()}async _refreshDevice(){try{const e=await $e(this.deviceId);this._updateDeviceData(e)}catch(e){}}_updateDeviceData(e){if(!e)return;if(this._loading)return;const t={...this.device||{},...e},s=this.device;s&&s.status===t.status&&s.last_seen===t.last_seen&&Object.keys(t.attributes||{}).length===Object.keys(s.attributes||{}).length||(this.device=t)}async _loadGroupAggregate(){try{const e=await Pe();this._groups=e;const t=e[this.groupId];if(!t)return;const s=await we(),i=t.device_ids||[],o=i.map(e=>s[e]).filter(Boolean),n={};for(const e of o)for(const[t,s]of Object.entries(e.attributes||{}))n[t]||(n[t]={...s});const r=new Set;for(const e of o)for(const t of e.allowed_commands||[])r.add(t);const a=new Set;for(const e of o)for(const t of e.active_plugins||[])a.add(t);a.add("custom_command"),this.device={device_name:t.name,device_type:`Group · ${i.length} device${1!==i.length?"s":""}`,status:o.some(e=>"online"===e.status)?"online":"offline",attributes:n,attribute_transforms:t.attribute_transforms||{},threshold_overrides:t.thresholds||{},crit_threshold_overrides:t.crit_thresholds||{},allowed_commands:[...r],hidden_commands:t.hidden_commands||[],hidden_attributes:t.hidden_attributes||[],card_attributes:t.card_attributes||[],active_plugins:[...a],tags:[],server_tags:[],group_policy:this.groupId,_isGroupAggregate:!0},this._configInterval=t.interval??30,this._serverCommands={},this._customSensors=t.custom_sensors||{},this._haOverrides={},this._effectiveSettings=null}catch(e){console.error("Failed to load group aggregate:",e)}}async _refreshGroupAggregate(){try{const e=(await Pe())[this.groupId];if(!e)return;const t=await we(),s=(e.device_ids||[]).map(e=>t[e]).filter(Boolean),i={};for(const e of s)for(const[t,s]of Object.entries(e.attributes||{}))i[t]||(i[t]={...s});this.device={...this.device,attributes:i},this._groups={...this._groups,[this.groupId]:e},this._customSensors=e.custom_sensors||{},this.requestUpdate()}catch(e){}}async _loadDevice(){this._loading=!0;try{this.device=await $e(this.deviceId),this._haOverrides={...this.device.ha_exposure_overrides||{}};const e=this.device.server_commands;this._serverCommands=e&&!Array.isArray(e)?{...e}:{},this._configInterval=this.device.config_interval??this.device.collection_interval??this.device.remote_config?.interval??30;const t=this.device.server_sensors;this._customSensors=t&&"object"==typeof t?{...t}:{};try{this._effectiveSettings=await Je(this.deviceId)}catch(e){}}catch(e){console.error("Failed to load device:",e)}finally{this._loading=!1}}async _loadGroups(){try{this._groups=await Pe()}catch(e){console.error("Failed to load groups:",e)}}render(){if(!this.device)return B`<div style="padding: 40px; text-align: center; color: #fff;">Loading...</div>`;const e=this.device,t=this._isGroupMode,s="online"===e.status?"#04d65c":"offline"===e.status?"#ef5350":"#ffb74d";return B`
      <!-- 1. Header -->
      <div class="header">
        <div class="header-left">
          ${t?B`<span class="title" contenteditable="true"
                @blur=${e=>this._renameGroup(e.target.textContent.trim())}
                @keydown=${e=>{"Enter"===e.key&&(e.preventDefault(),e.target.blur())}}
                >${e.device_name||this.groupId}</span>`:B`<span class="title">${e.device_name||this.deviceId}</span>`}
          <span class="device-type">${e.device_type||""}${e.client_version?` · v${e.client_version}`:""}</span>
        </div>
        <div style="display: flex; align-items: center; gap: 10px;">
          ${t?B`
            <span style="font-size: 11px; color: rgba(255,255,255,0.4);">Group Policy Editor</span>
            <button class="cmd-btn" style="font-size: 10px; padding: 3px 8px; background: rgba(239,83,80,0.1); color: #ef5350; border: 1px solid rgba(239,83,80,0.2);"
              @click=${this._forceApplyGroup}>Force Apply</button>
          `:B`
            <span class="status-badge" style="background: ${s}20; color: ${s}">
              ${e.status}
            </span>
            <button class="cmd-btn danger" style="font-size: 11px; padding: 4px 10px;"
              @click=${this._deleteDevice}>Delete</button>
          `}
          <button class="close-btn" @click=${()=>this.dispatchEvent(new CustomEvent("back"))}>&#10005;</button>
        </div>
      </div>

      ${t?"":B`
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
        @attribute-deleted=${e=>this._deleteAttribute(e.detail.name)}
        @attribute-unhidden=${e=>this._unhideAttribute(e.detail.name)}
        @ha-exposure-toggled=${e=>this._toggleHaExposure(e.detail.name)}
        @threshold-changed=${e=>this._setThreshold(e.detail.name,e.detail.value,e.detail.op)}
        @crit-threshold-changed=${e=>this._setCritThreshold(e.detail.name,e.detail.value,e.detail.op)}
        @pin-attribute=${e=>this._toggleCardAttribute(e.detail)}
        @transform-changed=${e=>this._setAttributeTransform(e.detail.attr,e.detail.transform)}
      ></device-attributes>

      ${t?"":B`
        <!-- 5. Network -->
        ${this._renderNetwork()}
      `}

      <!-- 6. Commands -->
      <device-commands
        .device=${this.device}
        .serverCommands=${t?this._groups?.[this.groupId]?.custom_commands||{}:this._serverCommands}
        .commandResult=${this.commandResult}
        @command-send=${e=>this._sendCmd(e.detail.command)}
        @command-hide=${e=>this._hideCommand(e.detail.name)}
        @command-unhide=${e=>this._unhideCommand(e.detail.name)}
        @server-command-save=${e=>t?this._saveGroupCommand(e.detail):this._saveServerCommand(e.detail)}
        @server-command-remove=${e=>t?this._removeGroupCommand(e.detail.name):this._removeServerCommand(e.detail.name)}
      ></device-commands>

      <!-- 7. Agent Configuration -->
      <device-config
        .device=${this.device}
        .configInterval=${this._configInterval}
        .customSensors=${this._customSensors}
        @interval-changed=${e=>t?this._setGroupInterval(e.detail.value):this._onIntervalChange(e.detail.value)}
        @sensor-save=${e=>t?this._saveGroupSensor(e.detail):this._saveSensor(e.detail)}
        @sensor-remove=${e=>t?this._removeGroupSensor(e.detail.key):this._removeSensor(e.detail.key)}
      ></device-config>

      ${this._showGroupDialog?this._renderGroupDialog():""}
      <themed-dialog></themed-dialog>
    `}_renderTagsSection(){const e=this.device.tags||[],t=this.device.server_tags||[];return B`
      <div class="section">
        <div class="section-title">Tags</div>
        <div class="tags-row">
          ${e.map(e=>B`<span class="tag client">${e}</span>`)}
          ${t.map(e=>B`
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
    `}async _addTag(e){e&&(await Ge(this.deviceId,[e]),await this._loadDevice())}async _removeTag(e){await Re(this.deviceId,e),await this._loadDevice()}_renderGroupPolicy(){const e=Object.values(this._groups),t=this.device.group_policy||"";t&&this._groups[t];return B`
      <div class="section">
        <div class="section-title">Group Policy</div>
        <div class="group-policy-row">
          <select class="group-select"
            .value=${t}
            @change=${this._onGroupPolicyChange}>
            <option value="">None — use global defaults</option>
            ${e.map(e=>B`
              <option value=${e.id} ?selected=${e.id===t}>${e.name}</option>
            `)}
          </select>
        </div>


        <div class="group-hint">
          Group policy sets default thresholds and HA entity settings. Device-level overrides take priority.
          Manage groups in Settings.
        </div>
      </div>
    `}async _onGroupPolicyChange(e){const t=e.target.value||null;try{await Xe(this.deviceId,{group_policy:t}),await this._loadDevice()}catch(e){console.error("Failed to update group policy:",e)}}_renderGroupDialog(){return B`
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
    `}async _createGroup(){const e=this._newGroupName.trim();if(!e)return;const t=e.toLowerCase().replace(/[^a-z0-9]+/g,"_");await Ne(t,e,[this.deviceId]),this._newGroupName="",this._showGroupDialog=!1,await this._loadGroups(),await this._loadDevice()}async _renameGroup(e){if(!e||!this.groupId)return;const t=this._groups?.[this.groupId];if(t&&t.name!==e)try{await Oe(this.groupId,{...t,name:e}),this._groups={...this._groups,[this.groupId]:{...t,name:e}},this.device={...this.device,device_name:e}}catch(e){console.error("Failed to rename group:",e)}}_renderNetwork(){const e=this.device.network||{};return 0===Object.keys(e).length?B``:B`
      <div class="section">
        <div class="section-title">Network</div>
        <div class="network-grid">
          ${Object.entries(e).map(([e,t])=>B`
            <div class="net-item">
              <span class="net-label">${e}:</span>${t}
            </div>
          `)}
        </div>
      </div>
    `}async _deleteAttribute(e){if(this._isGroupMode){const t=[...this.device.hidden_attributes||[]];return t.includes(e)||t.push(e),this.device={...this.device,hidden_attributes:t},void await this._saveGroupUpdate({hidden_attributes:t})}const t=this.shadowRoot.querySelector("themed-dialog");if(await t.show({type:"confirm",title:"Hide Attribute",message:`Hide attribute "${e}"? Custom sensors will be removed from the client. Built-in attributes will be hidden.`,confirmLabel:"Hide",confirmDanger:!0}))try{await Se(this.deviceId,e);const t=this.device?.card_attributes||[];if(t.includes(e)){const s=t.filter(t=>t!==e);await Xe(this.deviceId,{card_attributes:s})}await this._loadDevice()}catch(e){console.error("Failed to hide attribute:",e)}}async _unhideAttribute(e){if(this._isGroupMode){const t=(this.device.hidden_attributes||[]).filter(t=>t!==e);return this.device={...this.device,hidden_attributes:t},void await this._saveGroupUpdate({hidden_attributes:t})}try{await Ce(this.deviceId,e),await this._loadDevice()}catch(e){console.error("Failed to unhide attribute:",e)}}async _toggleHaExposure(e){if(this._isGroupMode)return;const t=void 0!==this._haOverrides[e]?this._haOverrides[e]:void 0!==this._effectiveSettings?.ha_exposure_overrides?.[e]&&this._effectiveSettings.ha_exposure_overrides[e];this._haOverrides={...this._haOverrides,[e]:!t};try{await Xe(this.deviceId,{ha_exposure_overrides:this._haOverrides})}catch(e){console.error("Failed to update HA exposure:",e)}}async _setThreshold(e,t,s){if(this._isGroupMode)return this._setGroupThreshold(e,t,s);const i={...this.device.threshold_overrides||{}};""===t||null==t?delete i[e]:i[e]={op:s||">",value:Number(t)};try{await Xe(this.deviceId,{threshold_overrides:i}),this.device={...this.device,threshold_overrides:i},this._effectiveSettings=await Je(this.deviceId)}catch(e){console.error("Failed to set threshold:",e)}}async _setCritThreshold(e,t,s){if(this._isGroupMode)return this._setGroupCritThreshold(e,t,s);const i={...this.device.crit_threshold_overrides||{}};""===t||null==t?delete i[e]:i[e]={op:s||">",value:Number(t)};try{await Xe(this.deviceId,{crit_threshold_overrides:i}),this.device={...this.device,crit_threshold_overrides:i}}catch(e){console.error("Failed to set crit threshold:",e)}}_effectiveTransforms(){if(this._isGroupMode)return this.device?.attribute_transforms||{};const e=this.device?.group_policy,t=e?this._groups[e]:null;return{...t?.attribute_transforms||{},...this.device?.attribute_transforms||{}}}_groupTransforms(){if(this._isGroupMode)return{};const e=this.device?.group_policy,t=e?this._groups[e]:null;return t?.attribute_transforms||{}}async _setAttributeTransform(e,t){if(this._isGroupMode)return this._setGroupTransform(e,t);const s={...this.device?.attribute_transforms||{}};t?s[e]=t:delete s[e];try{await Xe(this.deviceId,{attribute_transforms:s}),this.device={...this.device,attribute_transforms:s}}catch(e){console.error("Failed to update attribute transform:",e)}}async _forceApplyGroup(){const e=this.shadowRoot.querySelector("themed-dialog");if(await e.show({type:"confirm",title:"Force Apply Group Policy",message:"This will clear all device-level overrides for every member and enforce the group policy. Devices can still be customized afterwards.",confirmLabel:"Force Apply",confirmDanger:!0}))try{await et(this.groupId),await this._loadGroupAggregate()}catch(e){console.error("Failed to force apply:",e)}}async _saveGroupUpdate(e){const t=this._groups?.[this.groupId];if(t)try{const s={...t,...e};await Oe(this.groupId,s),this._groups={...this._groups,[this.groupId]:s};const i=Object.assign({},this.device,e);this.device=i,this.requestUpdate()}catch(e){console.error("Failed to update group:",e)}}async _setGroupThreshold(e,t,s){const i={...this.device.threshold_overrides||{}};""===t||null==t?delete i[e]:i[e]={op:s||">",value:Number(t)},this.device={...this.device,threshold_overrides:i},await this._saveGroupUpdate({thresholds:i})}async _setGroupCritThreshold(e,t,s){const i={...this.device.crit_threshold_overrides||{}};""===t||null==t?delete i[e]:i[e]={op:s||">",value:Number(t)},this.device={...this.device,crit_threshold_overrides:i},await this._saveGroupUpdate({crit_thresholds:i})}async _setGroupInterval(e){this._configInterval=e,await this._saveGroupUpdate({interval:e})}async _saveGroupCommand({name:e,shell:t}){const s=this._groups?.[this.groupId],i={...s?.custom_commands||{},[e]:t};await this._saveGroupUpdate({custom_commands:i}),this._groups={...this._groups,[this.groupId]:{...s,custom_commands:i}},this.requestUpdate()}async _removeGroupCommand(e){const t=this._groups?.[this.groupId],s={...t?.custom_commands||{}};delete s[e],await this._saveGroupUpdate({custom_commands:s}),this._groups={...this._groups,[this.groupId]:{...t,custom_commands:s}},this.requestUpdate()}async _saveGroupSensor({key:e,sensor:t,oldKey:s}){const i={...this._customSensors};if(s&&s!==e){delete i[s];const e={...this.device.attributes};delete e[s],this.device={...this.device,attributes:e}}i[e]=t,this._customSensors={...i};const o={...this.device.attributes};o[e]={value:"--",unit:t.unit||""},this.device={...this.device,attributes:o},await this._saveGroupUpdate({custom_sensors:i}),this.requestUpdate(),setTimeout(()=>this._refreshGroupAggregate(),5e3)}async _removeGroupSensor(e){const t={...this._customSensors};delete t[e],this._customSensors={...t};const s={...this.device.attributes};delete s[e],this.device={...this.device,attributes:s},await this._saveGroupUpdate({custom_sensors:t}),this.requestUpdate()}async _setGroupTransform(e,t){const s={...this.device?.attribute_transforms||{}};t?s[e]=t:delete s[e],this.device={...this.device,attribute_transforms:s},await this._saveGroupUpdate({attribute_transforms:s})}async _toggleCardAttribute({name:e,pinned:t}){const s=[...this.device?.card_attributes||[]];let i;if(i=t?[...s,e]:s.filter(t=>t!==e),this._isGroupMode)return this.device={...this.device,card_attributes:i},void await this._saveGroupUpdate({card_attributes:i});try{await Xe(this.deviceId,{card_attributes:i}),this.device={...this.device,card_attributes:i}}catch(e){console.error("Failed to update card attributes:",e)}}async _sendCmd(e,t={}){if(!this._isGroupMode)try{this.commandResult=`Sending ${e}...`;const s=(await Me(this.deviceId,e,t)).request_id;this.commandResult=`Sent ${e}... waiting for response`;const i=Date.now(),o=()=>{const e=(this.device?.command_history||[]).find(e=>e.request_id===s);e?this.commandResult=`${e.status}: ${e.output||"(no output)"}`:Date.now()-i<1e4?setTimeout(o,500):this.commandResult="Command sent (no response received)"};setTimeout(o,500)}catch(e){this.commandResult=`Error: ${e.message}`}}async _hideCommand(e){if(this._isGroupMode){const t=[...this.device.hidden_commands||[]];return t.includes(e)||t.push(e),this.device={...this.device,hidden_commands:t},void await this._saveGroupUpdate({hidden_commands:t})}try{await Ee(this.deviceId,e),await this._loadDevice()}catch(e){console.error("Failed to hide command:",e)}}async _unhideCommand(e){if(this._isGroupMode){const t=(this.device.hidden_commands||[]).filter(t=>t!==e);return this.device={...this.device,hidden_commands:t},void await this._saveGroupUpdate({hidden_commands:t})}try{await Te(this.deviceId,e),await this._loadDevice()}catch(e){console.error("Failed to unhide command:",e)}}async _saveServerCommand({name:e,shell:t}){const{addServerCommand:s}=await Promise.resolve().then(function(){return rt});await s(this.deviceId,e,t),await this._loadDevice()}async _removeServerCommand(e){const{removeServerCommand:t}=await Promise.resolve().then(function(){return rt});await t(this.deviceId,e),await this._loadDevice()}async _saveSensor({key:e,sensor:t,oldKey:s}){const{addServerSensor:i,removeServerSensor:o}=await Promise.resolve().then(function(){return rt});s&&s!==e&&await o(this.deviceId,s),await i(this.deviceId,e,t),await this._loadDevice()}async _removeSensor(e){const{removeServerSensor:t}=await Promise.resolve().then(function(){return rt});await t(this.deviceId,e),await this._loadDevice()}async _onIntervalChange(e){const{setDeviceInterval:t}=await Promise.resolve().then(function(){return rt});await t(this.deviceId,e),await this._loadDevice()}async _deleteDevice(){const e=this.shadowRoot.querySelector("themed-dialog");if(await e.show({type:"confirm",title:"Delete Device",message:`Delete device "${this.device?.device_name||this.deviceId}"? This removes it from the registry. It will reappear if the client agent is still running.`,confirmLabel:"Delete",confirmDanger:!0}))try{await ke(this.deviceId),this.dispatchEvent(new CustomEvent("back"))}catch(e){console.error("Failed to delete device:",e)}}}customElements.define("device-detail",Sn);const Cn={online:"#04d65c",offline:"#ef5350",warning:"#ffb74d",inferred:"#00D4FF",unknown:"#666"};class En extends le{static properties={topology:{type:Object},layouts:{type:Object},selectedLayout:{type:String},editMode:{type:Boolean},linkMode:{type:Boolean},selectedNode:{type:String},nodePositions:{type:Object},manualEdges:{type:Array},_dragging:{type:String,state:!0},_linkSource:{type:String,state:!0},_error:{type:String,state:!0},_loading:{type:Boolean,state:!0},_selectedEdge:{type:Number,state:!0},_selectedDeviceData:{type:Object,state:!0},_dirty:{type:Boolean,state:!0},_layoutDropdownOpen:{type:Boolean,state:!0},_showLabelDialog:{type:Boolean,state:!0},_labelEdgeIndex:{type:Number,state:!0},hideAutoEdges:{type:Boolean},_viewBox:{type:Object,state:!0}};static styles=[ce,n`
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
    svg text, svg foreignObject {
      user-select: none;
      -webkit-user-select: none;
    }
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
  `];constructor(){super(),this.topology={nodes:[],edges:[]},this.layouts={},this.selectedLayout="",this.editMode=!1,this.linkMode=!1,this.selectedNode=null,this.nodePositions={},this.manualEdges=[],this._dragging=null,this._dragOffset={x:0,y:0},this._linkSource=null,this._error="",this._loading=!0,this._selectedEdge=-1,this._selectedDeviceData=null,this._commandResult="",this._dirty=!1,this._layoutDropdownOpen=!1,this._showLabelDialog=!1,this._labelEdgeIndex=-1,this._savedPositions=null,this._savedManualEdges=null,this.hideAutoEdges=!1,this._viewBox={x:0,y:0,width:900,height:500},this._isPanning=!1,this._panStart=null,this._pinchActive=!1,this._pinchAnchor0=null,this._pinchAnchor1=null,this._pinchPrevDist=0}connectedCallback(){super.connectedCallback(),this._loadTopology(),this._loadLayouts(),this._wsUnsub=pe.onMessage(e=>{"device_update"===e.type&&this._refreshNodeStatuses()}),this._onDocClick=e=>{if(this._layoutDropdownOpen){const t=this.shadowRoot?.querySelector(".layout-dropdown");t&&!e.composedPath().includes(t)&&(this._layoutDropdownOpen=!1)}},document.addEventListener("click",this._onDocClick)}disconnectedCallback(){super.disconnectedCallback(),this._wsUnsub&&this._wsUnsub(),this._onDocClick&&document.removeEventListener("click",this._onDocClick)}async _refreshNodeStatuses(){try{const e=await De();if(!e||!e.nodes)return;const t={};for(const s of e.nodes)t[s.id]=s.status;if(this.topology&&this.topology.nodes){let s=!1;const i=this.topology.nodes.map(e=>t[e.id]&&t[e.id]!==e.status?(s=!0,{...e,status:t[e.id]}):e);for(const t of e.nodes)this.topology.nodes.find(e=>e.id===t.id)||(i.push(t),s=!0);s&&(this.topology={...this.topology,nodes:i})}}catch(e){}}async _loadTopology(){try{this._loading=!0,this._error="";const e=await De();this.topology=e,this._autoLayout(),this._loading=!1}catch(e){console.error("Failed to load topology:",e),this._error=`Failed to load: ${e.message}`,this._loading=!1}}async _loadLayouts(){try{if(this.layouts=await Ae(),!this._layoutsLoaded){this._layoutsLoaded=!0;const e=Object.entries(this.layouts).find(([,e])=>e.isDefault);e&&(this.selectedLayout=e[0],this.nodePositions=e[1].positions||{},this.manualEdges=e[1].manualEdges||[],this.hideAutoEdges=e[1].hideAutoEdges||!1,e[1].viewBox&&(this._viewBox={...e[1].viewBox}))}}catch(e){console.error("Failed to load layouts:",e)}}_autoLayout(){const e=this.topology.nodes;if(!e.length)return;const t={...this.selectedLayout&&this.layouts[this.selectedLayout]&&this.layouts[this.selectedLayout].positions||{}},s=Math.ceil(Math.sqrt(e.length));e.forEach((e,i)=>{if(!t[e.id]){const o=i%s,n=Math.floor(i/s);t[e.id]={x:100+o*(800/(s+1)),y:80+100*n}}}),this.nodePositions=t,this.selectedLayout&&this.layouts[this.selectedLayout]&&(this.manualEdges=this.layouts[this.selectedLayout].manualEdges||[]),this._fitAll()}get _allEdges(){const e=this.hideAutoEdges?[]:this.topology.edges||[],t=this.manualEdges.map(e=>({...e,type:"manual"}));return[...e,...t]}_getNodeName(e){const t=this.topology.nodes.find(t=>t.id===e);return t&&t.name||e}render(){if(this._loading&&!this.topology.nodes.length)return B`<div style="padding: 40px; text-align: center; color: #fff;">Loading topology...</div>`;if(this._error)return B`<div style="padding: 40px; text-align: center; color: #ef5350;">${this._error}</div>`;const e=this.topology.nodes,t=this._allEdges,s=e.filter(e=>"online"===e.status).length,i=e.filter(e=>"offline"===e.status).length,o=e.filter(e=>"warning"===e.status).length;return B`
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
        <div class="status-counts">
          <span class="status-pill online">${s}</span>
          <span class="status-pill offline">${i}</span>
          <span class="status-pill warning">${o}</span>
        </div>
      </div>

      ${this.selectedNode&&!this.linkMode?this._renderDetailPanel():""}
      ${this.editMode&&this.manualEdges.length>0?this._renderManualEdgesList():""}
      ${this._showLabelDialog?this._renderLabelDialog():""}
      <themed-dialog></themed-dialog>
    `}_renderNode(e){const t=this.nodePositions[e.id]||{x:100,y:100},s=Cn[e.status]||Cn.unknown,i=this.selectedNode===e.id,o=this._linkSource===e.id,n=i||o?2.5:1.5,r=i?"4,2":o?"2,2":"none",a=o?"#ffb74d":s;if("gateway"===e.type)return H`
        <g transform="translate(${t.x}, ${t.y})"
          @click=${t=>this._onNodeClick(t,e.id)}
          @mousedown=${t=>this.editMode&&!this.linkMode&&this._onMouseDown(t,e.id)}
          @touchstart=${t=>this.editMode&&!this.linkMode&&this._onTouchNodeStart(t,e.id)}
          style="cursor:pointer">
          <circle r="22" fill="#1a1a2e" stroke="${a}" stroke-width="${n}"
            stroke-dasharray="${r}"/>
          <text text-anchor="middle" dy="4" fill="${a}" font-size="10">${e.name.substring(0,12)}</text>
        </g>
      `;const l=ut(e.type),d=(c=e.type,ct[ht(c)]);var c;return H`
      <g transform="translate(${t.x}, ${t.y})"
        @click=${t=>this._onNodeClick(t,e.id)}
        @mousedown=${t=>this.editMode&&!this.linkMode&&this._onMouseDown(t,e.id)}
        @touchstart=${t=>this.editMode&&!this.linkMode&&this._onTouchNodeStart(t,e.id)}
        style="cursor:pointer">
        <rect x="-45" y="-28" width="90" height="56" rx="6"
          fill="#1a1a2e" stroke="${a}" stroke-width="${n}"
          stroke-dasharray="${r}"/>
        <foreignObject x="-12" y="-26" width="24" height="24" style="color:${l}; pointer-events:none;">
          ${function(e){const t=ht(e);return lt[t](24)}(e.type)}
        </foreignObject>
        <text text-anchor="middle" dy="8" fill="${a}" font-size="10">
          ${(e.name||e.id).substring(0,12)}
        </text>
        <text text-anchor="middle" dy="20" fill="#666" font-size="8">${e.status}</text>
        ${d?H`
          <text x="40" y="-18" text-anchor="end" fill="${l}" font-size="7" font-weight="600" opacity="0.8">${d}</text>
        `:""}
      </g>
    `}_edgeGeometry(e){const t=this.nodePositions[e.source],s=this.nodePositions[e.target];if(!t||!s)return null;const i=s.x-t.x,o=s.y-t.y,n=Math.sqrt(i*i+o*o)||1,r=i/n,a=o/n;let l=-a,d=r;d>0&&(l=-l,d=-d);const c=this._boxExitDistance(r,a);return{from:t,to:s,ux:r,uy:a,perpX:l,perpY:d,len:n,srcDist:c+8,tgtDist:c+8}}_boxExitDistance(e,t){if(Math.abs(e)<.001)return 32;if(Math.abs(t)<.001)return 48;const s=48/Math.abs(e),i=32/Math.abs(t);return Math.min(s,i)}_renderEdgeLine(e,t){const s=this._edgeGeometry(e);if(!s)return H``;const i="manual"===e.type,o=i?"#00D4FF":"#555",n=i&&this._selectedEdge===t-(this.topology.edges?.length||0)?2.5:1.5,r=i?"none":"4,2";return H`
      <line x1="${s.from.x}" y1="${s.from.y}" x2="${s.to.x}" y2="${s.to.y}"
        stroke="${o}" stroke-width="${n}"
        stroke-dasharray="${r}"
        @click=${i&&this.editMode?()=>this._selectEdge(t-(this.topology.edges?.length||0)):null}
        style="${i&&this.editMode?"cursor:pointer":""}"/>
    `}_renderEdgeLabels(e,t){if(!e.label&&!e.sourceLabel&&!e.targetLabel)return H``;const s=this._edgeGeometry(e);if(!s)return H``;const{from:i,to:o,ux:n,uy:r,perpX:a,perpY:l,srcDist:d,tgtDist:c}=s,p=i.x+n*d,h=i.y+r*d,u=o.x-n*c,g=o.y-r*c,f=(i.x+o.x)/2+14*a,m=(i.y+o.y)/2+14*l;return H`
      ${e.label?H`
        <rect x="${f-3*e.label.length-3}" y="${m-9}"
          width="${6*e.label.length+6}" height="13" rx="2" fill="#0d0d1f" opacity="0.9"/>
        <text x="${f}" y="${m}" text-anchor="middle"
          fill="#888" font-size="9" style="pointer-events:none">${e.label}</text>
      `:H``}
      ${e.sourceLabel?H`
        <rect x="${p-2.5*e.sourceLabel.length-3}" y="${h-8}"
          width="${5*e.sourceLabel.length+6}" height="12" rx="2" fill="#0d0d1f" opacity="0.9"/>
        <text x="${p}" y="${h}" text-anchor="middle"
          fill="#00D4FF" font-size="8" style="pointer-events:none">${e.sourceLabel}</text>
      `:H``}
      ${e.targetLabel?H`
        <rect x="${u-2.5*e.targetLabel.length-3}" y="${g-8}"
          width="${5*e.targetLabel.length+6}" height="12" rx="2" fill="#0d0d1f" opacity="0.9"/>
        <text x="${u}" y="${g}" text-anchor="middle"
          fill="#00D4FF" font-size="8" style="pointer-events:none">${e.targetLabel}</text>
      `:H``}
    `}_renderLinkPreview(){if(!this._linkSource||!this._mousePos)return H``;const e=this.nodePositions[this._linkSource];return e?H`
      <line x1="${e.x}" y1="${e.y}" x2="${this._mousePos.x}" y2="${this._mousePos.y}"
        stroke="#ffb74d" stroke-width="1.5" stroke-dasharray="6,3" opacity="0.6"/>
    `:H``}_renderDetailPanel(){if(!this.selectedNode)return B``;const e=this.topology.nodes.find(e=>e.id===this.selectedNode);return e&&"gateway"!==e.type?B`
      <device-detail
        .deviceId=${this.selectedNode}
        @back=${()=>{this.selectedNode=null,this._selectedDeviceData=null}}
      ></device-detail>
    `:B`
        <div style="background: rgba(255,255,255,0.05); border-radius: 8px; padding: 14px; margin-top: 12px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 16px; font-weight: 600; color: #00D4FF;">${e?e.name:this.selectedNode}</span>
            <button class="tool-btn" @click=${()=>{this.selectedNode=null}}>✕</button>
          </div>
          <div style="color: #fff; font-size: 12px; margin-top: 4px;">${e?e.type:"unknown"}</div>
        </div>
      `}_renderManualEdgesList(){return B`
      <div class="edge-panel">
        <div class="edge-panel-header">
          <span style="font-size: 13px; color: rgba(255,255,255,0.8); font-weight: 600;">Manual Links</span>
        </div>
        <div class="edge-list">
          ${this.manualEdges.map((e,t)=>B`
            <div class="edge-item">
              <span>
                ${this._getNodeName(e.source)}
                ${e.sourceLabel?B`<span style="color: #00D4FF; font-size: 10px;"> [${e.sourceLabel}]</span>`:""}
                <span style="color: #fff;"> &#8594; </span>
                ${e.label?B`<span style="color: #fff; font-size: 10px;">(${e.label})</span><span style="color: #fff;"> &#8594; </span>`:""}
                ${e.targetLabel?B`<span style="color: #00D4FF; font-size: 10px;">[${e.targetLabel}] </span>`:""}
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
    `}_renderLayoutDropdown(){const e=this.selectedLayout&&this.layouts[this.selectedLayout]?this.layouts[this.selectedLayout].name:"Auto Discovery";return B`
      <div class="layout-dropdown">
        <button class="layout-trigger ${this._layoutDropdownOpen?"open":""}"
          @click=${e=>{e.stopPropagation(),this._layoutDropdownOpen=!this._layoutDropdownOpen}}>
          ${e}
        </button>
        ${this._layoutDropdownOpen?B`
          <div class="layout-menu">
            <div class="layout-option ${this.selectedLayout?"":"selected"}"
              @click=${()=>this._selectLayout("")}>Auto Discovery</div>
            ${Object.entries(this.layouts).map(([e,t])=>B`
              <div class="layout-option ${this.selectedLayout===e?"selected":""}"
                @click=${()=>this._selectLayout(e)}>
                ${t.name}
                ${t.isDefault?B`<span class="default-badge">default</span>`:""}
              </div>
            `)}
            <div class="layout-divider"></div>
            <div class="layout-option new-layout" @click=${this._createNewLayout}>+ New Layout</div>
          </div>
        `:""}
      </div>
    `}_renderLabelDialog(){const e=this.manualEdges[this._labelEdgeIndex];if(!e)return B``;const t=this._getNodeName(e.source),s=this._getNodeName(e.target);return B`
      <div class="save-overlay" @click=${this._cancelLabelDialog}>
        <div class="label-dialog" @click=${e=>e.stopPropagation()}>
          <h3>Link Labels</h3>
          <div class="subtitle">${t} &#8594; ${s}</div>

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
            <label>Target Interface (${s})</label>
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
    `}_onNodeClick(e,t){if(e.stopPropagation(),this.linkMode)this._handleLinkClick(t);else if(this._selectNode(t),!this.editMode){const e=this.topology?.nodes?.find(e=>e.id===t);e&&"gateway"!==e.type&&this.dispatchEvent(new CustomEvent("device-select",{detail:{deviceId:t},bubbles:!0,composed:!0}))}}_handleLinkClick(e){if(this._linkSource)if(this._linkSource===e)this._linkSource=null;else{const t=this.manualEdges.some(t=>t.source===this._linkSource&&t.target===e||t.source===e&&t.target===this._linkSource);t||(this.manualEdges=[...this.manualEdges,{source:this._linkSource,target:e,sourceLabel:"",label:"",targetLabel:""}],this._markDirty(),this._labelEdgeIndex=this.manualEdges.length-1,this._showLabelDialog=!0),this._linkSource=null}else this._linkSource=e}_enterEditMode(){this.editMode=!0,this._savedPositions=JSON.stringify(this.nodePositions),this._savedManualEdges=JSON.stringify(this.manualEdges),this._dirty=!1}_exitEditMode(){this.editMode=!1,this.linkMode=!1,this._linkSource=null,this._selectedEdge=-1,this._dirty=!1}_markDirty(){this.editMode&&(this._dirty=!0)}async _doneEditing(){if(this.selectedLayout)await this._saveToCurrentLayout(),this._exitEditMode();else{const e=this.shadowRoot.querySelector("themed-dialog"),t=await e.show({type:"prompt",title:"Save Layout",message:"Enter a name for this layout:",placeholder:"My Layout"});if(!t)return;await this._saveNewLayout(t),this._exitEditMode()}}_discardAndExit(){this._savedPositions&&(this.nodePositions=JSON.parse(this._savedPositions)),this._savedManualEdges&&(this.manualEdges=JSON.parse(this._savedManualEdges)),this._exitEditMode()}async _saveAsLayout(){const e=this.shadowRoot.querySelector("themed-dialog"),t=await e.show({type:"prompt",title:"Save As New Layout",message:"Enter a name for the new layout:",placeholder:"Layout copy"});t&&await this._saveNewLayout(t)}async _saveToCurrentLayout(){if(!this.selectedLayout||!this.layouts[this.selectedLayout])return;const e=this.layouts[this.selectedLayout];await ze({id:this.selectedLayout,name:e.name,positions:this.nodePositions,manualEdges:this.manualEdges,hideAutoEdges:this.hideAutoEdges,viewBox:this._viewBox,isDefault:e.isDefault||!1}),await this._loadLayouts(),this._dirty=!1,this._savedPositions=JSON.stringify(this.nodePositions),this._savedManualEdges=JSON.stringify(this.manualEdges)}async _saveNewLayout(e){const t=await ze({name:e,positions:this.nodePositions,manualEdges:this.manualEdges,hideAutoEdges:this.hideAutoEdges,viewBox:this._viewBox,isDefault:!1});this.selectedLayout=t.id,await this._loadLayouts(),this._dirty=!1,this._savedPositions=JSON.stringify(this.nodePositions),this._savedManualEdges=JSON.stringify(this.manualEdges)}_selectLayout(e){if(this._layoutDropdownOpen=!1,this.selectedLayout=e,e&&this.layouts[e]){const t=this.layouts[e];this.nodePositions=t.positions||{},this.manualEdges=t.manualEdges||[],this.hideAutoEdges=t.hideAutoEdges||!1,t.viewBox?this._viewBox=this._adaptViewBox(t.viewBox):this._fitAll()}else this.nodePositions={},this.manualEdges=[],this.hideAutoEdges=!1,this._autoLayout()}_createNewLayout(){this._layoutDropdownOpen=!1,this.selectedLayout="",this.nodePositions={},this.manualEdges=[],this.hideAutoEdges=!1,this._autoLayout(),this._enterEditMode()}_toggleLinkMode(){this.linkMode=!this.linkMode,this._linkSource=null,this.linkMode&&(this.selectedNode=null)}async _selectNode(e){if(this.selectedNode===e)return this.selectedNode=null,this._selectedDeviceData=null,void(this._commandResult="");this.selectedNode=e,this._selectedDeviceData=null,this._commandResult="";try{this._selectedDeviceData=await fetchDevice(e)}catch(e){this._selectedDeviceData={status:"inferred",attributes:{},tags:[]}}}async _sendCmd(e){if(this.selectedNode)try{this._commandResult=`Sending ${e}...`;const t=await sendCommand(this.selectedNode,e);this._commandResult=`Sent (request: ${t.request_id})`}catch(e){this._commandResult=`Error: ${e.message}`}}_selectEdge(e){this._selectedEdge=this._selectedEdge===e?-1:e}_labelEdge(e){this._labelEdgeIndex=e,this._showLabelDialog=!0}_saveLabelDialog(){const e=this.shadowRoot.querySelector(".label-dialog"),t=e.querySelector("#source-label").value,s=e.querySelector("#link-label").value,i=e.querySelector("#target-label").value,o=[...this.manualEdges];o[this._labelEdgeIndex]={...o[this._labelEdgeIndex],sourceLabel:t,label:s,targetLabel:i},this.manualEdges=o,this._markDirty(),this._showLabelDialog=!1,this._labelEdgeIndex=-1}_cancelLabelDialog(){this._showLabelDialog=!1,this._labelEdgeIndex=-1}_removeEdge(e){this.manualEdges=this.manualEdges.filter((t,s)=>s!==e),this._selectedEdge=-1,this._markDirty()}_onSvgMouseDown(e){if(!e.target.closest("g[transform]")){if(e.preventDefault(),this.linkMode)return this.linkMode=!1,this._linkSource=null,void(this._mousePos=null);this._isMousePanning=!0,this._mousePanStart={x:e.clientX,y:e.clientY},this._mousePanViewBox={...this._viewBox}}}_onMouseDown(e,t){this._dragging=t;const s=this.shadowRoot.querySelector("svg"),i=s.createSVGPoint();i.x=e.clientX,i.y=e.clientY;const o=i.matrixTransform(s.getScreenCTM().inverse()),n=this.nodePositions[t]||{x:0,y:0};this._dragOffset={x:o.x-n.x,y:o.y-n.y},e.preventDefault(),e.stopPropagation()}_onMouseMove(e){const t=this.shadowRoot.querySelector("svg"),s=t.createSVGPoint();s.x=e.clientX,s.y=e.clientY;const i=s.matrixTransform(t.getScreenCTM().inverse());if(this.linkMode&&this._linkSource&&(this._mousePos={x:i.x,y:i.y},this.requestUpdate()),this._isMousePanning){const s=t.getScreenCTM(),i=(e.clientX-this._mousePanStart.x)/s.a,o=(e.clientY-this._mousePanStart.y)/s.d;return void(this._viewBox={...this._mousePanViewBox,x:this._mousePanViewBox.x-i,y:this._mousePanViewBox.y-o})}this._dragging&&(this.nodePositions={...this.nodePositions,[this._dragging]:{x:i.x-this._dragOffset.x,y:i.y-this._dragOffset.y}})}_onWheel(e){if(!e.ctrlKey)return;e.preventDefault();const t=e.deltaY>0?1.1:.9;this._zoomAt(e.clientX,e.clientY,t)}_zoomAt(e,t,s){const i=this.shadowRoot.querySelector("svg");if(!i)return;const o=i.createSVGPoint();o.x=e,o.y=t;const n=o.matrixTransform(i.getScreenCTM().inverse()),r={...this._viewBox},a=Math.max(300,Math.min(2700,r.width*s)),l=Math.max(167,Math.min(1500,r.height*s)),d=a/r.width,c=l/r.height;r.x=n.x-(n.x-r.x)*d,r.y=n.y-(n.y-r.y)*c,r.width=a,r.height=l,this._viewBox=r}_zoomIn(){const e=this.shadowRoot.querySelector("svg")?.getBoundingClientRect();e&&this._zoomAt(e.left+e.width/2,e.top+e.height/2,.8)}_zoomOut(){const e=this.shadowRoot.querySelector("svg")?.getBoundingClientRect();e&&this._zoomAt(e.left+e.width/2,e.top+e.height/2,1.25)}_adaptViewBox(e){const t=this.shadowRoot?.querySelector(".canvas-container");if(!t||!t.clientWidth||!t.clientHeight)return{...e};const s=t.clientWidth/t.clientHeight,i=e.x+e.width/2,o=e.y+e.height/2,n=e.width*e.height,r=Math.sqrt(n*s),a=r/s;return{x:i-r/2,y:o-a/2,width:r,height:a}}_fitAll(){const e=Object.values(this.nodePositions);if(!e.length)return;const t=e.map(e=>e.x),s=e.map(e=>e.y),i=Math.min(...t)-80,o=Math.min(...s)-80,n=Math.max(...t)-Math.min(...t)+160,r=Math.max(...s)-Math.min(...s)+160,a=this.shadowRoot?.querySelector(".canvas-container");if(a&&a.clientWidth&&a.clientHeight){const e=a.clientWidth/a.clientHeight;let t=n,s=r;n/r<e?t=r*e:s=n/e,this._viewBox={x:i-(t-n)/2,y:o-(s-r)/2,width:t,height:s}}else this._viewBox={x:i,y:o,width:n,height:r}}_clientToSvg(e,t){const s=this.shadowRoot.querySelector("svg");if(!s)return null;const i=s.createSVGPoint();return i.x=e,i.y=t,i.matrixTransform(s.getScreenCTM().inverse())}_onTouchStart(e){if(2===e.touches.length){e.preventDefault();const t=e.touches[0].clientX-e.touches[1].clientX,s=e.touches[0].clientY-e.touches[1].clientY;return this._pinchPrevDist=Math.sqrt(t*t+s*s),this._pinchActive=!0,this._pinchAnchor0=this._clientToSvg(e.touches[0].clientX,e.touches[0].clientY),this._pinchAnchor1=this._clientToSvg(e.touches[1].clientX,e.touches[1].clientY),this._isPanning=!1,void(this._panStart=null)}if(1===e.touches.length){if(this.linkMode&&!e.target.closest("g[transform]"))return this.linkMode=!1,this._linkSource=null,void(this._mousePos=null);const t=e.touches[0];this._isPanning=!0,this._panStart={x:t.clientX,y:t.clientY,vbX:this._viewBox.x,vbY:this._viewBox.y}}}_onTouchMove(e){if(2===e.touches.length&&this._pinchActive){if(e.preventDefault(),!this._pinchAnchor0||!this._pinchAnchor1)return;const t=e.touches[0].clientX-e.touches[1].clientX,s=e.touches[0].clientY-e.touches[1].clientY,i=Math.sqrt(t*t+s*s);if(!this._pinchPrevDist||0===i)return void(this._pinchPrevDist=i);const o=this._pinchPrevDist/i,n=(this._pinchAnchor0.x+this._pinchAnchor1.x)/2,r=(this._pinchAnchor0.y+this._pinchAnchor1.y)/2,a=this._viewBox,l=Math.max(300,Math.min(2700,a.width*o)),d=l/a.width,c=Math.max(167,Math.min(1500,a.height*d));let p=n-(n-a.x)*d,h=r-(r-a.y)*(c/a.height);const u=this.shadowRoot.querySelector("svg");if(u){const t=u.getBoundingClientRect();if(t.width>0&&t.height>0){const s=(e.touches[0].clientX+e.touches[1].clientX)/2,i=(e.touches[0].clientY+e.touches[1].clientY)/2;p=n-(s-t.left)*(l/t.width),h=r-(i-t.top)*(c/t.height)}}if(this._viewBox={x:p,y:h,width:l,height:c},u){const t=u.getBoundingClientRect();if(t.width>0&&t.height>0){const s=e=>p+(e-t.left)*(l/t.width),i=e=>h+(e-t.top)*(c/t.height);this._pinchAnchor0={x:s(e.touches[0].clientX),y:i(e.touches[0].clientY)},this._pinchAnchor1={x:s(e.touches[1].clientX),y:i(e.touches[1].clientY)}}}return void(this._pinchPrevDist=i)}if(1===e.touches.length&&this._dragging){e.preventDefault();const t=e.touches[0],s=this._clientToSvg(t.clientX,t.clientY);if(!s)return;return void(this.nodePositions={...this.nodePositions,[this._dragging]:{x:s.x-this._dragOffset.x,y:s.y-this._dragOffset.y}})}if(1===e.touches.length&&this._isPanning&&this._panStart){const t=e.touches[0],s=this.shadowRoot.querySelector("svg");if(!s)return;const i=s.getScreenCTM(),o=(t.clientX-this._panStart.x)/i.a,n=(t.clientY-this._panStart.y)/i.d;this._viewBox={...this._viewBox,x:this._panStart.vbX-o,y:this._panStart.vbY-n}}}_onTouchEnd(e){if(e.touches.length<2&&(this._pinchActive=!1,this._pinchPrevDist=0,this._pinchAnchor0=null,this._pinchAnchor1=null,1===e.touches.length&&!this._dragging)){const t=e.touches[0];this._isPanning=!0,this._panStart={x:t.clientX,y:t.clientY,vbX:this._viewBox.x,vbY:this._viewBox.y}}0===e.touches.length&&(this._dragging&&this._markDirty(),this._dragging=null,this._isPanning=!1,this._panStart=null)}_onTouchNodeStart(e,t){if(1!==e.touches.length)return;e.stopPropagation(),this._isPanning=!1;const s=e.touches[0],i=this._clientToSvg(s.clientX,s.clientY);if(!i)return;const o=this.nodePositions[t]||{x:0,y:0};this._dragOffset={x:i.x-o.x,y:i.y-o.y},this._dragging=t}_onMouseUp(){this._dragging&&this._markDirty(),this._dragging=null,this._isMousePanning=!1}async _setAsDefault(){if(!this.selectedLayout)return;for(const[e,t]of Object.entries(this.layouts))t.isDefault&&(t.isDefault=!1,await ze(t));const e=this.layouts[this.selectedLayout];e&&(e.isDefault=!0,await ze(e)),await this._loadLayouts(),this._layoutsLoaded=!0}async _deleteCurrentLayout(){if(!this.selectedLayout)return;const e=this.layouts[this.selectedLayout]?.name||this.selectedLayout,t=this.shadowRoot.querySelector("themed-dialog");await t.show({type:"confirm",title:"Delete Layout",message:`Delete "${e}"? This cannot be undone.`,confirmLabel:"Delete",confirmDanger:!0})&&(await Fe(this.selectedLayout),this.selectedLayout="",this.nodePositions={},this.manualEdges=[],this.hideAutoEdges=!1,this._dirty=!1,await this._loadLayouts(),this._autoLayout())}}customElements.define("topology-view",En);const Tn={online:"#04d65c",offline:"#ef5350",warning:"#ffb74d",critical:"#ef5350",unknown:"#666"};class Dn extends le{static properties={device:{type:Object},deviceId:{type:String}};connectedCallback(){super.connectedCallback(),this.setAttribute("role","button"),this.setAttribute("tabindex","0")}static styles=[ce,n`
    :host {
      display: block;
      background: rgba(255,255,255,0.05);
      border-radius: 8px;
      padding: 14px;
      cursor: pointer;
      transition: all 0.2s;
      border-left: 3px solid var(--status-color, #666);
      font-family: var(--font-display);
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
    .name-row { display: flex; align-items: center; gap: 8px; }
    .type-icon { display: flex; align-items: center; }
    .type-badge {
      font-size: 9px; padding: 2px 7px; border-radius: 3px;
      text-transform: uppercase; letter-spacing: 0.04em; font-weight: 500;
      font-family: var(--font-data);
      display: inline-block; margin-bottom: 6px;
    }
    .type-badge.badge-linux { background: rgba(255,183,77,0.15); color: #ffb74d; }
    .type-badge.badge-windows { background: rgba(79,195,247,0.15); color: #4fc3f7; }
    .type-badge.badge-laptop { background: rgba(79,195,247,0.15); color: #4fc3f7; }
    .type-badge.badge-esp32 { background: rgba(4,214,92,0.15); color: #04d65c; }
    .type-badge.badge-server { background: rgba(179,136,255,0.15); color: #b388ff; }
    .type-badge.badge-generic { background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.5); }
    .attrs {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4px;
    }
    .attr {
      font-size: 11px;
      color: #fff;
    }
    .attr-value { color: #00D4FF; font-weight: 500; font-family: var(--font-data); }
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
    .group-badge {
      font-size: 9px;
      padding: 2px 7px;
      border-radius: 3px;
      background: rgba(179,136,255,0.12);
      color: #b388ff;
      font-family: var(--font-data);
      letter-spacing: 0.04em;
      display: inline-block;
    }

    @media (max-width: 480px) {
      .attrs { grid-template-columns: 1fr; }
    }
  `];render(){if(!this.device)return B``;const e=this.device,t=Tn[e.status]||Tn.unknown,s=Object.entries(e.attributes||{}),i=e.hidden_attributes||[],o=e.card_attributes||[];let n;n=o.length>0?o.map(e=>s.find(([t])=>t===e)).filter(Boolean):s.filter(([e])=>!i.includes(e)).slice(0,4);const r=e.attribute_transforms||{},a=[...e.tags||[],...e.server_tags||[]],l=e.device_name||this.deviceId;return this.style.setProperty("--status-color",t),this.setAttribute("aria-label",`${l}, ${e.status||"unknown"}`),B`
      <div class="header">
        <div class="name-row">
          <span class="name">${l}</span>
          <span class="type-icon" style="color: ${ut(e.device_type)}">${function(e){const t=ht(e);return lt[t](16)}(e.device_type)}</span>
        </div>
        <span class="status" style="background: ${t}20; color: ${t}">
          ${"online"===e.status||"offline"===e.status?"● ":(e.status,"⚠ ")}${e.status}
        </span>
      </div>
      <div class="type"><span class="type-badge ${d=e.device_type,pt[ht(d)]}">${e.device_type||"unknown"}</span> ${e.group_policy?B`<span class="group-badge">${e.group_policy.replace(/_/g," ")}</span>`:""}</div>
      ${n.length>0?B`
        <div class="attrs">
          ${n.map(([e,t])=>{const s=r[e],i=s?ue(t.value,s):`${t.value}${t.unit||""}`;return B`
              <div class="attr">
                ${e.replace(/_/g," ")}: <span class="attr-value ${this._isWarning(e,t)?"warning":""}">${i}</span>
              </div>
            `})}
        </div>
      `:""}
      ${a.length>0?B`
        <div class="tags">
          ${a.map((e,t)=>B`${t>0?B`<span class="tag-sep">·</span>`:""}<span class="tag">${e}</span>`)}
        </div>
      `:""}
    `;var d}_isWarning(e,t){const s={cpu_usage:90,memory_usage:90,disk_usage:95,cpu_temp:80};return s[e]&&t.value>s[e]}}customElements.define("device-card",Dn);class An extends le{static properties={devices:{type:Object},filter:{type:String},selectedTags:{type:Array},viewMode:{type:String},_groups:{type:Object,state:!0},_collapsedGroups:{type:Object,state:!0},_selectedUngrouped:{type:Array,state:!0},_selectedGrouped:{type:Object,state:!0}};static styles=[ce,n`
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
    .select-toolbar button {
      background: #00D4FF; border: none; color: #0d0d1f;
      padding: 4px 10px; border-radius: 4px; font-size: 11px; cursor: pointer; font-weight: 600;
    }
    .select-toolbar select {
      background: #0d0d1f; border: 1px solid rgba(255,255,255,0.1);
      color: #fff; padding: 4px 10px; border-radius: 4px; font-size: 11px; cursor: pointer;
    }
    device-card.selected {
      outline: 2px solid #00D4FF;
      outline-offset: -2px;
    }
    .select-hint { font-size: 10px; color: rgba(255,255,255,0.35); margin-bottom: 6px; }

    @media (max-width: 768px) {
      :host { padding: 12px; }
      .filter-bar { gap: 6px; }
      .grid { grid-template-columns: 1fr; }
    }
  `];constructor(){super(),this.devices={},this.filter="all",this.selectedTags=[],this.viewMode="all",this._groups={},this._collapsedGroups={},this._selectedUngrouped=[],this._selectedGrouped={},this._wsUnsub=null,this._lastFetchTime=0}connectedCallback(){super.connectedCallback(),this._loadDevices(),this._loadGroups(),this._wsUnsub=pe.onMessage(e=>{"device_update"===e.type&&(this.devices={...this.devices,[e.device_id]:e.device},this.requestUpdate())})}disconnectedCallback(){super.disconnectedCallback(),this._wsUnsub&&this._wsUnsub()}async _loadDevices(){try{const e=await we(this._lastFetchTime);e&&Object.keys(e).length>0?this.devices={...this.devices,...e}:0===this._lastFetchTime&&(this.devices=e||{}),this._lastFetchTime=Date.now()/1e3}catch(e){console.error("Failed to load devices:",e)}}async _loadGroups(){try{this._groups=await Pe()}catch(e){console.error("Failed to load groups:",e)}}get _filteredDevices(){let e=Object.entries(this.devices);return"all"!==this.filter&&(e="warning"===this.filter?e.filter(([,e])=>"warning"===e.status||"critical"===e.status):e.filter(([,e])=>e.status===this.filter)),this.selectedTags.length>0&&(e=e.filter(([,e])=>{const t=[...e.tags||[],...e.server_tags||[]];return this.selectedTags.some(e=>t.includes(e))})),e}get _counts(){const e=Object.values(this.devices);return{all:e.length,online:e.filter(e=>"online"===e.status).length,offline:e.filter(e=>"offline"===e.status).length,warning:e.filter(e=>"warning"===e.status||"critical"===e.status).length}}_onTagAdd(e){const t=e.detail.tag;this.selectedTags.includes(t)||(this.selectedTags=[...this.selectedTags,t])}_onTagRemove(e){this.selectedTags=this.selectedTags.filter(t=>t!==e.detail.tag)}render(){const e=this._counts;return B`
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
            @click=${()=>this.viewMode="group"}>Groups</button>
        </div>

      </div>

      ${this.selectedTags.length>0?B`
        <div class="active-tags">
          ${this.selectedTags.map(e=>B`
            <span class="active-tag">
              #${e}
              <span class="remove" @click=${()=>this.selectedTags=this.selectedTags.filter(t=>t!==e)}>&times;</span>
            </span>
          `)}
          <button class="clear-all" @click=${()=>{this.selectedTags=[],this.filter="all"}}>Clear all</button>
        </div>
      `:""}

      ${"group"===this.viewMode?this._renderByGroup():this._renderAll()}
      <themed-dialog></themed-dialog>
    `}_renderAll(){const e=this._filteredDevices;return 0===e.length?B`<div class="empty">No devices found</div>`:B`
      <div class="grid">
        ${e.map(([e,t])=>B`
          <device-card
            .device=${t}
            .deviceId=${e}
            @click=${()=>this._selectDevice(e)}
          ></device-card>
        `)}
      </div>
    `}_renderByGroup(){const e=this._filteredDevices,t=Object.values(this._groups),s={},i=new Set;t.forEach(t=>{const o=e.filter(([e])=>(t.device_ids||[]).includes(e));s[t.id]=o,o.forEach(([e])=>i.add(e))});const o=e.filter(([e])=>!i.has(e));return B`
      ${t.map(e=>this._renderGroupSection(e,s[e.id]||[]))}
      ${o.length>0?B`
        <div class="group-section">
          <div class="ungrouped-header">Ungrouped (${o.length})</div>
          <div class="select-hint">Ctrl+click to select multiple</div>
          ${this._selectedUngrouped.length>0?B`
            <div class="select-toolbar">
              <span>${this._selectedUngrouped.length} selected</span>
              <select id="group-assign-select">
                ${t.map(e=>B`<option value=${e.id}>${e.name}</option>`)}
              </select>
              <button @click=${this._addSelectedToGroup}>Add to Group</button>
              <button @click=${this._createNewGroupFromSelected}
                style="background: rgba(255,255,255,0.1); color: #fff;">New Group</button>
              <button style="background: rgba(255,255,255,0.1); color: #fff;"
                @click=${()=>{this._selectedUngrouped=[]}}>Cancel</button>
            </div>
          `:""}
          <div class="grid">
            ${o.map(([e,t])=>B`
              <device-card .device=${t} .deviceId=${e}
                class="${this._selectedUngrouped.includes(e)?"selected":""}"
                @click=${t=>{t.ctrlKey||t.metaKey?(t.preventDefault(),this._toggleUngroupedSelection(e)):this._selectDevice(e)}}></device-card>
            `)}
          </div>
        </div>
      `:""}
      ${0===e.length?B`<div class="empty">No devices found</div>`:""}
    `}_renderGroupSection(e,t){const s=!!this._collapsedGroups[e.id],i=Object.entries(this.devices).filter(([t])=>(e.device_ids||[]).includes(t)).map(([,e])=>e),o=i.filter(e=>"online"===e.status).length,n=i.length;return B`
      <div class="group-section">
        <div class="group-section-header"
          @click=${()=>this._toggleGroupCollapse(e.id)}>
          <span class="group-chevron ${s?"":"open"}">&#9658;</span>
          <span class="group-section-name">${e.name}</span>
          <span class="group-device-count">${t.length} device${1!==t.length?"s":""}</span>
          <div class="group-health">
            <span class="health-dot" style="color: #04d65c">
              ${o}/${n} online
            </span>
          </div>
          <button class="edit-policy-btn" @click=${t=>{t.stopPropagation(),this._editGroupPolicy(e.id)}}>Edit Policy</button>
          <button class="edit-policy-btn" style="background: rgba(239,83,80,0.1); border-color: rgba(239,83,80,0.2); color: #ef5350;"
            @click=${t=>{t.stopPropagation(),this._deleteGroup(e.id,e.name)}}>Delete</button>
        </div>
        ${s?"":B`
          <div class="group-body">
            ${this._selectedGrouped[e.id]?.length>0?B`
              <div class="select-toolbar">
                <span>${this._selectedGrouped[e.id].length} selected</span>
                <button @click=${()=>this._removeSelectedFromGroup(e.id)}>Remove from Group</button>
                <button style="background: rgba(255,255,255,0.1); color: #fff;"
                  @click=${()=>{this._selectedGrouped={...this._selectedGrouped,[e.id]:[]}}}>Cancel</button>
              </div>
            `:""}
            ${0===t.length?B`<div style="color: #fff; font-size: 13px; padding: 8px 4px;">No devices match current filters</div>`:B`
                <div class="grid">
                  ${t.map(([t,s])=>B`
                    <device-card .device=${s} .deviceId=${t}
                      class="${(this._selectedGrouped[e.id]||[]).includes(t)?"selected":""}"
                      @click=${s=>{s.ctrlKey||s.metaKey?(s.preventDefault(),this._toggleGroupedSelection(e.id,t)):this._selectDevice(t)}}></device-card>
                  `)}
                </div>
              `}
          </div>
        `}
      </div>
    `}_toggleGroupCollapse(e){this._collapsedGroups={...this._collapsedGroups,[e]:!this._collapsedGroups[e]}}_selectDevice(e){this.dispatchEvent(new CustomEvent("device-select",{detail:{deviceId:e},bubbles:!0,composed:!0}))}_editGroupPolicy(e){this.dispatchEvent(new CustomEvent("group-edit",{detail:{groupId:e},bubbles:!0,composed:!0}))}_toggleUngroupedSelection(e){this._selectedUngrouped.includes(e)?this._selectedUngrouped=this._selectedUngrouped.filter(t=>t!==e):this._selectedUngrouped=[...this._selectedUngrouped,e]}async _createNewGroupFromSelected(){const e=this.shadowRoot.querySelector("themed-dialog"),t=await e.show({type:"prompt",title:"Create Group",message:"Enter group name:",placeholder:"e.g. Infrastructure, IoT Sensors",confirmLabel:"Create"});if(!t)return;const s=t.toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_|_$/g,"");try{await Ne(s,t,this._selectedUngrouped),this._selectedUngrouped=[],this._loadGroups()}catch(e){console.error("Failed to create group:",e)}}async _deleteGroup(e,t){const s=this.shadowRoot.querySelector("themed-dialog");if(await s.show({type:"confirm",title:"Delete Group",message:`Delete group "${t}"? Devices will be ungrouped.`,confirmLabel:"Delete",confirmDanger:!0}))try{await Le(e),this._loadGroups()}catch(e){console.error("Failed to delete group:",e)}}_toggleGroupedSelection(e,t){const s=this._selectedGrouped[e]||[],i=s.includes(t)?s.filter(e=>e!==t):[...s,t];this._selectedGrouped={...this._selectedGrouped,[e]:i}}async _removeSelectedFromGroup(e){const t=this._groups[e];if(!t)return;const s=this._selectedGrouped[e]||[],i=(t.device_ids||[]).filter(e=>!s.includes(e));try{await Oe(e,{...t,device_ids:i}),this._selectedGrouped={...this._selectedGrouped,[e]:[]},this._loadGroups()}catch(e){console.error("Failed to remove devices from group:",e)}}async _addSelectedToGroup(){const e=this.shadowRoot.querySelector("#group-assign-select");if(!e)return;const t=e.value,s=this._groups[t];if(!s)return;const i=[...new Set([...s.device_ids||[],...this._selectedUngrouped])];try{await Oe(t,{...s,device_ids:i}),this._selectedUngrouped=[],this._loadGroups()}catch(e){console.error("Failed to add devices to group:",e)}}}customElements.define("dashboard-view",An);class zn extends le{static properties={_tags:{type:Array,state:!0},_loading:{type:Boolean,state:!0},_newTagName:{type:String,state:!0},_renamingTag:{type:String,state:!0},_renameValue:{type:String,state:!0},_selectedTags:{type:Object,state:!0}};static styles=[ce,n`
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
  `];constructor(){super(),this._tags=[],this._loading=!0,this._newTagName="",this._renamingTag=null,this._renameValue="",this._selectedTags=new Set}connectedCallback(){super.connectedCallback(),this._loadTags()}async _loadTags(){this._loading=!0;try{const e=await Ue().catch(()=>[]);this._tags=Array.isArray(e)?e.map(e=>"string"==typeof e?{tag:e,count:0}:e).sort((e,t)=>e.tag.localeCompare(t.tag)):[]}finally{this._loading=!1}}render(){const e=this._selectedTags?this._selectedTags.size:0;return B`
      <div class="section">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <div class="section-title" style="margin-bottom: 0;">Tag Registry</div>
          <span style="font-size: 10px; color: #fff;">Server-managed tags only</span>
        </div>

        ${e>0?B`
          <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 12px; padding: 8px 12px; background: rgba(255,255,255,0.03); border-radius: 6px;">
            <span style="font-size: 12px; color: rgba(255,255,255,0.8);">${e} selected</span>
            <button class="small-btn cancel" style="font-size: 11px; padding: 3px 10px;"
              @click=${this._deleteSelectedTags}>Delete Selected</button>
            <button class="small-btn cancel" style="font-size: 11px; padding: 3px 10px;"
              @click=${()=>this._selectedTags=new Set}>Deselect All</button>
          </div>
        `:""}

        ${this._tags.length>0?B`
          <div class="tag-grid">
            ${this._tags.map(e=>this._renderTagCard(e))}
          </div>
        `:B`<div style="color: #fff; font-size: 13px; margin-bottom: 12px;">No tags created yet</div>`}

        ${this._renamingTag?B`
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
    `}_renderTagCard(e){const t=this._selectedTags&&this._selectedTags.has(e.tag),s=e.device_count||e.count||0;return B`
      <div class="tag-card ${t?"selected":""}"
        role="checkbox"
        aria-checked=${t?"true":"false"}
        aria-label="Tag: ${e.tag}, used by ${s} device${1!==s?"s":""}"
        tabindex="0"
        @click=${()=>this._toggleTagSelection(e.tag)}
        @keydown=${t=>("Enter"===t.key||" "===t.key)&&this._toggleTagSelection(e.tag)}>
        <div class="tag-card-top">
          <span class="tag-card-name">${e.tag}</span>
        </div>
        <div class="tag-card-count">${s} device${1!==s?"s":""}</div>
        <div class="tag-card-actions">
          <button class="sensor-btn edit" aria-label="Rename tag ${e.tag}"
            @click=${t=>{t.stopPropagation(),this._startRename(e.tag)}}>Rename</button>
          <button class="sensor-btn remove" aria-label="Delete tag ${e.tag}"
            @click=${t=>{t.stopPropagation(),this._deleteTag(e.tag)}}>Delete</button>
        </div>
      </div>
    `}_toggleTagSelection(e){const t=new Set(this._selectedTags);t.has(e)?t.delete(e):t.add(e),this._selectedTags=t}async _deleteSelectedTags(){const e=[...this._selectedTags];if(confirm(`Delete ${e.length} tag${1!==e.length?"s":""}?`)){for(const t of e)try{await He(t)}catch(e){console.error(e)}this._selectedTags=new Set,await this._loadTags()}}_startRename(e){this._renamingTag=e,this._renameValue=e}_cancelRename(){this._renamingTag=null,this._renameValue=""}async _saveRename(e){const t=this._renameValue.trim();if(t&&t!==e){try{await Be(e,t),await this._loadTags()}catch(e){console.error("Failed to rename tag:",e)}this._cancelRename()}else this._cancelRename()}async _createTag(){const e=this._newTagName.trim();if(e)try{await je(e),this._newTagName="",await this._loadTags()}catch(e){console.error("Failed to create tag:",e)}}async _deleteTag(e){const t=this._tags.find(t=>t.tag===e);if(!(t&&t.count>0)||confirm(`"${e}" is used by ${t.count} device(s). Delete anyway?`))try{await He(e),await this._loadTags()}catch(e){console.error("Failed to delete tag:",e)}}}customElements.define("tag-registry-settings",zn);class Fn extends le{static properties={_settings:{type:Object,state:!0},_loading:{type:Boolean,state:!0},_savingSettings:{type:Boolean,state:!0},_settingsSaved:{type:Boolean,state:!0},_editingTransformIndex:{type:Number,state:!0},_transformError:{type:String,state:!0},_importStatus:{type:String,state:!0},_globalThresholdForm:{type:Object,state:!0},_customTransformForm:{type:Object,state:!0}};static styles=[ce,n`
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
  `];constructor(){super(),this._settings=null,this._loading=!0,this._savingSettings=!1,this._settingsSaved=!1,this._transformError="",this._editingTransformIndex=-1,this._globalThresholdForm={attr:"",value:""},this._customTransformForm={name:"",expression:""}}connectedCallback(){super.connectedCallback(),this._loadSettings()}async _loadSettings(){this._loading=!0;try{this._settings=await Ve().catch(()=>({}))}finally{this._loading=!1}}render(){return this._loading?B`<div class="loading">Loading settings...</div>`:B`
      <h2>Settings</h2>
      ${this._renderThemeSection()}
      <tag-registry-settings></tag-registry-settings>
      ${this._renderCustomTransforms()}
      ${this._renderGlobalDefaults()}
      ${this._renderDeviceManagement()}
      ${this._renderExportImport()}
    `}_renderThemeSection(){return B`
      <div class="section">
        <div class="section-title">Theme</div>
        <div style="display:flex; gap:16px; flex-wrap:wrap;">
          <div style="flex:1; min-width:200px;">
            <label style="font-size:11px; color:rgba(255,255,255,0.5); display:block; margin-bottom:4px;">Display Font</label>
            <select style="width:100%; background:#0d0d1f; border:1px solid rgba(255,255,255,0.1); border-radius:4px; color:#fff; padding:6px 8px; font-size:12px;"
              @change=${e=>this._updateFont("display_font",e.target.value)}>
              ${[{value:"'Outfit', sans-serif",label:"Outfit"},{value:"'IBM Plex Sans', sans-serif",label:"IBM Plex Sans"},{value:"'DM Sans', sans-serif",label:"DM Sans"},{value:"'Nunito Sans', sans-serif",label:"Nunito Sans"},{value:"system-ui, sans-serif",label:"System Default"}].map(e=>B`<option value="${e.value}" ?selected=${this._settings?.display_font===e.value}>${e.label}</option>`)}
            </select>
          </div>
          <div style="flex:1; min-width:200px;">
            <label style="font-size:11px; color:rgba(255,255,255,0.5); display:block; margin-bottom:4px;">Data Font</label>
            <select style="width:100%; background:#0d0d1f; border:1px solid rgba(255,255,255,0.1); border-radius:4px; color:#fff; padding:6px 8px; font-size:12px;"
              @change=${e=>this._updateFont("data_font",e.target.value)}>
              ${[{value:"'JetBrains Mono', monospace",label:"JetBrains Mono"},{value:"'IBM Plex Mono', monospace",label:"IBM Plex Mono"},{value:"'Fira Code', monospace",label:"Fira Code"},{value:"'Source Code Pro', monospace",label:"Source Code Pro"},{value:"monospace",label:"System Default"}].map(e=>B`<option value="${e.value}" ?selected=${this._settings?.data_font===e.value}>${e.label}</option>`)}
            </select>
          </div>
        </div>
      </div>
    `}async _updateFont(e,t){await qe({[e]:t});const s=document.querySelector("network-monitor-app");"display_font"===e&&s?.style.setProperty("--font-display",t),"data_font"===e&&s?.style.setProperty("--font-data",t)}_renderCustomTransforms(){const e=(this._settings||{}).custom_transforms||[],t=this._customTransformForm;return B`
      <div class="section">
        <div class="section-title">Custom Transforms</div>
        <div style="font-size: 11px; color: rgba(255,255,255,0.5); margin-bottom: 12px;">
          Define JS expressions to transform attribute values. Use <code style="color: #00D4FF;">value</code> as the input variable.
        </div>

        ${e.map((e,t)=>B`
          <div style="display: flex; gap: 6px; align-items: center; margin-bottom: 6px;">
            <span style="font-size: 12px; color: rgba(255,255,255,0.8); min-width: 120px;">${e.name}</span>
            <code style="font-size: 11px; color: rgba(255,255,255,0.5); flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${e.expression}</code>
            <button class="icon-btn" style="color: #00D4FF;"
              @click=${()=>this._editCustomTransform(t)}>Edit</button>
            <button class="icon-btn delete"
              @click=${()=>this._removeCustomTransform(t)}>Remove</button>
          </div>
        `)}

        <div style="display: flex; gap: 6px; align-items: center; margin-top: 8px; flex-wrap: wrap;">
          <input class="small-input" type="text" placeholder="Name (e.g. C to F)"
            style="width: 150px;"
            .value=${t.name}
            @input=${e=>{this._customTransformForm.name=e.target.value,this.requestUpdate()}}>
          <input class="small-input" type="text" placeholder="Expression (e.g. value * 1.8 + 32)"
            style="flex: 1; min-width: 200px;"
            .value=${t.expression}
            @input=${e=>{this._customTransformForm.expression=e.target.value,this.requestUpdate()}}>
          <button class="small-btn" @click=${this._addCustomTransform.bind(this)}>${this._editingTransformIndex>=0?"Save":"Add"}</button>
          ${this._editingTransformIndex>=0?B`<button class="small-btn" style="background: rgba(255,255,255,0.1); color: #fff;" @click=${()=>this._cancelEditTransform()}>Cancel</button>`:""}
        </div>

        ${this._transformError?B`<div style="font-size: 11px; color: #ef5350; margin-top: 6px;">${this._transformError}</div>`:""}
      </div>
    `}_editCustomTransform(e){const t=((this._settings||{}).custom_transforms||[])[e];t&&(this._customTransformForm.name=t.name,this._customTransformForm.expression=t.expression,this._editingTransformIndex=e,this._transformError="",this.requestUpdate())}_cancelEditTransform(){this._customTransformForm.name="",this._customTransformForm.expression="",this._editingTransformIndex=-1,this._transformError="",this.requestUpdate()}_addCustomTransform(){const e=(this._customTransformForm.name||"").trim(),t=(this._customTransformForm.expression||"").trim();if(this._transformError="",!e||!t)return void(this._transformError="Name and expression are required.");try{he(t,0)}catch(e){return void(this._transformError=`Invalid expression: ${e.message}`)}const s=this._settings||{},i=[...s.custom_transforms||[]];if(this._editingTransformIndex>=0)i[this._editingTransformIndex]={...i[this._editingTransformIndex],name:e,expression:t},this._editingTransformIndex=-1;else{const s="custom:"+e.toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_|_$/g,"");if(i.some(e=>e.id===s))return void(this._transformError="A transform with this name already exists.");i.push({id:s,name:e,expression:t})}this._settings={...s,custom_transforms:i},this._customTransformForm.name="",this._customTransformForm.expression="",this.requestUpdate(),this._saveSettings()}_removeCustomTransform(e){const t=this._settings||{},s=[...t.custom_transforms||[]];s.splice(e,1),this._settings={...t,custom_transforms:s},this._saveSettings()}_renderGlobalDefaults(){const e=(this._settings||{}).default_thresholds||{},t=this._globalThresholdForm;return B`
      <div class="section">
        <div class="section-title">Global Defaults</div>

        <div style="font-size: 11px; color: #fff; margin-bottom: 10px;">Default Warning Thresholds</div>

        ${Object.keys(e).filter(t=>null!=e[t]).map(t=>B`
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
            @input=${e=>{this._globalThresholdForm.attr=e.target.value,this.requestUpdate()}}>
          <input class="small-input" type="number" placeholder="Value..."
            style="width: 90px;"
            .value=${t.value}
            @input=${e=>{this._globalThresholdForm.value=e.target.value,this.requestUpdate()}}>
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
    `}_updateDefaultThreshold(e,t){const s=this._settings||{};this._settings={...s,default_thresholds:{...s.default_thresholds||{},[e]:""===t?null:Number(t)}}}_removeDefaultThreshold(e){const t=this._settings||{},s={...t.default_thresholds||{}};delete s[e],this._settings={...t,default_thresholds:s}}_addDefaultThreshold(){const e=(this._globalThresholdForm.attr||"").trim(),t=(this._globalThresholdForm.value||"").trim();e&&""!==t&&(this._updateDefaultThreshold(e,t),this._globalThresholdForm.attr="",this._globalThresholdForm.value="",this.requestUpdate())}_renderDeviceManagement(){const e=this._settings||{},t=e.device_cleanup_days??0,s=e.alert_cooldown_minutes??30;return B`
      <div class="section">
        <div class="section-title">Device Management</div>

        <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 12px; flex-wrap: wrap;">
          <div style="flex: 1; min-width: 200px;">
            <div style="font-size: 11px; color: #fff; margin-bottom: 6px;">Auto-Cleanup Offline Devices</div>
            <div style="display: flex; gap: 6px; align-items: center;">
              <select class="small-input" style="width: 140px;"
                .value=${String(t)}
                @change=${e=>{this._settings={...this._settings,device_cleanup_days:Number(e.target.value)},this._saveSettings()}}>
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
                .value=${String(s)}
                @change=${e=>{this._settings={...this._settings,alert_cooldown_minutes:Number(e.target.value)},this._saveSettings()}}>
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
    `}async _exportSettings(){try{const e=await We(),t=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),s=URL.createObjectURL(t),i=document.createElement("a");i.href=s,i.download=`mqtt-monitor-settings-${(new Date).toISOString().slice(0,10)}.json`,i.click(),URL.revokeObjectURL(s)}catch(e){console.error("Export failed:",e)}}async _importFile(e){const t=e.target.files[0];if(t){this._importStatus="";try{const e=await t.text(),s=JSON.parse(e);if(!s.version)return void(this._importStatus="Error: Invalid export file.");await Ye(s),this._importStatus="Imported successfully!",this._loadSettings(),setTimeout(()=>{this._importStatus=""},3e3)}catch(e){this._importStatus=`Error: ${e.message}`}e.target.value=""}}async _saveSettings(){this._savingSettings=!0,this._settingsSaved=!1;try{await qe(this._settings),fe(this._settings.custom_transforms||[]),this._settingsSaved=!0,setTimeout(()=>{this._settingsSaved=!1},2e3)}catch(e){console.error("Failed to save settings:",e)}finally{this._savingSettings=!1}}}customElements.define("settings-view",Fn);class Mn extends le{static properties={currentView:{type:String},selectedDevice:{type:String},selectedGroup:{type:String}};static styles=[ce,n`
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
  `];constructor(){super(),this.currentView="dashboard",this.selectedDevice=null,this.selectedGroup=null}connectedCallback(){super.connectedCallback(),pe.connect(),Ve().then(e=>{e?.custom_transforms&&fe(e.custom_transforms),e?.display_font&&this.style.setProperty("--font-display",e.display_font),e?.data_font&&this.style.setProperty("--font-data",e.data_font)}).catch(()=>{})}disconnectedCallback(){super.disconnectedCallback(),pe.disconnect()}render(){return B`
      <nav-bar
        .currentView=${this.currentView}
        @view-change=${this._onViewChange}
      ></nav-bar>
      ${this._renderView()}
      ${this.selectedDevice||this.selectedGroup?this._renderOverlay():""}
      <toast-notification></toast-notification>
    `}_renderView(){switch(this.currentView){case"topology":return B`<topology-view @device-select=${this._onDeviceSelect}></topology-view>`;case"settings":return B`<settings-view></settings-view>`;default:return B`<dashboard-view @device-select=${this._onDeviceSelect} @group-edit=${this._onGroupEdit}></dashboard-view>`}}_renderOverlay(){return B`
      <div class="overlay" @click=${this._onOverlayClick}>
        <div class="overlay-content" @click=${e=>e.stopPropagation()}>
          ${this.selectedGroup?B`<device-detail
                .groupId=${this.selectedGroup}
                @back=${()=>this.selectedGroup=null}
              ></device-detail>`:B`<device-detail
                .deviceId=${this.selectedDevice}
                @back=${()=>this.selectedDevice=null}
              ></device-detail>`}
        </div>
      </div>
    `}_onOverlayClick(){this.selectedDevice=null,this.selectedGroup=null}_onViewChange(e){this.currentView=e.detail.view,this.selectedDevice=null,this.selectedGroup=null}_onDeviceSelect(e){this.selectedDevice=e.detail.deviceId}_onGroupEdit(e){this.selectedGroup=e.detail.groupId}}customElements.define("network-monitor-app",Mn);
//# sourceMappingURL=bundle.js.map
