import { c as create_ssr_component, h as compute_rest_props, i as spread, k as escape_object, b as add_attribute, e as escape, v as validate_component } from "../../../../chunks/ssr.js";
import "../../../../chunks/stores2.js";
const Toggle = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["checked", "id"]);
  let { checked = false } = $$props;
  let { id } = $$props;
  const props = $$restProps;
  delete props.checked;
  if ($$props.checked === void 0 && $$bindings.checked && checked !== void 0)
    $$bindings.checked(checked);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  return `<div${spread([{ class: "switch-wrapper" }, escape_object(props)], {})}><input type="checkbox"${add_attribute("id", id, 0)} class="hidden"${add_attribute("checked", checked, 1)}> <label${add_attribute("for", id, 0)}><span data-svelte-h="svelte-1qeeisj"><em></em></span></label></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  const { settings } = data;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<section class="p-4 md:p-6 lg:p-10 pt-24 flex flex-col items-center gap-10 max-sm:pl-6 max-w-screen-xl w-full mx-auto grow"><div class="border-neutral-200 border dark:border-neutral-700 rounded-lg p-6 flex flex-col gap-4">${settings ? `<h6 class="font-normal">Your e-mail : <b>${escape(settings.email)}</b></h6> <div class="flex flex-row gap-2"><p data-svelte-h="svelte-1y94uex">Receive e-mails :</p> ${validate_component(Toggle, "Toggle").$$render(
      $$result,
      {
        id: "darkMode",
        checked: settings.sendEmails
      },
      {
        checked: ($$value) => {
          settings.sendEmails = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div>` : `<h6 class="font-normal" data-svelte-h="svelte-7i3w6k">You are not subscribed to the newsletter, click <a href="/#newsletter" class="link">here</a> to register.</h6>`}</div></section>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
