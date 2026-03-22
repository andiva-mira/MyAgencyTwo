<script>
	import { reveal } from "./reveal.js";
	import CirclesBg from "./CirclesBg.svelte";

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
	<CirclesBg />

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
	</div>

	<!-- Marquee stat strip -->
	<div class="stat-strip" aria-label="Key stats">
		<div class="stat-track">
			{#each Array(4) as _}
				<div class="stat-item">
					<span class="stat-val"
						>10<span class="stat-unit">+</span></span
					>
					<span class="stat-label">Years on Umbraco</span>
				</div>
				<span class="stat-sep" aria-hidden="true">—</span>
				<div class="stat-item">
					<span class="stat-val"
						>80<span class="stat-unit">+</span></span
					>
					<span class="stat-label">Sites launched</span>
				</div>
				<span class="stat-sep" aria-hidden="true">—</span>
				<div class="stat-item">
					<span class="stat-val"
						>100<span class="stat-unit">%</span></span
					>
					<span class="stat-label">Delivery rate</span>
				</div>
				<span class="stat-sep" aria-hidden="true">—</span>
			{/each}
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

	.inner {
		position: relative;
		z-index: 2;
		max-width: clamp(320px, 95vw, 2500px);
		margin: 0 auto 50px;
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
		color: var(--white);
		line-height: 1.7;
		margin-bottom: 30px;

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
		padding: 20px;
		background: var(--bg);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-card);

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

	/* ── Stat marquee ───────────────────────── */
	.stat-strip {
		overflow: hidden;
		border-top: 1px solid var(--border);
		padding: 28px 0;
		background: var(--surface);
		margin-top: 50px;
		position: absolute;
		bottom: 0;
		width: 100%;
		left: 0;
		background: var(--bg);
	}

	.stat-track {
		display: flex;
		align-items: center;
		gap: 48px;
		width: max-content;
		animation: marquee 24s linear infinite;

		&:hover {
			animation-play-state: paused;
		}
	}

	@keyframes marquee {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(-25%);
		}
	}

	.stat-item {
		display: flex;
		align-items: baseline;
		gap: 12px;
		flex-shrink: 0;
	}

	.stat-val {
		font-family: var(--heading);
		font-size: clamp(28px, 3vw, 42px);
		font-weight: 900;
		color: var(--text);
		line-height: 1;
		letter-spacing: -1.5px;
	}

	.stat-unit {
		font-size: 0.55em;
		color: var(--accent);
	}

	.stat-label {
		font-size: 13px;
		color: var(--text-2);
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 1px;
	}

	.stat-sep {
		color: var(--accent);
		font-size: 20px;
		opacity: 0.4;
		flex-shrink: 0;
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
		.why-bg {
			top: 20%;
			transform: translateY(-20%);
		}
	}
</style>
