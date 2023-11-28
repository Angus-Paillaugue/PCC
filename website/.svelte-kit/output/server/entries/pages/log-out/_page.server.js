import { r as redirect } from "../../../chunks/index.js";
const ssr = false;
const load = ({ cookies, url, locals }) => {
  cookies.delete("token");
  locals.user = null;
  if (url.searchParams.get("redirect")) {
    throw redirect(307, url.searchParams.get("redirect"));
  } else {
    throw redirect(307, "/");
  }
};
export {
  load,
  ssr
};
