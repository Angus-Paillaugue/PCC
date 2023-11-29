import { c as create_ssr_component, f as each, b as add_attribute, e as escape, v as validate_component } from "../../../chunks/ssr.js";
import { I as Icon } from "../../../chunks/Icon.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const teamMembers = [
    {
      firstName: "Angus",
      name: "Paillaugue",
      role: "Project manager",
      profilePicture: "https://media.licdn.com/dms/image/D4E03AQEj5C1kgTQ5dw/profile-displayphoto-shrink_200_200/0/1679573349910?e=1706140800&v=beta&t=Krlgub0FEKD7OzQFF3MoPsJx9X3D175NcXxAMEI4BwU",
      githubProfileUrl: "https://github.com/Angus-Paillaugue",
      linkedinProfileUrl: "https://www.linkedin.com/in/angus-paillaugue/"
    }
  ];
  return `${$$result.head += `<!-- HEAD_svelte-1ybh0dd_START -->${$$result.title = `<title>PCC - About us</title>`, ""}<!-- HEAD_svelte-1ybh0dd_END -->`, ""} <section class="grow py-8 px-4 mx-auto max-w-4xl lg:py-16 lg:px-6 w-full"><h2 data-svelte-h="svelte-qwjwz5">About us</h2> <p data-svelte-h="svelte-ulzkjz">Hi, this is Angus, the creator of our beloved Pandabuy Currency Conversion navigator extension and this is my team.</p> <div class="grid mt-10" style="grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));">${each(teamMembers, (member) => {
    return `<div class="flex flex-col items-center justify-center relative max-w-[250px]"><img${add_attribute("src", member.profilePicture, 0)} alt="" class="w-28 h-28 object-cover rounded-full"> <h5 class="mt-4">${escape(member.firstName)} ${escape(member.name)}</h5> <p class="text-base">${escape(member.role)}</p> <div class="flex flex-row items-center justify-center gap-6 mt-2 text-neutral-600 dark:text-neutral-400"><a${add_attribute("href", member.githubProfileUrl, 0)} target="_blank">${validate_component(Icon, "Icon").$$render(
      $$result,
      {
        icon: "carbon:logo-github",
        class: "w-8 h-8 hover:text-neutral-800 dark:hover:text-neutral-600 transition-all"
      },
      {},
      {}
    )}</a> <a${add_attribute("href", member.linkedinProfileUrl, 0)} target="_blank">${validate_component(Icon, "Icon").$$render(
      $$result,
      {
        icon: "carbon:logo-linkedin",
        class: "w-8 h-8 hover:text-neutral-800 dark:hover:text-neutral-600 transition-all"
      },
      {},
      {}
    )} </a></div> </div>`;
  })}</div></section>`;
});
export {
  Page as default
};
