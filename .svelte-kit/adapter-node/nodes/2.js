

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.C_Y8lPYA.js","_app/immutable/chunks/CFYHNyQs.js","_app/immutable/chunks/DEDqjojZ.js","_app/immutable/chunks/C47EQ4Ld.js"];
export const stylesheets = ["_app/immutable/assets/2.BP__v1rU.css"];
export const fonts = [];
