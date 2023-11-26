import * as universal from '../entries/pages/_layout.js';
import * as server from '../entries/pages/_layout.server.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export { server };
export const server_id = "src/routes/+layout.server.js";
export const imports = ["_app/immutable/nodes/0.705e9e64.js","_app/immutable/chunks/scheduler.c54fe263.js","_app/immutable/chunks/index.382b5808.js","_app/immutable/chunks/globals.7f7f1b26.js","_app/immutable/chunks/stores.a1580d55.js","_app/immutable/chunks/singletons.7f65aba8.js","_app/immutable/chunks/index.5fee8f50.js","_app/immutable/chunks/each.d996bcbb.js","_app/immutable/chunks/stores.fcd534d1.js"];
export const stylesheets = ["_app/immutable/assets/0.6e40d141.css"];
export const fonts = [];
