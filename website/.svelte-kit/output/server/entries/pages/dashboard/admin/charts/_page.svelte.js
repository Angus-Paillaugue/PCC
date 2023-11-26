import { c as create_ssr_component, b as add_attribute, f as each, e as escape } from "../../../../../chunks/ssr.js";
const noUsersToDisplay = 9;
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let { user, users } = data;
  let usersArray = users.slice(0, noUsersToDisplay);
  let usersChartContainer;
  let premiumChartContainer;
  const userProgressionData = {};
  users.forEach((user2) => {
    const joinDate = user2.joined.toISOString().split("T")[0];
    userProgressionData[joinDate] = (userProgressionData[joinDate] || 0) + 1;
  });
  const joinDates = Object.keys(userProgressionData);
  const earliestDate = Math.min(...joinDates.map((date) => new Date(date)));
  const latestDate = Math.max(...joinDates.map((date) => new Date(date)));
  const allDates = [];
  for (let currentDate = new Date(earliestDate); currentDate <= latestDate; currentDate.setDate(currentDate.getDate() + 1)) {
    const dateString = currentDate.toISOString().split("T")[0];
    allDates.push(dateString);
  }
  const cumulativeData = [];
  let cumulativeCount = 0;
  allDates.forEach((date) => {
    const count = userProgressionData[date] || 0;
    cumulativeCount += count;
    cumulativeData.push({
      x: new Date(date).getDate() + "/" + (new Date(date).getMonth() + 1),
      y: cumulativeCount
    });
  });
  const premiumUsers = users.filter((user2) => user2.isPremium);
  ({
    series: [premiumUsers.length, users.length - premiumUsers.length],
    chart: { width: 380, type: "pie" },
    labels: ["Premium", "Free"]
  });
  function search() {
    {
      usersArray = premiumUsers.slice(0, noUsersToDisplay);
      return;
    }
  }
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  {
    search();
  }
  return `${$$result.head += `<!-- HEAD_svelte-1ex87jb_START -->${$$result.title = `<title>PCC - Admin dashboard</title>`, ""}<script src="https://cdn.jsdelivr.net/npm/apexcharts" data-svelte-h="svelte-avrofd"><\/script><!-- HEAD_svelte-1ex87jb_END -->`, ""} <section class="grow w-full py-8 px-4 lg:py-16 lg:px-6 space-y-6"><div class="max-w-screen-lg mx-auto flex flex-col gap-6"><a href="../" class="button-secondary w-fit button-small group" data-svelte-h="svelte-ptbhqv"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 transition-all group-hover:rotate-[360deg] duration-300"><path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"></path></svg>
            Go back</a> <div class="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-6"><div class="lg:col-span-2 border border-neutral-200 dark:border-neutral-700 rounded-lg"><div class="w-full"${add_attribute("this", usersChartContainer, 0)}></div></div> <div class="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4"><div class=""${add_attribute("this", premiumChartContainer, 0)}></div></div> <div class="h-full flex flex-col gap-2 border border-neutral-200 dark:border-neutral-700 rounded-lg max-h-[450px] p-4 relative"><h5 class="w-full border-b border-neutral-200 dark:border-neutral-700 flex flex-row p-2 items-center justify-between">Premium users
                    <button class="w-fit button-secondary button-small" data-svelte-h="svelte-1y07h73"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path></svg></button></h5> ${``} <div class="flex flex-col gap-0 overflow-y-auto overflow-x-hidden">${each(usersArray, (u) => {
    return `<div class="w-full transition-all text-text-main dark:text-neutral-100 dark:hover:bg-neutral-600 hover:bg-neutral-100 p-2 cursor-pointer rounded-lg hover:px-4 relative group flex flex-row justify-between">${escape(u.username)} <div class="opacity-0 group-hover:opacity-100 transition-all">${escape(u.email)}</div> </div>`;
  })}</div></div></div></div></section>`;
});
export {
  Page as default
};
