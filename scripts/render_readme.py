#!/usr/bin/env python3
"""Render the branded repository README from the selected catalog."""
import json
from pathlib import Path
root=Path(__file__).resolve().parents[1]
papers=json.loads((root/'_data/catalog.json').read_text())
categories=[]
for paper in papers:
    if paper['category'] not in categories:
        categories.append(paper['category'])
lines=[
'# EntrSL Evidence Library','',
'A private local Jekyll/GitHub Pages prototype connecting the Yes-Way proposition **“Strength to serve. Service to grow.”** with critically appraised research.','',
'## EntrSL Research Collection','',
'The EntrSL collection is the evidence foundation for entrepreneurship-focused service-learning. It combines direct EntrSL research with transferable evidence on reflection, reciprocity, community partnership, institutional design, and outcomes. It does not claim that every selected paper directly studies entrepreneurship.','',
'**Audit:** 9,924 Zotero journal articles · 345 direct candidates · 25 selected · 23 full texts reviewed · 2 abstract-only.','',
'> “Top journal” is a custom OpenAlex top quartile within this shortlist, not an SJR/JCR quartile. It never affects article evidence scores.','',
'## Curated shelf','']
for category in categories:
    lines += ['### '+category,'']
    for paper in [p for p in papers if p['category']==category]:
        badge=' **[Top journal]**' if paper['journal_rank_tier']=='Top quartile in shortlist' else ''
        lines.append(f"{paper['rank']}. **{paper['title']}** — {paper['journal']} ({paper['year']}); article evidence {paper['total_score']}/10; OpenAlex 2y {paper['journal_2yr_citedness']}, h-index {paper['journal_h_index']}.{badge}")
    lines.append('')
lines += ['## Repository map','',
'- `index.md`: Yes-Way EntrSL evidence landing page and curated shelf.',
'- `yes-way.md`: parent-philosophy orientation.',
'- `methodology.md`: census, appraisal rubric, journal-metric boundary, and limitations.',
'- `screening-log.md`: stage counts and missing-full-text decisions.',
'- `audit/library-wide-screening.csv`: one screening row per Zotero journal article.',
'- `_papers/`: 25 individual critical analyses.',
'- `_data/journal_metrics.json`: dated OpenAlex source metrics.',
'- `references.bib` and `CITATION.cff`: citation assets.',
'- `scripts/`: deterministic rebuild and validation utilities.','',
'## Privacy status','',
'This website exists locally only. No GitHub repository was created, pushed, deployed, or published. Zotero remained read-only.','']
(root/'README.md').write_text('\n'.join(lines))
