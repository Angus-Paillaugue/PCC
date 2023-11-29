import { c as create_ssr_component, v as validate_component } from "../../../../chunks/ssr.js";
import { n as newToast } from "../../../../chunks/stores2.js";
import { M as Modal } from "../../../../chunks/Modal.js";
import { C as Card } from "../../../../chunks/Card.js";
import { A as Alert } from "../../../../chunks/Alert.js";
import { T as TextInput } from "../../../../chunks/TextInput.js";
import { I as Icon } from "../../../../chunks/Icon.js";
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
    $$rendered = `${$$result.head += `<!-- HEAD_svelte-1nqepv7_START -->${$$result.title = `<title>PCC - Settings</title>`, ""}<!-- HEAD_svelte-1nqepv7_END -->`, ""} <section class="grow w-full py-8 px-4 lg:py-16 lg:px-6 max-w-screen-lg mx-auto"><a href="/dashboard" class="button-secondary button-small group w-fit mb-6">${validate_component(Icon, "Icon").$$render(
      $$result,
      {
        icon: "heroicons:arrow-uturn-left",
        class: "w-6 h-6 transition-all group-hover:rotate-[360deg] duration-300"
      },
      {},
      {}
    )}
        Go back</a> ${validate_component(Card, "Card").$$render($$result, {}, {}, {
      default: () => {
        return `<form action="?/save" method="POST" class="flex flex-col gap-4 h-fit w-full"><h3 data-svelte-h="svelte-zi5xq3">Account</h3> ${validate_component(TextInput, "TextInput").$$render(
          $$result,
          {
            label: "Username",
            name: "email",
            placeholder: "Username",
            value: user.username,
            type: "text"
          },
          {},
          {}
        )} ${validate_component(TextInput, "TextInput").$$render(
          $$result,
          {
            label: "E-mail",
            name: "email",
            placeholder: "E-mail",
            value: user.email,
            type: "email"
          },
          {},
          {}
        )} ${validate_component(Alert, "Alert").$$render(
          $$result,
          {
            display: form?.account?.success ?? false,
            type: "error",
            class: "mb-4",
            message: form?.account?.message
          },
          {},
          {}
        )} <button class="button-primary w-full">${`Save`}</button></form>`;
      }
    })} <hr> ${validate_component(Card, "Card").$$render($$result, {}, {}, {
      default: () => {
        return `<form action="?/password" method="POST" class="flex flex-col gap-4 h-fit w-full"><h3 data-svelte-h="svelte-n4071">Password</h3> ${validate_component(TextInput, "TextInput").$$render(
          $$result,
          {
            label: "Current password",
            name: "email",
            placeholder: "Current password",
            id: "currentPassword",
            type: "password"
          },
          {},
          {}
        )} ${validate_component(TextInput, "TextInput").$$render(
          $$result,
          {
            label: "New password",
            name: "email",
            placeholder: "New password",
            id: "newPassword",
            type: "password"
          },
          {},
          {}
        )} ${validate_component(Alert, "Alert").$$render(
          $$result,
          {
            display: form?.password?.success ?? false,
            type: "error",
            class: "mb-4",
            message: form?.password?.message
          },
          {},
          {}
        )} <button class="button-primary">${`Change password`}</button></form>`;
      }
    })} <hr> ${validate_component(Card, "Card").$$render($$result, {}, {}, {
      default: () => {
        return `<h3 data-svelte-h="svelte-nccdmv">Danger zone</h3> <button class="button-red" data-svelte-h="svelte-1pp1igq">Delete account</button>`;
      }
    })}</section> ${validate_component(Modal, "Modal").$$render(
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
