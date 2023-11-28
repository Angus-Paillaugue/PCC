import * as server from '../entries/pages/manage-newsletter/_email_/_page.server.js';

export const index = 14;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/manage-newsletter/_email_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/manage-newsletter/[email]/+page.server.js";
export const imports = ["_app/immutable/nodes/14.8215b8f6.js","_app/immutable/chunks/scheduler.2c72f06e.js","_app/immutable/chunks/index.d3a2f505.js","_app/immutable/chunks/stores.b37ca69a.js","_app/immutable/chunks/index.531e6357.js"];
export const stylesheets = [];
export const fonts = [];
