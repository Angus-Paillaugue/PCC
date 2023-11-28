import * as server from '../entries/pages/dashboard/admin/newsletter/_page.server.js';

export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/dashboard/admin/newsletter/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/dashboard/admin/newsletter/+page.server.js";
export const imports = ["_app/immutable/nodes/9.beb8a4f3.js","_app/immutable/chunks/scheduler.2c72f06e.js","_app/immutable/chunks/index.d3a2f505.js","_app/immutable/chunks/each.c533f48c.js","_app/immutable/chunks/forms.eb2f0641.js","_app/immutable/chunks/parse.bee59afc.js","_app/immutable/chunks/singletons.bf7d3c8c.js","_app/immutable/chunks/index.531e6357.js","_app/immutable/chunks/stores.b37ca69a.js","_app/immutable/chunks/Modal.ab723866.js"];
export const stylesheets = [];
export const fonts = [];
