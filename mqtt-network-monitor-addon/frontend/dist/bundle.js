/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),i=new WeakMap;let o=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const s=this.t;if(e&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=i.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&i.set(s,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1],t[0]);return new o(i,t,s)},r=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:a,defineProperty:d,getOwnPropertyDescriptor:l,getOwnPropertyNames:c,getOwnPropertySymbols:p,getPrototypeOf:h}=Object,u=globalThis,g=u.trustedTypes,m=g?g.emptyScript:"",f=u.reactiveElementPolyfillSupport,b=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},_=(t,e)=>!a(t,e),x={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:_};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let y=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=x){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);void 0!==i&&d(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:o}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const n=i?.call(this);o?.call(this,e),this.requestUpdate(t,n,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??x}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const t=h(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const t=this.properties,e=[...c(t),...p(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const s=this._$Eu(t,e);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(r(t))}else void 0!==t&&e.push(r(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const s=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((s,i)=>{if(e)s.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of i){const i=document.createElement("style"),o=t.litNonce;void 0!==o&&i.setAttribute("nonce",o),i.textContent=e.cssText,s.appendChild(i)}})(s,this.constructor.elementStyles),s}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(void 0!==i&&!0===s.reflect){const o=(void 0!==s.converter?.toAttribute?s.converter:v).toAttribute(e,s.type);this._$Em=t,null==o?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(t,e){const s=this.constructor,i=s._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=s.getPropertyOptions(i),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=i;const n=o.fromAttribute(e,t.type);this[i]=n??this._$Ej?.get(i)??n,this._$Em=null}}requestUpdate(t,e,s,i=!1,o){if(void 0!==t){const n=this.constructor;if(!1===i&&(o=this[t]),s??=n.getPropertyOptions(t),!((s.hasChanged??_)(o,e)||s.useDefault&&s.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,s))))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:o},n){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==o||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t){const{wrapped:t}=s,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,s,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[b("elementProperties")]=new Map,y[b("finalized")]=new Map,f?.({ReactiveElement:y}),(u.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $=globalThis,w=t=>t,k=$.trustedTypes,S=k?k.createPolicy("lit-html",{createHTML:t=>t}):void 0,E="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,D="?"+C,T=`<${D}>`,A=document,z=()=>A.createComment(""),F=t=>null===t||"object"!=typeof t&&"function"!=typeof t,N=Array.isArray,M="[ \t\n\f\r]",P=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,L=/-->/g,O=/>/g,G=RegExp(`>|${M}(?:([^\\s"'>=/]+)(${M}*=${M}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),I=/'/g,U=/"/g,R=/^(?:script|style|textarea|title)$/i,j=t=>(e,...s)=>({_$litType$:t,strings:e,values:s}),B=j(1),H=j(2),V=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),Y=new WeakMap,J=A.createTreeWalker(A,129);function W(t,e){if(!N(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const X=(t,e)=>{const s=t.length-1,i=[];let o,n=2===e?"<svg>":3===e?"<math>":"",r=P;for(let e=0;e<s;e++){const s=t[e];let a,d,l=-1,c=0;for(;c<s.length&&(r.lastIndex=c,d=r.exec(s),null!==d);)c=r.lastIndex,r===P?"!--"===d[1]?r=L:void 0!==d[1]?r=O:void 0!==d[2]?(R.test(d[2])&&(o=RegExp("</"+d[2],"g")),r=G):void 0!==d[3]&&(r=G):r===G?">"===d[0]?(r=o??P,l=-1):void 0===d[1]?l=-2:(l=r.lastIndex-d[2].length,a=d[1],r=void 0===d[3]?G:'"'===d[3]?U:I):r===U||r===I?r=G:r===L||r===O?r=P:(r=G,o=void 0);const p=r===G&&t[e+1].startsWith("/>")?" ":"";n+=r===P?s+T:l>=0?(i.push(a),s.slice(0,l)+E+s.slice(l)+C+p):s+C+(-2===l?e:p)}return[W(t,n+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class K{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let o=0,n=0;const r=t.length-1,a=this.parts,[d,l]=X(t,e);if(this.el=K.createElement(d,s),J.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=J.nextNode())&&a.length<r;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(E)){const e=l[n++],s=i.getAttribute(t).split(C),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:o,name:r[2],strings:s,ctor:"."===r[1]?st:"?"===r[1]?it:"@"===r[1]?ot:et}),i.removeAttribute(t)}else t.startsWith(C)&&(a.push({type:6,index:o}),i.removeAttribute(t));if(R.test(i.tagName)){const t=i.textContent.split(C),e=t.length-1;if(e>0){i.textContent=k?k.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],z()),J.nextNode(),a.push({type:2,index:++o});i.append(t[e],z())}}}else if(8===i.nodeType)if(i.data===D)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=i.data.indexOf(C,t+1));)a.push({type:7,index:o}),t+=C.length-1}o++}}static createElement(t,e){const s=A.createElement("template");return s.innerHTML=t,s}}function Z(t,e,s=t,i){if(e===V)return e;let o=void 0!==i?s._$Co?.[i]:s._$Cl;const n=F(e)?void 0:e._$litDirective$;return o?.constructor!==n&&(o?._$AO?.(!1),void 0===n?o=void 0:(o=new n(t),o._$AT(t,s,i)),void 0!==i?(s._$Co??=[])[i]=o:s._$Cl=o),void 0!==o&&(e=Z(t,o._$AS(t,e.values),o,i)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??A).importNode(e,!0);J.currentNode=i;let o=J.nextNode(),n=0,r=0,a=s[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new tt(o,o.nextSibling,this,t):1===a.type?e=new a.ctor(o,a.name,a.strings,this,t):6===a.type&&(e=new nt(o,this,t)),this._$AV.push(e),a=s[++r]}n!==a?.index&&(o=J.nextNode(),n++)}return J.currentNode=A,i}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class tt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),F(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==V&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>N(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==q&&F(this._$AH)?this._$AA.nextSibling.data=t:this.T(A.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,i="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=K.createElement(W(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new Q(i,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=Y.get(t.strings);return void 0===e&&Y.set(t.strings,e=new K(t)),e}k(t){N(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const o of t)i===e.length?e.push(s=new tt(this.O(z()),this.O(z()),this,this.options)):s=e[i],s._$AI(o),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=w(t).nextSibling;w(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class et{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,o){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=q}_$AI(t,e=this,s,i){const o=this.strings;let n=!1;if(void 0===o)t=Z(this,t,e,0),n=!F(t)||t!==this._$AH&&t!==V,n&&(this._$AH=t);else{const i=t;let r,a;for(t=o[0],r=0;r<o.length-1;r++)a=Z(this,i[s+r],e,r),a===V&&(a=this._$AH[r]),n||=!F(a)||a!==this._$AH[r],a===q?t=q:t!==q&&(t+=(a??"")+o[r+1]),this._$AH[r]=a}n&&!i&&this.j(t)}j(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class st extends et{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===q?void 0:t}}class it extends et{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}}class ot extends et{constructor(t,e,s,i,o){super(t,e,s,i,o),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??q)===V)return;const s=this._$AH,i=t===q&&s!==q||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==q&&(s===q||i);i&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class nt{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}}const rt=$.litHtmlPolyfillSupport;rt?.(K,tt),($.litHtmlVersions??=[]).push("3.3.2");const at=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class dt extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const i=s?.renderBefore??e;let o=i._$litPart$;if(void 0===o){const t=s?.renderBefore??null;i._$litPart$=o=new tt(e.insertBefore(z(),t),t,void 0,s??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return V}}dt._$litElement$=!0,dt.finalized=!0,at.litElementHydrateSupport?.({LitElement:dt});const lt=at.litElementPolyfillSupport;lt?.({LitElement:dt}),(at.litElementVersions??=[]).push("4.2.2");const ct=n`
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
`;const pt=new class{constructor(){this._ws=null,this._listeners=[],this._reconnectDelay=1e3,this._reconnectAttempts=0,this._maxReconnectAttempts=50}connect(){const t="https:"===location.protocol?"wss:":"ws:",e=location.pathname.match(/^(\/api\/hassio_ingress\/[^/]+)/),s=e?e[1]:"",i=`${t}//${location.host}${s}/api/ws`;this._ws=new WebSocket(i),this._ws.onmessage=t=>{try{const e=JSON.parse(t.data);this._listeners.forEach(t=>t(e))}catch(t){console.error("WebSocket parse error:",t)}},this._ws.onclose=()=>{this._reconnectAttempts>=this._maxReconnectAttempts?console.error("WebSocket: max reconnect attempts reached"):(this._reconnectAttempts++,setTimeout(()=>this.connect(),this._reconnectDelay),this._reconnectDelay=Math.min(2*this._reconnectDelay,3e4))},this._ws.onopen=()=>{this._reconnectDelay=1e3,this._reconnectAttempts=0}}onMessage(t){return this._listeners.push(t),()=>{this._listeners=this._listeners.filter(e=>e!==t)}}disconnect(){this._ws&&this._ws.close()}};function ht(t,e){if(null==t||!e)return t;if("duration"===e){const e=Number(t);if(isNaN(e))return t;const s=[],i=Math.floor(e/86400),o=Math.floor(e%86400/3600),n=Math.floor(e%3600/60),r=Math.floor(e%60);return i&&s.push(`${i}d`),o&&s.push(`${o}h`),n&&s.push(`${n}m`),s.length||s.push(`${r}s`),s.join(" ")}if("bytes"===e){const e=Number(t);return isNaN(e)?t:e>=1e12?(e/1e12).toFixed(1)+" TB":e>=1e9?(e/1e9).toFixed(1)+" GB":e>=1e6?(e/1e6).toFixed(1)+" MB":e>=1e3?(e/1e3).toFixed(1)+" KB":e+" B"}if("percentage"===e){const e=Number(t);return isNaN(e)?t:(100*e).toFixed(1)+"%"}if(e.startsWith("round:")){const s=parseInt(e.split(":")[1])||0,i=Number(t);return isNaN(i)?t:i.toFixed(s)}if(e.startsWith("prefix:"))return e.slice(7)+t;if(e.startsWith("suffix:"))return t+e.slice(7);if(e.startsWith("custom:")){const s=ut.find(t=>t.id===e);if(s)try{return new Function("value","return ("+s.expression+")")(t)}catch{return t}}return t}let ut=[];function gt(t){ut=Array.isArray(t)?t:[]}const mt=[{value:"",label:"None"},{value:"duration",label:"Duration (seconds → 2d 5h)"},{value:"bytes",label:"Bytes (→ KB/MB/GB)"},{value:"percentage",label:"Percentage (0-1 → %)"},{value:"round:0",label:"Round (0 decimals)"},{value:"round:1",label:"Round (1 decimal)"},{value:"round:2",label:"Round (2 decimals)"}];const ft=function(){const t=location.pathname.match(/^(\/api\/hassio_ingress\/[^/]+)/);return t?t[1]:""}();async function bt(t,e={}){const s=await fetch(t,e);if(!s.ok){const t=await s.text().catch(()=>s.statusText);throw new Error(`API error ${s.status}: ${t}`)}const i=s.headers.get("content-type");return i&&i.includes("application/json")?s.json():null}async function vt(t=0){return bt(t>0?`${ft}/api/devices?since=${t}`:`${ft}/api/devices`)}async function _t(t){return bt(`${ft}/api/devices/${encodeURIComponent(t)}`)}async function xt(t){return bt(`${ft}/api/devices/${encodeURIComponent(t)}`,{method:"DELETE"})}async function yt(t,e){return bt(`${ft}/api/devices/${encodeURIComponent(t)}/attributes/${encodeURIComponent(e)}`,{method:"DELETE"})}async function $t(t,e){return bt(`${ft}/api/devices/${encodeURIComponent(t)}/attributes/${encodeURIComponent(e)}/unhide`,{method:"POST"})}async function wt(t,e){return bt(`${ft}/api/devices/${encodeURIComponent(t)}/commands/${encodeURIComponent(e)}`,{method:"DELETE"})}async function kt(t,e){return bt(`${ft}/api/devices/${encodeURIComponent(t)}/commands/${encodeURIComponent(e)}/unhide`,{method:"POST"})}async function St(){return bt(`${ft}/api/topology`)}async function Et(){return bt(`${ft}/api/topology/layouts`)}async function Ct(t){return bt(`${ft}/api/topology/layouts`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})}async function Dt(t){return bt(`${ft}/api/topology/layouts/${encodeURIComponent(t)}`,{method:"DELETE"})}async function Tt(t,e,s={}){return bt(`${ft}/api/devices/${encodeURIComponent(t)}/command`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({command:e,params:s})})}async function At(){return bt(`${ft}/api/groups`)}async function zt(t,e,s=[]){return bt(`${ft}/api/groups`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:t,name:e,device_ids:s})})}async function Ft(t,e){return bt(`${ft}/api/groups/${encodeURIComponent(t)}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}async function Nt(t){return bt(`${ft}/api/groups/${encodeURIComponent(t)}`,{method:"DELETE"})}async function Mt(t,e){return bt(`${ft}/api/devices/${encodeURIComponent(t)}/tags/add`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({tags:e})})}async function Pt(t,e){return bt(`${ft}/api/devices/${encodeURIComponent(t)}/tags/${encodeURIComponent(e)}`,{method:"DELETE"})}async function Lt(){return bt(`${ft}/api/tags`)}async function Ot(t){return bt(`${ft}/api/tags`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({tag:t})})}async function Gt(t,e){return bt(`${ft}/api/tags/${encodeURIComponent(t)}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({new_name:e})})}async function It(t){return bt(`${ft}/api/tags/${encodeURIComponent(t)}`,{method:"DELETE"})}async function Ut(){return bt(`${ft}/api/settings`)}async function Rt(t){return bt(`${ft}/api/settings`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})}async function jt(){return bt(`${ft}/api/settings/export`)}async function Bt(t){return bt(`${ft}/api/settings/import`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})}async function Ht(t){return bt(`${ft}/api/devices/${encodeURIComponent(t)}/effective-settings`)}async function Vt(t,e){return bt(`${ft}/api/devices/${encodeURIComponent(t)}/settings`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}async function qt(t){return bt(`${ft}/api/groups/${encodeURIComponent(t)}/force-apply`,{method:"POST"})}var Yt=Object.freeze({__proto__:null,addDeviceTags:Mt,addServerCommand:async function(t,e,s){return bt(`${ft}/api/devices/${encodeURIComponent(t)}/server-commands`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:e,shell:s})})},addServerSensor:async function(t,e,s){return bt(`${ft}/api/devices/${encodeURIComponent(t)}/server-sensors`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:e,...s})})},createGroup:zt,createTag:Ot,deleteAttribute:yt,deleteDevice:xt,deleteGroup:Nt,deleteLayout:Dt,deleteTag:It,exportSettings:jt,fetchDevice:_t,fetchDevices:vt,fetchEffectiveSettings:Ht,fetchGroups:At,fetchLayouts:Et,fetchSettings:Ut,fetchTags:Lt,fetchTopology:St,forceApplyGroup:qt,hideCommand:wt,importSettings:Bt,removeDeviceTag:Pt,removeServerCommand:async function(t,e){return bt(`${ft}/api/devices/${encodeURIComponent(t)}/server-commands/${encodeURIComponent(e)}`,{method:"DELETE"})},removeServerSensor:async function(t,e){return bt(`${ft}/api/devices/${encodeURIComponent(t)}/server-sensors/${encodeURIComponent(e)}`,{method:"DELETE"})},renameTag:Gt,saveLayout:Ct,sendCommand:Tt,setDeviceInterval:async function(t,e){return bt(`${ft}/api/devices/${encodeURIComponent(t)}/config-interval`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({interval:e})})},unhideAttribute:$t,unhideCommand:kt,updateDeviceSettings:Vt,updateGroup:Ft,updateSettings:Rt});class Jt extends dt{static properties={currentView:{type:String}};static styles=[ct,n`
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
        <span class="version">v0.2.1 build ${"4/4 19:12"}</span>
      </nav>

      <!-- Mobile simple header -->
      <div class="mobile-header" aria-hidden="true">
        <span class="logo">Network Monitor</span>
        <span class="version">build ${"4/4 19:12"}</span>
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
    `}_navigate(t){this.dispatchEvent(new CustomEvent("view-change",{detail:{view:t}}))}}customElements.define("nav-bar",Jt);class Wt extends dt{static properties={selectedTags:{type:Array},_allTags:{type:Array,state:!0},_open:{type:Boolean,state:!0},_showCreate:{type:Boolean,state:!0},_newTagName:{type:String,state:!0},_creating:{type:Boolean,state:!0}};static styles=[ct,n`
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
  `];constructor(){super(),this.selectedTags=[],this._allTags=[],this._open=!1,this._showCreate=!1,this._newTagName="",this._creating=!1,this._onDocClick=this._onDocClick.bind(this)}connectedCallback(){super.connectedCallback(),this._loadTags(),document.addEventListener("click",this._onDocClick)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._onDocClick)}async _loadTags(){try{const t=await Lt();Array.isArray(t)&&(this._allTags=t.map(t=>"string"==typeof t?t:t.tag).sort())}catch(t){console.error("Failed to load tags:",t)}}_onDocClick(t){if(!this._open)return;t.composedPath().includes(this)||(this._open=!1,this._showCreate=!1)}_toggle(t){t.stopPropagation(),this._open=!this._open,this._open||(this._showCreate=!1)}_toggleTag(t){(this.selectedTags||[]).includes(t)?this.dispatchEvent(new CustomEvent("tag-remove",{detail:{tag:t},bubbles:!0,composed:!0})):this.dispatchEvent(new CustomEvent("tag-add",{detail:{tag:t},bubbles:!0,composed:!0}))}async _createTag(){const t=this._newTagName.trim();if(t&&!this._creating){this._creating=!0;try{await Ot(t),await this._loadTags(),this.dispatchEvent(new CustomEvent("tag-add",{detail:{tag:t},bubbles:!0,composed:!0})),this._newTagName="",this._showCreate=!1}catch(t){console.error("Failed to create tag:",t)}finally{this._creating=!1}}}render(){const t=this.selectedTags||[],e=t.length>0;return B`
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
    `}}customElements.define("tag-picker",Wt);class Xt extends dt{static properties={device:{type:Object},effectiveSettings:{type:Object},haOverrides:{type:Object},groups:{type:Object},cardAttributes:{type:Array},attributeTransforms:{type:Object},groupTransforms:{type:Object},_showHidden:{type:Boolean,state:!0}};static styles=[ct,n`
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
  `];constructor(){super(),this.device=null,this.effectiveSettings=null,this.haOverrides={},this.groups={},this.cardAttributes=[],this.attributeTransforms={},this.groupTransforms={},this._showHidden=!1}_isExposed(t){if(void 0!==this.haOverrides[t])return this.haOverrides[t];const e=this.effectiveSettings;return void 0!==e?.ha_exposure_overrides?.[t]?e.ha_exposure_overrides[t]:"all"===e?.ha_exposure||!!e?.ha_exposed_attributes?.includes(t)}_getThresholdForAttr(t){const e=this.effectiveSettings;if(!e)return null;const s=(e.thresholds||{})[t];if(null==s)return null;const i="object"==typeof s?s.value:s;if(null==i)return null;const o=this.device?.threshold_overrides||{},n=this.device?.group_policy,r=n?this.groups[n]:null;let a="global";return null!=o[t]?a="device":null!=r?.thresholds?.[t]&&(a="Group Policy"),{value:i,source:a}}_checkThreshold(t,e){if(!e||null==t||"number"!=typeof t)return!1;const s="object"==typeof e?e.value:e,i="object"==typeof e&&e.op||">";if(null==s)return!1;switch(i){case">":default:return t>s;case"<":return t<s;case">=":return t>=s;case"<=":return t<=s;case"==":return t===s;case"!=":return t!==s}}_getThresholdOp(t){const e=(this.device?.threshold_overrides||{})[t];if(null!=e&&"object"==typeof e)return e.op||">";const s=this.effectiveSettings;if(!s)return">";const i=(s.thresholds||{})[t];return null!=i&&"object"==typeof i&&i.op||">"}_getThresholdVal(t){const e=(this.device?.threshold_overrides||{})[t];if(null!=e)return"object"==typeof e?e.value:e;const s=this._getThresholdForAttr(t);return s?s.value:null}_getCritThresholdOp(t){const e=(this.device?.crit_threshold_overrides||{})[t];return null!=e&&"object"==typeof e&&e.op||">"}_getCritThresholdVal(t){const e=(this.device?.crit_threshold_overrides||{})[t];return null!=e?"object"==typeof e?e.value:e:null}render(){if(!this.device)return B``;const t=Object.entries(this.device.attributes||{}).sort(([t],[e])=>t.localeCompare(e)),e=this.device.hidden_attributes||[],s=t.filter(([t])=>!e.includes(t)),i=t.filter(([t])=>e.includes(t));return 0===t.length?B``:B`
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
    `}_renderAttrTile(t,e){const s=this._isExposed(t),i=this._getThresholdForAttr(t),o=null!=e.value?e.value:null,n=(this.device?.threshold_overrides||{})[t],r=null!=n?n:i?i.value:null,a=this._checkThreshold(o,r),d=this._getThresholdOp(t),l=this._getThresholdVal(t),c=(this.cardAttributes||[]).includes(t),p=(this.attributeTransforms||{})[t]||"",h=this._getCritThresholdOp(t),u=this._getCritThresholdVal(t),g=this.device?.crit_threshold_overrides||{},m=null!=g[t]?g[t]:null,f=this._checkThreshold(o,m),b=f?"critical-val":a?"exceeded-val":"";return B`
      <div class="attr-tile ${s?"":"dimmed"} ${f?"critical":a?"exceeded":""}">
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
          ${this._formatValue(o,e.unit,p)}
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
            ${i&&"device"!==i.source&&null==n?B`
              <span class="threshold-source">${i.source}</span>
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
            ${function(){const t=ut.map(t=>({value:t.id,label:t.name}));return[...mt,...t]}().map(t=>B`
              <option value=${t.value} ?selected=${t.value===p}>${t.label}</option>
            `)}
          </select>
          ${(this.groupTransforms||{})[t]&&!(this.device?.attribute_transforms||{})[t]?B`<span class="transform-source">Group Policy</span>`:""}
        </div>
      </div>
    `}_onDelete(t){this.dispatchEvent(new CustomEvent("attribute-deleted",{detail:{name:t},bubbles:!0,composed:!0}))}_onUnhide(t){this.dispatchEvent(new CustomEvent("attribute-unhidden",{detail:{name:t},bubbles:!0,composed:!0}))}_onToggleExposure(t){this.dispatchEvent(new CustomEvent("ha-exposure-toggled",{detail:{name:t},bubbles:!0,composed:!0}))}_onThresholdChange(t,e,s){this.dispatchEvent(new CustomEvent("threshold-changed",{detail:{name:t,value:e,op:s},bubbles:!0,composed:!0}))}_onCritThresholdChange(t,e,s){this.dispatchEvent(new CustomEvent("crit-threshold-changed",{detail:{name:t,value:e,op:s},bubbles:!0,composed:!0}))}_formatValue(t,e,s){if(null==t)return"—";if(s){return ht(t,s)}return B`${t}<span class="attr-unit">${e||""}</span>`}_onTransformChange(t,e){this.dispatchEvent(new CustomEvent("transform-changed",{detail:{attr:t,transform:e||null},bubbles:!0,composed:!0}))}_togglePin(t){this.dispatchEvent(new CustomEvent("pin-attribute",{detail:{name:t,pinned:!(this.cardAttributes||[]).includes(t)},bubbles:!0,composed:!0}))}}customElements.define("device-attributes",Xt);const Kt=["shutdown","halt","poweroff","destroy"];class Zt extends dt{static properties={device:{type:Object},serverCommands:{type:Object},commandResult:{type:String},_showHiddenCmds:{type:Boolean,state:!0},_showAddCommand:{type:Boolean,state:!0},_editingCommandName:{type:String,state:!0},_editCommandForm:{type:Object,state:!0}};static styles=[ct,n`
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
                <button class="cmd-btn ${function(t){const e=t.toLowerCase();return Kt.some(t=>e.includes(t))}(t)?"danger":""}"
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
    `}_startAdd(){this._showAddCommand=!0,this._editingCommandName=null,this._editCommandForm={name:"",shell:""}}_startEdit(t,e){this._editingCommandName=t,this._showAddCommand=!1,this._editCommandForm={name:t,shell:e}}_saveForm(){const t=this._editCommandForm;if(!t)return;const e=(t.name||"").trim(),s=(t.shell||"").trim();e&&s&&(this.dispatchEvent(new CustomEvent("server-command-save",{detail:{name:e,shell:s,editing:this._editingCommandName},bubbles:!0,composed:!0})),this._cancelForm())}_cancelForm(){this._showAddCommand=!1,this._editingCommandName=null,this._editCommandForm=null}_onSend(t){this.dispatchEvent(new CustomEvent("command-send",{detail:{command:t},bubbles:!0,composed:!0}))}_onHide(t){this.dispatchEvent(new CustomEvent("command-hide",{detail:{name:t},bubbles:!0,composed:!0}))}_onUnhide(t){this.dispatchEvent(new CustomEvent("command-unhide",{detail:{name:t},bubbles:!0,composed:!0}))}_onRemove(t){this.dispatchEvent(new CustomEvent("server-command-remove",{detail:{name:t},bubbles:!0,composed:!0}))}}customElements.define("device-commands",Zt);class Qt extends dt{static properties={device:{type:Object},configInterval:{type:Number},customSensors:{type:Object},_showAddSensor:{type:Boolean,state:!0},_editSensorKey:{type:String,state:!0},_sensorForm:{type:Object,state:!0}};static styles=[ct,n`
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
    `}_startAdd(){this._showAddSensor=!0,this._editSensorKey=null,this._sensorForm={name:"",command:"",interval:30,unit:""}}_startEdit(t,e){this._editSensorKey=t,this._showAddSensor=!1,this._sensorForm={name:t,command:e.command,interval:e.interval||30,unit:e.unit||""}}_saveForm(){const{name:t,command:e,interval:s,unit:i}=this._sensorForm;t.trim()&&e.trim()&&(this.dispatchEvent(new CustomEvent("sensor-save",{detail:{key:t.trim(),sensor:{command:e,interval:s||30,unit:i},oldKey:this._editSensorKey},bubbles:!0,composed:!0})),this._cancelForm())}_cancelForm(){this._showAddSensor=!1,this._editSensorKey=null,this._sensorForm={name:"",command:"",interval:30,unit:""}}_onIntervalChange(t){this.dispatchEvent(new CustomEvent("interval-changed",{detail:{value:t},bubbles:!0,composed:!0}))}_onRemove(t){this.dispatchEvent(new CustomEvent("sensor-remove",{detail:{key:t},bubbles:!0,composed:!0}))}}customElements.define("device-config",Qt);class te extends dt{static properties={deviceId:{type:String},groupId:{type:String},device:{type:Object},commandResult:{type:String},_groups:{type:Object,state:!0},_effectiveSettings:{type:Object,state:!0},_haOverrides:{type:Object,state:!0},_configInterval:{type:Number,state:!0},_customSensors:{type:Object,state:!0},_showGroupDialog:{type:Boolean,state:!0},_newGroupName:{type:String,state:!0},_serverCommands:{type:Object,state:!0}};static styles=[ct,n`
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
  `];constructor(){super(),this.device=null,this.commandResult="",this._groups={},this._effectiveSettings=null,this._haOverrides={},this._configInterval=30,this._customSensors={},this._showGroupDialog=!1,this._newGroupName="",this._serverCommands={}}get _isGroupMode(){return!!this.groupId&&!this.deviceId}connectedCallback(){super.connectedCallback(),this._loadGroups(),this._isGroupMode?this._loadGroupAggregate():this._loadDevice(),this._wsUnsub=pt.onMessage(t=>{if("device_update"===t.type){if(this._isGroupMode){const e=this._groups?.[this.groupId];if(e&&(e.device_ids||[]).includes(t.device_id)){const e=t.device?.attributes||{},s={...this.device?.attributes||{}};for(const[t,i]of Object.entries(e))s[t]=i;this.device={...this.device,attributes:s}}return}t.device_id===this.deviceId&&this._updateDeviceData(t.device)}})}disconnectedCallback(){super.disconnectedCallback(),this._wsUnsub&&this._wsUnsub()}async _refreshDevice(){try{const t=await _t(this.deviceId);this._updateDeviceData(t)}catch(t){}}_updateDeviceData(t){if(!t)return;const e={...this.device||{},...t};JSON.stringify(this.device)!==JSON.stringify(e)&&(this.device=e)}async _loadGroupAggregate(){try{const t=await At();this._groups=t;const e=t[this.groupId];if(!e)return;const s=await vt(),i=e.device_ids||[],o=i.map(t=>s[t]).filter(Boolean),n={};for(const t of o)for(const[e,s]of Object.entries(t.attributes||{}))n[e]||(n[e]={...s});const r=new Set;for(const t of o)for(const e of t.allowed_commands||[])r.add(e);const a=new Set;for(const t of o)for(const e of t.active_plugins||[])a.add(e);a.add("custom_command"),this.device={device_name:e.name,device_type:`Group · ${i.length} device${1!==i.length?"s":""}`,status:o.some(t=>"online"===t.status)?"online":"offline",attributes:n,attribute_transforms:e.attribute_transforms||{},threshold_overrides:e.thresholds||{},crit_threshold_overrides:e.crit_thresholds||{},allowed_commands:[...r],hidden_commands:e.hidden_commands||[],hidden_attributes:e.hidden_attributes||[],card_attributes:e.card_attributes||[],active_plugins:[...a],tags:[],server_tags:[],group_policy:this.groupId,_isGroupAggregate:!0},this._configInterval=e.interval??30,this._serverCommands={},this._customSensors=e.custom_sensors||{},this._haOverrides={},this._effectiveSettings=null}catch(t){console.error("Failed to load group aggregate:",t)}}async _loadDevice(){try{this.device=await _t(this.deviceId),this._haOverrides={...this.device.ha_exposure_overrides||{}};const t=this.device.server_commands;this._serverCommands=t&&!Array.isArray(t)?{...t}:{},this._configInterval=this.device.config_interval??this.device.collection_interval??this.device.remote_config?.interval??30;const e=this.device.server_sensors;this._customSensors=e&&"object"==typeof e?{...e}:{};try{this._effectiveSettings=await Ht(this.deviceId)}catch(t){}}catch(t){console.error("Failed to load device:",t)}}async _loadGroups(){try{this._groups=await At()}catch(t){console.error("Failed to load groups:",t)}}render(){if(!this.device)return B`<div style="padding: 40px; text-align: center; color: #fff;">Loading...</div>`;const t=this.device,e=this._isGroupMode,s="online"===t.status?"#04d65c":"offline"===t.status?"#ef5350":"#ffb74d";return B`
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
    `}async _addTag(t){t&&(await Mt(this.deviceId,[t]),await this._loadDevice())}async _removeTag(t){await Pt(this.deviceId,t),await this._loadDevice()}_renderGroupPolicy(){const t=Object.values(this._groups),e=this.device.group_policy||"";e&&this._groups[e];return B`
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
    `}async _onGroupPolicyChange(t){const e=t.target.value||null;try{await Vt(this.deviceId,{group_policy:e}),await this._loadDevice()}catch(t){console.error("Failed to update group policy:",t)}}_renderGroupDialog(){return B`
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
    `}async _createGroup(){const t=this._newGroupName.trim();if(!t)return;const e=t.toLowerCase().replace(/[^a-z0-9]+/g,"_");await zt(e,t,[this.deviceId]),this._newGroupName="",this._showGroupDialog=!1,await this._loadGroups(),await this._loadDevice()}async _renameGroup(t){if(!t||!this.groupId)return;const e=this._groups?.[this.groupId];if(e&&e.name!==t)try{await Ft(this.groupId,{...e,name:t}),this._groups={...this._groups,[this.groupId]:{...e,name:t}},this.device={...this.device,device_name:t}}catch(t){console.error("Failed to rename group:",t)}}_renderNetwork(){const t=this.device.network||{};return 0===Object.keys(t).length?B``:B`
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
    `}async _deleteAttribute(t){if(this._isGroupMode){const e=[...this.device.hidden_attributes||[]];return e.includes(t)||e.push(t),this.device={...this.device,hidden_attributes:e},void await this._saveGroupUpdate({hidden_attributes:e})}if(confirm(`Hide attribute "${t}"? Custom sensors will be removed from the client. Built-in attributes will be hidden.`))try{await yt(this.deviceId,t);const e=this.device?.card_attributes||[];if(e.includes(t)){const s=e.filter(e=>e!==t);await Vt(this.deviceId,{card_attributes:s})}await this._loadDevice()}catch(t){console.error("Failed to hide attribute:",t)}}async _unhideAttribute(t){if(this._isGroupMode){const e=(this.device.hidden_attributes||[]).filter(e=>e!==t);return this.device={...this.device,hidden_attributes:e},void await this._saveGroupUpdate({hidden_attributes:e})}try{await $t(this.deviceId,t),await this._loadDevice()}catch(t){console.error("Failed to unhide attribute:",t)}}async _toggleHaExposure(t){if(this._isGroupMode)return;const e=void 0!==this._haOverrides[t]?this._haOverrides[t]:void 0!==this._effectiveSettings?.ha_exposure_overrides?.[t]&&this._effectiveSettings.ha_exposure_overrides[t];this._haOverrides={...this._haOverrides,[t]:!e};try{await Vt(this.deviceId,{ha_exposure_overrides:this._haOverrides})}catch(t){console.error("Failed to update HA exposure:",t)}}async _setThreshold(t,e,s){if(this._isGroupMode)return this._setGroupThreshold(t,e,s);const i={...this.device.threshold_overrides||{}};""===e||null==e?delete i[t]:i[t]={op:s||">",value:Number(e)};try{await Vt(this.deviceId,{threshold_overrides:i}),this.device={...this.device,threshold_overrides:i},this._effectiveSettings=await Ht(this.deviceId)}catch(t){console.error("Failed to set threshold:",t)}}async _setCritThreshold(t,e,s){if(this._isGroupMode)return this._setGroupCritThreshold(t,e,s);const i={...this.device.crit_threshold_overrides||{}};""===e||null==e?delete i[t]:i[t]={op:s||">",value:Number(e)};try{await Vt(this.deviceId,{crit_threshold_overrides:i}),this.device={...this.device,crit_threshold_overrides:i}}catch(t){console.error("Failed to set crit threshold:",t)}}_effectiveTransforms(){if(this._isGroupMode)return this.device?.attribute_transforms||{};const t=this.device?.group_policy,e=t?this._groups[t]:null;return{...e?.attribute_transforms||{},...this.device?.attribute_transforms||{}}}_groupTransforms(){if(this._isGroupMode)return{};const t=this.device?.group_policy,e=t?this._groups[t]:null;return e?.attribute_transforms||{}}async _setAttributeTransform(t,e){if(this._isGroupMode)return this._setGroupTransform(t,e);const s={...this.device?.attribute_transforms||{}};e?s[t]=e:delete s[t];try{await Vt(this.deviceId,{attribute_transforms:s}),this.device={...this.device,attribute_transforms:s}}catch(t){console.error("Failed to update attribute transform:",t)}}async _forceApplyGroup(){if(confirm("This will clear all device-level overrides for every member and enforce the group policy. Devices can still be customized afterwards.\n\nContinue?"))try{await qt(this.groupId),await this._loadGroupAggregate()}catch(t){console.error("Failed to force apply:",t)}}async _saveGroupUpdate(t){const e=this._groups?.[this.groupId];if(e)try{const s={...e,...t};await Ft(this.groupId,s),this._groups={...this._groups,[this.groupId]:s};const i=Object.assign({},this.device,t);this.device=i,this.requestUpdate()}catch(t){console.error("Failed to update group:",t)}}async _setGroupThreshold(t,e,s){const i={...this.device.threshold_overrides||{}};""===e||null==e?delete i[t]:i[t]={op:s||">",value:Number(e)},this.device={...this.device,threshold_overrides:i},await this._saveGroupUpdate({thresholds:i})}async _setGroupCritThreshold(t,e,s){const i={...this.device.crit_threshold_overrides||{}};""===e||null==e?delete i[t]:i[t]={op:s||">",value:Number(e)},this.device={...this.device,crit_threshold_overrides:i},await this._saveGroupUpdate({crit_thresholds:i})}async _setGroupInterval(t){this._configInterval=t,await this._saveGroupUpdate({interval:t})}async _saveGroupCommand({name:t,shell:e}){const s=this._groups?.[this.groupId],i={...s?.custom_commands||{},[t]:e};await this._saveGroupUpdate({custom_commands:i}),this._groups={...this._groups,[this.groupId]:{...s,custom_commands:i}}}async _removeGroupCommand(t){const e=this._groups?.[this.groupId],s={...e?.custom_commands||{}};delete s[t],await this._saveGroupUpdate({custom_commands:s}),this._groups={...this._groups,[this.groupId]:{...e,custom_commands:s}}}async _saveGroupSensor({key:t,sensor:e,oldKey:s}){const i={...this._customSensors};s&&s!==t&&delete i[s],i[t]=e,this._customSensors=i,await this._saveGroupUpdate({custom_sensors:i})}async _removeGroupSensor(t){const e={...this._customSensors};delete e[t],this._customSensors=e,await this._saveGroupUpdate({custom_sensors:e})}async _setGroupTransform(t,e){const s={...this.device?.attribute_transforms||{}};e?s[t]=e:delete s[t],this.device={...this.device,attribute_transforms:s},await this._saveGroupUpdate({attribute_transforms:s})}async _toggleCardAttribute({name:t,pinned:e}){const s=[...this.device?.card_attributes||[]];let i;if(i=e?[...s,t]:s.filter(e=>e!==t),this._isGroupMode)return this.device={...this.device,card_attributes:i},void await this._saveGroupUpdate({card_attributes:i});try{await Vt(this.deviceId,{card_attributes:i}),this.device={...this.device,card_attributes:i}}catch(t){console.error("Failed to update card attributes:",t)}}async _sendCmd(t,e={}){if(!this._isGroupMode)try{this.commandResult=`Sending ${t}...`;const s=(await Tt(this.deviceId,t,e)).request_id;this.commandResult=`Sent ${t}... waiting for response`;const i=Date.now(),o=()=>{const t=(this.device?.command_history||[]).find(t=>t.request_id===s);t?this.commandResult=`${t.status}: ${t.output||"(no output)"}`:Date.now()-i<1e4?setTimeout(o,500):this.commandResult="Command sent (no response received)"};setTimeout(o,500)}catch(t){this.commandResult=`Error: ${t.message}`}}async _hideCommand(t){if(this._isGroupMode){const e=[...this.device.hidden_commands||[]];return e.includes(t)||e.push(t),this.device={...this.device,hidden_commands:e},void await this._saveGroupUpdate({hidden_commands:e})}try{await wt(this.deviceId,t),await this._loadDevice()}catch(t){console.error("Failed to hide command:",t)}}async _unhideCommand(t){if(this._isGroupMode){const e=(this.device.hidden_commands||[]).filter(e=>e!==t);return this.device={...this.device,hidden_commands:e},void await this._saveGroupUpdate({hidden_commands:e})}try{await kt(this.deviceId,t),await this._loadDevice()}catch(t){console.error("Failed to unhide command:",t)}}async _saveServerCommand({name:t,shell:e}){const{addServerCommand:s}=await Promise.resolve().then(function(){return Yt});await s(this.deviceId,t,e),await this._loadDevice()}async _removeServerCommand(t){const{removeServerCommand:e}=await Promise.resolve().then(function(){return Yt});await e(this.deviceId,t),await this._loadDevice()}async _saveSensor({key:t,sensor:e,oldKey:s}){const{addServerSensor:i,removeServerSensor:o}=await Promise.resolve().then(function(){return Yt});s&&s!==t&&await o(this.deviceId,s),await i(this.deviceId,t,e),await this._loadDevice()}async _removeSensor(t){const{removeServerSensor:e}=await Promise.resolve().then(function(){return Yt});await e(this.deviceId,t),await this._loadDevice()}async _onIntervalChange(t){const{setDeviceInterval:e}=await Promise.resolve().then(function(){return Yt});await e(this.deviceId,t),await this._loadDevice()}async _deleteDevice(){if(confirm(`Delete device "${this.device?.device_name||this.deviceId}"? This removes it from the registry. It will reappear if the client agent is still running.`))try{await xt(this.deviceId),this.dispatchEvent(new CustomEvent("back"))}catch(t){console.error("Failed to delete device:",t)}}}customElements.define("device-detail",te);class ee extends dt{static properties={_open:{type:Boolean,state:!0},_type:{type:String,state:!0},_title:{type:String,state:!0},_message:{type:String,state:!0},_placeholder:{type:String,state:!0},_confirmLabel:{type:String,state:!0},_confirmDanger:{type:Boolean,state:!0},_inputValue:{type:String,state:!0}};static styles=[ct,n`
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
    `}}customElements.define("themed-dialog",ee);const se={online:"#04d65c",offline:"#ef5350",warning:"#ffb74d",inferred:"#00D4FF",unknown:"#666"};class ie extends dt{static properties={topology:{type:Object},layouts:{type:Object},selectedLayout:{type:String},editMode:{type:Boolean},linkMode:{type:Boolean},selectedNode:{type:String},nodePositions:{type:Object},manualEdges:{type:Array},_dragging:{type:String,state:!0},_linkSource:{type:String,state:!0},_error:{type:String,state:!0},_loading:{type:Boolean,state:!0},_selectedEdge:{type:Number,state:!0},_selectedDeviceData:{type:Object,state:!0},_dirty:{type:Boolean,state:!0},_layoutDropdownOpen:{type:Boolean,state:!0},_showLabelDialog:{type:Boolean,state:!0},_labelEdgeIndex:{type:Number,state:!0},hideAutoEdges:{type:Boolean},_viewBox:{type:Object,state:!0}};static styles=[ct,n`
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
  `];constructor(){super(),this.topology={nodes:[],edges:[]},this.layouts={},this.selectedLayout="",this.editMode=!1,this.linkMode=!1,this.selectedNode=null,this.nodePositions={},this.manualEdges=[],this._dragging=null,this._dragOffset={x:0,y:0},this._linkSource=null,this._error="",this._loading=!0,this._selectedEdge=-1,this._selectedDeviceData=null,this._commandResult="",this._dirty=!1,this._layoutDropdownOpen=!1,this._showLabelDialog=!1,this._labelEdgeIndex=-1,this._savedPositions=null,this._savedManualEdges=null,this.hideAutoEdges=!1,this._viewBox={x:0,y:0,width:900,height:500},this._isPanning=!1,this._panStart=null,this._pinchActive=!1,this._pinchAnchor0=null,this._pinchAnchor1=null,this._pinchPrevDist=0}connectedCallback(){super.connectedCallback(),this._loadTopology(),this._loadLayouts(),this._wsUnsub=pt.onMessage(t=>{"device_update"===t.type&&this._refreshNodeStatuses()}),this._onDocClick=t=>{if(this._layoutDropdownOpen){const e=this.shadowRoot?.querySelector(".layout-dropdown");e&&!t.composedPath().includes(e)&&(this._layoutDropdownOpen=!1)}},document.addEventListener("click",this._onDocClick)}disconnectedCallback(){super.disconnectedCallback(),this._wsUnsub&&this._wsUnsub(),this._onDocClick&&document.removeEventListener("click",this._onDocClick)}async _refreshNodeStatuses(){try{const t=await St();if(!t||!t.nodes)return;const e={};for(const s of t.nodes)e[s.id]=s.status;if(this.topology&&this.topology.nodes){let s=!1;const i=this.topology.nodes.map(t=>e[t.id]&&e[t.id]!==t.status?(s=!0,{...t,status:e[t.id]}):t);for(const e of t.nodes)this.topology.nodes.find(t=>t.id===e.id)||(i.push(e),s=!0);s&&(this.topology={...this.topology,nodes:i})}}catch(t){}}async _loadTopology(){try{this._loading=!0,this._error="";const t=await St();this.topology=t,this._autoLayout(),this._loading=!1}catch(t){console.error("Failed to load topology:",t),this._error=`Failed to load: ${t.message}`,this._loading=!1}}async _loadLayouts(){try{if(this.layouts=await Et(),!this._layoutsLoaded){this._layoutsLoaded=!0;const t=Object.entries(this.layouts).find(([,t])=>t.isDefault);t&&(this.selectedLayout=t[0],this.nodePositions=t[1].positions||{},this.manualEdges=t[1].manualEdges||[],this.hideAutoEdges=t[1].hideAutoEdges||!1,t[1].viewBox&&(this._viewBox={...t[1].viewBox}))}}catch(t){console.error("Failed to load layouts:",t)}}_autoLayout(){const t=this.topology.nodes;if(!t.length)return;const e={...this.selectedLayout&&this.layouts[this.selectedLayout]&&this.layouts[this.selectedLayout].positions||{}},s=Math.ceil(Math.sqrt(t.length));t.forEach((t,i)=>{if(!e[t.id]){const o=i%s,n=Math.floor(i/s);e[t.id]={x:100+o*(800/(s+1)),y:80+100*n}}}),this.nodePositions=e,this.selectedLayout&&this.layouts[this.selectedLayout]&&(this.manualEdges=this.layouts[this.selectedLayout].manualEdges||[]),this._fitAll()}get _allEdges(){const t=this.hideAutoEdges?[]:this.topology.edges||[],e=this.manualEdges.map(t=>({...t,type:"manual"}));return[...t,...e]}_getNodeName(t){const e=this.topology.nodes.find(e=>e.id===t);return e&&e.name||t}render(){if(this._loading&&!this.topology.nodes.length)return B`<div style="padding: 40px; text-align: center; color: #fff;">Loading topology...</div>`;if(this._error)return B`<div style="padding: 40px; text-align: center; color: #ef5350;">${this._error}</div>`;const t=this.topology.nodes,e=this._allEdges,s=t.filter(t=>"online"===t.status).length,i=t.filter(t=>"offline"===t.status).length,o=t.filter(t=>"warning"===t.status).length;return B`
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
    `}_renderNode(t){const e=this.nodePositions[t.id]||{x:100,y:100},s=se[t.status]||se.unknown,i=this.selectedNode===t.id,o=this._linkSource===t.id,n=i||o?2.5:1.5,r=i?"4,2":o?"2,2":"none",a=o?"#ffb74d":s;return"gateway"===t.type?H`
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
    `}_edgeGeometry(t){const e=this.nodePositions[t.source],s=this.nodePositions[t.target];if(!e||!s)return null;const i=s.x-e.x,o=s.y-e.y,n=Math.sqrt(i*i+o*o)||1,r=i/n,a=o/n;let d=-a,l=r;l>0&&(d=-d,l=-l);const c=this._boxExitDistance(r,a);return{from:e,to:s,ux:r,uy:a,perpX:d,perpY:l,len:n,srcDist:c+8,tgtDist:c+8}}_boxExitDistance(t,e){if(Math.abs(t)<.001)return 22;if(Math.abs(e)<.001)return 48;const s=48/Math.abs(t),i=22/Math.abs(e);return Math.min(s,i)}_renderEdgeLine(t,e){const s=this._edgeGeometry(t);if(!s)return H``;const i="manual"===t.type,o=i?"#00D4FF":"#555",n=i&&this._selectedEdge===e-(this.topology.edges?.length||0)?2.5:1.5,r=i?"none":"4,2";return H`
      <line x1="${s.from.x}" y1="${s.from.y}" x2="${s.to.x}" y2="${s.to.y}"
        stroke="${o}" stroke-width="${n}"
        stroke-dasharray="${r}"
        @click=${i&&this.editMode?()=>this._selectEdge(e-(this.topology.edges?.length||0)):null}
        style="${i&&this.editMode?"cursor:pointer":""}"/>
    `}_renderEdgeLabels(t,e){if(!t.label&&!t.sourceLabel&&!t.targetLabel)return H``;const s=this._edgeGeometry(t);if(!s)return H``;const{from:i,to:o,ux:n,uy:r,perpX:a,perpY:d,srcDist:l,tgtDist:c}=s,p=i.x+n*l,h=i.y+r*l,u=o.x-n*c,g=o.y-r*c,m=(i.x+o.x)/2+14*a,f=(i.y+o.y)/2+14*d;return H`
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
    `}_onNodeClick(t,e){t.stopPropagation(),this.linkMode?this._handleLinkClick(e):this._selectNode(e)}_handleLinkClick(t){if(this._linkSource)if(this._linkSource===t)this._linkSource=null;else{const e=this.manualEdges.some(e=>e.source===this._linkSource&&e.target===t||e.source===t&&e.target===this._linkSource);e||(this.manualEdges=[...this.manualEdges,{source:this._linkSource,target:t,sourceLabel:"",label:"",targetLabel:""}],this._markDirty(),this._labelEdgeIndex=this.manualEdges.length-1,this._showLabelDialog=!0),this._linkSource=null}else this._linkSource=t}_enterEditMode(){this.editMode=!0,this._savedPositions=JSON.stringify(this.nodePositions),this._savedManualEdges=JSON.stringify(this.manualEdges),this._dirty=!1}_exitEditMode(){this.editMode=!1,this.linkMode=!1,this._linkSource=null,this._selectedEdge=-1,this._dirty=!1}_markDirty(){this.editMode&&(this._dirty=!0)}async _doneEditing(){if(this.selectedLayout)await this._saveToCurrentLayout(),this._exitEditMode();else{const t=this.shadowRoot.querySelector("themed-dialog"),e=await t.show({type:"prompt",title:"Save Layout",message:"Enter a name for this layout:",placeholder:"My Layout"});if(!e)return;await this._saveNewLayout(e),this._exitEditMode()}}_discardAndExit(){this._savedPositions&&(this.nodePositions=JSON.parse(this._savedPositions)),this._savedManualEdges&&(this.manualEdges=JSON.parse(this._savedManualEdges)),this._exitEditMode()}async _saveAsLayout(){const t=this.shadowRoot.querySelector("themed-dialog"),e=await t.show({type:"prompt",title:"Save As New Layout",message:"Enter a name for the new layout:",placeholder:"Layout copy"});e&&await this._saveNewLayout(e)}async _saveToCurrentLayout(){if(!this.selectedLayout||!this.layouts[this.selectedLayout])return;const t=this.layouts[this.selectedLayout];await Ct({id:this.selectedLayout,name:t.name,positions:this.nodePositions,manualEdges:this.manualEdges,hideAutoEdges:this.hideAutoEdges,viewBox:this._viewBox,isDefault:t.isDefault||!1}),await this._loadLayouts(),this._dirty=!1,this._savedPositions=JSON.stringify(this.nodePositions),this._savedManualEdges=JSON.stringify(this.manualEdges)}async _saveNewLayout(t){const e=await Ct({name:t,positions:this.nodePositions,manualEdges:this.manualEdges,hideAutoEdges:this.hideAutoEdges,viewBox:this._viewBox,isDefault:!1});this.selectedLayout=e.id,await this._loadLayouts(),this._dirty=!1,this._savedPositions=JSON.stringify(this.nodePositions),this._savedManualEdges=JSON.stringify(this.manualEdges)}_selectLayout(t){if(this._layoutDropdownOpen=!1,this.selectedLayout=t,t&&this.layouts[t]){const e=this.layouts[t];this.nodePositions=e.positions||{},this.manualEdges=e.manualEdges||[],this.hideAutoEdges=e.hideAutoEdges||!1,e.viewBox?this._viewBox=this._adaptViewBox(e.viewBox):this._fitAll()}else this.nodePositions={},this.manualEdges=[],this.hideAutoEdges=!1,this._autoLayout()}_createNewLayout(){this._layoutDropdownOpen=!1,this.selectedLayout="",this.nodePositions={},this.manualEdges=[],this.hideAutoEdges=!1,this._autoLayout(),this._enterEditMode()}_toggleLinkMode(){this.linkMode=!this.linkMode,this._linkSource=null,this.linkMode&&(this.selectedNode=null)}async _selectNode(t){if(this.selectedNode===t)return this.selectedNode=null,this._selectedDeviceData=null,void(this._commandResult="");this.selectedNode=t,this._selectedDeviceData=null,this._commandResult="";try{this._selectedDeviceData=await fetchDevice(t)}catch(t){this._selectedDeviceData={status:"inferred",attributes:{},tags:[]}}}async _sendCmd(t){if(this.selectedNode)try{this._commandResult=`Sending ${t}...`;const e=await sendCommand(this.selectedNode,t);this._commandResult=`Sent (request: ${e.request_id})`}catch(t){this._commandResult=`Error: ${t.message}`}}_selectEdge(t){this._selectedEdge=this._selectedEdge===t?-1:t}_labelEdge(t){this._labelEdgeIndex=t,this._showLabelDialog=!0}_saveLabelDialog(){const t=this.shadowRoot.querySelector(".label-dialog"),e=t.querySelector("#source-label").value,s=t.querySelector("#link-label").value,i=t.querySelector("#target-label").value,o=[...this.manualEdges];o[this._labelEdgeIndex]={...o[this._labelEdgeIndex],sourceLabel:e,label:s,targetLabel:i},this.manualEdges=o,this._markDirty(),this._showLabelDialog=!1,this._labelEdgeIndex=-1}_cancelLabelDialog(){this._showLabelDialog=!1,this._labelEdgeIndex=-1}_removeEdge(t){this.manualEdges=this.manualEdges.filter((e,s)=>s!==t),this._selectedEdge=-1,this._markDirty()}_onSvgMouseDown(t){if(!t.target.closest("g[transform]")){if(t.preventDefault(),this.linkMode)return this.linkMode=!1,this._linkSource=null,void(this._mousePos=null);this._isMousePanning=!0,this._mousePanStart={x:t.clientX,y:t.clientY},this._mousePanViewBox={...this._viewBox}}}_onMouseDown(t,e){this._dragging=e;const s=this.shadowRoot.querySelector("svg"),i=s.createSVGPoint();i.x=t.clientX,i.y=t.clientY;const o=i.matrixTransform(s.getScreenCTM().inverse()),n=this.nodePositions[e]||{x:0,y:0};this._dragOffset={x:o.x-n.x,y:o.y-n.y},t.preventDefault(),t.stopPropagation()}_onMouseMove(t){const e=this.shadowRoot.querySelector("svg"),s=e.createSVGPoint();s.x=t.clientX,s.y=t.clientY;const i=s.matrixTransform(e.getScreenCTM().inverse());if(this.linkMode&&this._linkSource&&(this._mousePos={x:i.x,y:i.y},this.requestUpdate()),this._isMousePanning){const s=e.getScreenCTM(),i=(t.clientX-this._mousePanStart.x)/s.a,o=(t.clientY-this._mousePanStart.y)/s.d;return void(this._viewBox={...this._mousePanViewBox,x:this._mousePanViewBox.x-i,y:this._mousePanViewBox.y-o})}this._dragging&&(this.nodePositions={...this.nodePositions,[this._dragging]:{x:i.x-this._dragOffset.x,y:i.y-this._dragOffset.y}})}_onWheel(t){if(!t.ctrlKey)return;t.preventDefault();const e=t.deltaY>0?1.1:.9;this._zoomAt(t.clientX,t.clientY,e)}_zoomAt(t,e,s){const i=this.shadowRoot.querySelector("svg");if(!i)return;const o=i.createSVGPoint();o.x=t,o.y=e;const n=o.matrixTransform(i.getScreenCTM().inverse()),r={...this._viewBox},a=Math.max(300,Math.min(2700,r.width*s)),d=Math.max(167,Math.min(1500,r.height*s)),l=a/r.width,c=d/r.height;r.x=n.x-(n.x-r.x)*l,r.y=n.y-(n.y-r.y)*c,r.width=a,r.height=d,this._viewBox=r}_zoomIn(){const t=this.shadowRoot.querySelector("svg")?.getBoundingClientRect();t&&this._zoomAt(t.left+t.width/2,t.top+t.height/2,.8)}_zoomOut(){const t=this.shadowRoot.querySelector("svg")?.getBoundingClientRect();t&&this._zoomAt(t.left+t.width/2,t.top+t.height/2,1.25)}_adaptViewBox(t){const e=this.shadowRoot?.querySelector(".canvas-container");if(!e||!e.clientWidth||!e.clientHeight)return{...t};const s=e.clientWidth/e.clientHeight,i=t.x+t.width/2,o=t.y+t.height/2,n=t.width*t.height,r=Math.sqrt(n*s),a=r/s;return{x:i-r/2,y:o-a/2,width:r,height:a}}_fitAll(){const t=Object.values(this.nodePositions);if(!t.length)return;const e=t.map(t=>t.x),s=t.map(t=>t.y),i=Math.min(...e)-80,o=Math.min(...s)-80,n=Math.max(...e)-Math.min(...e)+160,r=Math.max(...s)-Math.min(...s)+160,a=this.shadowRoot?.querySelector(".canvas-container");if(a&&a.clientWidth&&a.clientHeight){const t=a.clientWidth/a.clientHeight;let e=n,s=r;n/r<t?e=r*t:s=n/t,this._viewBox={x:i-(e-n)/2,y:o-(s-r)/2,width:e,height:s}}else this._viewBox={x:i,y:o,width:n,height:r}}_clientToSvg(t,e){const s=this.shadowRoot.querySelector("svg");if(!s)return null;const i=s.createSVGPoint();return i.x=t,i.y=e,i.matrixTransform(s.getScreenCTM().inverse())}_onTouchStart(t){if(2===t.touches.length){t.preventDefault();const e=t.touches[0].clientX-t.touches[1].clientX,s=t.touches[0].clientY-t.touches[1].clientY;return this._pinchPrevDist=Math.sqrt(e*e+s*s),this._pinchActive=!0,this._pinchAnchor0=this._clientToSvg(t.touches[0].clientX,t.touches[0].clientY),this._pinchAnchor1=this._clientToSvg(t.touches[1].clientX,t.touches[1].clientY),this._isPanning=!1,void(this._panStart=null)}if(1===t.touches.length){if(this.linkMode&&!t.target.closest("g[transform]"))return this.linkMode=!1,this._linkSource=null,void(this._mousePos=null);const e=t.touches[0];this._isPanning=!0,this._panStart={x:e.clientX,y:e.clientY,vbX:this._viewBox.x,vbY:this._viewBox.y}}}_onTouchMove(t){if(2===t.touches.length&&this._pinchActive){if(t.preventDefault(),!this._pinchAnchor0||!this._pinchAnchor1)return;const e=t.touches[0].clientX-t.touches[1].clientX,s=t.touches[0].clientY-t.touches[1].clientY,i=Math.sqrt(e*e+s*s);if(!this._pinchPrevDist||0===i)return void(this._pinchPrevDist=i);const o=this._pinchPrevDist/i,n=(this._pinchAnchor0.x+this._pinchAnchor1.x)/2,r=(this._pinchAnchor0.y+this._pinchAnchor1.y)/2,a=this._viewBox,d=Math.max(300,Math.min(2700,a.width*o)),l=d/a.width,c=Math.max(167,Math.min(1500,a.height*l));let p=n-(n-a.x)*l,h=r-(r-a.y)*(c/a.height);const u=this.shadowRoot.querySelector("svg");if(u){const e=u.getBoundingClientRect();if(e.width>0&&e.height>0){const s=(t.touches[0].clientX+t.touches[1].clientX)/2,i=(t.touches[0].clientY+t.touches[1].clientY)/2;p=n-(s-e.left)*(d/e.width),h=r-(i-e.top)*(c/e.height)}}if(this._viewBox={x:p,y:h,width:d,height:c},u){const e=u.getBoundingClientRect();if(e.width>0&&e.height>0){const s=t=>p+(t-e.left)*(d/e.width),i=t=>h+(t-e.top)*(c/e.height);this._pinchAnchor0={x:s(t.touches[0].clientX),y:i(t.touches[0].clientY)},this._pinchAnchor1={x:s(t.touches[1].clientX),y:i(t.touches[1].clientY)}}}return void(this._pinchPrevDist=i)}if(1===t.touches.length&&this._dragging){t.preventDefault();const e=t.touches[0],s=this._clientToSvg(e.clientX,e.clientY);if(!s)return;return void(this.nodePositions={...this.nodePositions,[this._dragging]:{x:s.x-this._dragOffset.x,y:s.y-this._dragOffset.y}})}if(1===t.touches.length&&this._isPanning&&this._panStart){const e=t.touches[0],s=this.shadowRoot.querySelector("svg");if(!s)return;const i=s.getScreenCTM(),o=(e.clientX-this._panStart.x)/i.a,n=(e.clientY-this._panStart.y)/i.d;this._viewBox={...this._viewBox,x:this._panStart.vbX-o,y:this._panStart.vbY-n}}}_onTouchEnd(t){if(t.touches.length<2&&(this._pinchActive=!1,this._pinchPrevDist=0,this._pinchAnchor0=null,this._pinchAnchor1=null,1===t.touches.length&&!this._dragging)){const e=t.touches[0];this._isPanning=!0,this._panStart={x:e.clientX,y:e.clientY,vbX:this._viewBox.x,vbY:this._viewBox.y}}0===t.touches.length&&(this._dragging&&this._markDirty(),this._dragging=null,this._isPanning=!1,this._panStart=null)}_onTouchNodeStart(t,e){if(1!==t.touches.length)return;t.stopPropagation(),this._isPanning=!1;const s=t.touches[0],i=this._clientToSvg(s.clientX,s.clientY);if(!i)return;const o=this.nodePositions[e]||{x:0,y:0};this._dragOffset={x:i.x-o.x,y:i.y-o.y},this._dragging=e}_onMouseUp(){this._dragging&&this._markDirty(),this._dragging=null,this._isMousePanning=!1}async _setAsDefault(){if(!this.selectedLayout)return;for(const[t,e]of Object.entries(this.layouts))e.isDefault&&(e.isDefault=!1,await Ct(e));const t=this.layouts[this.selectedLayout];t&&(t.isDefault=!0,await Ct(t)),await this._loadLayouts(),this._layoutsLoaded=!0}async _deleteCurrentLayout(){if(!this.selectedLayout)return;const t=this.layouts[this.selectedLayout]?.name||this.selectedLayout,e=this.shadowRoot.querySelector("themed-dialog");await e.show({type:"confirm",title:"Delete Layout",message:`Delete "${t}"? This cannot be undone.`,confirmLabel:"Delete",confirmDanger:!0})&&(await Dt(this.selectedLayout),this.selectedLayout="",this.nodePositions={},this.manualEdges=[],this.hideAutoEdges=!1,this._dirty=!1,await this._loadLayouts(),this._autoLayout())}}customElements.define("topology-view",ie);const oe={online:"#04d65c",offline:"#ef5350",warning:"#ffb74d",critical:"#ef5350",unknown:"#666"};class ne extends dt{static properties={device:{type:Object},deviceId:{type:String}};static styles=[ct,n`
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
  `];render(){if(!this.device)return B``;const t=this.device,e=oe[t.status]||oe.unknown,s=Object.entries(t.attributes||{}),i=t.hidden_attributes||[],o=t.card_attributes||[];let n;n=o.length>0?o.map(t=>s.find(([e])=>e===t)).filter(Boolean):s.filter(([t])=>!i.includes(t)).slice(0,4);const r=t.attribute_transforms||{},a=[...t.tags||[],...t.server_tags||[]],d=t.device_name||this.deviceId;return this.style.setProperty("--status-color",e),this.setAttribute("role","button"),this.setAttribute("tabindex","0"),this.setAttribute("aria-label",`${d}, ${t.status||"unknown"}`),B`
      <div class="header">
        <span class="name">${d}</span>
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
    `}_isWarning(t,e){const s={cpu_usage:90,memory_usage:90,disk_usage:95,cpu_temp:80};return s[t]&&e.value>s[t]}}customElements.define("device-card",ne);class re extends dt{static properties={devices:{type:Object},filter:{type:String},selectedTags:{type:Array},viewMode:{type:String},_groups:{type:Object,state:!0},_collapsedGroups:{type:Object,state:!0},_selectedUngrouped:{type:Array,state:!0},_selectedGrouped:{type:Object,state:!0}};static styles=[ct,n`
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
  `];constructor(){super(),this.devices={},this.filter="all",this.selectedTags=[],this.viewMode="all",this._groups={},this._collapsedGroups={},this._selectedUngrouped=[],this._selectedGrouped={},this._wsUnsub=null,this._lastFetchTime=0}connectedCallback(){super.connectedCallback(),this._loadDevices(),this._loadGroups(),this._wsUnsub=pt.onMessage(t=>{"device_update"===t.type&&(this.devices={...this.devices,[t.device_id]:t.device},this.requestUpdate())})}disconnectedCallback(){super.disconnectedCallback(),this._wsUnsub&&this._wsUnsub()}async _loadDevices(){try{const t=await vt(this._lastFetchTime);t&&Object.keys(t).length>0?this.devices={...this.devices,...t}:0===this._lastFetchTime&&(this.devices=t||{}),this._lastFetchTime=Date.now()/1e3}catch(t){console.error("Failed to load devices:",t)}}async _loadGroups(){try{this._groups=await At()}catch(t){console.error("Failed to load groups:",t)}}get _filteredDevices(){let t=Object.entries(this.devices);return"all"!==this.filter&&(t="warning"===this.filter?t.filter(([,t])=>"warning"===t.status||"critical"===t.status):t.filter(([,t])=>t.status===this.filter)),this.selectedTags.length>0&&(t=t.filter(([,t])=>{const e=[...t.tags||[],...t.server_tags||[]];return this.selectedTags.some(t=>e.includes(t))})),t}get _counts(){const t=Object.values(this.devices);return{all:t.length,online:t.filter(t=>"online"===t.status).length,offline:t.filter(t=>"offline"===t.status).length,warning:t.filter(t=>"warning"===t.status||"critical"===t.status).length}}_onTagAdd(t){const e=t.detail.tag;this.selectedTags.includes(e)||(this.selectedTags=[...this.selectedTags,e])}_onTagRemove(t){this.selectedTags=this.selectedTags.filter(e=>e!==t.detail.tag)}render(){const t=this._counts;return B`
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
    `}_toggleGroupCollapse(t){this._collapsedGroups={...this._collapsedGroups,[t]:!this._collapsedGroups[t]}}_selectDevice(t){this.dispatchEvent(new CustomEvent("device-select",{detail:{deviceId:t},bubbles:!0,composed:!0}))}_editGroupPolicy(t){this.dispatchEvent(new CustomEvent("group-edit",{detail:{groupId:t},bubbles:!0,composed:!0}))}_toggleUngroupedSelection(t){this._selectedUngrouped.includes(t)?this._selectedUngrouped=this._selectedUngrouped.filter(e=>e!==t):this._selectedUngrouped=[...this._selectedUngrouped,t]}async _createNewGroupFromSelected(){const t=prompt("Enter group name:");if(!t)return;const e=t.toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_|_$/g,"");try{await zt(e,t,this._selectedUngrouped),this._selectedUngrouped=[],this._loadGroups()}catch(t){console.error("Failed to create group:",t)}}async _deleteGroup(t,e){if(confirm(`Delete group "${e}"? Devices will be ungrouped.`))try{await Nt(t),this._loadGroups()}catch(t){console.error("Failed to delete group:",t)}}_toggleGroupedSelection(t,e){const s=this._selectedGrouped[t]||[],i=s.includes(e)?s.filter(t=>t!==e):[...s,e];this._selectedGrouped={...this._selectedGrouped,[t]:i}}async _removeSelectedFromGroup(t){const e=this._groups[t];if(!e)return;const s=this._selectedGrouped[t]||[],i=(e.device_ids||[]).filter(t=>!s.includes(t));try{await Ft(t,{...e,device_ids:i}),this._selectedGrouped={...this._selectedGrouped,[t]:[]},this._loadGroups()}catch(t){console.error("Failed to remove devices from group:",t)}}async _addSelectedToGroup(){const t=this.shadowRoot.querySelector("#group-assign-select");if(!t)return;const e=t.value,s=this._groups[e];if(!s)return;const i=[...new Set([...s.device_ids||[],...this._selectedUngrouped])];try{await Ft(e,{...s,device_ids:i}),this._selectedUngrouped=[],this._loadGroups()}catch(t){console.error("Failed to add devices to group:",t)}}}customElements.define("dashboard-view",re);class ae extends dt{static properties={_tags:{type:Array,state:!0},_loading:{type:Boolean,state:!0},_newTagName:{type:String,state:!0},_renamingTag:{type:String,state:!0},_renameValue:{type:String,state:!0},_selectedTags:{type:Object,state:!0}};static styles=[ct,n`
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
    `}_toggleTagSelection(t){const e=new Set(this._selectedTags);e.has(t)?e.delete(t):e.add(t),this._selectedTags=e}async _deleteSelectedTags(){const t=[...this._selectedTags];if(confirm(`Delete ${t.length} tag${1!==t.length?"s":""}?`)){for(const e of t)try{await It(e)}catch(t){console.error(t)}this._selectedTags=new Set,await this._loadTags()}}_startRename(t){this._renamingTag=t,this._renameValue=t}_cancelRename(){this._renamingTag=null,this._renameValue=""}async _saveRename(t){const e=this._renameValue.trim();if(e&&e!==t){try{await Gt(t,e),await this._loadTags()}catch(t){console.error("Failed to rename tag:",t)}this._cancelRename()}else this._cancelRename()}async _createTag(){const t=this._newTagName.trim();if(t)try{await Ot(t),this._newTagName="",await this._loadTags()}catch(t){console.error("Failed to create tag:",t)}}async _deleteTag(t){const e=this._tags.find(e=>e.tag===t);if(!(e&&e.count>0)||confirm(`"${t}" is used by ${e.count} device(s). Delete anyway?`))try{await It(t),await this._loadTags()}catch(t){console.error("Failed to delete tag:",t)}}}customElements.define("tag-registry-settings",ae);const de={attr:"",value:""},le={name:"",expression:""};class ce extends dt{static properties={_settings:{type:Object,state:!0},_loading:{type:Boolean,state:!0},_savingSettings:{type:Boolean,state:!0},_settingsSaved:{type:Boolean,state:!0},_editingTransformIndex:{type:Number,state:!0},_transformError:{type:String,state:!0},_importStatus:{type:String,state:!0}};static styles=[ct,n`
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
      ${this._renderCustomTransforms()}
      ${this._renderGlobalDefaults()}
      ${this._renderDeviceManagement()}
      ${this._renderExportImport()}
    `}_renderCustomTransforms(){const t=(this._settings||{}).custom_transforms||[],e=le;return B`
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
            @input=${t=>{le.name=t.target.value,this.requestUpdate()}}>
          <input class="small-input" type="text" placeholder="Expression (e.g. value * 1.8 + 32)"
            style="flex: 1; min-width: 200px;"
            .value=${e.expression}
            @input=${t=>{le.expression=t.target.value,this.requestUpdate()}}>
          <button class="small-btn" @click=${this._addCustomTransform.bind(this)}>${this._editingTransformIndex>=0?"Save":"Add"}</button>
          ${this._editingTransformIndex>=0?B`<button class="small-btn" style="background: rgba(255,255,255,0.1); color: #fff;" @click=${()=>this._cancelEditTransform()}>Cancel</button>`:""}
        </div>

        ${this._transformError?B`<div style="font-size: 11px; color: #ef5350; margin-top: 6px;">${this._transformError}</div>`:""}
      </div>
    `}_editCustomTransform(t){const e=((this._settings||{}).custom_transforms||[])[t];e&&(le.name=e.name,le.expression=e.expression,this._editingTransformIndex=t,this._transformError="",this.requestUpdate())}_cancelEditTransform(){le.name="",le.expression="",this._editingTransformIndex=-1,this._transformError="",this.requestUpdate()}_addCustomTransform(){const t=(le.name||"").trim(),e=(le.expression||"").trim();if(this._transformError="",!t||!e)return void(this._transformError="Name and expression are required.");try{new Function("value","return ("+e+")")}catch(t){return void(this._transformError=`Invalid expression: ${t.message}`)}const s=this._settings||{},i=[...s.custom_transforms||[]];if(this._editingTransformIndex>=0)i[this._editingTransformIndex]={...i[this._editingTransformIndex],name:t,expression:e},this._editingTransformIndex=-1;else{const s="custom:"+t.toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_|_$/g,"");if(i.some(t=>t.id===s))return void(this._transformError="A transform with this name already exists.");i.push({id:s,name:t,expression:e})}this._settings={...s,custom_transforms:i},le.name="",le.expression="",this.requestUpdate(),this._saveSettings()}_removeCustomTransform(t){const e=this._settings||{},s=[...e.custom_transforms||[]];s.splice(t,1),this._settings={...e,custom_transforms:s},this._saveSettings()}_renderGlobalDefaults(){const t=(this._settings||{}).default_thresholds||{},e=de;return B`
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
            @input=${t=>{de.attr=t.target.value,this.requestUpdate()}}>
          <input class="small-input" type="number" placeholder="Value..."
            style="width: 90px;"
            .value=${e.value}
            @input=${t=>{de.value=t.target.value,this.requestUpdate()}}>
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
    `}_updateDefaultThreshold(t,e){const s=this._settings||{};this._settings={...s,default_thresholds:{...s.default_thresholds||{},[t]:""===e?null:Number(e)}}}_removeDefaultThreshold(t){const e=this._settings||{},s={...e.default_thresholds||{}};delete s[t],this._settings={...e,default_thresholds:s}}_addDefaultThreshold(){const t=(de.attr||"").trim(),e=(de.value||"").trim();t&&""!==e&&(this._updateDefaultThreshold(t,e),de.attr="",de.value="",this.requestUpdate())}_renderDeviceManagement(){const t=this._settings||{},e=t.device_cleanup_days??0,s=t.alert_cooldown_minutes??30;return B`
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
    `}async _exportSettings(){try{const t=await jt(),e=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),s=URL.createObjectURL(e),i=document.createElement("a");i.href=s,i.download=`mqtt-monitor-settings-${(new Date).toISOString().slice(0,10)}.json`,i.click(),URL.revokeObjectURL(s)}catch(t){console.error("Export failed:",t)}}async _importFile(t){const e=t.target.files[0];if(e){this._importStatus="";try{const t=await e.text(),s=JSON.parse(t);if(!s.version)return void(this._importStatus="Error: Invalid export file.");await Bt(s),this._importStatus="Imported successfully!",this._loadSettings(),setTimeout(()=>{this._importStatus=""},3e3)}catch(t){this._importStatus=`Error: ${t.message}`}t.target.value=""}}async _saveSettings(){this._savingSettings=!0,this._settingsSaved=!1;try{await Rt(this._settings),gt(this._settings.custom_transforms||[]),this._settingsSaved=!0,setTimeout(()=>{this._settingsSaved=!1},2e3)}catch(t){console.error("Failed to save settings:",t)}finally{this._savingSettings=!1}}}customElements.define("settings-view",ce);class pe extends dt{static properties={currentView:{type:String},selectedDevice:{type:String},selectedGroup:{type:String}};static styles=[ct,n`
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
    `}_onOverlayClick(){this.selectedDevice=null,this.selectedGroup=null}_onViewChange(t){this.currentView=t.detail.view,this.selectedDevice=null,this.selectedGroup=null}_onDeviceSelect(t){this.selectedDevice=t.detail.deviceId}_onGroupEdit(t){this.selectedGroup=t.detail.groupId}}customElements.define("network-monitor-app",pe);
//# sourceMappingURL=bundle.js.map
