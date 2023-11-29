

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/about-us/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.829be680.js","_app/immutable/chunks/scheduler.48e732d9.js","_app/immutable/chunks/index.d806ca90.js","_app/immutable/chunks/each.7f778bc3.js","_app/immutable/chunks/Icon.c5b4ca42.js"];
export const stylesheets = [];
export const fonts = [];
