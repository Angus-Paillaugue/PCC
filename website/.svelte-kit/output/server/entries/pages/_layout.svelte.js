import { c as create_ssr_component, a as subscribe, e as escape, b as add_attribute, v as validate_component, d as set_store_value, f as each } from "../../chunks/ssr.js";
import { p as page } from "../../chunks/stores.js";
import { I as Icon } from "../../chunks/Icon.js";
import { t as toasts, a as theme } from "../../chunks/stores2.js";
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
  return `<footer class="w-full p-6 pt-24 flex flex-col border-t dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700"><div class="max-w-screen-xl mx-auto w-full"><div class="flex flex-col gap-6" data-svelte-h="svelte-13yqcyp"><a href="/" class="flex flex-row items-center gap-2 w-fit"><img src="/128-icon.png" alt="" class="w-10"> <h5>PCC</h5></a> <div class="w-full grid grid-cols-2 sm:grid-cols-3 gap-6"><div class="flex flex-col gap-4"><h6>Support</h6> <a href="/help" class="link w-fit">Help</a> <a href="/contact-us" class="link w-fit">Contact us</a></div> <div class="flex flex-col gap-4"><h6>Company</h6> <a href="/about-us" class="link w-fit">About</a></div> <div class="flex flex-col gap-4"><h6>Legal</h6> <a href="/privacy-policy" class="link w-fit">Privacy Policy</a> <a href="/terms-of-services" class="link w-fit">Terms of services</a></div></div></div> <hr> <p class="mt-4 text-xs">© ${escape((/* @__PURE__ */ new Date()).getFullYear())} Pandabuy Currency Conversion, Inc. All rights reserved.</p></div></footer>`;
});
const NavBar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let user = $page.data.user;
  let extensions = $page.data.extensions;
  $page.data.getBrowserType;
  let extension = extensions[0];
  $$unsubscribe_page();
  return `<nav class="px-4 py-2 border-b bg-neutral-100/50 dark:bg-neutral-900/80 backdrop-blur-lg z-40 border-neutral-200 dark:border-neutral-700 fixed top-0 left-0 w-full h-16"><div class="flex flex-row items-center justify-between max-w-screen-lg mx-auto gap-4 h-full"><a href="/" class="h-full" name="home" data-svelte-h="svelte-gdchp7"><img src="/128-icon.png" alt="" class="h-full"></a> <ul class="md:flex flex-row gap-4 hidden" data-svelte-h="svelte-eujcl0"><li><a href="/" class="nav-link w-fit">Home</a></li> <li><a href="/help" class="nav-link w-fit">Get help</a></li> <li><a href="/pricing" class="nav-link w-fit">Pricing</a></li></ul> <div class="max-md:hidden">${!user ? `<a href="/auth" class="button-secondary button-small" data-svelte-h="svelte-hsnp7r">Log-in</a>` : `<a href="/dashboard" class="button-secondary button-small" data-svelte-h="svelte-1h42w8j">Dashboard</a>`} ${extension !== "blank" ? `<a${add_attribute("href", extension.link, 0)} class="button-primary button-small ml-2">Download</a>` : ``}</div> <button class="md:hidden">${`${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      icon: "heroicons:bars-3-solid",
      class: "w-6 h-6"
    },
    {},
    {}
  )}`}</button></div></nav> <div class="${"fixed top-16 h-full w-full left-0 p-4 pb-20 flex md:hidden flex-col gap-2 justify-center items-center bg-gray-200/50 dark:bg-neutral-900/80 backdrop-blur transition-opacity " + escape("opacity-0 -z-10", true)}">  <ul class="flex flex-col gap-4 text-center"><li data-svelte-h="svelte-cguckx"><a href="/" class="nav-link w-fit">Home</a></li> <li data-svelte-h="svelte-p47p28"><a href="/help" class="nav-link w-fit">Get help</a></li> <li data-svelte-h="svelte-qmfy6"><a href="/pricing" class="nav-link w-fit">Pricing</a></li> <li>${!user ? `<a href="/auth" class="button-secondary button-small" data-svelte-h="svelte-hsnp7r">Log-in</a>` : `<a href="/dashboard" class="button-secondary button-small" data-svelte-h="svelte-1h42w8j">Dashboard</a>`}</li> ${extension !== "blank" ? `<li><a${add_attribute("href", extension.link, 0)} class="button-primary button-small">Download</a></li>` : ``}</ul></div>`;
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
  return `${banner?.display ? `<div class="fixed top-16 left-0 bg-primary-600 dark:bg-primary-700 w-full h-12 z-40"><div class="max-w-screen-lg w-full mx-auto flex flex-row items-center justify-center h-full relative"><p class="text-neutral-100">${escape(banner.message)}</p> <button class="absolute right-2 top-1/2 -translate-y-1/2 rounded-md hover:bg-primary-300 dark:hover:bg-primary-500 text-neutral-900 group aspect-square flex flex-col items-center justify-center" name="close">${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      icon: "heroicons:x-mark-solid",
      class: "w-6 h-6 transition-all group-hover:rotate-90"
    },
    {},
    {}
  )}</button></div></div>` : ``}`;
});
const Toasts = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $toasts, $$unsubscribe_toasts;
  $$unsubscribe_toasts = subscribe(toasts, (value) => $toasts = value);
  {
    if ($toasts.length > 5) {
      set_store_value(toasts, $toasts = $toasts.slice(0, 5), $toasts);
    }
  }
  $$unsubscribe_toasts();
  return `<div class="fixed top-2 right-2 flex flex-col gap-2 z-50 sm:bottom-0 pointer-events-none">${each($toasts, (toast, i) => {
    return `${toast.type == "error" ? `<div class="flex items-center w-full sm:max-w-xs max-sm-sm:max-w-[250px] sm:p-4 p-2 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 pointer-events-auto" role="alert">${validate_component(Icon, "Icon").$$render(
      $$result,
      {
        icon: "heroicons:exclamation-circle-solid",
        class: "inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200"
      },
      {},
      {}
    )} <div class="ms-3 text-sm font-normal">${escape(toast.message)}</div> <button type="button" class="ml-2 sm:ml-4 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-6 w-6 sm:h-8 sm:w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-danger" aria-label="Close"><span class="sr-only" data-svelte-h="svelte-1pewzs3">Close</span> ${validate_component(Icon, "Icon").$$render($$result, { icon: "heroicons:x-mark" }, {}, {})}</button> </div>` : `${toast.type == "success" ? `<div class="flex items-center w-full sm:max-w-xs max-sm:max-w-[250px] sm:p-4 p-2 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 gap-2 pointer-events-auto" role="alert">${validate_component(Icon, "Icon").$$render(
      $$result,
      {
        icon: "heroicons:check-circle-solid",
        class: "flex items-center justify-center flex-shrink-0 h-6 w-6 sm:w-8 sm:h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200"
      },
      {},
      {}
    )} <div class="text-sm font-normal grow">${escape(toast.message)}</div> <button type="button" class="ml-2 sm:ml-4 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 flex-shrink-0" data-dismiss-target="#toast-success" aria-label="Close"><span class="sr-only" data-svelte-h="svelte-1pewzs3">Close</span> ${validate_component(Icon, "Icon").$$render($$result, { icon: "heroicons:x-mark" }, {}, {})}</button> </div>` : ``}`}`;
  })}</div>`;
});
const Theme = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $theme, $$unsubscribe_theme;
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  $$unsubscribe_theme();
  return `<div class="right-2 bottom-4 fixed z-40"><button class="group w-8 h-8 rounded-full shadow cursor-pointer bg-neutral-300 hover:bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-100">${$theme === "light" ? `${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      icon: "heroicons:sun",
      class: "w-6 h-6 group-hover:fill-yellow-300 dark:opacity-0 opacity-100 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all group-hover:rotate-45"
    },
    {},
    {}
  )}` : `${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      icon: "heroicons:moon",
      class: "w-6 h-6 group-hover:fill-gray-700 opacity-0 dark:opacity-100 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all"
    },
    {},
    {}
  )}`}</button></div>`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  inject({ mode: "production" });
  return `${$$result.head += `<!-- HEAD_svelte-1ixwc2_START --><script data-svelte-h="svelte-1890347">(function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:3748048,hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');<\/script><!-- HEAD_svelte-1ixwc2_END -->`, ""} ${validate_component(Analytics, "Analytics").$$render($$result, {}, {}, {})} ${validate_component(CookieModal, "CookieModal").$$render($$result, {}, {}, {})} ${validate_component(Banner, "Banner").$$render($$result, {}, {}, {})} ${validate_component(Toasts, "Toasts").$$render($$result, {}, {}, {})} <main class="flex flex-col">${validate_component(NavBar, "NavBar").$$render($$result, {}, {}, {})} <div class="min-h-screen pb-4 pt-16 w-full flex flex-col items-center">${slots.default ? slots.default({}) : ``}</div> ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}</main> ${validate_component(Theme, "Theme").$$render($$result, {}, {}, {})}`;
});
export {
  Layout as default
};
