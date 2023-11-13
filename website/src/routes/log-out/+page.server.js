import { redirect } from "@sveltejs/kit";

export const ssr = false;

export const load = (({ cookies, url, locals }) => {
    cookies.delete("token");
    locals.user = null;

    if(url.searchParams.get("redirect")){
        throw redirect(307, url.searchParams.get("redirect"));
    }else{
        throw redirect(307, '/');
    }
});