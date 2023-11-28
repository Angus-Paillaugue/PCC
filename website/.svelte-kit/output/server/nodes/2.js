import * as server from '../entries/pages/_page.server.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.js";
export const imports = ["_app/immutable/nodes/2.03852706.js","_app/immutable/chunks/scheduler.2c72f06e.js","_app/immutable/chunks/index.d3a2f505.js","_app/immutable/chunks/each.c533f48c.js","_app/immutable/chunks/index.e1ee2182.js","_app/immutable/chunks/forms.eb2f0641.js","_app/immutable/chunks/parse.bee59afc.js","_app/immutable/chunks/singletons.bf7d3c8c.js","_app/immutable/chunks/index.531e6357.js"];
export const stylesheets = [];
export const fonts = [];
