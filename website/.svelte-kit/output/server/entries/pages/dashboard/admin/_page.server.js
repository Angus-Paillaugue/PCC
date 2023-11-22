import { r as redirect } from "../../../../chunks/index.js";
import { u as usersRef } from "../../../../chunks/db.js";
async function load({ locals }) {
  if (!locals?.user)
    throw redirect(307, "/auth");
  if (!locals?.user?.isAdmin)
    throw redirect(307, "/dashboard");
  const users = await usersRef.find({}).sort({ joined: -1 }).project({ _id: 0 }).toArray();
  return { users };
}
export {
  load
};
