import { u as usersRef, q as questionsRef } from "../../../../chunks/db.js";
async function DELETE({ locals, request }) {
  if (!locals?.user?.isAdmin)
    return new Response(JSON.stringify({ error: "You are not authorized to do this." }), { status: 403 });
  try {
    const userData = await request.json();
    const { id } = userData;
    await usersRef.deleteOne({ id });
    await questionsRef.deleteMany({ postedBy: id });
    await questionsRef.updateMany({}, { $pull: { replies: { postedBy: id } } });
    return new Response(JSON.stringify({ message: "User deleted successfully!" }));
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
export {
  DELETE
};
