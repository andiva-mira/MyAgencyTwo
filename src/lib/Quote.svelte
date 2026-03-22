<script>
  import { reveal } from "./reveal.js";

  const services = [
    "Custom Development",
    "SEO Optimisation",
    "Umbraco Cloud",
    "UX & UI Design",
    "Performance Audit",
    "CMS Migration",
  ];

  let name = "";
  let email = "";
  let message = "";
  let selectedService = services[0];
  let status = "idle"; // idle | loading | success | error
  let errors = { name: "", email: "", message: "" };

  function validate() {
    errors = { name: "", email: "", message: "" };
    let ok = true;
    if (!name.trim()) {
      errors.name = "Required";
      ok = false;
    }
    if (!email.trim()) {
      errors.email = "Required";
      ok = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Invalid email";
      ok = false;
    }
    if (!message.trim() || message.length < 15) {
      errors.message = "Tell us a bit more (min 15 chars)";
      ok = false;
    }
    return ok;
  }

  async function submit() {
    if (!validate()) return;
    status = "loading";
    try {
      // Replace with your real endpoint
      const res = await fetch("https://formspree.io/f/mdawvnaj", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          service: selectedService,
        }),
      });
      if (!res.ok) throw new Error();
      status = "success";
      name = "";
      email = "";
      message = "";
      selectedService = "";
    } catch {
      status = "error";
    }
  }
</script>

<section id="quote" class="section-wrap quote">
  <!-- SVG background: grid lines + glowing ring -->
  <svg
    class="quote-bg"
    viewBox="0 0 1200 700"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <radialGradient id="glow-grad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="var(--accent)" stop-opacity="0.08" />
        <stop offset="100%" stop-color="var(--accent)" stop-opacity="0" />
      </radialGradient>
      <pattern
        id="q-lines"
        x="0"
        y="0"
        width="60"
        height="60"
        patternUnits="userSpaceOnUse"
      >
        <line
          x1="60"
          y1="0"
          x2="60"
          y2="60"
          stroke="var(--accent)"
          stroke-width="0.5"
          opacity="0.18"
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#q-lines)" />
    <ellipse cx="200" cy="350" rx="300" ry="300" fill="url(#glow-grad)" />
  </svg>

  <div class="inner">
    <div class="left-col" use:reveal={{ delay: 0 }}>
      <div class="section-label">Get a Quote</div>
      <h2 class="q-heading">
        Start a<br /><span class="pop-word">project.</span>
      </h2>
      <p class="q-sub">
        No fluff, no long discovery calls before we know if we're the right fit.
        Fill in the short form and we'll reply within one business day.
      </p>

      <ul class="q-promises">
        {#each ["Free initial assessment", "48-hour response", "No obligations"] as item}
          <li>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="var(--accent)"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="3 8 7 12 13 5" />
            </svg>
            {item}
          </li>
        {/each}
      </ul>
    </div>

    <div class="right-col" use:reveal={{ delay: 140 }}>
      {#if status === "success"}
        <div class="success-msg glass">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--accent)"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="8 12 11 15 16 9" />
          </svg>
          <p>Message sent. We'll be in touch shortly.</p>
        </div>
      {:else}
        <form class="q-form glass" on:submit|preventDefault={submit} novalidate>
          <!-- Service chips -->
          <div class="field">
            <span
              class="field-label"
              role="group"
              aria-label="What do you need?">What do you need?</span
            >
            <div class="chips">
              {#each services as svc}
                <button
                  type="button"
                  class="chip"
                  class:selected={selectedService === svc}
                  on:click={() =>
                    (selectedService = selectedService === svc ? "" : svc)}
                >
                  {svc}
                </button>
              {/each}
            </div>
          </div>

          <div class="row-2">
            <div class="field" class:has-error={errors.name}>
              <label class="field-label" for="q-name">Your Name</label>
              <input
                id="q-name"
                type="text"
                bind:value={name}
                placeholder="Alex Johnson"
                class:invalid={errors.name}
              />
              {#if errors.name}<span class="err-msg">{errors.name}</span>{/if}
            </div>
            <div class="field" class:has-error={errors.email}>
              <label class="field-label" for="q-email">Email</label>
              <input
                id="q-email"
                type="email"
                bind:value={email}
                placeholder="alex@company.com"
                class:invalid={errors.email}
              />
              {#if errors.email}<span class="err-msg">{errors.email}</span>{/if}
            </div>
          </div>

          <!-- Project type dropdown (synced with chips) -->
          <div class="field">
            <label class="field-label" for="q-project-type"
              >Your project type</label
            >
            <div class="select-wrap">
              <select
                id="q-project-type"
                bind:value={selectedService}
                class="project-type-select"
              >
                <option value="">Select a service…</option>
                {#each services as svc}
                  <option value={svc}>{svc}</option>
                {/each}
              </select>
              <svg
                class="select-arrow"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <polyline points="2 4 6 8 10 4" />
              </svg>
            </div>
          </div>

          <div class="field" class:has-error={errors.message}>
            <label class="field-label" for="q-message">About your project</label
            >
            <textarea
              id="q-message"
              rows="4"
              bind:value={message}
              placeholder="Tell us about your goals, current stack, timeline…"
              class:invalid={errors.message}
            ></textarea>
            {#if errors.message}<span class="err-msg">{errors.message}</span
              >{/if}
          </div>

          {#if status === "error"}
            <div class="error-banner">
              Something went wrong — please try again.
            </div>
          {/if}

          <button
            type="submit"
            class="btn btn-primary submit-btn"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Sending…" : "Send Message"}
            {#if status !== "loading"}
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
            {/if}
          </button>
        </form>
      {/if}
    </div>
  </div>
</section>

<style lang="scss">
  .quote {
    position: relative;
    overflow: hidden;
    background: var(--bg-2);
    border-top: 1px solid var(--border);
  }

  .quote-bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  .inner {
    position: relative;
    z-index: 1;
    max-width: clamp(320px, 95vw, 2500px);
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: clamp(40px, 6vw, 96px);
    align-items: flex-start;
  }

  /* ── Left column ────────────────────────── */
  .q-heading {
    font-size: clamp(44px, 6.5vw, 88px);
    letter-spacing: -3px;
    line-height: 0.95;
    margin-bottom: 24px;
  }

  .pop-word {
    color: var(--pop);
  }

  .q-sub {
    font-size: clamp(15px, 1.3vw, 17px);
    color: var(--text-2);
    line-height: 1.72;
    margin-bottom: 32px;
    max-width: 380px;
  }

  .q-promises {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .q-promises li {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 14px;
    color: var(--text-2);
    font-weight: 500;
  }

  /* ── Form ───────────────────────────────── */
  .q-form {
    padding: clamp(28px, 3vw, 44px);
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .field-label {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    color: var(--text-2);
  }

  /* Project type select */
  .select-wrap {
    position: relative;
    display: flex;
    align-items: center;
  }

  .project-type-select {
    font-family: var(--body);
    font-size: 15px;
    color: var(--text);
    background: var(--surface);
    border: 1.5px solid var(--border);
    border-radius: var(--radius-sm);
    padding: 12px 40px 12px 16px;
    outline: none;
    width: 100%;
    appearance: none;
    cursor: pointer;
    transition:
      border-color 0.2s,
      background 0.2s;
  }

  .project-type-select:focus {
    border-color: var(--accent);
    background: var(--accent-dim);
  }

  .project-type-select option {
    background: var(--bg-2);
    color: var(--text);
  }

  .select-arrow {
    position: absolute;
    right: 14px;
    color: var(--text-2);
    pointer-events: none;
  }

  /* Chips */
  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .chip {
    font-family: var(--body);
    font-size: 13px;
    font-weight: 500;
    padding: 7px 16px;
    border-radius: var(--radius-pill);
    border: 1.5px solid var(--border);
    background: var(--surface);
    color: var(--text-2);
    cursor: pointer;
    transition:
      border-color 0.2s,
      background 0.2s,
      color 0.2s;
  }

  .chip:hover {
    border-color: var(--accent);
    color: var(--accent);
    background: var(--accent-dim);
  }

  .chip.selected {
    border-color: var(--accent);
    background: var(--accent-dim);
    color: var(--accent);
  }

  .row-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  input,
  textarea {
    font-family: var(--body);
    font-size: 15px;
    color: var(--text);
    background: var(--surface);
    border: 1.5px solid var(--border);
    border-radius: var(--radius-sm);
    padding: 12px 16px;
    outline: none;
    resize: vertical;
    transition:
      border-color 0.2s,
      background 0.2s;
  }

  input::placeholder,
  textarea::placeholder {
    color: var(--text-2);
  }

  input:focus,
  textarea:focus {
    border-color: var(--accent);
    background: var(--accent-dim);
  }

  input.invalid,
  textarea.invalid {
    border-color: rgba(255, 77, 40, 0.6);
  }

  .err-msg {
    font-size: 11px;
    color: var(--pop);
    font-weight: 500;
  }

  .error-banner {
    font-size: 13px;
    color: var(--pop);
    background: rgba(255, 77, 40, 0.1);
    border: 1px solid rgba(255, 77, 40, 0.25);
    border-radius: var(--radius-sm);
    padding: 10px 14px;
  }

  .submit-btn {
    align-self: flex-start;
    font-size: 15px;
    padding: 14px 32px;
  }

  .submit-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }

  .success-msg {
    padding: 48px 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    text-align: center;
  }

  .success-msg p {
    font-size: 17px;
    color: var(--text-2);
  }

  /* ── Responsive ─────────────────────────── */
  @media (max-width: 860px) {
    .inner {
      grid-template-columns: 1fr;
    }
    .q-sub {
      max-width: 100%;
    }
  }

  @media (max-width: 480px) {
    .row-2 {
      grid-template-columns: 1fr;
    }
    .submit-btn {
      width: 100%;
      justify-content: center;
    }
  }
</style>
