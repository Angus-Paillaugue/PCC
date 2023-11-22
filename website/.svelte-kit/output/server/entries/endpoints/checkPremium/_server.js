import { u as usersRef } from "../../../chunks/db.js";
import { compare } from "bcrypt";
async function POST({ request }) {
  const { username, password } = await request.json();
  const user = await usersRef.findOne({ username });
  if (!user)
    return new Response(JSON.stringify({ err: "User not found." }));
  const passwordCorrect = await compare(password, user.password);
  if (passwordCorrect) {
    return new Response(JSON.stringify({ isPremium: user.isPremium }));
  } else {
    return new Response(JSON.stringify({ err: "Incorrect password." }));
  }
}
export {
  POST
};
