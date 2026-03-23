/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,t=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),o=new WeakMap;let i=class{constructor(e,t,o){if(this._$cssResult$=!0,o!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const s=this.t;if(t&&void 0===e){const t=void 0!==s&&1===s.length;t&&(e=o.get(s)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&o.set(s,e))}return e}toString(){return this.cssText}};const r=(e,...t)=>{const o=1===e.length?e[0]:t.reduce((t,s,o)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+e[o+1],e[0]);return new i(o,e,s)},n=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const s of e.cssRules)t+=s.cssText;return(e=>new i("string"==typeof e?e:e+"",void 0,s))(t)})(e):e,{is:a,defineProperty:d,getOwnPropertyDescriptor:l,getOwnPropertyNames:c,getOwnPropertySymbols:p,getPrototypeOf:h}=Object,u=globalThis,g=u.trustedTypes,m=g?g.emptyScript:"",f=u.reactiveElementPolyfillSupport,b=(e,t)=>e,v={toAttribute(e,t){switch(t){case Boolean:e=e?m:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let s=e;switch(t){case Boolean:s=null!==e;break;case Number:s=null===e?null:Number(e);break;case Object:case Array:try{s=JSON.parse(e)}catch(e){s=null}}return s}},_=(e,t)=>!a(e,t),x={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:_};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let y=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=x){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const s=Symbol(),o=this.getPropertyDescriptor(e,s,t);void 0!==o&&d(this.prototype,e,o)}}static getPropertyDescriptor(e,t,s){const{get:o,set:i}=l(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:o,set(t){const r=o?.call(this);i?.call(this,t),this.requestUpdate(e,r,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??x}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const e=h(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const e=this.properties,t=[...c(e),...p(e)];for(const s of t)this.createProperty(s,e[s])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,s]of t)this.elementProperties.set(e,s)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const s=this._$Eu(e,t);void 0!==s&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const e of s)t.unshift(n(e))}else void 0!==e&&t.push(n(e));return t}static _$Eu(e,t){const s=t.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const s=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((s,o)=>{if(t)s.adoptedStyleSheets=o.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const t of o){const o=document.createElement("style"),i=e.litNonce;void 0!==i&&o.setAttribute("nonce",i),o.textContent=t.cssText,s.appendChild(o)}})(s,this.constructor.elementStyles),s}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ET(e,t){const s=this.constructor.elementProperties.get(e),o=this.constructor._$Eu(e,s);if(void 0!==o&&!0===s.reflect){const i=(void 0!==s.converter?.toAttribute?s.converter:v).toAttribute(t,s.type);this._$Em=e,null==i?this.removeAttribute(o):this.setAttribute(o,i),this._$Em=null}}_$AK(e,t){const s=this.constructor,o=s._$Eh.get(e);if(void 0!==o&&this._$Em!==o){const e=s.getPropertyOptions(o),i="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:v;this._$Em=o;const r=i.fromAttribute(t,e.type);this[o]=r??this._$Ej?.get(o)??r,this._$Em=null}}requestUpdate(e,t,s,o=!1,i){if(void 0!==e){const r=this.constructor;if(!1===o&&(i=this[e]),s??=r.getPropertyOptions(e),!((s.hasChanged??_)(i,t)||s.useDefault&&s.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,s))))return;this.C(e,t,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:s,reflect:o,wrapped:i},r){s&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,r??t??this[e]),!0!==i||void 0!==r)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),!0===o&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,s]of e){const{wrapped:e}=s,o=this[t];!0!==e||this._$AL.has(t)||void 0===o||this.C(t,void 0,s,o)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[b("elementProperties")]=new Map,y[b("finalized")]=new Map,f?.({ReactiveElement:y}),(u.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $=globalThis,w=e=>e,k=$.trustedTypes,S=k?k.createPolicy("lit-html",{createHTML:e=>e}):void 0,C="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,D="?"+E,A=`<${D}>`,F=document,T=()=>F.createComment(""),z=e=>null===e||"object"!=typeof e&&"function"!=typeof e,G=Array.isArray,N="[ \t\n\f\r]",O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,P=/-->/g,L=/>/g,j=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),M=/'/g,I=/"/g,U=/^(?:script|style|textarea|title)$/i,R=e=>(t,...s)=>({_$litType$:e,strings:t,values:s}),H=R(1),B=R(2),V=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),J=new WeakMap,W=F.createTreeWalker(F,129);function K(e,t){if(!G(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(t):t}const Y=(e,t)=>{const s=e.length-1,o=[];let i,r=2===t?"<svg>":3===t?"<math>":"",n=O;for(let t=0;t<s;t++){const s=e[t];let a,d,l=-1,c=0;for(;c<s.length&&(n.lastIndex=c,d=n.exec(s),null!==d);)c=n.lastIndex,n===O?"!--"===d[1]?n=P:void 0!==d[1]?n=L:void 0!==d[2]?(U.test(d[2])&&(i=RegExp("</"+d[2],"g")),n=j):void 0!==d[3]&&(n=j):n===j?">"===d[0]?(n=i??O,l=-1):void 0===d[1]?l=-2:(l=n.lastIndex-d[2].length,a=d[1],n=void 0===d[3]?j:'"'===d[3]?I:M):n===I||n===M?n=j:n===P||n===L?n=O:(n=j,i=void 0);const p=n===j&&e[t+1].startsWith("/>")?" ":"";r+=n===O?s+A:l>=0?(o.push(a),s.slice(0,l)+C+s.slice(l)+E+p):s+E+(-2===l?t:p)}return[K(e,r+(e[s]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),o]};class X{constructor({strings:e,_$litType$:t},s){let o;this.parts=[];let i=0,r=0;const n=e.length-1,a=this.parts,[d,l]=Y(e,t);if(this.el=X.createElement(d,s),W.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(o=W.nextNode())&&a.length<n;){if(1===o.nodeType){if(o.hasAttributes())for(const e of o.getAttributeNames())if(e.endsWith(C)){const t=l[r++],s=o.getAttribute(e).split(E),n=/([.?@])?(.*)/.exec(t);a.push({type:1,index:i,name:n[2],strings:s,ctor:"."===n[1]?se:"?"===n[1]?oe:"@"===n[1]?ie:te}),o.removeAttribute(e)}else e.startsWith(E)&&(a.push({type:6,index:i}),o.removeAttribute(e));if(U.test(o.tagName)){const e=o.textContent.split(E),t=e.length-1;if(t>0){o.textContent=k?k.emptyScript:"";for(let s=0;s<t;s++)o.append(e[s],T()),W.nextNode(),a.push({type:2,index:++i});o.append(e[t],T())}}}else if(8===o.nodeType)if(o.data===D)a.push({type:2,index:i});else{let e=-1;for(;-1!==(e=o.data.indexOf(E,e+1));)a.push({type:7,index:i}),e+=E.length-1}i++}}static createElement(e,t){const s=F.createElement("template");return s.innerHTML=e,s}}function Z(e,t,s=e,o){if(t===V)return t;let i=void 0!==o?s._$Co?.[o]:s._$Cl;const r=z(t)?void 0:t._$litDirective$;return i?.constructor!==r&&(i?._$AO?.(!1),void 0===r?i=void 0:(i=new r(e),i._$AT(e,s,o)),void 0!==o?(s._$Co??=[])[o]=i:s._$Cl=i),void 0!==i&&(t=Z(e,i._$AS(e,t.values),i,o)),t}class Q{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:s}=this._$AD,o=(e?.creationScope??F).importNode(t,!0);W.currentNode=o;let i=W.nextNode(),r=0,n=0,a=s[0];for(;void 0!==a;){if(r===a.index){let t;2===a.type?t=new ee(i,i.nextSibling,this,e):1===a.type?t=new a.ctor(i,a.name,a.strings,this,e):6===a.type&&(t=new re(i,this,e)),this._$AV.push(t),a=s[++n]}r!==a?.index&&(i=W.nextNode(),r++)}return W.currentNode=F,o}p(e){let t=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}}class ee{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,s,o){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Z(this,e,t),z(e)?e===q||null==e||""===e?(this._$AH!==q&&this._$AR(),this._$AH=q):e!==this._$AH&&e!==V&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>G(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==q&&z(this._$AH)?this._$AA.nextSibling.data=e:this.T(F.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:s}=e,o="number"==typeof s?this._$AC(e):(void 0===s.el&&(s.el=X.createElement(K(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===o)this._$AH.p(t);else{const e=new Q(o,this),s=e.u(this.options);e.p(t),this.T(s),this._$AH=e}}_$AC(e){let t=J.get(e.strings);return void 0===t&&J.set(e.strings,t=new X(e)),t}k(e){G(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let s,o=0;for(const i of e)o===t.length?t.push(s=new ee(this.O(T()),this.O(T()),this,this.options)):s=t[o],s._$AI(i),o++;o<t.length&&(this._$AR(s&&s._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=w(e).nextSibling;w(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class te{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,o,i){this.type=1,this._$AH=q,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=i,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=q}_$AI(e,t=this,s,o){const i=this.strings;let r=!1;if(void 0===i)e=Z(this,e,t,0),r=!z(e)||e!==this._$AH&&e!==V,r&&(this._$AH=e);else{const o=e;let n,a;for(e=i[0],n=0;n<i.length-1;n++)a=Z(this,o[s+n],t,n),a===V&&(a=this._$AH[n]),r||=!z(a)||a!==this._$AH[n],a===q?e=q:e!==q&&(e+=(a??"")+i[n+1]),this._$AH[n]=a}r&&!o&&this.j(e)}j(e){e===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class se extends te{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===q?void 0:e}}class oe extends te{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==q)}}class ie extends te{constructor(e,t,s,o,i){super(e,t,s,o,i),this.type=5}_$AI(e,t=this){if((e=Z(this,e,t,0)??q)===V)return;const s=this._$AH,o=e===q&&s!==q||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,i=e!==q&&(s===q||o);o&&this.element.removeEventListener(this.name,this,s),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class re{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){Z(this,e)}}const ne=$.litHtmlPolyfillSupport;ne?.(X,ee),($.litHtmlVersions??=[]).push("3.3.2");const ae=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class de extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,s)=>{const o=s?.renderBefore??t;let i=o._$litPart$;if(void 0===i){const e=s?.renderBefore??null;o._$litPart$=i=new ee(t.insertBefore(T(),e),e,void 0,s??{})}return i._$AI(e),i})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return V}}de._$litElement$=!0,de.finalized=!0,ae.litElementHydrateSupport?.({LitElement:de});const le=ae.litElementPolyfillSupport;le?.({LitElement:de}),(ae.litElementVersions??=[]).push("4.2.2");const ce=new class{constructor(){this._ws=null,this._listeners=[],this._reconnectDelay=1e3}connect(){const e="https:"===location.protocol?"wss:":"ws:",t=location.pathname.match(/^(\/api\/hassio_ingress\/[^/]+)/),s=t?t[1]:"",o=`${e}//${location.host}${s}/api/ws`;this._ws=new WebSocket(o),this._ws.onmessage=e=>{try{const t=JSON.parse(e.data);this._listeners.forEach(e=>e(t))}catch(e){console.error("WebSocket parse error:",e)}},this._ws.onclose=()=>{setTimeout(()=>this.connect(),this._reconnectDelay),this._reconnectDelay=Math.min(2*this._reconnectDelay,3e4)},this._ws.onopen=()=>{this._reconnectDelay=1e3}}onMessage(e){return this._listeners.push(e),()=>{this._listeners=this._listeners.filter(t=>t!==e)}}disconnect(){this._ws&&this._ws.close()}};class pe extends de{static properties={currentView:{type:String}};static styles=r`
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
      color: #00D4FF;
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
      color: #00D4FF;
      background: rgba(0,212,255,0.1);
    }
    .version {
      font-size: 10px;
      color: #666;
      margin-left: auto;
    }
  `;render(){return H`
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
        <span class="version">v0.1.0 build ${"3/23 0:13"}</span>
      </nav>
    `}_navigate(e){this.dispatchEvent(new CustomEvent("view-change",{detail:{view:e}}))}}customElements.define("nav-bar",pe);const he=function(){const e=location.pathname.match(/^(\/api\/hassio_ingress\/[^/]+)/);return e?e[1]:""}();async function ue(e,t={}){const s=await fetch(e,t);if(!s.ok){const e=await s.text().catch(()=>s.statusText);throw new Error(`API error ${s.status}: ${e}`)}const o=s.headers.get("content-type");return o&&o.includes("application/json")?s.json():null}async function ge(e=0){return ue(e>0?`${he}/api/devices?since=${e}`:`${he}/api/devices`)}async function me(e){return ue(`${he}/api/devices/${e}`)}async function fe(e){return ue(`${he}/api/devices/${e}`,{method:"DELETE"})}async function be(e,t){return ue(`${he}/api/devices/${e}/attributes/${t}`,{method:"DELETE"})}async function ve(e,t){return ue(`${he}/api/devices/${e}/attributes/${t}/unhide`,{method:"POST"})}async function _e(e,t){return ue(`${he}/api/devices/${e}/commands/${t}`,{method:"DELETE"})}async function xe(e,t){return ue(`${he}/api/devices/${e}/commands/${t}/unhide`,{method:"POST"})}async function ye(){return ue(`${he}/api/topology`)}async function $e(){return ue(`${he}/api/topology/layouts`)}async function we(e){return ue(`${he}/api/topology/layouts`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}async function ke(e){return ue(`${he}/api/topology/layouts/${e}`,{method:"DELETE"})}async function Se(e,t,s={}){return ue(`${he}/api/devices/${e}/command`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({command:t,params:s})})}async function Ce(){return ue(`${he}/api/groups`)}async function Ee(e,t,s=[]){return ue(`${he}/api/groups`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:e,name:t,device_ids:s})})}async function De(e,{name:t,device_ids:s,custom_commands:o,custom_sensors:i,thresholds:r,hidden_commands:n}){return ue(`${he}/api/groups/${e}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:t,device_ids:s,custom_commands:o,custom_sensors:i,thresholds:r,hidden_commands:n})})}async function Ae(e){return ue(`${he}/api/groups/${e}`,{method:"DELETE"})}async function Fe(e,t){return ue(`${he}/api/devices/${e}/tags/add`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({tags:t})})}async function Te(e,t){return ue(`${he}/api/devices/${e}/tags/${t}`,{method:"DELETE"})}async function ze(){return ue(`${he}/api/tags`)}async function Ge(e){return ue(`${he}/api/tags`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({tag:e})})}async function Ne(e,t){return ue(`${he}/api/tags/${encodeURIComponent(e)}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({new_name:t})})}async function Oe(e){return ue(`${he}/api/tags/${encodeURIComponent(e)}`,{method:"DELETE"})}async function Pe(){return ue(`${he}/api/settings`)}async function Le(e){return ue(`${he}/api/settings`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}async function je(e){return ue(`${he}/api/devices/${e}/effective-settings`)}async function Me(e,t){return ue(`${he}/api/devices/${e}/settings`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})}async function Ie(e,t){return ue(`${he}/api/groups/${e}/push-config`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})}var Ue=Object.freeze({__proto__:null,addDeviceTags:Fe,addServerCommand:async function(e,t,s){return ue(`${he}/api/devices/${e}/server-commands`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:t,shell:s})})},addServerSensor:async function(e,t,s){return ue(`${he}/api/devices/${e}/server-sensors`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:t,...s})})},createGroup:Ee,createTag:Ge,deleteAttribute:be,deleteDevice:fe,deleteGroup:Ae,deleteLayout:ke,deleteTag:Oe,fetchDevice:me,fetchDevices:ge,fetchEffectiveSettings:je,fetchGroups:Ce,fetchLayouts:$e,fetchSettings:Pe,fetchTags:ze,fetchTopology:ye,hideCommand:_e,pushGroupConfig:Ie,removeDeviceTag:Te,removeServerCommand:async function(e,t){return ue(`${he}/api/devices/${e}/server-commands/${encodeURIComponent(t)}`,{method:"DELETE"})},removeServerSensor:async function(e,t){return ue(`${he}/api/devices/${e}/server-sensors/${encodeURIComponent(t)}`,{method:"DELETE"})},renameTag:Ne,saveLayout:we,sendCommand:Se,setDeviceInterval:async function(e,t){return ue(`${he}/api/devices/${e}/config-interval`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({interval:t})})},unhideAttribute:ve,unhideCommand:xe,updateDeviceSettings:Me,updateGroup:De,updateSettings:Le});class Re extends de{static properties={selectedTags:{type:Array},_allTags:{type:Array,state:!0},_open:{type:Boolean,state:!0},_showCreate:{type:Boolean,state:!0},_newTagName:{type:String,state:!0},_creating:{type:Boolean,state:!0}};static styles=r`
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
      background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px;
      min-width: 200px; max-height: 280px; overflow-y: auto;
      z-index: 200; box-shadow: 0 8px 24px rgba(0,0,0,0.4);
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
  `;constructor(){super(),this.selectedTags=[],this._allTags=[],this._open=!1,this._showCreate=!1,this._newTagName="",this._creating=!1,this._onDocClick=this._onDocClick.bind(this)}connectedCallback(){super.connectedCallback(),this._loadTags(),document.addEventListener("click",this._onDocClick)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._onDocClick)}async _loadTags(){try{const e=await ze();Array.isArray(e)&&(this._allTags=e.map(e=>"string"==typeof e?e:e.tag).sort())}catch(e){console.error("Failed to load tags:",e)}}_onDocClick(e){if(!this._open)return;e.composedPath().includes(this)||(this._open=!1,this._showCreate=!1)}_toggle(e){e.stopPropagation(),this._open=!this._open,this._open||(this._showCreate=!1)}_toggleTag(e){(this.selectedTags||[]).includes(e)?this.dispatchEvent(new CustomEvent("tag-remove",{detail:{tag:e},bubbles:!0,composed:!0})):this.dispatchEvent(new CustomEvent("tag-add",{detail:{tag:e},bubbles:!0,composed:!0}))}async _createTag(){const e=this._newTagName.trim();if(e&&!this._creating){this._creating=!0;try{await Ge(e),await this._loadTags(),this.dispatchEvent(new CustomEvent("tag-add",{detail:{tag:e},bubbles:!0,composed:!0})),this._newTagName="",this._showCreate=!1}catch(e){console.error("Failed to create tag:",e)}finally{this._creating=!1}}}render(){const e=this.selectedTags||[],t=e.length>0;return H`
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
    `}}customElements.define("tag-picker",Re);class He extends de{static properties={device:{type:Object},effectiveSettings:{type:Object},haOverrides:{type:Object},groups:{type:Object},cardAttributes:{type:Array},_showHidden:{type:Boolean,state:!0}};static styles=r`
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
  `;constructor(){super(),this.device=null,this.effectiveSettings=null,this.haOverrides={},this.groups={},this.cardAttributes=[],this._showHidden=!1}_isExposed(e){if(void 0!==this.haOverrides[e])return this.haOverrides[e];const t=this.effectiveSettings;return void 0===t?.ha_exposure_overrides?.[e]||t.ha_exposure_overrides[e]}_getThresholdForAttr(e){const t=this.effectiveSettings;if(!t)return null;const s=(t.thresholds||{})[e];if(null==s)return null;const o="object"==typeof s?s.value:s;if(null==o)return null;const i=this.device?.threshold_overrides||{},r=this.device?.group_policy,n=r?this.groups[r]:null;let a="global";return null!=i[e]?a="device":null!=n?.thresholds?.[e]&&(a="group"),{value:o,source:a}}_checkThreshold(e,t){if(!t||null==e||"number"!=typeof e)return!1;const s="object"==typeof t?t.value:t,o="object"==typeof t&&t.op||">";if(null==s)return!1;switch(o){case">":default:return e>s;case"<":return e<s;case">=":return e>=s;case"<=":return e<=s;case"==":return e===s;case"!=":return e!==s}}_getThresholdOp(e){const t=(this.device?.threshold_overrides||{})[e];if(null!=t&&"object"==typeof t)return t.op||">";const s=this.effectiveSettings;if(!s)return">";const o=(s.thresholds||{})[e];return null!=o&&"object"==typeof o&&o.op||">"}_getThresholdVal(e){const t=(this.device?.threshold_overrides||{})[e];if(null!=t)return"object"==typeof t?t.value:t;const s=this._getThresholdForAttr(e);return s?s.value:null}_getCritThresholdOp(e){const t=(this.device?.crit_threshold_overrides||{})[e];return null!=t&&"object"==typeof t&&t.op||">"}_getCritThresholdVal(e){const t=(this.device?.crit_threshold_overrides||{})[e];return null!=t?"object"==typeof t?t.value:t:null}render(){if(!this.device)return H``;const e=Object.entries(this.device.attributes||{}).sort(([e],[t])=>e.localeCompare(t)),t=this.device.hidden_attributes||[],s=e.filter(([e])=>!t.includes(e)),o=e.filter(([e])=>t.includes(e));return 0===e.length?H``:H`
      <div class="section">
        <div class="section-title">Attributes</div>
        <div class="attr-grid">
          ${s.map(([e,t])=>this._renderAttrTile(e,t))}
        </div>
        ${o.length>0?H`
          <div style="margin-top: 12px;">
            <div style="font-size: 10px; color: #fff; margin-bottom: 6px; cursor: pointer;"
              @click=${()=>this._showHidden=!this._showHidden}>
              ${this._showHidden?"▾":"▸"} ${o.length} hidden attribute${1!==o.length?"s":""}
            </div>
            ${this._showHidden?H`
              <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                ${o.map(([e])=>H`
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
    `}_renderAttrTile(e,t){const s=this._isExposed(e),o=this._getThresholdForAttr(e),i=null!=t.value?t.value:null,r=(this.device?.threshold_overrides||{})[e],n=null!=r?r:o?o.value:null,a=this._checkThreshold(i,n),d=this._getThresholdOp(e),l=this._getThresholdVal(e),c=(this.cardAttributes||[]).includes(e),p=this._getCritThresholdOp(e),h=this._getCritThresholdVal(e),u=this.device?.crit_threshold_overrides||{},g=null!=u[e]?u[e]:null,m=this._checkThreshold(i,g),f=m?"critical-val":a?"exceeded-val":"";return H`
      <div class="attr-tile ${s?"":"dimmed"} ${m?"critical":a?"exceeded":""}">
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
            aria-checked=${s?"true":"false"}
            aria-label="Expose ${e.replace(/_/g," ")} to Home Assistant"
            tabindex="0"
            @click=${()=>this._onToggleExposure(e)}
            @keydown=${t=>("Enter"===t.key||" "===t.key)&&this._onToggleExposure(e)}>
            <div class="toggle ${s?"on":"off"}">
              <div class="toggle-knob"></div>
            </div>
          </span>
        </div>
        <div class="attr-val ${s?"":"dimmed-val"} ${f}">
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
            ${o&&"device"!==o.source&&null==r?H`
              <span class="threshold-source">${o.source}</span>
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
    `}_onDelete(e){this.dispatchEvent(new CustomEvent("attribute-deleted",{detail:{name:e},bubbles:!0,composed:!0}))}_onUnhide(e){this.dispatchEvent(new CustomEvent("attribute-unhidden",{detail:{name:e},bubbles:!0,composed:!0}))}_onToggleExposure(e){this.dispatchEvent(new CustomEvent("ha-exposure-toggled",{detail:{name:e},bubbles:!0,composed:!0}))}_onThresholdChange(e,t,s){this.dispatchEvent(new CustomEvent("threshold-changed",{detail:{name:e,value:t,op:s},bubbles:!0,composed:!0}))}_onCritThresholdChange(e,t,s){this.dispatchEvent(new CustomEvent("crit-threshold-changed",{detail:{name:e,value:t,op:s},bubbles:!0,composed:!0}))}_togglePin(e){this.dispatchEvent(new CustomEvent("pin-attribute",{detail:{name:e,pinned:!(this.cardAttributes||[]).includes(e)},bubbles:!0,composed:!0}))}}customElements.define("device-attributes",He);const Be=["shutdown","halt","poweroff","destroy"];class Ve extends de{static properties={device:{type:Object},serverCommands:{type:Object},commandResult:{type:String},_showHiddenCmds:{type:Boolean,state:!0},_showAddCommand:{type:Boolean,state:!0},_editingCommandName:{type:String,state:!0},_editCommandForm:{type:Object,state:!0}};static styles=r`
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
  `;constructor(){super(),this.device=null,this.serverCommands={},this.commandResult="",this._showHiddenCmds=!1,this._showAddCommand=!1,this._editingCommandName=null,this._editCommandForm=null}render(){if(!this.device)return H``;const e=this.device.allowed_commands||[],t=this.serverCommands||{},s=Object.keys(t),o=[...new Set([...e,...s])],i=this.device.hidden_commands||[],r=o.filter(e=>!i.includes(e)),n=o.filter(e=>i.includes(e));return H`
      <div class="section">
        <div class="section-title">Commands</div>

        ${r.length>0?H`
          <div class="commands" style="margin-bottom: 12px;">
            ${r.map(e=>H`
              <span class="cmd-wrap">
                <button class="cmd-btn ${function(e){const t=e.toLowerCase();return Be.some(e=>t.includes(e))}(e)?"danger":""}"
                  @click=${()=>this._onSend(e)}>${e}</button>
                <span class="cmd-eye" title="Hide command"
                  @click=${t=>{t.stopPropagation(),this._onHide(e)}}>&#128065;</span>
              </span>
            `)}
          </div>
        `:""}
        ${this.commandResult?H`<div class="cmd-result">${this.commandResult}</div>`:""}

        ${s.length>0?H`
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
    `}_startAdd(){this._showAddCommand=!0,this._editingCommandName=null,this._editCommandForm={name:"",shell:""}}_startEdit(e,t){this._editingCommandName=e,this._showAddCommand=!1,this._editCommandForm={name:e,shell:t}}_saveForm(){const e=this._editCommandForm;if(!e)return;const t=(e.name||"").trim(),s=(e.shell||"").trim();t&&s&&(this.dispatchEvent(new CustomEvent("server-command-save",{detail:{name:t,shell:s,editing:this._editingCommandName},bubbles:!0,composed:!0})),this._cancelForm())}_cancelForm(){this._showAddCommand=!1,this._editingCommandName=null,this._editCommandForm=null}_onSend(e){this.dispatchEvent(new CustomEvent("command-send",{detail:{command:e},bubbles:!0,composed:!0}))}_onHide(e){this.dispatchEvent(new CustomEvent("command-hide",{detail:{name:e},bubbles:!0,composed:!0}))}_onUnhide(e){this.dispatchEvent(new CustomEvent("command-unhide",{detail:{name:e},bubbles:!0,composed:!0}))}_onRemove(e){this.dispatchEvent(new CustomEvent("server-command-remove",{detail:{name:e},bubbles:!0,composed:!0}))}}customElements.define("device-commands",Ve);class qe extends de{static properties={device:{type:Object},configInterval:{type:Number},customSensors:{type:Object},_showAddSensor:{type:Boolean,state:!0},_editSensorKey:{type:String,state:!0},_sensorForm:{type:Object,state:!0}};static styles=r`
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
  `;constructor(){super(),this.device=null,this.configInterval=30,this.customSensors={},this.pushing=!1,this.pushStatus="",this.lastPushed="",this._showAddSensor=!1,this._editSensorKey=null,this._sensorForm={name:"",command:"",interval:30,unit:""}}render(){if(!this.device)return H``;const e=this.device.remote_config||{},t=this.device.active_plugins||(e.plugins?Object.keys(e.plugins):[]),s=this.customSensors;return H`
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
          ${Object.keys(s).length>0?H`
            <table class="sensor-table">
              <thead>
                <tr>
                  <th>Name</th><th>Command</th><th>Interval</th><th>Unit</th><th></th>
                </tr>
              </thead>
              <tbody>
                ${Object.entries(s).map(([e,t])=>H`
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
    `}_startAdd(){this._showAddSensor=!0,this._editSensorKey=null,this._sensorForm={name:"",command:"",interval:30,unit:""}}_startEdit(e,t){this._editSensorKey=e,this._showAddSensor=!1,this._sensorForm={name:e,command:t.command,interval:t.interval||30,unit:t.unit||""}}_saveForm(){const{name:e,command:t,interval:s,unit:o}=this._sensorForm;e.trim()&&t.trim()&&(this.dispatchEvent(new CustomEvent("sensor-save",{detail:{key:e.trim(),sensor:{command:t,interval:s||30,unit:o},oldKey:this._editSensorKey},bubbles:!0,composed:!0})),this._cancelForm())}_cancelForm(){this._showAddSensor=!1,this._editSensorKey=null,this._sensorForm={name:"",command:"",interval:30,unit:""}}_onIntervalChange(e){this.dispatchEvent(new CustomEvent("interval-changed",{detail:{value:e},bubbles:!0,composed:!0}))}_onRemove(e){this.dispatchEvent(new CustomEvent("sensor-remove",{detail:{key:e},bubbles:!0,composed:!0}))}}customElements.define("device-config",qe);class Je extends de{static properties={deviceId:{type:String},device:{type:Object},commandResult:{type:String},_groups:{type:Object,state:!0},_effectiveSettings:{type:Object,state:!0},_haOverrides:{type:Object,state:!0},_configInterval:{type:Number,state:!0},_customSensors:{type:Object,state:!0},_showGroupDialog:{type:Boolean,state:!0},_newGroupName:{type:String,state:!0},_serverCommands:{type:Object,state:!0}};static styles=r`
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
  `;constructor(){super(),this.device=null,this.commandResult="",this._groups={},this._effectiveSettings=null,this._haOverrides={},this._configInterval=30,this._customSensors={},this._showGroupDialog=!1,this._newGroupName="",this._serverCommands={}}connectedCallback(){super.connectedCallback(),this._loadDevice(),this._loadGroups(),this._startPolling(),this._wsUnsub=ce.onMessage(e=>{"device_update"===e.type&&e.device_id===this.deviceId&&this._updateDeviceData(e.device)})}disconnectedCallback(){super.disconnectedCallback(),this._wsUnsub&&this._wsUnsub(),this._pollTimer&&clearInterval(this._pollTimer)}_startPolling(){this._pollTimer&&clearInterval(this._pollTimer);const e=1e3*parseInt(localStorage.getItem("mqtt-monitor-refresh")||"5");this._pollTimer=setInterval(()=>this._refreshDevice(),e)}async _refreshDevice(){try{const e=await me(this.deviceId);this._updateDeviceData(e)}catch(e){}}_updateDeviceData(e){e&&(this.device={...this.device||{},...e})}async _loadDevice(){try{this.device=await me(this.deviceId),this._haOverrides={...this.device.ha_exposure_overrides||{}};const e=this.device.server_commands;this._serverCommands=e&&!Array.isArray(e)?{...e}:{},this._configInterval=this.device.config_interval??this.device.collection_interval??this.device.remote_config?.interval??30;const t=this.device.server_sensors;this._customSensors=t&&"object"==typeof t?{...t}:{};try{this._effectiveSettings=await je(this.deviceId)}catch(e){}}catch(e){console.error("Failed to load device:",e)}}async _loadGroups(){try{this._groups=await Ce()}catch(e){console.error("Failed to load groups:",e)}}render(){if(!this.device)return H`<div style="padding: 40px; text-align: center; color: #fff;">Loading...</div>`;const e=this.device,t="online"===e.status?"#04d65c":"offline"===e.status?"#ef5350":"#ffb74d";return H`
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
    `}async _addTag(e){e&&(await Fe(this.deviceId,[e]),await this._loadDevice())}async _removeTag(e){await Te(this.deviceId,e),await this._loadDevice()}_renderGroupPolicy(){const e=Object.values(this._groups),t=this.device.group_policy||"",s=t?this._groups[t]:null,o=s?.thresholds||{};return H`
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

        ${s&&Object.keys(o).length>0?H`
          <div class="group-threshold-summary">
            ${Object.entries(o).map(([e,t])=>H`
              <span><span style="color: #fff;">${e.replace(/_/g," ")}:</span> ${t}</span>
            `)}
          </div>
        `:""}

        <div class="group-hint">
          Group policy sets default thresholds and HA entity settings. Device-level overrides take priority.
        </div>
      </div>
    `}async _onGroupPolicyChange(e){const t=e.target.value||null;try{await Me(this.deviceId,{group_policy:t}),await this._loadDevice()}catch(e){console.error("Failed to update group policy:",e)}}_renderGroupDialog(){return H`
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
    `}async _deleteAttribute(e){if(confirm(`Hide attribute "${e}"? Custom sensors will be removed from the client. Built-in attributes will be hidden.`))try{await be(this.deviceId,e);const t=this.device?.card_attributes||[];if(t.includes(e)){const s=t.filter(t=>t!==e);await Me(this.deviceId,{card_attributes:s})}await this._loadDevice()}catch(e){console.error("Failed to hide attribute:",e)}}async _unhideAttribute(e){try{await ve(this.deviceId,e),await this._loadDevice()}catch(e){console.error("Failed to unhide attribute:",e)}}async _toggleHaExposure(e){const t=void 0!==this._haOverrides[e]?this._haOverrides[e]:void 0===this._effectiveSettings?.ha_exposure_overrides?.[e]||this._effectiveSettings.ha_exposure_overrides[e];this._haOverrides={...this._haOverrides,[e]:!t};try{await Me(this.deviceId,{ha_exposure_overrides:this._haOverrides})}catch(e){console.error("Failed to update HA exposure:",e)}}async _setThreshold(e,t,s){const o={...this.device.threshold_overrides||{}};""===t||null==t?delete o[e]:o[e]={op:s||">",value:Number(t)};try{await Me(this.deviceId,{threshold_overrides:o}),this.device={...this.device,threshold_overrides:o},this._effectiveSettings=await je(this.deviceId)}catch(e){console.error("Failed to set threshold:",e)}}async _setCritThreshold(e,t,s){const o={...this.device.crit_threshold_overrides||{}};""===t||null==t?delete o[e]:o[e]={op:s||">",value:Number(t)};try{await Me(this.deviceId,{crit_threshold_overrides:o}),this.device={...this.device,crit_threshold_overrides:o}}catch(e){console.error("Failed to set crit threshold:",e)}}async _toggleCardAttribute({name:e,pinned:t}){const s=[...this.device?.card_attributes||[]];let o;o=t?[...s,e]:s.filter(t=>t!==e);try{await Me(this.deviceId,{card_attributes:o}),this.device={...this.device,card_attributes:o}}catch(e){console.error("Failed to update card attributes:",e)}}async _sendCmd(e,t={}){try{this.commandResult=`Sending ${e}...`;const s=await Se(this.deviceId,e,t);this.commandResult=`Command sent (request: ${s.request_id})`}catch(e){this.commandResult=`Error: ${e.message}`}}async _hideCommand(e){try{await _e(this.deviceId,e),await this._loadDevice()}catch(e){console.error("Failed to hide command:",e)}}async _unhideCommand(e){try{await xe(this.deviceId,e),await this._loadDevice()}catch(e){console.error("Failed to unhide command:",e)}}async _saveServerCommand({name:e,shell:t}){const{addServerCommand:s}=await Promise.resolve().then(function(){return Ue});await s(this.deviceId,e,t),await this._loadDevice()}async _removeServerCommand(e){const{removeServerCommand:t}=await Promise.resolve().then(function(){return Ue});await t(this.deviceId,e),await this._loadDevice()}async _saveSensor({key:e,sensor:t,oldKey:s}){const{addServerSensor:o,removeServerSensor:i}=await Promise.resolve().then(function(){return Ue});s&&s!==e&&await i(this.deviceId,s),await o(this.deviceId,e,t),await this._loadDevice()}async _removeSensor(e){const{removeServerSensor:t}=await Promise.resolve().then(function(){return Ue});await t(this.deviceId,e),await this._loadDevice()}async _onIntervalChange(e){const{setDeviceInterval:t}=await Promise.resolve().then(function(){return Ue});await t(this.deviceId,e),await this._loadDevice()}async _deleteDevice(){if(confirm(`Delete device "${this.device?.device_name||this.deviceId}"? This removes it from the registry. It will reappear if the client agent is still running.`))try{await fe(this.deviceId),this.dispatchEvent(new CustomEvent("back"))}catch(e){console.error("Failed to delete device:",e)}}}customElements.define("device-detail",Je);const We={online:"#04d65c",offline:"#ef5350",warning:"#ffb74d",inferred:"#00D4FF",unknown:"#666"};class Ke extends de{static properties={topology:{type:Object},layouts:{type:Object},selectedLayout:{type:String},editMode:{type:Boolean},linkMode:{type:Boolean},selectedNode:{type:String},nodePositions:{type:Object},manualEdges:{type:Array},_dragging:{type:String,state:!0},_linkSource:{type:String,state:!0},_error:{type:String,state:!0},_loading:{type:Boolean,state:!0},_selectedEdge:{type:Number,state:!0},_selectedDeviceData:{type:Object,state:!0},_dirty:{type:Boolean,state:!0},_showSaveDialog:{type:Boolean,state:!0},_showLabelDialog:{type:Boolean,state:!0},_labelEdgeIndex:{type:Number,state:!0},hideAutoEdges:{type:Boolean}};static styles=r`
    :host { display: block; padding: 20px; max-width: 1400px; margin: 0 auto; }
    .toolbar {
      display: flex; justify-content: space-between; align-items: center;
      background: rgba(255,255,255,0.05); padding: 8px 14px; border-radius: 8px;
      margin-bottom: 12px; flex-wrap: wrap; gap: 8px;
    }
    .toolbar-left { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
    .toolbar-right { display: flex; gap: 8px; font-size: 11px; }
    select {
      background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.8); border: 1px solid rgba(255,255,255,0.1);
      border-radius: 4px; padding: 4px 8px; font-size: 12px;
    }
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
    .status-dot { font-size: 11px; }
    .separator { color: #666; }
    .canvas-container {
      background: #0d0d1f; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05);
      position: relative; overflow: hidden;
    }
    svg { width: 100%; height: 500px; display: block; }
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
    .save-dialog {
      background: rgba(255,255,255,0.05); border-radius: 12px; padding: 24px;
      min-width: 320px; max-width: 400px; border: 1px solid rgba(255,255,255,0.1);
    }
    .save-dialog h3 { color: #fff; margin-bottom: 8px; font-size: 16px; }
    .save-dialog p { color: #fff; font-size: 13px; margin-bottom: 20px; }
    .save-dialog-buttons {
      display: flex; gap: 8px; justify-content: flex-end;
    }
    .dialog-btn {
      border: none; padding: 8px 18px; border-radius: 6px; cursor: pointer;
      font-size: 13px; transition: all 0.2s;
    }
    .dialog-btn.save { background: #00D4FF; color: #0d0d1f; font-weight: 600; }
    .dialog-btn.save:hover { background: #33DDFF; }
    .dialog-btn.discard { background: rgba(255,255,255,0.1); color: #ef5350; }
    .dialog-btn.discard:hover { background: #4a3a3a; }
    .dialog-btn.cancel { background: rgba(255,255,255,0.1); color: #fff; }
    .dialog-btn.cancel:hover { background: rgba(255,255,255,0.15); }
    .dirty-indicator {
      font-size: 11px; color: #ffb74d; margin-left: 4px;
    }
    .label-dialog {
      background: rgba(255,255,255,0.05); border-radius: 12px; padding: 24px;
      min-width: 360px; max-width: 440px; border: 1px solid rgba(255,255,255,0.1);
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
  `;constructor(){super(),this.topology={nodes:[],edges:[]},this.layouts={},this.selectedLayout="",this.editMode=!1,this.linkMode=!1,this.selectedNode=null,this.nodePositions={},this.manualEdges=[],this._dragging=null,this._dragOffset={x:0,y:0},this._linkSource=null,this._error="",this._loading=!0,this._selectedEdge=-1,this._selectedDeviceData=null,this._commandResult="",this._dirty=!1,this._showSaveDialog=!1,this._showLabelDialog=!1,this._labelEdgeIndex=-1,this._savedPositions=null,this._savedManualEdges=null,this.hideAutoEdges=!1}connectedCallback(){super.connectedCallback(),this._loadTopology(),this._loadLayouts();const e=1e3*parseInt(localStorage.getItem("mqtt-monitor-refresh")||"5");this._pollTimer=setInterval(()=>{this._refreshNodeStatuses()},e),this._wsUnsub=ce.onMessage(e=>{"device_update"===e.type&&this._refreshNodeStatuses()})}disconnectedCallback(){super.disconnectedCallback(),this._wsUnsub&&this._wsUnsub(),this._pollTimer&&clearInterval(this._pollTimer)}async _refreshNodeStatuses(){try{const e=await ye();if(!e||!e.nodes)return;const t={};for(const s of e.nodes)t[s.id]=s.status;if(this.topology&&this.topology.nodes){let s=!1;const o=this.topology.nodes.map(e=>t[e.id]&&t[e.id]!==e.status?(s=!0,{...e,status:t[e.id]}):e);for(const t of e.nodes)this.topology.nodes.find(e=>e.id===t.id)||(o.push(t),s=!0);s&&(this.topology={...this.topology,nodes:o})}}catch(e){}}async _loadTopology(){try{this._loading=!0,this._error="";const e=await ye();this.topology=e,this._autoLayout(),this._loading=!1}catch(e){console.error("Failed to load topology:",e),this._error=`Failed to load: ${e.message}`,this._loading=!1}}async _loadLayouts(){try{if(this.layouts=await $e(),!this._layoutsLoaded){this._layoutsLoaded=!0;const e=Object.entries(this.layouts).find(([,e])=>e.isDefault);e&&(this.selectedLayout=e[0],this.nodePositions=e[1].positions||{},this.manualEdges=e[1].manualEdges||[],this.hideAutoEdges=e[1].hideAutoEdges||!1)}}catch(e){console.error("Failed to load layouts:",e)}}_autoLayout(){const e=this.topology.nodes;if(!e.length)return;const t={...this.selectedLayout&&this.layouts[this.selectedLayout]&&this.layouts[this.selectedLayout].positions||{}},s=Math.ceil(Math.sqrt(e.length));e.forEach((e,o)=>{if(!t[e.id]){const i=o%s,r=Math.floor(o/s);t[e.id]={x:100+i*(800/(s+1)),y:80+100*r}}}),this.nodePositions=t,this.selectedLayout&&this.layouts[this.selectedLayout]&&(this.manualEdges=this.layouts[this.selectedLayout].manualEdges||[])}get _allEdges(){const e=this.hideAutoEdges?[]:this.topology.edges||[],t=this.manualEdges.map(e=>({...e,type:"manual"}));return[...e,...t]}_getNodeName(e){const t=this.topology.nodes.find(t=>t.id===e);return t&&t.name||e}render(){if(this._loading&&!this.topology.nodes.length)return H`<div style="padding: 40px; text-align: center; color: #fff;">Loading topology...</div>`;if(this._error)return H`<div style="padding: 40px; text-align: center; color: #ef5350;">${this._error}</div>`;const e=this.topology.nodes,t=this._allEdges,s=e.filter(e=>"online"===e.status).length,o=e.filter(e=>"offline"===e.status).length,i=e.filter(e=>"warning"===e.status).length;return H`
      <div class="toolbar">
        <div class="toolbar-left">
          <select @change=${this._onLayoutChange}>
            <option value="">Auto Discovery</option>
            ${Object.entries(this.layouts).map(([e,t])=>H`
              <option value=${e} ?selected=${this.selectedLayout===e}>
                ${t.name}${t.isDefault?" (default)":""}
              </option>
            `)}
          </select>
          <button class="tool-btn ${this.editMode?"active":""}"
            @click=${this._toggleEditMode}>
            ${this.editMode?"Done Editing":"Edit Mode"}
          </button>
          ${this.editMode?H`
            <span class="separator">|</span>
            <button class="tool-btn link-mode ${this.linkMode?"active":""}"
              @click=${this._toggleLinkMode}>
              ${this.linkMode?"Cancel Link":"Add Link"}
            </button>
            <button class="tool-btn ${this.hideAutoEdges?"active":""}"
              @click=${()=>{this.hideAutoEdges=!this.hideAutoEdges,this._markDirty()}}>
              ${this.hideAutoEdges?"Show Auto Links":"Hide Auto Links"}
            </button>
            <span class="separator">|</span>
            <button class="tool-btn save" @click=${this._saveCurrentLayout}>Save Layout</button>
            ${this.selectedLayout?H`
              <button class="tool-btn" @click=${this._setAsDefault}>
                ${this.layouts[this.selectedLayout]?.isDefault?"Default":"Set Default"}
              </button>
              <button class="tool-btn danger" @click=${this._deleteCurrentLayout}>Delete</button>
            `:""}
            ${this._dirty?H`<span class="dirty-indicator">unsaved changes</span>`:""}
          `:""}
        </div>
        <div class="toolbar-right">
          <span class="status-dot" style="color: #04d65c">${s} online</span>
          <span class="status-dot" style="color: #ef5350">${o} offline</span>
          <span class="status-dot" style="color: #ffb74d">${i} warning</span>
        </div>
      </div>

      ${this.linkMode?H`
        <div class="link-hint">
          ${this._linkSource?`Click a second device to link it to "${this._getNodeName(this._linkSource)}"`:"Click a device to start a link"}
        </div>
      `:""}

      <div class="canvas-container">
        <svg viewBox="0 0 900 500"
          @mousemove=${this._onMouseMove}
          @mouseup=${this._onMouseUp}
          @mouseleave=${this._onMouseUp}>
          ${t.map((e,t)=>this._renderEdgeLine(e,t))}
          ${this._renderLinkPreview()}
          ${e.map(e=>this._renderNode(e))}
          ${t.map((e,t)=>this._renderEdgeLabels(e,t))}
        </svg>
      </div>

      ${this.selectedNode&&!this.linkMode?this._renderDetailPanel():""}
      ${this.editMode&&this.manualEdges.length>0?this._renderManualEdgesList():""}
      ${this._showSaveDialog?this._renderSaveDialog():""}
      ${this._showLabelDialog?this._renderLabelDialog():""}
    `}_renderNode(e){const t=this.nodePositions[e.id]||{x:100,y:100},s=We[e.status]||We.unknown,o=this.selectedNode===e.id,i=this._linkSource===e.id,r=o||i?2.5:1.5,n=o?"4,2":i?"2,2":"none",a=i?"#ffb74d":s;return"gateway"===e.type?B`
        <g transform="translate(${t.x}, ${t.y})"
          @click=${t=>this._onNodeClick(t,e.id)}
          @mousedown=${t=>this.editMode&&!this.linkMode&&this._onMouseDown(t,e.id)}
          style="cursor:pointer">
          <circle r="22" fill="${a}22" stroke="${a}" stroke-width="${r}"
            stroke-dasharray="${n}"/>
          <text text-anchor="middle" dy="4" fill="${a}" font-size="10">${e.name.substring(0,12)}</text>
        </g>
      `:B`
      <g transform="translate(${t.x}, ${t.y})"
        @click=${t=>this._onNodeClick(t,e.id)}
        @mousedown=${t=>this.editMode&&!this.linkMode&&this._onMouseDown(t,e.id)}
        style="cursor:pointer">
        <rect x="-45" y="-18" width="90" height="36" rx="6"
          fill="rgba(255,255,255,0.05)" stroke="${a}" stroke-width="${r}"
          stroke-dasharray="${n}"/>
        <text text-anchor="middle" dy="-3" fill="${a}" font-size="10">
          ${(e.name||e.id).substring(0,12)}
        </text>
        <text text-anchor="middle" dy="10" fill="#666" font-size="8">${e.status}</text>
      </g>
    `}_edgeGeometry(e){const t=this.nodePositions[e.source],s=this.nodePositions[e.target];if(!t||!s)return null;const o=s.x-t.x,i=s.y-t.y,r=Math.sqrt(o*o+i*i)||1,n=o/r,a=i/r;let d=-a,l=n;l>0&&(d=-d,l=-l);const c=this._boxExitDistance(n,a);return{from:t,to:s,ux:n,uy:a,perpX:d,perpY:l,len:r,srcDist:c+8,tgtDist:c+8}}_boxExitDistance(e,t){if(Math.abs(e)<.001)return 22;if(Math.abs(t)<.001)return 48;const s=48/Math.abs(e),o=22/Math.abs(t);return Math.min(s,o)}_renderEdgeLine(e,t){const s=this._edgeGeometry(e);if(!s)return B``;const o="manual"===e.type,i=o?"#00D4FF":"#555",r=o&&this._selectedEdge===t-(this.topology.edges?.length||0)?2.5:1.5,n=o?"none":"4,2";return B`
      <line x1="${s.from.x}" y1="${s.from.y}" x2="${s.to.x}" y2="${s.to.y}"
        stroke="${i}" stroke-width="${r}"
        stroke-dasharray="${n}"
        @click=${o&&this.editMode?()=>this._selectEdge(t-(this.topology.edges?.length||0)):null}
        style="${o&&this.editMode?"cursor:pointer":""}"/>
    `}_renderEdgeLabels(e,t){if(!e.label&&!e.sourceLabel&&!e.targetLabel)return B``;const s=this._edgeGeometry(e);if(!s)return B``;const{from:o,to:i,ux:r,uy:n,perpX:a,perpY:d,srcDist:l,tgtDist:c}=s,p=o.x+r*l,h=o.y+n*l,u=i.x-r*c,g=i.y-n*c,m=(o.x+i.x)/2+14*a,f=(o.y+i.y)/2+14*d;return B`
      ${e.label?B`
        <rect x="${m-3*e.label.length-3}" y="${f-9}"
          width="${6*e.label.length+6}" height="13" rx="2" fill="#0d0d1f" opacity="0.9"/>
        <text x="${m}" y="${f}" text-anchor="middle"
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
    `}_renderSaveDialog(){return H`
      <div class="save-overlay" @click=${this._cancelDialog}>
        <div class="save-dialog" @click=${e=>e.stopPropagation()}>
          <h3>Unsaved Changes</h3>
          <p>You have unsaved changes to the layout. What would you like to do?</p>
          <div class="save-dialog-buttons">
            <button class="dialog-btn cancel" @click=${this._cancelDialog}>Keep Editing</button>
            <button class="dialog-btn discard" @click=${this._discardAndExit}>Discard</button>
            <button class="dialog-btn save" @click=${this._saveAndExit}>Save</button>
          </div>
        </div>
      </div>
    `}_renderLabelDialog(){const e=this.manualEdges[this._labelEdgeIndex];if(!e)return H``;const t=this._getNodeName(e.source),s=this._getNodeName(e.target);return H`
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
    `}_onNodeClick(e,t){e.stopPropagation(),this.linkMode?this._handleLinkClick(t):this._selectNode(t)}_handleLinkClick(e){if(this._linkSource)if(this._linkSource===e)this._linkSource=null;else{const t=this.manualEdges.some(t=>t.source===this._linkSource&&t.target===e||t.source===e&&t.target===this._linkSource);t||(this.manualEdges=[...this.manualEdges,{source:this._linkSource,target:e,sourceLabel:"",label:"",targetLabel:""}],this._markDirty(),this._labelEdgeIndex=this.manualEdges.length-1,this._showLabelDialog=!0),this._linkSource=null}else this._linkSource=e}_toggleEditMode(){this.editMode&&this._dirty?this._showSaveDialog=!0:this._enterOrExitEdit()}_enterOrExitEdit(){this.editMode=!this.editMode,this.editMode?(this._savedPositions=JSON.stringify(this.nodePositions),this._savedManualEdges=JSON.stringify(this.manualEdges),this._dirty=!1):(this.linkMode=!1,this._linkSource=null,this._selectedEdge=-1,this._dirty=!1)}_markDirty(){this.editMode&&(this._dirty=!0)}async _saveAndExit(){this._showSaveDialog=!1,await this._saveCurrentLayout(),this._dirty=!1,this._enterOrExitEdit()}_discardAndExit(){this._showSaveDialog=!1,this._savedPositions&&(this.nodePositions=JSON.parse(this._savedPositions)),this._savedManualEdges&&(this.manualEdges=JSON.parse(this._savedManualEdges)),this._dirty=!1,this._enterOrExitEdit()}_cancelDialog(){this._showSaveDialog=!1}_toggleLinkMode(){this.linkMode=!this.linkMode,this._linkSource=null,this.linkMode&&(this.selectedNode=null)}async _selectNode(e){if(this.selectedNode===e)return this.selectedNode=null,this._selectedDeviceData=null,void(this._commandResult="");this.selectedNode=e,this._selectedDeviceData=null,this._commandResult="";try{this._selectedDeviceData=await fetchDevice(e)}catch(e){this._selectedDeviceData={status:"inferred",attributes:{},tags:[]}}}async _sendCmd(e){if(this.selectedNode)try{this._commandResult=`Sending ${e}...`;const t=await sendCommand(this.selectedNode,e);this._commandResult=`Sent (request: ${t.request_id})`}catch(e){this._commandResult=`Error: ${e.message}`}}_selectEdge(e){this._selectedEdge=this._selectedEdge===e?-1:e}_labelEdge(e){this._labelEdgeIndex=e,this._showLabelDialog=!0}_saveLabelDialog(){const e=this.shadowRoot.querySelector(".label-dialog"),t=e.querySelector("#source-label").value,s=e.querySelector("#link-label").value,o=e.querySelector("#target-label").value,i=[...this.manualEdges];i[this._labelEdgeIndex]={...i[this._labelEdgeIndex],sourceLabel:t,label:s,targetLabel:o},this.manualEdges=i,this._markDirty(),this._showLabelDialog=!1,this._labelEdgeIndex=-1}_cancelLabelDialog(){this._showLabelDialog=!1,this._labelEdgeIndex=-1}_removeEdge(e){this.manualEdges=this.manualEdges.filter((t,s)=>s!==e),this._selectedEdge=-1,this._markDirty()}_onMouseDown(e,t){this._dragging=t;const s=this.shadowRoot.querySelector("svg"),o=s.createSVGPoint();o.x=e.clientX,o.y=e.clientY;const i=o.matrixTransform(s.getScreenCTM().inverse()),r=this.nodePositions[t]||{x:0,y:0};this._dragOffset={x:i.x-r.x,y:i.y-r.y},e.preventDefault()}_onMouseMove(e){const t=this.shadowRoot.querySelector("svg"),s=t.createSVGPoint();s.x=e.clientX,s.y=e.clientY;const o=s.matrixTransform(t.getScreenCTM().inverse());this.linkMode&&this._linkSource&&(this._mousePos={x:o.x,y:o.y},this.requestUpdate()),this._dragging&&(this.nodePositions={...this.nodePositions,[this._dragging]:{x:o.x-this._dragOffset.x,y:o.y-this._dragOffset.y}})}_onMouseUp(){this._dragging&&this._markDirty(),this._dragging=null}_onLayoutChange(e){if(this.selectedLayout=e.target.value,this.selectedLayout&&this.layouts[this.selectedLayout]){const e=this.layouts[this.selectedLayout];this.nodePositions=e.positions||{},this.manualEdges=e.manualEdges||[],this.hideAutoEdges=e.hideAutoEdges||!1}else this.nodePositions={},this.manualEdges=[],this.hideAutoEdges=!1,this._autoLayout()}async _saveCurrentLayout(){const e=this.selectedLayout&&this.layouts[this.selectedLayout]?this.layouts[this.selectedLayout].name:"",t=prompt("Layout name:",e);if(!t)return;const s=this.selectedLayout&&this.layouts[this.selectedLayout]&&this.layouts[this.selectedLayout].isDefault||!1,o=await we({id:this.selectedLayout||void 0,name:t,positions:this.nodePositions,manualEdges:this.manualEdges,hideAutoEdges:this.hideAutoEdges,isDefault:s});this.selectedLayout=o.id,await this._loadLayouts(),this._dirty=!1,this._savedPositions=JSON.stringify(this.nodePositions),this._savedManualEdges=JSON.stringify(this.manualEdges)}async _setAsDefault(){if(!this.selectedLayout)return;for(const[e,t]of Object.entries(this.layouts))t.isDefault&&(t.isDefault=!1,await we(t));const e=this.layouts[this.selectedLayout];e&&(e.isDefault=!0,await we(e)),await this._loadLayouts(),this._layoutsLoaded=!0}async _deleteCurrentLayout(){if(!this.selectedLayout)return;const e=this.layouts[this.selectedLayout]?.name||this.selectedLayout;confirm(`Delete layout "${e}"?`)&&(await ke(this.selectedLayout),this.selectedLayout="",this.nodePositions={},this.manualEdges=[],this.hideAutoEdges=!1,this._dirty=!1,await this._loadLayouts(),this._autoLayout())}}customElements.define("topology-view",Ke);const Ye={online:"#04d65c",offline:"#ef5350",warning:"#ffb74d",unknown:"#666"};class Xe extends de{static properties={device:{type:Object},deviceId:{type:String}};static styles=r`
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
  `;render(){if(!this.device)return H``;const e=this.device,t=Ye[e.status]||Ye.unknown,s=Object.entries(e.attributes||{}),o=e.hidden_attributes||[],i=e.card_attributes||[];let r;r=i.length>0?i.map(e=>s.find(([t])=>t===e)).filter(Boolean):s.filter(([e])=>!o.includes(e)).slice(0,4);const n=[...e.tags||[],...e.server_tags||[]],a=e.device_name||this.deviceId;return this.style.setProperty("--status-color",t),this.setAttribute("role","button"),this.setAttribute("tabindex","0"),this.setAttribute("aria-label",`${a}, ${e.status||"unknown"}`),H`
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
    `}_isWarning(e,t){const s={cpu_usage:90,memory_usage:90,disk_usage:95,cpu_temp:80};return s[e]&&t.value>s[e]}}customElements.define("device-card",Xe);class Ze extends de{static properties={devices:{type:Object},filter:{type:String},selectedTags:{type:Array},viewMode:{type:String},_groups:{type:Object,state:!0},_collapsedGroups:{type:Object,state:!0},_refreshInterval:{type:Number,state:!0}};static styles=r`
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
  `;constructor(){super(),this.devices={},this.filter="all",this.selectedTags=[],this.viewMode="all",this._groups={},this._collapsedGroups={},this._wsUnsub=null,this._refreshInterval=parseInt(localStorage.getItem("mqtt-monitor-refresh")||"5"),this._pollTimer=null,this._lastFetchTime=0}connectedCallback(){super.connectedCallback(),this._loadDevices(),this._loadGroups(),this._startPolling(),this._wsUnsub=ce.onMessage(e=>{"device_update"===e.type&&(this.devices={...this.devices,[e.device_id]:e.device},this.requestUpdate())})}disconnectedCallback(){super.disconnectedCallback(),this._wsUnsub&&this._wsUnsub(),this._pollTimer&&clearInterval(this._pollTimer)}_startPolling(){this._pollTimer&&clearInterval(this._pollTimer);const e=1e3*(this._refreshInterval||5);this._pollTimer=setInterval(()=>this._loadDevices(),e)}async _loadDevices(){try{const e=await ge(this._lastFetchTime);e&&Object.keys(e).length>0?this.devices={...this.devices,...e}:0===this._lastFetchTime&&(this.devices=e||{}),this._lastFetchTime=Date.now()/1e3}catch(e){console.error("Failed to load devices:",e)}}async _loadGroups(){try{this._groups=await Ce()}catch(e){console.error("Failed to load groups:",e)}}get _filteredDevices(){let e=Object.entries(this.devices);return"all"!==this.filter&&(e=e.filter(([,e])=>e.status===this.filter)),this.selectedTags.length>0&&(e=e.filter(([,e])=>{const t=[...e.tags||[],...e.server_tags||[]];return this.selectedTags.some(e=>t.includes(e))})),e}get _counts(){const e=Object.values(this.devices);return{all:e.length,online:e.filter(e=>"online"===e.status).length,offline:e.filter(e=>"offline"===e.status).length,warning:e.filter(e=>"warning"===e.status).length}}_onTagAdd(e){const t=e.detail.tag;this.selectedTags.includes(t)||(this.selectedTags=[...this.selectedTags,t])}_onTagRemove(e){this.selectedTags=this.selectedTags.filter(t=>t!==e.detail.tag)}render(){const e=this._counts;return H`
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
    `}_renderByGroup(){const e=this._filteredDevices,t=Object.values(this._groups),s={},o=new Set;t.forEach(t=>{const i=e.filter(([e])=>(t.device_ids||[]).includes(e));s[t.id]=i,i.forEach(([e])=>o.add(e))});const i=e.filter(([e])=>!o.has(e));return H`
      ${t.map(e=>this._renderGroupSection(e,s[e.id]||[]))}
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
    `}_renderGroupSection(e,t){const s=!!this._collapsedGroups[e.id],o=Object.entries(this.devices).filter(([t])=>(e.device_ids||[]).includes(t)).map(([,e])=>e),i=o.filter(e=>"online"===e.status).length,r=o.length;return H`
      <div class="group-section">
        <div class="group-section-header"
          @click=${()=>this._toggleGroupCollapse(e.id)}>
          <span class="group-chevron ${s?"":"open"}">&#9658;</span>
          <span class="group-section-name">${e.name}</span>
          <span class="group-device-count">${t.length} device${1!==t.length?"s":""}</span>
          <div class="group-health">
            <span class="health-dot" style="color: #04d65c">
              ${i}/${r} online
            </span>
          </div>
        </div>
        ${s?"":H`
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
    `}_toggleGroupCollapse(e){this._collapsedGroups={...this._collapsedGroups,[e]:!this._collapsedGroups[e]}}_selectDevice(e){this.dispatchEvent(new CustomEvent("device-select",{detail:{deviceId:e},bubbles:!0,composed:!0}))}}customElements.define("dashboard-view",Ze);class Qe extends de{static properties={_tags:{type:Array,state:!0},_loading:{type:Boolean,state:!0},_newTagName:{type:String,state:!0},_renamingTag:{type:String,state:!0},_renameValue:{type:String,state:!0},_selectedTags:{type:Object,state:!0}};static styles=r`
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
  `;constructor(){super(),this._tags=[],this._loading=!0,this._newTagName="",this._renamingTag=null,this._renameValue="",this._selectedTags=new Set}connectedCallback(){super.connectedCallback(),this._loadTags()}async _loadTags(){this._loading=!0;try{const e=await ze().catch(()=>[]);this._tags=Array.isArray(e)?e.map(e=>"string"==typeof e?{tag:e,count:0}:e).sort((e,t)=>e.tag.localeCompare(t.tag)):[]}finally{this._loading=!1}}render(){const e=this._selectedTags?this._selectedTags.size:0;return H`
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
    `}_renderTagCard(e){const t=this._selectedTags&&this._selectedTags.has(e.tag),s=e.device_count||e.count||0;return H`
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
    `}_toggleTagSelection(e){const t=new Set(this._selectedTags);t.has(e)?t.delete(e):t.add(e),this._selectedTags=t}async _deleteSelectedTags(){const e=[...this._selectedTags];if(confirm(`Delete ${e.length} tag${1!==e.length?"s":""}?`)){for(const t of e)try{await Oe(t)}catch(e){console.error(e)}this._selectedTags=new Set,await this._loadTags()}}_startRename(e){this._renamingTag=e,this._renameValue=e}_cancelRename(){this._renamingTag=null,this._renameValue=""}async _saveRename(e){const t=this._renameValue.trim();if(t&&t!==e){try{await Ne(e,t),await this._loadTags()}catch(e){console.error("Failed to rename tag:",e)}this._cancelRename()}else this._cancelRename()}async _createTag(){const e=this._newTagName.trim();if(e)try{await Ge(e),this._newTagName="",await this._loadTags()}catch(e){console.error("Failed to create tag:",e)}}async _deleteTag(e){const t=this._tags.find(t=>t.tag===e);if(!(t&&t.count>0)||confirm(`"${e}" is used by ${t.count} device(s). Delete anyway?`))try{await Oe(e),await this._loadTags()}catch(e){console.error("Failed to delete tag:",e)}}}customElements.define("tag-registry-settings",Qe);class et extends de{static properties={_groups:{type:Object,state:!0},_devices:{type:Object,state:!0},_loading:{type:Boolean,state:!0},_expandedGroup:{type:String,state:!0},_newGroupName:{type:String,state:!0},_editGroupName:{type:String,state:!0},_editingGroupName:{type:String,state:!0},_groupSaveStatus:{type:Object,state:!0},_groupPushStatus:{type:Object,state:!0},_editingGroupCmd:{type:Object,state:!0},_showAddGroupCmd:{type:Object,state:!0},_groupCmdForm:{type:Object,state:!0},_editingGroupSensor:{type:Object,state:!0},_showAddGroupSensor:{type:Object,state:!0},_groupSensorForm:{type:Object,state:!0}};static styles=r`
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
  `;constructor(){super(),this._groups={},this._devices={},this._loading=!0,this._expandedGroup=null,this._newGroupName="",this._editGroupName="",this._editingGroupName=null,this._groupSaveStatus={},this._groupPushStatus={},this._editingGroupCmd=null,this._showAddGroupCmd=null,this._groupCmdForm={name:"",shell:""},this._editingGroupSensor=null,this._showAddGroupSensor=null,this._groupSensorForm={name:"",command:"",interval:"",unit:""}}connectedCallback(){super.connectedCallback(),this._loadAll()}async _loadAll(){this._loading=!0;try{const[e,t]=await Promise.all([Ce().catch(()=>({})),ge().catch(()=>({}))]);this._groups=e||{},this._devices=t||{}}finally{this._loading=!1}}render(){const e=Object.values(this._groups);return H`
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
    `}_renderGroup(e){const t=this._expandedGroup===e.id,s=(e.device_ids||[]).length;return H`
      <div>
        <div class="group-header" @click=${()=>this._toggleGroup(e.id)}>
          <div class="group-header-left">
            <span class="chevron ${t?"open":""}">&#9658;</span>
            <span class="group-header-name">${e.name}</span>
            <span class="group-member-count">${s} member${1!==s?"s":""}</span>
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
                ${(e.device_ids||[]).map(t=>{const s=this._devices[t];return H`
                    <span class="member-pill">
                      ${s&&s.device_name||t}
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
    `}_getGroupDiscoveredData(e){const t=e.device_ids||[],s=new Set,o={},i={};for(const e of t){const t=this._devices[e];if(!t)continue;if(t.attributes&&"object"==typeof t.attributes)for(const e of Object.keys(t.attributes))s.add(e);if(Array.isArray(t.allowed_commands))for(const e of t.allowed_commands)e in o||(o[e]="");const r=t.remote_config;if(r&&r.plugins&&r.plugins.custom_command&&r.plugins.custom_command.commands)for(const[e,t]of Object.entries(r.plugins.custom_command.commands))i[e]||(i[e]=t)}return{attributes:Array.from(s).sort(),commands:o,sensors:i}}_renderGroupCustomCommands(e){const t=e.custom_commands||{},s=Object.entries(t).sort(([e],[t])=>e.localeCompare(t)),o=e.hidden_commands||[],i=s.filter(([e])=>!o.includes(e)),r=s.filter(([e])=>o.includes(e)),n=this._editingGroupCmd&&this._editingGroupCmd.groupId===e.id,a=this._showAddGroupCmd&&this._showAddGroupCmd.groupId===e.id;return H`
      ${i.length>0?H`
        <table class="sensor-table">
          <thead>
            <tr><th>Name</th><th>Shell Command</th><th></th></tr>
          </thead>
          <tbody>
            ${i.map(([t,s])=>H`
              <tr>
                <td style="font-family: monospace;">${t}</td>
                <td style="font-family: monospace; font-size: 11px;">${s||"—"}</td>
                <td>
                  <div class="sensor-actions">
                    <button class="sensor-btn edit"
                      @click=${()=>this._startEditGroupCmd(e.id,t,s)}>Edit</button>
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
    `}_startAddGroupCmd(e){this._showAddGroupCmd={groupId:e},this._editingGroupCmd=null,this._groupCmdForm={name:"",shell:""}}_startEditGroupCmd(e,t,s){this._editingGroupCmd={groupId:e,name:t},this._showAddGroupCmd=null,this._groupCmdForm={name:t,shell:s}}_cancelGroupCmdForm(){this._editingGroupCmd=null,this._showAddGroupCmd=null,this._groupCmdForm={name:"",shell:""}}async _saveGroupCmd(e){const t=this._groupCmdForm?.name?.trim(),s=this._groupCmdForm?.shell?.trim();if(!t||!s)return;const o={...this._getLatestGroup(e).custom_commands||{},[t]:s};await De(e.id,{custom_commands:o}),await this._loadAll(),this._cancelGroupCmdForm()}async _removeGroupCommand(e,t){const s=this._getLatestGroup(e),o={...s.custom_commands||{}};delete o[t];try{await De(e.id,this._buildGroupPayload(s,{custom_commands:o}))}catch(e){console.error("Failed to remove group command:",e)}await this._loadAll()}_getLatestGroup(e){return this._groups[e.id]||e}_buildGroupPayload(e,t={}){return{name:e.name,device_ids:e.device_ids||[],custom_commands:e.custom_commands||{},custom_sensors:e.custom_sensors||{},thresholds:e.thresholds||{},hidden_commands:e.hidden_commands||[],...t}}async _hideGroupCommand(e,t){const s=this._getLatestGroup(e),o=[...s.hidden_commands||[]];o.includes(t)||o.push(t);try{await De(e.id,this._buildGroupPayload(s,{hidden_commands:o}))}catch(e){console.error("Failed to hide group command:",e)}await this._loadAll()}async _unhideGroupCommand(e,t){const s=this._getLatestGroup(e),o=(s.hidden_commands||[]).filter(e=>e!==t);try{await De(e.id,this._buildGroupPayload(s,{hidden_commands:o}))}catch(e){console.error("Failed to unhide group command:",e)}await this._loadAll()}_renderGroupThresholds(e){const t=e.thresholds||{},s=e.crit_thresholds||{},o=this._getGroupDiscoveredData(e).attributes,i=Object.keys(t).filter(e=>null!=t[e]&&!o.includes(e)),r=Object.keys(s).filter(e=>null!=s[e]&&!o.includes(e)&&!i.includes(e)),n=[...o,...i,...r];return 0===n.length?H`<div style="font-size: 13px; color: rgba(255,255,255,0.4); margin-bottom: 6px;">No attributes discovered from member devices yet.</div>`:H`
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 8px;">
        ${n.map(o=>{const i=t[o],r=null!=i,n=r&&"object"==typeof i&&i.op||">",a=r?"object"==typeof i?i.value:i:null,d=s[o],l=null!=d,c=l&&"object"==typeof d&&d.op||">",p=l?"object"==typeof d?d.value:d:null;return H`
            <div style="background: rgba(255,255,255,0.03); border-radius: 8px; padding: 10px 12px;
              ${l?"border: 1px solid rgba(239,83,80,0.2);":r?"border: 1px solid rgba(255,183,77,0.15);":"border: 1px solid transparent;"}">
              <div style="font-size: 12px; color: #fff; margin-bottom: 8px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.3px;">
                ${o.replace(/_/g," ")}
              </div>
              <div style="display: flex; align-items: center; gap: 4px; margin-bottom: 4px;">
                <span style="font-size: 11px; color: rgba(255,183,77,0.7); text-transform: uppercase; letter-spacing: 0.5px; width: 34px; font-weight: 600;">warn</span>
                <select style="background: #0d0d1f; border: none; border-radius: 3px; color: rgba(255,255,255,0.6); padding: 2px; font-size: 11px; width: 38px; appearance: none; -webkit-appearance: none;"
                  .value=${n}
                  @change=${t=>this._updateGroupThreshold(e.id,o,a,t.target.value)}>
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
                  @change=${t=>this._updateGroupThreshold(e.id,o,t.target.value,n)}>
                ${r?H`
                  <span style="font-size: 12px; color: rgba(255,255,255,0.3); cursor: pointer;" title="Clear"
                    @click=${()=>this._removeGroupThreshold(e.id,o)}>&times;</span>
                `:""}
              </div>
              <div style="display: flex; align-items: center; gap: 4px;">
                <span style="font-size: 11px; color: rgba(239,83,80,0.7); text-transform: uppercase; letter-spacing: 0.5px; width: 34px; font-weight: 600;">crit</span>
                <select style="background: #0d0d1f; border: none; border-radius: 3px; color: rgba(255,255,255,0.6); padding: 2px; font-size: 11px; width: 38px; appearance: none; -webkit-appearance: none;"
                  .value=${c}
                  @change=${t=>this._updateGroupCritThreshold(e.id,o,p,t.target.value)}>
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
                  @change=${t=>this._updateGroupCritThreshold(e.id,o,t.target.value,c)}>
                ${l?H`
                  <span style="font-size: 12px; color: rgba(255,255,255,0.3); cursor: pointer;" title="Clear"
                    @click=${()=>this._removeGroupCritThreshold(e.id,o)}>&times;</span>
                `:""}
              </div>
            </div>
          `})}
      </div>
    `}_updateGroupThreshold(e,t,s,o=">"){const i=this._groups[e];if(!i)return;const r={...i.thresholds||{}};""===s||null==s?delete r[t]:r[t]={op:o,value:Number(s)},this._groups={...this._groups,[e]:{...i,thresholds:r}}}_removeGroupThreshold(e,t){const s=this._groups[e];if(!s)return;const o={...s.thresholds||{}};delete o[t],this._groups={...this._groups,[e]:{...s,thresholds:o}}}_updateGroupCritThreshold(e,t,s,o=">"){const i=this._groups[e];if(!i)return;const r={...i.crit_thresholds||{}};""===s||null==s?delete r[t]:r[t]={op:o,value:Number(s)},this._groups={...this._groups,[e]:{...i,crit_thresholds:r}}}_removeGroupCritThreshold(e,t){const s=this._groups[e];if(!s)return;const o={...s.crit_thresholds||{}};delete o[t],this._groups={...this._groups,[e]:{...s,crit_thresholds:o}}}_renderGroupCustomSensors(e){const t=e.custom_sensors||{},s=this._editingGroupSensor&&this._editingGroupSensor.groupId===e.id,o=this._showAddGroupSensor&&this._showAddGroupSensor.groupId===e.id;return H`
      ${Object.keys(t).length>0?H`
        <table class="sensor-table">
          <thead>
            <tr><th>Name</th><th>Command</th><th>Interval</th><th>Unit</th><th></th></tr>
          </thead>
          <tbody>
            ${Object.entries(t).map(([t,s])=>H`
              <tr>
                <td style="font-family: monospace;">${t}</td>
                <td style="font-family: monospace; font-size: 11px;">${s.command||"—"}</td>
                <td>${s.interval?s.interval+"s":"—"}</td>
                <td>${s.unit||"—"}</td>
                <td>
                  <div class="sensor-actions">
                    <button class="sensor-btn edit"
                      @click=${()=>this._startEditGroupSensor(e.id,t,s)}>Edit</button>
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

      ${s||o?H`
        <div class="sensor-form">
          <div class="sensor-form-grid" style="grid-template-columns: 1fr 2fr 80px 80px;">
            <input type="text" placeholder="Name"
              .value=${this._groupSensorForm.name}
              ?disabled=${!!s}
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
            <button class="form-btn save" @click=${()=>this._saveGroupSensor(e)}>${s?"Update":"Add"}</button>
            <button class="form-btn cancel" @click=${this._cancelGroupSensorForm}>Cancel</button>
          </div>
        </div>
      `:H`
        <button class="add-cmd-btn" @click=${()=>this._startAddGroupSensor(e.id)}>+ Add Sensor</button>
      `}
    `}_startAddGroupSensor(e){this._showAddGroupSensor={groupId:e},this._editingGroupSensor=null,this._groupSensorForm={name:"",command:"",interval:"",unit:""}}_startEditGroupSensor(e,t,s){this._editingGroupSensor={groupId:e,name:t},this._showAddGroupSensor=null,this._groupSensorForm={name:t,command:s.command||"",interval:null!=s.interval?String(s.interval):"",unit:s.unit||""}}_cancelGroupSensorForm(){this._editingGroupSensor=null,this._showAddGroupSensor=null,this._groupSensorForm={name:"",command:"",interval:"",unit:""}}async _saveGroupSensor(e){const t=this._groupSensorForm?.name?.trim(),s=this._groupSensorForm?.command?.trim();if(!t||!s)return;const o={command:s,unit:this._groupSensorForm?.unit||"",interval:parseInt(this._groupSensorForm?.interval)||void 0},i={...this._getLatestGroup(e).custom_sensors||{},[t]:o};await De(e.id,{custom_sensors:i}),await this._loadAll(),this._cancelGroupSensorForm()}async _removeGroupSensor(e,t){const s=this._getLatestGroup(e),o={...s.custom_sensors||{}};delete o[t];try{await De(e.id,this._buildGroupPayload(s,{custom_sensors:o}))}catch(e){console.error("Failed to remove group sensor:",e)}await this._loadAll()}_renderAddMemberDropdown(e){const t=e.device_ids||[],s=Object.entries(this._devices).filter(([e])=>!t.includes(e));return 0===s.length?H``:H`
      <select class="small-input" style="padding: 3px 8px;"
        @change=${t=>{t.target.value&&(this._addMember(e,t.target.value),t.target.value="")}}>
        <option value="">Add device...</option>
        ${s.map(([e,t])=>H`
          <option value=${e}>${t.device_name||e}</option>
        `)}
      </select>
    `}_toggleGroup(e){this._expandedGroup=this._expandedGroup===e?null:e}async _addMember(e,t){const s=[...e.device_ids||[],t];try{await De(e.id,{device_ids:s}),await this._loadAll()}catch(e){console.error("Failed to add member:",e)}}async _removeMember(e,t){const s=(e.device_ids||[]).filter(e=>e!==t);try{await De(e.id,{device_ids:s}),await this._loadAll()}catch(e){console.error("Failed to remove member:",e)}}async _updateGroup(e){const t=this._groups[e.id]||e,s=this._editingGroupName===e.id?this._editGroupName.trim():t.name,o={};for(const[e,s]of Object.entries(t.thresholds||{}))null!=s&&("object"==typeof s&&null!=s.value?o[e]=s:"number"!=typeof s||isNaN(s)||(o[e]=s));const i={};for(const[e,s]of Object.entries(t.crit_thresholds||{}))null!=s&&("object"==typeof s&&null!=s.value?i[e]=s:"number"!=typeof s||isNaN(s)||(i[e]=s));const r=s||t.name,n={name:r,device_ids:t.device_ids||[],custom_commands:t.custom_commands||{},custom_sensors:t.custom_sensors||{},thresholds:o,crit_thresholds:i,hidden_commands:t.hidden_commands||[]};console.log("Saving group:",e.id,n);try{await De(e.id,n),this._groups={...this._groups,[e.id]:{...t,name:r,thresholds:o,crit_thresholds:i}},this._editingGroupName===e.id&&(this._editingGroupName=null),this._groupSaveStatus={...this._groupSaveStatus,[e.id]:"saved"},setTimeout(()=>{this._groupSaveStatus={...this._groupSaveStatus,[e.id]:""}},2e3)}catch(t){console.error("Failed to update group:",t),this._groupSaveStatus={...this._groupSaveStatus,[e.id]:"error"},setTimeout(()=>{this._groupSaveStatus={...this._groupSaveStatus,[e.id]:""}},2e3)}}async _createGroup(){const e=this._newGroupName.trim();if(!e)return;const t=e.toLowerCase().replace(/[^a-z0-9]+/g,"_");try{await Ee(t,e,[]),this._newGroupName="",this._expandedGroup=t,await this._loadAll()}catch(e){console.error("Failed to create group:",e)}}async _deleteGroup(e){const t=(e.device_ids||[]).length;if(!(t>0)||confirm(`Delete group "${e.name}"? It has ${t} member(s).`))try{await Ae(e.id),this._expandedGroup===e.id&&(this._expandedGroup=null),await this._loadAll()}catch(e){console.error("Failed to delete group:",e)}}async _deployToDevices(e){await this._updateGroup(e),await this._doDeploy(e)}async _doDeploy(e){const t=this._groups[e.id]||e;this._groupPushStatus={...this._groupPushStatus,[e.id]:"Deploying..."};try{const s=await Ie(t.id,{});console.log("Deploy result:",s),this._groupPushStatus={...this._groupPushStatus,[e.id]:"Deployed!"},setTimeout(()=>{this._groupPushStatus={...this._groupPushStatus,[e.id]:""}},3e3),await this._loadAll()}catch(t){console.error("Failed to deploy group config:",t);const s=t&&t.message?`Error: ${t.message}`:"Error";this._groupPushStatus={...this._groupPushStatus,[e.id]:s},setTimeout(()=>{this._groupPushStatus={...this._groupPushStatus,[e.id]:""}},3e3)}}}customElements.define("group-policy-settings",et);const tt={attr:"",value:""};class st extends de{static properties={_settings:{type:Object,state:!0},_loading:{type:Boolean,state:!0},_savingSettings:{type:Boolean,state:!0},_settingsSaved:{type:Boolean,state:!0}};static styles=r`
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
  `;constructor(){super(),this._settings=null,this._loading=!0,this._savingSettings=!1,this._settingsSaved=!1}connectedCallback(){super.connectedCallback(),this._loadSettings()}async _loadSettings(){this._loading=!0;try{this._settings=await Pe().catch(()=>({}))}finally{this._loading=!1}}render(){return this._loading?H`<div class="loading">Loading settings...</div>`:H`
      <h2>Settings</h2>
      <tag-registry-settings></tag-registry-settings>
      <group-policy-settings></group-policy-settings>
      ${this._renderGlobalDefaults()}
    `}_renderGlobalDefaults(){const e=(this._settings||{}).default_thresholds||{},t=tt;return H`
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
            @input=${e=>{tt.attr=e.target.value,this.requestUpdate()}}>
          <input class="small-input" type="number" placeholder="Value..."
            style="width: 90px;"
            .value=${t.value}
            @input=${e=>{tt.value=e.target.value,this.requestUpdate()}}>
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
    `}_updateDefaultThreshold(e,t){const s=this._settings||{};this._settings={...s,default_thresholds:{...s.default_thresholds||{},[e]:""===t?null:Number(t)}}}_removeDefaultThreshold(e){const t=this._settings||{},s={...t.default_thresholds||{}};delete s[e],this._settings={...t,default_thresholds:s}}_addDefaultThreshold(){const e=(tt.attr||"").trim(),t=(tt.value||"").trim();e&&""!==t&&(this._updateDefaultThreshold(e,t),tt.attr="",tt.value="",this.requestUpdate())}async _saveSettings(){this._savingSettings=!0,this._settingsSaved=!1;try{await Le(this._settings),this._settingsSaved=!0,setTimeout(()=>{this._settingsSaved=!1},2e3)}catch(e){console.error("Failed to save settings:",e)}finally{this._savingSettings=!1}}}customElements.define("settings-view",st);class ot extends de{static properties={currentView:{type:String},selectedDevice:{type:String}};static styles=r`
    :host {
      display: block;
      min-height: 100vh;
      background: #0a0a1a;
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
  `;constructor(){super(),this.currentView="dashboard",this.selectedDevice=null}connectedCallback(){super.connectedCallback(),ce.connect()}disconnectedCallback(){super.disconnectedCallback(),ce.disconnect()}render(){return H`
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
    `}_onOverlayClick(){this.selectedDevice=null}_onViewChange(e){this.currentView=e.detail.view,this.selectedDevice=null}_onDeviceSelect(e){this.selectedDevice=e.detail.deviceId}}customElements.define("network-monitor-app",ot);
//# sourceMappingURL=bundle.js.map
