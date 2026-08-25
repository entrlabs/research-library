---
layout: default
title: EntrLabs Research Library
description: Curated research foundations for EntrLabs frameworks, learning models, and practices.
nav: library
---

<section class="library-home-hero">
  <div class="library-home-hero__copy">
    <p class="kicker">EntrLabs Research Library</p>
    <h1>Research foundations for ideas built to matter</h1>
    <p class="home-hero-dek">A living scholarly library connecting EntrLabs frameworks to the research that supports, challenges, and extends them.</p>
    <div class="hero-actions">
      <a class="button button--rust" href="{{ '/collections/' | relative_url }}">Explore collections</a>
      <a class="text-link" href="{{ '/methodology/' | relative_url }}">How the library works</a>
    </div>
    <p class="home-curator">Published by EntrLabs <span>Curated by Joseph E. Iesue</span></p>
  </div>
  <div class="library-home-hero__visual">
    <img src="{{ '/assets/images/library-constellation.png' | relative_url }}" alt="An open scholarly folio connecting research, frameworks, community, and learning">
  </div>
</section>

<section class="library-ledger" aria-label="Library overview">
  <div><strong>01</strong><span>Active research collection</span></div>
  <div><strong>25</strong><span>Curated journal articles</span></div>
  <div><strong>05</strong><span>Research domains</span></div>
  <div><strong>Living</strong><span>Versioned and revisable</span></div>
</section>

<section class="home-statement">
  <p class="section-label">The library</p>
  <div>
    <h2>One scholarly home.<br>Many frameworks.</h2>
    <p>Each collection examines a distinct EntrLabs framework through a transparent body of research. Shared methods make collections comparable; collection-specific scope keeps each review intellectually honest.</p>
  </div>
</section>

<section class="featured-collection" aria-labelledby="featured-collection-title">
  <div class="featured-collection__content">
    <p class="section-label">Inaugural collection</p>
    <p class="collection-code">Collection 01 / Active</p>
    <h2 id="featured-collection-title">EntrSL Research Collection</h2>
    <p>Research on service-learning and experiential learning, appraised for its relevance to entrepreneurship education, reciprocal community engagement, and reflective practice.</p>
    <dl class="collection-metrics">
      <div><dt>Articles</dt><dd>25</dd></div>
      <div><dt>Domains</dt><dd>5</dd></div>
      <div><dt>Source census</dt><dd>9,924</dd></div>
    </dl>
    <a class="button button--rust" href="{{ '/collections/entrsl/' | relative_url }}">Enter the EntrSL collection</a>
  </div>
  <div class="featured-collection__art">
    <img src="{{ '/assets/images/library-hero-accent.png' | relative_url }}" alt="The EntrSL collection represented by an archival open book and growing botanical form">
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
  </div>
  <ul class="research-map-key" aria-label="Research domain counts">
    <li data-map-domain="0"><span>Foundations &amp; Theory</span><strong>5</strong></li>
    <li data-map-domain="1"><span>Reviews &amp; Meta-Analyses</span><strong>4</strong></li>
    <li data-map-domain="2"><span>Design &amp; Reflection</span><strong>5</strong></li>
    <li data-map-domain="3"><span>Reciprocity &amp; Justice</span><strong>5</strong></li>
    <li data-map-domain="4"><span>Outcomes &amp; Institutional Practice</span><strong>6</strong></li>
  </ul>
</section>

<section class="library-principles" aria-labelledby="principles-title">
  <header>
    <p class="section-label">Editorial standard</p>
    <h2 id="principles-title">Built for scrutiny, not certainty theatre.</h2>
  </header>
  <div class="principle-grid">
    <article><span>01</span><h3>Transparent</h3><p>Scope, screening, appraisal, limitations, and updates are documented for scholarly inspection.</p></article>
    <article><span>02</span><h3>Bounded</h3><p>Each collection states what it can support, what remains uncertain, and where curator judgment enters.</p></article>
    <article><span>03</span><h3>Living</h3><p>Collections are versioned resources that can change when corrections or stronger research emerge.</p></article>
  </div>
</section>

<section class="coming-next" aria-labelledby="coming-next-title">
  <header>
    <p class="section-label">Collection programme</p>
    <h2 id="coming-next-title">Designed to grow without diluting the standard.</h2>
    <p>Additional EntrLabs framework collections join only once their scope, source base, appraisal method, and limitations are ready for public examination.</p>
  </header>
  <div class="coming-next-grid">
    <div class="coming-card"><span class="roman">II</span><h3>Service Leadership</h3><p>Research foundations for the deliberate practice of designing conditions where contribution becomes natural.</p><span class="tag">In development</span></div>
    <div class="coming-card"><span class="roman">III</span><h3>String Leadership Theory</h3><p>Research underpinning EntrLabs&rsquo; model of distributed, tension-held leadership.</p><span class="tag">In development</span></div>
    <div class="coming-card"><span class="roman">IV</span><h3>AIRe Framework</h3><p>Research supporting the AIRe framework for applied institutional practice.</p><span class="tag">In development</span></div>
  </div>
  <p class="coming-next-note">Curating a collection for a topic that belongs here? <a href="{{ '/contribute/' | relative_url }}">Propose it</a> &middot; <a href="{{ '/collections/' | relative_url }}">View all collections</a></p>
</section>
