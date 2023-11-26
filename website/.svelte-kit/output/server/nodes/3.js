

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/about-us/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.38e6bdd1.js","_app/immutable/chunks/scheduler.c54fe263.js","_app/immutable/chunks/each.d996bcbb.js","_app/immutable/chunks/index.382b5808.js"];
export const stylesheets = [];
export const fonts = [];
