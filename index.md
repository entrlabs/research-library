---
layout: default
title: EntrSL Research Collection
description: A curated research collection on service-learning and experiential learning, with relevance to entrepreneurship education.
---

<section class="library-hero">
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
    <img src="{{ '/assets/images/library-hero.png' | relative_url }}" alt="An archival botanical illustration growing from an open book">
    <p>Research for learning,<br>service, and community</p>
  </div>
</section>

<section class="scope-band" aria-labelledby="scope-heading">
  <p class="section-label" id="scope-heading">Scope</p>
  <p>EntrLabs curates and appraises peer-reviewed research across service-learning, experiential learning, and adjacent fields. Each paper is reviewed for methodological quality, relevance to EntrSL, and practical or conceptual contribution.</p>
  <span class="scope-mark">25</span>
</section>

<section class="domain-nav" aria-label="Research domains">
  <img class="domain-icons" src="{{ '/assets/images/category-icons.png' | relative_url }}" alt="Five research-domain symbols">
  {% assign domain_order = "Foundations & Theory|Reviews & Meta-Analyses|Design & Reflection|Reciprocity & Justice|Outcomes & Institutional Practice" | split: "|" %}
  <div class="domain-grid">
  {% for category in domain_order %}
    {% assign category_papers = site.papers | where: "category", category %}
    <a href="#{{ category | slugify }}"><strong>{{ category }}</strong><span>{{ category_papers | size }} studies</span></a>
  {% endfor %}
  </div>
</section>

<section class="article-library" id="library">
  <header class="article-library__header">
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

<section class="method-panel">
  <div class="method-panel__art"><img src="{{ '/assets/images/methodology-compass.png' | relative_url }}" alt="An archival compass illustration"></div>
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
