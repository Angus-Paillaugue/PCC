import * as server from '../entries/pages/payment/_page.server.js';

export const index = 15;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/payment/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/payment/+page.server.js";
export const imports = ["_app/immutable/nodes/15.a587ea82.js","_app/immutable/chunks/scheduler.48e732d9.js","_app/immutable/chunks/index.d806ca90.js","_app/immutable/chunks/Alert.91e35944.js","_app/immutable/chunks/bundle-mjs.312aa90d.js","_app/immutable/chunks/Icon.c5b4ca42.js","_app/immutable/chunks/Spinner.da9fd2c5.js"];
export const stylesheets = [];
export const fonts = [];
