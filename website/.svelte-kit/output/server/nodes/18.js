import * as server from '../entries/pages/reset-password/_UUID_/_page.server.js';

export const index = 18;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/reset-password/_UUID_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/reset-password/[UUID]/+page.server.js";
export const imports = ["_app/immutable/nodes/18.a6ca4af7.js","_app/immutable/chunks/scheduler.513ec290.js","_app/immutable/chunks/index.639a9d04.js","_app/immutable/chunks/forms.e3776c60.js","_app/immutable/chunks/parse.bee59afc.js","_app/immutable/chunks/singletons.8847648d.js","_app/immutable/chunks/index.24e5d8da.js"];
export const stylesheets = [];
export const fonts = [];
