import { c as create_ssr_component } from "../../chunks/ssr.js";
import "svelte-reveal";
import "../../chunks/functions.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let { form } = $$props;
  const { extensions, getBrowserType, currentNumberOfDownloads } = data;
  extensions[0];
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  return `${$$result.head += `<!-- HEAD_svelte-1k0wfd_START -->${$$result.title = `<title>PCC - The one and only tool for PandaBuy</title>`, ""}<!-- HEAD_svelte-1k0wfd_END -->`, ""} ${``}`;
});
export {
  Page as default
};
