import { s as head } from "../../chunks/index-server.js";
import "../../chunks/index-server2.js";
import "../../chunks/stores.js";
import "lenis";
//#region src/routes/+layout.svelte
function _layout($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { children } = $$props;
		head("12qhfyh", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>M&amp;M Studio — Umbraco Development &amp; SEO</title>`);
			});
			$$renderer.push(`<link rel="preconnect" href="https://fonts.googleapis.com"/> <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin=""/> <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;700;800&amp;family=Outfit:wght@300;400;500;600&amp;display=swap" rel="stylesheet"/>`);
		});
		children($$renderer);
		$$renderer.push(`<!---->`);
	});
}
//#endregion
export { _layout as default };
