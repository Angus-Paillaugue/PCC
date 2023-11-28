import * as server from '../entries/pages/forgot-password/_page.server.js';

export const index = 11;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/forgot-password/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/forgot-password/+page.server.js";
export const imports = ["_app/immutable/nodes/11.ff553a5a.js","_app/immutable/chunks/scheduler.513ec290.js","_app/immutable/chunks/index.639a9d04.js","_app/immutable/chunks/forms.e3776c60.js","_app/immutable/chunks/parse.bee59afc.js","_app/immutable/chunks/singletons.8847648d.js","_app/immutable/chunks/index.24e5d8da.js"];
export const stylesheets = [];
export const fonts = [];
