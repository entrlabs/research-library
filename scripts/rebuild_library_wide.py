#!/usr/bin/env python3
"""Rebuild the private evidence library from the read-only Zotero census export."""
from __future__ import annotations

import csv
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = Path("/private/tmp/nexus-library-wide/all-journal-articles.json")
SCREENED = Path("/private/tmp/nexus-library-wide/screened.json")

KEYS = [
    "P6GXDAN3", "PHWJCUJM", "QYPFRUBZ", "XSIUCHQY", "95IXXXC4", "F5AIPR73",
    "UXQSQC56", "WPG2GIKF", "MREE9RN6", "HN95A9YW", "RESBVRRZ", "EPHPPVPW",
    "S75XGURH", "9IDYQSNS", "62SCCGRH", "29JY3GXH", "SJ3LTXLA", "TNF6HBR4",
    "GZR4UGG4", "WSZ4YNKB", "G44KC8LD", "PRUTCBXM", "RJYIJDGF", "4YU6VHN4",
    "ZPDPIDGR",
]

JOURNALS = {
 "Frontiers in Psychology": (3.5170611986,310,"S9692511"),
 "The Journal of Higher Education": (2.3087248322,234,"S71326023"),
 "Education Sciences": (4.7996834728,116,"S2738008561"),
 "Teaching Sociology": (0.5793650794,149,"S151245446"),
 "Studies in Higher Education": (7.0076190476,189,"S162196882"),
 "Theory Into Practice": (2.44,130,"S9733372"),
 "Nonprofit and Voluntary Sector Quarterly": (1.6176470588,134,"S168572994"),
 "Higher Education Research & Development": (4.2009925558,143,"S4210176587"),
 "Journal of Knowledge Management": (7.6893787575,194,"S50631486"),
 "Environmental Education Research": (3.8568232662,139,"S94060836"),
 "Journal of Experiential Education": (1.1848739496,70,"S201876622"),
 "Journal of Management Education": (2.2314814814,86,"S190363454"),
 "Academy of Management Learning & Education": (8.2190476190,143,"S45682993"),
 "The International Journal of Management Education": (7.0268199234,91,"S135394783"),
 "Asia Pacific Education Review": (2.5391705069,74,"S184932276"),
 "Journal of Marketing Education": (9.1451612903,96,"S153861934"),
 "Journal of Applied Research in Higher Education": (2.9097222222,49,"S2765041812"),
 "Active Learning in Higher Education": (2.6601941748,92,"S63896471"),
 "Michigan Journal of Community Service Learning": (0.5789473684,20,"S2764621431"),
 "Journal of Cleaner Production": (12.7102964836,451,"S58516903"),
 "Teaching and Teacher Education": (4.8320683112,249,"S94618750"),
}
THRESHOLD = 7.0076190476

# category, relevance, quality, study design, synthesis, finding, limits, full text
ANALYSES = {
"P6GXDAN3": ("Reviews & Meta-Analyses",5,5,"Meta-analysis","Quantifies social, personal, and cognitive effects across service-learning studies.","Service-learning was positively associated with all three outcome families; structured reflection was among the design features examined.","Primary studies were heterogeneous and business-education evidence was limited.",True),
"PHWJCUJM": ("Reviews & Meta-Analyses",4,5,"Systematic literature review","Synthesizes experiential-learning approaches in entrepreneurship education.","Experiential formats generally aligned with stronger entrepreneurial intentions and skills, while designs and measures varied substantially.","Domain-specific review; heterogeneous interventions prevent a single causal estimate.",True),
"QYPFRUBZ": ("Reviews & Meta-Analyses",5,5,"Meta-analysis of 62 studies and 11,837 students","Estimates student effects and examines program-design moderators.","Effects ranged roughly from .27 to .43; curriculum links, student voice, community involvement, and reflection were associated with better outcomes.","Nonrandom primary studies and heterogeneity limit causal interpretation.",True),
"XSIUCHQY": ("Reviews & Meta-Analyses",5,4,"Systematic review of 133 studies","Maps higher-education service-learning research, outcomes, and implementation themes.","The field reports academic, personal, social, and civic outcomes across diverse settings.","Quality appraisal is less explicit than the breadth of mapping; findings are not one pooled effect.",True),
"95IXXXC4": ("Foundations & Theory",5,3,"Foundational conceptual article","Introduces an institutional framework for implementing service-learning in higher education.","Positions coordinated institutional structures, faculty support, curriculum, students, and community as linked implementation components.","Conceptual and metadata/abstract-only in this audit; not an outcome test.",False),
"F5AIPR73": ("Foundations & Theory",5,4,"Institutional survey and framework application","Examines institutionalization using the CAPSL framework.","Shows that durable service-learning requires alignment across institutional constituencies rather than isolated courses.","Preliminary, self-reported institutional evidence.",True),
"UXQSQC56": ("Foundations & Theory",4,3,"Conceptual framework with teaching case","Applies Kolb's experiential-learning cycle to marketing service-learning.","Connects concrete experience, reflection, conceptualization, and experimentation to course design.","One disciplinary case; no controlled outcome test.",True),
"WPG2GIKF": ("Foundations & Theory",5,3,"Conceptual synthesis","Explains why service-learning effects vary through belonging, competence, and change-agent mechanisms.","Benefits depend on how experience is structured and interpreted, not on service activity alone.","Theoretical propositions require empirical testing.",True),
"MREE9RN6": ("Foundations & Theory",4,3,"Pedagogical framework and case example","Links service-learning, social enterprise, and sustainable community development.","A short case illustrates a framework for integrating community problems into management learning.","Two faculty and eight students over one month; dated contextual language and no controlled outcomes.",True),
"HN95A9YW": ("Design & Reflection",4,4,"Qualitative institutional case study","Studies organized reflection as a response to collective sustainability dilemmas.","Institutionalized reflection linked student projects, faculty practice, and transformative-learning goals.","Single-university case; mechanisms are contextual rather than causal.",True),
"RESBVRRZ": ("Design & Reflection",5,4,"Structural equation modeling; more than 2,000 students in 132 courses","Tests links among motivation, learning experience, and service-learning outcomes.","Motivation and learning experience were associated with cognitive learning and other outcomes.","Observational SEM does not establish causal direction; Hong Kong context.",True),
"EPHPPVPW": ("Design & Reflection",5,3,"Teaching model and course case","Integrates service-learning into an introductory entrepreneurship course.","The model emphasizes ambiguity management, entrepreneurial skills, and self-efficacy through authentic community work.","Primarily instructor reflection without a controlled comparison.",True),
"S75XGURH": ("Design & Reflection",4,3,"Qualitative reflection-content analysis","Uses the ORID model for structured reflection and assessment.","ORID prompts surfaced objective, reflective, interpretive, and decisional dimensions of student learning.","Single-event context and no comparison group.",True),
"9IDYQSNS": ("Design & Reflection",4,4,"Qualitative course-development study","Identifies high-leverage practices in sustainability-focused service-learning.","An epistemic community iteratively developed practices connecting environmental problems, partners, and student work.","Course-development evidence rather than a causal outcome evaluation.",True),
"62SCCGRH": ("Reciprocity & Justice",5,4,"Multi-stakeholder survey and structural analyses","Compares value perceptions among students, recruiters, and project supervisors.","All stakeholder groups perceived value, but valued different outcomes, supporting multi-party design and assessment.","Cross-sectional perceptions and one mandated 30-hour setting.",True),
"29JY3GXH": ("Reciprocity & Justice",5,4,"In-depth interviews with community-based organizations","Centers organizational partners rather than treating them as passive beneficiaries.","Partners reported benefits and costs involving student conduct, fit, capacity, and coordination; net value was conditional.","Interview evidence is contextual and does not estimate comparative effects.",True),
"SJ3LTXLA": ("Reciprocity & Justice",5,4,"Photovoice and qualitative co-construction in Uganda","Examines host-community conceptions of relationships in international service-learning.","Participants emphasized friendship, education, social change, and persistent power tensions.","Specific international context and interpretive methods limit transferability.",True),
"TNF6HBR4": ("Reciprocity & Justice",5,4,"Mixed methods; 125 students in three psychology classes","Tests critical service-learning's relationship to social-justice and civic orientations.","Participants showed stronger justice and civic orientations alongside qualitative evidence of perspective change.","Nonrandom course comparison limits causal claims.",True),
"GZR4UGG4": ("Reciprocity & Justice",5,3,"Qualitative study of 36 community partners","Examines partners as co-educators in a community-engagement module.","Reciprocity depended on communication, role clarity, and recognizing community expertise.","Abstract/metadata-only in this audit; one institutional context.",False),
"WSZ4YNKB": ("Outcomes & Institutional Practice",5,5,"Curriculum-reform cohort comparison with regression controls","Examines long-term civic engagement after mandatory academic service-learning.","Graduates exposed to the reform were estimated to be 9.4% more likely to remain civically engaged, with larger effects among those without prior service.","Quasi-experimental rather than randomized; civic outcome and institutional context constrain inference.",True),
"G44KC8LD": ("Outcomes & Institutional Practice",5,4,"Three-wave study of 267 psychology undergraduates","Tracks general and teaching self-efficacy across two years of school service-learning.","Pre-post gains were reported for general self-efficacy (d=.30) and teaching self-efficacy (d=.68), with feedback-related patterns.","No randomized control; repeated measures do not isolate service-learning from co-occurring influences.",True),
"PRUTCBXM": ("Outcomes & Institutional Practice",5,4,"Course comparison: 23 service-learning and 107 comparison students","Compares academic, civic, interpersonal, and practical outcomes.","No final-exam advantage appeared, but course-specific civic, interpersonal, and practical benefits were reported.","Small treatment group and nonrandom enrollment.",True),
"RJYIJDGF": ("Outcomes & Institutional Practice",4,3,"Conceptual theory article","Links service-learning to prosocial role-identity formation.","Offers a structural-symbolic-interactionist model for how repeated roles and recognition may stabilize prosocial identity.","Conceptual model, not an empirical test.",True),
"4YU6VHN4": ("Outcomes & Institutional Practice",5,3,"Exploratory multi-source qualitative study","Studies a seven-week US-Spain service-learning COIL project with social enterprises.","Students reported personal, social, and cognitive competency development through cross-border team problem solving.","Researcher-participant bias, exploratory design, and no strong comparison.",True),
"ZPDPIDGR": ("Outcomes & Institutional Practice",5,4,"Mixed qualitative content analysis; 40 master's students and five instructors","Develops a social-entrepreneurial competence framework from service-learning diaries and interviews.","Identifies knowledge, skills, and reflective processes connecting service-learning to social entrepreneurial competence.","Small German sample; framework needs longitudinal and comparative validation.",True),
}

def yaml_quote(value):
    return json.dumps(str(value), ensure_ascii=False)

def authors(creators):
    names=[]
    for c in creators or []:
        names.append(c.get("name") or " ".join(x for x in [c.get("firstName",""),c.get("lastName","")] if x))
    return "; ".join(names)

def year(date):
    m=re.search(r"(?:19|20)\d{2}",date or "")
    return int(m.group()) if m else 0

def slug(title):
    return re.sub(r"[^a-z0-9]+","-",title.lower()).strip("-")[:90]

def main():
    if not SOURCE.exists() or not SCREENED.exists():
        raise SystemExit("Required census files are missing from /private/tmp/nexus-library-wide")
    raw=json.loads(SOURCE.read_text())
    by_key={x["key"]:x for x in raw}
    selected=[]
    paper_dir=ROOT/"_papers"
    paper_dir.mkdir(exist_ok=True)
    for old in paper_dir.glob("*.md"):
        old.unlink()
    for rank,key in enumerate(KEYS,1):
        item=by_key[key]
        d=item["data"]
        cat,rel,qual,design,synthesis,finding,limits,full=ANALYSES[key]
        journal=d.get("publicationTitle","")
        metric=JOURNALS[journal]
        top=metric[0]>=THRESHOLD
        score=rel+qual
        record={"rank":rank,"key":key,"title":d.get("title",""),"authors":authors(d.get("creators")),"year":year(d.get("date")),"journal":journal,"doi":d.get("DOI",""),"url":d.get("url","") or ("https://doi.org/"+d.get("DOI","") if d.get("DOI") else ""),"category":cat,"relevance_score":rel,"evidence_quality_score":qual,"total_score":score,"study_design":design,"synthesis":synthesis,"finding":finding,"limitations":limits,"full_text_reviewed":full,"journal_2yr_citedness":round(metric[0],2),"journal_h_index":metric[1],"journal_openalex":"https://openalex.org/"+metric[2],"journal_rank_tier":"Upper quartile within collection" if top else "Other source in collection"}
        selected.append(record)
        front="\n".join(["---"]+[f"{k}: {yaml_quote(v) if isinstance(v,str) else str(v).lower() if isinstance(v,bool) else v}" for k,v in record.items()]+["layout: paper","---",""])
        body=f"""## Why this paper matters

{synthesis}

## Evidence reviewed

**Design:** {design}  
**Full-text status:** {'Indexed PDF/full text reviewed' if full else 'Abstract and metadata only; full text required'}

## Principal finding

{finding}

## EntrSL interpretation

This paper is directly useful for designing or evaluating service-learning and experiential-learning work. Its contribution should be applied at the level supported by the study design, not treated as universal causal proof.

## Limitations and boundary conditions

{limits}

## Scoring rationale

- **EntrSL relevance: {rel}/5.** Directness to service-learning, experiential learning, higher education, entrepreneurship, reflection, reciprocity, or institutional practice.
- **Evidence quality: {qual}/5.** Based on design transparency, sample or review breadth, analytical fit, and inferential limits.
- **Journal standing is separate.** OpenAlex two-year mean citedness and h-index are descriptive source metrics and do not increase this paper's evidence score.

## Citation

{record['authors']} ({record['year']}). “{record['title']}.” *{journal}*. {('https://doi.org/'+record['doi']) if record['doi'] else record['url']}
"""
        (paper_dir/f"{rank:02d}-{slug(record['title'])}.md").write_text(front+body)

    (ROOT/"_data").mkdir(exist_ok=True)
    (ROOT/"_data"/"catalog.json").write_text(json.dumps(selected,indent=2,ensure_ascii=False)+"\n")
    snapshot=[by_key[k] for k in KEYS]
    (ROOT/"_data"/"zotero_snapshot.json").write_text(json.dumps(snapshot,indent=2,ensure_ascii=False)+"\n")
    journal_data={"source":"OpenAlex Sources API","retrieved":"2026-08-23","measure":"Two-year mean citedness and h-index","top_quartile_rule":"At or above the 75th percentile of two-year mean citedness among the 21 journals represented by the selected 25 papers","threshold":THRESHOLD,"caveat":"This collection-specific indicator is descriptive context only; it is not a general journal ranking and does not influence article appraisal.","journals":[{"journal":j,"two_year_mean_citedness":v[0],"h_index":v[1],"openalex":"https://openalex.org/"+v[2],"tier":"Upper quartile within collection" if v[0]>=THRESHOLD else "Other source in collection"} for j,v in sorted(JOURNALS.items())]}
    (ROOT/"_data"/"journal_metrics.json").write_text(json.dumps(journal_data,indent=2)+"\n")

    # Full library audit ledger, one row per top-level Zotero journal article.
    screened=json.loads(SCREENED.read_text())
    rows=screened if isinstance(screened,list) else screened.get("items",[])
    audit=ROOT/"audit"; audit.mkdir(exist_ok=True)
    fields=["key","title","year","journal","doi","score","decision","matched_terms"]
    with (audit/"library-wide-screening.csv").open("w",newline="") as fh:
        w=csv.DictWriter(fh,fieldnames=fields); w.writeheader()
        for x in rows:
            d=x.get("data",x)
            decision=x.get("decision") or x.get("screening_decision") or "out-of-scope"
            terms=x.get("matched_terms") or x.get("matches") or []
            w.writerow({"key":x.get("key",d.get("key","")),"title":d.get("title",""),"year":year(d.get("date",str(d.get("year","")))),"journal":d.get("publicationTitle",d.get("journal","")),"doi":d.get("DOI",d.get("doi","")),"score":x.get("score",x.get("screening_score",0)),"decision":decision,"matched_terms":"; ".join(terms) if isinstance(terms,list) else terms})
    summary={"audit_date":"2026-08-23","scope":"Every top-level Zotero item of type journalArticle, paginated without collection or keyword restriction","journal_articles":9924,"with_abstracts":7620,"direct_candidates":345,"near_scope":279,"out_of_scope":9300,"distinct_candidate_journals":211,"selected":25,"selected_full_text_reviewed":23,"selected_abstract_only":2,"zotero_modified":False}
    (audit/"summary.json").write_text(json.dumps(summary,indent=2)+"\n")

    # Portable bibliography generated from Zotero's exported metadata snapshot.
    bib=[]
    for r in selected:
        ident="zotero-"+r["key"].lower()
        bib.append("@article{"+ident+",\n  title = {"+r["title"]+"},\n  author = {"+r["authors"].replace("; "," and ")+"},\n  year = {"+str(r["year"])+"},\n  journal = {"+r["journal"]+"},\n  doi = {"+r["doi"]+"}\n}")
    (ROOT/"references.bib").write_text("\n\n".join(bib)+"\n")

if __name__ == "__main__":
    main()
