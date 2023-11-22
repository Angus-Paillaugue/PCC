

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.aa56f6d0.js","_app/immutable/chunks/scheduler.e544945c.js","_app/immutable/chunks/index.721f4317.js","_app/immutable/chunks/stores.b71e7555.js","_app/immutable/chunks/singletons.243de02e.js","_app/immutable/chunks/index.107ecb95.js"];
export const stylesheets = [];
export const fonts = [];
