import { usersRef, resetPasswordTokensRef } from "$lib/server/db";
import bcrypt from "bcrypt";

export const load = async ({ params }) => {
    // Delete all expired tokens
    await resetPasswordTokensRef.deleteMany({ expires: { $lt: new Date() } });

    const doc = await resetPasswordTokensRef.findOne({ token:params.UUID });
    if(!doc) return { error:true, message:"Request expired!" };
};

export const actions = {
    resetPassword: async ({ request, params }) => {
        try{
            const formData = Object.fromEntries(await request.formData());
            const { password } = formData;

            if(password.length < 6) return { error:true, message:"Your password must be atl least 6 characters long!" };
    
            const { username } = await resetPasswordTokensRef.findOne({ token:params.UUID });
            if(!username) return { error:true, message:"Request expired!" };

            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            await usersRef.updateOne({ username:username }, { $set: { password:hash } });
            await resetPasswordTokensRef.deleteMany({ username:username });

            return { success:true };
        }catch(err){
            return { error:true, message:err };
        }
    }
};