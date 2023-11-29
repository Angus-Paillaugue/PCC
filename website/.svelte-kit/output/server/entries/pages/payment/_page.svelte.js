import { c as create_ssr_component } from "../../../chunks/ssr.js";
import "@stripe/stripe-js";
import "../../../chunks/functions.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${$$result.head += `<!-- HEAD_svelte-14ih5ja_START -->${$$result.title = `<title>PCC - Payment</title>`, ""}<!-- HEAD_svelte-14ih5ja_END -->`, ""} ${``}`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
