import { questionsRef, usersRef } from "$lib/server/db";
import { randomUUID } from "crypto";

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    let questions = await questionsRef.find({  }).sort({ postedAt:-1 }).project({ _id:0 }).toArray();

    questions = structuredClone(await Promise.all(questions.map(async (question) => {
        question.postedBy = (({ password, _id, ...o }) => o)(await usersRef.findOne({ username:question.postedBy }));
        question.replies = structuredClone(await Promise.all(question.replies.map(async (replie) => {
            let user = (({ password, _id, ...o }) => o)(await usersRef.findOne({ username:replie.username }));
            return{ ...replie, user }
        })));
        question.replies = question.replies.sort(function(a,b){return new Date(b.date) - new Date(a.date);});
        return question;
    })));

    return { questions };
};

/** @type {import('./$types').Actions} */
export const actions = {
    newQuestion:async({ request, locals }) => {
        const { user } = locals;
        if(user){
            const formData = Object.fromEntries(await request.formData());
            const { title, description } = formData;
            let newQuestion = { id:randomUUID(), postedBy:user.username, title, description, replies:[], postedAt:new Date() };
            await questionsRef.insertOne(newQuestion);
            
            newQuestion.postedBy = user;
            return { success:true, question:structuredClone(newQuestion), submitType:"newQuestion" };
        }
    },
    newReplie:async({ request, locals }) => {
        const { user } = locals;
        if(user){
            const formData = Object.fromEntries(await request.formData());
            const { message, postId } = formData;

            await questionsRef.updateOne({ id:postId }, { $push: { replies: { message, username:user.username, at:new Date() }} });
            return { success:true, replie:{ message, user, at:new Date(), submitType:"newReplie" } }
        }
    }
};