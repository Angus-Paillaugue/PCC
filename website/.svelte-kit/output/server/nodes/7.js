import * as server from '../entries/pages/dashboard/admin/_page.server.js';

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/dashboard/admin/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/dashboard/admin/+page.server.js";
export const imports = ["_app/immutable/nodes/7.6213a60a.js","_app/immutable/chunks/scheduler.e544945c.js","_app/immutable/chunks/globals.7f7f1b26.js","_app/immutable/chunks/each.2fe1c5ed.js","_app/immutable/chunks/index.721f4317.js","_app/immutable/chunks/stores.6156cb1e.js","_app/immutable/chunks/index.107ecb95.js"];
export const stylesheets = [];
export const fonts = [];
