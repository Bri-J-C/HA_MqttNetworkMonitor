/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,t=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;let o=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const i=this.t;if(t&&void 0===e){const t=void 0!==i&&1===i.length;t&&(e=s.get(i)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&s.set(i,e))}return e}toString(){return this.cssText}};const n=(e,...t)=>{const s=1===e.length?e[0]:t.reduce((t,i,s)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[s+1],e[0]);return new o(s,e,i)},r=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new o("string"==typeof e?e:e+"",void 0,i))(t)})(e):e,{is:a,defineProperty:l,getOwnPropertyDescriptor:d,getOwnPropertyNames:c,getOwnPropertySymbols:u,getPrototypeOf:p}=Object,h=globalThis,g=h.trustedTypes,f=g?g.emptyScript:"",m=h.reactiveElementPolyfillSupport,b=(e,t)=>e,v={toAttribute(e,t){switch(t){case Boolean:e=e?f:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},_=(e,t)=>!a(e,t),x={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:_};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),h.litPropertyMetadata??=new WeakMap;let y=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=x){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(e,i,t);void 0!==s&&l(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){const{get:s,set:o}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:s,set(t){const n=s?.call(this);o?.call(this,t),this.requestUpdate(e,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??x}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const e=p(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const e=this.properties,t=[...c(e),...u(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(r(e))}else void 0!==e&&t.push(r(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{if(t)i.adoptedStyleSheets=s.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const t of s){const s=document.createElement("style"),o=e.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=t.cssText,i.appendChild(s)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(t,i.type);this._$Em=e,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(e,t){const i=this.constructor,s=i._$Eh.get(e);if(void 0!==s&&this._$Em!==s){const e=i.getPropertyOptions(s),o="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:v;this._$Em=s;const n=o.fromAttribute(t,e.type);this[s]=n??this._$Ej?.get(s)??n,this._$Em=null}}requestUpdate(e,t,i,s=!1,o){if(void 0!==e){const n=this.constructor;if(!1===s&&(o=this[e]),i??=n.getPropertyOptions(e),!((i.hasChanged??_)(o,t)||i.useDefault&&i.reflect&&o===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:s,wrapped:o},n){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),!0!==o||void 0!==n)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===s&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,s=this[t];!0!==e||this._$AL.has(t)||void 0===s||this.C(t,void 0,i,s)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[b("elementProperties")]=new Map,y[b("finalized")]=new Map,m?.({ReactiveElement:y}),(h.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const w=globalThis,$=e=>e,k=w.trustedTypes,S=k?k.createPolicy("lit-html",{createHTML:e=>e}):void 0,C="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,D="?"+E,T=`<${D}>`,A=document,z=()=>A.createComment(""),F=e=>null===e||"object"!=typeof e&&"function"!=typeof e,M=Array.isArray,P="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,O=/-->/g,L=/>/g,I=RegExp(`>|${P}(?:([^\\s"'>=/]+)(${P}*=${P}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),G=/'/g,U=/"/g,R=/^(?:script|style|textarea|title)$/i,j=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),B=j(1),H=j(2),V=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),W=new WeakMap,Y=A.createTreeWalker(A,129);function J(e,t){if(!M(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(t):t}const X=(e,t)=>{const i=e.length-1,s=[];let o,n=2===t?"<svg>":3===t?"<math>":"",r=N;for(let t=0;t<i;t++){const i=e[t];let a,l,d=-1,c=0;for(;c<i.length&&(r.lastIndex=c,l=r.exec(i),null!==l);)c=r.lastIndex,r===N?"!--"===l[1]?r=O:void 0!==l[1]?r=L:void 0!==l[2]?(R.test(l[2])&&(o=RegExp("</"+l[2],"g")),r=I):void 0!==l[3]&&(r=I):r===I?">"===l[0]?(r=o??N,d=-1):void 0===l[1]?d=-2:(d=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?I:'"'===l[3]?U:G):r===U||r===G?r=I:r===O||r===L?r=N:(r=I,o=void 0);const u=r===I&&e[t+1].startsWith("/>")?" ":"";n+=r===N?i+T:d>=0?(s.push(a),i.slice(0,d)+C+i.slice(d)+E+u):i+E+(-2===d?t:u)}return[J(e,n+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),s]};class K{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let o=0,n=0;const r=e.length-1,a=this.parts,[l,d]=X(e,t);if(this.el=K.createElement(l,i),Y.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(s=Y.nextNode())&&a.length<r;){if(1===s.nodeType){if(s.hasAttributes())for(const e of s.getAttributeNames())if(e.endsWith(C)){const t=d[n++],i=s.getAttribute(e).split(E),r=/([.?@])?(.*)/.exec(t);a.push({type:1,index:o,name:r[2],strings:i,ctor:"."===r[1]?ie:"?"===r[1]?se:"@"===r[1]?oe:te}),s.removeAttribute(e)}else e.startsWith(E)&&(a.push({type:6,index:o}),s.removeAttribute(e));if(R.test(s.tagName)){const e=s.textContent.split(E),t=e.length-1;if(t>0){s.textContent=k?k.emptyScript:"";for(let i=0;i<t;i++)s.append(e[i],z()),Y.nextNode(),a.push({type:2,index:++o});s.append(e[t],z())}}}else if(8===s.nodeType)if(s.data===D)a.push({type:2,index:o});else{let e=-1;for(;-1!==(e=s.data.indexOf(E,e+1));)a.push({type:7,index:o}),e+=E.length-1}o++}}static createElement(e,t){const i=A.createElement("template");return i.innerHTML=e,i}}function Z(e,t,i=e,s){if(t===V)return t;let o=void 0!==s?i._$Co?.[s]:i._$Cl;const n=F(t)?void 0:t._$litDirective$;return o?.constructor!==n&&(o?._$AO?.(!1),void 0===n?o=void 0:(o=new n(e),o._$AT(e,i,s)),void 0!==s?(i._$Co??=[])[s]=o:i._$Cl=o),void 0!==o&&(t=Z(e,o._$AS(e,t.values),o,s)),t}class Q{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,s=(e?.creationScope??A).importNode(t,!0);Y.currentNode=s;let o=Y.nextNode(),n=0,r=0,a=i[0];for(;void 0!==a;){if(n===a.index){let t;2===a.type?t=new ee(o,o.nextSibling,this,e):1===a.type?t=new a.ctor(o,a.name,a.strings,this,e):6===a.type&&(t=new ne(o,this,e)),this._$AV.push(t),a=i[++r]}n!==a?.index&&(o=Y.nextNode(),n++)}return Y.currentNode=A,s}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class ee{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,s){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Z(this,e,t),F(e)?e===q||null==e||""===e?(this._$AH!==q&&this._$AR(),this._$AH=q):e!==this._$AH&&e!==V&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>M(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==q&&F(this._$AH)?this._$AA.nextSibling.data=e:this.T(A.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,s="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=K.createElement(J(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(t);else{const e=new Q(s,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=W.get(e.strings);return void 0===t&&W.set(e.strings,t=new K(e)),t}k(e){M(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,s=0;for(const o of e)s===t.length?t.push(i=new ee(this.O(z()),this.O(z()),this,this.options)):i=t[s],i._$AI(o),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=$(e).nextSibling;$(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class te{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,s,o){this.type=1,this._$AH=q,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=q}_$AI(e,t=this,i,s){const o=this.strings;let n=!1;if(void 0===o)e=Z(this,e,t,0),n=!F(e)||e!==this._$AH&&e!==V,n&&(this._$AH=e);else{const s=e;let r,a;for(e=o[0],r=0;r<o.length-1;r++)a=Z(this,s[i+r],t,r),a===V&&(a=this._$AH[r]),n||=!F(a)||a!==this._$AH[r],a===q?e=q:e!==q&&(e+=(a??"")+o[r+1]),this._$AH[r]=a}n&&!s&&this.j(e)}j(e){e===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ie extends te{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===q?void 0:e}}class se extends te{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==q)}}class oe extends te{constructor(e,t,i,s,o){super(e,t,i,s,o),this.type=5}_$AI(e,t=this){if((e=Z(this,e,t,0)??q)===V)return;const i=this._$AH,s=e===q&&i!==q||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,o=e!==q&&(i===q||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class ne{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Z(this,e)}}const re=w.litHtmlPolyfillSupport;re?.(K,ee),(w.litHtmlVersions??=[]).push("3.3.2");const ae=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class le extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const s=i?.renderBefore??t;let o=s._$litPart$;if(void 0===o){const e=i?.renderBefore??null;s._$litPart$=o=new ee(t.insertBefore(z(),e),e,void 0,i??{})}return o._$AI(e),o})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return V}}le._$litElement$=!0,le.finalized=!0,ae.litElementHydrateSupport?.({LitElement:le});const de=ae.litElementPolyfillSupport;de?.({LitElement:le}),(ae.litElementVersions??=[]).push("4.2.2");const ce=n`
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
`;const ue=new class{constructor(){this._ws=null,this._listeners=[],this._reconnectDelay=1e3,this._reconnectAttempts=0,this._maxReconnectAttempts=50}connect(){const e="https:"===location.protocol?"wss:":"ws:",t=location.pathname.match(/^(\/api\/hassio_ingress\/[^/]+)/),i=t?t[1]:"",s=`${e}//${location.host}${i}/api/ws`;this._ws=new WebSocket(s),this._ws.onmessage=e=>{try{const t=JSON.parse(e.data);this._listeners.forEach(e=>e(t))}catch(e){console.error("WebSocket parse error:",e)}},this._ws.onclose=()=>{this._reconnectAttempts>=this._maxReconnectAttempts?console.error("WebSocket: max reconnect attempts reached"):(this._reconnectAttempts++,setTimeout(()=>this.connect(),this._reconnectDelay),this._reconnectDelay=Math.min(2*this._reconnectDelay,3e4))},this._ws.onopen=()=>{this._reconnectDelay=1e3,this._reconnectAttempts=0}}onMessage(e){return this._listeners.push(e),()=>{this._listeners=this._listeners.filter(t=>t!==e)}}disconnect(){this._ws&&this._ws.close()}};function pe(e,t){if(null==e||!t)return e;if("duration"===t){const t=Number(e);if(isNaN(t))return e;const i=[],s=Math.floor(t/86400),o=Math.floor(t%86400/3600),n=Math.floor(t%3600/60),r=Math.floor(t%60);return s&&i.push(`${s}d`),o&&i.push(`${o}h`),n&&i.push(`${n}m`),i.length||i.push(`${r}s`),i.join(" ")}if("bytes"===t){const t=Number(e);return isNaN(t)?e:t>=1e12?(t/1e12).toFixed(1)+" TB":t>=1e9?(t/1e9).toFixed(1)+" GB":t>=1e6?(t/1e6).toFixed(1)+" MB":t>=1e3?(t/1e3).toFixed(1)+" KB":t+" B"}if("percentage"===t){const t=Number(e);return isNaN(t)?e:(100*t).toFixed(1)+"%"}if(t.startsWith("round:")){const i=parseInt(t.split(":")[1])||0,s=Number(e);return isNaN(s)?e:s.toFixed(i)}if(t.startsWith("prefix:"))return t.slice(7)+e;if(t.startsWith("suffix:"))return e+t.slice(7);if(t.startsWith("custom:")){const i=he.find(e=>e.id===t);if(i)try{return new Function("value","return ("+i.expression+")")(e)}catch{return e}}return e}let he=[];function ge(e){he=Array.isArray(e)?e:[]}const fe=[{value:"",label:"None"},{value:"duration",label:"Duration (seconds → 2d 5h)"},{value:"bytes",label:"Bytes (→ KB/MB/GB)"},{value:"percentage",label:"Percentage (0-1 → %)"},{value:"round:0",label:"Round (0 decimals)"},{value:"round:1",label:"Round (1 decimal)"},{value:"round:2",label:"Round (2 decimals)"}];const me=function(){const e=location.pathname.match(/^(\/api\/hassio_ingress\/[^/]+)/);return e?e[1]:""}();async function be(e,t={}){const i=await fetch(e,t);if(!i.ok){const e=await i.text().catch(()=>i.statusText);throw new Error(`API error ${i.status}: ${e}`)}const s=i.headers.get("content-type");return s&&s.includes("application/json")?i.json():null}async function ve(e=0){return be(e>0?`${me}/api/devices?since=${e}`:`${me}/api/devices`)}async function _e(e){return be(`${me}/api/devices/${encodeURIComponent(e)}`)}async function xe(e){return be(`${me}/api/devices/${encodeURIComponent(e)}`,{method:"DELETE"})}async function ye(e,t){return be(`${me}/api/devices/${encodeURIComponent(e)}/attributes/${encodeURIComponent(t)}`,{method:"DELETE"})}async function we(e,t){return be(`${me}/api/devices/${encodeURIComponent(e)}/attributes/${encodeURIComponent(t)}/unhide`,{method:"POST"})}async function $e(e,t){return be(`${me}/api/devices/${encodeURIComponent(e)}/commands/${encodeURIComponent(t)}`,{method:"DELETE"})}async function ke(e,t){return be(`${me}/api/devices/${encodeURIComponent(e)}/commands/${encodeURIComponent(t)}/unhide`,{method:"POST"})}async function Se(){return be(`${me}/api/topology`)}async function Ce(){return be(`${me}/api/topology/layouts`)}async function Ee(e){return be(`${me}/api/topology/layouts`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}async function De(e){return be(`${me}/api/topology/layouts/${encodeURIComponent(e)}`,{method:"DELETE"})}async function Te(e,t,i={}){return be(`${me}/api/devices/${encodeURIComponent(e)}/command`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({command:t,params:i})})}async function Ae(){return be(`${me}/api/groups`)}async function ze(e,t,i=[]){return be(`${me}/api/groups`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:e,name:t,device_ids:i})})}async function Fe(e,t){return be(`${me}/api/groups/${encodeURIComponent(e)}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})}async function Me(e){return be(`${me}/api/groups/${encodeURIComponent(e)}`,{method:"DELETE"})}async function Pe(e,t){return be(`${me}/api/devices/${encodeURIComponent(e)}/tags/add`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({tags:t})})}async function Ne(e,t){return be(`${me}/api/devices/${encodeURIComponent(e)}/tags/${encodeURIComponent(t)}`,{method:"DELETE"})}async function Oe(){return be(`${me}/api/tags`)}async function Le(e){return be(`${me}/api/tags`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({tag:e})})}async function Ie(e,t){return be(`${me}/api/tags/${encodeURIComponent(e)}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({new_name:t})})}async function Ge(e){return be(`${me}/api/tags/${encodeURIComponent(e)}`,{method:"DELETE"})}async function Ue(){return be(`${me}/api/settings`)}async function Re(e){return be(`${me}/api/settings`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}async function je(){return be(`${me}/api/settings/export`)}async function Be(e){return be(`${me}/api/settings/import`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}async function He(e){return be(`${me}/api/devices/${encodeURIComponent(e)}/effective-settings`)}async function Ve(e,t){return be(`${me}/api/devices/${encodeURIComponent(e)}/settings`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})}async function qe(e){return be(`${me}/api/groups/${encodeURIComponent(e)}/force-apply`,{method:"POST"})}var We=Object.freeze({__proto__:null,addDeviceTags:Pe,addServerCommand:async function(e,t,i){return be(`${me}/api/devices/${encodeURIComponent(e)}/server-commands`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:t,shell:i})})},addServerSensor:async function(e,t,i){return be(`${me}/api/devices/${encodeURIComponent(e)}/server-sensors`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:t,...i})})},checkGroupConflicts:async function(e,t=null){return be(`${me}/api/groups/${encodeURIComponent(e)}/check-conflicts`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t?{new_device_id:t}:{})})},createGroup:ze,createTag:Le,deleteAttribute:ye,deleteDevice:xe,deleteGroup:Me,deleteLayout:De,deleteTag:Ge,exportSettings:je,fetchAttributeHistory:async function(e,t,i=24){return be(`${me}/api/devices/${encodeURIComponent(e)}/history/${encodeURIComponent(t)}?hours=${i}`)},fetchDevice:_e,fetchDevices:ve,fetchEffectiveSettings:He,fetchGroups:Ae,fetchLayouts:Ce,fetchSettings:Ue,fetchTags:Oe,fetchTopology:Se,forceApplyGroup:qe,hideCommand:$e,importSettings:Be,pushDeviceConfig:async function(e,t){return be(`${me}/api/devices/${encodeURIComponent(e)}/push-config`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})},pushGroupConfig:async function(e,t){return be(`${me}/api/groups/${encodeURIComponent(e)}/push-config`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})},removeDeviceTag:Ne,removeServerCommand:async function(e,t){return be(`${me}/api/devices/${encodeURIComponent(e)}/server-commands/${encodeURIComponent(t)}`,{method:"DELETE"})},removeServerSensor:async function(e,t){return be(`${me}/api/devices/${encodeURIComponent(e)}/server-sensors/${encodeURIComponent(t)}`,{method:"DELETE"})},renameTag:Ie,saveLayout:Ee,sendCommand:Te,sendGroupCommand:async function(e,t,i={}){return be(`${me}/api/groups/${encodeURIComponent(e)}/command`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({command:t,params:i})})},setDeviceInterval:async function(e,t){return be(`${me}/api/devices/${encodeURIComponent(e)}/config-interval`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({interval:t})})},setDeviceTags:async function(e,t){return be(`${me}/api/devices/${encodeURIComponent(e)}/tags`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({tags:t})})},unhideAttribute:we,unhideCommand:ke,updateDeviceSettings:Ve,updateGroup:Fe,updateSettings:Re});class Ye extends le{static properties={currentView:{type:String}};static styles=[ce,n`
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
        <span class="version">v0.2.1 build ${"4/5 19:08"}</span>
      </nav>

      <!-- Mobile simple header -->
      <div class="mobile-header" aria-hidden="true">
        <span class="logo">Network Monitor</span>
        <span class="version">build ${"4/5 19:08"}</span>
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
    `}_navigate(e){this.dispatchEvent(new CustomEvent("view-change",{detail:{view:e}}))}}customElements.define("nav-bar",Ye);class Je extends le{static properties={selectedTags:{type:Array},_allTags:{type:Array,state:!0},_open:{type:Boolean,state:!0},_showCreate:{type:Boolean,state:!0},_newTagName:{type:String,state:!0},_creating:{type:Boolean,state:!0}};static styles=[ce,n`
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
  `];constructor(){super(),this.selectedTags=[],this._allTags=[],this._open=!1,this._showCreate=!1,this._newTagName="",this._creating=!1,this._onDocClick=this._onDocClick.bind(this)}connectedCallback(){super.connectedCallback(),this._loadTags(),document.addEventListener("click",this._onDocClick)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._onDocClick)}async _loadTags(){try{const e=await Oe();Array.isArray(e)&&(this._allTags=e.map(e=>"string"==typeof e?e:e.tag).sort())}catch(e){console.error("Failed to load tags:",e)}}_onDocClick(e){if(!this._open)return;e.composedPath().includes(this)||(this._open=!1,this._showCreate=!1)}_toggle(e){e.stopPropagation(),this._open=!this._open,this._open||(this._showCreate=!1)}_toggleTag(e){(this.selectedTags||[]).includes(e)?this.dispatchEvent(new CustomEvent("tag-remove",{detail:{tag:e},bubbles:!0,composed:!0})):this.dispatchEvent(new CustomEvent("tag-add",{detail:{tag:e},bubbles:!0,composed:!0}))}async _createTag(){const e=this._newTagName.trim();if(e&&!this._creating){this._creating=!0;try{await Le(e),await this._loadTags(),this.dispatchEvent(new CustomEvent("tag-add",{detail:{tag:e},bubbles:!0,composed:!0})),this._newTagName="",this._showCreate=!1}catch(e){console.error("Failed to create tag:",e)}finally{this._creating=!1}}}render(){const e=this.selectedTags||[],t=e.length>0;return B`
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
    `}}customElements.define("tag-picker",Je);const Xe="u-off",Ke="u-label",Ze="width",Qe="height",et="top",tt="bottom",it="left",st="right",ot="#000",nt=ot+"0",rt="mousemove",at="mousedown",lt="mouseup",dt="mouseenter",ct="mouseleave",ut="dblclick",pt="change",ht="dppxchange",gt="--",ft="undefined"!=typeof window,mt=ft?document:null,bt=ft?window:null,vt=ft?navigator:null;let _t,xt;function yt(e,t){if(null!=t){let i=e.classList;!i.contains(t)&&i.add(t)}}function wt(e,t){let i=e.classList;i.contains(t)&&i.remove(t)}function $t(e,t,i){e.style[t]=i+"px"}function kt(e,t,i,s){let o=mt.createElement(e);return null!=t&&yt(o,t),null!=i&&i.insertBefore(o,s),o}function St(e,t){return kt("div",e,t)}const Ct=new WeakMap;function Et(e,t,i,s,o){let n="translate("+t+"px,"+i+"px)";n!=Ct.get(e)&&(e.style.transform=n,Ct.set(e,n),t<0||i<0||t>s||i>o?yt(e,Xe):wt(e,Xe))}const Dt=new WeakMap;function Tt(e,t,i){let s=t+i;s!=Dt.get(e)&&(Dt.set(e,s),e.style.background=t,e.style.borderColor=i)}const At=new WeakMap;function zt(e,t,i,s){let o=t+""+i;o!=At.get(e)&&(At.set(e,o),e.style.height=i+"px",e.style.width=t+"px",e.style.marginLeft=s?-t/2+"px":0,e.style.marginTop=s?-i/2+"px":0)}const Ft={passive:!0},Mt={...Ft,capture:!0};function Pt(e,t,i,s){t.addEventListener(e,i,s?Mt:Ft)}function Nt(e,t,i,s){t.removeEventListener(e,i,Ft)}function Ot(e,t,i,s){let o;i=i||0;let n=(s=s||t.length-1)<=2147483647;for(;s-i>1;)o=n?i+s>>1:ti((i+s)/2),t[o]<e?i=o:s=o;return e-t[i]<=t[s]-e?i:s}function Lt(e){return(t,i,s)=>{let o=-1,n=-1;for(let n=i;n<=s;n++)if(e(t[n])){o=n;break}for(let o=s;o>=i;o--)if(e(t[o])){n=o;break}return[o,n]}}ft&&function e(){let t=devicePixelRatio;_t!=t&&(_t=t,xt&&Nt(pt,xt,e),xt=matchMedia(`(min-resolution: ${_t-.001}dppx) and (max-resolution: ${_t+.001}dppx)`),Pt(pt,xt,e),bt.dispatchEvent(new CustomEvent(ht)))}();const It=e=>null!=e,Gt=e=>null!=e&&e>0,Ut=Lt(It),Rt=Lt(Gt);function jt(e,t,i,s){let o=ai(e),n=ai(t);e==t&&(-1==o?(e*=i,t/=i):(e/=i,t*=i));let r=10==i?li:di,a=1==n?si:ti,l=(1==o?ti:si)(r(ei(e))),d=a(r(ei(t))),c=ri(i,l),u=ri(i,d);return 10==i&&(l<0&&(c=Ci(c,-l)),d<0&&(u=Ci(u,-d))),s||2==i?(e=c*o,t=u*n):(e=Si(e,c),t=ki(t,u)),[e,t]}function Bt(e,t,i,s){let o=jt(e,t,i,s);return 0==e&&(o[0]=0),0==t&&(o[1]=0),o}const Ht={mode:3,pad:.1},Vt={pad:0,soft:null,mode:0},qt={min:Vt,max:Vt};function Wt(e,t,i,s){return Oi(i)?Jt(e,t,i):(Vt.pad=i,Vt.soft=s?0:null,Vt.mode=s?3:0,Jt(e,t,qt))}function Yt(e,t){return null==e?t:e}function Jt(e,t,i){let s=i.min,o=i.max,n=Yt(s.pad,0),r=Yt(o.pad,0),a=Yt(s.hard,-ui),l=Yt(o.hard,ui),d=Yt(s.soft,ui),c=Yt(o.soft,-ui),u=Yt(s.mode,0),p=Yt(o.mode,0),h=t-e,g=li(h),f=ni(ei(e),ei(t)),m=li(f),b=ei(m-g);(h<1e-24||b>10)&&(h=0,0!=e&&0!=t||(h=1e-24,2==u&&d!=ui&&(n=0),2==p&&c!=-ui&&(r=0)));let v=h||f||1e3,_=li(v),x=ri(10,ti(_)),y=Ci(Si(e-v*(0==h?0==e?.1:1:n),x/10),24),w=e>=d&&(1==u||3==u&&y<=d||2==u&&y>=d)?d:ui,$=ni(a,y<w&&e>=w?w:oi(w,y)),k=Ci(ki(t+v*(0==h?0==t?.1:1:r),x/10),24),S=t<=c&&(1==p||3==p&&k>=c||2==p&&k<=c)?c:-ui,C=oi(l,k>S&&t<=S?S:ni(S,k));return $==C&&0==$&&(C=100),[$,C]}const Xt=new Intl.NumberFormat(ft?vt.language:"en-US"),Kt=e=>Xt.format(e),Zt=Math,Qt=Zt.PI,ei=Zt.abs,ti=Zt.floor,ii=Zt.round,si=Zt.ceil,oi=Zt.min,ni=Zt.max,ri=Zt.pow,ai=Zt.sign,li=Zt.log10,di=Zt.log2,ci=(e,t=1)=>Zt.asinh(e/t),ui=1/0;function pi(e){return 1+(0|li((e^e>>31)-(e>>31)))}function hi(e,t,i){return oi(ni(e,t),i)}function gi(e){return"function"==typeof e}function fi(e){return gi(e)?e:()=>e}const mi=e=>e,bi=(e,t)=>t,vi=e=>null,_i=e=>!0,xi=(e,t)=>e==t,yi=/\.\d*?(?=9{6,}|0{6,})/gm,wi=e=>{if(Pi(e)||Ei.has(e))return e;const t=`${e}`,i=t.match(yi);if(null==i)return e;let s=i[0].length-1;if(-1!=t.indexOf("e-")){let[e,i]=t.split("e");return+`${wi(e)}e${i}`}return Ci(e,s)};function $i(e,t){return wi(Ci(wi(e/t))*t)}function ki(e,t){return wi(si(wi(e/t))*t)}function Si(e,t){return wi(ti(wi(e/t))*t)}function Ci(e,t=0){if(Pi(e))return e;let i=10**t,s=e*i*(1+Number.EPSILON);return ii(s)/i}const Ei=new Map;function Di(e){return((""+e).split(".")[1]||"").length}function Ti(e,t,i,s){let o=[],n=s.map(Di);for(let r=t;r<i;r++){let t=ei(r),i=Ci(ri(e,r),t);for(let a=0;a<s.length;a++){let l=10==e?+`${s[a]}e${r}`:s[a]*i,d=(r>=0?0:t)+(r>=n[a]?0:n[a]),c=10==e?l:Ci(l,d);o.push(c),Ei.set(c,d)}}return o}const Ai={},zi=[],Fi=[null,null],Mi=Array.isArray,Pi=Number.isInteger;function Ni(e){return"string"==typeof e}function Oi(e){let t=!1;if(null!=e){let i=e.constructor;t=null==i||i==Object}return t}function Li(e){return null!=e&&"object"==typeof e}const Ii=Object.getPrototypeOf(Uint8Array),Gi="__proto__";function Ui(e,t=Oi){let i;if(Mi(e)){let s=e.find(e=>null!=e);if(Mi(s)||t(s)){i=Array(e.length);for(let s=0;s<e.length;s++)i[s]=Ui(e[s],t)}else i=e.slice()}else if(e instanceof Ii)i=e.slice();else if(t(e)){i={};for(let s in e)s!=Gi&&(i[s]=Ui(e[s],t))}else i=e;return i}function Ri(e){let t=arguments;for(let i=1;i<t.length;i++){let s=t[i];for(let t in s)t!=Gi&&(Oi(e[t])?Ri(e[t],Ui(s[t])):e[t]=Ui(s[t]))}return e}function ji(e,t,i){for(let s,o=0,n=-1;o<t.length;o++){let r=t[o];if(r>n){for(s=r-1;s>=0&&null==e[s];)e[s--]=null;for(s=r+1;s<i&&null==e[s];)e[n=s++]=null}}}const Bi="undefined"==typeof queueMicrotask?e=>Promise.resolve().then(e):queueMicrotask;const Hi=["January","February","March","April","May","June","July","August","September","October","November","December"],Vi=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function qi(e){return e.slice(0,3)}const Wi=Vi.map(qi),Yi=Hi.map(qi),Ji={MMMM:Hi,MMM:Yi,WWWW:Vi,WWW:Wi};function Xi(e){return(e<10?"0":"")+e}const Ki={YYYY:e=>e.getFullYear(),YY:e=>(e.getFullYear()+"").slice(2),MMMM:(e,t)=>t.MMMM[e.getMonth()],MMM:(e,t)=>t.MMM[e.getMonth()],MM:e=>Xi(e.getMonth()+1),M:e=>e.getMonth()+1,DD:e=>Xi(e.getDate()),D:e=>e.getDate(),WWWW:(e,t)=>t.WWWW[e.getDay()],WWW:(e,t)=>t.WWW[e.getDay()],HH:e=>Xi(e.getHours()),H:e=>e.getHours(),h:e=>{let t=e.getHours();return 0==t?12:t>12?t-12:t},AA:e=>e.getHours()>=12?"PM":"AM",aa:e=>e.getHours()>=12?"pm":"am",a:e=>e.getHours()>=12?"p":"a",mm:e=>Xi(e.getMinutes()),m:e=>e.getMinutes(),ss:e=>Xi(e.getSeconds()),s:e=>e.getSeconds(),fff:e=>{return((t=e.getMilliseconds())<10?"00":t<100?"0":"")+t;var t}};function Zi(e,t){t=t||Ji;let i,s=[],o=/\{([a-z]+)\}|[^{]+/gi;for(;i=o.exec(e);)s.push("{"==i[0][0]?Ki[i[1]]:i[0]);return e=>{let i="";for(let o=0;o<s.length;o++)i+="string"==typeof s[o]?s[o]:s[o](e,t);return i}}const Qi=(new Intl.DateTimeFormat).resolvedOptions().timeZone;const es=e=>e%1==0,ts=[1,2,2.5,5],is=Ti(10,-32,0,ts),ss=Ti(10,0,32,ts),os=ss.filter(es),ns=is.concat(ss),rs="{YYYY}",as="\n"+rs,ls="{M}/{D}",ds="\n"+ls,cs=ds+"/{YY}",us="{aa}",ps="{h}:{mm}"+us,hs="\n"+ps,gs=":{ss}",fs=null;function ms(e){let t=1e3*e,i=60*t,s=60*i,o=24*s,n=30*o,r=365*o;return[(1==e?Ti(10,0,3,ts).filter(es):Ti(10,-3,0,ts)).concat([t,5*t,10*t,15*t,30*t,i,5*i,10*i,15*i,30*i,s,2*s,3*s,4*s,6*s,8*s,12*s,o,2*o,3*o,4*o,5*o,6*o,7*o,8*o,9*o,10*o,15*o,n,2*n,3*n,4*n,6*n,r,2*r,5*r,10*r,25*r,50*r,100*r]),[[r,rs,fs,fs,fs,fs,fs,fs,1],[28*o,"{MMM}",as,fs,fs,fs,fs,fs,1],[o,ls,as,fs,fs,fs,fs,fs,1],[s,"{h}"+us,cs,fs,ds,fs,fs,fs,1],[i,ps,cs,fs,ds,fs,fs,fs,1],[t,gs,cs+" "+ps,fs,ds+" "+ps,fs,hs,fs,1],[e,gs+".{fff}",cs+" "+ps,fs,ds+" "+ps,fs,hs,fs,1]],function(t){return(a,l,d,c,u,p)=>{let h=[],g=u>=r,f=u>=n&&u<r,m=t(d),b=Ci(m*e,3),v=Ss(m.getFullYear(),g?0:m.getMonth(),f||g?1:m.getDate()),_=Ci(v*e,3);if(f||g){let i=f?u/n:0,s=g?u/r:0,o=b==_?b:Ci(Ss(v.getFullYear()+s,v.getMonth()+i,1)*e,3),a=new Date(ii(o/e)),l=a.getFullYear(),d=a.getMonth();for(let n=0;o<=c;n++){let r=Ss(l+s*n,d+i*n,1),a=r-t(Ci(r*e,3));o=Ci((+r+a)*e,3),o<=c&&h.push(o)}}else{let n=u>=o?o:u,r=_+(ti(d)-ti(b))+ki(b-_,n);h.push(r);let g=t(r),f=g.getHours()+g.getMinutes()/i+g.getSeconds()/s,m=u/s,v=p/a.axes[l]._space;for(;r=Ci(r+u,1==e?0:3),!(r>c);)if(m>1){let e=ti(Ci(f+m,6))%24,i=t(r).getHours()-e;i>1&&(i=-1),r-=i*s,f=(f+m)%24,Ci((r-h[h.length-1])/u,3)*v>=.7&&h.push(r)}else h.push(r)}return h}}]}const[bs,vs,_s]=ms(1),[xs,ys,ws]=ms(.001);function $s(e,t){return e.map(e=>e.map((i,s)=>0==s||8==s||null==i?i:t(1==s||0==e[8]?i:e[1]+i)))}function ks(e,t){return(i,s,o,n,r)=>{let a,l,d,c,u,p,h=t.find(e=>r>=e[0])||t[t.length-1];return s.map(t=>{let i=e(t),s=i.getFullYear(),o=i.getMonth(),n=i.getDate(),r=i.getHours(),g=i.getMinutes(),f=i.getSeconds(),m=s!=a&&h[2]||o!=l&&h[3]||n!=d&&h[4]||r!=c&&h[5]||g!=u&&h[6]||f!=p&&h[7]||h[1];return a=s,l=o,d=n,c=r,u=g,p=f,m(i)})}}function Ss(e,t,i){return new Date(e,t,i)}function Cs(e,t){return t(e)}Ti(2,-53,53,[1]);function Es(e,t){return(i,s,o,n)=>null==n?gt:t(e(s))}const Ds={show:!0,live:!0,isolate:!1,mount:()=>{},markers:{show:!0,width:2,stroke:function(e,t){let i=e.series[t];return i.width?i.stroke(e,t):i.points.width?i.points.stroke(e,t):null},fill:function(e,t){return e.series[t].fill(e,t)},dash:"solid"},idx:null,idxs:null,values:[]};const Ts=[0,0];function As(e,t,i,s=!0){return e=>{0==e.button&&(!s||e.target==t)&&i(e)}}function zs(e,t,i,s=!0){return e=>{(!s||e.target==t)&&i(e)}}const Fs={show:!0,x:!0,y:!0,lock:!1,move:function(e,t,i){return Ts[0]=t,Ts[1]=i,Ts},points:{one:!1,show:function(e,t){let i=e.cursor.points,s=St(),o=i.size(e,t);$t(s,Ze,o),$t(s,Qe,o);let n=o/-2;$t(s,"marginLeft",n),$t(s,"marginTop",n);let r=i.width(e,t,o);return r&&$t(s,"borderWidth",r),s},size:function(e,t){return e.series[t].points.size},width:0,stroke:function(e,t){let i=e.series[t].points;return i._stroke||i._fill},fill:function(e,t){let i=e.series[t].points;return i._fill||i._stroke}},bind:{mousedown:As,mouseup:As,click:As,dblclick:As,mousemove:zs,mouseleave:zs,mouseenter:zs},drag:{setScale:!0,x:!0,y:!1,dist:0,uni:null,click:(e,t)=>{t.stopPropagation(),t.stopImmediatePropagation()},_x:!1,_y:!1},focus:{dist:(e,t,i,s,o)=>s-o,prox:-1,bias:0},hover:{skip:[void 0],prox:null,bias:0},left:-10,top:-10,idx:null,dataIdx:null,idxs:null,event:null},Ms={show:!0,stroke:"rgba(0,0,0,0.07)",width:2},Ps=Ri({},Ms,{filter:bi}),Ns=Ri({},Ps,{size:10}),Os=Ri({},Ms,{show:!1}),Ls='12px system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',Is="bold "+Ls,Gs={show:!0,scale:"x",stroke:ot,space:50,gap:5,alignTo:1,size:50,labelGap:0,labelSize:30,labelFont:Is,side:2,grid:Ps,ticks:Ns,border:Os,font:Ls,lineGap:1.5,rotate:0},Us={show:!0,scale:"x",auto:!1,sorted:1,min:ui,max:-ui,idxs:[]};function Rs(e,t,i,s,o){return t.map(e=>null==e?"":Kt(e))}function js(e,t,i,s,o,n,r){let a=[],l=Ei.get(o)||0;for(let e=i=r?i:Ci(ki(i,o),l);e<=s;e=Ci(e+o,l))a.push(Object.is(e,-0)?0:e);return a}function Bs(e,t,i,s,o,n,r){const a=[],l=e.scales[e.axes[t].scale].log,d=ti((10==l?li:di)(i));o=ri(l,d),10==l&&(o=ns[Ot(o,ns)]);let c=i,u=o*l;10==l&&(u=ns[Ot(u,ns)]);do{a.push(c),c+=o,10!=l||Ei.has(c)||(c=Ci(c,Ei.get(o))),c>=u&&(u=(o=c)*l,10==l&&(u=ns[Ot(u,ns)]))}while(c<=s);return a}function Hs(e,t,i,s,o,n,r){let a=e.scales[e.axes[t].scale].asinh,l=s>a?Bs(e,t,ni(a,i),s,o):[a],d=s>=0&&i<=0?[0]:[];return(i<-a?Bs(e,t,ni(a,-s),-i,o):[a]).reverse().map(e=>-e).concat(d,l)}const Vs=/./,qs=/[12357]/,Ws=/[125]/,Ys=/1/,Js=(e,t,i,s)=>e.map((e,o)=>4==t&&0==e||o%s==0&&i.test(e.toExponential()[e<0?1:0])?e:null);function Xs(e,t,i,s,o){let n=e.axes[i],r=n.scale,a=e.scales[r],l=e.valToPos,d=n._space,c=l(10,r),u=l(9,r)-c>=d?Vs:l(7,r)-c>=d?qs:l(5,r)-c>=d?Ws:Ys;if(u==Ys){let e=ei(l(1,r)-c);if(e<d)return Js(t.slice().reverse(),a.distr,u,si(d/e)).reverse()}return Js(t,a.distr,u,1)}function Ks(e,t,i,s,o){let n=e.axes[i],r=n.scale,a=n._space,l=e.valToPos,d=ei(l(1,r)-l(2,r));return d<a?Js(t.slice().reverse(),3,Vs,si(a/d)).reverse():t}function Zs(e,t,i,s){return null==s?gt:null==t?"":Kt(t)}const Qs={show:!0,scale:"y",stroke:ot,space:30,gap:5,alignTo:1,size:50,labelGap:0,labelSize:30,labelFont:Is,side:3,grid:Ps,ticks:Ns,border:Os,font:Ls,lineGap:1.5,rotate:0};const eo={scale:null,auto:!0,sorted:0,min:ui,max:-ui},to=(e,t,i,s,o)=>o,io={show:!0,auto:!0,sorted:0,gaps:to,alpha:1,facets:[Ri({},eo,{scale:"x"}),Ri({},eo,{scale:"y"})]},so={scale:"y",auto:!0,sorted:0,show:!0,spanGaps:!1,gaps:to,alpha:1,points:{show:function(e,t){let{scale:i,idxs:s}=e.series[0],o=e._data[0],n=e.valToPos(o[s[0]],i,!0),r=e.valToPos(o[s[1]],i,!0),a=ei(r-n)/(e.series[t].points.space*_t);return s[1]-s[0]<=a},filter:null},values:null,min:ui,max:-ui,idxs:[],path:null,clip:null};function oo(e,t,i,s,o){return i/10}const no={time:!0,auto:!0,distr:1,log:10,asinh:1,min:null,max:null,dir:1,ori:0},ro=Ri({},no,{time:!1,ori:1}),ao={};function lo(e,t){let i=ao[e];return i||(i={key:e,plots:[],sub(e){i.plots.push(e)},unsub(e){i.plots=i.plots.filter(t=>t!=e)},pub(e,t,s,o,n,r,a){for(let l=0;l<i.plots.length;l++)i.plots[l]!=t&&i.plots[l].pub(e,t,s,o,n,r,a)}},null!=e&&(ao[e]=i)),i}function co(e,t,i){const s=e.mode,o=e.series[t],n=2==s?e._data[t]:e._data,r=e.scales,a=e.bbox;let l=n[0],d=2==s?n[1]:n[t],c=2==s?r[o.facets[0].scale]:r[e.series[0].scale],u=2==s?r[o.facets[1].scale]:r[o.scale],p=a.left,h=a.top,g=a.width,f=a.height,m=e.valToPosH,b=e.valToPosV;return 0==c.ori?i(o,l,d,c,u,m,b,p,h,g,f,vo,xo,wo,ko,Co):i(o,l,d,c,u,b,m,h,p,f,g,_o,yo,$o,So,Eo)}function uo(e,t){let i=0,s=0,o=Yt(e.bands,zi);for(let e=0;e<o.length;e++){let n=o[e];n.series[0]==t?i=n.dir:n.series[1]==t&&(1==n.dir?s|=1:s|=2)}return[i,1==s?-1:2==s?1:3==s?2:0]}function po(e,t,i,s,o){let n=e.mode,r=e.series[t],a=2==n?r.facets[1].scale:r.scale,l=e.scales[a];return-1==o?l.min:1==o?l.max:3==l.distr?1==l.dir?l.min:l.max:0}function ho(e,t,i,s,o,n){return co(e,t,(e,t,r,a,l,d,c,u,p,h,g)=>{let f=e.pxRound;const m=a.dir*(0==a.ori?1:-1),b=0==a.ori?xo:yo;let v,_;1==m?(v=i,_=s):(v=s,_=i);let x=f(d(t[v],a,h,u)),y=f(c(r[v],l,g,p)),w=f(d(t[_],a,h,u)),$=f(c(1==n?l.max:l.min,l,g,p)),k=new Path2D(o);return b(k,w,$),b(k,x,$),b(k,x,y),k})}function go(e,t,i,s,o,n){let r=null;if(e.length>0){r=new Path2D;const a=0==t?wo:$o;let l=i;for(let t=0;t<e.length;t++){let i=e[t];if(i[1]>i[0]){let e=i[0]-l;e>0&&a(r,l,s,e,s+n),l=i[1]}}let d=i+o-l,c=10;d>0&&a(r,l,s-c/2,d,s+n+c)}return r}function fo(e,t,i,s,o,n,r){let a=[],l=e.length;for(let d=1==o?i:s;d>=i&&d<=s;d+=o){if(null===t[d]){let c=d,u=d;if(1==o)for(;++d<=s&&null===t[d];)u=d;else for(;--d>=i&&null===t[d];)u=d;let p=n(e[c]),h=u==c?p:n(e[u]),g=c-o;p=r<=0&&g>=0&&g<l?n(e[g]):p;let f=u+o;h=r>=0&&f>=0&&f<l?n(e[f]):h,h>=p&&a.push([p,h])}}return a}function mo(e){return 0==e?mi:1==e?ii:t=>$i(t,e)}function bo(e){let t=0==e?vo:_o,i=0==e?(e,t,i,s,o,n)=>{e.arcTo(t,i,s,o,n)}:(e,t,i,s,o,n)=>{e.arcTo(i,t,o,s,n)},s=0==e?(e,t,i,s,o)=>{e.rect(t,i,s,o)}:(e,t,i,s,o)=>{e.rect(i,t,o,s)};return(e,o,n,r,a,l=0,d=0)=>{0==l&&0==d?s(e,o,n,r,a):(l=oi(l,r/2,a/2),d=oi(d,r/2,a/2),t(e,o+l,n),i(e,o+r,n,o+r,n+a,l),i(e,o+r,n+a,o,n+a,d),i(e,o,n+a,o,n,d),i(e,o,n,o+r,n,l),e.closePath())}}const vo=(e,t,i)=>{e.moveTo(t,i)},_o=(e,t,i)=>{e.moveTo(i,t)},xo=(e,t,i)=>{e.lineTo(t,i)},yo=(e,t,i)=>{e.lineTo(i,t)},wo=bo(0),$o=bo(1),ko=(e,t,i,s,o,n)=>{e.arc(t,i,s,o,n)},So=(e,t,i,s,o,n)=>{e.arc(i,t,s,o,n)},Co=(e,t,i,s,o,n,r)=>{e.bezierCurveTo(t,i,s,o,n,r)},Eo=(e,t,i,s,o,n,r)=>{e.bezierCurveTo(i,t,o,s,r,n)};function Do(e){return(e,t,i,s,o)=>co(e,t,(t,n,r,a,l,d,c,u,p,h,g)=>{let f,m,{pxRound:b,points:v}=t;0==a.ori?(f=vo,m=ko):(f=_o,m=So);const _=Ci(v.width*_t,3);let x=(v.size-v.width)/2*_t,y=Ci(2*x,3),w=new Path2D,$=new Path2D,{left:k,top:S,width:C,height:E}=e.bbox;wo($,k-y,S-y,C+2*y,E+2*y);const D=e=>{if(null!=r[e]){let t=b(d(n[e],a,h,u)),i=b(c(r[e],l,g,p));f(w,t+x,i),m(w,t,i,x,0,2*Qt)}};if(o)o.forEach(D);else for(let e=i;e<=s;e++)D(e);return{stroke:_>0?w:null,fill:w,clip:$,flags:3}})}function To(e){return(t,i,s,o,n,r)=>{s!=o&&(n!=s&&r!=s&&e(t,i,s),n!=o&&r!=o&&e(t,i,o),e(t,i,r))}}const Ao=To(xo),zo=To(yo);function Fo(e){const t=Yt(e?.alignGaps,0);return(e,i,s,o)=>co(e,i,(n,r,a,l,d,c,u,p,h,g,f)=>{[s,o]=Ut(a,s,o);let m,b,v=n.pxRound,_=e=>v(c(e,l,g,p)),x=e=>v(u(e,d,f,h));0==l.ori?(m=xo,b=Ao):(m=yo,b=zo);const y=l.dir*(0==l.ori?1:-1),w={stroke:new Path2D,fill:null,clip:null,band:null,gaps:null,flags:1},$=w.stroke;let k=!1;if(o-s>=4*g){let t,i,n,d=t=>e.posToVal(t,l.key,!0),c=null,u=null,p=_(r[1==y?s:o]),h=_(r[s]),g=_(r[o]),f=d(1==y?h+1:g-1);for(let e=1==y?s:o;e>=s&&e<=o;e+=y){let s=r[e],o=(1==y?s<f:s>f)?p:_(s),n=a[e];o==p?null!=n?(i=n,null==c?(m($,o,x(i)),t=c=u=i):i<c?c=i:i>u&&(u=i)):null===n&&(k=!0):(null!=c&&b($,p,x(c),x(u),x(t),x(i)),null!=n?(i=n,m($,o,x(i)),c=u=t=i):(c=u=null,null===n&&(k=!0)),p=o,f=d(p+y))}null!=c&&c!=u&&n!=p&&b($,p,x(c),x(u),x(t),x(i))}else for(let e=1==y?s:o;e>=s&&e<=o;e+=y){let t=a[e];null===t?k=!0:null!=t&&m($,_(r[e]),x(t))}let[S,C]=uo(e,i);if(null!=n.fill||0!=S){let t=w.fill=new Path2D($),a=x(n.fillTo(e,i,n.min,n.max,S)),l=_(r[s]),d=_(r[o]);-1==y&&([d,l]=[l,d]),m(t,d,a),m(t,l,a)}if(!n.spanGaps){let d=[];k&&d.push(...fo(r,a,s,o,y,_,t)),w.gaps=d=n.gaps(e,i,s,o,d),w.clip=go(d,l.ori,p,h,g,f)}return 0!=C&&(w.band=2==C?[ho(e,i,s,o,$,-1),ho(e,i,s,o,$,1)]:ho(e,i,s,o,$,C)),w})}function Mo(e,t,i,s,o,n,r=ui){if(e.length>1){let a=null;for(let l=0,d=1/0;l<e.length;l++)if(void 0!==t[l]){if(null!=a){let t=ei(e[l]-e[a]);t<d&&(d=t,r=ei(i(e[l],s,o,n)-i(e[a],s,o,n)))}a=l}}return r}function Po(e,t,i,s,o,n){const r=e.length;if(r<2)return null;const a=new Path2D;if(i(a,e[0],t[0]),2==r)s(a,e[1],t[1]);else{let i=Array(r),s=Array(r-1),n=Array(r-1),l=Array(r-1);for(let i=0;i<r-1;i++)n[i]=t[i+1]-t[i],l[i]=e[i+1]-e[i],s[i]=n[i]/l[i];i[0]=s[0];for(let e=1;e<r-1;e++)0===s[e]||0===s[e-1]||s[e-1]>0!=s[e]>0?i[e]=0:(i[e]=3*(l[e-1]+l[e])/((2*l[e]+l[e-1])/s[e-1]+(l[e]+2*l[e-1])/s[e]),isFinite(i[e])||(i[e]=0));i[r-1]=s[r-2];for(let s=0;s<r-1;s++)o(a,e[s]+l[s]/3,t[s]+i[s]*l[s]/3,e[s+1]-l[s]/3,t[s+1]-i[s+1]*l[s]/3,e[s+1],t[s+1])}return a}const No=new Set;function Oo(){for(let e of No)e.syncRect(!0)}ft&&(Pt("resize",bt,Oo),Pt("scroll",bt,Oo,!0),Pt(ht,bt,()=>{Ko.pxRatio=_t}));const Lo=Fo(),Io=Do();function Go(e,t,i,s){return(s?[e[0],e[1]].concat(e.slice(2)):[e[0]].concat(e.slice(1))).map((e,s)=>Uo(e,s,t,i))}function Uo(e,t,i,s){return Ri({},0==t?i:s,e)}function Ro(e,t,i){return null==t?Fi:[t,i]}const jo=Ro;function Bo(e,t,i){return null==t?Fi:Wt(t,i,.1,!0)}function Ho(e,t,i,s){return null==t?Fi:jt(t,i,e.scales[s].log,!1)}const Vo=Ho;function qo(e,t,i,s){return null==t?Fi:Bt(t,i,e.scales[s].log,!1)}const Wo=qo;function Yo(e,t,i,s,o){let n=ni(pi(e),pi(t)),r=t-e,a=Ot(o/s*r,i);do{let e=i[a],t=s*e/r;if(t>=o&&n+(e<5?Ei.get(e):0)<=17)return[e,t]}while(++a<i.length);return[0,0]}function Jo(e){let t,i;return[e=e.replace(/(\d+)px/,(e,s)=>(t=ii((i=+s)*_t))+"px"),t,i]}function Xo(e){e.show&&[e.font,e.labelFont].forEach(e=>{let t=Ci(e[2]*_t,1);e[0]=e[0].replace(/[0-9.]+px/,t+"px"),e[1]=t})}function Ko(e,t,i){const s={mode:Yt(e.mode,1)},o=s.mode;function n(e,t,i,s){let o=t.valToPct(e);return s+i*(-1==t.dir?1-o:o)}function r(e,t,i,s){let o=t.valToPct(e);return s+i*(-1==t.dir?o:1-o)}function a(e,t,i,s){return 0==t.ori?n(e,t,i,s):r(e,t,i,s)}s.valToPosH=n,s.valToPosV=r;let l=!1;s.status=0;const d=s.root=St("uplot");if(null!=e.id&&(d.id=e.id),yt(d,e.class),e.title){St("u-title",d).textContent=e.title}const c=kt("canvas"),u=s.ctx=c.getContext("2d"),p=St("u-wrap",d);Pt("click",p,e=>{if(e.target===g){(qi!=Gi||Wi!=ji)&&ss.click(s,e)}},!0);const h=s.under=St("u-under",p);p.appendChild(c);const g=s.over=St("u-over",p),f=+Yt((e=Ui(e)).pxAlign,1),m=mo(f);(e.plugins||[]).forEach(t=>{t.opts&&(e=t.opts(s,e)||e)});const b=e.ms||.001,v=s.series=1==o?Go(e.series||[],Us,so,!1):function(e,t){return e.map((e,i)=>0==i?{}:Ri({},t,e))}(e.series||[null],io),_=s.axes=Go(e.axes||[],Gs,Qs,!0),x=s.scales={},y=s.bands=e.bands||[];y.forEach(e=>{e.fill=fi(e.fill||null),e.dir=Yt(e.dir,-1)});const w=2==o?v[1].facets[0].scale:v[0].scale,$={axes:function(){for(let e=0;e<_.length;e++){let t=_[e];if(!t.show||!t._show)continue;let i,o,n=t.side,r=n%2,l=t.stroke(s,e),d=0==n||3==n?-1:1,[c,p]=t._found;if(null!=t.label){let a=t.labelGap*d,h=ii((t._lpos+a)*_t);Mt(t.labelFont[0],l,"center",2==n?et:tt),u.save(),1==r?(i=o=0,u.translate(h,ii(ge+me/2)),u.rotate((3==n?-Qt:Qt)/2)):(i=ii(he+fe/2),o=h);let g=gi(t.label)?t.label(s,e,c,p):t.label;u.fillText(g,i,o),u.restore()}if(0==p)continue;let h=x[t.scale],g=0==r?fe:me,f=0==r?he:ge,b=t._splits,v=2==h.distr?b.map(e=>xt[e]):b,y=2==h.distr?xt[b[1]]-xt[b[0]]:c,w=t.ticks,$=t.border,k=w.show?w.size:0,S=ii(k*_t),C=ii((2==t.alignTo?t._size-k-t.gap:t.gap)*_t),E=t._rotate*-Qt/180,D=m(t._pos*_t),T=D+(S+C)*d;o=0==r?T:0,i=1==r?T:0,Mt(t.font[0],l,1==t.align?it:2==t.align?st:E>0?it:E<0?st:0==r?"center":3==n?st:it,E||1==r?"middle":2==n?et:tt);let A=t.font[1]*t.lineGap,z=b.map(e=>m(a(e,h,g,f))),F=t._values;for(let e=0;e<F.length;e++){let t=F[e];if(null!=t){0==r?i=z[e]:o=z[e],t=""+t;let s=-1==t.indexOf("\n")?[t]:t.split(/\n/gm);for(let e=0;e<s.length;e++){let t=s[e];E?(u.save(),u.translate(i,o+e*A),u.rotate(E),u.fillText(t,0,0),u.restore()):u.fillText(t,i,o+e*A)}}}w.show&&di(z,w.filter(s,v,e,p,y),r,n,D,S,Ci(w.width*_t,3),w.stroke(s,e),w.dash,w.cap);let M=t.grid;M.show&&di(z,M.filter(s,v,e,p,y),r,0==r?2:1,0==r?ge:he,0==r?me:fe,Ci(M.width*_t,3),M.stroke(s,e),M.dash,M.cap),$.show&&di([D],[1],0==r?1:0,0==r?1:2,1==r?ge:he,1==r?me:fe,Ci($.width*_t,3),$.stroke(s,e),$.dash,$.cap)}vo("drawAxes")},series:function(){if(Ue>0){let e=v.some(e=>e._focus)&&vt!=De.alpha;e&&(u.globalAlpha=vt=De.alpha),v.forEach((e,i)=>{if(i>0&&e.show&&(qt(i,!1),qt(i,!0),null==e._paths)){let n=vt;vt!=e.alpha&&(u.globalAlpha=vt=e.alpha);let r=2==o?[0,t[i][0].length-1]:function(e){let t=hi(Re-1,0,Ue-1),i=hi(je+1,0,Ue-1);for(;null==e[t]&&t>0;)t--;for(;null==e[i]&&i<Ue-1;)i++;return[t,i]}(t[i]);e._paths=e.paths(s,i,r[0],r[1]),vt!=n&&(u.globalAlpha=vt=n)}}),v.forEach((e,t)=>{if(t>0&&e.show){let i=vt;vt!=e.alpha&&(u.globalAlpha=vt=e.alpha),null!=e._paths&&Jt(t,!1);{let i=null!=e._paths?e._paths.gaps:null,o=e.points.show(s,t,Re,je,i),n=e.points.filter(s,t,o,i);(o||n)&&(e.points._paths=e.points.paths(s,t,Re,je,n),Jt(t,!0))}vt!=i&&(u.globalAlpha=vt=i),vo("drawSeries",t)}}),e&&(u.globalAlpha=vt=1)}}},k=(e.drawOrder||["axes","series"]).map(e=>$[e]);function S(e){const t=3==e.distr?t=>li(t>0?t:e.clamp(s,t,e.min,e.max,e.key)):4==e.distr?t=>ci(t,e.asinh):100==e.distr?t=>e.fwd(t):e=>e;return i=>{let s=t(i),{_min:o,_max:n}=e;return(s-o)/(n-o)}}function C(t){let i=x[t];if(null==i){let s=(e.scales||Ai)[t]||Ai;if(null!=s.from){C(s.from);let e=Ri({},x[s.from],s,{key:t});e.valToPct=S(e),x[t]=e}else{i=x[t]=Ri({},t==w?no:ro,s),i.key=t;let e=i.time,n=i.range,r=Mi(n);if((t!=w||2==o&&!e)&&(!r||null!=n[0]&&null!=n[1]||(n={min:null==n[0]?Ht:{mode:1,hard:n[0],soft:n[0]},max:null==n[1]?Ht:{mode:1,hard:n[1],soft:n[1]}},r=!1),!r&&Oi(n))){let e=n;n=(t,i,s)=>null==i?Fi:Wt(i,s,e)}i.range=fi(n||(e?jo:t==w?3==i.distr?Vo:4==i.distr?Wo:Ro:3==i.distr?Ho:4==i.distr?qo:Bo)),i.auto=fi(!r&&i.auto),i.clamp=fi(i.clamp||oo),i._min=i._max=null,i.valToPct=S(i)}}}C("x"),C("y"),1==o&&v.forEach(e=>{C(e.scale)}),_.forEach(e=>{C(e.scale)});for(let t in e.scales)C(t);const E=x[w],D=E.distr;let T,A;0==E.ori?(yt(d,"u-hz"),T=n,A=r):(yt(d,"u-vt"),T=r,A=n);const z={};for(let e in x){let t=x[e];null==t.min&&null==t.max||(z[e]={min:t.min,max:t.max},t.min=t.max=null)}const F=e.tzDate||(e=>new Date(ii(e/b))),M=e.fmtDate||Zi,P=1==b?_s(F):ws(F),N=ks(F,$s(1==b?vs:ys,M)),O=Es(F,Cs("{YYYY}-{MM}-{DD} {h}:{mm}{aa}",M)),L=[],I=s.legend=Ri({},Ds,e.legend),G=s.cursor=Ri({},Fs,{drag:{y:2==o}},e.cursor),U=I.show,R=G.show,j=I.markers;let B,H,V;I.idxs=L,j.width=fi(j.width),j.dash=fi(j.dash),j.stroke=fi(j.stroke),j.fill=fi(j.fill);let q,W=[],Y=[],J=!1,X={};if(I.live){const e=v[1]?v[1].values:null;J=null!=e,q=J?e(s,1,0):{_:0};for(let e in q)X[e]=gt}if(U)if(B=kt("table","u-legend",d),V=kt("tbody",null,B),I.mount(s,B),J){H=kt("thead",null,B,V);let e=kt("tr",null,H);for(var K in kt("th",null,e),q)kt("th",Ke,e).textContent=K}else yt(B,"u-inline"),I.live&&yt(B,"u-live");const Z={show:!0},Q={show:!1};const ee=new Map;function te(e,t,i,o=!0){const n=ee.get(t)||{},r=G.bind[e](s,t,i,o);r&&(Pt(e,t,n[e]=r),ee.set(t,n))}function ie(e,t,i){const s=ee.get(t)||{};for(let i in s)null!=e&&i!=e||(Nt(i,t,s[i]),delete s[i]);null==e&&ee.delete(t)}let se=0,oe=0,ne=0,re=0,ae=0,le=0,de=ae,ce=le,ue=ne,pe=re,he=0,ge=0,fe=0,me=0;s.bbox={};let be=!1,ve=!1,_e=!1,xe=!1,ye=!1,we=!1;function $e(e,t,i){(i||e!=s.width||t!=s.height)&&ke(e,t),yi(!1),_e=!0,ve=!0,Qi()}function ke(e,t){s.width=se=ne=e,s.height=oe=re=t,ae=le=0,function(){let e=!1,t=!1,i=!1,s=!1;_.forEach((o,n)=>{if(o.show&&o._show){let{side:n,_size:r}=o,a=n%2,l=r+(null!=o.label?o.labelSize:0);l>0&&(a?(ne-=l,3==n?(ae+=l,s=!0):i=!0):(re-=l,0==n?(le+=l,e=!0):t=!0))}}),Oe[0]=e,Oe[1]=i,Oe[2]=t,Oe[3]=s,ne-=Ge[1]+Ge[3],ae+=Ge[3],re-=Ge[2]+Ge[0],le+=Ge[0]}(),function(){let e=ae+ne,t=le+re,i=ae,s=le;function o(o,n){switch(o){case 1:return e+=n,e-n;case 2:return t+=n,t-n;case 3:return i-=n,i+n;case 0:return s-=n,s+n}}_.forEach((e,t)=>{if(e.show&&e._show){let t=e.side;e._pos=o(t,e._size),null!=e.label&&(e._lpos=o(t,e.labelSize))}})}();let i=s.bbox;he=i.left=$i(ae*_t,.5),ge=i.top=$i(le*_t,.5),fe=i.width=$i(ne*_t,.5),me=i.height=$i(re*_t,.5)}const Se=3;if(s.setSize=function({width:e,height:t}){$e(e,t)},null==G.dataIdx){let e=G.hover,i=e.skip=new Set(e.skip??[]);i.add(void 0);let s=e.prox=fi(e.prox),o=e.bias??=0;G.dataIdx=(e,n,r,a)=>{if(0==n)return r;let l=r,d=s(e,n,r,a)??ui,c=d>=0&&d<ui,u=0==E.ori?ne:re,p=G.left,h=t[0],g=t[n];if(i.has(g[r])){l=null;let e,t=null,s=null;if(0==o||-1==o)for(e=r;null==t&&e-- >0;)i.has(g[e])||(t=e);if(0==o||1==o)for(e=r;null==s&&e++<g.length;)i.has(g[e])||(s=e);if(null!=t||null!=s)if(c){let e=p-(null==t?-1/0:T(h[t],E,u,0)),i=(null==s?1/0:T(h[s],E,u,0))-p;e<=i?e<=d&&(l=t):i<=d&&(l=s)}else l=null==s?t:null==t?s:r-t<=s-r?t:s}else if(c){ei(p-T(h[r],E,u,0))>d&&(l=null)}return l}}const Ce=e=>{G.event=e};G.idxs=L,G._lock=!1;let Ee=G.points;Ee.show=fi(Ee.show),Ee.size=fi(Ee.size),Ee.stroke=fi(Ee.stroke),Ee.width=fi(Ee.width),Ee.fill=fi(Ee.fill);const De=s.focus=Ri({},e.focus||{alpha:.3},G.focus),Te=De.prox>=0,Ae=Te&&Ee.one;let ze=[],Fe=[],Me=[];function Pe(e,t){let i=Ee.show(s,t);if(i instanceof HTMLElement)return yt(i,"u-cursor-pt"),yt(i,e.class),Et(i,-10,-10,ne,re),g.insertBefore(i,ze[t]),i}function Ne(e,t){if(1==o||t>0){let t=1==o&&x[e.scale].time,i=e.value;e.value=t?Ni(i)?Es(F,Cs(i,M)):i||O:i||Zs,e.label=e.label||(t?"Time":"Value")}if(Ae||t>0){e.width=null==e.width?1:e.width,e.paths=e.paths||Lo||vi,e.fillTo=fi(e.fillTo||po),e.pxAlign=+Yt(e.pxAlign,f),e.pxRound=mo(e.pxAlign),e.stroke=fi(e.stroke||null),e.fill=fi(e.fill||null),e._stroke=e._fill=e._paths=e._focus=null;let t=Ci((3+2*(ni(1,e.width)||1))*1,3),i=e.points=Ri({},{size:t,width:ni(1,.2*t),stroke:e.stroke,space:2*t,paths:Io,_stroke:null,_fill:null},e.points);i.show=fi(i.show),i.filter=fi(i.filter),i.fill=fi(i.fill),i.stroke=fi(i.stroke),i.paths=fi(i.paths),i.pxAlign=e.pxAlign}if(U){let i=function(e,t){if(0==t&&(J||!I.live||2==o))return Fi;let i=[],n=kt("tr","u-series",V,V.childNodes[t]);yt(n,e.class),e.show||yt(n,Xe);let r=kt("th",null,n);if(j.show){let e=St("u-marker",r);if(t>0){let i=j.width(s,t);i&&(e.style.border=i+"px "+j.dash(s,t)+" "+j.stroke(s,t)),e.style.background=j.fill(s,t)}}let a=St(Ke,r);for(var l in e.label instanceof HTMLElement?a.appendChild(e.label):a.textContent=e.label,t>0&&(j.show||(a.style.color=e.width>0?j.stroke(s,t):j.fill(s,t)),te("click",r,t=>{if(G._lock)return;Ce(t);let i=v.indexOf(e);if((t.ctrlKey||t.metaKey)!=I.isolate){let e=v.some((e,t)=>t>0&&t!=i&&e.show);v.forEach((t,s)=>{s>0&&ps(s,e?s==i?Z:Q:Z,!0,xo.setSeries)})}else ps(i,{show:!e.show},!0,xo.setSeries)},!1),Te&&te(dt,r,t=>{G._lock||(Ce(t),ps(v.indexOf(e),ms,!0,xo.setSeries))},!1)),q){let e=kt("td","u-value",n);e.textContent="--",i.push(e)}return[n,i]}(e,t);W.splice(t,0,i[0]),Y.splice(t,0,i[1]),I.values.push(null)}if(R){L.splice(t,0,null);let i=null;Ae?0==t&&(i=Pe(e,t)):t>0&&(i=Pe(e,t)),ze.splice(t,0,i),Fe.splice(t,0,0),Me.splice(t,0,0)}vo("addSeries",t)}s.addSeries=function(e,t){t=null==t?v.length:t,e=1==o?Uo(e,t,Us,so):Uo(e,t,{},io),v.splice(t,0,e),Ne(v[t],t)},s.delSeries=function(e){if(v.splice(e,1),U){I.values.splice(e,1),Y.splice(e,1);let t=W.splice(e,1)[0];ie(null,t.firstChild),t.remove()}R&&(L.splice(e,1),ze.splice(e,1)[0].remove(),Fe.splice(e,1),Me.splice(e,1)),vo("delSeries",e)};const Oe=[!1,!1,!1,!1];function Le(e,t,i,s){let[o,n,r,a]=i,l=t%2,d=0;return 0==l&&(a||n)&&(d=0==t&&!o||2==t&&!r?ii(Gs.size/3):0),1==l&&(o||r)&&(d=1==t&&!n||3==t&&!a?ii(Qs.size/2):0),d}const Ie=s.padding=(e.padding||[Le,Le,Le,Le]).map(e=>fi(Yt(e,Le))),Ge=s._padding=Ie.map((e,t)=>e(s,t,Oe,0));let Ue,Re=null,je=null;const Be=1==o?v[0].idxs:null;let He,Ve,qe,We,Ye,Je,ot,pt,ft,vt,xt=null,Ct=!1;function Dt(e,i){if(t=null==e?[]:e,s.data=s._data=t,2==o){Ue=0;for(let e=1;e<v.length;e++)Ue+=t[e][0].length}else{0==t.length&&(s.data=s._data=t=[[]]),xt=t[0],Ue=xt.length;let e=t;if(2==D){e=t.slice();let i=e[0]=Array(Ue);for(let e=0;e<Ue;e++)i[e]=e}s._data=t=e}if(yi(!0),vo("setData"),2==D&&(_e=!0),!1!==i){let e=E;e.auto(s,Ct)?At():us(w,e.min,e.max),xe=xe||G.left>=0,we=!0,Qi()}}function At(){let e,i;Ct=!0,1==o&&(Ue>0?(Re=Be[0]=0,je=Be[1]=Ue-1,e=t[0][Re],i=t[0][je],2==D?(e=Re,i=je):e==i&&(3==D?[e,i]=jt(e,e,E.log,!1):4==D?[e,i]=Bt(e,e,E.log,!1):E.time?i=e+ii(86400/b):[e,i]=Wt(e,i,.1,!0))):(Re=Be[0]=e=null,je=Be[1]=i=null)),us(w,e,i)}function Ft(e,t,i,s,o,n){e??=nt,i??=zi,s??="butt",o??=nt,n??="round",e!=He&&(u.strokeStyle=He=e),o!=Ve&&(u.fillStyle=Ve=o),t!=qe&&(u.lineWidth=qe=t),n!=Ye&&(u.lineJoin=Ye=n),s!=Je&&(u.lineCap=Je=s),i!=We&&u.setLineDash(We=i)}function Mt(e,t,i,s){t!=Ve&&(u.fillStyle=Ve=t),e!=ot&&(u.font=ot=e),i!=pt&&(u.textAlign=pt=i),s!=ft&&(u.textBaseline=ft=s)}function Lt(e,t,i,o,n=0){if(o.length>0&&e.auto(s,Ct)&&(null==t||null==t.min)){let t=Yt(Re,0),s=Yt(je,o.length-1),r=null==i.min?function(e,t,i,s=0,o=!1){let n=o?Rt:Ut,r=o?Gt:It;[t,i]=n(e,t,i);let a=e[t],l=e[t];if(t>-1)if(1==s)a=e[t],l=e[i];else if(-1==s)a=e[i],l=e[t];else for(let s=t;s<=i;s++){let t=e[s];r(t)&&(t<a?a=t:t>l&&(l=t))}return[a??ui,l??-ui]}(o,t,s,n,3==e.distr):[i.min,i.max];e.min=oi(e.min,i.min=r[0]),e.max=ni(e.max,i.max=r[1])}}s.setData=Dt;const Vt={min:null,max:null};function qt(e,t){let i=t?v[e].points:v[e];i._stroke=i.stroke(s,e),i._fill=i.fill(s,e)}function Jt(e,i){let o=i?v[e].points:v[e],{stroke:n,fill:r,clip:a,flags:l,_stroke:d=o._stroke,_fill:c=o._fill,_width:p=o.width}=o._paths;p=Ci(p*_t,3);let h=null,g=p%2/2;i&&null==c&&(c=p>0?"#fff":d);let f=1==o.pxAlign&&g>0;if(f&&u.translate(g,g),!i){let e=he-p/2,t=ge-p/2,i=fe+p,s=me+p;h=new Path2D,h.rect(e,t,i,s)}i?Kt(d,p,o.dash,o.cap,c,n,r,l,a):function(e,i,o,n,r,a,l,d,c,u,p){let h=!1;0!=c&&y.forEach((g,f)=>{if(g.series[0]==e){let e,m=v[g.series[1]],b=t[g.series[1]],_=(m._paths||Ai).band;Mi(_)&&(_=1==g.dir?_[0]:_[1]);let x=null;m.show&&_&&function(e,t,i){for(t=Yt(t,0),i=Yt(i,e.length-1);t<=i;){if(null!=e[t])return!0;t++}return!1}(b,Re,je)?(x=g.fill(s,f)||a,e=m._paths.clip):_=null,Kt(i,o,n,r,x,l,d,c,u,p,e,_),h=!0}}),h||Kt(i,o,n,r,a,l,d,c,u,p)}(e,d,p,o.dash,o.cap,c,n,r,l,h,a),f&&u.translate(-g,-g)}const Xt=3;function Kt(e,t,i,s,o,n,r,a,l,d,c,p){Ft(e,t,i,s,o),(l||d||p)&&(u.save(),l&&u.clip(l),d&&u.clip(d)),p?(a&Xt)==Xt?(u.clip(p),c&&u.clip(c),ai(o,r),ti(e,n,t)):2&a?(ai(o,r),u.clip(p),ti(e,n,t)):1&a&&(u.save(),u.clip(p),c&&u.clip(c),ai(o,r),u.restore(),ti(e,n,t)):(ai(o,r),ti(e,n,t)),(l||d||p)&&u.restore()}function ti(e,t,i){i>0&&(t instanceof Map?t.forEach((e,t)=>{u.strokeStyle=He=t,u.stroke(e)}):null!=t&&e&&u.stroke(t))}function ai(e,t){t instanceof Map?t.forEach((e,t)=>{u.fillStyle=Ve=t,u.fill(e)}):null!=t&&e&&u.fill(t)}function di(e,t,i,s,o,n,r,a,l,d){let c=r%2/2;1==f&&u.translate(c,c),Ft(a,r,l,d,a),u.beginPath();let p,h,g,m,b=o+(0==s||3==s?-n:n);0==i?(h=o,m=b):(p=o,g=b);for(let s=0;s<e.length;s++)null!=t[s]&&(0==i?p=g=e[s]:h=m=e[s],u.moveTo(p,h),u.lineTo(g,m));u.stroke(),1==f&&u.translate(-c,-c)}function pi(e){let t=!0;return _.forEach((i,o)=>{if(!i.show)return;let n=x[i.scale];if(null==n.min)return void(i._show&&(t=!1,i._show=!1,yi(!1)));i._show||(t=!1,i._show=!0,yi(!1));let r=i.side,a=r%2,{min:l,max:d}=n,[c,u]=function(e,t,i,o){let n,r=_[e];if(o<=0)n=[0,0];else{let a=r._space=r.space(s,e,t,i,o);n=Yo(t,i,r._incrs=r.incrs(s,e,t,i,o,a),o,a)}return r._found=n}(o,l,d,0==a?ne:re);if(0==u)return;let p=2==n.distr,h=i._splits=i.splits(s,o,l,d,c,u,p),g=2==n.distr?h.map(e=>xt[e]):h,f=2==n.distr?xt[h[1]]-xt[h[0]]:c,m=i._values=i.values(s,i.filter(s,g,o,u,f),o,u,f);i._rotate=2==r?i.rotate(s,m,o,u):0;let b=i._size;i._size=si(i.size(s,m,o,e)),null!=b&&i._size!=b&&(t=!1)}),t}function mi(e){let t=!0;return Ie.forEach((i,o)=>{let n=i(s,o,Oe,e);n!=Ge[o]&&(t=!1),Ge[o]=n}),t}function yi(e){v.forEach((t,i)=>{i>0&&(t._paths=null,e&&(1==o?(t.min=null,t.max=null):t.facets.forEach(e=>{e.min=null,e.max=null})))})}let wi,ki,Si,Ti,Pi,Ii,Gi,ji,Hi,Vi,qi,Wi,Yi=!1,Ji=!1,Xi=[];function Ki(){Ji=!1;for(let e=0;e<Xi.length;e++)vo(...Xi[e]);Xi.length=0}function Qi(){Yi||(Bi(es),Yi=!0)}function es(){if(be&&(!function(){for(let e in x){let t=x[e];null==z[e]&&(null==t.min||null!=z[w]&&t.auto(s,Ct))&&(z[e]=Vt)}for(let e in x){let t=x[e];null==z[e]&&null!=t.from&&null!=z[t.from]&&(z[e]=Vt)}null!=z[w]&&yi(!0);let e={};for(let t in z){let i=z[t];if(null!=i){let n=e[t]=Ui(x[t],Li);if(null!=i.min)Ri(n,i);else if(t!=w||2==o)if(0==Ue&&null==n.from){let e=n.range(s,null,null,t);n.min=e[0],n.max=e[1]}else n.min=ui,n.max=-ui}}if(Ue>0){v.forEach((i,n)=>{if(1==o){let o=i.scale,r=z[o];if(null==r)return;let a=e[o];if(0==n){let e=a.range(s,a.min,a.max,o);a.min=e[0],a.max=e[1],Re=Ot(a.min,t[0]),je=Ot(a.max,t[0]),je-Re>1&&(t[0][Re]<a.min&&Re++,t[0][je]>a.max&&je--),i.min=xt[Re],i.max=xt[je]}else i.show&&i.auto&&Lt(a,r,i,t[n],i.sorted);i.idxs[0]=Re,i.idxs[1]=je}else if(n>0&&i.show&&i.auto){let[s,o]=i.facets,r=s.scale,a=o.scale,[l,d]=t[n],c=e[r],u=e[a];null!=c&&Lt(c,z[r],s,l,s.sorted),null!=u&&Lt(u,z[a],o,d,o.sorted),i.min=o.min,i.max=o.max}});for(let t in e){let i=e[t],o=z[t];if(null==i.from&&(null==o||null==o.min)){let e=i.range(s,i.min==ui?null:i.min,i.max==-ui?null:i.max,t);i.min=e[0],i.max=e[1]}}}for(let t in e){let i=e[t];if(null!=i.from){let o=e[i.from];if(null==o.min)i.min=i.max=null;else{let e=i.range(s,o.min,o.max,t);i.min=e[0],i.max=e[1]}}}let i={},n=!1;for(let t in e){let s=e[t],o=x[t];if(o.min!=s.min||o.max!=s.max){o.min=s.min,o.max=s.max;let e=o.distr;o._min=3==e?li(o.min):4==e?ci(o.min,o.asinh):100==e?o.fwd(o.min):o.min,o._max=3==e?li(o.max):4==e?ci(o.max,o.asinh):100==e?o.fwd(o.max):o.max,i[t]=n=!0}}if(n){v.forEach((e,t)=>{2==o?t>0&&i.y&&(e._paths=null):i[e.scale]&&(e._paths=null)});for(let e in i)_e=!0,vo("setScale",e);R&&G.left>=0&&(xe=we=!0)}for(let e in z)z[e]=null}(),be=!1),_e&&(!function(){let e=!1,t=0;for(;!e;){t++;let i=pi(t),o=mi(t);e=t==Se||i&&o,e||(ke(s.width,s.height),ve=!0)}}(),_e=!1),ve){if($t(h,it,ae),$t(h,et,le),$t(h,Ze,ne),$t(h,Qe,re),$t(g,it,ae),$t(g,et,le),$t(g,Ze,ne),$t(g,Qe,re),$t(p,Ze,se),$t(p,Qe,oe),c.width=ii(se*_t),c.height=ii(oe*_t),_.forEach(({_el:e,_show:t,_size:i,_pos:s,side:o})=>{if(null!=e)if(t){let t=o%2==1;$t(e,t?"left":"top",s-(3===o||0===o?i:0)),$t(e,t?"width":"height",i),$t(e,t?"top":"left",t?le:ae),$t(e,t?"height":"width",t?re:ne),wt(e,Xe)}else yt(e,Xe)}),He=Ve=qe=Ye=Je=ot=pt=ft=We=null,vt=1,Is(!0),ae!=de||le!=ce||ne!=ue||re!=pe){yi(!1);let e=ne/ue,t=re/pe;if(R&&!xe&&G.left>=0){G.left*=e,G.top*=t,Si&&Et(Si,ii(G.left),0,ne,re),Ti&&Et(Ti,0,ii(G.top),ne,re);for(let i=0;i<ze.length;i++){let s=ze[i];null!=s&&(Fe[i]*=e,Me[i]*=t,Et(s,si(Fe[i]),si(Me[i]),ne,re))}}if(ls.show&&!ye&&ls.left>=0&&ls.width>0){ls.left*=e,ls.width*=e,ls.top*=t,ls.height*=t;for(let e in Ws)$t(ds,e,ls[e])}de=ae,ce=le,ue=ne,pe=re}vo("setSize"),ve=!1}se>0&&oe>0&&(u.clearRect(0,0,c.width,c.height),vo("drawClear"),k.forEach(e=>e()),vo("draw")),ls.show&&ye&&(cs(ls),ye=!1),R&&xe&&(Os(null,!0,!1),xe=!1),I.show&&I.live&&we&&(Ps(),we=!1),l||(l=!0,s.status=1,vo("ready")),Ct=!1,Yi=!1}function ts(e,i){let o=x[e];if(null==o.from){if(0==Ue){let t=o.range(s,i.min,i.max,e);i.min=t[0],i.max=t[1]}if(i.min>i.max){let e=i.min;i.min=i.max,i.max=e}if(Ue>1&&null!=i.min&&null!=i.max&&i.max-i.min<1e-16)return;e==w&&2==o.distr&&Ue>0&&(i.min=Ot(i.min,t[0]),i.max=Ot(i.max,t[0]),i.min==i.max&&i.max++),z[e]=i,be=!0,Qi()}}s.batch=function(e,t=!1){Yi=!0,Ji=t,e(s),es(),t&&Xi.length>0&&queueMicrotask(Ki)},s.redraw=(e,t)=>{_e=t||!1,!1!==e?us(w,E.min,E.max):Qi()},s.setScale=ts;let is=!1;const ss=G.drag;let rs=ss.x,as=ss.y;R&&(G.x&&(wi=St("u-cursor-x",g)),G.y&&(ki=St("u-cursor-y",g)),0==E.ori?(Si=wi,Ti=ki):(Si=ki,Ti=wi),qi=G.left,Wi=G.top);const ls=s.select=Ri({show:!0,over:!0,left:0,width:0,top:0,height:0},e.select),ds=ls.show?St("u-select",ls.over?g:h):null;function cs(e,t){if(ls.show){for(let t in e)ls[t]=e[t],t in Ws&&$t(ds,t,e[t]);!1!==t&&vo("setSelect")}}function us(e,t,i){ts(e,{min:t,max:i})}function ps(e,t,i,n){null!=t.focus&&function(e){if(e!=fs){let t=null==e,i=1!=De.alpha;v.forEach((s,n)=>{if(1==o||n>0){let o=t||0==n||n==e;s._focus=t?null:o,i&&function(e,t){v[e].alpha=t,R&&null!=ze[e]&&(ze[e].style.opacity=t);U&&W[e]&&(W[e].style.opacity=t)}(n,o?1:De.alpha)}}),fs=e,i&&Qi()}}(e),null!=t.show&&v.forEach((i,s)=>{s>0&&(e==s||null==e)&&(i.show=t.show,function(e){if(v[e].show)U&&wt(W[e],Xe);else if(U&&yt(W[e],Xe),R){let t=Ae?ze[0]:ze[e];null!=t&&Et(t,-10,-10,ne,re)}}(s),2==o?(us(i.facets[0].scale,null,null),us(i.facets[1].scale,null,null)):us(i.scale,null,null),Qi())}),!1!==i&&vo("setSeries",e,t),n&&$o("setSeries",s,e,t)}let hs,gs,fs;s.setSelect=cs,s.setSeries=ps,s.addBand=function(e,t){e.fill=fi(e.fill||null),e.dir=Yt(e.dir,-1),t=null==t?y.length:t,y.splice(t,0,e)},s.setBand=function(e,t){Ri(y[e],t)},s.delBand=function(e){null==e?y.length=0:y.splice(e,1)};const ms={focus:!0};function Ss(e,t,i){let s=x[t];i&&(e=e/_t-(1==s.ori?le:ae));let o=ne;1==s.ori&&(o=re,e=o-e),-1==s.dir&&(e=o-e);let n=s._min,r=n+(s._max-n)*(e/o),a=s.distr;return 3==a?ri(10,r):4==a?((e,t=1)=>Zt.sinh(e)*t)(r,s.asinh):100==a?s.bwd(r):r}function Ts(e,t){$t(ds,it,ls.left=e),$t(ds,Ze,ls.width=t)}function As(e,t){$t(ds,et,ls.top=e),$t(ds,Qe,ls.height=t)}U&&Te&&te(ct,B,e=>{G._lock||(Ce(e),null!=fs&&ps(null,ms,!0,xo.setSeries))}),s.valToIdx=e=>Ot(e,t[0]),s.posToIdx=function(e,i){return Ot(Ss(e,w,i),t[0],Re,je)},s.posToVal=Ss,s.valToPos=(e,t,i)=>0==x[t].ori?n(e,x[t],i?fe:ne,i?he:0):r(e,x[t],i?me:re,i?ge:0),s.setCursor=(e,t,i)=>{qi=e.left,Wi=e.top,Os(null,t,i)};let zs=0==E.ori?Ts:As,Ms=1==E.ori?Ts:As;function Ps(e,t){if(null!=e&&(e.idxs?e.idxs.forEach((e,t)=>{L[t]=e}):(e=>void 0===e)(e.idx)||L.fill(e.idx),I.idx=L[0]),U&&I.live){for(let e=0;e<v.length;e++)(e>0||1==o&&!J)&&Ns(e,L[e]);!function(){if(U&&I.live)for(let e=2==o?1:0;e<v.length;e++){if(0==e&&J)continue;let t=I.values[e],i=0;for(let s in t)Y[e][i++].firstChild.nodeValue=t[s]}}()}we=!1,!1!==t&&vo("setLegend")}function Ns(e,i){let o,n=v[e],r=0==e&&2==D?xt:t[e];J?o=n.values(s,e,i)??X:(o=n.value(s,null==i?null:r[i],e,i),o=null==o?X:{_:o}),I.values[e]=o}function Os(e,i,n){let r;Hi=qi,Vi=Wi,[qi,Wi]=G.move(s,qi,Wi),G.left=qi,G.top=Wi,R&&(Si&&Et(Si,ii(qi),0,ne,re),Ti&&Et(Ti,0,ii(Wi),ne,re));let a=Re>je;hs=ui,gs=null;let l=0==E.ori?ne:re,d=1==E.ori?ne:re;if(qi<0||0==Ue||a){r=G.idx=null;for(let e=0;e<v.length;e++){let t=ze[e];null!=t&&Et(t,-10,-10,ne,re)}Te&&ps(null,ms,!0,null==e&&xo.setSeries),I.live&&(L.fill(r),we=!0)}else{let e,i,n;1==o&&(e=0==E.ori?qi:Wi,i=Ss(e,w),r=G.idx=Ot(i,t[0],Re,je),n=T(t[0][r],E,l,0));let a=-10,c=-10,u=0,p=0,h=!0,g="",f="";for(let e=2==o?1:0;e<v.length;e++){let m=v[e],b=L[e],_=null==b?null:1==o?t[e][b]:t[e][1][b],y=G.dataIdx(s,e,r,i),w=null==y?null:1==o?t[e][y]:t[e][1][y];if(we=we||w!=_||y!=b,L[e]=y,e>0&&m.show){let i=null==y?-10:y==r?n:T(1==o?t[0][y]:t[e][0][y],E,l,0),b=null==w?-10:A(w,1==o?x[m.scale]:x[m.facets[1].scale],d,0);if(Te&&null!=w){let t=1==E.ori?qi:Wi,i=ei(De.dist(s,e,y,b,t));if(i<hs){let s=De.bias;if(0!=s){let o=Ss(t,m.scale),n=o>=0?1:-1;n==(w>=0?1:-1)&&(1==n?1==s?w>=o:w<=o:1==s?w<=o:w>=o)&&(hs=i,gs=e)}else hs=i,gs=e}}if(we||Ae){let t,o;0==E.ori?(t=i,o=b):(t=b,o=i);let n,r,l,d,m,v,_=!0,x=Ee.bbox;if(null!=x){_=!1;let t=x(s,e);l=t.left,d=t.top,n=t.width,r=t.height}else l=t,d=o,n=r=Ee.size(s,e);if(v=Ee.fill(s,e),m=Ee.stroke(s,e),Ae)e==gs&&hs<=De.prox&&(a=l,c=d,u=n,p=r,h=_,g=v,f=m);else{let t=ze[e];null!=t&&(Fe[e]=l,Me[e]=d,zt(t,n,r,_),Tt(t,v,m),Et(t,si(l),si(d),ne,re))}}}}if(Ae){let e=De.prox;if(we||(null==fs?hs<=e:hs>e||gs!=fs)){let e=ze[0];null!=e&&(Fe[0]=a,Me[0]=c,zt(e,u,p,h),Tt(e,g,f),Et(e,si(a),si(c),ne,re))}}}if(ls.show&&is)if(null!=e){let[t,i]=xo.scales,[s,o]=xo.match,[n,r]=e.cursor.sync.scales,a=e.cursor.drag;if(rs=a._x,as=a._y,rs||as){let a,c,u,p,h,{left:g,top:f,width:m,height:b}=e.select,v=e.scales[n].ori,_=e.posToVal,y=null!=t&&s(t,n),w=null!=i&&o(i,r);y&&rs?(0==v?(a=g,c=m):(a=f,c=b),u=x[t],p=T(_(a,n),u,l,0),h=T(_(a+c,n),u,l,0),zs(oi(p,h),ei(h-p))):zs(0,l),w&&as?(1==v?(a=g,c=m):(a=f,c=b),u=x[i],p=A(_(a,r),u,d,0),h=A(_(a+c,r),u,d,0),Ms(oi(p,h),ei(h-p))):Ms(0,d)}else Ys()}else{let e=ei(Hi-Pi),t=ei(Vi-Ii);if(1==E.ori){let i=e;e=t,t=i}rs=ss.x&&e>=ss.dist,as=ss.y&&t>=ss.dist;let i,s,o=ss.uni;null!=o?rs&&as&&(rs=e>=o,as=t>=o,rs||as||(t>e?as=!0:rs=!0)):ss.x&&ss.y&&(rs||as)&&(rs=as=!0),rs&&(0==E.ori?(i=Gi,s=qi):(i=ji,s=Wi),zs(oi(i,s),ei(s-i)),as||Ms(0,d)),as&&(1==E.ori?(i=Gi,s=qi):(i=ji,s=Wi),Ms(oi(i,s),ei(s-i)),rs||zs(0,l)),rs||as||(zs(0,0),Ms(0,0))}if(ss._x=rs,ss._y=as,null==e){if(n){if(null!=yo){let[e,t]=xo.scales;xo.values[0]=null!=e?Ss(0==E.ori?qi:Wi,e):null,xo.values[1]=null!=t?Ss(1==E.ori?qi:Wi,t):null}$o(rt,s,qi,Wi,ne,re,r)}if(Te){let e=n&&xo.setSeries,t=De.prox;null==fs?hs<=t&&ps(gs,ms,!0,e):hs>t?ps(null,ms,!0,e):gs!=fs&&ps(gs,ms,!0,e)}}we&&(I.idx=r,Ps()),!1!==i&&vo("setCursor")}s.setLegend=Ps;let Ls=null;function Is(e=!1){e?Ls=null:(Ls=g.getBoundingClientRect(),vo("syncRect",Ls))}function Vs(e,t,i,s,o,n,r){G._lock||is&&null!=e&&0==e.movementX&&0==e.movementY||(qs(e,t,i,s,o,n,r,!1,null!=e),null!=e?Os(null,!0,!0):Os(t,!0,!1))}function qs(e,t,i,o,n,r,l,d,c){if(null==Ls&&Is(!1),Ce(e),null!=e)i=e.clientX-Ls.left,o=e.clientY-Ls.top;else{if(i<0||o<0)return qi=-10,void(Wi=-10);let[e,s]=xo.scales,l=t.cursor.sync,[d,c]=l.values,[u,p]=l.scales,[h,g]=xo.match,f=t.axes[0].side%2==1,m=0==E.ori?ne:re,b=1==E.ori?ne:re,v=f?r:n,_=f?n:r,y=f?o:i,w=f?i:o;if(i=null!=u?h(e,u)?a(d,x[e],m,0):-10:m*(y/v),o=null!=p?g(s,p)?a(c,x[s],b,0):-10:b*(w/_),1==E.ori){let e=i;i=o,o=e}}!c||null!=t&&t.cursor.event.type!=rt||((i<=1||i>=ne-1)&&(i=$i(i,ne)),(o<=1||o>=re-1)&&(o=$i(o,re))),d?(Pi=i,Ii=o,[Gi,ji]=G.move(s,i,o)):(qi=i,Wi=o)}Object.defineProperty(s,"rect",{get:()=>(null==Ls&&Is(!1),Ls)});const Ws={width:0,height:0,left:0,top:0};function Ys(){cs(Ws,!1)}let Js,eo,to,ao;function co(e,t,i,o,n,r,a){is=!0,rs=as=ss._x=ss._y=!1,qs(e,t,i,o,n,r,0,!0,!1),null!=e&&(te(lt,mt,uo,!1),$o(at,s,Gi,ji,ne,re,null));let{left:l,top:d,width:c,height:u}=ls;Js=l,eo=d,to=c,ao=u}function uo(e,t,i,o,n,r,a){is=ss._x=ss._y=!1,qs(e,t,i,o,n,r,0,!1,!0);let{left:l,top:d,width:c,height:u}=ls,p=c>0||u>0,h=Js!=l||eo!=d||to!=c||ao!=u;if(p&&h&&cs(ls),ss.setScale&&p&&h){let e=l,t=c,i=d,s=u;if(1==E.ori&&(e=d,t=u,i=l,s=c),rs&&us(w,Ss(e,w),Ss(e+t,w)),as)for(let e in x){let t=x[e];e!=w&&null==t.from&&t.min!=ui&&us(e,Ss(i+s,e),Ss(i,e))}Ys()}else G.lock&&(G._lock=!G._lock,Os(t,!0,null!=e));null!=e&&(ie(lt,mt),$o(lt,s,qi,Wi,ne,re,null))}function ho(e,t,i,o,n,r,a){G._lock||(Ce(e),At(),Ys(),null!=e&&$o(ut,s,qi,Wi,ne,re,null))}function go(){_.forEach(Xo),$e(s.width,s.height,!0)}Pt(ht,bt,go);const fo={};fo.mousedown=co,fo.mousemove=Vs,fo.mouseup=uo,fo.dblclick=ho,fo.setSeries=(e,t,i,o)=>{-1!=(i=(0,xo.match[2])(s,t,i))&&ps(i,o,!0,!1)},R&&(te(at,g,co),te(rt,g,Vs),te(dt,g,e=>{Ce(e),Is(!1)}),te(ct,g,function(e,t,i,s,o,n,r){if(G._lock)return;Ce(e);let a=is;if(is){let e,t,i=!0,s=!0,o=10;0==E.ori?(e=rs,t=as):(e=as,t=rs),e&&t&&(i=qi<=o||qi>=ne-o,s=Wi<=o||Wi>=re-o),e&&i&&(qi=qi<Gi?0:ne),t&&s&&(Wi=Wi<ji?0:re),Os(null,!0,!0),is=!1}qi=-10,Wi=-10,L.fill(null),Os(null,!0,!0),a&&(is=a)}),te(ut,g,ho),No.add(s),s.syncRect=Is);const bo=s.hooks=e.hooks||{};function vo(e,t,i){Ji?Xi.push([e,t,i]):e in bo&&bo[e].forEach(e=>{e.call(null,s,t,i)})}(e.plugins||[]).forEach(e=>{for(let t in e.hooks)bo[t]=(bo[t]||[]).concat(e.hooks[t])});const _o=(e,t,i)=>i,xo=Ri({key:null,setSeries:!1,filters:{pub:_i,sub:_i},scales:[w,v[1]?v[1].scale:null],match:[xi,xi,_o],values:[null,null]},G.sync);2==xo.match.length&&xo.match.push(_o),G.sync=xo;const yo=xo.key,wo=lo(yo);function $o(e,t,i,s,o,n,r){xo.filters.pub(e,t,i,s,o,n,r)&&wo.pub(e,t,i,s,o,n,r)}function ko(){vo("init",e,t),Dt(t||e.data,!1),z[w]?ts(w,z[w]):At(),ye=ls.show&&(ls.width>0||ls.height>0),xe=we=!0,$e(e.width,e.height)}return wo.sub(s),s.pub=function(e,t,i,s,o,n,r){xo.filters.sub(e,t,i,s,o,n,r)&&fo[e](null,t,i,s,o,n,r)},s.destroy=function(){wo.unsub(s),No.delete(s),ee.clear(),Nt(ht,bt,go),d.remove(),B?.remove(),vo("destroy")},v.forEach(Ne),_.forEach(function(e,t){if(e._show=e.show,e.show){let i=e.side%2,o=x[e.scale];null==o&&(e.scale=i?v[1].scale:w,o=x[e.scale]);let n=o.time;e.size=fi(e.size),e.space=fi(e.space),e.rotate=fi(e.rotate),Mi(e.incrs)&&e.incrs.forEach(e=>{!Ei.has(e)&&Ei.set(e,Di(e))}),e.incrs=fi(e.incrs||(2==o.distr?os:n?1==b?bs:xs:ns)),e.splits=fi(e.splits||(n&&1==o.distr?P:3==o.distr?Bs:4==o.distr?Hs:js)),e.stroke=fi(e.stroke),e.grid.stroke=fi(e.grid.stroke),e.ticks.stroke=fi(e.ticks.stroke),e.border.stroke=fi(e.border.stroke);let r=e.values;e.values=Mi(r)&&!Mi(r[0])?fi(r):n?Mi(r)?ks(F,$s(r,M)):Ni(r)?function(e,t){let i=Zi(t);return(t,s,o,n,r)=>s.map(t=>i(e(t)))}(F,r):r||N:r||Rs,e.filter=fi(e.filter||(o.distr>=3&&10==o.log?Xs:3==o.distr&&2==o.log?Ks:bi)),e.font=Jo(e.font),e.labelFont=Jo(e.labelFont),e._size=e.size(s,null,t,0),e._space=e._rotate=e._incrs=e._found=e._splits=e._values=null,e._size>0&&(Oe[t]=!0,e._el=St("u-axis",p))}}),i?i instanceof HTMLElement?(i.appendChild(d),ko()):i(s,ko):ko(),s}Ko.assign=Ri,Ko.fmtNum=Kt,Ko.rangeNum=Wt,Ko.rangeLog=jt,Ko.rangeAsinh=Bt,Ko.orient=co,Ko.pxRatio=_t,Ko.join=function(e,t){if(function(e){let t=e[0][0],i=t.length;for(let s=1;s<e.length;s++){let o=e[s][0];if(o.length!=i)return!1;if(o!=t)for(let e=0;e<i;e++)if(o[e]!=t[e])return!1}return!0}(e)){let t=e[0].slice();for(let i=1;i<e.length;i++)t.push(...e[i].slice(1));return function(e,t=100){const i=e.length;if(i<=1)return!0;let s=0,o=i-1;for(;s<=o&&null==e[s];)s++;for(;o>=s&&null==e[o];)o--;if(o<=s)return!0;const n=ni(1,ti((o-s+1)/t));for(let t=e[s],i=s+n;i<=o;i+=n){const s=e[i];if(null!=s){if(s<=t)return!1;t=s}}return!0}(t[0])||(t=function(e){let t=e[0],i=t.length,s=Array(i);for(let e=0;e<s.length;e++)s[e]=e;s.sort((e,i)=>t[e]-t[i]);let o=[];for(let t=0;t<e.length;t++){let n=e[t],r=Array(i);for(let e=0;e<i;e++)r[e]=n[s[e]];o.push(r)}return o}(t)),t}let i=new Set;for(let t=0;t<e.length;t++){let s=e[t][0],o=s.length;for(let e=0;e<o;e++)i.add(s[e])}let s=[Array.from(i).sort((e,t)=>e-t)],o=s[0].length,n=new Map;for(let e=0;e<o;e++)n.set(s[0][e],e);for(let i=0;i<e.length;i++){let r=e[i],a=r[0];for(let e=1;e<r.length;e++){let l=r[e],d=Array(o).fill(void 0),c=t?t[i][e]:1,u=[];for(let e=0;e<l.length;e++){let t=l[e],i=n.get(a[e]);null===t?0!=c&&(d[i]=t,2==c&&u.push(i)):d[i]=t}ji(d,u,o),s.push(d)}}return s},Ko.fmtDate=Zi,Ko.tzDate=function(e,t){let i;return"UTC"==t||"Etc/UTC"==t?i=new Date(+e+6e4*e.getTimezoneOffset()):t==Qi?i=e:(i=new Date(e.toLocaleString("en-US",{timeZone:t})),i.setMilliseconds(e.getMilliseconds())),i},Ko.sync=lo;{Ko.addGap=function(e,t,i){let s=e[e.length-1];s&&s[0]==t?s[1]=i:e.push([t,i])},Ko.clipGaps=go;let e=Ko.paths={points:Do};e.linear=Fo,e.stepped=function(e){const t=Yt(e.align,1),i=Yt(e.ascDesc,!1),s=Yt(e.alignGaps,0),o=Yt(e.extend,!1);return(e,n,r,a)=>co(e,n,(l,d,c,u,p,h,g,f,m,b,v)=>{[r,a]=Ut(c,r,a);let _=l.pxRound,{left:x,width:y}=e.bbox,w=e=>_(h(e,u,b,f)),$=e=>_(g(e,p,v,m)),k=0==u.ori?xo:yo;const S={stroke:new Path2D,fill:null,clip:null,band:null,gaps:null,flags:1},C=S.stroke,E=u.dir*(0==u.ori?1:-1);let D=$(c[1==E?r:a]),T=w(d[1==E?r:a]),A=T,z=T;o&&-1==t&&(z=x,k(C,z,D)),k(C,T,D);for(let e=1==E?r:a;e>=r&&e<=a;e+=E){let i=c[e];if(null==i)continue;let s=w(d[e]),o=$(i);1==t?k(C,s,D):k(C,A,o),k(C,s,o),D=o,A=s}let F=A;o&&1==t&&(F=x+y,k(C,F,D));let[M,P]=uo(e,n);if(null!=l.fill||0!=M){let t=S.fill=new Path2D(C),i=$(l.fillTo(e,n,l.min,l.max,M));k(t,F,i),k(t,z,i)}if(!l.spanGaps){let o=[];o.push(...fo(d,c,r,a,E,w,s));let p=l.width*_t/2,h=i||1==t?p:-p,g=i||-1==t?-p:p;o.forEach(e=>{e[0]+=h,e[1]+=g}),S.gaps=o=l.gaps(e,n,r,a,o),S.clip=go(o,u.ori,f,m,b,v)}return 0!=P&&(S.band=2==P?[ho(e,n,r,a,C,-1),ho(e,n,r,a,C,1)]:ho(e,n,r,a,C,P)),S})},e.bars=function(e){const t=Yt((e=e||Ai).size,[.6,ui,1]),i=e.align||0,s=e.gap||0;let o=e.radius;o=null==o?[0,0]:"number"==typeof o?[o,0]:o;const n=fi(o),r=1-t[0],a=Yt(t[1],ui),l=Yt(t[2],1),d=Yt(e.disp,Ai),c=Yt(e.each,e=>{}),{fill:u,stroke:p}=d;return(e,t,o,h)=>co(e,t,(g,f,m,b,v,_,x,y,w,$,k)=>{let S,C,E=g.pxRound,D=i,T=s*_t,A=a*_t,z=l*_t;0==b.ori?[S,C]=n(e,t):[C,S]=n(e,t);const F=b.dir*(0==b.ori?1:-1);let M,P,N,O=0==b.ori?wo:$o,L=0==b.ori?c:(e,t,i,s,o,n,r)=>{c(e,t,i,o,s,r,n)},I=Yt(e.bands,zi).find(e=>e.series[0]==t),G=null!=I?I.dir:0,U=g.fillTo(e,t,g.min,g.max,G),R=E(x(U,v,k,w)),j=$,B=E(g.width*_t),H=!1,V=null,q=null,W=null,Y=null;null==u||0!=B&&null==p||(H=!0,V=u.values(e,t,o,h),q=new Map,new Set(V).forEach(e=>{null!=e&&q.set(e,new Path2D)}),B>0&&(W=p.values(e,t,o,h),Y=new Map,new Set(W).forEach(e=>{null!=e&&Y.set(e,new Path2D)})));let{x0:J,size:X}=d;if(null!=J&&null!=X){D=1,f=J.values(e,t,o,h),2==J.unit&&(f=f.map(t=>e.posToVal(y+t*$,b.key,!0)));let i=X.values(e,t,o,h);P=2==X.unit?i[0]*$:_(i[0],b,$,y)-_(0,b,$,y),j=Mo(f,m,_,b,$,y,j),N=j-P+T}else j=Mo(f,m,_,b,$,y,j),N=j*r+T,P=j-N;N<1&&(N=0),B>=P/2&&(B=0),N<5&&(E=mi);let K=N>0;P=E(hi(j-N-(K?B:0),z,A)),M=(0==D?P/2:D==F?0:P)-D*F*((0==D?T/2:0)+(K?B/2:0));const Z={stroke:null,fill:null,clip:null,band:null,gaps:null,flags:0},Q=H?null:new Path2D;let ee=null;if(null!=I)ee=e.data[I.series[1]];else{let{y0:i,y1:s}=d;null!=i&&null!=s&&(m=s.values(e,t,o,h),ee=i.values(e,t,o,h))}let te=S*P,ie=C*P;for(let i=1==F?o:h;i>=o&&i<=h;i+=F){let s=m[i];if(null==s)continue;if(null!=ee){let e=ee[i]??0;if(s-e==0)continue;R=x(e,v,k,w)}let o=_(2!=b.distr||null!=d?f[i]:i,b,$,y),n=x(Yt(s,U),v,k,w),r=E(o-M),a=E(ni(n,R)),l=E(oi(n,R)),c=a-l;if(null!=s){let o=s<0?ie:te,n=s<0?te:ie;H?(B>0&&null!=W[i]&&O(Y.get(W[i]),r,l+ti(B/2),P,ni(0,c-B),o,n),null!=V[i]&&O(q.get(V[i]),r,l+ti(B/2),P,ni(0,c-B),o,n)):O(Q,r,l+ti(B/2),P,ni(0,c-B),o,n),L(e,t,i,r-B/2,l,P+B,c)}}return B>0?Z.stroke=H?Y:Q:H||(Z._fill=0==g.width?g._fill:g._stroke??g._fill,Z.width=0),Z.fill=H?q:Q,Z})},e.spline=function(e){return function(e,t){const i=Yt(t?.alignGaps,0);return(t,s,o,n)=>co(t,s,(r,a,l,d,c,u,p,h,g,f,m)=>{[o,n]=Ut(l,o,n);let b,v,_,x=r.pxRound,y=e=>x(u(e,d,f,h)),w=e=>x(p(e,c,m,g));0==d.ori?(b=vo,_=xo,v=Co):(b=_o,_=yo,v=Eo);const $=d.dir*(0==d.ori?1:-1);let k=y(a[1==$?o:n]),S=k,C=[],E=[];for(let e=1==$?o:n;e>=o&&e<=n;e+=$)if(null!=l[e]){let t=y(a[e]);C.push(S=t),E.push(w(l[e]))}const D={stroke:e(C,E,b,_,v,x),fill:null,clip:null,band:null,gaps:null,flags:1},T=D.stroke;let[A,z]=uo(t,s);if(null!=r.fill||0!=A){let e=D.fill=new Path2D(T),i=w(r.fillTo(t,s,r.min,r.max,A));_(e,S,i),_(e,k,i)}if(!r.spanGaps){let e=[];e.push(...fo(a,l,o,n,$,y,i)),D.gaps=e=r.gaps(t,s,o,n,e),D.clip=go(e,d.ori,h,g,f,m)}return 0!=z&&(D.band=2==z?[ho(t,s,o,n,T,-1),ho(t,s,o,n,T,1)]:ho(t,s,o,n,T,z)),D})}(Po,e)}}class Zo extends le{static properties={deviceId:{type:String},attrName:{type:String},hours:{type:Number,state:!0},_loading:{type:Boolean,state:!0},_error:{type:String,state:!0}};static styles=n`
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
  `;constructor(){super(),this.hours=24,this._loading=!1,this._error="",this._chart=null,this._data=null}connectedCallback(){super.connectedCallback(),this._fetchData()}disconnectedCallback(){super.disconnectedCallback(),this._chart&&(this._chart.destroy(),this._chart=null)}async _fetchData(){this._loading=!0,this._error="";try{const{fetchAttributeHistory:e}=await Promise.resolve().then(function(){return We}),t=await e(this.deviceId,this.attrName,this.hours);this._data=t,this._loading=!1,await this.updateComplete,this._renderChart()}catch(e){this._error=e.message||"Failed to load history",this._loading=!1}}_renderChart(){this._data&&0!==this._data.length&&requestAnimationFrame(()=>this._doRenderChart())}_doRenderChart(){if(!this._data||0===this._data.length)return;const e=this.shadowRoot.querySelector(".chart-wrap");if(!e)return;this._chart&&(this._chart.destroy(),this._chart=null),e.innerHTML="";const t=[],i=[];for(const e of this._data){const s=new Date(e.last_changed).getTime()/1e3,o=parseFloat(e.state);isNaN(o)||(t.push(s),i.push(o))}if(0===t.length)return;const s={width:e.clientWidth||660,height:200,cursor:{show:!0},select:{show:!1},legend:{show:!1},axes:[{stroke:"rgba(255,255,255,0.2)",grid:{stroke:"rgba(255,255,255,0.05)",width:1},ticks:{stroke:"rgba(255,255,255,0.1)",width:1},font:"9px Segoe UI, sans-serif",values:(e,t)=>t.map(e=>{const t=new Date(1e3*e);return`${t.getHours()}:${String(t.getMinutes()).padStart(2,"0")}`})},{stroke:"rgba(255,255,255,0.2)",grid:{stroke:"rgba(255,255,255,0.05)",width:1},ticks:{stroke:"rgba(255,255,255,0.1)",width:1},font:"9px Segoe UI, sans-serif",size:40}],series:[{},{stroke:"#00D4FF",width:1.5,fill:"rgba(0,212,255,0.08)"}]};this._chart=new Ko(s,[t,i],e)}_setHours(e){this.hours=e,this._fetchData()}_close(){this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}render(){return B`
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
    `}}customElements.define("attribute-chart",Zo);class Qo extends le{static properties={device:{type:Object},effectiveSettings:{type:Object},haOverrides:{type:Object},groups:{type:Object},cardAttributes:{type:Array},attributeTransforms:{type:Object},groupTransforms:{type:Object},_showHidden:{type:Boolean,state:!0},_expandedChart:{type:String,state:!0}};static styles=[ce,n`
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
  `];constructor(){super(),this.device=null,this.effectiveSettings=null,this.haOverrides={},this.groups={},this.cardAttributes=[],this.attributeTransforms={},this.groupTransforms={},this._showHidden=!1,this._expandedChart=null}_isExposed(e){if(void 0!==this.haOverrides[e])return this.haOverrides[e];const t=this.effectiveSettings;return void 0!==t?.ha_exposure_overrides?.[e]?t.ha_exposure_overrides[e]:"all"===t?.ha_exposure||!!t?.ha_exposed_attributes?.includes(e)}_getThresholdForAttr(e){const t=this.effectiveSettings;if(!t)return null;const i=(t.thresholds||{})[e];if(null==i)return null;const s="object"==typeof i?i.value:i;if(null==s)return null;const o=this.device?.threshold_overrides||{},n=this.device?.group_policy,r=n?this.groups[n]:null;let a="global";return null!=o[e]?a="device":null!=r?.thresholds?.[e]&&(a="Group Policy"),{value:s,source:a}}_checkThreshold(e,t){if(!t||null==e||"number"!=typeof e)return!1;const i="object"==typeof t?t.value:t,s="object"==typeof t&&t.op||">";if(null==i)return!1;switch(s){case">":default:return e>i;case"<":return e<i;case">=":return e>=i;case"<=":return e<=i;case"==":return e===i;case"!=":return e!==i}}_getThresholdOp(e){const t=(this.device?.threshold_overrides||{})[e];if(null!=t&&"object"==typeof t)return t.op||">";const i=this.effectiveSettings;if(!i)return">";const s=(i.thresholds||{})[e];return null!=s&&"object"==typeof s&&s.op||">"}_getThresholdVal(e){const t=(this.device?.threshold_overrides||{})[e];if(null!=t)return"object"==typeof t?t.value:t;const i=this._getThresholdForAttr(e);return i?i.value:null}_getCritThresholdOp(e){const t=(this.device?.crit_threshold_overrides||{})[e];return null!=t&&"object"==typeof t&&t.op||">"}_getCritThresholdVal(e){const t=(this.device?.crit_threshold_overrides||{})[e];return null!=t?"object"==typeof t?t.value:t:null}render(){if(!this.device)return B``;const e=Object.entries(this.device.attributes||{}).sort(([e],[t])=>e.localeCompare(t)),t=this.device.hidden_attributes||[],i=e.filter(([e])=>!t.includes(e)),s=e.filter(([e])=>t.includes(e));return 0===e.length?B``:B`
      <div class="section">
        <div class="section-title">Attributes</div>
        <div class="attr-grid">
          ${i.map(([e,t])=>this._renderAttrTile(e,t))}
        </div>
        ${s.length>0?B`
          <div style="margin-top: 12px;">
            <div style="font-size: 10px; color: #fff; margin-bottom: 6px; cursor: pointer;"
              @click=${()=>this._showHidden=!this._showHidden}>
              ${this._showHidden?"▾":"▸"} ${s.length} hidden attribute${1!==s.length?"s":""}
            </div>
            ${this._showHidden?B`
              <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                ${s.map(([e])=>B`
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
    `}_renderAttrTile(e,t){const i=this._isExposed(e),s=this._getThresholdForAttr(e),o=null!=t.value?t.value:null,n=(this.device?.threshold_overrides||{})[e],r=null!=n?n:s?s.value:null,a=this._checkThreshold(o,r),l=this._getThresholdOp(e),d=this._getThresholdVal(e),c=(this.cardAttributes||[]).includes(e),u=(this.attributeTransforms||{})[e]||"",p=this._getCritThresholdOp(e),h=this._getCritThresholdVal(e),g=this.device?.crit_threshold_overrides||{},f=null!=g[e]?g[e]:null,m=this._checkThreshold(o,f),b=m?"critical-val":a?"exceeded-val":"";return B`
      <div class="attr-tile ${i?"":"dimmed"} ${m?"critical":a?"exceeded":""}">
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
            aria-checked=${i?"true":"false"}
            aria-label="Expose ${e.replace(/_/g," ")} to Home Assistant"
            tabindex="0"
            @click=${()=>this._onToggleExposure(e)}
            @keydown=${t=>("Enter"===t.key||" "===t.key)&&this._onToggleExposure(e)}>
            <div class="toggle ${i?"on":"off"}">
              <div class="toggle-knob"></div>
            </div>
          </span>
        </div>
        <div class="attr-val ${i?"":"dimmed-val"} ${b}">
          ${this._formatValue(o,t.unit,u)}
        </div>
        <div class="attr-thresholds">
          <div class="attr-threshold-row">
            ${a?B`<span style="color: #ffb74d; font-size: 11px;">\u26A0</span>`:""}
            <span class="threshold-label warn">warn</span>
            <select class="threshold-op"
              aria-label="Warning threshold operator for ${e.replace(/_/g," ")}"
              .value=${l}
              @change=${t=>this._onThresholdChange(e,d,t.target.value)}>
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
              .value=${null!=d?String(d):""}
              @change=${t=>this._onThresholdChange(e,t.target.value,l)}>
            ${s&&"device"!==s.source&&null==n?B`
              <span class="threshold-source">${s.source}</span>
            `:""}
          </div>
          <div class="attr-threshold-row">
            ${m?B`<span style="color: #ef5350; font-size: 11px;">\u26A0</span>`:""}
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
        <div class="attr-transform">
          <div class="transform-label">Transform</div>
          <select class="transform-select"
            aria-label="Value transform for ${e.replace(/_/g," ")}"
            .value=${u}
            @change=${t=>this._onTransformChange(e,t.target.value)}>
            ${function(){const e=he.map(e=>({value:e.id,label:e.name}));return[...fe,...e]}().map(e=>B`
              <option value=${e.value} ?selected=${e.value===u}>${e.label}</option>
            `)}
          </select>
          ${(this.groupTransforms||{})[e]&&!(this.device?.attribute_transforms||{})[e]?B`<span class="transform-source">Group Policy</span>`:""}
        </div>
        ${this._isExposed(e)?B`
          <div style="margin-top: 4px;">
            <button style="background: none; border: 1px solid rgba(255,255,255,0.08); border-radius: 4px; color: ${this._expandedChart===e?"#00D4FF":"rgba(255,255,255,0.25)"}; cursor: pointer; padding: 2px 6px; font-size: 10px; transition: all 0.15s;"
              @click=${t=>{t.stopPropagation(),this._expandedChart=this._expandedChart===e?null:e}}>
              ${this._expandedChart===e?"▾ History":"▸ History"}
            </button>
          </div>
          ${this._expandedChart===e?B`
            <attribute-chart
              .deviceId=${this.device?.device_id||""}
              .attrName=${e}
              @close=${()=>{this._expandedChart=null}}
            ></attribute-chart>
          `:""}
        `:""}
      </div>
    `}_onDelete(e){this.dispatchEvent(new CustomEvent("attribute-deleted",{detail:{name:e},bubbles:!0,composed:!0}))}_onUnhide(e){this.dispatchEvent(new CustomEvent("attribute-unhidden",{detail:{name:e},bubbles:!0,composed:!0}))}_onToggleExposure(e){this.dispatchEvent(new CustomEvent("ha-exposure-toggled",{detail:{name:e},bubbles:!0,composed:!0}))}_onThresholdChange(e,t,i){this.dispatchEvent(new CustomEvent("threshold-changed",{detail:{name:e,value:t,op:i},bubbles:!0,composed:!0}))}_onCritThresholdChange(e,t,i){this.dispatchEvent(new CustomEvent("crit-threshold-changed",{detail:{name:e,value:t,op:i},bubbles:!0,composed:!0}))}_formatValue(e,t,i){if(null==e)return"—";if(i){return pe(e,i)}return B`${e}<span class="attr-unit">${t||""}</span>`}_onTransformChange(e,t){this.dispatchEvent(new CustomEvent("transform-changed",{detail:{attr:e,transform:t||null},bubbles:!0,composed:!0}))}_togglePin(e){this.dispatchEvent(new CustomEvent("pin-attribute",{detail:{name:e,pinned:!(this.cardAttributes||[]).includes(e)},bubbles:!0,composed:!0}))}}customElements.define("device-attributes",Qo);const en=["shutdown","halt","poweroff","destroy"];class tn extends le{static properties={device:{type:Object},serverCommands:{type:Object},commandResult:{type:String},_showHiddenCmds:{type:Boolean,state:!0},_showAddCommand:{type:Boolean,state:!0},_editingCommandName:{type:String,state:!0},_editCommandForm:{type:Object,state:!0}};static styles=[ce,n`
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
  `];constructor(){super(),this.device=null,this.serverCommands={},this.commandResult="",this._showHiddenCmds=!1,this._showAddCommand=!1,this._editingCommandName=null,this._editCommandForm=null}render(){if(!this.device)return B``;const e=this.device.allowed_commands||[],t=this.serverCommands||{},i=Object.keys(t),s=[...new Set([...e,...i])],o=this.device.hidden_commands||[],n=s.filter(e=>!o.includes(e)),r=s.filter(e=>o.includes(e)),a=(this.device.active_plugins||[]).includes("custom_command");return B`
      <div class="section">
        <div class="section-title">Commands</div>

        ${n.length>0?B`
          <div class="commands" style="margin-bottom: 12px;">
            ${n.map(e=>B`
              <span class="cmd-wrap">
                <button class="cmd-btn ${function(e){const t=e.toLowerCase();return en.some(e=>t.includes(e))}(e)?"danger":""}"
                  @click=${()=>this._onSend(e)}>${e}</button>
                <span class="cmd-eye" title="Hide command"
                  @click=${t=>{t.stopPropagation(),this._onHide(e)}}>&#128065;</span>
              </span>
            `)}
          </div>
        `:""}
        ${this.commandResult?B`<div class="cmd-result">${this.commandResult}</div>`:""}

        ${i.length>0?B`
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
    `}_startAdd(){this._showAddCommand=!0,this._editingCommandName=null,this._editCommandForm={name:"",shell:""}}_startEdit(e,t){this._editingCommandName=e,this._showAddCommand=!1,this._editCommandForm={name:e,shell:t}}_saveForm(){const e=this._editCommandForm;if(!e)return;const t=(e.name||"").trim(),i=(e.shell||"").trim();t&&i&&(this.dispatchEvent(new CustomEvent("server-command-save",{detail:{name:t,shell:i,editing:this._editingCommandName},bubbles:!0,composed:!0})),this._cancelForm())}_cancelForm(){this._showAddCommand=!1,this._editingCommandName=null,this._editCommandForm=null}_onSend(e){this.dispatchEvent(new CustomEvent("command-send",{detail:{command:e},bubbles:!0,composed:!0}))}_onHide(e){this.dispatchEvent(new CustomEvent("command-hide",{detail:{name:e},bubbles:!0,composed:!0}))}_onUnhide(e){this.dispatchEvent(new CustomEvent("command-unhide",{detail:{name:e},bubbles:!0,composed:!0}))}_onRemove(e){this.dispatchEvent(new CustomEvent("server-command-remove",{detail:{name:e},bubbles:!0,composed:!0}))}}customElements.define("device-commands",tn);class sn extends le{static properties={device:{type:Object},configInterval:{type:Number},customSensors:{type:Object},_showAddSensor:{type:Boolean,state:!0},_editSensorKey:{type:String,state:!0},_sensorForm:{type:Object,state:!0}};static styles=[ce,n`
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
  `];constructor(){super(),this.device=null,this.configInterval=30,this.customSensors={},this.pushing=!1,this.pushStatus="",this.lastPushed="",this._showAddSensor=!1,this._editSensorKey=null,this._sensorForm={name:"",command:"",interval:30,unit:""}}render(){if(!this.device)return B``;const e=this.device.remote_config||{},t=this.device.active_plugins||(e.plugins?Object.keys(e.plugins):[]),i=this.customSensors;return B`
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
          ${Object.keys(i).length>0?B`
            <table class="sensor-table">
              <thead>
                <tr>
                  <th>Name</th><th>Command</th><th>Interval</th><th>Unit</th><th></th>
                </tr>
              </thead>
              <tbody>
                ${Object.entries(i).map(([e,t])=>B`
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
    `}_startAdd(){this._showAddSensor=!0,this._editSensorKey=null,this._sensorForm={name:"",command:"",interval:30,unit:""}}_startEdit(e,t){this._editSensorKey=e,this._showAddSensor=!1,this._sensorForm={name:e,command:t.command,interval:t.interval||30,unit:t.unit||""}}_saveForm(){const{name:e,command:t,interval:i,unit:s}=this._sensorForm;e.trim()&&t.trim()&&(this.dispatchEvent(new CustomEvent("sensor-save",{detail:{key:e.trim(),sensor:{command:t,interval:i||30,unit:s},oldKey:this._editSensorKey},bubbles:!0,composed:!0})),this._cancelForm())}_cancelForm(){this._showAddSensor=!1,this._editSensorKey=null,this._sensorForm={name:"",command:"",interval:30,unit:""}}_onIntervalChange(e){this.dispatchEvent(new CustomEvent("interval-changed",{detail:{value:e},bubbles:!0,composed:!0}))}_onRemove(e){this.dispatchEvent(new CustomEvent("sensor-remove",{detail:{key:e},bubbles:!0,composed:!0}))}}customElements.define("device-config",sn);class on extends le{static properties={deviceId:{type:String},groupId:{type:String},device:{type:Object},commandResult:{type:String},_groups:{type:Object,state:!0},_effectiveSettings:{type:Object,state:!0},_haOverrides:{type:Object,state:!0},_configInterval:{type:Number,state:!0},_customSensors:{type:Object,state:!0},_showGroupDialog:{type:Boolean,state:!0},_newGroupName:{type:String,state:!0},_serverCommands:{type:Object,state:!0}};static styles=[ce,n`
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
  `];constructor(){super(),this.device=null,this.commandResult="",this._groups={},this._effectiveSettings=null,this._haOverrides={},this._configInterval=30,this._customSensors={},this._showGroupDialog=!1,this._newGroupName="",this._serverCommands={}}get _isGroupMode(){return!!this.groupId&&!this.deviceId}connectedCallback(){super.connectedCallback(),this._loadGroups(),this._isGroupMode?this._loadGroupAggregate():this._loadDevice(),this._wsUnsub=ue.onMessage(e=>{if("device_update"===e.type){if(this._isGroupMode)return;e.device_id===this.deviceId&&this._updateDeviceData(e.device)}})}disconnectedCallback(){super.disconnectedCallback(),this._wsUnsub&&this._wsUnsub()}async _refreshDevice(){try{const e=await _e(this.deviceId);this._updateDeviceData(e)}catch(e){}}_updateDeviceData(e){if(!e)return;const t={...this.device||{},...e};JSON.stringify(this.device)!==JSON.stringify(t)&&(this.device=t)}async _loadGroupAggregate(){try{const e=await Ae();this._groups=e;const t=e[this.groupId];if(!t)return;const i=await ve(),s=t.device_ids||[],o=s.map(e=>i[e]).filter(Boolean),n={};for(const e of o)for(const[t,i]of Object.entries(e.attributes||{}))n[t]||(n[t]={...i});const r=new Set;for(const e of o)for(const t of e.allowed_commands||[])r.add(t);const a=new Set;for(const e of o)for(const t of e.active_plugins||[])a.add(t);a.add("custom_command"),this.device={device_name:t.name,device_type:`Group · ${s.length} device${1!==s.length?"s":""}`,status:o.some(e=>"online"===e.status)?"online":"offline",attributes:n,attribute_transforms:t.attribute_transforms||{},threshold_overrides:t.thresholds||{},crit_threshold_overrides:t.crit_thresholds||{},allowed_commands:[...r],hidden_commands:t.hidden_commands||[],hidden_attributes:t.hidden_attributes||[],card_attributes:t.card_attributes||[],active_plugins:[...a],tags:[],server_tags:[],group_policy:this.groupId,_isGroupAggregate:!0},this._configInterval=t.interval??30,this._serverCommands={},this._customSensors=t.custom_sensors||{},this._haOverrides={},this._effectiveSettings=null}catch(e){console.error("Failed to load group aggregate:",e)}}async _refreshGroupAggregate(){try{const e=(await Ae())[this.groupId];if(!e)return;const t=await ve(),i=(e.device_ids||[]).map(e=>t[e]).filter(Boolean),s={};for(const e of i)for(const[t,i]of Object.entries(e.attributes||{}))s[t]||(s[t]={...i});this.device={...this.device,attributes:s},this._groups={...this._groups,[this.groupId]:e},this._customSensors=e.custom_sensors||{},this.requestUpdate()}catch(e){}}async _loadDevice(){try{this.device=await _e(this.deviceId),this._haOverrides={...this.device.ha_exposure_overrides||{}};const e=this.device.server_commands;this._serverCommands=e&&!Array.isArray(e)?{...e}:{},this._configInterval=this.device.config_interval??this.device.collection_interval??this.device.remote_config?.interval??30;const t=this.device.server_sensors;this._customSensors=t&&"object"==typeof t?{...t}:{};try{this._effectiveSettings=await He(this.deviceId)}catch(e){}}catch(e){console.error("Failed to load device:",e)}}async _loadGroups(){try{this._groups=await Ae()}catch(e){console.error("Failed to load groups:",e)}}render(){if(!this.device)return B`<div style="padding: 40px; text-align: center; color: #fff;">Loading...</div>`;const e=this.device,t=this._isGroupMode,i="online"===e.status?"#04d65c":"offline"===e.status?"#ef5350":"#ffb74d";return B`
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
            <span class="status-badge" style="background: ${i}20; color: ${i}">
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
    `}async _addTag(e){e&&(await Pe(this.deviceId,[e]),await this._loadDevice())}async _removeTag(e){await Ne(this.deviceId,e),await this._loadDevice()}_renderGroupPolicy(){const e=Object.values(this._groups),t=this.device.group_policy||"";t&&this._groups[t];return B`
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
    `}async _onGroupPolicyChange(e){const t=e.target.value||null;try{await Ve(this.deviceId,{group_policy:t}),await this._loadDevice()}catch(e){console.error("Failed to update group policy:",e)}}_renderGroupDialog(){return B`
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
    `}async _createGroup(){const e=this._newGroupName.trim();if(!e)return;const t=e.toLowerCase().replace(/[^a-z0-9]+/g,"_");await ze(t,e,[this.deviceId]),this._newGroupName="",this._showGroupDialog=!1,await this._loadGroups(),await this._loadDevice()}async _renameGroup(e){if(!e||!this.groupId)return;const t=this._groups?.[this.groupId];if(t&&t.name!==e)try{await Fe(this.groupId,{...t,name:e}),this._groups={...this._groups,[this.groupId]:{...t,name:e}},this.device={...this.device,device_name:e}}catch(e){console.error("Failed to rename group:",e)}}_renderNetwork(){const e=this.device.network||{};return 0===Object.keys(e).length?B``:B`
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
    `}async _deleteAttribute(e){if(this._isGroupMode){const t=[...this.device.hidden_attributes||[]];return t.includes(e)||t.push(e),this.device={...this.device,hidden_attributes:t},void await this._saveGroupUpdate({hidden_attributes:t})}if(confirm(`Hide attribute "${e}"? Custom sensors will be removed from the client. Built-in attributes will be hidden.`))try{await ye(this.deviceId,e);const t=this.device?.card_attributes||[];if(t.includes(e)){const i=t.filter(t=>t!==e);await Ve(this.deviceId,{card_attributes:i})}await this._loadDevice()}catch(e){console.error("Failed to hide attribute:",e)}}async _unhideAttribute(e){if(this._isGroupMode){const t=(this.device.hidden_attributes||[]).filter(t=>t!==e);return this.device={...this.device,hidden_attributes:t},void await this._saveGroupUpdate({hidden_attributes:t})}try{await we(this.deviceId,e),await this._loadDevice()}catch(e){console.error("Failed to unhide attribute:",e)}}async _toggleHaExposure(e){if(this._isGroupMode)return;const t=void 0!==this._haOverrides[e]?this._haOverrides[e]:void 0!==this._effectiveSettings?.ha_exposure_overrides?.[e]&&this._effectiveSettings.ha_exposure_overrides[e];this._haOverrides={...this._haOverrides,[e]:!t};try{await Ve(this.deviceId,{ha_exposure_overrides:this._haOverrides})}catch(e){console.error("Failed to update HA exposure:",e)}}async _setThreshold(e,t,i){if(this._isGroupMode)return this._setGroupThreshold(e,t,i);const s={...this.device.threshold_overrides||{}};""===t||null==t?delete s[e]:s[e]={op:i||">",value:Number(t)};try{await Ve(this.deviceId,{threshold_overrides:s}),this.device={...this.device,threshold_overrides:s},this._effectiveSettings=await He(this.deviceId)}catch(e){console.error("Failed to set threshold:",e)}}async _setCritThreshold(e,t,i){if(this._isGroupMode)return this._setGroupCritThreshold(e,t,i);const s={...this.device.crit_threshold_overrides||{}};""===t||null==t?delete s[e]:s[e]={op:i||">",value:Number(t)};try{await Ve(this.deviceId,{crit_threshold_overrides:s}),this.device={...this.device,crit_threshold_overrides:s}}catch(e){console.error("Failed to set crit threshold:",e)}}_effectiveTransforms(){if(this._isGroupMode)return this.device?.attribute_transforms||{};const e=this.device?.group_policy,t=e?this._groups[e]:null;return{...t?.attribute_transforms||{},...this.device?.attribute_transforms||{}}}_groupTransforms(){if(this._isGroupMode)return{};const e=this.device?.group_policy,t=e?this._groups[e]:null;return t?.attribute_transforms||{}}async _setAttributeTransform(e,t){if(this._isGroupMode)return this._setGroupTransform(e,t);const i={...this.device?.attribute_transforms||{}};t?i[e]=t:delete i[e];try{await Ve(this.deviceId,{attribute_transforms:i}),this.device={...this.device,attribute_transforms:i}}catch(e){console.error("Failed to update attribute transform:",e)}}async _forceApplyGroup(){if(confirm("This will clear all device-level overrides for every member and enforce the group policy. Devices can still be customized afterwards.\n\nContinue?"))try{await qe(this.groupId),await this._loadGroupAggregate()}catch(e){console.error("Failed to force apply:",e)}}async _saveGroupUpdate(e){const t=this._groups?.[this.groupId];if(t)try{const i={...t,...e};await Fe(this.groupId,i),this._groups={...this._groups,[this.groupId]:i};const s=Object.assign({},this.device,e);this.device=s,this.requestUpdate()}catch(e){console.error("Failed to update group:",e)}}async _setGroupThreshold(e,t,i){const s={...this.device.threshold_overrides||{}};""===t||null==t?delete s[e]:s[e]={op:i||">",value:Number(t)},this.device={...this.device,threshold_overrides:s},await this._saveGroupUpdate({thresholds:s})}async _setGroupCritThreshold(e,t,i){const s={...this.device.crit_threshold_overrides||{}};""===t||null==t?delete s[e]:s[e]={op:i||">",value:Number(t)},this.device={...this.device,crit_threshold_overrides:s},await this._saveGroupUpdate({crit_thresholds:s})}async _setGroupInterval(e){this._configInterval=e,await this._saveGroupUpdate({interval:e})}async _saveGroupCommand({name:e,shell:t}){const i=this._groups?.[this.groupId],s={...i?.custom_commands||{},[e]:t};await this._saveGroupUpdate({custom_commands:s}),this._groups={...this._groups,[this.groupId]:{...i,custom_commands:s}},this.requestUpdate()}async _removeGroupCommand(e){const t=this._groups?.[this.groupId],i={...t?.custom_commands||{}};delete i[e],await this._saveGroupUpdate({custom_commands:i}),this._groups={...this._groups,[this.groupId]:{...t,custom_commands:i}},this.requestUpdate()}async _saveGroupSensor({key:e,sensor:t,oldKey:i}){const s={...this._customSensors};if(i&&i!==e){delete s[i];const e={...this.device.attributes};delete e[i],this.device={...this.device,attributes:e}}s[e]=t,this._customSensors={...s};const o={...this.device.attributes};o[e]={value:"--",unit:t.unit||""},this.device={...this.device,attributes:o},await this._saveGroupUpdate({custom_sensors:s}),this.requestUpdate(),setTimeout(()=>this._refreshGroupAggregate(),5e3)}async _removeGroupSensor(e){const t={...this._customSensors};delete t[e],this._customSensors={...t};const i={...this.device.attributes};delete i[e],this.device={...this.device,attributes:i},await this._saveGroupUpdate({custom_sensors:t}),this.requestUpdate()}async _setGroupTransform(e,t){const i={...this.device?.attribute_transforms||{}};t?i[e]=t:delete i[e],this.device={...this.device,attribute_transforms:i},await this._saveGroupUpdate({attribute_transforms:i})}async _toggleCardAttribute({name:e,pinned:t}){const i=[...this.device?.card_attributes||[]];let s;if(s=t?[...i,e]:i.filter(t=>t!==e),this._isGroupMode)return this.device={...this.device,card_attributes:s},void await this._saveGroupUpdate({card_attributes:s});try{await Ve(this.deviceId,{card_attributes:s}),this.device={...this.device,card_attributes:s}}catch(e){console.error("Failed to update card attributes:",e)}}async _sendCmd(e,t={}){if(!this._isGroupMode)try{this.commandResult=`Sending ${e}...`;const i=(await Te(this.deviceId,e,t)).request_id;this.commandResult=`Sent ${e}... waiting for response`;const s=Date.now(),o=()=>{const e=(this.device?.command_history||[]).find(e=>e.request_id===i);e?this.commandResult=`${e.status}: ${e.output||"(no output)"}`:Date.now()-s<1e4?setTimeout(o,500):this.commandResult="Command sent (no response received)"};setTimeout(o,500)}catch(e){this.commandResult=`Error: ${e.message}`}}async _hideCommand(e){if(this._isGroupMode){const t=[...this.device.hidden_commands||[]];return t.includes(e)||t.push(e),this.device={...this.device,hidden_commands:t},void await this._saveGroupUpdate({hidden_commands:t})}try{await $e(this.deviceId,e),await this._loadDevice()}catch(e){console.error("Failed to hide command:",e)}}async _unhideCommand(e){if(this._isGroupMode){const t=(this.device.hidden_commands||[]).filter(t=>t!==e);return this.device={...this.device,hidden_commands:t},void await this._saveGroupUpdate({hidden_commands:t})}try{await ke(this.deviceId,e),await this._loadDevice()}catch(e){console.error("Failed to unhide command:",e)}}async _saveServerCommand({name:e,shell:t}){const{addServerCommand:i}=await Promise.resolve().then(function(){return We});await i(this.deviceId,e,t),await this._loadDevice()}async _removeServerCommand(e){const{removeServerCommand:t}=await Promise.resolve().then(function(){return We});await t(this.deviceId,e),await this._loadDevice()}async _saveSensor({key:e,sensor:t,oldKey:i}){const{addServerSensor:s,removeServerSensor:o}=await Promise.resolve().then(function(){return We});i&&i!==e&&await o(this.deviceId,i),await s(this.deviceId,e,t),await this._loadDevice()}async _removeSensor(e){const{removeServerSensor:t}=await Promise.resolve().then(function(){return We});await t(this.deviceId,e),await this._loadDevice()}async _onIntervalChange(e){const{setDeviceInterval:t}=await Promise.resolve().then(function(){return We});await t(this.deviceId,e),await this._loadDevice()}async _deleteDevice(){if(confirm(`Delete device "${this.device?.device_name||this.deviceId}"? This removes it from the registry. It will reappear if the client agent is still running.`))try{await xe(this.deviceId),this.dispatchEvent(new CustomEvent("back"))}catch(e){console.error("Failed to delete device:",e)}}}customElements.define("device-detail",on);class nn extends le{static properties={_open:{type:Boolean,state:!0},_type:{type:String,state:!0},_title:{type:String,state:!0},_message:{type:String,state:!0},_placeholder:{type:String,state:!0},_confirmLabel:{type:String,state:!0},_confirmDanger:{type:Boolean,state:!0},_inputValue:{type:String,state:!0}};static styles=[ce,n`
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
  `];constructor(){super(),this._open=!1,this._type="confirm",this._title="",this._message="",this._placeholder="",this._confirmLabel="",this._confirmDanger=!1,this._inputValue="",this._resolve=null}show({type:e="confirm",title:t="",message:i="",placeholder:s="",defaultValue:o="",confirmLabel:n="",confirmDanger:r=!1}={}){return this._type=e,this._title=t,this._message=i,this._placeholder=s,this._confirmLabel=n||("prompt"===e?"Submit":"Confirm"),this._confirmDanger=r,this._inputValue=o,this._open=!0,new Promise(e=>{this._resolve=e})}_cancel(){this._open=!1,this._resolve&&(this._resolve("prompt"===this._type&&null),this._resolve=null)}_confirm(){this._open=!1,this._resolve&&(this._resolve("prompt"!==this._type||this._inputValue),this._resolve=null)}_onKeyDown(e){"Enter"===e.key&&(e.preventDefault(),this._confirm())}_onInput(e){this._inputValue=e.target.value}updated(e){e.has("_open")&&this._open&&"prompt"===this._type&&this.updateComplete.then(()=>{const e=this.renderRoot.querySelector(".dialog-input");e&&e.focus()})}render(){if(!this._open)return B``;const e=this._confirmDanger?"btn btn-confirm danger":"btn btn-confirm";return B`
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
    `}}customElements.define("themed-dialog",nn);const rn={online:"#04d65c",offline:"#ef5350",warning:"#ffb74d",inferred:"#00D4FF",unknown:"#666"};class an extends le{static properties={topology:{type:Object},layouts:{type:Object},selectedLayout:{type:String},editMode:{type:Boolean},linkMode:{type:Boolean},selectedNode:{type:String},nodePositions:{type:Object},manualEdges:{type:Array},_dragging:{type:String,state:!0},_linkSource:{type:String,state:!0},_error:{type:String,state:!0},_loading:{type:Boolean,state:!0},_selectedEdge:{type:Number,state:!0},_selectedDeviceData:{type:Object,state:!0},_dirty:{type:Boolean,state:!0},_layoutDropdownOpen:{type:Boolean,state:!0},_showLabelDialog:{type:Boolean,state:!0},_labelEdgeIndex:{type:Number,state:!0},hideAutoEdges:{type:Boolean},_viewBox:{type:Object,state:!0}};static styles=[ce,n`
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
  `];constructor(){super(),this.topology={nodes:[],edges:[]},this.layouts={},this.selectedLayout="",this.editMode=!1,this.linkMode=!1,this.selectedNode=null,this.nodePositions={},this.manualEdges=[],this._dragging=null,this._dragOffset={x:0,y:0},this._linkSource=null,this._error="",this._loading=!0,this._selectedEdge=-1,this._selectedDeviceData=null,this._commandResult="",this._dirty=!1,this._layoutDropdownOpen=!1,this._showLabelDialog=!1,this._labelEdgeIndex=-1,this._savedPositions=null,this._savedManualEdges=null,this.hideAutoEdges=!1,this._viewBox={x:0,y:0,width:900,height:500},this._isPanning=!1,this._panStart=null,this._pinchActive=!1,this._pinchAnchor0=null,this._pinchAnchor1=null,this._pinchPrevDist=0}connectedCallback(){super.connectedCallback(),this._loadTopology(),this._loadLayouts(),this._wsUnsub=ue.onMessage(e=>{"device_update"===e.type&&this._refreshNodeStatuses()}),this._onDocClick=e=>{if(this._layoutDropdownOpen){const t=this.shadowRoot?.querySelector(".layout-dropdown");t&&!e.composedPath().includes(t)&&(this._layoutDropdownOpen=!1)}},document.addEventListener("click",this._onDocClick)}disconnectedCallback(){super.disconnectedCallback(),this._wsUnsub&&this._wsUnsub(),this._onDocClick&&document.removeEventListener("click",this._onDocClick)}async _refreshNodeStatuses(){try{const e=await Se();if(!e||!e.nodes)return;const t={};for(const i of e.nodes)t[i.id]=i.status;if(this.topology&&this.topology.nodes){let i=!1;const s=this.topology.nodes.map(e=>t[e.id]&&t[e.id]!==e.status?(i=!0,{...e,status:t[e.id]}):e);for(const t of e.nodes)this.topology.nodes.find(e=>e.id===t.id)||(s.push(t),i=!0);i&&(this.topology={...this.topology,nodes:s})}}catch(e){}}async _loadTopology(){try{this._loading=!0,this._error="";const e=await Se();this.topology=e,this._autoLayout(),this._loading=!1}catch(e){console.error("Failed to load topology:",e),this._error=`Failed to load: ${e.message}`,this._loading=!1}}async _loadLayouts(){try{if(this.layouts=await Ce(),!this._layoutsLoaded){this._layoutsLoaded=!0;const e=Object.entries(this.layouts).find(([,e])=>e.isDefault);e&&(this.selectedLayout=e[0],this.nodePositions=e[1].positions||{},this.manualEdges=e[1].manualEdges||[],this.hideAutoEdges=e[1].hideAutoEdges||!1,e[1].viewBox&&(this._viewBox={...e[1].viewBox}))}}catch(e){console.error("Failed to load layouts:",e)}}_autoLayout(){const e=this.topology.nodes;if(!e.length)return;const t={...this.selectedLayout&&this.layouts[this.selectedLayout]&&this.layouts[this.selectedLayout].positions||{}},i=Math.ceil(Math.sqrt(e.length));e.forEach((e,s)=>{if(!t[e.id]){const o=s%i,n=Math.floor(s/i);t[e.id]={x:100+o*(800/(i+1)),y:80+100*n}}}),this.nodePositions=t,this.selectedLayout&&this.layouts[this.selectedLayout]&&(this.manualEdges=this.layouts[this.selectedLayout].manualEdges||[]),this._fitAll()}get _allEdges(){const e=this.hideAutoEdges?[]:this.topology.edges||[],t=this.manualEdges.map(e=>({...e,type:"manual"}));return[...e,...t]}_getNodeName(e){const t=this.topology.nodes.find(t=>t.id===e);return t&&t.name||e}render(){if(this._loading&&!this.topology.nodes.length)return B`<div style="padding: 40px; text-align: center; color: #fff;">Loading topology...</div>`;if(this._error)return B`<div style="padding: 40px; text-align: center; color: #ef5350;">${this._error}</div>`;const e=this.topology.nodes,t=this._allEdges,i=e.filter(e=>"online"===e.status).length,s=e.filter(e=>"offline"===e.status).length,o=e.filter(e=>"warning"===e.status).length;return B`
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
          <span class="status-pill online">${i}</span>
          <span class="status-pill offline">${s}</span>
          <span class="status-pill warning">${o}</span>
        </div>
      </div>

      ${this.selectedNode&&!this.linkMode?this._renderDetailPanel():""}
      ${this.editMode&&this.manualEdges.length>0?this._renderManualEdgesList():""}
      ${this._showLabelDialog?this._renderLabelDialog():""}
      <themed-dialog></themed-dialog>
    `}_renderNode(e){const t=this.nodePositions[e.id]||{x:100,y:100},i=rn[e.status]||rn.unknown,s=this.selectedNode===e.id,o=this._linkSource===e.id,n=s||o?2.5:1.5,r=s?"4,2":o?"2,2":"none",a=o?"#ffb74d":i;return"gateway"===e.type?H`
        <g transform="translate(${t.x}, ${t.y})"
          @click=${t=>this._onNodeClick(t,e.id)}
          @mousedown=${t=>this.editMode&&!this.linkMode&&this._onMouseDown(t,e.id)}
          @touchstart=${t=>this.editMode&&!this.linkMode&&this._onTouchNodeStart(t,e.id)}
          style="cursor:pointer">
          <circle r="22" fill="#1a1a2e" stroke="${a}" stroke-width="${n}"
            stroke-dasharray="${r}"/>
          <text text-anchor="middle" dy="4" fill="${a}" font-size="10">${e.name.substring(0,12)}</text>
        </g>
      `:H`
      <g transform="translate(${t.x}, ${t.y})"
        @click=${t=>this._onNodeClick(t,e.id)}
        @mousedown=${t=>this.editMode&&!this.linkMode&&this._onMouseDown(t,e.id)}
        @touchstart=${t=>this.editMode&&!this.linkMode&&this._onTouchNodeStart(t,e.id)}
        style="cursor:pointer">
        <rect x="-45" y="-18" width="90" height="36" rx="6"
          fill="#1a1a2e" stroke="${a}" stroke-width="${n}"
          stroke-dasharray="${r}"/>
        <text text-anchor="middle" dy="-3" fill="${a}" font-size="10">
          ${(e.name||e.id).substring(0,12)}
        </text>
        <text text-anchor="middle" dy="10" fill="#666" font-size="8">${e.status}</text>
      </g>
    `}_edgeGeometry(e){const t=this.nodePositions[e.source],i=this.nodePositions[e.target];if(!t||!i)return null;const s=i.x-t.x,o=i.y-t.y,n=Math.sqrt(s*s+o*o)||1,r=s/n,a=o/n;let l=-a,d=r;d>0&&(l=-l,d=-d);const c=this._boxExitDistance(r,a);return{from:t,to:i,ux:r,uy:a,perpX:l,perpY:d,len:n,srcDist:c+8,tgtDist:c+8}}_boxExitDistance(e,t){if(Math.abs(e)<.001)return 22;if(Math.abs(t)<.001)return 48;const i=48/Math.abs(e),s=22/Math.abs(t);return Math.min(i,s)}_renderEdgeLine(e,t){const i=this._edgeGeometry(e);if(!i)return H``;const s="manual"===e.type,o=s?"#00D4FF":"#555",n=s&&this._selectedEdge===t-(this.topology.edges?.length||0)?2.5:1.5,r=s?"none":"4,2";return H`
      <line x1="${i.from.x}" y1="${i.from.y}" x2="${i.to.x}" y2="${i.to.y}"
        stroke="${o}" stroke-width="${n}"
        stroke-dasharray="${r}"
        @click=${s&&this.editMode?()=>this._selectEdge(t-(this.topology.edges?.length||0)):null}
        style="${s&&this.editMode?"cursor:pointer":""}"/>
    `}_renderEdgeLabels(e,t){if(!e.label&&!e.sourceLabel&&!e.targetLabel)return H``;const i=this._edgeGeometry(e);if(!i)return H``;const{from:s,to:o,ux:n,uy:r,perpX:a,perpY:l,srcDist:d,tgtDist:c}=i,u=s.x+n*d,p=s.y+r*d,h=o.x-n*c,g=o.y-r*c,f=(s.x+o.x)/2+14*a,m=(s.y+o.y)/2+14*l;return H`
      ${e.label?H`
        <rect x="${f-3*e.label.length-3}" y="${m-9}"
          width="${6*e.label.length+6}" height="13" rx="2" fill="#0d0d1f" opacity="0.9"/>
        <text x="${f}" y="${m}" text-anchor="middle"
          fill="#888" font-size="9" style="pointer-events:none">${e.label}</text>
      `:H``}
      ${e.sourceLabel?H`
        <rect x="${u-2.5*e.sourceLabel.length-3}" y="${p-8}"
          width="${5*e.sourceLabel.length+6}" height="12" rx="2" fill="#0d0d1f" opacity="0.9"/>
        <text x="${u}" y="${p}" text-anchor="middle"
          fill="#00D4FF" font-size="8" style="pointer-events:none">${e.sourceLabel}</text>
      `:H``}
      ${e.targetLabel?H`
        <rect x="${h-2.5*e.targetLabel.length-3}" y="${g-8}"
          width="${5*e.targetLabel.length+6}" height="12" rx="2" fill="#0d0d1f" opacity="0.9"/>
        <text x="${h}" y="${g}" text-anchor="middle"
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
    `}_renderLabelDialog(){const e=this.manualEdges[this._labelEdgeIndex];if(!e)return B``;const t=this._getNodeName(e.source),i=this._getNodeName(e.target);return B`
      <div class="save-overlay" @click=${this._cancelLabelDialog}>
        <div class="label-dialog" @click=${e=>e.stopPropagation()}>
          <h3>Link Labels</h3>
          <div class="subtitle">${t} &#8594; ${i}</div>

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
            <label>Target Interface (${i})</label>
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
    `}_onNodeClick(e,t){e.stopPropagation(),this.linkMode?this._handleLinkClick(t):this._selectNode(t)}_handleLinkClick(e){if(this._linkSource)if(this._linkSource===e)this._linkSource=null;else{const t=this.manualEdges.some(t=>t.source===this._linkSource&&t.target===e||t.source===e&&t.target===this._linkSource);t||(this.manualEdges=[...this.manualEdges,{source:this._linkSource,target:e,sourceLabel:"",label:"",targetLabel:""}],this._markDirty(),this._labelEdgeIndex=this.manualEdges.length-1,this._showLabelDialog=!0),this._linkSource=null}else this._linkSource=e}_enterEditMode(){this.editMode=!0,this._savedPositions=JSON.stringify(this.nodePositions),this._savedManualEdges=JSON.stringify(this.manualEdges),this._dirty=!1}_exitEditMode(){this.editMode=!1,this.linkMode=!1,this._linkSource=null,this._selectedEdge=-1,this._dirty=!1}_markDirty(){this.editMode&&(this._dirty=!0)}async _doneEditing(){if(this.selectedLayout)await this._saveToCurrentLayout(),this._exitEditMode();else{const e=this.shadowRoot.querySelector("themed-dialog"),t=await e.show({type:"prompt",title:"Save Layout",message:"Enter a name for this layout:",placeholder:"My Layout"});if(!t)return;await this._saveNewLayout(t),this._exitEditMode()}}_discardAndExit(){this._savedPositions&&(this.nodePositions=JSON.parse(this._savedPositions)),this._savedManualEdges&&(this.manualEdges=JSON.parse(this._savedManualEdges)),this._exitEditMode()}async _saveAsLayout(){const e=this.shadowRoot.querySelector("themed-dialog"),t=await e.show({type:"prompt",title:"Save As New Layout",message:"Enter a name for the new layout:",placeholder:"Layout copy"});t&&await this._saveNewLayout(t)}async _saveToCurrentLayout(){if(!this.selectedLayout||!this.layouts[this.selectedLayout])return;const e=this.layouts[this.selectedLayout];await Ee({id:this.selectedLayout,name:e.name,positions:this.nodePositions,manualEdges:this.manualEdges,hideAutoEdges:this.hideAutoEdges,viewBox:this._viewBox,isDefault:e.isDefault||!1}),await this._loadLayouts(),this._dirty=!1,this._savedPositions=JSON.stringify(this.nodePositions),this._savedManualEdges=JSON.stringify(this.manualEdges)}async _saveNewLayout(e){const t=await Ee({name:e,positions:this.nodePositions,manualEdges:this.manualEdges,hideAutoEdges:this.hideAutoEdges,viewBox:this._viewBox,isDefault:!1});this.selectedLayout=t.id,await this._loadLayouts(),this._dirty=!1,this._savedPositions=JSON.stringify(this.nodePositions),this._savedManualEdges=JSON.stringify(this.manualEdges)}_selectLayout(e){if(this._layoutDropdownOpen=!1,this.selectedLayout=e,e&&this.layouts[e]){const t=this.layouts[e];this.nodePositions=t.positions||{},this.manualEdges=t.manualEdges||[],this.hideAutoEdges=t.hideAutoEdges||!1,t.viewBox?this._viewBox=this._adaptViewBox(t.viewBox):this._fitAll()}else this.nodePositions={},this.manualEdges=[],this.hideAutoEdges=!1,this._autoLayout()}_createNewLayout(){this._layoutDropdownOpen=!1,this.selectedLayout="",this.nodePositions={},this.manualEdges=[],this.hideAutoEdges=!1,this._autoLayout(),this._enterEditMode()}_toggleLinkMode(){this.linkMode=!this.linkMode,this._linkSource=null,this.linkMode&&(this.selectedNode=null)}async _selectNode(e){if(this.selectedNode===e)return this.selectedNode=null,this._selectedDeviceData=null,void(this._commandResult="");this.selectedNode=e,this._selectedDeviceData=null,this._commandResult="";try{this._selectedDeviceData=await fetchDevice(e)}catch(e){this._selectedDeviceData={status:"inferred",attributes:{},tags:[]}}}async _sendCmd(e){if(this.selectedNode)try{this._commandResult=`Sending ${e}...`;const t=await sendCommand(this.selectedNode,e);this._commandResult=`Sent (request: ${t.request_id})`}catch(e){this._commandResult=`Error: ${e.message}`}}_selectEdge(e){this._selectedEdge=this._selectedEdge===e?-1:e}_labelEdge(e){this._labelEdgeIndex=e,this._showLabelDialog=!0}_saveLabelDialog(){const e=this.shadowRoot.querySelector(".label-dialog"),t=e.querySelector("#source-label").value,i=e.querySelector("#link-label").value,s=e.querySelector("#target-label").value,o=[...this.manualEdges];o[this._labelEdgeIndex]={...o[this._labelEdgeIndex],sourceLabel:t,label:i,targetLabel:s},this.manualEdges=o,this._markDirty(),this._showLabelDialog=!1,this._labelEdgeIndex=-1}_cancelLabelDialog(){this._showLabelDialog=!1,this._labelEdgeIndex=-1}_removeEdge(e){this.manualEdges=this.manualEdges.filter((t,i)=>i!==e),this._selectedEdge=-1,this._markDirty()}_onSvgMouseDown(e){if(!e.target.closest("g[transform]")){if(e.preventDefault(),this.linkMode)return this.linkMode=!1,this._linkSource=null,void(this._mousePos=null);this._isMousePanning=!0,this._mousePanStart={x:e.clientX,y:e.clientY},this._mousePanViewBox={...this._viewBox}}}_onMouseDown(e,t){this._dragging=t;const i=this.shadowRoot.querySelector("svg"),s=i.createSVGPoint();s.x=e.clientX,s.y=e.clientY;const o=s.matrixTransform(i.getScreenCTM().inverse()),n=this.nodePositions[t]||{x:0,y:0};this._dragOffset={x:o.x-n.x,y:o.y-n.y},e.preventDefault(),e.stopPropagation()}_onMouseMove(e){const t=this.shadowRoot.querySelector("svg"),i=t.createSVGPoint();i.x=e.clientX,i.y=e.clientY;const s=i.matrixTransform(t.getScreenCTM().inverse());if(this.linkMode&&this._linkSource&&(this._mousePos={x:s.x,y:s.y},this.requestUpdate()),this._isMousePanning){const i=t.getScreenCTM(),s=(e.clientX-this._mousePanStart.x)/i.a,o=(e.clientY-this._mousePanStart.y)/i.d;return void(this._viewBox={...this._mousePanViewBox,x:this._mousePanViewBox.x-s,y:this._mousePanViewBox.y-o})}this._dragging&&(this.nodePositions={...this.nodePositions,[this._dragging]:{x:s.x-this._dragOffset.x,y:s.y-this._dragOffset.y}})}_onWheel(e){if(!e.ctrlKey)return;e.preventDefault();const t=e.deltaY>0?1.1:.9;this._zoomAt(e.clientX,e.clientY,t)}_zoomAt(e,t,i){const s=this.shadowRoot.querySelector("svg");if(!s)return;const o=s.createSVGPoint();o.x=e,o.y=t;const n=o.matrixTransform(s.getScreenCTM().inverse()),r={...this._viewBox},a=Math.max(300,Math.min(2700,r.width*i)),l=Math.max(167,Math.min(1500,r.height*i)),d=a/r.width,c=l/r.height;r.x=n.x-(n.x-r.x)*d,r.y=n.y-(n.y-r.y)*c,r.width=a,r.height=l,this._viewBox=r}_zoomIn(){const e=this.shadowRoot.querySelector("svg")?.getBoundingClientRect();e&&this._zoomAt(e.left+e.width/2,e.top+e.height/2,.8)}_zoomOut(){const e=this.shadowRoot.querySelector("svg")?.getBoundingClientRect();e&&this._zoomAt(e.left+e.width/2,e.top+e.height/2,1.25)}_adaptViewBox(e){const t=this.shadowRoot?.querySelector(".canvas-container");if(!t||!t.clientWidth||!t.clientHeight)return{...e};const i=t.clientWidth/t.clientHeight,s=e.x+e.width/2,o=e.y+e.height/2,n=e.width*e.height,r=Math.sqrt(n*i),a=r/i;return{x:s-r/2,y:o-a/2,width:r,height:a}}_fitAll(){const e=Object.values(this.nodePositions);if(!e.length)return;const t=e.map(e=>e.x),i=e.map(e=>e.y),s=Math.min(...t)-80,o=Math.min(...i)-80,n=Math.max(...t)-Math.min(...t)+160,r=Math.max(...i)-Math.min(...i)+160,a=this.shadowRoot?.querySelector(".canvas-container");if(a&&a.clientWidth&&a.clientHeight){const e=a.clientWidth/a.clientHeight;let t=n,i=r;n/r<e?t=r*e:i=n/e,this._viewBox={x:s-(t-n)/2,y:o-(i-r)/2,width:t,height:i}}else this._viewBox={x:s,y:o,width:n,height:r}}_clientToSvg(e,t){const i=this.shadowRoot.querySelector("svg");if(!i)return null;const s=i.createSVGPoint();return s.x=e,s.y=t,s.matrixTransform(i.getScreenCTM().inverse())}_onTouchStart(e){if(2===e.touches.length){e.preventDefault();const t=e.touches[0].clientX-e.touches[1].clientX,i=e.touches[0].clientY-e.touches[1].clientY;return this._pinchPrevDist=Math.sqrt(t*t+i*i),this._pinchActive=!0,this._pinchAnchor0=this._clientToSvg(e.touches[0].clientX,e.touches[0].clientY),this._pinchAnchor1=this._clientToSvg(e.touches[1].clientX,e.touches[1].clientY),this._isPanning=!1,void(this._panStart=null)}if(1===e.touches.length){if(this.linkMode&&!e.target.closest("g[transform]"))return this.linkMode=!1,this._linkSource=null,void(this._mousePos=null);const t=e.touches[0];this._isPanning=!0,this._panStart={x:t.clientX,y:t.clientY,vbX:this._viewBox.x,vbY:this._viewBox.y}}}_onTouchMove(e){if(2===e.touches.length&&this._pinchActive){if(e.preventDefault(),!this._pinchAnchor0||!this._pinchAnchor1)return;const t=e.touches[0].clientX-e.touches[1].clientX,i=e.touches[0].clientY-e.touches[1].clientY,s=Math.sqrt(t*t+i*i);if(!this._pinchPrevDist||0===s)return void(this._pinchPrevDist=s);const o=this._pinchPrevDist/s,n=(this._pinchAnchor0.x+this._pinchAnchor1.x)/2,r=(this._pinchAnchor0.y+this._pinchAnchor1.y)/2,a=this._viewBox,l=Math.max(300,Math.min(2700,a.width*o)),d=l/a.width,c=Math.max(167,Math.min(1500,a.height*d));let u=n-(n-a.x)*d,p=r-(r-a.y)*(c/a.height);const h=this.shadowRoot.querySelector("svg");if(h){const t=h.getBoundingClientRect();if(t.width>0&&t.height>0){const i=(e.touches[0].clientX+e.touches[1].clientX)/2,s=(e.touches[0].clientY+e.touches[1].clientY)/2;u=n-(i-t.left)*(l/t.width),p=r-(s-t.top)*(c/t.height)}}if(this._viewBox={x:u,y:p,width:l,height:c},h){const t=h.getBoundingClientRect();if(t.width>0&&t.height>0){const i=e=>u+(e-t.left)*(l/t.width),s=e=>p+(e-t.top)*(c/t.height);this._pinchAnchor0={x:i(e.touches[0].clientX),y:s(e.touches[0].clientY)},this._pinchAnchor1={x:i(e.touches[1].clientX),y:s(e.touches[1].clientY)}}}return void(this._pinchPrevDist=s)}if(1===e.touches.length&&this._dragging){e.preventDefault();const t=e.touches[0],i=this._clientToSvg(t.clientX,t.clientY);if(!i)return;return void(this.nodePositions={...this.nodePositions,[this._dragging]:{x:i.x-this._dragOffset.x,y:i.y-this._dragOffset.y}})}if(1===e.touches.length&&this._isPanning&&this._panStart){const t=e.touches[0],i=this.shadowRoot.querySelector("svg");if(!i)return;const s=i.getScreenCTM(),o=(t.clientX-this._panStart.x)/s.a,n=(t.clientY-this._panStart.y)/s.d;this._viewBox={...this._viewBox,x:this._panStart.vbX-o,y:this._panStart.vbY-n}}}_onTouchEnd(e){if(e.touches.length<2&&(this._pinchActive=!1,this._pinchPrevDist=0,this._pinchAnchor0=null,this._pinchAnchor1=null,1===e.touches.length&&!this._dragging)){const t=e.touches[0];this._isPanning=!0,this._panStart={x:t.clientX,y:t.clientY,vbX:this._viewBox.x,vbY:this._viewBox.y}}0===e.touches.length&&(this._dragging&&this._markDirty(),this._dragging=null,this._isPanning=!1,this._panStart=null)}_onTouchNodeStart(e,t){if(1!==e.touches.length)return;e.stopPropagation(),this._isPanning=!1;const i=e.touches[0],s=this._clientToSvg(i.clientX,i.clientY);if(!s)return;const o=this.nodePositions[t]||{x:0,y:0};this._dragOffset={x:s.x-o.x,y:s.y-o.y},this._dragging=t}_onMouseUp(){this._dragging&&this._markDirty(),this._dragging=null,this._isMousePanning=!1}async _setAsDefault(){if(!this.selectedLayout)return;for(const[e,t]of Object.entries(this.layouts))t.isDefault&&(t.isDefault=!1,await Ee(t));const e=this.layouts[this.selectedLayout];e&&(e.isDefault=!0,await Ee(e)),await this._loadLayouts(),this._layoutsLoaded=!0}async _deleteCurrentLayout(){if(!this.selectedLayout)return;const e=this.layouts[this.selectedLayout]?.name||this.selectedLayout,t=this.shadowRoot.querySelector("themed-dialog");await t.show({type:"confirm",title:"Delete Layout",message:`Delete "${e}"? This cannot be undone.`,confirmLabel:"Delete",confirmDanger:!0})&&(await De(this.selectedLayout),this.selectedLayout="",this.nodePositions={},this.manualEdges=[],this.hideAutoEdges=!1,this._dirty=!1,await this._loadLayouts(),this._autoLayout())}}customElements.define("topology-view",an);const ln={online:"#04d65c",offline:"#ef5350",warning:"#ffb74d",critical:"#ef5350",unknown:"#666"};class dn extends le{static properties={device:{type:Object},deviceId:{type:String}};static styles=[ce,n`
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
  `];render(){if(!this.device)return B``;const e=this.device,t=ln[e.status]||ln.unknown,i=Object.entries(e.attributes||{}),s=e.hidden_attributes||[],o=e.card_attributes||[];let n;n=o.length>0?o.map(e=>i.find(([t])=>t===e)).filter(Boolean):i.filter(([e])=>!s.includes(e)).slice(0,4);const r=e.attribute_transforms||{},a=[...e.tags||[],...e.server_tags||[]],l=e.device_name||this.deviceId;return this.style.setProperty("--status-color",t),this.setAttribute("role","button"),this.setAttribute("tabindex","0"),this.setAttribute("aria-label",`${l}, ${e.status||"unknown"}`),B`
      <div class="header">
        <span class="name">${l}</span>
        <span class="status" style="background: ${t}20; color: ${t}">
          ${"online"===e.status||"offline"===e.status?"● ":(e.status,"⚠ ")}${e.status}
        </span>
      </div>
      <div class="type">${e.device_type||"unknown"}</div>
      ${n.length>0?B`
        <div class="attrs">
          ${n.map(([e,t])=>{const i=r[e],s=i?pe(t.value,i):`${t.value}${t.unit||""}`;return B`
              <div class="attr">
                ${e.replace(/_/g," ")}: <span class="attr-value ${this._isWarning(e,t)?"warning":""}">${s}</span>
              </div>
            `})}
        </div>
      `:""}
      ${a.length>0?B`
        <div class="tags">
          ${a.map((e,t)=>B`${t>0?B`<span class="tag-sep">·</span>`:""}<span class="tag">${e}</span>`)}
        </div>
      `:""}
    `}_isWarning(e,t){const i={cpu_usage:90,memory_usage:90,disk_usage:95,cpu_temp:80};return i[e]&&t.value>i[e]}}customElements.define("device-card",dn);class cn extends le{static properties={devices:{type:Object},filter:{type:String},selectedTags:{type:Array},viewMode:{type:String},_groups:{type:Object,state:!0},_collapsedGroups:{type:Object,state:!0},_selectedUngrouped:{type:Array,state:!0},_selectedGrouped:{type:Object,state:!0}};static styles=[ce,n`
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
  `];constructor(){super(),this.devices={},this.filter="all",this.selectedTags=[],this.viewMode="all",this._groups={},this._collapsedGroups={},this._selectedUngrouped=[],this._selectedGrouped={},this._wsUnsub=null,this._lastFetchTime=0}connectedCallback(){super.connectedCallback(),this._loadDevices(),this._loadGroups(),this._wsUnsub=ue.onMessage(e=>{"device_update"===e.type&&(this.devices={...this.devices,[e.device_id]:e.device},this.requestUpdate())})}disconnectedCallback(){super.disconnectedCallback(),this._wsUnsub&&this._wsUnsub()}async _loadDevices(){try{const e=await ve(this._lastFetchTime);e&&Object.keys(e).length>0?this.devices={...this.devices,...e}:0===this._lastFetchTime&&(this.devices=e||{}),this._lastFetchTime=Date.now()/1e3}catch(e){console.error("Failed to load devices:",e)}}async _loadGroups(){try{this._groups=await Ae()}catch(e){console.error("Failed to load groups:",e)}}get _filteredDevices(){let e=Object.entries(this.devices);return"all"!==this.filter&&(e="warning"===this.filter?e.filter(([,e])=>"warning"===e.status||"critical"===e.status):e.filter(([,e])=>e.status===this.filter)),this.selectedTags.length>0&&(e=e.filter(([,e])=>{const t=[...e.tags||[],...e.server_tags||[]];return this.selectedTags.some(e=>t.includes(e))})),e}get _counts(){const e=Object.values(this.devices);return{all:e.length,online:e.filter(e=>"online"===e.status).length,offline:e.filter(e=>"offline"===e.status).length,warning:e.filter(e=>"warning"===e.status||"critical"===e.status).length}}_onTagAdd(e){const t=e.detail.tag;this.selectedTags.includes(t)||(this.selectedTags=[...this.selectedTags,t])}_onTagRemove(e){this.selectedTags=this.selectedTags.filter(t=>t!==e.detail.tag)}render(){const e=this._counts;return B`
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
    `}_renderByGroup(){const e=this._filteredDevices,t=Object.values(this._groups),i={},s=new Set;t.forEach(t=>{const o=e.filter(([e])=>(t.device_ids||[]).includes(e));i[t.id]=o,o.forEach(([e])=>s.add(e))});const o=e.filter(([e])=>!s.has(e));return B`
      ${t.map(e=>this._renderGroupSection(e,i[e.id]||[]))}
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
    `}_renderGroupSection(e,t){const i=!!this._collapsedGroups[e.id],s=Object.entries(this.devices).filter(([t])=>(e.device_ids||[]).includes(t)).map(([,e])=>e),o=s.filter(e=>"online"===e.status).length,n=s.length;return B`
      <div class="group-section">
        <div class="group-section-header"
          @click=${()=>this._toggleGroupCollapse(e.id)}>
          <span class="group-chevron ${i?"":"open"}">&#9658;</span>
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
        ${i?"":B`
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
                  ${t.map(([t,i])=>B`
                    <device-card .device=${i} .deviceId=${t}
                      class="${(this._selectedGrouped[e.id]||[]).includes(t)?"selected":""}"
                      @click=${i=>{i.ctrlKey||i.metaKey?(i.preventDefault(),this._toggleGroupedSelection(e.id,t)):this._selectDevice(t)}}></device-card>
                  `)}
                </div>
              `}
          </div>
        `}
      </div>
    `}_toggleGroupCollapse(e){this._collapsedGroups={...this._collapsedGroups,[e]:!this._collapsedGroups[e]}}_selectDevice(e){this.dispatchEvent(new CustomEvent("device-select",{detail:{deviceId:e},bubbles:!0,composed:!0}))}_editGroupPolicy(e){this.dispatchEvent(new CustomEvent("group-edit",{detail:{groupId:e},bubbles:!0,composed:!0}))}_toggleUngroupedSelection(e){this._selectedUngrouped.includes(e)?this._selectedUngrouped=this._selectedUngrouped.filter(t=>t!==e):this._selectedUngrouped=[...this._selectedUngrouped,e]}async _createNewGroupFromSelected(){const e=prompt("Enter group name:");if(!e)return;const t=e.toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_|_$/g,"");try{await ze(t,e,this._selectedUngrouped),this._selectedUngrouped=[],this._loadGroups()}catch(e){console.error("Failed to create group:",e)}}async _deleteGroup(e,t){if(confirm(`Delete group "${t}"? Devices will be ungrouped.`))try{await Me(e),this._loadGroups()}catch(e){console.error("Failed to delete group:",e)}}_toggleGroupedSelection(e,t){const i=this._selectedGrouped[e]||[],s=i.includes(t)?i.filter(e=>e!==t):[...i,t];this._selectedGrouped={...this._selectedGrouped,[e]:s}}async _removeSelectedFromGroup(e){const t=this._groups[e];if(!t)return;const i=this._selectedGrouped[e]||[],s=(t.device_ids||[]).filter(e=>!i.includes(e));try{await Fe(e,{...t,device_ids:s}),this._selectedGrouped={...this._selectedGrouped,[e]:[]},this._loadGroups()}catch(e){console.error("Failed to remove devices from group:",e)}}async _addSelectedToGroup(){const e=this.shadowRoot.querySelector("#group-assign-select");if(!e)return;const t=e.value,i=this._groups[t];if(!i)return;const s=[...new Set([...i.device_ids||[],...this._selectedUngrouped])];try{await Fe(t,{...i,device_ids:s}),this._selectedUngrouped=[],this._loadGroups()}catch(e){console.error("Failed to add devices to group:",e)}}}customElements.define("dashboard-view",cn);class un extends le{static properties={_tags:{type:Array,state:!0},_loading:{type:Boolean,state:!0},_newTagName:{type:String,state:!0},_renamingTag:{type:String,state:!0},_renameValue:{type:String,state:!0},_selectedTags:{type:Object,state:!0}};static styles=[ce,n`
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
  `];constructor(){super(),this._tags=[],this._loading=!0,this._newTagName="",this._renamingTag=null,this._renameValue="",this._selectedTags=new Set}connectedCallback(){super.connectedCallback(),this._loadTags()}async _loadTags(){this._loading=!0;try{const e=await Oe().catch(()=>[]);this._tags=Array.isArray(e)?e.map(e=>"string"==typeof e?{tag:e,count:0}:e).sort((e,t)=>e.tag.localeCompare(t.tag)):[]}finally{this._loading=!1}}render(){const e=this._selectedTags?this._selectedTags.size:0;return B`
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
    `}_renderTagCard(e){const t=this._selectedTags&&this._selectedTags.has(e.tag),i=e.device_count||e.count||0;return B`
      <div class="tag-card ${t?"selected":""}"
        role="checkbox"
        aria-checked=${t?"true":"false"}
        aria-label="Tag: ${e.tag}, used by ${i} device${1!==i?"s":""}"
        tabindex="0"
        @click=${()=>this._toggleTagSelection(e.tag)}
        @keydown=${t=>("Enter"===t.key||" "===t.key)&&this._toggleTagSelection(e.tag)}>
        <div class="tag-card-top">
          <span class="tag-card-name">${e.tag}</span>
        </div>
        <div class="tag-card-count">${i} device${1!==i?"s":""}</div>
        <div class="tag-card-actions">
          <button class="sensor-btn edit" aria-label="Rename tag ${e.tag}"
            @click=${t=>{t.stopPropagation(),this._startRename(e.tag)}}>Rename</button>
          <button class="sensor-btn remove" aria-label="Delete tag ${e.tag}"
            @click=${t=>{t.stopPropagation(),this._deleteTag(e.tag)}}>Delete</button>
        </div>
      </div>
    `}_toggleTagSelection(e){const t=new Set(this._selectedTags);t.has(e)?t.delete(e):t.add(e),this._selectedTags=t}async _deleteSelectedTags(){const e=[...this._selectedTags];if(confirm(`Delete ${e.length} tag${1!==e.length?"s":""}?`)){for(const t of e)try{await Ge(t)}catch(e){console.error(e)}this._selectedTags=new Set,await this._loadTags()}}_startRename(e){this._renamingTag=e,this._renameValue=e}_cancelRename(){this._renamingTag=null,this._renameValue=""}async _saveRename(e){const t=this._renameValue.trim();if(t&&t!==e){try{await Ie(e,t),await this._loadTags()}catch(e){console.error("Failed to rename tag:",e)}this._cancelRename()}else this._cancelRename()}async _createTag(){const e=this._newTagName.trim();if(e)try{await Le(e),this._newTagName="",await this._loadTags()}catch(e){console.error("Failed to create tag:",e)}}async _deleteTag(e){const t=this._tags.find(t=>t.tag===e);if(!(t&&t.count>0)||confirm(`"${e}" is used by ${t.count} device(s). Delete anyway?`))try{await Ge(e),await this._loadTags()}catch(e){console.error("Failed to delete tag:",e)}}}customElements.define("tag-registry-settings",un);const pn={attr:"",value:""},hn={name:"",expression:""};class gn extends le{static properties={_settings:{type:Object,state:!0},_loading:{type:Boolean,state:!0},_savingSettings:{type:Boolean,state:!0},_settingsSaved:{type:Boolean,state:!0},_editingTransformIndex:{type:Number,state:!0},_transformError:{type:String,state:!0},_importStatus:{type:String,state:!0}};static styles=[ce,n`
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
  `];constructor(){super(),this._settings=null,this._loading=!0,this._savingSettings=!1,this._settingsSaved=!1,this._transformError="",this._editingTransformIndex=-1}connectedCallback(){super.connectedCallback(),this._loadSettings()}async _loadSettings(){this._loading=!0;try{this._settings=await Ue().catch(()=>({}))}finally{this._loading=!1}}render(){return this._loading?B`<div class="loading">Loading settings...</div>`:B`
      <h2>Settings</h2>
      <tag-registry-settings></tag-registry-settings>
      ${this._renderCustomTransforms()}
      ${this._renderGlobalDefaults()}
      ${this._renderDeviceManagement()}
      ${this._renderExportImport()}
    `}_renderCustomTransforms(){const e=(this._settings||{}).custom_transforms||[],t=hn;return B`
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
            @input=${e=>{hn.name=e.target.value,this.requestUpdate()}}>
          <input class="small-input" type="text" placeholder="Expression (e.g. value * 1.8 + 32)"
            style="flex: 1; min-width: 200px;"
            .value=${t.expression}
            @input=${e=>{hn.expression=e.target.value,this.requestUpdate()}}>
          <button class="small-btn" @click=${this._addCustomTransform.bind(this)}>${this._editingTransformIndex>=0?"Save":"Add"}</button>
          ${this._editingTransformIndex>=0?B`<button class="small-btn" style="background: rgba(255,255,255,0.1); color: #fff;" @click=${()=>this._cancelEditTransform()}>Cancel</button>`:""}
        </div>

        ${this._transformError?B`<div style="font-size: 11px; color: #ef5350; margin-top: 6px;">${this._transformError}</div>`:""}
      </div>
    `}_editCustomTransform(e){const t=((this._settings||{}).custom_transforms||[])[e];t&&(hn.name=t.name,hn.expression=t.expression,this._editingTransformIndex=e,this._transformError="",this.requestUpdate())}_cancelEditTransform(){hn.name="",hn.expression="",this._editingTransformIndex=-1,this._transformError="",this.requestUpdate()}_addCustomTransform(){const e=(hn.name||"").trim(),t=(hn.expression||"").trim();if(this._transformError="",!e||!t)return void(this._transformError="Name and expression are required.");try{new Function("value","return ("+t+")")}catch(e){return void(this._transformError=`Invalid expression: ${e.message}`)}const i=this._settings||{},s=[...i.custom_transforms||[]];if(this._editingTransformIndex>=0)s[this._editingTransformIndex]={...s[this._editingTransformIndex],name:e,expression:t},this._editingTransformIndex=-1;else{const i="custom:"+e.toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_|_$/g,"");if(s.some(e=>e.id===i))return void(this._transformError="A transform with this name already exists.");s.push({id:i,name:e,expression:t})}this._settings={...i,custom_transforms:s},hn.name="",hn.expression="",this.requestUpdate(),this._saveSettings()}_removeCustomTransform(e){const t=this._settings||{},i=[...t.custom_transforms||[]];i.splice(e,1),this._settings={...t,custom_transforms:i},this._saveSettings()}_renderGlobalDefaults(){const e=(this._settings||{}).default_thresholds||{},t=pn;return B`
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
            @input=${e=>{pn.attr=e.target.value,this.requestUpdate()}}>
          <input class="small-input" type="number" placeholder="Value..."
            style="width: 90px;"
            .value=${t.value}
            @input=${e=>{pn.value=e.target.value,this.requestUpdate()}}>
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
    `}_updateDefaultThreshold(e,t){const i=this._settings||{};this._settings={...i,default_thresholds:{...i.default_thresholds||{},[e]:""===t?null:Number(t)}}}_removeDefaultThreshold(e){const t=this._settings||{},i={...t.default_thresholds||{}};delete i[e],this._settings={...t,default_thresholds:i}}_addDefaultThreshold(){const e=(pn.attr||"").trim(),t=(pn.value||"").trim();e&&""!==t&&(this._updateDefaultThreshold(e,t),pn.attr="",pn.value="",this.requestUpdate())}_renderDeviceManagement(){const e=this._settings||{},t=e.device_cleanup_days??0,i=e.alert_cooldown_minutes??30;return B`
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
                .value=${String(i)}
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
    `}async _exportSettings(){try{const e=await je(),t=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),i=URL.createObjectURL(t),s=document.createElement("a");s.href=i,s.download=`mqtt-monitor-settings-${(new Date).toISOString().slice(0,10)}.json`,s.click(),URL.revokeObjectURL(i)}catch(e){console.error("Export failed:",e)}}async _importFile(e){const t=e.target.files[0];if(t){this._importStatus="";try{const e=await t.text(),i=JSON.parse(e);if(!i.version)return void(this._importStatus="Error: Invalid export file.");await Be(i),this._importStatus="Imported successfully!",this._loadSettings(),setTimeout(()=>{this._importStatus=""},3e3)}catch(e){this._importStatus=`Error: ${e.message}`}e.target.value=""}}async _saveSettings(){this._savingSettings=!0,this._settingsSaved=!1;try{await Re(this._settings),ge(this._settings.custom_transforms||[]),this._settingsSaved=!0,setTimeout(()=>{this._settingsSaved=!1},2e3)}catch(e){console.error("Failed to save settings:",e)}finally{this._savingSettings=!1}}}customElements.define("settings-view",gn);class fn extends le{static properties={currentView:{type:String},selectedDevice:{type:String},selectedGroup:{type:String}};static styles=[ce,n`
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
  `];constructor(){super(),this.currentView="dashboard",this.selectedDevice=null,this.selectedGroup=null}connectedCallback(){super.connectedCallback(),ue.connect(),Ue().then(e=>{e?.custom_transforms&&ge(e.custom_transforms)}).catch(()=>{})}disconnectedCallback(){super.disconnectedCallback(),ue.disconnect()}render(){return B`
      <nav-bar
        .currentView=${this.currentView}
        @view-change=${this._onViewChange}
      ></nav-bar>
      ${this._renderView()}
      ${this.selectedDevice||this.selectedGroup?this._renderOverlay():""}
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
    `}_onOverlayClick(){this.selectedDevice=null,this.selectedGroup=null}_onViewChange(e){this.currentView=e.detail.view,this.selectedDevice=null,this.selectedGroup=null}_onDeviceSelect(e){this.selectedDevice=e.detail.deviceId}_onGroupEdit(e){this.selectedGroup=e.detail.groupId}}customElements.define("network-monitor-app",fn);
//# sourceMappingURL=bundle.js.map
