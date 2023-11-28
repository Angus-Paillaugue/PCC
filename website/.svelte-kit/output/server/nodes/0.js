import * as universal from '../entries/pages/_layout.js';
import * as server from '../entries/pages/_layout.server.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export { server };
export const server_id = "src/routes/+layout.server.js";
export const imports = ["_app/immutable/nodes/0.d43fcd63.js","_app/immutable/chunks/scheduler.2c72f06e.js","_app/immutable/chunks/index.d3a2f505.js","_app/immutable/chunks/globals.7f7f1b26.js","_app/immutable/chunks/stores.3e21ff79.js","_app/immutable/chunks/singletons.4ba7984f.js","_app/immutable/chunks/index.531e6357.js","_app/immutable/chunks/each.c533f48c.js","_app/immutable/chunks/stores.b37ca69a.js"];
export const stylesheets = ["_app/immutable/assets/0.a1aaf0a5.css"];
export const fonts = [];
