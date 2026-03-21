<script>
	import { reveal } from "./reveal.js";

	const pillars = [
		{
			num: "01",
			title: "Umbraco-native team",
			body: "We don't generalise across ten CMSs. Umbraco is our entire focus — which means we know every edge case, every quirk, and every optimisation.",
		},
		{
			num: "02",
			title: "SEO from day one",
			body: "Ranking is designed in, not retrofitted. Every content model, URL structure, and page template is built with search in mind from the first commit.",
		},
		{
			num: "03",
			title: "No handoff, no blackbox",
			body: "Clean, documented .NET code. You own it, you can read it, and any developer can maintain it long after we're done.",
		},
	];
</script>

<section id="why-us" class="section-wrap why-us">
	<!-- Animated background shape -->
	<svg
		class="why-bg"
		viewBox="0 0 800 600"
		aria-hidden="true"
		xmlns="http://www.w3.org/2000/svg"
	>
		<circle
			cx="400"
			cy="300"
			r="280"
			fill="none"
			stroke="var(--accent)"
			stroke-width="1"
			opacity="0.06"
			style="transform-origin:400px 300px; animation:spin-slow 60s linear infinite;"
		/>
		<circle
			cx="400"
			cy="300"
			r="180"
			fill="none"
			stroke="var(--pop)"
			stroke-width="0.8"
			opacity="0.05"
			style="transform-origin:400px 300px; animation:spin-slow-rev 40s linear infinite;"
		/>
		<!-- Cross marks -->
		<g opacity="0.12" stroke="var(--accent)" stroke-width="1.5">
			<line x1="60" y1="100" x2="60" y2="116" /><line
				x1="52"
				y1="108"
				x2="68"
				y2="108"
			/>
			<line x1="740" y1="480" x2="740" y2="496" /><line
				x1="732"
				y1="488"
				x2="748"
				y2="488"
			/>
		</g>
	</svg>

	<div class="inner">
		<!-- Top: asymmetric split -->
		<div class="top-split">
			<div class="top-left" use:reveal={{ delay: 0 }}>
				<div class="section-label">Why Us</div>
				<h2 class="section-h2">Built<br /><em>differently.</em></h2>
			</div>
			<div class="top-right" use:reveal={{ delay: 120 }}>
				<p class="intro-text">
					Most agencies offer Umbraco as one option on a long list. We
					offer it as the <strong>only</strong> option — because depth
					beats breadth when your digital platform matters.
				</p>
				<a
					href="#quote"
					class="btn btn-accent"
					on:click|preventDefault={() =>
						document
							.getElementById("quote")
							?.scrollIntoView({ behavior: "smooth" })}
				>
					Work with us
					<svg
						class="icon"
						width="15"
						height="15"
						viewBox="0 0 16 16"
						fill="none"
						stroke="currentColor"
						stroke-width="2.2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M3 8h10M9 4l4 4-4 4" />
					</svg>
				</a>
			</div>
		</div>

		<!-- Bottom: pillars -->
		<div class="pillars">
			{#each pillars as p, i}
				<div class="pillar" use:reveal={{ delay: i * 100 }}>
					<div class="pillar-num">{p.num}</div>
					<div class="pillar-line" aria-hidden="true"></div>
					<h3 class="pillar-title">{p.title}</h3>
					<p class="pillar-body">{p.body}</p>
				</div>
			{/each}
		</div>

		<!-- Stat strip — large numbers as typographic anchors -->
		<div class="stat-strip" use:reveal={{ delay: 50 }}>
			<div class="stat">
				<span class="stat-val">10<span class="stat-unit">+</span></span>
				<span class="stat-label">Years on Umbraco</span>
			</div>
			<div class="stat-div" aria-hidden="true"></div>
			<div class="stat">
				<span class="stat-val">80<span class="stat-unit">+</span></span>
				<span class="stat-label">Sites launched</span>
			</div>
			<div class="stat-div" aria-hidden="true"></div>
			<div class="stat">
				<span class="stat-val">100<span class="stat-unit">%</span></span
				>
				<span class="stat-label">Delivery rate</span>
			</div>
		</div>
	</div>
</section>

<style lang="scss">
	.why-us {
		position: relative;
		overflow: hidden;
		background: var(--bg);
		border-top: 1px solid var(--border);
	}

	.why-bg {
		position: absolute;
		right: -10%;
		top: 50%;
		transform: translateY(-50%);
		width: 55%;
		height: auto;
		pointer-events: none;
		opacity: 0.7;
	}

	.inner {
		position: relative;
		z-index: 1;
		max-width: clamp(320px, 92vw, 1400px);
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: clamp(48px, 7vw, 96px);
	}

	/* ── Top split ──────────────────────────── */
	.top-split {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: clamp(32px, 5vw, 80px);
		align-items: flex-end;
	}

	.section-h2 {
		font-size: clamp(44px, 6.5vw, 88px);
		letter-spacing: -3px;
		line-height: 0.95;
	}

	.section-h2 em {
		font-style: normal;
		color: var(--accent);
	}

	.intro-text {
		font-size: clamp(16px, 1.4vw, 19px);
		color: var(--text-2);
		line-height: 1.72;
		margin-bottom: 32px;

		strong {
			color: var(--text);
			font-weight: 600;
		}
	}

	/* ── Pillars ────────────────────────────── */
	.pillars {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 24px;
	}

	.pillar {
		display: flex;
		flex-direction: column;
		gap: 14px;

		&-num {
			font-family: var(--heading);
			font-size: 11px;
			font-weight: 700;
			letter-spacing: 2px;
			color: var(--accent);
		}

		&-line {
			width: 32px;
			height: 2px;
			background: var(--border);
			border-radius: 2px;
		}

		&-title {
			font-size: clamp(16px, 1.4vw, 20px);
			font-weight: 700;
			color: var(--text);
			line-height: 1.2;
		}

		&-body {
			font-size: 14px;
			color: var(--text-2);
			line-height: 1.7;
		}
	}

	/* ── Stat strip ─────────────────────────── */
	.stat {
		display: flex;
		flex-direction: column;
		gap: 4px;

		&-strip {
			display: flex;
			align-items: center;
			gap: 40px;
			padding: 40px;
			background: var(--surface);
			border: 1px solid var(--border);
			border-radius: var(--radius-card);
			flex-wrap: wrap;
		}

		&-val {
			font-family: var(--heading);
			font-size: clamp(40px, 5vw, 64px);
			font-weight: 900;
			color: var(--text);
			line-height: 1;
			letter-spacing: -2px;
		}

		&-unit {
			font-size: 0.55em;
			color: var(--accent);
		}

		&-label {
			font-size: 13px;
			color: var(--text-2);
			font-weight: 500;
			text-transform: uppercase;
			letter-spacing: 1px;
		}

		&-div {
			width: 1px;
			height: 52px;
			background: var(--border);
			flex-shrink: 0;
		}
	}

	/* ── Responsive ─────────────────────────── */
	@media (max-width: 900px) {
		.top-split {
			grid-template-columns: 1fr;
		}
		.pillars {
			grid-template-columns: 1fr;
			gap: 32px;
		}
		.stat-strip {
			flex-direction: column;
			align-items: flex-start;
			gap: 24px;
		}
		.stat-div {
			display: none;
		}
		.why-bg {
			width: 80%;
			opacity: 0.3;
		}
	}
</style>
