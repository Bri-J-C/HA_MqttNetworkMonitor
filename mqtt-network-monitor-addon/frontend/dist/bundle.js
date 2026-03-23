/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,t=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),o=new WeakMap;let i=class{constructor(e,t,o){if(this._$cssResult$=!0,o!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const s=this.t;if(t&&void 0===e){const t=void 0!==s&&1===s.length;t&&(e=o.get(s)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&o.set(s,e))}return e}toString(){return this.cssText}};const a=(e,...t)=>{const o=1===e.length?e[0]:t.reduce((t,s,o)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+e[o+1],e[0]);return new i(o,e,s)},n=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const s of e.cssRules)t+=s.cssText;return(e=>new i("string"==typeof e?e:e+"",void 0,s))(t)})(e):e,{is:r,defineProperty:l,getOwnPropertyDescriptor:d,getOwnPropertyNames:c,getOwnPropertySymbols:p,getPrototypeOf:h}=Object,u=globalThis,g=u.trustedTypes,m=g?g.emptyScript:"",b=u.reactiveElementPolyfillSupport,f=(e,t)=>e,v={toAttribute(e,t){switch(t){case Boolean:e=e?m:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let s=e;switch(t){case Boolean:s=null!==e;break;case Number:s=null===e?null:Number(e);break;case Object:case Array:try{s=JSON.parse(e)}catch(e){s=null}}return s}},_=(e,t)=>!r(e,t),x={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:_};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let y=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=x){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const s=Symbol(),o=this.getPropertyDescriptor(e,s,t);void 0!==o&&l(this.prototype,e,o)}}static getPropertyDescriptor(e,t,s){const{get:o,set:i}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:o,set(t){const a=o?.call(this);i?.call(this,t),this.requestUpdate(e,a,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??x}static _$Ei(){if(this.hasOwnProperty(f("elementProperties")))return;const e=h(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(f("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(f("properties"))){const e=this.properties,t=[...c(e),...p(e)];for(const s of t)this.createProperty(s,e[s])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,s]of t)this.elementProperties.set(e,s)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const s=this._$Eu(e,t);void 0!==s&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const e of s)t.unshift(n(e))}else void 0!==e&&t.push(n(e));return t}static _$Eu(e,t){const s=t.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const s=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((s,o)=>{if(t)s.adoptedStyleSheets=o.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const t of o){const o=document.createElement("style"),i=e.litNonce;void 0!==i&&o.setAttribute("nonce",i),o.textContent=t.cssText,s.appendChild(o)}})(s,this.constructor.elementStyles),s}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ET(e,t){const s=this.constructor.elementProperties.get(e),o=this.constructor._$Eu(e,s);if(void 0!==o&&!0===s.reflect){const i=(void 0!==s.converter?.toAttribute?s.converter:v).toAttribute(t,s.type);this._$Em=e,null==i?this.removeAttribute(o):this.setAttribute(o,i),this._$Em=null}}_$AK(e,t){const s=this.constructor,o=s._$Eh.get(e);if(void 0!==o&&this._$Em!==o){const e=s.getPropertyOptions(o),i="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:v;this._$Em=o;const a=i.fromAttribute(t,e.type);this[o]=a??this._$Ej?.get(o)??a,this._$Em=null}}requestUpdate(e,t,s,o=!1,i){if(void 0!==e){const a=this.constructor;if(!1===o&&(i=this[e]),s??=a.getPropertyOptions(e),!((s.hasChanged??_)(i,t)||s.useDefault&&s.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,s))))return;this.C(e,t,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:s,reflect:o,wrapped:i},a){s&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==i||void 0!==a)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),!0===o&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,s]of e){const{wrapped:e}=s,o=this[t];!0!==e||this._$AL.has(t)||void 0===o||this.C(t,void 0,s,o)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[f("elementProperties")]=new Map,y[f("finalized")]=new Map,b?.({ReactiveElement:y}),(u.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $=globalThis,w=e=>e,k=$.trustedTypes,S=k?k.createPolicy("lit-html",{createHTML:e=>e}):void 0,C="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,A="?"+E,T=`<${A}>`,D=document,z=()=>D.createComment(""),N=e=>null===e||"object"!=typeof e&&"function"!=typeof e,G=Array.isArray,O="[ \t\n\f\r]",P=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,L=/-->/g,j=/>/g,F=RegExp(`>|${O}(?:([^\\s"'>=/]+)(${O}*=${O}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),M=/'/g,I=/"/g,U=/^(?:script|style|textarea|title)$/i,R=e=>(t,...s)=>({_$litType$:e,strings:t,values:s}),H=R(1),B=R(2),V=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),W=new WeakMap,J=D.createTreeWalker(D,129);function K(e,t){if(!G(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(t):t}const Y=(e,t)=>{const s=e.length-1,o=[];let i,a=2===t?"<svg>":3===t?"<math>":"",n=P;for(let t=0;t<s;t++){const s=e[t];let r,l,d=-1,c=0;for(;c<s.length&&(n.lastIndex=c,l=n.exec(s),null!==l);)c=n.lastIndex,n===P?"!--"===l[1]?n=L:void 0!==l[1]?n=j:void 0!==l[2]?(U.test(l[2])&&(i=RegExp("</"+l[2],"g")),n=F):void 0!==l[3]&&(n=F):n===F?">"===l[0]?(n=i??P,d=-1):void 0===l[1]?d=-2:(d=n.lastIndex-l[2].length,r=l[1],n=void 0===l[3]?F:'"'===l[3]?I:M):n===I||n===M?n=F:n===L||n===j?n=P:(n=F,i=void 0);const p=n===F&&e[t+1].startsWith("/>")?" ":"";a+=n===P?s+T:d>=0?(o.push(r),s.slice(0,d)+C+s.slice(d)+E+p):s+E+(-2===d?t:p)}return[K(e,a+(e[s]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),o]};class X{constructor({strings:e,_$litType$:t},s){let o;this.parts=[];let i=0,a=0;const n=e.length-1,r=this.parts,[l,d]=Y(e,t);if(this.el=X.createElement(l,s),J.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(o=J.nextNode())&&r.length<n;){if(1===o.nodeType){if(o.hasAttributes())for(const e of o.getAttributeNames())if(e.endsWith(C)){const t=d[a++],s=o.getAttribute(e).split(E),n=/([.?@])?(.*)/.exec(t);r.push({type:1,index:i,name:n[2],strings:s,ctor:"."===n[1]?se:"?"===n[1]?oe:"@"===n[1]?ie:te}),o.removeAttribute(e)}else e.startsWith(E)&&(r.push({type:6,index:i}),o.removeAttribute(e));if(U.test(o.tagName)){const e=o.textContent.split(E),t=e.length-1;if(t>0){o.textContent=k?k.emptyScript:"";for(let s=0;s<t;s++)o.append(e[s],z()),J.nextNode(),r.push({type:2,index:++i});o.append(e[t],z())}}}else if(8===o.nodeType)if(o.data===A)r.push({type:2,index:i});else{let e=-1;for(;-1!==(e=o.data.indexOf(E,e+1));)r.push({type:7,index:i}),e+=E.length-1}i++}}static createElement(e,t){const s=D.createElement("template");return s.innerHTML=e,s}}function Z(e,t,s=e,o){if(t===V)return t;let i=void 0!==o?s._$Co?.[o]:s._$Cl;const a=N(t)?void 0:t._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),void 0===a?i=void 0:(i=new a(e),i._$AT(e,s,o)),void 0!==o?(s._$Co??=[])[o]=i:s._$Cl=i),void 0!==i&&(t=Z(e,i._$AS(e,t.values),i,o)),t}class Q{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:s}=this._$AD,o=(e?.creationScope??D).importNode(t,!0);J.currentNode=o;let i=J.nextNode(),a=0,n=0,r=s[0];for(;void 0!==r;){if(a===r.index){let t;2===r.type?t=new ee(i,i.nextSibling,this,e):1===r.type?t=new r.ctor(i,r.name,r.strings,this,e):6===r.type&&(t=new ae(i,this,e)),this._$AV.push(t),r=s[++n]}a!==r?.index&&(i=J.nextNode(),a++)}return J.currentNode=D,o}p(e){let t=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}}class ee{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,s,o){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Z(this,e,t),N(e)?e===q||null==e||""===e?(this._$AH!==q&&this._$AR(),this._$AH=q):e!==this._$AH&&e!==V&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>G(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==q&&N(this._$AH)?this._$AA.nextSibling.data=e:this.T(D.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:s}=e,o="number"==typeof s?this._$AC(e):(void 0===s.el&&(s.el=X.createElement(K(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===o)this._$AH.p(t);else{const e=new Q(o,this),s=e.u(this.options);e.p(t),this.T(s),this._$AH=e}}_$AC(e){let t=W.get(e.strings);return void 0===t&&W.set(e.strings,t=new X(e)),t}k(e){G(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let s,o=0;for(const i of e)o===t.length?t.push(s=new ee(this.O(z()),this.O(z()),this,this.options)):s=t[o],s._$AI(i),o++;o<t.length&&(this._$AR(s&&s._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=w(e).nextSibling;w(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class te{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,o,i){this.type=1,this._$AH=q,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=i,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=q}_$AI(e,t=this,s,o){const i=this.strings;let a=!1;if(void 0===i)e=Z(this,e,t,0),a=!N(e)||e!==this._$AH&&e!==V,a&&(this._$AH=e);else{const o=e;let n,r;for(e=i[0],n=0;n<i.length-1;n++)r=Z(this,o[s+n],t,n),r===V&&(r=this._$AH[n]),a||=!N(r)||r!==this._$AH[n],r===q?e=q:e!==q&&(e+=(r??"")+i[n+1]),this._$AH[n]=r}a&&!o&&this.j(e)}j(e){e===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class se extends te{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===q?void 0:e}}class oe extends te{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==q)}}class ie extends te{constructor(e,t,s,o,i){super(e,t,s,o,i),this.type=5}_$AI(e,t=this){if((e=Z(this,e,t,0)??q)===V)return;const s=this._$AH,o=e===q&&s!==q||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,i=e!==q&&(s===q||o);o&&this.element.removeEventListener(this.name,this,s),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class ae{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){Z(this,e)}}const ne=$.litHtmlPolyfillSupport;ne?.(X,ee),($.litHtmlVersions??=[]).push("3.3.2");const re=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class le extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,s)=>{const o=s?.renderBefore??t;let i=o._$litPart$;if(void 0===i){const e=s?.renderBefore??null;o._$litPart$=i=new ee(t.insertBefore(z(),e),e,void 0,s??{})}return i._$AI(e),i})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return V}}le._$litElement$=!0,le.finalized=!0,re.litElementHydrateSupport?.({LitElement:le});const de=re.litElementPolyfillSupport;de?.({LitElement:le}),(re.litElementVersions??=[]).push("4.2.2");const ce=new class{constructor(){this._ws=null,this._listeners=[],this._reconnectDelay=1e3}connect(){const e="https:"===location.protocol?"wss:":"ws:",t=location.pathname.match(/^(\/api\/hassio_ingress\/[^/]+)/),s=t?t[1]:"",o=`${e}//${location.host}${s}/api/ws`;this._ws=new WebSocket(o),this._ws.onmessage=e=>{try{const t=JSON.parse(e.data);this._listeners.forEach(e=>e(t))}catch(e){console.error("WebSocket parse error:",e)}},this._ws.onclose=()=>{setTimeout(()=>this.connect(),this._reconnectDelay),this._reconnectDelay=Math.min(2*this._reconnectDelay,3e4)},this._ws.onopen=()=>{this._reconnectDelay=1e3}}onMessage(e){return this._listeners.push(e),()=>{this._listeners=this._listeners.filter(t=>t!==e)}}disconnect(){this._ws&&this._ws.close()}};class pe extends le{static properties={currentView:{type:String}};static styles=a`
    :host {
      display: block;
      background: #16213e;
      border-bottom: 1px solid #2a2a4a;
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
      color: #4fc3f7;
      margin-right: 32px;
    }
    .nav-links {
      display: flex;
      gap: 4px;
    }
    button {
      background: none;
      border: none;
      color: #888;
      padding: 8px 16px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.2s;
    }
    button:hover {
      color: #ccc;
      background: rgba(255,255,255,0.05);
    }
    button.active {
      color: #4fc3f7;
      background: rgba(79,195,247,0.1);
    }
    .version {
      font-size: 10px;
      color: #444;
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
        <span class="version">v0.1.0 build ${"3/22 20:55"}</span>
      </nav>
    `}_navigate(e){this.dispatchEvent(new CustomEvent("view-change",{detail:{view:e}}))}}customElements.define("nav-bar",pe);const he=function(){const e=location.pathname.match(/^(\/api\/hassio_ingress\/[^/]+)/);return e?e[1]:""}();async function ue(e,t={}){const s=await fetch(e,t);if(!s.ok){const e=await s.text().catch(()=>s.statusText);throw new Error(`API error ${s.status}: ${e}`)}const o=s.headers.get("content-type");return o&&o.includes("application/json")?s.json():null}async function ge(e=0){return ue(e>0?`${he}/api/devices?since=${e}`:`${he}/api/devices`)}async function me(e){return ue(`${he}/api/devices/${e}`)}async function be(){return ue(`${he}/api/topology`)}async function fe(e){return ue(`${he}/api/topology/layouts`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}async function ve(){return ue(`${he}/api/groups`)}async function _e(e,t,s=[]){return ue(`${he}/api/groups`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:e,name:t,device_ids:s})})}async function xe(e,{name:t,device_ids:s,custom_commands:o,custom_sensors:i,thresholds:a,hidden_commands:n}){return ue(`${he}/api/groups/${e}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:t,device_ids:s,custom_commands:o,custom_sensors:i,thresholds:a,hidden_commands:n})})}async function ye(){return ue(`${he}/api/tags`)}async function $e(e){return ue(`${he}/api/tags`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({tag:e})})}async function we(e){return ue(`${he}/api/tags/${encodeURIComponent(e)}`,{method:"DELETE"})}async function ke(e){return ue(`${he}/api/devices/${e}/effective-settings`)}async function Se(e,t){return ue(`${he}/api/devices/${e}/settings`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})}async function Ce(e,t){return ue(`${he}/api/devices/${e}/push-config`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})}async function Ee(e,t=null){return ue(`${he}/api/groups/${e}/check-conflicts`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t?{new_device_id:t}:{})})}class Ae extends le{static properties={selectedTags:{type:Array},_allTags:{type:Array,state:!0},_open:{type:Boolean,state:!0},_showCreate:{type:Boolean,state:!0},_newTagName:{type:String,state:!0},_creating:{type:Boolean,state:!0}};static styles=a`
    :host { display: inline-block; position: relative; }

    .trigger {
      background: #2a2a4a; border: 1px solid #3a3a5a; color: #aaa;
      padding: 6px 14px; border-radius: 16px; cursor: pointer; font-size: 13px;
      transition: all 0.2s; display: flex; align-items: center; gap: 6px;
      user-select: none;
    }
    .trigger:hover { background: #3a3a5a; color: #ccc; border-color: #4a4a6a; }
    .trigger.has-selected { border-color: #4fc3f7; color: #4fc3f7; }
    .arrow { font-size: 10px; }

    .dropdown {
      position: absolute; top: calc(100% + 4px); left: 0;
      background: #2a2a4a; border: 1px solid #3a3a5a; border-radius: 8px;
      min-width: 200px; max-height: 280px; overflow-y: auto;
      z-index: 200; box-shadow: 0 8px 24px rgba(0,0,0,0.4);
    }

    .dropdown-item {
      display: flex; align-items: center; gap: 8px;
      padding: 8px 14px; cursor: pointer; font-size: 13px; color: #ccc;
      transition: background 0.15s;
    }
    .dropdown-item:hover { background: #3a3a5a; }
    .checkbox {
      width: 16px; height: 16px; border: 1.5px solid #555; border-radius: 3px;
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
      font-size: 11px; color: #1a1a2e; transition: all 0.15s;
    }
    .dropdown-item.checked .checkbox {
      background: #4fc3f7; border-color: #4fc3f7;
    }

    .dropdown-divider {
      border: none; border-top: 1px solid #3a3a5a; margin: 4px 0;
    }

    .create-row {
      padding: 8px 14px; display: flex; gap: 6px; align-items: center;
    }
    .create-link {
      font-size: 12px; color: #888; cursor: pointer; transition: color 0.15s;
    }
    .create-link:hover { color: #4fc3f7; }

    .create-input {
      flex: 1; background: #1a1a2e; border: 1px solid #3a3a5a;
      border-radius: 4px; color: #e0e0e0; padding: 4px 8px;
      font-size: 12px; min-width: 0;
    }
    .create-input:focus { outline: none; border-color: #4fc3f7; }
    .create-btn {
      background: #4fc3f7; border: none; color: #1a1a2e; padding: 4px 10px;
      border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: 600;
      white-space: nowrap;
    }
    .create-btn:disabled { opacity: 0.5; cursor: default; }
    .cancel-btn {
      background: none; border: none; color: #666; cursor: pointer;
      font-size: 16px; line-height: 1; padding: 0 2px;
    }
    .cancel-btn:hover { color: #ccc; }

    .empty { padding: 12px 14px; color: #666; font-size: 12px; text-align: center; }
  `;constructor(){super(),this.selectedTags=[],this._allTags=[],this._open=!1,this._showCreate=!1,this._newTagName="",this._creating=!1,this._onDocClick=this._onDocClick.bind(this)}connectedCallback(){super.connectedCallback(),this._loadTags(),document.addEventListener("click",this._onDocClick)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._onDocClick)}async _loadTags(){try{const e=await ye();Array.isArray(e)&&(this._allTags=e.map(e=>"string"==typeof e?e:e.tag).sort())}catch(e){console.error("Failed to load tags:",e)}}_onDocClick(e){if(!this._open)return;e.composedPath().includes(this)||(this._open=!1,this._showCreate=!1)}_toggle(e){e.stopPropagation(),this._open=!this._open,this._open||(this._showCreate=!1)}_toggleTag(e){(this.selectedTags||[]).includes(e)?this.dispatchEvent(new CustomEvent("tag-remove",{detail:{tag:e},bubbles:!0,composed:!0})):this.dispatchEvent(new CustomEvent("tag-add",{detail:{tag:e},bubbles:!0,composed:!0}))}async _createTag(){const e=this._newTagName.trim();if(e&&!this._creating){this._creating=!0;try{await $e(e),await this._loadTags(),this.dispatchEvent(new CustomEvent("tag-add",{detail:{tag:e},bubbles:!0,composed:!0})),this._newTagName="",this._showCreate=!1}catch(e){console.error("Failed to create tag:",e)}finally{this._creating=!1}}}render(){const e=this.selectedTags||[],t=e.length>0;return H`
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
    `}}customElements.define("tag-picker",Ae);class Te extends le{static properties={device:{type:Object},effectiveSettings:{type:Object},haOverrides:{type:Object},groups:{type:Object},_showHidden:{type:Boolean,state:!0}};static styles=a`
    /* Attributes + HA exposure */
    .section {
      background: #2a2a4a; border-radius: 8px; padding: 16px;
      margin-bottom: 16px;
    }
    .section-title {
      font-size: 12px; color: #666; text-transform: uppercase;
      letter-spacing: 1px; margin-bottom: 12px; font-weight: 600;
    }
    .attr-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      gap: 12px;
    }
    .attr-tile {
      background: #1a1a2e; border-radius: 8px; padding: 12px;
      position: relative; transition: opacity 0.2s;
    }
    .attr-tile.dimmed { opacity: 0.45; }
    .attr-tile-top {
      display: flex; justify-content: space-between; align-items: flex-start;
      margin-bottom: 6px;
    }
    .attr-label {
      font-size: 10px; color: #666; text-transform: uppercase;
      letter-spacing: 0.5px; display: flex; align-items: center; gap: 4px;
    }
    .attr-delete {
      font-size: 14px; color: #555; cursor: pointer; line-height: 1;
    }
    .attr-delete:hover { color: #ef5350; }
    .attr-val {
      font-size: 22px; font-weight: 700; margin-top: 4px; color: #4fc3f7;
      transition: color 0.2s;
    }
    .attr-val.dimmed-val { color: #555; }
    .attr-unit { font-size: 12px; color: #888; font-weight: 400; }
    .attr-tile.exceeded { border: 1px solid #ffb74d; }
    .attr-val.exceeded-val { color: #ffb74d; }
    .attr-threshold-row {
      display: flex; align-items: center; gap: 4px; margin-top: 4px;
    }
    .threshold-op {
      background: transparent; border: 1px solid #3a3a5a; border-radius: 3px;
      color: #aaa; padding: 2px 2px; font-size: 10px; cursor: pointer;
      width: 36px; text-align: center;
    }
    .threshold-op:focus { outline: none; border-color: #4fc3f7; }
    .threshold-inline {
      width: 50px; background: transparent; border: 1px solid #3a3a5a;
      border-radius: 3px; color: #aaa; padding: 2px 4px; font-size: 10px;
      text-align: center;
    }
    .threshold-inline:focus { outline: none; border-color: #4fc3f7; color: #e0e0e0; }
    .threshold-inline::placeholder { color: #444; }

    /* Toggle switch */
    .toggle-wrap { cursor: pointer; flex-shrink: 0; }
    .toggle {
      width: 32px; height: 18px; border-radius: 9px; position: relative;
      transition: background 0.2s;
    }
    .toggle.on  { background: #4fc3f7; }
    .toggle.off { background: #444; }
    .toggle-knob {
      width: 14px; height: 14px; border-radius: 50%; background: #fff;
      position: absolute; top: 2px; transition: left 0.2s;
    }
    .toggle.on  .toggle-knob { left: 16px; }
    .toggle.off .toggle-knob { left: 2px; }
  `;constructor(){super(),this.device=null,this.effectiveSettings=null,this.haOverrides={},this.groups={},this._showHidden=!1}_isExposed(e){if(void 0!==this.haOverrides[e])return this.haOverrides[e];const t=this.effectiveSettings;return void 0===t?.ha_exposure_overrides?.[e]||t.ha_exposure_overrides[e]}_getThresholdForAttr(e){const t=this.effectiveSettings;if(!t)return null;const s=(t.thresholds||{})[e];if(null==s)return null;const o=this.device?.threshold_overrides||{},i=this.device?.group_policy,a=i?this.groups[i]:null;let n="global";return null!=o[e]?n="device":null!=a?.thresholds?.[e]&&(n="group"),{value:s,source:n}}_checkThreshold(e,t){if(!t||null==e||"number"!=typeof e)return!1;const s="object"==typeof t?t.value:t,o="object"==typeof t&&t.op||">";if(null==s)return!1;switch(o){case">":default:return e>s;case"<":return e<s;case">=":return e>=s;case"<=":return e<=s;case"==":return e===s;case"!=":return e!==s}}_getThresholdOp(e){const t=(this.device?.threshold_overrides||{})[e];if(null!=t&&"object"==typeof t)return t.op||">";const s=this.effectiveSettings;if(!s)return">";const o=(s.thresholds||{})[e];return null!=o&&"object"==typeof o&&o.op||">"}_getThresholdVal(e){const t=(this.device?.threshold_overrides||{})[e];if(null!=t)return"object"==typeof t?t.value:t;const s=this._getThresholdForAttr(e);return s?s.value:null}render(){if(!this.device)return H``;const e=Object.entries(this.device.attributes||{}),t=this.device.hidden_attributes||[],s=e.filter(([e])=>!t.includes(e)),o=e.filter(([e])=>t.includes(e));return 0===e.length?H``:H`
      <div class="section">
        <div class="section-title">Attributes</div>
        <div class="attr-grid">
          ${s.map(([e,t])=>this._renderAttrTile(e,t))}
        </div>
        ${o.length>0?H`
          <div style="margin-top: 12px;">
            <div style="font-size: 10px; color: #555; margin-bottom: 6px; cursor: pointer;"
              @click=${()=>this._showHidden=!this._showHidden}>
              ${this._showHidden?"▾":"▸"} ${o.length} hidden attribute${1!==o.length?"s":""}
            </div>
            ${this._showHidden?H`
              <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                ${o.map(([e])=>H`
                  <span style="font-size: 11px; background: #1a1a2e; color: #555; padding: 3px 10px; border-radius: 4px; display: flex; align-items: center; gap: 4px;">
                    ${e.replace(/_/g," ")}
                    <span style="cursor: pointer; color: #4fc3f7; font-size: 10px;"
                      @click=${()=>this._onUnhide(e)}>show</span>
                  </span>
                `)}
              </div>
            `:""}
          </div>
        `:""}
      </div>
    `}_renderAttrTile(e,t){const s=this._isExposed(e),o=this._getThresholdForAttr(e),i=null!=t.value?t.value:null,a=(this.device?.threshold_overrides||{})[e],n=null!=a?a:o?o.value:null,r=this._checkThreshold(i,n),l=this._getThresholdOp(e),d=this._getThresholdVal(e);return H`
      <div class="attr-tile ${s?"":"dimmed"} ${r?"exceeded":""}">
        <div class="attr-tile-top">
          <span class="attr-label">${e.replace(/_/g," ")}
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
        <div class="attr-val ${s?"":"dimmed-val"} ${r?"exceeded-val":""}">
          ${null!=i?i:"—"}
          <span class="attr-unit">${t.unit||""}</span>
        </div>
        <div class="attr-threshold-row">
          ${r?H`<span style="color: #ffb74d; font-size: 11px;">\u26A0</span>`:""}
          <span style="font-size: 9px; color: #666;">Warn</span>
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
          ${o&&"device"!==o.source&&null==a?H`
            <span style="font-size: 8px; color: #555;">${o.source}</span>
          `:""}
        </div>
      </div>
    `}_onDelete(e){this.dispatchEvent(new CustomEvent("attribute-deleted",{detail:{name:e},bubbles:!0,composed:!0}))}_onUnhide(e){this.dispatchEvent(new CustomEvent("attribute-unhidden",{detail:{name:e},bubbles:!0,composed:!0}))}_onToggleExposure(e){this.dispatchEvent(new CustomEvent("ha-exposure-toggled",{detail:{name:e},bubbles:!0,composed:!0}))}_onThresholdChange(e,t,s){this.dispatchEvent(new CustomEvent("threshold-changed",{detail:{name:e,value:t,op:s},bubbles:!0,composed:!0}))}}customElements.define("device-attributes",Te);const De=["shutdown","halt","poweroff","destroy"];class ze extends le{static properties={device:{type:Object},serverCommands:{type:Object},commandResult:{type:String},_showHiddenCmds:{type:Boolean,state:!0},_showAddCommand:{type:Boolean,state:!0},_editingCommandName:{type:String,state:!0},_editCommandForm:{type:Object,state:!0}};static styles=a`
    .section {
      background: #2a2a4a; border-radius: 8px; padding: 16px;
      margin-bottom: 16px;
    }
    .section-title {
      font-size: 12px; color: #666; text-transform: uppercase;
      letter-spacing: 1px; margin-bottom: 12px; font-weight: 600;
    }
    .commands { display: flex; gap: 6px; flex-wrap: wrap; }
    .cmd-wrap {
      display: inline-flex; position: relative;
    }
    .cmd-btn {
      background: #3a3a5a; border: none; color: #ccc; padding: 8px 14px;
      border-radius: 6px; cursor: pointer; font-size: 13px; transition: all 0.2s;
    }
    .cmd-btn:hover { background: #4a4a6a; }
    .cmd-btn.danger { background: #5a2a2a; color: #ef5350; }
    .cmd-btn.danger:hover { background: #6a3a3a; }
    .cmd-eye {
      position: absolute; top: -4px; right: -4px;
      background: #2a2a4a; border: 1px solid #3a3a5a; border-radius: 50%;
      width: 16px; height: 16px; display: flex; align-items: center;
      justify-content: center; cursor: pointer; font-size: 9px;
      color: #666; transition: all 0.15s; line-height: 1;
    }
    .cmd-eye:hover { color: #4fc3f7; border-color: #4fc3f7; background: #1a2a3e; }
    .cmd-result {
      margin-top: 8px; padding: 8px 12px; background: #1a1a2e;
      border-radius: 4px; font-size: 12px; color: #aaa; font-family: monospace;
    }
    .sensor-table { width: 100%; border-collapse: collapse; margin-bottom: 12px; }
    .sensor-table th {
      text-align: left; font-size: 10px; color: #666; text-transform: uppercase;
      letter-spacing: 0.5px; padding: 6px 8px; border-bottom: 1px solid #3a3a5a;
    }
    .sensor-table td {
      font-size: 12px; color: #ccc; padding: 7px 8px; border-bottom: 1px solid #2a2a4a;
    }
    .sensor-table td.mono { font-family: monospace; font-size: 11px; }
    .sensor-table tr:last-child td { border-bottom: none; }
    .sensor-actions { display: flex; gap: 4px; }
    .sensor-btn {
      background: none; border: none; cursor: pointer; font-size: 11px;
      padding: 2px 6px; border-radius: 3px; transition: all 0.15s;
    }
    .sensor-btn.edit   { color: #4fc3f7; }
    .sensor-btn.edit:hover  { background: rgba(79,195,247,0.1); }
    .sensor-btn.remove { color: #666; }
    .sensor-btn.remove:hover { color: #ef5350; background: rgba(239,83,80,0.1); }
    .sensor-form {
      background: #1a1a2e; border-radius: 6px; padding: 14px; margin-bottom: 12px;
    }
    .sensor-form-grid {
      display: grid; grid-template-columns: 1fr 2fr; gap: 8px; margin-bottom: 10px;
    }
    .sensor-form-grid input {
      background: #2a2a4a; border: 1px solid #3a3a5a; border-radius: 4px;
      color: #e0e0e0; padding: 5px 8px; font-size: 12px;
    }
    .sensor-form-grid input:focus { outline: none; border-color: #4fc3f7; }
    .sensor-form-grid input::placeholder { color: #555; }
    .sensor-form-actions { display: flex; gap: 6px; }
    .form-btn {
      border: none; padding: 5px 14px; border-radius: 4px; cursor: pointer; font-size: 12px;
    }
    .form-btn.save   { background: #4fc3f7; color: #1a1a2e; font-weight: 600; }
    .form-btn.cancel { background: #3a3a5a; color: #aaa; }
    .add-btn {
      background: none; border: 1px dashed #3a3a5a; color: #666; padding: 6px 14px;
      border-radius: 6px; cursor: pointer; font-size: 12px; transition: all 0.15s;
      margin-top: 8px;
    }
    .add-btn:hover { border-color: #4fc3f7; color: #4fc3f7; }
  `;constructor(){super(),this.device=null,this.serverCommands={},this.commandResult="",this._showHiddenCmds=!1,this._showAddCommand=!1,this._editingCommandName=null,this._editCommandForm=null}render(){if(!this.device)return H``;const e=this.device.allowed_commands||[],t=this.serverCommands||{},s=Object.keys(t),o=[...new Set([...e,...s])],i=this.device.hidden_commands||[],a=o.filter(e=>!i.includes(e)),n=o.filter(e=>i.includes(e));return H`
      <div class="section">
        <div class="section-title">Commands</div>

        ${a.length>0?H`
          <div class="commands" style="margin-bottom: 12px;">
            ${a.map(e=>H`
              <span class="cmd-wrap">
                <button class="cmd-btn ${function(e){const t=e.toLowerCase();return De.some(e=>t.includes(e))}(e)?"danger":""}"
                  @click=${()=>this._onSend(e)}>${e}</button>
                <span class="cmd-eye" title="Hide command"
                  @click=${t=>{t.stopPropagation(),this._onHide(e)}}>&#128065;</span>
              </span>
            `)}
          </div>
        `:""}
        ${this.commandResult?H`<div class="cmd-result">${this.commandResult}</div>`:""}

        ${s.length>0?H`
          <div style="margin-top: 8px; font-size: 11px; color: #555; margin-bottom: 6px;">Server-managed commands</div>
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
            <div style="font-size: 10px; color: #555; margin-bottom: 6px; cursor: pointer;"
              @click=${()=>this._showHiddenCmds=!this._showHiddenCmds}>
              ${this._showHiddenCmds?"▾":"▸"} ${n.length} hidden
            </div>
            ${this._showHiddenCmds?H`
              <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                ${n.map(e=>H`
                  <span style="font-size: 11px; background: #1a1a2e; color: #555; padding: 3px 10px; border-radius: 4px; display: flex; align-items: center; gap: 6px;">
                    ${e}
                    <span style="cursor: pointer; color: #4fc3f7; font-size: 10px;"
                      @click=${()=>this._onUnhide(e)}>show</span>
                  </span>
                `)}
              </div>
            `:""}
          </div>
        `:""}
      </div>
    `}_startAdd(){this._showAddCommand=!0,this._editingCommandName=null,this._editCommandForm={name:"",shell:""}}_startEdit(e,t){this._editingCommandName=e,this._showAddCommand=!1,this._editCommandForm={name:e,shell:t}}_saveForm(){const e=this._editCommandForm;if(!e)return;const t=(e.name||"").trim(),s=(e.shell||"").trim();t&&s&&(this.dispatchEvent(new CustomEvent("server-command-save",{detail:{name:t,shell:s,editing:this._editingCommandName},bubbles:!0,composed:!0})),this._cancelForm())}_cancelForm(){this._showAddCommand=!1,this._editingCommandName=null,this._editCommandForm=null}_onSend(e){this.dispatchEvent(new CustomEvent("command-send",{detail:{command:e},bubbles:!0,composed:!0}))}_onHide(e){this.dispatchEvent(new CustomEvent("command-hide",{detail:{name:e},bubbles:!0,composed:!0}))}_onUnhide(e){this.dispatchEvent(new CustomEvent("command-unhide",{detail:{name:e},bubbles:!0,composed:!0}))}_onRemove(e){this.dispatchEvent(new CustomEvent("server-command-remove",{detail:{name:e},bubbles:!0,composed:!0}))}}customElements.define("device-commands",ze);class Ne extends le{static properties={device:{type:Object},configInterval:{type:Number},customSensors:{type:Object},pushing:{type:Boolean},pushStatus:{type:String},lastPushed:{type:String},_showAddSensor:{type:Boolean,state:!0},_editSensorKey:{type:String,state:!0},_sensorForm:{type:Object,state:!0}};static styles=a`
    .section {
      background: #2a2a4a; border-radius: 8px; padding: 16px;
      margin-bottom: 16px;
    }
    .section-title {
      font-size: 12px; color: #666; text-transform: uppercase;
      letter-spacing: 1px; margin-bottom: 12px; font-weight: 600;
    }

    .config-row { display: flex; gap: 10px; align-items: center; margin-bottom: 14px; }
    .config-label { font-size: 12px; color: #888; min-width: 120px; }
    .config-input {
      background: #1a1a2e; border: 1px solid #3a3a5a; border-radius: 4px;
      color: #e0e0e0; padding: 5px 10px; font-size: 13px; width: 100px;
    }
    .config-input:focus { outline: none; border-color: #4fc3f7; }
    .plugins-list { display: flex; gap: 6px; flex-wrap: wrap; }
    .plugin-badge {
      background: #1a1a2e; color: #888; padding: 3px 10px;
      border-radius: 4px; font-size: 11px;
    }

    /* Sensor table */
    .sensor-table { width: 100%; border-collapse: collapse; margin-bottom: 12px; }
    .sensor-table th {
      text-align: left; font-size: 10px; color: #666; text-transform: uppercase;
      letter-spacing: 0.5px; padding: 6px 8px; border-bottom: 1px solid #3a3a5a;
    }
    .sensor-table td {
      font-size: 12px; color: #ccc; padding: 7px 8px; border-bottom: 1px solid #2a2a4a;
      font-family: monospace;
    }
    .sensor-table tr:last-child td { border-bottom: none; }
    .sensor-actions { display: flex; gap: 4px; }
    .sensor-btn {
      background: none; border: none; cursor: pointer; font-size: 11px;
      padding: 2px 6px; border-radius: 3px; transition: all 0.15s;
    }
    .sensor-btn.edit   { color: #4fc3f7; }
    .sensor-btn.edit:hover  { background: rgba(79,195,247,0.1); }
    .sensor-btn.remove { color: #666; }
    .sensor-btn.remove:hover { color: #ef5350; background: rgba(239,83,80,0.1); }

    /* Sensor form */
    .sensor-form {
      background: #1a1a2e; border-radius: 6px; padding: 14px; margin-bottom: 12px;
    }
    .sensor-form-grid {
      display: grid; grid-template-columns: 1fr 2fr 80px 80px; gap: 8px; margin-bottom: 10px;
    }
    .sensor-form-grid input {
      background: #2a2a4a; border: 1px solid #3a3a5a; border-radius: 4px;
      color: #e0e0e0; padding: 5px 8px; font-size: 12px;
    }
    .sensor-form-grid input:focus { outline: none; border-color: #4fc3f7; }
    .sensor-form-grid input::placeholder { color: #555; }
    .sensor-form-actions { display: flex; gap: 6px; }
    .form-btn {
      border: none; padding: 5px 14px; border-radius: 4px; cursor: pointer; font-size: 12px;
    }
    .form-btn.save   { background: #4fc3f7; color: #1a1a2e; font-weight: 600; }
    .form-btn.cancel { background: #3a3a5a; color: #aaa; }

    /* cmd-btn (used for Add Sensor button) */
    .cmd-btn {
      background: #3a3a5a; border: none; color: #ccc; padding: 8px 16px;
      border-radius: 6px; cursor: pointer; font-size: 13px; transition: all 0.2s;
    }
    .cmd-btn:hover { background: #4a4a6a; }

    /* Push config */
    .push-row { display: flex; align-items: center; gap: 12px; margin-top: 14px; flex-wrap: wrap; }
    .push-btn {
      background: #2e7d32; border: none; color: #fff; padding: 8px 20px;
      border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 600;
      transition: all 0.2s;
    }
    .push-btn:hover    { background: #388e3c; }
    .push-btn:disabled { opacity: 0.5; cursor: default; }
    .push-status        { font-size: 12px; color: #888; }
    .push-status.synced { color: #81c784; }
    .push-status.pending{ color: #ffb74d; }
  `;constructor(){super(),this.device=null,this.configInterval=30,this.customSensors={},this.pushing=!1,this.pushStatus="",this.lastPushed="",this._showAddSensor=!1,this._editSensorKey=null,this._sensorForm={name:"",command:"",interval:30,unit:""}}render(){if(!this.device)return H``;const e=this.device.remote_config||{},t=this.device.active_plugins||(e.plugins?Object.keys(e.plugins):[]),s=this.customSensors;return H`
      <div class="section">
        <div class="section-title">Agent Configuration</div>

        <div class="config-row">
          <span class="config-label">Collection interval</span>
          <input class="config-input" type="number" min="5"
            .value=${String(this.configInterval)}
            @input=${e=>this._onIntervalChange(Number(e.target.value))}>
          <span style="font-size: 12px; color: #666; margin-left: 4px;">seconds</span>
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
          `:H`<div style="font-size: 13px; color: #555; margin-bottom: 10px;">No custom sensors</div>`}

          ${this._showAddSensor||this._editSensorKey?this._renderSensorForm():H`
            <button class="cmd-btn" style="font-size: 12px; padding: 5px 12px;"
              @click=${this._startAdd}>+ Add Sensor</button>
          `}
        </div>

        ${this.device.allowed_commands?.length>0?H`
          <div class="config-row" style="margin-bottom: 0;">
            <span class="config-label" style="color: #666;">Allowed commands</span>
            <div style="font-size: 12px; color: #666;">${(this.device.allowed_commands||[]).join(", ")}</div>
          </div>
        `:""}

        <div class="push-row">
          <button class="push-btn" ?disabled=${this.pushing} @click=${this._onPush}>
            ${this.pushing?"Pushing...":"Push Config"}
          </button>
          ${this.lastPushed?H`
            <span class="push-status">Last pushed: ${this.lastPushed}</span>
          `:""}
          ${this.pushStatus?H`
            <span class="push-status ${"Config synced"===this.pushStatus?"synced":"pending"}">
              ${this.pushStatus}
            </span>
          `:""}
        </div>
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
    `}_startAdd(){this._showAddSensor=!0,this._editSensorKey=null,this._sensorForm={name:"",command:"",interval:30,unit:""}}_startEdit(e,t){this._editSensorKey=e,this._showAddSensor=!1,this._sensorForm={name:e,command:t.command,interval:t.interval||30,unit:t.unit||""}}_saveForm(){const{name:e,command:t,interval:s,unit:o}=this._sensorForm;e.trim()&&t.trim()&&(this.dispatchEvent(new CustomEvent("sensor-save",{detail:{key:e.trim(),sensor:{command:t,interval:s||30,unit:o},oldKey:this._editSensorKey},bubbles:!0,composed:!0})),this._cancelForm())}_cancelForm(){this._showAddSensor=!1,this._editSensorKey=null,this._sensorForm={name:"",command:"",interval:30,unit:""}}_onIntervalChange(e){this.dispatchEvent(new CustomEvent("interval-changed",{detail:{value:e},bubbles:!0,composed:!0}))}_onRemove(e){this.dispatchEvent(new CustomEvent("sensor-remove",{detail:{key:e},bubbles:!0,composed:!0}))}_onPush(){this.dispatchEvent(new CustomEvent("push-config",{bubbles:!0,composed:!0}))}}customElements.define("device-config",Ne);class Ge extends le{static properties={deviceId:{type:String},device:{type:Object},commandResult:{type:String},_groups:{type:Object,state:!0},_effectiveSettings:{type:Object,state:!0},_haOverrides:{type:Object,state:!0},_configInterval:{type:Number,state:!0},_customSensors:{type:Object,state:!0},_pushing:{type:Boolean,state:!0},_pushStatus:{type:String,state:!0},_lastPushed:{type:String,state:!0},_localChanges:{type:Boolean,state:!0},_showGroupDialog:{type:Boolean,state:!0},_newGroupName:{type:String,state:!0},_serverCommands:{type:Object,state:!0}};static styles=a`
    :host { display: block; padding: 20px; max-width: 1000px; margin: 0 auto; }

    .close-btn {
      background: none; border: none; color: #666; cursor: pointer;
      font-size: 20px; padding: 4px 8px; line-height: 1; border-radius: 4px;
      transition: all 0.15s;
    }
    .close-btn:hover { color: #ccc; background: rgba(255,255,255,0.05); }

    .header {
      display: flex; justify-content: space-between; align-items: center;
      margin-bottom: 20px;
    }
    .header-left { display: flex; flex-direction: column; gap: 2px; }
    .title       { font-size: 24px; font-weight: 700; }
    .device-type { font-size: 12px; color: #666; }
    .status-badge { padding: 4px 12px; border-radius: 12px; font-size: 13px; }

    .section {
      background: #2a2a4a; border-radius: 8px; padding: 16px;
      margin-bottom: 16px;
    }
    .section-title {
      font-size: 12px; color: #666; text-transform: uppercase;
      letter-spacing: 1px; margin-bottom: 12px; font-weight: 600;
    }

    /* Tags */
    .tags-row { display: flex; gap: 6px; flex-wrap: wrap; align-items: center; margin-bottom: 10px; }
    .tag { display: flex; align-items: center; gap: 4px; font-size: 11px; padding: 3px 10px; border-radius: 4px; }
    .tag.client { background: #1e3a5f; color: #4fc3f7; }
    .tag.server { background: #3a1e5f; color: #ce93d8; }
    .tag .remove { cursor: pointer; font-size: 13px; line-height: 1; opacity: 0.6; }
    .tag .remove:hover { opacity: 1; }
    .tag-hint { font-size: 10px; color: #555; margin-top: 8px; }

    /* Group policy */
    .group-policy-row { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }
    .group-select {
      background: #1a1a2e; border: 1px solid #3a3a5a; border-radius: 6px;
      color: #e0e0e0; padding: 6px 12px; font-size: 13px; min-width: 200px;
    }
    .group-select:focus { outline: none; border-color: #4fc3f7; }
    .group-threshold-summary {
      font-size: 11px; color: #666; display: flex; gap: 12px; flex-wrap: wrap;
      margin-top: 8px;
    }
    .group-hint { font-size: 10px; color: #555; margin-top: 8px; }

    /* Network */
    .network-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 8px;
    }
    .net-item  { font-size: 13px; color: #aaa; }
    .net-label { color: #666; margin-right: 8px; }

    /* Shared cmd-btn used in header and group policy */
    .cmd-btn {
      background: #3a3a5a; border: none; color: #ccc; padding: 8px 16px;
      border-radius: 6px; cursor: pointer; font-size: 13px; transition: all 0.2s;
    }
    .cmd-btn:hover        { background: #4a4a6a; }
    .cmd-btn.danger       { background: #5a2a2a; color: #ef5350; }
    .cmd-btn.danger:hover { background: #6a3a3a; }

    /* Dialog overlay */
    .overlay {
      position: fixed; top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.6); display: flex; align-items: center;
      justify-content: center; z-index: 1000;
    }
    .dialog {
      background: #2a2a4a; border-radius: 12px; padding: 24px;
      min-width: 320px; border: 1px solid #3a3a5a;
    }
    .dialog h3 { color: #e0e0e0; margin-bottom: 12px; font-size: 16px; margin-top: 0; }
    .dialog-field { margin-bottom: 12px; }
    .dialog-field label { display: block; font-size: 11px; color: #888; margin-bottom: 4px; }
    .dialog-field input {
      width: 100%; background: #1a1a2e; border: 1px solid #3a3a5a;
      border-radius: 6px; color: #e0e0e0; padding: 8px 12px; font-size: 13px;
      box-sizing: border-box;
    }
    .dialog-field input:focus { outline: none; border-color: #4fc3f7; }
    .dialog-buttons { display: flex; gap: 8px; justify-content: flex-end; margin-top: 16px; }
    .dialog-btn { border: none; padding: 8px 18px; border-radius: 6px; cursor: pointer; font-size: 13px; }
    .dialog-btn.save   { background: #4fc3f7; color: #1a1a2e; font-weight: 600; }
    .dialog-btn.cancel { background: #3a3a5a; color: #aaa; }
  `;constructor(){super(),this.device=null,this.commandResult="",this._groups={},this._effectiveSettings=null,this._haOverrides={},this._configInterval=30,this._customSensors={},this._pushing=!1,this._pushStatus="",this._lastPushed="",this._localChanges=!1,this._showGroupDialog=!1,this._newGroupName="",this._serverCommands={}}connectedCallback(){super.connectedCallback(),this._loadDevice(),this._loadGroups(),this._startPolling(),this._wsUnsub=ce.onMessage(e=>{"device_update"===e.type&&e.device_id===this.deviceId&&this._updateDeviceData(e.device)})}disconnectedCallback(){super.disconnectedCallback(),this._wsUnsub&&this._wsUnsub(),this._pollTimer&&clearInterval(this._pollTimer)}_startPolling(){this._pollTimer&&clearInterval(this._pollTimer);const e=1e3*parseInt(localStorage.getItem("mqtt-monitor-refresh")||"5");this._pollTimer=setInterval(()=>this._refreshDevice(),e)}async _refreshDevice(){try{const e=await me(this.deviceId);this._updateDeviceData(e)}catch(e){}}_updateDeviceData(e){e&&(this.device={...this.device||{},...e})}async _loadDevice(){try{this.device=await me(this.deviceId),this._haOverrides={...this.device.ha_exposure_overrides||{}};const e=this.device.server_commands;if(this._serverCommands=e&&!Array.isArray(e)?{...e}:{},this._configInterval=this.device.collection_interval||this.device.remote_config?.interval||30,this.device.remote_config){const e=this.device.remote_config.plugins?.custom_command?.commands||{};this._customSensors={...e}}try{this._effectiveSettings=await ke(this.deviceId)}catch(e){}}catch(e){console.error("Failed to load device:",e)}}async _loadGroups(){try{this._groups=await ve()}catch(e){console.error("Failed to load groups:",e)}}render(){if(!this.device)return H`<div style="padding: 40px; text-align: center; color: #888;">Loading...</div>`;const e=this.device,t="online"===e.status?"#81c784":"offline"===e.status?"#ef5350":"#ffb74d";return H`
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
        @attribute-deleted=${e=>this._deleteAttribute(e.detail.name)}
        @attribute-unhidden=${e=>this._unhideAttribute(e.detail.name)}
        @ha-exposure-toggled=${e=>this._toggleHaExposure(e.detail.name)}
        @threshold-changed=${e=>this._setThreshold(e.detail.name,e.detail.value,e.detail.op)}
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
        .pushing=${this._pushing}
        .pushStatus=${this._pushStatus}
        .lastPushed=${this._lastPushed}
        @interval-changed=${e=>{this._configInterval=e.detail.value,this._localChanges=!0}}
        @sensor-save=${e=>this._saveSensor(e.detail)}
        @sensor-remove=${e=>this._removeSensor(e.detail.key)}
        @push-config=${()=>this._pushConfig()}
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
    `}async _addTag(e){e&&(await async function(e,t){return ue(`${he}/api/devices/${e}/tags/add`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({tags:t})})}(this.deviceId,[e]),await this._loadDevice())}async _removeTag(e){await async function(e,t){return ue(`${he}/api/devices/${e}/tags/${t}`,{method:"DELETE"})}(this.deviceId,e),await this._loadDevice()}_renderGroupPolicy(){const e=Object.values(this._groups),t=this.device.group_policy||"",s=t?this._groups[t]:null,o=s?.thresholds||{};return H`
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
              <span><span style="color: #888;">${e.replace(/_/g," ")}:</span> ${t}</span>
            `)}
          </div>
        `:""}

        <div class="group-hint">
          Group policy sets default thresholds and HA entity settings. Device-level overrides take priority.
        </div>
      </div>
    `}async _onGroupPolicyChange(e){const t=e.target.value||null;try{await Se(this.deviceId,{group_policy:t}),await this._loadDevice()}catch(e){console.error("Failed to update group policy:",e)}}_renderGroupDialog(){return H`
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
    `}async _createGroup(){const e=this._newGroupName.trim();if(!e)return;const t=e.toLowerCase().replace(/[^a-z0-9]+/g,"_");await _e(t,e,[this.deviceId]),this._newGroupName="",this._showGroupDialog=!1,await this._loadGroups(),await this._loadDevice()}_renderNetwork(){const e=this.device.network||{};return 0===Object.keys(e).length?H``:H`
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
    `}async _deleteAttribute(e){if(confirm(`Hide attribute "${e}"? Custom sensors will be removed from the client. Built-in attributes will be hidden.`))try{await async function(e,t){return ue(`${he}/api/devices/${e}/attributes/${t}`,{method:"DELETE"})}(this.deviceId,e),await this._loadDevice()}catch(e){console.error("Failed to hide attribute:",e)}}async _unhideAttribute(e){try{await async function(e,t){return ue(`${he}/api/devices/${e}/attributes/${t}/unhide`,{method:"POST"})}(this.deviceId,e),await this._loadDevice()}catch(e){console.error("Failed to unhide attribute:",e)}}async _toggleHaExposure(e){const t=void 0!==this._haOverrides[e]?this._haOverrides[e]:void 0===this._effectiveSettings?.ha_exposure_overrides?.[e]||this._effectiveSettings.ha_exposure_overrides[e];this._haOverrides={...this._haOverrides,[e]:!t},this._localChanges=!0;try{await Se(this.deviceId,{ha_exposure_overrides:this._haOverrides})}catch(e){console.error("Failed to update HA exposure:",e)}}async _setThreshold(e,t,s){const o={...this.device.threshold_overrides||{}};""===t||null==t?delete o[e]:o[e]={op:s||">",value:Number(t)};try{await Se(this.deviceId,{threshold_overrides:o}),this.device={...this.device,threshold_overrides:o},this._effectiveSettings=await ke(this.deviceId)}catch(e){console.error("Failed to set threshold:",e)}}async _sendCmd(e,t={}){try{this.commandResult=`Sending ${e}...`;const s=await async function(e,t,s={}){return ue(`${he}/api/devices/${e}/command`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({command:t,params:s})})}(this.deviceId,e,t);this.commandResult=`Command sent (request: ${s.request_id})`}catch(e){this.commandResult=`Error: ${e.message}`}}async _hideCommand(e){try{await async function(e,t){return ue(`${he}/api/devices/${e}/commands/${t}`,{method:"DELETE"})}(this.deviceId,e),await this._loadDevice()}catch(e){console.error("Failed to hide command:",e)}}async _unhideCommand(e){try{await async function(e,t){return ue(`${he}/api/devices/${e}/commands/${t}/unhide`,{method:"POST"})}(this.deviceId,e),await this._loadDevice()}catch(e){console.error("Failed to unhide command:",e)}}async _saveServerCommand({name:e,shell:t}){this._serverCommands={...this._serverCommands,[e]:t},this._localChanges=!0,await Se(this.deviceId,{server_commands:this._serverCommands}),await Ce(this.deviceId,{commands:{[e]:t}}),this.requestUpdate()}async _removeServerCommand(e){const t={...this._serverCommands};delete t[e],this._serverCommands=t,this._localChanges=!0,await Se(this.deviceId,{server_commands:this._serverCommands}),await Ce(this.deviceId,{commands:t}),await this._loadDevice()}_saveSensor({key:e,sensor:t,oldKey:s}){const o={...this._customSensors};s&&s!==e&&delete o[s],o[e]=t,this._customSensors=o,this._localChanges=!0}_removeSensor(e){const t={...this._customSensors};delete t[e],this._customSensors=t,this._localChanges=!0}async _pushConfig(){this._pushing=!0,this._pushStatus="";try{const e={interval:this._configInterval,plugins:{custom_command:{commands:this._customSensors}},commands:this._serverCommands};console.log("Pushing config:",e);const t=await Ce(this.deviceId,e);console.log("Push result:",t),t&&t.detail?this._pushStatus=`Push failed: ${t.detail}`:(this._lastPushed=(new Date).toLocaleTimeString(),this._localChanges=!1,this._pushStatus="Config synced")}catch(e){console.error("Push config error:",e),this._pushStatus=`Push failed: ${e.message}`}finally{this._pushing=!1}}async _deleteDevice(){if(confirm(`Delete device "${this.device?.device_name||this.deviceId}"? This removes it from the registry. It will reappear if the client agent is still running.`))try{await async function(e){return ue(`${he}/api/devices/${e}`,{method:"DELETE"})}(this.deviceId),this.dispatchEvent(new CustomEvent("back"))}catch(e){console.error("Failed to delete device:",e)}}}customElements.define("device-detail",Ge);const Oe={online:"#81c784",offline:"#ef5350",warning:"#ffb74d",inferred:"#4fc3f7",unknown:"#666"};class Pe extends le{static properties={topology:{type:Object},layouts:{type:Object},selectedLayout:{type:String},editMode:{type:Boolean},linkMode:{type:Boolean},selectedNode:{type:String},nodePositions:{type:Object},manualEdges:{type:Array},_dragging:{type:String,state:!0},_linkSource:{type:String,state:!0},_error:{type:String,state:!0},_loading:{type:Boolean,state:!0},_selectedEdge:{type:Number,state:!0},_selectedDeviceData:{type:Object,state:!0},_dirty:{type:Boolean,state:!0},_showSaveDialog:{type:Boolean,state:!0},_showLabelDialog:{type:Boolean,state:!0},_labelEdgeIndex:{type:Number,state:!0},hideAutoEdges:{type:Boolean}};static styles=a`
    :host { display: block; padding: 20px; max-width: 1400px; margin: 0 auto; }
    .toolbar {
      display: flex; justify-content: space-between; align-items: center;
      background: #2a2a4a; padding: 8px 14px; border-radius: 8px;
      margin-bottom: 12px; flex-wrap: wrap; gap: 8px;
    }
    .toolbar-left { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
    .toolbar-right { display: flex; gap: 8px; font-size: 11px; }
    select {
      background: #3a3a5a; color: #ccc; border: 1px solid #555;
      border-radius: 4px; padding: 4px 8px; font-size: 12px;
    }
    .tool-btn {
      background: none; border: none; color: #aaa; cursor: pointer;
      font-size: 12px; padding: 4px 10px; border-radius: 4px; transition: all 0.2s;
    }
    .tool-btn:hover { background: rgba(255,255,255,0.05); color: #ccc; }
    .tool-btn.active { color: #4fc3f7; background: rgba(79,195,247,0.1); }
    .tool-btn.link-mode { color: #ffb74d; }
    .tool-btn.link-mode.active { color: #1a1a2e; background: #ffb74d; }
    .tool-btn.danger { color: #ef5350; }
    .tool-btn.danger:hover { background: rgba(239,83,80,0.1); }
    .tool-btn.save { color: #81c784; }
    .tool-btn.save:hover { background: rgba(129,199,132,0.15); color: #a5d6a7; }
    .status-dot { font-size: 11px; }
    .separator { color: #444; }
    .canvas-container {
      background: #1a1a2e; border-radius: 8px; border: 1px solid #2a2a4a;
      position: relative; overflow: hidden;
    }
    svg { width: 100%; height: 500px; display: block; }
    .detail-panel {
      background: #2a2a4a; border-radius: 8px; padding: 14px; margin-top: 12px;
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
      background: #2a2a4a; border-radius: 8px; padding: 14px; margin-top: 12px;
    }
    .edge-panel-header {
      display: flex; justify-content: space-between; align-items: center;
      margin-bottom: 10px;
    }
    .edge-label-input {
      background: #3a3a5a; border: 1px solid #555; border-radius: 4px;
      color: #ccc; padding: 4px 8px; font-size: 12px; width: 200px;
    }
    .edge-list {
      margin-top: 8px;
    }
    .edge-item {
      display: flex; justify-content: space-between; align-items: center;
      padding: 6px 0; border-bottom: 1px solid #3a3a5a; font-size: 12px; color: #aaa;
    }
    .edge-item:last-child { border-bottom: none; }
    .device-panel {
      background: #2a2a4a; border-radius: 8px; padding: 16px; margin-top: 12px;
    }
    .device-header {
      display: flex; justify-content: space-between; align-items: center;
      margin-bottom: 12px;
    }
    .device-title { font-size: 18px; font-weight: 700; }
    .device-type { font-size: 12px; color: #666; }
    .device-status-badge {
      padding: 3px 10px; border-radius: 10px; font-size: 12px;
    }
    .device-section {
      margin-top: 14px;
    }
    .device-section-title {
      font-size: 11px; color: #666; text-transform: uppercase;
      letter-spacing: 1px; margin-bottom: 8px;
    }
    .attr-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
      gap: 8px;
    }
    .attr-item {
      background: #1a1a2e; border-radius: 6px; padding: 10px; text-align: center;
    }
    .attr-label { font-size: 10px; color: #666; text-transform: uppercase; }
    .attr-val { font-size: 18px; font-weight: 700; color: #4fc3f7; margin-top: 2px; }
    .attr-unit { font-size: 11px; color: #888; }
    .attr-val.warning { color: #ffb74d; }
    .network-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 6px;
    }
    .net-item { font-size: 12px; color: #aaa; }
    .net-label { color: #666; }
    .tags-row { display: flex; gap: 6px; flex-wrap: wrap; }
    .tag-badge {
      font-size: 10px; padding: 2px 8px; border-radius: 4px;
      background: #1e3a5f; color: #4fc3f7;
    }
    .tag-badge.server { background: #3a1e5f; color: #ce93d8; }
    .commands-row { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 8px; }
    .cmd-btn {
      background: #3a3a5a; border: none; color: #ccc; padding: 6px 14px;
      border-radius: 5px; cursor: pointer; font-size: 12px; transition: all 0.2s;
    }
    .cmd-btn:hover { background: #4a4a6a; }
    .cmd-btn.danger { background: #5a2a2a; color: #ef5350; }
    .cmd-btn.danger:hover { background: #6a3a3a; }
    .cmd-result {
      margin-top: 6px; padding: 6px 10px; background: #1a1a2e;
      border-radius: 4px; font-size: 11px; color: #aaa; font-family: monospace;
    }
    .close-btn {
      background: none; border: none; color: #666; cursor: pointer;
      font-size: 18px; padding: 0 4px; line-height: 1;
    }
    .close-btn:hover { color: #ccc; }
    .save-overlay {
      position: fixed; top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.6); display: flex; align-items: center;
      justify-content: center; z-index: 1000;
    }
    .save-dialog {
      background: #2a2a4a; border-radius: 12px; padding: 24px;
      min-width: 320px; max-width: 400px; border: 1px solid #3a3a5a;
    }
    .save-dialog h3 { color: #e0e0e0; margin-bottom: 8px; font-size: 16px; }
    .save-dialog p { color: #888; font-size: 13px; margin-bottom: 20px; }
    .save-dialog-buttons {
      display: flex; gap: 8px; justify-content: flex-end;
    }
    .dialog-btn {
      border: none; padding: 8px 18px; border-radius: 6px; cursor: pointer;
      font-size: 13px; transition: all 0.2s;
    }
    .dialog-btn.save { background: #4fc3f7; color: #1a1a2e; font-weight: 600; }
    .dialog-btn.save:hover { background: #81d4fa; }
    .dialog-btn.discard { background: #3a3a5a; color: #ef5350; }
    .dialog-btn.discard:hover { background: #4a3a3a; }
    .dialog-btn.cancel { background: #3a3a5a; color: #aaa; }
    .dialog-btn.cancel:hover { background: #4a4a6a; }
    .dirty-indicator {
      font-size: 11px; color: #ffb74d; margin-left: 4px;
    }
    .label-dialog {
      background: #2a2a4a; border-radius: 12px; padding: 24px;
      min-width: 360px; max-width: 440px; border: 1px solid #3a3a5a;
    }
    .label-dialog h3 { color: #e0e0e0; margin-bottom: 4px; font-size: 16px; }
    .label-dialog .subtitle { color: #666; font-size: 12px; margin-bottom: 16px; }
    .label-field { margin-bottom: 14px; }
    .label-field label {
      display: block; font-size: 11px; color: #888; text-transform: uppercase;
      letter-spacing: 0.5px; margin-bottom: 4px;
    }
    .label-field input {
      width: 100%; background: #1a1a2e; border: 1px solid #3a3a5a;
      border-radius: 6px; color: #e0e0e0; padding: 8px 12px; font-size: 13px;
      box-sizing: border-box;
    }
    .label-field input:focus {
      outline: none; border-color: #4fc3f7;
    }
    .label-field .hint {
      font-size: 10px; color: #555; margin-top: 3px;
    }
  `;constructor(){super(),this.topology={nodes:[],edges:[]},this.layouts={},this.selectedLayout="",this.editMode=!1,this.linkMode=!1,this.selectedNode=null,this.nodePositions={},this.manualEdges=[],this._dragging=null,this._dragOffset={x:0,y:0},this._linkSource=null,this._error="",this._loading=!0,this._selectedEdge=-1,this._selectedDeviceData=null,this._commandResult="",this._dirty=!1,this._showSaveDialog=!1,this._showLabelDialog=!1,this._labelEdgeIndex=-1,this._savedPositions=null,this._savedManualEdges=null,this.hideAutoEdges=!1}connectedCallback(){super.connectedCallback(),this._loadTopology(),this._loadLayouts();const e=1e3*parseInt(localStorage.getItem("mqtt-monitor-refresh")||"5");this._pollTimer=setInterval(()=>{this._refreshNodeStatuses()},e),this._wsUnsub=ce.onMessage(e=>{"device_update"===e.type&&this._refreshNodeStatuses()})}disconnectedCallback(){super.disconnectedCallback(),this._wsUnsub&&this._wsUnsub(),this._pollTimer&&clearInterval(this._pollTimer)}async _refreshNodeStatuses(){try{const e=await be();if(!e||!e.nodes)return;const t={};for(const s of e.nodes)t[s.id]=s.status;if(this.topology&&this.topology.nodes){let s=!1;const o=this.topology.nodes.map(e=>t[e.id]&&t[e.id]!==e.status?(s=!0,{...e,status:t[e.id]}):e);for(const t of e.nodes)this.topology.nodes.find(e=>e.id===t.id)||(o.push(t),s=!0);s&&(this.topology={...this.topology,nodes:o})}}catch(e){}}async _loadTopology(){try{this._loading=!0,this._error="";const e=await be();this.topology=e,this._autoLayout(),this._loading=!1}catch(e){console.error("Failed to load topology:",e),this._error=`Failed to load: ${e.message}`,this._loading=!1}}async _loadLayouts(){try{if(this.layouts=await async function(){return ue(`${he}/api/topology/layouts`)}(),!this._layoutsLoaded){this._layoutsLoaded=!0;const e=Object.entries(this.layouts).find(([,e])=>e.isDefault);e&&(this.selectedLayout=e[0],this.nodePositions=e[1].positions||{},this.manualEdges=e[1].manualEdges||[],this.hideAutoEdges=e[1].hideAutoEdges||!1)}}catch(e){console.error("Failed to load layouts:",e)}}_autoLayout(){const e=this.topology.nodes;if(!e.length)return;const t={...this.selectedLayout&&this.layouts[this.selectedLayout]&&this.layouts[this.selectedLayout].positions||{}},s=Math.ceil(Math.sqrt(e.length));e.forEach((e,o)=>{if(!t[e.id]){const i=o%s,a=Math.floor(o/s);t[e.id]={x:100+i*(800/(s+1)),y:80+100*a}}}),this.nodePositions=t,this.selectedLayout&&this.layouts[this.selectedLayout]&&(this.manualEdges=this.layouts[this.selectedLayout].manualEdges||[])}get _allEdges(){const e=this.hideAutoEdges?[]:this.topology.edges||[],t=this.manualEdges.map(e=>({...e,type:"manual"}));return[...e,...t]}_getNodeName(e){const t=this.topology.nodes.find(t=>t.id===e);return t&&t.name||e}render(){if(this._loading&&!this.topology.nodes.length)return H`<div style="padding: 40px; text-align: center; color: #888;">Loading topology...</div>`;if(this._error)return H`<div style="padding: 40px; text-align: center; color: #ef5350;">${this._error}</div>`;const e=this.topology.nodes,t=this._allEdges,s=e.filter(e=>"online"===e.status).length,o=e.filter(e=>"offline"===e.status).length,i=e.filter(e=>"warning"===e.status).length;return H`
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
          <span class="status-dot" style="color: #81c784">${s} online</span>
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
    `}_renderNode(e){const t=this.nodePositions[e.id]||{x:100,y:100},s=Oe[e.status]||Oe.unknown,o=this.selectedNode===e.id,i=this._linkSource===e.id,a=o||i?2.5:1.5,n=o?"4,2":i?"2,2":"none",r=i?"#ffb74d":s;return"gateway"===e.type?B`
        <g transform="translate(${t.x}, ${t.y})"
          @click=${t=>this._onNodeClick(t,e.id)}
          @mousedown=${t=>this.editMode&&!this.linkMode&&this._onMouseDown(t,e.id)}
          style="cursor:pointer">
          <circle r="22" fill="${r}22" stroke="${r}" stroke-width="${a}"
            stroke-dasharray="${n}"/>
          <text text-anchor="middle" dy="4" fill="${r}" font-size="10">${e.name.substring(0,12)}</text>
        </g>
      `:B`
      <g transform="translate(${t.x}, ${t.y})"
        @click=${t=>this._onNodeClick(t,e.id)}
        @mousedown=${t=>this.editMode&&!this.linkMode&&this._onMouseDown(t,e.id)}
        style="cursor:pointer">
        <rect x="-45" y="-18" width="90" height="36" rx="6"
          fill="#2a2a4a" stroke="${r}" stroke-width="${a}"
          stroke-dasharray="${n}"/>
        <text text-anchor="middle" dy="-3" fill="${r}" font-size="10">
          ${(e.name||e.id).substring(0,12)}
        </text>
        <text text-anchor="middle" dy="10" fill="#666" font-size="8">${e.status}</text>
      </g>
    `}_edgeGeometry(e){const t=this.nodePositions[e.source],s=this.nodePositions[e.target];if(!t||!s)return null;const o=s.x-t.x,i=s.y-t.y,a=Math.sqrt(o*o+i*i)||1,n=o/a,r=i/a;let l=-r,d=n;d>0&&(l=-l,d=-d);const c=this._boxExitDistance(n,r);return{from:t,to:s,ux:n,uy:r,perpX:l,perpY:d,len:a,srcDist:c+8,tgtDist:c+8}}_boxExitDistance(e,t){if(Math.abs(e)<.001)return 22;if(Math.abs(t)<.001)return 48;const s=48/Math.abs(e),o=22/Math.abs(t);return Math.min(s,o)}_renderEdgeLine(e,t){const s=this._edgeGeometry(e);if(!s)return B``;const o="manual"===e.type,i=o?"#4fc3f7":"#555",a=o&&this._selectedEdge===t-(this.topology.edges?.length||0)?2.5:1.5,n=o?"none":"4,2";return B`
      <line x1="${s.from.x}" y1="${s.from.y}" x2="${s.to.x}" y2="${s.to.y}"
        stroke="${i}" stroke-width="${a}"
        stroke-dasharray="${n}"
        @click=${o&&this.editMode?()=>this._selectEdge(t-(this.topology.edges?.length||0)):null}
        style="${o&&this.editMode?"cursor:pointer":""}"/>
    `}_renderEdgeLabels(e,t){if(!e.label&&!e.sourceLabel&&!e.targetLabel)return B``;const s=this._edgeGeometry(e);if(!s)return B``;const{from:o,to:i,ux:a,uy:n,perpX:r,perpY:l,srcDist:d,tgtDist:c}=s,p=o.x+a*d,h=o.y+n*d,u=i.x-a*c,g=i.y-n*c,m=(o.x+i.x)/2+14*r,b=(o.y+i.y)/2+14*l;return B`
      ${e.label?B`
        <rect x="${m-3*e.label.length-3}" y="${b-9}"
          width="${6*e.label.length+6}" height="13" rx="2" fill="#1a1a2e" opacity="0.9"/>
        <text x="${m}" y="${b}" text-anchor="middle"
          fill="#888" font-size="9" style="pointer-events:none">${e.label}</text>
      `:B``}
      ${e.sourceLabel?B`
        <rect x="${p-2.5*e.sourceLabel.length-3}" y="${h-8}"
          width="${5*e.sourceLabel.length+6}" height="12" rx="2" fill="#1a1a2e" opacity="0.9"/>
        <text x="${p}" y="${h}" text-anchor="middle"
          fill="#4fc3f7" font-size="8" style="pointer-events:none">${e.sourceLabel}</text>
      `:B``}
      ${e.targetLabel?B`
        <rect x="${u-2.5*e.targetLabel.length-3}" y="${g-8}"
          width="${5*e.targetLabel.length+6}" height="12" rx="2" fill="#1a1a2e" opacity="0.9"/>
        <text x="${u}" y="${g}" text-anchor="middle"
          fill="#4fc3f7" font-size="8" style="pointer-events:none">${e.targetLabel}</text>
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
        <div style="background: #2a2a4a; border-radius: 8px; padding: 14px; margin-top: 12px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 16px; font-weight: 600; color: #4fc3f7;">${e?e.name:this.selectedNode}</span>
            <button class="tool-btn" @click=${()=>{this.selectedNode=null}}>✕</button>
          </div>
          <div style="color: #666; font-size: 12px; margin-top: 4px;">${e?e.type:"unknown"}</div>
        </div>
      `}_renderManualEdgesList(){return H`
      <div class="edge-panel">
        <div class="edge-panel-header">
          <span style="font-size: 13px; color: #ccc; font-weight: 600;">Manual Links</span>
        </div>
        <div class="edge-list">
          ${this.manualEdges.map((e,t)=>H`
            <div class="edge-item">
              <span>
                ${this._getNodeName(e.source)}
                ${e.sourceLabel?H`<span style="color: #4fc3f7; font-size: 10px;"> [${e.sourceLabel}]</span>`:""}
                <span style="color: #666;"> &#8594; </span>
                ${e.label?H`<span style="color: #888; font-size: 10px;">(${e.label})</span><span style="color: #666;"> &#8594; </span>`:""}
                ${e.targetLabel?H`<span style="color: #4fc3f7; font-size: 10px;">[${e.targetLabel}] </span>`:""}
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
    `}_onNodeClick(e,t){e.stopPropagation(),this.linkMode?this._handleLinkClick(t):this._selectNode(t)}_handleLinkClick(e){if(this._linkSource)if(this._linkSource===e)this._linkSource=null;else{const t=this.manualEdges.some(t=>t.source===this._linkSource&&t.target===e||t.source===e&&t.target===this._linkSource);t||(this.manualEdges=[...this.manualEdges,{source:this._linkSource,target:e,sourceLabel:"",label:"",targetLabel:""}],this._markDirty(),this._labelEdgeIndex=this.manualEdges.length-1,this._showLabelDialog=!0),this._linkSource=null}else this._linkSource=e}_toggleEditMode(){this.editMode&&this._dirty?this._showSaveDialog=!0:this._enterOrExitEdit()}_enterOrExitEdit(){this.editMode=!this.editMode,this.editMode?(this._savedPositions=JSON.stringify(this.nodePositions),this._savedManualEdges=JSON.stringify(this.manualEdges),this._dirty=!1):(this.linkMode=!1,this._linkSource=null,this._selectedEdge=-1,this._dirty=!1)}_markDirty(){this.editMode&&(this._dirty=!0)}async _saveAndExit(){this._showSaveDialog=!1,await this._saveCurrentLayout(),this._dirty=!1,this._enterOrExitEdit()}_discardAndExit(){this._showSaveDialog=!1,this._savedPositions&&(this.nodePositions=JSON.parse(this._savedPositions)),this._savedManualEdges&&(this.manualEdges=JSON.parse(this._savedManualEdges)),this._dirty=!1,this._enterOrExitEdit()}_cancelDialog(){this._showSaveDialog=!1}_toggleLinkMode(){this.linkMode=!this.linkMode,this._linkSource=null,this.linkMode&&(this.selectedNode=null)}async _selectNode(e){if(this.selectedNode===e)return this.selectedNode=null,this._selectedDeviceData=null,void(this._commandResult="");this.selectedNode=e,this._selectedDeviceData=null,this._commandResult="";try{this._selectedDeviceData=await fetchDevice(e)}catch(e){this._selectedDeviceData={status:"inferred",attributes:{},tags:[]}}}async _sendCmd(e){if(this.selectedNode)try{this._commandResult=`Sending ${e}...`;const t=await sendCommand(this.selectedNode,e);this._commandResult=`Sent (request: ${t.request_id})`}catch(e){this._commandResult=`Error: ${e.message}`}}_selectEdge(e){this._selectedEdge=this._selectedEdge===e?-1:e}_labelEdge(e){this._labelEdgeIndex=e,this._showLabelDialog=!0}_saveLabelDialog(){const e=this.shadowRoot.querySelector(".label-dialog"),t=e.querySelector("#source-label").value,s=e.querySelector("#link-label").value,o=e.querySelector("#target-label").value,i=[...this.manualEdges];i[this._labelEdgeIndex]={...i[this._labelEdgeIndex],sourceLabel:t,label:s,targetLabel:o},this.manualEdges=i,this._markDirty(),this._showLabelDialog=!1,this._labelEdgeIndex=-1}_cancelLabelDialog(){this._showLabelDialog=!1,this._labelEdgeIndex=-1}_removeEdge(e){this.manualEdges=this.manualEdges.filter((t,s)=>s!==e),this._selectedEdge=-1,this._markDirty()}_onMouseDown(e,t){this._dragging=t;const s=this.shadowRoot.querySelector("svg"),o=s.createSVGPoint();o.x=e.clientX,o.y=e.clientY;const i=o.matrixTransform(s.getScreenCTM().inverse()),a=this.nodePositions[t]||{x:0,y:0};this._dragOffset={x:i.x-a.x,y:i.y-a.y},e.preventDefault()}_onMouseMove(e){const t=this.shadowRoot.querySelector("svg"),s=t.createSVGPoint();s.x=e.clientX,s.y=e.clientY;const o=s.matrixTransform(t.getScreenCTM().inverse());this.linkMode&&this._linkSource&&(this._mousePos={x:o.x,y:o.y},this.requestUpdate()),this._dragging&&(this.nodePositions={...this.nodePositions,[this._dragging]:{x:o.x-this._dragOffset.x,y:o.y-this._dragOffset.y}})}_onMouseUp(){this._dragging&&this._markDirty(),this._dragging=null}_onLayoutChange(e){if(this.selectedLayout=e.target.value,this.selectedLayout&&this.layouts[this.selectedLayout]){const e=this.layouts[this.selectedLayout];this.nodePositions=e.positions||{},this.manualEdges=e.manualEdges||[],this.hideAutoEdges=e.hideAutoEdges||!1}else this.nodePositions={},this.manualEdges=[],this.hideAutoEdges=!1,this._autoLayout()}async _saveCurrentLayout(){const e=this.selectedLayout&&this.layouts[this.selectedLayout]?this.layouts[this.selectedLayout].name:"",t=prompt("Layout name:",e);if(!t)return;const s=this.selectedLayout&&this.layouts[this.selectedLayout]&&this.layouts[this.selectedLayout].isDefault||!1,o=await fe({id:this.selectedLayout||void 0,name:t,positions:this.nodePositions,manualEdges:this.manualEdges,hideAutoEdges:this.hideAutoEdges,isDefault:s});this.selectedLayout=o.id,await this._loadLayouts(),this._dirty=!1,this._savedPositions=JSON.stringify(this.nodePositions),this._savedManualEdges=JSON.stringify(this.manualEdges)}async _setAsDefault(){if(!this.selectedLayout)return;for(const[e,t]of Object.entries(this.layouts))t.isDefault&&(t.isDefault=!1,await fe(t));const e=this.layouts[this.selectedLayout];e&&(e.isDefault=!0,await fe(e)),await this._loadLayouts(),this._layoutsLoaded=!0}async _deleteCurrentLayout(){if(!this.selectedLayout)return;const e=this.layouts[this.selectedLayout]?.name||this.selectedLayout;confirm(`Delete layout "${e}"?`)&&(await async function(e){return ue(`${he}/api/topology/layouts/${e}`,{method:"DELETE"})}(this.selectedLayout),this.selectedLayout="",this.nodePositions={},this.manualEdges=[],this.hideAutoEdges=!1,this._dirty=!1,await this._loadLayouts(),this._autoLayout())}}customElements.define("topology-view",Pe);const Le={online:"#81c784",offline:"#ef5350",warning:"#ffb74d",unknown:"#666"};class je extends le{static properties={device:{type:Object},deviceId:{type:String}};static styles=a`
    :host {
      display: block;
      background: #2a2a4a;
      border-radius: 8px;
      padding: 14px;
      cursor: pointer;
      transition: all 0.2s;
      border-left: 3px solid var(--status-color, #666);
    }
    :host(:hover) {
      background: #323258;
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
      color: #e0e0e0;
    }
    .status {
      font-size: 11px;
      padding: 2px 8px;
      border-radius: 10px;
    }
    .type {
      font-size: 11px;
      color: #666;
      margin-bottom: 8px;
    }
    .attrs {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4px;
    }
    .attr {
      font-size: 11px;
      color: #aaa;
    }
    .attr-value { color: #ccc; }
    .attr-value.warning { color: #ffb74d; }
    .tags {
      display: flex; gap: 4px; margin-top: 8px; flex-wrap: wrap;
    }
    .tag {
      font-size: 9px; background: #1e3a5f; color: #4fc3f7;
      padding: 1px 6px; border-radius: 3px;
    }
  `;render(){if(!this.device)return H``;const e=this.device,t=Le[e.status]||Le.unknown,s=Object.entries(e.attributes||{}).slice(0,4),o=[...e.tags||[],...e.server_tags||[]],i=e.device_name||this.deviceId;return this.style.setProperty("--status-color",t),this.setAttribute("role","button"),this.setAttribute("tabindex","0"),this.setAttribute("aria-label",`${i}, ${e.status||"unknown"}`),H`
      <div class="header">
        <span class="name">${i}</span>
        <span class="status" style="background: ${t}20; color: ${t}">
          ${"online"===e.status||"offline"===e.status?"● ":"⚠ "}${e.status}
        </span>
      </div>
      <div class="type">${e.device_type||"unknown"}</div>
      ${s.length>0?H`
        <div class="attrs">
          ${s.map(([e,t])=>H`
            <div class="attr">
              ${e.replace(/_/g," ")}: <span class="attr-value ${this._isWarning(e,t)?"warning":""}">${t.value}${t.unit}</span>
            </div>
          `)}
        </div>
      `:""}
      ${o.length>0?H`
        <div class="tags">
          ${o.map(e=>H`<span class="tag">${e}</span>`)}
        </div>
      `:""}
    `}_isWarning(e,t){const s={cpu_usage:90,memory_usage:90,disk_usage:95,cpu_temp:80};return s[e]&&t.value>s[e]}}customElements.define("device-card",je);class Fe extends le{static properties={devices:{type:Object},filter:{type:String},selectedTags:{type:Array},viewMode:{type:String},_groups:{type:Object,state:!0},_collapsedGroups:{type:Object,state:!0},_refreshInterval:{type:Number,state:!0}};static styles=a`
    :host { display: block; padding: 20px; max-width: 1400px; margin: 0 auto; }

    .filter-bar {
      display: flex; gap: 8px; align-items: center;
      margin-bottom: 12px; flex-wrap: wrap;
    }

    .status-filters {
      display: flex; gap: 6px;
    }
    .filter-btn {
      background: #2a2a4a; border: none; color: #aaa; padding: 6px 14px;
      border-radius: 16px; cursor: pointer; font-size: 13px; transition: all 0.2s;
    }
    .filter-btn:hover { background: #3a3a5a; color: #ccc; }
    .filter-btn.active { background: #4fc3f7; color: #1a1a2e; }

    .view-toggle {
      margin-left: auto; display: flex; gap: 4px;
      background: #2a2a4a; border-radius: 16px; padding: 3px;
    }
    .view-btn {
      background: none; border: none; color: #888; padding: 4px 14px;
      border-radius: 13px; cursor: pointer; font-size: 13px; transition: all 0.2s;
    }
    .view-btn.active { background: #4fc3f7; color: #1a1a2e; font-weight: 600; }
    .view-btn:not(.active):hover { color: #ccc; }

    .active-tags {
      display: flex; gap: 6px; flex-wrap: wrap; align-items: center;
      margin-bottom: 12px;
    }
    .active-tag {
      display: flex; align-items: center; gap: 4px;
      background: #1e3a5f; color: #4fc3f7; padding: 4px 10px;
      border-radius: 12px; font-size: 12px;
    }
    .active-tag .remove {
      cursor: pointer; font-size: 14px; line-height: 1;
      color: #4fc3f7; opacity: 0.6; transition: opacity 0.15s;
    }
    .active-tag .remove:hover { opacity: 1; }
    .clear-all {
      background: none; border: none; color: #888; font-size: 12px;
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
      background: #2a2a4a; border: 1px solid #3a3a5a; color: #aaa;
      padding: 4px 8px; border-radius: 12px; font-size: 11px; cursor: pointer;
    }
    .refresh-select:focus { outline: none; border-color: #4fc3f7; }
    .empty {
      text-align: center; padding: 60px; color: #666;
    }

    /* By Group view */
    .group-section { margin-bottom: 16px; }
    .group-section-header {
      display: flex; align-items: center; gap: 10px;
      background: #2a2a4a; border-radius: 8px; padding: 10px 16px;
      cursor: pointer; user-select: none; margin-bottom: 8px;
      transition: background 0.15s;
    }
    .group-section-header:hover { background: #323258; }
    .group-chevron { font-size: 10px; color: #555; transition: transform 0.2s; }
    .group-chevron.open { transform: rotate(90deg); }
    .group-section-name { font-size: 14px; font-weight: 600; color: #e0e0e0; }
    .group-health {
      margin-left: auto; font-size: 12px; color: #888;
      display: flex; gap: 10px;
    }
    .health-dot { display: flex; align-items: center; gap: 4px; }
    .group-device-count { font-size: 11px; color: #666; }
    .group-body { padding: 0; }
    .ungrouped-header {
      font-size: 11px; color: #555; text-transform: uppercase;
      letter-spacing: 1px; margin-bottom: 8px; margin-top: 4px;
    }
  `;constructor(){super(),this.devices={},this.filter="all",this.selectedTags=[],this.viewMode="all",this._groups={},this._collapsedGroups={},this._wsUnsub=null,this._refreshInterval=parseInt(localStorage.getItem("mqtt-monitor-refresh")||"5"),this._pollTimer=null,this._lastFetchTime=0}connectedCallback(){super.connectedCallback(),this._loadDevices(),this._loadGroups(),this._startPolling(),this._wsUnsub=ce.onMessage(e=>{"device_update"===e.type&&(this.devices={...this.devices,[e.device_id]:e.device},this.requestUpdate())})}disconnectedCallback(){super.disconnectedCallback(),this._wsUnsub&&this._wsUnsub(),this._pollTimer&&clearInterval(this._pollTimer)}_startPolling(){this._pollTimer&&clearInterval(this._pollTimer);const e=1e3*(this._refreshInterval||5);this._pollTimer=setInterval(()=>this._loadDevices(),e)}async _loadDevices(){try{const e=await ge(this._lastFetchTime);e&&Object.keys(e).length>0?this.devices={...this.devices,...e}:0===this._lastFetchTime&&(this.devices=e||{}),this._lastFetchTime=Date.now()/1e3}catch(e){console.error("Failed to load devices:",e)}}async _loadGroups(){try{this._groups=await ve()}catch(e){console.error("Failed to load groups:",e)}}get _filteredDevices(){let e=Object.entries(this.devices);return"all"!==this.filter&&(e=e.filter(([,e])=>e.status===this.filter)),this.selectedTags.length>0&&(e=e.filter(([,e])=>{const t=[...e.tags||[],...e.server_tags||[]];return this.selectedTags.some(e=>t.includes(e))})),e}get _counts(){const e=Object.values(this.devices);return{all:e.length,online:e.filter(e=>"online"===e.status).length,offline:e.filter(e=>"offline"===e.status).length,warning:e.filter(e=>"warning"===e.status).length}}_onTagAdd(e){const t=e.detail.tag;this.selectedTags.includes(t)||(this.selectedTags=[...this.selectedTags,t])}_onTagRemove(e){this.selectedTags=this.selectedTags.filter(t=>t!==e.detail.tag)}render(){const e=this._counts;return H`
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
    `}_renderGroupSection(e,t){const s=!!this._collapsedGroups[e.id],o=Object.entries(this.devices).filter(([t])=>(e.device_ids||[]).includes(t)).map(([,e])=>e),i=o.filter(e=>"online"===e.status).length,a=o.length;return H`
      <div class="group-section">
        <div class="group-section-header"
          @click=${()=>this._toggleGroupCollapse(e.id)}>
          <span class="group-chevron ${s?"":"open"}">&#9658;</span>
          <span class="group-section-name">${e.name}</span>
          <span class="group-device-count">${t.length} device${1!==t.length?"s":""}</span>
          <div class="group-health">
            <span class="health-dot" style="color: #81c784">
              ${i}/${a} online
            </span>
          </div>
        </div>
        ${s?"":H`
          <div class="group-body">
            ${0===t.length?H`<div style="color: #555; font-size: 13px; padding: 8px 4px;">No devices match current filters</div>`:H`
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
    `}_toggleGroupCollapse(e){this._collapsedGroups={...this._collapsedGroups,[e]:!this._collapsedGroups[e]}}_selectDevice(e){this.dispatchEvent(new CustomEvent("device-select",{detail:{deviceId:e},bubbles:!0,composed:!0}))}}customElements.define("dashboard-view",Fe);class Me extends le{static properties={_tags:{type:Array,state:!0},_loading:{type:Boolean,state:!0},_newTagName:{type:String,state:!0},_renamingTag:{type:String,state:!0},_renameValue:{type:String,state:!0},_selectedTags:{type:Object,state:!0}};static styles=a`
    :host { display: block; }

    .section {
      background: #2a2a4a; border-radius: 8px; padding: 20px;
      margin-bottom: 20px;
    }
    .section-title {
      font-size: 12px; color: #666; text-transform: uppercase;
      letter-spacing: 1px; margin-bottom: 16px; font-weight: 600;
    }

    .tag-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 8px; margin-bottom: 8px;
    }
    .tag-card {
      background: #1a1a2e; border-radius: 8px; padding: 12px;
      border: 1px solid #2a2a4a; cursor: pointer; transition: all 0.15s;
    }
    .tag-card:hover { border-color: #3a3a5a; background: #1a1a30; }
    .tag-card.selected { border-color: #4fc3f7; background: #1a2a3e; }
    .tag-card-top { display: flex; align-items: center; gap: 8px; margin-bottom: 4px; }
    .tag-card-name { font-size: 14px; color: #ccc; font-weight: 600; }
    .tag-card-count { font-size: 11px; color: #666; margin-bottom: 8px; }
    .tag-card-actions { display: flex; gap: 4px; }
    .icon-btn {
      background: none; border: none; cursor: pointer; font-size: 12px;
      padding: 2px 8px; border-radius: 4px; transition: all 0.15s;
    }
    .icon-btn.delete { color: #666; }
    .icon-btn.delete:hover { color: #ef5350; background: rgba(239,83,80,0.1); }
    .sensor-btn {
      background: none; border: none; cursor: pointer; font-size: 11px;
      padding: 2px 8px; border-radius: 4px;
    }
    .sensor-btn.edit { color: #4fc3f7; }
    .sensor-btn.edit:hover { background: rgba(79,195,247,0.1); }
    .sensor-btn.remove { color: #666; }
    .sensor-btn.remove:hover { color: #ef5350; background: rgba(239,83,80,0.1); }
    .sensor-form { background: #12122a; border-radius: 6px; padding: 10px; margin-top: 6px; }
    .sensor-form-grid { display: grid; gap: 6px; margin-bottom: 6px; }
    .sensor-form-grid input {
      background: #2a2a4a; border: 1px solid #3a3a5a; border-radius: 4px;
      color: #e0e0e0; padding: 6px 8px; font-size: 12px;
    }
    .sensor-form-grid input:focus { outline: none; border-color: #4fc3f7; }
    .sensor-form-actions { display: flex; gap: 6px; }
    .form-btn { border: none; padding: 5px 12px; border-radius: 4px; cursor: pointer; font-size: 12px; }
    .form-btn.save { background: #4fc3f7; color: #1a1a2e; font-weight: 600; }
    .form-btn.cancel { background: #3a3a5a; color: #aaa; }
    .small-input {
      background: #1a1a2e; border: 1px solid #3a3a5a; border-radius: 4px;
      color: #e0e0e0; padding: 4px 10px; font-size: 12px;
    }
    .small-input:focus { outline: none; border-color: #4fc3f7; }
    .small-btn {
      background: #4fc3f7; border: none; color: #1a1a2e; padding: 4px 12px;
      border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: 600;
    }
    .small-btn:hover { background: #81d4fa; }
    .small-btn.cancel { background: #3a3a5a; color: #aaa; }
    .small-btn.cancel:hover { background: #4a4a6a; }
    .add-row { display: flex; gap: 8px; align-items: center; margin-top: 12px; }
  `;constructor(){super(),this._tags=[],this._loading=!0,this._newTagName="",this._renamingTag=null,this._renameValue="",this._selectedTags=new Set}connectedCallback(){super.connectedCallback(),this._loadTags()}async _loadTags(){this._loading=!0;try{const e=await ye().catch(()=>[]);this._tags=Array.isArray(e)?e.map(e=>"string"==typeof e?{tag:e,count:0}:e).sort((e,t)=>e.tag.localeCompare(t.tag)):[]}finally{this._loading=!1}}render(){const e=this._selectedTags?this._selectedTags.size:0;return H`
      <div class="section">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <div class="section-title" style="margin-bottom: 0;">Tag Registry</div>
          <span style="font-size: 10px; color: #555;">Server-managed tags only</span>
        </div>

        ${e>0?H`
          <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 12px; padding: 8px 12px; background: #12122a; border-radius: 6px;">
            <span style="font-size: 12px; color: #ccc;">${e} selected</span>
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
        `:H`<div style="color: #555; font-size: 13px; margin-bottom: 12px;">No tags created yet</div>`}

        ${this._renamingTag?H`
          <div class="sensor-form" style="margin-top: 12px;">
            <div style="font-size: 11px; color: #888; margin-bottom: 6px;">Rename "${this._renamingTag}"</div>
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
    `}_toggleTagSelection(e){const t=new Set(this._selectedTags);t.has(e)?t.delete(e):t.add(e),this._selectedTags=t}async _deleteSelectedTags(){const e=[...this._selectedTags];if(confirm(`Delete ${e.length} tag${1!==e.length?"s":""}?`)){for(const t of e)try{await we(t)}catch(e){console.error(e)}this._selectedTags=new Set,await this._loadTags()}}_startRename(e){this._renamingTag=e,this._renameValue=e}_cancelRename(){this._renamingTag=null,this._renameValue=""}async _saveRename(e){const t=this._renameValue.trim();if(t&&t!==e){try{await async function(e,t){return ue(`${he}/api/tags/${encodeURIComponent(e)}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({new_name:t})})}(e,t),await this._loadTags()}catch(e){console.error("Failed to rename tag:",e)}this._cancelRename()}else this._cancelRename()}async _createTag(){const e=this._newTagName.trim();if(e)try{await $e(e),this._newTagName="",await this._loadTags()}catch(e){console.error("Failed to create tag:",e)}}async _deleteTag(e){const t=this._tags.find(t=>t.tag===e);if(!(t&&t.count>0)||confirm(`"${e}" is used by ${t.count} device(s). Delete anyway?`))try{await we(e),await this._loadTags()}catch(e){console.error("Failed to delete tag:",e)}}}customElements.define("tag-registry-settings",Me);class Ie extends le{static properties={conflicts:{type:Array},title:{type:String},action:{type:String}};static styles=a`
    :host { display: contents; }

    .overlay {
      position: fixed; top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.65); display: flex; align-items: center;
      justify-content: center; z-index: 1100;
    }

    .dialog {
      background: #2a2a4a; border-radius: 12px; padding: 24px;
      min-width: 560px; max-width: 760px; width: 90vw;
      border: 1px solid #3a3a5a; display: flex; flex-direction: column; gap: 16px;
    }

    .dialog-header {
      display: flex; align-items: flex-start; gap: 10px;
    }
    .warning-icon {
      font-size: 22px; line-height: 1; flex-shrink: 0; margin-top: 1px;
    }
    .header-text { flex: 1; }
    .dialog-title {
      font-size: 16px; font-weight: 600; color: #e0e0e0; margin-bottom: 4px;
    }
    .dialog-subtitle {
      font-size: 13px; color: #888;
    }

    .conflict-table {
      width: 100%; border-collapse: collapse;
      font-size: 12px;
    }
    .conflict-table th {
      text-align: left; font-size: 10px; color: #666; padding: 6px 8px;
      text-transform: uppercase; letter-spacing: 0.5px;
      border-bottom: 1px solid #3a3a5a;
    }
    .conflict-table td {
      color: #ccc; padding: 6px 8px;
      border-bottom: 1px solid #222240;
      vertical-align: top;
    }
    .conflict-table tr:last-child td { border-bottom: none; }
    .conflict-table td.mono { font-family: monospace; font-size: 11px; }
    .type-badge {
      display: inline-block; padding: 1px 6px; border-radius: 3px;
      font-size: 10px; font-weight: 600; text-transform: uppercase;
    }
    .type-command { background: rgba(79,195,247,0.15); color: #4fc3f7; }
    .type-sensor  { background: rgba(129,196,132,0.15); color: #81c784; }
    .type-threshold { background: rgba(255,183,77,0.15); color: #ffb74d; }

    .action-text { font-size: 11px; color: #666; font-style: italic; }

    .scroll-area {
      max-height: 320px; overflow-y: auto;
      border: 1px solid #3a3a5a; border-radius: 6px;
    }

    .dialog-footer {
      display: flex; justify-content: flex-end; gap: 8px; margin-top: 4px;
    }
    .btn {
      border: none; padding: 8px 18px; border-radius: 6px;
      cursor: pointer; font-size: 13px; transition: all 0.2s;
    }
    .btn-cancel { background: #3a3a5a; color: #aaa; }
    .btn-cancel:hover { background: #4a4a6a; }
    .btn-proceed { background: #ef5350; color: #fff; font-weight: 600; }
    .btn-proceed:hover { background: #f06666; }
  `;constructor(){super(),this.conflicts=[],this.title="Conflicts detected",this.action="Proceed"}_handleCancel(){this.dispatchEvent(new CustomEvent("cancel",{bubbles:!0,composed:!0}))}_handleConfirm(){this.dispatchEvent(new CustomEvent("confirm",{bubbles:!0,composed:!0}))}_typeClass(e){return"command"===e?"type-command":"sensor"===e?"type-sensor":"type-threshold"}render(){if(!this.conflicts||0===this.conflicts.length)return H``;const e=this.conflicts.length,t=new Set(this.conflicts.map(e=>e.device_id)).size;return H`
      <div class="overlay" @click=${this._handleCancel}>
        <div class="dialog" @click=${e=>e.stopPropagation()}>
          <div class="dialog-header">
            <div class="warning-icon">&#9888;&#65039;</div>
            <div class="header-text">
              <div class="dialog-title">${this.title}</div>
              <div class="dialog-subtitle">
                ${e} conflict${1!==e?"s":""} found across
                ${t} device${1!==t?"s":""}.
                Proceeding will overwrite device-specific settings with the group values.
              </div>
            </div>
          </div>

          <div class="scroll-area">
            <table class="conflict-table">
              <thead>
                <tr>
                  <th>Device</th>
                  <th>Type</th>
                  <th>Name</th>
                  <th>Current (device)</th>
                  <th>Will become (group)</th>
                </tr>
              </thead>
              <tbody>
                ${this.conflicts.map(e=>H`
                  <tr>
                    <td>${e.device_name||e.device_id}</td>
                    <td>
                      <span class="type-badge ${this._typeClass(e.type)}">${e.type}</span>
                    </td>
                    <td class="mono">${e.name}</td>
                    <td class="mono">
                      ${"command"===e.type?H`<span style="color:#aaa;">shell:</span> `:""}${e.device_value}
                    </td>
                    <td class="mono">
                      ${"command"===e.type?H`<span style="color:#aaa;">shell:</span> `:""}${e.group_value}
                    </td>
                  </tr>
                `)}
              </tbody>
            </table>
          </div>

          <div class="dialog-footer">
            <button class="btn btn-cancel" @click=${this._handleCancel}>Cancel</button>
            <button class="btn btn-proceed" @click=${this._handleConfirm}>
              ${this.action} Anyway
            </button>
          </div>
        </div>
      </div>
    `}}customElements.define("conflict-dialog",Ie);const Ue={};function Re(e){return Ue[e]||(Ue[e]={attr:"",value:""}),Ue[e]}class He extends le{static properties={_groups:{type:Object,state:!0},_devices:{type:Object,state:!0},_loading:{type:Boolean,state:!0},_expandedGroup:{type:String,state:!0},_newGroupName:{type:String,state:!0},_editGroupName:{type:String,state:!0},_editingGroupName:{type:String,state:!0},_groupSaveStatus:{type:Object,state:!0},_groupPushStatus:{type:Object,state:!0},_editingGroupCmd:{type:Object,state:!0},_showAddGroupCmd:{type:Object,state:!0},_groupCmdForm:{type:Object,state:!0},_editingGroupSensor:{type:Object,state:!0},_showAddGroupSensor:{type:Object,state:!0},_groupSensorForm:{type:Object,state:!0},_conflictDialogConflicts:{type:Array,state:!0},_conflictDialogTitle:{type:String,state:!0},_conflictDialogAction:{type:String,state:!0},_conflictDialogPendingFn:{type:Object,state:!0}};static styles=a`
    :host { display: block; }

    .section {
      background: #2a2a4a; border-radius: 8px; padding: 20px;
      margin-bottom: 20px;
    }
    .section-title {
      font-size: 12px; color: #666; text-transform: uppercase;
      letter-spacing: 1px; margin-bottom: 16px; font-weight: 600;
    }

    /* Group policies */
    .group-list { display: flex; flex-direction: column; gap: 8px; }
    .group-header {
      display: flex; align-items: center; justify-content: space-between;
      background: #1a1a2e; border-radius: 6px; padding: 10px 14px;
      cursor: pointer; user-select: none;
    }
    .group-header:hover { background: #222244; }
    .group-header-left { display: flex; align-items: center; gap: 10px; }
    .group-header-name { font-size: 14px; color: #ccc; font-weight: 600; }
    .group-member-count { font-size: 11px; color: #666; }
    .chevron { font-size: 10px; color: #555; transition: transform 0.2s; }
    .chevron.open { transform: rotate(90deg); }
    .group-body {
      background: #1a1a2e; border-radius: 0 0 6px 6px;
      padding: 14px; margin-top: -4px; border-top: 1px solid #2a2a4a;
    }
    .group-field { margin-bottom: 14px; }
    .group-field label {
      display: block; font-size: 11px; color: #888; text-transform: uppercase;
      letter-spacing: 0.5px; margin-bottom: 6px;
    }
    .members-row { display: flex; gap: 6px; flex-wrap: wrap; align-items: center; }
    .member-pill {
      display: flex; align-items: center; gap: 4px;
      background: #2a2a4a; color: #ccc; padding: 3px 10px;
      border-radius: 12px; font-size: 12px;
    }
    .member-pill .remove {
      cursor: pointer; color: #888; font-size: 13px; line-height: 1;
      transition: color 0.15s;
    }
    .member-pill .remove:hover { color: #ef5350; }
    .threshold-input {
      width: 100%; background: #2a2a4a; border: 1px solid #3a3a5a;
      border-radius: 4px; color: #e0e0e0; padding: 6px 10px;
      font-size: 13px; box-sizing: border-box;
    }
    .threshold-input:focus { outline: none; border-color: #4fc3f7; }
    .group-footer { display: flex; gap: 8px; margin-top: 12px; align-items: center; }
    .group-save-btn {
      background: #4fc3f7; border: none; color: #1a1a2e; padding: 6px 16px;
      border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 600;
    }
    .group-save-btn:hover { background: #81d4fa; }
    .group-delete-btn {
      background: rgba(239,83,80,0.1); border: none; color: #ef5350;
      padding: 6px 16px; border-radius: 6px; cursor: pointer; font-size: 13px;
    }
    .group-delete-btn:hover { background: rgba(239,83,80,0.2); }
    .group-status-saved { font-size: 12px; color: #81c784; }
    .group-status-error { font-size: 12px; color: #ef5350; }
    .group-status-pushing { font-size: 12px; color: #4fc3f7; }
    .group-status-pushed { font-size: 12px; color: #81c784; }

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
      text-align: left; font-size: 10px; color: #666; padding: 6px 8px;
      text-transform: uppercase; letter-spacing: 0.5px;
    }
    .sensor-table td {
      font-size: 12px; color: #ccc; padding: 6px 8px;
      border-bottom: 1px solid #2a2a4a;
    }
    .sensor-table tr:last-child td { border-bottom: none; }
    .sensor-btn {
      background: none; border: none; cursor: pointer; font-size: 11px;
      padding: 2px 8px; border-radius: 4px;
    }
    .sensor-btn.edit { color: #4fc3f7; }
    .sensor-btn.edit:hover { background: rgba(79,195,247,0.1); }
    .sensor-btn.remove { color: #666; }
    .sensor-btn.remove:hover { color: #ef5350; background: rgba(239,83,80,0.1); }
    .sensor-actions { display: flex; gap: 4px; }
    .sensor-form { background: #12122a; border-radius: 6px; padding: 10px; margin-top: 6px; }
    .sensor-form-grid { display: grid; gap: 6px; margin-bottom: 6px; }
    .sensor-form-grid input {
      background: #2a2a4a; border: 1px solid #3a3a5a; border-radius: 4px;
      color: #e0e0e0; padding: 6px 8px; font-size: 12px;
    }
    .sensor-form-grid input:focus { outline: none; border-color: #4fc3f7; }
    .sensor-form-actions { display: flex; gap: 6px; }
    .form-btn { border: none; padding: 5px 12px; border-radius: 4px; cursor: pointer; font-size: 12px; }
    .form-btn.save { background: #4fc3f7; color: #1a1a2e; font-weight: 600; }
    .form-btn.cancel { background: #3a3a5a; color: #aaa; }

    .icon-btn {
      background: none; border: none; cursor: pointer; font-size: 12px;
      padding: 2px 8px; border-radius: 4px; transition: all 0.15s;
    }
    .icon-btn.delete { color: #666; }
    .icon-btn.delete:hover { color: #ef5350; background: rgba(239,83,80,0.1); }

    .small-input {
      background: #1a1a2e; border: 1px solid #3a3a5a; border-radius: 4px;
      color: #e0e0e0; padding: 4px 10px; font-size: 12px;
    }
    .small-input:focus { outline: none; border-color: #4fc3f7; }
    .small-btn {
      background: #4fc3f7; border: none; color: #1a1a2e; padding: 4px 12px;
      border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: 600;
    }
    .small-btn:hover { background: #81d4fa; }
    .add-row { display: flex; gap: 8px; align-items: center; margin-top: 12px; }

    .subsection-label {
      font-size: 11px; color: #555; margin-bottom: 6px; margin-top: 8px;
    }
    .add-cmd-btn {
      background: none; border: 1px solid #3a3a5a; color: #888;
      padding: 4px 12px; border-radius: 4px; cursor: pointer; font-size: 11px;
      margin-top: 4px; transition: all 0.15s;
    }
    .add-cmd-btn:hover { border-color: #4fc3f7; color: #4fc3f7; }
  `;constructor(){super(),this._groups={},this._devices={},this._loading=!0,this._expandedGroup=null,this._newGroupName="",this._editGroupName="",this._editingGroupName=null,this._groupSaveStatus={},this._groupPushStatus={},this._editingGroupCmd=null,this._showAddGroupCmd=null,this._groupCmdForm={name:"",shell:""},this._editingGroupSensor=null,this._showAddGroupSensor=null,this._groupSensorForm={name:"",command:"",interval:"",unit:""},this._conflictDialogConflicts=[],this._conflictDialogTitle="",this._conflictDialogAction="",this._conflictDialogPendingFn=null}connectedCallback(){super.connectedCallback(),this._loadAll()}async _loadAll(){this._loading=!0;try{const[e,t]=await Promise.all([ve().catch(()=>({})),ge().catch(()=>({}))]);this._groups=e||{},this._devices=t||{}}finally{this._loading=!1}}render(){const e=Object.values(this._groups);return H`
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
      ${this._conflictDialogConflicts.length>0?H`
        <conflict-dialog
          .conflicts=${this._conflictDialogConflicts}
          .title=${this._conflictDialogTitle}
          .action=${this._conflictDialogAction}
          @confirm=${this._onConflictConfirm}
          @cancel=${this._onConflictCancel}>
        </conflict-dialog>
      `:""}
    `}_onConflictConfirm(){const e=this._conflictDialogPendingFn;this._conflictDialogConflicts=[],this._conflictDialogPendingFn=null,e&&e()}_onConflictCancel(){this._conflictDialogConflicts=[],this._conflictDialogPendingFn=null}_renderGroup(e){const t=this._expandedGroup===e.id,s=(e.device_ids||[]).length;return H`
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
              <label>Warning Thresholds</label>
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
                  @click=${()=>this._deployToDevices(e)}>Save &amp; Deploy</button>
              </div>
            </div>
          </div>
        `:""}
      </div>
    `}_getGroupDiscoveredData(e){const t=e.device_ids||[],s=new Set,o={},i={};for(const e of t){const t=this._devices[e];if(!t)continue;if(t.attributes&&"object"==typeof t.attributes)for(const e of Object.keys(t.attributes))s.add(e);if(Array.isArray(t.allowed_commands))for(const e of t.allowed_commands)e in o||(o[e]="");const a=t.remote_config;if(a&&a.plugins&&a.plugins.custom_command&&a.plugins.custom_command.commands)for(const[e,t]of Object.entries(a.plugins.custom_command.commands))i[e]||(i[e]=t)}return{attributes:Array.from(s).sort(),commands:o,sensors:i}}_renderGroupCustomCommands(e){const t=e.custom_commands||{},s={...this._getGroupDiscoveredData(e).commands};for(const[e,o]of Object.entries(t))s[e]=o||s[e]||"";const o=e.hidden_commands||[],i=Object.entries(s).filter(([e])=>!o.includes(e)).sort(([e],[t])=>e.localeCompare(t)),a=Object.entries(s).filter(([e])=>o.includes(e)),n=this._editingGroupCmd&&this._editingGroupCmd.groupId===e.id,r=this._showAddGroupCmd&&this._showAddGroupCmd.groupId===e.id;return H`
      ${i.length>0?H`
        <table class="sensor-table">
          <thead>
            <tr><th>Name</th><th>Shell Command</th><th>Source</th><th></th></tr>
          </thead>
          <tbody>
            ${i.map(([s,o])=>{const i=s in t,a=i?"group":"device";return H`
                <tr>
                  <td style="font-family: monospace;">${s}</td>
                  <td style="font-family: monospace; font-size: 11px; color: ${i?"#ccc":"#888"};">${o||"—"}</td>
                  <td style="font-size: 10px; color: ${"group"===a?"#4fc3f7":"#888"};">${a}</td>
                  <td>
                    ${"group"===a?H`
                      <div class="sensor-actions">
                        <button class="sensor-btn edit"
                          @click=${()=>this._startEditGroupCmd(e.id,s,o)}>Edit</button>
                        <button class="sensor-btn remove"
                          @click=${()=>this._removeGroupCommand(e,s)}>Remove</button>
                        <button class="sensor-btn remove" title="Hide"
                          @click=${()=>this._hideGroupCommand(e,s)}>Hide</button>
                      </div>
                    `:H`
                      <span style="font-size: 10px; color: #555; font-style: italic;">from client config</span>
                    `}
                  </td>
                </tr>
              `})}
          </tbody>
        </table>
      `:H`
        <div style="font-size: 12px; color: #555; margin-bottom: 8px;">No commands</div>
      `}

      ${a.length>0?H`
        <div style="margin-top: 6px;">
          <div style="font-size: 10px; color: #555; margin-bottom: 4px; cursor: pointer;"
            @click=${()=>{e._showHiddenCmds=!e._showHiddenCmds,this.requestUpdate()}}>
            ${e._showHiddenCmds?"▾":"▸"} ${a.length} hidden
          </div>
          ${e._showHiddenCmds?H`
            <div style="display: flex; gap: 4px; flex-wrap: wrap;">
              ${a.map(([t])=>H`
                <span style="font-size: 11px; background: #1a1a2e; color: #555; padding: 3px 10px; border-radius: 4px; display: flex; align-items: center; gap: 4px;">
                  ${t}
                  <span style="cursor: pointer; color: #4fc3f7; font-size: 10px;"
                    @click=${()=>this._unhideGroupCommand(e,t)}>show</span>
                </span>
              `)}
            </div>
          `:""}
        </div>
      `:""}

      ${n||r?H`
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
    `}_startAddGroupCmd(e){this._showAddGroupCmd={groupId:e},this._editingGroupCmd=null,this._groupCmdForm={name:"",shell:""}}_startEditGroupCmd(e,t,s){this._editingGroupCmd={groupId:e,name:t},this._showAddGroupCmd=null,this._groupCmdForm={name:t,shell:s}}_cancelGroupCmdForm(){this._editingGroupCmd=null,this._showAddGroupCmd=null,this._groupCmdForm={name:"",shell:""}}_saveGroupCmd(e){const t=(this._groupCmdForm.name||"").trim(),s=(this._groupCmdForm.shell||"").trim();t&&s&&(this._groups={...this._groups,[e.id]:{...e,custom_commands:{...e.custom_commands||{},[t]:s}}},this._cancelGroupCmdForm())}async _removeGroupCommand(e,t){const s={...e.custom_commands||{}};delete s[t];try{await xe(e.id,{name:e.name,device_ids:e.device_ids||[],custom_commands:s,custom_sensors:e.custom_sensors||{},thresholds:e.thresholds||{},hidden_commands:e.hidden_commands||[]})}catch(e){console.error("Failed to remove group command:",e)}await this._loadAll()}_hideGroupCommand(e,t){const s=[...e.hidden_commands||[]];s.includes(t)||s.push(t),this._groups={...this._groups,[e.id]:{...e,hidden_commands:s}}}_unhideGroupCommand(e,t){const s=(e.hidden_commands||[]).filter(e=>e!==t);this._groups={...this._groups,[e.id]:{...e,hidden_commands:s}}}_renderGroupThresholds(e){const t=e.thresholds||{},s=Re(e.id),o=this._getGroupDiscoveredData(e).attributes,i=Object.keys(t).filter(e=>null!=t[e]&&!o.includes(e)),a=[...o,...i];return H`
      ${a.length>0?H`
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 6px; margin-bottom: 8px;">
          ${a.map(s=>{const o=t[s],i=null!=o&&""!==o;return H`
              <div style="display: flex; align-items: center; gap: 6px; background: #12122a; border-radius: 4px; padding: 5px 8px;">
                <span style="font-size: 11px; color: ${i?"#ccc":"#666"}; flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title=${s}>${s}</span>
                ${i?H`<span style="font-size: 9px; color: #4fc3f7; margin-right: 2px;" title="Threshold active">●</span>`:""}
                <input class="threshold-input" type="number" placeholder="—"
                  style="width: 80px; font-size: 12px; padding: 3px 6px; background: #2a2a4a; border-color: ${i?"#4a4a7a":"#2a2a5a"};"
                  .value=${i?String(o):""}
                  @input=${t=>this._updateGroupThreshold(e.id,s,t.target.value)}>
                ${i?H`
                  <button class="icon-btn delete" style="padding: 2px 4px; font-size: 10px;"
                    @click=${()=>this._removeGroupThreshold(e.id,s)} title="Clear threshold">&times;</button>
                `:""}
              </div>
            `})}
        </div>
      `:H`<div style="font-size: 12px; color: #555; margin-bottom: 6px;">No attributes discovered from member devices yet.</div>`}
      <div style="font-size: 11px; color: #555; margin-bottom: 4px; margin-top: 4px;">Add custom threshold</div>
      <div style="display: flex; gap: 4px; align-items: center; flex-wrap: wrap;">
        <input class="small-input" type="text" placeholder="Attribute name..."
          style="width: 150px;"
          .value=${s.attr}
          @input=${t=>{Re(e.id).attr=t.target.value,this.requestUpdate()}}>
        <input class="small-input" type="number" placeholder="Value..."
          style="width: 90px;"
          .value=${s.value}
          @input=${t=>{Re(e.id).value=t.target.value,this.requestUpdate()}}>
        <button class="small-btn" @click=${()=>this._addGroupThreshold(e)}>Add threshold</button>
      </div>
    `}_addGroupThreshold(e){const t=Re(e.id),s=(t.attr||"").trim(),o=(t.value||"").trim();s&&""!==o&&(this._updateGroupThreshold(e.id,s,o),t.attr="",t.value="",this.requestUpdate())}_updateGroupThreshold(e,t,s){const o=this._groups[e];o&&(this._groups={...this._groups,[e]:{...o,thresholds:{...o.thresholds||{},[t]:""===s?null:Number(s)}}})}_removeGroupThreshold(e,t){const s=this._groups[e];if(!s)return;const o={...s.thresholds||{}};delete o[t],this._groups={...this._groups,[e]:{...s,thresholds:o}}}_renderGroupCustomSensors(e){const t=e.custom_sensors||{},s=this._getGroupDiscoveredData(e).sensors,o=Object.keys(s).sort(),i=this._editingGroupSensor&&this._editingGroupSensor.groupId===e.id,a=this._showAddGroupSensor&&this._showAddGroupSensor.groupId===e.id;return H`
      ${o.length>0?H`
        <div class="subsection-label">Discovered from devices</div>
        <table class="sensor-table">
          <thead>
            <tr><th>Name</th><th>Command</th><th>Interval</th><th>Unit</th><th></th></tr>
          </thead>
          <tbody>
            ${o.map(e=>{const t=s[e];return H`
                <tr>
                  <td style="font-family: monospace;">${e}</td>
                  <td style="font-family: monospace; font-size: 11px; color: #888;">${t.command||"—"}</td>
                  <td style="color: #888;">${t.interval?t.interval+"s":"—"}</td>
                  <td style="color: #888;">${t.unit||"—"}</td>
                  <td></td>
                </tr>
              `})}
          </tbody>
        </table>
      `:""}

      <div class="subsection-label" style="margin-top: 10px;">Group sensors</div>

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
        <div style="font-size: 12px; color: #555; margin-bottom: 8px;">No group sensors defined.</div>
      `}

      ${i||a?H`
        <div class="sensor-form">
          <div class="sensor-form-grid" style="grid-template-columns: 1fr 2fr 80px 80px;">
            <input type="text" placeholder="Name"
              .value=${this._groupSensorForm.name}
              ?disabled=${!!i}
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
            <button class="form-btn save" @click=${()=>this._saveGroupSensor(e)}>${i?"Update":"Add"}</button>
            <button class="form-btn cancel" @click=${this._cancelGroupSensorForm}>Cancel</button>
          </div>
        </div>
      `:H`
        <button class="add-cmd-btn" @click=${()=>this._startAddGroupSensor(e.id)}>+ Add Sensor</button>
      `}
    `}_startAddGroupSensor(e){this._showAddGroupSensor={groupId:e},this._editingGroupSensor=null,this._groupSensorForm={name:"",command:"",interval:"",unit:""}}_startEditGroupSensor(e,t,s){this._editingGroupSensor={groupId:e,name:t},this._showAddGroupSensor=null,this._groupSensorForm={name:t,command:s.command||"",interval:null!=s.interval?String(s.interval):"",unit:s.unit||""}}_cancelGroupSensorForm(){this._editingGroupSensor=null,this._showAddGroupSensor=null,this._groupSensorForm={name:"",command:"",interval:"",unit:""}}_saveGroupSensor(e){const t=(this._groupSensorForm.name||"").trim(),s=(this._groupSensorForm.command||"").trim();t&&s&&(this._groups={...this._groups,[e.id]:{...e,custom_sensors:{...e.custom_sensors||{},[t]:{command:s,interval:this._groupSensorForm.interval?Number(this._groupSensorForm.interval):void 0,unit:this._groupSensorForm.unit||void 0}}}},this._cancelGroupSensorForm())}_removeGroupSensor(e,t){const s={...e.custom_sensors||{}};delete s[t],this._groups={...this._groups,[e.id]:{...e,custom_sensors:s}}}_renderAddMemberDropdown(e){const t=e.device_ids||[],s=Object.entries(this._devices).filter(([e])=>!t.includes(e));return 0===s.length?H``:H`
      <select class="small-input" style="padding: 3px 8px;"
        @change=${t=>{t.target.value&&(this._addMember(e,t.target.value),t.target.value="")}}>
        <option value="">Add device...</option>
        ${s.map(([e,t])=>H`
          <option value=${e}>${t.device_name||e}</option>
        `)}
      </select>
    `}_toggleGroup(e){this._expandedGroup=this._expandedGroup===e?null:e}async _addMember(e,t){try{const s=await Ee(e.id,t);if(s&&s.conflict_count>0){const o=this._devices[t]&&this._devices[t].device_name||t;return this._conflictDialogTitle=`Adding "${o}" to group "${e.name}"`,this._conflictDialogAction="Add Device",this._conflictDialogConflicts=s.conflicts,void(this._conflictDialogPendingFn=()=>this._doAddMember(e,t))}}catch(e){console.error("Conflict check failed, proceeding anyway:",e)}await this._doAddMember(e,t)}async _doAddMember(e,t){const s=[...e.device_ids||[],t];try{await xe(e.id,{device_ids:s}),await this._loadAll()}catch(e){console.error("Failed to add member:",e)}}async _removeMember(e,t){const s=(e.device_ids||[]).filter(e=>e!==t);try{await xe(e.id,{device_ids:s}),await this._loadAll()}catch(e){console.error("Failed to remove member:",e)}}async _updateGroup(e){const t=this._groups[e.id]||e,s=this._editingGroupName===e.id?this._editGroupName.trim():t.name,o={};for(const[e,s]of Object.entries(t.thresholds||{}))null==s||isNaN(s)||(o[e]=s);const i=s||t.name,a={name:i,device_ids:t.device_ids||[],custom_commands:t.custom_commands||{},custom_sensors:t.custom_sensors||{},thresholds:o,hidden_commands:t.hidden_commands||[]};console.log("Saving group:",e.id,a);try{await xe(e.id,a),this._groups={...this._groups,[e.id]:{...e,name:i,thresholds:o}},this._editingGroupName===e.id&&(this._editingGroupName=null),this._groupSaveStatus={...this._groupSaveStatus,[e.id]:"saved"},setTimeout(()=>{this._groupSaveStatus={...this._groupSaveStatus,[e.id]:""}},2e3)}catch(t){console.error("Failed to update group:",t),this._groupSaveStatus={...this._groupSaveStatus,[e.id]:"error"},setTimeout(()=>{this._groupSaveStatus={...this._groupSaveStatus,[e.id]:""}},2e3)}}async _createGroup(){const e=this._newGroupName.trim();if(!e)return;const t=e.toLowerCase().replace(/[^a-z0-9]+/g,"_");try{await _e(t,e,[]),this._newGroupName="",this._expandedGroup=t,await this._loadAll()}catch(e){console.error("Failed to create group:",e)}}async _deleteGroup(e){const t=(e.device_ids||[]).length;if(!(t>0)||confirm(`Delete group "${e.name}"? It has ${t} member(s).`))try{await async function(e){return ue(`${he}/api/groups/${e}`,{method:"DELETE"})}(e.id),this._expandedGroup===e.id&&(this._expandedGroup=null),await this._loadAll()}catch(e){console.error("Failed to delete group:",e)}}async _deployToDevices(e){await this._updateGroup(e);try{const t=await Ee(e.id);if(t&&t.conflict_count>0)return this._conflictDialogTitle=`Deploying group "${e.name}" to ${t.device_count} device${1!==t.device_count?"s":""}`,this._conflictDialogAction="Deploy",this._conflictDialogConflicts=t.conflicts,void(this._conflictDialogPendingFn=()=>this._doDeploy(e))}catch(e){console.error("Conflict check failed, proceeding anyway:",e)}await this._doDeploy(e)}async _doDeploy(e){const t=this._groups[e.id]||e,s={commands:t.custom_commands||{},plugins:{custom_command:{commands:t.custom_sensors||{}}}},o=t.hidden_commands||[];if(o.length>0)for(const e of t.device_ids||[])try{await Se(e,{hidden_commands:o})}catch(t){console.error(`Failed to set hidden_commands on ${e}:`,t)}console.log("Deploy to group:",e.id,"config:",JSON.stringify(s)),this._groupPushStatus={...this._groupPushStatus,[e.id]:"Deploying..."};try{const t=await async function(e,t){return ue(`${he}/api/groups/${e}/push-config`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})}(e.id,s);console.log("Deploy result:",t),this._groupPushStatus={...this._groupPushStatus,[e.id]:"Deployed!"},setTimeout(()=>{this._groupPushStatus={...this._groupPushStatus,[e.id]:""}},3e3)}catch(t){console.error("Failed to deploy group config:",t);const s=t&&t.message?`Error: ${t.message}`:"Error";this._groupPushStatus={...this._groupPushStatus,[e.id]:s},setTimeout(()=>{this._groupPushStatus={...this._groupPushStatus,[e.id]:""}},3e3)}}}customElements.define("group-policy-settings",He);const Be={attr:"",value:""};class Ve extends le{static properties={_settings:{type:Object,state:!0},_loading:{type:Boolean,state:!0},_savingSettings:{type:Boolean,state:!0},_settingsSaved:{type:Boolean,state:!0}};static styles=a`
    :host { display: block; padding: 20px; max-width: 1000px; margin: 0 auto; }

    h2 { font-size: 20px; font-weight: 700; color: #e0e0e0; margin-bottom: 16px; margin-top: 0; }

    .section {
      background: #2a2a4a; border-radius: 8px; padding: 20px;
      margin-bottom: 20px;
    }
    .section-title {
      font-size: 12px; color: #666; text-transform: uppercase;
      letter-spacing: 1px; margin-bottom: 16px; font-weight: 600;
    }
    .settings-input {
      width: 100%; background: #1a1a2e; border: 1px solid #3a3a5a;
      border-radius: 4px; color: #e0e0e0; padding: 6px 10px;
      font-size: 13px; box-sizing: border-box;
    }
    .settings-input:focus { outline: none; border-color: #4fc3f7; }
    .save-btn {
      background: #4fc3f7; border: none; color: #1a1a2e; padding: 8px 20px;
      border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 600;
    }
    .save-btn:hover { background: #81d4fa; }
    .save-btn:disabled { opacity: 0.5; cursor: default; }
    .saved-msg { font-size: 12px; color: #81c784; margin-left: 10px; }
    .small-input {
      background: #1a1a2e; border: 1px solid #3a3a5a; border-radius: 4px;
      color: #e0e0e0; padding: 4px 10px; font-size: 12px;
    }
    .small-input:focus { outline: none; border-color: #4fc3f7; }
    .small-btn {
      background: #4fc3f7; border: none; color: #1a1a2e; padding: 4px 12px;
      border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: 600;
    }
    .small-btn:hover { background: #81d4fa; }
    .icon-btn {
      background: none; border: none; cursor: pointer; font-size: 12px;
      padding: 2px 8px; border-radius: 4px; transition: all 0.15s;
    }
    .icon-btn.delete { color: #666; }
    .icon-btn.delete:hover { color: #ef5350; background: rgba(239,83,80,0.1); }

    .loading { padding: 40px; text-align: center; color: #666; }
  `;constructor(){super(),this._settings=null,this._loading=!0,this._savingSettings=!1,this._settingsSaved=!1}connectedCallback(){super.connectedCallback(),this._loadSettings()}async _loadSettings(){this._loading=!0;try{this._settings=await async function(){return ue(`${he}/api/settings`)}().catch(()=>({}))}finally{this._loading=!1}}render(){return this._loading?H`<div class="loading">Loading settings...</div>`:H`
      <h2>Settings</h2>
      <tag-registry-settings></tag-registry-settings>
      <group-policy-settings></group-policy-settings>
      ${this._renderGlobalDefaults()}
    `}_renderGlobalDefaults(){const e=(this._settings||{}).default_thresholds||{},t=Be;return H`
      <div class="section">
        <div class="section-title">Global Defaults</div>

        <div style="font-size: 11px; color: #888; margin-bottom: 10px;">Default Warning Thresholds</div>

        ${Object.keys(e).filter(t=>null!=e[t]).map(t=>H`
          <div style="display: flex; gap: 6px; align-items: center; margin-bottom: 6px;">
            <span style="font-size: 12px; color: #ccc; min-width: 140px;">${t}</span>
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
            @input=${e=>{Be.attr=e.target.value,this.requestUpdate()}}>
          <input class="small-input" type="number" placeholder="Value..."
            style="width: 90px;"
            .value=${t.value}
            @input=${e=>{Be.value=e.target.value,this.requestUpdate()}}>
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
    `}_updateDefaultThreshold(e,t){const s=this._settings||{};this._settings={...s,default_thresholds:{...s.default_thresholds||{},[e]:""===t?null:Number(t)}}}_removeDefaultThreshold(e){const t=this._settings||{},s={...t.default_thresholds||{}};delete s[e],this._settings={...t,default_thresholds:s}}_addDefaultThreshold(){const e=(Be.attr||"").trim(),t=(Be.value||"").trim();e&&""!==t&&(this._updateDefaultThreshold(e,t),Be.attr="",Be.value="",this.requestUpdate())}async _saveSettings(){this._savingSettings=!0,this._settingsSaved=!1;try{await async function(e){return ue(`${he}/api/settings`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}(this._settings),this._settingsSaved=!0,setTimeout(()=>{this._settingsSaved=!1},2e3)}catch(e){console.error("Failed to save settings:",e)}finally{this._savingSettings=!1}}}customElements.define("settings-view",Ve);class qe extends le{static properties={currentView:{type:String},selectedDevice:{type:String}};static styles=a`
    :host {
      display: block;
      min-height: 100vh;
      background: #1a1a2e;
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
      background: #1a1a2e;
      border-radius: 12px;
      border: 1px solid #2a2a4a;
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
    `}_onOverlayClick(){this.selectedDevice=null}_onViewChange(e){this.currentView=e.detail.view,this.selectedDevice=null}_onDeviceSelect(e){this.selectedDevice=e.detail.deviceId}}customElements.define("network-monitor-app",qe);
//# sourceMappingURL=bundle.js.map
