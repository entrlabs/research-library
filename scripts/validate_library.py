#!/usr/bin/env python3
import csv,json,re,sys
from pathlib import Path
root=Path(__file__).resolve().parents[1]
errors=[]
cat=json.loads((root/'_data/catalog.json').read_text())
if len(cat)!=25: errors.append(f'catalog has {len(cat)} papers, expected 25')
required={'journal_2yr_citedness','journal_h_index','journal_openalex','journal_rank_tier','evidence_quality_score','relevance_score','full_text_reviewed'}
for p in cat:
    missing=required-set(p); errors += [f"{p.get('key')}: missing {x}" for x in sorted(missing)]
if sum(bool(p['full_text_reviewed']) for p in cat)!=23: errors.append('expected 23 full-text-reviewed papers')
summary=json.loads((root/'audit/summary.json').read_text())
if summary.get('journal_articles')!=9924: errors.append('audit total must be 9,924')
with (root/'audit/library-wide-screening.csv').open() as fh: rows=sum(1 for _ in csv.DictReader(fh))
if rows!=9924: errors.append(f'audit ledger has {rows} rows, expected 9,924')
if len(list((root/'_papers').glob('*.md')))!=25: errors.append('expected 25 paper files')
if len(re.findall(r'^@article\{', (root/'references.bib').read_text(), re.M))!=25: errors.append('expected 25 bibliography entries')
if errors:
    print('\n'.join('ERROR: '+x for x in errors)); sys.exit(1)
print('Validated: 9,924-row audit, 25 analyses, 23 full texts, 25 citations, journal metrics separated from evidence scores.')
