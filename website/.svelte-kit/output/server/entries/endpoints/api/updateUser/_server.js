import { u as usersRef } from "../../../../chunks/db.js";
async function PATCH({ locals, request }) {
  if (!locals?.user?.isAdmin)
    return new Response(JSON.stringify({ error: "You are not authorized to do this." }), { status: 403 });
  try {
    const userData = await request.json();
    const { id, email, username, isPremium, isAdmin } = userData;
    const oldUser = await usersRef.findOne({ id });
    await usersRef.updateOne({ id }, { $set: { email, username, isPremium: Boolean(isPremium), isAdmin: Boolean(isAdmin) } });
    if (oldUser.username !== username) {
      return new Response(JSON.stringify({ message: "User updated successfully! (the user will need to log back in)" }));
    } else {
      return new Response(JSON.stringify({ message: "User updated successfully!" }));
    }
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
export {
  PATCH
};
