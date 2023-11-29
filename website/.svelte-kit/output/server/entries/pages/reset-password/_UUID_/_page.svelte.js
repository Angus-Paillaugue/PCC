import { c as create_ssr_component, b as add_attribute, v as validate_component } from "../../../../chunks/ssr.js";
import { A as Alert } from "../../../../chunks/Alert.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let { form } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  return `${$$result.head += `<!-- HEAD_svelte-1chsx13_START -->${$$result.title = `<title>PCC - Reset password</title>`, ""}<!-- HEAD_svelte-1chsx13_END -->`, ""} <div class="py-8 px-4 lg:py-16 lg:px-6 w-full grow"><form class="rounded-lg md:p-10 p-6 bg-transparent text-start transition-all border border-gray-200 dark:border-neutral-700 w-full max-w-md mx-auto flex flex-col gap-4" method="POST" action="?/resetPassword"><h1 class="mb-4" data-svelte-h="svelte-16062ge">New password</h1> <input type="password" placeholder="New password" name="password" id="password"${add_attribute("value", form?.formData?.username || "", 0)} class="mb-4"> ${form?.success || form?.error || data?.error ? `${validate_component(Alert, "Alert").$$render(
    $$result,
    {
      type: form.success ? "success" : "error",
      message: form.success ? 'Your password has successfully been changed. you can now <a class="link" href="/auth">log-in</a> into your account.' : form?.message ?? data.message
    },
    {},
    {}
  )}` : ``} <button class="button-primary" type="submit" ${form?.error || data?.error || form?.success ? "disabled" : ""}>${``}
            Change password</button></form></div>`;
});
export {
  Page as default
};
