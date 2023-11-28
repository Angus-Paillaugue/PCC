import { n as newsletterRef } from "../../../../chunks/db.js";
async function load({ params }) {
  const { email } = params;
  const settings = structuredClone(await newsletterRef.findOne({ email }));
  if (!settings)
    return { settings: null };
  return { settings };
}
export {
  load
};
