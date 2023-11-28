import { newsletterRef } from "$lib/server/db";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const { email } = params;

    const settings = structuredClone(await newsletterRef.findOne({ email }));

    return { settings };
};