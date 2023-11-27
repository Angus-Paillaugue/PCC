import auth from "$lib/server/auth";

export const handle = async ({ event, resolve }) => {
    const { cookies, locals } = event;

    const token = cookies.get('token');
    if(token){
        const user = await auth(token);
        if(!user?.error) {
            locals.user = user;
        }else {
            locals.user = null;
        }
    }

    return resolve(event);
}