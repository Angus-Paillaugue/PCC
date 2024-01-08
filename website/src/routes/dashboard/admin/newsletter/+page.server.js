import { redirect } from '@sveltejs/kit';
import { newsletterRef } from '$lib/server/db.js';
import { sendEmail } from '$lib/server/sendEmail';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
  if (!locals?.user?.isAdmin)
    throw redirect(307, '/auth?redirect=/dashboard/admin/newsletter');

  const subscribers = await newsletterRef
    .find({})
    .project({ _id: 0 })
    .toArray();

  return { subscribers };
}

/** @type {import('./$types').Actions} */
export const actions = {
  sendEmails: async ({ request, locals }) => {
    const formData = Object.fromEntries(await request.formData());
    if (!locals.user)
      return { success: false, formData, message: 'Not logged in!' };
    const { email } = formData;

    const subscriber = await newsletterRef.findOne({ email });
    await newsletterRef.updateOne(
      { email },
      { $set: { sendEmails: !subscriber.sendEmails } }
    );

    return {
      type: 'sendEmails',
      success: true,
      message: 'Updated successfully!',
    };
  },
  newMail: async ({ request, locals }) => {
    const formData = Object.fromEntries(await request.formData());
    if (!locals.user)
      return { success: false, formData, message: 'Not logged in!' };
    const { subject, contents } = formData;
    if (!subject || !contents)
      return { success: false, formData, message: 'Missing data!' };

    const subscribers = await newsletterRef
      .find({ sendEmails: true })
      .project({ _id: 0, email: 1 })
      .toArray();
    const emails = subscribers.map((subscriber) => subscriber.email);
    for (const email of emails) {
      sendEmail({
        subject: subject.replaceAll('{{email}}', email),
        text: contents.replaceAll('{{email}}', email),
        to: email,
      });
    }

    return { type: 'newMail', success: true, message: 'Sent successfully!' };
  },
};
