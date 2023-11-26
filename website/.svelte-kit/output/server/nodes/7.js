import * as server from '../entries/pages/dashboard/admin/_page.server.js';

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/dashboard/admin/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/dashboard/admin/+page.server.js";
export const imports = ["_app/immutable/nodes/7.9d2ecefc.js","_app/immutable/chunks/scheduler.513ec290.js","_app/immutable/chunks/index.639a9d04.js","_app/immutable/chunks/globals.7f7f1b26.js","_app/immutable/chunks/each.dbf224b2.js","_app/immutable/chunks/stores.4a57f107.js","_app/immutable/chunks/index.24e5d8da.js","_app/immutable/chunks/Modal.56980f8f.js"];
export const stylesheets = [];
export const fonts = [];
