import { u as usersRef } from "./db.js";
import jwt from "jsonwebtoken";
import { A as AUTH_TOKEN_SECRET } from "./private.js";
async function auth(token) {
  try {
    return new Promise((resolve, reject) => {
      if (!token)
        reject({ error: "jwt must be provided" });
      jwt.verify(token, AUTH_TOKEN_SECRET, async (err, username) => {
        if (err)
          return reject({ error: err });
        const user = await usersRef.findOne({ username });
        if (!user)
          return reject({ error: { status: 500, responseText: "An error occurred while fetching your user data" } });
        else
          resolve((({ password, _id, ...o }) => o)(user));
      });
    }).catch((err) => {
      return { error: err };
    });
  } catch (err) {
    return { error: err };
  }
}
const handle = async ({ event, resolve }) => {
  const { cookies, locals } = event;
  const token = cookies.get("token");
  if (token) {
    const user = await auth(token);
    if (!user?.error) {
      locals.user = user;
    } else {
      locals.user = null;
    }
  } else {
    locals.user = null;
  }
  return resolve(event);
};
export {
  handle
};
