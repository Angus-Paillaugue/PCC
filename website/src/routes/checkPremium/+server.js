/** @type {import('./$types').RequestHandler} */
export async function POST() {
  // This rout is only here for < 2.1.0 versions of the extension
  // that still require authenticating and premium checking
  return new Response(JSON.stringify({ isPremium: true }));
}
