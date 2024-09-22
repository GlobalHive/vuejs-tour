import{d as ot,s as R,a2 as nt,h as M,y as rt,o as _,c as A,j as L,P as it,r as z,a3 as Q,a4 as Y,e as V,F as at,$ as D,t as H}from"./framework.C8TadXOe.js";/*! NanoPop 2.4.2 MIT | https://github.com/Simonwep/nanopop */const lt={variantFlipOrder:{start:"sme",middle:"mse",end:"ems"},positionFlipOrder:{top:"tbrl",right:"rltb",bottom:"btrl",left:"lrbt"},position:"bottom",margin:8,padding:0},st=(s,o,c)=>{const{container:u,arrow:p,margin:t,padding:e,position:m,variantFlipOrder:v,positionFlipOrder:b}={container:document.documentElement.getBoundingClientRect(),...lt,...c},{left:y,top:w}=o.style;o.style.left="0",o.style.top="0";const i=s.getBoundingClientRect(),a=o.getBoundingClientRect(),k={t:i.top-a.height-t,b:i.bottom+t,r:i.right+t,l:i.left-a.width-t},S={vs:i.left,vm:i.left+i.width/2-a.width/2,ve:i.left+i.width-a.width,hs:i.top,hm:i.bottom-i.height/2-a.height/2,he:i.bottom-a.height},[j,C="middle"]=m.split("-"),d=b[j],g=v[C],{top:x,left:n,bottom:l,right:r}=u;for(const h of d){const f=h==="t"||h==="b";let T=k[h];const[q,E]=f?["top","left"]:["left","top"],[F,I]=f?[a.height,a.width]:[a.width,a.height],[J,K]=f?[l,r]:[r,l],[U,W]=f?[x,n]:[n,x];if(!(T<U||T+F+e>J))for(const O of g){let $=S[(f?"v":"h")+O];if(!($<W||$+I+e>K)){if($-=a[E],T-=a[q],o.style[E]=`${$}px`,o.style[q]=`${T}px`,p){const P=f?i.width/2:i.height/2,B=I/2,N=P>B,X={s:N?B:P,m:B,e:N?B:I-P},Z={t:F,b:0,r:0,l:F},tt=$+X[O],et=T+Z[h];p.style[E]=`${tt}px`,p.style[q]=`${et}px`}return h+O}}}return o.style.left=y,o.style.top=w,null},ut=(s,o,c)=>{const u=typeof s=="object"&&!(s instanceof HTMLElement)?s:{reference:s,popper:o,...c};return{update(p=u){const{reference:t,popper:e}=Object.assign(u,p);if(!e||!t)throw new Error("Popper- or reference-element missing.");return st(t,e,u)}}};var pt=function(o,c,u,p){return o/=p/2,o<1?u/2*o*o+c:(o--,-u/2*(o*(o-2)-1)+c)},G=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(s){return typeof s}:function(s){return s&&typeof Symbol=="function"&&s.constructor===Symbol&&s!==Symbol.prototype?"symbol":typeof s},ct=function(){var o=void 0,c=void 0,u=void 0,p=void 0,t=void 0,e=void 0,m=void 0,v=void 0,b=void 0,y=void 0,w=void 0,i=void 0;function a(){return window.scrollY||window.pageYOffset}function k(d){return d.getBoundingClientRect().top+c}function S(d){b||(b=d),y=d-b,w=t(y,c,m,v),window.scrollTo(0,w),y<v?window.requestAnimationFrame(S):j()}function j(){window.scrollTo(0,c+m),o&&e&&(o.setAttribute("tabindex","-1"),o.focus()),typeof i=="function"&&i(),b=!1}function C(d){var g=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};switch(v=g.duration||1e3,p=g.offset||0,i=g.callback,t=g.easing||pt,e=g.a11y||!1,c=a(),typeof d>"u"?"undefined":G(d)){case"number":o=void 0,e=!1,u=c+d;break;case"object":o=d,u=k(o);break;case"string":o=document.querySelector(d),u=k(o);break}switch(m=u-c+p,G(g.duration)){case"number":v=g.duration;break;case"function":v=g.duration(m);break}window.requestAnimationFrame(S)}return C},dt=ct();const gt={id:"vjt-tooltip",role:"tooltip","data-arrow":"r","data-hidden":""},ft=["innerHTML"],ht={class:"vjt-actions"},mt=["textContent"],vt=["textContent"],St=["textContent"],bt={key:0,id:"vjt-arrow"},wt=ot({__name:"VTour",props:{name:{},steps:{},backdrop:{type:Boolean},autoStart:{type:Boolean},startDelay:{},highlight:{type:Boolean},margin:{},buttonLabels:{},saveToLocalStorage:{},hideSkip:{type:Boolean},hideArrow:{type:Boolean},noScroll:{type:Boolean}},emits:["onTourStart","onTourEnd","onTourStep"],setup(s,{expose:o,emit:c}){const u=R(void 0),p=R(void 0),t=nt({currentStep:0,lastStep:0,getCurrentStep:M(()=>e.steps[t.currentStep]),getLastStep:M(()=>e.steps[t.lastStep])}),e=s,m=c;o({startTour:y,nextStep:a,lastStep:k,endTour:S,stopTour:w,goToStep:j,resetTour:i});const v=M(()=>{var n,l;return t.currentStep===e.steps.length-1?((n=e.buttonLabels)==null?void 0:n.done)||"Done":((l=e.buttonLabels)==null?void 0:l.next)||"Next"}),b=R(x(".vjt-highlight")?x(".vjt-highlight"):"");function y(){localStorage.getItem("vjt-"+(e.name||"default"))!=="true"&&(e.saveToLocalStorage==="step"?t.currentStep=parseInt(localStorage.getItem("vjt-"+(e.name||"default"))||"0"):t.currentStep=0,setTimeout(()=>{u.value||(u.value=ut(document.querySelector(`${t.getCurrentStep.target}`),p.value,{position:t.getCurrentStep.placement||"right",margin:e.margin||(e.highlight||t.getCurrentStep.highlight?14:8)})),C(),m("onTourStart")},e.startDelay))}function w(){(e.backdrop||t.getLastStep.backdrop)&&document.querySelector("#vjt-backdrop").setAttribute("data-hidden",""),(e.highlight||t.getLastStep.highlight)&&document.querySelectorAll(".vjt-highlight").forEach(n=>n.classList.remove("vjt-highlight")),p.value.setAttribute("data-hidden","")}function i(n){w(),t.currentStep=0,t.lastStep=0,localStorage.removeItem("vjt-"+(e.name||"default")),n&&y()}function a(){if(t.lastStep=t.currentStep,t.currentStep++,t.currentStep>e.steps.length-1){S();return}C()}function k(){if(t.currentStep=t.lastStep,t.lastStep--,t.lastStep===-1&&(t.lastStep=0),t.currentStep<0){S();return}C()}function S(){w(),e.saveToLocalStorage!=="never"&&localStorage.setItem("vjt-"+(e.name||"default"),"true"),m("onTourEnd")}function j(n){t.currentStep=n,t.lastStep=n-1,t.lastStep===-1&&(t.lastStep=0),C()}async function C(){var n,l,r,h;await((l=(n=t.getCurrentStep).onBefore)==null?void 0:l.call(n)),await new Promise(f=>{d(),g(),p.value.setAttribute("data-hidden",""),!e.noScroll&&!t.getCurrentStep.noScroll?dt(document.querySelector(`${t.getCurrentStep.target}`),{duration:500,offset:-100,callback:()=>{f()}}):f()}),p.value.removeAttribute("data-hidden"),p.value.setAttribute("data-arrow",u.value.update({reference:document.querySelector(`${t.getCurrentStep.target}`),position:t.getCurrentStep.placement||"right"})||"right"),e.saveToLocalStorage==="step"&&localStorage.setItem("vjt-"+(e.name||"default"),t.currentStep.toString()),await((h=(r=t.getCurrentStep).onAfter)==null?void 0:h.call(r)),m("onTourStep")}function d(){document.querySelectorAll(".vjt-highlight").forEach(n=>n.classList.remove("vjt-highlight")),!(!e.highlight&&!t.getCurrentStep.highlight)&&(document.querySelector(`${t.getCurrentStep.target}`).classList.add("vjt-highlight"),b.value=x(".vjt-highlight"))}function g(){e.backdrop||t.getCurrentStep.backdrop?document.querySelector("#vjt-backdrop").removeAttribute("data-hidden"):document.querySelector("#vjt-backdrop").setAttribute("data-hidden","")}rt(()=>{p.value=document.querySelector("#vjt-tooltip"),e.autoStart&&y()});function x(n){const l=document.querySelector(n);if(!l)return"";const r=l.getBoundingClientRect();return`polygon(
    0% 0%,
    0% 100%,
    ${r.left}px 100%,
    ${r.left}px ${r.top}px,
    ${r.right}px ${r.top}px,
    ${r.right}px ${r.bottom}px,
    ${r.left}px ${r.bottom}px,
    ${r.left}px 100%,
    100% 100%,
    100% 0%
  )`}return(n,l)=>(_(),A(at,null,[L("div",{id:"vjt-backdrop","data-hidden":"",style:it("clip-path: "+b.value)},null,4),L("div",gt,[z(n.$slots,"content",Q(Y({_CurrentStep:t})),()=>{var r;return[L("div",{innerHTML:(r=t.getCurrentStep)==null?void 0:r.content},null,8,ft)]}),z(n.$slots,"actions",Q(Y({lastStep:k,nextStep:a,endTour:S,_CurrentStep:t,getNextLabel:v.value,props:e})),()=>{var r,h;return[L("div",ht,[t.lastStep<t.currentStep?(_(),A("button",{key:0,type:"button",onClick:l[0]||(l[0]=D(f=>k(),["prevent"])),textContent:H(((r=e.buttonLabels)==null?void 0:r.back)||"Back")},null,8,mt)):V("",!0),e.hideSkip?V("",!0):(_(),A("button",{key:1,type:"button",onClick:l[1]||(l[1]=D(f=>S(),["prevent"])),textContent:H(((h=e.buttonLabels)==null?void 0:h.skip)||"Skip")},null,8,vt)),L("button",{type:"button",onClick:l[2]||(l[2]=D(f=>a(),["prevent"])),textContent:H(v.value)},null,8,St)])]}),e.hideArrow?V("",!0):(_(),A("div",bt))])],64))}});export{wt as _};
