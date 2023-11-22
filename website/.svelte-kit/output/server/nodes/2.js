import * as server from '../entries/pages/_page.server.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.js";
export const imports = ["_app/immutable/nodes/2.0ea798c9.js","_app/immutable/chunks/scheduler.e544945c.js","_app/immutable/chunks/index.721f4317.js","_app/immutable/chunks/each.2fe1c5ed.js","_app/immutable/chunks/index.078f9b3d.js","_app/immutable/chunks/forms.eea5795d.js","_app/immutable/chunks/parse.bee59afc.js","_app/immutable/chunks/singletons.243de02e.js","_app/immutable/chunks/index.107ecb95.js"];
export const stylesheets = [];
export const fonts = [];
