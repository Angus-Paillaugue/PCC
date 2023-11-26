import * as server from '../entries/pages/payment/_page.server.js';

export const index = 15;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/payment/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/payment/+page.server.js";
export const imports = ["_app/immutable/nodes/15.4f506f1d.js","_app/immutable/chunks/scheduler.513ec290.js","_app/immutable/chunks/index.639a9d04.js"];
export const stylesheets = [];
export const fonts = [];
