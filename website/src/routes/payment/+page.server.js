import { redirect } from "@sveltejs/kit";

export function load({ locals }) {
    if(!locals.user || locals?.user?.isPremium) throw redirect(307, "/auth");
};