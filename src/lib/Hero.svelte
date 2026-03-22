<script>
	// @ts-nocheck
	import { onMount } from "svelte";
	import * as THREE from "three";
	import BeamFollower from "./BeamFollower.svelte";


	let gemCanvas;
	let heroSection;
	let headingEl;
	let gemWrap;
	let ctaRow;

	let rafId;

	// Parallax state — normalized mouse offset from center (-1 to 1)
	let pNX = 0,
		pNY = 0; // lerped (heading speed)
	let pGemNX = 0,
		pGemNY = 0; // lerped (gem speed — floatier)
	let pTargetNX = 0,
		pTargetNY = 0;

	let gemHovered = false;
	let shatterProgress = 0;

	// Set by onMount — used in handleMouseMove for raycasting
	let checkGemHover = null;

	function lerp(a, b, t) {
		return a + (b - a) * t;
	}

	function tick() {
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
		pTargetNX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
		pTargetNY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
		if (checkGemHover) checkGemHover(e.clientX, e.clientY);
	}

	function handleMouseLeave() {
		pTargetNX = 0;
		pTargetNY = 0;
		gemHovered = false;
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

		const edges = new THREE.EdgesGeometry(geo, 12);
		const edgeMat = new THREE.LineBasicMaterial({
			color: 0x1feec8,
			transparent: true,
			opacity: 0.45,
		});
		gem.add(new THREE.LineSegments(edges, edgeMat));

		// Wrap gem in a group so we can animate the group
		const gemGroup = new THREE.Group();
		gemGroup.add(gem);
		scene.add(gemGroup);

		const applyTheme = () => {
			const light = isLight();
			faceMat.color.setHex(light ? LIGHT_COLOR : DARK_COLOR);
			faceMat.emissive.setHex(light ? LIGHT_EMISSIVE : DARK_EMISSIVE);
			faceMat.opacity = light ? 0.85 : 0.15;
			edgeMat.color.setHex(light ? 0x0a9e82 : 0x1feec8);
			edgeMat.opacity = light ? 0.6 : 0.45;
			ambientLight.intensity = light ? 1.2 : 0.15;
		};

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

		// ── Gem hover via raycasting (bypasses z-index blocking) ─────
		const raycaster = new THREE.Raycaster();
		const rayMouse = new THREE.Vector2();

		// Invisible sphere that acts as a stable hit-area for the gem.
		// Stays at origin even while the gem shatters, so hover is reliable.
		const hitSphere = new THREE.Mesh(
			new THREE.SphereGeometry(1.05, 8, 8),
			new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 })
		);
		gemGroup.add(hitSphere);

		checkGemHover = (clientX, clientY) => {
			const rect = gemCanvas.getBoundingClientRect();
			// Mouse outside canvas bounds → not hovering gem
			if (clientX < rect.left || clientX > rect.right ||
				clientY < rect.top  || clientY > rect.bottom) {
				gemHovered = false;
				return;
			}
			rayMouse.x =  ((clientX - rect.left) / rect.width)  * 2 - 1;
			rayMouse.y = -((clientY - rect.top)  / rect.height) * 2 + 1;
			raycaster.setFromCamera(rayMouse, camera);
			gemHovered = raycaster.intersectObject(hitSphere).length > 0;
		};

		// ── Fragment extraction ───────────────────────────────────────
		function createFragments(geometry, baseFaceMat) {
			const pos = geometry.attributes.position;
			const index = geometry.index;
			const count = index ? index.count : pos.count;
			const frags = [];

			for (let i = 0; i < count; i += 3) {
				const ia = index ? index.getX(i)   : i;
				const ib = index ? index.getX(i+1) : i+1;
				const ic = index ? index.getX(i+2) : i+2;

				const verts = new Float32Array([
					pos.getX(ia), pos.getY(ia), pos.getZ(ia),
					pos.getX(ib), pos.getY(ib), pos.getZ(ib),
					pos.getX(ic), pos.getY(ic), pos.getZ(ic),
				]);
				const triGeo = new THREE.BufferGeometry();
				triGeo.setAttribute('position', new THREE.BufferAttribute(verts, 3));
				triGeo.computeVertexNormals();

				const mat = baseFaceMat.clone();
				mat.opacity = baseFaceMat.opacity * 1.8;
				const mesh = new THREE.Mesh(triGeo, mat);

				const edgeGeo = new THREE.EdgesGeometry(triGeo);
				const edgeLine = new THREE.LineSegments(edgeGeo, new THREE.LineBasicMaterial({
					color: 0x1feec8, transparent: true, opacity: 0.6
				}));
				mesh.add(edgeLine);

				const cx = (verts[0] + verts[3] + verts[6]) / 3;
				const cy = (verts[1] + verts[4] + verts[7]) / 3;
				const cz = (verts[2] + verts[5] + verts[8]) / 3;
				const dir = new THREE.Vector3(cx, cy, cz).normalize();
				const dist = 1.5 + Math.random() * 1.0;

				frags.push({
					mesh,
					origin: new THREE.Vector3(0, 0, 0),
					target: dir.multiplyScalar(dist),
					targetRot: new THREE.Euler(
						(Math.random() - 0.5) * Math.PI * 1.5,
						(Math.random() - 0.5) * Math.PI * 1.5,
						(Math.random() - 0.5) * Math.PI,
					),
					edgeGeo,
					edgeLine,
				});
			}
			return frags;
		}

		const ease = p => 1 - Math.pow(1 - p, 3);

		const fragments = createFragments(geo, faceMat);
		fragments.forEach(f => { f.mesh.visible = false; gemGroup.add(f.mesh); });

		// ── Animate loop ──────────────────────────────────────────────
		let frameId, t = 0;
		function animate() {
			frameId = requestAnimationFrame(animate);
			t += 0.007;

			gemGroup.rotation.y += 0.003;
			gemGroup.rotation.x = Math.sin(t * 0.35) * 0.28;
			gemGroup.position.y = Math.sin(t * 0.65) * 0.22;

			if (gemHovered) {
				shatterProgress = Math.min(1, shatterProgress + 0.05);
			} else {
				shatterProgress = Math.max(0, shatterProgress - 0.035);
			}

			if (shatterProgress > 0.05) {
				gem.visible = false;
				const eased = ease(shatterProgress);
				fragments.forEach(f => {
					f.mesh.visible = true;
					f.mesh.position.lerpVectors(f.origin, f.target, eased);
					f.mesh.rotation.x = lerp(0, f.targetRot.x, eased);
					f.mesh.rotation.y = lerp(0, f.targetRot.y, eased);
					f.mesh.rotation.z = lerp(0, f.targetRot.z, eased);
				});
			} else {
				gem.visible = true;
				fragments.forEach(f => { f.mesh.visible = false; });
			}

			renderer.render(scene, camera);
		}
		animate();

		tick();

		return () => {
			cancelAnimationFrame(frameId);
			cancelAnimationFrame(rafId);
			checkGemHover = null;
			renderer.dispose();
			observer.disconnect();
			hitSphere.geometry.dispose();
			hitSphere.material.dispose();
			fragments.forEach(f => {
				f.edgeGeo.dispose();
				f.edgeLine.material.dispose();
				f.mesh.geometry.dispose();
				f.mesh.material.dispose();
			});
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
	<BeamFollower />

	<!-- Floating 3D WebGL gem -->
	<div
		class="gem-wrap"
		class:gem-hovered={gemHovered}
		bind:this={gemWrap}
		aria-hidden="true"
	>
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

	/* ── 3D gem background ───────────────────── */
	.gem-wrap {
		position: absolute;
		left: 25%;
		top: 50%;
		transform: translateY(-50%);
		z-index: 0;
		pointer-events: auto;
		will-change: transform;
		cursor: default;
		transition: cursor 0.1s;
	}

	.gem-wrap.gem-hovered {
		cursor: crosshair;
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
		max-width: clamp(320px, 95vw, 2500px);
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
