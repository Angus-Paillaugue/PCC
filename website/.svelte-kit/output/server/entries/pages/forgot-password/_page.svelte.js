import { c as create_ssr_component, b as add_attribute, e as escape } from "../../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { form } = $$props;
  let isSending = false;
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  {
    if (form)
      isSending = false;
  }
  return `${$$result.head += `<!-- HEAD_svelte-1hwla3b_START -->${$$result.title = `<title>PCC - Forgot password</title>`, ""}<!-- HEAD_svelte-1hwla3b_END -->`, ""} <div class="py-8 px-4 lg:py-16 lg:px-6 w-full grow"><form class="rounded-lg md:p-10 p-6 bg-transparent text-start transition-all border border-gray-200 dark:border-neutral-700 w-full max-w-md mx-auto flex flex-col" method="POST"><h1 class="mb-4" customsize="text-4xl font-extrabold  md:text-5xl lg:text-6xl" data-svelte-h="svelte-l65vvg">Forgot password</h1> <input type="text" placeholder="Username" name="username" id="username"${add_attribute("value", form?.formData?.username || "", 0)} class="mb-4"> ${form?.error ? `<div class="flex flex-row gap-2 items-center text-red-800 border-red-800 bg-red-100 dark:bg-red-600 dark:text-neutral-100 border rounded-lg mb-4 p-4 w-full"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"></path></svg> ${escape(form.message)}</div>` : `${form?.success ? `<div class="flex flex-row gap-2 items-center text-green-800 border-green-800 bg-green-100 dark:bg-green-600 dark:text-neutral-100 border mb-4 rounded-lg p-4 w-full" data-svelte-h="svelte-e642b7"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"></path></svg>
                    Go check your email to reset your password (the e-mail might take a few seconds to arrive).</div>` : ``}`} <button class="button-primary" type="submit" ${isSending || form?.success ? "disabled" : ""}>${isSending ? `<svg fill="none" class="w-6 h-6 animate-spin" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z" fill="currentColor" fill-rule="evenodd"></path></svg>` : ``}
            Reset password</button> <p data-svelte-h="svelte-qxfy6n">Remember your password ? <a class="link" href="/auth">Log-in</a></p></form></div>`;
});
export {
  Page as default
};
