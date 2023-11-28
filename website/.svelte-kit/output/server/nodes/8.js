import * as server from '../entries/pages/dashboard/admin/charts/_page.server.js';

export const index = 8;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/dashboard/admin/charts/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/dashboard/admin/charts/+page.server.js";
export const imports = ["_app/immutable/nodes/8.bf2f383f.js","_app/immutable/chunks/scheduler.2c72f06e.js","_app/immutable/chunks/each.c533f48c.js","_app/immutable/chunks/index.d3a2f505.js"];
export const stylesheets = [];
export const fonts = [];
