import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.DNEJlGH1.js","_app/immutable/chunks/DIK4KL6K.js","_app/immutable/chunks/DXLwiZ0H.js","_app/immutable/chunks/BbqLvb0n.js","_app/immutable/chunks/C5A2Bbc5.js"];
export const stylesheets = ["_app/immutable/assets/0.BerxxB5Q.css"];
export const fonts = [];
