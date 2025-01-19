import{aa as No,i as ko,ab as Po}from"./app.2982e019.js";import{_ as ee,a as P,b as p,s as x,D as W,c as $,d as Te,i as Ao,e as xo,g as Oo,h as sn,j as $r,k as rt,l as an,m as _t,n as K,q as Do,o as Nn,p as B,v as y,r as D,L as Lo,t as Mo,S as Fo,u as Wo,w as Me,x as Uo,y as Xr,z as Bo,A as Qo,B as Pt,C as V,E as cr,F as Jr,f as _e,G as Go,H as Vo,P as Ho,I as jo,J as Yo}from"./index.esm.8fcef60c.js";import"./index.esm.7ce161a7.js";import{N as zo,a as qo}from"./NotiUnRegisterHolder.eefb692e.js";import{P as Qe}from"./ps_constants.0e2a11f9.js";var Ko="@firebase/database",$o="0.11.0";/**
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
 */var Zr="";function ei(t){Zr=t}/**
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
 */var Xo=function(){function t(e){this.domStorage_=e,this.prefix_="firebase:"}return t.prototype.set=function(e,n){n==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),x(n))},t.prototype.get=function(e){var n=this.domStorage_.getItem(this.prefixedName_(e));return n==null?null:Nn(n)},t.prototype.remove=function(e){this.domStorage_.removeItem(this.prefixedName_(e))},t.prototype.prefixedName_=function(e){return this.prefix_+e},t.prototype.toString=function(){return this.domStorage_.toString()},t}();/**
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
 */var Jo=function(){function t(){this.cache_={},this.isInMemoryStorage=!0}return t.prototype.set=function(e,n){n==null?delete this.cache_[e]:this.cache_[e]=n},t.prototype.get=function(e){return $(this.cache_,e)?this.cache_[e]:null},t.prototype.remove=function(e){delete this.cache_[e]},t}();/**
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
 */var ti=function(t){try{if(typeof window!="undefined"&&typeof window[t]!="undefined"){var e=window[t];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new Xo(e)}}catch{}return new Jo},me=ti("localStorage"),un=ti("sessionStorage");/**
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
 */var Pe=new Lo("@firebase/database"),ni=function(){var t=1;return function(){return t++}}(),ri=function(t){var e=Mo(t),n=new Fo;n.update(e);var r=n.digest();return Wo.encodeByteArray(r)},it=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];for(var n="",r=0;r<t.length;r++){var i=t[r];Array.isArray(i)||i&&typeof i=="object"&&typeof i.length=="number"?n+=it.apply(null,i):typeof i=="object"?n+=x(i):n+=i,n+=" "}return n},Ee=null,fr=!0,ii=function(t,e){p(!e||t===!0||t===!1,"Can't turn on custom loggers persistently."),t===!0?(Pe.logLevel=Go.VERBOSE,Ee=Pe.log.bind(Pe),e&&un.set("logging_enabled",!0)):typeof t=="function"?Ee=t:(Ee=null,un.remove("logging_enabled"))},L=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];if(fr===!0&&(fr=!1,Ee===null&&un.get("logging_enabled")===!0&&ii(!0)),Ee){var n=it.apply(null,t);Ee(n)}},ot=function(t){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];L.apply(void 0,Me([t],K(e)))}},ln=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var n="FIREBASE INTERNAL ERROR: "+it.apply(void 0,Me([],K(t)));Pe.error(n)},te=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var n="FIREBASE FATAL ERROR: "+it.apply(void 0,Me([],K(t)));throw Pe.error(n),new Error(n)},M=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var n="FIREBASE WARNING: "+it.apply(void 0,Me([],K(t)));Pe.warn(n)},Zo=function(){typeof window!="undefined"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&M("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},At=function(t){return typeof t=="number"&&(t!==t||t===Number.POSITIVE_INFINITY||t===Number.NEGATIVE_INFINITY)},es=function(t){if(document.readyState==="complete")t();else{var e=!1,n=function(){if(!document.body){setTimeout(n,Math.floor(10));return}e||(e=!0,t())};document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",function(){document.readyState==="complete"&&n()}),window.attachEvent("onload",n))}},ae="[MIN_NAME]",ne="[MAX_NAME]",be=function(t,e){if(t===e)return 0;if(t===ae||e===ne)return-1;if(e===ae||t===ne)return 1;var n=gt(t),r=gt(e);return n!==null?r!==null?n-r===0?t.length-e.length:n-r:-1:r!==null?1:t<e?-1:1},ts=function(t,e){return t===e?0:t<e?-1:1},Ge=function(t,e){if(e&&t in e)return e[t];throw new Error("Missing required key ("+t+") in object: "+x(e))},kn=function(t){if(typeof t!="object"||t===null)return x(t);var e=[];for(var n in t)e.push(n);e.sort();for(var r="{",i=0;i<e.length;i++)i!==0&&(r+=","),r+=x(e[i]),r+=":",r+=kn(t[e[i]]);return r+="}",r},oi=function(t,e){var n=t.length;if(n<=e)return[t];for(var r=[],i=0;i<n;i+=e)i+e>n?r.push(t.substring(i,n)):r.push(t.substring(i,i+e));return r};function O(t,e){for(var n in t)t.hasOwnProperty(n)&&e(n,t[n])}var si=function(t){p(!At(t),"Invalid JSON number");var e=11,n=52,r=(1<<e-1)-1,i,o,s,a,u;t===0?(o=0,s=0,i=1/t===-1/0?1:0):(i=t<0,t=Math.abs(t),t>=Math.pow(2,1-r)?(a=Math.min(Math.floor(Math.log(t)/Math.LN2),r),o=a+r,s=Math.round(t*Math.pow(2,n-a)-Math.pow(2,n))):(o=0,s=Math.round(t/Math.pow(2,1-r-n))));var l=[];for(u=n;u;u-=1)l.push(s%2?1:0),s=Math.floor(s/2);for(u=e;u;u-=1)l.push(o%2?1:0),o=Math.floor(o/2);l.push(i?1:0),l.reverse();var c=l.join(""),f="";for(u=0;u<64;u+=8){var h=parseInt(c.substr(u,8),2).toString(16);h.length===1&&(h="0"+h),f=f+h}return f.toLowerCase()},ns=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},rs=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function is(t,e){var n="Unknown Error";t==="too_big"?n="The data requested exceeds the maximum size that can be accessed with a single request.":t==="permission_denied"?n="Client doesn't have permission to access the desired data.":t==="unavailable"&&(n="The service is unavailable");var r=new Error(t+" at "+e._path.toString()+": "+n);return r.code=t.toUpperCase(),r}var os=new RegExp("^-?(0*)\\d{1,10}$"),ai=-2147483648,Pn=2147483647,gt=function(t){if(os.test(t)){var e=Number(t);if(e>=ai&&e<=Pn)return e}return null},Fe=function(t){try{t()}catch(e){setTimeout(function(){var n=e.stack||"";throw M("Exception was thrown by user callback.",n),e},Math.floor(0))}},ss=function(){var t=typeof window=="object"&&window.navigator&&window.navigator.userAgent||"";return t.search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},Ye=function(t,e){var n=setTimeout(t,e);return typeof n=="object"&&n.unref&&n.unref(),n};/**
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
 */var as=function(){function t(e,n){var r=this;this.appName_=e,this.appCheckProvider=n,this.appCheck=n==null?void 0:n.getImmediate({optional:!0}),this.appCheck||n==null||n.get().then(function(i){return r.appCheck=i})}return t.prototype.getToken=function(e){var n=this;return this.appCheck?this.appCheck.getToken(e):new Promise(function(r,i){setTimeout(function(){n.appCheck?n.getToken(e).then(r,i):r(null)},0)})},t.prototype.addTokenChangeListener=function(e){var n;(n=this.appCheckProvider)===null||n===void 0||n.get().then(function(r){return r.addTokenListener(e)})},t.prototype.notifyForInvalidToken=function(){M('Provided AppCheck credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly.')},t}();/**
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
 */var us=function(){function t(e,n,r){var i=this;this.appName_=e,this.firebaseOptions_=n,this.authProvider_=r,this.auth_=null,this.auth_=r.getImmediate({optional:!0}),this.auth_||r.onInit(function(o){return i.auth_=o})}return t.prototype.getToken=function(e){var n=this;return this.auth_?this.auth_.getToken(e).catch(function(r){return r&&r.code==="auth/token-not-initialized"?(L("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(r)}):new Promise(function(r,i){setTimeout(function(){n.auth_?n.getToken(e).then(r,i):r(null)},0)})},t.prototype.addTokenChangeListener=function(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(function(n){return n.addAuthTokenListener(e)})},t.prototype.removeTokenChangeListener=function(e){this.authProvider_.get().then(function(n){return n.removeAuthTokenListener(e)})},t.prototype.notifyForInvalidToken=function(){var e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',M(e)},t}(),ze=function(){function t(e){this.accessToken=e}return t.prototype.getToken=function(e){return Promise.resolve({accessToken:this.accessToken})},t.prototype.addTokenChangeListener=function(e){e(this.accessToken)},t.prototype.removeTokenChangeListener=function(e){},t.prototype.notifyForInvalidToken=function(){},t.OWNER="owner",t}();/**
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
 */var An="5",ui="v",li="s",ci="r",fi="f",hi=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,di="ls",ls="p",cn="ac",pi="websocket",vi="long_polling";/**
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
 */var xn=function(){function t(e,n,r,i,o,s,a){o===void 0&&(o=!1),s===void 0&&(s=""),a===void 0&&(a=!1),this.secure=n,this.namespace=r,this.webSocketOnly=i,this.nodeAdmin=o,this.persistenceKey=s,this.includeNamespaceInQueryParams=a,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=me.get("host:"+e)||this._host}return t.prototype.isCacheableHost=function(){return this.internalHost.substr(0,2)==="s-"},t.prototype.isCustomHost=function(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"},Object.defineProperty(t.prototype,"host",{get:function(){return this._host},set:function(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&me.set("host:"+this._host,this.internalHost))},enumerable:!1,configurable:!0}),t.prototype.toString=function(){var e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e},t.prototype.toURLString=function(){var e=this.secure?"https://":"http://",n=this.includeNamespaceInQueryParams?"?ns="+this.namespace:"";return""+e+this.host+"/"+n},t}();function cs(t){return t.host!==t.internalHost||t.isCustomHost()||t.includeNamespaceInQueryParams}function _i(t,e,n){p(typeof e=="string","typeof type must == string"),p(typeof n=="object","typeof params must == object");var r;if(e===pi)r=(t.secure?"wss://":"ws://")+t.internalHost+"/.ws?";else if(e===vi)r=(t.secure?"https://":"http://")+t.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);cs(t)&&(n.ns=t.namespace);var i=[];return O(n,function(o,s){i.push(o+"="+s)}),r+i.join("&")}/**
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
 */var fs=function(){function t(){this.counters_={}}return t.prototype.incrementCounter=function(e,n){n===void 0&&(n=1),$(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=n},t.prototype.get=function(){return Yo(this.counters_)},t}();/**
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
 */var Jt={},Zt={};function On(t){var e=t.toString();return Jt[e]||(Jt[e]=new fs),Jt[e]}function hs(t,e){var n=t.toString();return Zt[n]||(Zt[n]=e()),Zt[n]}/**
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
 */var ds=function(){function t(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}return t.prototype.closeAfter=function(e,n){this.closeAfterResponse=e,this.onClose=n,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)},t.prototype.handleResponse=function(e,n){var r=this;this.pendingResponses[e]=n;for(var i=function(){var a=o.pendingResponses[o.currentResponseNum];delete o.pendingResponses[o.currentResponseNum];for(var u=function(c){a[c]&&Fe(function(){r.onMessage_(a[c])})},l=0;l<a.length;++l)u(l);if(o.currentResponseNum===o.closeAfterResponse)return o.onClose&&(o.onClose(),o.onClose=null),"break";o.currentResponseNum++},o=this;this.pendingResponses[this.currentResponseNum];){var s=i();if(s==="break")break}},t}();/**
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
 */var hr="start",ps="close",vs="pLPCommand",_s="pRTLPCB",gi="id",yi="pw",mi="ser",gs="cb",ys="seg",ms="ts",Cs="d",Es="dframe",Ci=1870,Ei=30,ws=Ci-Ei,Ts=25e3,Ss=3e4,Dn=function(){function t(e,n,r,i,o,s,a){var u=this;this.connId=e,this.repoInfo=n,this.applicationId=r,this.appCheckToken=i,this.authToken=o,this.transportSessionId=s,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=ot(e),this.stats_=On(n),this.urlFn=function(l){return u.appCheckToken&&(l[cn]=u.appCheckToken),_i(n,vi,l)}}return t.prototype.open=function(e,n){var r=this;this.curSegmentNum=0,this.onDisconnect_=n,this.myPacketOrderer=new ds(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(function(){r.log_("Timed out trying to connect."),r.onClosed_(),r.connectTimeoutTimer_=null},Math.floor(Ss)),es(function(){if(!r.isClosed_){r.scriptTagHolder=new Is(function(){for(var s=[],a=0;a<arguments.length;a++)s[a]=arguments[a];var u=K(s,5),l=u[0],c=u[1],f=u[2];if(u[3],u[4],r.incrementIncomingBytes_(s),!!r.scriptTagHolder)if(r.connectTimeoutTimer_&&(clearTimeout(r.connectTimeoutTimer_),r.connectTimeoutTimer_=null),r.everConnected_=!0,l===hr)r.id=c,r.password=f;else if(l===ps)c?(r.scriptTagHolder.sendNewPolls=!1,r.myPacketOrderer.closeAfter(c,function(){r.onClosed_()})):r.onClosed_();else throw new Error("Unrecognized command received: "+l)},function(){for(var s=[],a=0;a<arguments.length;a++)s[a]=arguments[a];var u=K(s,2),l=u[0],c=u[1];r.incrementIncomingBytes_(s),r.myPacketOrderer.handleResponse(l,c)},function(){r.onClosed_()},r.urlFn);var i={};i[hr]="t",i[mi]=Math.floor(Math.random()*1e8),r.scriptTagHolder.uniqueCallbackIdentifier&&(i[gs]=r.scriptTagHolder.uniqueCallbackIdentifier),i[ui]=An,r.transportSessionId&&(i[li]=r.transportSessionId),r.lastSessionId&&(i[di]=r.lastSessionId),r.applicationId&&(i[ls]=r.applicationId),r.appCheckToken&&(i[cn]=r.appCheckToken),typeof location!="undefined"&&location.hostname&&hi.test(location.hostname)&&(i[ci]=fi);var o=r.urlFn(i);r.log_("Connecting via long-poll to "+o),r.scriptTagHolder.addTag(o,function(){})}})},t.prototype.start=function(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)},t.forceAllow=function(){t.forceAllow_=!0},t.forceDisallow=function(){t.forceDisallow_=!0},t.isAvailable=function(){return t.forceAllow_?!0:!t.forceDisallow_&&typeof document!="undefined"&&document.createElement!=null&&!ns()&&!rs()},t.prototype.markConnectionHealthy=function(){},t.prototype.shutdown_=function(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)},t.prototype.onClosed_=function(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))},t.prototype.close=function(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())},t.prototype.send=function(e){var n=x(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);for(var r=Uo(n),i=oi(r,ws),o=0;o<i.length;o++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,i.length,i[o]),this.curSegmentNum++},t.prototype.addDisconnectPingFrame=function(e,n){this.myDisconnFrame=document.createElement("iframe");var r={};r[Es]="t",r[gi]=e,r[yi]=n,this.myDisconnFrame.src=this.urlFn(r),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)},t.prototype.incrementIncomingBytes_=function(e){var n=x(e).length;this.bytesReceived+=n,this.stats_.incrementCounter("bytes_received",n)},t}(),Is=function(){function t(e,n,r,i){this.onDisconnect=r,this.urlFn=i,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=ni(),window[vs+this.uniqueCallbackIdentifier]=e,window[_s+this.uniqueCallbackIdentifier]=n,this.myIFrame=t.createIFrame_();var o="";if(this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"){var s=document.domain;o='<script>document.domain="'+s+'";<\/script>'}var a="<html><body>"+o+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(a),this.myIFrame.doc.close()}catch(u){L("frame writing exception"),u.stack&&L(u.stack),L(u)}}}return t.createIFrame_=function(){var e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{var n=e.contentWindow.document;n||L("No IE domain setting required")}catch{var r=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+r+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e},t.prototype.close=function(){var e=this;this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.innerHTML="",setTimeout(function(){e.myIFrame!==null&&(document.body.removeChild(e.myIFrame),e.myIFrame=null)},Math.floor(0)));var n=this.onDisconnect;n&&(this.onDisconnect=null,n())},t.prototype.startLongPoll=function(e,n){for(this.myID=e,this.myPW=n,this.alive=!0;this.newRequest_(););},t.prototype.newRequest_=function(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;var e={};e[gi]=this.myID,e[yi]=this.myPW,e[mi]=this.currentSerial;for(var n=this.urlFn(e),r="",i=0;this.pendingSegs.length>0;){var o=this.pendingSegs[0];if(o.d.length+Ei+r.length<=Ci){var s=this.pendingSegs.shift();r=r+"&"+ys+i+"="+s.seg+"&"+ms+i+"="+s.ts+"&"+Cs+i+"="+s.d,i++}else break}return n=n+r,this.addLongPollTag_(n,this.currentSerial),!0}else return!1},t.prototype.enqueueSegment=function(e,n,r){this.pendingSegs.push({seg:e,ts:n,d:r}),this.alive&&this.newRequest_()},t.prototype.addLongPollTag_=function(e,n){var r=this;this.outstandingRequests.add(n);var i=function(){r.outstandingRequests.delete(n),r.newRequest_()},o=setTimeout(i,Math.floor(Ts)),s=function(){clearTimeout(o),i()};this.addTag(e,s)},t.prototype.addTag=function(e,n){var r=this;setTimeout(function(){try{if(!r.sendNewPolls)return;var i=r.myIFrame.doc.createElement("script");i.type="text/javascript",i.async=!0,i.src=e,i.onload=i.onreadystatechange=function(){var o=i.readyState;(!o||o==="loaded"||o==="complete")&&(i.onload=i.onreadystatechange=null,i.parentNode&&i.parentNode.removeChild(i),n())},i.onerror=function(){L("Long-poll script failed to load: "+e),r.sendNewPolls=!1,r.close()},r.myIFrame.doc.body.appendChild(i)}catch{}},Math.floor(1))},t}();/**
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
 */var bs=16384,Rs=45e3,yt=null;typeof MozWebSocket!="undefined"?yt=MozWebSocket:typeof WebSocket!="undefined"&&(yt=WebSocket);var ye=function(){function t(e,n,r,i,o,s,a){this.connId=e,this.applicationId=r,this.appCheckToken=i,this.authToken=o,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=ot(this.connId),this.stats_=On(n),this.connURL=t.connectionURL_(n,s,a,i),this.nodeAdmin=n.nodeAdmin}return t.connectionURL_=function(e,n,r,i){var o={};return o[ui]=An,typeof location!="undefined"&&location.hostname&&hi.test(location.hostname)&&(o[ci]=fi),n&&(o[li]=n),r&&(o[di]=r),i&&(o[cn]=i),_i(e,pi,o)},t.prototype.open=function(e,n){var r=this;this.onDisconnect=n,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,me.set("previous_websocket_failure",!0);try{var i,o,s,a;if(!Xr()){var o={headers:{"X-Firebase-GMPID":this.applicationId||"","X-Firebase-AppCheck":this.appCheckToken||""}};this.mySock=new yt(this.connURL,[],o)}}catch(l){this.log_("Error instantiating WebSocket.");var u=l.message||l.data;u&&this.log_(u),this.onClosed_();return}this.mySock.onopen=function(){r.log_("Websocket connected."),r.everConnected_=!0},this.mySock.onclose=function(){r.log_("Websocket connection was disconnected."),r.mySock=null,r.onClosed_()},this.mySock.onmessage=function(l){r.handleIncomingFrame(l)},this.mySock.onerror=function(l){r.log_("WebSocket error.  Closing connection.");var c=l.message||l.data;c&&r.log_(c),r.onClosed_()}},t.prototype.start=function(){},t.forceDisallow=function(){t.forceDisallow_=!0},t.isAvailable=function(){var e=!1;if(typeof navigator!="undefined"&&navigator.userAgent){var n=/Android ([0-9]{0,}\.[0-9]{0,})/,r=navigator.userAgent.match(n);r&&r.length>1&&parseFloat(r[1])<4.4&&(e=!0)}return!e&&yt!==null&&!t.forceDisallow_},t.previouslyFailed=function(){return me.isInMemoryStorage||me.get("previous_websocket_failure")===!0},t.prototype.markConnectionHealthy=function(){me.remove("previous_websocket_failure")},t.prototype.appendFrame_=function(e){if(this.frames.push(e),this.frames.length===this.totalFrames){var n=this.frames.join("");this.frames=null;var r=Nn(n);this.onMessage(r)}},t.prototype.handleNewFrameCount_=function(e){this.totalFrames=e,this.frames=[]},t.prototype.extractFrameCount_=function(e){if(p(this.frames===null,"We already have a frame buffer"),e.length<=6){var n=Number(e);if(!isNaN(n))return this.handleNewFrameCount_(n),null}return this.handleNewFrameCount_(1),e},t.prototype.handleIncomingFrame=function(e){if(this.mySock!==null){var n=e.data;if(this.bytesReceived+=n.length,this.stats_.incrementCounter("bytes_received",n.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(n);else{var r=this.extractFrameCount_(n);r!==null&&this.appendFrame_(r)}}},t.prototype.send=function(e){this.resetKeepAlive();var n=x(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);var r=oi(n,bs);r.length>1&&this.sendString_(String(r.length));for(var i=0;i<r.length;i++)this.sendString_(r[i])},t.prototype.shutdown_=function(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)},t.prototype.onClosed_=function(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))},t.prototype.close=function(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())},t.prototype.resetKeepAlive=function(){var e=this;clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(function(){e.mySock&&e.sendString_("0"),e.resetKeepAlive()},Math.floor(Rs))},t.prototype.sendString_=function(e){try{this.mySock.send(e)}catch(n){this.log_("Exception thrown from WebSocket.send():",n.message||n.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}},t.responsesRequiredToBeHealthy=2,t.healthyTimeout=3e4,t}();/**
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
 */var Ns=function(){function t(e){this.initTransports_(e)}return Object.defineProperty(t,"ALL_TRANSPORTS",{get:function(){return[Dn,ye]},enumerable:!1,configurable:!0}),t.prototype.initTransports_=function(e){var n,r,i=ye&&ye.isAvailable(),o=i&&!ye.previouslyFailed();if(e.webSocketOnly&&(i||M("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),o=!0),o)this.transports_=[ye];else{var s=this.transports_=[];try{for(var a=ee(t.ALL_TRANSPORTS),u=a.next();!u.done;u=a.next()){var l=u.value;l&&l.isAvailable()&&s.push(l)}}catch(c){n={error:c}}finally{try{u&&!u.done&&(r=a.return)&&r.call(a)}finally{if(n)throw n.error}}}},t.prototype.initialTransport=function(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")},t.prototype.upgradeTransport=function(){return this.transports_.length>1?this.transports_[1]:null},t}();/**
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
 */var ks=6e4,Ps=5e3,As=10*1024,xs=100*1024,en="t",dr="d",Os="s",pr="r",Ds="e",vr="o",_r="a",gr="n",yr="p",Ls="h",wi=function(){function t(e,n,r,i,o,s,a,u,l,c){this.id=e,this.repoInfo_=n,this.applicationId_=r,this.appCheckToken_=i,this.authToken_=o,this.onMessage_=s,this.onReady_=a,this.onDisconnect_=u,this.onKill_=l,this.lastSessionId=c,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=ot("c:"+this.id+":"),this.transportManager_=new Ns(n),this.log_("Connection created"),this.start_()}return t.prototype.start_=function(){var e=this,n=this.transportManager_.initialTransport();this.conn_=new n(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=n.responsesRequiredToBeHealthy||0;var r=this.connReceiver_(this.conn_),i=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(function(){e.conn_&&e.conn_.open(r,i)},Math.floor(0));var o=n.healthyTimeout||0;o>0&&(this.healthyTimeout_=Ye(function(){e.healthyTimeout_=null,e.isHealthy_||(e.conn_&&e.conn_.bytesReceived>xs?(e.log_("Connection exceeded healthy timeout but has received "+e.conn_.bytesReceived+" bytes.  Marking connection healthy."),e.isHealthy_=!0,e.conn_.markConnectionHealthy()):e.conn_&&e.conn_.bytesSent>As?e.log_("Connection exceeded healthy timeout but has sent "+e.conn_.bytesSent+" bytes.  Leaving connection alive."):(e.log_("Closing unhealthy connection after timeout."),e.close()))},Math.floor(o)))},t.prototype.nextTransportId_=function(){return"c:"+this.id+":"+this.connectionCount++},t.prototype.disconnReceiver_=function(e){var n=this;return function(r){e===n.conn_?n.onConnectionLost_(r):e===n.secondaryConn_?(n.log_("Secondary connection lost."),n.onSecondaryConnectionLost_()):n.log_("closing an old connection")}},t.prototype.connReceiver_=function(e){var n=this;return function(r){n.state_!==2&&(e===n.rx_?n.onPrimaryMessageReceived_(r):e===n.secondaryConn_?n.onSecondaryMessageReceived_(r):n.log_("message on old connection"))}},t.prototype.sendRequest=function(e){var n={t:"d",d:e};this.sendData_(n)},t.prototype.tryCleanupConnection=function(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)},t.prototype.onSecondaryControl_=function(e){if(en in e){var n=e[en];n===_r?this.upgradeIfSecondaryHealthy_():n===pr?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):n===vr&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}},t.prototype.onSecondaryMessageReceived_=function(e){var n=Ge("t",e),r=Ge("d",e);if(n==="c")this.onSecondaryControl_(r);else if(n==="d")this.pendingDataMessages.push(r);else throw new Error("Unknown protocol layer: "+n)},t.prototype.upgradeIfSecondaryHealthy_=function(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:yr,d:{}}}))},t.prototype.proceedWithUpgrade_=function(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:_r,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:gr,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()},t.prototype.onPrimaryMessageReceived_=function(e){var n=Ge("t",e),r=Ge("d",e);n==="c"?this.onControl_(r):n==="d"&&this.onDataMessage_(r)},t.prototype.onDataMessage_=function(e){this.onPrimaryResponse_(),this.onMessage_(e)},t.prototype.onPrimaryResponse_=function(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))},t.prototype.onControl_=function(e){var n=Ge(en,e);if(dr in e){var r=e[dr];if(n===Ls)this.onHandshake_(r);else if(n===gr){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(var i=0;i<this.pendingDataMessages.length;++i)this.onDataMessage_(this.pendingDataMessages[i]);this.pendingDataMessages=[],this.tryCleanupConnection()}else n===Os?this.onConnectionShutdown_(r):n===pr?this.onReset_(r):n===Ds?ln("Server Error: "+r):n===vr?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):ln("Unknown control packet command: "+n)}},t.prototype.onHandshake_=function(e){var n=e.ts,r=e.v,i=e.h;this.sessionId=e.s,this.repoInfo_.host=i,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,n),An!==r&&M("Protocol version mismatch detected"),this.tryStartUpgrade_())},t.prototype.tryStartUpgrade_=function(){var e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)},t.prototype.startUpgrade_=function(e){var n=this;this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;var r=this.connReceiver_(this.secondaryConn_),i=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(r,i),Ye(function(){n.secondaryConn_&&(n.log_("Timed out trying to upgrade."),n.secondaryConn_.close())},Math.floor(ks))},t.prototype.onReset_=function(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())},t.prototype.onConnectionEstablished_=function(e,n){var r=this;this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(n,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):Ye(function(){r.sendPingOnPrimaryIfNecessary_()},Math.floor(Ps))},t.prototype.sendPingOnPrimaryIfNecessary_=function(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:yr,d:{}}}))},t.prototype.onSecondaryConnectionLost_=function(){var e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()},t.prototype.onConnectionLost_=function(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(me.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()},t.prototype.onConnectionShutdown_=function(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()},t.prototype.sendData_=function(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)},t.prototype.close=function(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))},t.prototype.closeConnections_=function(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)},t}();/**
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
 */var Ti=function(){function t(){}return t.prototype.put=function(e,n,r,i){},t.prototype.merge=function(e,n,r,i){},t.prototype.refreshAuthToken=function(e){},t.prototype.refreshAppCheckToken=function(e){},t.prototype.onDisconnectPut=function(e,n,r){},t.prototype.onDisconnectMerge=function(e,n,r){},t.prototype.onDisconnectCancel=function(e,n){},t.prototype.reportStats=function(e){},t}();/**
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
 */var Si=function(){function t(e){this.allowedEvents_=e,this.listeners_={},p(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}return t.prototype.trigger=function(e){for(var n=[],r=1;r<arguments.length;r++)n[r-1]=arguments[r];if(Array.isArray(this.listeners_[e]))for(var i=Me([],K(this.listeners_[e])),o=0;o<i.length;o++)i[o].callback.apply(i[o].context,n)},t.prototype.on=function(e,n,r){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:n,context:r});var i=this.getInitialEvent(e);i&&n.apply(r,i)},t.prototype.off=function(e,n,r){this.validateEventType_(e);for(var i=this.listeners_[e]||[],o=0;o<i.length;o++)if(i[o].callback===n&&(!r||r===i[o].context)){i.splice(o,1);return}},t.prototype.validateEventType_=function(e){p(this.allowedEvents_.find(function(n){return n===e}),"Unknown event: "+e)},t}();/**
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
 */var mr=function(t){P(e,t);function e(){var n=t.call(this,["online"])||this;return n.online_=!0,typeof window!="undefined"&&typeof window.addEventListener!="undefined"&&!$r()&&(window.addEventListener("online",function(){n.online_||(n.online_=!0,n.trigger("online",!0))},!1),window.addEventListener("offline",function(){n.online_&&(n.online_=!1,n.trigger("online",!1))},!1)),n}return e.getInstance=function(){return new e},e.prototype.getInitialEvent=function(n){return p(n==="online","Unknown event type: "+n),[this.online_]},e.prototype.currentlyOnline=function(){return this.online_},e}(Si);/**
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
 */var Cr=32,Er=768,I=function(){function t(e,n){if(n===void 0){this.pieces_=e.split("/");for(var r=0,i=0;i<this.pieces_.length;i++)this.pieces_[i].length>0&&(this.pieces_[r]=this.pieces_[i],r++);this.pieces_.length=r,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=n}return t.prototype.toString=function(){for(var e="",n=this.pieceNum_;n<this.pieces_.length;n++)this.pieces_[n]!==""&&(e+="/"+this.pieces_[n]);return e||"/"},t}();function S(){return new I("")}function E(t){return t.pieceNum_>=t.pieces_.length?null:t.pieces_[t.pieceNum_]}function fe(t){return t.pieces_.length-t.pieceNum_}function b(t){var e=t.pieceNum_;return e<t.pieces_.length&&e++,new I(t.pieces_,e)}function Ln(t){return t.pieceNum_<t.pieces_.length?t.pieces_[t.pieces_.length-1]:null}function Ms(t){for(var e="",n=t.pieceNum_;n<t.pieces_.length;n++)t.pieces_[n]!==""&&(e+="/"+encodeURIComponent(String(t.pieces_[n])));return e||"/"}function Je(t,e){return e===void 0&&(e=0),t.pieces_.slice(t.pieceNum_+e)}function Ii(t){if(t.pieceNum_>=t.pieces_.length)return null;for(var e=[],n=t.pieceNum_;n<t.pieces_.length-1;n++)e.push(t.pieces_[n]);return new I(e,0)}function N(t,e){for(var n=[],r=t.pieceNum_;r<t.pieces_.length;r++)n.push(t.pieces_[r]);if(e instanceof I)for(var r=e.pieceNum_;r<e.pieces_.length;r++)n.push(e.pieces_[r]);else for(var i=e.split("/"),r=0;r<i.length;r++)i[r].length>0&&n.push(i[r]);return new I(n,0)}function w(t){return t.pieceNum_>=t.pieces_.length}function F(t,e){var n=E(t),r=E(e);if(n===null)return e;if(n===r)return F(b(t),b(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+t+")")}function Fs(t,e){for(var n=Je(t,0),r=Je(e,0),i=0;i<n.length&&i<r.length;i++){var o=be(n[i],r[i]);if(o!==0)return o}return n.length===r.length?0:n.length<r.length?-1:1}function Mn(t,e){if(fe(t)!==fe(e))return!1;for(var n=t.pieceNum_,r=e.pieceNum_;n<=t.pieces_.length;n++,r++)if(t.pieces_[n]!==e.pieces_[r])return!1;return!0}function Q(t,e){var n=t.pieceNum_,r=e.pieceNum_;if(fe(t)>fe(e))return!1;for(;n<t.pieces_.length;){if(t.pieces_[n]!==e.pieces_[r])return!1;++n,++r}return!0}var Ws=function(){function t(e,n){this.errorPrefix_=n,this.parts_=Je(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(var r=0;r<this.parts_.length;r++)this.byteLength_+=Pt(this.parts_[r]);bi(this)}return t}();function Us(t,e){t.parts_.length>0&&(t.byteLength_+=1),t.parts_.push(e),t.byteLength_+=Pt(e),bi(t)}function Bs(t){var e=t.parts_.pop();t.byteLength_-=Pt(e),t.parts_.length>0&&(t.byteLength_-=1)}function bi(t){if(t.byteLength_>Er)throw new Error(t.errorPrefix_+"has a key path longer than "+Er+" bytes ("+t.byteLength_+").");if(t.parts_.length>Cr)throw new Error(t.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+Cr+") or object contains a cycle "+ge(t))}function ge(t){return t.parts_.length===0?"":"in property '"+t.parts_.join(".")+"'"}/**
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
 */var Qs=function(t){P(e,t);function e(){var n=t.call(this,["visible"])||this,r,i;return typeof document!="undefined"&&typeof document.addEventListener!="undefined"&&(typeof document.hidden!="undefined"?(i="visibilitychange",r="hidden"):typeof document.mozHidden!="undefined"?(i="mozvisibilitychange",r="mozHidden"):typeof document.msHidden!="undefined"?(i="msvisibilitychange",r="msHidden"):typeof document.webkitHidden!="undefined"&&(i="webkitvisibilitychange",r="webkitHidden")),n.visible_=!0,i&&document.addEventListener(i,function(){var o=!document[r];o!==n.visible_&&(n.visible_=o,n.trigger("visible",o))},!1),n}return e.getInstance=function(){return new e},e.prototype.getInitialEvent=function(n){return p(n==="visible","Unknown event type: "+n),[this.visible_]},e}(Si);/**
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
 */var Ve=1e3,Gs=60*5*1e3,Vs=3*1e3,wr=30*1e3,Hs=1.3,js=3e4,Ys="server_kill",Tr=3,we=function(t){P(e,t);function e(n,r,i,o,s,a,u,l){var c=t.call(this)||this;if(c.repoInfo_=n,c.applicationId_=r,c.onDataUpdate_=i,c.onConnectStatus_=o,c.onServerInfoUpdate_=s,c.authTokenProvider_=a,c.appCheckTokenProvider_=u,c.authOverride_=l,c.id=e.nextPersistentConnectionId_++,c.log_=ot("p:"+c.id+":"),c.interruptReasons_={},c.listens=new Map,c.outstandingPuts_=[],c.outstandingGets_=[],c.outstandingPutCount_=0,c.outstandingGetCount_=0,c.onDisconnectRequestQueue_=[],c.connected_=!1,c.reconnectDelay_=Ve,c.maxReconnectDelay_=Gs,c.securityDebugCallback_=null,c.lastSessionId=null,c.establishConnectionTimer_=null,c.visible_=!1,c.requestCBHash_={},c.requestNumber_=0,c.realtime_=null,c.authToken_=null,c.appCheckToken_=null,c.forceTokenRefresh_=!1,c.invalidAuthTokenCount_=0,c.invalidAppCheckTokenCount_=0,c.firstConnection_=!0,c.lastConnectionAttemptTime_=null,c.lastConnectionEstablishedTime_=null,l&&!Xr())throw new Error("Auth override specified in options, but not supported on non Node.js platforms");return Qs.getInstance().on("visible",c.onVisible_,c),n.host.indexOf("fblocal")===-1&&mr.getInstance().on("online",c.onOnline_,c),c}return e.prototype.sendRequest=function(n,r,i){var o=++this.requestNumber_,s={r:o,a:n,b:r};this.log_(x(s)),p(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(s),i&&(this.requestCBHash_[o]=i)},e.prototype.get=function(n){var r=this;this.initConnection_();var i=new W,o={p:n._path.toString(),q:n._queryObject},s={action:"g",request:o,onComplete:function(u){var l=u.d;u.s==="ok"?(r.onDataUpdate_(o.p,l,!1,null),i.resolve(l)):i.reject(l)}};this.outstandingGets_.push(s),this.outstandingGetCount_++;var a=this.outstandingGets_.length-1;return this.connected_||setTimeout(function(){var u=r.outstandingGets_[a];u===void 0||s!==u||(delete r.outstandingGets_[a],r.outstandingGetCount_--,r.outstandingGetCount_===0&&(r.outstandingGets_=[]),r.log_("get "+a+" timed out on connection"),i.reject(new Error("Client is offline.")))},Vs),this.connected_&&this.sendGet_(a),i.promise},e.prototype.listen=function(n,r,i,o){this.initConnection_();var s=n._queryIdentifier,a=n._path.toString();this.log_("Listen called for "+a+" "+s),this.listens.has(a)||this.listens.set(a,new Map),p(n._queryParams.isDefault()||!n._queryParams.loadsAllData(),"listen() called for non-default but complete query"),p(!this.listens.get(a).has(s),"listen() called twice for same path/queryId.");var u={onComplete:o,hashFn:r,query:n,tag:i};this.listens.get(a).set(s,u),this.connected_&&this.sendListen_(u)},e.prototype.sendGet_=function(n){var r=this,i=this.outstandingGets_[n];this.sendRequest("g",i.request,function(o){delete r.outstandingGets_[n],r.outstandingGetCount_--,r.outstandingGetCount_===0&&(r.outstandingGets_=[]),i.onComplete&&i.onComplete(o)})},e.prototype.sendListen_=function(n){var r=this,i=n.query,o=i._path.toString(),s=i._queryIdentifier;this.log_("Listen on "+o+" for "+s);var a={p:o},u="q";n.tag&&(a.q=i._queryObject,a.t=n.tag),a.h=n.hashFn(),this.sendRequest(u,a,function(l){var c=l.d,f=l.s;e.warnOnListenWarnings_(c,i);var h=r.listens.get(o)&&r.listens.get(o).get(s);h===n&&(r.log_("listen response",l),f!=="ok"&&r.removeListen_(o,s),n.onComplete&&n.onComplete(f,c))})},e.warnOnListenWarnings_=function(n,r){if(n&&typeof n=="object"&&$(n,"w")){var i=Te(n,"w");if(Array.isArray(i)&&~i.indexOf("no_index")){var o='".indexOn": "'+r._queryParams.getIndex().toString()+'"',s=r._path.toString();M("Using an unspecified index. Your data will be downloaded and "+("filtered on the client. Consider adding "+o+" at ")+(s+" to your security rules for better performance."))}}},e.prototype.refreshAuthToken=function(n){this.authToken_=n,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},function(){}),this.reduceReconnectDelayIfAdminCredential_(n)},e.prototype.reduceReconnectDelayIfAdminCredential_=function(n){var r=n&&n.length===40;(r||Ao(n))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=wr)},e.prototype.refreshAppCheckToken=function(n){this.appCheckToken_=n,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},function(){})},e.prototype.tryAuth=function(){var n=this;if(this.connected_&&this.authToken_){var r=this.authToken_,i=xo(r)?"auth":"gauth",o={cred:r};this.authOverride_===null?o.noauth=!0:typeof this.authOverride_=="object"&&(o.authvar=this.authOverride_),this.sendRequest(i,o,function(s){var a=s.s,u=s.d||"error";n.authToken_===r&&(a==="ok"?n.invalidAuthTokenCount_=0:n.onAuthRevoked_(a,u))})}},e.prototype.tryAppCheck=function(){var n=this;this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},function(r){var i=r.s,o=r.d||"error";i==="ok"?n.invalidAppCheckTokenCount_=0:n.onAppCheckRevoked_(i,o)})},e.prototype.unlisten=function(n,r){var i=n._path.toString(),o=n._queryIdentifier;this.log_("Unlisten called for "+i+" "+o),p(n._queryParams.isDefault()||!n._queryParams.loadsAllData(),"unlisten() called for non-default but complete query");var s=this.removeListen_(i,o);s&&this.connected_&&this.sendUnlisten_(i,o,n._queryObject,r)},e.prototype.sendUnlisten_=function(n,r,i,o){this.log_("Unlisten on "+n+" for "+r);var s={p:n},a="n";o&&(s.q=i,s.t=o),this.sendRequest(a,s)},e.prototype.onDisconnectPut=function(n,r,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",n,r,i):this.onDisconnectRequestQueue_.push({pathString:n,action:"o",data:r,onComplete:i})},e.prototype.onDisconnectMerge=function(n,r,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",n,r,i):this.onDisconnectRequestQueue_.push({pathString:n,action:"om",data:r,onComplete:i})},e.prototype.onDisconnectCancel=function(n,r){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",n,null,r):this.onDisconnectRequestQueue_.push({pathString:n,action:"oc",data:null,onComplete:r})},e.prototype.sendOnDisconnect_=function(n,r,i,o){var s={p:r,d:i};this.log_("onDisconnect "+n,s),this.sendRequest(n,s,function(a){o&&setTimeout(function(){o(a.s,a.d)},Math.floor(0))})},e.prototype.put=function(n,r,i,o){this.putInternal("p",n,r,i,o)},e.prototype.merge=function(n,r,i,o){this.putInternal("m",n,r,i,o)},e.prototype.putInternal=function(n,r,i,o,s){this.initConnection_();var a={p:r,d:i};s!==void 0&&(a.h=s),this.outstandingPuts_.push({action:n,request:a,onComplete:o}),this.outstandingPutCount_++;var u=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(u):this.log_("Buffering put: "+r)},e.prototype.sendPut_=function(n){var r=this,i=this.outstandingPuts_[n].action,o=this.outstandingPuts_[n].request,s=this.outstandingPuts_[n].onComplete;this.outstandingPuts_[n].queued=this.connected_,this.sendRequest(i,o,function(a){r.log_(i+" response",a),delete r.outstandingPuts_[n],r.outstandingPutCount_--,r.outstandingPutCount_===0&&(r.outstandingPuts_=[]),s&&s(a.s,a.d)})},e.prototype.reportStats=function(n){var r=this;if(this.connected_){var i={c:n};this.log_("reportStats",i),this.sendRequest("s",i,function(o){var s=o.s;if(s!=="ok"){var a=o.d;r.log_("reportStats","Error sending stats: "+a)}})}},e.prototype.onDataMessage_=function(n){if("r"in n){this.log_("from server: "+x(n));var r=n.r,i=this.requestCBHash_[r];i&&(delete this.requestCBHash_[r],i(n.b))}else{if("error"in n)throw"A server-side error has occurred: "+n.error;"a"in n&&this.onDataPush_(n.a,n.b)}},e.prototype.onDataPush_=function(n,r){this.log_("handleServerMessage",n,r),n==="d"?this.onDataUpdate_(r.p,r.d,!1,r.t):n==="m"?this.onDataUpdate_(r.p,r.d,!0,r.t):n==="c"?this.onListenRevoked_(r.p,r.q):n==="ac"?this.onAuthRevoked_(r.s,r.d):n==="apc"?this.onAppCheckRevoked_(r.s,r.d):n==="sd"?this.onSecurityDebugPacket_(r):ln("Unrecognized action received from server: "+x(n)+`
Are you using the latest client?`)},e.prototype.onReady_=function(n,r){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(n),this.lastSessionId=r,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)},e.prototype.scheduleConnect_=function(n){var r=this;p(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(function(){r.establishConnectionTimer_=null,r.establishConnection_()},Math.floor(n))},e.prototype.initConnection_=function(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)},e.prototype.onVisible_=function(n){n&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=Ve,this.realtime_||this.scheduleConnect_(0)),this.visible_=n},e.prototype.onOnline_=function(n){n?(this.log_("Browser went online."),this.reconnectDelay_=Ve,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())},e.prototype.onRealtimeDisconnect_=function(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){if(!this.visible_)this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime();else if(this.lastConnectionEstablishedTime_){var n=new Date().getTime()-this.lastConnectionEstablishedTime_;n>js&&(this.reconnectDelay_=Ve),this.lastConnectionEstablishedTime_=null}var r=new Date().getTime()-this.lastConnectionAttemptTime_,i=Math.max(0,this.reconnectDelay_-r);i=Math.random()*i,this.log_("Trying to reconnect in "+i+"ms"),this.scheduleConnect_(i),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*Hs)}this.onConnectStatus_(!1)},e.prototype.establishConnection_=function(){return Oo(this,void 0,void 0,function(){var n,r,i,o,s,a,u,l,c,f,h,d,v,g,_=this;return Bo(this,function(m){switch(m.label){case 0:if(!this.shouldReconnect_())return[3,4];this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null,n=this.onDataMessage_.bind(this),r=this.onReady_.bind(this),i=this.onRealtimeDisconnect_.bind(this),o=this.id+":"+e.nextConnectionId_++,s=this.lastSessionId,a=!1,u=null,l=function(){u?u.close():(a=!0,i())},c=function(A){p(u,"sendRequest call when we're not connected not allowed."),u.sendRequest(A)},this.realtime_={close:l,sendRequest:c},f=this.forceTokenRefresh_,this.forceTokenRefresh_=!1,m.label=1;case 1:return m.trys.push([1,3,,4]),[4,Promise.all([this.authTokenProvider_.getToken(f),this.appCheckTokenProvider_.getToken(f)])];case 2:return h=K.apply(void 0,[m.sent(),2]),d=h[0],v=h[1],a?L("getToken() completed but was canceled"):(L("getToken() completed. Creating connection."),this.authToken_=d&&d.accessToken,this.appCheckToken_=v&&v.token,u=new wi(o,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,n,r,i,function(A){M(A+" ("+_.repoInfo_.toString()+")"),_.interrupt(Ys)},s)),[3,4];case 3:return g=m.sent(),this.log_("Failed to get token: "+g),a||(this.repoInfo_.nodeAdmin&&M(g),l()),[3,4];case 4:return[2]}})})},e.prototype.interrupt=function(n){L("Interrupting connection for reason: "+n),this.interruptReasons_[n]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())},e.prototype.resume=function(n){L("Resuming connection for reason: "+n),delete this.interruptReasons_[n],sn(this.interruptReasons_)&&(this.reconnectDelay_=Ve,this.realtime_||this.scheduleConnect_(0))},e.prototype.handleTimestamp_=function(n){var r=n-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:r})},e.prototype.cancelSentTransactions_=function(){for(var n=0;n<this.outstandingPuts_.length;n++){var r=this.outstandingPuts_[n];r&&"h"in r.request&&r.queued&&(r.onComplete&&r.onComplete("disconnect"),delete this.outstandingPuts_[n],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])},e.prototype.onListenRevoked_=function(n,r){var i;r?i=r.map(function(s){return kn(s)}).join("$"):i="default";var o=this.removeListen_(n,i);o&&o.onComplete&&o.onComplete("permission_denied")},e.prototype.removeListen_=function(n,r){var i=new I(n).toString(),o;if(this.listens.has(i)){var s=this.listens.get(i);o=s.get(r),s.delete(r),s.size===0&&this.listens.delete(i)}else o=void 0;return o},e.prototype.onAuthRevoked_=function(n,r){L("Auth token revoked: "+n+"/"+r),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(n==="invalid_token"||n==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=Tr&&(this.reconnectDelay_=wr,this.authTokenProvider_.notifyForInvalidToken()))},e.prototype.onAppCheckRevoked_=function(n,r){L("App check token revoked: "+n+"/"+r),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(n==="invalid_token"||n==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=Tr&&this.appCheckTokenProvider_.notifyForInvalidToken())},e.prototype.onSecurityDebugPacket_=function(n){this.securityDebugCallback_?this.securityDebugCallback_(n):"msg"in n&&console.log("FIREBASE: "+n.msg.replace(`
`,`
FIREBASE: `))},e.prototype.restoreState_=function(){var n,r,i,o;this.tryAuth(),this.tryAppCheck();try{for(var s=ee(this.listens.values()),a=s.next();!a.done;a=s.next()){var u=a.value;try{for(var l=(i=void 0,ee(u.values())),c=l.next();!c.done;c=l.next()){var f=c.value;this.sendListen_(f)}}catch(v){i={error:v}}finally{try{c&&!c.done&&(o=l.return)&&o.call(l)}finally{if(i)throw i.error}}}}catch(v){n={error:v}}finally{try{a&&!a.done&&(r=s.return)&&r.call(s)}finally{if(n)throw n.error}}for(var h=0;h<this.outstandingPuts_.length;h++)this.outstandingPuts_[h]&&this.sendPut_(h);for(;this.onDisconnectRequestQueue_.length;){var d=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(d.action,d.pathString,d.data,d.onComplete)}for(var h=0;h<this.outstandingGets_.length;h++)this.outstandingGets_[h]&&this.sendGet_(h)},e.prototype.sendConnectStats_=function(){var n={},r="js";n["sdk."+r+"."+Zr.replace(/\./g,"-")]=1,$r()?n["framework.cordova"]=1:Qo()&&(n["framework.reactnative"]=1),this.reportStats(n)},e.prototype.shouldReconnect_=function(){var n=mr.getInstance().currentlyOnline();return sn(this.interruptReasons_)&&n},e.nextPersistentConnectionId_=0,e.nextConnectionId_=0,e}(Ti);/**
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
 */var T=function(){function t(e,n){this.name=e,this.node=n}return t.Wrap=function(e,n){return new t(e,n)},t}();/**
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
 */var xt=function(){function t(){}return t.prototype.getCompare=function(){return this.compare.bind(this)},t.prototype.indexedValueChanged=function(e,n){var r=new T(ae,e),i=new T(ae,n);return this.compare(r,i)!==0},t.prototype.minPost=function(){return T.MIN},t}();/**
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
 */var pt,Ri=function(t){P(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return Object.defineProperty(e,"__EMPTY_NODE",{get:function(){return pt},set:function(n){pt=n},enumerable:!1,configurable:!0}),e.prototype.compare=function(n,r){return be(n.name,r.name)},e.prototype.isDefinedOn=function(n){throw rt("KeyIndex.isDefinedOn not expected to be called.")},e.prototype.indexedValueChanged=function(n,r){return!1},e.prototype.minPost=function(){return T.MIN},e.prototype.maxPost=function(){return new T(ne,pt)},e.prototype.makePost=function(n,r){return p(typeof n=="string","KeyIndex indexValue must always be a string."),new T(n,pt)},e.prototype.toString=function(){return".key"},e}(xt),Z=new Ri;/**
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
 */var vt=function(){function t(e,n,r,i,o){o===void 0&&(o=null),this.isReverse_=i,this.resultGenerator_=o,this.nodeStack_=[];for(var s=1;!e.isEmpty();)if(e=e,s=n?r(e.key,n):1,i&&(s*=-1),s<0)this.isReverse_?e=e.left:e=e.right;else if(s===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}return t.prototype.getNext=function(){if(this.nodeStack_.length===0)return null;var e=this.nodeStack_.pop(),n;if(this.resultGenerator_?n=this.resultGenerator_(e.key,e.value):n={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return n},t.prototype.hasNext=function(){return this.nodeStack_.length>0},t.prototype.peek=function(){if(this.nodeStack_.length===0)return null;var e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}},t}(),z=function(){function t(e,n,r,i,o){this.key=e,this.value=n,this.color=r!=null?r:t.RED,this.left=i!=null?i:oe.EMPTY_NODE,this.right=o!=null?o:oe.EMPTY_NODE}return t.prototype.copy=function(e,n,r,i,o){return new t(e!=null?e:this.key,n!=null?n:this.value,r!=null?r:this.color,i!=null?i:this.left,o!=null?o:this.right)},t.prototype.count=function(){return this.left.count()+1+this.right.count()},t.prototype.isEmpty=function(){return!1},t.prototype.inorderTraversal=function(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)},t.prototype.reverseTraversal=function(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)},t.prototype.min_=function(){return this.left.isEmpty()?this:this.left.min_()},t.prototype.minKey=function(){return this.min_().key},t.prototype.maxKey=function(){return this.right.isEmpty()?this.key:this.right.maxKey()},t.prototype.insert=function(e,n,r){var i=this,o=r(e,i.key);return o<0?i=i.copy(null,null,null,i.left.insert(e,n,r),null):o===0?i=i.copy(null,n,null,null,null):i=i.copy(null,null,null,null,i.right.insert(e,n,r)),i.fixUp_()},t.prototype.removeMin_=function(){if(this.left.isEmpty())return oe.EMPTY_NODE;var e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()},t.prototype.remove=function(e,n){var r,i;if(r=this,n(e,r.key)<0)!r.left.isEmpty()&&!r.left.isRed_()&&!r.left.left.isRed_()&&(r=r.moveRedLeft_()),r=r.copy(null,null,null,r.left.remove(e,n),null);else{if(r.left.isRed_()&&(r=r.rotateRight_()),!r.right.isEmpty()&&!r.right.isRed_()&&!r.right.left.isRed_()&&(r=r.moveRedRight_()),n(e,r.key)===0){if(r.right.isEmpty())return oe.EMPTY_NODE;i=r.right.min_(),r=r.copy(i.key,i.value,null,null,r.right.removeMin_())}r=r.copy(null,null,null,null,r.right.remove(e,n))}return r.fixUp_()},t.prototype.isRed_=function(){return this.color},t.prototype.fixUp_=function(){var e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e},t.prototype.moveRedLeft_=function(){var e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e},t.prototype.moveRedRight_=function(){var e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e},t.prototype.rotateLeft_=function(){var e=this.copy(null,null,t.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)},t.prototype.rotateRight_=function(){var e=this.copy(null,null,t.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)},t.prototype.colorFlip_=function(){var e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)},t.prototype.checkMaxDepth_=function(){var e=this.check_();return Math.pow(2,e)<=this.count()+1},t.prototype.check_=function(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");var e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)},t.RED=!0,t.BLACK=!1,t}(),zs=function(){function t(){}return t.prototype.copy=function(e,n,r,i,o){return this},t.prototype.insert=function(e,n,r){return new z(e,n,null)},t.prototype.remove=function(e,n){return this},t.prototype.count=function(){return 0},t.prototype.isEmpty=function(){return!0},t.prototype.inorderTraversal=function(e){return!1},t.prototype.reverseTraversal=function(e){return!1},t.prototype.minKey=function(){return null},t.prototype.maxKey=function(){return null},t.prototype.check_=function(){return 0},t.prototype.isRed_=function(){return!1},t}(),oe=function(){function t(e,n){n===void 0&&(n=t.EMPTY_NODE),this.comparator_=e,this.root_=n}return t.prototype.insert=function(e,n){return new t(this.comparator_,this.root_.insert(e,n,this.comparator_).copy(null,null,z.BLACK,null,null))},t.prototype.remove=function(e){return new t(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,z.BLACK,null,null))},t.prototype.get=function(e){for(var n,r=this.root_;!r.isEmpty();){if(n=this.comparator_(e,r.key),n===0)return r.value;n<0?r=r.left:n>0&&(r=r.right)}return null},t.prototype.getPredecessorKey=function(e){for(var n,r=this.root_,i=null;!r.isEmpty();)if(n=this.comparator_(e,r.key),n===0){if(r.left.isEmpty())return i?i.key:null;for(r=r.left;!r.right.isEmpty();)r=r.right;return r.key}else n<0?r=r.left:n>0&&(i=r,r=r.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")},t.prototype.isEmpty=function(){return this.root_.isEmpty()},t.prototype.count=function(){return this.root_.count()},t.prototype.minKey=function(){return this.root_.minKey()},t.prototype.maxKey=function(){return this.root_.maxKey()},t.prototype.inorderTraversal=function(e){return this.root_.inorderTraversal(e)},t.prototype.reverseTraversal=function(e){return this.root_.reverseTraversal(e)},t.prototype.getIterator=function(e){return new vt(this.root_,null,this.comparator_,!1,e)},t.prototype.getIteratorFrom=function(e,n){return new vt(this.root_,e,this.comparator_,!1,n)},t.prototype.getReverseIteratorFrom=function(e,n){return new vt(this.root_,e,this.comparator_,!0,n)},t.prototype.getReverseIterator=function(e){return new vt(this.root_,null,this.comparator_,!0,e)},t.EMPTY_NODE=new zs,t}();/**
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
 */function qs(t,e){return be(t.name,e.name)}function Fn(t,e){return be(t,e)}/**
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
 */var fn;function Ks(t){fn=t}var Ni=function(t){return typeof t=="number"?"number:"+si(t):"string:"+t},ki=function(t){if(t.isLeafNode()){var e=t.val();p(typeof e=="string"||typeof e=="number"||typeof e=="object"&&$(e,".sv"),"Priority must be a string or number.")}else p(t===fn||t.isEmpty(),"priority of unexpected type.");p(t===fn||t.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
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
 */var Sr,Ae=function(){function t(e,n){n===void 0&&(n=t.__childrenNodeConstructor.EMPTY_NODE),this.value_=e,this.priorityNode_=n,this.lazyHash_=null,p(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),ki(this.priorityNode_)}return Object.defineProperty(t,"__childrenNodeConstructor",{get:function(){return Sr},set:function(e){Sr=e},enumerable:!1,configurable:!0}),t.prototype.isLeafNode=function(){return!0},t.prototype.getPriority=function(){return this.priorityNode_},t.prototype.updatePriority=function(e){return new t(this.value_,e)},t.prototype.getImmediateChild=function(e){return e===".priority"?this.priorityNode_:t.__childrenNodeConstructor.EMPTY_NODE},t.prototype.getChild=function(e){return w(e)?this:E(e)===".priority"?this.priorityNode_:t.__childrenNodeConstructor.EMPTY_NODE},t.prototype.hasChild=function(){return!1},t.prototype.getPredecessorChildName=function(e,n){return null},t.prototype.updateImmediateChild=function(e,n){return e===".priority"?this.updatePriority(n):n.isEmpty()&&e!==".priority"?this:t.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,n).updatePriority(this.priorityNode_)},t.prototype.updateChild=function(e,n){var r=E(e);return r===null?n:n.isEmpty()&&r!==".priority"?this:(p(r!==".priority"||fe(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(r,t.__childrenNodeConstructor.EMPTY_NODE.updateChild(b(e),n)))},t.prototype.isEmpty=function(){return!1},t.prototype.numChildren=function(){return 0},t.prototype.forEachChild=function(e,n){return!1},t.prototype.val=function(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()},t.prototype.hash=function(){if(this.lazyHash_===null){var e="";this.priorityNode_.isEmpty()||(e+="priority:"+Ni(this.priorityNode_.val())+":");var n=typeof this.value_;e+=n+":",n==="number"?e+=si(this.value_):e+=this.value_,this.lazyHash_=ri(e)}return this.lazyHash_},t.prototype.getValue=function(){return this.value_},t.prototype.compareTo=function(e){return e===t.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof t.__childrenNodeConstructor?-1:(p(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))},t.prototype.compareToLeafNode_=function(e){var n=typeof e.value_,r=typeof this.value_,i=t.VALUE_TYPE_ORDER.indexOf(n),o=t.VALUE_TYPE_ORDER.indexOf(r);return p(i>=0,"Unknown leaf type: "+n),p(o>=0,"Unknown leaf type: "+r),i===o?r==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:o-i},t.prototype.withIndex=function(){return this},t.prototype.isIndexed=function(){return!0},t.prototype.equals=function(e){if(e===this)return!0;if(e.isLeafNode()){var n=e;return this.value_===n.value_&&this.priorityNode_.equals(n.priorityNode_)}else return!1},t.VALUE_TYPE_ORDER=["object","boolean","number","string"],t}();/**
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
 */var Pi,Ai;function $s(t){Pi=t}function Xs(t){Ai=t}var Js=function(t){P(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e.prototype.compare=function(n,r){var i=n.node.getPriority(),o=r.node.getPriority(),s=i.compareTo(o);return s===0?be(n.name,r.name):s},e.prototype.isDefinedOn=function(n){return!n.getPriority().isEmpty()},e.prototype.indexedValueChanged=function(n,r){return!n.getPriority().equals(r.getPriority())},e.prototype.minPost=function(){return T.MIN},e.prototype.maxPost=function(){return new T(ne,new Ae("[PRIORITY-POST]",Ai))},e.prototype.makePost=function(n,r){var i=Pi(n);return new T(r,new Ae("[PRIORITY-POST]",i))},e.prototype.toString=function(){return".priority"},e}(xt),R=new Js;/**
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
 */var Zs=Math.log(2),ea=function(){function t(e){var n=function(o){return parseInt(Math.log(o)/Zs,10)},r=function(o){return parseInt(Array(o+1).join("1"),2)};this.count=n(e+1),this.current_=this.count-1;var i=r(this.count);this.bits_=e+1&i}return t.prototype.nextBitIsOne=function(){var e=!(this.bits_&1<<this.current_);return this.current_--,e},t}(),mt=function(t,e,n,r){t.sort(e);var i=function(u,l){var c=l-u,f,h;if(c===0)return null;if(c===1)return f=t[u],h=n?n(f):f,new z(h,f.node,z.BLACK,null,null);var d=parseInt(c/2,10)+u,v=i(u,d),g=i(d+1,l);return f=t[d],h=n?n(f):f,new z(h,f.node,z.BLACK,v,g)},o=function(u){for(var l=null,c=null,f=t.length,h=function(m,A){var J=f-m,dt=f;f-=m;var $t=i(J+1,dt),Xt=t[J],Ro=n?n(Xt):Xt;d(new z(Ro,Xt.node,A,null,$t))},d=function(m){l?(l.left=m,l=m):(c=m,l=m)},v=0;v<u.count;++v){var g=u.nextBitIsOne(),_=Math.pow(2,u.count-(v+1));g?h(_,z.BLACK):(h(_,z.BLACK),h(_,z.RED))}return c},s=new ea(t.length),a=o(s);return new oe(r||e,a)};/**
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
 */var tn,ke={},Ct=function(){function t(e,n){this.indexes_=e,this.indexSet_=n}return Object.defineProperty(t,"Default",{get:function(){return p(ke&&R,"ChildrenNode.ts has not been loaded"),tn=tn||new t({".priority":ke},{".priority":R}),tn},enumerable:!1,configurable:!0}),t.prototype.get=function(e){var n=Te(this.indexes_,e);if(!n)throw new Error("No index defined for "+e);return n instanceof oe?n:null},t.prototype.hasIndex=function(e){return $(this.indexSet_,e.toString())},t.prototype.addIndex=function(e,n){p(e!==Z,"KeyIndex always exists and isn't meant to be added to the IndexMap.");for(var r=[],i=!1,o=n.getIterator(T.Wrap),s=o.getNext();s;)i=i||e.isDefinedOn(s.node),r.push(s),s=o.getNext();var a;i?a=mt(r,e.getCompare()):a=ke;var u=e.toString(),l=an({},this.indexSet_);l[u]=e;var c=an({},this.indexes_);return c[u]=a,new t(c,l)},t.prototype.addToIndexes=function(e,n){var r=this,i=_t(this.indexes_,function(o,s){var a=Te(r.indexSet_,s);if(p(a,"Missing index implementation for "+s),o===ke)if(a.isDefinedOn(e.node)){for(var u=[],l=n.getIterator(T.Wrap),c=l.getNext();c;)c.name!==e.name&&u.push(c),c=l.getNext();return u.push(e),mt(u,a.getCompare())}else return ke;else{var f=n.get(e.name),h=o;return f&&(h=h.remove(new T(e.name,f))),h.insert(e,e.node)}});return new t(i,this.indexSet_)},t.prototype.removeFromIndexes=function(e,n){var r=_t(this.indexes_,function(i){if(i===ke)return i;var o=n.get(e.name);return o?i.remove(new T(e.name,o)):i});return new t(r,this.indexSet_)},t}();/**
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
 */var He,C=function(){function t(e,n,r){this.children_=e,this.priorityNode_=n,this.indexMap_=r,this.lazyHash_=null,this.priorityNode_&&ki(this.priorityNode_),this.children_.isEmpty()&&p(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}return Object.defineProperty(t,"EMPTY_NODE",{get:function(){return He||(He=new t(new oe(Fn),null,Ct.Default))},enumerable:!1,configurable:!0}),t.prototype.isLeafNode=function(){return!1},t.prototype.getPriority=function(){return this.priorityNode_||He},t.prototype.updatePriority=function(e){return this.children_.isEmpty()?this:new t(this.children_,e,this.indexMap_)},t.prototype.getImmediateChild=function(e){if(e===".priority")return this.getPriority();var n=this.children_.get(e);return n===null?He:n},t.prototype.getChild=function(e){var n=E(e);return n===null?this:this.getImmediateChild(n).getChild(b(e))},t.prototype.hasChild=function(e){return this.children_.get(e)!==null},t.prototype.updateImmediateChild=function(e,n){if(p(n,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(n);var r=new T(e,n),i=void 0,o=void 0;n.isEmpty()?(i=this.children_.remove(e),o=this.indexMap_.removeFromIndexes(r,this.children_)):(i=this.children_.insert(e,n),o=this.indexMap_.addToIndexes(r,this.children_));var s=i.isEmpty()?He:this.priorityNode_;return new t(i,s,o)},t.prototype.updateChild=function(e,n){var r=E(e);if(r===null)return n;p(E(e)!==".priority"||fe(e)===1,".priority must be the last token in a path");var i=this.getImmediateChild(r).updateChild(b(e),n);return this.updateImmediateChild(r,i)},t.prototype.isEmpty=function(){return this.children_.isEmpty()},t.prototype.numChildren=function(){return this.children_.count()},t.prototype.val=function(e){if(this.isEmpty())return null;var n={},r=0,i=0,o=!0;if(this.forEachChild(R,function(u,l){n[u]=l.val(e),r++,o&&t.INTEGER_REGEXP_.test(u)?i=Math.max(i,Number(u)):o=!1}),!e&&o&&i<2*r){var s=[];for(var a in n)s[a]=n[a];return s}else return e&&!this.getPriority().isEmpty()&&(n[".priority"]=this.getPriority().val()),n},t.prototype.hash=function(){if(this.lazyHash_===null){var e="";this.getPriority().isEmpty()||(e+="priority:"+Ni(this.getPriority().val())+":"),this.forEachChild(R,function(n,r){var i=r.hash();i!==""&&(e+=":"+n+":"+i)}),this.lazyHash_=e===""?"":ri(e)}return this.lazyHash_},t.prototype.getPredecessorChildName=function(e,n,r){var i=this.resolveIndex_(r);if(i){var o=i.getPredecessorKey(new T(e,n));return o?o.name:null}else return this.children_.getPredecessorKey(e)},t.prototype.getFirstChildName=function(e){var n=this.resolveIndex_(e);if(n){var r=n.minKey();return r&&r.name}else return this.children_.minKey()},t.prototype.getFirstChild=function(e){var n=this.getFirstChildName(e);return n?new T(n,this.children_.get(n)):null},t.prototype.getLastChildName=function(e){var n=this.resolveIndex_(e);if(n){var r=n.maxKey();return r&&r.name}else return this.children_.maxKey()},t.prototype.getLastChild=function(e){var n=this.getLastChildName(e);return n?new T(n,this.children_.get(n)):null},t.prototype.forEachChild=function(e,n){var r=this.resolveIndex_(e);return r?r.inorderTraversal(function(i){return n(i.name,i.node)}):this.children_.inorderTraversal(n)},t.prototype.getIterator=function(e){return this.getIteratorFrom(e.minPost(),e)},t.prototype.getIteratorFrom=function(e,n){var r=this.resolveIndex_(n);if(r)return r.getIteratorFrom(e,function(s){return s});for(var i=this.children_.getIteratorFrom(e.name,T.Wrap),o=i.peek();o!=null&&n.compare(o,e)<0;)i.getNext(),o=i.peek();return i},t.prototype.getReverseIterator=function(e){return this.getReverseIteratorFrom(e.maxPost(),e)},t.prototype.getReverseIteratorFrom=function(e,n){var r=this.resolveIndex_(n);if(r)return r.getReverseIteratorFrom(e,function(s){return s});for(var i=this.children_.getReverseIteratorFrom(e.name,T.Wrap),o=i.peek();o!=null&&n.compare(o,e)>0;)i.getNext(),o=i.peek();return i},t.prototype.compareTo=function(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===st?-1:0},t.prototype.withIndex=function(e){if(e===Z||this.indexMap_.hasIndex(e))return this;var n=this.indexMap_.addIndex(e,this.children_);return new t(this.children_,this.priorityNode_,n)},t.prototype.isIndexed=function(e){return e===Z||this.indexMap_.hasIndex(e)},t.prototype.equals=function(e){if(e===this)return!0;if(e.isLeafNode())return!1;var n=e;if(this.getPriority().equals(n.getPriority()))if(this.children_.count()===n.children_.count()){for(var r=this.getIterator(R),i=n.getIterator(R),o=r.getNext(),s=i.getNext();o&&s;){if(o.name!==s.name||!o.node.equals(s.node))return!1;o=r.getNext(),s=i.getNext()}return o===null&&s===null}else return!1;else return!1},t.prototype.resolveIndex_=function(e){return e===Z?null:this.indexMap_.get(e.toString())},t.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/,t}(),ta=function(t){P(e,t);function e(){return t.call(this,new oe(Fn),C.EMPTY_NODE,Ct.Default)||this}return e.prototype.compareTo=function(n){return n===this?0:1},e.prototype.equals=function(n){return n===this},e.prototype.getPriority=function(){return this},e.prototype.getImmediateChild=function(n){return C.EMPTY_NODE},e.prototype.isEmpty=function(){return!1},e}(C),st=new ta;Object.defineProperties(T,{MIN:{value:new T(ae,C.EMPTY_NODE)},MAX:{value:new T(ne,st)}});Ri.__EMPTY_NODE=C.EMPTY_NODE;Ae.__childrenNodeConstructor=C;Ks(st);Xs(st);/**
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
 */var na=!0;function k(t,e){if(e===void 0&&(e=null),t===null)return C.EMPTY_NODE;if(typeof t=="object"&&".priority"in t&&(e=t[".priority"]),p(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof t=="object"&&".value"in t&&t[".value"]!==null&&(t=t[".value"]),typeof t!="object"||".sv"in t){var n=t;return new Ae(n,k(e))}if(!(t instanceof Array)&&na){var r=[],i=!1,o=t;if(O(o,function(l,c){if(l.substring(0,1)!=="."){var f=k(c);f.isEmpty()||(i=i||!f.getPriority().isEmpty(),r.push(new T(l,f)))}}),r.length===0)return C.EMPTY_NODE;var s=mt(r,qs,function(l){return l.name},Fn);if(i){var a=mt(r,R.getCompare());return new C(s,k(e),new Ct({".priority":a},{".priority":R}))}else return new C(s,k(e),Ct.Default)}else{var u=C.EMPTY_NODE;return O(t,function(l,c){if($(t,l)&&l.substring(0,1)!=="."){var f=k(c);(f.isLeafNode()||!f.isEmpty())&&(u=u.updateImmediateChild(l,f))}}),u.updatePriority(k(e))}}$s(k);/**
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
 */var Wn=function(t){P(e,t);function e(n){var r=t.call(this)||this;return r.indexPath_=n,p(!w(n)&&E(n)!==".priority","Can't create PathIndex with empty path or .priority key"),r}return e.prototype.extractChild=function(n){return n.getChild(this.indexPath_)},e.prototype.isDefinedOn=function(n){return!n.getChild(this.indexPath_).isEmpty()},e.prototype.compare=function(n,r){var i=this.extractChild(n.node),o=this.extractChild(r.node),s=i.compareTo(o);return s===0?be(n.name,r.name):s},e.prototype.makePost=function(n,r){var i=k(n),o=C.EMPTY_NODE.updateChild(this.indexPath_,i);return new T(r,o)},e.prototype.maxPost=function(){var n=C.EMPTY_NODE.updateChild(this.indexPath_,st);return new T(ne,n)},e.prototype.toString=function(){return Je(this.indexPath_,0).join("/")},e}(xt);/**
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
 */var ra=function(t){P(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e.prototype.compare=function(n,r){var i=n.node.compareTo(r.node);return i===0?be(n.name,r.name):i},e.prototype.isDefinedOn=function(n){return!0},e.prototype.indexedValueChanged=function(n,r){return!n.equals(r)},e.prototype.minPost=function(){return T.MIN},e.prototype.maxPost=function(){return T.MAX},e.prototype.makePost=function(n,r){var i=k(n);return new T(r,i)},e.prototype.toString=function(){return".value"},e}(xt),Un=new ra;/**
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
 */var xe="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",hn="-",xi="z",Oi=786,ia=function(){var t=0,e=[];return function(n){var r=n===t;t=n;var i,o=new Array(8);for(i=7;i>=0;i--)o[i]=xe.charAt(n%64),n=Math.floor(n/64);p(n===0,"Cannot push at time == 0");var s=o.join("");if(r){for(i=11;i>=0&&e[i]===63;i--)e[i]=0;e[i]++}else for(i=0;i<12;i++)e[i]=Math.floor(Math.random()*64);for(i=0;i<12;i++)s+=xe.charAt(e[i]);return p(s.length===20,"nextPushId: Length should be 20."),s}}(),Ir=function(t){if(t===""+Pn)return hn;var e=gt(t);if(e!=null)return""+(e+1);for(var n=new Array(t.length),r=0;r<n.length;r++)n[r]=t.charAt(r);if(n.length<Oi)return n.push(hn),n.join("");for(var i=n.length-1;i>=0&&n[i]===xi;)i--;if(i===-1)return ne;var o=n[i],s=xe.charAt(xe.indexOf(o)+1);return n[i]=s,n.slice(0,i+1).join("")},br=function(t){if(t===""+ai)return ae;var e=gt(t);if(e!=null)return""+(e-1);for(var n=new Array(t.length),r=0;r<n.length;r++)n[r]=t.charAt(r);return n[n.length-1]===hn?n.length===1?""+Pn:(delete n[n.length-1],n.join("")):(n[n.length-1]=xe.charAt(xe.indexOf(n[n.length-1])-1),n.join("")+xi.repeat(Oi-n.length))};/**
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
 */function Di(t){return{type:"value",snapshotNode:t}}function Oe(t,e){return{type:"child_added",snapshotNode:e,childName:t}}function Ze(t,e){return{type:"child_removed",snapshotNode:e,childName:t}}function et(t,e,n){return{type:"child_changed",snapshotNode:e,childName:t,oldSnap:n}}function oa(t,e){return{type:"child_moved",snapshotNode:e,childName:t}}/**
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
 */var Bn=function(){function t(e){this.index_=e}return t.prototype.updateChild=function(e,n,r,i,o,s){p(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");var a=e.getImmediateChild(n);return a.getChild(i).equals(r.getChild(i))&&a.isEmpty()===r.isEmpty()||(s!=null&&(r.isEmpty()?e.hasChild(n)?s.trackChildChange(Ze(n,a)):p(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?s.trackChildChange(Oe(n,r)):s.trackChildChange(et(n,r,a))),e.isLeafNode()&&r.isEmpty())?e:e.updateImmediateChild(n,r).withIndex(this.index_)},t.prototype.updateFullNode=function(e,n,r){return r!=null&&(e.isLeafNode()||e.forEachChild(R,function(i,o){n.hasChild(i)||r.trackChildChange(Ze(i,o))}),n.isLeafNode()||n.forEachChild(R,function(i,o){if(e.hasChild(i)){var s=e.getImmediateChild(i);s.equals(o)||r.trackChildChange(et(i,o,s))}else r.trackChildChange(Oe(i,o))})),n.withIndex(this.index_)},t.prototype.updatePriority=function(e,n){return e.isEmpty()?C.EMPTY_NODE:e.updatePriority(n)},t.prototype.filtersNodes=function(){return!1},t.prototype.getIndexedFilter=function(){return this},t.prototype.getIndex=function(){return this.index_},t}();/**
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
 */var Li=function(){function t(e){this.indexedFilter_=new Bn(e.getIndex()),this.index_=e.getIndex(),this.startPost_=t.getStartPost_(e),this.endPost_=t.getEndPost_(e)}return t.prototype.getStartPost=function(){return this.startPost_},t.prototype.getEndPost=function(){return this.endPost_},t.prototype.matches=function(e){return this.index_.compare(this.getStartPost(),e)<=0&&this.index_.compare(e,this.getEndPost())<=0},t.prototype.updateChild=function(e,n,r,i,o,s){return this.matches(new T(n,r))||(r=C.EMPTY_NODE),this.indexedFilter_.updateChild(e,n,r,i,o,s)},t.prototype.updateFullNode=function(e,n,r){n.isLeafNode()&&(n=C.EMPTY_NODE);var i=n.withIndex(this.index_);i=i.updatePriority(C.EMPTY_NODE);var o=this;return n.forEachChild(R,function(s,a){o.matches(new T(s,a))||(i=i.updateImmediateChild(s,C.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,i,r)},t.prototype.updatePriority=function(e,n){return e},t.prototype.filtersNodes=function(){return!0},t.prototype.getIndexedFilter=function(){return this.indexedFilter_},t.prototype.getIndex=function(){return this.index_},t.getStartPost_=function(e){if(e.hasStart()){var n=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),n)}else return e.getIndex().minPost()},t.getEndPost_=function(e){if(e.hasEnd()){var n=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),n)}else return e.getIndex().maxPost()},t}();/**
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
 */var sa=function(){function t(e){this.rangedFilter_=new Li(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft()}return t.prototype.updateChild=function(e,n,r,i,o,s){return this.rangedFilter_.matches(new T(n,r))||(r=C.EMPTY_NODE),e.getImmediateChild(n).equals(r)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,n,r,i,o,s):this.fullLimitUpdateChild_(e,n,r,o,s)},t.prototype.updateFullNode=function(e,n,r){var i;if(n.isLeafNode()||n.isEmpty())i=C.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<n.numChildren()&&n.isIndexed(this.index_)){i=C.EMPTY_NODE.withIndex(this.index_);var o=void 0;this.reverse_?o=n.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):o=n.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);for(var s=0;o.hasNext()&&s<this.limit_;){var a=o.getNext(),u=void 0;if(this.reverse_?u=this.index_.compare(this.rangedFilter_.getStartPost(),a)<=0:u=this.index_.compare(a,this.rangedFilter_.getEndPost())<=0,u)i=i.updateImmediateChild(a.name,a.node),s++;else break}}else{i=n.withIndex(this.index_),i=i.updatePriority(C.EMPTY_NODE);var l=void 0,c=void 0,f=void 0,o=void 0;if(this.reverse_){o=i.getReverseIterator(this.index_),l=this.rangedFilter_.getEndPost(),c=this.rangedFilter_.getStartPost();var h=this.index_.getCompare();f=function(_,m){return h(m,_)}}else o=i.getIterator(this.index_),l=this.rangedFilter_.getStartPost(),c=this.rangedFilter_.getEndPost(),f=this.index_.getCompare();for(var s=0,d=!1;o.hasNext();){var a=o.getNext();!d&&f(l,a)<=0&&(d=!0);var u=d&&s<this.limit_&&f(a,c)<=0;u?s++:i=i.updateImmediateChild(a.name,C.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,i,r)},t.prototype.updatePriority=function(e,n){return e},t.prototype.filtersNodes=function(){return!0},t.prototype.getIndexedFilter=function(){return this.rangedFilter_.getIndexedFilter()},t.prototype.getIndex=function(){return this.index_},t.prototype.fullLimitUpdateChild_=function(e,n,r,i,o){var s;if(this.reverse_){var a=this.index_.getCompare();s=function(A,J){return a(J,A)}}else s=this.index_.getCompare();var u=e;p(u.numChildren()===this.limit_,"");var l=new T(n,r),c=this.reverse_?u.getFirstChild(this.index_):u.getLastChild(this.index_),f=this.rangedFilter_.matches(l);if(u.hasChild(n)){for(var h=u.getImmediateChild(n),d=i.getChildAfterChild(this.index_,c,this.reverse_);d!=null&&(d.name===n||u.hasChild(d.name));)d=i.getChildAfterChild(this.index_,d,this.reverse_);var v=d==null?1:s(d,l),g=f&&!r.isEmpty()&&v>=0;if(g)return o!=null&&o.trackChildChange(et(n,r,h)),u.updateImmediateChild(n,r);o!=null&&o.trackChildChange(Ze(n,h));var _=u.updateImmediateChild(n,C.EMPTY_NODE),m=d!=null&&this.rangedFilter_.matches(d);return m?(o!=null&&o.trackChildChange(Oe(d.name,d.node)),_.updateImmediateChild(d.name,d.node)):_}else return r.isEmpty()?e:f&&s(c,l)>=0?(o!=null&&(o.trackChildChange(Ze(c.name,c.node)),o.trackChildChange(Oe(n,r))),u.updateImmediateChild(n,r).updateImmediateChild(c.name,C.EMPTY_NODE)):e},t}();/**
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
 */var Mi=function(){function t(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=R}return t.prototype.hasStart=function(){return this.startSet_},t.prototype.hasStartAfter=function(){return this.startAfterSet_},t.prototype.hasEndBefore=function(){return this.endBeforeSet_},t.prototype.isViewFromLeft=function(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"},t.prototype.getIndexStartValue=function(){return p(this.startSet_,"Only valid if start has been set"),this.indexStartValue_},t.prototype.getIndexStartName=function(){return p(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:ae},t.prototype.hasEnd=function(){return this.endSet_},t.prototype.getIndexEndValue=function(){return p(this.endSet_,"Only valid if end has been set"),this.indexEndValue_},t.prototype.getIndexEndName=function(){return p(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:ne},t.prototype.hasLimit=function(){return this.limitSet_},t.prototype.hasAnchoredLimit=function(){return this.limitSet_&&this.viewFrom_!==""},t.prototype.getLimit=function(){return p(this.limitSet_,"Only valid if limit has been set"),this.limit_},t.prototype.getIndex=function(){return this.index_},t.prototype.loadsAllData=function(){return!(this.startSet_||this.endSet_||this.limitSet_)},t.prototype.isDefault=function(){return this.loadsAllData()&&this.index_===R},t.prototype.copy=function(){var e=new t;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e},t}();function aa(t){return t.loadsAllData()?new Bn(t.getIndex()):t.hasLimit()?new sa(t):new Li(t)}function ua(t,e){var n=t.copy();return n.limitSet_=!0,n.limit_=e,n.viewFrom_="l",n}function la(t,e){var n=t.copy();return n.limitSet_=!0,n.limit_=e,n.viewFrom_="r",n}function dn(t,e,n){var r=t.copy();return r.startSet_=!0,e===void 0&&(e=null),r.indexStartValue_=e,n!=null?(r.startNameSet_=!0,r.indexStartName_=n):(r.startNameSet_=!1,r.indexStartName_=""),r}function ca(t,e,n){var r;if(t.index_===Z)typeof e=="string"&&(e=Ir(e)),r=dn(t,e,n);else{var i=void 0;n==null?i=ne:i=Ir(n),r=dn(t,e,i)}return r.startAfterSet_=!0,r}function pn(t,e,n){var r=t.copy();return r.endSet_=!0,e===void 0&&(e=null),r.indexEndValue_=e,n!==void 0?(r.endNameSet_=!0,r.indexEndName_=n):(r.endNameSet_=!1,r.indexEndName_=""),r}function fa(t,e,n){var r,i;return t.index_===Z?(typeof e=="string"&&(e=br(e)),i=pn(t,e,n)):(n==null?r=ae:r=br(n),i=pn(t,e,r)),i.endBeforeSet_=!0,i}function Ot(t,e){var n=t.copy();return n.index_=e,n}function Rr(t){var e={};if(t.isDefault())return e;var n;return t.index_===R?n="$priority":t.index_===Un?n="$value":t.index_===Z?n="$key":(p(t.index_ instanceof Wn,"Unrecognized index type!"),n=t.index_.toString()),e.orderBy=x(n),t.startSet_&&(e.startAt=x(t.indexStartValue_),t.startNameSet_&&(e.startAt+=","+x(t.indexStartName_))),t.endSet_&&(e.endAt=x(t.indexEndValue_),t.endNameSet_&&(e.endAt+=","+x(t.indexEndName_))),t.limitSet_&&(t.isViewFromLeft()?e.limitToFirst=t.limit_:e.limitToLast=t.limit_),e}function Nr(t){var e={};if(t.startSet_&&(e.sp=t.indexStartValue_,t.startNameSet_&&(e.sn=t.indexStartName_)),t.endSet_&&(e.ep=t.indexEndValue_,t.endNameSet_&&(e.en=t.indexEndName_)),t.limitSet_){e.l=t.limit_;var n=t.viewFrom_;n===""&&(t.isViewFromLeft()?n="l":n="r"),e.vf=n}return t.index_!==R&&(e.i=t.index_.toString()),e}/**
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
 */var ha=function(t){P(e,t);function e(n,r,i,o){var s=t.call(this)||this;return s.repoInfo_=n,s.onDataUpdate_=r,s.authTokenProvider_=i,s.appCheckTokenProvider_=o,s.log_=ot("p:rest:"),s.listens_={},s}return e.prototype.reportStats=function(n){throw new Error("Method not implemented.")},e.getListenId_=function(n,r){return r!==void 0?"tag$"+r:(p(n._queryParams.isDefault(),"should have a tag if it's not a default query."),n._path.toString())},e.prototype.listen=function(n,r,i,o){var s=this,a=n._path.toString();this.log_("Listen called for "+a+" "+n._queryIdentifier);var u=e.getListenId_(n,i),l={};this.listens_[u]=l;var c=Rr(n._queryParams);this.restRequest_(a+".json",c,function(f,h){var d=h;if(f===404&&(d=null,f=null),f===null&&s.onDataUpdate_(a,d,!1,i),Te(s.listens_,u)===l){var v;f?f===401?v="permission_denied":v="rest_error:"+f:v="ok",o(v,null)}})},e.prototype.unlisten=function(n,r){var i=e.getListenId_(n,r);delete this.listens_[i]},e.prototype.get=function(n){var r=this,i=Rr(n._queryParams),o=n._path.toString(),s=new W;return this.restRequest_(o+".json",i,function(a,u){var l=u;a===404&&(l=null,a=null),a===null?(r.onDataUpdate_(o,l,!1,null),s.resolve(l)):s.reject(new Error(l))}),s.promise},e.prototype.refreshAuthToken=function(n){},e.prototype.restRequest_=function(n,r,i){var o=this;return r===void 0&&(r={}),r.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(function(s){var a=K(s,2),u=a[0],l=a[1];u&&u.accessToken&&(r.auth=u.accessToken),l&&l.token&&(r.ac=l.token);var c=(o.repoInfo_.secure?"https://":"http://")+o.repoInfo_.host+n+"?ns="+o.repoInfo_.namespace+Do(r);o.log_("Sending REST request for "+c);var f=new XMLHttpRequest;f.onreadystatechange=function(){if(i&&f.readyState===4){o.log_("REST Response for "+c+" received. status:",f.status,"response:",f.responseText);var h=null;if(f.status>=200&&f.status<300){try{h=Nn(f.responseText)}catch{M("Failed to parse JSON response for "+c+": "+f.responseText)}i(null,h)}else f.status!==401&&f.status!==404&&M("Got unsuccessful REST response for "+c+" Status: "+f.status),i(f.status);i=null}},f.open("GET",c,!0),f.send()})},e}(Ti);/**
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
 */var da=function(){function t(){this.rootNode_=C.EMPTY_NODE}return t.prototype.getNode=function(e){return this.rootNode_.getChild(e)},t.prototype.updateSnapshot=function(e,n){this.rootNode_=this.rootNode_.updateChild(e,n)},t}();/**
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
 */function Et(){return{value:null,children:new Map}}function We(t,e,n){if(w(e))t.value=n,t.children.clear();else if(t.value!==null)t.value=t.value.updateChild(e,n);else{var r=E(e);t.children.has(r)||t.children.set(r,Et());var i=t.children.get(r);e=b(e),We(i,e,n)}}function vn(t,e){if(w(e))return t.value=null,t.children.clear(),!0;if(t.value!==null){if(t.value.isLeafNode())return!1;var n=t.value;return t.value=null,n.forEachChild(R,function(o,s){We(t,new I(o),s)}),vn(t,e)}else if(t.children.size>0){var r=E(e);if(e=b(e),t.children.has(r)){var i=vn(t.children.get(r),e);i&&t.children.delete(r)}return t.children.size===0}else return!0}function _n(t,e,n){t.value!==null?n(e,t.value):pa(t,function(r,i){var o=new I(e.toString()+"/"+r);_n(i,o,n)})}function pa(t,e){t.children.forEach(function(n,r){e(r,n)})}/**
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
 */var Fi=function(){function t(e){this.collection_=e,this.last_=null}return t.prototype.get=function(){var e=this.collection_.get(),n=an({},e);return this.last_&&O(this.last_,function(r,i){n[r]=n[r]-i}),this.last_=e,n},t}();/**
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
 */var kr=10*1e3,va=30*1e3,_a=5*60*1e3,ga=function(){function t(e,n){this.server_=n,this.statsToReport_={},this.statsListener_=new Fi(e);var r=kr+(va-kr)*Math.random();Ye(this.reportStats_.bind(this),Math.floor(r))}return t.prototype.reportStats_=function(){var e=this,n=this.statsListener_.get(),r={},i=!1;O(n,function(o,s){s>0&&$(e.statsToReport_,o)&&(r[o]=s,i=!0)}),i&&this.server_.reportStats(r),Ye(this.reportStats_.bind(this),Math.floor(Math.random()*2*_a))},t}();function ya(t,e){t.statsToReport_[e]=!0}/**
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
 */var q;(function(t){t[t.OVERWRITE=0]="OVERWRITE",t[t.MERGE=1]="MERGE",t[t.ACK_USER_WRITE=2]="ACK_USER_WRITE",t[t.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(q||(q={}));function Qn(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function Gn(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function Vn(t){return{fromUser:!1,fromServer:!0,queryId:t,tagged:!0}}/**
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
 */var ma=function(){function t(e,n,r){this.path=e,this.affectedTree=n,this.revert=r,this.type=q.ACK_USER_WRITE,this.source=Qn()}return t.prototype.operationForChild=function(e){if(w(this.path)){if(this.affectedTree.value!=null)return p(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;var n=this.affectedTree.subtree(new I(e));return new t(S(),n,this.revert)}else return p(E(this.path)===e,"operationForChild called for unrelated child."),new t(b(this.path),this.affectedTree,this.revert)},t}();/**
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
 */var Wi=function(){function t(e,n){this.source=e,this.path=n,this.type=q.LISTEN_COMPLETE}return t.prototype.operationForChild=function(e){return w(this.path)?new t(this.source,S()):new t(this.source,b(this.path))},t}();/**
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
 */var Dt=function(){function t(e,n,r){this.source=e,this.path=n,this.snap=r,this.type=q.OVERWRITE}return t.prototype.operationForChild=function(e){return w(this.path)?new t(this.source,S(),this.snap.getImmediateChild(e)):new t(this.source,b(this.path),this.snap)},t}();/**
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
 */var Hn=function(){function t(e,n,r){this.source=e,this.path=n,this.children=r,this.type=q.MERGE}return t.prototype.operationForChild=function(e){if(w(this.path)){var n=this.children.subtree(new I(e));return n.isEmpty()?null:n.value?new Dt(this.source,S(),n.value):new t(this.source,S(),n)}else return p(E(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new t(this.source,b(this.path),this.children)},t.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"},t}();/**
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
 */var he=function(){function t(e,n,r){this.node_=e,this.fullyInitialized_=n,this.filtered_=r}return t.prototype.isFullyInitialized=function(){return this.fullyInitialized_},t.prototype.isFiltered=function(){return this.filtered_},t.prototype.isCompleteForPath=function(e){if(w(e))return this.isFullyInitialized()&&!this.filtered_;var n=E(e);return this.isCompleteForChild(n)},t.prototype.isCompleteForChild=function(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)},t.prototype.getNode=function(){return this.node_},t}();/**
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
 */var Ca=function(){function t(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}return t}();function Ea(t,e,n,r){var i=[],o=[];return e.forEach(function(s){s.type==="child_changed"&&t.index_.indexedValueChanged(s.oldSnap,s.snapshotNode)&&o.push(oa(s.childName,s.snapshotNode))}),je(t,i,"child_removed",e,r,n),je(t,i,"child_added",e,r,n),je(t,i,"child_moved",o,r,n),je(t,i,"child_changed",e,r,n),je(t,i,"value",e,r,n),i}function je(t,e,n,r,i,o){var s=r.filter(function(a){return a.type===n});s.sort(function(a,u){return Ta(t,a,u)}),s.forEach(function(a){var u=wa(t,a,o);i.forEach(function(l){l.respondsTo(a.type)&&e.push(l.createEvent(u,t.query_))})})}function wa(t,e,n){return e.type==="value"||e.type==="child_removed"||(e.prevName=n.getPredecessorChildName(e.childName,e.snapshotNode,t.index_)),e}function Ta(t,e,n){if(e.childName==null||n.childName==null)throw rt("Should only compare child_ events.");var r=new T(e.childName,e.snapshotNode),i=new T(n.childName,n.snapshotNode);return t.index_.compare(r,i)}/**
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
 */function Lt(t,e){return{eventCache:t,serverCache:e}}function qe(t,e,n,r){return Lt(new he(e,n,r),t.serverCache)}function Ui(t,e,n,r){return Lt(t.eventCache,new he(e,n,r))}function wt(t){return t.eventCache.isFullyInitialized()?t.eventCache.getNode():null}function Se(t){return t.serverCache.isFullyInitialized()?t.serverCache.getNode():null}/**
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
 */var nn,Sa=function(){return nn||(nn=new oe(ts)),nn},U=function(){function t(e,n){n===void 0&&(n=Sa()),this.value=e,this.children=n}return t.fromObject=function(e){var n=new t(null);return O(e,function(r,i){n=n.set(new I(r),i)}),n},t.prototype.isEmpty=function(){return this.value===null&&this.children.isEmpty()},t.prototype.findRootMostMatchingPathAndValue=function(e,n){if(this.value!=null&&n(this.value))return{path:S(),value:this.value};if(w(e))return null;var r=E(e),i=this.children.get(r);if(i!==null){var o=i.findRootMostMatchingPathAndValue(b(e),n);if(o!=null){var s=N(new I(r),o.path);return{path:s,value:o.value}}else return null}else return null},t.prototype.findRootMostValueAndPath=function(e){return this.findRootMostMatchingPathAndValue(e,function(){return!0})},t.prototype.subtree=function(e){if(w(e))return this;var n=E(e),r=this.children.get(n);return r!==null?r.subtree(b(e)):new t(null)},t.prototype.set=function(e,n){if(w(e))return new t(n,this.children);var r=E(e),i=this.children.get(r)||new t(null),o=i.set(b(e),n),s=this.children.insert(r,o);return new t(this.value,s)},t.prototype.remove=function(e){if(w(e))return this.children.isEmpty()?new t(null):new t(null,this.children);var n=E(e),r=this.children.get(n);if(r){var i=r.remove(b(e)),o=void 0;return i.isEmpty()?o=this.children.remove(n):o=this.children.insert(n,i),this.value===null&&o.isEmpty()?new t(null):new t(this.value,o)}else return this},t.prototype.get=function(e){if(w(e))return this.value;var n=E(e),r=this.children.get(n);return r?r.get(b(e)):null},t.prototype.setTree=function(e,n){if(w(e))return n;var r=E(e),i=this.children.get(r)||new t(null),o=i.setTree(b(e),n),s=void 0;return o.isEmpty()?s=this.children.remove(r):s=this.children.insert(r,o),new t(this.value,s)},t.prototype.fold=function(e){return this.fold_(S(),e)},t.prototype.fold_=function(e,n){var r={};return this.children.inorderTraversal(function(i,o){r[i]=o.fold_(N(e,i),n)}),n(e,this.value,r)},t.prototype.findOnPath=function(e,n){return this.findOnPath_(e,S(),n)},t.prototype.findOnPath_=function(e,n,r){var i=this.value?r(n,this.value):!1;if(i)return i;if(w(e))return null;var o=E(e),s=this.children.get(o);return s?s.findOnPath_(b(e),N(n,o),r):null},t.prototype.foreachOnPath=function(e,n){return this.foreachOnPath_(e,S(),n)},t.prototype.foreachOnPath_=function(e,n,r){if(w(e))return this;this.value&&r(n,this.value);var i=E(e),o=this.children.get(i);return o?o.foreachOnPath_(b(e),N(n,i),r):new t(null)},t.prototype.foreach=function(e){this.foreach_(S(),e)},t.prototype.foreach_=function(e,n){this.children.inorderTraversal(function(r,i){i.foreach_(N(e,r),n)}),this.value&&n(e,this.value)},t.prototype.foreachChild=function(e){this.children.inorderTraversal(function(n,r){r.value&&e(n,r.value)})},t}();/**
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
 */var se=function(){function t(e){this.writeTree_=e}return t.empty=function(){return new t(new U(null))},t}();function Ke(t,e,n){if(w(e))return new se(new U(n));var r=t.writeTree_.findRootMostValueAndPath(e);if(r!=null){var i=r.path,o=r.value,s=F(i,e);return o=o.updateChild(s,n),new se(t.writeTree_.set(i,o))}else{var a=new U(n),u=t.writeTree_.setTree(e,a);return new se(u)}}function gn(t,e,n){var r=t;return O(n,function(i,o){r=Ke(r,N(e,i),o)}),r}function Pr(t,e){if(w(e))return se.empty();var n=t.writeTree_.setTree(e,new U(null));return new se(n)}function yn(t,e){return Re(t,e)!=null}function Re(t,e){var n=t.writeTree_.findRootMostValueAndPath(e);return n!=null?t.writeTree_.get(n.path).getChild(F(n.path,e)):null}function Ar(t){var e=[],n=t.writeTree_.value;return n!=null?n.isLeafNode()||n.forEachChild(R,function(r,i){e.push(new T(r,i))}):t.writeTree_.children.inorderTraversal(function(r,i){i.value!=null&&e.push(new T(r,i.value))}),e}function le(t,e){if(w(e))return t;var n=Re(t,e);return n!=null?new se(new U(n)):new se(t.writeTree_.subtree(e))}function mn(t){return t.writeTree_.isEmpty()}function De(t,e){return Bi(S(),t.writeTree_,e)}function Bi(t,e,n){if(e.value!=null)return n.updateChild(t,e.value);var r=null;return e.children.inorderTraversal(function(i,o){i===".priority"?(p(o.value!==null,"Priority writes must always be leaf nodes"),r=o.value):n=Bi(N(t,i),o,n)}),!n.getChild(t).isEmpty()&&r!==null&&(n=n.updateChild(N(t,".priority"),r)),n}/**
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
 */function Mt(t,e){return Hi(e,t)}function Ia(t,e,n,r,i){p(r>t.lastWriteId,"Stacking an older write on top of newer ones"),i===void 0&&(i=!0),t.allWrites.push({path:e,snap:n,writeId:r,visible:i}),i&&(t.visibleWrites=Ke(t.visibleWrites,e,n)),t.lastWriteId=r}function ba(t,e,n,r){p(r>t.lastWriteId,"Stacking an older merge on top of newer ones"),t.allWrites.push({path:e,children:n,writeId:r,visible:!0}),t.visibleWrites=gn(t.visibleWrites,e,n),t.lastWriteId=r}function Ra(t,e){for(var n=0;n<t.allWrites.length;n++){var r=t.allWrites[n];if(r.writeId===e)return r}return null}function Na(t,e){var n=t.allWrites.findIndex(function(l){return l.writeId===e});p(n>=0,"removeWrite called with nonexistent writeId.");var r=t.allWrites[n];t.allWrites.splice(n,1);for(var i=r.visible,o=!1,s=t.allWrites.length-1;i&&s>=0;){var a=t.allWrites[s];a.visible&&(s>=n&&ka(a,r.path)?i=!1:Q(r.path,a.path)&&(o=!0)),s--}if(i){if(o)return Pa(t),!0;if(r.snap)t.visibleWrites=Pr(t.visibleWrites,r.path);else{var u=r.children;O(u,function(l){t.visibleWrites=Pr(t.visibleWrites,N(r.path,l))})}return!0}else return!1}function ka(t,e){if(t.snap)return Q(t.path,e);for(var n in t.children)if(t.children.hasOwnProperty(n)&&Q(N(t.path,n),e))return!0;return!1}function Pa(t){t.visibleWrites=Qi(t.allWrites,Aa,S()),t.allWrites.length>0?t.lastWriteId=t.allWrites[t.allWrites.length-1].writeId:t.lastWriteId=-1}function Aa(t){return t.visible}function Qi(t,e,n){for(var r=se.empty(),i=0;i<t.length;++i){var o=t[i];if(e(o)){var s=o.path,a=void 0;if(o.snap)Q(n,s)?(a=F(n,s),r=Ke(r,a,o.snap)):Q(s,n)&&(a=F(s,n),r=Ke(r,S(),o.snap.getChild(a)));else if(o.children){if(Q(n,s))a=F(n,s),r=gn(r,a,o.children);else if(Q(s,n))if(a=F(s,n),w(a))r=gn(r,S(),o.children);else{var u=Te(o.children,E(a));if(u){var l=u.getChild(b(a));r=Ke(r,S(),l)}}}else throw rt("WriteRecord should have .snap or .children")}}return r}function Gi(t,e,n,r,i){if(!r&&!i){var o=Re(t.visibleWrites,e);if(o!=null)return o;var s=le(t.visibleWrites,e);if(mn(s))return n;if(n==null&&!yn(s,S()))return null;var a=n||C.EMPTY_NODE;return De(s,a)}else{var u=le(t.visibleWrites,e);if(!i&&mn(u))return n;if(!i&&n==null&&!yn(u,S()))return null;var l=function(h){return(h.visible||i)&&(!r||!~r.indexOf(h.writeId))&&(Q(h.path,e)||Q(e,h.path))},c=Qi(t.allWrites,l,e),a=n||C.EMPTY_NODE;return De(c,a)}}function xa(t,e,n){var r=C.EMPTY_NODE,i=Re(t.visibleWrites,e);if(i)return i.isLeafNode()||i.forEachChild(R,function(a,u){r=r.updateImmediateChild(a,u)}),r;if(n){var o=le(t.visibleWrites,e);return n.forEachChild(R,function(a,u){var l=De(le(o,new I(a)),u);r=r.updateImmediateChild(a,l)}),Ar(o).forEach(function(a){r=r.updateImmediateChild(a.name,a.node)}),r}else{var s=le(t.visibleWrites,e);return Ar(s).forEach(function(a){r=r.updateImmediateChild(a.name,a.node)}),r}}function Oa(t,e,n,r,i){p(r||i,"Either existingEventSnap or existingServerSnap must exist");var o=N(e,n);if(yn(t.visibleWrites,o))return null;var s=le(t.visibleWrites,o);return mn(s)?i.getChild(n):De(s,i.getChild(n))}function Da(t,e,n,r){var i=N(e,n),o=Re(t.visibleWrites,i);if(o!=null)return o;if(r.isCompleteForChild(n)){var s=le(t.visibleWrites,i);return De(s,r.getNode().getImmediateChild(n))}else return null}function La(t,e){return Re(t.visibleWrites,e)}function Ma(t,e,n,r,i,o,s){var a,u=le(t.visibleWrites,e),l=Re(u,S());if(l!=null)a=l;else if(n!=null)a=De(u,n);else return[];if(a=a.withIndex(s),!a.isEmpty()&&!a.isLeafNode()){for(var c=[],f=s.getCompare(),h=o?a.getReverseIteratorFrom(r,s):a.getIteratorFrom(r,s),d=h.getNext();d&&c.length<i;)f(d,r)!==0&&c.push(d),d=h.getNext();return c}else return[]}function Fa(){return{visibleWrites:se.empty(),allWrites:[],lastWriteId:-1}}function Tt(t,e,n,r){return Gi(t.writeTree,t.treePath,e,n,r)}function jn(t,e){return xa(t.writeTree,t.treePath,e)}function xr(t,e,n,r){return Oa(t.writeTree,t.treePath,e,n,r)}function St(t,e){return La(t.writeTree,N(t.treePath,e))}function Wa(t,e,n,r,i,o){return Ma(t.writeTree,t.treePath,e,n,r,i,o)}function Yn(t,e,n){return Da(t.writeTree,t.treePath,e,n)}function Vi(t,e){return Hi(N(t.treePath,e),t.writeTree)}function Hi(t,e){return{treePath:t,writeTree:e}}/**
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
 */var Ua=function(){function t(){this.changeMap=new Map}return t.prototype.trackChildChange=function(e){var n=e.type,r=e.childName;p(n==="child_added"||n==="child_changed"||n==="child_removed","Only child changes supported for tracking"),p(r!==".priority","Only non-priority child changes can be tracked.");var i=this.changeMap.get(r);if(i){var o=i.type;if(n==="child_added"&&o==="child_removed")this.changeMap.set(r,et(r,e.snapshotNode,i.snapshotNode));else if(n==="child_removed"&&o==="child_added")this.changeMap.delete(r);else if(n==="child_removed"&&o==="child_changed")this.changeMap.set(r,Ze(r,i.oldSnap));else if(n==="child_changed"&&o==="child_added")this.changeMap.set(r,Oe(r,e.snapshotNode));else if(n==="child_changed"&&o==="child_changed")this.changeMap.set(r,et(r,e.snapshotNode,i.oldSnap));else throw rt("Illegal combination of changes: "+e+" occurred after "+i)}else this.changeMap.set(r,e)},t.prototype.getChanges=function(){return Array.from(this.changeMap.values())},t}();/**
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
 */var Ba=function(){function t(){}return t.prototype.getCompleteChild=function(e){return null},t.prototype.getChildAfterChild=function(e,n,r){return null},t}(),ji=new Ba,zn=function(){function t(e,n,r){r===void 0&&(r=null),this.writes_=e,this.viewCache_=n,this.optCompleteServerCache_=r}return t.prototype.getCompleteChild=function(e){var n=this.viewCache_.eventCache;if(n.isCompleteForChild(e))return n.getNode().getImmediateChild(e);var r=this.optCompleteServerCache_!=null?new he(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return Yn(this.writes_,e,r)},t.prototype.getChildAfterChild=function(e,n,r){var i=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:Se(this.viewCache_),o=Wa(this.writes_,i,n,1,r,e);return o.length===0?null:o[0]},t}();/**
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
 */function Qa(t){return{filter:t}}function Ga(t,e){p(e.eventCache.getNode().isIndexed(t.filter.getIndex()),"Event snap not indexed"),p(e.serverCache.getNode().isIndexed(t.filter.getIndex()),"Server snap not indexed")}function Va(t,e,n,r,i){var o=new Ua,s,a;if(n.type===q.OVERWRITE){var u=n;u.source.fromUser?s=Cn(t,e,u.path,u.snap,r,i,o):(p(u.source.fromServer,"Unknown source."),a=u.source.tagged||e.serverCache.isFiltered()&&!w(u.path),s=It(t,e,u.path,u.snap,r,i,a,o))}else if(n.type===q.MERGE){var l=n;l.source.fromUser?s=ja(t,e,l.path,l.children,r,i,o):(p(l.source.fromServer,"Unknown source."),a=l.source.tagged||e.serverCache.isFiltered(),s=En(t,e,l.path,l.children,r,i,a,o))}else if(n.type===q.ACK_USER_WRITE){var c=n;c.revert?s=qa(t,e,c.path,r,i,o):s=Ya(t,e,c.path,c.affectedTree,r,i,o)}else if(n.type===q.LISTEN_COMPLETE)s=za(t,e,n.path,r,o);else throw rt("Unknown operation type: "+n.type);var f=o.getChanges();return Ha(e,s,f),{viewCache:s,changes:f}}function Ha(t,e,n){var r=e.eventCache;if(r.isFullyInitialized()){var i=r.getNode().isLeafNode()||r.getNode().isEmpty(),o=wt(t);(n.length>0||!t.eventCache.isFullyInitialized()||i&&!r.getNode().equals(o)||!r.getNode().getPriority().equals(o.getPriority()))&&n.push(Di(wt(e)))}}function Yi(t,e,n,r,i,o){var s=e.eventCache;if(St(r,n)!=null)return e;var a=void 0,u=void 0;if(w(n))if(p(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){var l=Se(e),c=l instanceof C?l:C.EMPTY_NODE,f=jn(r,c);a=t.filter.updateFullNode(e.eventCache.getNode(),f,o)}else{var h=Tt(r,Se(e));a=t.filter.updateFullNode(e.eventCache.getNode(),h,o)}else{var d=E(n);if(d===".priority"){p(fe(n)===1,"Can't have a priority with additional path components");var v=s.getNode();u=e.serverCache.getNode();var g=xr(r,n,v,u);g!=null?a=t.filter.updatePriority(v,g):a=s.getNode()}else{var _=b(n),m=void 0;if(s.isCompleteForChild(d)){u=e.serverCache.getNode();var A=xr(r,n,s.getNode(),u);A!=null?m=s.getNode().getImmediateChild(d).updateChild(_,A):m=s.getNode().getImmediateChild(d)}else m=Yn(r,d,e.serverCache);m!=null?a=t.filter.updateChild(s.getNode(),d,m,_,i,o):a=s.getNode()}}return qe(e,a,s.isFullyInitialized()||w(n),t.filter.filtersNodes())}function It(t,e,n,r,i,o,s,a){var u=e.serverCache,l,c=s?t.filter:t.filter.getIndexedFilter();if(w(n))l=c.updateFullNode(u.getNode(),r,null);else if(c.filtersNodes()&&!u.isFiltered()){var f=u.getNode().updateChild(n,r);l=c.updateFullNode(u.getNode(),f,null)}else{var h=E(n);if(!u.isCompleteForPath(n)&&fe(n)>1)return e;var d=b(n),v=u.getNode().getImmediateChild(h),g=v.updateChild(d,r);h===".priority"?l=c.updatePriority(u.getNode(),g):l=c.updateChild(u.getNode(),h,g,d,ji,null)}var _=Ui(e,l,u.isFullyInitialized()||w(n),c.filtersNodes()),m=new zn(i,_,o);return Yi(t,_,n,i,m,a)}function Cn(t,e,n,r,i,o,s){var a=e.eventCache,u,l,c=new zn(i,e,o);if(w(n))l=t.filter.updateFullNode(e.eventCache.getNode(),r,s),u=qe(e,l,!0,t.filter.filtersNodes());else{var f=E(n);if(f===".priority")l=t.filter.updatePriority(e.eventCache.getNode(),r),u=qe(e,l,a.isFullyInitialized(),a.isFiltered());else{var h=b(n),d=a.getNode().getImmediateChild(f),v=void 0;if(w(h))v=r;else{var g=c.getCompleteChild(f);g!=null?Ln(h)===".priority"&&g.getChild(Ii(h)).isEmpty()?v=g:v=g.updateChild(h,r):v=C.EMPTY_NODE}if(d.equals(v))u=e;else{var _=t.filter.updateChild(a.getNode(),f,v,h,c,s);u=qe(e,_,a.isFullyInitialized(),t.filter.filtersNodes())}}}return u}function Or(t,e){return t.eventCache.isCompleteForChild(e)}function ja(t,e,n,r,i,o,s){var a=e;return r.foreach(function(u,l){var c=N(n,u);Or(e,E(c))&&(a=Cn(t,a,c,l,i,o,s))}),r.foreach(function(u,l){var c=N(n,u);Or(e,E(c))||(a=Cn(t,a,c,l,i,o,s))}),a}function Dr(t,e,n){return n.foreach(function(r,i){e=e.updateChild(r,i)}),e}function En(t,e,n,r,i,o,s,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;var u=e,l;w(n)?l=r:l=new U(null).setTree(n,r);var c=e.serverCache.getNode();return l.children.inorderTraversal(function(f,h){if(c.hasChild(f)){var d=e.serverCache.getNode().getImmediateChild(f),v=Dr(t,d,h);u=It(t,u,new I(f),v,i,o,s,a)}}),l.children.inorderTraversal(function(f,h){var d=!e.serverCache.isCompleteForChild(f)&&h.value===void 0;if(!c.hasChild(f)&&!d){var v=e.serverCache.getNode().getImmediateChild(f),g=Dr(t,v,h);u=It(t,u,new I(f),g,i,o,s,a)}}),u}function Ya(t,e,n,r,i,o,s){if(St(i,n)!=null)return e;var a=e.serverCache.isFiltered(),u=e.serverCache;if(r.value!=null){if(w(n)&&u.isFullyInitialized()||u.isCompleteForPath(n))return It(t,e,n,u.getNode().getChild(n),i,o,a,s);if(w(n)){var l=new U(null);return u.getNode().forEachChild(Z,function(f,h){l=l.set(new I(f),h)}),En(t,e,n,l,i,o,a,s)}else return e}else{var c=new U(null);return r.foreach(function(f,h){var d=N(n,f);u.isCompleteForPath(d)&&(c=c.set(f,u.getNode().getChild(d)))}),En(t,e,n,c,i,o,a,s)}}function za(t,e,n,r,i){var o=e.serverCache,s=Ui(e,o.getNode(),o.isFullyInitialized()||w(n),o.isFiltered());return Yi(t,s,n,r,ji,i)}function qa(t,e,n,r,i,o){var s;if(St(r,n)!=null)return e;var a=new zn(r,e,i),u=e.eventCache.getNode(),l=void 0;if(w(n)||E(n)===".priority"){var c=void 0;if(e.serverCache.isFullyInitialized())c=Tt(r,Se(e));else{var f=e.serverCache.getNode();p(f instanceof C,"serverChildren would be complete if leaf node"),c=jn(r,f)}c=c,l=t.filter.updateFullNode(u,c,o)}else{var h=E(n),d=Yn(r,h,e.serverCache);d==null&&e.serverCache.isCompleteForChild(h)&&(d=u.getImmediateChild(h)),d!=null?l=t.filter.updateChild(u,h,d,b(n),a,o):e.eventCache.getNode().hasChild(h)?l=t.filter.updateChild(u,h,C.EMPTY_NODE,b(n),a,o):l=u,l.isEmpty()&&e.serverCache.isFullyInitialized()&&(s=Tt(r,Se(e)),s.isLeafNode()&&(l=t.filter.updateFullNode(l,s,o)))}return s=e.serverCache.isFullyInitialized()||St(r,S())!=null,qe(e,l,s,t.filter.filtersNodes())}/**
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
 */var Ka=function(){function t(e,n){this.query_=e,this.eventRegistrations_=[];var r=this.query_._queryParams,i=new Bn(r.getIndex()),o=aa(r);this.processor_=Qa(o);var s=n.serverCache,a=n.eventCache,u=i.updateFullNode(C.EMPTY_NODE,s.getNode(),null),l=o.updateFullNode(C.EMPTY_NODE,a.getNode(),null),c=new he(u,s.isFullyInitialized(),i.filtersNodes()),f=new he(l,a.isFullyInitialized(),o.filtersNodes());this.viewCache_=Lt(f,c),this.eventGenerator_=new Ca(this.query_)}return Object.defineProperty(t.prototype,"query",{get:function(){return this.query_},enumerable:!1,configurable:!0}),t}();function $a(t){return t.viewCache_.serverCache.getNode()}function Xa(t){return wt(t.viewCache_)}function Ja(t,e){var n=Se(t.viewCache_);return n&&(t.query._queryParams.loadsAllData()||!w(e)&&!n.getImmediateChild(E(e)).isEmpty())?n.getChild(e):null}function Lr(t){return t.eventRegistrations_.length===0}function Za(t,e){t.eventRegistrations_.push(e)}function Mr(t,e,n){var r=[];if(n){p(e==null,"A cancel should cancel all event registrations.");var i=t.query._path;t.eventRegistrations_.forEach(function(u){var l=u.createCancelEvent(n,i);l&&r.push(l)})}if(e){for(var o=[],s=0;s<t.eventRegistrations_.length;++s){var a=t.eventRegistrations_[s];if(!a.matches(e))o.push(a);else if(e.hasAnyCallback()){o=o.concat(t.eventRegistrations_.slice(s+1));break}}t.eventRegistrations_=o}else t.eventRegistrations_=[];return r}function Fr(t,e,n,r){e.type===q.MERGE&&e.source.queryId!==null&&(p(Se(t.viewCache_),"We should always have a full cache before handling merges"),p(wt(t.viewCache_),"Missing event cache, even though we have a server cache"));var i=t.viewCache_,o=Va(t.processor_,i,e,n,r);return Ga(t.processor_,o.viewCache),p(o.viewCache.serverCache.isFullyInitialized()||!i.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),t.viewCache_=o.viewCache,zi(t,o.changes,o.viewCache.eventCache.getNode(),null)}function eu(t,e){var n=t.viewCache_.eventCache,r=[];if(!n.getNode().isLeafNode()){var i=n.getNode();i.forEachChild(R,function(o,s){r.push(Oe(o,s))})}return n.isFullyInitialized()&&r.push(Di(n.getNode())),zi(t,r,n.getNode(),e)}function zi(t,e,n,r){var i=r?[r]:t.eventRegistrations_;return Ea(t.eventGenerator_,e,n,i)}/**
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
 */var bt,qi=function(){function t(){this.views=new Map}return t}();function tu(t){p(!bt,"__referenceConstructor has already been defined"),bt=t}function nu(){return p(bt,"Reference.ts has not been loaded"),bt}function ru(t){return t.views.size===0}function qn(t,e,n,r){var i,o,s=e.source.queryId;if(s!==null){var a=t.views.get(s);return p(a!=null,"SyncTree gave us an op for an invalid query."),Fr(a,e,n,r)}else{var u=[];try{for(var l=ee(t.views.values()),c=l.next();!c.done;c=l.next()){var a=c.value;u=u.concat(Fr(a,e,n,r))}}catch(f){i={error:f}}finally{try{c&&!c.done&&(o=l.return)&&o.call(l)}finally{if(i)throw i.error}}return u}}function Ki(t,e,n,r,i){var o=e._queryIdentifier,s=t.views.get(o);if(!s){var a=Tt(n,i?r:null),u=!1;a?u=!0:r instanceof C?(a=jn(n,r),u=!1):(a=C.EMPTY_NODE,u=!1);var l=Lt(new he(a,u,!1),new he(r,i,!1));return new Ka(e,l)}return s}function iu(t,e,n,r,i,o){var s=Ki(t,e,r,i,o);return t.views.has(e._queryIdentifier)||t.views.set(e._queryIdentifier,s),Za(s,n),eu(s,n)}function ou(t,e,n,r){var i,o,s=e._queryIdentifier,a=[],u=[],l=de(t);if(s==="default")try{for(var c=ee(t.views.entries()),f=c.next();!f.done;f=c.next()){var h=K(f.value,2),d=h[0],v=h[1];u=u.concat(Mr(v,n,r)),Lr(v)&&(t.views.delete(d),v.query._queryParams.loadsAllData()||a.push(v.query))}}catch(g){i={error:g}}finally{try{f&&!f.done&&(o=c.return)&&o.call(c)}finally{if(i)throw i.error}}else{var v=t.views.get(s);v&&(u=u.concat(Mr(v,n,r)),Lr(v)&&(t.views.delete(s),v.query._queryParams.loadsAllData()||a.push(v.query)))}return l&&!de(t)&&a.push(new(nu())(e._repo,e._path)),{removed:a,events:u}}function $i(t){var e,n,r=[];try{for(var i=ee(t.views.values()),o=i.next();!o.done;o=i.next()){var s=o.value;s.query._queryParams.loadsAllData()||r.push(s)}}catch(a){e={error:a}}finally{try{o&&!o.done&&(n=i.return)&&n.call(i)}finally{if(e)throw e.error}}return r}function ce(t,e){var n,r,i=null;try{for(var o=ee(t.views.values()),s=o.next();!s.done;s=o.next()){var a=s.value;i=i||Ja(a,e)}}catch(u){n={error:u}}finally{try{s&&!s.done&&(r=o.return)&&r.call(o)}finally{if(n)throw n.error}}return i}function Xi(t,e){var n=e._queryParams;if(n.loadsAllData())return Ft(t);var r=e._queryIdentifier;return t.views.get(r)}function Ji(t,e){return Xi(t,e)!=null}function de(t){return Ft(t)!=null}function Ft(t){var e,n;try{for(var r=ee(t.views.values()),i=r.next();!i.done;i=r.next()){var o=i.value;if(o.query._queryParams.loadsAllData())return o}}catch(s){e={error:s}}finally{try{i&&!i.done&&(n=r.return)&&n.call(r)}finally{if(e)throw e.error}}return null}/**
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
 */var Rt;function su(t){p(!Rt,"__referenceConstructor has already been defined"),Rt=t}function au(){return p(Rt,"Reference.ts has not been loaded"),Rt}var uu=1,Wr=function(){function t(e){this.listenProvider_=e,this.syncPointTree_=new U(null),this.pendingWriteTree_=Fa(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}return t}();function Kn(t,e,n,r,i){return Ia(t.pendingWriteTree_,e,n,r,i),i?Ue(t,new Dt(Qn(),e,n)):[]}function lu(t,e,n,r){ba(t.pendingWriteTree_,e,n,r);var i=U.fromObject(n);return Ue(t,new Hn(Qn(),e,i))}function ue(t,e,n){n===void 0&&(n=!1);var r=Ra(t.pendingWriteTree_,e),i=Na(t.pendingWriteTree_,e);if(i){var o=new U(null);return r.snap!=null?o=o.set(S(),!0):O(r.children,function(s){o=o.set(new I(s),!0)}),Ue(t,new ma(r.path,o,n))}else return[]}function at(t,e,n){return Ue(t,new Dt(Gn(),e,n))}function cu(t,e,n){var r=U.fromObject(n);return Ue(t,new Hn(Gn(),e,r))}function fu(t,e){return Ue(t,new Wi(Gn(),e))}function hu(t,e,n){var r=$n(t,n);if(r){var i=Xn(r),o=i.path,s=i.queryId,a=F(o,e),u=new Wi(Vn(s),a);return Jn(t,o,u)}else return[]}function wn(t,e,n,r){var i=e._path,o=t.syncPointTree_.get(i),s=[];if(o&&(e._queryIdentifier==="default"||Ji(o,e))){var a=ou(o,e,n,r);ru(o)&&(t.syncPointTree_=t.syncPointTree_.remove(i));var u=a.removed;s=a.events;var l=u.findIndex(function(A){return A._queryParams.loadsAllData()})!==-1,c=t.syncPointTree_.findOnPath(i,function(A,J){return de(J)});if(l&&!c){var f=t.syncPointTree_.subtree(i);if(!f.isEmpty())for(var h=_u(f),d=0;d<h.length;++d){var v=h[d],g=v.query,_=to(t,v);t.listenProvider_.startListening($e(g),Nt(t,g),_.hashFn,_.onComplete)}}if(!c&&u.length>0&&!r)if(l){var m=null;t.listenProvider_.stopListening($e(e),m)}else u.forEach(function(A){var J=t.queryToTagMap.get(Ut(A));t.listenProvider_.stopListening($e(A),J)});gu(t,u)}return s}function du(t,e,n,r){var i=$n(t,r);if(i!=null){var o=Xn(i),s=o.path,a=o.queryId,u=F(s,e),l=new Dt(Vn(a),u,n);return Jn(t,s,l)}else return[]}function pu(t,e,n,r){var i=$n(t,r);if(i){var o=Xn(i),s=o.path,a=o.queryId,u=F(s,e),l=U.fromObject(n),c=new Hn(Vn(a),u,l);return Jn(t,s,c)}else return[]}function Ur(t,e,n){var r=e._path,i=null,o=!1;t.syncPointTree_.foreachOnPath(r,function(g,_){var m=F(g,r);i=i||ce(_,m),o=o||de(_)});var s=t.syncPointTree_.get(r);s?(o=o||de(s),i=i||ce(s,S())):(s=new qi,t.syncPointTree_=t.syncPointTree_.set(r,s));var a;if(i!=null)a=!0;else{a=!1,i=C.EMPTY_NODE;var u=t.syncPointTree_.subtree(r);u.foreachChild(function(g,_){var m=ce(_,S());m&&(i=i.updateImmediateChild(g,m))})}var l=Ji(s,e);if(!l&&!e._queryParams.loadsAllData()){var c=Ut(e);p(!t.queryToTagMap.has(c),"View does not exist, but we have a tag");var f=yu();t.queryToTagMap.set(c,f),t.tagToQueryMap.set(f,c)}var h=Mt(t.pendingWriteTree_,r),d=iu(s,e,n,h,i,a);if(!l&&!o){var v=Xi(s,e);d=d.concat(mu(t,e,v))}return d}function Wt(t,e,n){var r=!0,i=t.pendingWriteTree_,o=t.syncPointTree_.findOnPath(e,function(s,a){var u=F(s,e),l=ce(a,u);if(l)return l});return Gi(i,e,o,n,r)}function vu(t,e){var n=e._path,r=null;t.syncPointTree_.foreachOnPath(n,function(l,c){var f=F(l,n);r=r||ce(c,f)});var i=t.syncPointTree_.get(n);i?r=r||ce(i,S()):(i=new qi,t.syncPointTree_=t.syncPointTree_.set(n,i));var o=r!=null,s=o?new he(r,!0,!1):null,a=Mt(t.pendingWriteTree_,e._path),u=Ki(i,e,a,o?s.getNode():C.EMPTY_NODE,o);return Xa(u)}function Ue(t,e){return Zi(e,t.syncPointTree_,null,Mt(t.pendingWriteTree_,S()))}function Zi(t,e,n,r){if(w(t.path))return eo(t,e,n,r);var i=e.get(S());n==null&&i!=null&&(n=ce(i,S()));var o=[],s=E(t.path),a=t.operationForChild(s),u=e.children.get(s);if(u&&a){var l=n?n.getImmediateChild(s):null,c=Vi(r,s);o=o.concat(Zi(a,u,l,c))}return i&&(o=o.concat(qn(i,t,r,n))),o}function eo(t,e,n,r){var i=e.get(S());n==null&&i!=null&&(n=ce(i,S()));var o=[];return e.children.inorderTraversal(function(s,a){var u=n?n.getImmediateChild(s):null,l=Vi(r,s),c=t.operationForChild(s);c&&(o=o.concat(eo(c,a,u,l)))}),i&&(o=o.concat(qn(i,t,r,n))),o}function to(t,e){var n=e.query,r=Nt(t,n);return{hashFn:function(){var i=$a(e)||C.EMPTY_NODE;return i.hash()},onComplete:function(i){if(i==="ok")return r?hu(t,n._path,r):fu(t,n._path);var o=is(i,n);return wn(t,n,null,o)}}}function Nt(t,e){var n=Ut(e);return t.queryToTagMap.get(n)}function Ut(t){return t._path.toString()+"$"+t._queryIdentifier}function $n(t,e){return t.tagToQueryMap.get(e)}function Xn(t){var e=t.indexOf("$");return p(e!==-1&&e<t.length-1,"Bad queryKey."),{queryId:t.substr(e+1),path:new I(t.substr(0,e))}}function Jn(t,e,n){var r=t.syncPointTree_.get(e);p(r,"Missing sync point for query tag that we're tracking");var i=Mt(t.pendingWriteTree_,e);return qn(r,n,i,null)}function _u(t){return t.fold(function(e,n,r){if(n&&de(n)){var i=Ft(n);return[i]}else{var o=[];return n&&(o=$i(n)),O(r,function(s,a){o=o.concat(a)}),o}})}function $e(t){return t._queryParams.loadsAllData()&&!t._queryParams.isDefault()?new(au())(t._repo,t._path):t}function gu(t,e){for(var n=0;n<e.length;++n){var r=e[n];if(!r._queryParams.loadsAllData()){var i=Ut(r),o=t.queryToTagMap.get(i);t.queryToTagMap.delete(i),t.tagToQueryMap.delete(o)}}}function yu(){return uu++}function mu(t,e,n){var r=e._path,i=Nt(t,e),o=to(t,n),s=t.listenProvider_.startListening($e(e),i,o.hashFn,o.onComplete),a=t.syncPointTree_.subtree(r);if(i)p(!de(a.value),"If we're adding a query, it shouldn't be shadowed");else for(var u=a.fold(function(f,h,d){if(!w(f)&&h&&de(h))return[Ft(h).query];var v=[];return h&&(v=v.concat($i(h).map(function(g){return g.query}))),O(d,function(g,_){v=v.concat(_)}),v}),l=0;l<u.length;++l){var c=u[l];t.listenProvider_.stopListening($e(c),Nt(t,c))}return s}/**
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
 */var Cu=function(){function t(e){this.node_=e}return t.prototype.getImmediateChild=function(e){var n=this.node_.getImmediateChild(e);return new t(n)},t.prototype.node=function(){return this.node_},t}(),Eu=function(){function t(e,n){this.syncTree_=e,this.path_=n}return t.prototype.getImmediateChild=function(e){var n=N(this.path_,e);return new t(this.syncTree_,n)},t.prototype.node=function(){return Wt(this.syncTree_,this.path_)},t}(),wu=function(t){return t=t||{},t.timestamp=t.timestamp||new Date().getTime(),t},Br=function(t,e,n){if(!t||typeof t!="object")return t;if(p(".sv"in t,"Unexpected leaf node or priority contents"),typeof t[".sv"]=="string")return Tu(t[".sv"],e,n);if(typeof t[".sv"]=="object")return Su(t[".sv"],e);p(!1,"Unexpected server value: "+JSON.stringify(t,null,2))},Tu=function(t,e,n){switch(t){case"timestamp":return n.timestamp;default:p(!1,"Unexpected server value: "+t)}},Su=function(t,e,n){t.hasOwnProperty("increment")||p(!1,"Unexpected server value: "+JSON.stringify(t,null,2));var r=t.increment;typeof r!="number"&&p(!1,"Unexpected increment value: "+r);var i=e.node();if(p(i!==null&&typeof i!="undefined","Expected ChildrenNode.EMPTY_NODE for nulls"),!i.isLeafNode())return r;var o=i,s=o.getValue();return typeof s!="number"?r:s+r},no=function(t,e,n,r){return er(e,new Eu(n,t),r)},Zn=function(t,e,n){return er(t,new Cu(e),n)};function er(t,e,n){var r=t.getPriority().val(),i=Br(r,e.getImmediateChild(".priority"),n),o;if(t.isLeafNode()){var s=t,a=Br(s.getValue(),e,n);return a!==s.getValue()||i!==s.getPriority().val()?new Ae(a,k(i)):t}else{var u=t;return o=u,i!==u.getPriority().val()&&(o=o.updatePriority(new Ae(i))),u.forEachChild(R,function(l,c){var f=er(c,e.getImmediateChild(l),n);f!==c&&(o=o.updateImmediateChild(l,f))}),o}}/**
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
 */var tr=function(){function t(e,n,r){e===void 0&&(e=""),n===void 0&&(n=null),r===void 0&&(r={children:{},childCount:0}),this.name=e,this.parent=n,this.node=r}return t}();function Bt(t,e){for(var n=e instanceof I?e:new I(e),r=t,i=E(n);i!==null;){var o=Te(r.node.children,i)||{children:{},childCount:0};r=new tr(i,r,o),n=b(n),i=E(n)}return r}function Ne(t){return t.node.value}function nr(t,e){t.node.value=e,Tn(t)}function ro(t){return t.node.childCount>0}function Iu(t){return Ne(t)===void 0&&!ro(t)}function Qt(t,e){O(t.node.children,function(n,r){e(new tr(n,t,r))})}function io(t,e,n,r){n&&!r&&e(t),Qt(t,function(i){io(i,e,!0,r)}),n&&r&&e(t)}function bu(t,e,n){for(var r=n?t:t.parent;r!==null;){if(e(r))return!0;r=r.parent}return!1}function ut(t){return new I(t.parent===null?t.name:ut(t.parent)+"/"+t.name)}function Tn(t){t.parent!==null&&Ru(t.parent,t.name,t)}function Ru(t,e,n){var r=Iu(n),i=$(t.node.children,e);r&&i?(delete t.node.children[e],t.node.childCount--,Tn(t)):!r&&!i&&(t.node.children[e]=n.node,t.node.childCount++,Tn(t))}/**
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
 */var Nu=/[\[\].#$\/\u0000-\u001F\u007F]/,ku=/[\[\].#$\u0000-\u001F\u007F]/,rn=10*1024*1024,Gt=function(t){return typeof t=="string"&&t.length!==0&&!Nu.test(t)},oo=function(t){return typeof t=="string"&&t.length!==0&&!ku.test(t)},Pu=function(t){return t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),oo(t)},tt=function(t){return t===null||typeof t=="string"||typeof t=="number"&&!At(t)||t&&typeof t=="object"&&$(t,".sv")},re=function(t,e,n,r){r&&e===void 0||lt(V(t,"value"),e,n)},lt=function(t,e,n){var r=n instanceof I?new Ws(n,t):n;if(e===void 0)throw new Error(t+"contains undefined "+ge(r));if(typeof e=="function")throw new Error(t+"contains a function "+ge(r)+" with contents = "+e.toString());if(At(e))throw new Error(t+"contains "+e.toString()+" "+ge(r));if(typeof e=="string"&&e.length>rn/3&&Pt(e)>rn)throw new Error(t+"contains a string greater than "+rn+" utf8 bytes "+ge(r)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){var i=!1,o=!1;if(O(e,function(s,a){if(s===".value")i=!0;else if(s!==".priority"&&s!==".sv"&&(o=!0,!Gt(s)))throw new Error(t+" contains an invalid key ("+s+") "+ge(r)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);Us(r,s),lt(t,a,r),Bs(r)}),i&&o)throw new Error(t+' contains ".value" child '+ge(r)+" in addition to actual children.")}},Au=function(t,e){var n,r;for(n=0;n<e.length;n++){r=e[n];for(var i=Je(r),o=0;o<i.length;o++)if(!(i[o]===".priority"&&o===i.length-1)){if(!Gt(i[o]))throw new Error(t+"contains an invalid key ("+i[o]+") in path "+r.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(Fs);var s=null;for(n=0;n<e.length;n++){if(r=e[n],s!==null&&Q(s,r))throw new Error(t+"contains a path "+s.toString()+" that is ancestor of another path "+r.toString());s=r}},so=function(t,e,n,r){if(!(r&&e===void 0)){var i=V(t,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(i+" must be an object containing the children to replace.");var o=[];O(e,function(s,a){var u=new I(s);if(lt(i,a,N(n,u)),Ln(u)===".priority"&&!tt(a))throw new Error(i+"contains an invalid value for '"+u.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");o.push(u)}),Au(i,o)}},rr=function(t,e,n){if(!(n&&e===void 0)){if(At(e))throw new Error(V(t,"priority")+"is "+e.toString()+", but must be a valid Firebase priority (a string, finite number, server value, or null).");if(!tt(e))throw new Error(V(t,"priority")+"must be a valid Firebase priority (a string, finite number, server value, or null).")}},xu=function(t,e,n){if(!(n&&e===void 0))switch(e){case"value":case"child_added":case"child_removed":case"child_changed":case"child_moved":break;default:throw new Error(V(t,"eventType")+'must be a valid event type = "value", "child_added", "child_removed", "child_changed", or "child_moved".')}},ct=function(t,e,n,r){if(!(r&&n===void 0)&&!Gt(n))throw new Error(V(t,e)+'was an invalid key = "'+n+`".  Firebase keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]").`)},nt=function(t,e,n,r){if(!(r&&n===void 0)&&!oo(n))throw new Error(V(t,e)+'was an invalid path = "'+n+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},Ou=function(t,e,n,r){n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),nt(t,e,n,r)},G=function(t,e){if(E(e)===".info")throw new Error(t+" failed = Can't modify data under /.info/")},ao=function(t,e){var n=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!Gt(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||n.length!==0&&!Pu(n))throw new Error(V(t,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)},Du=function(t,e,n,r){if(!(r&&n===void 0)&&typeof n!="boolean")throw new Error(V(t,e)+"must be a boolean.")};/**
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
 */var Lu=function(){function t(){this.eventLists_=[],this.recursionDepth_=0}return t}();function Vt(t,e){for(var n=null,r=0;r<e.length;r++){var i=e[r],o=i.getPath();n!==null&&!Mn(o,n.path)&&(t.eventLists_.push(n),n=null),n===null&&(n={events:[],path:o}),n.events.push(i)}n&&t.eventLists_.push(n)}function ir(t,e,n){Vt(t,n),uo(t,function(r){return Mn(r,e)})}function H(t,e,n){Vt(t,n),uo(t,function(r){return Q(r,e)||Q(e,r)})}function uo(t,e){t.recursionDepth_++;for(var n=!0,r=0;r<t.eventLists_.length;r++){var i=t.eventLists_[r];if(i){var o=i.path;e(o)?(Mu(t.eventLists_[r]),t.eventLists_[r]=null):n=!1}}n&&(t.eventLists_=[]),t.recursionDepth_--}function Mu(t){for(var e=0;e<t.events.length;e++){var n=t.events[e];if(n!==null){t.events[e]=null;var r=n.getEventRunner();Ee&&L("event: "+n.toString()),Fe(r)}}}/**
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
 */var lo="repo_interrupt",Fu=25,Wu=function(){function t(e,n,r,i){this.repoInfo_=e,this.forceRestClient_=n,this.authTokenProvider_=r,this.appCheckProvider_=i,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new Lu,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=Et(),this.transactionQueueTree_=new tr,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}return t.prototype.toString=function(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host},t}();function Uu(t,e,n){if(t.stats_=On(t.repoInfo_),t.forceRestClient_||ss())t.server_=new ha(t.repoInfo_,function(r,i,o,s){Qr(t,r,i,o,s)},t.authTokenProvider_,t.appCheckProvider_),setTimeout(function(){return Gr(t,!0)},0);else{if(typeof n!="undefined"&&n!==null){if(typeof n!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{x(n)}catch(r){throw new Error("Invalid authOverride provided: "+r)}}t.persistentConnection_=new we(t.repoInfo_,e,function(r,i,o,s){Qr(t,r,i,o,s)},function(r){Gr(t,r)},function(r){Qu(t,r)},t.authTokenProvider_,t.appCheckProvider_,n),t.server_=t.persistentConnection_}t.authTokenProvider_.addTokenChangeListener(function(r){t.server_.refreshAuthToken(r)}),t.appCheckProvider_.addTokenChangeListener(function(r){t.server_.refreshAppCheckToken(r.token)}),t.statsReporter_=hs(t.repoInfo_,function(){return new ga(t.stats_,t.server_)}),t.infoData_=new da,t.infoSyncTree_=new Wr({startListening:function(r,i,o,s){var a=[],u=t.infoData_.getNode(r._path);return u.isEmpty()||(a=at(t.infoSyncTree_,r._path,u),setTimeout(function(){s("ok")},0)),a},stopListening:function(){}}),or(t,"connected",!1),t.serverSyncTree_=new Wr({startListening:function(r,i,o,s){return t.server_.listen(r,o,i,function(a,u){var l=s(a,u);H(t.eventQueue_,r._path,l)}),[]},stopListening:function(r,i){t.server_.unlisten(r,i)}})}function co(t){var e=t.infoData_.getNode(new I(".info/serverTimeOffset")),n=e.val()||0;return new Date().getTime()+n}function ft(t){return wu({timestamp:co(t)})}function Qr(t,e,n,r,i){t.dataUpdateCount++;var o=new I(e);n=t.interceptServerDataCallback_?t.interceptServerDataCallback_(e,n):n;var s=[];if(i)if(r){var a=_t(n,function(h){return k(h)});s=pu(t.serverSyncTree_,o,a,i)}else{var u=k(n);s=du(t.serverSyncTree_,o,u,i)}else if(r){var l=_t(n,function(h){return k(h)});s=cu(t.serverSyncTree_,o,l)}else{var c=k(n);s=at(t.serverSyncTree_,o,c)}var f=o;s.length>0&&(f=Le(t,o)),H(t.eventQueue_,f,s)}function Bu(t,e){t.interceptServerDataCallback_=e}function Gr(t,e){or(t,"connected",e),e===!1&&Hu(t)}function Qu(t,e){O(e,function(n,r){or(t,n,r)})}function or(t,e,n){var r=new I("/.info/"+e),i=k(n);t.infoData_.updateSnapshot(r,i);var o=at(t.infoSyncTree_,r,i);H(t.eventQueue_,r,o)}function Ht(t){return t.nextWriteId_++}function Gu(t,e){var n=vu(t.serverSyncTree_,e);return n!=null?Promise.resolve(n):t.server_.get(e).then(function(r){var i=k(r).withIndex(e._queryParams.getIndex()),o=at(t.serverSyncTree_,e._path,i);return ir(t.eventQueue_,e._path,o),Promise.resolve(i)},function(r){return Be(t,"get for query "+x(e)+" failed: "+r),Promise.reject(new Error(r))})}function sr(t,e,n,r,i){Be(t,"set",{path:e.toString(),value:n,priority:r});var o=ft(t),s=k(n,r),a=Wt(t.serverSyncTree_,e),u=Zn(s,a,o),l=Ht(t),c=Kn(t.serverSyncTree_,e,u,l,!0);Vt(t.eventQueue_,c),t.server_.put(e.toString(),s.val(!0),function(h,d){var v=h==="ok";v||M("set at "+e+" failed: "+h);var g=ue(t.serverSyncTree_,l,!v);H(t.eventQueue_,e,g),pe(t,i,h,d)});var f=ur(t,e);Le(t,f),H(t.eventQueue_,f,[])}function Vu(t,e,n,r){Be(t,"update",{path:e.toString(),value:n});var i=!0,o=ft(t),s={};if(O(n,function(l,c){i=!1,s[l]=no(N(e,l),k(c),t.serverSyncTree_,o)}),i)L("update() called with empty data.  Don't do anything."),pe(t,r,"ok",void 0);else{var a=Ht(t),u=lu(t.serverSyncTree_,e,s,a);Vt(t.eventQueue_,u),t.server_.merge(e.toString(),n,function(l,c){var f=l==="ok";f||M("update at "+e+" failed: "+l);var h=ue(t.serverSyncTree_,a,!f),d=h.length>0?Le(t,e):e;H(t.eventQueue_,d,h),pe(t,r,l,c)}),O(n,function(l){var c=ur(t,N(e,l));Le(t,c)}),H(t.eventQueue_,e,[])}}function Hu(t){Be(t,"onDisconnectEvents");var e=ft(t),n=Et();_n(t.onDisconnect_,S(),function(i,o){var s=no(i,o,t.serverSyncTree_,e);We(n,i,s)});var r=[];_n(n,S(),function(i,o){r=r.concat(at(t.serverSyncTree_,i,o));var s=ur(t,i);Le(t,s)}),t.onDisconnect_=Et(),H(t.eventQueue_,S(),r)}function ju(t,e,n){t.server_.onDisconnectCancel(e.toString(),function(r,i){r==="ok"&&vn(t.onDisconnect_,e),pe(t,n,r,i)})}function Vr(t,e,n,r){var i=k(n);t.server_.onDisconnectPut(e.toString(),i.val(!0),function(o,s){o==="ok"&&We(t.onDisconnect_,e,i),pe(t,r,o,s)})}function Yu(t,e,n,r,i){var o=k(n,r);t.server_.onDisconnectPut(e.toString(),o.val(!0),function(s,a){s==="ok"&&We(t.onDisconnect_,e,o),pe(t,i,s,a)})}function zu(t,e,n,r){if(sn(n)){L("onDisconnect().update() called with empty data.  Don't do anything."),pe(t,r,"ok",void 0);return}t.server_.onDisconnectMerge(e.toString(),n,function(i,o){i==="ok"&&O(n,function(s,a){var u=k(a);We(t.onDisconnect_,N(e,s),u)}),pe(t,r,i,o)})}function qu(t,e,n){var r;E(e._path)===".info"?r=Ur(t.infoSyncTree_,e,n):r=Ur(t.serverSyncTree_,e,n),ir(t.eventQueue_,e._path,r)}function Sn(t,e,n){var r;E(e._path)===".info"?r=wn(t.infoSyncTree_,e,n):r=wn(t.serverSyncTree_,e,n),ir(t.eventQueue_,e._path,r)}function fo(t){t.persistentConnection_&&t.persistentConnection_.interrupt(lo)}function Ku(t){t.persistentConnection_&&t.persistentConnection_.resume(lo)}function $u(t,e){if(e===void 0&&(e=!1),typeof console!="undefined"){var n;e?(t.statsListener_||(t.statsListener_=new Fi(t.stats_)),n=t.statsListener_.get()):n=t.stats_.get();var r=Object.keys(n).reduce(function(i,o){return Math.max(o.length,i)},0);O(n,function(i,o){for(var s=i,a=i.length;a<r+2;a++)s+=" ";console.log(s+o)})}}function Xu(t,e){t.stats_.incrementCounter(e),ya(t.statsReporter_,e)}function Be(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];var r="";t.persistentConnection_&&(r=t.persistentConnection_.id+":"),L.apply(void 0,Me([r],K(e)))}function pe(t,e,n,r){e&&Fe(function(){if(n==="ok")e(null);else{var i=(n||"error").toUpperCase(),o=i;r&&(o+=": "+r);var s=new Error(o);s.code=i,e(s)}})}function Ju(t,e,n,r,i,o){Be(t,"transaction on "+e);var s={path:e,update:n,onComplete:r,status:null,order:ni(),applyLocally:o,retryCount:0,unwatcher:i,abortReason:null,currentWriteId:null,currentInputSnapshot:null,currentOutputSnapshotRaw:null,currentOutputSnapshotResolved:null},a=ar(t,e,void 0);s.currentInputSnapshot=a;var u=s.update(a.val());if(u===void 0)s.unwatcher(),s.currentOutputSnapshotRaw=null,s.currentOutputSnapshotResolved=null,s.onComplete&&s.onComplete(null,!1,s.currentInputSnapshot);else{lt("transaction failed: Data returned ",u,s.path),s.status=0;var l=Bt(t.transactionQueueTree_,e),c=Ne(l)||[];c.push(s),nr(l,c);var f=void 0;if(typeof u=="object"&&u!==null&&$(u,".priority"))f=Te(u,".priority"),p(tt(f),"Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.");else{var h=Wt(t.serverSyncTree_,e)||C.EMPTY_NODE;f=h.getPriority().val()}var d=ft(t),v=k(u,f),g=Zn(v,a,d);s.currentOutputSnapshotRaw=v,s.currentOutputSnapshotResolved=g,s.currentWriteId=Ht(t);var _=Kn(t.serverSyncTree_,e,g,s.currentWriteId,s.applyLocally);H(t.eventQueue_,e,_),jt(t,t.transactionQueueTree_)}}function ar(t,e,n){return Wt(t.serverSyncTree_,e,n)||C.EMPTY_NODE}function jt(t,e){if(e===void 0&&(e=t.transactionQueueTree_),e||Yt(t,e),Ne(e)){var n=po(t,e);p(n.length>0,"Sending zero length transaction queue");var r=n.every(function(i){return i.status===0});r&&Zu(t,ut(e),n)}else ro(e)&&Qt(e,function(i){jt(t,i)})}function Zu(t,e,n){for(var r=n.map(function(h){return h.currentWriteId}),i=ar(t,e,r),o=i,s=i.hash(),a=0;a<n.length;a++){var u=n[a];p(u.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),u.status=1,u.retryCount++;var l=F(e,u.path);o=o.updateChild(l,u.currentOutputSnapshotRaw)}var c=o.val(!0),f=e;t.server_.put(f.toString(),c,function(h){Be(t,"transaction put response",{path:f.toString(),status:h});var d=[];if(h==="ok"){for(var v=[],g=function(m){n[m].status=2,d=d.concat(ue(t.serverSyncTree_,n[m].currentWriteId)),n[m].onComplete&&v.push(function(){return n[m].onComplete(null,!0,n[m].currentOutputSnapshotResolved)}),n[m].unwatcher()},_=0;_<n.length;_++)g(_);Yt(t,Bt(t.transactionQueueTree_,e)),jt(t,t.transactionQueueTree_),H(t.eventQueue_,e,d);for(var _=0;_<v.length;_++)Fe(v[_])}else{if(h==="datastale")for(var _=0;_<n.length;_++)n[_].status===3?n[_].status=4:n[_].status=0;else{M("transaction at "+f.toString()+" failed: "+h);for(var _=0;_<n.length;_++)n[_].status=4,n[_].abortReason=h}Le(t,e)}},s)}function Le(t,e){var n=ho(t,e),r=ut(n),i=po(t,n);return el(t,i,r),r}function el(t,e,n){if(e.length!==0){for(var r=[],i=[],o=e.filter(function(l){return l.status===0}),s=o.map(function(l){return l.currentWriteId}),a=function(l){var c=e[l],f=F(n,c.path),h=!1,d;if(p(f!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),c.status===4)h=!0,d=c.abortReason,i=i.concat(ue(t.serverSyncTree_,c.currentWriteId,!0));else if(c.status===0)if(c.retryCount>=Fu)h=!0,d="maxretry",i=i.concat(ue(t.serverSyncTree_,c.currentWriteId,!0));else{var v=ar(t,c.path,s);c.currentInputSnapshot=v;var g=e[l].update(v.val());if(g!==void 0){lt("transaction failed: Data returned ",g,c.path);var _=k(g),m=typeof g=="object"&&g!=null&&$(g,".priority");m||(_=_.updatePriority(v.getPriority()));var A=c.currentWriteId,J=ft(t),dt=Zn(_,v,J);c.currentOutputSnapshotRaw=_,c.currentOutputSnapshotResolved=dt,c.currentWriteId=Ht(t),s.splice(s.indexOf(A),1),i=i.concat(Kn(t.serverSyncTree_,c.path,dt,c.currentWriteId,c.applyLocally)),i=i.concat(ue(t.serverSyncTree_,A,!0))}else h=!0,d="nodata",i=i.concat(ue(t.serverSyncTree_,c.currentWriteId,!0))}H(t.eventQueue_,n,i),i=[],h&&(e[l].status=2,function($t){setTimeout($t,Math.floor(0))}(e[l].unwatcher),e[l].onComplete&&(d==="nodata"?r.push(function(){return e[l].onComplete(null,!1,e[l].currentInputSnapshot)}):r.push(function(){return e[l].onComplete(new Error(d),!1,null)})))},u=0;u<e.length;u++)a(u);Yt(t,t.transactionQueueTree_);for(var u=0;u<r.length;u++)Fe(r[u]);jt(t,t.transactionQueueTree_)}}function ho(t,e){var n,r=t.transactionQueueTree_;for(n=E(e);n!==null&&Ne(r)===void 0;)r=Bt(r,n),e=b(e),n=E(e);return r}function po(t,e){var n=[];return vo(t,e,n),n.sort(function(r,i){return r.order-i.order}),n}function vo(t,e,n){var r=Ne(e);if(r)for(var i=0;i<r.length;i++)n.push(r[i]);Qt(e,function(o){vo(t,o,n)})}function Yt(t,e){var n=Ne(e);if(n){for(var r=0,i=0;i<n.length;i++)n[i].status!==2&&(n[r]=n[i],r++);n.length=r,nr(e,n.length>0?n:void 0)}Qt(e,function(o){Yt(t,o)})}function ur(t,e){var n=ut(ho(t,e)),r=Bt(t.transactionQueueTree_,e);return bu(r,function(i){on(t,i)}),on(t,r),io(r,function(i){on(t,i)}),n}function on(t,e){var n=Ne(e);if(n){for(var r=[],i=[],o=-1,s=0;s<n.length;s++)n[s].status===3||(n[s].status===1?(p(o===s-1,"All SENT items should be at beginning of queue."),o=s,n[s].status=3,n[s].abortReason="set"):(p(n[s].status===0,"Unexpected transaction status in abort"),n[s].unwatcher(),i=i.concat(ue(t.serverSyncTree_,n[s].currentWriteId,!0)),n[s].onComplete&&r.push(n[s].onComplete.bind(null,new Error("set"),!1,null))));o===-1?nr(e,void 0):n.length=o+1,H(t.eventQueue_,ut(e),i);for(var s=0;s<r.length;s++)Fe(r[s])}}/**
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
 */function tl(t){for(var e="",n=t.split("/"),r=0;r<n.length;r++)if(n[r].length>0){var i=n[r];try{i=decodeURIComponent(i.replace(/\+/g," "))}catch{}e+="/"+i}return e}function nl(t){var e,n,r={};t.charAt(0)==="?"&&(t=t.substring(1));try{for(var i=ee(t.split("&")),o=i.next();!o.done;o=i.next()){var s=o.value;if(s.length!==0){var a=s.split("=");a.length===2?r[decodeURIComponent(a[0])]=decodeURIComponent(a[1]):M("Invalid query segment '"+s+"' in query '"+t+"'")}}}catch(u){e={error:u}}finally{try{o&&!o.done&&(n=i.return)&&n.call(i)}finally{if(e)throw e.error}}return r}var In=function(t,e){var n=rl(t),r=n.namespace;n.domain==="firebase.com"&&te(n.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!r||r==="undefined")&&n.domain!=="localhost"&&te("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),n.secure||Zo();var i=n.scheme==="ws"||n.scheme==="wss";return{repoInfo:new xn(n.host,n.secure,r,e,i,"",r!==n.subdomain),path:new I(n.pathString)}},rl=function(t){var e="",n="",r="",i="",o="",s=!0,a="https",u=443;if(typeof t=="string"){var l=t.indexOf("//");l>=0&&(a=t.substring(0,l-1),t=t.substring(l+2));var c=t.indexOf("/");c===-1&&(c=t.length);var f=t.indexOf("?");f===-1&&(f=t.length),e=t.substring(0,Math.min(c,f)),c<f&&(i=tl(t.substring(c,f)));var h=nl(t.substring(Math.min(t.length,f)));l=e.indexOf(":"),l>=0?(s=a==="https"||a==="wss",u=parseInt(e.substring(l+1),10)):l=e.length;var d=e.slice(0,l);if(d.toLowerCase()==="localhost")n="localhost";else if(d.split(".").length<=2)n=d;else{var v=e.indexOf(".");r=e.substring(0,v).toLowerCase(),n=e.substring(v+1),o=r}"ns"in h&&(o=h.ns)}return{host:e,port:u,domain:n,subdomain:r,secure:s,scheme:a,pathString:i,namespace:o}};/**
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
 */var _o=function(){function t(e,n,r,i){this.eventType=e,this.eventRegistration=n,this.snapshot=r,this.prevName=i}return t.prototype.getPath=function(){var e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path},t.prototype.getEventType=function(){return this.eventType},t.prototype.getEventRunner=function(){return this.eventRegistration.getEventRunner(this)},t.prototype.toString=function(){return this.getPath().toString()+":"+this.eventType+":"+x(this.snapshot.exportVal())},t}(),go=function(){function t(e,n,r){this.eventRegistration=e,this.error=n,this.path=r}return t.prototype.getPath=function(){return this.path},t.prototype.getEventType=function(){return"cancel"},t.prototype.getEventRunner=function(){return this.eventRegistration.getEventRunner(this)},t.prototype.toString=function(){return this.path.toString()+":cancel"},t}();/**
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
 */var yo=function(){function t(e,n){this.snapshotCallback=e,this.cancelCallback=n}return t.prototype.onValue=function(e,n){this.snapshotCallback.call(null,e,n)},t.prototype.onCancel=function(e){return p(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)},Object.defineProperty(t.prototype,"hasCancelCallback",{get:function(){return!!this.cancelCallback},enumerable:!1,configurable:!0}),t.prototype.matches=function(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context},t}();/**
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
 */var il=function(){function t(e,n){this._repo=e,this._path=n}return t.prototype.cancel=function(){var e=new W;return ju(this._repo,this._path,e.wrapCallback(function(){})),e.promise},t.prototype.remove=function(){G("OnDisconnect.remove",this._path);var e=new W;return Vr(this._repo,this._path,null,e.wrapCallback(function(){})),e.promise},t.prototype.set=function(e){G("OnDisconnect.set",this._path),re("OnDisconnect.set",e,this._path,!1);var n=new W;return Vr(this._repo,this._path,e,n.wrapCallback(function(){})),n.promise},t.prototype.setWithPriority=function(e,n){G("OnDisconnect.setWithPriority",this._path),re("OnDisconnect.setWithPriority",e,this._path,!1),rr("OnDisconnect.setWithPriority",n,!1);var r=new W;return Yu(this._repo,this._path,e,n,r.wrapCallback(function(){})),r.promise},t.prototype.update=function(e){G("OnDisconnect.update",this._path),so("OnDisconnect.update",e,this._path,!1);var n=new W;return zu(this._repo,this._path,e,n.wrapCallback(function(){})),n.promise},t}();/**
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
 */var j=function(){function t(e,n,r,i){this._repo=e,this._path=n,this._queryParams=r,this._orderByCalled=i}return Object.defineProperty(t.prototype,"key",{get:function(){return w(this._path)?null:Ln(this._path)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"ref",{get:function(){return new ie(this._repo,this._path)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"_queryIdentifier",{get:function(){var e=Nr(this._queryParams),n=kn(e);return n==="{}"?"default":n},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"_queryObject",{get:function(){return Nr(this._queryParams)},enumerable:!1,configurable:!0}),t.prototype.isEqual=function(e){if(e=B(e),!(e instanceof t))return!1;var n=this._repo===e._repo,r=Mn(this._path,e._path),i=this._queryIdentifier===e._queryIdentifier;return n&&r&&i},t.prototype.toJSON=function(){return this.toString()},t.prototype.toString=function(){return this._repo.toString()+Ms(this._path)},t}();function zt(t,e){if(t._orderByCalled===!0)throw new Error(e+": You can't combine multiple orderBy calls.")}function ve(t){var e=null,n=null;if(t.hasStart()&&(e=t.getIndexStartValue()),t.hasEnd()&&(n=t.getIndexEndValue()),t.getIndex()===Z){var r="Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().",i="Query: When ordering by key, the argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() must be a string.";if(t.hasStart()){var o=t.getIndexStartName();if(o!==ae)throw new Error(r);if(typeof e!="string")throw new Error(i)}if(t.hasEnd()){var s=t.getIndexEndName();if(s!==ne)throw new Error(r);if(typeof n!="string")throw new Error(i)}}else if(t.getIndex()===R){if(e!=null&&!tt(e)||n!=null&&!tt(n))throw new Error("Query: When ordering by priority, the first argument passed to startAt(), startAfter() endAt(), endBefore(), or equalTo() must be a valid priority value (null, a number, or a string).")}else if(p(t.getIndex()instanceof Wn||t.getIndex()===Un,"unknown index type."),e!=null&&typeof e=="object"||n!=null&&typeof n=="object")throw new Error("Query: First argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() cannot be an object.")}function qt(t){if(t.hasStart()&&t.hasEnd()&&t.hasLimit()&&!t.hasAnchoredLimit())throw new Error("Query: Can't combine startAt(), startAfter(), endAt(), endBefore(), and limit(). Use limitToFirst() or limitToLast() instead.")}var ie=function(t){P(e,t);function e(n,r){return t.call(this,n,r,new Mi,!1)||this}return Object.defineProperty(e.prototype,"parent",{get:function(){var n=Ii(this._path);return n===null?null:new e(this._repo,n)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"root",{get:function(){for(var n=this;n.parent!==null;)n=n.parent;return n},enumerable:!1,configurable:!0}),e}(j),Kt=function(){function t(e,n,r){this._node=e,this.ref=n,this._index=r}return Object.defineProperty(t.prototype,"priority",{get:function(){return this._node.getPriority().val()},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"key",{get:function(){return this.ref.key},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"size",{get:function(){return this._node.numChildren()},enumerable:!1,configurable:!0}),t.prototype.child=function(e){var n=new I(e),r=Ie(this.ref,e);return new t(this._node.getChild(n),r,R)},t.prototype.exists=function(){return!this._node.isEmpty()},t.prototype.exportVal=function(){return this._node.val(!0)},t.prototype.forEach=function(e){var n=this;if(this._node.isLeafNode())return!1;var r=this._node;return!!r.forEachChild(this._index,function(i,o){return e(new t(o,Ie(n.ref,i),R))})},t.prototype.hasChild=function(e){var n=new I(e);return!this._node.getChild(n).isEmpty()},t.prototype.hasChildren=function(){return this._node.isLeafNode()?!1:!this._node.isEmpty()},t.prototype.toJSON=function(){return this.exportVal()},t.prototype.val=function(){return this._node.val()},t}();function mo(t,e){return t=B(t),t._checkNotDeleted("ref"),e!==void 0?Ie(t._root,e):t._root}function Hr(t,e){t=B(t),t._checkNotDeleted("refFromURL");var n=In(e,t._repo.repoInfo_.nodeAdmin);ao("refFromURL",n);var r=n.repoInfo;return!t._repo.repoInfo_.isCustomHost()&&r.host!==t._repo.repoInfo_.host&&te("refFromURL: Host name does not match the current database: (found "+r.host+" but expected "+t._repo.repoInfo_.host+")"),mo(t,n.path.toString())}function Ie(t,e){return t=B(t),E(t._path)===null?Ou("child","path",e,!1):nt("child","path",e,!1),new ie(t._repo,N(t._path,e))}function ol(t,e){t=B(t),G("push",t._path),re("push",e,t._path,!0);var n=co(t._repo),r=ia(n),i=Ie(t,r),o=Ie(t,r),s;return e!=null?s=lr(o,e).then(function(){return o}):s=Promise.resolve(o),i.then=s.then.bind(s),i.catch=s.then.bind(s,void 0),i}function sl(t){return G("remove",t._path),lr(t,null)}function lr(t,e){t=B(t),G("set",t._path),re("set",e,t._path,!1);var n=new W;return sr(t._repo,t._path,e,null,n.wrapCallback(function(){})),n.promise}function al(t,e){t=B(t),G("setPriority",t._path),rr("setPriority",e,!1);var n=new W;return sr(t._repo,N(t._path,".priority"),e,null,n.wrapCallback(function(){})),n.promise}function ul(t,e,n){if(G("setWithPriority",t._path),re("setWithPriority",e,t._path,!1),rr("setWithPriority",n,!1),t.key===".length"||t.key===".keys")throw"setWithPriority failed: "+t.key+" is a read-only object.";var r=new W;return sr(t._repo,t._path,e,n,r.wrapCallback(function(){})),r.promise}function ll(t,e){so("update",e,t._path,!1);var n=new W;return Vu(t._repo,t._path,e,n.wrapCallback(function(){})),n.promise}function cl(t){return t=B(t),Gu(t._repo,t).then(function(e){return new Kt(e,new ie(t._repo,t._path),t._queryParams.getIndex())})}var Co=function(){function t(e){this.callbackContext=e}return t.prototype.respondsTo=function(e){return e==="value"},t.prototype.createEvent=function(e,n){var r=n._queryParams.getIndex();return new _o("value",this,new Kt(e.snapshotNode,new ie(n._repo,n._path),r))},t.prototype.getEventRunner=function(e){var n=this;return e.getEventType()==="cancel"?function(){return n.callbackContext.onCancel(e.error)}:function(){return n.callbackContext.onValue(e.snapshot,null)}},t.prototype.createCancelEvent=function(e,n){return this.callbackContext.hasCancelCallback?new go(this,e,n):null},t.prototype.matches=function(e){return e instanceof t?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1},t.prototype.hasAnyCallback=function(){return this.callbackContext!==null},t}(),Eo=function(){function t(e,n){this.eventType=e,this.callbackContext=n}return t.prototype.respondsTo=function(e){var n=e==="children_added"?"child_added":e;return n=n==="children_removed"?"child_removed":n,this.eventType===n},t.prototype.createCancelEvent=function(e,n){return this.callbackContext.hasCancelCallback?new go(this,e,n):null},t.prototype.createEvent=function(e,n){p(e.childName!=null,"Child events should have a childName.");var r=Ie(new ie(n._repo,n._path),e.childName),i=n._queryParams.getIndex();return new _o(e.type,this,new Kt(e.snapshotNode,r,i),e.prevName)},t.prototype.getEventRunner=function(e){var n=this;return e.getEventType()==="cancel"?function(){return n.callbackContext.onCancel(e.error)}:function(){return n.callbackContext.onValue(e.snapshot,e.prevName)}},t.prototype.matches=function(e){return e instanceof t?this.eventType===e.eventType&&(!this.callbackContext||!e.callbackContext||this.callbackContext.matches(e.callbackContext)):!1},t.prototype.hasAnyCallback=function(){return!!this.callbackContext},t}();function ht(t,e,n,r,i){var o;if(typeof r=="object"&&(o=void 0,i=r),typeof r=="function"&&(o=r),i&&i.onlyOnce){var s=n,a=function(c,f){Sn(t._repo,t,l),s(c,f)};a.userCallback=n.userCallback,a.context=n.context,n=a}var u=new yo(n,o||void 0),l=e==="value"?new Co(u):new Eo(e,u);return qu(t._repo,t,l),function(){return Sn(t._repo,t,l)}}function bn(t,e,n,r){return ht(t,"value",e,n,r)}function jr(t,e,n,r){return ht(t,"child_added",e,n,r)}function Yr(t,e,n,r){return ht(t,"child_changed",e,n,r)}function zr(t,e,n,r){return ht(t,"child_moved",e,n,r)}function qr(t,e,n,r){return ht(t,"child_removed",e,n,r)}function Kr(t,e,n){var r=null,i=n?new yo(n):null;e==="value"?r=new Co(i):e&&(r=new Eo(e,i)),Sn(t._repo,t,r)}var X=function(){function t(){}return t}(),wo=function(t){P(e,t);function e(n,r){var i=t.call(this)||this;return i._value=n,i._key=r,i}return e.prototype._apply=function(n){re("endAt",this._value,n._path,!0);var r=pn(n._queryParams,this._value,this._key);if(qt(r),ve(r),n._queryParams.hasEnd())throw new Error("endAt: Starting point was already set (by another call to endAt, endBefore or equalTo).");return new j(n._repo,n._path,r,n._orderByCalled)},e}(X);function fl(t,e){return ct("endAt","key",e,!0),new wo(t,e)}var hl=function(t){P(e,t);function e(n,r){var i=t.call(this)||this;return i._value=n,i._key=r,i}return e.prototype._apply=function(n){re("endBefore",this._value,n._path,!1);var r=fa(n._queryParams,this._value,this._key);if(qt(r),ve(r),n._queryParams.hasEnd())throw new Error("endBefore: Starting point was already set (by another call to endAt, endBefore or equalTo).");return new j(n._repo,n._path,r,n._orderByCalled)},e}(X);function dl(t,e){return ct("endBefore","key",e,!0),new hl(t,e)}var To=function(t){P(e,t);function e(n,r){var i=t.call(this)||this;return i._value=n,i._key=r,i}return e.prototype._apply=function(n){re("startAt",this._value,n._path,!0);var r=dn(n._queryParams,this._value,this._key);if(qt(r),ve(r),n._queryParams.hasStart())throw new Error("startAt: Starting point was already set (by another call to startAt, startBefore or equalTo).");return new j(n._repo,n._path,r,n._orderByCalled)},e}(X);function pl(t,e){return t===void 0&&(t=null),ct("startAt","key",e,!0),new To(t,e)}var vl=function(t){P(e,t);function e(n,r){var i=t.call(this)||this;return i._value=n,i._key=r,i}return e.prototype._apply=function(n){re("startAfter",this._value,n._path,!1);var r=ca(n._queryParams,this._value,this._key);if(qt(r),ve(r),n._queryParams.hasStart())throw new Error("startAfter: Starting point was already set (by another call to startAt, startAfter, or equalTo).");return new j(n._repo,n._path,r,n._orderByCalled)},e}(X);function _l(t,e){return ct("startAfter","key",e,!0),new vl(t,e)}var gl=function(t){P(e,t);function e(n){var r=t.call(this)||this;return r._limit=n,r}return e.prototype._apply=function(n){if(n._queryParams.hasLimit())throw new Error("limitToFirst: Limit was already set (by another call to limitToFirst or limitToLast).");return new j(n._repo,n._path,ua(n._queryParams,this._limit),n._orderByCalled)},e}(X);function yl(t){if(typeof t!="number"||Math.floor(t)!==t||t<=0)throw new Error("limitToFirst: First argument must be a positive integer.");return new gl(t)}var ml=function(t){P(e,t);function e(n){var r=t.call(this)||this;return r._limit=n,r}return e.prototype._apply=function(n){if(n._queryParams.hasLimit())throw new Error("limitToLast: Limit was already set (by another call to limitToFirst or limitToLast).");return new j(n._repo,n._path,la(n._queryParams,this._limit),n._orderByCalled)},e}(X);function Cl(t){if(typeof t!="number"||Math.floor(t)!==t||t<=0)throw new Error("limitToLast: First argument must be a positive integer.");return new ml(t)}var El=function(t){P(e,t);function e(n){var r=t.call(this)||this;return r._path=n,r}return e.prototype._apply=function(n){zt(n,"orderByChild");var r=new I(this._path);if(w(r))throw new Error("orderByChild: cannot pass in empty path. Use orderByValue() instead.");var i=new Wn(r),o=Ot(n._queryParams,i);return ve(o),new j(n._repo,n._path,o,!0)},e}(X);function wl(t){if(t==="$key")throw new Error('orderByChild: "$key" is invalid.  Use orderByKey() instead.');if(t==="$priority")throw new Error('orderByChild: "$priority" is invalid.  Use orderByPriority() instead.');if(t==="$value")throw new Error('orderByChild: "$value" is invalid.  Use orderByValue() instead.');return nt("orderByChild","path",t,!1),new El(t)}var Tl=function(t){P(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e.prototype._apply=function(n){zt(n,"orderByKey");var r=Ot(n._queryParams,Z);return ve(r),new j(n._repo,n._path,r,!0)},e}(X);function Sl(){return new Tl}var Il=function(t){P(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e.prototype._apply=function(n){zt(n,"orderByPriority");var r=Ot(n._queryParams,R);return ve(r),new j(n._repo,n._path,r,!0)},e}(X);function bl(){return new Il}var Rl=function(t){P(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e.prototype._apply=function(n){zt(n,"orderByValue");var r=Ot(n._queryParams,Un);return ve(r),new j(n._repo,n._path,r,!0)},e}(X);function Nl(){return new Rl}var kl=function(t){P(e,t);function e(n,r){var i=t.call(this)||this;return i._value=n,i._key=r,i}return e.prototype._apply=function(n){if(re("equalTo",this._value,n._path,!1),n._queryParams.hasStart())throw new Error("equalTo: Starting point was already set (by another call to startAt/startAfter or equalTo).");if(n._queryParams.hasEnd())throw new Error("equalTo: Ending point was already set (by another call to endAt/endBefore or equalTo).");return new wo(this._value,this._key)._apply(new To(this._value,this._key)._apply(n))},e}(X);function Pl(t,e){return ct("equalTo","key",e,!0),new kl(t,e)}function Y(t){for(var e,n,r=[],i=1;i<arguments.length;i++)r[i-1]=arguments[i];var o=B(t);try{for(var s=ee(r),a=s.next();!a.done;a=s.next()){var u=a.value;o=u._apply(o)}}catch(l){e={error:l}}finally{try{a&&!a.done&&(n=s.return)&&n.call(s)}finally{if(e)throw e.error}}return o}tu(ie);su(ie);/**
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
 */var Al="FIREBASE_DATABASE_EMULATOR_HOST",Rn={},So=!1;function xl(t,e,n,r){t.repoInfo_=new xn(e+":"+n,!1,t.repoInfo_.namespace,t.repoInfo_.webSocketOnly,t.repoInfo_.nodeAdmin,t.repoInfo_.persistenceKey,t.repoInfo_.includeNamespaceInQueryParams),r&&(t.authTokenProvider_=r)}function Io(t,e,n,r,i){var o=r||t.options.databaseURL;o===void 0&&(t.options.projectId||te("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),L("Using default host for project ",t.options.projectId),o=t.options.projectId+"-default-rtdb.firebaseio.com");var s=In(o,i),a=s.repoInfo,u,l=void 0;typeof process!="undefined"&&(l=process.env[Al]),l?(u=!0,o="http://"+l+"?ns="+a.namespace,s=In(o,i),a=s.repoInfo):u=!s.repoInfo.secure;var c=i&&u?new ze(ze.OWNER):new us(t.name,t.options,e);ao("Invalid Firebase Database URL",s),w(s.path)||te("Database URL must point to the root of a Firebase Database (not including a child path).");var f=Dl(a,t,c,new as(t.name,n));return new Ml(f,t)}function Ol(t,e){var n=Rn[e];(!n||n[t.key]!==t)&&te("Database "+e+"("+t.repoInfo_+") has already been deleted."),fo(t),delete n[t.key]}function Dl(t,e,n,r){var i=Rn[e.name];i||(i={},Rn[e.name]=i);var o=i[t.toURLString()];return o&&te("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),o=new Wu(t,So,n,r),i[t.toURLString()]=o,o}function Ll(t){So=t}var Ml=function(){function t(e,n){this._repoInternal=e,this.app=n,this.type="database",this._instanceStarted=!1}return Object.defineProperty(t.prototype,"_repo",{get:function(){return this._instanceStarted||(Uu(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"_root",{get:function(){return this._rootInternal||(this._rootInternal=new ie(this._repo,S())),this._rootInternal},enumerable:!1,configurable:!0}),t.prototype._delete=function(){return this._rootInternal!==null&&(Ol(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()},t.prototype._checkNotDeleted=function(e){this._rootInternal===null&&te("Cannot call "+e+" on a deleted database.")},t}();function Fl(t,e,n,r){r===void 0&&(r={}),t=B(t),t._checkNotDeleted("useEmulator"),t._instanceStarted&&te("Cannot call useEmulator() after instance has already been initialized.");var i=t._repoInternal,o=void 0;if(i.repoInfo_.nodeAdmin)r.mockUserToken&&te('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new ze(ze.OWNER);else if(r.mockUserToken){var s=typeof r.mockUserToken=="string"?r.mockUserToken:Vo(r.mockUserToken,t.app.options.projectId);o=new ze(s)}xl(i,e,n,o)}function Wl(t){t=B(t),t._checkNotDeleted("goOffline"),fo(t._repo)}function Ul(t){t=B(t),t._checkNotDeleted("goOnline"),Ku(t._repo)}/**
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
 */var Bl={".sv":"timestamp"};function Ql(){return Bl}function Gl(t){return{".sv":{increment:t}}}/**
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
 */var Vl=function(){function t(e,n){this.committed=e,this.snapshot=n}return t.prototype.toJSON=function(){return{committed:this.committed,snapshot:this.snapshot.toJSON()}},t}();function Hl(t,e,n){var r;if(t=B(t),G("Reference.transaction",t._path),t.key===".length"||t.key===".keys")throw"Reference.transaction failed: "+t.key+" is a read-only object.";var i=(r=n==null?void 0:n.applyLocally)!==null&&r!==void 0?r:!0,o=new W,s=function(u,l,c){var f=null;u?o.reject(u):(f=new Kt(c,new ie(t._repo,t._path),R),o.resolve(new Vl(l,f)))},a=bn(t,function(){});return Ju(t._repo,t._path,e,s,a,i),o.promise}/**
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
 */var jl=function(){function t(e){this._delegate=e}return t.prototype.cancel=function(e){y("OnDisconnect.cancel",0,1,arguments.length),D("OnDisconnect.cancel","onComplete",e,!0);var n=this._delegate.cancel();return e&&n.then(function(){return e(null)},function(r){return e(r)}),n},t.prototype.remove=function(e){y("OnDisconnect.remove",0,1,arguments.length),D("OnDisconnect.remove","onComplete",e,!0);var n=this._delegate.remove();return e&&n.then(function(){return e(null)},function(r){return e(r)}),n},t.prototype.set=function(e,n){y("OnDisconnect.set",1,2,arguments.length),D("OnDisconnect.set","onComplete",n,!0);var r=this._delegate.set(e);return n&&r.then(function(){return n(null)},function(i){return n(i)}),r},t.prototype.setWithPriority=function(e,n,r){y("OnDisconnect.setWithPriority",2,3,arguments.length),D("OnDisconnect.setWithPriority","onComplete",r,!0);var i=this._delegate.setWithPriority(e,n);return r&&i.then(function(){return r(null)},function(o){return r(o)}),i},t.prototype.update=function(e,n){if(y("OnDisconnect.update",1,2,arguments.length),Array.isArray(e)){for(var r={},i=0;i<e.length;++i)r[""+i]=e[i];e=r,M("Passing an Array to firebase.database.onDisconnect().update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")}D("OnDisconnect.update","onComplete",n,!0);var o=this._delegate.update(e);return n&&o.then(function(){return n(null)},function(s){return n(s)}),o},t}();/**
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
 */var Yl=function(){function t(e,n){this.committed=e,this.snapshot=n}return t.prototype.toJSON=function(){return y("TransactionResult.toJSON",0,1,arguments.length),{committed:this.committed,snapshot:this.snapshot.toJSON()}},t}();/**
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
 */var Xe=function(){function t(e,n){this._database=e,this._delegate=n}return t.prototype.val=function(){return y("DataSnapshot.val",0,0,arguments.length),this._delegate.val()},t.prototype.exportVal=function(){return y("DataSnapshot.exportVal",0,0,arguments.length),this._delegate.exportVal()},t.prototype.toJSON=function(){return y("DataSnapshot.toJSON",0,1,arguments.length),this._delegate.toJSON()},t.prototype.exists=function(){return y("DataSnapshot.exists",0,0,arguments.length),this._delegate.exists()},t.prototype.child=function(e){return y("DataSnapshot.child",0,1,arguments.length),e=String(e),nt("DataSnapshot.child","path",e,!1),new t(this._database,this._delegate.child(e))},t.prototype.hasChild=function(e){return y("DataSnapshot.hasChild",1,1,arguments.length),nt("DataSnapshot.hasChild","path",e,!1),this._delegate.hasChild(e)},t.prototype.getPriority=function(){return y("DataSnapshot.getPriority",0,0,arguments.length),this._delegate.priority},t.prototype.forEach=function(e){var n=this;return y("DataSnapshot.forEach",1,1,arguments.length),D("DataSnapshot.forEach","action",e,!1),this._delegate.forEach(function(r){return e(new t(n._database,r))})},t.prototype.hasChildren=function(){return y("DataSnapshot.hasChildren",0,0,arguments.length),this._delegate.hasChildren()},Object.defineProperty(t.prototype,"key",{get:function(){return this._delegate.key},enumerable:!1,configurable:!0}),t.prototype.numChildren=function(){return y("DataSnapshot.numChildren",0,0,arguments.length),this._delegate.size},t.prototype.getRef=function(){return y("DataSnapshot.ref",0,0,arguments.length),new Ce(this._database,this._delegate.ref)},Object.defineProperty(t.prototype,"ref",{get:function(){return this.getRef()},enumerable:!1,configurable:!0}),t}(),bo=function(){function t(e,n){this.database=e,this._delegate=n}return t.prototype.on=function(e,n,r,i){var o=this,s;y("Query.on",2,4,arguments.length),D("Query.on","callback",n,!1);var a=t.getCancelAndContextArgs_("Query.on",r,i),u=function(c,f){n.call(a.context,new Xe(o.database,c),f)};u.userCallback=n,u.context=a.context;var l=(s=a.cancel)===null||s===void 0?void 0:s.bind(a.context);switch(e){case"value":return bn(this._delegate,u,l),n;case"child_added":return jr(this._delegate,u,l),n;case"child_removed":return qr(this._delegate,u,l),n;case"child_changed":return Yr(this._delegate,u,l),n;case"child_moved":return zr(this._delegate,u,l),n;default:throw new Error(V("Query.on","eventType")+'must be a valid event type = "value", "child_added", "child_removed", "child_changed", or "child_moved".')}},t.prototype.off=function(e,n,r){if(y("Query.off",0,3,arguments.length),xu("Query.off",e,!0),D("Query.off","callback",n,!0),cr("Query.off","context",r,!0),n){var i=function(){};i.userCallback=n,i.context=r,Kr(this._delegate,e,i)}else Kr(this._delegate,e)},t.prototype.get=function(){var e=this;return cl(this._delegate).then(function(n){return new Xe(e.database,n)})},t.prototype.once=function(e,n,r,i){var o=this;y("Query.once",1,4,arguments.length),D("Query.once","callback",n,!0);var s=t.getCancelAndContextArgs_("Query.once",r,i),a=new W,u=function(c,f){var h=new Xe(o.database,c);n&&n.call(s.context,h,f),a.resolve(h)};u.userCallback=n,u.context=s.context;var l=function(c){s.cancel&&s.cancel.call(s.context,c),a.reject(c)};switch(e){case"value":bn(this._delegate,u,l,{onlyOnce:!0});break;case"child_added":jr(this._delegate,u,l,{onlyOnce:!0});break;case"child_removed":qr(this._delegate,u,l,{onlyOnce:!0});break;case"child_changed":Yr(this._delegate,u,l,{onlyOnce:!0});break;case"child_moved":zr(this._delegate,u,l,{onlyOnce:!0});break;default:throw new Error(V("Query.once","eventType")+'must be a valid event type = "value", "child_added", "child_removed", "child_changed", or "child_moved".')}return a.promise},t.prototype.limitToFirst=function(e){return y("Query.limitToFirst",1,1,arguments.length),new t(this.database,Y(this._delegate,yl(e)))},t.prototype.limitToLast=function(e){return y("Query.limitToLast",1,1,arguments.length),new t(this.database,Y(this._delegate,Cl(e)))},t.prototype.orderByChild=function(e){return y("Query.orderByChild",1,1,arguments.length),new t(this.database,Y(this._delegate,wl(e)))},t.prototype.orderByKey=function(){return y("Query.orderByKey",0,0,arguments.length),new t(this.database,Y(this._delegate,Sl()))},t.prototype.orderByPriority=function(){return y("Query.orderByPriority",0,0,arguments.length),new t(this.database,Y(this._delegate,bl()))},t.prototype.orderByValue=function(){return y("Query.orderByValue",0,0,arguments.length),new t(this.database,Y(this._delegate,Nl()))},t.prototype.startAt=function(e,n){return e===void 0&&(e=null),y("Query.startAt",0,2,arguments.length),new t(this.database,Y(this._delegate,pl(e,n)))},t.prototype.startAfter=function(e,n){return e===void 0&&(e=null),y("Query.startAfter",0,2,arguments.length),new t(this.database,Y(this._delegate,_l(e,n)))},t.prototype.endAt=function(e,n){return e===void 0&&(e=null),y("Query.endAt",0,2,arguments.length),new t(this.database,Y(this._delegate,fl(e,n)))},t.prototype.endBefore=function(e,n){return e===void 0&&(e=null),y("Query.endBefore",0,2,arguments.length),new t(this.database,Y(this._delegate,dl(e,n)))},t.prototype.equalTo=function(e,n){return y("Query.equalTo",1,2,arguments.length),new t(this.database,Y(this._delegate,Pl(e,n)))},t.prototype.toString=function(){return y("Query.toString",0,0,arguments.length),this._delegate.toString()},t.prototype.toJSON=function(){return y("Query.toJSON",0,1,arguments.length),this._delegate.toJSON()},t.prototype.isEqual=function(e){if(y("Query.isEqual",1,1,arguments.length),!(e instanceof t)){var n="Query.isEqual failed: First argument must be an instance of firebase.database.Query.";throw new Error(n)}return this._delegate.isEqual(e._delegate)},t.getCancelAndContextArgs_=function(e,n,r){var i={cancel:void 0,context:void 0};if(n&&r)i.cancel=n,D(e,"cancel",i.cancel,!0),i.context=r,cr(e,"context",i.context,!0);else if(n)if(typeof n=="object"&&n!==null)i.context=n;else if(typeof n=="function")i.cancel=n;else throw new Error(V(e,"cancelOrContext")+" must either be a cancel callback or a context object.");return i},Object.defineProperty(t.prototype,"ref",{get:function(){return new Ce(this.database,new ie(this._delegate._repo,this._delegate._path))},enumerable:!1,configurable:!0}),t}(),Ce=function(t){P(e,t);function e(n,r){var i=t.call(this,n,new j(r._repo,r._path,new Mi,!1))||this;return i.database=n,i._delegate=r,i}return e.prototype.getKey=function(){return y("Reference.key",0,0,arguments.length),this._delegate.key},e.prototype.child=function(n){return y("Reference.child",1,1,arguments.length),typeof n=="number"&&(n=String(n)),new e(this.database,Ie(this._delegate,n))},e.prototype.getParent=function(){y("Reference.parent",0,0,arguments.length);var n=this._delegate.parent;return n?new e(this.database,n):null},e.prototype.getRoot=function(){return y("Reference.root",0,0,arguments.length),new e(this.database,this._delegate.root)},e.prototype.set=function(n,r){y("Reference.set",1,2,arguments.length),D("Reference.set","onComplete",r,!0);var i=lr(this._delegate,n);return r&&i.then(function(){return r(null)},function(o){return r(o)}),i},e.prototype.update=function(n,r){if(y("Reference.update",1,2,arguments.length),Array.isArray(n)){for(var i={},o=0;o<n.length;++o)i[""+o]=n[o];n=i,M("Passing an Array to Firebase.update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")}G("Reference.update",this._delegate._path),D("Reference.update","onComplete",r,!0);var s=ll(this._delegate,n);return r&&s.then(function(){return r(null)},function(a){return r(a)}),s},e.prototype.setWithPriority=function(n,r,i){y("Reference.setWithPriority",2,3,arguments.length),D("Reference.setWithPriority","onComplete",i,!0);var o=ul(this._delegate,n,r);return i&&o.then(function(){return i(null)},function(s){return i(s)}),o},e.prototype.remove=function(n){y("Reference.remove",0,1,arguments.length),D("Reference.remove","onComplete",n,!0);var r=sl(this._delegate);return n&&r.then(function(){return n(null)},function(i){return n(i)}),r},e.prototype.transaction=function(n,r,i){var o=this;y("Reference.transaction",1,3,arguments.length),D("Reference.transaction","transactionUpdate",n,!1),D("Reference.transaction","onComplete",r,!0),Du("Reference.transaction","applyLocally",i,!0);var s=Hl(this._delegate,n,{applyLocally:i}).then(function(a){return new Yl(a.committed,new Xe(o.database,a.snapshot))});return r&&s.then(function(a){return r(null,a.committed,a.snapshot)},function(a){return r(a,!1,null)}),s},e.prototype.setPriority=function(n,r){y("Reference.setPriority",1,2,arguments.length),D("Reference.setPriority","onComplete",r,!0);var i=al(this._delegate,n);return r&&i.then(function(){return r(null)},function(o){return r(o)}),i},e.prototype.push=function(n,r){var i=this;y("Reference.push",0,2,arguments.length),D("Reference.push","onComplete",r,!0);var o=ol(this._delegate,n),s=o.then(function(u){return new e(i.database,u)});r&&s.then(function(){return r(null)},function(u){return r(u)});var a=new e(this.database,o);return a.then=s.then.bind(s),a.catch=s.catch.bind(s,void 0),a},e.prototype.onDisconnect=function(){return G("Reference.onDisconnect",this._delegate._path),new jl(new il(this._delegate._repo,this._delegate._path))},Object.defineProperty(e.prototype,"key",{get:function(){return this.getKey()},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"parent",{get:function(){return this.getParent()},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"root",{get:function(){return this.getRoot()},enumerable:!1,configurable:!0}),e}(bo);/**
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
 */var kt=function(){function t(e,n){var r=this;this._delegate=e,this.app=n,this.INTERNAL={delete:function(){return r._delegate._delete()}}}return t.prototype.useEmulator=function(e,n,r){r===void 0&&(r={}),Fl(this._delegate,e,n,r)},t.prototype.ref=function(e){if(y("database.ref",0,1,arguments.length),e instanceof Ce){var n=Hr(this._delegate,e.toString());return new Ce(this,n)}else{var n=mo(this._delegate,e);return new Ce(this,n)}},t.prototype.refFromURL=function(e){var n="database.refFromURL";y(n,1,1,arguments.length);var r=Hr(this._delegate,e);return new Ce(this,r)},t.prototype.goOffline=function(){return y("database.goOffline",0,0,arguments.length),Wl(this._delegate)},t.prototype.goOnline=function(){return y("database.goOnline",0,0,arguments.length),Ul(this._delegate)},t.ServerValue={TIMESTAMP:Ql(),increment:function(e){return Gl(e)}},t}();/**
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
 */var zl=function(){ye.forceDisallow(),Dn.forceAllow()},ql=function(){Dn.forceDisallow()},Kl=function(){return ye.isAvailable()},$l=function(t,e){var n=t._delegate._repo.persistentConnection_;n.securityDebugCallback_=e},Xl=function(t,e){$u(t._delegate._repo,e)},Jl=function(t,e){Xu(t._delegate._repo,e)},Zl=function(t){return t._delegate._repo.dataUpdateCount},ec=function(t,e){return Bu(t._delegate._repo,e)};function tc(t){var e=t.app,n=t.url,r=t.version,i=t.customAuthImpl,o=t.namespace,s=t.nodeAdmin,a=s===void 0?!1:s;ei(r);var u=new Ho("auth-internal",new jo("database-standalone"));return u.setComponent(new Jr("auth-internal",function(){return i},"PRIVATE")),{instance:new kt(Io(e,u,void 0,n,a),e),namespace:o}}var nc=Object.freeze({__proto__:null,forceLongPolling:zl,forceWebSockets:ql,isWebSocketsAvailable:Kl,setSecurityDebugCallback:$l,stats:Xl,statsIncrementCounter:Jl,dataUpdateCount:Zl,interceptServerData:ec,initStandalone:tc});/**
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
 */var rc=we;we.prototype.simpleListen=function(t,e){this.sendRequest("q",{p:t},e)};we.prototype.echo=function(t,e){this.sendRequest("echo",{d:t},e)};var ic=wi,oc=function(t){var e=we.prototype.put;return we.prototype.put=function(n,r,i,o){o!==void 0&&(o=t()),e.call(this,n,r,i,o)},function(){we.prototype.put=e}},sc=xn,ac=function(t){return t._delegate._queryIdentifier},uc=function(t){Ll(t)},lc=Object.freeze({__proto__:null,DataConnection:rc,RealTimeConnection:ic,hijackHash:oc,ConnectionTarget:sc,queryIdentifier:ac,forceRestClient:uc});/**
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
 */var cc=kt.ServerValue;function fc(t){ei(t.SDK_VERSION),t.INTERNAL.registerComponent(new Jr("database",function(e,n){var r=n.instanceIdentifier,i=e.getProvider("app").getImmediate(),o=e.getProvider("auth-internal"),s=e.getProvider("app-check-internal");return new kt(Io(i,o,s,r),i)},"PUBLIC").setServiceProps({Reference:Ce,Query:bo,Database:kt,DataSnapshot:Xe,enableLogging:ii,INTERNAL:nc,ServerValue:cc,TEST_ACCESS:lc}).setMultipleInstances(!0)),t.registerVersion(Ko,$o)}fc(_e);const gc=No("CoreNotificationStore",()=>{ko(!1);const t=new zo,e=new qo;function n(u){const l=JSON.parse(u);_e.apps.length<1&&_e.initializeApp(l)}function r(){return this.isSupportMessaging=_e.messaging.isSupported()?_e.messaging():null,console.log("*****"),console.log(this.isSupportMessaging),this.isSupportMessaging&&Notification.requestPermission().then(u=>{console.log(u==="granted"?"****Notification permission granted.":"****Unable to get permission to notify.")}),this.isSupportMessaging}async function i(u,l,c){this.isSupportMessaging&&await Po.post(u,{token:l,topic:c}).then(function(f){console.log("Subscribed to "+c+".Status Code is "+f.status)}).catch(function(f){console.log(f)})}function o(u){if(localStorage.loginUserId&&localStorage.loginUserId!=""&&localStorage.loginUserId!=null&&localStorage.loginUserId!=null&&localStorage.loginUserId!=Qe.NO_LOGIN_USER&&_e.apps.length>=1){const l=_e.database().ref("User_Presence");if(u=="fe_chat"){const c={userId:localStorage.loginUserId,userName:"Tester"};l.child(localStorage.loginUserId).set(c)}else l.child(localStorage.loginUserId).remove()}}function s(u,l,c,f,h,d,v){if("serviceWorker"in navigator){if(this.isSupportMessaging){let g=u+"/firebase-messaging-sw.js";u!=null&&String(u).endsWith("/")&&(g=u+"firebase-messaging-sw.js"),navigator.serviceWorker.register(g).then(function(_){this.isSupportMessaging.getToken({vapidKey:l,serviceWorkerRegistration:_}).then(async m=>{m&&(console.log("current token for client: ",m),localStorage.deviceToken=m,c.replacedeviceToken(localStorage.deviceToken),this.subscribeTokenToTopic(f,m,"fe_broadcast"),c.loadData(),(localStorage.getItem("showProfile")==null||localStorage.showProfile=="")&&(h.appInfo.data.mobileSetting.is_show_owner_info=="1"?localStorage.showProfile="show":localStorage.showProfile="hide"),localStorage.getItem("notiSetting")==null||localStorage.notiSetting==""?a(h,c,d,v):localStorage.getItem("notiSetting")=="true"?(t.platformName=Qe.PLATFORM,t.deviceId=c.deviceToken,t.loginUserId=v.value,d.registerNotiToken(t)):(e.platformName=Qe.PLATFORM,e.deviceId=c.deviceToken,e.userId=v.value,d.unRegisterNotiToken(e)),c.replaceshowProfile(localStorage.showProfile),c.replaceNotiSetting(localStorage.notiSetting))}).catch(m=>{console.log("An error occurred while retrieving token. ",m)})}).catch(function(_){console.log("Service worker registration failed, error:",_)})}}else console.log("no serviceWorker in navigator")}function a(u,l,c,f){u.appInfo.data.frontendConfigSetting.enableNotification=="1"?(localStorage.notiSetting="true",t.platformName=Qe.PLATFORM,t.deviceId=l.deviceToken,t.loginUserId=f.value,c.registerNotiToken(t)):(localStorage.notiSetting="hide",e.platformName=Qe.PLATFORM,e.deviceId=l.deviceToken,e.userId=f.value,c.unRegisterNotiToken(e))}return{initFirebase:n,requestPermission:r,subscribeTokenToTopic:i,isUserPresence:o,initMessageServieWorker:s}});export{gc as u};
