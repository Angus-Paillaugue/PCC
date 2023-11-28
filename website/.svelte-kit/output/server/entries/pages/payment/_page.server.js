import { r as redirect } from "../../../chunks/index.js";
function load({ locals }) {
  if (!locals.user || locals?.user?.isPremium)
    throw redirect(307, "/auth");
}
export {
  load
};
