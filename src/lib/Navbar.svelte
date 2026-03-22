<script>
	import { onMount } from "svelte";
	import { lenisStore } from "$lib/stores.js";
	import BeamFollower from "./BeamFollower.svelte";
	import CirclesBg from "./CirclesBg.svelte";

	let scrolled = false;
	let menuOpen = false;
	let dark = true;
	let scrollProgress = 0;

	function toggleTheme() {
		dark = !dark;
		document.documentElement.setAttribute(
			"data-theme",
			dark ? "dark" : "light",
		);
		localStorage.setItem("theme", dark ? "dark" : "light");
	}

	function navTo(id) {
		menuOpen = false;
		document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
	}

	$: if (typeof document !== "undefined") {
		document.body.style.overflow = menuOpen ? "hidden" : "";
		menuOpen ? $lenisStore?.stop() : $lenisStore?.start();
	}

	onMount(() => {
		const saved = localStorage.getItem("theme");
		if (saved === "light") {
			dark = false;
			document.documentElement.setAttribute("data-theme", "light");
		}
		const onScroll = () => {
			scrolled = window.scrollY > 60;
			const max =
				document.documentElement.scrollHeight - window.innerHeight;
			scrollProgress = max > 0 ? window.scrollY / max : 0;
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	});
</script>

<header class:scrolled class:menu-open={menuOpen}>
	<div class="inner">
		<!-- Brand logo -->
		<a
			class="brand"
			on:click|preventDefault={() => navTo("hero")}
			href="#hero"
		>
			<svg
				width="44"
				height="30"
				viewBox="0 0 44 30"
				fill="none"
				aria-hidden="true"
				class="logo"
			>
				<path
					d="M2 28 L12 4 L22 28"
					stroke="var(--text)"
					stroke-width="3.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M16 28 L26 4 L36 28"
					stroke="var(--accent)"
					stroke-width="3.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
			<span>Studio</span>
		</a>

		<!-- Controls -->
		<div class="controls">
			<button
				class="icon-btn"
				on:click={toggleTheme}
				aria-label="Toggle theme"
			>
				{#if dark}
					<!-- Sun -->
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<circle cx="12" cy="12" r="4" />
						<path
							d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
						/>
					</svg>
				{:else}
					<!-- Moon -->
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
					</svg>
				{/if}
			</button>

			<button
				class="hamburger"
				class:open={menuOpen}
				on:click={() => (menuOpen = !menuOpen)}
				aria-label={menuOpen ? "Close menu" : "Open menu"}
				aria-expanded={menuOpen}
			>
				<span class="hamburger-bar"></span>
				<span class="hamburger-bar"></span>
			</button>
		</div>
	</div>
</header>

<!-- Horizontal scroll progress bar -->
<div class="scroll-progress" aria-hidden="true">
	<div
		class="scroll-progress-bar"
		style="width: {scrollProgress * 100}%"
	></div>
</div>

<!-- Full-screen nav overlay -->
<div class="nav-overlay" class:open={menuOpen} aria-hidden={!menuOpen}>
	<BeamFollower />
	<CirclesBg />
	<nav class="nav-links">
		<a
			class="nav-item"
			style="--i:0"
			on:click|preventDefault={() => navTo("services")}
			href="#services">Services</a
		>
		<a
			class="nav-item"
			style="--i:1"
			on:click|preventDefault={() => navTo("why-us")}
			href="#why-us">Why Us</a
		>
		<a
			class="nav-item nav-cta"
			style="--i:2"
			on:click|preventDefault={() => navTo("quote")}
			href="#quote"
		>
			Get a Quote
			<svg
				class="icon"
				width="18"
				height="18"
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
	</nav>
</div>

<style lang="scss">
	.scroll-progress {
		position: fixed;
		top: 72px;
		left: 0;
		width: 100%;
		height: 2px;
		z-index: 300;
		background: transparent;
	}

	.scroll-progress-bar {
		height: 100%;
		background: var(--accent, #1feec8);
		border-radius: 0 2px 2px 0;
		transition: width 0.08s linear;
		box-shadow: 0 0 8px rgba(31, 238, 200, 0.4);
	}

	header {
		position: fixed;
		inset: 0 0 auto;
		z-index: 200;
		background: transparent;
		border-bottom: 1px solid transparent;
		transition:
			background 0.5s ease,
			border-color 0.5s ease;
	}

	header.scrolled:not(.menu-open) {
		background: var(--glass-bg);
		backdrop-filter: blur(24px);
		-webkit-backdrop-filter: blur(24px);
		border-bottom-color: var(--glass-border);
	}

	.inner {
		max-width: clamp(320px, 95vw, 2500px);
		margin: 0 auto;
		padding: 0 clamp(5px, 4vw, 48px);
		height: 72px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 24px;
	}

	.brand {
		display: flex;
		align-items: center;
		gap: 10px;
		flex-shrink: 0;
		text-decoration: none;
		position: relative;
		z-index: 201;
	}

	.brand span {
		font-family: var(--heading);
		font-size: 17px;
		font-weight: 900;
		color: var(--text);
		letter-spacing: -0.5px;
		transition: color 0.3s ease;
	}

	/* When overlay is open, force brand text white */
	header.menu-open .brand span {
		color: #fff;
	}

	.controls {
		display: flex;
		align-items: center;
		gap: 8px;
		flex-shrink: 0;
		position: relative;
		z-index: 201;
	}

	.icon-btn {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		border: 1px solid var(--border);
		background: var(--surface);
		color: var(--text);
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition:
			background 0.2s,
			border-color 0.2s;

		&:hover {
			background: var(--surface-hv);
			border-color: var(--accent);
			color: var(--accent);
		}
	}

	/* When overlay open, style icon-btn for dark bg */
	header.menu-open .icon-btn {
		background: rgba(255, 255, 255, 0.08);
		border-color: rgba(255, 255, 255, 0.15);
		color: #fff;
	}

	/* ── Hamburger ── */
	.hamburger {
		display: flex;
		flex-direction: column;
		gap: 6px;
		width: 50px;
		height: 50px;
		border: none;
		background: var(--surface);
		cursor: pointer;
		align-items: center;
		justify-content: center;
		padding: 0;
		transition:
			background 0.2s,
			border-color 0.2s;

		&:hover {
			background: var(--surface-hv);
			border-color: var(--accent);
		}

		&-bar {
			display: block;
			width: 40px;
			height: 2px;
			background: var(--text);
			border-radius: 2px;
			transition:
				transform 0.35s cubic-bezier(0.23, 1, 0.32, 1),
				opacity 0.25s ease,
				width 0.25s ease;
			transform-origin: center;
		}
	}

	header.menu-open {
		.hamburger {
			background: rgba(255, 255, 255, 0.08);
		}

		.hamburger-bar {
			background: #fff;

			&:first-child {
				transform: translateY(4px) rotate(45deg);
			}

			&:last-child {
				transform: translateY(-4px) rotate(-45deg);
			}
		}
	}

	/* ── Full-screen overlay ── */
	.nav-overlay {
		position: fixed;
		inset: 0;
		z-index: 199;
		background: #0a0a0f;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		opacity: 0;
		transition:
			opacity 0.45s ease,
			visibility 0s linear 0.45s;
		visibility: hidden;
		pointer-events: none;

		&.open {
			opacity: 1;
			transition:
				opacity 0.45s ease,
				visibility 0s linear 0s;
			visibility: visible;
			pointer-events: all;

			.nav-item {
				opacity: 1;
				transform: translateY(0);
			}
		}

		.overlay-bg {
			position: absolute;
			inset: 0;
			width: 100%;
			height: 100%;
			pointer-events: none;
		}
	}

	/* ── Nav links inside overlay ── */
	.nav-links {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
		position: relative;
		z-index: 1;
	}

	.nav-item {
		font-family: var(--heading);
		font-size: clamp(2.8rem, 5.5vw, 5.5rem);
		font-weight: 600;
		letter-spacing: -0.03rem;
		line-height: 1.1;
		color: rgba(255, 255, 255, 0.85);
		text-decoration: none;
		padding: 8px 24px;
		border-radius: 12px;
		display: flex;
		align-items: center;
		gap: 12px;
		transition:
			color 0.4s ease,
			transform 0.4s ease;

		/* Staggered slide-up per item */
		opacity: 0;
		transform: translateY(30px);
		transition:
			opacity 0.5s ease calc(var(--i) * 80ms + 0.35s),
			transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)
				calc(var(--i) * 80ms + 0.35s),
			color 0.4s ease;

		&:hover {
			color: var(--accent);
			transform: translateX(8px) !important;
		}
	}

	.nav-cta {
		color: var(--pop) !important;
		margin-top: 16px;
	}

	.nav-cta:hover {
		color: var(--heading) !important;
	}

	.nav-cta .icon {
		opacity: 0.8;
	}
</style>
