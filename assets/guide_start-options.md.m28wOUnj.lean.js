import{_ as o}from"./chunks/style.C5ofOR1a.js";import{s as n,c as d,I as g,j as s,a as i,a1 as e,o as c}from"./chunks/framework.C8TadXOe.js";const y=e("",5),u=e("",4),F=e("",4),_=s("br",null,null,-1),m=s("div",{class:"tip custom-block"},[s("p",{class:"custom-block-title"},"TIP"),s("p",null,[i("The "),s("code",null,"startDelay"),i(" prop is in milliseconds.")])],-1),B=JSON.parse('{"title":"Start Options","description":"","frontmatter":{},"headers":[],"relativePath":"guide/start-options.md","filePath":"guide/start-options.md"}'),T={name:"guide/start-options.md"},A=Object.assign(T,{setup(C){const a=n(),l=[{target:'[data-step="0"]',content:"Tour started automatically"}],p=[{target:'[data-step="1"]',content:"Tour started"}],k=[{target:'[data-step="2"]',content:"Tour started after 2 seconds"}],t=n(l),h=n(0);function r(){t.value=p,a.value.startTour(),h.value=2e3}function E(){t.value=k,a.value.startTour()}return(v,f)=>(c(),d("div",null,[y,g(o,{ref_key:"vTourRef",ref:a,steps:t.value,autoStart:"",saveToLocalStorage:"never",noScroll:"",startDelay:h.value},null,8,["steps","startDelay"]),u,s("div",{class:"custom-block example"},[s("button",{type:"button","data-step":"1",onClick:r},"Click To Start")]),F,s("div",{class:"custom-block example"},[s("button",{type:"button","data-step":"2",onClick:E},[i("Click To Start"),_,i("With 2 Seconds Delay")])]),m]))}});export{B as __pageData,A as default};