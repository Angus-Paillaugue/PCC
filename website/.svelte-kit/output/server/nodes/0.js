import * as universal from '../entries/pages/_layout.js';
import * as server from '../entries/pages/_layout.server.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export { server };
export const server_id = "src/routes/+layout.server.js";
export const imports = ["_app/immutable/nodes/0.b9e0fd91.js","_app/immutable/chunks/scheduler.513ec290.js","_app/immutable/chunks/index.639a9d04.js","_app/immutable/chunks/globals.7f7f1b26.js","_app/immutable/chunks/stores.b5e952c7.js","_app/immutable/chunks/singletons.8847648d.js","_app/immutable/chunks/index.24e5d8da.js","_app/immutable/chunks/each.dbf224b2.js","_app/immutable/chunks/stores.4a57f107.js"];
export const stylesheets = ["_app/immutable/assets/0.952b919d.css"];
export const fonts = [];
