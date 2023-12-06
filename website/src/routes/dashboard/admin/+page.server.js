import { redirect } from "@sveltejs/kit";
import { usersRef, exchangeRatesRef } from "$lib/server/db";

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
    if(!locals?.user) throw redirect(307, "/auth?redirect=/dashboard/admin");
    if(!locals?.user?.isAdmin) throw redirect(307, "/dashboard");

    const credentials = [
        {
            username: "send.email.pcc@gmail.com",
            password: "k4eyLujoow3RKVoZVz8vD0OcUrcvbECbdGL5XkAi",
            type: "Google",
            showPassword: false
        },
        {
            username: "pandabuycurrencyconverter@gmail.com",
            password: "k4eyLujoow3RKVoZVz8vD0OcUrcvbECbdGL5XkAm",
            type: "Google",
            showPassword: false
        }
    ];

    const users = await usersRef.find({  }).sort({ joined:-1 }).project({ _id:0 }).toArray();
    const ratesUpdatedAt = structuredClone(await exchangeRatesRef.findOne({ id:1 }));
    
    return { users, ratesUpdatedAt:ratesUpdatedAt.updatedAt, credentials };
};