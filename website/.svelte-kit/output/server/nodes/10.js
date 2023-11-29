import * as server from '../entries/pages/dashboard/settings/_page.server.js';

export const index = 10;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/dashboard/settings/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/dashboard/settings/+page.server.js";
export const imports = ["_app/immutable/nodes/10.ff7ca482.js","_app/immutable/chunks/scheduler.48e732d9.js","_app/immutable/chunks/index.d806ca90.js","_app/immutable/chunks/forms.e3321b62.js","_app/immutable/chunks/parse.bee59afc.js","_app/immutable/chunks/singletons.30ceb575.js","_app/immutable/chunks/index.6e2effa4.js","_app/immutable/chunks/stores.cc8b6fab.js","_app/immutable/chunks/Modal.f9da1938.js","_app/immutable/chunks/Icon.c5b4ca42.js","_app/immutable/chunks/Card.33695d8a.js","_app/immutable/chunks/bundle-mjs.312aa90d.js","_app/immutable/chunks/Alert.91e35944.js","_app/immutable/chunks/TextInput.aba2b0c1.js","_app/immutable/chunks/Spinner.da9fd2c5.js"];
export const stylesheets = [];
export const fonts = [];
