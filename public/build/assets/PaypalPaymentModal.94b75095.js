import S from"./PsModal.36ad7f82.js";import h from"./PsButton.7f6705bd.js";import{u as M}from"./TokenStore.3c99c57f.js";import{P as $}from"./PsValueStore.eb9430a0.js";import x from"./PsErrorDialog.d6a4d7d4.js";import{d as V,i as f,o as q,c as w,b as n,w as c,a as k,q as y,t as g,F as B,A as E,r as d}from"./app.2982e019.js";import{d as N}from"./dropin.482cf9a5.js";import{_ as T}from"./plugin-vue_export-helper.21dcd24c.js";import"./vue-neat-modal.2bf17e6b.js";import"./PsLine.ea3266c0.js";import"./ThemeStore.40343845.js";import"./LanguageStore.8f1cddd7.js";import"./PsApiService.9afc2356.js";import"./ApiStatus.5720ba0b.js";import"./PsObject.a17ef38f.js";import"./PsSepetetedStore.9a31ac47.js";import"./PsLabelTitle.ddb6fa87.js";import"./PsLabel.c51f2c9d.js";const D=V({name:"PaypalPaymentModal",components:{PsModal:S,PsButton:h,PsErrorDialog:x},setup(){const o=f(),e=f(),p=M(),m=$().getLoginUserId();let s,t;function a(r){r=="yes"?s():t(),o.value.toggle(!1)}async function i(r,v){o.value.toggle(!0),s=r,t=v;const b=await p.loadToken(m),l=document.querySelector("#submit-button");N.create({authorization:b.data.message,container:"#dropin-container",paypal:{flow:"vault"}},function(j,u){l==null||l.addEventListener("click",function(){u.isPaymentMethodRequestable()&&setTimeout(function(){u.requestPaymentMethod(async function(C,_){if(console.log(_),C){e.value.openModal("",E("paypal_credit_card_modal__error_paid_ad"));return}localStorage.paymentNonce=_.nonce,a("yes")})},200)})})}return{psmodal:o,ps_error_dialog:e,openModal:i,actionClicked:a}}}),F=k("div",{id:"dropin-container"},null,-1),I={class:"flex justify-center mx-auto"};function L(o,e,p,P,m,s){const t=d("ps-button"),a=d("ps-modal"),i=d("ps-error-dialog");return q(),w(B,null,[n(a,{ref:"psmodal",line:"hidden",isClickOut:!1},{body:c(()=>[F,k("div",I,[n(t,{id:"submit-button"},{default:c(()=>[y(g(o.$t("paypal_credit_card_modal__submit_payment")),1)]),_:1}),n(t,{theme:"btn-second",class:"text-center mx-4",onClick:e[0]||(e[0]=r=>o.actionClicked("no"))},{default:c(()=>[y(g(o.$t("paypal_credit_card_modal__close")),1)]),_:1})])]),_:1},512),n(i,{ref:"ps_error_dialog"},null,512)],64)}var no=T(D,[["render",L]]);export{no as default};
