---
layout: default
title: EntrLabs Research Library
description: A living scholarly library connecting EntrLabs frameworks to the research that supports, challenges, and extends them.
nav: library
---


<section class="library-home-hero">
  <div class="library-home-hero__field" aria-hidden="true"></div>
  <img class="library-home-hero__mark" src="{{ '/assets/images/entr-mark-accent.png' | relative_url }}" alt="">
  <div class="library-home-hero__copy ledger-spine">
    <div class="hero-ordinal" aria-hidden="true">01</div>
    <p class="kicker">EntrLabs Research Library</p>
    <h1>Research foundations for ideas built to <em>matter</em></h1>
    <p class="home-hero-dek">A living scholarly library connecting EntrLabs frameworks to the research that supports, challenges, and extends them.</p>
    <div class="hero-actions">
      <a class="button button--rust" href="{{ '/collections/' | relative_url }}">Explore collections</a>
      <a class="text-link" href="{{ '/methodology/' | relative_url }}">How the library works</a>
    </div>
    <p class="home-curator">Published by <a href="https://entr.cc/entrlabs">EntrLabs</a> <span>Curated by <a href="https://josephiesue.com">Joseph E. Iesue</a></span></p>
  </div>
</section>

<section class="library-ledger" aria-label="Library overview">
  <div class="reveal"><strong>01</strong><span>Active research collection</span></div>
  <div class="reveal"><strong>03</strong><span>Collections in development</span></div>
  <div class="reveal"><strong>Living</strong><span>Versioned and revisable</span></div>
</section>

<section class="home-statement ledger-spine">
  <p class="section-label">The library</p>
  <blockquote>One scholarly home. <em>Many frameworks.</em> Each collection examines a distinct EntrLabs framework through <strong>a transparent body of research.</strong></blockquote>
  <p style="margin-top:34px;max-width:640px;font-size:1.1rem;color:var(--mist);line-height:1.65">Shared methods make collections comparable; collection-specific scope keeps each review intellectually honest.</p>
</section>

<section class="featured-collection" aria-labelledby="featured-collection-title">
  <div class="featured-collection__content">
    <p class="section-label">Inaugural collection</p>
    <p class="collection-code">Collection 01 / Active</p>
    <h2 id="featured-collection-title">EntrSL Research Collection</h2>
    <p>Research on service-learning and experiential learning, appraised for its relevance to entrepreneurship education, reciprocal community engagement, and reflective practice.</p>
    <a class="button button--rust" href="{{ '/collections/entrsl/' | relative_url }}">Enter the EntrSL collection</a>
  </div>
  <div class="featured-collection__art">
    <div class="motif-field" aria-hidden="true">
      <div class="motif-radar"></div>
      <svg viewBox="0 0 480 480" fill="none">
        <circle cx="240" cy="240" r="205" stroke="var(--hairline-strong)" stroke-width="1" stroke-dasharray="2 9" opacity=".6"/>
        <rect class="motif-diamond-outer" x="90" y="90" width="300" height="300" transform="rotate(45 240 240)" stroke="var(--accent-light)" stroke-opacity=".6" stroke-width="1.4"/>
        <rect class="motif-diamond-inner" x="160" y="160" width="160" height="160" transform="rotate(45 240 240)" stroke="var(--accent)" stroke-width="1.8"/>
        <g class="motif-orbit">
          <circle class="motif-node" cx="240" cy="42" r="5.5" fill="var(--accent-light)"/>
          <circle class="motif-node motif-node--b" cx="405" cy="155" r="5.5" fill="var(--accent-light)"/>
          <circle class="motif-node motif-node--c" cx="352" cy="382" r="5.5" fill="var(--accent-light)"/>
          <circle class="motif-node motif-node--d" cx="128" cy="382" r="5.5" fill="var(--accent-light)"/>
          <circle class="motif-node motif-node--e" cx="75" cy="155" r="5.5" fill="var(--accent-light)"/>
        </g>
        <line x1="55" y1="240" x2="425" y2="240" stroke="var(--hairline-strong)"/>
        <line x1="240" y1="55" x2="240" y2="425" stroke="var(--hairline-strong)"/>
        <text class="motif-numeral" x="240" y="252" text-anchor="middle" font-family="Cinzel, serif" font-size="36" fill="var(--accent-light)">I</text>
      </svg>
    </div>
    <div class="motif-sweep" aria-hidden="true"></div>
  </div>
</section>

<section class="research-map-section" aria-labelledby="research-map-title">
  <header>
    <div>
      <p class="section-label">Library map</p>
      <h2 id="research-map-title">Twenty-five papers. Five domains. One connected field.</h2>
    </div>
    <p>Every point represents one paper in the EntrSL collection. Select a domain to see how the current literature is distributed.</p>
  </header>
  <div class="research-map-shell">
    <canvas id="library-map" role="img" aria-label="Twenty-five papers grouped across five EntrSL research domains"></canvas>
    <div class="research-map-tooltip" id="library-map-tooltip" aria-hidden="true"></div>
    <div class="research-map-hint" aria-hidden="true">Drag to explore &middot; click a domain to open its collection</div>
  </div>
  <ul class="research-map-key" aria-label="Research domain counts">
    <li data-map-domain="0"><a href="{{ '/collections/entrsl/' | relative_url }}#foundations-theory"><span class="key-swatch" style="background:#2E5BD0"></span><span class="key-copy"><b>I</b><span>Foundations &amp; Theory</span></span><strong>5</strong></a></li>
    <li data-map-domain="1"><a href="{{ '/collections/entrsl/' | relative_url }}#reviews-meta-analyses"><span class="key-swatch" style="background:#4A74E0"></span><span class="key-copy"><b>II</b><span>Reviews &amp; Meta-Analyses</span></span><strong>4</strong></a></li>
    <li data-map-domain="2"><a href="{{ '/collections/entrsl/' | relative_url }}#design-reflection"><span class="key-swatch" style="background:#5B8CFF"></span><span class="key-copy"><b>III</b><span>Design &amp; Reflection</span></span><strong>5</strong></a></li>
    <li data-map-domain="3"><a href="{{ '/collections/entrsl/' | relative_url }}#reciprocity-justice"><span class="key-swatch" style="background:#8FB0FF"></span><span class="key-copy"><b>IV</b><span>Reciprocity &amp; Justice</span></span><strong>5</strong></a></li>
    <li data-map-domain="4"><a href="{{ '/collections/entrsl/' | relative_url }}#outcomes-institutional-practice"><span class="key-swatch" style="background:#B7C8FF"></span><span class="key-copy"><b>V</b><span>Outcomes &amp; Institutional Practice</span></span><strong>6</strong></a></li>
  </ul>
</section>

<section class="library-principles" aria-labelledby="principles-title">
  <header>
    <p class="section-label">Editorial standard</p>
    <h2 id="principles-title">Built for scrutiny, not certainty theatre.</h2>
  </header>
  <div class="principle-list">
    <div class="principle-row reveal"><span class="ord">01</span><h3>Transparent</h3><p>Scope, screening, appraisal, limitations, and updates are documented for scholarly inspection.</p></div>
    <div class="principle-row reveal"><span class="ord">02</span><h3>Bounded</h3><p>Each collection states what it can support, what remains uncertain, and where curator judgment enters.</p></div>
    <div class="principle-row reveal"><span class="ord">03</span><h3>Living</h3><p>Collections are versioned resources that can change when corrections or stronger research emerge.</p></div>
  </div>
</section>

<section class="coming-next" aria-labelledby="coming-next-title">
  <header>
    <p class="section-label">Collection programme</p>
    <h2 id="coming-next-title">Designed to grow without diluting the standard.</h2>
    <p>Additional EntrLabs framework collections join only once their scope, source base, appraisal method, and limitations are ready for public examination.</p>
  </header>
  <div class="coming-manifest">
    <div class="coming-row reveal"><span class="roman">II</span><div><h3>Service Leadership</h3><p>Research foundations for the deliberate practice of designing conditions where contribution becomes natural.</p></div><span class="tag">In development</span></div>
    <div class="coming-row reveal"><span class="roman">III</span><div><h3>String Leadership Theory</h3><p>Research underpinning EntrLabs&rsquo; model of distributed, tension-held leadership.</p></div><span class="tag">In development</span></div>
    <div class="coming-row reveal"><span class="roman">IV</span><div><h3>AIRe Framework</h3><p>Research supporting the AIRe framework for applied institutional practice.</p></div><span class="tag">In development</span></div>
  </div>
  <p class="coming-next-note">Curating a collection for a topic that belongs here? <a href="{{ '/contribute/' | relative_url }}">Propose it</a> &middot; <a href="{{ '/collections/' | relative_url }}">View all collections</a></p>
</section>

