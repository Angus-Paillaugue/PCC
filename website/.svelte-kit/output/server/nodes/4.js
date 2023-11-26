import * as server from '../entries/pages/auth/_page.server.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/auth/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/auth/+page.server.js";
export const imports = ["_app/immutable/nodes/4.89dd79c9.js","_app/immutable/chunks/scheduler.c54fe263.js","_app/immutable/chunks/globals.7f7f1b26.js","_app/immutable/chunks/index.382b5808.js","_app/immutable/chunks/forms.672063bc.js","_app/immutable/chunks/parse.bee59afc.js","_app/immutable/chunks/singletons.7f65aba8.js","_app/immutable/chunks/index.5fee8f50.js"];
export const stylesheets = [];
export const fonts = [];
