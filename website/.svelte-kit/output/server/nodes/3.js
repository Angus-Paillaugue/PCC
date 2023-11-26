

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/about-us/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.9f8f315c.js","_app/immutable/chunks/scheduler.513ec290.js","_app/immutable/chunks/each.dbf224b2.js","_app/immutable/chunks/index.639a9d04.js"];
export const stylesheets = [];
export const fonts = [];
