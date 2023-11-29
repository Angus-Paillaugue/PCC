import { c as create_ssr_component, e as escape, v as validate_component } from "../../../chunks/ssr.js";
import { I as Icon } from "../../../chunks/Icon.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  const { user } = data;
  console.log(user);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${$$result.head += `<!-- HEAD_svelte-hjaex0_START -->${$$result.title = `<title>PCC - Dashboard</title>`, ""}<!-- HEAD_svelte-hjaex0_END -->`, ""} <section class="grow w-full py-8 px-4 lg:py-16 lg:px-6 max-w-lg mx-auto"><div class="rounded-lg border-neutral-200 dark:border-neutral-700 border flex flex-col gap-2 md:p-10 p-6 h-fit"><h3>Welcome ${escape(user.username)}</h3> <p>Current plan : <span class="font-semibold">${escape(user.isPremium ? "Premium" : "Basic")}</span></p> <div class="grid darp-2 md:gap-4 grid-cols-1 md:grid-cols-2 mt-4"><a href="/dashboard/settings" class="card-button">${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      icon: "heroicons:cog-6-tooth-solid",
      class: "w-6 h-6"
    },
    {},
    {}
  )}
                Settings</a> <a href="/log-out" class="card-button">${validate_component(Icon, "Icon").$$render($$result, { icon: "carbon:logout", class: "w-6 h-6" }, {}, {})}
                Log-out</a></div></div></section>`;
});
export {
  Page as default
};
