import{s as N,a as w,f as m,l as E,r as O,d as c,c as T,g as h,h as g,u as Y,m as P,j as S,i as z,w as i,I as j,z as A,x as C,A as q}from"../chunks/scheduler.48e732d9.js";import{S as B,i as H}from"../chunks/index.d806ca90.js";import{n as I}from"../chunks/stores.cc8b6fab.js";import{c as U}from"../chunks/copy.65aa4a8b.js";function k(s){let o,t,e,u="Contact us",d,n,r,a,_,f,b;return{c(){o=w(),t=m("section"),e=m("h2"),e.textContent=u,d=w(),n=m("p"),r=E("You can contact us by sending an e-mail to "),a=m("button"),_=E(s[0]),this.h()},l(l){O("svelte-9nzy5g",document.head).forEach(c),o=T(l),t=h(l,"SECTION",{class:!0});var p=g(t);e=h(p,"H2",{"data-svelte-h":!0}),Y(e)!=="svelte-u7sbgy"&&(e.textContent=u),d=T(p),n=h(p,"P",{});var v=g(n);r=P(v,"You can contact us by sending an e-mail to "),a=h(v,"BUTTON",{class:!0});var x=g(a);_=P(x,s[0]),x.forEach(c),v.forEach(c),p.forEach(c),this.h()},h(){document.title="PCC - Contact us",S(a,"class","font-semibold"),S(t,"class","grow py-8 px-4 mx-auto max-w-4xl lg:py-16 lg:px-6 w-full")},m(l,y){z(l,o,y),z(l,t,y),i(t,e),i(t,d),i(t,n),i(n,r),i(n,a),i(a,_),f||(b=[j(U.call(null,a,s[0])),A(a,"svelte-copy",s[2]),A(a,"svelte-copy:error",s[3])],f=!0)},p:C,i:C,o:C,d(l){l&&(c(o),c(t)),f=!1,q(b)}}}function D(s,o,t){let{data:e}=o;const{supportEmail:u}=e,d=()=>{I("success","Copied to clipboard successfully!")},n=()=>{I("error","An error occurred while copying to the clipboard")};return s.$$set=r=>{"data"in r&&t(1,e=r.data)},[u,e,d,n]}class L extends B{constructor(o){super(),H(this,o,D,k,N,{data:1})}}export{L as component};