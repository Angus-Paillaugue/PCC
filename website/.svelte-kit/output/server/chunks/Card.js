import { c as create_ssr_component, h as compute_rest_props, i as spread, j as escape_attribute_value, k as escape_object } from "./ssr.js";
import { twMerge } from "tailwind-merge";
const baseCardClasses = "rounded-lg w-full border-neutral-200 dark:border-neutral-700 border flex flex-col gap-2 md:p-10 p-6 h-full";
const Card = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  const props = $$restProps;
  const cardClasses = twMerge(baseCardClasses, props.class);
  delete props.class;
  return `<div${spread(
    [
      {
        class: escape_attribute_value(cardClasses)
      },
      escape_object(props)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</div>`;
});
export {
  Card as C
};
