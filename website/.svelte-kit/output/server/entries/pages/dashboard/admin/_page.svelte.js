import { c as create_ssr_component, e as escape, f as each, b as add_attribute, v as validate_component } from "../../../../chunks/ssr.js";
import "../../../../chunks/stores2.js";
import { M as Modal } from "../../../../chunks/Modal.js";
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
    $$rendered = `${$$result.head += `<!-- HEAD_svelte-1ex87jb_START -->${$$result.title = `<title>PCC - Admin dashboard</title>`, ""}<script src="https://cdn.jsdelivr.net/npm/apexcharts" data-svelte-h="svelte-avrofd"><\/script><!-- HEAD_svelte-1ex87jb_END -->`, ""} <section class="grow w-full py-8 px-4 lg:py-16 lg:px-6 space-y-6"><div class="grid grid-cols-1 lg:grid-cols-3 md:grid-rows-2 gap-4 max-w-screen-2xl mx-auto"><div class="rounded-lg w-full border-neutral-200 dark:border-neutral-700 border md:p-10 p-6 h-full row-span-2"><h3>Welcome ${escape(user.username)}</h3> <p>Current plan : 
                <span class="font-semibold">${escape(user.isPremium ? "Premium" : "Basic")}</span> ${!user.isPremium ? `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-4 inline-block"><path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"></path></svg> <a href="/payment" class="link w-fit" data-svelte-h="svelte-1dcn0u5">Upgrade</a>` : ``}</p> <div class="grid gap-2 md:gap-4 grid-cols-1 md:grid-cols-2 mt-4" data-svelte-h="svelte-1xfd8d0"><a href="/dashboard/admin/charts" class="card-button"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"></path></svg>
                    Charts</a> <a href="/dashboard/admin/newsletter" class="card-button"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"></path></svg>
                    Newsletter</a> <a href="/dashboard/settings" class="card-button"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    Settings</a> <a href="/log-out" class="card-button"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"></path></svg>
                    Log-out</a></div></div> <div class="rounded-lg w-full border-neutral-200 dark:border-neutral-700 border flex flex-col gap-2 md:p-10 p-6 h-full"><h3 data-svelte-h="svelte-1uyn3fb">Rates</h3> <p>Last updated ${escape(new Date(ratesUpdatedAt).toLocaleString("fr-FR"))}</p> <button class="button-primary mt-auto" ${""}>${`Update rates`}</button></div> <div class="rounded-lg w-full border-neutral-200 dark:border-neutral-700 border flex flex-col gap-2 md:p-10 p-6 h-full md:col-span-2"><h3 data-svelte-h="svelte-7uf1tp">Accounts infos</h3> ${each(credentials, (credential) => {
      return `<div class="flex flex-col md:flex-row justify-between items-center gap-4 w-full"><span class="text-center">${escape(credential.type)} : ${escape(credential.username)}</span> <button class="no-scale text-center">${escape(credential.showPassword ? credential.password : "******************")}</button> </div>`;
    })} <h3 class="mt-4" data-svelte-h="svelte-14wpjy8">Tools</h3> <div class="flex flex-row gap-4 flex-wrap" data-svelte-h="svelte-k5i6wc"><a href="https://app.brevo.com/" target="_blank" class="link tooltip-top" data-tooltip="Log-in with send.email.pcc@gmail.com google account">SMTP</a> <a href="https://my.stripo.email/account/templates/1068358" target="_blank" class="link tooltip-top" data-tooltip="Log-in with pandabuycurrencyconverter@gmail.com google account">E-mail templates</a> <a href="https://vercel.com/angus-paillaugue/pcc" target="_blank" class="link">Vercel</a> <a href="https://cloud.mongodb.com/v2/65663cc0b387d24672b14a2e#/clusters" target="_blank" class="link tooltip-top" data-tooltip="Log-in with pandabuycurrencyconverter@gmail.com google account">MongoDB</a> <a href="https://dash.cloudflare.com/92f5796f7fdf0c37529d5c39b8670c8f/paillaugue.fr" target="_blank" class="link">Cloudflare</a> <a href="https://analytics.google.com/analytics/web/?authuser=0#/p414534698/reports/intelligenthome" target="_blank" class="link">Analytics</a> <a href="https://mail.google.com/mail/u/4/#inbox" target="_blank" class="link tooltip-top" data-tooltip="Log-in with send.email.pcc@gmail.com google account">Mail box</a></div></div></div> <div class="max-w-screen-2xl mx-auto flex flex-col gap-2 h-fit p-4 rounded-lg border border-neutral-200 dark:border-neutral-700"><h3>Users (${escape(usersArray.length)})</h3> <label for="search">Search :
            <div class="flex flex-col sm:flex-row gap-4 mt-1"><input type="text" autocomplete="off" name="search" placeholder="Search users by usernames or emails"${add_attribute("value", searchQuery, 0)}> <div class="relative"><select class="appearance-none peer w-full sm:w-fit pr-6"><option value="*" data-svelte-h="svelte-9rq0dv">Premium : *</option><option value="true" data-svelte-h="svelte-f4fxkt">Premium : true</option><option value="false" data-svelte-h="svelte-1gt3hol">Premium : false</option></select> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 absolute top-1/2 right-2 -translate-y-1/2 transition-all peer-focus:rotate-180 pointer-events-none"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path></svg></div></div></label> ${usersArray.length > 0 ? `<div class="grid mt-2 gap-4" style="grid-template-rows: min-content; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));">${each(usersArray.slice(0, noUsersToDisplay), (u) => {
      return `<div class="p-2 shadow-sm dark:shadow-none dark:border dark:border-neutral-700 rounded-lg flex flex-col gap-4"${add_attribute("data-user-id", u.id, 0)}><label for="username">Username :
                            <input type="text" autocomplete="off" name="username"${add_attribute("value", u.username, 0)}></label> <label for="email">E-mail :
                            <input type="text" autocomplete="off" name="email"${add_attribute("value", u.email, 0)}></label> <label for="isPremium">Premium :
                            <div class="relative"><select name="isPremium" class="appearance-none peer"><option value="true" ${u.isPremium ? "selected" : ""}>Yes</option><option value="false" ${!u.isPremium ? "selected" : ""}>No</option></select> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 absolute top-1/2 right-2 -translate-y-1/2 transition-all peer-focus:rotate-180 pointer-events-none"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path></svg> </div></label> <label for="isAdmin">Admin :
                            <div class="relative"><select name="isAdmin" class="appearance-none peer"><option value="true" ${u.isAdmin ? "selected" : ""}>Yes</option><option value="false" ${!u.isAdmin ? "selected" : ""}>No</option></select> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 absolute top-1/2 right-2 -translate-y-1/2 transition-all peer-focus:rotate-180 pointer-events-none"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path></svg> </div></label> <p class="text-sm">Joined on : ${escape(new Date(u.joined).toLocaleString("fr-FR"))}</p> <button class="button-red button-small" data-svelte-h="svelte-1wm0gt9">Delete account</button> <button class="button-primary button-small">${`Save`}</button> </div>`;
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
