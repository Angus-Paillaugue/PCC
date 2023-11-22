

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/contact-us/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.9626cbb6.js","_app/immutable/chunks/scheduler.e544945c.js","_app/immutable/chunks/index.721f4317.js","_app/immutable/chunks/stores.6156cb1e.js","_app/immutable/chunks/index.107ecb95.js","_app/immutable/chunks/copy.65aa4a8b.js"];
export const stylesheets = [];
export const fonts = [];
