import * as server from '../entries/pages/help/_page.server.js';

export const index = 12;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/help/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/help/+page.server.js";
export const imports = ["_app/immutable/nodes/12.ee57b692.js","_app/immutable/chunks/scheduler.513ec290.js","_app/immutable/chunks/index.639a9d04.js","_app/immutable/chunks/globals.7f7f1b26.js","_app/immutable/chunks/each.dbf224b2.js","_app/immutable/chunks/index.8782b032.js","_app/immutable/chunks/forms.e3776c60.js","_app/immutable/chunks/parse.bee59afc.js","_app/immutable/chunks/singletons.8847648d.js","_app/immutable/chunks/index.24e5d8da.js","_app/immutable/chunks/stores.4a57f107.js","_app/immutable/chunks/copy.65aa4a8b.js","_app/immutable/chunks/Modal.56980f8f.js"];
export const stylesheets = [];
export const fonts = [];
