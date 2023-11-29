import * as server from '../entries/pages/dashboard/_page.server.js';

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/dashboard/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/dashboard/+page.server.js";
export const imports = ["_app/immutable/nodes/6.ce6e725a.js","_app/immutable/chunks/scheduler.48e732d9.js","_app/immutable/chunks/index.d806ca90.js","_app/immutable/chunks/Icon.c5b4ca42.js"];
export const stylesheets = [];
export const fonts = [];
