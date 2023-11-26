import * as server from '../entries/pages/dashboard/admin/_page.server.js';

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/dashboard/admin/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/dashboard/admin/+page.server.js";
export const imports = ["_app/immutable/nodes/7.09a0799d.js","_app/immutable/chunks/scheduler.c54fe263.js","_app/immutable/chunks/globals.7f7f1b26.js","_app/immutable/chunks/each.d996bcbb.js","_app/immutable/chunks/index.382b5808.js","_app/immutable/chunks/stores.fcd534d1.js","_app/immutable/chunks/index.5fee8f50.js"];
export const stylesheets = [];
export const fonts = [];
