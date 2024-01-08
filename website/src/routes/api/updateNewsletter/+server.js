import { newsletterRef } from '$lib/server/db';

export async function POST({ request }) {
  try {
    const { settings } = await request.json();
    const { email, sendEmails } = settings;

    await newsletterRef.updateOne({ email }, { $set: { sendEmails } });

    return new Response(JSON.stringify({ message: 'Updated successfully!' }));
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
