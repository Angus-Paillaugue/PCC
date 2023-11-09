import { usersRef, resetPasswordTokensRef } from "$lib/server/db";
import { randomUUID } from "crypto";
import { sendEmail } from "$lib/server/sendEmail";

export const actions = {
    default: async ({ request }) => {
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

            token = await resetPasswordTokensRef.insertOne({ username:username, token:userToken, expires: new Date(Date.now() + 1000 * 60 * tokenLife) });
            
            const link = `http://localhost:5173/reset-password/${userToken}`;
    
            await sendEmail({
                subject: 'Password Reset',
                text: `Reset your password`,
                to: email,
                attachment: [{
                    data: `<div>Click the link below to reset your password: <br/><br/><a href="${link}">Reset password</a><br>This link is only available for ${tokenLife} minutes. After that, you will need to to another request.<br>If you did not request a password reset, please ignore this e-mail.</div>`,
                    alternative: true
                }]
            });
    
            return { success:true, message: 'Password reset email sent' };
        }catch(err){
            console.log(err);
        }
    }
};