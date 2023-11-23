import { c as create_ssr_component, a as subscribe, e as escape, b as add_attribute, d as set_store_value, f as each, v as validate_component } from "../../chunks/ssr.js";
import { p as page } from "../../chunks/stores.js";
import { w as writable } from "../../chunks/index2.js";
import { inject } from "@vercel/analytics";
const app = "";
const Analytics = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  {
    {
      if (typeof gtag !== "undefined") {
        gtag("config", "G-L7NHG732ZP", {
          page_title: document.title,
          page_path: $page.url.pathname
        });
      }
    }
  }
  $$unsubscribe_page();
  return `${$$result.head += `<!-- HEAD_svelte-1jq7r3o_START --><script async src="https://www.googletagmanager.com/gtag/js?id=G-L7NHG732ZP" data-svelte-h="svelte-1xv12mh"><\/script><script data-svelte-h="svelte-yjmput">window.dataLayer = window.dataLayer || [];

    function gtag() {
      dataLayer.push(arguments);
    }

    gtag('js', new Date());
    gtag('config', 'G-L7NHG732ZP');<\/script><!-- HEAD_svelte-1jq7r3o_END -->`, ""}`;
});
const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<footer class="w-full p-6 pt-24 flex flex-col border-t mt-4"><div class="max-w-screen-xl mx-auto w-full"><div class="flex flex-col gap-6" data-svelte-h="svelte-nlm1zh"><a href="/" class="flex flex-row items-center gap-2 w-fit"><img src="/128-icon.png" alt="" class="w-10"> <h5>PCC</h5></a> <div class="w-full grid grid-cols-2 sm:grid-cols-3 gap-6"><div class="flex flex-col gap-4"><h6>Support</h6> <a href="/help" class="link w-fit">Help</a> <a href="/contact-us" class="link w-fit">Contact us</a></div> <div class="flex flex-col gap-4"><h6>Company</h6> <a href="/about-us" class="link w-fit">About</a></div> <div class="flex flex-col gap-4"><h6>Legal</h6> <a href="/privacy-policy" class="link w-fit">Privacy Policy</a></div></div></div> <hr> <p class="mt-4 text-xs">© ${escape((/* @__PURE__ */ new Date()).getFullYear())} Pandabuy Currency Conversion, Inc. All rights reserved.</p></div></footer>`;
});
const NavBar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let user = $page.data.user;
  let extensions = $page.data.extensions;
  $page.data.getBrowserType;
  let extension = extensions[0];
  $$unsubscribe_page();
  return `<nav class="px-4 py-2 border-b bg-neutral-100/50 backdrop-blur-lg z-40 border-neutral-200 fixed top-0 left-0 w-full h-16"><div class="flex flex-row items-center justify-between max-w-screen-lg mx-auto gap-4 h-full"><a href="/" class="h-full" data-svelte-h="svelte-1xdui3s"><img src="/128-icon.png" alt="" class="h-full"></a> <ul class="md:flex flex-row gap-4 hidden" data-svelte-h="svelte-eujcl0"><li><a href="/" class="nav-link w-fit">Home</a></li> <li><a href="/help" class="nav-link w-fit">Get help</a></li> <li><a href="/pricing" class="nav-link w-fit">Pricing</a></li></ul> <div class="max-md:hidden">${!user ? `<a href="/auth" class="button-secondary button-small" data-svelte-h="svelte-hsnp7r">Log-in</a>` : `<a href="/dashboard" class="button-secondary button-small" data-svelte-h="svelte-1h42w8j">Dashboard</a>`} ${extension !== "blank" ? `<a${add_attribute("href", extension.link, 0)} class="button-primary button-small ml-2">Download</a>` : ``}</div> <button class="md:hidden"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">${`<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path>`}</svg></button></div></nav> <div class="${"fixed top-16 h-full w-full left-0 p-4 pb-20 flex md:hidden flex-col gap-2 justify-center items-center bg-gray-200/50 backdrop-blur transition-opacity " + escape("opacity-0 -z-10", true)}">  <ul class="flex flex-col gap-4 text-center"><li data-svelte-h="svelte-cguckx"><a href="/" class="nav-link w-fit">Home</a></li> <li data-svelte-h="svelte-p47p28"><a href="/help" class="nav-link w-fit">Get help</a></li> <li data-svelte-h="svelte-qmfy6"><a href="/pricing" class="nav-link w-fit">Pricing</a></li> <li>${!user ? `<a href="/auth" class="button-secondary button-small" data-svelte-h="svelte-hsnp7r">Log-in</a>` : `<a href="/dashboard" class="button-secondary button-small" data-svelte-h="svelte-1h42w8j">Dashboard</a>`}</li> ${extension !== "blank" ? `<li><a${add_attribute("href", extension.link, 0)} class="button-primary button-small">Download</a></li>` : ``}</ul></div>`;
});
const CookieModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${``}`;
});
const Banner = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let latestUpdate;
  let banner;
  latestUpdate = $page.data.latestUpdate;
  banner = {
    display: false,
    message: latestUpdate?.description
  };
  $$unsubscribe_page();
  return `${banner?.display ? `<div class="fixed top-16 left-0 bg-primary-600 w-full h-12 z-40"><div class="max-w-screen-lg w-full mx-auto flex flex-row items-center justify-center h-full relative"><p class="text-neutral-100">${escape(banner.message)}</p> <button class="absolute right-2 top-2 bottom-2 rounded-md hover:bg-primary-300 text-neutral-900 group aspect-square flex flex-col items-center justify-center" data-svelte-h="svelte-15o6vr3"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 transition-all group-hover:rotate-90"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg></button></div></div>` : ``}`;
});
const toasts = writable([]);
const Toasts = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $toasts, $$unsubscribe_toasts;
  $$unsubscribe_toasts = subscribe(toasts, (value) => $toasts = value);
  {
    if ($toasts.length > 5) {
      set_store_value(toasts, $toasts = $toasts.slice(0, 5), $toasts);
    }
  }
  $$unsubscribe_toasts();
  return `<div class="fixed top-2 right-2 flex flex-col gap-2 z-50 sm:bottom-0">${each($toasts, (toast, i) => {
    return `${toast.type == "error" ? `<div class="flex items-center w-full sm:max-w-xs max-sm-sm:max-w-[250px] sm:p-4 p-2 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert"><div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200" data-svelte-h="svelte-1mqk3iu"><svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20"><path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"></path></svg> <span class="sr-only">Error icon</span></div> <div class="ms-3 text-sm font-normal">${escape(toast.message)}</div> <button type="button" class="ml-2 sm:ml-4 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-6 w-6 sm:h-8 sm:w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-danger" aria-label="Close" data-svelte-h="svelte-ofd29r"><span class="sr-only">Close</span> <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"></path></svg></button> </div>` : `${toast.type == "success" ? `<div class="flex items-center w-full sm:max-w-xs max-sm:max-w-[250px] sm:p-4 p-2 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 gap-2" role="alert"><div class="flex items-center justify-center flex-shrink-0 h-6 w-6 sm:w-8 sm:h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200" data-svelte-h="svelte-1oc0f7m"><svg class="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20"><path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"></path></svg></div> <div class="text-sm font-normal grow">${escape(toast.message)}</div> <button type="button" class="ml-2 sm:ml-4 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 flex-shrink-0" data-dismiss-target="#toast-success" aria-label="Close" data-svelte-h="svelte-dpeg5c"><span class="sr-only">Close</span> <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"></path></svg></button> </div>` : ``}`}`;
  })}</div>`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  inject({ mode: "production" });
  return `${validate_component(Analytics, "Analytics").$$render($$result, {}, {}, {})} ${validate_component(CookieModal, "CookieModal").$$render($$result, {}, {}, {})} ${validate_component(Banner, "Banner").$$render($$result, {}, {}, {})} ${validate_component(Toasts, "Toasts").$$render($$result, {}, {}, {})} <main class="flex flex-col min-h-screen">${validate_component(NavBar, "NavBar").$$render($$result, {}, {}, {})} <div class="grow pt-16 w-full">${slots.default ? slots.default({}) : ``}</div> ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}</main>`;
});
export {
  Layout as default
};