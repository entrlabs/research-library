---
layout: default
title: EntrSL Research Collection
---

<section class="hero">
  <div class="hero__copy">
    <p class="breadcrumb">EntrLabs <span>/</span> Research Library <span>/</span> EntrSL</p>
    <p class="eyebrow">The evidence beneath the Weight</p>
    <h1>Service is a classroom.<br><em>Build it like one.</em></h1>
    <p class="hero__dek">A curator-reviewed library for entrepreneurship-focused service-learning, connecting what we ask people to carry with what the experience can teach.</p>
    <div class="hero__actions">
      <a class="button button--primary" href="#library">Explore 25 papers</a>
      <a class="button button--quiet" href="{{ '/methodology/' | relative_url }}">See how they were chosen</a>
    </div>
  </div>
  <aside class="hero__manifesto">
    <span class="manifesto__number">01</span>
    <p class="eyebrow">First research collection</p>
    <blockquote>EntrSL<br>Research Collection</blockquote>
    <p>Curated scholarship for entrepreneurship-focused service-learning, including direct, transferable, critical, and foundational research.</p>
    <p class="curator-line">Curated by <strong>Joseph E. Iesue</strong></p>
    <a href="{{ '/methodology/' | relative_url }}">Review the methodology →</a>
  </aside>
</section>

<section class="audit-strip" aria-label="Library audit summary">
  <div><strong>9,924</strong><span>Zotero journal articles audited</span></div>
  <div><strong>345</strong><span>direct candidates</span></div>
  <div><strong>25</strong><span>critically appraised papers</span></div>
  <div><strong>23</strong><span>full texts reviewed</span></div>
</section>

<section class="positioning">
  <div>
    <p class="eyebrow">What this is</p>
    <h2>A research foundation for EntrSL.</h2>
  </div>
  <div>
    <p>This collection is broader than entrepreneurship service-learning alone. It combines direct EntrSL studies with transferable evidence about reflection, reciprocity, community partnership, institutional design, and student outcomes.</p>
    <p>That boundary is deliberate: the library informs how EntrSL should be built without pretending every selected paper studies entrepreneurship.</p>
  </div>
</section>

<section class="method-note">
  <div class="method-note__icon">Q</div>
  <div><strong>Journal context is not article quality.</strong><p>Journal metrics are provided for context only. An “upper-quartile source” falls within the highest quarter of OpenAlex two-year mean citedness values among journals represented in this collection. Because citation patterns vary by field, the label is not a general journal ranking and does not influence any article appraisal.</p></div>
  <a href="{{ '/methodology/' | relative_url }}">Methodology</a>
</section>

<section class="library" id="library">
  <header class="section-heading">
    <div><p class="eyebrow">The curated shelf</p><h2>Twenty-five papers.<br>Five research domains.</h2></div>
    <p>Ordered for use, not prestige: begin with synthesis, establish the theory, design the experience, protect reciprocity, then evaluate what changed.</p>
  </header>

{% assign categories = "Reviews & Meta-Analyses|Foundations & Theory|Design & Reflection|Reciprocity & Justice|Outcomes & Institutional Practice" | split: "|" %}
{% for category in categories %}
  {% assign papers = site.papers | where: "category", category | sort: "rank" %}
  <section class="library-section" id="{{ category | slugify }}">
    <header class="domain-heading">
      <span>0{{ forloop.index }}</span>
      <div><p class="eyebrow">Research domain</p><h3>{{ category }}</h3></div>
      <p>{{ papers | size }} papers</p>
    </header>
    <div class="paper-list">
    {% for paper in papers %}
      <article class="paper-row">
        <a class="paper-row__rank" href="{{ paper.url | relative_url }}" aria-label="Read analysis of {{ paper.title }}">{{ paper.rank | prepend: '0' | slice: -2, 2 }}</a>
        <div class="paper-row__body">
          <div class="paper-row__tags"><span>{{ paper.study_design }}</span>{% unless paper.full_text_reviewed %}<span class="tag--alert">Full text required</span>{% endunless %}</div>
          <h4><a href="{{ paper.url | relative_url }}">{{ paper.title }}</a></h4>
          <p class="paper-row__authors">{{ paper.authors }} · {{ paper.year }}</p>
          <p>{{ paper.synthesis }}</p>
          <div class="journal-line"><em>{{ paper.journal }}</em>{% if paper.journal_rank_tier == "Upper quartile within collection" %}<span class="journal-rank">Upper-quartile source</span>{% endif %}</div>
        </div>
        <div class="paper-row__score"><strong>R {{ paper.relevance_score }}/5</strong><span>Q {{ paper.evidence_quality_score }}/5</span><small>curator appraisal</small><p>OpenAlex 2y {{ paper.journal_2yr_citedness }}<br>h-index {{ paper.journal_h_index }}</p></div>
      </article>
    {% endfor %}
    </div>
  </section>
{% endfor %}
</section>

<section class="closing-callout">
  <p class="eyebrow">EntrLabs research infrastructure</p>
  <h2>Find the foundations.<br>Test the claims.<br>Name the limits.</h2>
  <p>The EntrLabs Research Library connects frameworks and practices to direct findings, adjacent scholarship, critiques, and unanswered questions.</p>
  <a class="button button--light" href="{{ '/methodology/' | relative_url }}">Review the method</a>
</section>
