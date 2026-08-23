---
layout: default
title: EntrSL Evidence
---

<section class="hero">
  <div class="hero__copy">
    <p class="breadcrumb">The Yes-Way <span>/</span> Evidence <span>/</span> EntrSL</p>
    <p class="eyebrow">The evidence beneath the Weight</p>
    <h1>Service is a classroom.<br><em>Build it like one.</em></h1>
    <p class="hero__dek">A critically appraised library for entrepreneurship-focused service-learning, connecting what we ask people to carry with what the experience can teach.</p>
    <div class="hero__actions">
      <a class="button button--primary" href="#library">Explore 25 papers</a>
      <a class="button button--quiet" href="{{ '/methodology/' | relative_url }}">See how they were chosen</a>
    </div>
  </div>
  <aside class="hero__manifesto">
    <span class="manifesto__number">02</span>
    <p class="eyebrow">Yes to the Weight</p>
    <blockquote>Strength to serve.<br>Service to grow.</blockquote>
    <p>Purposeful service contributes to others while developing judgment, skill, relationships, and a clearer knowledge of self.</p>
    <a href="{{ '/yes-way/' | relative_url }}">Place this evidence in the Yes-Way →</a>
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
    <h2>The evidence foundation for EntrSL.</h2>
  </div>
  <div>
    <p>This collection is broader than entrepreneurship service-learning alone. It combines direct EntrSL studies with transferable evidence about reflection, reciprocity, community partnership, institutional design, and student outcomes.</p>
    <p>That boundary is deliberate: the library informs how EntrSL should be built without pretending every selected paper studies entrepreneurship.</p>
  </div>
</section>

<section class="method-note">
  <div class="method-note__icon">Q</div>
  <div><strong>Journal reputation is not paper quality.</strong><p>“Top journal” identifies the top quartile by OpenAlex two-year mean citedness among the 21 journals represented here. It is not an SJR/JCR quartile, is not field-normalized, and never changes an article’s evidence score.</p></div>
  <a href="{{ '/methodology/' | relative_url }}">Methodology</a>
</section>

<section class="library" id="library">
  <header class="section-heading">
    <div><p class="eyebrow">The curated shelf</p><h2>Twenty-five papers.<br>Five evidence domains.</h2></div>
    <p>Ordered for use, not prestige: begin with synthesis, establish the theory, design the experience, protect reciprocity, then evaluate what changed.</p>
  </header>

{% assign categories = "Reviews & Meta-Analyses|Foundations & Theory|Design & Reflection|Reciprocity & Justice|Outcomes & Institutional Practice" | split: "|" %}
{% for category in categories %}
  {% assign papers = site.papers | where: "category", category | sort: "rank" %}
  <section class="library-section" id="{{ category | slugify }}">
    <header class="domain-heading">
      <span>0{{ forloop.index }}</span>
      <div><p class="eyebrow">Evidence domain</p><h3>{{ category }}</h3></div>
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
          <div class="journal-line"><em>{{ paper.journal }}</em>{% if paper.journal_rank_tier == "Top quartile in shortlist" %}<span class="journal-rank">Top journal</span>{% endif %}</div>
        </div>
        <div class="paper-row__score"><strong>{{ paper.total_score }}</strong><span>/ 10</span><small>article evidence</small><p>OpenAlex 2y {{ paper.journal_2yr_citedness }}<br>h-index {{ paper.journal_h_index }}</p></div>
      </article>
    {% endfor %}
    </div>
  </section>
{% endfor %}
</section>

<section class="closing-callout">
  <p class="eyebrow">The Yes-Way research loop</p>
  <h2>Carry the work.<br>Study what it teaches.<br>Improve the ground.</h2>
  <p>The library turns “Service to grow” from an attractive proposition into a researchable practice, with boundaries, partner voice, reflection, and evidence built in.</p>
  <a class="button button--light" href="{{ '/yes-way/' | relative_url }}">Read the framework</a>
</section>
