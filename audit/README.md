# Library-wide audit artifacts

- `library-wide-screening.csv` contains one row for each of the 9,924 top-level Zotero journal articles audited.
- `summary.json` records stage counts, scope, date, and the no-modification boundary.
- `../_data/zotero_snapshot.json` contains the 25 selected Zotero metadata records.
- `../_data/journal_metrics.json` records the OpenAlex source metrics and exact custom-tier rule.

Run `python3 scripts/build_library_audit.py` only while the cached census files remain available under `/private/tmp/nexus-library-wide/`. The script reads those exports and does not write to Zotero.
