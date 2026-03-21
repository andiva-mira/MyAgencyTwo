<script>
	// @ts-nocheck
	import { onMount } from "svelte";
	import * as THREE from "three";

	let gemCanvas;
	let heroSection;
	let headingEl;
	let gemWrap;
	let ctaRow;

	// Glow follower state
	let glowX = -9999;
	let glowY = -9999;
	let glowActive = false;
	let rafId;
	let targetX = -9999;
	let targetY = -9999;

	// Parallax state — normalized mouse offset from center (-1 to 1)
	let pNX = 0,
		pNY = 0; // lerped (heading speed)
	let pGemNX = 0,
		pGemNY = 0; // lerped (gem speed — floatier)
	let pTargetNX = 0,
		pTargetNY = 0;

	function lerp(a, b, t) {
		return a + (b - a) * t;
	}

	function tick() {
		glowX = lerp(glowX, targetX, 0.08);
		glowY = lerp(glowY, targetY, 0.08);

		pNX = lerp(pNX, pTargetNX, 0.07);
		pNY = lerp(pNY, pTargetNY, 0.07);
		pGemNX = lerp(pGemNX, pTargetNX, 0.04);
		pGemNY = lerp(pGemNY, pTargetNY, 0.04);

		if (headingEl) {
			headingEl.style.transform = `translate(${pNX * 10}px, ${pNY * 6}px)`;
		}
		if (gemWrap) {
			gemWrap.style.transform = `translateY(-50%) translate(${pGemNX * 28}px, ${pGemNY * 16}px)`;
		}
		if (ctaRow) {
			ctaRow.style.transform = `translate(${pNX * 6}px, ${pNY * 4}px)`;
		}

		rafId = requestAnimationFrame(tick);
	}

	function handleMouseMove(e) {
		const rect = heroSection.getBoundingClientRect();
		targetX = e.clientX - rect.left;
		targetY = e.clientY - rect.top;

		pTargetNX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
		pTargetNY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

		if (!glowActive) {
			glowX = targetX;
			glowY = targetY;
			glowActive = true;
		}
	}

	function handleMouseLeave() {
		glowActive = false;
		targetX = -9999;
		targetY = -9999;
		pTargetNX = 0;
		pTargetNY = 0;
	}

	onMount(() => {
		const S = 520;
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
		camera.position.z = 4.2;

		const renderer = new THREE.WebGLRenderer({
			canvas: gemCanvas,
			alpha: true,
			antialias: true,
		});
		renderer.setSize(S, S);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		renderer.setClearColor(0x000000, 0);

		// Symmetrical octahedron — no Y stretching
		const geo = new THREE.OctahedronGeometry(1, 1);

		const isLight = () =>
			document.documentElement.dataset.theme === "light";
		const DARK_COLOR = 0x1feec8;
		const LIGHT_COLOR = 0x8ef5e2;
		const DARK_EMISSIVE = 0x051510;
		const LIGHT_EMISSIVE = 0x2a7a64;

		const applyTheme = () => {
			const light = isLight();
			faceMat.color.setHex(light ? LIGHT_COLOR : DARK_COLOR);
			faceMat.emissive.setHex(light ? LIGHT_EMISSIVE : DARK_EMISSIVE);
			faceMat.opacity = light ? 0.85 : 0.15;
			edgeMat.color.setHex(light ? 0x0a9e82 : 0x1feec8);
			edgeMat.opacity = light ? 0.6 : 0.45;
			ambientLight.intensity = light ? 1.2 : 0.15;
		};

		const faceMat = new THREE.MeshPhongMaterial({
			color: DARK_COLOR,
			emissive: DARK_EMISSIVE,
			specular: 0xffffff,
			shininess: 160,
			transparent: true,
			opacity: 0.15,
			side: THREE.DoubleSide,
		});
		const gem = new THREE.Mesh(geo, faceMat);
		scene.add(gem);

		const edges = new THREE.EdgesGeometry(geo, 12);
		const edgeMat = new THREE.LineBasicMaterial({
			color: 0x1feec8,
			transparent: true,
			opacity: 0.45,
		});
		gem.add(new THREE.LineSegments(edges, edgeMat));

		const ambientLight = new THREE.AmbientLight(0xffffff, 0.15);
		scene.add(ambientLight);

		applyTheme();

		const observer = new MutationObserver(applyTheme);
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["data-theme"],
		});

		const key = new THREE.PointLight(0x1feec8, 3, 10);
		key.position.set(2, 3, 3);
		scene.add(key);
		const fill = new THREE.PointLight(0x5078dc, 2, 10);
		fill.position.set(-2.5, 0, 2);
		scene.add(fill);
		const rim = new THREE.PointLight(0xff4422, 1.5, 10);
		rim.position.set(0, -3, 1);
		scene.add(rim);

		let frameId,
			t = 0;
		function animate() {
			frameId = requestAnimationFrame(animate);
			t += 0.007;
			gem.rotation.y += 0.003;
			gem.rotation.x = Math.sin(t * 0.35) * 0.28;
			gem.position.y = Math.sin(t * 0.65) * 0.22;
			renderer.render(scene, camera);
		}
		animate();

		tick();

		return () => {
			cancelAnimationFrame(frameId);
			cancelAnimationFrame(rafId);
			renderer.dispose();
			observer.disconnect();
		};
	});
</script>

<section
	id="hero"
	class="hero"
	aria-label="Hero"
	bind:this={heroSection}
	on:mousemove={handleMouseMove}
	on:mouseleave={handleMouseLeave}
>
	<div class="hero-mouse-area" aria-hidden="true">
		<div
			class="glow-follower"
			class:glow-active={glowActive}
			style="left:{glowX}px; top:{glowY}px;"
		></div>
	</div>
	<!-- Floating 3D WebGL gem -->
	<div class="gem-wrap" bind:this={gemWrap} aria-hidden="true">
		<canvas bind:this={gemCanvas} class="gem-canvas"></canvas>
	</div>

	<!-- Content -->
	<div class="hero-inner">
		<div class="hero-left">
			<div class="section-label">Umbraco Development & SEO</div>
			<h1 class="hero-heading" bind:this={headingEl}>
				<span class="line">Web</span>
				<span class="line accent-word">Development</span>
			</h1>
			<p class="hero-tagline">Web that Performs.</p>
		</div>

		<div class="hero-right">
			<p class="hero-body">
				We design, build, and rank <strong
					>fast, scalable websites</strong
				> on Umbraco CMS — hosted on Umbraco Cloud, and optimised for position
				one.
			</p>
			<div class="cta-row" bind:this={ctaRow}>
				<a
					href="#quote"
					class="btn btn-primary"
					on:click|preventDefault={() =>
						document
							.getElementById("quote")
							?.scrollIntoView({ behavior: "smooth" })}
				>
					Start a Project
					<svg
						class="icon"
						width="15"
						height="15"
						viewBox="0 0 16 16"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M3 8h10M9 4l4 4-4 4" />
					</svg>
				</a>
				<a
					href="#services"
					class="btn btn-outline"
					on:click|preventDefault={() =>
						document
							.getElementById("services")
							?.scrollIntoView({ behavior: "smooth" })}
				>
					See Services
					<svg
						class="icon"
						width="15"
						height="15"
						viewBox="0 0 16 16"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M8 3v10M4 9l4 4 4-4" />
					</svg>
				</a>
			</div>
		</div>
	</div>

	<!-- Scroll hint -->
	<div class="scroll-hint" aria-hidden="true">
		<span>Scroll</span>
		<svg width="1" height="40" viewBox="0 0 1 40" fill="none">
			<line
				x1="0.5"
				y1="0"
				x2="0.5"
				y2="40"
				stroke="var(--accent)"
				stroke-width="1"
				stroke-dasharray="4 4"
			>
				<animate
					attributeName="stroke-dashoffset"
					from="0"
					to="16"
					dur="1s"
					repeatCount="indefinite"
				/>
			</line>
		</svg>
	</div>
</section>

<style lang="scss">
	.hero {
		position: relative;
		min-height: 100svh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		overflow: hidden;
		padding: clamp(100px, 14vh, 160px) clamp(24px, 6vw, 96px)
			clamp(80px, 10vh, 120px);
	}

	/* ── Mouse glow follower ─────────────────── */
	.hero-mouse-area {
		position: absolute;
		inset: 0;
		pointer-events: none;
		z-index: 2;
	}

	.glow-follower {
		position: absolute;
		width: 260px;
		height: 260px;
		border-radius: 50%;
		pointer-events: none;
		transform: translate(-50%, -50%) scale(0);
		background: radial-gradient(
			circle,
			rgba(31, 238, 200, 0.25) 0%,
			rgba(31, 238, 200, 0.1) 35%,
			rgba(31, 238, 200, 0.03) 60%,
			transparent 75%
		);
		opacity: 0;
		transition:
			opacity 0.4s ease,
			transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
	}

	.glow-follower.glow-active {
		opacity: 1;
		transform: translate(-50%, -50%) scale(1);
		animation: glow-pulse 2.4s ease-in-out infinite;
	}

	@keyframes glow-pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.7;
		}
	}

	/* ── 3D gem background ───────────────────── */
	.gem-wrap {
		position: absolute;
		left: 25%;
		top: 50%;
		transform: translateY(-50%);
		z-index: 0;
		pointer-events: none;
		will-change: transform;
	}

	.gem-canvas {
		width: 520px;
		height: 520px;
		display: block;
		background: transparent;
	}

	.hero-inner {
		position: relative;
		z-index: 1;
		max-width: clamp(320px, 92vw, 1400px);
		margin: 0 auto;
		width: 100%;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: clamp(40px, 6vw, 120px);
		align-items: flex-end;
	}

	.hero-left {
		display: flex;
		flex-direction: column;
	}

	.hero-heading {
		will-change: transform;
		font-size: clamp(52px, 10vw, 180px);
		font-weight: 900;
		line-height: 0.88;
		letter-spacing: -4px;
		margin-bottom: 20px;
		display: flex;
		flex-direction: column;
	}

	.line {
		display: block;
	}

	.accent-word {
		color: var(--accent);
		position: relative;
	}

	.hero-tagline {
		font-family: var(--heading);
		font-size: clamp(18px, 2.5vw, 28px);
		font-weight: 700;
		color: var(--text-2);
		letter-spacing: -0.5px;
		margin-top: 4px;
	}

	.hero-right {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		padding-bottom: 8px;
		gap: 32px;
	}

	.hero-body {
		font-size: clamp(16px, 1.4vw, 19px);
		color: var(--text-2);
		line-height: 1.7;
		max-width: 420px;
	}

	.hero-body strong {
		color: var(--text);
		font-weight: 600;
	}

	.cta-row {
		display: flex;
		gap: 12px;
		flex-wrap: wrap;
	}

	/* Scroll hint */
	.scroll-hint {
		position: absolute;
		bottom: 32px;
		left: clamp(24px, 6vw, 96px);
		z-index: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
	}

	.scroll-hint span {
		font-size: 10px;
		letter-spacing: 2px;
		text-transform: uppercase;
		color: var(--text-2);
		writing-mode: vertical-rl;
		text-orientation: mixed;
		transform: rotate(180deg);
	}

	@media (max-width: 900px) {
		.hero-inner {
			grid-template-columns: 1fr;
			align-items: flex-start;
		}

		.hero-heading {
			letter-spacing: -2px;
		}

		.hero-body {
			max-width: 100%;
		}

		.scroll-hint {
			display: none;
		}

		.gem-canvas {
			width: 250px;
			height: 250px;
		}
	}
</style>
