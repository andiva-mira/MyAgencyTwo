<script>
	import { onMount } from "svelte";

	let scrolled = false;
	let menuOpen = false;
	let dark = true;

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

	onMount(() => {
		const saved = localStorage.getItem("theme");
		if (saved === "light") {
			dark = false;
			document.documentElement.setAttribute("data-theme", "light");
		}
		const onScroll = () => (scrolled = window.scrollY > 60);
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	});
</script>

<header class:scrolled>
	<div class="inner">
		<!-- Brand logo -->
		<a class="brand" on:click|preventDefault={() => navTo("hero")} href="#hero">
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

		<!-- Desktop nav -->
		<nav class="nav-links" class:open={menuOpen}>
			<a on:click|preventDefault={() => navTo("services")} href="#services"
				>Services</a
			>
			<a on:click|preventDefault={() => navTo("why-us")} href="#why-us"
				>Why Us</a
			>
			<a
				on:click|preventDefault={() => navTo("quote")}
				href="#quote"
				class="btn btn-primary nav-cta"
			>
				Get a Quote
				<svg
					class="icon"
					width="14"
					height="14"
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

		<!-- Controls -->
		<div class="controls">
			<button class="icon-btn" on:click={toggleTheme} aria-label="Toggle theme">
				{#if dark}
					<!-- Sun -->
					<svg
						width="18"
						height="18"
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
						width="18"
						height="18"
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
				on:click={() => (menuOpen = !menuOpen)}
				aria-label="Menu"
			>
				<span class:x={menuOpen}></span>
				<span class:x={menuOpen}></span>
				<span class:x={menuOpen}></span>
			</button>
		</div>
	</div>
</header>

<style lang="scss">
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

	header.scrolled {
		background: var(--glass-bg);
		backdrop-filter: blur(24px);
		-webkit-backdrop-filter: blur(24px);
		border-bottom-color: var(--glass-border);
	}

	.inner {
		max-width: clamp(320px, 94vw, 1600px);
		margin: 0 auto;
		padding: 0 clamp(20px, 4vw, 48px);
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
	}

	.brand span {
		font-family: var(--heading);
		font-size: 17px;
		font-weight: 900;
		color: var(--text);
		letter-spacing: -0.5px;
	}

	.nav-links {
		display: flex;
		align-items: center;
		gap: 4px;
		margin-left: auto;
		margin-right: 16px;
	}

	.nav-links a {
		font-size: 14px;
		font-weight: 500;
		color: var(--text-2);
		padding: 8px 16px;
		border-radius: var(--radius-pill);
		transition:
			color 0.2s,
			background 0.2s;
		text-decoration: none;
	}

	.nav-links a:hover {
		color: var(--text);
		background: var(--surface);
	}

	.nav-cta {
		font-size: 14px !important;
		padding: 9px 20px !important;
		margin-left: 8px;
		color: #fff !important;
	}

	.controls {
		display: flex;
		align-items: center;
		gap: 8px;
		flex-shrink: 0;
	}

	.icon-btn {
		width: 38px;
		height: 38px;
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
	}

	.icon-btn:hover {
		background: var(--surface-hv);
		border-color: var(--accent);
		color: var(--accent);
	}

	.hamburger {
		display: none;
		flex-direction: column;
		gap: 5px;
		width: 38px;
		height: 38px;
		border: none;
		background: none;
		cursor: pointer;
		align-items: center;
		justify-content: center;
		padding: 0;
	}

	.hamburger span {
		display: block;
		width: 22px;
		height: 2px;
		background: var(--text);
		border-radius: 2px;
		transition:
			transform 0.25s,
			opacity 0.25s;
		transform-origin: center;
	}

	.hamburger span.x:nth-child(1) {
		transform: translateY(7px) rotate(45deg);
	}
	.hamburger span.x:nth-child(2) {
		opacity: 0;
	}
	.hamburger span.x:nth-child(3) {
		transform: translateY(-7px) rotate(-45deg);
	}

	@media (max-width: 768px) {
		.hamburger {
			display: flex;
		}

		.nav-links {
			display: none;
			position: fixed;
			top: 72px;
			inset-inline: 0;
			background: var(--bg-2);
			border-bottom: 1px solid var(--border);
			flex-direction: column;
			align-items: stretch;
			padding: 20px 24px 28px;
			gap: 6px;
			box-shadow: var(--shadow-lg);
		}

		.nav-links.open {
			display: flex;
		}

		.nav-links a {
			text-align: center;
		}

		.nav-cta {
			text-align: center;
			justify-content: center;
			margin-left: 0 !important;
		}
	}
</style>
