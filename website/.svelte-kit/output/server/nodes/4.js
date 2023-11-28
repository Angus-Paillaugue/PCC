import * as server from '../entries/pages/auth/_page.server.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/auth/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/auth/+page.server.js";
export const imports = ["_app/immutable/nodes/4.2511b4d3.js","_app/immutable/chunks/scheduler.2c72f06e.js","_app/immutable/chunks/globals.7f7f1b26.js","_app/immutable/chunks/index.d3a2f505.js","_app/immutable/chunks/forms.eb2f0641.js","_app/immutable/chunks/parse.bee59afc.js","_app/immutable/chunks/singletons.bf7d3c8c.js","_app/immutable/chunks/index.531e6357.js"];
export const stylesheets = [];
export const fonts = [];
