

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/contact-us/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.c7e92c9a.js","_app/immutable/chunks/scheduler.513ec290.js","_app/immutable/chunks/index.639a9d04.js","_app/immutable/chunks/stores.4a57f107.js","_app/immutable/chunks/index.24e5d8da.js","_app/immutable/chunks/copy.65aa4a8b.js"];
export const stylesheets = [];
export const fonts = [];
