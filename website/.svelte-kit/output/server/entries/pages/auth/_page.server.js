import { u as usersRef } from "../../../chunks/db.js";
import { r as redirect } from "../../../chunks/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { A as AUTH_TOKEN_SECRET } from "../../../chunks/private.js";
import { randomUUID } from "crypto";
function load({ locals }) {
  if (locals.user)
    throw redirect(307, "/dashboard");
}
const actions = {
  login: async ({ cookies, request }) => {
    try {
      const formData = Object.fromEntries(await request.formData());
      const { username, password } = formData;
      const userExists = await usersRef.findOne({ username });
      if (!userExists)
        return { logIn: { success: false, formData, message: "No account with this username!" } };
      const compare = await bcrypt.compare(password, userExists.password);
      if (compare) {
        cookies.set("token", generateAccessToken(username), {
          path: "/",
          httpOnly: true,
          sameSite: "strict",
          secure: true,
          maxAge: 60 * 60 * 24 * 30
        });
        throw redirect(307, "/dashboard");
      }
      return { logIn: { success: false, formData, message: "Incorrect password!" } };
    } catch (err) {
      console.log(err);
    }
  },
  signin: async ({ cookies, request }) => {
    const formData = Object.fromEntries(await request.formData());
    const { email, username, password } = formData;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return { signIn: { success: false, formData, message: "Invalid email!" } };
    const userExists = await usersRef.findOne({ email });
    if (userExists)
      return { signIn: { success: false, formData, message: "This email is already in use in another account!" } };
    const usernameIsTaken = await usersRef.findOne({ username });
    if (usernameIsTaken)
      return { signIn: { success: false, formData, message: "This username is already taken!" } };
    const isASCII = (str) => {
      return /^[a-zA-Z0-9]+$/.test(str);
    };
    if (!isASCII(username))
      return { signIn: { success: false, formData, message: "Usernames can only be composed of letters and numbers!" } };
    if (username.length < 4 || username.length > 16)
      return { signIn: { success: false, formData, message: "Username length must be between 4 and 16 characters long!" } };
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    await usersRef.insertOne({ username, email, password: hash, joined: /* @__PURE__ */ new Date(), isPremium: false, id: randomUUID() });
    cookies.set("token", generateAccessToken(username), {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      maxAge: 60 * 60 * 24 * 30
    });
  }
};
function generateAccessToken(username) {
  return jwt.sign(username, AUTH_TOKEN_SECRET);
}
export {
  actions,
  load
};
