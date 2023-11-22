import { r as resetPasswordTokensRef, u as usersRef } from "../../../chunks/db.js";
import { randomUUID } from "crypto";
import { s as sendEmail } from "../../../chunks/sendEmail.js";
const actions = {
  default: async ({ request }) => {
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
      const link = `http://localhost:5173/reset-password/${userToken}`;
      await sendEmail({
        subject: "Password Reset",
        text: `Reset your password`,
        to: email,
        attachment: [{
          data: `<div>Click the link below to reset your password: <br/><br/><a href="${link}">Reset password</a><br>This link is only available for ${tokenLife} minutes. After that, you will need to to another request.<br>If you did not request a password reset, please disregard this e-mail.</div>`,
          alternative: true
        }]
      });
      return { success: true, message: "Password reset email sent" };
    } catch (err) {
      console.log(err);
    }
  }
};
export {
  actions
};
