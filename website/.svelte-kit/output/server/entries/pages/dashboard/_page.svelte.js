import { c as create_ssr_component, e as escape } from "../../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  const { user } = data;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${$$result.head += `<!-- HEAD_svelte-hjaex0_START -->${$$result.title = `<title>PCC - Dashboard</title>`, ""}<!-- HEAD_svelte-hjaex0_END -->`, ""} <section class="grow w-full py-8 px-4 lg:py-16 lg:px-6 max-w-lg mx-auto"><div class="rounded-lg border-neutral-200 border flex flex-col gap-2 md:p-10 p-6 h-fit"><h3>Welcome ${escape(user.username)}</h3> <p>Current plan : <span class="font-semibold">${escape(user.isPremium ? "Premium" : "Basic")}</span></p> <a href="/log-out" class="button-red" data-svelte-h="svelte-1l9icdm">Log-out</a></div></section>`;
});
export {
  Page as default
};
