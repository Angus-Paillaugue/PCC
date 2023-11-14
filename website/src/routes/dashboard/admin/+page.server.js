import { redirect } from "@sveltejs/kit";
import { usersRef } from "$lib/server/db";

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
    if(!locals?.user) throw redirect(307, "/auth");
    if(!locals?.user?.isAdmin) throw redirect(307, "/dashboard");

    const users = await usersRef.find({  }).sort({ joined:-1 }).project({ _id:0 }).toArray();

    return { users };
};