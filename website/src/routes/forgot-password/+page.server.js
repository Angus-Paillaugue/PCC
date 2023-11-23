import { usersRef, resetPasswordTokensRef } from "$lib/server/db";
import { randomUUID } from "crypto";
import { sendForgotEmail } from "$lib/server/sendEmail";

export const actions = {
    default: async ({ request, url }) => {
        // Delete all expired tokens
        await resetPasswordTokensRef.deleteMany({ expires: { $lt: new Date() } });

        const tokenLife = 10; // 10 minutes

        try{
            const formData = Object.fromEntries(await request.formData());
            const { username } = formData;
    
            const userExists = await usersRef.findOne({ username:username });
            if(!userExists) return { error:true, formData:formData, message:"No account with this username!" };

            const email = userExists.email;
            const userToken = randomUUID();

            await resetPasswordTokensRef.deleteMany({ username });

            await resetPasswordTokensRef.insertOne({ username:username, token:userToken, expires: new Date(Date.now() + 1000 * 60 * tokenLife) });
            
            const link = `${url.origin}/reset-password/${userToken}`;
    
            await sendForgotEmail(email, link, tokenLife);
    
            return { success:true, message: 'Password reset email sent' };
        }catch(err){
            console.log(err);
        }
    }
};