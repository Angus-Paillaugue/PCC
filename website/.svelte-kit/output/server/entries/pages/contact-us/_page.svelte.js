import { c as create_ssr_component, e as escape } from "../../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  const { supportEmail } = data;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${$$result.head += `<!-- HEAD_svelte-9nzy5g_START -->${$$result.title = `<title>PCC - Contact us</title>`, ""}<!-- HEAD_svelte-9nzy5g_END -->`, ""} <section class="grow py-8 px-4 mx-auto max-w-4xl lg:py-16 lg:px-6 w-full"><h2 data-svelte-h="svelte-u7sbgy">Contact us</h2> <p>You can contact us by sending an e-mail to <button class="font-semibold">${escape(supportEmail)}</button></p></section>`;
});
export {
  Page as default
};
