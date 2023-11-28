

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.fb5ba81a.js","_app/immutable/chunks/scheduler.2c72f06e.js","_app/immutable/chunks/index.d3a2f505.js","_app/immutable/chunks/stores.3e21ff79.js","_app/immutable/chunks/singletons.4ba7984f.js","_app/immutable/chunks/index.531e6357.js"];
export const stylesheets = [];
export const fonts = [];
