import * as server from '../entries/pages/manage-newsletter/_email_/_page.server.js';

export const index = 12;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/manage-newsletter/_email_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/manage-newsletter/[email]/+page.server.js";
export const imports = ["_app/immutable/nodes/12.f7091c0d.js","_app/immutable/chunks/scheduler.e544945c.js","_app/immutable/chunks/index.721f4317.js","_app/immutable/chunks/stores.6156cb1e.js","_app/immutable/chunks/index.107ecb95.js"];
export const stylesheets = [];
export const fonts = [];
