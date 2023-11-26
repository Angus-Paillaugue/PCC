import * as server from '../entries/pages/manage-newsletter/_email_/_page.server.js';

export const index = 12;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/manage-newsletter/_email_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/manage-newsletter/[email]/+page.server.js";
export const imports = ["_app/immutable/nodes/12.1adcfa19.js","_app/immutable/chunks/scheduler.c54fe263.js","_app/immutable/chunks/index.382b5808.js","_app/immutable/chunks/stores.fcd534d1.js","_app/immutable/chunks/index.5fee8f50.js"];
export const stylesheets = [];
export const fonts = [];
