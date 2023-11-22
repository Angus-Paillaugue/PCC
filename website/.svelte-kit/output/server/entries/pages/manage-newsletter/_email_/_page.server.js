import { n as newsletterRef } from "../../../../chunks/db.js";
async function load({ params }) {
  const { email } = params;
  const settings = structuredClone(await newsletterRef.findOne({ email }));
  return { settings };
}
export {
  load
};
