import{F as ve,f as ge,K as be,_ as P,g as c,z as l,l as v,M as He,w as we,n as ye}from"./index.esm.8fcef60c.js";function $e(e){return Array.prototype.slice.call(e)}function me(e){return new Promise(function(t,r){e.onsuccess=function(){t(e.result)},e.onerror=function(){r(e.error)}})}function L(e,t,r){var n,i=new Promise(function(o,s){n=e[t].apply(e,r),me(n).then(o,s)});return i.request=n,i}function Ge(e,t,r){var n=L(e,t,r);return n.then(function(i){if(!!i)return new N(i,n.request)})}function O(e,t,r){r.forEach(function(n){Object.defineProperty(e.prototype,n,{get:function(){return this[t][n]},set:function(i){this[t][n]=i}})})}function X(e,t,r,n){n.forEach(function(i){i in r.prototype&&(e.prototype[i]=function(){return L(this[t],i,arguments)})})}function B(e,t,r,n){n.forEach(function(i){i in r.prototype&&(e.prototype[i]=function(){return this[t][i].apply(this[t],arguments)})})}function ke(e,t,r,n){n.forEach(function(i){i in r.prototype&&(e.prototype[i]=function(){return Ge(this[t],i,arguments)})})}function E(e){this._index=e}O(E,"_index",["name","keyPath","multiEntry","unique"]);X(E,"_index",IDBIndex,["get","getKey","getAll","getAllKeys","count"]);ke(E,"_index",IDBIndex,["openCursor","openKeyCursor"]);function N(e,t){this._cursor=e,this._request=t}O(N,"_cursor",["direction","key","primaryKey","value"]);X(N,"_cursor",IDBCursor,["update","delete"]);["advance","continue","continuePrimaryKey"].forEach(function(e){e in IDBCursor.prototype&&(N.prototype[e]=function(){var t=this,r=arguments;return Promise.resolve().then(function(){return t._cursor[e].apply(t._cursor,r),me(t._request).then(function(n){if(!!n)return new N(n,t._request)})})})});function g(e){this._store=e}g.prototype.createIndex=function(){return new E(this._store.createIndex.apply(this._store,arguments))};g.prototype.index=function(){return new E(this._store.index.apply(this._store,arguments))};O(g,"_store",["name","keyPath","indexNames","autoIncrement"]);X(g,"_store",IDBObjectStore,["put","add","delete","clear","get","getAll","getKey","getAllKeys","count"]);ke(g,"_store",IDBObjectStore,["openCursor","openKeyCursor"]);B(g,"_store",IDBObjectStore,["deleteIndex"]);function R(e){this._tx=e,this.complete=new Promise(function(t,r){e.oncomplete=function(){t()},e.onerror=function(){r(e.error)},e.onabort=function(){r(e.error)}})}R.prototype.objectStore=function(){return new g(this._tx.objectStore.apply(this._tx,arguments))};O(R,"_tx",["objectStoreNames","mode"]);B(R,"_tx",IDBTransaction,["abort"]);function V(e,t,r){this._db=e,this.oldVersion=t,this.transaction=new R(r)}V.prototype.createObjectStore=function(){return new g(this._db.createObjectStore.apply(this._db,arguments))};O(V,"_db",["name","version","objectStoreNames"]);B(V,"_db",IDBDatabase,["deleteObjectStore","close"]);function F(e){this._db=e}F.prototype.transaction=function(){return new R(this._db.transaction.apply(this._db,arguments))};O(F,"_db",["name","version","objectStoreNames"]);B(F,"_db",IDBDatabase,["close"]);["openCursor","openKeyCursor"].forEach(function(e){[g,E].forEach(function(t){e in t.prototype&&(t.prototype[e.replace("open","iterate")]=function(){var r=$e(arguments),n=r[r.length-1],i=this._store||this._index,o=i[e].apply(i,r.slice(0,-1));o.onsuccess=function(){n(o.result)}})})});[E,g].forEach(function(e){e.prototype.getAll||(e.prototype.getAll=function(t,r){var n=this,i=[];return new Promise(function(o){n.iterateCursor(t,function(s){if(!s){o(i);return}if(i.push(s.value),r!==void 0&&i.length==r){o(i);return}s.continue()})})})});function Y(e,t,r){var n=L(indexedDB,"open",[e,t]),i=n.request;return i&&(i.onupgradeneeded=function(o){r&&r(new V(i.result,o.oldVersion,i.transaction))}),n.then(function(o){return new F(o)})}function U(e){return L(indexedDB,"deleteDatabase",[e])}var _e="@firebase/installations",Se="0.4.32";/**
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
 */var Te=1e4,Ie="w:"+Se,Ee="FIS_v2",Je="https://firebaseinstallations.googleapis.com/v1",ze=60*60*1e3,Xe="installations",Ye="Installations";/**
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
 */var m,Qe=(m={},m["missing-app-config-values"]='Missing App configuration value: "{$valueName}"',m["not-registered"]="Firebase Installation is not registered.",m["installation-not-found"]="Firebase Installation not found.",m["request-failed"]='{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',m["app-offline"]="Could not process request. Application offline.",m["delete-pending-registration"]="Can't delete installation while there is a pending registration request.",m),w=new be(Xe,Ye,Qe);function Ce(e){return e instanceof He&&e.code.includes("request-failed")}/**
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
 */function Q(e){var t=e.projectId;return Je+"/projects/"+t+"/installations"}function Ae(e){return{token:e.token,requestStatus:2,expiresIn:Ze(e.expiresIn),creationTime:Date.now()}}function Z(e,t){return c(this,void 0,void 0,function(){var r,n;return l(this,function(i){switch(i.label){case 0:return[4,t.json()];case 1:return r=i.sent(),n=r.error,[2,w.create("request-failed",{requestName:e,serverCode:n.code,serverMessage:n.message,serverStatus:n.status})]}})})}function Oe(e){var t=e.apiKey;return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}function De(e,t){var r=t.refreshToken,n=Oe(e);return n.append("Authorization",et(r)),n}function ee(e){return c(this,void 0,void 0,function(){var t;return l(this,function(r){switch(r.label){case 0:return[4,e()];case 1:return t=r.sent(),t.status>=500&&t.status<600?[2,e()]:[2,t]}})})}function Ze(e){return Number(e.replace("s","000"))}function et(e){return Ee+" "+e}/**
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
 */function tt(e,t){var r=t.fid;return c(this,void 0,void 0,function(){var n,i,o,s,a,u,f;return l(this,function(d){switch(d.label){case 0:return n=Q(e),i=Oe(e),o={fid:r,authVersion:Ee,appId:e.appId,sdkVersion:Ie},s={method:"POST",headers:i,body:JSON.stringify(o)},[4,ee(function(){return fetch(n,s)})];case 1:return a=d.sent(),a.ok?[4,a.json()]:[3,3];case 2:return u=d.sent(),f={fid:u.fid||r,registrationStatus:2,refreshToken:u.refreshToken,authToken:Ae(u.authToken)},[2,f];case 3:return[4,Z("Create Installation",a)];case 4:throw d.sent()}})})}/**
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
 */function Me(e){return new Promise(function(t){setTimeout(t,e)})}/**
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
 */function rt(e){var t=btoa(String.fromCharCode.apply(String,we([],ye(e))));return t.replace(/\+/g,"-").replace(/\//g,"_")}/**
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
 */var nt=/^[cdef][\w-]{21}$/,J="";function it(){try{var e=new Uint8Array(17),t=self.crypto||self.msCrypto;t.getRandomValues(e),e[0]=112+e[0]%16;var r=ot(e);return nt.test(r)?r:J}catch{return J}}function ot(e){var t=rt(e);return t.substr(0,22)}/**
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
 */function D(e){return e.appName+"!"+e.appId}/**
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
 */var A=new Map;function Ne(e,t){var r=D(e);Pe(r,t),ut(r,t)}function st(e,t){Re();var r=D(e),n=A.get(r);n||(n=new Set,A.set(r,n)),n.add(t)}function at(e,t){var r=D(e),n=A.get(r);!n||(n.delete(t),n.size===0&&A.delete(r),xe())}function Pe(e,t){var r,n,i=A.get(e);if(!!i)try{for(var o=P(i),s=o.next();!s.done;s=o.next()){var a=s.value;a(t)}}catch(u){r={error:u}}finally{try{s&&!s.done&&(n=o.return)&&n.call(o)}finally{if(r)throw r.error}}}function ut(e,t){var r=Re();r&&r.postMessage({key:e,fid:t}),xe()}var k=null;function Re(){return!k&&"BroadcastChannel"in self&&(k=new BroadcastChannel("[Firebase] FID Change"),k.onmessage=function(e){Pe(e.data.key,e.data.fid)}),k}function xe(){A.size===0&&k&&(k.close(),k=null)}/**
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
 */var ct="firebase-installations-database",lt=1,S="firebase-installations-store",W=null;function te(){return W||(W=Y(ct,lt,function(e){switch(e.oldVersion){case 0:e.createObjectStore(S)}})),W}function j(e,t){return c(this,void 0,void 0,function(){var r,n,i,o,s;return l(this,function(a){switch(a.label){case 0:return r=D(e),[4,te()];case 1:return n=a.sent(),i=n.transaction(S,"readwrite"),o=i.objectStore(S),[4,o.get(r)];case 2:return s=a.sent(),[4,o.put(t,r)];case 3:return a.sent(),[4,i.complete];case 4:return a.sent(),(!s||s.fid!==t.fid)&&Ne(e,t.fid),[2,t]}})})}function re(e){return c(this,void 0,void 0,function(){var t,r,n;return l(this,function(i){switch(i.label){case 0:return t=D(e),[4,te()];case 1:return r=i.sent(),n=r.transaction(S,"readwrite"),[4,n.objectStore(S).delete(t)];case 2:return i.sent(),[4,n.complete];case 3:return i.sent(),[2]}})})}function x(e,t){return c(this,void 0,void 0,function(){var r,n,i,o,s,a;return l(this,function(u){switch(u.label){case 0:return r=D(e),[4,te()];case 1:return n=u.sent(),i=n.transaction(S,"readwrite"),o=i.objectStore(S),[4,o.get(r)];case 2:return s=u.sent(),a=t(s),a!==void 0?[3,4]:[4,o.delete(r)];case 3:return u.sent(),[3,6];case 4:return[4,o.put(a,r)];case 5:u.sent(),u.label=6;case 6:return[4,i.complete];case 7:return u.sent(),a&&(!s||s.fid!==a.fid)&&Ne(e,a.fid),[2,a]}})})}/**
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
 */function ne(e){return c(this,void 0,void 0,function(){var t,r,n;return l(this,function(i){switch(i.label){case 0:return[4,x(e,function(o){var s=ft(o),a=dt(e,s);return t=a.registrationPromise,a.installationEntry})];case 1:return r=i.sent(),r.fid!==J?[3,3]:(n={},[4,t]);case 2:return[2,(n.installationEntry=i.sent(),n)];case 3:return[2,{installationEntry:r,registrationPromise:t}]}})})}function ft(e){var t=e||{fid:it(),registrationStatus:0};return je(t)}function dt(e,t){if(t.registrationStatus===0){if(!navigator.onLine){var r=Promise.reject(w.create("app-offline"));return{installationEntry:t,registrationPromise:r}}var n={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},i=pt(e,n);return{installationEntry:n,registrationPromise:i}}else return t.registrationStatus===1?{installationEntry:t,registrationPromise:ht(e)}:{installationEntry:t}}function pt(e,t){return c(this,void 0,void 0,function(){var r,n;return l(this,function(i){switch(i.label){case 0:return i.trys.push([0,2,,7]),[4,tt(e,t)];case 1:return r=i.sent(),[2,j(e,r)];case 2:return n=i.sent(),Ce(n)&&n.customData.serverCode===409?[4,re(e)]:[3,4];case 3:return i.sent(),[3,6];case 4:return[4,j(e,{fid:t.fid,registrationStatus:0})];case 5:i.sent(),i.label=6;case 6:throw n;case 7:return[2]}})})}function ht(e){return c(this,void 0,void 0,function(){var t,r,n,i;return l(this,function(o){switch(o.label){case 0:return[4,le(e)];case 1:t=o.sent(),o.label=2;case 2:return t.registrationStatus!==1?[3,5]:[4,Me(100)];case 3:return o.sent(),[4,le(e)];case 4:return t=o.sent(),[3,2];case 5:return t.registrationStatus!==0?[3,7]:[4,ne(e)];case 6:return r=o.sent(),n=r.installationEntry,i=r.registrationPromise,i?[2,i]:[2,n];case 7:return[2,t]}})})}function le(e){return x(e,function(t){if(!t)throw w.create("installation-not-found");return je(t)})}function je(e){return vt(e)?{fid:e.fid,registrationStatus:0}:e}function vt(e){return e.registrationStatus===1&&e.registrationTime+Te<Date.now()}/**
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
 */function gt(e,t){var r=e.appConfig,n=e.platformLoggerProvider;return c(this,void 0,void 0,function(){var i,o,s,a,u,f,d,C;return l(this,function(y){switch(y.label){case 0:return i=bt(r,t),o=De(r,t),s=n.getImmediate({optional:!0}),s&&o.append("x-firebase-client",s.getPlatformInfoString()),a={installation:{sdkVersion:Ie}},u={method:"POST",headers:o,body:JSON.stringify(a)},[4,ee(function(){return fetch(i,u)})];case 1:return f=y.sent(),f.ok?[4,f.json()]:[3,3];case 2:return d=y.sent(),C=Ae(d),[2,C];case 3:return[4,Z("Generate Auth Token",f)];case 4:throw y.sent()}})})}function bt(e,t){var r=t.fid;return Q(e)+"/"+r+"/authTokens:generate"}/**
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
 */function ie(e,t){return t===void 0&&(t=!1),c(this,void 0,void 0,function(){var r,n,i,o;return l(this,function(s){switch(s.label){case 0:return[4,x(e.appConfig,function(a){if(!qe(a))throw w.create("not-registered");var u=a.authToken;if(!t&&mt(u))return a;if(u.requestStatus===1)return r=wt(e,t),a;if(!navigator.onLine)throw w.create("app-offline");var f=St(a);return r=yt(e,f),f})];case 1:return n=s.sent(),r?[4,r]:[3,3];case 2:return o=s.sent(),[3,4];case 3:o=n.authToken,s.label=4;case 4:return i=o,[2,i]}})})}function wt(e,t){return c(this,void 0,void 0,function(){var r,n;return l(this,function(i){switch(i.label){case 0:return[4,fe(e.appConfig)];case 1:r=i.sent(),i.label=2;case 2:return r.authToken.requestStatus!==1?[3,5]:[4,Me(100)];case 3:return i.sent(),[4,fe(e.appConfig)];case 4:return r=i.sent(),[3,2];case 5:return n=r.authToken,n.requestStatus===0?[2,ie(e,t)]:[2,n]}})})}function fe(e){return x(e,function(t){if(!qe(t))throw w.create("not-registered");var r=t.authToken;return Tt(r)?v(v({},t),{authToken:{requestStatus:0}}):t})}function yt(e,t){return c(this,void 0,void 0,function(){var r,i,n,i;return l(this,function(o){switch(o.label){case 0:return o.trys.push([0,3,,8]),[4,gt(e,t)];case 1:return r=o.sent(),i=v(v({},t),{authToken:r}),[4,j(e.appConfig,i)];case 2:return o.sent(),[2,r];case 3:return n=o.sent(),Ce(n)&&(n.customData.serverCode===401||n.customData.serverCode===404)?[4,re(e.appConfig)]:[3,5];case 4:return o.sent(),[3,7];case 5:return i=v(v({},t),{authToken:{requestStatus:0}}),[4,j(e.appConfig,i)];case 6:o.sent(),o.label=7;case 7:throw n;case 8:return[2]}})})}function qe(e){return e!==void 0&&e.registrationStatus===2}function mt(e){return e.requestStatus===2&&!kt(e)}function kt(e){var t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+ze}function St(e){var t={requestStatus:1,requestTime:Date.now()};return v(v({},e),{authToken:t})}function Tt(e){return e.requestStatus===1&&e.requestTime+Te<Date.now()}/**
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
 */function It(e){return c(this,void 0,void 0,function(){var t,r,n;return l(this,function(i){switch(i.label){case 0:return[4,ne(e.appConfig)];case 1:return t=i.sent(),r=t.installationEntry,n=t.registrationPromise,n?n.catch(console.error):ie(e).catch(console.error),[2,r.fid]}})})}/**
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
 */function Et(e,t){return t===void 0&&(t=!1),c(this,void 0,void 0,function(){var r;return l(this,function(n){switch(n.label){case 0:return[4,Ct(e.appConfig)];case 1:return n.sent(),[4,ie(e,t)];case 2:return r=n.sent(),[2,r.token]}})})}function Ct(e){return c(this,void 0,void 0,function(){var t;return l(this,function(r){switch(r.label){case 0:return[4,ne(e)];case 1:return t=r.sent().registrationPromise,t?[4,t]:[3,3];case 2:r.sent(),r.label=3;case 3:return[2]}})})}/**
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
 */function At(e,t){return c(this,void 0,void 0,function(){var r,n,i,o;return l(this,function(s){switch(s.label){case 0:return r=Ot(e,t),n=De(e,t),i={method:"DELETE",headers:n},[4,ee(function(){return fetch(r,i)})];case 1:return o=s.sent(),o.ok?[3,3]:[4,Z("Delete Installation",o)];case 2:throw s.sent();case 3:return[2]}})})}function Ot(e,t){var r=t.fid;return Q(e)+"/"+r}/**
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
 */function Dt(e){return c(this,void 0,void 0,function(){var t,r;return l(this,function(n){switch(n.label){case 0:return t=e.appConfig,[4,x(t,function(i){if(!(i&&i.registrationStatus===0))return i})];case 1:if(r=n.sent(),!r)return[3,6];if(r.registrationStatus!==1)return[3,2];throw w.create("delete-pending-registration");case 2:if(r.registrationStatus!==2)return[3,6];if(navigator.onLine)return[3,3];throw w.create("app-offline");case 3:return[4,At(t,r)];case 4:return n.sent(),[4,re(t)];case 5:n.sent(),n.label=6;case 6:return[2]}})})}/**
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
 */function Mt(e,t){var r=e.appConfig;return st(r,t),function(){at(r,t)}}/**
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
 */function Nt(e){var t,r;if(!e||!e.options)throw H("App Configuration");if(!e.name)throw H("App Name");var n=["projectId","apiKey","appId"];try{for(var i=P(n),o=i.next();!o.done;o=i.next()){var s=o.value;if(!e.options[s])throw H(s)}}catch(a){t={error:a}}finally{try{o&&!o.done&&(r=i.return)&&r.call(i)}finally{if(t)throw t.error}}return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}function H(e){return w.create("missing-app-config-values",{valueName:e})}/**
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
 */function Pt(e){var t="installations";e.INTERNAL.registerComponent(new ve(t,function(r){var n=r.getProvider("app").getImmediate(),i=Nt(n),o=r.getProvider("platform-logger"),s={appConfig:i,platformLoggerProvider:o},a={app:n,getId:function(){return It(s)},getToken:function(u){return Et(s,u)},delete:function(){return Dt(s)},onIdChange:function(u){return Mt(s,u)}};return a},"PUBLIC")),e.registerVersion(_e,Se)}Pt(ge);/**
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
 */var h,Rt=(h={},h["missing-app-config-values"]='Missing App configuration value: "{$valueName}"',h["only-available-in-window"]="This method is available in a Window context.",h["only-available-in-sw"]="This method is available in a service worker context.",h["permission-default"]="The notification permission was not granted and dismissed instead.",h["permission-blocked"]="The notification permission was not granted and blocked instead.",h["unsupported-browser"]="This browser doesn't support the API's required to use the firebase SDK.",h["failed-service-worker-registration"]="We are unable to register the default service worker. {$browserErrorMessage}",h["token-subscribe-failed"]="A problem occurred while subscribing the user to FCM: {$errorInfo}",h["token-subscribe-no-token"]="FCM returned no token when subscribing the user to push.",h["token-unsubscribe-failed"]="A problem occurred while unsubscribing the user from FCM: {$errorInfo}",h["token-update-failed"]="A problem occurred while updating the user from FCM: {$errorInfo}",h["token-update-no-token"]="FCM returned no token when updating the user to push.",h["use-sw-after-get-token"]="The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.",h["invalid-sw-registration"]="The input to useServiceWorker() must be a ServiceWorkerRegistration.",h["invalid-bg-handler"]="The input to setBackgroundMessageHandler() must be a function.",h["invalid-vapid-key"]="The public VAPID key must be a string.",h["use-vapid-key-after-get-token"]="The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used.",h),p=new be("messaging","Messaging",Rt);/**
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
 */var xt="/firebase-messaging-sw.js",jt="/firebase-cloud-messaging-push-scope",q="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",qt="https://fcmregistrations.googleapis.com/v1",Ke="FCM_MSG",Kt="FirebaseMessaging: ",Lt="google.c.a.e",Le="google.c.a.c_id",Bt="google.c.a.ts",Vt="google.c.a.c_l",Ft=1e3,Ut=3e3;/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */var T;(function(e){e.PUSH_RECEIVED="push-received",e.NOTIFICATION_CLICKED="notification-clicked"})(T||(T={}));/**
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
 */function b(e){var t=new Uint8Array(e),r=btoa(String.fromCharCode.apply(String,we([],ye(t))));return r.replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function Wt(e){for(var t="=".repeat((4-e.length%4)%4),r=(e+t).replace(/\-/g,"+").replace(/_/g,"/"),n=atob(r),i=new Uint8Array(n.length),o=0;o<n.length;++o)i[o]=n.charCodeAt(o);return i}/**
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
 */var $="fcm_token_details_db",Ht=5,de="fcm_token_object_Store";function $t(e){return c(this,void 0,void 0,function(){var t,r,n,i,o=this;return l(this,function(s){switch(s.label){case 0:return"databases"in indexedDB?[4,indexedDB.databases()]:[3,2];case 1:if(t=s.sent(),r=t.map(function(a){return a.name}),!r.includes($))return[2,null];s.label=2;case 2:return n=null,[4,Y($,Ht,function(a){return c(o,void 0,void 0,function(){var u,f,d,d,d,C;return l(this,function(y){switch(y.label){case 0:return a.oldVersion<2?[2]:a.objectStoreNames.contains(de)?(u=a.transaction.objectStore(de),[4,u.index("fcmSenderId").get(e)]):[2];case 1:return f=y.sent(),[4,u.clear()];case 2:if(y.sent(),!f)return[2];if(a.oldVersion===2){if(d=f,!d.auth||!d.p256dh||!d.endpoint)return[2];n={token:d.fcmToken,createTime:(C=d.createTime)!==null&&C!==void 0?C:Date.now(),subscriptionOptions:{auth:d.auth,p256dh:d.p256dh,endpoint:d.endpoint,swScope:d.swScope,vapidKey:typeof d.vapidKey=="string"?d.vapidKey:b(d.vapidKey)}}}else a.oldVersion===3?(d=f,n={token:d.fcmToken,createTime:d.createTime,subscriptionOptions:{auth:b(d.auth),p256dh:b(d.p256dh),endpoint:d.endpoint,swScope:d.swScope,vapidKey:b(d.vapidKey)}}):a.oldVersion===4&&(d=f,n={token:d.fcmToken,createTime:d.createTime,subscriptionOptions:{auth:b(d.auth),p256dh:b(d.p256dh),endpoint:d.endpoint,swScope:d.swScope,vapidKey:b(d.vapidKey)}});return[2]}})})})];case 3:return i=s.sent(),i.close(),[4,U($)];case 4:return s.sent(),[4,U("fcm_vapid_details_db")];case 5:return s.sent(),[4,U("undefined")];case 6:return s.sent(),[2,Gt(n)?n:null]}})})}function Gt(e){if(!e||!e.subscriptionOptions)return!1;var t=e.subscriptionOptions;return typeof e.createTime=="number"&&e.createTime>0&&typeof e.token=="string"&&e.token.length>0&&typeof t.auth=="string"&&t.auth.length>0&&typeof t.p256dh=="string"&&t.p256dh.length>0&&typeof t.endpoint=="string"&&t.endpoint.length>0&&typeof t.swScope=="string"&&t.swScope.length>0&&typeof t.vapidKey=="string"&&t.vapidKey.length>0}/**
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
 */var _t="firebase-messaging-database",Jt=1,I="firebase-messaging-store",G=null;function oe(){return G||(G=Y(_t,Jt,function(e){switch(e.oldVersion){case 0:e.createObjectStore(I)}})),G}function K(e){return c(this,void 0,void 0,function(){var t,r,n,i;return l(this,function(o){switch(o.label){case 0:return t=ae(e),[4,oe()];case 1:return r=o.sent(),[4,r.transaction(I).objectStore(I).get(t)];case 2:return n=o.sent(),n?[2,n]:[3,3];case 3:return[4,$t(e.appConfig.senderId)];case 4:return i=o.sent(),i?[4,se(e,i)]:[3,6];case 5:return o.sent(),[2,i];case 6:return[2]}})})}function se(e,t){return c(this,void 0,void 0,function(){var r,n,i;return l(this,function(o){switch(o.label){case 0:return r=ae(e),[4,oe()];case 1:return n=o.sent(),i=n.transaction(I,"readwrite"),[4,i.objectStore(I).put(t,r)];case 2:return o.sent(),[4,i.complete];case 3:return o.sent(),[2,t]}})})}function zt(e){return c(this,void 0,void 0,function(){var t,r,n;return l(this,function(i){switch(i.label){case 0:return t=ae(e),[4,oe()];case 1:return r=i.sent(),n=r.transaction(I,"readwrite"),[4,n.objectStore(I).delete(t)];case 2:return i.sent(),[4,n.complete];case 3:return i.sent(),[2]}})})}function ae(e){var t=e.appConfig;return t.appId}/**
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
 */function Xt(e,t){return c(this,void 0,void 0,function(){var r,n,i,o,s,a,u;return l(this,function(f){switch(f.label){case 0:return[4,ce(e)];case 1:r=f.sent(),n=Ve(t),i={method:"POST",headers:r,body:JSON.stringify(n)},f.label=2;case 2:return f.trys.push([2,5,,6]),[4,fetch(ue(e.appConfig),i)];case 3:return s=f.sent(),[4,s.json()];case 4:return o=f.sent(),[3,6];case 5:throw a=f.sent(),p.create("token-subscribe-failed",{errorInfo:a});case 6:if(o.error)throw u=o.error.message,p.create("token-subscribe-failed",{errorInfo:u});if(!o.token)throw p.create("token-subscribe-no-token");return[2,o.token]}})})}function Yt(e,t){return c(this,void 0,void 0,function(){var r,n,i,o,s,a,u;return l(this,function(f){switch(f.label){case 0:return[4,ce(e)];case 1:r=f.sent(),n=Ve(t.subscriptionOptions),i={method:"PATCH",headers:r,body:JSON.stringify(n)},f.label=2;case 2:return f.trys.push([2,5,,6]),[4,fetch(ue(e.appConfig)+"/"+t.token,i)];case 3:return s=f.sent(),[4,s.json()];case 4:return o=f.sent(),[3,6];case 5:throw a=f.sent(),p.create("token-update-failed",{errorInfo:a});case 6:if(o.error)throw u=o.error.message,p.create("token-update-failed",{errorInfo:u});if(!o.token)throw p.create("token-update-no-token");return[2,o.token]}})})}function Be(e,t){return c(this,void 0,void 0,function(){var r,n,i,o,s,a;return l(this,function(u){switch(u.label){case 0:return[4,ce(e)];case 1:r=u.sent(),n={method:"DELETE",headers:r},u.label=2;case 2:return u.trys.push([2,5,,6]),[4,fetch(ue(e.appConfig)+"/"+t,n)];case 3:return i=u.sent(),[4,i.json()];case 4:if(o=u.sent(),o.error)throw s=o.error.message,p.create("token-unsubscribe-failed",{errorInfo:s});return[3,6];case 5:throw a=u.sent(),p.create("token-unsubscribe-failed",{errorInfo:a});case 6:return[2]}})})}function ue(e){var t=e.projectId;return qt+"/projects/"+t+"/registrations"}function ce(e){var t=e.appConfig,r=e.installations;return c(this,void 0,void 0,function(){var n;return l(this,function(i){switch(i.label){case 0:return[4,r.getToken()];case 1:return n=i.sent(),[2,new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t.apiKey,"x-goog-firebase-installations-auth":"FIS "+n})]}})})}function Ve(e){var t=e.p256dh,r=e.auth,n=e.endpoint,i=e.vapidKey,o={web:{endpoint:n,auth:r,p256dh:t}};return i!==q&&(o.web.applicationPubKey=i),o}/**
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
 */var Qt=7*24*60*60*1e3;function z(e,t,r){return c(this,void 0,void 0,function(){var n,i,o,s;return l(this,function(a){switch(a.label){case 0:if(Notification.permission!=="granted")throw p.create("permission-blocked");return[4,er(t,r)];case 1:return n=a.sent(),[4,K(e)];case 2:return i=a.sent(),o={vapidKey:r,swScope:t.scope,endpoint:n.endpoint,auth:b(n.getKey("auth")),p256dh:b(n.getKey("p256dh"))},i?[3,3]:[2,pe(e,o)];case 3:if(tr(i.subscriptionOptions,o))return[3,8];a.label=4;case 4:return a.trys.push([4,6,,7]),[4,Be(e,i.token)];case 5:return a.sent(),[3,7];case 6:return s=a.sent(),console.warn(s),[3,7];case 7:return[2,pe(e,o)];case 8:return Date.now()>=i.createTime+Qt?[2,Zt({token:i.token,createTime:Date.now(),subscriptionOptions:o},e,t)]:[2,i.token];case 9:return[2]}})})}function M(e,t){return c(this,void 0,void 0,function(){var r,n;return l(this,function(i){switch(i.label){case 0:return[4,K(e)];case 1:return r=i.sent(),r?[4,Be(e,r.token)]:[3,4];case 2:return i.sent(),[4,zt(e)];case 3:i.sent(),i.label=4;case 4:return[4,t.pushManager.getSubscription()];case 5:return n=i.sent(),n?[2,n.unsubscribe()]:[2,!0]}})})}function Zt(e,t,r){return c(this,void 0,void 0,function(){var n,i,o;return l(this,function(s){switch(s.label){case 0:return s.trys.push([0,3,,5]),[4,Yt(t,e)];case 1:return n=s.sent(),i=v(v({},e),{token:n,createTime:Date.now()}),[4,se(t,i)];case 2:return s.sent(),[2,n];case 3:return o=s.sent(),[4,M(t,r)];case 4:throw s.sent(),o;case 5:return[2]}})})}function pe(e,t){return c(this,void 0,void 0,function(){var r,n;return l(this,function(i){switch(i.label){case 0:return[4,Xt(e,t)];case 1:return r=i.sent(),n={token:r,createTime:Date.now(),subscriptionOptions:t},[4,se(e,n)];case 2:return i.sent(),[2,n.token]}})})}function er(e,t){return c(this,void 0,void 0,function(){var r;return l(this,function(n){switch(n.label){case 0:return[4,e.pushManager.getSubscription()];case 1:return r=n.sent(),r?[2,r]:[2,e.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:Wt(t)})]}})})}function tr(e,t){var r=t.vapidKey===e.vapidKey,n=t.endpoint===e.endpoint,i=t.auth===e.auth,o=t.p256dh===e.p256dh;return r&&n&&i&&o}/**
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
 */function rr(e){var t={from:e.from,collapseKey:e.collapse_key,messageId:e.fcm_message_id};return nr(t,e),ir(t,e),or(t,e),t}function nr(e,t){if(!!t.notification){e.notification={};var r=t.notification.title;r&&(e.notification.title=r);var n=t.notification.body;n&&(e.notification.body=n);var i=t.notification.image;i&&(e.notification.image=i)}}function ir(e,t){!t.data||(e.data=t.data)}function or(e,t){if(!!t.fcmOptions){e.fcmOptions={};var r=t.fcmOptions.link;r&&(e.fcmOptions.link=r);var n=t.fcmOptions.analytics_label;n&&(e.fcmOptions.analyticsLabel=n)}}/**
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
 */function Fe(e){return typeof e=="object"&&!!e&&Le in e}/**
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
 */function he(e){return new Promise(function(t){setTimeout(t,e)})}/**
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
 */var sr=function(){function e(t){var r=this;this.firebaseDependencies=t,this.isOnBackgroundMessageUsed=null,this.vapidKey=null,this.bgMessageHandler=null,self.addEventListener("push",function(n){n.waitUntil(r.onPush(n))}),self.addEventListener("pushsubscriptionchange",function(n){n.waitUntil(r.onSubChange(n))}),self.addEventListener("notificationclick",function(n){n.waitUntil(r.onNotificationClick(n))})}return Object.defineProperty(e.prototype,"app",{get:function(){return this.firebaseDependencies.app},enumerable:!1,configurable:!0}),e.prototype.setBackgroundMessageHandler=function(t){if(this.isOnBackgroundMessageUsed=!1,!t||typeof t!="function")throw p.create("invalid-bg-handler");this.bgMessageHandler=t},e.prototype.onBackgroundMessage=function(t){var r=this;return this.isOnBackgroundMessageUsed=!0,this.bgMessageHandler=t,function(){r.bgMessageHandler=null}},e.prototype.getToken=function(){var t,r;return c(this,void 0,void 0,function(){var n;return l(this,function(i){switch(i.label){case 0:return this.vapidKey?[3,2]:[4,K(this.firebaseDependencies)];case 1:n=i.sent(),this.vapidKey=(r=(t=n==null?void 0:n.subscriptionOptions)===null||t===void 0?void 0:t.vapidKey)!==null&&r!==void 0?r:q,i.label=2;case 2:return[2,z(this.firebaseDependencies,self.registration,this.vapidKey)]}})})},e.prototype.deleteToken=function(){return M(this.firebaseDependencies,self.registration)},e.prototype.requestPermission=function(){throw p.create("only-available-in-window")},e.prototype.usePublicVapidKey=function(t){if(this.vapidKey!==null)throw p.create("use-vapid-key-after-get-token");if(typeof t!="string"||t.length===0)throw p.create("invalid-vapid-key");this.vapidKey=t},e.prototype.useServiceWorker=function(){throw p.create("only-available-in-window")},e.prototype.onMessage=function(){throw p.create("only-available-in-window")},e.prototype.onTokenRefresh=function(){throw p.create("only-available-in-window")},e.prototype.onPush=function(t){return c(this,void 0,void 0,function(){var r,n,i,o;return l(this,function(s){switch(s.label){case 0:return r=ur(t),r?[4,Ue()]:(console.debug(Kt+"failed to get parsed MessagePayload from the PushEvent. Skip handling the push."),[2]);case 1:return n=s.sent(),lr(n)?[2,fr(n,r)]:(i=!1,r.notification?[4,dr(ar(r))]:[3,3]);case 2:s.sent(),i=!0,s.label=3;case 3:return i===!0&&this.isOnBackgroundMessageUsed===!1?[2]:(this.bgMessageHandler&&(o=rr(r),typeof this.bgMessageHandler=="function"?this.bgMessageHandler(o):this.bgMessageHandler.next(o)),[4,he(Ft)]);case 4:return s.sent(),[2]}})})},e.prototype.onSubChange=function(t){var r,n;return c(this,void 0,void 0,function(){var i,o;return l(this,function(s){switch(s.label){case 0:return i=t.newSubscription,i?[3,2]:[4,M(this.firebaseDependencies,self.registration)];case 1:return s.sent(),[2];case 2:return[4,K(this.firebaseDependencies)];case 3:return o=s.sent(),[4,M(this.firebaseDependencies,self.registration)];case 4:return s.sent(),[4,z(this.firebaseDependencies,self.registration,(n=(r=o==null?void 0:o.subscriptionOptions)===null||r===void 0?void 0:r.vapidKey)!==null&&n!==void 0?n:q)];case 5:return s.sent(),[2]}})})},e.prototype.onNotificationClick=function(t){var r,n;return c(this,void 0,void 0,function(){var i,o,s,a,u;return l(this,function(f){switch(f.label){case 0:if(i=(n=(r=t.notification)===null||r===void 0?void 0:r.data)===null||n===void 0?void 0:n[Ke],i){if(t.action)return[2]}else return[2];return t.stopImmediatePropagation(),t.notification.close(),o=pr(i),o?(s=new URL(o,self.location.href),a=new URL(self.location.origin),s.host!==a.host?[2]:[4,cr(s)]):[2];case 1:return u=f.sent(),u?[3,4]:[4,self.clients.openWindow(o)];case 2:return u=f.sent(),[4,he(Ut)];case 3:return f.sent(),[3,6];case 4:return[4,u.focus()];case 5:u=f.sent(),f.label=6;case 6:return u?(i.messageType=T.NOTIFICATION_CLICKED,i.isFirebaseMessaging=!0,[2,u.postMessage(i)]):[2]}})})},e}();function ar(e){var t,r=v({},e.notification);return r.data=(t={},t[Ke]=e,t),r}function ur(e){var t=e.data;if(!t)return null;try{return t.json()}catch{return null}}function cr(e){return c(this,void 0,void 0,function(){var t,r,n,i,o,s,a;return l(this,function(u){switch(u.label){case 0:return[4,Ue()];case 1:t=u.sent();try{for(r=P(t),n=r.next();!n.done;n=r.next())if(i=n.value,o=new URL(i.url,self.location.href),e.host===o.host)return[2,i]}catch(f){s={error:f}}finally{try{n&&!n.done&&(a=r.return)&&a.call(r)}finally{if(s)throw s.error}}return[2,null]}})})}function lr(e){return e.some(function(t){return t.visibilityState==="visible"&&!t.url.startsWith("chrome-extension://")})}function fr(e,t){var r,n;t.isFirebaseMessaging=!0,t.messageType=T.PUSH_RECEIVED;try{for(var i=P(e),o=i.next();!o.done;o=i.next()){var s=o.value;s.postMessage(t)}}catch(a){r={error:a}}finally{try{o&&!o.done&&(n=i.return)&&n.call(i)}finally{if(r)throw r.error}}}function Ue(){return self.clients.matchAll({type:"window",includeUncontrolled:!0})}function dr(e){var t,r=e.actions,n=Notification.maxActions;return r&&n&&r.length>n&&console.warn("This browser only supports "+n+" actions. The remaining actions will not be displayed."),self.registration.showNotification((t=e.title)!==null&&t!==void 0?t:"",e)}function pr(e){var t,r,n,i=(r=(t=e.fcmOptions)===null||t===void 0?void 0:t.link)!==null&&r!==void 0?r:(n=e.notification)===null||n===void 0?void 0:n.click_action;return i||(Fe(e.data)?self.location.origin:null)}/**
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
 */var hr=function(){function e(t){var r=this;this.firebaseDependencies=t,this.vapidKey=null,this.onMessageCallback=null,navigator.serviceWorker.addEventListener("message",function(n){return r.messageEventListener(n)})}return Object.defineProperty(e.prototype,"app",{get:function(){return this.firebaseDependencies.app},enumerable:!1,configurable:!0}),e.prototype.messageEventListener=function(t){return c(this,void 0,void 0,function(){var r,n;return l(this,function(i){switch(i.label){case 0:return r=t.data,r.isFirebaseMessaging?(this.onMessageCallback&&r.messageType===T.PUSH_RECEIVED&&(typeof this.onMessageCallback=="function"?this.onMessageCallback(gr(Object.assign({},r))):this.onMessageCallback.next(Object.assign({},r))),n=r.data,Fe(n)&&n[Lt]==="1"?[4,this.logEvent(r.messageType,n)]:[3,2]):[2];case 1:i.sent(),i.label=2;case 2:return[2]}})})},e.prototype.getVapidKey=function(){return this.vapidKey},e.prototype.getSwReg=function(){return this.swRegistration},e.prototype.getToken=function(t){return c(this,void 0,void 0,function(){return l(this,function(r){switch(r.label){case 0:return Notification.permission!=="default"?[3,2]:[4,Notification.requestPermission()];case 1:r.sent(),r.label=2;case 2:if(Notification.permission!=="granted")throw p.create("permission-blocked");return[4,this.updateVapidKey(t==null?void 0:t.vapidKey)];case 3:return r.sent(),[4,this.updateSwReg(t==null?void 0:t.serviceWorkerRegistration)];case 4:return r.sent(),[2,z(this.firebaseDependencies,this.swRegistration,this.vapidKey)]}})})},e.prototype.updateVapidKey=function(t){return c(this,void 0,void 0,function(){return l(this,function(r){return t?this.vapidKey=t:this.vapidKey||(this.vapidKey=q),[2]})})},e.prototype.updateSwReg=function(t){return c(this,void 0,void 0,function(){return l(this,function(r){switch(r.label){case 0:return!t&&!this.swRegistration?[4,this.registerDefaultSw()]:[3,2];case 1:r.sent(),r.label=2;case 2:if(!t&&!!this.swRegistration)return[2];if(!(t instanceof ServiceWorkerRegistration))throw p.create("invalid-sw-registration");return this.swRegistration=t,[2]}})})},e.prototype.registerDefaultSw=function(){return c(this,void 0,void 0,function(){var t,r;return l(this,function(n){switch(n.label){case 0:return n.trys.push([0,2,,3]),t=this,[4,navigator.serviceWorker.register(xt,{scope:jt})];case 1:return t.swRegistration=n.sent(),this.swRegistration.update().catch(function(){}),[3,3];case 2:throw r=n.sent(),p.create("failed-service-worker-registration",{browserErrorMessage:r.message});case 3:return[2]}})})},e.prototype.deleteToken=function(){return c(this,void 0,void 0,function(){return l(this,function(t){switch(t.label){case 0:return this.swRegistration?[3,2]:[4,this.registerDefaultSw()];case 1:t.sent(),t.label=2;case 2:return[2,M(this.firebaseDependencies,this.swRegistration)]}})})},e.prototype.requestPermission=function(){return c(this,void 0,void 0,function(){var t;return l(this,function(r){switch(r.label){case 0:return Notification.permission==="granted"?[2]:[4,Notification.requestPermission()];case 1:if(t=r.sent(),t==="granted")return[2];throw t==="denied"?p.create("permission-blocked"):p.create("permission-default")}})})},e.prototype.usePublicVapidKey=function(t){if(this.vapidKey!==null)throw p.create("use-vapid-key-after-get-token");if(typeof t!="string"||t.length===0)throw p.create("invalid-vapid-key");this.vapidKey=t},e.prototype.useServiceWorker=function(t){if(!(t instanceof ServiceWorkerRegistration))throw p.create("invalid-sw-registration");if(this.swRegistration)throw p.create("use-sw-after-get-token");this.swRegistration=t},e.prototype.onMessage=function(t){var r=this;return this.onMessageCallback=t,function(){r.onMessageCallback=null}},e.prototype.setBackgroundMessageHandler=function(){throw p.create("only-available-in-sw")},e.prototype.onBackgroundMessage=function(){throw p.create("only-available-in-sw")},e.prototype.onTokenRefresh=function(){return function(){}},e.prototype.logEvent=function(t,r){return c(this,void 0,void 0,function(){var n,i;return l(this,function(o){switch(o.label){case 0:return n=vr(t),[4,this.firebaseDependencies.analyticsProvider.get()];case 1:return i=o.sent(),i.logEvent(n,{message_id:r[Le],message_name:r[Vt],message_time:r[Bt],message_device_time:Math.floor(Date.now()/1e3)}),[2]}})})},e}();function vr(e){switch(e){case T.NOTIFICATION_CLICKED:return"notification_open";case T.PUSH_RECEIVED:return"notification_foreground";default:throw new Error}}function gr(e){return delete e.messageType,delete e.isFirebaseMessaging,e}/**
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
 */function br(e){var t,r;if(!e||!e.options)throw _("App Configuration Object");if(!e.name)throw _("App Name");var n=["projectId","apiKey","appId","messagingSenderId"],i=e.options;try{for(var o=P(n),s=o.next();!s.done;s=o.next()){var a=s.value;if(!i[a])throw _(a)}}catch(u){t={error:u}}finally{try{s&&!s.done&&(r=o.return)&&r.call(o)}finally{if(t)throw t.error}}return{appName:e.name,projectId:i.projectId,apiKey:i.apiKey,appId:i.appId,senderId:i.messagingSenderId}}function _(e){return p.create("missing-app-config-values",{valueName:e})}/**
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
 */var wr="messaging";function yr(e){var t=e.getProvider("app").getImmediate(),r=br(t),n=e.getProvider("installations").getImmediate(),i=e.getProvider("analytics-internal"),o={app:t,appConfig:r,installations:n,analyticsProvider:i};if(!We())throw p.create("unsupported-browser");return self&&"ServiceWorkerGlobalScope"in self?new sr(o):new hr(o)}var mr={isSupported:We};ge.INTERNAL.registerComponent(new ve(wr,yr,"PUBLIC").setServiceProps(mr));function We(){return self&&"ServiceWorkerGlobalScope"in self?Sr():kr()}function kr(){return"indexedDB"in window&&indexedDB!==null&&navigator.cookieEnabled&&"serviceWorker"in navigator&&"PushManager"in window&&"Notification"in window&&"fetch"in window&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}function Sr(){return"indexedDB"in self&&indexedDB!==null&&"PushManager"in self&&"Notification"in self&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}
