import { c as create_ssr_component, e as escape, b as add_attribute, v as validate_component } from "../../../chunks/ssr.js";
import { T as TextInput } from "../../../chunks/TextInput.js";
import { A as Alert } from "../../../chunks/Alert.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { form } = $$props;
  let sectionsList = [];
  let tabIndex = 0;
  let navLinkUnderline;
  function setActiveTab() {
    for (let i = 0; i < sectionsList.length; i++) {
      if (i === tabIndex) {
        let activeButton = document.querySelector("[data-section*='" + sectionsList[i].id + "']");
        navLinkUnderline.style.left = activeButton.offsetLeft + "px";
        navLinkUnderline.style.width = activeButton.clientWidth + "px";
      }
    }
  }
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  {
    setActiveTab();
  }
  return `${$$result.head += `<!-- HEAD_svelte-33pjru_START -->${$$result.title = `<title>PCC - Log-in</title>`, ""}<!-- HEAD_svelte-33pjru_END -->`, ""} <section class="justify-between w-full grid grid-cols-1 gap-6 lg:grid-cols-2 grow items-center"><img src="pandabuyLogo.webp" alt="" class="lg:max-h-96 max-h-64 mx-auto rounded-md"> <div class="w-full max-lg:flex max-lg:items-center max-lg:flex-col p-2"><h1 class="mt-16 mb-10" data-svelte-h="svelte-2cvsqe">Join today.</h1> <div class="w-full max-w-md"><div class="w-full font-medium text-center flex flex-row justify-between relative mb-2"><button class="${"inline-flex items-center justify-center p-4 border-b-2 group w-full transition-all no-scale " + escape(
    "rounded-t-lg text-primary-500 dark:text-primary-700",
    true
  )}" data-section="Log-in">Log-in</button> <button class="${"inline-flex items-center justify-center p-4 border-b-2 group w-full transition-all no-scale " + escape(
    "rounded-t-lg hover:border-neutral-700 text-text-main border-neutral-200 dark:text-neutral-200 dark:hover:border-neutral-600 dark:border-neutral-900",
    true
  )}" data-section="Sign-in">Sign-in</button> <span class="h-1 transition-all bottom-0 bg-primary-600 dark:bg-primary-700 absolute ease-in-out duration-300"${add_attribute("this", navLinkUnderline, 0)}></span></div> <div class="relative overflow-hidden grid grid-cols-2 w-full"><form class="${"w-[200%] transition-all ease-in-out duration-300 p-3 pb-5 " + escape("translate-x-0", true)}" method="POST" action="?/login" id="Log-in">${validate_component(TextInput, "TextInput").$$render(
    $$result,
    {
      label: "Username",
      name: "username",
      placeholder: "Username",
      value: form?.logIn?.formData?.username ?? "",
      class: "mb-4",
      maxlength: "15"
    },
    {},
    {}
  )} ${validate_component(TextInput, "TextInput").$$render(
    $$result,
    {
      label: "Password",
      name: "password",
      placeholder: "Password",
      value: form?.logIn?.formData?.password ?? "",
      class: "mb-4",
      type: "password"
    },
    {},
    {}
  )} ${validate_component(Alert, "Alert").$$render(
    $$result,
    {
      display: form?.logIn?.success ?? false,
      type: "error",
      class: "mb-4",
      message: form?.logIn?.message
    },
    {},
    {}
  )} <button class="button-primary group w-full mb-2" ${""}>${`Log-in
                            <svg class="relative w-6 h-6 transition-all group-hover:translate-x-[4px]" viewBox="0 0 16 16" fill="none"><path fill="currentColor" d="M7.28033 3.21967C6.98744 2.92678 6.51256 2.92678 6.21967 3.21967C5.92678 3.51256 5.92678 3.98744 6.21967 4.28033L7.28033 3.21967ZM11 8L11.5303 8.53033C11.8232 8.23744 11.8232 7.76256 11.5303 7.46967L11 8ZM6.21967 11.7197C5.92678 12.0126 5.92678 12.4874 6.21967 12.7803C6.51256 13.0732 6.98744 13.0732 7.28033 12.7803L6.21967 11.7197ZM6.21967 4.28033L10.4697 8.53033L11.5303 7.46967L7.28033 3.21967L6.21967 4.28033ZM10.4697 7.46967L6.21967 11.7197L7.28033 12.7803L11.5303 8.53033L10.4697 7.46967Z"></path><path class="transition-all group-hover:[stroke-dashoffset:20] [stroke-dasharray:10] [stroke-dashoffset:10]" stroke="currentColor" d="M1.75 8H11" stroke-width="1.5" stroke-linecap="round"></path></svg>`}</button> <a href="/forgot-password" class="link" data-svelte-h="svelte-1319vkd">Forgot your password ?</a></form> <form class="${"w-[200%] transition-all ease-in-out duration-300 p-3 pb-5 " + escape(
    "-translate-x-[150%]",
    true
  )}" method="POST" action="?/signin" id="Sign-in">${validate_component(TextInput, "TextInput").$$render(
    $$result,
    {
      label: "E-mail",
      name: "email",
      placeholder: "E-mail",
      value: form?.signIn?.formData?.email ?? "",
      class: "mb-4"
    },
    {},
    {}
  )} ${validate_component(TextInput, "TextInput").$$render(
    $$result,
    {
      label: "Username",
      name: "username",
      placeholder: "Username",
      value: form?.signIn?.formData?.username ?? "",
      class: "mb-4",
      maxlength: "15"
    },
    {},
    {}
  )} ${validate_component(TextInput, "TextInput").$$render(
    $$result,
    {
      label: "Password",
      name: "password",
      placeholder: "Password",
      value: form?.signIn?.formData?.password ?? "",
      class: "mb-4",
      maxlength: "15",
      type: "password"
    },
    {},
    {}
  )} ${form?.signIn?.success ? `${validate_component(Alert, "Alert").$$render(
    $$result,
    {
      type: "error",
      class: "mb-4",
      message: form?.signIn?.message
    },
    {},
    {}
  )}` : ``} <button class="button-primary group w-full" ${""}>${`Sign-in
                            <svg class="relative w-6 h-6 transition-all group-hover:translate-x-[4px]" viewBox="0 0 16 16" fill="none"><path fill="currentColor" d="M7.28033 3.21967C6.98744 2.92678 6.51256 2.92678 6.21967 3.21967C5.92678 3.51256 5.92678 3.98744 6.21967 4.28033L7.28033 3.21967ZM11 8L11.5303 8.53033C11.8232 8.23744 11.8232 7.76256 11.5303 7.46967L11 8ZM6.21967 11.7197C5.92678 12.0126 5.92678 12.4874 6.21967 12.7803C6.51256 13.0732 6.98744 13.0732 7.28033 12.7803L6.21967 11.7197ZM6.21967 4.28033L10.4697 8.53033L11.5303 7.46967L7.28033 3.21967L6.21967 4.28033ZM10.4697 7.46967L6.21967 11.7197L7.28033 12.7803L11.5303 8.53033L10.4697 7.46967Z"></path><path class="transition-all group-hover:[stroke-dashoffset:20] [stroke-dasharray:10] [stroke-dashoffset:10]" stroke="currentColor" d="M1.75 8H11" stroke-width="1.5" stroke-linecap="round"></path></svg>`}</button></form></div></div></div></section>`;
});
export {
  Page as default
};
