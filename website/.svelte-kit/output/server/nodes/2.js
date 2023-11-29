import * as server from '../entries/pages/_page.server.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.js";
export const imports = ["_app/immutable/nodes/2.dbc62f5e.js","_app/immutable/chunks/scheduler.48e732d9.js","_app/immutable/chunks/index.d806ca90.js","_app/immutable/chunks/each.7f778bc3.js","_app/immutable/chunks/forms.e3321b62.js","_app/immutable/chunks/parse.bee59afc.js","_app/immutable/chunks/singletons.30ceb575.js","_app/immutable/chunks/index.6e2effa4.js","_app/immutable/chunks/Card.33695d8a.js","_app/immutable/chunks/bundle-mjs.312aa90d.js","_app/immutable/chunks/Alert.91e35944.js","_app/immutable/chunks/Icon.c5b4ca42.js","_app/immutable/chunks/TextInput.aba2b0c1.js"];
export const stylesheets = [];
export const fonts = [];
