import { c as create_ssr_component, e as escape, f as each, v as validate_component, b as add_attribute } from "../../../chunks/ssr.js";
import { n as newToast } from "../../../chunks/stores2.js";
import { M as Modal } from "../../../chunks/Modal.js";
const maxMessageLength = 1e3;
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let { form } = $$props;
  let { questions, user, supportEmail } = data;
  questions = questions.map((question) => {
    return { ...question, hiddenReplies: true };
  });
  let replyModal = false;
  let deleteQuestionModal = false;
  let newQuestionModal = false;
  let deleteReplieModal = false;
  let newQuestionTitle = "";
  let message = "";
  let deleteReplieId;
  let replyModalQuestionId;
  let replieContainerMaxHeight = [];
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
      if (message?.length > maxMessageLength)
        message = message.slice(0, maxMessageLength);
    }
    {
      if (form) {
        if (form.name === "newReplie") {
          if (form.status === "success") {
            newToast("success", form.message);
            questions = questions.map((question) => {
              if (question.id === replyModalQuestionId) {
                return {
                  ...question,
                  replies: [...question.replies, form.data]
                };
              }
              return question;
            });
            replyModal = false;
            message = "";
            replieContainerMaxHeight.find((el) => el.questionId === replyModalQuestionId).height = Array.from(replieContainerMaxHeight.find((el) => el.questionId === replyModalQuestionId).el.children).map((el) => el.clientHeight) + replieContainerMaxHeight.find((el) => el.questionId === replyModalQuestionId).el.children.length - 1 * 8;
            replieContainerMaxHeight = [...replieContainerMaxHeight];
            replyModalQuestionId = null;
          } else {
            newToast("error", form.message);
          }
        } else if (form.name === "newQuestion") {
          if (form.status === "success") {
            newToast("success", form.message);
            questions = [...questions, form.data];
            newQuestionModal = false;
            message = "";
            newQuestionTitle = "";
          } else {
            newToast("error", form.message);
          }
        } else if (form.name === "deleteQuestion") {
          if (form.status === "success") {
            newToast("success", form.message);
            questions = questions.filter((question) => question.id !== replyModalQuestionId);
            replyModalQuestionId = null;
            deleteQuestionModal = false;
          } else {
            newToast("error", form.message);
          }
        } else if (form.name === "deleteReplie") {
          if (form.status === "success") {
            newToast("success", form.message);
            questions = questions.map((question) => {
              if (question.id === replyModalQuestionId) {
                return {
                  ...question,
                  replies: question.replies.filter((replie) => replie.id !== deleteReplieId)
                };
              }
              return question;
            });
            replieContainerMaxHeight.find((el) => el.questionId === replyModalQuestionId).height = replieContainerMaxHeight.find((el) => el.questionId === replyModalQuestionId).el.scrollHeight;
            deleteReplieModal = false;
            replyModalQuestionId = null;
          } else {
            newToast("error", form.message);
          }
        }
        form = null;
      }
    }
    $$rendered = `${$$result.head += `<!-- HEAD_svelte-by7ird_START -->${$$result.title = `<title>PCC - Get Help</title>`, ""}<!-- HEAD_svelte-by7ird_END -->`, ""} <div class="max-w-screen-lg mx-auto mt-4 grow w-full py-8 px-4 lg:px-6"><div class="w-full h-full flex flex-col gap-4"><h6 class="font-normal">Support e-mail : <button class="font-semibold">${escape(supportEmail)}</button></h6> ${user ? `<button class="button-primary" data-svelte-h="svelte-1vi8tqu">New question</button> ${questions.length === 0 ? `<h2 data-svelte-h="svelte-73zjnf">No questions for now</h2>` : ``}` : `<h3 data-svelte-h="svelte-hktqv9">To be able to ask a question, you need to be <a href="/auth" class="link">logged-in</a></h3>`} ${each(questions, (question) => {
      return `<div class="w-full flex flex-col gap-2 px-2 border-x border-neutral-200 dark:border-neutral-700 relative"><div class="group/question flex flex-col gap-2">${question.postedBy.username === user?.username ? `<button class="absolute top-1 right-1 transition-all opacity-0 group-hover/question:opacity-100 group/button" data-svelte-h="svelte-fnded1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 group-hover/button:text-red-600 transition-all"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path></svg> </button>` : ``} <div class="flex flex-col gap-2"><h3>${escape(question.title)}</h3> <!-- HTML_TAG_START -->${question.description.replaceAll("\n", "<br />")}<!-- HTML_TAG_END --> <h6>${escape(question.postedBy.username)} - <small>${escape(new Date(question.postedAt).toLocaleDateString())}</small></h6> <div class="w-full">${user ? `<button class="button-secondary" data-svelte-h="svelte-afnqyf">Replie</button>` : `<p data-svelte-h="svelte-1k8tzno">To reply, please <a href="/auth" class="link">log-in</a> </p>`}</div> </div></div> <div class="flex flex-col gap-2"><button class="w-full flex flex-row gap-4 no-scale underline" type="button">Show replies (${escape(question.replies.length)})
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="${"w-6 h-6 transition-all " + escape(!question.hiddenReplies && "rotate-180", true)}"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path></svg></button> <div class="flex flex-col gap-4 pl-2 w-full overflow-hidden transition-all" style="${"max-height: " + escape(
        replieContainerMaxHeight.length > 0 ? question.hiddenReplies ? "0" : replieContainerMaxHeight.find((el) => el.questionId === question.id).height : 0,
        true
      ) + "px;"}"${add_attribute("data-replie-container", question.id, 0)}>${each(question.replies, (replie) => {
        return `<div class="flex flex-col gap-2 border-b border-neutral-200 dark:border-neutral-700 group/replie relative">${replie.user.username === user?.username ? `<button class="absolute top-1 right-1 transition-all opacity-0 group-hover/replie:opacity-100 group/button" data-svelte-h="svelte-158m06d"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 group-hover/button:text-red-600 transition-all"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path></svg> </button>` : ``} <h5>${escape(replie.user.username)} - <small>${escape(new Date(replie.at).toLocaleDateString())}</small></h5> <p><!-- HTML_TAG_START -->${replie.message.replaceAll("\n", "<br />")}<!-- HTML_TAG_END --></p> </div>`;
      })} </div></div> </div>`;
    })}</div></div>  ${validate_component(Modal, "Modal").$$render(
      $$result,
      {
        title: "Delete replie",
        status: deleteReplieModal
      },
      {
        status: ($$value) => {
          deleteReplieModal = $$value;
          $$settled = false;
        }
      },
      {
        footer: () => {
          return `<button class="button-secondary" type="button" data-svelte-h="svelte-14ky8oi">No, cancel</button> <button class="button-primary" type="submit" form="deleteReplieForm" data-svelte-h="svelte-l3fsyw">Yes, delete</button> `;
        },
        body: () => {
          return `<form method="POST" slot="body" id="deleteReplieForm" class="flex flex-col gap-4" action="?/deleteReplie" data-svelte-h="svelte-1ccx25i"><p><span class="text-red-600 font-semibold">WARNING</span> : This operation is irreversible. Are you sure you want to delete this replie ?</p></form>`;
        }
      }
    )}  ${validate_component(Modal, "Modal").$$render(
      $$result,
      {
        title: "Delete question",
        closeButton: false,
        status: deleteQuestionModal
      },
      {
        status: ($$value) => {
          deleteQuestionModal = $$value;
          $$settled = false;
        }
      },
      {
        footer: () => {
          return `<button class="button-secondary" type="button" data-svelte-h="svelte-1ks6b4t">No, cancel</button> <button class="button-primary" type="submit" form="deleteQuestionForm" data-svelte-h="svelte-jl5qyx">Yes, delete</button> `;
        },
        body: () => {
          return `<form method="POST" slot="body" id="deleteQuestionForm" action="?/deleteQuestion" data-svelte-h="svelte-1dc9aoe"><p><span class="text-red-600 font-semibold">WARNING</span> : This operation is irreversible. Are you sure you want to delete this question ?</p></form>`;
        }
      }
    )}  ${validate_component(Modal, "Modal").$$render(
      $$result,
      {
        title: "New question",
        status: newQuestionModal
      },
      {
        status: ($$value) => {
          newQuestionModal = $$value;
          $$settled = false;
        }
      },
      {
        footer: () => {
          return `<button type="submit" class="button-primary transition-all overflow-hidden w-full" ${message?.length === 0 || newQuestionTitle?.length === 0 ? "disabled" : ""} form="newQuestionForm">${``} <span class="transition-all" data-svelte-h="svelte-1pzyyxo">Post</span></button> `;
        },
        body: () => {
          return `<form slot="body" method="POST" class="space-y-2" action="?/newQuestion" id="newQuestionForm"><input type="text" name="title" placeholder="Question title"${add_attribute("value", newQuestionTitle, 0)}> <div class="relative"><span class="absolute top-1 right-1 text-xs font-normal">${escape(message?.length)}/${escape(maxMessageLength)}</span> <textarea name="description" placeholder="Question content" rows="6">${escape(message || "")}</textarea></div></form>`;
        }
      }
    )}  ${validate_component(Modal, "Modal").$$render(
      $$result,
      {
        title: `Reply to ${replyModalQuestionId ? questions.filter((el) => el.id === replyModalQuestionId)[0]?.postedBy?.username : ""}`,
        status: replyModal
      },
      {
        status: ($$value) => {
          replyModal = $$value;
          $$settled = false;
        }
      },
      {
        footer: () => {
          return `<button type="submit" class="button-primary w-full transition-all overflow-hidden" ${message?.length === 0 ? "disabled" : ""} form="newReplieForm">${``} <span class="transition-all" data-svelte-h="svelte-139oi22">Reply</span></button> `;
        },
        body: () => {
          return `<form slot="body" id="newReplieForm" method="POST" class="w-full" action="?/newReplie"><div class="relative"><span class="absolute top-1 right-1 text-xs font-normal">${escape(message?.length)}/${escape(maxMessageLength)}</span> <textarea placeholder="Replie content" name="message" rows="6">${escape(message || "")}</textarea></div></form>`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
