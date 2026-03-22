<!-- Background shape (SVG — replaced by WebGL below) -->
<svg
	class="why-bg"
	viewBox="0 0 800 600"
	aria-hidden="true"
	preserveAspectRatio="xMidYMid slice"
>
	<circle
		cx="600"
		cy="300"
		r="280"
		fill="none"
		stroke="var(--accent)"
		stroke-width="1"
		opacity="0.1"
	/>
	<circle
		cx="600"
		cy="300"
		r="250"
		fill="none"
		stroke="var(--pop)"
		stroke-width="1"
		opacity="0.15"
	/>
	<circle
		cx="600"
		cy="300"
		r="220"
		fill="none"
		stroke="var(--accent)"
		stroke-width="1"
		opacity="0.1"
	/>
	<circle
		cx="600"
		cy="300"
		r="190"
		fill="none"
		stroke="var(--pop)"
		stroke-width="1"
		opacity="0.15"
	/>
	<circle
		cx="600"
		cy="300"
		r="160"
		fill="none"
		stroke="var(--accent)"
		stroke-width="1"
		opacity="0.1"
	/>
</svg>

<style lang="scss">
	.why-bg {
		position: absolute;
		right: -20%;
		top: 50%;
		transform: translateY(-50%);
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 0;
	}
</style>
