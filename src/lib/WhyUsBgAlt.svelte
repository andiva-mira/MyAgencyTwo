<script>
	import { onMount } from "svelte";
	import { browser } from "$app/environment";

	let canvas;
	let animId;

	const CHARS       = "<>{}[]()/\\|_@#$%^&*-+=?~.".split("");
	const FONT_SIZE   = 22;
	const ROW_SPACING = 150;   // vertical gap between characters in a stream
	const COL_SPACING = 200;  // wider = fewer columns
	const COLOR_HEAD  = "#88f6e2";
	const COLOR_BODY  = "#1FEEC8";
	const COLOR_DIM   = "rgba(0,0,0,0.025)";
	const SPEED       = 0.1; // slower drop
	const FPS         = 8;

	onMount(() => {
		if (!browser) return;

		const dpr = window.devicePixelRatio || 1;
		const ctx = canvas.getContext("2d");
		// 5 columns at irregular x positions (as % of canvas width)
		const COL_POSITIONS = [0.07, 0.1, 0.15, 0.20, 0.28, 0.35, 0.42, 0.50, 0.55, 0.70, 0.80, 0.88];
		let colsX, drops;

		function init() {
			const w = canvas.offsetWidth;
			const h = canvas.offsetHeight;
			canvas.width  = w * dpr;
			canvas.height = h * dpr;
			canvas.style.width  = w + "px";
			canvas.style.height = h + "px";
			ctx.scale(dpr, dpr);

			colsX = COL_POSITIONS.map(p => Math.round(w * p));
			drops = colsX.map(() => Math.random() * -(h / ROW_SPACING) * 4);
		}

		function draw() {
			const w = canvas.offsetWidth;
			const h = canvas.offsetHeight;

			ctx.fillStyle = COLOR_DIM;
			ctx.fillRect(0, 0, w, h);

			ctx.font = `${FONT_SIZE}px 'Courier New', monospace`;

			for (let i = 0; i < drops.length; i++) {
				const y = drops[i] * ROW_SPACING;
				const x = colsX[i];

				// Head character
				ctx.fillStyle = COLOR_HEAD;
				ctx.globalAlpha = 0.9;
				ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], x, y);

				// Body character one row behind
				ctx.fillStyle = COLOR_BODY;
				ctx.globalAlpha = 0.5;
				ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], x, y - ROW_SPACING);

				ctx.globalAlpha = 1;

				if (y > h && Math.random() > 0.975) drops[i] = 0;
				drops[i] += SPEED;
			}
		}

		init();
		window.addEventListener("resize", init);

		let last = 0;
		const interval = 1000 / FPS;
		const loop = (ts) => {
			animId = requestAnimationFrame(loop);
			if (ts - last < interval) return;
			last = ts;
			draw();
		};
		animId = requestAnimationFrame(loop);

		return () => {
			cancelAnimationFrame(animId);
			window.removeEventListener("resize", init);
		};
	});
</script>

<canvas bind:this={canvas}></canvas>
<div class="glass-overlay"></div>

<style>
	canvas {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		opacity: 1;
		z-index: 0;
	}

	/* .glass-overlay {
		position: absolute;
		inset: 0;
		z-index: 0;
		backdrop-filter: blur(.5px);
		background: linear-gradient(
			135deg,
			rgba(8, 12, 28, 0.55) 0%,
			rgba(10, 18, 40, 0.45) 50%,
			rgba(8, 12, 28, 0.60) 100%
		);
		pointer-events: none;
	} */
</style>
