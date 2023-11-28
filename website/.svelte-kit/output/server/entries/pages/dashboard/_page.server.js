import { r as redirect } from "../../../chunks/index.js";
async function load({ locals }) {
  if (locals?.user?.isAdmin)
    throw redirect(307, "/dashboard/admin");
  if (!locals?.user)
    throw redirect(307, "/auth?redirect=/dashboard");
}
export {
  load
};
