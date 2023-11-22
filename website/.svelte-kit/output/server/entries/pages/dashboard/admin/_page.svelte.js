import { c as create_ssr_component, e as escape, b as add_attribute, f as each } from "../../../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let { user, users } = data;
  let noUsersToDisplay = 9;
  let usersArray = users.slice(0, noUsersToDisplay);
  let searchQuery;
  let searchQueryPremium;
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
    noUsersToDisplay = 9;
  }
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  {
    search();
  }
  {
    search();
  }
  return `${$$result.head += `<!-- HEAD_svelte-1ex87jb_START -->${$$result.title = `<title>PCC - Admin dashboard</title>`, ""}<script src="https://cdn.jsdelivr.net/npm/apexcharts" data-svelte-h="svelte-avrofd"><\/script><!-- HEAD_svelte-1ex87jb_END -->`, ""} <section class="grow w-full py-8 px-4 lg:py-16 lg:px-6 space-y-6"><div class="rounded-lg max-w-lg mx-auto border-neutral-200 border flex flex-col gap-2 md:p-10 p-6 h-fit"><h3>Welcome ${escape(user.username)}</h3> <p>Current plan : 
            <span class="font-semibold">${escape(user.isPremium ? "Premium" : "Basic")}</span> ${!user.isPremium ? `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-4 inline-block"><path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"></path></svg> <a href="/payment" class="link w-fit" data-svelte-h="svelte-1dcn0u5">Upgrade</a>` : ``}</p> <a href="/dashboard/admin/charts" class="link w-fit" data-svelte-h="svelte-1o9o7s8">Charts</a> <button class="button-primary" data-svelte-h="svelte-oqh2be">Update rates</button> <a href="/log-out" class="button-red" data-svelte-h="svelte-1l9icdm">Log-out</a></div> <div class="max-w-screen-lg mx-auto flex flex-col gap-2 h-fit p-4 rounded-lg border border-nautral-200"><h3>Users (${escape(usersArray.length)})</h3> <label for="search">Search :
            <div class="flex flex-col sm:flex-row gap-4 mt-1"><input type="text" autocomplete="off" name="search" placeholder="Search users by usernames or emails"${add_attribute("value", searchQuery, 0)}> <div class="relative"><select class="appearance-none peer w-full sm:w-fit pr-6"><option value="*" data-svelte-h="svelte-9rq0dv">Premium : *</option><option value="true" data-svelte-h="svelte-f4fxkt">Premium : true</option><option value="false" data-svelte-h="svelte-1gt3hol">Premium : false</option></select> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 absolute top-1/2 right-2 -translate-y-1/2 transition-all peer-focus:rotate-180 pointer-events-none"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path></svg></div></div></label> ${usersArray.length > 0 ? `<div class="grid mt-2 gap-4" style="grid-template-rows: min-content; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));">${each(usersArray.slice(0, noUsersToDisplay), (u) => {
    return `<div class="p-2 shadow-sm rounded-lg flex flex-col gap-4"${add_attribute("data-user-id", u.id, 0)}><label for="username">Username :
                            <input type="text" autocomplete="off" name="username"${add_attribute("value", u.username, 0)}></label> <label for="email">E-mail :
                            <input type="text" autocomplete="off" name="email"${add_attribute("value", u.email, 0)}></label> <label for="isPremium">Premium :
                            <div class="relative"><select name="isPremium" class="appearance-none peer"><option value="true" ${u.isPremium ? "selected" : ""}>Yes</option><option value="false" ${!u.isPremium ? "selected" : ""}>No</option></select> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 absolute top-1/2 right-2 -translate-y-1/2 transition-all peer-focus:rotate-180 pointer-events-none"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path></svg> </div></label> <label for="isAdmin">Admin :
                            <div class="relative"><select name="isAdmin" class="appearance-none peer"><option value="true" ${u.isAdmin ? "selected" : ""}>Yes</option><option value="false" ${!u.isAdmin ? "selected" : ""}>No</option></select> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 absolute top-1/2 right-2 -translate-y-1/2 transition-all peer-focus:rotate-180 pointer-events-none"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path></svg> </div></label> <p class="text-sm">Joined on : ${escape(new Date(u.joined).toLocaleString())}</p> <button class="button-red button-small" data-svelte-h="svelte-1wm0gt9">Delete account</button> <button class="button-primary button-small">${`Save`}</button> </div>`;
  })}</div> ${noUsersToDisplay < usersArray.length ? `<button class="button-secondary mx-auto w-fit hover:gap-4 button-small" data-svelte-h="svelte-js37qg">Load more
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path></svg></button>` : ``}` : `<h4 class="mt-2" data-svelte-h="svelte-5hhct2">No users found</h4>`}</div></section> <div class="${"fixed inset-0 bg-neutral-600/50 flex justify-center items-center tranition-all " + escape(
    "-z-10 opacity-0",
    true
  )}"><div class="bg-white rounded-lg p-4 flex flex-col gap-4"><h3 data-svelte-h="svelte-1ji7sew">Delete account</h3> <p>Are you sure you want to delete ${escape("")}&#39;s account ?</p> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"><button class="button-red" data-svelte-h="svelte-epy9ji">No, cancel</button> <button class="button-primary" data-svelte-h="svelte-14ride6">Yes, delete</button></div></div></div>`;
});
export {
  Page as default
};
