<script>
	// @ts-nocheck
	import { onMount } from 'svelte';

	let wrapEl;
	let beamX  = -9999;
	let beamY  = -9999;
	let active = false;
	let targetX = -9999;
	let targetY = -9999;
	let rafId;

	function lerp(a, b, t) { return a + (b - a) * t; }

	function tick() {
		beamX = lerp(beamX, targetX, 0.08);
		beamY = lerp(beamY, targetY, 0.08);
		rafId = requestAnimationFrame(tick);
	}

	onMount(() => {
		function onMouseMove(e) {
			const rect = wrapEl.getBoundingClientRect();
			const inside =
				e.clientX >= rect.left && e.clientX <= rect.right &&
				e.clientY >= rect.top  && e.clientY <= rect.bottom;

			if (inside) {
				const x = e.clientX - rect.left;
				const y = e.clientY - rect.top;
				targetX = x;
				targetY = y;
				if (!active) {
					beamX  = x;
					beamY  = y;
					active = true;
				}
			} else {
				active  = false;
				targetX = -9999;
				targetY = -9999;
			}
		}

		window.addEventListener('mousemove', onMouseMove);
		tick();

		return () => {
			window.removeEventListener('mousemove', onMouseMove);
			cancelAnimationFrame(rafId);
		};
	});
</script>

<div class="beam-area" bind:this={wrapEl} aria-hidden="true">
	<div
		class="beam-follower"
		class:beam-active={active}
		style="left:{beamX}px; top:{beamY}px;"
	></div>
</div>

<style>
	.beam-area {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}

	.beam-follower {
		position: absolute;
		width: 200px;
		height: 200px;
		border-radius: 50%;
		pointer-events: none;
		transform: translate(-50%, -50%) scale(0);
		mix-blend-mode: exclusion;
		background: var(--beam-background, radial-gradient(
			circle at 50% 50%,
			rgba(231, 253, 249, .95)  0%,
			rgba(200, 255, 250, 0.80)  12%,
			rgba(31,  238, 200, 0.55)  30%,
			rgba(31,  238, 200, 0.20)  55%,
			rgba(31,  238, 200, 0.04)  72%,
			transparent 82%
		));
		opacity: 0;
		transition:
			opacity 0.4s ease,
			transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
			z-index: 10;

		}

	.beam-follower.beam-active {
		opacity: 1;
		transform: translate(-50%, -50%) scale(1);
	}
</style>
