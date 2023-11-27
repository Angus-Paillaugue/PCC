import{s as le,f as _,a as H,l as K,r as ae,g as w,u as R,d as x,c as V,h as M,m as X,v as ne,j as n,w as i,i as F,B as G,x as Y,L as oe,o as ie,O as Z,C as se,J as ce,n as ue,S as de,p as fe}from"../chunks/scheduler.513ec290.js";import{e as $}from"../chunks/each.dbf224b2.js";import{S as he,i as pe}from"../chunks/index.639a9d04.js";import{e as me}from"../chunks/forms.e3776c60.js";import{n as ge}from"../chunks/stores.4a57f107.js";function ee(a,e,s){const h=a.slice();return h[22]=e[s],h}function te(a){let e,s,h,u,d,r,p='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 transition-all group-hover:rotate-180"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>',y,g;return{c(){e=_("div"),s=_("div"),h=K(`Search :\r
                            `),u=_("input"),d=H(),r=_("button"),r.innerHTML=p,this.h()},l(c){e=w(c,"DIV",{class:!0});var v=M(e);s=w(v,"DIV",{class:!0});var b=M(s);h=X(b,`Search :\r
                            `),u=w(b,"INPUT",{type:!0,autocomplete:!0,name:!0,class:!0,placeholder:!0}),d=V(b),r=w(b,"BUTTON",{class:!0,"data-svelte-h":!0}),R(r)!=="svelte-1hkw89p"&&(r.innerHTML=p),b.forEach(x),v.forEach(x),this.h()},h(){n(u,"type","text"),n(u,"autocomplete","off"),n(u,"name","search"),n(u,"class","border text-sm rounded-lg block w-full p-1.5 bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 placeholder-neutral-400 dark:text-white focus:ring-primary-500 focus:border-primary-500 focus:outline-none outline-none transition-all caret-primary-600 focus:ring-offset-white focus:ring-offset-2 focus:ring-2 mt-1"),n(u,"placeholder","Search users by emails"),n(r,"class","absolute top-0 right-0 group"),n(s,"class","relative w-full h-full text-sm text-text-main dark:text-neutral-100"),n(e,"class","bg-neutral-100 dark:bg-neutral-700 rounded-lg p-2 absolute top-0 left-0 right-0")},m(c,v){F(c,e,v),i(e,s),i(s,h),i(s,u),Z(u,a[0]),i(s,d),i(s,r),y||(g=[G(u,"input",a[8]),G(r,"click",a[9])],y=!0)},p(c,v){v&1&&u.value!==c[0]&&Z(u,c[0])},d(c){c&&x(e),y=!1,se(g)}}}function re(a){let e,s=a[22].email+"",h,u,d,r,p,y,g,c="<span><em></em></span>",v,b,I,D;function E(...C){return a[10](a[22],...C)}return{c(){e=_("form"),h=K(s),u=H(),d=_("div"),r=_("input"),y=H(),g=_("label"),g.innerHTML=c,v=H(),this.h()},l(C){e=w(C,"FORM",{action:!0,method:!0,class:!0});var m=M(e);h=X(m,s),u=V(m),d=w(m,"DIV",{class:!0});var j=M(d);r=w(j,"INPUT",{type:!0,id:!0,name:!0,class:!0}),y=V(j),g=w(j,"LABEL",{for:!0,"data-svelte-h":!0}),R(g)!=="svelte-1mfknwm"&&(g.innerHTML=c),j.forEach(x),v=V(m),m.forEach(x),this.h()},h(){n(r,"type","checkbox"),n(r,"id","sendEmail"),n(r,"name","sendEmails"),r.checked=p=a[22].sendEmails,n(r,"class","hidden"),n(g,"for","sendEmail"),n(d,"class","switch-wrapper opacity-0 group-hover:opacity-100 transition-all"),n(e,"action","?/sendEmails"),n(e,"method","POST"),n(e,"class","w-full transition-all text-text-main dark:text-neutral-100 dark:hover:bg-neutral-600 hover:bg-neutral-100 p-2 cursor-pointer rounded-lg hover:px-4 items-center relative group flex flex-row justify-between")},m(C,m){F(C,e,m),i(e,h),i(e,u),i(e,d),i(d,r),i(d,y),i(d,g),i(e,v),I||(D=[G(r,"change",be),ce(b=me.call(null,e,E))],I=!0)},p(C,m){a=C,m&2&&s!==(s=a[22].email+"")&&ue(h,s),m&2&&p!==(p=a[22].sendEmails)&&(r.checked=p),b&&de(b.update)&&m&2&&b.update.call(null,E)},d(C){C&&x(e),I=!1,se(D)}}}function ve(a){let e,s="",h,u,d,r,p,y=`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 transition-all group-hover:rotate-[360deg] duration-300"><path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"></path></svg>
            Go back`,g,c,v,b,I,D,E,C,m,j='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path></svg>',q,A,O,W,z,k=a[3]&&te(a),t=$(a[1]),l=[];for(let o=0;o<t.length;o+=1)l[o]=re(ee(a,t,o));return{c(){e=_("script"),e.innerHTML=s,u=H(),d=_("section"),r=_("div"),p=_("a"),p.innerHTML=y,g=H(),c=_("div"),v=_("div"),b=_("div"),I=H(),D=_("div"),E=_("h5"),C=K(`Newsletter status\r
                    `),m=_("button"),m.innerHTML=j,q=H(),k&&k.c(),A=H(),O=_("div");for(let o=0;o<l.length;o+=1)l[o].c();this.h()},l(o){const T=ae("svelte-1eai",document.head);e=w(T,"SCRIPT",{src:!0,"data-svelte-h":!0}),R(e)!=="svelte-avrofd"&&(e.innerHTML=s),T.forEach(x),u=V(o),d=w(o,"SECTION",{class:!0});var f=M(d);r=w(f,"DIV",{class:!0});var S=M(r);p=w(S,"A",{href:!0,class:!0,"data-svelte-h":!0}),R(p)!=="svelte-ptbhqv"&&(p.innerHTML=y),g=V(S),c=w(S,"DIV",{class:!0});var B=M(c);v=w(B,"DIV",{class:!0});var U=M(v);b=w(U,"DIV",{class:!0}),M(b).forEach(x),U.forEach(x),I=V(B),D=w(B,"DIV",{class:!0});var L=M(D);E=w(L,"H5",{class:!0});var N=M(E);C=X(N,`Newsletter status\r
                    `),m=w(N,"BUTTON",{class:!0,"data-svelte-h":!0}),R(m)!=="svelte-1y07h73"&&(m.innerHTML=j),N.forEach(x),q=V(L),k&&k.l(L),A=V(L),O=w(L,"DIV",{class:!0});var P=M(O);for(let J=0;J<l.length;J+=1)l[J].l(P);P.forEach(x),L.forEach(x),B.forEach(x),S.forEach(x),f.forEach(x),this.h()},h(){document.title="PCC - Newsletter management",ne(e.src,h="https://cdn.jsdelivr.net/npm/apexcharts")||n(e,"src",h),n(p,"href","../"),n(p,"class","button-secondary w-fit button-small group"),n(b,"class","w-full"),n(v,"class","md:col-span-2 border border-neutral-200 dark:border-neutral-700 rounded-lg"),n(m,"class","w-fit button-secondary button-small"),n(E,"class","w-full border-b border-neutral-200 dark:border-neutral-700 flex flex-row p-2 items-center justify-between"),n(O,"class","flex flex-col gap-0 overflow-y-auto overflow-x-hidden"),n(D,"class","h-full flex flex-col gap-2 border border-neutral-200 dark:border-neutral-700 rounded-lg max-h-[450px] p-4 relative"),n(c,"class","w-full h-full grid grid-cols-1 md:grid-cols-2 gap-6"),n(r,"class","max-w-screen-lg mx-auto flex flex-col gap-6"),n(d,"class","grow w-full py-8 px-4 lg:py-16 lg:px-6 space-y-6")},m(o,T){i(document.head,e),F(o,u,T),F(o,d,T),i(d,r),i(r,p),i(r,g),i(r,c),i(c,v),i(v,b),a[6](b),i(c,I),i(c,D),i(D,E),i(E,C),i(E,m),i(D,q),k&&k.m(D,null),i(D,A),i(D,O);for(let f=0;f<l.length;f+=1)l[f]&&l[f].m(O,null);W||(z=G(m,"click",a[7]),W=!0)},p(o,[T]){if(o[3]?k?k.p(o,T):(k=te(o),k.c(),k.m(D,A)):k&&(k.d(1),k=null),T&2){t=$(o[1]);let f;for(f=0;f<t.length;f+=1){const S=ee(o,t,f);l[f]?l[f].p(S,T):(l[f]=re(S),l[f].c(),l[f].m(O,null))}for(;f<l.length;f+=1)l[f].d(1);l.length=t.length}},i:Y,o:Y,d(o){o&&(x(u),x(d)),x(e),a[6](null),k&&k.d(),oe(l,o),W=!1,z()}}}const Q=9,be=a=>{a.target.closest("form").requestSubmit()};function _e(a,e,s){let{form:h}=e,{data:u}=e;const{subscribers:d}=u;let r=d.slice(0,Q),p,y,g=!1;const c={};d.forEach(t=>{const l=t.joinedAt.toISOString().split("T")[0];c[l]=(c[l]||0)+1});const v=Object.keys(c),b=Math.min(...v.map(t=>new Date(t))),I=Math.max(new Date),D=[];for(let t=new Date(b);t<=I;t.setDate(t.getDate()+1)){const l=t.toISOString().split("T")[0];D.push(l)}const E=[];let C=0;D.forEach(t=>{const l=c[t]||0;C+=l,E.push({x:new Date(t).getDate()+"/"+(new Date(t).getMonth()+1),y:C})});let j={...{chart:{height:450,type:"line",toolbar:{show:!1}},colors:["#0da858"],dataLabels:{enabled:!0},stroke:{curve:"smooth"},grid:{borderColor:"#e7e7e7",row:{colors:["#f3f3f3","transparent"],opacity:.5}}},series:[{name:"Subscribers",data:E}],title:{text:"Subscribers progression",align:"left"},xaxis:{categories:Object.keys(c),title:{text:"Days"}},yaxis:{title:{text:"Subscribers"},min:0,max:Math.max(...E.map(t=>t.y))}};ie(()=>{new ApexCharts(p,j).render()});function q(){if(!y){s(1,r=d.slice(0,Q));return}const t=2,l=y.toLowerCase().split(" ");s(1,r=d.filter(o=>{const T=o.email.toLowerCase().split(" ");for(let f=0;f<l.length;f++){const S=l[f];let B=!1;for(let U=0;U<T.length;U++){const L=T[U];if(L.includes(S)){B=!0;break}if(S.length-L.length<=t){let N=0;for(let P=0;P<L.length&&!(L[P]!==S[P]&&(N++,N>t));P++);if(N<=t){B=!0;break}}}if(!B)return!1}return!0}).slice(0,Q))}function A(t){fe[t?"unshift":"push"](()=>{p=t,s(2,p)})}const O=()=>{s(3,g=!g)};function W(){y=this.value,s(0,y)}const z=()=>{s(3,g=!1),s(0,y="")},k=(t,l)=>(l.formData.set("email",t.email),console.log(Object.fromEntries(l.formData),t.email),({update:o})=>{o({reset:!1})});return a.$$set=t=>{"form"in t&&s(4,h=t.form),"data"in t&&s(5,u=t.data)},a.$$.update=()=>{a.$$.dirty&1&&q(),a.$$.dirty&16&&h&&h.type==="sendEmails"&&ge(h.success?"success":"error",h.message)},[y,r,p,g,h,u,A,O,W,z,k]}class Ce extends he{constructor(e){super(),pe(this,e,_e,ve,le,{form:4,data:5})}}export{Ce as component};