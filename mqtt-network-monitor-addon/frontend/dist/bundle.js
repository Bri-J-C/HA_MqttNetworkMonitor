/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),i=new WeakMap;let o=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const s=this.t;if(e&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=i.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&i.set(s,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1],t[0]);return new o(i,t,s)},r=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:a,defineProperty:l,getOwnPropertyDescriptor:d,getOwnPropertyNames:c,getOwnPropertySymbols:u,getPrototypeOf:p}=Object,h=globalThis,g=h.trustedTypes,f=g?g.emptyScript:"",m=h.reactiveElementPolyfillSupport,b=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},_=(t,e)=>!a(t,e),x={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:_};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),h.litPropertyMetadata??=new WeakMap;let y=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=x){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);void 0!==i&&l(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:o}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const n=i?.call(this);o?.call(this,e),this.requestUpdate(t,n,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??x}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const t=this.properties,e=[...c(t),...u(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const s=this._$Eu(t,e);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(r(t))}else void 0!==t&&e.push(r(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const s=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((s,i)=>{if(e)s.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of i){const i=document.createElement("style"),o=t.litNonce;void 0!==o&&i.setAttribute("nonce",o),i.textContent=e.cssText,s.appendChild(i)}})(s,this.constructor.elementStyles),s}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(void 0!==i&&!0===s.reflect){const o=(void 0!==s.converter?.toAttribute?s.converter:v).toAttribute(e,s.type);this._$Em=t,null==o?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(t,e){const s=this.constructor,i=s._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=s.getPropertyOptions(i),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=i;const n=o.fromAttribute(e,t.type);this[i]=n??this._$Ej?.get(i)??n,this._$Em=null}}requestUpdate(t,e,s,i=!1,o){if(void 0!==t){const n=this.constructor;if(!1===i&&(o=this[t]),s??=n.getPropertyOptions(t),!((s.hasChanged??_)(o,e)||s.useDefault&&s.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,s))))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:o},n){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==o||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t){const{wrapped:t}=s,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,s,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[b("elementProperties")]=new Map,y[b("finalized")]=new Map,m?.({ReactiveElement:y}),(h.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const w=globalThis,$=t=>t,k=w.trustedTypes,S=k?k.createPolicy("lit-html",{createHTML:t=>t}):void 0,E="$lit$",T=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+T,D=`<${C}>`,A=document,z=()=>A.createComment(""),F=t=>null===t||"object"!=typeof t&&"function"!=typeof t,M=Array.isArray,P="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,O=/-->/g,L=/>/g,I=RegExp(`>|${P}(?:([^\\s"'>=/]+)(${P}*=${P}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),G=/'/g,U=/"/g,R=/^(?:script|style|textarea|title)$/i,j=t=>(e,...s)=>({_$litType$:t,strings:e,values:s}),B=j(1),H=j(2),V=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),W=new WeakMap,Y=A.createTreeWalker(A,129);function J(t,e){if(!M(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const X=(t,e)=>{const s=t.length-1,i=[];let o,n=2===e?"<svg>":3===e?"<math>":"",r=N;for(let e=0;e<s;e++){const s=t[e];let a,l,d=-1,c=0;for(;c<s.length&&(r.lastIndex=c,l=r.exec(s),null!==l);)c=r.lastIndex,r===N?"!--"===l[1]?r=O:void 0!==l[1]?r=L:void 0!==l[2]?(R.test(l[2])&&(o=RegExp("</"+l[2],"g")),r=I):void 0!==l[3]&&(r=I):r===I?">"===l[0]?(r=o??N,d=-1):void 0===l[1]?d=-2:(d=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?I:'"'===l[3]?U:G):r===U||r===G?r=I:r===O||r===L?r=N:(r=I,o=void 0);const u=r===I&&t[e+1].startsWith("/>")?" ":"";n+=r===N?s+D:d>=0?(i.push(a),s.slice(0,d)+E+s.slice(d)+T+u):s+T+(-2===d?e:u)}return[J(t,n+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class K{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let o=0,n=0;const r=t.length-1,a=this.parts,[l,d]=X(t,e);if(this.el=K.createElement(l,s),Y.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=Y.nextNode())&&a.length<r;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(E)){const e=d[n++],s=i.getAttribute(t).split(T),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:o,name:r[2],strings:s,ctor:"."===r[1]?st:"?"===r[1]?it:"@"===r[1]?ot:et}),i.removeAttribute(t)}else t.startsWith(T)&&(a.push({type:6,index:o}),i.removeAttribute(t));if(R.test(i.tagName)){const t=i.textContent.split(T),e=t.length-1;if(e>0){i.textContent=k?k.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],z()),Y.nextNode(),a.push({type:2,index:++o});i.append(t[e],z())}}}else if(8===i.nodeType)if(i.data===C)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=i.data.indexOf(T,t+1));)a.push({type:7,index:o}),t+=T.length-1}o++}}static createElement(t,e){const s=A.createElement("template");return s.innerHTML=t,s}}function Z(t,e,s=t,i){if(e===V)return e;let o=void 0!==i?s._$Co?.[i]:s._$Cl;const n=F(e)?void 0:e._$litDirective$;return o?.constructor!==n&&(o?._$AO?.(!1),void 0===n?o=void 0:(o=new n(t),o._$AT(t,s,i)),void 0!==i?(s._$Co??=[])[i]=o:s._$Cl=o),void 0!==o&&(e=Z(t,o._$AS(t,e.values),o,i)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??A).importNode(e,!0);Y.currentNode=i;let o=Y.nextNode(),n=0,r=0,a=s[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new tt(o,o.nextSibling,this,t):1===a.type?e=new a.ctor(o,a.name,a.strings,this,t):6===a.type&&(e=new nt(o,this,t)),this._$AV.push(e),a=s[++r]}n!==a?.index&&(o=Y.nextNode(),n++)}return Y.currentNode=A,i}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class tt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),F(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==V&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>M(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==q&&F(this._$AH)?this._$AA.nextSibling.data=t:this.T(A.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,i="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=K.createElement(J(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new Q(i,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=W.get(t.strings);return void 0===e&&W.set(t.strings,e=new K(t)),e}k(t){M(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const o of t)i===e.length?e.push(s=new tt(this.O(z()),this.O(z()),this,this.options)):s=e[i],s._$AI(o),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=$(t).nextSibling;$(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class et{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,o){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=q}_$AI(t,e=this,s,i){const o=this.strings;let n=!1;if(void 0===o)t=Z(this,t,e,0),n=!F(t)||t!==this._$AH&&t!==V,n&&(this._$AH=t);else{const i=t;let r,a;for(t=o[0],r=0;r<o.length-1;r++)a=Z(this,i[s+r],e,r),a===V&&(a=this._$AH[r]),n||=!F(a)||a!==this._$AH[r],a===q?t=q:t!==q&&(t+=(a??"")+o[r+1]),this._$AH[r]=a}n&&!i&&this.j(t)}j(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class st extends et{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===q?void 0:t}}class it extends et{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}}class ot extends et{constructor(t,e,s,i,o){super(t,e,s,i,o),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??q)===V)return;const s=this._$AH,i=t===q&&s!==q||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==q&&(s===q||i);i&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class nt{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}}const rt=w.litHtmlPolyfillSupport;rt?.(K,tt),(w.litHtmlVersions??=[]).push("3.3.2");const at=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class lt extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const i=s?.renderBefore??e;let o=i._$litPart$;if(void 0===o){const t=s?.renderBefore??null;i._$litPart$=o=new tt(e.insertBefore(z(),t),t,void 0,s??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return V}}lt._$litElement$=!0,lt.finalized=!0,at.litElementHydrateSupport?.({LitElement:lt});const dt=at.litElementPolyfillSupport;dt?.({LitElement:lt}),(at.litElementVersions??=[]).push("4.2.2");const ct=n`
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
`;const ut=new class{constructor(){this._ws=null,this._listeners=[],this._reconnectDelay=1e3,this._reconnectAttempts=0,this._maxReconnectAttempts=50,this._shouldReconnect=!0}connect(){this._shouldReconnect=!0;const t="https:"===location.protocol?"wss:":"ws:",e=location.pathname.match(/^(\/api\/hassio_ingress\/[^/]+)/),s=e?e[1]:"",i=`${t}//${location.host}${s}/api/ws`;this._ws=new WebSocket(i),this._ws.onmessage=t=>{try{const e=JSON.parse(t.data);this._listeners.forEach(t=>t(e))}catch(t){console.error("WebSocket parse error:",t)}},this._ws.onclose=()=>{this._shouldReconnect&&(this._reconnectAttempts>=this._maxReconnectAttempts?console.error("WebSocket: max reconnect attempts reached"):(this._reconnectAttempts++,setTimeout(()=>this.connect(),this._reconnectDelay),this._reconnectDelay=Math.min(2*this._reconnectDelay,3e4)))},this._ws.onopen=()=>{this._reconnectDelay=1e3,this._reconnectAttempts=0}}onMessage(t){return this._listeners.push(t),()=>{this._listeners=this._listeners.filter(e=>e!==t)}}disconnect(){this._shouldReconnect=!1,this._ws&&this._ws.close()}};function pt(t,e){const s=function(t){const e=/\s*(>=|<=|==|!=|[+\-*/%().,?:><]|Math|value|toFixed|\d+\.?\d*|'[^']*'|"[^"]*"|[a-zA-Z_]\w*)\s*/g,s=[];let i;for(;null!==(i=e.exec(t));)s.push(i[1]);return s}(t);let i=0;function o(){return s[i]}function n(t){const e=s[i++];if(t&&e!==t)throw new Error(`Expected ${t}, got ${e}`);return e}function r(){let t=function(){let t=a();const e=o();if([">","<",">=","<=","==","!="].includes(e)){n();const s=a();switch(e){case">":return t>s;case"<":return t<s;case">=":return t>=s;case"<=":return t<=s;case"==":return t==s;case"!=":return t!=s}}return t}();if("?"===o()){n("?");const e=r();n(":");const s=r();return t?e:s}return t}function a(){let t=l();for(;"+"===o()||"-"===o();){const e=n(),s=l();t="+"===e?t+s:t-s}return t}function l(){let t=d();for(;"*"===o()||"/"===o()||"%"===o();){const e=n(),s=d();"*"===e?t*=s:"/"===e?t=0!==s?t/s:0:t%=s}return t}function d(){return"-"===o()?(n(),-c()):"+"===o()?(n(),+c()):c()}function c(){let t=function(){const t=o();if("("===t){n("(");const t=r();return n(")"),t}if("value"===t)return n(),e;if("Math"===t){n(),n(".");const t=n(),e={round:Math.round,floor:Math.floor,ceil:Math.ceil,abs:Math.abs,min:Math.min,max:Math.max,pow:Math.pow};if(!e[t])throw new Error(`Unknown Math function: ${t}`);n("(");const s=[r()];for(;","===o();)n(),s.push(r());return n(")"),e[t](...s)}if("string"==typeof t&&(t.startsWith("'")||t.startsWith('"')))return n(),t.slice(1,-1);const s=Number(t);if(!isNaN(s)&&void 0!==t)return n(),s;throw new Error(`Unexpected token: ${t}`)}();for(;"."===o();){n(".");const e=n();if("toFixed"!==e)throw new Error(`Unknown method: ${e}`);{n("(");const e=r();n(")"),t=Number(t).toFixed(e)}}return t}const u=r();if(i<s.length)throw new Error(`Unexpected token: ${s[i]}`);return u}function ht(t,e){if(null==t||!e)return t;if("duration"===e){const e=Number(t);if(isNaN(e))return t;const s=[],i=Math.floor(e/86400),o=Math.floor(e%86400/3600),n=Math.floor(e%3600/60),r=Math.floor(e%60);return i&&s.push(`${i}d`),o&&s.push(`${o}h`),n&&s.push(`${n}m`),s.length||s.push(`${r}s`),s.join(" ")}if("bytes"===e){const e=Number(t);return isNaN(e)?t:e>=1e12?(e/1e12).toFixed(1)+" TB":e>=1e9?(e/1e9).toFixed(1)+" GB":e>=1e6?(e/1e6).toFixed(1)+" MB":e>=1e3?(e/1e3).toFixed(1)+" KB":e+" B"}if("percentage"===e){const e=Number(t);return isNaN(e)?t:(100*e).toFixed(1)+"%"}if(e.startsWith("round:")){const s=parseInt(e.split(":")[1])||0,i=Number(t);return isNaN(i)?t:i.toFixed(s)}if(e.startsWith("prefix:"))return e.slice(7)+t;if(e.startsWith("suffix:"))return t+e.slice(7);if(e.startsWith("custom:")){const s=gt.find(t=>t.id===e);if(s)try{return pt(s.expression,t)}catch{return t}}return t}let gt=[];function ft(t){gt=Array.isArray(t)?t:[]}const mt=[{value:"",label:"None"},{value:"duration",label:"Duration (seconds → 2d 5h)"},{value:"bytes",label:"Bytes (→ KB/MB/GB)"},{value:"percentage",label:"Percentage (0-1 → %)"},{value:"round:0",label:"Round (0 decimals)"},{value:"round:1",label:"Round (1 decimal)"},{value:"round:2",label:"Round (2 decimals)"}];const bt=function(){const t=location.pathname.match(/^(\/api\/hassio_ingress\/[^/]+)/);return t?t[1]:""}();async function vt(t,e={}){const s=await fetch(t,e);if(!s.ok){const t=await s.text().catch(()=>s.statusText);throw new Error(`API error ${s.status}: ${t}`)}const i=s.headers.get("content-type");return i&&i.includes("application/json")?s.json():null}async function _t(t=0){return vt(t>0?`${bt}/api/devices?since=${t}`:`${bt}/api/devices`)}async function xt(t){return vt(`${bt}/api/devices/${encodeURIComponent(t)}`)}async function yt(t){return vt(`${bt}/api/devices/${encodeURIComponent(t)}`,{method:"DELETE"})}async function wt(t,e){return vt(`${bt}/api/devices/${encodeURIComponent(t)}/attributes/${encodeURIComponent(e)}`,{method:"DELETE"})}async function $t(t,e){return vt(`${bt}/api/devices/${encodeURIComponent(t)}/attributes/${encodeURIComponent(e)}/unhide`,{method:"POST"})}async function kt(t,e){return vt(`${bt}/api/devices/${encodeURIComponent(t)}/commands/${encodeURIComponent(e)}`,{method:"DELETE"})}async function St(t,e){return vt(`${bt}/api/devices/${encodeURIComponent(t)}/commands/${encodeURIComponent(e)}/unhide`,{method:"POST"})}async function Et(){return vt(`${bt}/api/topology`)}async function Tt(){return vt(`${bt}/api/topology/layouts`)}async function Ct(t){return vt(`${bt}/api/topology/layouts`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})}async function Dt(t){return vt(`${bt}/api/topology/layouts/${encodeURIComponent(t)}`,{method:"DELETE"})}async function At(t,e,s={}){return vt(`${bt}/api/devices/${encodeURIComponent(t)}/command`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({command:e,params:s})})}async function zt(){return vt(`${bt}/api/groups`)}async function Ft(t,e,s=[]){return vt(`${bt}/api/groups`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:t,name:e,device_ids:s})})}async function Mt(t,e){return vt(`${bt}/api/groups/${encodeURIComponent(t)}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}async function Pt(t){return vt(`${bt}/api/groups/${encodeURIComponent(t)}`,{method:"DELETE"})}async function Nt(t,e){return vt(`${bt}/api/devices/${encodeURIComponent(t)}/tags/add`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({tags:e})})}async function Ot(t,e){return vt(`${bt}/api/devices/${encodeURIComponent(t)}/tags/${encodeURIComponent(e)}`,{method:"DELETE"})}async function Lt(){return vt(`${bt}/api/tags`)}async function It(t){return vt(`${bt}/api/tags`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({tag:t})})}async function Gt(t,e){return vt(`${bt}/api/tags/${encodeURIComponent(t)}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({new_name:e})})}async function Ut(t){return vt(`${bt}/api/tags/${encodeURIComponent(t)}`,{method:"DELETE"})}async function Rt(){return vt(`${bt}/api/settings`)}async function jt(t){return vt(`${bt}/api/settings`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})}async function Bt(){return vt(`${bt}/api/settings/export`)}async function Ht(t){return vt(`${bt}/api/settings/import`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})}async function Vt(t){return vt(`${bt}/api/devices/${encodeURIComponent(t)}/effective-settings`)}async function qt(t,e){return vt(`${bt}/api/devices/${encodeURIComponent(t)}/settings`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}async function Wt(t){return vt(`${bt}/api/groups/${encodeURIComponent(t)}/force-apply`,{method:"POST"})}var Yt=Object.freeze({__proto__:null,addDeviceTags:Nt,addServerCommand:async function(t,e,s){return vt(`${bt}/api/devices/${encodeURIComponent(t)}/server-commands`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:e,shell:s})})},addServerSensor:async function(t,e,s){return vt(`${bt}/api/devices/${encodeURIComponent(t)}/server-sensors`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:e,...s})})},checkGroupConflicts:async function(t,e=null){return vt(`${bt}/api/groups/${encodeURIComponent(t)}/check-conflicts`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e?{new_device_id:e}:{})})},createGroup:Ft,createTag:It,deleteAttribute:wt,deleteDevice:yt,deleteGroup:Pt,deleteLayout:Dt,deleteTag:Ut,exportSettings:Bt,fetchAttributeHistory:async function(t,e,s=24){return vt(`${bt}/api/devices/${encodeURIComponent(t)}/history/${encodeURIComponent(e)}?hours=${s}`)},fetchDevice:xt,fetchDevices:_t,fetchEffectiveSettings:Vt,fetchGroups:zt,fetchLayouts:Tt,fetchSettings:Rt,fetchTags:Lt,fetchTopology:Et,forceApplyGroup:Wt,hideCommand:kt,importSettings:Ht,pushDeviceConfig:async function(t,e){return vt(`${bt}/api/devices/${encodeURIComponent(t)}/push-config`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})},pushGroupConfig:async function(t,e){return vt(`${bt}/api/groups/${encodeURIComponent(t)}/push-config`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})},removeDeviceTag:Ot,removeServerCommand:async function(t,e){return vt(`${bt}/api/devices/${encodeURIComponent(t)}/server-commands/${encodeURIComponent(e)}`,{method:"DELETE"})},removeServerSensor:async function(t,e){return vt(`${bt}/api/devices/${encodeURIComponent(t)}/server-sensors/${encodeURIComponent(e)}`,{method:"DELETE"})},renameTag:Gt,saveLayout:Ct,sendCommand:At,sendGroupCommand:async function(t,e,s={}){return vt(`${bt}/api/groups/${encodeURIComponent(t)}/command`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({command:e,params:s})})},setDeviceInterval:async function(t,e){return vt(`${bt}/api/devices/${encodeURIComponent(t)}/config-interval`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({interval:e})})},setDeviceTags:async function(t,e){return vt(`${bt}/api/devices/${encodeURIComponent(t)}/tags`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({tags:e})})},unhideAttribute:$t,unhideCommand:St,updateDeviceSettings:qt,updateGroup:Mt,updateSettings:jt});class Jt extends lt{static properties={currentView:{type:String}};static styles=[ct,n`
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
        <span class="version">v0.2.1 build ${"4/8 20:46"}</span>
      </nav>

      <!-- Mobile simple header -->
      <div class="mobile-header" aria-hidden="true">
        <span class="logo">Network Monitor</span>
        <span class="version">build ${"4/8 20:46"}</span>
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
    `}_navigate(t){this.dispatchEvent(new CustomEvent("view-change",{detail:{view:t}}))}}customElements.define("nav-bar",Jt);class Xt extends lt{static properties={selectedTags:{type:Array},_allTags:{type:Array,state:!0},_open:{type:Boolean,state:!0},_showCreate:{type:Boolean,state:!0},_newTagName:{type:String,state:!0},_creating:{type:Boolean,state:!0}};static styles=[ct,n`
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
  `];constructor(){super(),this.selectedTags=[],this._allTags=[],this._open=!1,this._showCreate=!1,this._newTagName="",this._creating=!1,this._onDocClick=this._onDocClick.bind(this)}connectedCallback(){super.connectedCallback(),this._loadTags(),document.addEventListener("click",this._onDocClick)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._onDocClick)}async _loadTags(){try{const t=await Lt();Array.isArray(t)&&(this._allTags=t.map(t=>"string"==typeof t?t:t.tag).sort())}catch(t){console.error("Failed to load tags:",t)}}_onDocClick(t){if(!this._open)return;t.composedPath().includes(this)||(this._open=!1,this._showCreate=!1)}_toggle(t){t.stopPropagation(),this._open=!this._open,this._open||(this._showCreate=!1)}_toggleTag(t){(this.selectedTags||[]).includes(t)?this.dispatchEvent(new CustomEvent("tag-remove",{detail:{tag:t},bubbles:!0,composed:!0})):this.dispatchEvent(new CustomEvent("tag-add",{detail:{tag:t},bubbles:!0,composed:!0}))}async _createTag(){const t=this._newTagName.trim();if(t&&!this._creating){this._creating=!0;try{await It(t),await this._loadTags(),this.dispatchEvent(new CustomEvent("tag-add",{detail:{tag:t},bubbles:!0,composed:!0})),this._newTagName="",this._showCreate=!1}catch(t){console.error("Failed to create tag:",t)}finally{this._creating=!1}}}render(){const t=this.selectedTags||[],e=t.length>0;return B`
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
    `}}customElements.define("tag-picker",Xt);const Kt="u-off",Zt="u-label",Qt="width",te="height",ee="top",se="bottom",ie="left",oe="right",ne="#000",re=ne+"0",ae="mousemove",le="mousedown",de="mouseup",ce="mouseenter",ue="mouseleave",pe="dblclick",he="change",ge="dppxchange",fe="--",me="undefined"!=typeof window,be=me?document:null,ve=me?window:null,_e=me?navigator:null;let xe,ye;function we(t,e){if(null!=e){let s=t.classList;!s.contains(e)&&s.add(e)}}function $e(t,e){let s=t.classList;s.contains(e)&&s.remove(e)}function ke(t,e,s){t.style[e]=s+"px"}function Se(t,e,s,i){let o=be.createElement(t);return null!=e&&we(o,e),null!=s&&s.insertBefore(o,i),o}function Ee(t,e){return Se("div",t,e)}const Te=new WeakMap;function Ce(t,e,s,i,o){let n="translate("+e+"px,"+s+"px)";n!=Te.get(t)&&(t.style.transform=n,Te.set(t,n),e<0||s<0||e>i||s>o?we(t,Kt):$e(t,Kt))}const De=new WeakMap;function Ae(t,e,s){let i=e+s;i!=De.get(t)&&(De.set(t,i),t.style.background=e,t.style.borderColor=s)}const ze=new WeakMap;function Fe(t,e,s,i){let o=e+""+s;o!=ze.get(t)&&(ze.set(t,o),t.style.height=s+"px",t.style.width=e+"px",t.style.marginLeft=i?-e/2+"px":0,t.style.marginTop=i?-s/2+"px":0)}const Me={passive:!0},Pe={...Me,capture:!0};function Ne(t,e,s,i){e.addEventListener(t,s,i?Pe:Me)}function Oe(t,e,s,i){e.removeEventListener(t,s,Me)}function Le(t,e,s,i){let o;s=s||0;let n=(i=i||e.length-1)<=2147483647;for(;i-s>1;)o=n?s+i>>1:ss((s+i)/2),e[o]<t?s=o:i=o;return t-e[s]<=e[i]-t?s:i}function Ie(t){return(e,s,i)=>{let o=-1,n=-1;for(let n=s;n<=i;n++)if(t(e[n])){o=n;break}for(let o=i;o>=s;o--)if(t(e[o])){n=o;break}return[o,n]}}me&&function t(){let e=devicePixelRatio;xe!=e&&(xe=e,ye&&Oe(he,ye,t),ye=matchMedia(`(min-resolution: ${xe-.001}dppx) and (max-resolution: ${xe+.001}dppx)`),Ne(he,ye,t),ve.dispatchEvent(new CustomEvent(ge)))}();const Ge=t=>null!=t,Ue=t=>null!=t&&t>0,Re=Ie(Ge),je=Ie(Ue);function Be(t,e,s,i){let o=ls(t),n=ls(e);t==e&&(-1==o?(t*=s,e/=s):(t/=s,e*=s));let r=10==s?ds:cs,a=1==n?os:ss,l=(1==o?ss:os)(r(es(t))),d=a(r(es(e))),c=as(s,l),u=as(s,d);return 10==s&&(l<0&&(c=Ts(c,-l)),d<0&&(u=Ts(u,-d))),i||2==s?(t=c*o,e=u*n):(t=Es(t,c),e=Ss(e,u)),[t,e]}function He(t,e,s,i){let o=Be(t,e,s,i);return 0==t&&(o[0]=0),0==e&&(o[1]=0),o}const Ve={mode:3,pad:.1},qe={pad:0,soft:null,mode:0},We={min:qe,max:qe};function Ye(t,e,s,i){return Ls(s)?Xe(t,e,s):(qe.pad=s,qe.soft=i?0:null,qe.mode=i?3:0,Xe(t,e,We))}function Je(t,e){return null==t?e:t}function Xe(t,e,s){let i=s.min,o=s.max,n=Je(i.pad,0),r=Je(o.pad,0),a=Je(i.hard,-ps),l=Je(o.hard,ps),d=Je(i.soft,ps),c=Je(o.soft,-ps),u=Je(i.mode,0),p=Je(o.mode,0),h=e-t,g=ds(h),f=rs(es(t),es(e)),m=ds(f),b=es(m-g);(h<1e-24||b>10)&&(h=0,0!=t&&0!=e||(h=1e-24,2==u&&d!=ps&&(n=0),2==p&&c!=-ps&&(r=0)));let v=h||f||1e3,_=ds(v),x=as(10,ss(_)),y=Ts(Es(t-v*(0==h?0==t?.1:1:n),x/10),24),w=t>=d&&(1==u||3==u&&y<=d||2==u&&y>=d)?d:ps,$=rs(a,y<w&&t>=w?w:ns(w,y)),k=Ts(Ss(e+v*(0==h?0==e?.1:1:r),x/10),24),S=e<=c&&(1==p||3==p&&k>=c||2==p&&k<=c)?c:-ps,E=ns(l,k>S&&e<=S?S:rs(S,k));return $==E&&0==$&&(E=100),[$,E]}const Ke=new Intl.NumberFormat(me?_e.language:"en-US"),Ze=t=>Ke.format(t),Qe=Math,ts=Qe.PI,es=Qe.abs,ss=Qe.floor,is=Qe.round,os=Qe.ceil,ns=Qe.min,rs=Qe.max,as=Qe.pow,ls=Qe.sign,ds=Qe.log10,cs=Qe.log2,us=(t,e=1)=>Qe.asinh(t/e),ps=1/0;function hs(t){return 1+(0|ds((t^t>>31)-(t>>31)))}function gs(t,e,s){return ns(rs(t,e),s)}function fs(t){return"function"==typeof t}function ms(t){return fs(t)?t:()=>t}const bs=t=>t,vs=(t,e)=>e,_s=t=>null,xs=t=>!0,ys=(t,e)=>t==e,ws=/\.\d*?(?=9{6,}|0{6,})/gm,$s=t=>{if(Ns(t)||Cs.has(t))return t;const e=`${t}`,s=e.match(ws);if(null==s)return t;let i=s[0].length-1;if(-1!=e.indexOf("e-")){let[t,s]=e.split("e");return+`${$s(t)}e${s}`}return Ts(t,i)};function ks(t,e){return $s(Ts($s(t/e))*e)}function Ss(t,e){return $s(os($s(t/e))*e)}function Es(t,e){return $s(ss($s(t/e))*e)}function Ts(t,e=0){if(Ns(t))return t;let s=10**e,i=t*s*(1+Number.EPSILON);return is(i)/s}const Cs=new Map;function Ds(t){return((""+t).split(".")[1]||"").length}function As(t,e,s,i){let o=[],n=i.map(Ds);for(let r=e;r<s;r++){let e=es(r),s=Ts(as(t,r),e);for(let a=0;a<i.length;a++){let l=10==t?+`${i[a]}e${r}`:i[a]*s,d=(r>=0?0:e)+(r>=n[a]?0:n[a]),c=10==t?l:Ts(l,d);o.push(c),Cs.set(c,d)}}return o}const zs={},Fs=[],Ms=[null,null],Ps=Array.isArray,Ns=Number.isInteger;function Os(t){return"string"==typeof t}function Ls(t){let e=!1;if(null!=t){let s=t.constructor;e=null==s||s==Object}return e}function Is(t){return null!=t&&"object"==typeof t}const Gs=Object.getPrototypeOf(Uint8Array),Us="__proto__";function Rs(t,e=Ls){let s;if(Ps(t)){let i=t.find(t=>null!=t);if(Ps(i)||e(i)){s=Array(t.length);for(let i=0;i<t.length;i++)s[i]=Rs(t[i],e)}else s=t.slice()}else if(t instanceof Gs)s=t.slice();else if(e(t)){s={};for(let i in t)i!=Us&&(s[i]=Rs(t[i],e))}else s=t;return s}function js(t){let e=arguments;for(let s=1;s<e.length;s++){let i=e[s];for(let e in i)e!=Us&&(Ls(t[e])?js(t[e],Rs(i[e])):t[e]=Rs(i[e]))}return t}function Bs(t,e,s){for(let i,o=0,n=-1;o<e.length;o++){let r=e[o];if(r>n){for(i=r-1;i>=0&&null==t[i];)t[i--]=null;for(i=r+1;i<s&&null==t[i];)t[n=i++]=null}}}const Hs="undefined"==typeof queueMicrotask?t=>Promise.resolve().then(t):queueMicrotask;const Vs=["January","February","March","April","May","June","July","August","September","October","November","December"],qs=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function Ws(t){return t.slice(0,3)}const Ys=qs.map(Ws),Js=Vs.map(Ws),Xs={MMMM:Vs,MMM:Js,WWWW:qs,WWW:Ys};function Ks(t){return(t<10?"0":"")+t}const Zs={YYYY:t=>t.getFullYear(),YY:t=>(t.getFullYear()+"").slice(2),MMMM:(t,e)=>e.MMMM[t.getMonth()],MMM:(t,e)=>e.MMM[t.getMonth()],MM:t=>Ks(t.getMonth()+1),M:t=>t.getMonth()+1,DD:t=>Ks(t.getDate()),D:t=>t.getDate(),WWWW:(t,e)=>e.WWWW[t.getDay()],WWW:(t,e)=>e.WWW[t.getDay()],HH:t=>Ks(t.getHours()),H:t=>t.getHours(),h:t=>{let e=t.getHours();return 0==e?12:e>12?e-12:e},AA:t=>t.getHours()>=12?"PM":"AM",aa:t=>t.getHours()>=12?"pm":"am",a:t=>t.getHours()>=12?"p":"a",mm:t=>Ks(t.getMinutes()),m:t=>t.getMinutes(),ss:t=>Ks(t.getSeconds()),s:t=>t.getSeconds(),fff:t=>{return((e=t.getMilliseconds())<10?"00":e<100?"0":"")+e;var e}};function Qs(t,e){e=e||Xs;let s,i=[],o=/\{([a-z]+)\}|[^{]+/gi;for(;s=o.exec(t);)i.push("{"==s[0][0]?Zs[s[1]]:s[0]);return t=>{let s="";for(let o=0;o<i.length;o++)s+="string"==typeof i[o]?i[o]:i[o](t,e);return s}}const ti=(new Intl.DateTimeFormat).resolvedOptions().timeZone;const ei=t=>t%1==0,si=[1,2,2.5,5],ii=As(10,-32,0,si),oi=As(10,0,32,si),ni=oi.filter(ei),ri=ii.concat(oi),ai="{YYYY}",li="\n"+ai,di="{M}/{D}",ci="\n"+di,ui=ci+"/{YY}",pi="{aa}",hi="{h}:{mm}"+pi,gi="\n"+hi,fi=":{ss}",mi=null;function bi(t){let e=1e3*t,s=60*e,i=60*s,o=24*i,n=30*o,r=365*o;return[(1==t?As(10,0,3,si).filter(ei):As(10,-3,0,si)).concat([e,5*e,10*e,15*e,30*e,s,5*s,10*s,15*s,30*s,i,2*i,3*i,4*i,6*i,8*i,12*i,o,2*o,3*o,4*o,5*o,6*o,7*o,8*o,9*o,10*o,15*o,n,2*n,3*n,4*n,6*n,r,2*r,5*r,10*r,25*r,50*r,100*r]),[[r,ai,mi,mi,mi,mi,mi,mi,1],[28*o,"{MMM}",li,mi,mi,mi,mi,mi,1],[o,di,li,mi,mi,mi,mi,mi,1],[i,"{h}"+pi,ui,mi,ci,mi,mi,mi,1],[s,hi,ui,mi,ci,mi,mi,mi,1],[e,fi,ui+" "+hi,mi,ci+" "+hi,mi,gi,mi,1],[t,fi+".{fff}",ui+" "+hi,mi,ci+" "+hi,mi,gi,mi,1]],function(e){return(a,l,d,c,u,p)=>{let h=[],g=u>=r,f=u>=n&&u<r,m=e(d),b=Ts(m*t,3),v=Ei(m.getFullYear(),g?0:m.getMonth(),f||g?1:m.getDate()),_=Ts(v*t,3);if(f||g){let s=f?u/n:0,i=g?u/r:0,o=b==_?b:Ts(Ei(v.getFullYear()+i,v.getMonth()+s,1)*t,3),a=new Date(is(o/t)),l=a.getFullYear(),d=a.getMonth();for(let n=0;o<=c;n++){let r=Ei(l+i*n,d+s*n,1),a=r-e(Ts(r*t,3));o=Ts((+r+a)*t,3),o<=c&&h.push(o)}}else{let n=u>=o?o:u,r=_+(ss(d)-ss(b))+Ss(b-_,n);h.push(r);let g=e(r),f=g.getHours()+g.getMinutes()/s+g.getSeconds()/i,m=u/i,v=p/a.axes[l]._space;for(;r=Ts(r+u,1==t?0:3),!(r>c);)if(m>1){let t=ss(Ts(f+m,6))%24,s=e(r).getHours()-t;s>1&&(s=-1),r-=s*i,f=(f+m)%24,Ts((r-h[h.length-1])/u,3)*v>=.7&&h.push(r)}else h.push(r)}return h}}]}const[vi,_i,xi]=bi(1),[yi,wi,$i]=bi(.001);function ki(t,e){return t.map(t=>t.map((s,i)=>0==i||8==i||null==s?s:e(1==i||0==t[8]?s:t[1]+s)))}function Si(t,e){return(s,i,o,n,r)=>{let a,l,d,c,u,p,h=e.find(t=>r>=t[0])||e[e.length-1];return i.map(e=>{let s=t(e),i=s.getFullYear(),o=s.getMonth(),n=s.getDate(),r=s.getHours(),g=s.getMinutes(),f=s.getSeconds(),m=i!=a&&h[2]||o!=l&&h[3]||n!=d&&h[4]||r!=c&&h[5]||g!=u&&h[6]||f!=p&&h[7]||h[1];return a=i,l=o,d=n,c=r,u=g,p=f,m(s)})}}function Ei(t,e,s){return new Date(t,e,s)}function Ti(t,e){return e(t)}As(2,-53,53,[1]);function Ci(t,e){return(s,i,o,n)=>null==n?fe:e(t(i))}const Di={show:!0,live:!0,isolate:!1,mount:()=>{},markers:{show:!0,width:2,stroke:function(t,e){let s=t.series[e];return s.width?s.stroke(t,e):s.points.width?s.points.stroke(t,e):null},fill:function(t,e){return t.series[e].fill(t,e)},dash:"solid"},idx:null,idxs:null,values:[]};const Ai=[0,0];function zi(t,e,s,i=!0){return t=>{0==t.button&&(!i||t.target==e)&&s(t)}}function Fi(t,e,s,i=!0){return t=>{(!i||t.target==e)&&s(t)}}const Mi={show:!0,x:!0,y:!0,lock:!1,move:function(t,e,s){return Ai[0]=e,Ai[1]=s,Ai},points:{one:!1,show:function(t,e){let s=t.cursor.points,i=Ee(),o=s.size(t,e);ke(i,Qt,o),ke(i,te,o);let n=o/-2;ke(i,"marginLeft",n),ke(i,"marginTop",n);let r=s.width(t,e,o);return r&&ke(i,"borderWidth",r),i},size:function(t,e){return t.series[e].points.size},width:0,stroke:function(t,e){let s=t.series[e].points;return s._stroke||s._fill},fill:function(t,e){let s=t.series[e].points;return s._fill||s._stroke}},bind:{mousedown:zi,mouseup:zi,click:zi,dblclick:zi,mousemove:Fi,mouseleave:Fi,mouseenter:Fi},drag:{setScale:!0,x:!0,y:!1,dist:0,uni:null,click:(t,e)=>{e.stopPropagation(),e.stopImmediatePropagation()},_x:!1,_y:!1},focus:{dist:(t,e,s,i,o)=>i-o,prox:-1,bias:0},hover:{skip:[void 0],prox:null,bias:0},left:-10,top:-10,idx:null,dataIdx:null,idxs:null,event:null},Pi={show:!0,stroke:"rgba(0,0,0,0.07)",width:2},Ni=js({},Pi,{filter:vs}),Oi=js({},Ni,{size:10}),Li=js({},Pi,{show:!1}),Ii='12px system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',Gi="bold "+Ii,Ui={show:!0,scale:"x",stroke:ne,space:50,gap:5,alignTo:1,size:50,labelGap:0,labelSize:30,labelFont:Gi,side:2,grid:Ni,ticks:Oi,border:Li,font:Ii,lineGap:1.5,rotate:0},Ri={show:!0,scale:"x",auto:!1,sorted:1,min:ps,max:-ps,idxs:[]};function ji(t,e,s,i,o){return e.map(t=>null==t?"":Ze(t))}function Bi(t,e,s,i,o,n,r){let a=[],l=Cs.get(o)||0;for(let t=s=r?s:Ts(Ss(s,o),l);t<=i;t=Ts(t+o,l))a.push(Object.is(t,-0)?0:t);return a}function Hi(t,e,s,i,o,n,r){const a=[],l=t.scales[t.axes[e].scale].log,d=ss((10==l?ds:cs)(s));o=as(l,d),10==l&&(o=ri[Le(o,ri)]);let c=s,u=o*l;10==l&&(u=ri[Le(u,ri)]);do{a.push(c),c+=o,10!=l||Cs.has(c)||(c=Ts(c,Cs.get(o))),c>=u&&(u=(o=c)*l,10==l&&(u=ri[Le(u,ri)]))}while(c<=i);return a}function Vi(t,e,s,i,o,n,r){let a=t.scales[t.axes[e].scale].asinh,l=i>a?Hi(t,e,rs(a,s),i,o):[a],d=i>=0&&s<=0?[0]:[];return(s<-a?Hi(t,e,rs(a,-i),-s,o):[a]).reverse().map(t=>-t).concat(d,l)}const qi=/./,Wi=/[12357]/,Yi=/[125]/,Ji=/1/,Xi=(t,e,s,i)=>t.map((t,o)=>4==e&&0==t||o%i==0&&s.test(t.toExponential()[t<0?1:0])?t:null);function Ki(t,e,s,i,o){let n=t.axes[s],r=n.scale,a=t.scales[r],l=t.valToPos,d=n._space,c=l(10,r),u=l(9,r)-c>=d?qi:l(7,r)-c>=d?Wi:l(5,r)-c>=d?Yi:Ji;if(u==Ji){let t=es(l(1,r)-c);if(t<d)return Xi(e.slice().reverse(),a.distr,u,os(d/t)).reverse()}return Xi(e,a.distr,u,1)}function Zi(t,e,s,i,o){let n=t.axes[s],r=n.scale,a=n._space,l=t.valToPos,d=es(l(1,r)-l(2,r));return d<a?Xi(e.slice().reverse(),3,qi,os(a/d)).reverse():e}function Qi(t,e,s,i){return null==i?fe:null==e?"":Ze(e)}const to={show:!0,scale:"y",stroke:ne,space:30,gap:5,alignTo:1,size:50,labelGap:0,labelSize:30,labelFont:Gi,side:3,grid:Ni,ticks:Oi,border:Li,font:Ii,lineGap:1.5,rotate:0};const eo={scale:null,auto:!0,sorted:0,min:ps,max:-ps},so=(t,e,s,i,o)=>o,io={show:!0,auto:!0,sorted:0,gaps:so,alpha:1,facets:[js({},eo,{scale:"x"}),js({},eo,{scale:"y"})]},oo={scale:"y",auto:!0,sorted:0,show:!0,spanGaps:!1,gaps:so,alpha:1,points:{show:function(t,e){let{scale:s,idxs:i}=t.series[0],o=t._data[0],n=t.valToPos(o[i[0]],s,!0),r=t.valToPos(o[i[1]],s,!0),a=es(r-n)/(t.series[e].points.space*xe);return i[1]-i[0]<=a},filter:null},values:null,min:ps,max:-ps,idxs:[],path:null,clip:null};function no(t,e,s,i,o){return s/10}const ro={time:!0,auto:!0,distr:1,log:10,asinh:1,min:null,max:null,dir:1,ori:0},ao=js({},ro,{time:!1,ori:1}),lo={};function co(t,e){let s=lo[t];return s||(s={key:t,plots:[],sub(t){s.plots.push(t)},unsub(t){s.plots=s.plots.filter(e=>e!=t)},pub(t,e,i,o,n,r,a){for(let l=0;l<s.plots.length;l++)s.plots[l]!=e&&s.plots[l].pub(t,e,i,o,n,r,a)}},null!=t&&(lo[t]=s)),s}function uo(t,e,s){const i=t.mode,o=t.series[e],n=2==i?t._data[e]:t._data,r=t.scales,a=t.bbox;let l=n[0],d=2==i?n[1]:n[e],c=2==i?r[o.facets[0].scale]:r[t.series[0].scale],u=2==i?r[o.facets[1].scale]:r[o.scale],p=a.left,h=a.top,g=a.width,f=a.height,m=t.valToPosH,b=t.valToPosV;return 0==c.ori?s(o,l,d,c,u,m,b,p,h,g,f,_o,yo,$o,So,To):s(o,l,d,c,u,b,m,h,p,f,g,xo,wo,ko,Eo,Co)}function po(t,e){let s=0,i=0,o=Je(t.bands,Fs);for(let t=0;t<o.length;t++){let n=o[t];n.series[0]==e?s=n.dir:n.series[1]==e&&(1==n.dir?i|=1:i|=2)}return[s,1==i?-1:2==i?1:3==i?2:0]}function ho(t,e,s,i,o){let n=t.mode,r=t.series[e],a=2==n?r.facets[1].scale:r.scale,l=t.scales[a];return-1==o?l.min:1==o?l.max:3==l.distr?1==l.dir?l.min:l.max:0}function go(t,e,s,i,o,n){return uo(t,e,(t,e,r,a,l,d,c,u,p,h,g)=>{let f=t.pxRound;const m=a.dir*(0==a.ori?1:-1),b=0==a.ori?yo:wo;let v,_;1==m?(v=s,_=i):(v=i,_=s);let x=f(d(e[v],a,h,u)),y=f(c(r[v],l,g,p)),w=f(d(e[_],a,h,u)),$=f(c(1==n?l.max:l.min,l,g,p)),k=new Path2D(o);return b(k,w,$),b(k,x,$),b(k,x,y),k})}function fo(t,e,s,i,o,n){let r=null;if(t.length>0){r=new Path2D;const a=0==e?$o:ko;let l=s;for(let e=0;e<t.length;e++){let s=t[e];if(s[1]>s[0]){let t=s[0]-l;t>0&&a(r,l,i,t,i+n),l=s[1]}}let d=s+o-l,c=10;d>0&&a(r,l,i-c/2,d,i+n+c)}return r}function mo(t,e,s,i,o,n,r){let a=[],l=t.length;for(let d=1==o?s:i;d>=s&&d<=i;d+=o){if(null===e[d]){let c=d,u=d;if(1==o)for(;++d<=i&&null===e[d];)u=d;else for(;--d>=s&&null===e[d];)u=d;let p=n(t[c]),h=u==c?p:n(t[u]),g=c-o;p=r<=0&&g>=0&&g<l?n(t[g]):p;let f=u+o;h=r>=0&&f>=0&&f<l?n(t[f]):h,h>=p&&a.push([p,h])}}return a}function bo(t){return 0==t?bs:1==t?is:e=>ks(e,t)}function vo(t){let e=0==t?_o:xo,s=0==t?(t,e,s,i,o,n)=>{t.arcTo(e,s,i,o,n)}:(t,e,s,i,o,n)=>{t.arcTo(s,e,o,i,n)},i=0==t?(t,e,s,i,o)=>{t.rect(e,s,i,o)}:(t,e,s,i,o)=>{t.rect(s,e,o,i)};return(t,o,n,r,a,l=0,d=0)=>{0==l&&0==d?i(t,o,n,r,a):(l=ns(l,r/2,a/2),d=ns(d,r/2,a/2),e(t,o+l,n),s(t,o+r,n,o+r,n+a,l),s(t,o+r,n+a,o,n+a,d),s(t,o,n+a,o,n,d),s(t,o,n,o+r,n,l),t.closePath())}}const _o=(t,e,s)=>{t.moveTo(e,s)},xo=(t,e,s)=>{t.moveTo(s,e)},yo=(t,e,s)=>{t.lineTo(e,s)},wo=(t,e,s)=>{t.lineTo(s,e)},$o=vo(0),ko=vo(1),So=(t,e,s,i,o,n)=>{t.arc(e,s,i,o,n)},Eo=(t,e,s,i,o,n)=>{t.arc(s,e,i,o,n)},To=(t,e,s,i,o,n,r)=>{t.bezierCurveTo(e,s,i,o,n,r)},Co=(t,e,s,i,o,n,r)=>{t.bezierCurveTo(s,e,o,i,r,n)};function Do(t){return(t,e,s,i,o)=>uo(t,e,(e,n,r,a,l,d,c,u,p,h,g)=>{let f,m,{pxRound:b,points:v}=e;0==a.ori?(f=_o,m=So):(f=xo,m=Eo);const _=Ts(v.width*xe,3);let x=(v.size-v.width)/2*xe,y=Ts(2*x,3),w=new Path2D,$=new Path2D,{left:k,top:S,width:E,height:T}=t.bbox;$o($,k-y,S-y,E+2*y,T+2*y);const C=t=>{if(null!=r[t]){let e=b(d(n[t],a,h,u)),s=b(c(r[t],l,g,p));f(w,e+x,s),m(w,e,s,x,0,2*ts)}};if(o)o.forEach(C);else for(let t=s;t<=i;t++)C(t);return{stroke:_>0?w:null,fill:w,clip:$,flags:3}})}function Ao(t){return(e,s,i,o,n,r)=>{i!=o&&(n!=i&&r!=i&&t(e,s,i),n!=o&&r!=o&&t(e,s,o),t(e,s,r))}}const zo=Ao(yo),Fo=Ao(wo);function Mo(t){const e=Je(t?.alignGaps,0);return(t,s,i,o)=>uo(t,s,(n,r,a,l,d,c,u,p,h,g,f)=>{[i,o]=Re(a,i,o);let m,b,v=n.pxRound,_=t=>v(c(t,l,g,p)),x=t=>v(u(t,d,f,h));0==l.ori?(m=yo,b=zo):(m=wo,b=Fo);const y=l.dir*(0==l.ori?1:-1),w={stroke:new Path2D,fill:null,clip:null,band:null,gaps:null,flags:1},$=w.stroke;let k=!1;if(o-i>=4*g){let e,s,n,d=e=>t.posToVal(e,l.key,!0),c=null,u=null,p=_(r[1==y?i:o]),h=_(r[i]),g=_(r[o]),f=d(1==y?h+1:g-1);for(let t=1==y?i:o;t>=i&&t<=o;t+=y){let i=r[t],o=(1==y?i<f:i>f)?p:_(i),n=a[t];o==p?null!=n?(s=n,null==c?(m($,o,x(s)),e=c=u=s):s<c?c=s:s>u&&(u=s)):null===n&&(k=!0):(null!=c&&b($,p,x(c),x(u),x(e),x(s)),null!=n?(s=n,m($,o,x(s)),c=u=e=s):(c=u=null,null===n&&(k=!0)),p=o,f=d(p+y))}null!=c&&c!=u&&n!=p&&b($,p,x(c),x(u),x(e),x(s))}else for(let t=1==y?i:o;t>=i&&t<=o;t+=y){let e=a[t];null===e?k=!0:null!=e&&m($,_(r[t]),x(e))}let[S,E]=po(t,s);if(null!=n.fill||0!=S){let e=w.fill=new Path2D($),a=x(n.fillTo(t,s,n.min,n.max,S)),l=_(r[i]),d=_(r[o]);-1==y&&([d,l]=[l,d]),m(e,d,a),m(e,l,a)}if(!n.spanGaps){let d=[];k&&d.push(...mo(r,a,i,o,y,_,e)),w.gaps=d=n.gaps(t,s,i,o,d),w.clip=fo(d,l.ori,p,h,g,f)}return 0!=E&&(w.band=2==E?[go(t,s,i,o,$,-1),go(t,s,i,o,$,1)]:go(t,s,i,o,$,E)),w})}function Po(t,e,s,i,o,n,r=ps){if(t.length>1){let a=null;for(let l=0,d=1/0;l<t.length;l++)if(void 0!==e[l]){if(null!=a){let e=es(t[l]-t[a]);e<d&&(d=e,r=es(s(t[l],i,o,n)-s(t[a],i,o,n)))}a=l}}return r}function No(t,e,s,i,o,n){const r=t.length;if(r<2)return null;const a=new Path2D;if(s(a,t[0],e[0]),2==r)i(a,t[1],e[1]);else{let s=Array(r),i=Array(r-1),n=Array(r-1),l=Array(r-1);for(let s=0;s<r-1;s++)n[s]=e[s+1]-e[s],l[s]=t[s+1]-t[s],i[s]=n[s]/l[s];s[0]=i[0];for(let t=1;t<r-1;t++)0===i[t]||0===i[t-1]||i[t-1]>0!=i[t]>0?s[t]=0:(s[t]=3*(l[t-1]+l[t])/((2*l[t]+l[t-1])/i[t-1]+(l[t]+2*l[t-1])/i[t]),isFinite(s[t])||(s[t]=0));s[r-1]=i[r-2];for(let i=0;i<r-1;i++)o(a,t[i]+l[i]/3,e[i]+s[i]*l[i]/3,t[i+1]-l[i]/3,e[i+1]-s[i+1]*l[i]/3,t[i+1],e[i+1])}return a}const Oo=new Set;function Lo(){for(let t of Oo)t.syncRect(!0)}me&&(Ne("resize",ve,Lo),Ne("scroll",ve,Lo,!0),Ne(ge,ve,()=>{Zo.pxRatio=xe}));const Io=Mo(),Go=Do();function Uo(t,e,s,i){return(i?[t[0],t[1]].concat(t.slice(2)):[t[0]].concat(t.slice(1))).map((t,i)=>Ro(t,i,e,s))}function Ro(t,e,s,i){return js({},0==e?s:i,t)}function jo(t,e,s){return null==e?Ms:[e,s]}const Bo=jo;function Ho(t,e,s){return null==e?Ms:Ye(e,s,.1,!0)}function Vo(t,e,s,i){return null==e?Ms:Be(e,s,t.scales[i].log,!1)}const qo=Vo;function Wo(t,e,s,i){return null==e?Ms:He(e,s,t.scales[i].log,!1)}const Yo=Wo;function Jo(t,e,s,i,o){let n=rs(hs(t),hs(e)),r=e-t,a=Le(o/i*r,s);do{let t=s[a],e=i*t/r;if(e>=o&&n+(t<5?Cs.get(t):0)<=17)return[t,e]}while(++a<s.length);return[0,0]}function Xo(t){let e,s;return[t=t.replace(/(\d+)px/,(t,i)=>(e=is((s=+i)*xe))+"px"),e,s]}function Ko(t){t.show&&[t.font,t.labelFont].forEach(t=>{let e=Ts(t[2]*xe,1);t[0]=t[0].replace(/[0-9.]+px/,e+"px"),t[1]=e})}function Zo(t,e,s){const i={mode:Je(t.mode,1)},o=i.mode;function n(t,e,s,i){let o=e.valToPct(t);return i+s*(-1==e.dir?1-o:o)}function r(t,e,s,i){let o=e.valToPct(t);return i+s*(-1==e.dir?o:1-o)}function a(t,e,s,i){return 0==e.ori?n(t,e,s,i):r(t,e,s,i)}i.valToPosH=n,i.valToPosV=r;let l=!1;i.status=0;const d=i.root=Ee("uplot");if(null!=t.id&&(d.id=t.id),we(d,t.class),t.title){Ee("u-title",d).textContent=t.title}const c=Se("canvas"),u=i.ctx=c.getContext("2d"),p=Ee("u-wrap",d);Ne("click",p,t=>{if(t.target===g){(qs!=Gs||Ws!=Us)&&ii.click(i,t)}},!0);const h=i.under=Ee("u-under",p);p.appendChild(c);const g=i.over=Ee("u-over",p),f=+Je((t=Rs(t)).pxAlign,1),m=bo(f);(t.plugins||[]).forEach(e=>{e.opts&&(t=e.opts(i,t)||t)});const b=t.ms||.001,v=i.series=1==o?Uo(t.series||[],Ri,oo,!1):function(t,e){return t.map((t,s)=>0==s?{}:js({},e,t))}(t.series||[null],io),_=i.axes=Uo(t.axes||[],Ui,to,!0),x=i.scales={},y=i.bands=t.bands||[];y.forEach(t=>{t.fill=ms(t.fill||null),t.dir=Je(t.dir,-1)});const w=2==o?v[1].facets[0].scale:v[0].scale,$={axes:function(){for(let t=0;t<_.length;t++){let e=_[t];if(!e.show||!e._show)continue;let s,o,n=e.side,r=n%2,l=e.stroke(i,t),d=0==n||3==n?-1:1,[c,p]=e._found;if(null!=e.label){let a=e.labelGap*d,h=is((e._lpos+a)*xe);Me(e.labelFont[0],l,"center",2==n?ee:se),u.save(),1==r?(s=o=0,u.translate(h,is(gt+mt/2)),u.rotate((3==n?-ts:ts)/2)):(s=is(ht+ft/2),o=h);let g=fs(e.label)?e.label(i,t,c,p):e.label;u.fillText(g,s,o),u.restore()}if(0==p)continue;let h=x[e.scale],g=0==r?ft:mt,f=0==r?ht:gt,b=e._splits,v=2==h.distr?b.map(t=>_e[t]):b,y=2==h.distr?_e[b[1]]-_e[b[0]]:c,w=e.ticks,$=e.border,k=w.show?w.size:0,S=is(k*xe),E=is((2==e.alignTo?e._size-k-e.gap:e.gap)*xe),T=e._rotate*-ts/180,C=m(e._pos*xe),D=C+(S+E)*d;o=0==r?D:0,s=1==r?D:0,Me(e.font[0],l,1==e.align?ie:2==e.align?oe:T>0?ie:T<0?oe:0==r?"center":3==n?oe:ie,T||1==r?"middle":2==n?ee:se);let A=e.font[1]*e.lineGap,z=b.map(t=>m(a(t,h,g,f))),F=e._values;for(let t=0;t<F.length;t++){let e=F[t];if(null!=e){0==r?s=z[t]:o=z[t],e=""+e;let i=-1==e.indexOf("\n")?[e]:e.split(/\n/gm);for(let t=0;t<i.length;t++){let e=i[t];T?(u.save(),u.translate(s,o+t*A),u.rotate(T),u.fillText(e,0,0),u.restore()):u.fillText(e,s,o+t*A)}}}w.show&&ls(z,w.filter(i,v,t,p,y),r,n,C,S,Ts(w.width*xe,3),w.stroke(i,t),w.dash,w.cap);let M=e.grid;M.show&&ls(z,M.filter(i,v,t,p,y),r,0==r?2:1,0==r?gt:ht,0==r?mt:ft,Ts(M.width*xe,3),M.stroke(i,t),M.dash,M.cap),$.show&&ls([C],[1],0==r?1:0,0==r?1:2,1==r?gt:ht,1==r?mt:ft,Ts($.width*xe,3),$.stroke(i,t),$.dash,$.cap)}vo("drawAxes")},series:function(){if(Ut>0){let t=v.some(t=>t._focus)&&me!=Ct.alpha;t&&(u.globalAlpha=me=Ct.alpha),v.forEach((t,s)=>{if(s>0&&t.show&&(qe(s,!1),qe(s,!0),null==t._paths)){let n=me;me!=t.alpha&&(u.globalAlpha=me=t.alpha);let r=2==o?[0,e[s][0].length-1]:function(t){let e=gs(Rt-1,0,Ut-1),s=gs(jt+1,0,Ut-1);for(;null==t[e]&&e>0;)e--;for(;null==t[s]&&s<Ut-1;)s++;return[e,s]}(e[s]);t._paths=t.paths(i,s,r[0],r[1]),me!=n&&(u.globalAlpha=me=n)}}),v.forEach((t,e)=>{if(e>0&&t.show){let s=me;me!=t.alpha&&(u.globalAlpha=me=t.alpha),null!=t._paths&&We(e,!1);{let s=null!=t._paths?t._paths.gaps:null,o=t.points.show(i,e,Rt,jt,s),n=t.points.filter(i,e,o,s);(o||n)&&(t.points._paths=t.points.paths(i,e,Rt,jt,n),We(e,!0))}me!=s&&(u.globalAlpha=me=s),vo("drawSeries",e)}}),t&&(u.globalAlpha=me=1)}}},k=(t.drawOrder||["axes","series"]).map(t=>$[t]);function S(t){const e=3==t.distr?e=>ds(e>0?e:t.clamp(i,e,t.min,t.max,t.key)):4==t.distr?e=>us(e,t.asinh):100==t.distr?e=>t.fwd(e):t=>t;return s=>{let i=e(s),{_min:o,_max:n}=t;return(i-o)/(n-o)}}function E(e){let s=x[e];if(null==s){let i=(t.scales||zs)[e]||zs;if(null!=i.from){E(i.from);let t=js({},x[i.from],i,{key:e});t.valToPct=S(t),x[e]=t}else{s=x[e]=js({},e==w?ro:ao,i),s.key=e;let t=s.time,n=s.range,r=Ps(n);if((e!=w||2==o&&!t)&&(!r||null!=n[0]&&null!=n[1]||(n={min:null==n[0]?Ve:{mode:1,hard:n[0],soft:n[0]},max:null==n[1]?Ve:{mode:1,hard:n[1],soft:n[1]}},r=!1),!r&&Ls(n))){let t=n;n=(e,s,i)=>null==s?Ms:Ye(s,i,t)}s.range=ms(n||(t?Bo:e==w?3==s.distr?qo:4==s.distr?Yo:jo:3==s.distr?Vo:4==s.distr?Wo:Ho)),s.auto=ms(!r&&s.auto),s.clamp=ms(s.clamp||no),s._min=s._max=null,s.valToPct=S(s)}}}E("x"),E("y"),1==o&&v.forEach(t=>{E(t.scale)}),_.forEach(t=>{E(t.scale)});for(let e in t.scales)E(e);const T=x[w],C=T.distr;let D,A;0==T.ori?(we(d,"u-hz"),D=n,A=r):(we(d,"u-vt"),D=r,A=n);const z={};for(let t in x){let e=x[t];null==e.min&&null==e.max||(z[t]={min:e.min,max:e.max},e.min=e.max=null)}const F=t.tzDate||(t=>new Date(is(t/b))),M=t.fmtDate||Qs,P=1==b?xi(F):$i(F),N=Si(F,ki(1==b?_i:wi,M)),O=Ci(F,Ti("{YYYY}-{MM}-{DD} {h}:{mm}{aa}",M)),L=[],I=i.legend=js({},Di,t.legend),G=i.cursor=js({},Mi,{drag:{y:2==o}},t.cursor),U=I.show,R=G.show,j=I.markers;let B,H,V;I.idxs=L,j.width=ms(j.width),j.dash=ms(j.dash),j.stroke=ms(j.stroke),j.fill=ms(j.fill);let q,W=[],Y=[],J=!1,X={};if(I.live){const t=v[1]?v[1].values:null;J=null!=t,q=J?t(i,1,0):{_:0};for(let t in q)X[t]=fe}if(U)if(B=Se("table","u-legend",d),V=Se("tbody",null,B),I.mount(i,B),J){H=Se("thead",null,B,V);let t=Se("tr",null,H);for(var K in Se("th",null,t),q)Se("th",Zt,t).textContent=K}else we(B,"u-inline"),I.live&&we(B,"u-live");const Z={show:!0},Q={show:!1};const tt=new Map;function et(t,e,s,o=!0){const n=tt.get(e)||{},r=G.bind[t](i,e,s,o);r&&(Ne(t,e,n[t]=r),tt.set(e,n))}function st(t,e,s){const i=tt.get(e)||{};for(let s in i)null!=t&&s!=t||(Oe(s,e,i[s]),delete i[s]);null==t&&tt.delete(e)}let it=0,ot=0,nt=0,rt=0,at=0,lt=0,dt=at,ct=lt,ut=nt,pt=rt,ht=0,gt=0,ft=0,mt=0;i.bbox={};let bt=!1,vt=!1,_t=!1,xt=!1,yt=!1,wt=!1;function $t(t,e,s){(s||t!=i.width||e!=i.height)&&kt(t,e),bs(!1),_t=!0,vt=!0,Zs()}function kt(t,e){i.width=it=nt=t,i.height=ot=rt=e,at=lt=0,function(){let t=!1,e=!1,s=!1,i=!1;_.forEach((o,n)=>{if(o.show&&o._show){let{side:n,_size:r}=o,a=n%2,l=r+(null!=o.label?o.labelSize:0);l>0&&(a?(nt-=l,3==n?(at+=l,i=!0):s=!0):(rt-=l,0==n?(lt+=l,t=!0):e=!0))}}),Ot[0]=t,Ot[1]=s,Ot[2]=e,Ot[3]=i,nt-=Gt[1]+Gt[3],at+=Gt[3],rt-=Gt[2]+Gt[0],lt+=Gt[0]}(),function(){let t=at+nt,e=lt+rt,s=at,i=lt;function o(o,n){switch(o){case 1:return t+=n,t-n;case 2:return e+=n,e-n;case 3:return s-=n,s+n;case 0:return i-=n,i+n}}_.forEach((t,e)=>{if(t.show&&t._show){let e=t.side;t._pos=o(e,t._size),null!=t.label&&(t._lpos=o(e,t.labelSize))}})}();let s=i.bbox;ht=s.left=ks(at*xe,.5),gt=s.top=ks(lt*xe,.5),ft=s.width=ks(nt*xe,.5),mt=s.height=ks(rt*xe,.5)}const St=3;if(i.setSize=function({width:t,height:e}){$t(t,e)},null==G.dataIdx){let t=G.hover,s=t.skip=new Set(t.skip??[]);s.add(void 0);let i=t.prox=ms(t.prox),o=t.bias??=0;G.dataIdx=(t,n,r,a)=>{if(0==n)return r;let l=r,d=i(t,n,r,a)??ps,c=d>=0&&d<ps,u=0==T.ori?nt:rt,p=G.left,h=e[0],g=e[n];if(s.has(g[r])){l=null;let t,e=null,i=null;if(0==o||-1==o)for(t=r;null==e&&t-- >0;)s.has(g[t])||(e=t);if(0==o||1==o)for(t=r;null==i&&t++<g.length;)s.has(g[t])||(i=t);if(null!=e||null!=i)if(c){let t=p-(null==e?-1/0:D(h[e],T,u,0)),s=(null==i?1/0:D(h[i],T,u,0))-p;t<=s?t<=d&&(l=e):s<=d&&(l=i)}else l=null==i?e:null==e?i:r-e<=i-r?e:i}else if(c){es(p-D(h[r],T,u,0))>d&&(l=null)}return l}}const Et=t=>{G.event=t};G.idxs=L,G._lock=!1;let Tt=G.points;Tt.show=ms(Tt.show),Tt.size=ms(Tt.size),Tt.stroke=ms(Tt.stroke),Tt.width=ms(Tt.width),Tt.fill=ms(Tt.fill);const Ct=i.focus=js({},t.focus||{alpha:.3},G.focus),Dt=Ct.prox>=0,At=Dt&&Tt.one;let zt=[],Ft=[],Mt=[];function Pt(t,e){let s=Tt.show(i,e);if(s instanceof HTMLElement)return we(s,"u-cursor-pt"),we(s,t.class),Ce(s,-10,-10,nt,rt),g.insertBefore(s,zt[e]),s}function Nt(t,e){if(1==o||e>0){let e=1==o&&x[t.scale].time,s=t.value;t.value=e?Os(s)?Ci(F,Ti(s,M)):s||O:s||Qi,t.label=t.label||(e?"Time":"Value")}if(At||e>0){t.width=null==t.width?1:t.width,t.paths=t.paths||Io||_s,t.fillTo=ms(t.fillTo||ho),t.pxAlign=+Je(t.pxAlign,f),t.pxRound=bo(t.pxAlign),t.stroke=ms(t.stroke||null),t.fill=ms(t.fill||null),t._stroke=t._fill=t._paths=t._focus=null;let e=Ts((3+2*(rs(1,t.width)||1))*1,3),s=t.points=js({},{size:e,width:rs(1,.2*e),stroke:t.stroke,space:2*e,paths:Go,_stroke:null,_fill:null},t.points);s.show=ms(s.show),s.filter=ms(s.filter),s.fill=ms(s.fill),s.stroke=ms(s.stroke),s.paths=ms(s.paths),s.pxAlign=t.pxAlign}if(U){let s=function(t,e){if(0==e&&(J||!I.live||2==o))return Ms;let s=[],n=Se("tr","u-series",V,V.childNodes[e]);we(n,t.class),t.show||we(n,Kt);let r=Se("th",null,n);if(j.show){let t=Ee("u-marker",r);if(e>0){let s=j.width(i,e);s&&(t.style.border=s+"px "+j.dash(i,e)+" "+j.stroke(i,e)),t.style.background=j.fill(i,e)}}let a=Ee(Zt,r);for(var l in t.label instanceof HTMLElement?a.appendChild(t.label):a.textContent=t.label,e>0&&(j.show||(a.style.color=t.width>0?j.stroke(i,e):j.fill(i,e)),et("click",r,e=>{if(G._lock)return;Et(e);let s=v.indexOf(t);if((e.ctrlKey||e.metaKey)!=I.isolate){let t=v.some((t,e)=>e>0&&e!=s&&t.show);v.forEach((e,i)=>{i>0&&pi(i,t?i==s?Z:Q:Z,!0,xo.setSeries)})}else pi(s,{show:!t.show},!0,xo.setSeries)},!1),Dt&&et(ce,r,e=>{G._lock||(Et(e),pi(v.indexOf(t),mi,!0,xo.setSeries))},!1)),q){let t=Se("td","u-value",n);t.textContent="--",s.push(t)}return[n,s]}(t,e);W.splice(e,0,s[0]),Y.splice(e,0,s[1]),I.values.push(null)}if(R){L.splice(e,0,null);let s=null;At?0==e&&(s=Pt(t,e)):e>0&&(s=Pt(t,e)),zt.splice(e,0,s),Ft.splice(e,0,0),Mt.splice(e,0,0)}vo("addSeries",e)}i.addSeries=function(t,e){e=null==e?v.length:e,t=1==o?Ro(t,e,Ri,oo):Ro(t,e,{},io),v.splice(e,0,t),Nt(v[e],e)},i.delSeries=function(t){if(v.splice(t,1),U){I.values.splice(t,1),Y.splice(t,1);let e=W.splice(t,1)[0];st(null,e.firstChild),e.remove()}R&&(L.splice(t,1),zt.splice(t,1)[0].remove(),Ft.splice(t,1),Mt.splice(t,1)),vo("delSeries",t)};const Ot=[!1,!1,!1,!1];function Lt(t,e,s,i){let[o,n,r,a]=s,l=e%2,d=0;return 0==l&&(a||n)&&(d=0==e&&!o||2==e&&!r?is(Ui.size/3):0),1==l&&(o||r)&&(d=1==e&&!n||3==e&&!a?is(to.size/2):0),d}const It=i.padding=(t.padding||[Lt,Lt,Lt,Lt]).map(t=>ms(Je(t,Lt))),Gt=i._padding=It.map((t,e)=>t(i,e,Ot,0));let Ut,Rt=null,jt=null;const Bt=1==o?v[0].idxs:null;let Ht,Vt,qt,Wt,Yt,Jt,Xt,ne,he,me,_e=null,ye=!1;function Te(t,s){if(e=null==t?[]:t,i.data=i._data=e,2==o){Ut=0;for(let t=1;t<v.length;t++)Ut+=e[t][0].length}else{0==e.length&&(i.data=i._data=e=[[]]),_e=e[0],Ut=_e.length;let t=e;if(2==C){t=e.slice();let s=t[0]=Array(Ut);for(let t=0;t<Ut;t++)s[t]=t}i._data=e=t}if(bs(!0),vo("setData"),2==C&&(_t=!0),!1!==s){let t=T;t.auto(i,ye)?De():ui(w,t.min,t.max),xt=xt||G.left>=0,wt=!0,Zs()}}function De(){let t,s;ye=!0,1==o&&(Ut>0?(Rt=Bt[0]=0,jt=Bt[1]=Ut-1,t=e[0][Rt],s=e[0][jt],2==C?(t=Rt,s=jt):t==s&&(3==C?[t,s]=Be(t,t,T.log,!1):4==C?[t,s]=He(t,t,T.log,!1):T.time?s=t+is(86400/b):[t,s]=Ye(t,s,.1,!0))):(Rt=Bt[0]=t=null,jt=Bt[1]=s=null)),ui(w,t,s)}function ze(t,e,s,i,o,n){t??=re,s??=Fs,i??="butt",o??=re,n??="round",t!=Ht&&(u.strokeStyle=Ht=t),o!=Vt&&(u.fillStyle=Vt=o),e!=qt&&(u.lineWidth=qt=e),n!=Yt&&(u.lineJoin=Yt=n),i!=Jt&&(u.lineCap=Jt=i),s!=Wt&&u.setLineDash(Wt=s)}function Me(t,e,s,i){e!=Vt&&(u.fillStyle=Vt=e),t!=Xt&&(u.font=Xt=t),s!=ne&&(u.textAlign=ne=s),i!=he&&(u.textBaseline=he=i)}function Pe(t,e,s,o,n=0){if(o.length>0&&t.auto(i,ye)&&(null==e||null==e.min)){let e=Je(Rt,0),i=Je(jt,o.length-1),r=null==s.min?function(t,e,s,i=0,o=!1){let n=o?je:Re,r=o?Ue:Ge;[e,s]=n(t,e,s);let a=t[e],l=t[e];if(e>-1)if(1==i)a=t[e],l=t[s];else if(-1==i)a=t[s],l=t[e];else for(let i=e;i<=s;i++){let e=t[i];r(e)&&(e<a?a=e:e>l&&(l=e))}return[a??ps,l??-ps]}(o,e,i,n,3==t.distr):[s.min,s.max];t.min=ns(t.min,s.min=r[0]),t.max=rs(t.max,s.max=r[1])}}i.setData=Te;const Ie={min:null,max:null};function qe(t,e){let s=e?v[t].points:v[t];s._stroke=s.stroke(i,t),s._fill=s.fill(i,t)}function We(t,s){let o=s?v[t].points:v[t],{stroke:n,fill:r,clip:a,flags:l,_stroke:d=o._stroke,_fill:c=o._fill,_width:p=o.width}=o._paths;p=Ts(p*xe,3);let h=null,g=p%2/2;s&&null==c&&(c=p>0?"#fff":d);let f=1==o.pxAlign&&g>0;if(f&&u.translate(g,g),!s){let t=ht-p/2,e=gt-p/2,s=ft+p,i=mt+p;h=new Path2D,h.rect(t,e,s,i)}s?Ke(d,p,o.dash,o.cap,c,n,r,l,a):function(t,s,o,n,r,a,l,d,c,u,p){let h=!1;0!=c&&y.forEach((g,f)=>{if(g.series[0]==t){let t,m=v[g.series[1]],b=e[g.series[1]],_=(m._paths||zs).band;Ps(_)&&(_=1==g.dir?_[0]:_[1]);let x=null;m.show&&_&&function(t,e,s){for(e=Je(e,0),s=Je(s,t.length-1);e<=s;){if(null!=t[e])return!0;e++}return!1}(b,Rt,jt)?(x=g.fill(i,f)||a,t=m._paths.clip):_=null,Ke(s,o,n,r,x,l,d,c,u,p,t,_),h=!0}}),h||Ke(s,o,n,r,a,l,d,c,u,p)}(t,d,p,o.dash,o.cap,c,n,r,l,h,a),f&&u.translate(-g,-g)}const Xe=3;function Ke(t,e,s,i,o,n,r,a,l,d,c,p){ze(t,e,s,i,o),(l||d||p)&&(u.save(),l&&u.clip(l),d&&u.clip(d)),p?(a&Xe)==Xe?(u.clip(p),c&&u.clip(c),ss(o,r),Ze(t,n,e)):2&a?(ss(o,r),u.clip(p),Ze(t,n,e)):1&a&&(u.save(),u.clip(p),c&&u.clip(c),ss(o,r),u.restore(),Ze(t,n,e)):(ss(o,r),Ze(t,n,e)),(l||d||p)&&u.restore()}function Ze(t,e,s){s>0&&(e instanceof Map?e.forEach((t,e)=>{u.strokeStyle=Ht=e,u.stroke(t)}):null!=e&&t&&u.stroke(e))}function ss(t,e){e instanceof Map?e.forEach((t,e)=>{u.fillStyle=Vt=e,u.fill(t)}):null!=e&&t&&u.fill(e)}function ls(t,e,s,i,o,n,r,a,l,d){let c=r%2/2;1==f&&u.translate(c,c),ze(a,r,l,d,a),u.beginPath();let p,h,g,m,b=o+(0==i||3==i?-n:n);0==s?(h=o,m=b):(p=o,g=b);for(let i=0;i<t.length;i++)null!=e[i]&&(0==s?p=g=t[i]:h=m=t[i],u.moveTo(p,h),u.lineTo(g,m));u.stroke(),1==f&&u.translate(-c,-c)}function cs(t){let e=!0;return _.forEach((s,o)=>{if(!s.show)return;let n=x[s.scale];if(null==n.min)return void(s._show&&(e=!1,s._show=!1,bs(!1)));s._show||(e=!1,s._show=!0,bs(!1));let r=s.side,a=r%2,{min:l,max:d}=n,[c,u]=function(t,e,s,o){let n,r=_[t];if(o<=0)n=[0,0];else{let a=r._space=r.space(i,t,e,s,o);n=Jo(e,s,r._incrs=r.incrs(i,t,e,s,o,a),o,a)}return r._found=n}(o,l,d,0==a?nt:rt);if(0==u)return;let p=2==n.distr,h=s._splits=s.splits(i,o,l,d,c,u,p),g=2==n.distr?h.map(t=>_e[t]):h,f=2==n.distr?_e[h[1]]-_e[h[0]]:c,m=s._values=s.values(i,s.filter(i,g,o,u,f),o,u,f);s._rotate=2==r?s.rotate(i,m,o,u):0;let b=s._size;s._size=os(s.size(i,m,o,t)),null!=b&&s._size!=b&&(e=!1)}),e}function hs(t){let e=!0;return It.forEach((s,o)=>{let n=s(i,o,Ot,t);n!=Gt[o]&&(e=!1),Gt[o]=n}),e}function bs(t){v.forEach((e,s)=>{s>0&&(e._paths=null,t&&(1==o?(e.min=null,e.max=null):e.facets.forEach(t=>{t.min=null,t.max=null})))})}let ws,$s,Ss,Es,As,Ns,Gs,Us,Bs,Vs,qs,Ws,Ys=!1,Js=!1,Xs=[];function Ks(){Js=!1;for(let t=0;t<Xs.length;t++)vo(...Xs[t]);Xs.length=0}function Zs(){Ys||(Hs(ti),Ys=!0)}function ti(){if(bt&&(!function(){for(let t in x){let e=x[t];null==z[t]&&(null==e.min||null!=z[w]&&e.auto(i,ye))&&(z[t]=Ie)}for(let t in x){let e=x[t];null==z[t]&&null!=e.from&&null!=z[e.from]&&(z[t]=Ie)}null!=z[w]&&bs(!0);let t={};for(let e in z){let s=z[e];if(null!=s){let n=t[e]=Rs(x[e],Is);if(null!=s.min)js(n,s);else if(e!=w||2==o)if(0==Ut&&null==n.from){let t=n.range(i,null,null,e);n.min=t[0],n.max=t[1]}else n.min=ps,n.max=-ps}}if(Ut>0){v.forEach((s,n)=>{if(1==o){let o=s.scale,r=z[o];if(null==r)return;let a=t[o];if(0==n){let t=a.range(i,a.min,a.max,o);a.min=t[0],a.max=t[1],Rt=Le(a.min,e[0]),jt=Le(a.max,e[0]),jt-Rt>1&&(e[0][Rt]<a.min&&Rt++,e[0][jt]>a.max&&jt--),s.min=_e[Rt],s.max=_e[jt]}else s.show&&s.auto&&Pe(a,r,s,e[n],s.sorted);s.idxs[0]=Rt,s.idxs[1]=jt}else if(n>0&&s.show&&s.auto){let[i,o]=s.facets,r=i.scale,a=o.scale,[l,d]=e[n],c=t[r],u=t[a];null!=c&&Pe(c,z[r],i,l,i.sorted),null!=u&&Pe(u,z[a],o,d,o.sorted),s.min=o.min,s.max=o.max}});for(let e in t){let s=t[e],o=z[e];if(null==s.from&&(null==o||null==o.min)){let t=s.range(i,s.min==ps?null:s.min,s.max==-ps?null:s.max,e);s.min=t[0],s.max=t[1]}}}for(let e in t){let s=t[e];if(null!=s.from){let o=t[s.from];if(null==o.min)s.min=s.max=null;else{let t=s.range(i,o.min,o.max,e);s.min=t[0],s.max=t[1]}}}let s={},n=!1;for(let e in t){let i=t[e],o=x[e];if(o.min!=i.min||o.max!=i.max){o.min=i.min,o.max=i.max;let t=o.distr;o._min=3==t?ds(o.min):4==t?us(o.min,o.asinh):100==t?o.fwd(o.min):o.min,o._max=3==t?ds(o.max):4==t?us(o.max,o.asinh):100==t?o.fwd(o.max):o.max,s[e]=n=!0}}if(n){v.forEach((t,e)=>{2==o?e>0&&s.y&&(t._paths=null):s[t.scale]&&(t._paths=null)});for(let t in s)_t=!0,vo("setScale",t);R&&G.left>=0&&(xt=wt=!0)}for(let t in z)z[t]=null}(),bt=!1),_t&&(!function(){let t=!1,e=0;for(;!t;){e++;let s=cs(e),o=hs(e);t=e==St||s&&o,t||(kt(i.width,i.height),vt=!0)}}(),_t=!1),vt){if(ke(h,ie,at),ke(h,ee,lt),ke(h,Qt,nt),ke(h,te,rt),ke(g,ie,at),ke(g,ee,lt),ke(g,Qt,nt),ke(g,te,rt),ke(p,Qt,it),ke(p,te,ot),c.width=is(it*xe),c.height=is(ot*xe),_.forEach(({_el:t,_show:e,_size:s,_pos:i,side:o})=>{if(null!=t)if(e){let e=o%2==1;ke(t,e?"left":"top",i-(3===o||0===o?s:0)),ke(t,e?"width":"height",s),ke(t,e?"top":"left",e?lt:at),ke(t,e?"height":"width",e?rt:nt),$e(t,Kt)}else we(t,Kt)}),Ht=Vt=qt=Yt=Jt=Xt=ne=he=Wt=null,me=1,Ii(!0),at!=dt||lt!=ct||nt!=ut||rt!=pt){bs(!1);let t=nt/ut,e=rt/pt;if(R&&!xt&&G.left>=0){G.left*=t,G.top*=e,Ss&&Ce(Ss,is(G.left),0,nt,rt),Es&&Ce(Es,0,is(G.top),nt,rt);for(let s=0;s<zt.length;s++){let i=zt[s];null!=i&&(Ft[s]*=t,Mt[s]*=e,Ce(i,os(Ft[s]),os(Mt[s]),nt,rt))}}if(li.show&&!yt&&li.left>=0&&li.width>0){li.left*=t,li.width*=t,li.top*=e,li.height*=e;for(let t in Wi)ke(di,t,li[t])}dt=at,ct=lt,ut=nt,pt=rt}vo("setSize"),vt=!1}it>0&&ot>0&&(u.clearRect(0,0,c.width,c.height),vo("drawClear"),k.forEach(t=>t()),vo("draw")),li.show&&yt&&(ci(li),yt=!1),R&&xt&&(Oi(null,!0,!1),xt=!1),I.show&&I.live&&wt&&(Pi(),wt=!1),l||(l=!0,i.status=1,vo("ready")),ye=!1,Ys=!1}function ei(t,s){let o=x[t];if(null==o.from){if(0==Ut){let e=o.range(i,s.min,s.max,t);s.min=e[0],s.max=e[1]}if(s.min>s.max){let t=s.min;s.min=s.max,s.max=t}if(Ut>1&&null!=s.min&&null!=s.max&&s.max-s.min<1e-16)return;t==w&&2==o.distr&&Ut>0&&(s.min=Le(s.min,e[0]),s.max=Le(s.max,e[0]),s.min==s.max&&s.max++),z[t]=s,bt=!0,Zs()}}i.batch=function(t,e=!1){Ys=!0,Js=e,t(i),ti(),e&&Xs.length>0&&queueMicrotask(Ks)},i.redraw=(t,e)=>{_t=e||!1,!1!==t?ui(w,T.min,T.max):Zs()},i.setScale=ei;let si=!1;const ii=G.drag;let oi=ii.x,ai=ii.y;R&&(G.x&&(ws=Ee("u-cursor-x",g)),G.y&&($s=Ee("u-cursor-y",g)),0==T.ori?(Ss=ws,Es=$s):(Ss=$s,Es=ws),qs=G.left,Ws=G.top);const li=i.select=js({show:!0,over:!0,left:0,width:0,top:0,height:0},t.select),di=li.show?Ee("u-select",li.over?g:h):null;function ci(t,e){if(li.show){for(let e in t)li[e]=t[e],e in Wi&&ke(di,e,t[e]);!1!==e&&vo("setSelect")}}function ui(t,e,s){ei(t,{min:e,max:s})}function pi(t,e,s,n){null!=e.focus&&function(t){if(t!=fi){let e=null==t,s=1!=Ct.alpha;v.forEach((i,n)=>{if(1==o||n>0){let o=e||0==n||n==t;i._focus=e?null:o,s&&function(t,e){v[t].alpha=e,R&&null!=zt[t]&&(zt[t].style.opacity=e);U&&W[t]&&(W[t].style.opacity=e)}(n,o?1:Ct.alpha)}}),fi=t,s&&Zs()}}(t),null!=e.show&&v.forEach((s,i)=>{i>0&&(t==i||null==t)&&(s.show=e.show,function(t){if(v[t].show)U&&$e(W[t],Kt);else if(U&&we(W[t],Kt),R){let e=At?zt[0]:zt[t];null!=e&&Ce(e,-10,-10,nt,rt)}}(i),2==o?(ui(s.facets[0].scale,null,null),ui(s.facets[1].scale,null,null)):ui(s.scale,null,null),Zs())}),!1!==s&&vo("setSeries",t,e),n&&$o("setSeries",i,t,e)}let hi,gi,fi;i.setSelect=ci,i.setSeries=pi,i.addBand=function(t,e){t.fill=ms(t.fill||null),t.dir=Je(t.dir,-1),e=null==e?y.length:e,y.splice(e,0,t)},i.setBand=function(t,e){js(y[t],e)},i.delBand=function(t){null==t?y.length=0:y.splice(t,1)};const mi={focus:!0};function bi(t,e,s){let i=x[e];s&&(t=t/xe-(1==i.ori?lt:at));let o=nt;1==i.ori&&(o=rt,t=o-t),-1==i.dir&&(t=o-t);let n=i._min,r=n+(i._max-n)*(t/o),a=i.distr;return 3==a?as(10,r):4==a?((t,e=1)=>Qe.sinh(t)*e)(r,i.asinh):100==a?i.bwd(r):r}function Ei(t,e){ke(di,ie,li.left=t),ke(di,Qt,li.width=e)}function Ai(t,e){ke(di,ee,li.top=t),ke(di,te,li.height=e)}U&&Dt&&et(ue,B,t=>{G._lock||(Et(t),null!=fi&&pi(null,mi,!0,xo.setSeries))}),i.valToIdx=t=>Le(t,e[0]),i.posToIdx=function(t,s){return Le(bi(t,w,s),e[0],Rt,jt)},i.posToVal=bi,i.valToPos=(t,e,s)=>0==x[e].ori?n(t,x[e],s?ft:nt,s?ht:0):r(t,x[e],s?mt:rt,s?gt:0),i.setCursor=(t,e,s)=>{qs=t.left,Ws=t.top,Oi(null,e,s)};let zi=0==T.ori?Ei:Ai,Fi=1==T.ori?Ei:Ai;function Pi(t,e){if(null!=t&&(t.idxs?t.idxs.forEach((t,e)=>{L[e]=t}):(t=>void 0===t)(t.idx)||L.fill(t.idx),I.idx=L[0]),U&&I.live){for(let t=0;t<v.length;t++)(t>0||1==o&&!J)&&Ni(t,L[t]);!function(){if(U&&I.live)for(let t=2==o?1:0;t<v.length;t++){if(0==t&&J)continue;let e=I.values[t],s=0;for(let i in e)Y[t][s++].firstChild.nodeValue=e[i]}}()}wt=!1,!1!==e&&vo("setLegend")}function Ni(t,s){let o,n=v[t],r=0==t&&2==C?_e:e[t];J?o=n.values(i,t,s)??X:(o=n.value(i,null==s?null:r[s],t,s),o=null==o?X:{_:o}),I.values[t]=o}function Oi(t,s,n){let r;Bs=qs,Vs=Ws,[qs,Ws]=G.move(i,qs,Ws),G.left=qs,G.top=Ws,R&&(Ss&&Ce(Ss,is(qs),0,nt,rt),Es&&Ce(Es,0,is(Ws),nt,rt));let a=Rt>jt;hi=ps,gi=null;let l=0==T.ori?nt:rt,d=1==T.ori?nt:rt;if(qs<0||0==Ut||a){r=G.idx=null;for(let t=0;t<v.length;t++){let e=zt[t];null!=e&&Ce(e,-10,-10,nt,rt)}Dt&&pi(null,mi,!0,null==t&&xo.setSeries),I.live&&(L.fill(r),wt=!0)}else{let t,s,n;1==o&&(t=0==T.ori?qs:Ws,s=bi(t,w),r=G.idx=Le(s,e[0],Rt,jt),n=D(e[0][r],T,l,0));let a=-10,c=-10,u=0,p=0,h=!0,g="",f="";for(let t=2==o?1:0;t<v.length;t++){let m=v[t],b=L[t],_=null==b?null:1==o?e[t][b]:e[t][1][b],y=G.dataIdx(i,t,r,s),w=null==y?null:1==o?e[t][y]:e[t][1][y];if(wt=wt||w!=_||y!=b,L[t]=y,t>0&&m.show){let s=null==y?-10:y==r?n:D(1==o?e[0][y]:e[t][0][y],T,l,0),b=null==w?-10:A(w,1==o?x[m.scale]:x[m.facets[1].scale],d,0);if(Dt&&null!=w){let e=1==T.ori?qs:Ws,s=es(Ct.dist(i,t,y,b,e));if(s<hi){let i=Ct.bias;if(0!=i){let o=bi(e,m.scale),n=o>=0?1:-1;n==(w>=0?1:-1)&&(1==n?1==i?w>=o:w<=o:1==i?w<=o:w>=o)&&(hi=s,gi=t)}else hi=s,gi=t}}if(wt||At){let e,o;0==T.ori?(e=s,o=b):(e=b,o=s);let n,r,l,d,m,v,_=!0,x=Tt.bbox;if(null!=x){_=!1;let e=x(i,t);l=e.left,d=e.top,n=e.width,r=e.height}else l=e,d=o,n=r=Tt.size(i,t);if(v=Tt.fill(i,t),m=Tt.stroke(i,t),At)t==gi&&hi<=Ct.prox&&(a=l,c=d,u=n,p=r,h=_,g=v,f=m);else{let e=zt[t];null!=e&&(Ft[t]=l,Mt[t]=d,Fe(e,n,r,_),Ae(e,v,m),Ce(e,os(l),os(d),nt,rt))}}}}if(At){let t=Ct.prox;if(wt||(null==fi?hi<=t:hi>t||gi!=fi)){let t=zt[0];null!=t&&(Ft[0]=a,Mt[0]=c,Fe(t,u,p,h),Ae(t,g,f),Ce(t,os(a),os(c),nt,rt))}}}if(li.show&&si)if(null!=t){let[e,s]=xo.scales,[i,o]=xo.match,[n,r]=t.cursor.sync.scales,a=t.cursor.drag;if(oi=a._x,ai=a._y,oi||ai){let a,c,u,p,h,{left:g,top:f,width:m,height:b}=t.select,v=t.scales[n].ori,_=t.posToVal,y=null!=e&&i(e,n),w=null!=s&&o(s,r);y&&oi?(0==v?(a=g,c=m):(a=f,c=b),u=x[e],p=D(_(a,n),u,l,0),h=D(_(a+c,n),u,l,0),zi(ns(p,h),es(h-p))):zi(0,l),w&&ai?(1==v?(a=g,c=m):(a=f,c=b),u=x[s],p=A(_(a,r),u,d,0),h=A(_(a+c,r),u,d,0),Fi(ns(p,h),es(h-p))):Fi(0,d)}else Yi()}else{let t=es(Bs-As),e=es(Vs-Ns);if(1==T.ori){let s=t;t=e,e=s}oi=ii.x&&t>=ii.dist,ai=ii.y&&e>=ii.dist;let s,i,o=ii.uni;null!=o?oi&&ai&&(oi=t>=o,ai=e>=o,oi||ai||(e>t?ai=!0:oi=!0)):ii.x&&ii.y&&(oi||ai)&&(oi=ai=!0),oi&&(0==T.ori?(s=Gs,i=qs):(s=Us,i=Ws),zi(ns(s,i),es(i-s)),ai||Fi(0,d)),ai&&(1==T.ori?(s=Gs,i=qs):(s=Us,i=Ws),Fi(ns(s,i),es(i-s)),oi||zi(0,l)),oi||ai||(zi(0,0),Fi(0,0))}if(ii._x=oi,ii._y=ai,null==t){if(n){if(null!=yo){let[t,e]=xo.scales;xo.values[0]=null!=t?bi(0==T.ori?qs:Ws,t):null,xo.values[1]=null!=e?bi(1==T.ori?qs:Ws,e):null}$o(ae,i,qs,Ws,nt,rt,r)}if(Dt){let t=n&&xo.setSeries,e=Ct.prox;null==fi?hi<=e&&pi(gi,mi,!0,t):hi>e?pi(null,mi,!0,t):gi!=fi&&pi(gi,mi,!0,t)}}wt&&(I.idx=r,Pi()),!1!==s&&vo("setCursor")}i.setLegend=Pi;let Li=null;function Ii(t=!1){t?Li=null:(Li=g.getBoundingClientRect(),vo("syncRect",Li))}function Gi(t,e,s,i,o,n,r){G._lock||si&&null!=t&&0==t.movementX&&0==t.movementY||(qi(t,e,s,i,o,n,r,!1,null!=t),null!=t?Oi(null,!0,!0):Oi(e,!0,!1))}function qi(t,e,s,o,n,r,l,d,c){if(null==Li&&Ii(!1),Et(t),null!=t)s=t.clientX-Li.left,o=t.clientY-Li.top;else{if(s<0||o<0)return qs=-10,void(Ws=-10);let[t,i]=xo.scales,l=e.cursor.sync,[d,c]=l.values,[u,p]=l.scales,[h,g]=xo.match,f=e.axes[0].side%2==1,m=0==T.ori?nt:rt,b=1==T.ori?nt:rt,v=f?r:n,_=f?n:r,y=f?o:s,w=f?s:o;if(s=null!=u?h(t,u)?a(d,x[t],m,0):-10:m*(y/v),o=null!=p?g(i,p)?a(c,x[i],b,0):-10:b*(w/_),1==T.ori){let t=s;s=o,o=t}}!c||null!=e&&e.cursor.event.type!=ae||((s<=1||s>=nt-1)&&(s=ks(s,nt)),(o<=1||o>=rt-1)&&(o=ks(o,rt))),d?(As=s,Ns=o,[Gs,Us]=G.move(i,s,o)):(qs=s,Ws=o)}Object.defineProperty(i,"rect",{get:()=>(null==Li&&Ii(!1),Li)});const Wi={width:0,height:0,left:0,top:0};function Yi(){ci(Wi,!1)}let Ji,Xi,eo,so;function lo(t,e,s,o,n,r,a){si=!0,oi=ai=ii._x=ii._y=!1,qi(t,e,s,o,n,r,0,!0,!1),null!=t&&(et(de,be,uo,!1),$o(le,i,Gs,Us,nt,rt,null));let{left:l,top:d,width:c,height:u}=li;Ji=l,Xi=d,eo=c,so=u}function uo(t,e,s,o,n,r,a){si=ii._x=ii._y=!1,qi(t,e,s,o,n,r,0,!1,!0);let{left:l,top:d,width:c,height:u}=li,p=c>0||u>0,h=Ji!=l||Xi!=d||eo!=c||so!=u;if(p&&h&&ci(li),ii.setScale&&p&&h){let t=l,e=c,s=d,i=u;if(1==T.ori&&(t=d,e=u,s=l,i=c),oi&&ui(w,bi(t,w),bi(t+e,w)),ai)for(let t in x){let e=x[t];t!=w&&null==e.from&&e.min!=ps&&ui(t,bi(s+i,t),bi(s,t))}Yi()}else G.lock&&(G._lock=!G._lock,Oi(e,!0,null!=t));null!=t&&(st(de,be),$o(de,i,qs,Ws,nt,rt,null))}function po(t,e,s,o,n,r,a){G._lock||(Et(t),De(),Yi(),null!=t&&$o(pe,i,qs,Ws,nt,rt,null))}function go(){_.forEach(Ko),$t(i.width,i.height,!0)}Ne(ge,ve,go);const fo={};fo.mousedown=lo,fo.mousemove=Gi,fo.mouseup=uo,fo.dblclick=po,fo.setSeries=(t,e,s,o)=>{-1!=(s=(0,xo.match[2])(i,e,s))&&pi(s,o,!0,!1)},R&&(et(le,g,lo),et(ae,g,Gi),et(ce,g,t=>{Et(t),Ii(!1)}),et(ue,g,function(t,e,s,i,o,n,r){if(G._lock)return;Et(t);let a=si;if(si){let t,e,s=!0,i=!0,o=10;0==T.ori?(t=oi,e=ai):(t=ai,e=oi),t&&e&&(s=qs<=o||qs>=nt-o,i=Ws<=o||Ws>=rt-o),t&&s&&(qs=qs<Gs?0:nt),e&&i&&(Ws=Ws<Us?0:rt),Oi(null,!0,!0),si=!1}qs=-10,Ws=-10,L.fill(null),Oi(null,!0,!0),a&&(si=a)}),et(pe,g,po),Oo.add(i),i.syncRect=Ii);const mo=i.hooks=t.hooks||{};function vo(t,e,s){Js?Xs.push([t,e,s]):t in mo&&mo[t].forEach(t=>{t.call(null,i,e,s)})}(t.plugins||[]).forEach(t=>{for(let e in t.hooks)mo[e]=(mo[e]||[]).concat(t.hooks[e])});const _o=(t,e,s)=>s,xo=js({key:null,setSeries:!1,filters:{pub:xs,sub:xs},scales:[w,v[1]?v[1].scale:null],match:[ys,ys,_o],values:[null,null]},G.sync);2==xo.match.length&&xo.match.push(_o),G.sync=xo;const yo=xo.key,wo=co(yo);function $o(t,e,s,i,o,n,r){xo.filters.pub(t,e,s,i,o,n,r)&&wo.pub(t,e,s,i,o,n,r)}function ko(){vo("init",t,e),Te(e||t.data,!1),z[w]?ei(w,z[w]):De(),yt=li.show&&(li.width>0||li.height>0),xt=wt=!0,$t(t.width,t.height)}return wo.sub(i),i.pub=function(t,e,s,i,o,n,r){xo.filters.sub(t,e,s,i,o,n,r)&&fo[t](null,e,s,i,o,n,r)},i.destroy=function(){wo.unsub(i),Oo.delete(i),tt.clear(),Oe(ge,ve,go),d.remove(),B?.remove(),vo("destroy")},v.forEach(Nt),_.forEach(function(t,e){if(t._show=t.show,t.show){let s=t.side%2,o=x[t.scale];null==o&&(t.scale=s?v[1].scale:w,o=x[t.scale]);let n=o.time;t.size=ms(t.size),t.space=ms(t.space),t.rotate=ms(t.rotate),Ps(t.incrs)&&t.incrs.forEach(t=>{!Cs.has(t)&&Cs.set(t,Ds(t))}),t.incrs=ms(t.incrs||(2==o.distr?ni:n?1==b?vi:yi:ri)),t.splits=ms(t.splits||(n&&1==o.distr?P:3==o.distr?Hi:4==o.distr?Vi:Bi)),t.stroke=ms(t.stroke),t.grid.stroke=ms(t.grid.stroke),t.ticks.stroke=ms(t.ticks.stroke),t.border.stroke=ms(t.border.stroke);let r=t.values;t.values=Ps(r)&&!Ps(r[0])?ms(r):n?Ps(r)?Si(F,ki(r,M)):Os(r)?function(t,e){let s=Qs(e);return(e,i,o,n,r)=>i.map(e=>s(t(e)))}(F,r):r||N:r||ji,t.filter=ms(t.filter||(o.distr>=3&&10==o.log?Ki:3==o.distr&&2==o.log?Zi:vs)),t.font=Xo(t.font),t.labelFont=Xo(t.labelFont),t._size=t.size(i,null,e,0),t._space=t._rotate=t._incrs=t._found=t._splits=t._values=null,t._size>0&&(Ot[e]=!0,t._el=Ee("u-axis",p))}}),s?s instanceof HTMLElement?(s.appendChild(d),ko()):s(i,ko):ko(),i}Zo.assign=js,Zo.fmtNum=Ze,Zo.rangeNum=Ye,Zo.rangeLog=Be,Zo.rangeAsinh=He,Zo.orient=uo,Zo.pxRatio=xe,Zo.join=function(t,e){if(function(t){let e=t[0][0],s=e.length;for(let i=1;i<t.length;i++){let o=t[i][0];if(o.length!=s)return!1;if(o!=e)for(let t=0;t<s;t++)if(o[t]!=e[t])return!1}return!0}(t)){let e=t[0].slice();for(let s=1;s<t.length;s++)e.push(...t[s].slice(1));return function(t,e=100){const s=t.length;if(s<=1)return!0;let i=0,o=s-1;for(;i<=o&&null==t[i];)i++;for(;o>=i&&null==t[o];)o--;if(o<=i)return!0;const n=rs(1,ss((o-i+1)/e));for(let e=t[i],s=i+n;s<=o;s+=n){const i=t[s];if(null!=i){if(i<=e)return!1;e=i}}return!0}(e[0])||(e=function(t){let e=t[0],s=e.length,i=Array(s);for(let t=0;t<i.length;t++)i[t]=t;i.sort((t,s)=>e[t]-e[s]);let o=[];for(let e=0;e<t.length;e++){let n=t[e],r=Array(s);for(let t=0;t<s;t++)r[t]=n[i[t]];o.push(r)}return o}(e)),e}let s=new Set;for(let e=0;e<t.length;e++){let i=t[e][0],o=i.length;for(let t=0;t<o;t++)s.add(i[t])}let i=[Array.from(s).sort((t,e)=>t-e)],o=i[0].length,n=new Map;for(let t=0;t<o;t++)n.set(i[0][t],t);for(let s=0;s<t.length;s++){let r=t[s],a=r[0];for(let t=1;t<r.length;t++){let l=r[t],d=Array(o).fill(void 0),c=e?e[s][t]:1,u=[];for(let t=0;t<l.length;t++){let e=l[t],s=n.get(a[t]);null===e?0!=c&&(d[s]=e,2==c&&u.push(s)):d[s]=e}Bs(d,u,o),i.push(d)}}return i},Zo.fmtDate=Qs,Zo.tzDate=function(t,e){let s;return"UTC"==e||"Etc/UTC"==e?s=new Date(+t+6e4*t.getTimezoneOffset()):e==ti?s=t:(s=new Date(t.toLocaleString("en-US",{timeZone:e})),s.setMilliseconds(t.getMilliseconds())),s},Zo.sync=co;{Zo.addGap=function(t,e,s){let i=t[t.length-1];i&&i[0]==e?i[1]=s:t.push([e,s])},Zo.clipGaps=fo;let t=Zo.paths={points:Do};t.linear=Mo,t.stepped=function(t){const e=Je(t.align,1),s=Je(t.ascDesc,!1),i=Je(t.alignGaps,0),o=Je(t.extend,!1);return(t,n,r,a)=>uo(t,n,(l,d,c,u,p,h,g,f,m,b,v)=>{[r,a]=Re(c,r,a);let _=l.pxRound,{left:x,width:y}=t.bbox,w=t=>_(h(t,u,b,f)),$=t=>_(g(t,p,v,m)),k=0==u.ori?yo:wo;const S={stroke:new Path2D,fill:null,clip:null,band:null,gaps:null,flags:1},E=S.stroke,T=u.dir*(0==u.ori?1:-1);let C=$(c[1==T?r:a]),D=w(d[1==T?r:a]),A=D,z=D;o&&-1==e&&(z=x,k(E,z,C)),k(E,D,C);for(let t=1==T?r:a;t>=r&&t<=a;t+=T){let s=c[t];if(null==s)continue;let i=w(d[t]),o=$(s);1==e?k(E,i,C):k(E,A,o),k(E,i,o),C=o,A=i}let F=A;o&&1==e&&(F=x+y,k(E,F,C));let[M,P]=po(t,n);if(null!=l.fill||0!=M){let e=S.fill=new Path2D(E),s=$(l.fillTo(t,n,l.min,l.max,M));k(e,F,s),k(e,z,s)}if(!l.spanGaps){let o=[];o.push(...mo(d,c,r,a,T,w,i));let p=l.width*xe/2,h=s||1==e?p:-p,g=s||-1==e?-p:p;o.forEach(t=>{t[0]+=h,t[1]+=g}),S.gaps=o=l.gaps(t,n,r,a,o),S.clip=fo(o,u.ori,f,m,b,v)}return 0!=P&&(S.band=2==P?[go(t,n,r,a,E,-1),go(t,n,r,a,E,1)]:go(t,n,r,a,E,P)),S})},t.bars=function(t){const e=Je((t=t||zs).size,[.6,ps,1]),s=t.align||0,i=t.gap||0;let o=t.radius;o=null==o?[0,0]:"number"==typeof o?[o,0]:o;const n=ms(o),r=1-e[0],a=Je(e[1],ps),l=Je(e[2],1),d=Je(t.disp,zs),c=Je(t.each,t=>{}),{fill:u,stroke:p}=d;return(t,e,o,h)=>uo(t,e,(g,f,m,b,v,_,x,y,w,$,k)=>{let S,E,T=g.pxRound,C=s,D=i*xe,A=a*xe,z=l*xe;0==b.ori?[S,E]=n(t,e):[E,S]=n(t,e);const F=b.dir*(0==b.ori?1:-1);let M,P,N,O=0==b.ori?$o:ko,L=0==b.ori?c:(t,e,s,i,o,n,r)=>{c(t,e,s,o,i,r,n)},I=Je(t.bands,Fs).find(t=>t.series[0]==e),G=null!=I?I.dir:0,U=g.fillTo(t,e,g.min,g.max,G),R=T(x(U,v,k,w)),j=$,B=T(g.width*xe),H=!1,V=null,q=null,W=null,Y=null;null==u||0!=B&&null==p||(H=!0,V=u.values(t,e,o,h),q=new Map,new Set(V).forEach(t=>{null!=t&&q.set(t,new Path2D)}),B>0&&(W=p.values(t,e,o,h),Y=new Map,new Set(W).forEach(t=>{null!=t&&Y.set(t,new Path2D)})));let{x0:J,size:X}=d;if(null!=J&&null!=X){C=1,f=J.values(t,e,o,h),2==J.unit&&(f=f.map(e=>t.posToVal(y+e*$,b.key,!0)));let s=X.values(t,e,o,h);P=2==X.unit?s[0]*$:_(s[0],b,$,y)-_(0,b,$,y),j=Po(f,m,_,b,$,y,j),N=j-P+D}else j=Po(f,m,_,b,$,y,j),N=j*r+D,P=j-N;N<1&&(N=0),B>=P/2&&(B=0),N<5&&(T=bs);let K=N>0;P=T(gs(j-N-(K?B:0),z,A)),M=(0==C?P/2:C==F?0:P)-C*F*((0==C?D/2:0)+(K?B/2:0));const Z={stroke:null,fill:null,clip:null,band:null,gaps:null,flags:0},Q=H?null:new Path2D;let tt=null;if(null!=I)tt=t.data[I.series[1]];else{let{y0:s,y1:i}=d;null!=s&&null!=i&&(m=i.values(t,e,o,h),tt=s.values(t,e,o,h))}let et=S*P,st=E*P;for(let s=1==F?o:h;s>=o&&s<=h;s+=F){let i=m[s];if(null==i)continue;if(null!=tt){let t=tt[s]??0;if(i-t==0)continue;R=x(t,v,k,w)}let o=_(2!=b.distr||null!=d?f[s]:s,b,$,y),n=x(Je(i,U),v,k,w),r=T(o-M),a=T(rs(n,R)),l=T(ns(n,R)),c=a-l;if(null!=i){let o=i<0?st:et,n=i<0?et:st;H?(B>0&&null!=W[s]&&O(Y.get(W[s]),r,l+ss(B/2),P,rs(0,c-B),o,n),null!=V[s]&&O(q.get(V[s]),r,l+ss(B/2),P,rs(0,c-B),o,n)):O(Q,r,l+ss(B/2),P,rs(0,c-B),o,n),L(t,e,s,r-B/2,l,P+B,c)}}return B>0?Z.stroke=H?Y:Q:H||(Z._fill=0==g.width?g._fill:g._stroke??g._fill,Z.width=0),Z.fill=H?q:Q,Z})},t.spline=function(t){return function(t,e){const s=Je(e?.alignGaps,0);return(e,i,o,n)=>uo(e,i,(r,a,l,d,c,u,p,h,g,f,m)=>{[o,n]=Re(l,o,n);let b,v,_,x=r.pxRound,y=t=>x(u(t,d,f,h)),w=t=>x(p(t,c,m,g));0==d.ori?(b=_o,_=yo,v=To):(b=xo,_=wo,v=Co);const $=d.dir*(0==d.ori?1:-1);let k=y(a[1==$?o:n]),S=k,E=[],T=[];for(let t=1==$?o:n;t>=o&&t<=n;t+=$)if(null!=l[t]){let e=y(a[t]);E.push(S=e),T.push(w(l[t]))}const C={stroke:t(E,T,b,_,v,x),fill:null,clip:null,band:null,gaps:null,flags:1},D=C.stroke;let[A,z]=po(e,i);if(null!=r.fill||0!=A){let t=C.fill=new Path2D(D),s=w(r.fillTo(e,i,r.min,r.max,A));_(t,S,s),_(t,k,s)}if(!r.spanGaps){let t=[];t.push(...mo(a,l,o,n,$,y,s)),C.gaps=t=r.gaps(e,i,o,n,t),C.clip=fo(t,d.ori,h,g,f,m)}return 0!=z&&(C.band=2==z?[go(e,i,o,n,D,-1),go(e,i,o,n,D,1)]:go(e,i,o,n,D,z)),C})}(No,t)}}class Qo extends lt{static properties={deviceId:{type:String},attrName:{type:String},hours:{type:Number,state:!0},_loading:{type:Boolean,state:!0},_error:{type:String,state:!0}};static styles=n`
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
  `;constructor(){super(),this.hours=24,this._loading=!1,this._error="",this._chart=null,this._data=null}connectedCallback(){super.connectedCallback(),this._fetchData()}disconnectedCallback(){super.disconnectedCallback(),this._chart&&(this._chart.destroy(),this._chart=null)}async _fetchData(){this._loading=!0,this._error="";try{const{fetchAttributeHistory:t}=await Promise.resolve().then(function(){return Yt}),e=await t(this.deviceId,this.attrName,this.hours);this._data=e,this._loading=!1,await this.updateComplete,this._renderChart()}catch(t){this._error=t.message||"Failed to load history",this._loading=!1}}_renderChart(){this._data&&0!==this._data.length&&requestAnimationFrame(()=>this._doRenderChart())}_doRenderChart(){if(!this._data||0===this._data.length)return;const t=this.shadowRoot.querySelector(".chart-wrap");if(!t)return;this._chart&&(this._chart.destroy(),this._chart=null),t.innerHTML="";const e=[],s=[];for(const t of this._data){const i=new Date(t.last_changed).getTime()/1e3,o=parseFloat(t.state);isNaN(o)||(e.push(i),s.push(o))}if(0===e.length)return;const i={width:t.clientWidth||660,height:200,cursor:{show:!0},select:{show:!1},legend:{show:!1},axes:[{stroke:"rgba(255,255,255,0.2)",grid:{stroke:"rgba(255,255,255,0.05)",width:1},ticks:{stroke:"rgba(255,255,255,0.1)",width:1},font:"9px Segoe UI, sans-serif",values:(t,e)=>e.map(t=>{const e=new Date(1e3*t);return`${e.getHours()}:${String(e.getMinutes()).padStart(2,"0")}`})},{stroke:"rgba(255,255,255,0.2)",grid:{stroke:"rgba(255,255,255,0.05)",width:1},ticks:{stroke:"rgba(255,255,255,0.1)",width:1},font:"9px Segoe UI, sans-serif",size:40}],series:[{},{stroke:"#00D4FF",width:1.5,fill:"rgba(0,212,255,0.08)"}]};this._chart=new Zo(i,[e,s],t)}_setHours(t){this.hours=t,this._fetchData()}_close(){this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}render(){return B`
      <div class="overlay" @click=${t=>{t.target===t.currentTarget&&this._close()}}>
        <div class="chart-container">
          <div class="chart-header">
            <div>
              <div class="chart-title">${this.attrName.replace(/_/g," ")}</div>
              <div class="chart-subtitle">${this.deviceId}</div>
            </div>
            <button class="close-btn" @click=${this._close}>✕</button>
          </div>
          <div class="time-range">
            ${[1,6,24,168].map(t=>B`
              <button class="range-btn ${this.hours===t?"active":""}"
                @click=${()=>this._setHours(t)}>
                ${t<=24?`${t}h`:"7d"}
              </button>
            `)}
          </div>
          ${this._loading?B`<div class="loading">Loading...</div>`:this._error?B`<div class="error">${this._error}</div>`:this._data&&0!==this._data.length||this._loading?B`<div class="chart-wrap"></div>`:B`<div class="no-data">No history data</div>`}
        </div>
      </div>
    `}}customElements.define("attribute-chart",Qo);class tn extends lt{static properties={device:{type:Object},effectiveSettings:{type:Object},haOverrides:{type:Object},groups:{type:Object},cardAttributes:{type:Array},attributeTransforms:{type:Object},groupTransforms:{type:Object},_showHidden:{type:Boolean,state:!0},_expandedChart:{type:String,state:!0}};static styles=[ct,n`
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
  `];constructor(){super(),this.device=null,this.effectiveSettings=null,this.haOverrides={},this.groups={},this.cardAttributes=[],this.attributeTransforms={},this.groupTransforms={},this._showHidden=!1,this._expandedChart=null}_isExposed(t){if(void 0!==this.haOverrides[t])return this.haOverrides[t];const e=this.effectiveSettings;return void 0!==e?.ha_exposure_overrides?.[t]?e.ha_exposure_overrides[t]:"all"===e?.ha_exposure||!!e?.ha_exposed_attributes?.includes(t)}_getThresholdForAttr(t){const e=this.effectiveSettings;if(!e)return null;const s=(e.thresholds||{})[t];if(null==s)return null;const i="object"==typeof s?s.value:s;if(null==i)return null;const o=this.device?.threshold_overrides||{},n=this.device?.group_policy,r=n?this.groups[n]:null;let a="global";return null!=o[t]?a="device":null!=r?.thresholds?.[t]&&(a="Group Policy"),{value:i,source:a}}_checkThreshold(t,e){if(!e||null==t||"number"!=typeof t)return!1;const s="object"==typeof e?e.value:e,i="object"==typeof e&&e.op||">";if(null==s)return!1;switch(i){case">":default:return t>s;case"<":return t<s;case">=":return t>=s;case"<=":return t<=s;case"==":return t===s;case"!=":return t!==s}}_getThresholdOp(t){const e=(this.device?.threshold_overrides||{})[t];if(null!=e&&"object"==typeof e)return e.op||">";const s=this.effectiveSettings;if(!s)return">";const i=(s.thresholds||{})[t];return null!=i&&"object"==typeof i&&i.op||">"}_getThresholdVal(t){const e=(this.device?.threshold_overrides||{})[t];if(null!=e)return"object"==typeof e?e.value:e;const s=this._getThresholdForAttr(t);return s?s.value:null}_getCritThresholdOp(t){const e=(this.device?.crit_threshold_overrides||{})[t];return null!=e&&"object"==typeof e&&e.op||">"}_getCritThresholdVal(t){const e=(this.device?.crit_threshold_overrides||{})[t];return null!=e?"object"==typeof e?e.value:e:null}render(){if(!this.device)return B``;const t=Object.entries(this.device.attributes||{}).sort(([t],[e])=>t.localeCompare(e)),e=this.device.hidden_attributes||[],s=t.filter(([t])=>!e.includes(t)),i=t.filter(([t])=>e.includes(t));return 0===t.length?B``:B`
      <div class="section">
        <div class="section-title">Attributes</div>
        <div class="attr-grid">
          ${s.map(([t,e])=>this._renderAttrTile(t,e))}
        </div>
        ${i.length>0?B`
          <div style="margin-top: 12px;">
            <div style="font-size: 10px; color: #fff; margin-bottom: 6px; cursor: pointer;"
              @click=${()=>this._showHidden=!this._showHidden}>
              ${this._showHidden?"▾":"▸"} ${i.length} hidden attribute${1!==i.length?"s":""}
            </div>
            ${this._showHidden?B`
              <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                ${i.map(([t])=>B`
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
    `}_renderAttrTile(t,e){const s=this._isExposed(t),i=this._getThresholdForAttr(t),o=null!=e.value?e.value:null,n=(this.device?.threshold_overrides||{})[t],r=null!=n?n:i?i.value:null,a=this._checkThreshold(o,r),l=this._getThresholdOp(t),d=this._getThresholdVal(t),c=(this.cardAttributes||[]).includes(t),u=(this.attributeTransforms||{})[t]||"",p=this._getCritThresholdOp(t),h=this._getCritThresholdVal(t),g=this.device?.crit_threshold_overrides||{},f=null!=g[t]?g[t]:null,m=this._checkThreshold(o,f),b=m?"critical-val":a?"exceeded-val":"";return B`
      <div class="attr-tile ${s?"":"dimmed"} ${m?"critical":a?"exceeded":""}">
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
            aria-checked=${s?"true":"false"}
            aria-label="Expose ${t.replace(/_/g," ")} to Home Assistant"
            tabindex="0"
            @click=${()=>this._onToggleExposure(t)}
            @keydown=${e=>("Enter"===e.key||" "===e.key)&&this._onToggleExposure(t)}>
            <div class="toggle ${s?"on":"off"}">
              <div class="toggle-knob"></div>
            </div>
          </span>
        </div>
        <div class="attr-val ${s?"":"dimmed-val"} ${b}">
          ${this._formatValue(o,e.unit,u)}
        </div>
        <div class="attr-thresholds">
          <div class="attr-threshold-row">
            ${a?B`<span style="color: #ffb74d; font-size: 11px;">\u26A0</span>`:""}
            <span class="threshold-label warn">warn</span>
            <select class="threshold-op"
              aria-label="Warning threshold operator for ${t.replace(/_/g," ")}"
              .value=${l}
              @change=${e=>this._onThresholdChange(t,d,e.target.value)}>
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
              .value=${null!=d?String(d):""}
              @change=${e=>this._onThresholdChange(t,e.target.value,l)}>
            ${i&&"device"!==i.source&&null==n?B`
              <span class="threshold-source">${i.source}</span>
            `:""}
          </div>
          <div class="attr-threshold-row">
            ${m?B`<span style="color: #ef5350; font-size: 11px;">\u26A0</span>`:""}
            <span class="threshold-label crit">crit</span>
            <select class="threshold-op"
              aria-label="Critical threshold operator for ${t.replace(/_/g," ")}"
              .value=${p}
              @change=${e=>this._onCritThresholdChange(t,h,e.target.value)}>
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
              .value=${null!=h?String(h):""}
              @change=${e=>this._onCritThresholdChange(t,e.target.value,p)}>
          </div>
        </div>
        <div class="attr-transform">
          <div class="transform-label">Transform</div>
          <select class="transform-select"
            aria-label="Value transform for ${t.replace(/_/g," ")}"
            .value=${u}
            @change=${e=>this._onTransformChange(t,e.target.value)}>
            ${function(){const t=gt.map(t=>({value:t.id,label:t.name}));return[...mt,...t]}().map(t=>B`
              <option value=${t.value} ?selected=${t.value===u}>${t.label}</option>
            `)}
          </select>
          ${(this.groupTransforms||{})[t]&&!(this.device?.attribute_transforms||{})[t]?B`<span class="transform-source">Group Policy</span>`:""}
        </div>
        ${this._isExposed(t)?B`
          <div style="margin-top: 4px;">
            <button style="background: none; border: 1px solid rgba(255,255,255,0.08); border-radius: 4px; color: ${this._expandedChart===t?"#00D4FF":"rgba(255,255,255,0.25)"}; cursor: pointer; padding: 2px 6px; font-size: 10px; transition: all 0.15s;"
              @click=${e=>{e.stopPropagation(),this._expandedChart=this._expandedChart===t?null:t}}>
              ${this._expandedChart===t?"▾ History":"▸ History"}
            </button>
          </div>
          ${this._expandedChart===t?B`
            <attribute-chart
              .deviceId=${this.device?.device_id||""}
              .attrName=${t}
              @close=${()=>{this._expandedChart=null}}
            ></attribute-chart>
          `:""}
        `:""}
      </div>
    `}_onDelete(t){this.dispatchEvent(new CustomEvent("attribute-deleted",{detail:{name:t},bubbles:!0,composed:!0}))}_onUnhide(t){this.dispatchEvent(new CustomEvent("attribute-unhidden",{detail:{name:t},bubbles:!0,composed:!0}))}_onToggleExposure(t){this.dispatchEvent(new CustomEvent("ha-exposure-toggled",{detail:{name:t},bubbles:!0,composed:!0}))}_onThresholdChange(t,e,s){this.dispatchEvent(new CustomEvent("threshold-changed",{detail:{name:t,value:e,op:s},bubbles:!0,composed:!0}))}_onCritThresholdChange(t,e,s){this.dispatchEvent(new CustomEvent("crit-threshold-changed",{detail:{name:t,value:e,op:s},bubbles:!0,composed:!0}))}_formatValue(t,e,s){if(null==t)return"—";if(s){return ht(t,s)}return B`${t}<span class="attr-unit">${e||""}</span>`}_onTransformChange(t,e){this.dispatchEvent(new CustomEvent("transform-changed",{detail:{attr:t,transform:e||null},bubbles:!0,composed:!0}))}_togglePin(t){this.dispatchEvent(new CustomEvent("pin-attribute",{detail:{name:t,pinned:!(this.cardAttributes||[]).includes(t)},bubbles:!0,composed:!0}))}}customElements.define("device-attributes",tn);const en=["shutdown","halt","poweroff","destroy"];class sn extends lt{static properties={device:{type:Object},serverCommands:{type:Object},commandResult:{type:String},_showHiddenCmds:{type:Boolean,state:!0},_showAddCommand:{type:Boolean,state:!0},_editingCommandName:{type:String,state:!0},_editCommandForm:{type:Object,state:!0}};static styles=[ct,n`
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
  `];constructor(){super(),this.device=null,this.serverCommands={},this.commandResult="",this._showHiddenCmds=!1,this._showAddCommand=!1,this._editingCommandName=null,this._editCommandForm=null}render(){if(!this.device)return B``;const t=this.device.allowed_commands||[],e=this.serverCommands||{},s=Object.keys(e),i=[...new Set([...t,...s])],o=this.device.hidden_commands||[],n=i.filter(t=>!o.includes(t)),r=i.filter(t=>o.includes(t)),a=(this.device.active_plugins||[]).includes("custom_command");return B`
      <div class="section">
        <div class="section-title">Commands</div>

        ${n.length>0?B`
          <div class="commands" style="margin-bottom: 12px;">
            ${n.map(t=>B`
              <span class="cmd-wrap">
                <button class="cmd-btn ${function(t){const e=t.toLowerCase();return en.some(t=>e.includes(t))}(t)?"danger":""}"
                  @click=${()=>this._onSend(t)}>${t}</button>
                <span class="cmd-eye" title="Hide command"
                  @click=${e=>{e.stopPropagation(),this._onHide(t)}}>&#128065;</span>
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

        ${r.length>0?B`
          <div style="margin-top: 12px;">
            <div style="font-size: 10px; color: #fff; margin-bottom: 6px; cursor: pointer;"
              @click=${()=>this._showHiddenCmds=!this._showHiddenCmds}>
              ${this._showHiddenCmds?"▾":"▸"} ${r.length} hidden
            </div>
            ${this._showHiddenCmds?B`
              <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                ${r.map(t=>B`
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
    `}_startAdd(){this._showAddCommand=!0,this._editingCommandName=null,this._editCommandForm={name:"",shell:""}}_startEdit(t,e){this._editingCommandName=t,this._showAddCommand=!1,this._editCommandForm={name:t,shell:e}}_saveForm(){const t=this._editCommandForm;if(!t)return;const e=(t.name||"").trim(),s=(t.shell||"").trim();e&&s&&(this.dispatchEvent(new CustomEvent("server-command-save",{detail:{name:e,shell:s,editing:this._editingCommandName},bubbles:!0,composed:!0})),this._cancelForm())}_cancelForm(){this._showAddCommand=!1,this._editingCommandName=null,this._editCommandForm=null}_onSend(t){this.dispatchEvent(new CustomEvent("command-send",{detail:{command:t},bubbles:!0,composed:!0}))}_onHide(t){this.dispatchEvent(new CustomEvent("command-hide",{detail:{name:t},bubbles:!0,composed:!0}))}_onUnhide(t){this.dispatchEvent(new CustomEvent("command-unhide",{detail:{name:t},bubbles:!0,composed:!0}))}_onRemove(t){this.dispatchEvent(new CustomEvent("server-command-remove",{detail:{name:t},bubbles:!0,composed:!0}))}}customElements.define("device-commands",sn);class on extends lt{static properties={device:{type:Object},configInterval:{type:Number},customSensors:{type:Object},_showAddSensor:{type:Boolean,state:!0},_editSensorKey:{type:String,state:!0},_sensorForm:{type:Object,state:!0}};static styles=[ct,n`
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
  `];constructor(){super(),this.device=null,this.configInterval=30,this.customSensors={},this.pushing=!1,this.pushStatus="",this.lastPushed="",this._showAddSensor=!1,this._editSensorKey=null,this._sensorForm={name:"",command:"",interval:30,unit:""}}render(){if(!this.device)return B``;const t=this.device.remote_config||{},e=this.device.active_plugins||(t.plugins?Object.keys(t.plugins):[]),s=this.customSensors;return B`
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
          ${Object.keys(s).length>0?B`
            <table class="sensor-table">
              <thead>
                <tr>
                  <th>Name</th><th>Command</th><th>Interval</th><th>Unit</th><th></th>
                </tr>
              </thead>
              <tbody>
                ${Object.entries(s).map(([t,e])=>B`
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
    `}_startAdd(){this._showAddSensor=!0,this._editSensorKey=null,this._sensorForm={name:"",command:"",interval:30,unit:""}}_startEdit(t,e){this._editSensorKey=t,this._showAddSensor=!1,this._sensorForm={name:t,command:e.command,interval:e.interval||30,unit:e.unit||""}}_saveForm(){const{name:t,command:e,interval:s,unit:i}=this._sensorForm;t.trim()&&e.trim()&&(this.dispatchEvent(new CustomEvent("sensor-save",{detail:{key:t.trim(),sensor:{command:e,interval:s||30,unit:i},oldKey:this._editSensorKey},bubbles:!0,composed:!0})),this._cancelForm())}_cancelForm(){this._showAddSensor=!1,this._editSensorKey=null,this._sensorForm={name:"",command:"",interval:30,unit:""}}_onIntervalChange(t){this.dispatchEvent(new CustomEvent("interval-changed",{detail:{value:t},bubbles:!0,composed:!0}))}_onRemove(t){this.dispatchEvent(new CustomEvent("sensor-remove",{detail:{key:t},bubbles:!0,composed:!0}))}}customElements.define("device-config",on);class nn extends lt{static properties={_open:{type:Boolean,state:!0},_type:{type:String,state:!0},_title:{type:String,state:!0},_message:{type:String,state:!0},_placeholder:{type:String,state:!0},_confirmLabel:{type:String,state:!0},_confirmDanger:{type:Boolean,state:!0},_inputValue:{type:String,state:!0}};static styles=[ct,n`
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
  `];constructor(){super(),this._open=!1,this._type="confirm",this._title="",this._message="",this._placeholder="",this._confirmLabel="",this._confirmDanger=!1,this._inputValue="",this._resolve=null}show({type:t="confirm",title:e="",message:s="",placeholder:i="",defaultValue:o="",confirmLabel:n="",confirmDanger:r=!1}={}){return this._type=t,this._title=e,this._message=s,this._placeholder=i,this._confirmLabel=n||("prompt"===t?"Submit":"Confirm"),this._confirmDanger=r,this._inputValue=o,this._open=!0,new Promise(t=>{this._resolve=t})}_cancel(){this._open=!1,this._resolve&&(this._resolve("prompt"===this._type&&null),this._resolve=null)}_confirm(){this._open=!1,this._resolve&&(this._resolve("prompt"!==this._type||this._inputValue),this._resolve=null)}_onKeyDown(t){"Enter"===t.key&&(t.preventDefault(),this._confirm())}_onInput(t){this._inputValue=t.target.value}updated(t){t.has("_open")&&this._open&&"prompt"===this._type&&this.updateComplete.then(()=>{const t=this.renderRoot.querySelector(".dialog-input");t&&t.focus()})}render(){if(!this._open)return B``;const t=this._confirmDanger?"btn btn-confirm danger":"btn btn-confirm";return B`
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
    `}}customElements.define("themed-dialog",nn);class rn extends lt{static properties={deviceId:{type:String},groupId:{type:String},device:{type:Object},commandResult:{type:String},_groups:{type:Object,state:!0},_effectiveSettings:{type:Object,state:!0},_haOverrides:{type:Object,state:!0},_configInterval:{type:Number,state:!0},_customSensors:{type:Object,state:!0},_showGroupDialog:{type:Boolean,state:!0},_newGroupName:{type:String,state:!0},_serverCommands:{type:Object,state:!0}};static styles=[ct,n`
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
  `];constructor(){super(),this.device=null,this.commandResult="",this._groups={},this._effectiveSettings=null,this._haOverrides={},this._configInterval=30,this._customSensors={},this._showGroupDialog=!1,this._newGroupName="",this._serverCommands={},this._loading=!1}get _isGroupMode(){return!!this.groupId&&!this.deviceId}connectedCallback(){super.connectedCallback(),this._loadGroups(),this._isGroupMode?this._loadGroupAggregate():this._loadDevice(),this._wsUnsub=ut.onMessage(t=>{if("device_update"===t.type){if(this._isGroupMode)return;t.device_id===this.deviceId&&this._updateDeviceData(t.device)}})}disconnectedCallback(){super.disconnectedCallback(),this._wsUnsub&&this._wsUnsub()}async _refreshDevice(){try{const t=await xt(this.deviceId);this._updateDeviceData(t)}catch(t){}}_updateDeviceData(t){if(!t)return;if(this._loading)return;const e={...this.device||{},...t},s=this.device;s&&s.status===e.status&&s.last_seen===e.last_seen&&Object.keys(e.attributes||{}).length===Object.keys(s.attributes||{}).length||(this.device=e)}async _loadGroupAggregate(){try{const t=await zt();this._groups=t;const e=t[this.groupId];if(!e)return;const s=await _t(),i=e.device_ids||[],o=i.map(t=>s[t]).filter(Boolean),n={};for(const t of o)for(const[e,s]of Object.entries(t.attributes||{}))n[e]||(n[e]={...s});const r=new Set;for(const t of o)for(const e of t.allowed_commands||[])r.add(e);const a=new Set;for(const t of o)for(const e of t.active_plugins||[])a.add(e);a.add("custom_command"),this.device={device_name:e.name,device_type:`Group · ${i.length} device${1!==i.length?"s":""}`,status:o.some(t=>"online"===t.status)?"online":"offline",attributes:n,attribute_transforms:e.attribute_transforms||{},threshold_overrides:e.thresholds||{},crit_threshold_overrides:e.crit_thresholds||{},allowed_commands:[...r],hidden_commands:e.hidden_commands||[],hidden_attributes:e.hidden_attributes||[],card_attributes:e.card_attributes||[],active_plugins:[...a],tags:[],server_tags:[],group_policy:this.groupId,_isGroupAggregate:!0},this._configInterval=e.interval??30,this._serverCommands={},this._customSensors=e.custom_sensors||{},this._haOverrides={},this._effectiveSettings=null}catch(t){console.error("Failed to load group aggregate:",t)}}async _refreshGroupAggregate(){try{const t=(await zt())[this.groupId];if(!t)return;const e=await _t(),s=(t.device_ids||[]).map(t=>e[t]).filter(Boolean),i={};for(const t of s)for(const[e,s]of Object.entries(t.attributes||{}))i[e]||(i[e]={...s});this.device={...this.device,attributes:i},this._groups={...this._groups,[this.groupId]:t},this._customSensors=t.custom_sensors||{},this.requestUpdate()}catch(t){}}async _loadDevice(){this._loading=!0;try{this.device=await xt(this.deviceId),this._haOverrides={...this.device.ha_exposure_overrides||{}};const t=this.device.server_commands;this._serverCommands=t&&!Array.isArray(t)?{...t}:{},this._configInterval=this.device.config_interval??this.device.collection_interval??this.device.remote_config?.interval??30;const e=this.device.server_sensors;this._customSensors=e&&"object"==typeof e?{...e}:{};try{this._effectiveSettings=await Vt(this.deviceId)}catch(t){}}catch(t){console.error("Failed to load device:",t)}finally{this._loading=!1}}async _loadGroups(){try{this._groups=await zt()}catch(t){console.error("Failed to load groups:",t)}}render(){if(!this.device)return B`<div style="padding: 40px; text-align: center; color: #fff;">Loading...</div>`;const t=this.device,e=this._isGroupMode,s="online"===t.status?"#04d65c":"offline"===t.status?"#ef5350":"#ffb74d";return B`
      <!-- 1. Header -->
      <div class="header">
        <div class="header-left">
          ${e?B`<span class="title" contenteditable="true"
                @blur=${t=>this._renameGroup(t.target.textContent.trim())}
                @keydown=${t=>{"Enter"===t.key&&(t.preventDefault(),t.target.blur())}}
                >${t.device_name||this.groupId}</span>`:B`<span class="title">${t.device_name||this.deviceId}</span>`}
          <span class="device-type">${t.device_type||""}${t.client_version?` · v${t.client_version}`:""}</span>
        </div>
        <div style="display: flex; align-items: center; gap: 10px;">
          ${e?B`
            <span style="font-size: 11px; color: rgba(255,255,255,0.4);">Group Policy Editor</span>
            <button class="cmd-btn" style="font-size: 10px; padding: 3px 8px; background: rgba(239,83,80,0.1); color: #ef5350; border: 1px solid rgba(239,83,80,0.2);"
              @click=${this._forceApplyGroup}>Force Apply</button>
          `:B`
            <span class="status-badge" style="background: ${s}20; color: ${s}">
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
      <themed-dialog></themed-dialog>
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
    `}async _addTag(t){t&&(await Nt(this.deviceId,[t]),await this._loadDevice())}async _removeTag(t){await Ot(this.deviceId,t),await this._loadDevice()}_renderGroupPolicy(){const t=Object.values(this._groups),e=this.device.group_policy||"";e&&this._groups[e];return B`
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
    `}async _createGroup(){const t=this._newGroupName.trim();if(!t)return;const e=t.toLowerCase().replace(/[^a-z0-9]+/g,"_");await Ft(e,t,[this.deviceId]),this._newGroupName="",this._showGroupDialog=!1,await this._loadGroups(),await this._loadDevice()}async _renameGroup(t){if(!t||!this.groupId)return;const e=this._groups?.[this.groupId];if(e&&e.name!==t)try{await Mt(this.groupId,{...e,name:t}),this._groups={...this._groups,[this.groupId]:{...e,name:t}},this.device={...this.device,device_name:t}}catch(t){console.error("Failed to rename group:",t)}}_renderNetwork(){const t=this.device.network||{};return 0===Object.keys(t).length?B``:B`
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
    `}async _deleteAttribute(t){if(this._isGroupMode){const e=[...this.device.hidden_attributes||[]];return e.includes(t)||e.push(t),this.device={...this.device,hidden_attributes:e},void await this._saveGroupUpdate({hidden_attributes:e})}const e=this.shadowRoot.querySelector("themed-dialog");if(await e.show({type:"confirm",title:"Hide Attribute",message:`Hide attribute "${t}"? Custom sensors will be removed from the client. Built-in attributes will be hidden.`,confirmLabel:"Hide",confirmDanger:!0}))try{await wt(this.deviceId,t);const e=this.device?.card_attributes||[];if(e.includes(t)){const s=e.filter(e=>e!==t);await qt(this.deviceId,{card_attributes:s})}await this._loadDevice()}catch(t){console.error("Failed to hide attribute:",t)}}async _unhideAttribute(t){if(this._isGroupMode){const e=(this.device.hidden_attributes||[]).filter(e=>e!==t);return this.device={...this.device,hidden_attributes:e},void await this._saveGroupUpdate({hidden_attributes:e})}try{await $t(this.deviceId,t),await this._loadDevice()}catch(t){console.error("Failed to unhide attribute:",t)}}async _toggleHaExposure(t){if(this._isGroupMode)return;const e=void 0!==this._haOverrides[t]?this._haOverrides[t]:void 0!==this._effectiveSettings?.ha_exposure_overrides?.[t]&&this._effectiveSettings.ha_exposure_overrides[t];this._haOverrides={...this._haOverrides,[t]:!e};try{await qt(this.deviceId,{ha_exposure_overrides:this._haOverrides})}catch(t){console.error("Failed to update HA exposure:",t)}}async _setThreshold(t,e,s){if(this._isGroupMode)return this._setGroupThreshold(t,e,s);const i={...this.device.threshold_overrides||{}};""===e||null==e?delete i[t]:i[t]={op:s||">",value:Number(e)};try{await qt(this.deviceId,{threshold_overrides:i}),this.device={...this.device,threshold_overrides:i},this._effectiveSettings=await Vt(this.deviceId)}catch(t){console.error("Failed to set threshold:",t)}}async _setCritThreshold(t,e,s){if(this._isGroupMode)return this._setGroupCritThreshold(t,e,s);const i={...this.device.crit_threshold_overrides||{}};""===e||null==e?delete i[t]:i[t]={op:s||">",value:Number(e)};try{await qt(this.deviceId,{crit_threshold_overrides:i}),this.device={...this.device,crit_threshold_overrides:i}}catch(t){console.error("Failed to set crit threshold:",t)}}_effectiveTransforms(){if(this._isGroupMode)return this.device?.attribute_transforms||{};const t=this.device?.group_policy,e=t?this._groups[t]:null;return{...e?.attribute_transforms||{},...this.device?.attribute_transforms||{}}}_groupTransforms(){if(this._isGroupMode)return{};const t=this.device?.group_policy,e=t?this._groups[t]:null;return e?.attribute_transforms||{}}async _setAttributeTransform(t,e){if(this._isGroupMode)return this._setGroupTransform(t,e);const s={...this.device?.attribute_transforms||{}};e?s[t]=e:delete s[t];try{await qt(this.deviceId,{attribute_transforms:s}),this.device={...this.device,attribute_transforms:s}}catch(t){console.error("Failed to update attribute transform:",t)}}async _forceApplyGroup(){const t=this.shadowRoot.querySelector("themed-dialog");if(await t.show({type:"confirm",title:"Force Apply Group Policy",message:"This will clear all device-level overrides for every member and enforce the group policy. Devices can still be customized afterwards.",confirmLabel:"Force Apply",confirmDanger:!0}))try{await Wt(this.groupId),await this._loadGroupAggregate()}catch(t){console.error("Failed to force apply:",t)}}async _saveGroupUpdate(t){const e=this._groups?.[this.groupId];if(e)try{const s={...e,...t};await Mt(this.groupId,s),this._groups={...this._groups,[this.groupId]:s};const i=Object.assign({},this.device,t);this.device=i,this.requestUpdate()}catch(t){console.error("Failed to update group:",t)}}async _setGroupThreshold(t,e,s){const i={...this.device.threshold_overrides||{}};""===e||null==e?delete i[t]:i[t]={op:s||">",value:Number(e)},this.device={...this.device,threshold_overrides:i},await this._saveGroupUpdate({thresholds:i})}async _setGroupCritThreshold(t,e,s){const i={...this.device.crit_threshold_overrides||{}};""===e||null==e?delete i[t]:i[t]={op:s||">",value:Number(e)},this.device={...this.device,crit_threshold_overrides:i},await this._saveGroupUpdate({crit_thresholds:i})}async _setGroupInterval(t){this._configInterval=t,await this._saveGroupUpdate({interval:t})}async _saveGroupCommand({name:t,shell:e}){const s=this._groups?.[this.groupId],i={...s?.custom_commands||{},[t]:e};await this._saveGroupUpdate({custom_commands:i}),this._groups={...this._groups,[this.groupId]:{...s,custom_commands:i}},this.requestUpdate()}async _removeGroupCommand(t){const e=this._groups?.[this.groupId],s={...e?.custom_commands||{}};delete s[t],await this._saveGroupUpdate({custom_commands:s}),this._groups={...this._groups,[this.groupId]:{...e,custom_commands:s}},this.requestUpdate()}async _saveGroupSensor({key:t,sensor:e,oldKey:s}){const i={...this._customSensors};if(s&&s!==t){delete i[s];const t={...this.device.attributes};delete t[s],this.device={...this.device,attributes:t}}i[t]=e,this._customSensors={...i};const o={...this.device.attributes};o[t]={value:"--",unit:e.unit||""},this.device={...this.device,attributes:o},await this._saveGroupUpdate({custom_sensors:i}),this.requestUpdate(),setTimeout(()=>this._refreshGroupAggregate(),5e3)}async _removeGroupSensor(t){const e={...this._customSensors};delete e[t],this._customSensors={...e};const s={...this.device.attributes};delete s[t],this.device={...this.device,attributes:s},await this._saveGroupUpdate({custom_sensors:e}),this.requestUpdate()}async _setGroupTransform(t,e){const s={...this.device?.attribute_transforms||{}};e?s[t]=e:delete s[t],this.device={...this.device,attribute_transforms:s},await this._saveGroupUpdate({attribute_transforms:s})}async _toggleCardAttribute({name:t,pinned:e}){const s=[...this.device?.card_attributes||[]];let i;if(i=e?[...s,t]:s.filter(e=>e!==t),this._isGroupMode)return this.device={...this.device,card_attributes:i},void await this._saveGroupUpdate({card_attributes:i});try{await qt(this.deviceId,{card_attributes:i}),this.device={...this.device,card_attributes:i}}catch(t){console.error("Failed to update card attributes:",t)}}async _sendCmd(t,e={}){if(!this._isGroupMode)try{this.commandResult=`Sending ${t}...`;const s=(await At(this.deviceId,t,e)).request_id;this.commandResult=`Sent ${t}... waiting for response`;const i=Date.now(),o=()=>{const t=(this.device?.command_history||[]).find(t=>t.request_id===s);t?this.commandResult=`${t.status}: ${t.output||"(no output)"}`:Date.now()-i<1e4?setTimeout(o,500):this.commandResult="Command sent (no response received)"};setTimeout(o,500)}catch(t){this.commandResult=`Error: ${t.message}`}}async _hideCommand(t){if(this._isGroupMode){const e=[...this.device.hidden_commands||[]];return e.includes(t)||e.push(t),this.device={...this.device,hidden_commands:e},void await this._saveGroupUpdate({hidden_commands:e})}try{await kt(this.deviceId,t),await this._loadDevice()}catch(t){console.error("Failed to hide command:",t)}}async _unhideCommand(t){if(this._isGroupMode){const e=(this.device.hidden_commands||[]).filter(e=>e!==t);return this.device={...this.device,hidden_commands:e},void await this._saveGroupUpdate({hidden_commands:e})}try{await St(this.deviceId,t),await this._loadDevice()}catch(t){console.error("Failed to unhide command:",t)}}async _saveServerCommand({name:t,shell:e}){const{addServerCommand:s}=await Promise.resolve().then(function(){return Yt});await s(this.deviceId,t,e),await this._loadDevice()}async _removeServerCommand(t){const{removeServerCommand:e}=await Promise.resolve().then(function(){return Yt});await e(this.deviceId,t),await this._loadDevice()}async _saveSensor({key:t,sensor:e,oldKey:s}){const{addServerSensor:i,removeServerSensor:o}=await Promise.resolve().then(function(){return Yt});s&&s!==t&&await o(this.deviceId,s),await i(this.deviceId,t,e),await this._loadDevice()}async _removeSensor(t){const{removeServerSensor:e}=await Promise.resolve().then(function(){return Yt});await e(this.deviceId,t),await this._loadDevice()}async _onIntervalChange(t){const{setDeviceInterval:e}=await Promise.resolve().then(function(){return Yt});await e(this.deviceId,t),await this._loadDevice()}async _deleteDevice(){const t=this.shadowRoot.querySelector("themed-dialog");if(await t.show({type:"confirm",title:"Delete Device",message:`Delete device "${this.device?.device_name||this.deviceId}"? This removes it from the registry. It will reappear if the client agent is still running.`,confirmLabel:"Delete",confirmDanger:!0}))try{await yt(this.deviceId),this.dispatchEvent(new CustomEvent("back"))}catch(t){console.error("Failed to delete device:",t)}}}customElements.define("device-detail",rn);const an={online:"#04d65c",offline:"#ef5350",warning:"#ffb74d",inferred:"#00D4FF",unknown:"#666"};class ln extends lt{static properties={topology:{type:Object},layouts:{type:Object},selectedLayout:{type:String},editMode:{type:Boolean},linkMode:{type:Boolean},selectedNode:{type:String},nodePositions:{type:Object},manualEdges:{type:Array},_dragging:{type:String,state:!0},_linkSource:{type:String,state:!0},_error:{type:String,state:!0},_loading:{type:Boolean,state:!0},_selectedEdge:{type:Number,state:!0},_selectedDeviceData:{type:Object,state:!0},_dirty:{type:Boolean,state:!0},_layoutDropdownOpen:{type:Boolean,state:!0},_showLabelDialog:{type:Boolean,state:!0},_labelEdgeIndex:{type:Number,state:!0},hideAutoEdges:{type:Boolean},_viewBox:{type:Object,state:!0}};static styles=[ct,n`
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
  `];constructor(){super(),this.topology={nodes:[],edges:[]},this.layouts={},this.selectedLayout="",this.editMode=!1,this.linkMode=!1,this.selectedNode=null,this.nodePositions={},this.manualEdges=[],this._dragging=null,this._dragOffset={x:0,y:0},this._linkSource=null,this._error="",this._loading=!0,this._selectedEdge=-1,this._selectedDeviceData=null,this._commandResult="",this._dirty=!1,this._layoutDropdownOpen=!1,this._showLabelDialog=!1,this._labelEdgeIndex=-1,this._savedPositions=null,this._savedManualEdges=null,this.hideAutoEdges=!1,this._viewBox={x:0,y:0,width:900,height:500},this._isPanning=!1,this._panStart=null,this._pinchActive=!1,this._pinchAnchor0=null,this._pinchAnchor1=null,this._pinchPrevDist=0}connectedCallback(){super.connectedCallback(),this._loadTopology(),this._loadLayouts(),this._wsUnsub=ut.onMessage(t=>{"device_update"===t.type&&this._refreshNodeStatuses()}),this._onDocClick=t=>{if(this._layoutDropdownOpen){const e=this.shadowRoot?.querySelector(".layout-dropdown");e&&!t.composedPath().includes(e)&&(this._layoutDropdownOpen=!1)}},document.addEventListener("click",this._onDocClick)}disconnectedCallback(){super.disconnectedCallback(),this._wsUnsub&&this._wsUnsub(),this._onDocClick&&document.removeEventListener("click",this._onDocClick)}async _refreshNodeStatuses(){try{const t=await Et();if(!t||!t.nodes)return;const e={};for(const s of t.nodes)e[s.id]=s.status;if(this.topology&&this.topology.nodes){let s=!1;const i=this.topology.nodes.map(t=>e[t.id]&&e[t.id]!==t.status?(s=!0,{...t,status:e[t.id]}):t);for(const e of t.nodes)this.topology.nodes.find(t=>t.id===e.id)||(i.push(e),s=!0);s&&(this.topology={...this.topology,nodes:i})}}catch(t){}}async _loadTopology(){try{this._loading=!0,this._error="";const t=await Et();this.topology=t,this._autoLayout(),this._loading=!1}catch(t){console.error("Failed to load topology:",t),this._error=`Failed to load: ${t.message}`,this._loading=!1}}async _loadLayouts(){try{if(this.layouts=await Tt(),!this._layoutsLoaded){this._layoutsLoaded=!0;const t=Object.entries(this.layouts).find(([,t])=>t.isDefault);t&&(this.selectedLayout=t[0],this.nodePositions=t[1].positions||{},this.manualEdges=t[1].manualEdges||[],this.hideAutoEdges=t[1].hideAutoEdges||!1,t[1].viewBox&&(this._viewBox={...t[1].viewBox}))}}catch(t){console.error("Failed to load layouts:",t)}}_autoLayout(){const t=this.topology.nodes;if(!t.length)return;const e={...this.selectedLayout&&this.layouts[this.selectedLayout]&&this.layouts[this.selectedLayout].positions||{}},s=Math.ceil(Math.sqrt(t.length));t.forEach((t,i)=>{if(!e[t.id]){const o=i%s,n=Math.floor(i/s);e[t.id]={x:100+o*(800/(s+1)),y:80+100*n}}}),this.nodePositions=e,this.selectedLayout&&this.layouts[this.selectedLayout]&&(this.manualEdges=this.layouts[this.selectedLayout].manualEdges||[]),this._fitAll()}get _allEdges(){const t=this.hideAutoEdges?[]:this.topology.edges||[],e=this.manualEdges.map(t=>({...t,type:"manual"}));return[...t,...e]}_getNodeName(t){const e=this.topology.nodes.find(e=>e.id===t);return e&&e.name||t}render(){if(this._loading&&!this.topology.nodes.length)return B`<div style="padding: 40px; text-align: center; color: #fff;">Loading topology...</div>`;if(this._error)return B`<div style="padding: 40px; text-align: center; color: #ef5350;">${this._error}</div>`;const t=this.topology.nodes,e=this._allEdges,s=t.filter(t=>"online"===t.status).length,i=t.filter(t=>"offline"===t.status).length,o=t.filter(t=>"warning"===t.status).length;return B`
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
          <span class="status-pill online">${s}</span>
          <span class="status-pill offline">${i}</span>
          <span class="status-pill warning">${o}</span>
        </div>
      </div>

      ${this.selectedNode&&!this.linkMode?this._renderDetailPanel():""}
      ${this.editMode&&this.manualEdges.length>0?this._renderManualEdgesList():""}
      ${this._showLabelDialog?this._renderLabelDialog():""}
      <themed-dialog></themed-dialog>
    `}_renderNode(t){const e=this.nodePositions[t.id]||{x:100,y:100},s=an[t.status]||an.unknown,i=this.selectedNode===t.id,o=this._linkSource===t.id,n=i||o?2.5:1.5,r=i?"4,2":o?"2,2":"none",a=o?"#ffb74d":s;return"gateway"===t.type?H`
        <g transform="translate(${e.x}, ${e.y})"
          @click=${e=>this._onNodeClick(e,t.id)}
          @mousedown=${e=>this.editMode&&!this.linkMode&&this._onMouseDown(e,t.id)}
          @touchstart=${e=>this.editMode&&!this.linkMode&&this._onTouchNodeStart(e,t.id)}
          style="cursor:pointer">
          <circle r="22" fill="#1a1a2e" stroke="${a}" stroke-width="${n}"
            stroke-dasharray="${r}"/>
          <text text-anchor="middle" dy="4" fill="${a}" font-size="10">${t.name.substring(0,12)}</text>
        </g>
      `:H`
      <g transform="translate(${e.x}, ${e.y})"
        @click=${e=>this._onNodeClick(e,t.id)}
        @mousedown=${e=>this.editMode&&!this.linkMode&&this._onMouseDown(e,t.id)}
        @touchstart=${e=>this.editMode&&!this.linkMode&&this._onTouchNodeStart(e,t.id)}
        style="cursor:pointer">
        <rect x="-45" y="-18" width="90" height="36" rx="6"
          fill="#1a1a2e" stroke="${a}" stroke-width="${n}"
          stroke-dasharray="${r}"/>
        <text text-anchor="middle" dy="-3" fill="${a}" font-size="10">
          ${(t.name||t.id).substring(0,12)}
        </text>
        <text text-anchor="middle" dy="10" fill="#666" font-size="8">${t.status}</text>
      </g>
    `}_edgeGeometry(t){const e=this.nodePositions[t.source],s=this.nodePositions[t.target];if(!e||!s)return null;const i=s.x-e.x,o=s.y-e.y,n=Math.sqrt(i*i+o*o)||1,r=i/n,a=o/n;let l=-a,d=r;d>0&&(l=-l,d=-d);const c=this._boxExitDistance(r,a);return{from:e,to:s,ux:r,uy:a,perpX:l,perpY:d,len:n,srcDist:c+8,tgtDist:c+8}}_boxExitDistance(t,e){if(Math.abs(t)<.001)return 22;if(Math.abs(e)<.001)return 48;const s=48/Math.abs(t),i=22/Math.abs(e);return Math.min(s,i)}_renderEdgeLine(t,e){const s=this._edgeGeometry(t);if(!s)return H``;const i="manual"===t.type,o=i?"#00D4FF":"#555",n=i&&this._selectedEdge===e-(this.topology.edges?.length||0)?2.5:1.5,r=i?"none":"4,2";return H`
      <line x1="${s.from.x}" y1="${s.from.y}" x2="${s.to.x}" y2="${s.to.y}"
        stroke="${o}" stroke-width="${n}"
        stroke-dasharray="${r}"
        @click=${i&&this.editMode?()=>this._selectEdge(e-(this.topology.edges?.length||0)):null}
        style="${i&&this.editMode?"cursor:pointer":""}"/>
    `}_renderEdgeLabels(t,e){if(!t.label&&!t.sourceLabel&&!t.targetLabel)return H``;const s=this._edgeGeometry(t);if(!s)return H``;const{from:i,to:o,ux:n,uy:r,perpX:a,perpY:l,srcDist:d,tgtDist:c}=s,u=i.x+n*d,p=i.y+r*d,h=o.x-n*c,g=o.y-r*c,f=(i.x+o.x)/2+14*a,m=(i.y+o.y)/2+14*l;return H`
      ${t.label?H`
        <rect x="${f-3*t.label.length-3}" y="${m-9}"
          width="${6*t.label.length+6}" height="13" rx="2" fill="#0d0d1f" opacity="0.9"/>
        <text x="${f}" y="${m}" text-anchor="middle"
          fill="#888" font-size="9" style="pointer-events:none">${t.label}</text>
      `:H``}
      ${t.sourceLabel?H`
        <rect x="${u-2.5*t.sourceLabel.length-3}" y="${p-8}"
          width="${5*t.sourceLabel.length+6}" height="12" rx="2" fill="#0d0d1f" opacity="0.9"/>
        <text x="${u}" y="${p}" text-anchor="middle"
          fill="#00D4FF" font-size="8" style="pointer-events:none">${t.sourceLabel}</text>
      `:H``}
      ${t.targetLabel?H`
        <rect x="${h-2.5*t.targetLabel.length-3}" y="${g-8}"
          width="${5*t.targetLabel.length+6}" height="12" rx="2" fill="#0d0d1f" opacity="0.9"/>
        <text x="${h}" y="${g}" text-anchor="middle"
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
    `}_renderLabelDialog(){const t=this.manualEdges[this._labelEdgeIndex];if(!t)return B``;const e=this._getNodeName(t.source),s=this._getNodeName(t.target);return B`
      <div class="save-overlay" @click=${this._cancelLabelDialog}>
        <div class="label-dialog" @click=${t=>t.stopPropagation()}>
          <h3>Link Labels</h3>
          <div class="subtitle">${e} &#8594; ${s}</div>

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
            <label>Target Interface (${s})</label>
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
    `}_onNodeClick(t,e){t.stopPropagation(),this.linkMode?this._handleLinkClick(e):this._selectNode(e)}_handleLinkClick(t){if(this._linkSource)if(this._linkSource===t)this._linkSource=null;else{const e=this.manualEdges.some(e=>e.source===this._linkSource&&e.target===t||e.source===t&&e.target===this._linkSource);e||(this.manualEdges=[...this.manualEdges,{source:this._linkSource,target:t,sourceLabel:"",label:"",targetLabel:""}],this._markDirty(),this._labelEdgeIndex=this.manualEdges.length-1,this._showLabelDialog=!0),this._linkSource=null}else this._linkSource=t}_enterEditMode(){this.editMode=!0,this._savedPositions=JSON.stringify(this.nodePositions),this._savedManualEdges=JSON.stringify(this.manualEdges),this._dirty=!1}_exitEditMode(){this.editMode=!1,this.linkMode=!1,this._linkSource=null,this._selectedEdge=-1,this._dirty=!1}_markDirty(){this.editMode&&(this._dirty=!0)}async _doneEditing(){if(this.selectedLayout)await this._saveToCurrentLayout(),this._exitEditMode();else{const t=this.shadowRoot.querySelector("themed-dialog"),e=await t.show({type:"prompt",title:"Save Layout",message:"Enter a name for this layout:",placeholder:"My Layout"});if(!e)return;await this._saveNewLayout(e),this._exitEditMode()}}_discardAndExit(){this._savedPositions&&(this.nodePositions=JSON.parse(this._savedPositions)),this._savedManualEdges&&(this.manualEdges=JSON.parse(this._savedManualEdges)),this._exitEditMode()}async _saveAsLayout(){const t=this.shadowRoot.querySelector("themed-dialog"),e=await t.show({type:"prompt",title:"Save As New Layout",message:"Enter a name for the new layout:",placeholder:"Layout copy"});e&&await this._saveNewLayout(e)}async _saveToCurrentLayout(){if(!this.selectedLayout||!this.layouts[this.selectedLayout])return;const t=this.layouts[this.selectedLayout];await Ct({id:this.selectedLayout,name:t.name,positions:this.nodePositions,manualEdges:this.manualEdges,hideAutoEdges:this.hideAutoEdges,viewBox:this._viewBox,isDefault:t.isDefault||!1}),await this._loadLayouts(),this._dirty=!1,this._savedPositions=JSON.stringify(this.nodePositions),this._savedManualEdges=JSON.stringify(this.manualEdges)}async _saveNewLayout(t){const e=await Ct({name:t,positions:this.nodePositions,manualEdges:this.manualEdges,hideAutoEdges:this.hideAutoEdges,viewBox:this._viewBox,isDefault:!1});this.selectedLayout=e.id,await this._loadLayouts(),this._dirty=!1,this._savedPositions=JSON.stringify(this.nodePositions),this._savedManualEdges=JSON.stringify(this.manualEdges)}_selectLayout(t){if(this._layoutDropdownOpen=!1,this.selectedLayout=t,t&&this.layouts[t]){const e=this.layouts[t];this.nodePositions=e.positions||{},this.manualEdges=e.manualEdges||[],this.hideAutoEdges=e.hideAutoEdges||!1,e.viewBox?this._viewBox=this._adaptViewBox(e.viewBox):this._fitAll()}else this.nodePositions={},this.manualEdges=[],this.hideAutoEdges=!1,this._autoLayout()}_createNewLayout(){this._layoutDropdownOpen=!1,this.selectedLayout="",this.nodePositions={},this.manualEdges=[],this.hideAutoEdges=!1,this._autoLayout(),this._enterEditMode()}_toggleLinkMode(){this.linkMode=!this.linkMode,this._linkSource=null,this.linkMode&&(this.selectedNode=null)}async _selectNode(t){if(this.selectedNode===t)return this.selectedNode=null,this._selectedDeviceData=null,void(this._commandResult="");this.selectedNode=t,this._selectedDeviceData=null,this._commandResult="";try{this._selectedDeviceData=await fetchDevice(t)}catch(t){this._selectedDeviceData={status:"inferred",attributes:{},tags:[]}}}async _sendCmd(t){if(this.selectedNode)try{this._commandResult=`Sending ${t}...`;const e=await sendCommand(this.selectedNode,t);this._commandResult=`Sent (request: ${e.request_id})`}catch(t){this._commandResult=`Error: ${t.message}`}}_selectEdge(t){this._selectedEdge=this._selectedEdge===t?-1:t}_labelEdge(t){this._labelEdgeIndex=t,this._showLabelDialog=!0}_saveLabelDialog(){const t=this.shadowRoot.querySelector(".label-dialog"),e=t.querySelector("#source-label").value,s=t.querySelector("#link-label").value,i=t.querySelector("#target-label").value,o=[...this.manualEdges];o[this._labelEdgeIndex]={...o[this._labelEdgeIndex],sourceLabel:e,label:s,targetLabel:i},this.manualEdges=o,this._markDirty(),this._showLabelDialog=!1,this._labelEdgeIndex=-1}_cancelLabelDialog(){this._showLabelDialog=!1,this._labelEdgeIndex=-1}_removeEdge(t){this.manualEdges=this.manualEdges.filter((e,s)=>s!==t),this._selectedEdge=-1,this._markDirty()}_onSvgMouseDown(t){if(!t.target.closest("g[transform]")){if(t.preventDefault(),this.linkMode)return this.linkMode=!1,this._linkSource=null,void(this._mousePos=null);this._isMousePanning=!0,this._mousePanStart={x:t.clientX,y:t.clientY},this._mousePanViewBox={...this._viewBox}}}_onMouseDown(t,e){this._dragging=e;const s=this.shadowRoot.querySelector("svg"),i=s.createSVGPoint();i.x=t.clientX,i.y=t.clientY;const o=i.matrixTransform(s.getScreenCTM().inverse()),n=this.nodePositions[e]||{x:0,y:0};this._dragOffset={x:o.x-n.x,y:o.y-n.y},t.preventDefault(),t.stopPropagation()}_onMouseMove(t){const e=this.shadowRoot.querySelector("svg"),s=e.createSVGPoint();s.x=t.clientX,s.y=t.clientY;const i=s.matrixTransform(e.getScreenCTM().inverse());if(this.linkMode&&this._linkSource&&(this._mousePos={x:i.x,y:i.y},this.requestUpdate()),this._isMousePanning){const s=e.getScreenCTM(),i=(t.clientX-this._mousePanStart.x)/s.a,o=(t.clientY-this._mousePanStart.y)/s.d;return void(this._viewBox={...this._mousePanViewBox,x:this._mousePanViewBox.x-i,y:this._mousePanViewBox.y-o})}this._dragging&&(this.nodePositions={...this.nodePositions,[this._dragging]:{x:i.x-this._dragOffset.x,y:i.y-this._dragOffset.y}})}_onWheel(t){if(!t.ctrlKey)return;t.preventDefault();const e=t.deltaY>0?1.1:.9;this._zoomAt(t.clientX,t.clientY,e)}_zoomAt(t,e,s){const i=this.shadowRoot.querySelector("svg");if(!i)return;const o=i.createSVGPoint();o.x=t,o.y=e;const n=o.matrixTransform(i.getScreenCTM().inverse()),r={...this._viewBox},a=Math.max(300,Math.min(2700,r.width*s)),l=Math.max(167,Math.min(1500,r.height*s)),d=a/r.width,c=l/r.height;r.x=n.x-(n.x-r.x)*d,r.y=n.y-(n.y-r.y)*c,r.width=a,r.height=l,this._viewBox=r}_zoomIn(){const t=this.shadowRoot.querySelector("svg")?.getBoundingClientRect();t&&this._zoomAt(t.left+t.width/2,t.top+t.height/2,.8)}_zoomOut(){const t=this.shadowRoot.querySelector("svg")?.getBoundingClientRect();t&&this._zoomAt(t.left+t.width/2,t.top+t.height/2,1.25)}_adaptViewBox(t){const e=this.shadowRoot?.querySelector(".canvas-container");if(!e||!e.clientWidth||!e.clientHeight)return{...t};const s=e.clientWidth/e.clientHeight,i=t.x+t.width/2,o=t.y+t.height/2,n=t.width*t.height,r=Math.sqrt(n*s),a=r/s;return{x:i-r/2,y:o-a/2,width:r,height:a}}_fitAll(){const t=Object.values(this.nodePositions);if(!t.length)return;const e=t.map(t=>t.x),s=t.map(t=>t.y),i=Math.min(...e)-80,o=Math.min(...s)-80,n=Math.max(...e)-Math.min(...e)+160,r=Math.max(...s)-Math.min(...s)+160,a=this.shadowRoot?.querySelector(".canvas-container");if(a&&a.clientWidth&&a.clientHeight){const t=a.clientWidth/a.clientHeight;let e=n,s=r;n/r<t?e=r*t:s=n/t,this._viewBox={x:i-(e-n)/2,y:o-(s-r)/2,width:e,height:s}}else this._viewBox={x:i,y:o,width:n,height:r}}_clientToSvg(t,e){const s=this.shadowRoot.querySelector("svg");if(!s)return null;const i=s.createSVGPoint();return i.x=t,i.y=e,i.matrixTransform(s.getScreenCTM().inverse())}_onTouchStart(t){if(2===t.touches.length){t.preventDefault();const e=t.touches[0].clientX-t.touches[1].clientX,s=t.touches[0].clientY-t.touches[1].clientY;return this._pinchPrevDist=Math.sqrt(e*e+s*s),this._pinchActive=!0,this._pinchAnchor0=this._clientToSvg(t.touches[0].clientX,t.touches[0].clientY),this._pinchAnchor1=this._clientToSvg(t.touches[1].clientX,t.touches[1].clientY),this._isPanning=!1,void(this._panStart=null)}if(1===t.touches.length){if(this.linkMode&&!t.target.closest("g[transform]"))return this.linkMode=!1,this._linkSource=null,void(this._mousePos=null);const e=t.touches[0];this._isPanning=!0,this._panStart={x:e.clientX,y:e.clientY,vbX:this._viewBox.x,vbY:this._viewBox.y}}}_onTouchMove(t){if(2===t.touches.length&&this._pinchActive){if(t.preventDefault(),!this._pinchAnchor0||!this._pinchAnchor1)return;const e=t.touches[0].clientX-t.touches[1].clientX,s=t.touches[0].clientY-t.touches[1].clientY,i=Math.sqrt(e*e+s*s);if(!this._pinchPrevDist||0===i)return void(this._pinchPrevDist=i);const o=this._pinchPrevDist/i,n=(this._pinchAnchor0.x+this._pinchAnchor1.x)/2,r=(this._pinchAnchor0.y+this._pinchAnchor1.y)/2,a=this._viewBox,l=Math.max(300,Math.min(2700,a.width*o)),d=l/a.width,c=Math.max(167,Math.min(1500,a.height*d));let u=n-(n-a.x)*d,p=r-(r-a.y)*(c/a.height);const h=this.shadowRoot.querySelector("svg");if(h){const e=h.getBoundingClientRect();if(e.width>0&&e.height>0){const s=(t.touches[0].clientX+t.touches[1].clientX)/2,i=(t.touches[0].clientY+t.touches[1].clientY)/2;u=n-(s-e.left)*(l/e.width),p=r-(i-e.top)*(c/e.height)}}if(this._viewBox={x:u,y:p,width:l,height:c},h){const e=h.getBoundingClientRect();if(e.width>0&&e.height>0){const s=t=>u+(t-e.left)*(l/e.width),i=t=>p+(t-e.top)*(c/e.height);this._pinchAnchor0={x:s(t.touches[0].clientX),y:i(t.touches[0].clientY)},this._pinchAnchor1={x:s(t.touches[1].clientX),y:i(t.touches[1].clientY)}}}return void(this._pinchPrevDist=i)}if(1===t.touches.length&&this._dragging){t.preventDefault();const e=t.touches[0],s=this._clientToSvg(e.clientX,e.clientY);if(!s)return;return void(this.nodePositions={...this.nodePositions,[this._dragging]:{x:s.x-this._dragOffset.x,y:s.y-this._dragOffset.y}})}if(1===t.touches.length&&this._isPanning&&this._panStart){const e=t.touches[0],s=this.shadowRoot.querySelector("svg");if(!s)return;const i=s.getScreenCTM(),o=(e.clientX-this._panStart.x)/i.a,n=(e.clientY-this._panStart.y)/i.d;this._viewBox={...this._viewBox,x:this._panStart.vbX-o,y:this._panStart.vbY-n}}}_onTouchEnd(t){if(t.touches.length<2&&(this._pinchActive=!1,this._pinchPrevDist=0,this._pinchAnchor0=null,this._pinchAnchor1=null,1===t.touches.length&&!this._dragging)){const e=t.touches[0];this._isPanning=!0,this._panStart={x:e.clientX,y:e.clientY,vbX:this._viewBox.x,vbY:this._viewBox.y}}0===t.touches.length&&(this._dragging&&this._markDirty(),this._dragging=null,this._isPanning=!1,this._panStart=null)}_onTouchNodeStart(t,e){if(1!==t.touches.length)return;t.stopPropagation(),this._isPanning=!1;const s=t.touches[0],i=this._clientToSvg(s.clientX,s.clientY);if(!i)return;const o=this.nodePositions[e]||{x:0,y:0};this._dragOffset={x:i.x-o.x,y:i.y-o.y},this._dragging=e}_onMouseUp(){this._dragging&&this._markDirty(),this._dragging=null,this._isMousePanning=!1}async _setAsDefault(){if(!this.selectedLayout)return;for(const[t,e]of Object.entries(this.layouts))e.isDefault&&(e.isDefault=!1,await Ct(e));const t=this.layouts[this.selectedLayout];t&&(t.isDefault=!0,await Ct(t)),await this._loadLayouts(),this._layoutsLoaded=!0}async _deleteCurrentLayout(){if(!this.selectedLayout)return;const t=this.layouts[this.selectedLayout]?.name||this.selectedLayout,e=this.shadowRoot.querySelector("themed-dialog");await e.show({type:"confirm",title:"Delete Layout",message:`Delete "${t}"? This cannot be undone.`,confirmLabel:"Delete",confirmDanger:!0})&&(await Dt(this.selectedLayout),this.selectedLayout="",this.nodePositions={},this.manualEdges=[],this.hideAutoEdges=!1,this._dirty=!1,await this._loadLayouts(),this._autoLayout())}}customElements.define("topology-view",ln);const dn={online:"#04d65c",offline:"#ef5350",warning:"#ffb74d",critical:"#ef5350",unknown:"#666"};class cn extends lt{static properties={device:{type:Object},deviceId:{type:String}};connectedCallback(){super.connectedCallback(),this.setAttribute("role","button"),this.setAttribute("tabindex","0")}static styles=[ct,n`
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
  `];render(){if(!this.device)return B``;const t=this.device,e=dn[t.status]||dn.unknown,s=Object.entries(t.attributes||{}),i=t.hidden_attributes||[],o=t.card_attributes||[];let n;n=o.length>0?o.map(t=>s.find(([e])=>e===t)).filter(Boolean):s.filter(([t])=>!i.includes(t)).slice(0,4);const r=t.attribute_transforms||{},a=[...t.tags||[],...t.server_tags||[]],l=t.device_name||this.deviceId;return this.style.setProperty("--status-color",e),this.setAttribute("aria-label",`${l}, ${t.status||"unknown"}`),B`
      <div class="header">
        <span class="name">${l}</span>
        <span class="status" style="background: ${e}20; color: ${e}">
          ${"online"===t.status||"offline"===t.status?"● ":(t.status,"⚠ ")}${t.status}
        </span>
      </div>
      <div class="type">${t.device_type||"unknown"}</div>
      ${n.length>0?B`
        <div class="attrs">
          ${n.map(([t,e])=>{const s=r[t],i=s?ht(e.value,s):`${e.value}${e.unit||""}`;return B`
              <div class="attr">
                ${t.replace(/_/g," ")}: <span class="attr-value ${this._isWarning(t,e)?"warning":""}">${i}</span>
              </div>
            `})}
        </div>
      `:""}
      ${a.length>0?B`
        <div class="tags">
          ${a.map((t,e)=>B`${e>0?B`<span class="tag-sep">·</span>`:""}<span class="tag">${t}</span>`)}
        </div>
      `:""}
    `}_isWarning(t,e){const s={cpu_usage:90,memory_usage:90,disk_usage:95,cpu_temp:80};return s[t]&&e.value>s[t]}}customElements.define("device-card",cn);class un extends lt{static properties={devices:{type:Object},filter:{type:String},selectedTags:{type:Array},viewMode:{type:String},_groups:{type:Object,state:!0},_collapsedGroups:{type:Object,state:!0},_selectedUngrouped:{type:Array,state:!0},_selectedGrouped:{type:Object,state:!0}};static styles=[ct,n`
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
  `];constructor(){super(),this.devices={},this.filter="all",this.selectedTags=[],this.viewMode="all",this._groups={},this._collapsedGroups={},this._selectedUngrouped=[],this._selectedGrouped={},this._wsUnsub=null,this._lastFetchTime=0}connectedCallback(){super.connectedCallback(),this._loadDevices(),this._loadGroups(),this._wsUnsub=ut.onMessage(t=>{"device_update"===t.type&&(this.devices={...this.devices,[t.device_id]:t.device},this.requestUpdate())})}disconnectedCallback(){super.disconnectedCallback(),this._wsUnsub&&this._wsUnsub()}async _loadDevices(){try{const t=await _t(this._lastFetchTime);t&&Object.keys(t).length>0?this.devices={...this.devices,...t}:0===this._lastFetchTime&&(this.devices=t||{}),this._lastFetchTime=Date.now()/1e3}catch(t){console.error("Failed to load devices:",t)}}async _loadGroups(){try{this._groups=await zt()}catch(t){console.error("Failed to load groups:",t)}}get _filteredDevices(){let t=Object.entries(this.devices);return"all"!==this.filter&&(t="warning"===this.filter?t.filter(([,t])=>"warning"===t.status||"critical"===t.status):t.filter(([,t])=>t.status===this.filter)),this.selectedTags.length>0&&(t=t.filter(([,t])=>{const e=[...t.tags||[],...t.server_tags||[]];return this.selectedTags.some(t=>e.includes(t))})),t}get _counts(){const t=Object.values(this.devices);return{all:t.length,online:t.filter(t=>"online"===t.status).length,offline:t.filter(t=>"offline"===t.status).length,warning:t.filter(t=>"warning"===t.status||"critical"===t.status).length}}_onTagAdd(t){const e=t.detail.tag;this.selectedTags.includes(e)||(this.selectedTags=[...this.selectedTags,e])}_onTagRemove(t){this.selectedTags=this.selectedTags.filter(e=>e!==t.detail.tag)}render(){const t=this._counts;return B`
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
            @click=${()=>this.viewMode="group"}>Groups</button>
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
      <themed-dialog></themed-dialog>
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
    `}_renderByGroup(){const t=this._filteredDevices,e=Object.values(this._groups),s={},i=new Set;e.forEach(e=>{const o=t.filter(([t])=>(e.device_ids||[]).includes(t));s[e.id]=o,o.forEach(([t])=>i.add(t))});const o=t.filter(([t])=>!i.has(t));return B`
      ${e.map(t=>this._renderGroupSection(t,s[t.id]||[]))}
      ${o.length>0?B`
        <div class="group-section">
          <div class="ungrouped-header">Ungrouped (${o.length})</div>
          <div class="select-hint">Ctrl+click to select multiple</div>
          ${this._selectedUngrouped.length>0?B`
            <div class="select-toolbar">
              <span>${this._selectedUngrouped.length} selected</span>
              <select id="group-assign-select">
                ${e.map(t=>B`<option value=${t.id}>${t.name}</option>`)}
              </select>
              <button @click=${this._addSelectedToGroup}>Add to Group</button>
              <button @click=${this._createNewGroupFromSelected}
                style="background: rgba(255,255,255,0.1); color: #fff;">New Group</button>
              <button style="background: rgba(255,255,255,0.1); color: #fff;"
                @click=${()=>{this._selectedUngrouped=[]}}>Cancel</button>
            </div>
          `:""}
          <div class="grid">
            ${o.map(([t,e])=>B`
              <device-card .device=${e} .deviceId=${t}
                class="${this._selectedUngrouped.includes(t)?"selected":""}"
                @click=${e=>{e.ctrlKey||e.metaKey?(e.preventDefault(),this._toggleUngroupedSelection(t)):this._selectDevice(t)}}></device-card>
            `)}
          </div>
        </div>
      `:""}
      ${0===t.length?B`<div class="empty">No devices found</div>`:""}
    `}_renderGroupSection(t,e){const s=!!this._collapsedGroups[t.id],i=Object.entries(this.devices).filter(([e])=>(t.device_ids||[]).includes(e)).map(([,t])=>t),o=i.filter(t=>"online"===t.status).length,n=i.length;return B`
      <div class="group-section">
        <div class="group-section-header"
          @click=${()=>this._toggleGroupCollapse(t.id)}>
          <span class="group-chevron ${s?"":"open"}">&#9658;</span>
          <span class="group-section-name">${t.name}</span>
          <span class="group-device-count">${e.length} device${1!==e.length?"s":""}</span>
          <div class="group-health">
            <span class="health-dot" style="color: #04d65c">
              ${o}/${n} online
            </span>
          </div>
          <button class="edit-policy-btn" @click=${e=>{e.stopPropagation(),this._editGroupPolicy(t.id)}}>Edit Policy</button>
          <button class="edit-policy-btn" style="background: rgba(239,83,80,0.1); border-color: rgba(239,83,80,0.2); color: #ef5350;"
            @click=${e=>{e.stopPropagation(),this._deleteGroup(t.id,t.name)}}>Delete</button>
        </div>
        ${s?"":B`
          <div class="group-body">
            ${this._selectedGrouped[t.id]?.length>0?B`
              <div class="select-toolbar">
                <span>${this._selectedGrouped[t.id].length} selected</span>
                <button @click=${()=>this._removeSelectedFromGroup(t.id)}>Remove from Group</button>
                <button style="background: rgba(255,255,255,0.1); color: #fff;"
                  @click=${()=>{this._selectedGrouped={...this._selectedGrouped,[t.id]:[]}}}>Cancel</button>
              </div>
            `:""}
            ${0===e.length?B`<div style="color: #fff; font-size: 13px; padding: 8px 4px;">No devices match current filters</div>`:B`
                <div class="grid">
                  ${e.map(([e,s])=>B`
                    <device-card .device=${s} .deviceId=${e}
                      class="${(this._selectedGrouped[t.id]||[]).includes(e)?"selected":""}"
                      @click=${s=>{s.ctrlKey||s.metaKey?(s.preventDefault(),this._toggleGroupedSelection(t.id,e)):this._selectDevice(e)}}></device-card>
                  `)}
                </div>
              `}
          </div>
        `}
      </div>
    `}_toggleGroupCollapse(t){this._collapsedGroups={...this._collapsedGroups,[t]:!this._collapsedGroups[t]}}_selectDevice(t){this.dispatchEvent(new CustomEvent("device-select",{detail:{deviceId:t},bubbles:!0,composed:!0}))}_editGroupPolicy(t){this.dispatchEvent(new CustomEvent("group-edit",{detail:{groupId:t},bubbles:!0,composed:!0}))}_toggleUngroupedSelection(t){this._selectedUngrouped.includes(t)?this._selectedUngrouped=this._selectedUngrouped.filter(e=>e!==t):this._selectedUngrouped=[...this._selectedUngrouped,t]}async _createNewGroupFromSelected(){const t=this.shadowRoot.querySelector("themed-dialog"),e=await t.show({type:"prompt",title:"Create Group",message:"Enter group name:",placeholder:"e.g. Infrastructure, IoT Sensors",confirmLabel:"Create"});if(!e)return;const s=e.toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_|_$/g,"");try{await Ft(s,e,this._selectedUngrouped),this._selectedUngrouped=[],this._loadGroups()}catch(t){console.error("Failed to create group:",t)}}async _deleteGroup(t,e){const s=this.shadowRoot.querySelector("themed-dialog");if(await s.show({type:"confirm",title:"Delete Group",message:`Delete group "${e}"? Devices will be ungrouped.`,confirmLabel:"Delete",confirmDanger:!0}))try{await Pt(t),this._loadGroups()}catch(t){console.error("Failed to delete group:",t)}}_toggleGroupedSelection(t,e){const s=this._selectedGrouped[t]||[],i=s.includes(e)?s.filter(t=>t!==e):[...s,e];this._selectedGrouped={...this._selectedGrouped,[t]:i}}async _removeSelectedFromGroup(t){const e=this._groups[t];if(!e)return;const s=this._selectedGrouped[t]||[],i=(e.device_ids||[]).filter(t=>!s.includes(t));try{await Mt(t,{...e,device_ids:i}),this._selectedGrouped={...this._selectedGrouped,[t]:[]},this._loadGroups()}catch(t){console.error("Failed to remove devices from group:",t)}}async _addSelectedToGroup(){const t=this.shadowRoot.querySelector("#group-assign-select");if(!t)return;const e=t.value,s=this._groups[e];if(!s)return;const i=[...new Set([...s.device_ids||[],...this._selectedUngrouped])];try{await Mt(e,{...s,device_ids:i}),this._selectedUngrouped=[],this._loadGroups()}catch(t){console.error("Failed to add devices to group:",t)}}}customElements.define("dashboard-view",un);class pn extends lt{static properties={_tags:{type:Array,state:!0},_loading:{type:Boolean,state:!0},_newTagName:{type:String,state:!0},_renamingTag:{type:String,state:!0},_renameValue:{type:String,state:!0},_selectedTags:{type:Object,state:!0}};static styles=[ct,n`
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
  `];constructor(){super(),this._tags=[],this._loading=!0,this._newTagName="",this._renamingTag=null,this._renameValue="",this._selectedTags=new Set}connectedCallback(){super.connectedCallback(),this._loadTags()}async _loadTags(){this._loading=!0;try{const t=await Lt().catch(()=>[]);this._tags=Array.isArray(t)?t.map(t=>"string"==typeof t?{tag:t,count:0}:t).sort((t,e)=>t.tag.localeCompare(e.tag)):[]}finally{this._loading=!1}}render(){const t=this._selectedTags?this._selectedTags.size:0;return B`
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
    `}_renderTagCard(t){const e=this._selectedTags&&this._selectedTags.has(t.tag),s=t.device_count||t.count||0;return B`
      <div class="tag-card ${e?"selected":""}"
        role="checkbox"
        aria-checked=${e?"true":"false"}
        aria-label="Tag: ${t.tag}, used by ${s} device${1!==s?"s":""}"
        tabindex="0"
        @click=${()=>this._toggleTagSelection(t.tag)}
        @keydown=${e=>("Enter"===e.key||" "===e.key)&&this._toggleTagSelection(t.tag)}>
        <div class="tag-card-top">
          <span class="tag-card-name">${t.tag}</span>
        </div>
        <div class="tag-card-count">${s} device${1!==s?"s":""}</div>
        <div class="tag-card-actions">
          <button class="sensor-btn edit" aria-label="Rename tag ${t.tag}"
            @click=${e=>{e.stopPropagation(),this._startRename(t.tag)}}>Rename</button>
          <button class="sensor-btn remove" aria-label="Delete tag ${t.tag}"
            @click=${e=>{e.stopPropagation(),this._deleteTag(t.tag)}}>Delete</button>
        </div>
      </div>
    `}_toggleTagSelection(t){const e=new Set(this._selectedTags);e.has(t)?e.delete(t):e.add(t),this._selectedTags=e}async _deleteSelectedTags(){const t=[...this._selectedTags];if(confirm(`Delete ${t.length} tag${1!==t.length?"s":""}?`)){for(const e of t)try{await Ut(e)}catch(t){console.error(t)}this._selectedTags=new Set,await this._loadTags()}}_startRename(t){this._renamingTag=t,this._renameValue=t}_cancelRename(){this._renamingTag=null,this._renameValue=""}async _saveRename(t){const e=this._renameValue.trim();if(e&&e!==t){try{await Gt(t,e),await this._loadTags()}catch(t){console.error("Failed to rename tag:",t)}this._cancelRename()}else this._cancelRename()}async _createTag(){const t=this._newTagName.trim();if(t)try{await It(t),this._newTagName="",await this._loadTags()}catch(t){console.error("Failed to create tag:",t)}}async _deleteTag(t){const e=this._tags.find(e=>e.tag===t);if(!(e&&e.count>0)||confirm(`"${t}" is used by ${e.count} device(s). Delete anyway?`))try{await Ut(t),await this._loadTags()}catch(t){console.error("Failed to delete tag:",t)}}}customElements.define("tag-registry-settings",pn);class hn extends lt{static properties={_settings:{type:Object,state:!0},_loading:{type:Boolean,state:!0},_savingSettings:{type:Boolean,state:!0},_settingsSaved:{type:Boolean,state:!0},_editingTransformIndex:{type:Number,state:!0},_transformError:{type:String,state:!0},_importStatus:{type:String,state:!0},_globalThresholdForm:{type:Object,state:!0},_customTransformForm:{type:Object,state:!0}};static styles=[ct,n`
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
  `];constructor(){super(),this._settings=null,this._loading=!0,this._savingSettings=!1,this._settingsSaved=!1,this._transformError="",this._editingTransformIndex=-1,this._globalThresholdForm={attr:"",value:""},this._customTransformForm={name:"",expression:""}}connectedCallback(){super.connectedCallback(),this._loadSettings()}async _loadSettings(){this._loading=!0;try{this._settings=await Rt().catch(()=>({}))}finally{this._loading=!1}}render(){return this._loading?B`<div class="loading">Loading settings...</div>`:B`
      <h2>Settings</h2>
      <tag-registry-settings></tag-registry-settings>
      ${this._renderCustomTransforms()}
      ${this._renderGlobalDefaults()}
      ${this._renderDeviceManagement()}
      ${this._renderExportImport()}
    `}_renderCustomTransforms(){const t=(this._settings||{}).custom_transforms||[],e=this._customTransformForm;return B`
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
            @input=${t=>{this._customTransformForm.name=t.target.value,this.requestUpdate()}}>
          <input class="small-input" type="text" placeholder="Expression (e.g. value * 1.8 + 32)"
            style="flex: 1; min-width: 200px;"
            .value=${e.expression}
            @input=${t=>{this._customTransformForm.expression=t.target.value,this.requestUpdate()}}>
          <button class="small-btn" @click=${this._addCustomTransform.bind(this)}>${this._editingTransformIndex>=0?"Save":"Add"}</button>
          ${this._editingTransformIndex>=0?B`<button class="small-btn" style="background: rgba(255,255,255,0.1); color: #fff;" @click=${()=>this._cancelEditTransform()}>Cancel</button>`:""}
        </div>

        ${this._transformError?B`<div style="font-size: 11px; color: #ef5350; margin-top: 6px;">${this._transformError}</div>`:""}
      </div>
    `}_editCustomTransform(t){const e=((this._settings||{}).custom_transforms||[])[t];e&&(this._customTransformForm.name=e.name,this._customTransformForm.expression=e.expression,this._editingTransformIndex=t,this._transformError="",this.requestUpdate())}_cancelEditTransform(){this._customTransformForm.name="",this._customTransformForm.expression="",this._editingTransformIndex=-1,this._transformError="",this.requestUpdate()}_addCustomTransform(){const t=(this._customTransformForm.name||"").trim(),e=(this._customTransformForm.expression||"").trim();if(this._transformError="",!t||!e)return void(this._transformError="Name and expression are required.");try{pt(e,0)}catch(t){return void(this._transformError=`Invalid expression: ${t.message}`)}const s=this._settings||{},i=[...s.custom_transforms||[]];if(this._editingTransformIndex>=0)i[this._editingTransformIndex]={...i[this._editingTransformIndex],name:t,expression:e},this._editingTransformIndex=-1;else{const s="custom:"+t.toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_|_$/g,"");if(i.some(t=>t.id===s))return void(this._transformError="A transform with this name already exists.");i.push({id:s,name:t,expression:e})}this._settings={...s,custom_transforms:i},this._customTransformForm.name="",this._customTransformForm.expression="",this.requestUpdate(),this._saveSettings()}_removeCustomTransform(t){const e=this._settings||{},s=[...e.custom_transforms||[]];s.splice(t,1),this._settings={...e,custom_transforms:s},this._saveSettings()}_renderGlobalDefaults(){const t=(this._settings||{}).default_thresholds||{},e=this._globalThresholdForm;return B`
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
            @input=${t=>{this._globalThresholdForm.attr=t.target.value,this.requestUpdate()}}>
          <input class="small-input" type="number" placeholder="Value..."
            style="width: 90px;"
            .value=${e.value}
            @input=${t=>{this._globalThresholdForm.value=t.target.value,this.requestUpdate()}}>
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
    `}_updateDefaultThreshold(t,e){const s=this._settings||{};this._settings={...s,default_thresholds:{...s.default_thresholds||{},[t]:""===e?null:Number(e)}}}_removeDefaultThreshold(t){const e=this._settings||{},s={...e.default_thresholds||{}};delete s[t],this._settings={...e,default_thresholds:s}}_addDefaultThreshold(){const t=(this._globalThresholdForm.attr||"").trim(),e=(this._globalThresholdForm.value||"").trim();t&&""!==e&&(this._updateDefaultThreshold(t,e),this._globalThresholdForm.attr="",this._globalThresholdForm.value="",this.requestUpdate())}_renderDeviceManagement(){const t=this._settings||{},e=t.device_cleanup_days??0,s=t.alert_cooldown_minutes??30;return B`
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
                .value=${String(s)}
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
    `}async _exportSettings(){try{const t=await Bt(),e=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),s=URL.createObjectURL(e),i=document.createElement("a");i.href=s,i.download=`mqtt-monitor-settings-${(new Date).toISOString().slice(0,10)}.json`,i.click(),URL.revokeObjectURL(s)}catch(t){console.error("Export failed:",t)}}async _importFile(t){const e=t.target.files[0];if(e){this._importStatus="";try{const t=await e.text(),s=JSON.parse(t);if(!s.version)return void(this._importStatus="Error: Invalid export file.");await Ht(s),this._importStatus="Imported successfully!",this._loadSettings(),setTimeout(()=>{this._importStatus=""},3e3)}catch(t){this._importStatus=`Error: ${t.message}`}t.target.value=""}}async _saveSettings(){this._savingSettings=!0,this._settingsSaved=!1;try{await jt(this._settings),ft(this._settings.custom_transforms||[]),this._settingsSaved=!0,setTimeout(()=>{this._settingsSaved=!1},2e3)}catch(t){console.error("Failed to save settings:",t)}finally{this._savingSettings=!1}}}customElements.define("settings-view",hn);class gn extends lt{static properties={currentView:{type:String},selectedDevice:{type:String},selectedGroup:{type:String}};static styles=[ct,n`
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
  `];constructor(){super(),this.currentView="dashboard",this.selectedDevice=null,this.selectedGroup=null}connectedCallback(){super.connectedCallback(),ut.connect(),Rt().then(t=>{t?.custom_transforms&&ft(t.custom_transforms)}).catch(()=>{})}disconnectedCallback(){super.disconnectedCallback(),ut.disconnect()}render(){return B`
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
    `}_onOverlayClick(){this.selectedDevice=null,this.selectedGroup=null}_onViewChange(t){this.currentView=t.detail.view,this.selectedDevice=null,this.selectedGroup=null}_onDeviceSelect(t){this.selectedDevice=t.detail.deviceId}_onGroupEdit(t){this.selectedGroup=t.detail.groupId}}customElements.define("network-monitor-app",gn);
//# sourceMappingURL=bundle.js.map
