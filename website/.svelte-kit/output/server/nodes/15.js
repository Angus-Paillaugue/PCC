import * as server from '../entries/pages/payment/_page.server.js';

export const index = 15;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/payment/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/payment/+page.server.js";
export const imports = ["_app/immutable/nodes/15.07507a56.js","_app/immutable/chunks/scheduler.2c72f06e.js","_app/immutable/chunks/index.d3a2f505.js"];
export const stylesheets = [];
export const fonts = [];
