import { c as create_ssr_component, b as add_attribute, e as escape, v as validate_component } from "../../../../chunks/ssr.js";
import { n as newToast } from "../../../../chunks/stores2.js";
import { M as Modal } from "../../../../chunks/Modal.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let { form } = $$props;
  let { user } = data;
  let deleteAccountModal = false;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      if (form) {
        console.log(Object.keys(form), Object.keys(form).includes("account"));
        if (Object.keys(form).includes("account")) {
          user.username = form.formData.username;
          user.email = form.formData.email;
          if (form.account.success === true) {
            newToast("success", "Settings saved successfully!");
          }
        } else if (Object.keys(form).includes("password")) {
          if (form.password.success === true) {
            newToast("success", "Password changed successfully!");
          }
        }
      }
    }
    $$rendered = `${$$result.head += `<!-- HEAD_svelte-1nqepv7_START -->${$$result.title = `<title>PCC - Settings</title>`, ""}<!-- HEAD_svelte-1nqepv7_END -->`, ""} <section class="grow w-full py-8 px-4 lg:py-16 lg:px-6 max-w-screen-lg mx-auto"><a href="/dashboard" class="button-secondary button-small group w-fit mb-6" data-svelte-h="svelte-12wbnyl"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 transition-all group-hover:rotate-[360deg] duration-300"><path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"></path></svg>
        Go back</a> <form action="?/save" method="POST" class="rounded-lg border-neutral-200 dark:border-neutral-700 border flex flex-col gap-4 md:p-10 p-6 h-fit w-full"><h3 data-svelte-h="svelte-zi5xq3">Account</h3> <div class="flex flex-col gap-1"><p data-svelte-h="svelte-tu5pi4">Username</p> <input type="text" name="username" readonly="true" id="username"${add_attribute("value", user.username, 0)}></div> <div class="flex flex-col gap-1"><p data-svelte-h="svelte-1ic7i8b">E-mail</p> <input type="text" name="email" id="email"${add_attribute("value", user.email, 0)}></div> ${form?.account?.success === false ? `<div class="flex items-center p-4 text-sm border rounded-lg text-red-800 border-red-800 bg-red-100 dark:bg-red-600 dark:text-neutral-100 mb-4" role="alert"><svg class="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20"><path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"></path></svg> ${escape(form?.account?.message)}</div>` : ``} <button class="button-primary w-full">${`Save`}</button></form> <hr> <form action="?/password" method="POST" class="rounded-lg border-neutral-200 dark:border-neutral-700 border flex flex-col gap-4 md:p-10 p-6 h-fit w-full"><h3 data-svelte-h="svelte-n4071">Password</h3> <div class="flex flex-col gap-1" data-svelte-h="svelte-csppcx"><p>Current password</p> <input type="password" name="currentPassword" id="currentPassword" placeholder="Current password"></div> <div class="flex flex-col gap-1" data-svelte-h="svelte-167s7j9"><p>New password</p> <input type="password" name="newPassword" id="newPassword" placeholder="New password"></div> ${form?.password?.success === false ? `<div class="flex items-center p-4 text-sm border rounded-lg text-red-800 border-red-800 bg-red-100 dark:bg-red-600 dark:text-neutral-100 mb-4" role="alert"><svg class="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20"><path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"></path></svg> ${escape(form?.password?.message)}</div>` : ``} <button class="button-primary">${`Change password`}</button></form> <hr> <div class="rounded-lg border-neutral-200 dark:border-neutral-700 border flex flex-col gap-4 md:p-10 p-6 h-fit w-full"><h3 data-svelte-h="svelte-nccdmv">Danger zone</h3> <button class="button-red" data-svelte-h="svelte-1pp1igq">Delete account</button></div></section> ${validate_component(Modal, "Modal").$$render(
      $$result,
      {
        title: "Delete account",
        status: deleteAccountModal
      },
      {
        status: ($$value) => {
          deleteAccountModal = $$value;
          $$settled = false;
        }
      },
      {
        footer: () => {
          return `<button class="button-secondary" data-svelte-h="svelte-1qe45nh">No, cancel</button> <form action="?/deleteAccount" method="POST" data-svelte-h="svelte-cghggx"><button class="button-red w-full" type="submit">Yes, delete</button></form> `;
        },
        body: () => {
          return `<p slot="body" data-svelte-h="svelte-vrr03">Are you sure you want to delete your account?</p>`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
