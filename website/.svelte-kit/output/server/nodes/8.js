import * as server from '../entries/pages/dashboard/admin/charts/_page.server.js';

export const index = 8;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/dashboard/admin/charts/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/dashboard/admin/charts/+page.server.js";
export const imports = ["_app/immutable/nodes/8.61b441ad.js","_app/immutable/chunks/scheduler.e544945c.js","_app/immutable/chunks/each.2fe1c5ed.js","_app/immutable/chunks/index.721f4317.js"];
export const stylesheets = [];
export const fonts = [];
