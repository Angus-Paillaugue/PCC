import * as server from '../entries/pages/forgot-password/_page.server.js';

export const index = 11;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/forgot-password/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/forgot-password/+page.server.js";
export const imports = ["_app/immutable/nodes/11.4d429cd4.js","_app/immutable/chunks/scheduler.2c72f06e.js","_app/immutable/chunks/index.d3a2f505.js","_app/immutable/chunks/forms.8db8bfb8.js","_app/immutable/chunks/parse.bee59afc.js","_app/immutable/chunks/singletons.4ba7984f.js","_app/immutable/chunks/index.531e6357.js"];
export const stylesheets = [];
export const fonts = [];
