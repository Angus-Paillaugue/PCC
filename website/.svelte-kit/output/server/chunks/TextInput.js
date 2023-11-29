import { c as create_ssr_component, h as compute_rest_props, b as add_attribute, e as escape, i as spread, j as escape_attribute_value, k as escape_object } from "./ssr.js";
import { twMerge } from "tailwind-merge";
const baseClasses = "border text-sm rounded-lg block w-full p-2.5 bg-neutral-100 dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 placeholder-neutral-400 dark:text-white focus:ring-primary-500 focus:border-primary-500 focus:outline-none outline-none transition-all caret-primary-600 focus:ring-offset-white dark:focus:ring-offset-neutral-900 focus:ring-offset-2 focus:ring-2";
const TextInput = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["value"]);
  const props = $$restProps;
  let { value = "" } = $$props;
  const inputClasses = twMerge(baseClasses, props.class);
  delete props.class;
  delete props.value;
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  return `<label${add_attribute("for", props.name, 0)} class="flex flex-col gap-1 w-full">${props?.label ? `${escape(props.label)}` : ``} <input${spread(
    [
      {
        class: escape_attribute_value(inputClasses)
      },
      escape_object(props)
    ],
    {}
  )}${add_attribute("value", value, 0)}></label>`;
});
export {
  TextInput as T
};
