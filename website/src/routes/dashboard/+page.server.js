import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
    console.log(locals?.user?.isAdmin);
    if(locals?.user?.isAdmin) throw redirect(307, "/dashboard/admin");
    if(!locals?.user) throw redirect(307, "/auth?redirect=/dashboard");
};