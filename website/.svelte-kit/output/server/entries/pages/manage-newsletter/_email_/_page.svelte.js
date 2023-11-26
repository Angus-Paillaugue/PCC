import { c as create_ssr_component, e as escape, b as add_attribute } from "../../../../chunks/ssr.js";
import "../../../../chunks/stores2.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  const { settings } = data;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<section class="p-4 md:p-6 lg:p-10 pt-24 flex flex-col items-center gap-10 max-sm:pl-6 max-w-screen-xl w-full mx-auto grow"><div class="border-neutral-200 dark:border-neutral-700 rounded-lg p-6 flex flex-col gap-4"><h6 class="font-normal">Your e-mail : <b>${escape(settings.email)}</b></h6> <div class="flex flex-row gap-2"><p data-svelte-h="svelte-1y94uex">Receive e-mails :</p> <div class="switch-wrapper"><input type="checkbox" id="darkMode" class="hidden"${add_attribute("checked", settings.sendEmails, 1)}> <label for="darkMode" data-svelte-h="svelte-68xg0v"><span><em></em></span></label></div></div></div></section>`;
});
export {
  Page as default
};
