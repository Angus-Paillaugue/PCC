import { r as redirect } from "../../../../../chunks/index.js";
import { n as newsletterRef } from "../../../../../chunks/db.js";
async function load({ locals }) {
  if (!locals?.user?.isAdmin)
    throw redirect(307, "/auth");
  const subscribers = await newsletterRef.find({}).project({ _id: 0 }).toArray();
  return { subscribers };
}
const actions = {
  sendEmails: async ({ request, locals }) => {
    if (!locals.user)
      return { success: false, formData, message: "Not logged in!" };
    const formData = Object.fromEntries(await request.formData());
    const { email } = formData;
    console.log(formData);
    const subscriber = await newsletterRef.findOne({ email });
    await newsletterRef.updateOne({ email }, { $set: { sendEmails: !subscriber.sendEmails } });
    return { type: "sendEmails", success: true, message: "Updated successfully!" };
  }
};
export {
  actions,
  load
};
