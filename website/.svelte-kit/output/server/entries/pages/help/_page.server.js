import { q as questionsRef, u as usersRef } from "../../../chunks/db.js";
import { randomUUID } from "crypto";
import "../../../chunks/index.js";
async function load() {
  let questions = await questionsRef.find({}).sort({ postedAt: -1 }).project({ _id: 0 }).toArray();
  questions = structuredClone(await Promise.all(questions.map(async (question) => {
    question.postedBy = (({ password, _id, ...o }) => o)(await usersRef.findOne({ id: question.postedBy }));
    question.replies = structuredClone(await Promise.all(question.replies.map(async (replie) => {
      const user = (({ password, _id, ...o }) => o)(await usersRef.findOne({ id: replie.postedBy }));
      return { ...replie, user };
    })));
    question.replies = question.replies.sort(function(a, b) {
      return new Date(b.date) - new Date(a.date);
    });
    return question;
  })));
  return { questions };
}
const actions = {
  newQuestion: async ({ request, locals }) => {
    const { user } = locals;
    if (user) {
      const formData = Object.fromEntries(await request.formData());
      const { title, description } = formData;
      if (title.length <= 0 || description.length <= 0)
        return { name: "newQuestion", status: "error", message: "Please fill all the fields!" };
      const newQuestion = { id: randomUUID(), postedBy: user.id, title, description, replies: [], postedAt: /* @__PURE__ */ new Date() };
      await questionsRef.insertOne({ ...newQuestion });
      return { name: "newQuestion", status: "success", message: "Question posted successfully!", data: { ...newQuestion, postedBy: user } };
    } else {
      return { name: "newQuestion", status: "error", message: "Please log-in to post a new question!" };
    }
  },
  newReplie: async ({ request, locals }) => {
    const { user } = locals;
    if (user) {
      const formData = Object.fromEntries(await request.formData());
      const { message, postId } = formData;
      if (message.length <= 0 || postId.length <= 0)
        return { name: "newQuestion", status: "error", message: "Please fill all the fields!" };
      const newReplie = { id: randomUUID(), postedBy: user.id, message, at: /* @__PURE__ */ new Date() };
      await questionsRef.updateOne({ id: postId }, { $push: { replies: newReplie } });
      return { name: "newReplie", status: "success", message: "Replie posted successfully!", data: { ...newReplie, user } };
    } else {
      return { name: "newQuestion", status: "error", message: "Please log-in to replie!" };
    }
  },
  deleteQuestion: async ({ request, locals }) => {
    const { user } = locals;
    if (user) {
      const formData = Object.fromEntries(await request.formData());
      const { questionId } = formData;
      if (questionId.length <= 0)
        return { name: "newQuestion", status: "error", message: "Please fill all the fields!" };
      await questionsRef.deleteOne({ id: questionId });
      return { name: "deleteQuestion", status: "success", message: "Question deleted successfully!" };
    }
  },
  deleteReplie: async ({ request, locals }) => {
    const { user } = locals;
    if (user) {
      const formData = Object.fromEntries(await request.formData());
      const { questionId, replieId } = formData;
      if (questionId.length <= 0 || replieId.length <= 0)
        return { name: "newQuestion", status: "error", message: "Please fill all the fields!" };
      await questionsRef.updateOne({ id: questionId }, { $pull: { replies: { id: replieId } } });
      return { name: "deleteReplie", status: "success", message: "Replie deleted successfully!" };
    }
  }
};
export {
  actions,
  load
};
