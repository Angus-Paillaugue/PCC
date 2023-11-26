import * as server from '../entries/pages/dashboard/admin/charts/_page.server.js';

export const index = 8;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/dashboard/admin/charts/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/dashboard/admin/charts/+page.server.js";
export const imports = ["_app/immutable/nodes/8.20b02380.js","_app/immutable/chunks/scheduler.c54fe263.js","_app/immutable/chunks/each.d996bcbb.js","_app/immutable/chunks/index.382b5808.js"];
export const stylesheets = [];
export const fonts = [];
