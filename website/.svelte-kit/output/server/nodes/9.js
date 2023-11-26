import * as server from '../entries/pages/forgot-password/_page.server.js';

export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/forgot-password/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/forgot-password/+page.server.js";
export const imports = ["_app/immutable/nodes/9.c5cc3628.js","_app/immutable/chunks/scheduler.c54fe263.js","_app/immutable/chunks/index.382b5808.js","_app/immutable/chunks/forms.672063bc.js","_app/immutable/chunks/parse.bee59afc.js","_app/immutable/chunks/singletons.7f65aba8.js","_app/immutable/chunks/index.5fee8f50.js"];
export const stylesheets = [];
export const fonts = [];
