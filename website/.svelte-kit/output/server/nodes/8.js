import * as server from '../entries/pages/dashboard/admin/charts/_page.server.js';

export const index = 8;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/dashboard/admin/charts/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/dashboard/admin/charts/+page.server.js";
export const imports = ["_app/immutable/nodes/8.fe3d1e80.js","_app/immutable/chunks/scheduler.513ec290.js","_app/immutable/chunks/each.dbf224b2.js","_app/immutable/chunks/index.639a9d04.js"];
export const stylesheets = [];
export const fonts = [];
