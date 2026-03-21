<footer class="footer">
  <div class="inner">
    <div class="brand-col">
      <a
        class="brand"
        href="#hero"
        on:click|preventDefault={() =>
          window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <svg
          width="44"
          height="30"
          viewBox="0 0 44 30"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M2 28 L12 4 L22 28"
            stroke="var(--text-2)"
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
      <p class="tagline">Umbraco development & SEO.<br />Depth over breadth.</p>
    </div>

    <nav class="footer-nav">
      <a
        href="#services"
        on:click|preventDefault={() =>
          document
            .getElementById("services")
            ?.scrollIntoView({ behavior: "smooth" })}
      >
        Services
      </a>
      <a
        href="#why-us"
        on:click|preventDefault={() =>
          document
            .getElementById("why-us")
            ?.scrollIntoView({ behavior: "smooth" })}
      >
        Why Us
      </a>
      <a
        href="#quote"
        on:click|preventDefault={() =>
          document
            .getElementById("quote")
            ?.scrollIntoView({ behavior: "smooth" })}
      >
        Get a Quote
      </a>
    </nav>
  </div>

  <div class="bottom">
    <div class="inner bottom-inner">
      <span>© {new Date().getFullYear()} M&M Studio. All rights reserved.</span
      >
    </div>
  </div>
</footer>

<style lang="scss">
  .footer {
    background: var(--bg);
    border-top: 1px solid var(--border);
  }

  .inner {
    max-width: clamp(320px, 92vw, 1400px);
    margin: 0 auto;
    padding: 0 clamp(24px, 6vw, 96px);
  }

  .footer > .inner {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 48px;
    padding-top: 52px;
    padding-bottom: 52px;
    flex-wrap: wrap;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    margin-bottom: 16px;
  }

  .brand span {
    font-family: var(--heading);
    font-size: 16px;
    font-weight: 900;
    color: var(--text);
    letter-spacing: -0.5px;
  }

  .tagline {
    font-size: 13px;
    color: var(--text-2);
    line-height: 1.6;
  }

  .footer-nav {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    align-items: center;
  }

  .footer-nav a {
    font-size: 14px;
    color: var(--text-2);
    padding: 6px 14px;
    border-radius: var(--radius-pill);
    transition:
      color 0.2s,
      background 0.2s;
  }

  .footer-nav a:hover {
    color: var(--accent);
    background: var(--accent-dim);
  }

  .bottom {
    border-top: 1px solid var(--border);
  }

  .bottom-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 20px;
    padding-bottom: 20px;
    font-size: 12px;
    color: var(--text-2);
    flex-wrap: wrap;
    gap: 8px;
  }
</style>
