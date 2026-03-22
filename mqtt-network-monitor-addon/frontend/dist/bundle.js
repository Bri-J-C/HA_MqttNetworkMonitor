/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,t=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),i=new WeakMap;let a=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const s=this.t;if(t&&void 0===e){const t=void 0!==s&&1===s.length;t&&(e=i.get(s)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&i.set(s,e))}return e}toString(){return this.cssText}};const o=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,s,i)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+e[i+1],e[0]);return new a(i,e,s)},n=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const s of e.cssRules)t+=s.cssText;return(e=>new a("string"==typeof e?e:e+"",void 0,s))(t)})(e):e,{is:r,defineProperty:l,getOwnPropertyDescriptor:d,getOwnPropertyNames:c,getOwnPropertySymbols:p,getPrototypeOf:h}=Object,u=globalThis,g=u.trustedTypes,m=g?g.emptyScript:"",v=u.reactiveElementPolyfillSupport,f=(e,t)=>e,b={toAttribute(e,t){switch(t){case Boolean:e=e?m:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let s=e;switch(t){case Boolean:s=null!==e;break;case Number:s=null===e?null:Number(e);break;case Object:case Array:try{s=JSON.parse(e)}catch(e){s=null}}return s}},_=(e,t)=>!r(e,t),x={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:_};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let y=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=x){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(e,s,t);void 0!==i&&l(this.prototype,e,i)}}static getPropertyDescriptor(e,t,s){const{get:i,set:a}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:i,set(t){const o=i?.call(this);a?.call(this,t),this.requestUpdate(e,o,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??x}static _$Ei(){if(this.hasOwnProperty(f("elementProperties")))return;const e=h(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(f("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(f("properties"))){const e=this.properties,t=[...c(e),...p(e)];for(const s of t)this.createProperty(s,e[s])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,s]of t)this.elementProperties.set(e,s)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const s=this._$Eu(e,t);void 0!==s&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const e of s)t.unshift(n(e))}else void 0!==e&&t.push(n(e));return t}static _$Eu(e,t){const s=t.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const s=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((s,i)=>{if(t)s.adoptedStyleSheets=i.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const t of i){const i=document.createElement("style"),a=e.litNonce;void 0!==a&&i.setAttribute("nonce",a),i.textContent=t.cssText,s.appendChild(i)}})(s,this.constructor.elementStyles),s}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ET(e,t){const s=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,s);if(void 0!==i&&!0===s.reflect){const a=(void 0!==s.converter?.toAttribute?s.converter:b).toAttribute(t,s.type);this._$Em=e,null==a?this.removeAttribute(i):this.setAttribute(i,a),this._$Em=null}}_$AK(e,t){const s=this.constructor,i=s._$Eh.get(e);if(void 0!==i&&this._$Em!==i){const e=s.getPropertyOptions(i),a="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:b;this._$Em=i;const o=a.fromAttribute(t,e.type);this[i]=o??this._$Ej?.get(i)??o,this._$Em=null}}requestUpdate(e,t,s,i=!1,a){if(void 0!==e){const o=this.constructor;if(!1===i&&(a=this[e]),s??=o.getPropertyOptions(e),!((s.hasChanged??_)(a,t)||s.useDefault&&s.reflect&&a===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,s))))return;this.C(e,t,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:s,reflect:i,wrapped:a},o){s&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,o??t??this[e]),!0!==a||void 0!==o)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),!0===i&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,s]of e){const{wrapped:e}=s,i=this[t];!0!==e||this._$AL.has(t)||void 0===i||this.C(t,void 0,s,i)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[f("elementProperties")]=new Map,y[f("finalized")]=new Map,v?.({ReactiveElement:y}),(u.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $=globalThis,w=e=>e,k=$.trustedTypes,S=k?k.createPolicy("lit-html",{createHTML:e=>e}):void 0,E="$lit$",A=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+A,D=`<${C}>`,T=document,N=()=>T.createComment(""),z=e=>null===e||"object"!=typeof e&&"function"!=typeof e,L=Array.isArray,P="[ \t\n\f\r]",M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,O=/-->/g,G=/>/g,j=RegExp(`>|${P}(?:([^\\s"'>=/]+)(${P}*=${P}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),R=/'/g,U=/"/g,I=/^(?:script|style|textarea|title)$/i,H=e=>(t,...s)=>({_$litType$:e,strings:t,values:s}),F=H(1),B=H(2),V=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),J=new WeakMap,W=T.createTreeWalker(T,129);function K(e,t){if(!L(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(t):t}const Y=(e,t)=>{const s=e.length-1,i=[];let a,o=2===t?"<svg>":3===t?"<math>":"",n=M;for(let t=0;t<s;t++){const s=e[t];let r,l,d=-1,c=0;for(;c<s.length&&(n.lastIndex=c,l=n.exec(s),null!==l);)c=n.lastIndex,n===M?"!--"===l[1]?n=O:void 0!==l[1]?n=G:void 0!==l[2]?(I.test(l[2])&&(a=RegExp("</"+l[2],"g")),n=j):void 0!==l[3]&&(n=j):n===j?">"===l[0]?(n=a??M,d=-1):void 0===l[1]?d=-2:(d=n.lastIndex-l[2].length,r=l[1],n=void 0===l[3]?j:'"'===l[3]?U:R):n===U||n===R?n=j:n===O||n===G?n=M:(n=j,a=void 0);const p=n===j&&e[t+1].startsWith("/>")?" ":"";o+=n===M?s+D:d>=0?(i.push(r),s.slice(0,d)+E+s.slice(d)+A+p):s+A+(-2===d?t:p)}return[K(e,o+(e[s]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),i]};class X{constructor({strings:e,_$litType$:t},s){let i;this.parts=[];let a=0,o=0;const n=e.length-1,r=this.parts,[l,d]=Y(e,t);if(this.el=X.createElement(l,s),W.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(i=W.nextNode())&&r.length<n;){if(1===i.nodeType){if(i.hasAttributes())for(const e of i.getAttributeNames())if(e.endsWith(E)){const t=d[o++],s=i.getAttribute(e).split(A),n=/([.?@])?(.*)/.exec(t);r.push({type:1,index:a,name:n[2],strings:s,ctor:"."===n[1]?se:"?"===n[1]?ie:"@"===n[1]?ae:te}),i.removeAttribute(e)}else e.startsWith(A)&&(r.push({type:6,index:a}),i.removeAttribute(e));if(I.test(i.tagName)){const e=i.textContent.split(A),t=e.length-1;if(t>0){i.textContent=k?k.emptyScript:"";for(let s=0;s<t;s++)i.append(e[s],N()),W.nextNode(),r.push({type:2,index:++a});i.append(e[t],N())}}}else if(8===i.nodeType)if(i.data===C)r.push({type:2,index:a});else{let e=-1;for(;-1!==(e=i.data.indexOf(A,e+1));)r.push({type:7,index:a}),e+=A.length-1}a++}}static createElement(e,t){const s=T.createElement("template");return s.innerHTML=e,s}}function Z(e,t,s=e,i){if(t===V)return t;let a=void 0!==i?s._$Co?.[i]:s._$Cl;const o=z(t)?void 0:t._$litDirective$;return a?.constructor!==o&&(a?._$AO?.(!1),void 0===o?a=void 0:(a=new o(e),a._$AT(e,s,i)),void 0!==i?(s._$Co??=[])[i]=a:s._$Cl=a),void 0!==a&&(t=Z(e,a._$AS(e,t.values),a,i)),t}class Q{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:s}=this._$AD,i=(e?.creationScope??T).importNode(t,!0);W.currentNode=i;let a=W.nextNode(),o=0,n=0,r=s[0];for(;void 0!==r;){if(o===r.index){let t;2===r.type?t=new ee(a,a.nextSibling,this,e):1===r.type?t=new r.ctor(a,r.name,r.strings,this,e):6===r.type&&(t=new oe(a,this,e)),this._$AV.push(t),r=s[++n]}o!==r?.index&&(a=W.nextNode(),o++)}return W.currentNode=T,i}p(e){let t=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}}class ee{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,s,i){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Z(this,e,t),z(e)?e===q||null==e||""===e?(this._$AH!==q&&this._$AR(),this._$AH=q):e!==this._$AH&&e!==V&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>L(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==q&&z(this._$AH)?this._$AA.nextSibling.data=e:this.T(T.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:s}=e,i="number"==typeof s?this._$AC(e):(void 0===s.el&&(s.el=X.createElement(K(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(t);else{const e=new Q(i,this),s=e.u(this.options);e.p(t),this.T(s),this._$AH=e}}_$AC(e){let t=J.get(e.strings);return void 0===t&&J.set(e.strings,t=new X(e)),t}k(e){L(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let s,i=0;for(const a of e)i===t.length?t.push(s=new ee(this.O(N()),this.O(N()),this,this.options)):s=t[i],s._$AI(a),i++;i<t.length&&(this._$AR(s&&s._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=w(e).nextSibling;w(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class te{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,i,a){this.type=1,this._$AH=q,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=a,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=q}_$AI(e,t=this,s,i){const a=this.strings;let o=!1;if(void 0===a)e=Z(this,e,t,0),o=!z(e)||e!==this._$AH&&e!==V,o&&(this._$AH=e);else{const i=e;let n,r;for(e=a[0],n=0;n<a.length-1;n++)r=Z(this,i[s+n],t,n),r===V&&(r=this._$AH[n]),o||=!z(r)||r!==this._$AH[n],r===q?e=q:e!==q&&(e+=(r??"")+a[n+1]),this._$AH[n]=r}o&&!i&&this.j(e)}j(e){e===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class se extends te{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===q?void 0:e}}class ie extends te{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==q)}}class ae extends te{constructor(e,t,s,i,a){super(e,t,s,i,a),this.type=5}_$AI(e,t=this){if((e=Z(this,e,t,0)??q)===V)return;const s=this._$AH,i=e===q&&s!==q||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,a=e!==q&&(s===q||i);i&&this.element.removeEventListener(this.name,this,s),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class oe{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){Z(this,e)}}const ne=$.litHtmlPolyfillSupport;ne?.(X,ee),($.litHtmlVersions??=[]).push("3.3.2");const re=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class le extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,s)=>{const i=s?.renderBefore??t;let a=i._$litPart$;if(void 0===a){const e=s?.renderBefore??null;i._$litPart$=a=new ee(t.insertBefore(N(),e),e,void 0,s??{})}return a._$AI(e),a})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return V}}le._$litElement$=!0,le.finalized=!0,re.litElementHydrateSupport?.({LitElement:le});const de=re.litElementPolyfillSupport;de?.({LitElement:le}),(re.litElementVersions??=[]).push("4.2.2");const ce=new class{constructor(){this._ws=null,this._listeners=[],this._reconnectDelay=1e3}connect(){const e="https:"===location.protocol?"wss:":"ws:",t=location.pathname.match(/^(\/api\/hassio_ingress\/[^/]+)/),s=t?t[1]:"",i=`${e}//${location.host}${s}/api/ws`;this._ws=new WebSocket(i),this._ws.onmessage=e=>{try{const t=JSON.parse(e.data);this._listeners.forEach(e=>e(t))}catch(e){console.error("WebSocket parse error:",e)}},this._ws.onclose=()=>{setTimeout(()=>this.connect(),this._reconnectDelay),this._reconnectDelay=Math.min(2*this._reconnectDelay,3e4)},this._ws.onopen=()=>{this._reconnectDelay=1e3}}onMessage(e){this._listeners.push(e)}disconnect(){this._ws&&this._ws.close()}};class pe extends le{static properties={currentView:{type:String}};static styles=o`
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
  `;render(){return F`
      <nav>
        <span class="logo">Network Monitor</span>
        <div class="nav-links">
          <button
            class=${"dashboard"===this.currentView?"active":""}
            @click=${()=>this._navigate("dashboard")}
          >Devices</button>
          <button
            class=${"topology"===this.currentView?"active":""}
            @click=${()=>this._navigate("topology")}
          >Topology</button>
          <button
            class=${"settings"===this.currentView?"active":""}
            @click=${()=>this._navigate("settings")}
          >Settings</button>
        </div>
        <span class="version">v0.1.0 build ${"3/22 14:32"}</span>
      </nav>
    `}_navigate(e){this.dispatchEvent(new CustomEvent("view-change",{detail:{view:e}}))}}customElements.define("nav-bar",pe);const he=function(){const e=location.pathname.match(/^(\/api\/hassio_ingress\/[^/]+)/);return e?e[1]:""}();async function ue(){return(await fetch(`${he}/api/devices`)).json()}async function ge(e){return(await fetch(`${he}/api/devices/${e}`)).json()}async function me(e){return(await fetch(`${he}/api/topology/layouts`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})).json()}async function ve(e,t,s={}){return(await fetch(`${he}/api/devices/${e}/command`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({command:t,params:s})})).json()}async function fe(){return(await fetch(`${he}/api/groups`)).json()}async function be(e,t,s=[]){return(await fetch(`${he}/api/groups`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:e,name:t,device_ids:s})})).json()}async function _e(e,{name:t,device_ids:s}){return(await fetch(`${he}/api/groups/${e}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:t,device_ids:s})})).json()}async function xe(){return(await fetch(`${he}/api/tags`)).json()}async function ye(e){return(await fetch(`${he}/api/tags`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({tag:e})})).json()}async function $e(){return(await fetch(`${he}/api/settings`)).json()}async function we(e,t){return(await fetch(`${he}/api/devices/${e}/settings`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})).json()}const ke={online:"#81c784",offline:"#ef5350",warning:"#ffb74d",inferred:"#4fc3f7",unknown:"#666"};class Se extends le{static properties={topology:{type:Object},layouts:{type:Object},selectedLayout:{type:String},editMode:{type:Boolean},linkMode:{type:Boolean},selectedNode:{type:String},nodePositions:{type:Object},manualEdges:{type:Array},_dragging:{type:String,state:!0},_linkSource:{type:String,state:!0},_error:{type:String,state:!0},_loading:{type:Boolean,state:!0},_selectedEdge:{type:Number,state:!0},_selectedDeviceData:{type:Object,state:!0},_commandResult:{type:String,state:!0},_dirty:{type:Boolean,state:!0},_showSaveDialog:{type:Boolean,state:!0},_showLabelDialog:{type:Boolean,state:!0},_labelEdgeIndex:{type:Number,state:!0},hideAutoEdges:{type:Boolean}};static styles=o`
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
  `;constructor(){super(),this.topology={nodes:[],edges:[]},this.layouts={},this.selectedLayout="",this.editMode=!1,this.linkMode=!1,this.selectedNode=null,this.nodePositions={},this.manualEdges=[],this._dragging=null,this._dragOffset={x:0,y:0},this._linkSource=null,this._error="",this._loading=!0,this._selectedEdge=-1,this._selectedDeviceData=null,this._commandResult="",this._dirty=!1,this._showSaveDialog=!1,this._showLabelDialog=!1,this._labelEdgeIndex=-1,this._savedPositions=null,this._savedManualEdges=null,this.hideAutoEdges=!1}connectedCallback(){super.connectedCallback(),this._loadTopology(),this._loadLayouts(),ce.onMessage(e=>{this._loadTopology(),"device_update"===e.type&&e.device_id===this.selectedNode&&e.device&&(this._selectedDeviceData=e.device)})}async _loadTopology(){try{this._loading=!0,this._error="";const e=await async function(){return(await fetch(`${he}/api/topology`)).json()}();this.topology=e,this._autoLayout(),this._loading=!1}catch(e){console.error("Failed to load topology:",e),this._error=`Failed to load: ${e.message}`,this._loading=!1}}async _loadLayouts(){try{if(this.layouts=await async function(){return(await fetch(`${he}/api/topology/layouts`)).json()}(),!this._layoutsLoaded){this._layoutsLoaded=!0;const e=Object.entries(this.layouts).find(([,e])=>e.isDefault);e&&(this.selectedLayout=e[0],this.nodePositions=e[1].positions||{},this.manualEdges=e[1].manualEdges||[],this.hideAutoEdges=e[1].hideAutoEdges||!1)}}catch(e){console.error("Failed to load layouts:",e)}}_autoLayout(){const e=this.topology.nodes;if(!e.length)return;const t={...this.selectedLayout&&this.layouts[this.selectedLayout]&&this.layouts[this.selectedLayout].positions||{}},s=Math.ceil(Math.sqrt(e.length));e.forEach((e,i)=>{if(!t[e.id]){const a=i%s,o=Math.floor(i/s);t[e.id]={x:100+a*(800/(s+1)),y:80+100*o}}}),this.nodePositions=t,this.selectedLayout&&this.layouts[this.selectedLayout]&&(this.manualEdges=this.layouts[this.selectedLayout].manualEdges||[])}get _allEdges(){const e=this.hideAutoEdges?[]:this.topology.edges||[],t=this.manualEdges.map(e=>({...e,type:"manual"}));return[...e,...t]}_getNodeName(e){const t=this.topology.nodes.find(t=>t.id===e);return t&&t.name||e}render(){if(this._loading&&!this.topology.nodes.length)return F`<div style="padding: 40px; text-align: center; color: #888;">Loading topology...</div>`;if(this._error)return F`<div style="padding: 40px; text-align: center; color: #ef5350;">${this._error}</div>`;const e=this.topology.nodes,t=this._allEdges,s=e.filter(e=>"online"===e.status).length,i=e.filter(e=>"offline"===e.status).length,a=e.filter(e=>"warning"===e.status).length;return F`
      <div class="toolbar">
        <div class="toolbar-left">
          <select @change=${this._onLayoutChange}>
            <option value="">Auto Discovery</option>
            ${Object.entries(this.layouts).map(([e,t])=>F`
              <option value=${e} ?selected=${this.selectedLayout===e}>
                ${t.name}${t.isDefault?" (default)":""}
              </option>
            `)}
          </select>
          <button class="tool-btn ${this.editMode?"active":""}"
            @click=${this._toggleEditMode}>
            ${this.editMode?"Done Editing":"Edit Mode"}
          </button>
          ${this.editMode?F`
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
            ${this.selectedLayout?F`
              <button class="tool-btn" @click=${this._setAsDefault}>
                ${this.layouts[this.selectedLayout]?.isDefault?"Default":"Set Default"}
              </button>
              <button class="tool-btn danger" @click=${this._deleteCurrentLayout}>Delete</button>
            `:""}
            ${this._dirty?F`<span class="dirty-indicator">unsaved changes</span>`:""}
          `:""}
        </div>
        <div class="toolbar-right">
          <span class="status-dot" style="color: #81c784">${s} online</span>
          <span class="status-dot" style="color: #ef5350">${i} offline</span>
          <span class="status-dot" style="color: #ffb74d">${a} warning</span>
        </div>
      </div>

      ${this.linkMode?F`
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
    `}_renderNode(e){const t=this.nodePositions[e.id]||{x:100,y:100},s=ke[e.status]||ke.unknown,i=this.selectedNode===e.id,a=this._linkSource===e.id,o=i||a?2.5:1.5,n=i?"4,2":a?"2,2":"none",r=a?"#ffb74d":s;return"gateway"===e.type?B`
        <g transform="translate(${t.x}, ${t.y})"
          @click=${t=>this._onNodeClick(t,e.id)}
          @mousedown=${t=>this.editMode&&!this.linkMode&&this._onMouseDown(t,e.id)}
          style="cursor:pointer">
          <circle r="22" fill="${r}22" stroke="${r}" stroke-width="${o}"
            stroke-dasharray="${n}"/>
          <text text-anchor="middle" dy="4" fill="${r}" font-size="10">${e.name.substring(0,12)}</text>
        </g>
      `:B`
      <g transform="translate(${t.x}, ${t.y})"
        @click=${t=>this._onNodeClick(t,e.id)}
        @mousedown=${t=>this.editMode&&!this.linkMode&&this._onMouseDown(t,e.id)}
        style="cursor:pointer">
        <rect x="-45" y="-18" width="90" height="36" rx="6"
          fill="#2a2a4a" stroke="${r}" stroke-width="${o}"
          stroke-dasharray="${n}"/>
        <text text-anchor="middle" dy="-3" fill="${r}" font-size="10">
          ${(e.name||e.id).substring(0,12)}
        </text>
        <text text-anchor="middle" dy="10" fill="#666" font-size="8">${e.status}</text>
      </g>
    `}_edgeGeometry(e){const t=this.nodePositions[e.source],s=this.nodePositions[e.target];if(!t||!s)return null;const i=s.x-t.x,a=s.y-t.y,o=Math.sqrt(i*i+a*a)||1,n=i/o,r=a/o;let l=-r,d=n;d>0&&(l=-l,d=-d);const c=this._boxExitDistance(n,r);return{from:t,to:s,ux:n,uy:r,perpX:l,perpY:d,len:o,srcDist:c+8,tgtDist:c+8}}_boxExitDistance(e,t){if(Math.abs(e)<.001)return 22;if(Math.abs(t)<.001)return 48;const s=48/Math.abs(e),i=22/Math.abs(t);return Math.min(s,i)}_renderEdgeLine(e,t){const s=this._edgeGeometry(e);if(!s)return B``;const i="manual"===e.type,a=i?"#4fc3f7":"#555",o=i&&this._selectedEdge===t-(this.topology.edges?.length||0)?2.5:1.5,n=i?"none":"4,2";return B`
      <line x1="${s.from.x}" y1="${s.from.y}" x2="${s.to.x}" y2="${s.to.y}"
        stroke="${a}" stroke-width="${o}"
        stroke-dasharray="${n}"
        @click=${i&&this.editMode?()=>this._selectEdge(t-(this.topology.edges?.length||0)):null}
        style="${i&&this.editMode?"cursor:pointer":""}"/>
    `}_renderEdgeLabels(e,t){if(!e.label&&!e.sourceLabel&&!e.targetLabel)return B``;const s=this._edgeGeometry(e);if(!s)return B``;const{from:i,to:a,ux:o,uy:n,perpX:r,perpY:l,srcDist:d,tgtDist:c}=s,p=i.x+o*d,h=i.y+n*d,u=a.x-o*c,g=a.y-n*c,m=(i.x+a.x)/2+14*r,v=(i.y+a.y)/2+14*l;return B`
      ${e.label?B`
        <rect x="${m-3*e.label.length-3}" y="${v-9}"
          width="${6*e.label.length+6}" height="13" rx="2" fill="#1a1a2e" opacity="0.9"/>
        <text x="${m}" y="${v}" text-anchor="middle"
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
    `:B``}_renderDetailPanel(){const e=this.topology.nodes.find(e=>e.id===this.selectedNode);if(!e)return F``;const t=this._selectedDeviceData,s=ke[e.status]||ke.unknown;if(!t)return F`
        <div class="device-panel">
          <div style="color: #888; font-size: 13px;">Loading device data...</div>
        </div>
      `;const i=Object.entries(t.attributes||{}),a=t.network||{},o=t.tags||[],n=t.server_tags||[],r={cpu_usage:90,memory_usage:90,disk_usage:95,cpu_temp:80};return F`
      <div class="device-panel">
        <div class="device-header">
          <div>
            <span class="device-title" style="color: ${s}">
              ${t.device_name||this.selectedNode}
            </span>
            <span class="device-type">${t.device_type||e.type}</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="device-status-badge" style="background: ${s}20; color: ${s}">
              ${t.status||e.status}
            </span>
            <button class="close-btn" @click=${()=>{this.selectedNode=null,this._selectedDeviceData=null}}>&times;</button>
          </div>
        </div>

        ${o.length>0||n.length>0?F`
          <div style="margin-bottom: 12px;">
            <div class="tags-row">
              ${o.map(e=>F`<span class="tag-badge">${e}</span>`)}
              ${n.map(e=>F`<span class="tag-badge server">${e}</span>`)}
            </div>
          </div>
        `:""}

        ${i.length>0?F`
          <div class="device-section">
            <div class="device-section-title">Attributes</div>
            <div class="attr-grid">
              ${i.map(([e,t])=>{const s=r[e],i=s&&"number"==typeof t.value&&t.value>s;return F`
                  <div class="attr-item">
                    <div class="attr-label">${e.replace(/_/g," ")}</div>
                    <div class="attr-val ${i?"warning":""}">
                      ${null!=t.value?t.value:"—"}
                      <span class="attr-unit">${t.unit||""}</span>
                    </div>
                  </div>
                `})}
            </div>
          </div>
        `:""}

        ${Object.keys(a).length>0?F`
          <div class="device-section">
            <div class="device-section-title">Network</div>
            <div class="network-grid">
              ${Object.entries(a).map(([e,t])=>F`
                <div class="net-item">
                  <span class="net-label">${e}: </span>${t}
                </div>
              `)}
            </div>
          </div>
        `:""}

        <div class="device-section">
          <div class="device-section-title">Commands</div>
          ${t.allowed_commands&&t.allowed_commands.length>0?F`
            <div class="commands-row">
              ${t.allowed_commands.map(e=>{const t=["shutdown","halt","poweroff","destroy"].some(t=>e.toLowerCase().includes(t));return F`
                  <button class="cmd-btn ${t?"danger":""}"
                    @click=${()=>this._sendCmd(e)}>${e}</button>
                `})}
            </div>
          `:F`
            <div style="font-size: 12px; color: #666; font-style: italic;">
              No commands available — configure allowed_commands in the client's config.yaml
            </div>
          `}
          ${this._commandResult?F`<div class="cmd-result">${this._commandResult}</div>`:""}
        </div>
      </div>
    `}_renderManualEdgesList(){return F`
      <div class="edge-panel">
        <div class="edge-panel-header">
          <span style="font-size: 13px; color: #ccc; font-weight: 600;">Manual Links</span>
        </div>
        <div class="edge-list">
          ${this.manualEdges.map((e,t)=>F`
            <div class="edge-item">
              <span>
                ${this._getNodeName(e.source)}
                ${e.sourceLabel?F`<span style="color: #4fc3f7; font-size: 10px;"> [${e.sourceLabel}]</span>`:""}
                <span style="color: #666;"> &#8594; </span>
                ${e.label?F`<span style="color: #888; font-size: 10px;">(${e.label})</span><span style="color: #666;"> &#8594; </span>`:""}
                ${e.targetLabel?F`<span style="color: #4fc3f7; font-size: 10px;">[${e.targetLabel}] </span>`:""}
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
    `}_renderSaveDialog(){return F`
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
    `}_renderLabelDialog(){const e=this.manualEdges[this._labelEdgeIndex];if(!e)return F``;const t=this._getNodeName(e.source),s=this._getNodeName(e.target);return F`
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
    `}_onNodeClick(e,t){e.stopPropagation(),this.linkMode?this._handleLinkClick(t):this._selectNode(t)}_handleLinkClick(e){if(this._linkSource)if(this._linkSource===e)this._linkSource=null;else{const t=this.manualEdges.some(t=>t.source===this._linkSource&&t.target===e||t.source===e&&t.target===this._linkSource);t||(this.manualEdges=[...this.manualEdges,{source:this._linkSource,target:e,sourceLabel:"",label:"",targetLabel:""}],this._markDirty(),this._labelEdgeIndex=this.manualEdges.length-1,this._showLabelDialog=!0),this._linkSource=null}else this._linkSource=e}_toggleEditMode(){this.editMode&&this._dirty?this._showSaveDialog=!0:this._enterOrExitEdit()}_enterOrExitEdit(){this.editMode=!this.editMode,this.editMode?(this._savedPositions=JSON.stringify(this.nodePositions),this._savedManualEdges=JSON.stringify(this.manualEdges),this._dirty=!1):(this.linkMode=!1,this._linkSource=null,this._selectedEdge=-1,this._dirty=!1)}_markDirty(){this.editMode&&(this._dirty=!0)}async _saveAndExit(){this._showSaveDialog=!1,await this._saveCurrentLayout(),this._dirty=!1,this._enterOrExitEdit()}_discardAndExit(){this._showSaveDialog=!1,this._savedPositions&&(this.nodePositions=JSON.parse(this._savedPositions)),this._savedManualEdges&&(this.manualEdges=JSON.parse(this._savedManualEdges)),this._dirty=!1,this._enterOrExitEdit()}_cancelDialog(){this._showSaveDialog=!1}_toggleLinkMode(){this.linkMode=!this.linkMode,this._linkSource=null,this.linkMode&&(this.selectedNode=null)}async _selectNode(e){if(this.selectedNode===e)return this.selectedNode=null,this._selectedDeviceData=null,void(this._commandResult="");this.selectedNode=e,this._selectedDeviceData=null,this._commandResult="";try{this._selectedDeviceData=await ge(e)}catch(e){this._selectedDeviceData={status:"inferred",attributes:{},tags:[]}}}async _sendCmd(e){if(this.selectedNode)try{this._commandResult=`Sending ${e}...`;const t=await ve(this.selectedNode,e);this._commandResult=`Sent (request: ${t.request_id})`}catch(e){this._commandResult=`Error: ${e.message}`}}_selectEdge(e){this._selectedEdge=this._selectedEdge===e?-1:e}_labelEdge(e){this._labelEdgeIndex=e,this._showLabelDialog=!0}_saveLabelDialog(){const e=this.shadowRoot.querySelector(".label-dialog"),t=e.querySelector("#source-label").value,s=e.querySelector("#link-label").value,i=e.querySelector("#target-label").value,a=[...this.manualEdges];a[this._labelEdgeIndex]={...a[this._labelEdgeIndex],sourceLabel:t,label:s,targetLabel:i},this.manualEdges=a,this._markDirty(),this._showLabelDialog=!1,this._labelEdgeIndex=-1}_cancelLabelDialog(){this._showLabelDialog=!1,this._labelEdgeIndex=-1}_removeEdge(e){this.manualEdges=this.manualEdges.filter((t,s)=>s!==e),this._selectedEdge=-1,this._markDirty()}_onMouseDown(e,t){this._dragging=t;const s=this.shadowRoot.querySelector("svg"),i=s.createSVGPoint();i.x=e.clientX,i.y=e.clientY;const a=i.matrixTransform(s.getScreenCTM().inverse()),o=this.nodePositions[t]||{x:0,y:0};this._dragOffset={x:a.x-o.x,y:a.y-o.y},e.preventDefault()}_onMouseMove(e){const t=this.shadowRoot.querySelector("svg"),s=t.createSVGPoint();s.x=e.clientX,s.y=e.clientY;const i=s.matrixTransform(t.getScreenCTM().inverse());this.linkMode&&this._linkSource&&(this._mousePos={x:i.x,y:i.y},this.requestUpdate()),this._dragging&&(this.nodePositions={...this.nodePositions,[this._dragging]:{x:i.x-this._dragOffset.x,y:i.y-this._dragOffset.y}})}_onMouseUp(){this._dragging&&this._markDirty(),this._dragging=null}_onLayoutChange(e){if(this.selectedLayout=e.target.value,this.selectedLayout&&this.layouts[this.selectedLayout]){const e=this.layouts[this.selectedLayout];this.nodePositions=e.positions||{},this.manualEdges=e.manualEdges||[],this.hideAutoEdges=e.hideAutoEdges||!1}else this.nodePositions={},this.manualEdges=[],this.hideAutoEdges=!1,this._autoLayout()}async _saveCurrentLayout(){const e=this.selectedLayout&&this.layouts[this.selectedLayout]?this.layouts[this.selectedLayout].name:"",t=prompt("Layout name:",e);if(!t)return;const s=this.selectedLayout&&this.layouts[this.selectedLayout]&&this.layouts[this.selectedLayout].isDefault||!1,i=await me({id:this.selectedLayout||void 0,name:t,positions:this.nodePositions,manualEdges:this.manualEdges,hideAutoEdges:this.hideAutoEdges,isDefault:s});this.selectedLayout=i.id,await this._loadLayouts(),this._dirty=!1,this._savedPositions=JSON.stringify(this.nodePositions),this._savedManualEdges=JSON.stringify(this.manualEdges)}async _setAsDefault(){if(!this.selectedLayout)return;for(const[e,t]of Object.entries(this.layouts))t.isDefault&&(t.isDefault=!1,await me(t));const e=this.layouts[this.selectedLayout];e&&(e.isDefault=!0,await me(e)),await this._loadLayouts(),this._layoutsLoaded=!0}async _deleteCurrentLayout(){if(!this.selectedLayout)return;const e=this.layouts[this.selectedLayout]?.name||this.selectedLayout;confirm(`Delete layout "${e}"?`)&&(await async function(e){await fetch(`${he}/api/topology/layouts/${e}`,{method:"DELETE"})}(this.selectedLayout),this.selectedLayout="",this.nodePositions={},this.manualEdges=[],this.hideAutoEdges=!1,this._dirty=!1,await this._loadLayouts(),this._autoLayout())}}customElements.define("topology-view",Se);const Ee={online:"#81c784",offline:"#ef5350",warning:"#ffb74d",unknown:"#666"};class Ae extends le{static properties={device:{type:Object},deviceId:{type:String}};static styles=o`
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
  `;render(){if(!this.device)return F``;const e=this.device,t=Ee[e.status]||Ee.unknown,s=Object.entries(e.attributes||{}).slice(0,4),i=[...e.tags||[],...e.server_tags||[]];return this.style.setProperty("--status-color",t),F`
      <div class="header">
        <span class="name">${e.device_name||this.deviceId}</span>
        <span class="status" style="background: ${t}20; color: ${t}">
          ${"online"===e.status||"offline"===e.status?"● ":"⚠ "}${e.status}
        </span>
      </div>
      <div class="type">${e.device_type||"unknown"}</div>
      ${s.length>0?F`
        <div class="attrs">
          ${s.map(([e,t])=>F`
            <div class="attr">
              ${e.replace(/_/g," ")}: <span class="attr-value ${this._isWarning(e,t)?"warning":""}">${t.value}${t.unit}</span>
            </div>
          `)}
        </div>
      `:""}
      ${i.length>0?F`
        <div class="tags">
          ${i.map(e=>F`<span class="tag">${e}</span>`)}
        </div>
      `:""}
    `}_isWarning(e,t){const s={cpu_usage:90,memory_usage:90,disk_usage:95,cpu_temp:80};return s[e]&&t.value>s[e]}}customElements.define("device-card",Ae);class Ce extends le{static properties={selectedTags:{type:Array},_allTags:{type:Array,state:!0},_open:{type:Boolean,state:!0},_showCreate:{type:Boolean,state:!0},_newTagName:{type:String,state:!0},_creating:{type:Boolean,state:!0}};static styles=o`
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
  `;constructor(){super(),this.selectedTags=[],this._allTags=[],this._open=!1,this._showCreate=!1,this._newTagName="",this._creating=!1,this._onDocClick=this._onDocClick.bind(this)}connectedCallback(){super.connectedCallback(),this._loadTags(),document.addEventListener("click",this._onDocClick)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._onDocClick)}async _loadTags(){try{const e=await xe();Array.isArray(e)&&(this._allTags=e.map(e=>"string"==typeof e?e:e.tag).sort())}catch(e){console.error("Failed to load tags:",e)}}_onDocClick(e){if(!this._open)return;e.composedPath().includes(this)||(this._open=!1,this._showCreate=!1)}_toggle(e){e.stopPropagation(),this._open=!this._open,this._open||(this._showCreate=!1)}_toggleTag(e){(this.selectedTags||[]).includes(e)?this.dispatchEvent(new CustomEvent("tag-remove",{detail:{tag:e},bubbles:!0,composed:!0})):this.dispatchEvent(new CustomEvent("tag-add",{detail:{tag:e},bubbles:!0,composed:!0}))}async _createTag(){const e=this._newTagName.trim();if(e&&!this._creating){this._creating=!0;try{await ye(e),await this._loadTags(),this.dispatchEvent(new CustomEvent("tag-add",{detail:{tag:e},bubbles:!0,composed:!0})),this._newTagName="",this._showCreate=!1}catch(e){console.error("Failed to create tag:",e)}finally{this._creating=!1}}}render(){const e=this.selectedTags||[],t=e.length>0;return F`
      <button class="trigger ${t?"has-selected":""}" @click=${this._toggle}>
        Tags${t?` (${e.length})`:""}
        <span class="arrow">${this._open?"▲":"▼"}</span>
      </button>

      ${this._open?F`
        <div class="dropdown" @click=${e=>e.stopPropagation()}>
          ${0!==this._allTags.length||this._showCreate?this._allTags.map(t=>F`
              <div class="dropdown-item ${e.includes(t)?"checked":""}"
                @click=${()=>this._toggleTag(t)}>
                <span class="checkbox">${e.includes(t)?"✓":""}</span>
                ${t}
              </div>
            `):F`<div class="empty">No tags in registry</div>`}

          <hr class="dropdown-divider">

          ${this._showCreate?F`
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
          `:F`
            <div class="create-row">
              <span class="create-link" @click=${()=>this._showCreate=!0}>+ Create new tag</span>
            </div>
          `}
        </div>
      `:""}
    `}}customElements.define("tag-picker",Ce);class De extends le{static properties={devices:{type:Object},filter:{type:String},selectedTags:{type:Array},viewMode:{type:String},_groups:{type:Object,state:!0},_collapsedGroups:{type:Object,state:!0}};static styles=o`
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
  `;constructor(){super(),this.devices={},this.filter="all",this.selectedTags=[],this.viewMode="all",this._groups={},this._collapsedGroups={},this._wsUnsub=null}connectedCallback(){super.connectedCallback(),this._loadDevices(),this._loadGroups(),this._wsUnsub=ce.onMessage(e=>{"device_update"===e.type&&(this.devices={...this.devices,[e.device_id]:e.device},this.requestUpdate())})}disconnectedCallback(){super.disconnectedCallback()}async _loadDevices(){try{this.devices=await ue()}catch(e){console.error("Failed to load devices:",e)}}async _loadGroups(){try{this._groups=await fe()}catch(e){console.error("Failed to load groups:",e)}}get _filteredDevices(){let e=Object.entries(this.devices);return"all"!==this.filter&&(e=e.filter(([,e])=>e.status===this.filter)),this.selectedTags.length>0&&(e=e.filter(([,e])=>{const t=[...e.tags||[],...e.server_tags||[]];return this.selectedTags.some(e=>t.includes(e))})),e}get _counts(){const e=Object.values(this.devices);return{all:e.length,online:e.filter(e=>"online"===e.status).length,offline:e.filter(e=>"offline"===e.status).length,warning:e.filter(e=>"warning"===e.status).length}}_onTagAdd(e){const t=e.detail.tag;this.selectedTags.includes(t)||(this.selectedTags=[...this.selectedTags,t])}_onTagRemove(e){this.selectedTags=this.selectedTags.filter(t=>t!==e.detail.tag)}render(){const e=this._counts;return F`
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
      </div>

      ${this.selectedTags.length>0?F`
        <div class="active-tags">
          ${this.selectedTags.map(e=>F`
            <span class="active-tag">
              #${e}
              <span class="remove" @click=${()=>this.selectedTags=this.selectedTags.filter(t=>t!==e)}>&times;</span>
            </span>
          `)}
          <button class="clear-all" @click=${()=>{this.selectedTags=[],this.filter="all"}}>Clear all</button>
        </div>
      `:""}

      ${"group"===this.viewMode?this._renderByGroup():this._renderAll()}
    `}_renderAll(){const e=this._filteredDevices;return 0===e.length?F`<div class="empty">No devices found</div>`:F`
      <div class="grid">
        ${e.map(([e,t])=>F`
          <device-card
            .device=${t}
            .deviceId=${e}
            @click=${()=>this._selectDevice(e)}
          ></device-card>
        `)}
      </div>
    `}_renderByGroup(){const e=this._filteredDevices,t=Object.values(this._groups),s={},i=new Set;t.forEach(t=>{const a=e.filter(([e])=>(t.device_ids||[]).includes(e));s[t.id]=a,a.forEach(([e])=>i.add(e))});const a=e.filter(([e])=>!i.has(e));return F`
      ${t.map(e=>this._renderGroupSection(e,s[e.id]||[]))}
      ${a.length>0?F`
        <div class="group-section">
          <div class="ungrouped-header">Ungrouped (${a.length})</div>
          <div class="grid">
            ${a.map(([e,t])=>F`
              <device-card .device=${t} .deviceId=${e}
                @click=${()=>this._selectDevice(e)}></device-card>
            `)}
          </div>
        </div>
      `:""}
      ${0===e.length?F`<div class="empty">No devices found</div>`:""}
    `}_renderGroupSection(e,t){const s=!!this._collapsedGroups[e.id],i=Object.entries(this.devices).filter(([t])=>(e.device_ids||[]).includes(t)).map(([,e])=>e),a=i.filter(e=>"online"===e.status).length,o=i.length;return F`
      <div class="group-section">
        <div class="group-section-header"
          @click=${()=>this._toggleGroupCollapse(e.id)}>
          <span class="group-chevron ${s?"":"open"}">&#9658;</span>
          <span class="group-section-name">${e.name}</span>
          <span class="group-device-count">${t.length} device${1!==t.length?"s":""}</span>
          <div class="group-health">
            <span class="health-dot" style="color: #81c784">
              ${a}/${o} online
            </span>
          </div>
        </div>
        ${s?"":F`
          <div class="group-body">
            ${0===t.length?F`<div style="color: #555; font-size: 13px; padding: 8px 4px;">No devices match current filters</div>`:F`
                <div class="grid">
                  ${t.map(([e,t])=>F`
                    <device-card .device=${t} .deviceId=${e}
                      @click=${()=>this._selectDevice(e)}></device-card>
                  `)}
                </div>
              `}
          </div>
        `}
      </div>
    `}_toggleGroupCollapse(e){this._collapsedGroups={...this._collapsedGroups,[e]:!this._collapsedGroups[e]}}_selectDevice(e){this.dispatchEvent(new CustomEvent("device-select",{detail:{deviceId:e},bubbles:!0,composed:!0}))}}customElements.define("dashboard-view",De);const Te=["shutdown","halt","poweroff","destroy"];class Ne extends le{static properties={deviceId:{type:String},device:{type:Object},commandResult:{type:String},_groups:{type:Object,state:!0},_effectiveSettings:{type:Object,state:!0},_haOverrides:{type:Object,state:!0},_configInterval:{type:Number,state:!0},_customSensors:{type:Object,state:!0},_showAddSensor:{type:Boolean,state:!0},_editSensorKey:{type:String,state:!0},_sensorForm:{type:Object,state:!0},_pushing:{type:Boolean,state:!0},_pushStatus:{type:String,state:!0},_lastPushed:{type:String,state:!0},_localChanges:{type:Boolean,state:!0},_showGroupDialog:{type:Boolean,state:!0},_newGroupName:{type:String,state:!0}};static styles=o`
    :host { display: block; padding: 20px; max-width: 1000px; margin: 0 auto; }

    .back {
      background: none; border: none; color: #4fc3f7; cursor: pointer;
      font-size: 14px; margin-bottom: 16px; padding: 0;
    }
    .back:hover { text-decoration: underline; }

    .header {
      display: flex; justify-content: space-between; align-items: center;
      margin-bottom: 20px;
    }
    .header-left { display: flex; flex-direction: column; gap: 2px; }
    .title { font-size: 24px; font-weight: 700; }
    .device-type { font-size: 12px; color: #666; }
    .status-badge {
      padding: 4px 12px; border-radius: 12px; font-size: 13px;
    }

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
    .tag {
      display: flex; align-items: center; gap: 4px;
      font-size: 11px; padding: 3px 10px; border-radius: 4px;
    }
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

    /* Attributes + HA exposure */
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
    .attr-label { font-size: 10px; color: #666; text-transform: uppercase; letter-spacing: 0.5px; }
    .attr-val {
      font-size: 22px; font-weight: 700; margin-top: 4px; color: #4fc3f7;
      transition: color 0.2s;
    }
    .attr-val.dimmed-val { color: #555; }
    .attr-unit { font-size: 12px; color: #888; font-weight: 400; }
    .attr-ha-status {
      font-size: 10px; color: #555; margin-top: 4px;
    }
    .attr-ha-status.exposed { color: #4fc3f7; }

    /* Toggle switch */
    .toggle-wrap { cursor: pointer; flex-shrink: 0; }
    .toggle {
      width: 32px; height: 18px; border-radius: 9px; position: relative;
      transition: background 0.2s;
    }
    .toggle.on { background: #4fc3f7; }
    .toggle.off { background: #444; }
    .toggle-knob {
      width: 14px; height: 14px; border-radius: 50%; background: #fff;
      position: absolute; top: 2px; transition: left 0.2s;
    }
    .toggle.on .toggle-knob { left: 16px; }
    .toggle.off .toggle-knob { left: 2px; }

    /* Network */
    .network-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 8px;
    }
    .net-item { font-size: 13px; color: #aaa; }
    .net-label { color: #666; margin-right: 8px; }

    /* Commands */
    .commands { display: flex; gap: 8px; flex-wrap: wrap; }
    .cmd-btn {
      background: #3a3a5a; border: none; color: #ccc; padding: 8px 16px;
      border-radius: 6px; cursor: pointer; font-size: 13px; transition: all 0.2s;
    }
    .cmd-btn:hover { background: #4a4a6a; }
    .cmd-btn.danger { background: #5a2a2a; color: #ef5350; }
    .cmd-btn.danger:hover { background: #6a3a3a; }
    .cmd-result {
      margin-top: 8px; padding: 8px 12px; background: #1a1a2e;
      border-radius: 4px; font-size: 12px; color: #aaa; font-family: monospace;
    }
    .no-commands { font-size: 13px; color: #666; font-style: italic; }

    /* Agent configuration */
    .config-row { display: flex; gap: 10px; align-items: center; margin-bottom: 14px; }
    .config-label { font-size: 12px; color: #888; min-width: 120px; }
    .config-input {
      background: #1a1a2e; border: 1px solid #3a3a5a; border-radius: 4px;
      color: #e0e0e0; padding: 5px 10px; font-size: 13px; width: 100px;
    }
    .config-input:focus { outline: none; border-color: #4fc3f7; }
    .plugins-list {
      display: flex; gap: 6px; flex-wrap: wrap;
    }
    .plugin-badge {
      background: #1a1a2e; color: #888; padding: 3px 10px;
      border-radius: 4px; font-size: 11px;
    }

    /* Custom sensors table */
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
    .sensor-btn.edit { color: #4fc3f7; }
    .sensor-btn.edit:hover { background: rgba(79,195,247,0.1); }
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
    .form-btn.save { background: #4fc3f7; color: #1a1a2e; font-weight: 600; }
    .form-btn.cancel { background: #3a3a5a; color: #aaa; }

    /* Push config button */
    .push-row { display: flex; align-items: center; gap: 12px; margin-top: 14px; flex-wrap: wrap; }
    .push-btn {
      background: #2e7d32; border: none; color: #fff; padding: 8px 20px;
      border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 600;
      transition: all 0.2s;
    }
    .push-btn:hover { background: #388e3c; }
    .push-btn:disabled { opacity: 0.5; cursor: default; }
    .push-status { font-size: 12px; color: #888; }
    .push-status.synced { color: #81c784; }
    .push-status.pending { color: #ffb74d; }

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
    .dialog-btn {
      border: none; padding: 8px 18px; border-radius: 6px; cursor: pointer; font-size: 13px;
    }
    .dialog-btn.save { background: #4fc3f7; color: #1a1a2e; font-weight: 600; }
    .dialog-btn.cancel { background: #3a3a5a; color: #aaa; }
  `;constructor(){super(),this.device=null,this.commandResult="",this._groups={},this._effectiveSettings=null,this._haOverrides={},this._configInterval=30,this._customSensors={},this._showAddSensor=!1,this._editSensorKey=null,this._sensorForm={name:"",command:"",interval:30,unit:""},this._pushing=!1,this._pushStatus="",this._lastPushed="",this._localChanges=!1,this._showGroupDialog=!1,this._newGroupName=""}connectedCallback(){super.connectedCallback(),this._loadDevice(),this._loadGroups(),ce.onMessage(e=>{"device_update"===e.type&&e.device_id===this.deviceId&&(this.device=e.device)})}async _loadDevice(){try{if(this.device=await ge(this.deviceId),this._haOverrides={...this.device.ha_exposure_overrides||{}},this.device.remote_config){this._configInterval=this.device.remote_config.interval||30;const e=this.device.remote_config.plugins?.custom_command?.commands||{};this._customSensors={...e}}try{this._effectiveSettings=await async function(e){return(await fetch(`${he}/api/devices/${e}/effective-settings`)).json()}(this.deviceId)}catch(e){}}catch(e){console.error("Failed to load device:",e)}}async _loadGroups(){try{this._groups=await fe()}catch(e){console.error("Failed to load groups:",e)}}render(){if(!this.device)return F`<div style="padding: 40px; text-align: center; color: #888;">Loading...</div>`;const e=this.device,t="online"===e.status?"#81c784":"offline"===e.status?"#ef5350":"#ffb74d";return F`
      <button class="back" @click=${()=>this.dispatchEvent(new CustomEvent("back"))}>
        &#8592; Back
      </button>

      <!-- 1. Header -->
      <div class="header">
        <div class="header-left">
          <span class="title">${e.device_name||this.deviceId}</span>
          <span class="device-type">${e.device_type||""}</span>
        </div>
        <span class="status-badge" style="background: ${t}20; color: ${t}">
          ${e.status}
        </span>
      </div>

      <!-- 2. Tags -->
      ${this._renderTagsSection()}

      <!-- 3. Group Policy -->
      ${this._renderGroupPolicy()}

      <!-- 4. Attributes + HA Exposure -->
      ${this._renderAttributesSection()}

      <!-- 5. Network -->
      ${this._renderNetwork()}

      <!-- 6. Commands -->
      ${this._renderCommands()}

      <!-- 7. Agent Configuration -->
      ${this._renderAgentConfig()}

      ${this._showGroupDialog?this._renderGroupDialog():""}
    `}_renderTagsSection(){const e=this.device.tags||[],t=this.device.server_tags||[];return F`
      <div class="section">
        <div class="section-title">Tags</div>
        <div class="tags-row">
          ${e.map(e=>F`<span class="tag client">${e}</span>`)}
          ${t.map(e=>F`
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
    `}_renderGroupPolicy(){const e=Object.values(this._groups),t=this.device.group_policy||"",s=t?this._groups[t]:null,i=s?.thresholds||{};return F`
      <div class="section">
        <div class="section-title">Group Policy</div>
        <div class="group-policy-row">
          <select class="group-select"
            .value=${t}
            @change=${this._onGroupPolicyChange}>
            <option value="">None — use global defaults</option>
            ${e.map(e=>F`
              <option value=${e.id} ?selected=${e.id===t}>${e.name}</option>
            `)}
          </select>
          <button class="cmd-btn" style="font-size: 12px; padding: 5px 12px;"
            @click=${()=>this._showGroupDialog=!0}>New Group</button>
        </div>

        ${s&&Object.keys(i).length>0?F`
          <div class="group-threshold-summary">
            ${Object.entries(i).map(([e,t])=>F`
              <span><span style="color: #888;">${e.replace(/_/g," ")}:</span> ${t}</span>
            `)}
          </div>
        `:""}

        <div class="group-hint">
          Group policy sets default thresholds and HA entity settings. Device-level overrides take priority.
        </div>
      </div>
    `}async _onGroupPolicyChange(e){const t=e.target.value||null;try{await we(this.deviceId,{group_policy:t}),await this._loadDevice()}catch(e){console.error("Failed to update group policy:",e)}}_renderAttributesSection(){const e=Object.entries(this.device.attributes||{});return 0===e.length?F``:F`
      <div class="section">
        <div class="section-title">Attributes &amp; HA Exposure</div>
        <div class="attr-grid">
          ${e.map(([e,t])=>this._renderAttrTile(e,t))}
        </div>
      </div>
    `}_isExposed(e){if(void 0!==this._haOverrides[e])return this._haOverrides[e];const t=this._effectiveSettings;return void 0===t?.ha_exposure_overrides?.[e]||t.ha_exposure_overrides[e]}_fromGroup(e){if(void 0!==this._haOverrides[e])return!1;const t=this._effectiveSettings;return void 0!==t?.ha_exposure_overrides?.[e]}_renderAttrTile(e,t){const s=this._isExposed(e),i=this._fromGroup(e);return F`
      <div class="attr-tile ${s?"":"dimmed"}">
        <div class="attr-tile-top">
          <span class="attr-label">${e.replace(/_/g," ")}</span>
          <span class="toggle-wrap" @click=${()=>this._toggleHaExposure(e)}>
            <div class="toggle ${s?"on":"off"}">
              <div class="toggle-knob"></div>
            </div>
          </span>
        </div>
        <div class="attr-val ${s?"":"dimmed-val"}">
          ${null!=t.value?t.value:"—"}
          <span class="attr-unit">${t.unit||""}</span>
        </div>
        <div class="attr-ha-status ${s?"exposed":""}">
          ${s?"HA sensor active":"Not exposed to HA"}
          ${i?F` <span style="color: #666;">&#8592; from group</span>`:""}
        </div>
      </div>
    `}async _toggleHaExposure(e){const t=this._isExposed(e);this._haOverrides={...this._haOverrides,[e]:!t},this._localChanges=!0;try{await we(this.deviceId,{ha_exposure_overrides:this._haOverrides})}catch(e){console.error("Failed to update HA exposure:",e)}}_renderNetwork(){const e=this.device.network||{};return 0===Object.keys(e).length?F``:F`
      <div class="section">
        <div class="section-title">Network</div>
        <div class="network-grid">
          ${Object.entries(e).map(([e,t])=>F`
            <div class="net-item">
              <span class="net-label">${e}:</span>${t}
            </div>
          `)}
        </div>
      </div>
    `}_renderCommands(){const e=this.device.allowed_commands;return F`
      <div class="section">
        <div class="section-title">Commands</div>
        ${e&&0!==e.length?F`
          <div class="commands">
            ${e.map(e=>F`
              <button class="cmd-btn ${function(e){const t=e.toLowerCase();return Te.some(e=>t.includes(e))}(e)?"danger":""}"
                @click=${()=>this._sendCmd(e)}>
                ${e}
              </button>
            `)}
          </div>
        `:F`
          <div class="no-commands">
            No commands available — configure <code>allowed_commands</code> in the client's config.yaml
          </div>
        `}
        ${this.commandResult?F`<div class="cmd-result">${this.commandResult}</div>`:""}
      </div>
    `}_renderAgentConfig(){const e=this.device.remote_config||{},t=e.plugins?Object.keys(e.plugins):[],s=this._customSensors;return F`
      <div class="section">
        <div class="section-title">Agent Configuration</div>

        <div class="config-row">
          <span class="config-label">Collection interval</span>
          <input class="config-input" type="number" min="5"
            .value=${String(this._configInterval)}
            @input=${e=>{this._configInterval=Number(e.target.value),this._localChanges=!0}}>
          <span style="font-size: 12px; color: #666; margin-left: 4px;">seconds</span>
        </div>

        ${t.length>0?F`
          <div class="config-row">
            <span class="config-label">Active plugins</span>
            <div class="plugins-list">
              ${t.map(e=>F`<span class="plugin-badge">${e}</span>`)}
            </div>
          </div>
        `:""}

        <div style="margin-bottom: 10px;">
          <div class="section-title" style="margin-bottom: 8px;">Custom Sensors</div>
          ${Object.keys(s).length>0?F`
            <table class="sensor-table">
              <thead>
                <tr>
                  <th>Name</th><th>Command</th><th>Interval</th><th>Unit</th><th></th>
                </tr>
              </thead>
              <tbody>
                ${Object.entries(s).map(([e,t])=>F`
                  <tr>
                    <td>${e}</td>
                    <td>${t.command}</td>
                    <td>${t.interval}s</td>
                    <td>${t.unit||"—"}</td>
                    <td>
                      <div class="sensor-actions">
                        <button class="sensor-btn edit" @click=${()=>this._editSensor(e,t)}>Edit</button>
                        <button class="sensor-btn remove" @click=${()=>this._removeSensor(e)}>Remove</button>
                      </div>
                    </td>
                  </tr>
                `)}
              </tbody>
            </table>
          `:F`<div style="font-size: 13px; color: #555; margin-bottom: 10px;">No custom sensors</div>`}

          ${this._showAddSensor||this._editSensorKey?this._renderSensorForm():F`
            <button class="cmd-btn" style="font-size: 12px; padding: 5px 12px;"
              @click=${this._startAddSensor}>+ Add Sensor</button>
          `}
        </div>

        ${this.device.allowed_commands&&this.device.allowed_commands.length>0?F`
          <div class="config-row" style="margin-bottom: 0;">
            <span class="config-label" style="color: #666;">Allowed commands</span>
            <div style="font-size: 12px; color: #666;">${(this.device.allowed_commands||[]).join(", ")}</div>
          </div>
        `:""}

        <div class="push-row">
          <button class="push-btn" ?disabled=${this._pushing} @click=${this._pushConfig}>
            ${this._pushing?"Pushing...":"Push Config"}
          </button>
          ${this._lastPushed?F`
            <span class="push-status">Last pushed: ${this._lastPushed}</span>
          `:""}
          ${this._pushStatus?F`
            <span class="push-status ${"Config synced"===this._pushStatus?"synced":"pending"}">
              ${this._pushStatus}
            </span>
          `:""}
        </div>
      </div>
    `}_renderSensorForm(){const e=this._sensorForm;return F`
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
          <button class="form-btn save" @click=${this._saveSensor}>Save</button>
          <button class="form-btn cancel" @click=${this._cancelSensorForm}>Cancel</button>
        </div>
      </div>
    `}_startAddSensor(){this._showAddSensor=!0,this._editSensorKey=null,this._sensorForm={name:"",command:"",interval:30,unit:""}}_editSensor(e,t){this._editSensorKey=e,this._showAddSensor=!1,this._sensorForm={name:e,command:t.command,interval:t.interval||30,unit:t.unit||""}}_removeSensor(e){const t={...this._customSensors};delete t[e],this._customSensors=t,this._localChanges=!0}_saveSensor(){const{name:e,command:t,interval:s,unit:i}=this._sensorForm;if(!e.trim()||!t.trim())return;const a={...this._customSensors};this._editSensorKey&&this._editSensorKey!==e&&delete a[this._editSensorKey],a[e.trim()]={command:t,interval:s||30,unit:i},this._customSensors=a,this._localChanges=!0,this._cancelSensorForm()}_cancelSensorForm(){this._showAddSensor=!1,this._editSensorKey=null,this._sensorForm={name:"",command:"",interval:30,unit:""}}async _pushConfig(){this._pushing=!0,this._pushStatus="";try{const e={interval:this._configInterval,plugins:{custom_command:{commands:this._customSensors}}};await async function(e,t){return(await fetch(`${he}/api/devices/${e}/push-config`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})).json()}(this.deviceId,e),this._lastPushed=(new Date).toLocaleTimeString(),this._localChanges=!1,this._pushStatus="Config synced"}catch(e){this._pushStatus=`Push failed: ${e.message}`}finally{this._pushing=!1}}_renderGroupDialog(){return F`
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
            <button class="dialog-btn save" @click=${this._createGroup}>Create</button>
          </div>
        </div>
      </div>
    `}async _createGroup(){const e=this._newGroupName.trim();if(!e)return;const t=e.toLowerCase().replace(/[^a-z0-9]+/g,"_");await be(t,e,[this.deviceId]),this._newGroupName="",this._showGroupDialog=!1,await this._loadGroups(),await this._loadDevice()}async _addTag(e){e&&(await async function(e,t){return(await fetch(`${he}/api/devices/${e}/tags/add`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({tags:t})})).json()}(this.deviceId,[e]),await this._loadDevice())}async _removeTag(e){await async function(e,t){return(await fetch(`${he}/api/devices/${e}/tags/${t}`,{method:"DELETE"})).json()}(this.deviceId,e),await this._loadDevice()}async _sendCmd(e,t={}){try{this.commandResult=`Sending ${e}...`;const s=await ve(this.deviceId,e,t);this.commandResult=`Command sent (request: ${s.request_id})`}catch(e){this.commandResult=`Error: ${e.message}`}}}customElements.define("device-detail",Ne);class ze extends le{static properties={_tags:{type:Array,state:!0},_settings:{type:Object,state:!0},_groups:{type:Object,state:!0},_devices:{type:Object,state:!0},_loading:{type:Boolean,state:!0},_newTagName:{type:String,state:!0},_renamingTag:{type:String,state:!0},_renameValue:{type:String,state:!0},_expandedGroup:{type:String,state:!0},_newGroupName:{type:String,state:!0},_editGroupName:{type:String,state:!0},_editingGroupName:{type:String,state:!0},_savingSettings:{type:Boolean,state:!0},_settingsSaved:{type:Boolean,state:!0}};static styles=o`
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

    /* Tag registry */
    .tag-list { display: flex; flex-direction: column; gap: 6px; }
    .tag-row {
      display: flex; align-items: center; justify-content: space-between;
      background: #1a1a2e; border-radius: 6px; padding: 8px 14px;
    }
    .tag-row-left { display: flex; align-items: center; gap: 10px; }
    .tag-name { font-size: 13px; color: #ccc; cursor: pointer; }
    .tag-name:hover { color: #4fc3f7; text-decoration: underline; }
    .tag-count { font-size: 11px; color: #666; }
    .tag-row-actions { display: flex; gap: 6px; }
    .icon-btn {
      background: none; border: none; cursor: pointer; font-size: 12px;
      padding: 2px 8px; border-radius: 4px; transition: all 0.15s;
    }
    .icon-btn.delete { color: #666; }
    .icon-btn.delete:hover { color: #ef5350; background: rgba(239,83,80,0.1); }
    .rename-row {
      display: flex; gap: 6px; align-items: center;
    }
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
    .threshold-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      gap: 8px;
    }
    .threshold-item label {
      font-size: 11px; color: #888; display: block; margin-bottom: 3px;
      text-transform: none; letter-spacing: 0;
    }
    .threshold-input {
      width: 100%; background: #2a2a4a; border: 1px solid #3a3a5a;
      border-radius: 4px; color: #e0e0e0; padding: 6px 10px;
      font-size: 13px; box-sizing: border-box;
    }
    .threshold-input:focus { outline: none; border-color: #4fc3f7; }
    .group-footer { display: flex; gap: 8px; margin-top: 12px; justify-content: flex-end; }
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

    /* Global defaults */
    .settings-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 12px; margin-bottom: 16px;
    }
    .settings-field label {
      display: block; font-size: 11px; color: #888; margin-bottom: 4px;
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

    .loading { padding: 40px; text-align: center; color: #666; }
  `;constructor(){super(),this._tags=[],this._settings=null,this._groups={},this._devices={},this._loading=!0,this._newTagName="",this._renamingTag=null,this._renameValue="",this._expandedGroup=null,this._newGroupName="",this._editGroupName="",this._editingGroupName=null,this._savingSettings=!1,this._settingsSaved=!1}connectedCallback(){super.connectedCallback(),this._loadAll()}async _loadAll(){this._loading=!0;try{const[e,t,s,i]=await Promise.all([xe().catch(()=>[]),$e().catch(()=>({})),fe().catch(()=>({})),ue().catch(()=>({}))]);this._tags=Array.isArray(e)?e.map(e=>"string"==typeof e?{tag:e,count:0}:e).sort((e,t)=>e.tag.localeCompare(t.tag)):[],this._settings=t,this._groups=s||{},this._devices=i||{}}finally{this._loading=!1}}render(){return this._loading?F`<div class="loading">Loading settings...</div>`:F`
      <h2>Settings</h2>
      ${this._renderTagRegistry()}
      ${this._renderGroupPolicies()}
      ${this._renderGlobalDefaults()}
    `}_renderTagRegistry(){return F`
      <div class="section">
        <div class="section-title">Tag Registry</div>
        <div class="tag-list">
          ${this._tags.map(e=>this._renderTagRow(e))}
        </div>
        <div class="add-row">
          <input class="small-input" type="text" placeholder="New tag name..."
            .value=${this._newTagName}
            @input=${e=>this._newTagName=e.target.value}
            @keydown=${e=>"Enter"===e.key&&this._createTag()}>
          <button class="small-btn" @click=${this._createTag}>New Tag</button>
        </div>
      </div>
    `}_renderTagRow(e){const t=this._renamingTag===e.tag;return F`
      <div class="tag-row">
        <div class="tag-row-left">
          ${t?F`
            <div class="rename-row">
              <input class="small-input" type="text" .value=${this._renameValue}
                @input=${e=>this._renameValue=e.target.value}
                @keydown=${t=>{"Enter"===t.key&&this._saveRename(e.tag),"Escape"===t.key&&this._cancelRename()}}>
              <button class="small-btn" @click=${()=>this._saveRename(e.tag)}>Save</button>
              <button class="small-btn cancel" @click=${this._cancelRename}>Cancel</button>
            </div>
          `:F`
            <span class="tag-name" @click=${()=>this._startRename(e.tag)}>${e.tag}</span>
            <span class="tag-count">${e.count} device${1!==e.count?"s":""}</span>
          `}
        </div>
        ${t?"":F`
          <div class="tag-row-actions">
            <button class="icon-btn delete" title="Delete tag"
              @click=${()=>this._deleteTag(e.tag)}>Delete</button>
          </div>
        `}
      </div>
    `}_startRename(e){this._renamingTag=e,this._renameValue=e}_cancelRename(){this._renamingTag=null,this._renameValue=""}async _saveRename(e){const t=this._renameValue.trim();if(t&&t!==e){try{await async function(e,t){return(await fetch(`${he}/api/tags/${encodeURIComponent(e)}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:t})})).json()}(e,t),await this._loadAll()}catch(e){console.error("Failed to rename tag:",e)}this._cancelRename()}else this._cancelRename()}async _createTag(){const e=this._newTagName.trim();if(e)try{await ye(e),this._newTagName="",await this._loadAll()}catch(e){console.error("Failed to create tag:",e)}}async _deleteTag(e){const t=this._tags.find(t=>t.tag===e);if(!(t&&t.count>0)||confirm(`"${e}" is used by ${t.count} device(s). Delete anyway?`))try{await async function(e){await fetch(`${he}/api/tags/${encodeURIComponent(e)}`,{method:"DELETE"})}(e),await this._loadAll()}catch(e){console.error("Failed to delete tag:",e)}}_renderGroupPolicies(){const e=Object.values(this._groups);return F`
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
    `}_renderGroup(e){const t=this._expandedGroup===e.id,s=(e.device_ids||[]).length,i=e.thresholds||{};return F`
      <div>
        <div class="group-header" @click=${()=>this._toggleGroup(e.id)}>
          <div class="group-header-left">
            <span class="chevron ${t?"open":""}">&#9658;</span>
            <span class="group-header-name">${e.name}</span>
            <span class="group-member-count">${s} member${1!==s?"s":""}</span>
          </div>
        </div>
        ${t?F`
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
                ${(e.device_ids||[]).map(t=>{const s=this._devices[t];return F`
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
              <div class="threshold-grid">
                ${[{key:"cpu_usage",label:"CPU %",placeholder:"90"},{key:"memory_usage",label:"Memory %",placeholder:"90"},{key:"disk_usage",label:"Disk %",placeholder:"95"},{key:"cpu_temp",label:"Temp °C",placeholder:"80"}].map(t=>F`
                  <div class="threshold-item">
                    <label>${t.label}</label>
                    <input class="threshold-input" type="number"
                      placeholder=${t.placeholder}
                      .value=${null!=i[t.key]?String(i[t.key]):""}
                      @input=${s=>this._updateGroupThreshold(e.id,t.key,s.target.value)}>
                  </div>
                `)}
              </div>
            </div>

            <div class="group-footer">
              <button class="group-delete-btn" @click=${()=>this._deleteGroup(e)}>Delete Group</button>
              <button class="group-save-btn" @click=${()=>this._saveGroup(e)}>Save</button>
            </div>
          </div>
        `:""}
      </div>
    `}_renderAddMemberDropdown(e){const t=e.device_ids||[],s=Object.entries(this._devices).filter(([e])=>!t.includes(e));return 0===s.length?F``:F`
      <select class="small-input" style="padding: 3px 8px;"
        @change=${t=>{t.target.value&&(this._addMember(e,t.target.value),t.target.value="")}}>
        <option value="">Add device...</option>
        ${s.map(([e,t])=>F`
          <option value=${e}>${t.device_name||e}</option>
        `)}
      </select>
    `}_toggleGroup(e){this._expandedGroup=this._expandedGroup===e?null:e}_updateGroupThreshold(e,t,s){const i=this._groups[e];i&&(this._groups={...this._groups,[e]:{...i,thresholds:{...i.thresholds||{},[t]:""===s?null:Number(s)}}})}async _addMember(e,t){const s=[...e.device_ids||[],t];try{await _e(e.id,{device_ids:s}),await this._loadAll()}catch(e){console.error("Failed to add member:",e)}}async _removeMember(e,t){const s=(e.device_ids||[]).filter(e=>e!==t);try{await _e(e.id,{device_ids:s}),await this._loadAll()}catch(e){console.error("Failed to remove member:",e)}}async _saveGroup(e){const t=this._editingGroupName===e.id?this._editGroupName.trim():e.name;try{await _e(e.id,{name:t||e.name,device_ids:e.device_ids||[]}),this._editingGroupName=null,await this._loadAll()}catch(e){console.error("Failed to save group:",e)}}async _createGroup(){const e=this._newGroupName.trim();if(!e)return;const t=e.toLowerCase().replace(/[^a-z0-9]+/g,"_");try{await be(t,e,[]),this._newGroupName="",this._expandedGroup=t,await this._loadAll()}catch(e){console.error("Failed to create group:",e)}}async _deleteGroup(e){const t=(e.device_ids||[]).length;if(!(t>0)||confirm(`Delete group "${e.name}"? It has ${t} member(s).`))try{await async function(e){await fetch(`${he}/api/groups/${e}`,{method:"DELETE"})}(e.id),this._expandedGroup===e.id&&(this._expandedGroup=null),await this._loadAll()}catch(e){console.error("Failed to delete group:",e)}}_renderGlobalDefaults(){const e=(this._settings||{}).default_thresholds||{};return F`
      <div class="section">
        <div class="section-title">Global Defaults</div>

        <div style="font-size: 11px; color: #888; margin-bottom: 10px;">Default Warning Thresholds</div>
        <div class="settings-grid">
          ${[{key:"cpu_usage",label:"CPU %",placeholder:"90"},{key:"memory_usage",label:"Memory %",placeholder:"90"},{key:"disk_usage",label:"Disk %",placeholder:"95"},{key:"cpu_temp",label:"Temp °C",placeholder:"80"}].map(t=>F`
            <div class="settings-field">
              <label>${t.label}</label>
              <input class="settings-input" type="number"
                placeholder=${t.placeholder}
                .value=${null!=e[t.key]?String(e[t.key]):""}
                @input=${e=>this._updateDefaultThreshold(t.key,e.target.value)}>
            </div>
          `)}
        </div>

        <div style="display: flex; align-items: center;">
          <button class="save-btn" ?disabled=${this._savingSettings}
            @click=${this._saveSettings}>
            ${this._savingSettings?"Saving...":"Save Defaults"}
          </button>
          ${this._settingsSaved?F`<span class="saved-msg">Saved!</span>`:""}
        </div>
      </div>
    `}_updateDefaultThreshold(e,t){const s=this._settings||{};this._settings={...s,default_thresholds:{...s.default_thresholds||{},[e]:""===t?null:Number(t)}}}async _saveSettings(){this._savingSettings=!0,this._settingsSaved=!1;try{await async function(e){return(await fetch(`${he}/api/settings`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})).json()}(this._settings),this._settingsSaved=!0,setTimeout(()=>{this._settingsSaved=!1},2e3)}catch(e){console.error("Failed to save settings:",e)}finally{this._savingSettings=!1}}}customElements.define("settings-view",ze);class Le extends le{static properties={currentView:{type:String},selectedDevice:{type:String}};static styles=o`
    :host {
      display: block;
      min-height: 100vh;
      background: #1a1a2e;
    }
  `;constructor(){super(),this.currentView="dashboard",this.selectedDevice=null}connectedCallback(){super.connectedCallback(),ce.connect()}disconnectedCallback(){super.disconnectedCallback(),ce.disconnect()}render(){return F`
      <nav-bar
        .currentView=${this.currentView}
        @view-change=${this._onViewChange}
      ></nav-bar>
      ${this._renderView()}
    `}_renderView(){if(this.selectedDevice)return F`
        <device-detail
          .deviceId=${this.selectedDevice}
          @back=${()=>this.selectedDevice=null}
        ></device-detail>
      `;switch(this.currentView){case"topology":return F`<topology-view @device-select=${this._onDeviceSelect}></topology-view>`;case"settings":return F`<settings-view></settings-view>`;default:return F`<dashboard-view @device-select=${this._onDeviceSelect}></dashboard-view>`}}_onViewChange(e){this.currentView=e.detail.view,this.selectedDevice=null}_onDeviceSelect(e){this.selectedDevice=e.detail.deviceId}}customElements.define("network-monitor-app",Le);
//# sourceMappingURL=bundle.js.map
