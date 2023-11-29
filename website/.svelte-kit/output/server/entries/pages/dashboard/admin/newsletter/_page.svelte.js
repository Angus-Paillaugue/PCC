import { c as create_ssr_component, b as add_attribute, f as each, v as validate_component, e as escape } from "../../../../../chunks/ssr.js";
import { n as newToast } from "../../../../../chunks/stores2.js";
import { M as Modal } from "../../../../../chunks/Modal.js";
const noUsersToDisplay = 9;
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { form } = $$props;
  let { data } = $$props;
  const { subscribers } = data;
  let subscribersArray = subscribers.slice(0, noUsersToDisplay);
  let newNewsletterModal = false;
  let subscribersChartContainer;
  let newNewsletterFormData = {
    subject: form?.formData?.subject ?? "",
    contents: form?.formData?.contents ?? ""
  };
  const userProgressionData = {};
  subscribers.forEach((user) => {
    const joinDate = user.joinedAt.toISOString().split("T")[0];
    userProgressionData[joinDate] = (userProgressionData[joinDate] || 0) + 1;
  });
  const joinDates = Object.keys(userProgressionData);
  const earliestDate = Math.min(...joinDates.map((date) => new Date(date)));
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
    series: [
      {
        name: "Subscribers",
        data: cumulativeData
      }
    ],
    title: {
      text: "Subscribers progression",
      align: "left"
    },
    xaxis: {
      categories: Object.keys(userProgressionData),
      title: { text: "Days" }
    },
    yaxis: {
      title: { text: "Subscribers" },
      min: 0,
      max: Math.max(...cumulativeData.map((d) => d.y))
    }
  });
  function search() {
    {
      subscribersArray = subscribers.slice(0, noUsersToDisplay);
      return;
    }
  }
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
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
      if (form) {
        if (form.type === "sendEmails") {
          newToast(form.success ? "success" : "error", form.message);
        }
        if (form.type === "newMail") {
          newToast(form.success ? "success" : "error", form.message);
        }
      }
    }
    $$rendered = `${$$result.head += `<!-- HEAD_svelte-1eai_START -->${$$result.title = `<title>PCC - Newsletter management</title>`, ""}<script src="https://cdn.jsdelivr.net/npm/apexcharts" data-svelte-h="svelte-avrofd"><\/script><!-- HEAD_svelte-1eai_END -->`, ""} <section class="grow w-full py-8 px-4 lg:py-16 lg:px-6 space-y-6"><div class="max-w-screen-lg mx-auto flex flex-col gap-6"><a href="../" class="button-secondary w-fit button-small group" data-svelte-h="svelte-ptbhqv"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 transition-all group-hover:rotate-[360deg] duration-300"><path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"></path></svg>
            Go back</a> <div class="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-6"><div class="md:col-span-2 border border-neutral-200 dark:border-neutral-700 rounded-lg"><div class="w-full"${add_attribute("this", subscribersChartContainer, 0)}></div></div> <div class="h-full flex flex-col gap-2 border border-neutral-200 dark:border-neutral-700 rounded-lg max-h-[450px] p-4 relative"><h5 class="w-full border-b border-neutral-200 dark:border-neutral-700 flex flex-row p-2 items-center justify-between">Newsletter status
                    <button class="w-fit button-secondary button-small" data-svelte-h="svelte-1y07h73"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path></svg></button></h5> ${``} <div class="flex flex-col gap-0 overflow-y-auto overflow-x-hidden">${each(subscribersArray, (u) => {
      return `<form action="?/sendEmails" method="POST" class="w-full transition-all text-text-main dark:text-neutral-100 dark:hover:bg-neutral-600 hover:bg-neutral-100 p-2 cursor-pointer rounded-lg hover:px-4 items-center relative group flex flex-row justify-between">${escape(u.email)} <div class="switch-wrapper opacity-0 group-hover:opacity-100 transition-all"><input type="checkbox" id="${"sendEmail-" + escape(u.email, true)}" name="${"sendEmails-" + escape(u.email, true)}" ${u.sendEmails ? "checked" : ""} class="hidden"> <label for="${"sendEmail-" + escape(u.email, true)}"><span data-svelte-h="svelte-1qeeisj"><em></em></span></label></div> </form>`;
    })}</div></div> <div class="h-full flex flex-col gap-2 border border-neutral-200 dark:border-neutral-700 rounded-lg max-h-[450px] p-4 relative"><button class="button-primary" data-svelte-h="svelte-1tp2sp3">Send new newsletter</button></div></div></div></section> ${validate_component(Modal, "Modal").$$render(
      $$result,
      {
        title: "New newsletter mail",
        status: newNewsletterModal
      },
      {
        status: ($$value) => {
          newNewsletterModal = $$value;
          $$settled = false;
        }
      },
      {
        footer: () => {
          return `<button class="button-secondary" data-svelte-h="svelte-h9xgp3">Cancel</button> <button form="newNewsletterForm" class="button-primary" ${newNewsletterFormData.subject.length === 0 || newNewsletterFormData.contents.length === 0 ? "disabled" : ""}>${`Send`}</button> `;
        },
        body: () => {
          return `<form action="?/newMail" method="POST" id="newNewsletterForm" slot="body" class="flex flex-col gap-4"><p data-svelte-h="svelte-10xr2bd">In email subject and body, you can use use {{email}} to insert the user&#39;s email</p> <p class="font-bold">Newsletter subject
            <input type="text" name="subject" id="subject" placeholder="Subject"${add_attribute("value", newNewsletterFormData.subject, 0)}></p> <p class="font-bold">Newsletter contents
            <textarea name="contents" id="contents" placeholder="Contents" rows="10">${escape(newNewsletterFormData.contents || "")}</textarea></p></form>`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
