import * as server from '../entries/pages/dashboard/_page.server.js';

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/dashboard/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/dashboard/+page.server.js";
export const imports = ["_app/immutable/nodes/6.1595e8c3.js","_app/immutable/chunks/scheduler.e544945c.js","_app/immutable/chunks/index.721f4317.js"];
export const stylesheets = [];
export const fonts = [];
