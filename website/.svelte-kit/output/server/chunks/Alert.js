import { c as create_ssr_component, h as compute_rest_props, i as spread, j as escape_attribute_value, k as escape_object, v as validate_component, e as escape } from "./ssr.js";
import { twMerge } from "tailwind-merge";
import { I as Icon } from "./Icon.js";
const svgClasses = "flex-shrink-0 inline w-4 h-4 mr-3";
const Alert = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["type", "display", "message"]);
  let { type = "error" } = $$props;
  let { display = true } = $$props;
  let { message = "An error has occurred." } = $$props;
  const props = $$restProps;
  const baseClasses = {
    "error": "flex items-center p-4 text-sm border rounded-lg text-red-800 border-red-800 bg-red-100 dark:bg-red-600 dark:text-neutral-100",
    "success": "flex items-center p-4 text-sm border rounded-lg text-green-800 border-green-800 bg-green-100 dark:bg-green-600 dark:text-neutral-100",
    "info": "flex items-center p-4 text-sm border rounded-lg text-blue-800 border-blue-800 bg-blue-100 dark:bg-blue-600 dark:text-neutral-100"
  };
  const alertClasses = twMerge(baseClasses[type], props.class);
  delete props.class;
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.display === void 0 && $$bindings.display && display !== void 0)
    $$bindings.display(display);
  if ($$props.message === void 0 && $$bindings.message && message !== void 0)
    $$bindings.message(message);
  return `${display ? `<div${spread(
    [
      {
        class: escape_attribute_value(alertClasses)
      },
      { role: "alert" },
      escape_object(props)
    ],
    {}
  )}>${type === "error" ? `${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      icon: "heroicons:exclamation-circle-solid",
      class: svgClasses
    },
    {},
    {}
  )}` : `${type === "success" ? `${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      icon: "heroicons:check-circle-solid",
      class: svgClasses
    },
    {},
    {}
  )}` : `${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      icon: "heroicons:information-circle-solid",
      class: svgClasses
    },
    {},
    {}
  )}`}`} ${escape(message)}</div>` : ``}`;
});
export {
  Alert as A
};
