

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/about-us/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.8fa8d8c4.js","_app/immutable/chunks/scheduler.e544945c.js","_app/immutable/chunks/each.2fe1c5ed.js","_app/immutable/chunks/index.721f4317.js"];
export const stylesheets = [];
export const fonts = [];
