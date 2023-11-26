import * as server from '../entries/pages/help/_page.server.js';

export const index = 10;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/help/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/help/+page.server.js";
export const imports = ["_app/immutable/nodes/10.d4c1fd8b.js","_app/immutable/chunks/scheduler.c54fe263.js","_app/immutable/chunks/index.382b5808.js","_app/immutable/chunks/globals.7f7f1b26.js","_app/immutable/chunks/each.d996bcbb.js","_app/immutable/chunks/index.eb37037f.js","_app/immutable/chunks/forms.672063bc.js","_app/immutable/chunks/parse.bee59afc.js","_app/immutable/chunks/singletons.7f65aba8.js","_app/immutable/chunks/index.5fee8f50.js","_app/immutable/chunks/stores.fcd534d1.js","_app/immutable/chunks/copy.65aa4a8b.js"];
export const stylesheets = [];
export const fonts = [];
