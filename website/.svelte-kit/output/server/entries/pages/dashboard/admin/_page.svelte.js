import { c as create_ssr_component, h as compute_rest_props, i as spread, j as escape_attribute_value, k as escape_object, e as escape, b as add_attribute, v as validate_component, f as each } from "../../../../chunks/ssr.js";
import "../../../../chunks/stores2.js";
import { M as Modal } from "../../../../chunks/Modal.js";
import { C as Card } from "../../../../chunks/Card.js";
import { T as TextInput } from "../../../../chunks/TextInput.js";
import { twMerge } from "tailwind-merge";
import { I as Icon } from "../../../../chunks/Icon.js";
const baseClasses = "border text-sm rounded-lg block w-full p-2.5 bg-neutral-100 dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 placeholder-neutral-400 dark:text-white focus:ring-primary-500 focus:border-primary-500 focus:outline-none outline-none transition-all caret-primary-600 focus:ring-offset-white dark:focus:ring-offset-neutral-900 focus:ring-offset-2 focus:ring-2 appearance-none peer";
const Select = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  const props = $$restProps;
  const selectClasses = twMerge(baseClasses, props.class);
  delete props.class;
  return `<label${spread([{ for: escape_attribute_value(props.name) }, escape_object(props)], {})}>${props.label ? `${escape(props.label)}` : ``} <div class="relative"><select${add_attribute("name", props.name, 0)}${add_attribute("class", selectClasses, 0)}>${slots.default ? slots.default({}) : ``}</select> ${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      icon: "heroicons:chevron-down-solid",
      class: "w-4 h-4 absolute top-1/2 right-2 -translate-y-1/2 transition-all peer-focus:rotate-180 pointer-events-none"
    },
    {},
    {}
  )}</div></label>`;
});
const Tooltip = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["text", "position"]);
  let { text } = $$props;
  let { position = "top" } = $$props;
  const props = $$restProps;
  const tooltipClasses = twMerge(props.classes, `tooltip tooltip-${position}`);
  delete props.classes;
  delete props.text;
  delete props.position;
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  if ($$props.position === void 0 && $$bindings.position && position !== void 0)
    $$bindings.position(position);
  return `<div${spread(
    [
      escape_object(props),
      {
        class: escape_attribute_value(tooltipClasses)
      },
      {
        "data-tooltip": escape_attribute_value(text)
      }
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let { user, users, ratesUpdatedAt } = data;
  let noUsersToDisplay = 12;
  let usersArray = users.slice(0, noUsersToDisplay);
  let deleteAccountModal = false;
  let searchQuery;
  let searchQueryPremium;
  let credentials = [
    {
      username: "send.email.pcc@gmail.com",
      password: "k4eyLujoow3RKVoZVz8vD0OcUrcvbECbdGL5XkAi",
      type: "Google",
      showPassword: false
    },
    {
      username: "pandabuycurrencyconverter@gmail.com",
      password: "k4eyLujoow3RKVoZVz8vD0OcUrcvbECbdGL5XkAm",
      type: "Google",
      showPassword: false
    }
  ];
  function search() {
    if (!searchQuery)
      searchQuery = "";
    if (!searchQueryPremium)
      searchQueryPremium = "*";
    const tolerance = 2;
    const searchWords = searchQuery.toLowerCase().split(" ");
    usersArray = users.filter((u) => searchQueryPremium == "*" ? true : searchQueryPremium == u.isPremium.toString()).filter((u) => {
      const userWords = `${u.username} ${u.email}`.toLowerCase().split(" ");
      for (let i = 0; i < searchWords.length; i++) {
        const searchWord = searchWords[i];
        let found = false;
        for (let j = 0; j < userWords.length; j++) {
          const userWord = userWords[j];
          if (userWord.includes(searchWord)) {
            found = true;
            break;
          }
          if (searchWord.length - userWord.length <= tolerance) {
            let distance = 0;
            for (let k = 0; k < userWord.length; k++) {
              if (userWord[k] !== searchWord[k]) {
                distance++;
                if (distance > tolerance)
                  break;
              }
            }
            if (distance <= tolerance) {
              found = true;
              break;
            }
          }
        }
        if (!found)
          return false;
      }
      return true;
    });
  }
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      search();
    }
    {
      search();
    }
    $$rendered = `${$$result.head += `<!-- HEAD_svelte-1ex87jb_START -->${$$result.title = `<title>PCC - Admin dashboard</title>`, ""}<script src="https://cdn.jsdelivr.net/npm/apexcharts" data-svelte-h="svelte-avrofd"><\/script><!-- HEAD_svelte-1ex87jb_END -->`, ""} <section class="grow w-full py-8 px-4 lg:py-16 lg:px-6 space-y-6"><div class="grid grid-cols-1 lg:grid-cols-3 md:grid-rows-2 gap-4 max-w-screen-2xl mx-auto">${validate_component(Card, "Card").$$render($$result, { class: "md:row-span-2" }, {}, {
      default: () => {
        return `<h3>Welcome ${escape(user.username)}</h3> <p>Current plan : 
                <span class="font-semibold">${escape(user.isPremium ? "Premium" : "Basic")}</span> ${!user.isPremium ? `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-4 inline-block"><path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"></path></svg> <a href="/payment" class="link w-fit" data-svelte-h="svelte-1dcn0u5">Upgrade</a>` : ``}</p> <div class="grid gap-2 md:gap-4 grid-cols-1 md:grid-cols-2 mt-4"><a href="/dashboard/admin/charts" class="card-button">${validate_component(Icon, "Icon").$$render(
          $$result,
          {
            icon: "heroicons:chart-bar-solid",
            class: "w-6 h-6"
          },
          {},
          {}
        )}
                    Charts</a> <a href="/dashboard/admin/newsletter" class="card-button">${validate_component(Icon, "Icon").$$render(
          $$result,
          {
            icon: "heroicons:envelope-solid",
            class: "w-6 h-6"
          },
          {},
          {}
        )}
                    Newsletter</a> <a href="/dashboard/settings" class="card-button">${validate_component(Icon, "Icon").$$render(
          $$result,
          {
            icon: "heroicons:cog-6-tooth-solid",
            class: "w-6 h-6"
          },
          {},
          {}
        )}
                    Settings</a> <a href="/log-out" class="card-button">${validate_component(Icon, "Icon").$$render($$result, { icon: "carbon:logout", class: "w-6 h-6" }, {}, {})}
                    Log-out</a></div>`;
      }
    })} ${validate_component(Card, "Card").$$render($$result, {}, {}, {
      default: () => {
        return `<h3 data-svelte-h="svelte-1uyn3fb">Rates</h3> <p>Last updated ${escape(new Date(ratesUpdatedAt).toLocaleString("fr-FR"))}</p> <button class="button-primary mt-auto" ${""}>${`Update rates`}</button>`;
      }
    })} ${validate_component(Card, "Card").$$render($$result, { class: "md:col-span-2" }, {}, {
      default: () => {
        return `<h3 data-svelte-h="svelte-7uf1tp">Accounts infos</h3> ${each(credentials, (credential) => {
          return `<div class="flex flex-col md:flex-row justify-between items-center gap-4 w-full"><span class="text-center">${escape(credential.type)} : ${escape(credential.username)}</span> <button class="no-scale text-center">${escape(credential.showPassword ? credential.password : "******************")}</button> </div>`;
        })} <h3 class="mt-4" data-svelte-h="svelte-14wpjy8">Tools</h3> <div class="flex flex-row gap-4 flex-wrap">${validate_component(Tooltip, "Tooltip").$$render(
          $$result,
          {
            text: "Log-in with send.email.pcc@gmail.com google account"
          },
          {},
          {
            default: () => {
              return `<a href="https://app.brevo.com/" target="_blank" class="link" data-svelte-h="svelte-1v4l9sc">SMTP</a>`;
            }
          }
        )} ${validate_component(Tooltip, "Tooltip").$$render(
          $$result,
          {
            text: "Log-in with pandabuycurrencyconverter@gmail.com google account"
          },
          {},
          {
            default: () => {
              return `<a href="https://my.stripo.email/account/templates/1068358" target="_blank" class="link" data-svelte-h="svelte-k25gtu">E-mail templates</a>`;
            }
          }
        )} <a href="https://vercel.com/angus-paillaugue/pcc" target="_blank" class="link" data-svelte-h="svelte-13sbe4m">Vercel</a> ${validate_component(Tooltip, "Tooltip").$$render(
          $$result,
          {
            text: "Log-in with pandabuycurrencyconverter@gmail.com google account"
          },
          {},
          {
            default: () => {
              return `<a href="https://cloud.mongodb.com/v2/65663cc0b387d24672b14a2e#/clusters" target="_blank" class="link" data-svelte-h="svelte-1hvcfsq">MongoDB</a>`;
            }
          }
        )} <a href="https://dash.cloudflare.com/92f5796f7fdf0c37529d5c39b8670c8f/paillaugue.fr" target="_blank" class="link" data-svelte-h="svelte-1s851hd">Cloudflare</a> <a href="https://analytics.google.com/analytics/web/?authuser=0#/p414534698/reports/intelligenthome" target="_blank" class="link" data-svelte-h="svelte-17rbsua">Analytics</a> ${validate_component(Tooltip, "Tooltip").$$render(
          $$result,
          {
            text: "Log-in with send.email.pcc@gmail.com google account"
          },
          {},
          {
            default: () => {
              return `<a href="https://mail.google.com/mail/u/4/#inbox" target="_blank" class="link" data-svelte-h="svelte-tfbnez">Mail box</a>`;
            }
          }
        )}</div>`;
      }
    })}</div> <div class="max-w-screen-2xl mx-auto flex flex-col gap-2 h-fit p-4 rounded-lg border border-neutral-200 dark:border-neutral-700"><h3>Users (${escape(usersArray.length)})</h3> <h6 data-svelte-h="svelte-3xjmc4">Search :</h6> <div class="flex flex-col sm:flex-row gap-4 mt-1 w-full">${validate_component(TextInput, "TextInput").$$render(
      $$result,
      {
        type: "text",
        autocomplete: "off",
        name: "search",
        placeholder: "Search users by usernames or emails",
        class: "w-full",
        value: searchQuery
      },
      {
        value: ($$value) => {
          searchQuery = $$value;
          $$settled = false;
        }
      },
      {}
    )} ${validate_component(Select, "Select").$$render(
      $$result,
      { value: searchQueryPremium },
      {
        value: ($$value) => {
          searchQueryPremium = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `<option value="*" data-svelte-h="svelte-9rq0dv">Premium : *</option> <option value="true" data-svelte-h="svelte-f4fxkt">Premium : true</option> <option value="false" data-svelte-h="svelte-1gt3hol">Premium : false</option>`;
        }
      }
    )}</div> ${usersArray.length > 0 ? `<div class="grid mt-2 gap-4" style="grid-template-rows: min-content; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));">${each(usersArray.slice(0, noUsersToDisplay), (u) => {
      return `<div class="p-2 shadow-sm dark:shadow-none dark:border dark:border-neutral-700 rounded-lg flex flex-col gap-4"${add_attribute("data-user-id", u.id, 0)}>${validate_component(TextInput, "TextInput").$$render(
        $$result,
        {
          type: "text",
          autocomplete: "off",
          label: "Username :",
          placeholder: "Username",
          name: "username",
          value: u.username
        },
        {},
        {}
      )} ${validate_component(TextInput, "TextInput").$$render(
        $$result,
        {
          type: "email",
          autocomplete: "off",
          label: "E-mail :",
          placeholder: "E-mail",
          name: "email",
          value: u.username
        },
        {},
        {}
      )} ${validate_component(Select, "Select").$$render(
        $$result,
        {
          label: "Premium :",
          name: "isPremium",
          class: "w-full"
        },
        {},
        {
          default: () => {
            return `<option value="true" ${!u.isPremium ? "selected" : ""}>Yes</option> <option value="false" ${u.isPremium ? "selected" : ""}>No</option> `;
          }
        }
      )} ${validate_component(Select, "Select").$$render(
        $$result,
        {
          label: "Admin :",
          name: "isAdmin",
          class: "w-full"
        },
        {},
        {
          default: () => {
            return `<option value="true" ${u.isAdmin ? "selected" : ""}>Yes</option> <option value="false" ${!u.isAdmin ? "selected" : ""}>No</option> `;
          }
        }
      )} <p class="text-sm">Joined on : ${escape(new Date(u.joined).toLocaleString("fr-FR"))}</p> <button class="button-red button-small" data-svelte-h="svelte-1wm0gt9">Delete account</button> <button class="button-primary button-small">${`Save`}</button> </div>`;
    })}</div> ${noUsersToDisplay < usersArray.length ? `<button class="button-secondary mx-auto w-fit hover:gap-4 button-small" data-svelte-h="svelte-au5o6m">Load more
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path></svg></button>` : ``}` : `<h4 class="mt-2" data-svelte-h="svelte-5hhct2">No users found</h4>`}</div></section> ${validate_component(Modal, "Modal").$$render(
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
          return `<button class="button-red" data-svelte-h="svelte-epy9ji">No, cancel</button> <button class="button-primary" data-svelte-h="svelte-14ride6">Yes, delete</button> `;
        },
        body: () => {
          return `<p slot="body">Are you sure you want to delete ${escape("")}&#39;s account ?</p>`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
