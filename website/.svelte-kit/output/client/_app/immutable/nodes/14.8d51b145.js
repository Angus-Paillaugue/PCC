import{s as q,f as r,l as H,a as L,g as i,h as w,m as O,d as g,c as M,u as V,j as o,i as A,w as t,B as j,n as J,x as Y,C as R}from"../chunks/scheduler.513ec290.js";import{S as U,i as z}from"../chunks/index.639a9d04.js";import{n as F}from"../chunks/stores.4a57f107.js";function G(m){let s,a,e,c,h,p=m[0].email+"",n,y,d,x,N="Receive e-mails :",C,u,l,S,v,P="<span><em></em></span>",T,B;return{c(){s=r("section"),a=r("div"),e=r("h6"),c=H("Your e-mail : "),h=r("b"),n=H(p),y=L(),d=r("div"),x=r("p"),x.textContent=N,C=L(),u=r("div"),l=r("input"),S=L(),v=r("label"),v.innerHTML=P,this.h()},l(f){s=i(f,"SECTION",{class:!0});var _=w(s);a=i(_,"DIV",{class:!0});var E=w(a);e=i(E,"H6",{class:!0});var I=w(e);c=O(I,"Your e-mail : "),h=i(I,"B",{});var D=w(h);n=O(D,p),D.forEach(g),I.forEach(g),y=M(E),d=i(E,"DIV",{class:!0});var b=w(d);x=i(b,"P",{"data-svelte-h":!0}),V(x)!=="svelte-1y94uex"&&(x.textContent=N),C=M(b),u=i(b,"DIV",{class:!0});var k=w(u);l=i(k,"INPUT",{type:!0,id:!0,class:!0}),S=M(k),v=i(k,"LABEL",{for:!0,"data-svelte-h":!0}),V(v)!=="svelte-68xg0v"&&(v.innerHTML=P),k.forEach(g),b.forEach(g),E.forEach(g),_.forEach(g),this.h()},h(){o(e,"class","font-normal"),o(l,"type","checkbox"),o(l,"id","darkMode"),o(l,"class","hidden"),o(v,"for","darkMode"),o(u,"class","switch-wrapper"),o(d,"class","flex flex-row gap-2"),o(a,"class","border-neutral-200 dark:border-neutral-700 rounded-lg p-6 flex flex-col gap-4"),o(s,"class","p-4 md:p-6 lg:p-10 pt-24 flex flex-col items-center gap-10 max-sm:pl-6 max-w-screen-xl w-full mx-auto grow")},m(f,_){A(f,s,_),t(s,a),t(a,e),t(e,c),t(e,h),t(h,n),t(a,y),t(a,d),t(d,x),t(d,C),t(d,u),t(u,l),l.checked=m[0].sendEmails,t(u,S),t(u,v),T||(B=[j(l,"change",m[3]),j(l,"change",m[1])],T=!0)},p(f,[_]){_&1&&p!==(p=f[0].email+"")&&J(n,p),_&1&&(l.checked=f[0].sendEmails)},i:Y,o:Y,d(f){f&&g(s),T=!1,R(B)}}}function K(m,s,a){let{data:e}=s;const{settings:c}=e;async function h(){const n=await fetch("/api/updateNewsletter",{method:"POST",body:JSON.stringify({settings:c})});a(2,e=await n.json()),F("success",e.message)}function p(){c.sendEmails=this.checked,a(0,c)}return m.$$set=n=>{"data"in n&&a(2,e=n.data)},[c,h,e,p]}class Z extends U{constructor(s){super(),z(this,s,K,G,q,{data:2})}}export{Z as component};