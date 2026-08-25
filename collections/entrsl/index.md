---
layout: default
title: EntrSL Research Collection
description: A curated research collection on service-learning and experiential learning, with relevance to entrepreneurship education.
nav: collections
collection_style: entrsl
---

<a class="back-link collection-crumb" href="{{ '/' | relative_url }}">← EntrLabs Research Library</a>

<section class="library-hero">
  <div class="library-hero__field" aria-hidden="true"></div>
  <div class="library-hero__copy">
    <p class="kicker">EntrSL Research Collection</p>
    <h1>Essential research for learning through experience and service</h1>
    <span class="rust-rule" aria-hidden="true"></span>
    <p class="hero-dek">A curated research collection on service-learning and experiential learning, with relevance to entrepreneurship education.</p>
    <div class="hero-actions">
      <a class="button button--rust" href="#library">Explore the library</a>
      <a class="text-link" href="{{ '/methodology/' | relative_url }}">Read the methodology</a>
    </div>
  </div>
  <div class="library-hero__art">
    <div class="hero-diamond" id="hero-diamond-canvas" aria-label="Interactive EntrSL collection diamond"></div>
    <p>Research for learning,<br>service, and community</p>
  </div>
</section>

<section class="scope-band" aria-labelledby="scope-heading">
  <p class="section-label" id="scope-heading">Scope</p>
  <p>EntrLabs curates and appraises peer-reviewed research across service-learning, experiential learning, and adjacent fields. Each paper is reviewed for methodological quality, relevance to EntrSL, and practical or conceptual contribution.</p>
  <span class="scope-mark">25</span>
</section>

<section class="domain-nav" aria-label="Research domains">
  {% assign domain_order = "Foundations & Theory|Reviews & Meta-Analyses|Design & Reflection|Reciprocity & Justice|Outcomes & Institutional Practice" | split: "|" %}
  <div class="domain-grid">
  {% for category in domain_order %}
    {% assign category_papers = site.papers | where: "category", category %}
    <a class="reveal" id="{{ category | slugify }}" href="#library">
      {% case forloop.index0 %}
      {% when 0 %}<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 6 L16 24 M6 8 L16 6 L26 8 L26 22 L16 24 L6 22 Z" stroke-linejoin="round" stroke-linecap="round"/><path d="M9 12 L13 12 M9 16 L13 16 M9 20 L13 20 M19 12 L23 12 M19 16 L23 16 M19 20 L23 20" stroke-linecap="round"/></svg>
      {% when 1 %}<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="7" y="5" width="14" height="17" rx="1"/><path d="M11 10 L17 10 M11 14 L17 14" stroke-linecap="round"/><circle cx="20" cy="21" r="4.2"/><path d="M23.2 24.2 L27 28" stroke-linecap="round"/></svg>
      {% when 2 %}<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M8 26 L8 21.5 L20.5 9 A2 2 0 0 1 23.5 9 L23.5 9 A2 2 0 0 1 23.5 12 L11 24.5 Z" stroke-linejoin="round" stroke-linecap="round"/><path d="M8 26 L12 25" stroke-linecap="round"/><path d="M18.5 11 L21.5 14" stroke-linecap="round"/></svg>
      {% when 3 %}<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 4 L16 24 M9 24 L23 24" stroke-linecap="round"/><path d="M16 8 L6 8 L6 8 A5 6 0 0 0 16 8 Z" stroke-linejoin="round"/><path d="M16 8 L26 8 L26 8 A5 6 0 0 1 16 8 Z" stroke-linejoin="round"/><circle cx="16" cy="5" r="1.4"/></svg>
      {% else %}<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M6 26 L26 26 M6 12 L16 5 L26 12 M8 12 L8 26 M24 12 L24 26 M13 12 L13 26 M19 12 L19 26" stroke-linecap="round" stroke-linejoin="round"/></svg>
      {% endcase %}
      <strong>{{ category }}</strong><span>{{ category_papers | size }} studies</span>
    </a>
  {% endfor %}
  </div>
</section>

<section class="article-library" id="library">
  <header class="article-library__header reveal">
    <div><p class="kicker">Curated scholarship</p><h2>25 reviewed articles</h2></div>
    <label class="sort-control">Sort by
      <select id="paper-sort">
        <option value="rank">Curator order</option>
        <option value="year-desc">Publication year (newest)</option>
        <option value="year-asc">Publication year (oldest)</option>
        <option value="title">Article title</option>
      </select>
    </label>
  </header>
  <div class="paper-table-wrap">
    <table class="paper-table">
      <thead><tr><th>#</th><th>Article</th><th>Authors / year</th><th>Appraisal</th><th>Study type</th><th>EntrSL relevance</th><th>DOI</th></tr></thead>
      <tbody id="paper-table-body">
      {% assign papers = site.papers | sort: "rank" %}
      {% for paper in papers %}
        <tr class="paper-record{% if forloop.index > 5 %} paper-record--extra{% endif %}" data-rank="{{ paper.rank }}" data-year="{{ paper.year }}" data-title="{{ paper.title | downcase | escape }}" data-category="{{ paper.category | slugify }}">
          <td class="paper-number">{{ paper.rank | prepend: '0' | slice: -2, 2 }}</td>
          <td><a class="paper-title" href="{{ paper.url | relative_url }}">{{ paper.title }}</a></td>
          <td><span class="paper-authors">{{ paper.authors }}</span><span class="paper-year">{{ paper.year }}</span></td>
          <td><strong class="appraisal-score">Quality {{ paper.evidence_quality_score }}/5</strong><span>Relevance {{ paper.relevance_score }}/5</span></td>
          <td>{{ paper.study_design }}</td>
          <td>{{ paper.synthesis }}</td>
          <td>{% if paper.doi != "" %}<a class="doi-link" href="https://doi.org/{{ paper.doi }}">{{ paper.doi }}</a>{% else %}<span>Not recorded</span>{% endif %}</td>
        </tr>
      {% endfor %}
      </tbody>
    </table>
  </div>
  <button class="view-all" id="view-all-papers" type="button" aria-expanded="false">View all 25 articles</button>
</section>

<section class="method-panel reveal">
  <div class="method-panel__art"><img src="{{ '/assets/images/entrsl-methodology-compass-accent.png' | relative_url }}" alt="An archival compass illustration"></div>
  <div class="method-panel__content">
    <p class="section-label">Methodology</p>
    <h2>Transparent selection. Bounded appraisal. Ongoing review.</h2>
    <div class="method-steps">
      <div><strong>1. Identification</strong><p>A census of 9,924 journal articles held in the curator’s Zotero library.</p></div>
      <div><strong>2. Screening</strong><p>Automated title-and-abstract screening created direct and near-scope candidate pools.</p></div>
      <div><strong>3. Curator appraisal</strong><p>Separate judgments of EntrSL relevance and evidence quality, with limitations recorded.</p></div>
      <div><strong>4. Inclusion and update</strong><p>Editorial inclusion decisions are revisable when corrections or stronger research emerge.</p></div>
    </div>
    <a class="text-link" href="{{ '/methodology/' | relative_url }}">Read the full methodology</a>
  </div>
</section>
