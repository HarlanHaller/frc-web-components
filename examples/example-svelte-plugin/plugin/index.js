(function(l,f){typeof exports=="object"&&typeof module<"u"?f(require("@frc-web-components/app")):typeof define=="function"&&define.amd?define(["@frc-web-components/app"],f):(l=typeof globalThis<"u"?globalThis:l||self,f(l.fwcApp))})(this,function(l){"use strict";var _t=Object.defineProperty;var mt=(l,f,a)=>f in l?_t(l,f,{enumerable:!0,configurable:!0,writable:!0,value:a}):l[f]=a;var d=(l,f,a)=>(mt(l,typeof f!="symbol"?f+"":f,a),a);function f(){}function a(e){return e()}function S(){return Object.create(null)}function g(e){e.forEach(a)}function P(e){return typeof e=="function"}function J(e,t){return e!=e?t==t:e!==t||e&&typeof e=="object"||typeof e=="function"}let y;function U(e,t){return e===t?!0:(y||(y=document.createElement("a")),y.href=t,e===y.href)}function V(e){return Object.keys(e).length===0}function w(e,t){e.appendChild(t)}function G(e,t,n){const r=z(e);if(!r.getElementById(t)){const i=x("style");i.id=t,i.textContent=n,F(r,i)}}function z(e){if(!e)return document;const t=e.getRootNode?e.getRootNode():e.ownerDocument;return t&&t.host?t:e.ownerDocument}function F(e,t){return w(e.head||e,t),t.sheet}function q(e,t,n){e.insertBefore(t,n||null)}function N(e){e.parentNode&&e.parentNode.removeChild(e)}function x(e){return document.createElement(e)}function B(e){return document.createTextNode(e)}function K(e,t,n,r){return e.addEventListener(t,n,r),()=>e.removeEventListener(t,n,r)}function E(e,t,n){n==null?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function Q(e){return Array.from(e.childNodes)}function W(e,t){t=""+t,e.data!==t&&(e.data=t)}function X(e){const t={};return e.childNodes.forEach(n=>{t[n.slot||"default"]=!0}),t}let O;function b(e){O=e}const _=[],M=[];let m=[];const T=[],Y=Promise.resolve();let A=!1;function Z(){A||(A=!0,Y.then(L))}function v(e){m.push(e)}const C=new Set;let p=0;function L(){if(p!==0)return;const e=O;do{try{for(;p<_.length;){const t=_[p];p++,b(t),tt(t.$$)}}catch(t){throw _.length=0,p=0,t}for(b(null),_.length=0,p=0;M.length;)M.pop()();for(let t=0;t<m.length;t+=1){const n=m[t];C.has(n)||(C.add(n),n())}m.length=0}while(_.length);for(;T.length;)T.pop()();A=!1,C.clear(),b(e)}function tt(e){if(e.fragment!==null){e.update(),g(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(v)}}function et(e){const t=[],n=[];m.forEach(r=>e.indexOf(r)===-1?t.push(r):n.push(r)),n.forEach(r=>r()),m=t}const nt=new Set;function st(e,t){e&&e.i&&(nt.delete(e),e.i(t))}function rt(e,t,n){const{fragment:r,after_update:i}=e.$$;r&&r.m(t,n),v(()=>{const s=e.$$.on_mount.map(a).filter(P);e.$$.on_destroy?e.$$.on_destroy.push(...s):g(s),e.$$.on_mount=[]}),i.forEach(v)}function it(e,t){const n=e.$$;n.fragment!==null&&(et(n.after_update),g(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function ot(e,t){e.$$.dirty[0]===-1&&(_.push(e),Z(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function ct(e,t,n,r,i,s,o=null,u=[-1]){const $=O;b(e);const c=e.$$={fragment:null,ctx:[],props:s,update:f,not_equal:i,bound:S(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||($?$.$$.context:[])),callbacks:S(),dirty:u,skip_bound:!1,root:t.target||$.$$.root};o&&o(c.root);let j=!1;if(c.ctx=n?n(e,t.props||{},(h,I,...D)=>{const H=D.length?D[0]:I;return c.ctx&&i(c.ctx[h],c.ctx[h]=H)&&(!c.skip_bound&&c.bound[h]&&c.bound[h](H),j&&ot(e,h)),I}):[],c.update(),j=!0,g(c.before_update),c.fragment=r?r(c.ctx):!1,t.target){if(t.hydrate){const h=Q(t.target);c.fragment&&c.fragment.l(h),h.forEach(N)}else c.fragment&&c.fragment.c();t.intro&&st(e.$$.fragment),rt(e,t.target,t.anchor),L()}b($)}let R;typeof HTMLElement=="function"&&(R=class extends HTMLElement{constructor(t,n,r){super();d(this,"$$ctor");d(this,"$$s");d(this,"$$c");d(this,"$$cn",!1);d(this,"$$d",{});d(this,"$$r",!1);d(this,"$$p_d",{});d(this,"$$l",{});d(this,"$$l_u",new Map);this.$$ctor=t,this.$$s=n,r&&this.attachShadow({mode:"open"})}addEventListener(t,n,r){if(this.$$l[t]=this.$$l[t]||[],this.$$l[t].push(n),this.$$c){const i=this.$$c.$on(t,n);this.$$l_u.set(n,i)}super.addEventListener(t,n,r)}removeEventListener(t,n,r){if(super.removeEventListener(t,n,r),this.$$c){const i=this.$$l_u.get(n);i&&(i(),this.$$l_u.delete(n))}}async connectedCallback(){if(this.$$cn=!0,!this.$$c){let t=function(s){return()=>{let o;return{c:function(){o=x("slot"),s!=="default"&&E(o,"name",s)},m:function(c,j){q(c,o,j)},d:function(c){c&&N(o)}}}};if(await Promise.resolve(),!this.$$cn)return;const n={},r=X(this);for(const s of this.$$s)s in r&&(n[s]=[t(s)]);for(const s of this.attributes){const o=this.$$g_p(s.name);o in this.$$d||(this.$$d[o]=k(o,s.value,this.$$p_d,"toProp"))}for(const s in this.$$p_d)!(s in this.$$d)&&this[s]!==void 0&&(this.$$d[s]=this[s],delete this[s]);this.$$c=new this.$$ctor({target:this.shadowRoot||this,props:{...this.$$d,$$slots:n,$$scope:{ctx:[]}}});const i=()=>{this.$$r=!0;for(const s in this.$$p_d)if(this.$$d[s]=this.$$c.$$.ctx[this.$$c.$$.props[s]],this.$$p_d[s].reflect){const o=k(s,this.$$d[s],this.$$p_d,"toAttribute");o==null?this.removeAttribute(this.$$p_d[s].attribute||s):this.setAttribute(this.$$p_d[s].attribute||s,o)}this.$$r=!1};this.$$c.$$.after_update.push(i),i();for(const s in this.$$l)for(const o of this.$$l[s]){const u=this.$$c.$on(s,o);this.$$l_u.set(o,u)}this.$$l={}}}attributeChangedCallback(t,n,r){var i;this.$$r||(t=this.$$g_p(t),this.$$d[t]=k(t,r,this.$$p_d,"toProp"),(i=this.$$c)==null||i.$set({[t]:this.$$d[t]}))}disconnectedCallback(){this.$$cn=!1,Promise.resolve().then(()=>{this.$$cn||(this.$$c.$destroy(),this.$$c=void 0)})}$$g_p(t){return Object.keys(this.$$p_d).find(n=>this.$$p_d[n].attribute===t||!this.$$p_d[n].attribute&&n.toLowerCase()===t)||t}});function k(e,t,n,r){var s;const i=(s=n[e])==null?void 0:s.type;if(t=i==="Boolean"&&typeof t!="boolean"?t!=null:t,!r||!n[e])return t;if(r==="toAttribute")switch(i){case"Object":case"Array":return t==null?null:JSON.stringify(t);case"Boolean":return t?"":null;case"Number":return t??null;default:return t}else switch(i){case"Object":case"Array":return t&&JSON.parse(t);case"Boolean":return t;case"Number":return t!=null?+t:t;default:return t}}function ut(e,t,n,r,i,s){let o=class extends R{constructor(){super(e,n,i),this.$$p_d=t}static get observedAttributes(){return Object.keys(t).map(u=>(t[u].attribute||u).toLowerCase())}};return Object.keys(t).forEach(u=>{Object.defineProperty(o.prototype,u,{get(){return this.$$c&&u in this.$$c?this.$$c[u]:this.$$d[u]},set($){var c;$=k(u,$,t),this.$$d[u]=$,(c=this.$$c)==null||c.$set({[u]:$})}})}),r.forEach(u=>{Object.defineProperty(o.prototype,u,{get(){var $;return($=this.$$c)==null?void 0:$[u]}})}),s&&(o=s(o)),e.element=o,o}class $t{constructor(){d(this,"$$");d(this,"$$set")}$destroy(){it(this,1),this.$destroy=f}$on(t,n){if(!P(n))return f;const r=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return r.push(n),()=>{const i=r.indexOf(n);i!==-1&&r.splice(i,1)}}$set(t){this.$$set&&!V(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const ft="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(ft);function lt(e){G(e,"svelte-13wqyks","button.svelte-13wqyks{padding:8px;display:inline-flex;align-items:center;gap:8px}")}function dt(e){let t,n,r,i,s,o,u;return{c(){t=x("button"),n=x("img"),i=B(`\r
  Party Guests: `),s=B(e[0]),U(n.src,r=l.getAssetUrl("party.svg"))||E(n,"src",r),E(n,"alt","party time"),E(t,"class","svelte-13wqyks")},m($,c){q($,t,c),w(t,n),w(t,i),w(t,s),o||(u=K(t,"click",e[1]),o=!0)},p($,[c]){c&1&&W(s,$[0])},i:f,o:f,d($){$&&N(t),o=!1,u()}}}function at(e,t,n){let{count:r=0}=t;const i=()=>{n(0,r+=1)};return e.$$set=s=>{"count"in s&&n(0,r=s.count)},[r,i]}class ht extends $t{constructor(t){super(),ct(this,t,at,dt,J,{count:0},lt)}get count(){return this.$$.ctx[0]}set count(t){this.$$set({count:t}),L()}}customElements.define("my-svelte-element",ut(ht,{count:{}},[],[],!0)),l.addElements({"my-svelte-element":{dashboard:{displayName:"My Svelte Element"},properties:{count:{type:"Number"}}}})});
