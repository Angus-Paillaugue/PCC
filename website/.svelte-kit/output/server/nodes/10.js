import * as server from '../entries/pages/dashboard/settings/_page.server.js';

export const index = 10;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/dashboard/settings/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/dashboard/settings/+page.server.js";
export const imports = ["_app/immutable/nodes/10.9efaa445.js","_app/immutable/chunks/scheduler.513ec290.js","_app/immutable/chunks/index.639a9d04.js","_app/immutable/chunks/forms.e3776c60.js","_app/immutable/chunks/parse.bee59afc.js","_app/immutable/chunks/singletons.8847648d.js","_app/immutable/chunks/index.24e5d8da.js","_app/immutable/chunks/stores.4a57f107.js","_app/immutable/chunks/Modal.56980f8f.js"];
export const stylesheets = [];
export const fonts = [];
