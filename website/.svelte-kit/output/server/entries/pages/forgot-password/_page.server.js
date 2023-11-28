import { r as resetPasswordTokensRef, u as usersRef } from "../../../chunks/db.js";
import { randomUUID } from "crypto";
import { a as sendForgotEmail } from "../../../chunks/sendEmail.js";
const actions = {
  default: async ({ request, url }) => {
    await resetPasswordTokensRef.deleteMany({ expires: { $lt: /* @__PURE__ */ new Date() } });
    const tokenLife = 10;
    try {
      const formData = Object.fromEntries(await request.formData());
      const { username } = formData;
      const userExists = await usersRef.findOne({ username });
      if (!userExists)
        return { error: true, formData, message: "No account with this username!" };
      const email = userExists.email;
      const userToken = randomUUID();
      await resetPasswordTokensRef.deleteMany({ username });
      await resetPasswordTokensRef.insertOne({ username, token: userToken, expires: new Date(Date.now() + 1e3 * 60 * tokenLife) });
      const link = `${url.origin}/reset-password/${userToken}`;
      await sendForgotEmail(email, link, tokenLife);
      return { success: true, message: "Password reset email sent" };
    } catch (err) {
      console.log(err);
    }
  }
};
export {
  actions
};
