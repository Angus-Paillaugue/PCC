import { c as create_ssr_component, e as escape } from "./ssr.js";
const Modal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { status = false } = $$props;
  let { closeButton = true } = $$props;
  let { title } = $$props;
  if ($$props.status === void 0 && $$bindings.status && status !== void 0)
    $$bindings.status(status);
  if ($$props.closeButton === void 0 && $$bindings.closeButton && closeButton !== void 0)
    $$bindings.closeButton(closeButton);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  return `<div class="${"fixed top-O left-0 w-full h-full transition-opacity flex flex-col justify-center items-center bg-neutral-600/50 dark:bg-neutral-900/50 p-2 " + escape(status ? "opacity-100 z-40" : "opacity-0 -z-10", true)}"><div class="rounded-lg bg-white dark:bg-neutral-800 p-4 flex flex-col gap-4 max-w-lg w-full relative">${closeButton ? `<button type="button" class="group absolute top-2 right-2 button-close" data-svelte-h="svelte-1sb1ni9"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 transition-all group-hover:rotate-90"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg></button>` : ``} <h3>${escape(title)}</h3> ${slots.body ? slots.body({}) : ``} <div class="grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-4">${slots.footer ? slots.footer({}) : ``}</div></div></div>`;
});
export {
  Modal as M
};
