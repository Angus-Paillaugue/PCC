import { u as usersRef, q as questionsRef } from "../../../../chunks/db.js";
import { r as redirect } from "../../../../chunks/index.js";
import bcrypt from "bcrypt";
function load({ locals }) {
  if (!locals.user)
    throw redirect(307, "/auth");
}
const actions = {
  save: async ({ request, locals }) => {
    if (!locals.user)
      return { success: false, formData, message: "Not logged in!" };
    const formData = Object.fromEntries(await request.formData());
    const { email } = formData;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return { account: { success: false, formData, message: "Invalid email!" } };
    await usersRef.updateOne({ email }, { $set: formData }, { upsert: true });
    return { account: { success: true, formData, message: "Saved!" } };
  },
  deleteAccount: async ({ locals }) => {
    if (!locals.user)
      return { password: { success: false, message: "Not logged in!" } };
    await usersRef.deleteOne({ email: locals.user.email });
    await questionsRef.deleteMany({ postedBy: locals.user.id });
    throw redirect(307, "/logout");
  },
  password: async ({ request, locals }) => {
    if (!locals.user)
      return { password: { success: false, message: "Not logged in!" } };
    const formData = Object.fromEntries(await request.formData());
    const { currentPassword, newPassword } = formData;
    const user = await usersRef.findOne({ username: locals.user.username });
    const compare = await bcrypt.compare(currentPassword, user.password);
    if (!compare)
      return { password: { success: false, message: "Incorrect password!" } };
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);
    await usersRef.updateOne({ username: user.username }, { $set: { password: hash } });
    return { password: { success: true, message: "Saved!" } };
  }
};
export {
  actions,
  load
};
