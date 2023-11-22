import * as universal from '../entries/pages/_layout.js';
import * as server from '../entries/pages/_layout.server.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export { server };
export const server_id = "src/routes/+layout.server.js";
export const imports = ["_app/immutable/nodes/0.fc3012fe.js","_app/immutable/chunks/scheduler.e544945c.js","_app/immutable/chunks/index.721f4317.js","_app/immutable/chunks/globals.7f7f1b26.js","_app/immutable/chunks/stores.b71e7555.js","_app/immutable/chunks/singletons.243de02e.js","_app/immutable/chunks/index.107ecb95.js","_app/immutable/chunks/each.2fe1c5ed.js","_app/immutable/chunks/stores.6156cb1e.js"];
export const stylesheets = ["_app/immutable/assets/0.28cbf0e0.css"];
export const fonts = [];
