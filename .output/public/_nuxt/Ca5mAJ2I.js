const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./Dm74Dt6P.js","./C5-unR8A.js","./entry.UizA9sMz.css","./Xd4zX-83.js","./BOZHw3NS.js"])))=>i.map(i=>d[i]);
import{X as ue,bn as fe,bo as Y,g as Ce,r as F,J as q,S as f,bp as Ae}from"./C5-unR8A.js";const Be=()=>{};var Z={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pe=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let i=t.charCodeAt(r);i<128?e[n++]=i:i<2048?(e[n++]=i>>6|192,e[n++]=i&63|128):(i&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=i>>18|240,e[n++]=i>>12&63|128,e[n++]=i>>6&63|128,e[n++]=i&63|128):(e[n++]=i>>12|224,e[n++]=i>>6&63|128,e[n++]=i&63|128)}return e},Te=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const i=t[n++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){const a=t[n++];e[r++]=String.fromCharCode((i&31)<<6|a&63)}else if(i>239&&i<365){const a=t[n++],o=t[n++],s=t[n++],c=((i&7)<<18|(a&63)<<12|(o&63)<<6|s&63)-65536;e[r++]=String.fromCharCode(55296+(c>>10)),e[r++]=String.fromCharCode(56320+(c&1023))}else{const a=t[n++],o=t[n++];e[r++]=String.fromCharCode((i&15)<<12|(a&63)<<6|o&63)}}return e.join("")},ge={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<t.length;i+=3){const a=t[i],o=i+1<t.length,s=o?t[i+1]:0,c=i+2<t.length,l=c?t[i+2]:0,u=a>>2,h=(a&3)<<4|s>>4;let p=(s&15)<<2|l>>6,E=l&63;c||(E=64,o||(p=64)),r.push(n[u],n[h],n[p],n[E])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(pe(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):Te(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<t.length;){const a=n[t.charAt(i++)],s=i<t.length?n[t.charAt(i)]:0;++i;const l=i<t.length?n[t.charAt(i)]:64;++i;const h=i<t.length?n[t.charAt(i)]:64;if(++i,a==null||s==null||l==null||h==null)throw new Oe;const p=a<<2|s>>4;if(r.push(p),l!==64){const E=s<<4&240|l>>2;if(r.push(E),h!==64){const P=l<<6&192|h;r.push(P)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class Oe extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Me=function(t){const e=pe(t);return ge.encodeByteArray(e,!0)},me=function(t){return Me(t).replace(/\./g,"")},Ne=function(t){try{return ge.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $e(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Re=()=>$e().__FIREBASE_DEFAULTS__,Pe=()=>{if(typeof process>"u"||typeof Z>"u")return;const t=Z.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},Le=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&Ne(t[1]);return e&&JSON.parse(e)},Fe=()=>{try{return Be()||Re()||Pe()||Le()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},be=()=>{var t;return(t=Fe())===null||t===void 0?void 0:t.config};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class He{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}function ke(){try{return typeof indexedDB=="object"}catch{return!1}}function xe(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{var a;e(((a=i.error)===null||a===void 0?void 0:a.message)||"")}}catch(n){e(n)}})}function an(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const je="FirebaseError";class A extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=je,Object.setPrototypeOf(this,A.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ye.prototype.create)}}class ye{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},i=`${this.service}/${e}`,a=this.errors[e],o=a?Ue(a,r):"Error",s=`${this.serviceName}: ${o} (${i}).`;return new A(i,s,r)}}function Ue(t,e){return t.replace(Ve,(n,r)=>{const i=e[r];return i!=null?String(i):`<${r}?>`})}const Ve=/\{\$([^}]+)}/g;function U(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const i of n){if(!r.includes(i))return!1;const a=t[i],o=e[i];if(Q(a)&&Q(o)){if(!U(a,o))return!1}else if(a!==o)return!1}for(const i of r)if(!n.includes(i))return!1;return!0}function Q(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function on(t){return t&&t._delegate?t._delegate:t}class ${constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const w="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ze{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new He;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:n});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(a){if(i)return null;throw a}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Ge(e))try{this.getOrInitializeService({instanceIdentifier:w})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(n);try{const a=this.getOrInitializeService({instanceIdentifier:i});r.resolve(a)}catch{}}}}clearInstance(e=w){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=w){return this.instances.has(e)}getOptions(e=w){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[a,o]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(a);r===s&&o.resolve(i)}return i}onInit(e,n){var r;const i=this.normalizeInstanceIdentifier(n),a=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;a.add(e),this.onInitCallbacks.set(i,a);const o=this.instances.get(i);return o&&e(o,i),()=>{a.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const i of r)try{i(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:We(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=w){return this.component?this.component.multipleInstances?e:w:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function We(t){return t===w?void 0:t}function Ge(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Je{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new ze(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var d;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(d||(d={}));const Ke={debug:d.DEBUG,verbose:d.VERBOSE,info:d.INFO,warn:d.WARN,error:d.ERROR,silent:d.SILENT},Ye=d.INFO,Xe={[d.DEBUG]:"log",[d.VERBOSE]:"log",[d.INFO]:"info",[d.WARN]:"warn",[d.ERROR]:"error"},qe=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),i=Xe[e];if(i)console[i](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Ze{constructor(e){this.name=e,this._logLevel=Ye,this._logHandler=qe,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in d))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Ke[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,d.DEBUG,...e),this._logHandler(this,d.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,d.VERBOSE,...e),this._logHandler(this,d.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,d.INFO,...e),this._logHandler(this,d.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,d.WARN,...e),this._logHandler(this,d.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,d.ERROR,...e),this._logHandler(this,d.ERROR,...e)}}const Qe=(t,e)=>e.some(n=>t instanceof n);let ee,te;function et(){return ee||(ee=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function tt(){return te||(te=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const _e=new WeakMap,V=new WeakMap,ve=new WeakMap,H=new WeakMap,X=new WeakMap;function nt(t){const e=new Promise((n,r)=>{const i=()=>{t.removeEventListener("success",a),t.removeEventListener("error",o)},a=()=>{n(m(t.result)),i()},o=()=>{r(t.error),i()};t.addEventListener("success",a),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&_e.set(n,t)}).catch(()=>{}),X.set(e,t),e}function rt(t){if(V.has(t))return;const e=new Promise((n,r)=>{const i=()=>{t.removeEventListener("complete",a),t.removeEventListener("error",o),t.removeEventListener("abort",o)},a=()=>{n(),i()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),i()};t.addEventListener("complete",a),t.addEventListener("error",o),t.addEventListener("abort",o)});V.set(t,e)}let z={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return V.get(t);if(e==="objectStoreNames")return t.objectStoreNames||ve.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return m(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function it(t){z=t(z)}function at(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(k(this),e,...n);return ve.set(r,e.sort?e.sort():[e]),m(r)}:tt().includes(t)?function(...e){return t.apply(k(this),e),m(_e.get(this))}:function(...e){return m(t.apply(k(this),e))}}function ot(t){return typeof t=="function"?at(t):(t instanceof IDBTransaction&&rt(t),Qe(t,et())?new Proxy(t,z):t)}function m(t){if(t instanceof IDBRequest)return nt(t);if(H.has(t))return H.get(t);const e=ot(t);return e!==t&&(H.set(t,e),X.set(e,t)),e}const k=t=>X.get(t);function st(t,e,{blocked:n,upgrade:r,blocking:i,terminated:a}={}){const o=indexedDB.open(t,e),s=m(o);return r&&o.addEventListener("upgradeneeded",c=>{r(m(o.result),c.oldVersion,c.newVersion,m(o.transaction),c)}),n&&o.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),s.then(c=>{a&&c.addEventListener("close",()=>a()),i&&c.addEventListener("versionchange",l=>i(l.oldVersion,l.newVersion,l))}).catch(()=>{}),s}function sn(t,{blocked:e}={}){const n=indexedDB.deleteDatabase(t);return e&&n.addEventListener("blocked",r=>e(r.oldVersion,r)),m(n).then(()=>{})}const ct=["get","getKey","getAll","getAllKeys","count"],lt=["put","add","delete","clear"],x=new Map;function ne(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(x.get(e))return x.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,i=lt.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(i||ct.includes(n)))return;const a=async function(o,...s){const c=this.transaction(o,i?"readwrite":"readonly");let l=c.store;return r&&(l=l.index(s.shift())),(await Promise.all([l[n](...s),i&&c.done]))[0]};return x.set(e,a),a}it(t=>({...t,get:(e,n,r)=>ne(e,n)||t.get(e,n,r),has:(e,n)=>!!ne(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dt{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(ht(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function ht(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const W="@firebase/app",re="0.13.2";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const b=new Ze("@firebase/app"),ut="@firebase/app-compat",ft="@firebase/analytics-compat",pt="@firebase/analytics",gt="@firebase/app-check-compat",mt="@firebase/app-check",bt="@firebase/auth",yt="@firebase/auth-compat",_t="@firebase/database",vt="@firebase/data-connect",Et="@firebase/database-compat",wt="@firebase/functions",Dt="@firebase/functions-compat",It="@firebase/installations",St="@firebase/installations-compat",Ct="@firebase/messaging",At="@firebase/messaging-compat",Bt="@firebase/performance",Tt="@firebase/performance-compat",Ot="@firebase/remote-config",Mt="@firebase/remote-config-compat",Nt="@firebase/storage",$t="@firebase/storage-compat",Rt="@firebase/firestore",Pt="@firebase/ai",Lt="@firebase/firestore-compat",Ft="firebase";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const G="[DEFAULT]",Ht={[W]:"fire-core",[ut]:"fire-core-compat",[pt]:"fire-analytics",[ft]:"fire-analytics-compat",[mt]:"fire-app-check",[gt]:"fire-app-check-compat",[bt]:"fire-auth",[yt]:"fire-auth-compat",[_t]:"fire-rtdb",[vt]:"fire-data-connect",[Et]:"fire-rtdb-compat",[wt]:"fire-fn",[Dt]:"fire-fn-compat",[It]:"fire-iid",[St]:"fire-iid-compat",[Ct]:"fire-fcm",[At]:"fire-fcm-compat",[Bt]:"fire-perf",[Tt]:"fire-perf-compat",[Ot]:"fire-rc",[Mt]:"fire-rc-compat",[Nt]:"fire-gcs",[$t]:"fire-gcs-compat",[Rt]:"fire-fst",[Lt]:"fire-fst-compat",[Pt]:"fire-vertex","fire-js":"fire-js",[Ft]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const R=new Map,kt=new Map,J=new Map;function ie(t,e){try{t.container.addComponent(e)}catch(n){b.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function K(t){const e=t.name;if(J.has(e))return b.debug(`There were multiple attempts to register component ${e}.`),!1;J.set(e,t);for(const n of R.values())ie(n,t);for(const n of kt.values())ie(n,t);return!0}function cn(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xt={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},v=new ye("app","Firebase",xt);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jt{constructor(e,n,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new $("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw v.create("app-deleted",{appName:this._name})}}function Ee(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r=Object.assign({name:G,automaticDataCollectionEnabled:!0},e),i=r.name;if(typeof i!="string"||!i)throw v.create("bad-app-name",{appName:String(i)});if(n||(n=be()),!n)throw v.create("no-options");const a=R.get(i);if(a){if(U(n,a.options)&&U(r,a.config))return a;throw v.create("duplicate-app",{appName:i})}const o=new Je(i);for(const c of J.values())o.addComponent(c);const s=new jt(n,r,o);return R.set(i,s),s}function ln(t=G){const e=R.get(t);if(!e&&t===G&&be())return Ee();if(!e)throw v.create("no-app",{appName:t});return e}function N(t,e,n){var r;let i=(r=Ht[t])!==null&&r!==void 0?r:t;n&&(i+=`-${n}`);const a=i.match(/\s|\//),o=e.match(/\s|\//);if(a||o){const s=[`Unable to register library "${i}" with version "${e}":`];a&&s.push(`library name "${i}" contains illegal characters (whitespace or "/")`),a&&o&&s.push("and"),o&&s.push(`version name "${e}" contains illegal characters (whitespace or "/")`),b.warn(s.join(" "));return}K(new $(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ut="firebase-heartbeat-database",Vt=1,C="firebase-heartbeat-store";let j=null;function we(){return j||(j=st(Ut,Vt,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(C)}catch(n){console.warn(n)}}}}).catch(t=>{throw v.create("idb-open",{originalErrorMessage:t.message})})),j}async function zt(t){try{const n=(await we()).transaction(C),r=await n.objectStore(C).get(De(t));return await n.done,r}catch(e){if(e instanceof A)b.warn(e.message);else{const n=v.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});b.warn(n.message)}}}async function ae(t,e){try{const r=(await we()).transaction(C,"readwrite");await r.objectStore(C).put(e,De(t)),await r.done}catch(n){if(n instanceof A)b.warn(n.message);else{const r=v.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});b.warn(r.message)}}}function De(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wt=1024,Gt=30;class Jt{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new Yt(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,n;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),a=oe();if(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===a||this._heartbeatsCache.heartbeats.some(o=>o.date===a))return;if(this._heartbeatsCache.heartbeats.push({date:a,agent:i}),this._heartbeatsCache.heartbeats.length>Gt){const o=Xt(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){b.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=oe(),{heartbeatsToSend:r,unsentEntries:i}=Kt(this._heartbeatsCache.heartbeats),a=me(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),a}catch(n){return b.warn(n),""}}}function oe(){return new Date().toISOString().substring(0,10)}function Kt(t,e=Wt){const n=[];let r=t.slice();for(const i of t){const a=n.find(o=>o.agent===i.agent);if(a){if(a.dates.push(i.date),se(n)>e){a.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),se(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class Yt{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return ke()?xe().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await zt(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const i=await this.read();return ae(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const i=await this.read();return ae(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function se(t){return me(JSON.stringify({version:2,heartbeats:t})).length}function Xt(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let r=1;r<t.length;r++)t[r].date<n&&(n=t[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qt(t){K(new $("platform-logger",e=>new dt(e),"PRIVATE")),K(new $("heartbeat",e=>new Jt(e),"PRIVATE")),N(W,re,t),N(W,re,"esm2017"),N("fire-js","")}qt("");var Zt="firebase",Qt="11.10.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */N(Zt,Qt,"app");const _=ue();var he;if(!((he=_.public)!=null&&he.firebase))throw console.error("Firebase configuration is missing"),new Error("Firebase configuration is missing");const en={apiKey:_.public.firebase.apiKey,authDomain:_.public.firebase.authDomain,projectId:_.public.firebase.projectId,storageBucket:_.public.firebase.storageBucket,messagingSenderId:_.public.firebase.messagingSenderId,appId:_.public.firebase.appId,measurementId:_.public.firebase.measurementId},tn=Ee(en);var ce;(function(t){t[t.Min=1]="Min",t[t.Low=2]="Low",t[t.Default=3]="Default",t[t.High=4]="High",t[t.Max=5]="Max"})(ce||(ce={}));var le;(function(t){t[t.Secret=-1]="Secret",t[t.Private=0]="Private",t[t.Public=1]="Public"})(le||(le={}));const M=fe("FirebaseMessaging",{web:()=>Y(()=>import("./Dm74Dt6P.js"),__vite__mapDeps([0,1,2,3]),import.meta.url).then(t=>new t.FirebaseMessagingWeb)});var de;(function(t){t[t.Sunday=1]="Sunday",t[t.Monday=2]="Monday",t[t.Tuesday=3]="Tuesday",t[t.Wednesday=4]="Wednesday",t[t.Thursday=5]="Thursday",t[t.Friday=6]="Friday",t[t.Saturday=7]="Saturday"})(de||(de={}));const nn=fe("LocalNotifications",{web:()=>Y(()=>import("./BOZHw3NS.js"),__vite__mapDeps([4,1,2]),import.meta.url).then(t=>new t.LocalNotificationsWeb)}),dn=Ce("auth",()=>{const t=ue(),e=F(null),n=F(null),r=F("");q();const i=async()=>{const l=await f.get({key:"authUser"}),u=await f.get({key:"Bearer"});l.value&&(n.value=JSON.parse(l.value)),u.value&&(r.value=u.value)};async function a(){const u={Accept:"application/json","Content-Type":"application/json",Authorization:(await f.get({key:"Bearer"})).value||""},h=await $fetch(t.public.apiURL+"auth/user",{method:"GET",credentials:"include",headers:u}).catch(p=>{console.log(p)});h&&(e.value=h,n.value=h,await f.set({key:"authUser",value:JSON.stringify(h)}))}async function o(l){try{const u="mobile_"+crypto.randomUUID();let h=null;const p=Ae.getPlatform();try{const D=t.public.firebase.vapidKey;if(p==="web"){const{getMessaging:B,getToken:L,onMessage:g}=await Y(async()=>{const{getMessaging:y,getToken:T,onMessage:O}=await import("./Xd4zX-83.js");return{getMessaging:y,getToken:T,onMessage:O}},__vite__mapDeps([3,1,2]),import.meta.url),I=B(tn),S=await Notification.requestPermission();console.log("Web notification permission:",S),S==="granted"?(h=await L(I,{vapidKey:D}),console.log("Web FCM token:",h),h&&await f.set({key:"notificationToken",value:h}),g(I,y=>{var T,O;if(console.log("Web foreground message received:",JSON.stringify(y,null,2)),(T=y.notification)!=null&&T.title&&((O=y.notification)!=null&&O.body)){const{title:Ie,body:Se}=y.notification;new Notification(Ie,{body:Se,icon:"/logo-vertical.png"})}})):console.error("Web notification permission denied")}else{const{receive:B}=await M.requestPermissions();if(console.log("Android notification permission:",B),B!=="granted"){console.error("Android notification permissions denied");return}const L={vapidKey:D};h=(await M.getToken(L)).token,console.log("Android FCM token:",h),h&&await f.set({key:"notificationToken",value:h}),M.addListener("notificationReceived",async g=>{var I,S;if(console.log("Android notification received:",JSON.stringify(g.notification,null,2)),(I=g.notification)!=null&&I.title&&((S=g.notification)!=null&&S.body))try{await nn.schedule({notifications:[{id:Math.floor(Date.now()/1e3),title:g.notification.title,body:g.notification.body,smallIcon:"notification_icon"}]}),console.log("Local notification scheduled")}catch(y){console.error("Error scheduling local notification:",y)}else console.warn("Notification missing title or body:",g.notification)}),M.addListener("notificationActionPerformed",g=>{console.log("Android notification action:",JSON.stringify(g,null,2))})}}catch(D){console.error("FCM error:",D)}await f.set({key:"deviceId",value:u});const P={Accept:"application/json","Content-Type":"application/json",Authorization:(await f.get({key:"Bearer"})).value||""};await $fetch(`${t.public.apiURL}users/id/${l}/devices`,{method:"POST",body:{device_id:u,device_type:p,device_name:p==="web"?navigator.userAgent:"Android Device",notification_token:h},headers:P}).catch(D=>{console.error("Error registering device with server:",D)})}catch(u){console.error("Error in registerDevice:",u)}}async function s(l){await $fetch(t.public.rootURL+"sanctum/csrf-cookie",{method:"GET",credentials:"include"});const u=await $fetch(t.public.apiURL+"login",{method:"POST",body:l,credentials:"include",headers:{Accept:"application/json","Content-Type":"application/json"}}).catch(h=>{console.log(h)});return u&&"token"in u&&(r.value="Bearer "+u.token,await f.set({key:"Bearer",value:r.value}),await o(u.user.id),await a()),u}async function c(){const l=await f.get({key:"Bearer"}),u=await f.get({key:"deviceId"}),h=q(),p={Accept:"application/json","Content-Type":"application/json",Authorization:l.value||""};await $fetch(t.public.apiURL+"auth/logout",{method:"POST",credentials:"include",body:{device_id:u},headers:p}).catch(E=>{console.log(E)}),e.value=null,n.value=null,r.value="",await f.remove({key:"Bearer"}),await f.remove({key:"authUser"}),await f.remove({key:"deviceId"}),h.replace({path:"/"})}return{user:e,authUser:n,token:r,loadFromSecureStorage:i,login:s,fetchUser:a,logout:c}});export{$ as C,ye as E,A as F,K as _,cn as a,an as b,on as c,sn as d,ln as g,ke as i,st as o,N as r,dn as u,xe as v};
