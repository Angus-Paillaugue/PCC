import * as universal from '../entries/pages/_layout.js';
import * as server from '../entries/pages/_layout.server.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export { server };
export const server_id = "src/routes/+layout.server.js";
export const imports = ["_app/immutable/nodes/0.87a34407.js","_app/immutable/chunks/scheduler.48e732d9.js","_app/immutable/chunks/index.d806ca90.js","_app/immutable/chunks/globals.7f7f1b26.js","_app/immutable/chunks/stores.501ef267.js","_app/immutable/chunks/singletons.30ceb575.js","_app/immutable/chunks/index.6e2effa4.js","_app/immutable/chunks/Icon.c5b4ca42.js","_app/immutable/chunks/each.7f778bc3.js","_app/immutable/chunks/stores.cc8b6fab.js"];
export const stylesheets = ["_app/immutable/assets/0.8c8ff451.css"];
export const fonts = [];
