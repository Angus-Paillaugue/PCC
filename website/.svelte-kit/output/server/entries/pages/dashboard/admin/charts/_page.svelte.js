import { c as create_ssr_component, v as validate_component, e as escape, b as add_attribute, f as each } from "../../../../../chunks/ssr.js";
import { C as Card } from "../../../../../chunks/Card.js";
import { T as TextInput } from "../../../../../chunks/TextInput.js";
import { I as Icon } from "../../../../../chunks/Icon.js";
const noUsersToDisplay = 9;
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let { users } = data;
  let usersArray = users.slice(0, noUsersToDisplay);
  let usersChartContainer;
  let premiumChartContainer;
  let searchQuery;
  const userProgressionData = {};
  users.forEach((user) => {
    const joinDate = user.joined.toISOString().split("T")[0];
    userProgressionData[joinDate] = (userProgressionData[joinDate] || 0) + 1;
  });
  const joinDates = Object.keys(userProgressionData);
  const earliestDate = Math.min(...joinDates.filter((date) => new Date(date) > new Date((/* @__PURE__ */ new Date()).setDate((/* @__PURE__ */ new Date()).getDate() - 30))).map((date) => new Date(date)));
  const latestDate = Math.max(/* @__PURE__ */ new Date());
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
  const premiumUsers = users.filter((user) => user.isPremium);
  const getProgression = (nbDays) => {
    nbDays = Math.min(nbDays + 1, cumulativeData.length);
    const data2 = cumulativeData.map((d) => d.y);
    return Math.round((data2.at(-1) - data2.at(-nbDays)) / data2.at(-nbDays) * 100);
  };
  let baseChartStyle = {
    chart: {
      height: 450,
      type: "line",
      toolbar: { show: false }
    },
    colors: ["#0da858"],
    dataLabels: { enabled: true },
    stroke: { curve: "smooth" },
    grid: {
      borderColor: "#e7e7e7",
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5
      }
    }
  };
  ({
    ...baseChartStyle,
    series: [{ name: "Users", data: cumulativeData }],
    title: { text: "Users progression", align: "left" },
    xaxis: {
      categories: Object.keys(userProgressionData),
      title: { text: "Days" }
    },
    yaxis: {
      title: { text: "Users" },
      min: 0,
      max: Math.max(...cumulativeData.map((d) => d.y))
    }
  });
  ({
    series: [premiumUsers.length, users.length - premiumUsers.length],
    chart: { width: 380, type: "pie" },
    labels: ["Premium", "Free"]
  });
  function search() {
    if (!searchQuery) {
      usersArray = premiumUsers.slice(0, noUsersToDisplay);
      return;
    }
    const tolerance = 2;
    const searchWords = searchQuery.toLowerCase().split(" ");
    usersArray = premiumUsers.filter((u) => {
      const userWords = u.username.toLowerCase().split(" ");
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
    }).slice(0, noUsersToDisplay);
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
    $$rendered = `${$$result.head += `<!-- HEAD_svelte-1ex87jb_START -->${$$result.title = `<title>PCC - Admin dashboard</title>`, ""}<script src="https://cdn.jsdelivr.net/npm/apexcharts" data-svelte-h="svelte-avrofd"><\/script><!-- HEAD_svelte-1ex87jb_END -->`, ""} <section class="grow w-full py-8 px-4 lg:py-16 lg:px-6 space-y-6"><div class="max-w-screen-lg mx-auto flex flex-col gap-6"><a href="../" class="button-secondary w-fit button-small group">${validate_component(Icon, "Icon").$$render(
      $$result,
      {
        icon: "heroicons:arrow-uturn-left",
        class: "w-6 h-6 transition-all group-hover:rotate-[360deg] duration-300"
      },
      {},
      {}
    )}
            Go back</a> <div class="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-6">${validate_component(Card, "Card").$$render($$result, { class: "md:col-span-2" }, {}, {
      default: () => {
        return `<div class="w-full grid grid-cols-1 lg:grid-cols-3 p-4 gap-4"><div class="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 flex flex-row items-center justify-center"><h3 class="text-center w-fit">+<span class="text-green-600 dark:text-green-800">${escape(getProgression(1))}</span>% Today</h3></div> <div class="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 flex flex-row items-center justify-center"><h3 class="text-center w-fit">+<span class="text-green-600 dark:text-green-800">${escape(getProgression(7))}</span>% Last 7 days</h3></div> <div class="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 flex flex-row items-center justify-center"><h3 class="text-center w-fit">+<span class="text-green-600 dark:text-green-800">${escape(getProgression(30))}</span>% Last 30 days</h3></div></div> <div class="w-full"${add_attribute("this", usersChartContainer, 0)}></div>`;
      }
    })} ${validate_component(Card, "Card").$$render($$result, {}, {}, {
      default: () => {
        return `<div class=""${add_attribute("this", premiumChartContainer, 0)}></div>`;
      }
    })} ${validate_component(Card, "Card").$$render($$result, { class: "relative" }, {}, {
      default: () => {
        return `<h5 class="w-full border-b border-neutral-200 dark:border-neutral-700 flex flex-row p-2 items-center justify-between">Premium users
                    <button class="w-fit button-secondary button-small">${validate_component(Icon, "Icon").$$render(
          $$result,
          {
            icon: "heroicons:magnifying-glass",
            class: "w-4 h-4"
          },
          {},
          {}
        )}</button></h5> <div class="${"bg-neutral-100 dark:bg-neutral-700 rounded-lg p-2.5 absolute top-0 left-0 right-0 transition-all " + escape("-z-10 opacity-0", true)}">${validate_component(TextInput, "TextInput").$$render(
          $$result,
          {
            label: "Search",
            type: "text",
            placeholder: "Search users by usernames",
            name: "search",
            value: searchQuery
          },
          {
            value: ($$value) => {
              searchQuery = $$value;
              $$settled = false;
            }
          },
          {}
        )} <button type="button" class="group absolute top-1 right-1 button-close">${validate_component(Icon, "Icon").$$render(
          $$result,
          {
            icon: "heroicons:x-mark",
            class: "w-6 h-6 transition-all group-hover:rotate-90"
          },
          {},
          {}
        )}</button></div> <div class="flex flex-col gap-0 overflow-y-auto overflow-x-hidden">${each(usersArray, (u) => {
          return `<div class="w-full transition-all text-text-main dark:text-neutral-100 dark:hover:bg-neutral-600 hover:bg-neutral-100 p-2 cursor-pointer rounded-lg hover:px-4 relative group flex flex-row justify-between">${escape(u.username)} <div class="opacity-0 group-hover:opacity-100 transition-all">${escape(u.email)}</div> </div>`;
        })}</div>`;
      }
    })}</div></div></section>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
