import { r as resetPasswordTokensRef, u as usersRef } from "../../../../chunks/db.js";
import bcrypt from "bcrypt";
const load = async ({ params }) => {
  await resetPasswordTokensRef.deleteMany({ expires: { $lt: /* @__PURE__ */ new Date() } });
  const doc = await resetPasswordTokensRef.findOne({ token: params.UUID });
  if (!doc)
    return { error: true, message: "Request expired!" };
};
const actions = {
  resetPassword: async ({ request, params }) => {
    try {
      const formData = Object.fromEntries(await request.formData());
      const { password } = formData;
      const { username } = await resetPasswordTokensRef.findOne({ token: params.UUID });
      if (!username)
        return { error: true, message: "Request expired!" };
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      await usersRef.updateOne({ username }, { $set: { password: hash } });
      await resetPasswordTokensRef.deleteMany({ username });
      return { success: true };
    } catch (err) {
      return { error: true, message: err };
    }
  }
};
export {
  actions,
  load
};
