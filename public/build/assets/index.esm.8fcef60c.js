var M=function(t,e){return M=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(r,i){r.__proto__=i}||function(r,i){for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(r[n]=i[n])},M(t,e)};function ne(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");M(t,e);function r(){this.constructor=t}t.prototype=e===null?Object.create(e):(r.prototype=e.prototype,new r)}var N=function(){return N=Object.assign||function(e){for(var r,i=1,n=arguments.length;i<n;i++){r=arguments[i];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e},N.apply(this,arguments)};function ie(t,e,r,i){function n(a){return a instanceof r?a:new r(function(o){o(a)})}return new(r||(r=Promise))(function(a,o){function f(h){try{s(i.next(h))}catch(p){o(p)}}function c(h){try{s(i.throw(h))}catch(p){o(p)}}function s(h){h.done?a(h.value):n(h.value).then(f,c)}s((i=i.apply(t,e||[])).next())})}function ae(t,e){var r={label:0,sent:function(){if(a[0]&1)throw a[1];return a[1]},trys:[],ops:[]},i,n,a,o=Object.create((typeof Iterator=="function"?Iterator:Object).prototype);return o.next=f(0),o.throw=f(1),o.return=f(2),typeof Symbol=="function"&&(o[Symbol.iterator]=function(){return this}),o;function f(s){return function(h){return c([s,h])}}function c(s){if(i)throw new TypeError("Generator is already executing.");for(;o&&(o=0,s[0]&&(r=0)),r;)try{if(i=1,n&&(a=s[0]&2?n.return:s[0]?n.throw||((a=n.return)&&a.call(n),0):n.next)&&!(a=a.call(n,s[1])).done)return a;switch(n=0,a&&(s=[s[0]&2,a.value]),s[0]){case 0:case 1:a=s;break;case 4:return r.label++,{value:s[1],done:!1};case 5:r.label++,n=s[1],s=[0];continue;case 7:s=r.ops.pop(),r.trys.pop();continue;default:if(a=r.trys,!(a=a.length>0&&a[a.length-1])&&(s[0]===6||s[0]===2)){r=0;continue}if(s[0]===3&&(!a||s[1]>a[0]&&s[1]<a[3])){r.label=s[1];break}if(s[0]===6&&r.label<a[1]){r.label=a[1],a=s;break}if(a&&r.label<a[2]){r.label=a[2],r.ops.push(s);break}a[2]&&r.ops.pop(),r.trys.pop();continue}s=e.call(t,r)}catch(h){s=[6,h],n=0}finally{i=a=0}if(s[0]&5)throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}}function L(t){var e=typeof Symbol=="function"&&Symbol.iterator,r=e&&t[e],i=0;if(r)return r.call(t);if(t&&typeof t.length=="number")return{next:function(){return t&&i>=t.length&&(t=void 0),{value:t&&t[i++],done:!t}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}function D(t,e){var r=typeof Symbol=="function"&&t[Symbol.iterator];if(!r)return t;var i=r.call(t),n,a=[],o;try{for(;(e===void 0||e-- >0)&&!(n=i.next()).done;)a.push(n.value)}catch(f){o={error:f}}finally{try{n&&!n.done&&(r=i.return)&&r.call(i)}finally{if(o)throw o.error}}return a}function V(t,e,r){if(r||arguments.length===2)for(var i=0,n=e.length,a;i<n;i++)(a||!(i in e))&&(a||(a=Array.prototype.slice.call(e,0,i)),a[i]=e[i]);return t.concat(a||Array.prototype.slice.call(e))}/**
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
 */var J={NODE_CLIENT:!1,NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
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
 */var oe=function(t,e){if(!t)throw se(e)},se=function(t){return new Error("Firebase Database ("+J.SDK_VERSION+") INTERNAL ASSERT FAILED: "+t)};/**
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
 */var K=function(t){for(var e=[],r=0,i=0;i<t.length;i++){var n=t.charCodeAt(i);n<128?e[r++]=n:n<2048?(e[r++]=n>>6|192,e[r++]=n&63|128):(n&64512)===55296&&i+1<t.length&&(t.charCodeAt(i+1)&64512)===56320?(n=65536+((n&1023)<<10)+(t.charCodeAt(++i)&1023),e[r++]=n>>18|240,e[r++]=n>>12&63|128,e[r++]=n>>6&63|128,e[r++]=n&63|128):(e[r++]=n>>12|224,e[r++]=n>>6&63|128,e[r++]=n&63|128)}return e},fe=function(t){for(var e=[],r=0,i=0;r<t.length;){var n=t[r++];if(n<128)e[i++]=String.fromCharCode(n);else if(n>191&&n<224){var a=t[r++];e[i++]=String.fromCharCode((n&31)<<6|a&63)}else if(n>239&&n<365){var a=t[r++],o=t[r++],f=t[r++],c=((n&7)<<18|(a&63)<<12|(o&63)<<6|f&63)-65536;e[i++]=String.fromCharCode(55296+(c>>10)),e[i++]=String.fromCharCode(56320+(c&1023))}else{var a=t[r++],o=t[r++];e[i++]=String.fromCharCode((n&15)<<12|(a&63)<<6|o&63)}}return e.join("")},Y={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray:function(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();for(var r=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[],n=0;n<t.length;n+=3){var a=t[n],o=n+1<t.length,f=o?t[n+1]:0,c=n+2<t.length,s=c?t[n+2]:0,h=a>>2,p=(a&3)<<4|f>>4,l=(f&15)<<2|s>>6,u=s&63;c||(u=64,o||(l=64)),i.push(r[h],r[p],r[l],r[u])}return i.join("")},encodeString:function(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(K(t),e)},decodeString:function(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):fe(this.decodeStringToByteArray(t,e))},decodeStringToByteArray:function(t,e){this.init_();for(var r=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[],n=0;n<t.length;){var a=r[t.charAt(n++)],o=n<t.length,f=o?r[t.charAt(n)]:0;++n;var c=n<t.length,s=c?r[t.charAt(n)]:64;++n;var h=n<t.length,p=h?r[t.charAt(n)]:64;if(++n,a==null||f==null||s==null||p==null)throw Error();var l=a<<2|f>>4;if(i.push(l),s!==64){var u=f<<4&240|s>>2;if(i.push(u),p!==64){var g=s<<6&192|p;i.push(g)}}}return i},init_:function(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(var t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}},ue=function(t){var e=K(t);return Y.encodeByteArray(e,!0)},H=function(t){return ue(t).replace(/\./g,"")},W=function(t){try{return Y.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function le(t){return T(void 0,t)}function T(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:var r=e;return new Date(r.getTime());case Object:t===void 0&&(t={});break;case Array:t=[];break;default:return e}for(var i in e)!e.hasOwnProperty(i)||!ce(i)||(t[i]=T(t[i],e[i]));return t}function ce(t){return t!=="__proto__"}/**
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
 */var he=function(){function t(){var e=this;this.reject=function(){},this.resolve=function(){},this.promise=new Promise(function(r,i){e.resolve=r,e.reject=i})}return t.prototype.wrapCallback=function(e){var r=this;return function(i,n){i?r.reject(i):r.resolve(n),typeof e=="function"&&(r.promise.catch(function(){}),e.length===1?e(i):e(i,n))}},t}();/**
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
 */function tt(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');var r={alg:"none",type:"JWT"},i=e||"demo-project",n=t.iat||0,a=t.sub||t.user_id;if(!a)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");var o=N({iss:"https://securetoken.google.com/"+i,aud:i,iat:n,exp:n+3600,auth_time:n,sub:a,user_id:a,firebase:{sign_in_provider:"custom",identities:{}}},t),f="";return[H(JSON.stringify(r)),H(JSON.stringify(o)),f].join(".")}/**
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
 */function pe(){return typeof navigator!="undefined"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function rt(){return typeof window!="undefined"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(pe())}function de(){try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function ve(){return typeof self=="object"&&self.self===self}function nt(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function it(){return J.NODE_ADMIN===!0}/**
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
 */var me="FirebaseError",ge=function(t){ne(e,t);function e(r,i,n){var a=t.call(this,i)||this;return a.code=r,a.customData=n,a.name=me,Object.setPrototypeOf(a,e.prototype),Error.captureStackTrace&&Error.captureStackTrace(a,F.prototype.create),a}return e}(Error),F=function(){function t(e,r,i){this.service=e,this.serviceName=r,this.errors=i}return t.prototype.create=function(e){for(var r=[],i=1;i<arguments.length;i++)r[i-1]=arguments[i];var n=r[0]||{},a=this.service+"/"+e,o=this.errors[e],f=o?ye(o,n):"Error",c=this.serviceName+": "+f+" ("+a+").",s=new ge(a,c,n);return s},t}();function ye(t,e){return t.replace(be,function(r,i){var n=e[i];return n!=null?String(n):"<"+i+"?>"})}var be=/\{\$([^}]+)}/g;/**
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
 */function U(t){return JSON.parse(t)}function at(t){return JSON.stringify(t)}/**
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
 */var q=function(t){var e={},r={},i={},n="";try{var a=t.split(".");e=U(W(a[0])||""),r=U(W(a[1])||""),n=a[2],i=r.d||{},delete r.d}catch{}return{header:e,claims:r,data:i,signature:n}},ot=function(t){var e=q(t),r=e.claims;return!!r&&typeof r=="object"&&r.hasOwnProperty("iat")},st=function(t){var e=q(t).claims;return typeof e=="object"&&e.admin===!0};/**
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
 */function $(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function ft(t,e){if(Object.prototype.hasOwnProperty.call(t,e))return t[e]}function ut(t){for(var e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function lt(t,e,r){var i={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(i[n]=e.call(r,t[n],n,t));return i}/**
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
 */function ct(t){for(var e=[],r=function(c,s){Array.isArray(s)?s.forEach(function(h){e.push(encodeURIComponent(c)+"="+encodeURIComponent(h))}):e.push(encodeURIComponent(c)+"="+encodeURIComponent(s))},i=0,n=Object.entries(t);i<n.length;i++){var a=n[i],o=a[0],f=a[1];r(o,f)}return e.length?"&"+e.join("&"):""}/**
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
 */var ht=function(){function t(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(var e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}return t.prototype.reset=function(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0},t.prototype.compress_=function(e,r){r||(r=0);var i=this.W_;if(typeof e=="string")for(var n=0;n<16;n++)i[n]=e.charCodeAt(r)<<24|e.charCodeAt(r+1)<<16|e.charCodeAt(r+2)<<8|e.charCodeAt(r+3),r+=4;else for(var n=0;n<16;n++)i[n]=e[r]<<24|e[r+1]<<16|e[r+2]<<8|e[r+3],r+=4;for(var n=16;n<80;n++){var a=i[n-3]^i[n-8]^i[n-14]^i[n-16];i[n]=(a<<1|a>>>31)&4294967295}for(var o=this.chain_[0],f=this.chain_[1],c=this.chain_[2],s=this.chain_[3],h=this.chain_[4],p,l,n=0;n<80;n++){n<40?n<20?(p=s^f&(c^s),l=1518500249):(p=f^c^s,l=1859775393):n<60?(p=f&c|s&(f|c),l=2400959708):(p=f^c^s,l=3395469782);var a=(o<<5|o>>>27)+p+h+l+i[n]&4294967295;h=s,s=c,c=(f<<30|f>>>2)&4294967295,f=o,o=a}this.chain_[0]=this.chain_[0]+o&4294967295,this.chain_[1]=this.chain_[1]+f&4294967295,this.chain_[2]=this.chain_[2]+c&4294967295,this.chain_[3]=this.chain_[3]+s&4294967295,this.chain_[4]=this.chain_[4]+h&4294967295},t.prototype.update=function(e,r){if(e!=null){r===void 0&&(r=e.length);for(var i=r-this.blockSize,n=0,a=this.buf_,o=this.inbuf_;n<r;){if(o===0)for(;n<=i;)this.compress_(e,n),n+=this.blockSize;if(typeof e=="string"){for(;n<r;)if(a[o]=e.charCodeAt(n),++o,++n,o===this.blockSize){this.compress_(a),o=0;break}}else for(;n<r;)if(a[o]=e[n],++o,++n,o===this.blockSize){this.compress_(a),o=0;break}}this.inbuf_=o,this.total_+=r}},t.prototype.digest=function(){var e=[],r=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(var i=this.blockSize-1;i>=56;i--)this.buf_[i]=r&255,r/=256;this.compress_(this.buf_);for(var n=0,i=0;i<5;i++)for(var a=24;a>=0;a-=8)e[n]=this.chain_[i]>>a&255,++n;return e},t}();function _e(t,e){var r=new Ee(t,e);return r.subscribe.bind(r)}var Ee=function(){function t(e,r){var i=this;this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=r,this.task.then(function(){e(i)}).catch(function(n){i.error(n)})}return t.prototype.next=function(e){this.forEachObserver(function(r){r.next(e)})},t.prototype.error=function(e){this.forEachObserver(function(r){r.error(e)}),this.close(e)},t.prototype.complete=function(){this.forEachObserver(function(e){e.complete()}),this.close()},t.prototype.subscribe=function(e,r,i){var n=this,a;if(e===void 0&&r===void 0&&i===void 0)throw new Error("Missing Observer.");Se(e,["next","error","complete"])?a=e:a={next:e,error:r,complete:i},a.next===void 0&&(a.next=P),a.error===void 0&&(a.error=P),a.complete===void 0&&(a.complete=P);var o=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(function(){try{n.finalError?a.error(n.finalError):a.complete()}catch{}}),this.observers.push(a),o},t.prototype.unsubscribeOne=function(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))},t.prototype.forEachObserver=function(e){if(!this.finalized)for(var r=0;r<this.observers.length;r++)this.sendOne(r,e)},t.prototype.sendOne=function(e,r){var i=this;this.task.then(function(){if(i.observers!==void 0&&i.observers[e]!==void 0)try{r(i.observers[e])}catch(n){typeof console!="undefined"&&console.error&&console.error(n)}})},t.prototype.close=function(e){var r=this;this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(function(){r.observers=void 0,r.onNoObservers=void 0}))},t}();function Se(t,e){if(typeof t!="object"||t===null)return!1;for(var r=0,i=e;r<i.length;r++){var n=i[r];if(n in t&&typeof t[n]=="function")return!0}return!1}function P(){}/**
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
 */var pt=function(t,e,r,i){var n;if(i<e?n="at least "+e:i>r&&(n=r===0?"none":"no more than "+r),n){var a=t+" failed: Was called with "+i+(i===1?" argument.":" arguments.")+" Expects "+n+".";throw new Error(a)}};function X(t,e){return t+" failed: "+e+" argument "}function dt(t,e,r,i){if(!(i&&!r)&&typeof r!="function")throw new Error(X(t,e)+"must be a valid function.")}function vt(t,e,r,i){if(!(i&&!r)&&(typeof r!="object"||r===null))throw new Error(X(t,e)+"must be a valid context object.")}/**
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
 */var mt=function(t){for(var e=[],r=0,i=0;i<t.length;i++){var n=t.charCodeAt(i);if(n>=55296&&n<=56319){var a=n-55296;i++,oe(i<t.length,"Surrogate pair missing trail surrogate.");var o=t.charCodeAt(i)-56320;n=65536+(a<<10)+o}n<128?e[r++]=n:n<2048?(e[r++]=n>>6|192,e[r++]=n&63|128):n<65536?(e[r++]=n>>12|224,e[r++]=n>>6&63|128,e[r++]=n&63|128):(e[r++]=n>>18|240,e[r++]=n>>12&63|128,e[r++]=n>>6&63|128,e[r++]=n&63|128)}return e},gt=function(t){for(var e=0,r=0;r<t.length;r++){var i=t.charCodeAt(r);i<128?e++:i<2048?e+=2:i>=55296&&i<=56319?(e+=4,r++):e+=3}return e};/**
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
 */function yt(t){return t&&t._delegate?t._delegate:t}var z=function(){function t(e,r,i){this.name=e,this.instanceFactory=r,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}return t.prototype.setInstantiationMode=function(e){return this.instantiationMode=e,this},t.prototype.setMultipleInstances=function(e){return this.multipleInstances=e,this},t.prototype.setServiceProps=function(e){return this.serviceProps=e,this},t.prototype.setInstanceCreatedCallback=function(e){return this.onInstanceCreated=e,this},t}();/**
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
 */var O="[DEFAULT]";/**
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
 */var Ae=function(){function t(e,r){this.name=e,this.container=r,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}return t.prototype.get=function(e){var r=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(r)){var i=new he;if(this.instancesDeferred.set(r,i),this.isInitialized(r)||this.shouldAutoInitialize())try{var n=this.getOrInitializeService({instanceIdentifier:r});n&&i.resolve(n)}catch{}}return this.instancesDeferred.get(r).promise},t.prototype.getImmediate=function(e){var r,i=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),n=(r=e==null?void 0:e.optional)!==null&&r!==void 0?r:!1;if(this.isInitialized(i)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:i})}catch(a){if(n)return null;throw a}else{if(n)return null;throw Error("Service "+this.name+" is not available")}},t.prototype.getComponent=function(){return this.component},t.prototype.setComponent=function(e){var r,i;if(e.name!==this.name)throw Error("Mismatching Component "+e.name+" for Provider "+this.name+".");if(this.component)throw Error("Component for "+this.name+" has already been provided");if(this.component=e,!!this.shouldAutoInitialize()){if(Oe(e))try{this.getOrInitializeService({instanceIdentifier:O})}catch{}try{for(var n=L(this.instancesDeferred.entries()),a=n.next();!a.done;a=n.next()){var o=D(a.value,2),f=o[0],c=o[1],s=this.normalizeInstanceIdentifier(f);try{var h=this.getOrInitializeService({instanceIdentifier:s});c.resolve(h)}catch{}}}catch(p){r={error:p}}finally{try{a&&!a.done&&(i=n.return)&&i.call(n)}finally{if(r)throw r.error}}}},t.prototype.clearInstance=function(e){e===void 0&&(e=O),this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)},t.prototype.delete=function(){return ie(this,void 0,void 0,function(){var e;return ae(this,function(r){switch(r.label){case 0:return e=Array.from(this.instances.values()),[4,Promise.all(V(V([],D(e.filter(function(i){return"INTERNAL"in i}).map(function(i){return i.INTERNAL.delete()}))),D(e.filter(function(i){return"_delete"in i}).map(function(i){return i._delete()}))))];case 1:return r.sent(),[2]}})})},t.prototype.isComponentSet=function(){return this.component!=null},t.prototype.isInitialized=function(e){return e===void 0&&(e=O),this.instances.has(e)},t.prototype.getOptions=function(e){return e===void 0&&(e=O),this.instancesOptions.get(e)||{}},t.prototype.initialize=function(e){var r,i;e===void 0&&(e={});var n=e.options,a=n===void 0?{}:n,o=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(o))throw Error(this.name+"("+o+") has already been initialized");if(!this.isComponentSet())throw Error("Component "+this.name+" has not been registered yet");var f=this.getOrInitializeService({instanceIdentifier:o,options:a});try{for(var c=L(this.instancesDeferred.entries()),s=c.next();!s.done;s=c.next()){var h=D(s.value,2),p=h[0],l=h[1],u=this.normalizeInstanceIdentifier(p);o===u&&l.resolve(f)}}catch(g){r={error:g}}finally{try{s&&!s.done&&(i=c.return)&&i.call(c)}finally{if(r)throw r.error}}return f},t.prototype.onInit=function(e,r){var i,n=this.normalizeInstanceIdentifier(r),a=(i=this.onInitCallbacks.get(n))!==null&&i!==void 0?i:new Set;a.add(e),this.onInitCallbacks.set(n,a);var o=this.instances.get(n);return o&&e(o,n),function(){a.delete(e)}},t.prototype.invokeOnInitCallbacks=function(e,r){var i,n,a=this.onInitCallbacks.get(r);if(!!a)try{for(var o=L(a),f=o.next();!f.done;f=o.next()){var c=f.value;try{c(e,r)}catch{}}}catch(s){i={error:s}}finally{try{f&&!f.done&&(n=o.return)&&n.call(o)}finally{if(i)throw i.error}}},t.prototype.getOrInitializeService=function(e){var r=e.instanceIdentifier,i=e.options,n=i===void 0?{}:i,a=this.instances.get(r);if(!a&&this.component&&(a=this.component.instanceFactory(this.container,{instanceIdentifier:Ie(r),options:n}),this.instances.set(r,a),this.instancesOptions.set(r,n),this.invokeOnInitCallbacks(a,r),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,r,a)}catch{}return a||null},t.prototype.normalizeInstanceIdentifier=function(e){return e===void 0&&(e=O),this.component?this.component.multipleInstances?e:O:e},t.prototype.shouldAutoInitialize=function(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"},t}();function Ie(t){return t===O?void 0:t}function Oe(t){return t.instantiationMode==="EAGER"}/**
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
 */var we=function(){function t(e){this.name=e,this.providers=new Map}return t.prototype.addComponent=function(e){var r=this.getProvider(e.name);if(r.isComponentSet())throw new Error("Component "+e.name+" has already been registered with "+this.name);r.setComponent(e)},t.prototype.addOrOverwriteComponent=function(e){var r=this.getProvider(e.name);r.isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)},t.prototype.getProvider=function(e){if(this.providers.has(e))return this.providers.get(e);var r=new Ae(e,this);return this.providers.set(e,r),r},t.prototype.getProviders=function(){return Array.from(this.providers.values())},t}();/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */function _(){for(var t=0,e=0,r=arguments.length;e<r;e++)t+=arguments[e].length;for(var i=Array(t),n=0,e=0;e<r;e++)for(var a=arguments[e],o=0,f=a.length;o<f;o++,n++)i[n]=a[o];return i}/**
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
 */var I,j=[],d;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(d||(d={}));var Z={debug:d.DEBUG,verbose:d.VERBOSE,info:d.INFO,warn:d.WARN,error:d.ERROR,silent:d.SILENT},Ce=d.INFO,Ne=(I={},I[d.DEBUG]="log",I[d.VERBOSE]="log",I[d.INFO]="info",I[d.WARN]="warn",I[d.ERROR]="error",I),Te=function(t,e){for(var r=[],i=2;i<arguments.length;i++)r[i-2]=arguments[i];if(!(e<t.logLevel)){var n=new Date().toISOString(),a=Ne[e];if(a)console[a].apply(console,_(["["+n+"]  "+t.name+":"],r));else throw new Error("Attempted to log a message with an invalid logType (value: "+e+")")}},De=function(){function t(e){this.name=e,this._logLevel=Ce,this._logHandler=Te,this._userLogHandler=null,j.push(this)}return Object.defineProperty(t.prototype,"logLevel",{get:function(){return this._logLevel},set:function(e){if(!(e in d))throw new TypeError('Invalid value "'+e+'" assigned to `logLevel`');this._logLevel=e},enumerable:!1,configurable:!0}),t.prototype.setLogLevel=function(e){this._logLevel=typeof e=="string"?Z[e]:e},Object.defineProperty(t.prototype,"logHandler",{get:function(){return this._logHandler},set:function(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"userLogHandler",{get:function(){return this._userLogHandler},set:function(e){this._userLogHandler=e},enumerable:!1,configurable:!0}),t.prototype.debug=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];this._userLogHandler&&this._userLogHandler.apply(this,_([this,d.DEBUG],e)),this._logHandler.apply(this,_([this,d.DEBUG],e))},t.prototype.log=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];this._userLogHandler&&this._userLogHandler.apply(this,_([this,d.VERBOSE],e)),this._logHandler.apply(this,_([this,d.VERBOSE],e))},t.prototype.info=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];this._userLogHandler&&this._userLogHandler.apply(this,_([this,d.INFO],e)),this._logHandler.apply(this,_([this,d.INFO],e))},t.prototype.warn=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];this._userLogHandler&&this._userLogHandler.apply(this,_([this,d.WARN],e)),this._logHandler.apply(this,_([this,d.WARN],e))},t.prototype.error=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];this._userLogHandler&&this._userLogHandler.apply(this,_([this,d.ERROR],e)),this._logHandler.apply(this,_([this,d.ERROR],e))},t}();function Re(t){j.forEach(function(e){e.setLogLevel(t)})}function xe(t,e){for(var r=function(o){var f=null;e&&e.level&&(f=Z[e.level]),t===null?o.userLogHandler=null:o.userLogHandler=function(c,s){for(var h=[],p=2;p<arguments.length;p++)h[p-2]=arguments[p];var l=h.map(function(u){if(u==null)return null;if(typeof u=="string")return u;if(typeof u=="number"||typeof u=="boolean")return u.toString();if(u instanceof Error)return u.message;try{return JSON.stringify(u)}catch{return null}}).filter(function(u){return u}).join(" ");s>=(f!=null?f:c.logLevel)&&t({level:d[s].toLowerCase(),message:l,args:h,type:c.name})}},i=0,n=j;i<n.length;i++){var a=n[i];r(a)}}/**
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
 */var A,Le=(A={},A["no-app"]="No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()",A["bad-app-name"]="Illegal App name: '{$appName}",A["duplicate-app"]="Firebase App named '{$appName}' already exists",A["app-deleted"]="Firebase App named '{$appName}' already deleted",A["invalid-app-argument"]="firebase.{$appName}() takes either no argument or a Firebase App instance.",A["invalid-log-argument"]="First argument to `onLog` must be null or a function.",A),w=new F("app","Firebase",Le),Q="@firebase/app",Pe="0.6.30",Me="@firebase/analytics",Fe="@firebase/app-check",ze="@firebase/auth",je="@firebase/database",Be="@firebase/functions",ke="@firebase/installations",Ve="@firebase/messaging",He="@firebase/performance",We="@firebase/remote-config",Ue="@firebase/storage",$e="@firebase/firestore",Ge="firebase-wrapper";/**
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
 */var m,x="[DEFAULT]",Je=(m={},m[Q]="fire-core",m[Me]="fire-analytics",m[Fe]="fire-app-check",m[ze]="fire-auth",m[je]="fire-rtdb",m[Be]="fire-fn",m[ke]="fire-iid",m[Ve]="fire-fcm",m[He]="fire-perf",m[We]="fire-rc",m[Ue]="fire-gcs",m[$e]="fire-fst",m["fire-js"]="fire-js",m[Ge]="fire-js-all",m);/**
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
 */var C=new De("@firebase/app");/**
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
 */var R=function(){function t(e,r,i){var n=this;this.firebase_=i,this.isDeleted_=!1,this.name_=r.name,this.automaticDataCollectionEnabled_=r.automaticDataCollectionEnabled||!1,this.options_=le(e),this.container=new we(r.name),this._addComponent(new z("app",function(){return n},"PUBLIC")),this.firebase_.INTERNAL.components.forEach(function(a){return n._addComponent(a)})}return Object.defineProperty(t.prototype,"automaticDataCollectionEnabled",{get:function(){return this.checkDestroyed_(),this.automaticDataCollectionEnabled_},set:function(e){this.checkDestroyed_(),this.automaticDataCollectionEnabled_=e},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"name",{get:function(){return this.checkDestroyed_(),this.name_},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"options",{get:function(){return this.checkDestroyed_(),this.options_},enumerable:!1,configurable:!0}),t.prototype.delete=function(){var e=this;return new Promise(function(r){e.checkDestroyed_(),r()}).then(function(){return e.firebase_.INTERNAL.removeApp(e.name_),Promise.all(e.container.getProviders().map(function(r){return r.delete()}))}).then(function(){e.isDeleted_=!0})},t.prototype._getService=function(e,r){var i;r===void 0&&(r=x),this.checkDestroyed_();var n=this.container.getProvider(e);return!n.isInitialized()&&((i=n.getComponent())===null||i===void 0?void 0:i.instantiationMode)==="EXPLICIT"&&n.initialize(),n.getImmediate({identifier:r})},t.prototype._removeServiceInstance=function(e,r){r===void 0&&(r=x),this.container.getProvider(e).clearInstance(r)},t.prototype._addComponent=function(e){try{this.container.addComponent(e)}catch(r){C.debug("Component "+e.name+" failed to register with FirebaseApp "+this.name,r)}},t.prototype._addOrOverwriteComponent=function(e){this.container.addOrOverwriteComponent(e)},t.prototype.toJSON=function(){return{name:this.name,automaticDataCollectionEnabled:this.automaticDataCollectionEnabled,options:this.options}},t.prototype.checkDestroyed_=function(){if(this.isDeleted_)throw w.create("app-deleted",{appName:this.name_})},t}();R.prototype.name&&R.prototype.options||R.prototype.delete||console.log("dc");var Ke="8.10.0";/**
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
 */function Ye(t){var e={},r=new Map,i={__esModule:!0,initializeApp:o,app:a,registerVersion:s,setLogLevel:Re,onLog:h,apps:null,SDK_VERSION:Ke,INTERNAL:{registerComponent:c,removeApp:n,components:r,useAsService:p}};i.default=i,Object.defineProperty(i,"apps",{get:f});function n(l){delete e[l]}function a(l){if(l=l||x,!$(e,l))throw w.create("no-app",{appName:l});return e[l]}a.App=t;function o(l,u){if(u===void 0&&(u={}),typeof u!="object"||u===null){var g=u;u={name:g}}var y=u;y.name===void 0&&(y.name=x);var v=y.name;if(typeof v!="string"||!v)throw w.create("bad-app-name",{appName:String(v)});if($(e,v))throw w.create("duplicate-app",{appName:v});var S=new t(l,y,i);return e[v]=S,S}function f(){return Object.keys(e).map(function(l){return e[l]})}function c(l){var u=l.name;if(r.has(u))return C.debug("There were multiple attempts to register component "+u+"."),l.type==="PUBLIC"?i[u]:null;if(r.set(u,l),l.type==="PUBLIC"){var g=function(b){if(b===void 0&&(b=a()),typeof b[u]!="function")throw w.create("invalid-app-argument",{appName:u});return b[u]()};l.serviceProps!==void 0&&T(g,l.serviceProps),i[u]=g,t.prototype[u]=function(){for(var b=[],E=0;E<arguments.length;E++)b[E]=arguments[E];var re=this._getService.bind(this,u);return re.apply(this,l.multipleInstances?b:[])}}for(var y=0,v=Object.keys(e);y<v.length;y++){var S=v[y];e[S]._addComponent(l)}return l.type==="PUBLIC"?i[u]:null}function s(l,u,g){var y,v=(y=Je[l])!==null&&y!==void 0?y:l;g&&(v+="-"+g);var S=v.match(/\s|\//),b=u.match(/\s|\//);if(S||b){var E=['Unable to register library "'+v+'" with version "'+u+'":'];S&&E.push('library name "'+v+'" contains illegal characters (whitespace or "/")'),S&&b&&E.push("and"),b&&E.push('version name "'+u+'" contains illegal characters (whitespace or "/")'),C.warn(E.join(" "));return}c(new z(v+"-version",function(){return{library:v,version:u}},"VERSION"))}function h(l,u){if(l!==null&&typeof l!="function")throw w.create("invalid-log-argument");xe(l,u)}function p(l,u){if(u==="serverAuth")return null;var g=u;return g}return i}/**
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
 */function ee(){var t=Ye(R);t.INTERNAL=N(N({},t.INTERNAL),{createFirebaseNamespace:ee,extendNamespace:e,createSubscribe:_e,ErrorFactory:F,deepExtend:T});function e(r){T(t,r)}return t}var B=ee();/**
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
 */var qe=function(){function t(e){this.container=e}return t.prototype.getPlatformInfoString=function(){var e=this.container.getProviders();return e.map(function(r){if(Xe(r)){var i=r.getImmediate();return i.library+"/"+i.version}else return null}).filter(function(r){return r}).join(" ")},t}();function Xe(t){var e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}/**
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
 */function Ze(t,e){t.INTERNAL.registerComponent(new z("platform-logger",function(r){return new qe(r)},"PRIVATE")),t.registerVersion(Q,Pe,e),t.registerVersion("fire-js","")}/**
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
 */if(ve()&&self.firebase!==void 0){C.warn(`
    Warning: Firebase is already defined in the global scope. Please make sure
    Firebase library is only loaded once.
  `);var G=self.firebase.SDK_VERSION;G&&G.indexOf("LITE")>=0&&C.warn(`
    Warning: You are trying to load Firebase while using Firebase Performance standalone script.
    You should load Firebase Performance with this instance of Firebase to avoid loading duplicate code.
    `)}var Qe=B.initializeApp;B.initializeApp=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];return de()&&C.warn(`
      Warning: This is a browser-targeted Firebase bundle but it appears it is being
      run in a Node environment.  If running in a Node environment, make sure you
      are using the bundle specified by the "main" field in package.json.
      
      If you are using Webpack, you can specify "main" as the first item in
      "resolve.mainFields":
      https://webpack.js.org/configuration/resolve/#resolvemainfields
      
      If using Rollup, use the @rollup/plugin-node-resolve plugin and specify "main"
      as the first item in "mainFields", e.g. ['main', 'module'].
      https://github.com/rollup/@rollup/plugin-node-resolve
      `),Qe.apply(void 0,t)};var k=B;Ze(k);var et="firebase",te="8.10.1";/**
 * @license
 * Copyright 2018 Google LLC
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
 */k.registerVersion(et,te,"app");k.SDK_VERSION=te;export{nt as A,gt as B,X as C,he as D,vt as E,z as F,d as G,tt as H,we as I,le as J,F as K,De as L,ge as M,Ae as P,ht as S,L as _,ne as a,oe as b,$ as c,ft as d,ot as e,k as f,ie as g,ut as h,st as i,rt as j,se as k,N as l,lt as m,D as n,U as o,yt as p,ct as q,dt as r,at as s,mt as t,Y as u,pt as v,V as w,ue as x,it as y,ae as z};
