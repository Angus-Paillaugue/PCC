import { redirect } from "@sveltejs/kit";

export async function load({ locals }) {
    if(!locals.user || locals?.user?.isPremium) throw redirect(307, "/auth");
};