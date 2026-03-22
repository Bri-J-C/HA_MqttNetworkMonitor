/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),i=new WeakMap;let o=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const s=this.t;if(e&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=i.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&i.set(s,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1],t[0]);return new o(i,t,s)},a=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:r,defineProperty:l,getOwnPropertyDescriptor:d,getOwnPropertyNames:c,getOwnPropertySymbols:h,getPrototypeOf:p}=Object,u=globalThis,g=u.trustedTypes,f=g?g.emptyScript:"",v=u.reactiveElementPolyfillSupport,m=(t,e)=>t,b={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},$=(t,e)=>!r(t,e),_={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:$};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let y=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=_){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);void 0!==i&&l(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:o}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const n=i?.call(this);o?.call(this,e),this.requestUpdate(t,n,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??_}static _$Ei(){if(this.hasOwnProperty(m("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(m("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(m("properties"))){const t=this.properties,e=[...c(t),...h(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const s=this._$Eu(t,e);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const s=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((s,i)=>{if(e)s.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of i){const i=document.createElement("style"),o=t.litNonce;void 0!==o&&i.setAttribute("nonce",o),i.textContent=e.cssText,s.appendChild(i)}})(s,this.constructor.elementStyles),s}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(void 0!==i&&!0===s.reflect){const o=(void 0!==s.converter?.toAttribute?s.converter:b).toAttribute(e,s.type);this._$Em=t,null==o?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(t,e){const s=this.constructor,i=s._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=s.getPropertyOptions(i),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:b;this._$Em=i;const n=o.fromAttribute(e,t.type);this[i]=n??this._$Ej?.get(i)??n,this._$Em=null}}requestUpdate(t,e,s,i=!1,o){if(void 0!==t){const n=this.constructor;if(!1===i&&(o=this[t]),s??=n.getPropertyOptions(t),!((s.hasChanged??$)(o,e)||s.useDefault&&s.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,s))))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:o},n){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==o||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t){const{wrapped:t}=s,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,s,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[m("elementProperties")]=new Map,y[m("finalized")]=new Map,v?.({ReactiveElement:y}),(u.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x=globalThis,k=t=>t,w=x.trustedTypes,E=w?w.createPolicy("lit-html",{createHTML:t=>t}):void 0,A="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+S,M=`<${C}>`,P=document,N=()=>P.createComment(""),L=t=>null===t||"object"!=typeof t&&"function"!=typeof t,O=Array.isArray,D="[ \t\n\f\r]",z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,T=/>/g,j=RegExp(`>|${D}(?:([^\\s"'>=/]+)(${D}*=${D}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),U=/'/g,H=/"/g,I=/^(?:script|style|textarea|title)$/i,V=t=>(e,...s)=>({_$litType$:t,strings:e,values:s}),B=V(1),q=V(2),F=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),J=new WeakMap,G=P.createTreeWalker(P,129);function Y(t,e){if(!O(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const K=(t,e)=>{const s=t.length-1,i=[];let o,n=2===e?"<svg>":3===e?"<math>":"",a=z;for(let e=0;e<s;e++){const s=t[e];let r,l,d=-1,c=0;for(;c<s.length&&(a.lastIndex=c,l=a.exec(s),null!==l);)c=a.lastIndex,a===z?"!--"===l[1]?a=R:void 0!==l[1]?a=T:void 0!==l[2]?(I.test(l[2])&&(o=RegExp("</"+l[2],"g")),a=j):void 0!==l[3]&&(a=j):a===j?">"===l[0]?(a=o??z,d=-1):void 0===l[1]?d=-2:(d=a.lastIndex-l[2].length,r=l[1],a=void 0===l[3]?j:'"'===l[3]?H:U):a===H||a===U?a=j:a===R||a===T?a=z:(a=j,o=void 0);const h=a===j&&t[e+1].startsWith("/>")?" ":"";n+=a===z?s+M:d>=0?(i.push(r),s.slice(0,d)+A+s.slice(d)+S+h):s+S+(-2===d?e:h)}return[Y(t,n+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class X{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let o=0,n=0;const a=t.length-1,r=this.parts,[l,d]=K(t,e);if(this.el=X.createElement(l,s),G.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=G.nextNode())&&r.length<a;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(A)){const e=d[n++],s=i.getAttribute(t).split(S),a=/([.?@])?(.*)/.exec(e);r.push({type:1,index:o,name:a[2],strings:s,ctor:"."===a[1]?st:"?"===a[1]?it:"@"===a[1]?ot:et}),i.removeAttribute(t)}else t.startsWith(S)&&(r.push({type:6,index:o}),i.removeAttribute(t));if(I.test(i.tagName)){const t=i.textContent.split(S),e=t.length-1;if(e>0){i.textContent=w?w.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],N()),G.nextNode(),r.push({type:2,index:++o});i.append(t[e],N())}}}else if(8===i.nodeType)if(i.data===C)r.push({type:2,index:o});else{let t=-1;for(;-1!==(t=i.data.indexOf(S,t+1));)r.push({type:7,index:o}),t+=S.length-1}o++}}static createElement(t,e){const s=P.createElement("template");return s.innerHTML=t,s}}function Z(t,e,s=t,i){if(e===F)return e;let o=void 0!==i?s._$Co?.[i]:s._$Cl;const n=L(e)?void 0:e._$litDirective$;return o?.constructor!==n&&(o?._$AO?.(!1),void 0===n?o=void 0:(o=new n(t),o._$AT(t,s,i)),void 0!==i?(s._$Co??=[])[i]=o:s._$Cl=o),void 0!==o&&(e=Z(t,o._$AS(t,e.values),o,i)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??P).importNode(e,!0);G.currentNode=i;let o=G.nextNode(),n=0,a=0,r=s[0];for(;void 0!==r;){if(n===r.index){let e;2===r.type?e=new tt(o,o.nextSibling,this,t):1===r.type?e=new r.ctor(o,r.name,r.strings,this,t):6===r.type&&(e=new nt(o,this,t)),this._$AV.push(e),r=s[++a]}n!==r?.index&&(o=G.nextNode(),n++)}return G.currentNode=P,i}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class tt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),L(t)?t===W||null==t||""===t?(this._$AH!==W&&this._$AR(),this._$AH=W):t!==this._$AH&&t!==F&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>O(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==W&&L(this._$AH)?this._$AA.nextSibling.data=t:this.T(P.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,i="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=X.createElement(Y(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new Q(i,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=J.get(t.strings);return void 0===e&&J.set(t.strings,e=new X(t)),e}k(t){O(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const o of t)i===e.length?e.push(s=new tt(this.O(N()),this.O(N()),this,this.options)):s=e[i],s._$AI(o),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=k(t).nextSibling;k(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class et{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,o){this.type=1,this._$AH=W,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=W}_$AI(t,e=this,s,i){const o=this.strings;let n=!1;if(void 0===o)t=Z(this,t,e,0),n=!L(t)||t!==this._$AH&&t!==F,n&&(this._$AH=t);else{const i=t;let a,r;for(t=o[0],a=0;a<o.length-1;a++)r=Z(this,i[s+a],e,a),r===F&&(r=this._$AH[a]),n||=!L(r)||r!==this._$AH[a],r===W?t=W:t!==W&&(t+=(r??"")+o[a+1]),this._$AH[a]=r}n&&!i&&this.j(t)}j(t){t===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class st extends et{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===W?void 0:t}}class it extends et{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==W)}}class ot extends et{constructor(t,e,s,i,o){super(t,e,s,i,o),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??W)===F)return;const s=this._$AH,i=t===W&&s!==W||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==W&&(s===W||i);i&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class nt{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}}const at=x.litHtmlPolyfillSupport;at?.(X,tt),(x.litHtmlVersions??=[]).push("3.3.2");const rt=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class lt extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const i=s?.renderBefore??e;let o=i._$litPart$;if(void 0===o){const t=s?.renderBefore??null;i._$litPart$=o=new tt(e.insertBefore(N(),t),t,void 0,s??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return F}}lt._$litElement$=!0,lt.finalized=!0,rt.litElementHydrateSupport?.({LitElement:lt});const dt=rt.litElementPolyfillSupport;dt?.({LitElement:lt}),(rt.litElementVersions??=[]).push("4.2.2");const ct=new class{constructor(){this._ws=null,this._listeners=[],this._reconnectDelay=1e3}connect(){const t="https:"===location.protocol?"wss:":"ws:",e=location.pathname.match(/^(\/api\/hassio_ingress\/[^/]+)/),s=e?e[1]:"",i=`${t}//${location.host}${s}/api/ws`;this._ws=new WebSocket(i),this._ws.onmessage=t=>{try{const e=JSON.parse(t.data);this._listeners.forEach(t=>t(e))}catch(t){console.error("WebSocket parse error:",t)}},this._ws.onclose=()=>{setTimeout(()=>this.connect(),this._reconnectDelay),this._reconnectDelay=Math.min(2*this._reconnectDelay,3e4)},this._ws.onopen=()=>{this._reconnectDelay=1e3}}onMessage(t){this._listeners.push(t)}disconnect(){this._ws&&this._ws.close()}};class ht extends lt{static properties={currentView:{type:String}};static styles=n`
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
  `;render(){return B`
      <nav>
        <span class="logo">Network Monitor</span>
        <div class="nav-links">
          <button
            class=${"dashboard"===this.currentView?"active":""}
            @click=${()=>this._navigate("dashboard")}
          >Dashboard</button>
          <button
            class=${"topology"===this.currentView?"active":""}
            @click=${()=>this._navigate("topology")}
          >Topology</button>
        </div>
      </nav>
    `}_navigate(t){this.dispatchEvent(new CustomEvent("view-change",{detail:{view:t}}))}}customElements.define("nav-bar",ht);const pt=function(){const t=location.pathname.match(/^(\/api\/hassio_ingress\/[^/]+)/);return t?t[1]:""}();async function ut(t){return(await fetch(`${pt}/api/devices/${t}`)).json()}async function gt(t,e,s={}){return(await fetch(`${pt}/api/devices/${t}/command`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({command:e,params:s})})).json()}const ft={online:"#81c784",offline:"#ef5350",warning:"#ffb74d",inferred:"#4fc3f7",unknown:"#666"};class vt extends lt{static properties={topology:{type:Object},layouts:{type:Object},selectedLayout:{type:String},editMode:{type:Boolean},linkMode:{type:Boolean},selectedNode:{type:String},nodePositions:{type:Object},manualEdges:{type:Array},_dragging:{type:String,state:!0},_linkSource:{type:String,state:!0},_error:{type:String,state:!0},_loading:{type:Boolean,state:!0},_selectedEdge:{type:Number,state:!0},_selectedDeviceData:{type:Object,state:!0},_commandResult:{type:String,state:!0}};static styles=n`
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
  `;constructor(){super(),this.topology={nodes:[],edges:[]},this.layouts={},this.selectedLayout="",this.editMode=!1,this.linkMode=!1,this.selectedNode=null,this.nodePositions={},this.manualEdges=[],this._dragging=null,this._dragOffset={x:0,y:0},this._linkSource=null,this._error="",this._loading=!0,this._selectedEdge=-1,this._selectedDeviceData=null,this._commandResult=""}connectedCallback(){super.connectedCallback(),this._loadTopology(),this._loadLayouts(),ct.onMessage(t=>{this._loadTopology(),"device_update"===t.type&&t.device_id===this.selectedNode&&t.device&&(this._selectedDeviceData=t.device)})}async _loadTopology(){try{this._loading=!0,this._error="";const t=await async function(){return(await fetch(`${pt}/api/topology`)).json()}();this.topology=t,this._autoLayout(),this._loading=!1}catch(t){console.error("Failed to load topology:",t),this._error=`Failed to load: ${t.message}`,this._loading=!1}}async _loadLayouts(){try{this.layouts=await async function(){return(await fetch(`${pt}/api/topology/layouts`)).json()}()}catch(t){console.error("Failed to load layouts:",t)}}_autoLayout(){const t=this.topology.nodes;if(!t.length)return;const e={...this.selectedLayout&&this.layouts[this.selectedLayout]&&this.layouts[this.selectedLayout].positions||{}},s=Math.ceil(Math.sqrt(t.length));t.forEach((t,i)=>{if(!e[t.id]){const o=i%s,n=Math.floor(i/s);e[t.id]={x:100+o*(800/(s+1)),y:80+100*n}}}),this.nodePositions=e,this.selectedLayout&&this.layouts[this.selectedLayout]&&(this.manualEdges=this.layouts[this.selectedLayout].manualEdges||[])}get _allEdges(){const t=this.topology.edges||[],e=this.manualEdges.map(t=>({...t,type:"manual"}));return[...t,...e]}_getNodeName(t){const e=this.topology.nodes.find(e=>e.id===t);return e&&e.name||t}render(){if(this._loading&&!this.topology.nodes.length)return B`<div style="padding: 40px; text-align: center; color: #888;">Loading topology...</div>`;if(this._error)return B`<div style="padding: 40px; text-align: center; color: #ef5350;">${this._error}</div>`;const t=this.topology.nodes,e=this._allEdges,s=t.filter(t=>"online"===t.status).length,i=t.filter(t=>"offline"===t.status).length,o=t.filter(t=>"warning"===t.status).length;return B`
      <div class="toolbar">
        <div class="toolbar-left">
          <select @change=${this._onLayoutChange}>
            <option value="">Auto Layout</option>
            ${Object.entries(this.layouts).map(([t,e])=>B`
              <option value=${t} ?selected=${this.selectedLayout===t}>${e.name}</option>
            `)}
          </select>
          <button class="tool-btn ${this.editMode?"active":""}"
            @click=${this._toggleEditMode}>
            ${this.editMode?"Done Editing":"Edit Mode"}
          </button>
          ${this.editMode?B`
            <span class="separator">|</span>
            <button class="tool-btn link-mode ${this.linkMode?"active":""}"
              @click=${this._toggleLinkMode}>
              ${this.linkMode?"Cancel Link":"Add Link"}
            </button>
            <button class="tool-btn" @click=${this._saveCurrentLayout}>Save Layout</button>
          `:""}
          <button class="tool-btn" @click=${()=>{this.nodePositions={},this._autoLayout()}}>
            Auto Layout
          </button>
        </div>
        <div class="toolbar-right">
          <span class="status-dot" style="color: #81c784">${s} online</span>
          <span class="status-dot" style="color: #ef5350">${i} offline</span>
          <span class="status-dot" style="color: #ffb74d">${o} warning</span>
        </div>
      </div>

      ${this.linkMode?B`
        <div class="link-hint">
          ${this._linkSource?`Click a second device to link it to "${this._getNodeName(this._linkSource)}"`:"Click a device to start a link"}
        </div>
      `:""}

      <div class="canvas-container">
        <svg viewBox="0 0 900 500"
          @mousemove=${this._onMouseMove}
          @mouseup=${this._onMouseUp}
          @mouseleave=${this._onMouseUp}>
          ${e.map((t,e)=>this._renderEdge(t,e))}
          ${this._renderLinkPreview()}
          ${t.map(t=>this._renderNode(t))}
        </svg>
      </div>

      ${this.selectedNode&&!this.linkMode?this._renderDetailPanel():""}
      ${this.editMode&&this.manualEdges.length>0?this._renderManualEdgesList():""}
    `}_renderNode(t){const e=this.nodePositions[t.id]||{x:100,y:100},s=ft[t.status]||ft.unknown,i=this.selectedNode===t.id,o=this._linkSource===t.id,n=i||o?2.5:1.5,a=i?"4,2":o?"2,2":"none",r=o?"#ffb74d":s;return"gateway"===t.type?q`
        <g transform="translate(${e.x}, ${e.y})"
          @click=${e=>this._onNodeClick(e,t.id)}
          @mousedown=${e=>this.editMode&&!this.linkMode&&this._onMouseDown(e,t.id)}
          style="cursor:pointer">
          <circle r="22" fill="${r}22" stroke="${r}" stroke-width="${n}"
            stroke-dasharray="${a}"/>
          <text text-anchor="middle" dy="4" fill="${r}" font-size="10">${t.name.substring(0,12)}</text>
        </g>
      `:q`
      <g transform="translate(${e.x}, ${e.y})"
        @click=${e=>this._onNodeClick(e,t.id)}
        @mousedown=${e=>this.editMode&&!this.linkMode&&this._onMouseDown(e,t.id)}
        style="cursor:pointer">
        <rect x="-45" y="-18" width="90" height="36" rx="6"
          fill="#2a2a4a" stroke="${r}" stroke-width="${n}"
          stroke-dasharray="${a}"/>
        <text text-anchor="middle" dy="-3" fill="${r}" font-size="10">
          ${(t.name||t.id).substring(0,12)}
        </text>
        <text text-anchor="middle" dy="10" fill="#666" font-size="8">${t.status}</text>
      </g>
    `}_renderEdge(t,e){const s=this.nodePositions[t.source],i=this.nodePositions[t.target];if(!s||!i)return q``;const o="manual"===t.type,n=o?"#4fc3f7":"#555",a=o&&this._selectedEdge===e-(this.topology.edges?.length||0)?2.5:1.5,r=o?"none":"4,2",l=(s.x+i.x)/2,d=(s.y+i.y)/2;return q`
      <line x1="${s.x}" y1="${s.y}" x2="${i.x}" y2="${i.y}"
        stroke="${n}" stroke-width="${a}"
        stroke-dasharray="${r}"
        @click=${o&&this.editMode?()=>this._selectEdge(e-(this.topology.edges?.length||0)):null}
        style="${o&&this.editMode?"cursor:pointer":""}"/>
      ${t.label?q`
        <text x="${l}" y="${d-6}" text-anchor="middle"
          fill="#888" font-size="9">${t.label}</text>
      `:q``}
    `}_renderLinkPreview(){if(!this._linkSource||!this._mousePos)return q``;const t=this.nodePositions[this._linkSource];return t?q`
      <line x1="${t.x}" y1="${t.y}" x2="${this._mousePos.x}" y2="${this._mousePos.y}"
        stroke="#ffb74d" stroke-width="1.5" stroke-dasharray="6,3" opacity="0.6"/>
    `:q``}_renderDetailPanel(){const t=this.topology.nodes.find(t=>t.id===this.selectedNode);if(!t)return B``;const e=this._selectedDeviceData,s=ft[t.status]||ft.unknown;if(!e)return B`
        <div class="device-panel">
          <div style="color: #888; font-size: 13px;">Loading device data...</div>
        </div>
      `;const i=Object.entries(e.attributes||{}),o=e.network||{},n=e.tags||[],a=e.server_tags||[],r={cpu_usage:90,memory_usage:90,disk_usage:95,cpu_temp:80};return B`
      <div class="device-panel">
        <div class="device-header">
          <div>
            <span class="device-title" style="color: ${s}">
              ${e.device_name||this.selectedNode}
            </span>
            <span class="device-type">${e.device_type||t.type}</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="device-status-badge" style="background: ${s}20; color: ${s}">
              ${e.status||t.status}
            </span>
            <button class="close-btn" @click=${()=>{this.selectedNode=null,this._selectedDeviceData=null}}>&times;</button>
          </div>
        </div>

        ${n.length>0||a.length>0?B`
          <div style="margin-bottom: 12px;">
            <div class="tags-row">
              ${n.map(t=>B`<span class="tag-badge">${t}</span>`)}
              ${a.map(t=>B`<span class="tag-badge server">${t}</span>`)}
            </div>
          </div>
        `:""}

        ${i.length>0?B`
          <div class="device-section">
            <div class="device-section-title">Attributes</div>
            <div class="attr-grid">
              ${i.map(([t,e])=>{const s=r[t],i=s&&"number"==typeof e.value&&e.value>s;return B`
                  <div class="attr-item">
                    <div class="attr-label">${t.replace(/_/g," ")}</div>
                    <div class="attr-val ${i?"warning":""}">
                      ${null!=e.value?e.value:"—"}
                      <span class="attr-unit">${e.unit||""}</span>
                    </div>
                  </div>
                `})}
            </div>
          </div>
        `:""}

        ${Object.keys(o).length>0?B`
          <div class="device-section">
            <div class="device-section-title">Network</div>
            <div class="network-grid">
              ${Object.entries(o).map(([t,e])=>B`
                <div class="net-item">
                  <span class="net-label">${t}: </span>${e}
                </div>
              `)}
            </div>
          </div>
        `:""}

        <div class="device-section">
          <div class="device-section-title">Commands</div>
          <div class="commands-row">
            <button class="cmd-btn" @click=${()=>this._sendCmd("reboot")}>Reboot</button>
            <button class="cmd-btn danger" @click=${()=>this._sendCmd("shutdown")}>Shutdown</button>
          </div>
          ${this._commandResult?B`<div class="cmd-result">${this._commandResult}</div>`:""}
        </div>
      </div>
    `}_renderManualEdgesList(){return B`
      <div class="edge-panel">
        <div class="edge-panel-header">
          <span style="font-size: 13px; color: #ccc; font-weight: 600;">Manual Links</span>
        </div>
        <div class="edge-list">
          ${this.manualEdges.map((t,e)=>B`
            <div class="edge-item">
              <span>
                ${this._getNodeName(t.source)}
                <span style="color: #4fc3f7;"> &#8594; </span>
                ${this._getNodeName(t.target)}
                ${t.label?B`<span style="color: #888;"> (${t.label})</span>`:""}
              </span>
              <span style="display: flex; gap: 4px;">
                <button class="tool-btn" @click=${()=>this._labelEdge(e)}>Label</button>
                <button class="tool-btn danger" @click=${()=>this._removeEdge(e)}>Remove</button>
              </span>
            </div>
          `)}
        </div>
      </div>
    `}_onNodeClick(t,e){t.stopPropagation(),this.linkMode?this._handleLinkClick(e):this._selectNode(e)}_handleLinkClick(t){if(this._linkSource)if(this._linkSource===t)this._linkSource=null;else{const e=this.manualEdges.some(e=>e.source===this._linkSource&&e.target===t||e.source===t&&e.target===this._linkSource);e||(this.manualEdges=[...this.manualEdges,{source:this._linkSource,target:t,label:""}]),this._linkSource=null}else this._linkSource=t}_toggleEditMode(){this.editMode=!this.editMode,this.editMode||(this.linkMode=!1,this._linkSource=null,this._selectedEdge=-1)}_toggleLinkMode(){this.linkMode=!this.linkMode,this._linkSource=null,this.linkMode&&(this.selectedNode=null)}async _selectNode(t){if(this.selectedNode===t)return this.selectedNode=null,this._selectedDeviceData=null,void(this._commandResult="");this.selectedNode=t,this._selectedDeviceData=null,this._commandResult="";try{this._selectedDeviceData=await ut(t)}catch(t){this._selectedDeviceData={status:"inferred",attributes:{},tags:[]}}}async _sendCmd(t){if(this.selectedNode)try{this._commandResult=`Sending ${t}...`;const e=await gt(this.selectedNode,t);this._commandResult=`Sent (request: ${e.request_id})`}catch(t){this._commandResult=`Error: ${t.message}`}}_selectEdge(t){this._selectedEdge=this._selectedEdge===t?-1:t}_labelEdge(t){const e=this.manualEdges[t]?.label||"",s=prompt('Link label (e.g., "1Gbps", "WiFi", "VLAN 10"):',e);if(null===s)return;const i=[...this.manualEdges];i[t]={...i[t],label:s},this.manualEdges=i}_removeEdge(t){this.manualEdges=this.manualEdges.filter((e,s)=>s!==t),this._selectedEdge=-1}_onMouseDown(t,e){this._dragging=e;const s=this.shadowRoot.querySelector("svg"),i=s.createSVGPoint();i.x=t.clientX,i.y=t.clientY;const o=i.matrixTransform(s.getScreenCTM().inverse()),n=this.nodePositions[e]||{x:0,y:0};this._dragOffset={x:o.x-n.x,y:o.y-n.y},t.preventDefault()}_onMouseMove(t){const e=this.shadowRoot.querySelector("svg"),s=e.createSVGPoint();s.x=t.clientX,s.y=t.clientY;const i=s.matrixTransform(e.getScreenCTM().inverse());this.linkMode&&this._linkSource&&(this._mousePos={x:i.x,y:i.y},this.requestUpdate()),this._dragging&&(this.nodePositions={...this.nodePositions,[this._dragging]:{x:i.x-this._dragOffset.x,y:i.y-this._dragOffset.y}})}_onMouseUp(){this._dragging=null}_onLayoutChange(t){this.selectedLayout=t.target.value,this.selectedLayout&&this.layouts[this.selectedLayout]?(this.nodePositions=this.layouts[this.selectedLayout].positions||{},this.manualEdges=this.layouts[this.selectedLayout].manualEdges||[]):(this.nodePositions={},this.manualEdges=[],this._autoLayout())}async _saveCurrentLayout(){const t=this.selectedLayout&&this.layouts[this.selectedLayout]?this.layouts[this.selectedLayout].name:"",e=prompt("Layout name:",t);if(!e)return;const s=await async function(t){return(await fetch(`${pt}/api/topology/layouts`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})).json()}({id:this.selectedLayout||void 0,name:e,positions:this.nodePositions,manualEdges:this.manualEdges});this.selectedLayout=s.id,await this._loadLayouts()}}customElements.define("topology-view",vt);const mt={online:"#81c784",offline:"#ef5350",warning:"#ffb74d",unknown:"#666"};class bt extends lt{static properties={device:{type:Object},deviceId:{type:String}};static styles=n`
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
  `;render(){if(!this.device)return B``;const t=this.device,e=mt[t.status]||mt.unknown,s=Object.entries(t.attributes||{}).slice(0,4),i=[...t.tags||[],...t.server_tags||[]];return this.style.setProperty("--status-color",e),B`
      <div class="header">
        <span class="name">${t.device_name||this.deviceId}</span>
        <span class="status" style="background: ${e}20; color: ${e}">
          ${"online"===t.status||"offline"===t.status?"● ":"⚠ "}${t.status}
        </span>
      </div>
      <div class="type">${t.device_type||"unknown"}</div>
      ${s.length>0?B`
        <div class="attrs">
          ${s.map(([t,e])=>B`
            <div class="attr">
              ${t.replace(/_/g," ")}: <span class="attr-value ${this._isWarning(t,e)?"warning":""}">${e.value}${e.unit}</span>
            </div>
          `)}
        </div>
      `:""}
      ${i.length>0?B`
        <div class="tags">
          ${i.map(t=>B`<span class="tag">${t}</span>`)}
        </div>
      `:""}
    `}_isWarning(t,e){const s={cpu_usage:90,memory_usage:90,disk_usage:95,cpu_temp:80};return s[t]&&e.value>s[t]}}customElements.define("device-card",bt);class $t extends lt{static properties={devices:{type:Object},filter:{type:String},tagFilter:{type:String}};static styles=n`
    :host { display: block; padding: 20px; max-width: 1400px; margin: 0 auto; }
    .filters {
      display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap;
      align-items: center;
    }
    .filter-btn {
      background: #2a2a4a; border: none; color: #aaa; padding: 6px 14px;
      border-radius: 16px; cursor: pointer; font-size: 13px; transition: all 0.2s;
    }
    .filter-btn:hover { background: #3a3a5a; color: #ccc; }
    .filter-btn.active { background: #4fc3f7; color: #1a1a2e; }
    .filter-btn.tag { background: #1e3a5f; color: #4fc3f7; }
    .filter-btn.tag.active { background: #4fc3f7; color: #1a1a2e; }
    .separator { color: #444; margin: 0 4px; }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 12px;
    }
    .empty {
      text-align: center; padding: 60px; color: #666;
    }
  `;constructor(){super(),this.devices={},this.filter="all",this.tagFilter=""}connectedCallback(){super.connectedCallback(),this._loadDevices(),ct.onMessage(t=>{"device_update"===t.type&&(this.devices={...this.devices,[t.device_id]:t.device},this.requestUpdate())})}async _loadDevices(){try{this.devices=await async function(){return(await fetch(`${pt}/api/devices`)).json()}()}catch(t){console.error("Failed to load devices:",t)}}get _filteredDevices(){let t=Object.entries(this.devices);return"all"!==this.filter&&(t=t.filter(([,t])=>t.status===this.filter)),this.tagFilter&&(t=t.filter(([,t])=>[...t.tags||[],...t.server_tags||[]].includes(this.tagFilter))),t}get _allTags(){const t=new Set;return Object.values(this.devices).forEach(e=>{(e.tags||[]).forEach(e=>t.add(e)),(e.server_tags||[]).forEach(e=>t.add(e))}),[...t].sort()}get _counts(){const t=Object.values(this.devices);return{all:t.length,online:t.filter(t=>"online"===t.status).length,offline:t.filter(t=>"offline"===t.status).length,warning:t.filter(t=>"warning"===t.status).length}}render(){const t=this._filteredDevices,e=this._counts,s=this._allTags;return B`
      <div class="filters">
        <button class="filter-btn ${"all"===this.filter?"active":""}"
          @click=${()=>this.filter="all"}>All (${e.all})</button>
        <button class="filter-btn ${"online"===this.filter?"active":""}"
          @click=${()=>this.filter="online"}>Online (${e.online})</button>
        <button class="filter-btn ${"offline"===this.filter?"active":""}"
          @click=${()=>this.filter="offline"}>Offline (${e.offline})</button>
        <button class="filter-btn ${"warning"===this.filter?"active":""}"
          @click=${()=>this.filter="warning"}>Warning (${e.warning})</button>
        ${s.length>0?B`
          <span class="separator">|</span>
          ${s.map(t=>B`
            <button class="filter-btn tag ${this.tagFilter===t?"active":""}"
              @click=${()=>this.tagFilter=this.tagFilter===t?"":t}>#${t}</button>
          `)}
        `:""}
      </div>
      ${0===t.length?B`<div class="empty">No devices found</div>`:B`
          <div class="grid">
            ${t.map(([t,e])=>B`
              <device-card
                .device=${e}
                .deviceId=${t}
                @click=${()=>this._selectDevice(t)}
              ></device-card>
            `)}
          </div>
        `}
    `}_selectDevice(t){this.dispatchEvent(new CustomEvent("device-select",{detail:{deviceId:t},bubbles:!0,composed:!0}))}}customElements.define("dashboard-view",$t);class _t extends lt{static properties={deviceId:{type:String},device:{type:Object},commandResult:{type:String}};static styles=n`
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
    .title { font-size: 24px; font-weight: 700; }
    .status-badge {
      padding: 4px 12px; border-radius: 12px; font-size: 13px;
    }
    .section {
      background: #2a2a4a; border-radius: 8px; padding: 16px;
      margin-bottom: 16px;
    }
    .section-title {
      font-size: 12px; color: #666; text-transform: uppercase;
      letter-spacing: 1px; margin-bottom: 12px;
    }
    .attr-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 12px;
    }
    .attr-item {
      background: #1a1a2e; border-radius: 6px; padding: 12px; text-align: center;
    }
    .attr-label { font-size: 10px; color: #666; text-transform: uppercase; }
    .attr-val { font-size: 20px; font-weight: 700; color: #4fc3f7; margin-top: 4px; }
    .attr-unit { font-size: 12px; color: #888; }
    .network-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 8px;
    }
    .net-item { font-size: 13px; color: #aaa; }
    .net-label { color: #666; margin-right: 8px; }
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
    .tags { display: flex; gap: 6px; flex-wrap: wrap; }
    .tag {
      font-size: 11px; padding: 3px 10px; border-radius: 4px;
      background: #1e3a5f; color: #4fc3f7;
    }
    .tag.server { background: #3a1e5f; color: #ce93d8; }
  `;constructor(){super(),this.device=null,this.commandResult=""}connectedCallback(){super.connectedCallback(),this._loadDevice(),ct.onMessage(t=>{"device_update"===t.type&&t.device_id===this.deviceId&&(this.device=t.device)})}async _loadDevice(){try{this.device=await ut(this.deviceId)}catch(t){console.error("Failed to load device:",t)}}render(){if(!this.device)return B`<div>Loading...</div>`;const t=this.device,e="online"===t.status?"#81c784":"offline"===t.status?"#ef5350":"#ffb74d",s=Object.entries(t.attributes||{}),i=t.network||{},o=t.tags||[],n=t.server_tags||[];return B`
      <button class="back" @click=${()=>this.dispatchEvent(new CustomEvent("back"))}>
        ← Back
      </button>
      <div class="header">
        <span class="title">${t.device_name||this.deviceId}</span>
        <span class="status-badge" style="background: ${e}20; color: ${e}">
          ${t.status}
        </span>
      </div>

      ${o.length>0||n.length>0?B`
        <div class="section">
          <div class="section-title">Tags</div>
          <div class="tags">
            ${o.map(t=>B`<span class="tag">${t}</span>`)}
            ${n.map(t=>B`<span class="tag server">${t}</span>`)}
          </div>
        </div>
      `:""}

      ${s.length>0?B`
        <div class="section">
          <div class="section-title">Attributes</div>
          <div class="attr-grid">
            ${s.map(([t,e])=>B`
              <div class="attr-item">
                <div class="attr-label">${t.replace(/_/g," ")}</div>
                <div class="attr-val">
                  ${null!=e.value?e.value:"—"}
                  <span class="attr-unit">${e.unit}</span>
                </div>
              </div>
            `)}
          </div>
        </div>
      `:""}

      ${Object.keys(i).length>0?B`
        <div class="section">
          <div class="section-title">Network</div>
          <div class="network-grid">
            ${Object.entries(i).map(([t,e])=>B`
              <div class="net-item">
                <span class="net-label">${t}:</span>${e}
              </div>
            `)}
          </div>
        </div>
      `:""}

      <div class="section">
        <div class="section-title">Commands</div>
        <div class="commands">
          <button class="cmd-btn" @click=${()=>this._sendCmd("reboot")}>Reboot</button>
          <button class="cmd-btn danger" @click=${()=>this._sendCmd("shutdown")}>Shutdown</button>
          <button class="cmd-btn" @click=${()=>this._sendCmd("restart_service",{service:"default"})}>Restart Service</button>
        </div>
        ${this.commandResult?B`<div class="cmd-result">${this.commandResult}</div>`:""}
      </div>
    `}async _sendCmd(t,e={}){try{this.commandResult=`Sending ${t}...`;const s=await gt(this.deviceId,t,e);this.commandResult=`Command sent (request: ${s.request_id})`}catch(t){this.commandResult=`Error: ${t.message}`}}}customElements.define("device-detail",_t);class yt extends lt{static properties={currentView:{type:String},selectedDevice:{type:String}};static styles=n`
    :host {
      display: block;
      min-height: 100vh;
      background: #1a1a2e;
    }
  `;constructor(){super(),this.currentView="dashboard",this.selectedDevice=null}connectedCallback(){super.connectedCallback(),ct.connect()}disconnectedCallback(){super.disconnectedCallback(),ct.disconnect()}render(){return B`
      <nav-bar
        .currentView=${this.currentView}
        @view-change=${this._onViewChange}
      ></nav-bar>
      ${this._renderView()}
    `}_renderView(){return this.selectedDevice?B`
        <device-detail
          .deviceId=${this.selectedDevice}
          @back=${()=>this.selectedDevice=null}
        ></device-detail>
      `:"topology"===this.currentView?B`<topology-view @device-select=${this._onDeviceSelect}></topology-view>`:B`<dashboard-view @device-select=${this._onDeviceSelect}></dashboard-view>`}_onViewChange(t){this.currentView=t.detail.view,this.selectedDevice=null}_onDeviceSelect(t){this.selectedDevice=t.detail.deviceId}}customElements.define("network-monitor-app",yt);
//# sourceMappingURL=bundle.js.map
