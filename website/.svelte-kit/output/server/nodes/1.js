

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.daf78a73.js","_app/immutable/chunks/scheduler.48e732d9.js","_app/immutable/chunks/index.d806ca90.js","_app/immutable/chunks/stores.501ef267.js","_app/immutable/chunks/singletons.30ceb575.js","_app/immutable/chunks/index.6e2effa4.js"];
export const stylesheets = [];
export const fonts = [];
