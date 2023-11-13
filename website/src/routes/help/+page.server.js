import { questionsRef, usersRef } from "$lib/server/db";
import { randomUUID } from "crypto";

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    let questions = await questionsRef.find({  }).sort({ postedAt:-1 }).project({ _id:0 }).toArray();

    questions = structuredClone(await Promise.all(questions.map(async (question) => {
        question.postedBy = (({ password, _id, ...o }) => o)(await usersRef.findOne({ id:question.postedBy }));
        question.replies = structuredClone(await Promise.all(question.replies.map(async (replie) => {
            const user = (({ password, _id, ...o }) => o)(await usersRef.findOne({ id:replie.postedBy }));
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
            await questionsRef.insertOne({ id:randomUUID(), postedBy:user.id, title, description, replies:[], postedAt:new Date() });
            
            return { success:true };
        }
    },
    newReplie:async({ request, locals }) => {
        const { user } = locals;
        if(user){
            const formData = Object.fromEntries(await request.formData());
            const { message, postId } = formData;

            await questionsRef.updateOne({ id:postId }, { $push: { replies: { message, postedBy:user.id, at:new Date(), id:randomUUID() }} });
            return { success:true }
        }
    },
    deleteQuestion:async({ request, locals }) => {
        const { user } = locals;
        if(user){
            const formData = Object.fromEntries(await request.formData());
            const { questionId } = formData;

            await questionsRef.deleteOne({ id:questionId });

            return { success:true }
        }
    },
    deleteReplie:async({ request, locals }) => {
        const { user } = locals;
        if(user){
            const formData = Object.fromEntries(await request.formData());
            const { questionId, replieId } = formData;

            await questionsRef.updateOne({ id:questionId }, { $pull: { replies:{ id:replieId } } });

            return { success:true }
        }
    }
};