import { usersRef } from "$lib/server/db";
import { compare } from "bcrypt";

export async function POST({ request }) {
    // const username = url.searchParams.get('username');
    // const password = url.searchParams.get('password');
    const { username, password } = await request.json();

    const user = await usersRef.findOne({ username });
    if(!user) return new Response(JSON.stringify({ err:"User not found." }));

    const passwordCorrect = await compare(password, user.password);

    if(passwordCorrect) {
        return new Response(JSON.stringify({ isPremium:user.isPremium })); 
    }else {
        return new Response(JSON.stringify({ err:"Incorrect password." }));
    }
};