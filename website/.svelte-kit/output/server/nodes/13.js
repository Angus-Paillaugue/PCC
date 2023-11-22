import * as server from '../entries/pages/payment/_page.server.js';

export const index = 13;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/payment/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/payment/+page.server.js";
export const imports = ["_app/immutable/nodes/13.973dc691.js","_app/immutable/chunks/scheduler.e544945c.js","_app/immutable/chunks/index.721f4317.js"];
export const stylesheets = [];
export const fonts = [];
