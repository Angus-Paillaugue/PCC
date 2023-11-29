

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/about-us/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.bc264031.js","_app/immutable/chunks/scheduler.2c72f06e.js","_app/immutable/chunks/each.c533f48c.js","_app/immutable/chunks/index.d3a2f505.js"];
export const stylesheets = [];
export const fonts = [];
