import { c as create_ssr_component, v as validate_component } from "../../../chunks/ssr.js";
import { C as Card } from "../../../chunks/Card.js";
import { A as Alert } from "../../../chunks/Alert.js";
import { T as TextInput } from "../../../chunks/TextInput.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { form } = $$props;
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  return `${$$result.head += `<!-- HEAD_svelte-1hwla3b_START -->${$$result.title = `<title>PCC - Forgot password</title>`, ""}<!-- HEAD_svelte-1hwla3b_END -->`, ""} <div class="py-8 px-4 lg:py-16 lg:px-6 w-full grow">${validate_component(Card, "Card").$$render($$result, { class: "max-w-md mx-auto" }, {}, {
    default: () => {
      return `<form class="text-start transition-all w-full flex flex-col" method="POST"><h1 class="mb-4" data-svelte-h="svelte-1ms3acx">Forgot password</h1> ${validate_component(TextInput, "TextInput").$$render(
        $$result,
        {
          label: "Username",
          type: "text",
          placeholder: "Username",
          name: "username",
          id: "username",
          value: form?.formData?.username,
          class: "mb-4"
        },
        {},
        {}
      )} ${!!(form?.success || form?.error) ? `${validate_component(Alert, "Alert").$$render(
        $$result,
        {
          type: form?.success ? "success" : "error",
          message: form?.message,
          class: "mb-4"
        },
        {},
        {}
      )}` : ``} <button class="button-primary" type="submit" ${form?.success ? "disabled" : ""}>${``}
                Reset password</button> <p data-svelte-h="svelte-qxfy6n">Remember your password ? <a class="link" href="/auth">Log-in</a></p></form>`;
    }
  })}</div>`;
});
export {
  Page as default
};
