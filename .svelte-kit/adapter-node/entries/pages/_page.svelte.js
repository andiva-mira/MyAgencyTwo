import { i as attr_style, l as stringify, m as escape_html, o as ensure_array_like, p as attr, r as attr_class, u as html } from "../../chunks/index-server.js";
import "three";
//#region src/lib/Navbar.svelte
function Navbar($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let scrolled = false;
		let menuOpen = false;
		$$renderer.push(`<header${attr_class("svelte-11lpkcp", void 0, { "scrolled": scrolled })}><div class="inner svelte-11lpkcp"><a class="brand svelte-11lpkcp" href="#hero"><svg width="44" height="30" viewBox="0 0 44 30" fill="none" aria-hidden="true"><path d="M2 28 L12 4 L22 28" stroke="var(--text)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M16 28 L26 4 L36 28" stroke="var(--accent)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"></path></svg> <span class="svelte-11lpkcp">Studio</span></a> <nav${attr_class("nav-links svelte-11lpkcp", void 0, { "open": menuOpen })}><a href="#services" class="svelte-11lpkcp">Services</a> <a href="#why-us" class="svelte-11lpkcp">Why Us</a> <a href="#quote" class="btn btn-primary nav-cta svelte-11lpkcp">Get a Quote <svg class="icon" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8h10M9 4l4 4-4 4"></path></svg></a></nav> <div class="controls svelte-11lpkcp"><button class="icon-btn svelte-11lpkcp" aria-label="Toggle theme">`);
		$$renderer.push("<!--[0-->");
		$$renderer.push(`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"></path></svg>`);
		$$renderer.push(`<!--]--></button> <button class="hamburger svelte-11lpkcp" aria-label="Menu"><span${attr_class("svelte-11lpkcp", void 0, { "x": menuOpen })}></span> <span${attr_class("svelte-11lpkcp", void 0, { "x": menuOpen })}></span> <span${attr_class("svelte-11lpkcp", void 0, { "x": menuOpen })}></span></button></div></div></header>`);
	});
}
//#endregion
//#region src/lib/Hero.svelte
function Hero($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let glowX = -9999;
		let glowY = -9999;
		let glowActive = false;
		let targetX = -9999;
		let targetY = -9999;
		let pNX = 0;
		let pNY = 0;
		let pGemNX = 0;
		let pGemNY = 0;
		let pTargetNX = 0;
		let pTargetNY = 0;
		function lerp(a, b, t) {
			return a + (b - a) * t;
		}
		function tick() {
			glowX = lerp(glowX, targetX, .08);
			glowY = lerp(glowY, targetY, .08);
			pNX = lerp(pNX, pTargetNX, .07);
			pNY = lerp(pNY, pTargetNY, .07);
			pGemNX = lerp(pGemNX, pTargetNX, .04);
			pGemNY = lerp(pGemNY, pTargetNY, .04);
			requestAnimationFrame(tick);
		}
		$$renderer.push(`<section id="hero" class="hero svelte-qzo0r3" role="region" aria-label="Hero"><div class="hero-mouse-area svelte-qzo0r3" aria-hidden="true"><div${attr_class("glow-follower svelte-qzo0r3", void 0, { "glow-active": glowActive })}${attr_style(`left:${stringify(glowX)}px; top:${stringify(glowY)}px;`)}></div></div> <div class="gem-wrap svelte-qzo0r3" aria-hidden="true"><canvas class="gem-canvas svelte-qzo0r3"></canvas></div> <div class="hero-inner svelte-qzo0r3"><div class="hero-left svelte-qzo0r3"><div class="section-label svelte-qzo0r3">Umbraco Development &amp; SEO</div> <h1 class="hero-heading svelte-qzo0r3"><span class="line svelte-qzo0r3">Web</span> <span class="line accent-word svelte-qzo0r3">Development</span></h1> <p class="hero-tagline svelte-qzo0r3">Web that Performs.</p></div> <div class="hero-right svelte-qzo0r3"><p class="hero-body svelte-qzo0r3">We design, build, and rank <strong class="svelte-qzo0r3">fast, scalable websites</strong> on Umbraco
        CMS — hosted on Umbraco Cloud, and optimised for position one.</p> <div class="cta-row svelte-qzo0r3"><a href="#quote" class="btn btn-primary svelte-qzo0r3">Start a Project <svg class="icon svelte-qzo0r3" width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8h10M9 4l4 4-4 4" class="svelte-qzo0r3"></path></svg></a> <a href="#services" class="btn btn-outline svelte-qzo0r3">See Services <svg class="icon svelte-qzo0r3" width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3v10M4 9l4 4 4-4" class="svelte-qzo0r3"></path></svg></a></div></div></div> <div class="scroll-hint svelte-qzo0r3" aria-hidden="true"><span class="svelte-qzo0r3">Scroll</span> <svg width="1" height="40" viewBox="0 0 1 40" fill="none" class="svelte-qzo0r3"><line x1="0.5" y1="0" x2="0.5" y2="40" stroke="var(--accent)" stroke-width="1" stroke-dasharray="4 4" class="svelte-qzo0r3"><animate attributeName="stroke-dashoffset" from="0" to="16" dur="1s" repeatCount="indefinite" class="svelte-qzo0r3"></animate></line></svg></div></section>`);
	});
}
//#endregion
//#region src/lib/Services.svelte
function Services($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let vb = "-76 -76 1276 812";
		let bW = 1200;
		let bH = 660;
		const services = [
			{
				id: "dev",
				label: "01",
				title: "Custom Umbraco Development",
				desc: "Architected from the ground up. Clean .NET code, structured content models, and a CMS editors actually enjoy using.",
				icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
        <line x1="12" y1="2" x2="12" y2="22" opacity="0.4"/>
      </svg>`
			},
			{
				id: "seo",
				label: "02",
				title: "SEO Optimisation",
				desc: "Technical SEO baked into every build. Fast pages, clean semantics, structured data, and content architecture that ranks.",
				icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        <path d="M8 11h6M11 8v6" opacity="0.5"/>
      </svg>`
			},
			{
				id: "cloud",
				label: "03",
				title: "Umbraco Cloud",
				desc: "Git-based deployments, managed hosting, auto-upgrades. We set it all up.",
				icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
      </svg>`
			},
			{
				id: "design",
				label: "04",
				title: "UX & UI Design",
				desc: "Interfaces built for conversion — clear hierarchy, purposeful motion, and editors who never need to call support.",
				icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>
      </svg>`
			},
			{
				id: "perf",
				label: "05",
				title: "Performance Audits",
				desc: "Core Web Vitals, image optimisation, caching strategy. We make slow sites fast.",
				icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <path d="m13 2-2 6.9H7l5.9 4.3-2.4 6.8L16 15.4l5.9 4.3-2-6.3L22 8l-4 .1Z"/>
      </svg>`
			},
			{
				id: "migrate",
				label: "06",
				title: "CMS Migrations",
				desc: "Moving from WordPress, Sitecore, or a custom build? We migrate cleanly — content, media, and all.",
				icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/>
        <path d="M21 3v5h-5"/>
      </svg>`
			}
		];
		$$renderer.push(`<section id="services" class="section-wrap services svelte-6t9lhf"><svg class="section-bg svelte-6t9lhf" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="svc-dots" width="36" height="36" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="0.9" fill="var(--accent)" opacity="0.12"></circle></pattern></defs><rect width="100%" height="100%" fill="url(#svc-dots)"></rect></svg> <div class="inner svelte-6t9lhf"><div class="heading-row svelte-6t9lhf"><div class="section-label">What We Build</div> <h2 class="section-h2 svelte-6t9lhf">Six ways we<br/>move the needle.</h2></div> <div class="svc-grid svelte-6t9lhf"><svg class="pipe-bg svelte-6t9lhf"${attr("viewBox", vb)} preserveAspectRatio="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="var(--accent)" stroke-linecap="round" stroke-linejoin="round" stroke-width="14" opacity="0.06"><path d="M293,-60 L293,185 A40,40,0,0,0,333,225 L867,225 A40,40,0,0,1,907,265 L907,410 A40,40,0,0,1,867,450 L333,450 A40,40,0,0,0,293,490 L293,720"></path><path d="M907,-60 L907,265"></path><path d="M-60,450 L600,450"></path><path d="M600,450 L600,720"></path><path${attr("d", `M${stringify(bW - 30)},-60 L${stringify(bW - 30)},${stringify(bH + 60)}`)}></path><path${attr("d", `M${stringify(bW * .7)},-60 L${stringify(bW * .7)},${stringify(bH + 60)}`)}></path></g><g fill="none" stroke="var(--accent)" stroke-linecap="round" stroke-linejoin="round" stroke-width="6" opacity="0.22"><path d="M293,-60 L293,185 A40,40,0,0,0,333,225 L867,225 A40,40,0,0,1,907,265 L907,410 A40,40,0,0,1,867,450 L333,450 A40,40,0,0,0,293,490 L293,720"></path><path d="M907,-60 L907,265"></path><path d="M-60,450 L600,450"></path><path d="M600,450 L600,720"></path><path${attr("d", `M${stringify(bW - 30)},-60 L${stringify(bW - 30)},${stringify(bH + 60)}`)}></path><path${attr("d", `M${stringify(bW * .7)},-60 L${stringify(bW * .7)},${stringify(bH + 60)}`)}></path></g><g fill="none" stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" opacity="0.10"><path d="M293,-60 L293,185 A40,40,0,0,0,333,225 L867,225 A40,40,0,0,1,907,265 L907,410 A40,40,0,0,1,867,450 L333,450 A40,40,0,0,0,293,490 L293,720"></path><path d="M907,-60 L907,265"></path><path d="M-60,450 L600,450"></path><path d="M600,450 L600,720"></path><path${attr("d", `M${stringify(bW - 30)},-60 L${stringify(bW - 30)},${stringify(bH + 60)}`)}></path><path${attr("d", `M${stringify(bW * .7)},-60 L${stringify(bW * .7)},${stringify(bH + 60)}`)}></path></g><g fill="none" stroke="var(--accent)" stroke-linecap="round" stroke-width="2" opacity="0.40"><path d="M293,-60 L293,185 A40,40,0,0,0,333,225 L867,225 A40,40,0,0,1,907,265 L907,410 A40,40,0,0,1,867,450 L333,450 A40,40,0,0,0,293,490 L293,720" stroke-dasharray="2 28" pathLength="1000"><animate attributeName="stroke-dashoffset" from="0" to="-30" dur="2.8s" repeatCount="indefinite"></animate></path><path d="M907,-60 L907,265" stroke-dasharray="2 28" pathLength="300"><animate attributeName="stroke-dashoffset" from="0" to="-30" dur="2.8s" repeatCount="indefinite"></animate></path><path d="M-60,450 L600,450" stroke-dasharray="2 28" pathLength="300"><animate attributeName="stroke-dashoffset" from="0" to="-30" dur="2.8s" repeatCount="indefinite"></animate></path><path d="M600,450 L600,720" stroke-dasharray="2 28" pathLength="300"><animate attributeName="stroke-dashoffset" from="0" to="-30" dur="2.8s" repeatCount="indefinite"></animate></path><path${attr("d", `M${stringify(bW - 30)},-60 L${stringify(bW - 30)},${stringify(bH + 60)}`)} stroke-dasharray="2 28" pathLength="500"><animate attributeName="stroke-dashoffset" from="0" to="-30" dur="2.8s" repeatCount="indefinite"></animate></path><path${attr("d", `M${stringify(bW * .7)},-60 L${stringify(bW * .7)},${stringify(bH + 60)}`)} stroke-dasharray="2 28" pathLength="500"><animate attributeName="stroke-dashoffset" from="0" to="-30" dur="2.8s" repeatCount="indefinite"></animate></path></g><g fill="var(--bg-2)" stroke="var(--accent)" stroke-width="2.5" opacity="0.45"><circle cx="293" cy="-60" r="9"></circle><circle cx="907" cy="-60" r="9"></circle><circle cx="-60" cy="450" r="9"></circle><circle cx="293" cy="720" r="9"></circle><circle cx="600" cy="720" r="9"></circle><circle${attr("cx", bW - 30)}${attr("cy", bH + 60)} r="9"></circle><circle${attr("cx", bW * .7)}${attr("cy", bH + 60)} r="9"></circle></g></svg> <svg class="pipe-bg-mobile svelte-6t9lhf"${attr("viewBox", vb)} preserveAspectRatio="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="var(--accent)" stroke-linecap="round" stroke-linejoin="round" stroke-width="14" opacity="0.06"><path${attr("d", `M${stringify(bW * .25)},-60 L${stringify(bW * .25)},${stringify(bH * .33 - 40)} A40,40,0,0,0,${stringify(bW * .25 + 40)},${stringify(bH * .33)} L${stringify(bW * .75 - 40)},${stringify(bH * .33)} A40,40,0,0,1,${stringify(bW * .75)},${stringify(bH * .33 + 40)} L${stringify(bW * .75)},${stringify(bH * .67 - 40)} A40,40,0,0,1,${stringify(bW * .75 - 40)},${stringify(bH * .67)} L${stringify(bW * .25 + 40)},${stringify(bH * .67)} A40,40,0,0,0,${stringify(bW * .25)},${stringify(bH * .67 + 40)} L${stringify(bW * .25)},${stringify(bH + 60)}`)}></path></g><g fill="none" stroke="var(--accent)" stroke-linecap="round" stroke-linejoin="round" stroke-width="6" opacity="0.22"><path${attr("d", `M${stringify(bW * .25)},-60 L${stringify(bW * .25)},${stringify(bH * .33 - 40)} A40,40,0,0,0,${stringify(bW * .25 + 40)},${stringify(bH * .33)} L${stringify(bW * .75 - 40)},${stringify(bH * .33)} A40,40,0,0,1,${stringify(bW * .75)},${stringify(bH * .33 + 40)} L${stringify(bW * .75)},${stringify(bH * .67 - 40)} A40,40,0,0,1,${stringify(bW * .75 - 40)},${stringify(bH * .67)} L${stringify(bW * .25 + 40)},${stringify(bH * .67)} A40,40,0,0,0,${stringify(bW * .25)},${stringify(bH * .67 + 40)} L${stringify(bW * .25)},${stringify(bH + 60)}`)}></path></g><g fill="none" stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" opacity="0.10"><path${attr("d", `M${stringify(bW * .25)},-60 L${stringify(bW * .25)},${stringify(bH * .33 - 40)} A40,40,0,0,0,${stringify(bW * .25 + 40)},${stringify(bH * .33)} L${stringify(bW * .75 - 40)},${stringify(bH * .33)} A40,40,0,0,1,${stringify(bW * .75)},${stringify(bH * .33 + 40)} L${stringify(bW * .75)},${stringify(bH * .67 - 40)} A40,40,0,0,1,${stringify(bW * .75 - 40)},${stringify(bH * .67)} L${stringify(bW * .25 + 40)},${stringify(bH * .67)} A40,40,0,0,0,${stringify(bW * .25)},${stringify(bH * .67 + 40)} L${stringify(bW * .25)},${stringify(bH + 60)}`)}></path></g><g fill="none" stroke="var(--accent)" stroke-linecap="round" stroke-width="2" opacity="0.40"><path${attr("d", `M${stringify(bW * .25)},-60 L${stringify(bW * .25)},${stringify(bH * .33 - 40)} A40,40,0,0,0,${stringify(bW * .25 + 40)},${stringify(bH * .33)} L${stringify(bW * .75 - 40)},${stringify(bH * .33)} A40,40,0,0,1,${stringify(bW * .75)},${stringify(bH * .33 + 40)} L${stringify(bW * .75)},${stringify(bH * .67 - 40)} A40,40,0,0,1,${stringify(bW * .75 - 40)},${stringify(bH * .67)} L${stringify(bW * .25 + 40)},${stringify(bH * .67)} A40,40,0,0,0,${stringify(bW * .25)},${stringify(bH * .67 + 40)} L${stringify(bW * .25)},${stringify(bH + 60)}`)} stroke-dasharray="2 28" pathLength="1000"><animate attributeName="stroke-dashoffset" from="0" to="-30" dur="2.8s" repeatCount="indefinite"></animate></path></g><g fill="var(--bg-2)" stroke="var(--accent)" stroke-width="2.5" opacity="0.45"><circle${attr("cx", bW * .25)}${attr("cy", -60)} r="9"></circle><circle${attr("cx", bW * .25)}${attr("cy", bH + 60)} r="9"></circle></g></svg> <!--[-->`);
		const each_array = ensure_array_like(services);
		for (let i = 0, $$length = each_array.length; i < $$length; i++) {
			let svc = each_array[i];
			$$renderer.push(`<div class="svc-cell glass svelte-6t9lhf"><article class="svc-card svelte-6t9lhf"><div class="card-top svelte-6t9lhf"><span class="card-num svelte-6t9lhf">${escape_html(svc.label)}</span> <div class="card-icon-wrap svelte-6t9lhf">${html(svc.icon)}</div></div> <h3 class="svelte-6t9lhf">${escape_html(svc.title)}</h3> <p class="svelte-6t9lhf">${escape_html(svc.desc)}</p></article></div>`);
		}
		$$renderer.push(`<!--]--></div></div></section>`);
	});
}
//#endregion
//#region src/lib/WhyUs.svelte
function WhyUs($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const pillars = [
			{
				num: "01",
				title: "Umbraco-native team",
				body: "We don't generalise across ten CMSs. Umbraco is our entire focus — which means we know every edge case, every quirk, and every optimisation."
			},
			{
				num: "02",
				title: "SEO from day one",
				body: "Ranking is designed in, not retrofitted. Every content model, URL structure, and page template is built with search in mind from the first commit."
			},
			{
				num: "03",
				title: "No handoff, no blackbox",
				body: "Clean, documented .NET code. You own it, you can read it, and any developer can maintain it long after we're done."
			}
		];
		$$renderer.push(`<section id="why-us" class="section-wrap why-us svelte-1jcw1x9"><svg class="why-bg svelte-1jcw1x9" viewBox="0 0 800 600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><circle cx="400" cy="300" r="280" fill="none" stroke="var(--accent)" stroke-width="1" opacity="0.06" style="transform-origin:400px 300px; animation:spin-slow 60s linear infinite;"></circle><circle cx="400" cy="300" r="180" fill="none" stroke="var(--pop)" stroke-width="0.8" opacity="0.05" style="transform-origin:400px 300px; animation:spin-slow-rev 40s linear infinite;"></circle><g opacity="0.12" stroke="var(--accent)" stroke-width="1.5"><line x1="60" y1="100" x2="60" y2="116"></line><line x1="52" y1="108" x2="68" y2="108"></line><line x1="740" y1="480" x2="740" y2="496"></line><line x1="732" y1="488" x2="748" y2="488"></line></g></svg> <div class="inner svelte-1jcw1x9"><div class="top-split svelte-1jcw1x9"><div class="top-left"><div class="section-label">Why Us</div> <h2 class="section-h2 svelte-1jcw1x9">Built<br/><em class="svelte-1jcw1x9">differently.</em></h2></div> <div class="top-right"><p class="intro-text svelte-1jcw1x9">Most agencies offer Umbraco as one option on a long list.
          We offer it as the <strong class="svelte-1jcw1x9">only</strong> option — because depth beats breadth
          when your digital platform matters.</p> <a href="#quote" class="btn btn-accent">Work with us <svg class="icon" width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8h10M9 4l4 4-4 4"></path></svg></a></div></div> <div class="pillars svelte-1jcw1x9"><!--[-->`);
		const each_array = ensure_array_like(pillars);
		for (let i = 0, $$length = each_array.length; i < $$length; i++) {
			let p = each_array[i];
			$$renderer.push(`<div class="pillar svelte-1jcw1x9"><div class="pillar-num svelte-1jcw1x9">${escape_html(p.num)}</div> <div class="pillar-line svelte-1jcw1x9" aria-hidden="true"></div> <h3 class="pillar-title svelte-1jcw1x9">${escape_html(p.title)}</h3> <p class="pillar-body svelte-1jcw1x9">${escape_html(p.body)}</p></div>`);
		}
		$$renderer.push(`<!--]--></div> <div class="stat-strip svelte-1jcw1x9"><div class="stat svelte-1jcw1x9"><span class="stat-val svelte-1jcw1x9">10<span class="stat-unit svelte-1jcw1x9">+</span></span> <span class="stat-label svelte-1jcw1x9">Years on Umbraco</span></div> <div class="stat-div svelte-1jcw1x9" aria-hidden="true"></div> <div class="stat svelte-1jcw1x9"><span class="stat-val svelte-1jcw1x9">80<span class="stat-unit svelte-1jcw1x9">+</span></span> <span class="stat-label svelte-1jcw1x9">Sites launched</span></div> <div class="stat-div svelte-1jcw1x9" aria-hidden="true"></div> <div class="stat svelte-1jcw1x9"><span class="stat-val svelte-1jcw1x9">100<span class="stat-unit svelte-1jcw1x9">%</span></span> <span class="stat-label svelte-1jcw1x9">Delivery rate</span></div></div></div></section>`);
	});
}
//#endregion
//#region src/lib/Quote.svelte
function Quote($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const services = [
			"Custom Development",
			"SEO Optimisation",
			"Umbraco Cloud",
			"UX & UI Design",
			"Performance Audit",
			"CMS Migration"
		];
		let name = "";
		let email = "";
		let message = "";
		let selectedService = services[0];
		let status = "idle";
		let errors = {
			name: "",
			email: "",
			message: ""
		};
		$$renderer.push(`<section id="quote" class="section-wrap quote svelte-7pizqf"><svg class="quote-bg svelte-7pizqf" viewBox="0 0 1200 700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="glow-grad" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="var(--accent)" stop-opacity="0.08"></stop><stop offset="100%" stop-color="var(--accent)" stop-opacity="0"></stop></radialGradient><pattern id="q-lines" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse"><line x1="60" y1="0" x2="60" y2="60" stroke="var(--accent)" stroke-width="0.5" opacity="0.18"></line></pattern></defs><rect width="100%" height="100%" fill="url(#q-lines)"></rect><ellipse cx="200" cy="350" rx="300" ry="300" fill="url(#glow-grad)"></ellipse></svg> <div class="inner svelte-7pizqf"><div class="left-col"><div class="section-label">Get a Quote</div> <h2 class="q-heading svelte-7pizqf">Start a<br/><span class="pop-word svelte-7pizqf">project.</span></h2> <p class="q-sub svelte-7pizqf">No fluff, no long discovery calls before we know if we're the right fit.
        Fill in the short form and we'll reply within one business day.</p> <ul class="q-promises svelte-7pizqf"><!--[-->`);
		const each_array = ensure_array_like([
			"Free initial assessment",
			"48-hour response",
			"No obligations"
		]);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let item = each_array[$$index];
			$$renderer.push(`<li class="svelte-7pizqf"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 8 7 12 13 5"></polyline></svg> ${escape_html(item)}</li>`);
		}
		$$renderer.push(`<!--]--></ul></div> <div class="right-col">`);
		if (status === "success") {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="success-msg glass svelte-7pizqf"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="8 12 11 15 16 9"></polyline></svg> <p class="svelte-7pizqf">Message sent. We'll be in touch shortly.</p></div>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<form class="q-form glass svelte-7pizqf" novalidate=""><div class="field svelte-7pizqf"><span class="field-label svelte-7pizqf" role="group" aria-label="What do you need?">What do you need?</span> <div class="chips svelte-7pizqf"><!--[-->`);
			const each_array_1 = ensure_array_like(services);
			for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
				let svc = each_array_1[$$index_1];
				$$renderer.push(`<button type="button"${attr_class("chip svelte-7pizqf", void 0, { "selected": selectedService === svc })}>${escape_html(svc)}</button>`);
			}
			$$renderer.push(`<!--]--></div></div> <div class="row-2 svelte-7pizqf"><div${attr_class("field svelte-7pizqf", void 0, { "has-error": errors.name })}><label class="field-label svelte-7pizqf" for="q-name">Your Name</label> <input id="q-name" type="text"${attr("value", name)} placeholder="Alex Johnson"${attr_class("svelte-7pizqf", void 0, { "invalid": errors.name })}/> `);
			if (errors.name) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span class="err-msg svelte-7pizqf">${escape_html(errors.name)}</span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div> <div${attr_class("field svelte-7pizqf", void 0, { "has-error": errors.email })}><label class="field-label svelte-7pizqf" for="q-email">Email</label> <input id="q-email" type="email"${attr("value", email)} placeholder="alex@company.com"${attr_class("svelte-7pizqf", void 0, { "invalid": errors.email })}/> `);
			if (errors.email) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span class="err-msg svelte-7pizqf">${escape_html(errors.email)}</span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div></div> <div class="field svelte-7pizqf"><label class="field-label svelte-7pizqf" for="q-project-type">Your project type</label> <div class="select-wrap svelte-7pizqf">`);
			$$renderer.select({
				id: "q-project-type",
				value: selectedService,
				class: "project-type-select"
			}, ($$renderer) => {
				$$renderer.option({
					value: "",
					class: ""
				}, ($$renderer) => {
					$$renderer.push(`Select a service…`);
				}, "svelte-7pizqf");
				$$renderer.push(`<!--[-->`);
				const each_array_2 = ensure_array_like(services);
				for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
					let svc = each_array_2[$$index_2];
					$$renderer.option({
						value: svc,
						class: ""
					}, ($$renderer) => {
						$$renderer.push(`${escape_html(svc)}`);
					}, "svelte-7pizqf");
				}
				$$renderer.push(`<!--]-->`);
			}, "svelte-7pizqf");
			$$renderer.push(` <svg class="select-arrow svelte-7pizqf" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="2 4 6 8 10 4"></polyline></svg></div></div> <div${attr_class("field svelte-7pizqf", void 0, { "has-error": errors.message })}><label class="field-label svelte-7pizqf" for="q-message">About your project</label> <textarea id="q-message" rows="4" placeholder="Tell us about your goals, current stack, timeline…"${attr_class("svelte-7pizqf", void 0, { "invalid": errors.message })}>`);
			const $$body = escape_html(message);
			if ($$body) $$renderer.push(`${$$body}`);
			$$renderer.push(`</textarea> `);
			if (errors.message) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span class="err-msg svelte-7pizqf">${escape_html(errors.message)}</span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div> `);
			if (status === "error") {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="error-banner svelte-7pizqf">Something went wrong — please try again.</div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <button type="submit" class="btn btn-primary submit-btn svelte-7pizqf"${attr("disabled", status === "loading", true)}>${escape_html(status === "loading" ? "Sending…" : "Send Message")} `);
			if (status !== "loading") {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<svg class="icon" width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8h10M9 4l4 4-4 4"></path></svg>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></button></form>`);
		}
		$$renderer.push(`<!--]--></div></div></section>`);
	});
}
//#endregion
//#region src/lib/Footer.svelte
function Footer($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		$$renderer.push(`<footer class="footer svelte-9sff3o"><div class="inner svelte-9sff3o"><div class="brand-col"><a class="brand svelte-9sff3o" href="#hero"><svg width="44" height="30" viewBox="0 0 44 30" fill="none" aria-hidden="true"><path d="M2 28 L12 4 L22 28" stroke="var(--text-2)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M16 28 L26 4 L36 28" stroke="var(--accent)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"></path></svg> <span class="svelte-9sff3o">Studio</span></a> <p class="tagline svelte-9sff3o">Umbraco development &amp; SEO.<br/>Depth over breadth.</p></div> <nav class="footer-nav svelte-9sff3o"><a href="#services" class="svelte-9sff3o">Services</a> <a href="#why-us" class="svelte-9sff3o">Why Us</a> <a href="#quote" class="svelte-9sff3o">Get a Quote</a></nav></div> <div class="bottom svelte-9sff3o"><div class="inner bottom-inner svelte-9sff3o"><span>© ${escape_html((/* @__PURE__ */ new Date()).getFullYear())} MyAgency. All rights reserved.</span> <span class="built-with">Built on Svelte + Vite</span></div></div></footer>`);
	});
}
//#endregion
//#region src/routes/+page.svelte
function _page($$renderer) {
	Navbar($$renderer, {});
	$$renderer.push(`<!----> <main>`);
	Hero($$renderer, {});
	$$renderer.push(`<!----> `);
	Services($$renderer, {});
	$$renderer.push(`<!----> `);
	WhyUs($$renderer, {});
	$$renderer.push(`<!----> `);
	Quote($$renderer, {});
	$$renderer.push(`<!----></main> `);
	Footer($$renderer, {});
	$$renderer.push(`<!---->`);
}
//#endregion
export { _page as default };
