import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies, locals }) {
    cookies.delete("token");
    locals.user = null;
    
    throw redirect(307, '/');
};