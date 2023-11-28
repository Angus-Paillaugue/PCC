

export const index = 16;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/pricing/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/16.303b1a9a.js","_app/immutable/chunks/scheduler.513ec290.js","_app/immutable/chunks/index.639a9d04.js"];
export const stylesheets = [];
export const fonts = [];
