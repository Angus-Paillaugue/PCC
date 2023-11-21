import { newsletterRef } from "$lib/server/db";

/** @type {import('./$types').Actions} */
export const actions = {
    subscribeToNewsletter: async ({ request }) => {
        const { email } = Object.fromEntries(await request.formData());

        const exists = await newsletterRef.findOne({ email });
        console.log(email);
        console.log(exists);
        if(exists){
            return { type:"newsletter", error:true, message:"You are already subscribed to the newsletter."}
        }else {
            await newsletterRef.insertOne({ email:email, sendEmails:true });
            return { type:"newsletter", error:false, message:"You have been subscribed to the newsletter." };
        }
    }
};