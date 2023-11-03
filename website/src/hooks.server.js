import auth from "$lib/server/auth";

export const handle = async ({ event, resolve }) => {
    const { url, cookies, locals } = event;

    const token = cookies.get('token');
    if(!token || !locals.user) {
        if(token){
            const user = await auth(token);
            if(!user?.error) {
                locals.user = user;
            }else {
                cookies.delete("token");
            }
        }
    }
    
    if(!url.pathname === "/" && !locals.user){
        cookies.delete("token");
    }

    return resolve(event);
}