import { usersRef } from "$lib/server/db";
import { compare } from "bcrypt";

export async function GET({ url }) {
    const username = url.searchParams.get('username');
    const password = url.searchParams.get('password');
    console.log(username, password);
    // const { username, password } = await request.json();

    const user = await usersRef.findOne({ username });
    if(!user) return new Response(JSON.stringify({ err:"User not found." }), { headers: { "Content-Type": "application/json" }, status: 500, statusText:"User not found." });

    const passwordCorrect = await compare(password, user.password);

    if(passwordCorrect) {
        return new Response(JSON.stringify({ isPremium:user.isPremium }), { headers: { "Content-Type": "application/json" }, status: 200, statusText:"OK" }); 
    }else {
        return new Response(JSON.stringify({ isPremium:false, err:"Incorrect password." }), { headers: { "Content-Type": "application/json" }, status: 500, statusText:"Incorrect password." });
    }
};