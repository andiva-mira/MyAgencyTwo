<script>
  import { reveal } from "./reveal.js";
  import { onMount } from "svelte";

  let gridEl;
  let vb = "-76 -76 1276 812";
  let bW = 1200;
  let bH = 660;

  onMount(() => {
    const update = () => {
      bW = gridEl.offsetWidth;
      bH = gridEl.offsetHeight;
      vb = `-76 -76 ${bW + 76} ${bH + 152}`;
    };
    update();
    const obs = new ResizeObserver(update);
    obs.observe(gridEl);
    return () => obs.disconnect();
  });

  const services = [
    {
      id: "dev",
      label: "01",
      title: "Custom Umbraco Development",
      desc: "Architected from the ground up. Clean .NET code, structured content models, and a CMS editors actually enjoy using.",
      icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
        <line x1="12" y1="2" x2="12" y2="22" opacity="0.4"/>
      </svg>`,
    },
    {
      id: "seo",
      label: "02",
      title: "SEO Optimisation",
      desc: "Technical SEO baked into every build. Fast pages, clean semantics, structured data, and content architecture that ranks.",
      icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        <path d="M8 11h6M11 8v6" opacity="0.5"/>
      </svg>`,
    },
    {
      id: "cloud",
      label: "03",
      title: "Umbraco Cloud",
      desc: "Git-based deployments, managed hosting, auto-upgrades. We set it all up.",
      icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
      </svg>`,
    },
    {
      id: "design",
      label: "04",
      title: "UX & UI Design",
      desc: "Interfaces built for conversion — clear hierarchy, purposeful motion, and editors who never need to call support.",
      icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>
      </svg>`,
    },
    {
      id: "perf",
      label: "05",
      title: "Performance Audits",
      desc: "Core Web Vitals, image optimisation, caching strategy. We make slow sites fast.",
      icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <path d="m13 2-2 6.9H7l5.9 4.3-2.4 6.8L16 15.4l5.9 4.3-2-6.3L22 8l-4 .1Z"/>
      </svg>`,
    },
    {
      id: "migrate",
      label: "06",
      title: "CMS Migrations",
      desc: "Moving from WordPress, Sitecore, or a custom build? We migrate cleanly — content, media, and all.",
      icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/>
        <path d="M21 3v5h-5"/>
      </svg>`,
    },
  ];
</script>

<section id="services" class="section-wrap services">
  <!-- Subtle dot-grid background -->
  <svg class="section-bg" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern
        id="svc-dots"
        width="36"
        height="36"
        patternUnits="userSpaceOnUse"
      >
        <circle cx="1" cy="1" r="0.9" fill="var(--accent)" opacity="0.12" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#svc-dots)" />
  </svg>

  <div class="inner">
    <div class="heading-row" use:reveal={{ delay: 0 }}>
      <div class="section-label">What We Build</div>
      <h2 class="section-h2">Six ways we<br />move the needle.</h2>
    </div>

    <!-- Services grid -->
    <div class="svc-grid" bind:this={gridEl}>
      <!--
        Desktop pipe network (viewBox coords map 1:1 to grid pixels via ResizeObserver):
        Main snake : (293,-60) ↓ bend→ right ↓ bend↓ bend← bend↓ (293,720)
        Branch A   : (907,-60) ↓ joins snake at (907,225)
        Branch B   : (-60,450) → T-junction at (600,450)
        Branch C   : (600,450) ↓ exits at (600,720)
        Branch D/E : two full-height verticals at (bW×0.7) and (bW-30) with bleeding joints below

        Arc bends (r=40, rounded elbows):
          Corner 1 — down→right  at (293,225):  A 40 40 0 0 0 333,225
          Corner 2 — right→down  at (907,225):  A 40 40 0 0 1 907,265
          Corner 3 — down→left   at (907,450):  A 40 40 0 0 1 867,450
          Corner 4 — left→down   at (293,450):  A 40 40 0 0 0 293,490
      -->
      <svg
        class="pipe-bg"
        use:reveal={{ y: 0, duration: 900, rootMargin: '-5% 0px -5% 0px' }}
        viewBox={vb}
        preserveAspectRatio="none"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        <!-- ── Outer glow / shadow layer ── -->
        <!-- <g
          fill="none"
          stroke="var(--accent)"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="14"
          opacity="0.06"
        >
          <path
            d="M293,-60 L293,185 A40,40,0,0,0,333,225 L867,225 A40,40,0,0,1,907,265 L907,410 A40,40,0,0,1,867,450 L333,450 A40,40,0,0,0,293,490 L293,720"
          />
          <path d="M907,-60 L907,265" />
          <path d="M-60,450 L600,450" />
          <path d="M600,450 L600,720" />
          <path d="M{bW - 30},-60 L{bW - 30},{bH + 60}" />
          <path d="M{bW * 0.7},-60 L{bW * 0.7},{bH + 60}" />
        </g> -->

        <!-- ── Pipe body layer ── -->
        <g
          fill="none"
          stroke="var(--accent)"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="4"
          opacity="0.25"
        >
          <path
            d="M293,-60 L293,185 A40,40,0,0,0,333,225 L867,225 A40,40,0,0,1,907,265 L907,410 A40,40,0,0,1,867,450 L333,450 A40,40,0,0,0,293,490 L293,720"
          />
          <path d="M907,-60 L907,265" />
          <path d="M-60,450 L600,450" />
          <path d="M600,450 L600,720" />
          <path d="M{bW - 30},-60 L{bW - 30},{bH + 60}" />
          <path d="M{bW * 0.7},-60 L{bW * 0.7},{bH + 60}" />
        </g>

        <!-- ── Inner highlight (top-lit) ── -->
        <!-- <g
          fill="none"
          stroke="white"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          opacity="0.10"
        >
          <path
            d="M293,-60 L293,185 A40,40,0,0,0,333,225 L867,225 A40,40,0,0,1,907,265 L907,410 A40,40,0,0,1,867,450 L333,450 A40,40,0,0,0,293,490 L293,720"
          />
          <path d="M907,-60 L907,265" />
          <path d="M-60,450 L600,450" />
          <path d="M600,450 L600,720" />
          <path d="M{bW - 30},-60 L{bW - 30},{bH + 60}" />
          <path d="M{bW * 0.7},-60 L{bW * 0.7},{bH + 60}" />
        </g> -->

        <!-- ── Animated flow dashes ── -->
        <g
          fill="none"
          stroke="var(--accent)"
          stroke-linecap="round"
          stroke-width="1"
          opacity="0.8"
        >
          <path
            d="M293,-60 L293,185 A40,40,0,0,0,333,225 L867,225 A40,40,0,0,1,907,265 L907,410 A40,40,0,0,1,867,450 L333,450 A40,40,0,0,0,293,490 L293,720"
            stroke-dasharray="2 28"
            pathLength="1000"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="-30"
              dur="2.8s"
              repeatCount="indefinite"
            />
          </path>
          <path d="M907,-60 L907,265" stroke-dasharray="2 28" pathLength="300">
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="-30"
              dur="2.8s"
              repeatCount="indefinite"
            />
          </path>
          <path d="M-60,450 L600,450" stroke-dasharray="2 28" pathLength="300">
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="-30"
              dur="2.8s"
              repeatCount="indefinite"
            />
          </path>
          <path d="M600,450 L600,720" stroke-dasharray="2 28" pathLength="300">
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="-30"
              dur="2.8s"
              repeatCount="indefinite"
            />
          </path>
          <path
            d="M{bW - 30},-60 L{bW - 30},{bH + 60}"
            stroke-dasharray="2 28"
            pathLength="500"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="-30"
              dur="2.8s"
              repeatCount="indefinite"
            />
          </path>
          <path
            d="M{bW * 0.7},-60 L{bW * 0.7},{bH + 60}"
            stroke-dasharray="2 28"
            pathLength="500"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="-30"
              dur="2.8s"
              repeatCount="indefinite"
            />
          </path>
        </g>

        <!-- ── Joints + entry/exit caps — unified style ── -->
        <g
          fill="var(--bg-2)"
          stroke="var(--accent)"
          stroke-width="4"
          opacity="0.4"
        >
          <!-- Entry / exit caps -->
          <circle cx="293" cy="-60" r="6" />
          <circle cx="907" cy="-60" r="6" />
          <circle cx="-60" cy="450" r="6" />
          <circle cx="293" cy="720" r="6" />
          <circle cx="600" cy="720" r="6" />
          <!-- Bleeding joints below grid -->
          <circle cx={bW - 30} cy={bH + 60} r="6" />
          <circle cx={bW * 0.7} cy={bH + 60} r="6" />
        </g>
      </svg>

      <!-- Simplified snake pipe for mobile — fully dynamic coords -->
      <svg
        class="pipe-bg-mobile"
        use:reveal={{ y: 0, duration: 900, rootMargin: '-5% 0px -5% 0px' }}
        viewBox={vb}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <!-- ── Outer glow ── -->
        <!-- <g fill="none" stroke="var(--accent)" stroke-linecap="round" stroke-linejoin="round" stroke-width="14" opacity="0.06">
          <path d="M{bW*0.25},-60 L{bW*0.25},{bH*0.33-40} A40,40,0,0,0,{bW*0.25+40},{bH*0.33} L{bW*0.75-40},{bH*0.33} A40,40,0,0,1,{bW*0.75},{bH*0.33+40} L{bW*0.75},{bH*0.67-40} A40,40,0,0,1,{bW*0.75-40},{bH*0.67} L{bW*0.25+40},{bH*0.67} A40,40,0,0,0,{bW*0.25},{bH*0.67+40} L{bW*0.25},{bH+60}" />
        </g> -->
        <!-- ── Pipe body ── -->
        <g fill="none" stroke="var(--accent)" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" opacity="0.25">
          <path d="M{bW*0.25},-60 L{bW*0.25},{bH*0.33-40} A40,40,0,0,0,{bW*0.25+40},{bH*0.33} L{bW*0.75-40},{bH*0.33} A40,40,0,0,1,{bW*0.75},{bH*0.33+40} L{bW*0.75},{bH*0.67-40} A40,40,0,0,1,{bW*0.75-40},{bH*0.67} L{bW*0.25+40},{bH*0.67} A40,40,0,0,0,{bW*0.25},{bH*0.67+40} L{bW*0.25},{bH+60}" />
        </g>
        <!-- ── Inner highlight ── -->
        <!-- <g fill="none" stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" opacity="0.10">
          <path d="M{bW*0.25},-60 L{bW*0.25},{bH*0.33-40} A40,40,0,0,0,{bW*0.25+40},{bH*0.33} L{bW*0.75-40},{bH*0.33} A40,40,0,0,1,{bW*0.75},{bH*0.33+40} L{bW*0.75},{bH*0.67-40} A40,40,0,0,1,{bW*0.75-40},{bH*0.67} L{bW*0.25+40},{bH*0.67} A40,40,0,0,0,{bW*0.25},{bH*0.67+40} L{bW*0.25},{bH+60}" />
        </g> -->
        <!-- ── Animated flow dashes ── -->
        <g fill="none" stroke="var(--accent)" stroke-linecap="round" stroke-width="2" opacity="0.40">
          <path
            d="M{bW*0.25},-60 L{bW*0.25},{bH*0.33-40} A40,40,0,0,0,{bW*0.25+40},{bH*0.33} L{bW*0.75-40},{bH*0.33} A40,40,0,0,1,{bW*0.75},{bH*0.33+40} L{bW*0.75},{bH*0.67-40} A40,40,0,0,1,{bW*0.75-40},{bH*0.67} L{bW*0.25+40},{bH*0.67} A40,40,0,0,0,{bW*0.25},{bH*0.67+40} L{bW*0.25},{bH+60}"
            stroke-dasharray="2 28"
            pathLength="1000"
          >
            <animate attributeName="stroke-dashoffset" from="0" to="-30" dur="2.8s" repeatCount="indefinite" />
          </path>
        </g>
        <!-- ── Entry / exit caps ── -->
        <g fill="var(--bg-2)" stroke="var(--accent)" stroke-width="2.5" opacity="0.45">
          <circle cx={bW*0.25} cy={-60} r="9" />
          <circle cx={bW*0.25} cy={bH+60} r="9" />
        </g>
      </svg>

      {#each services as svc, i}
        <div class="svc-cell glass" use:reveal={{ delay: i * 120, y: 40, rootMargin: '-5% 0px -5% 0px' }}>
          <article class="svc-card">
            <div class="card-top">
              <span class="card-num">{svc.label}</span>
              <div class="card-icon-wrap">
                {@html svc.icon}
              </div>
            </div>
            <h3>{svc.title}</h3>
            <p>{svc.desc}</p>
          </article>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .hidden {
    display: none;
  }
  .services {
    position: relative;
    overflow: hidden;
    background: var(--bg-2);
    border-top: 1px solid var(--border);
  }

  .section-bg {
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
  }

  .heading-row {
    margin-bottom: clamp(40px, 6vw, 72px);
  }

  .section-h2 {
    font-size: clamp(36px, 5vw, 64px);
    letter-spacing: -2px;
    line-height: 1;
  }

  /* ── Services grid ───────────────────────── */
  .svc-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 40px;
    position: relative;
  }

  /* ── Pipe backgrounds — bleed 60px beyond the grid ── */
  .pipe-bg,
  .pipe-bg-mobile {
    position: absolute;
    top: -76px;
    left: -76px;
    width: calc(100% + 76px);
    height: calc(100% + 152px);
    pointer-events: none;
    z-index: 0;
  }

  .pipe-bg-mobile {
    display: none;
  }

  .svc-cell {
    position: relative;
    z-index: 1;
  }

  /* ── Service card ─────────────────────────── */
  .svc-card {
    height: 100%;
    padding: clamp(24px, 3vw, 36px);
    display: flex;
    flex-direction: column;
    gap: 16px;
    transition:
      border-color 0.25s,
      box-shadow 0.25s,
      transform 0.25s;
    cursor: default;
    background: color-mix(in srgb, var(--glass-bg) 35%, transparent);
  }

  .svc-card:hover {
    border-color: var(--border-a);
    box-shadow: var(--shadow-md), var(--shadow-glow);
    transform: translateY(-3px);
  }

  .card-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .card-num {
    font-family: var(--heading);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1.5px;
    color: var(--text-2);
  }

  .card-icon-wrap {
    color: var(--accent);
    transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .svc-card:hover .card-icon-wrap {
    transform: rotate(12deg) scale(1.1);
  }

  .svc-card h3 {
    font-size: clamp(15px, 1.4vw, 19px);
    font-weight: 700;
    color: var(--text);
    line-height: 1.25;
    margin-top: auto;
  }

  .svc-card p {
    font-size: 14px;
    color: var(--text-2);
    line-height: 1.65;
  }

  /* ── Responsive ─────────────────────────── */
  @media (max-width: 900px) {
    .svc-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
    }
    .pipe-bg {
      display: none;
    }
    .pipe-bg-mobile {
      display: block;
    }
  }

  @media (max-width: 560px) {
    .svc-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
