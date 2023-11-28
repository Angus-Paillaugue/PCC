import * as server from '../entries/pages/dashboard/admin/_page.server.js';

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/dashboard/admin/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/dashboard/admin/+page.server.js";
export const imports = ["_app/immutable/nodes/7.bb4f3dd4.js","_app/immutable/chunks/scheduler.2c72f06e.js","_app/immutable/chunks/index.d3a2f505.js","_app/immutable/chunks/globals.7f7f1b26.js","_app/immutable/chunks/each.c533f48c.js","_app/immutable/chunks/stores.b37ca69a.js","_app/immutable/chunks/index.531e6357.js","_app/immutable/chunks/copy.65aa4a8b.js","_app/immutable/chunks/Modal.ab723866.js"];
export const stylesheets = [];
export const fonts = [];
