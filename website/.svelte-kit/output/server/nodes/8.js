import * as server from '../entries/pages/dashboard/admin/charts/_page.server.js';

export const index = 8;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/dashboard/admin/charts/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/dashboard/admin/charts/+page.server.js";
export const imports = ["_app/immutable/nodes/8.bede983d.js","_app/immutable/chunks/scheduler.48e732d9.js","_app/immutable/chunks/index.d806ca90.js","_app/immutable/chunks/each.7f778bc3.js","_app/immutable/chunks/Card.33695d8a.js","_app/immutable/chunks/bundle-mjs.312aa90d.js","_app/immutable/chunks/TextInput.aba2b0c1.js","_app/immutable/chunks/Icon.c5b4ca42.js"];
export const stylesheets = [];
export const fonts = [];
