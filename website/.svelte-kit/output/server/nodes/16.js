import * as server from '../entries/pages/reset-password/_UUID_/_page.server.js';

export const index = 16;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/reset-password/_UUID_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/reset-password/[UUID]/+page.server.js";
export const imports = ["_app/immutable/nodes/16.1afabf19.js","_app/immutable/chunks/scheduler.c54fe263.js","_app/immutable/chunks/index.382b5808.js","_app/immutable/chunks/forms.672063bc.js","_app/immutable/chunks/parse.bee59afc.js","_app/immutable/chunks/singletons.7f65aba8.js","_app/immutable/chunks/index.5fee8f50.js"];
export const stylesheets = [];
export const fonts = [];
