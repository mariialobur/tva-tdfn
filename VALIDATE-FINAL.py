from pathlib import Path
import ast, json, re, shutil, subprocess
ROOT=Path.cwd()
required=['index.html','app.js','styles.css','data.js','pedagogy.js','legal-basis.js']
missing=[x for x in required if not (ROOT/x).exists()]
if missing: raise SystemExit('ERREUR: fichiers manquants: '+', '.join(missing))
index=(ROOT/'index.html').read_text(encoding='utf-8'); app=(ROOT/'app.js').read_text(encoding='utf-8'); data=(ROOT/'data.js').read_text(encoding='utf-8'); ped=(ROOT/'pedagogy.js').read_text(encoding='utf-8'); legal=(ROOT/'legal-basis.js').read_text(encoding='utf-8')
def arr(name):
 p=f'export const {name} = '; s=data.find(p)
 if s<0:return None
 s+=len(p); e=data.find(';\n',s)
 return json.loads(data[s:e].strip())
def one(cases,cid):
 x=[c for c in cases if c.get('id')==cid]
 if len(x)!=1: raise AssertionError(f'{cid}: {len(x)}')
 return x[0]
cases=arr('CASES'); assert cases and len(cases)==44
ids=[c['id'] for c in cases]; assert len(set(ids))==44
assert sum(not c.get('excludeFromProgress') for c in cases)==43
assert [c['id'] for c in cases if c.get('excludeFromProgress')]==['Q']
ms=app.find('export const MODULES = ['); me=app.find('];\nconst casePublicId',ms); assert ms>=0 and me>=0
mids=[]
for x in re.findall(r'ids:\s*(\[[^\]]*\])',app[ms:me]):mids+=ast.literal_eval(x)
assert len(mids)==len(set(mids)) and set(mids)==set(ids)
assert [r['rate'] for r in one(cases,'D')['rates']]==[2.1,3.7,4.5]
assert [r['rate'] for r in one(cases,'D3')['rates']]==[2.1,3.0,3.7,4.5]
t1=one(cases,'T1'); t2=one(cases,'T2')
for c in (t1,t2):
 for check in c.get('checks',[]): assert 'CHF' not in check and not re.search(r'ch\.\s*\d+\s*=',check,re.I)
assert sum(r['base'] for r in t2['rates'])==245000
assert abs(sum(r['tax'] for r in t2['rates'])-7025)<.001
assert t2['fields']['acqTax']==810
assert '0 / 43 acquis · 0 maîtrisés' in index
assert 'styles.css?v=16.2.0' in index and 'app.js?v=16.2.0' in index
assert 'v16.2-audited-content' in data
sources=arr('OFFICIAL_SOURCES')
if sources:
 valid={s['id'] for s in sources}; bad=[]
 for c in cases:
  for sid in c.get('sourceIds',[]):
   if sid not in valid: bad.append((c['id'],sid))
 for fn,text in [('legal',legal),('pedagogy',ped)]:
  for sid in re.findall(r"sourceId\s*:\s*['\"]([^'\"]+)['\"]",text):
   if sid not in valid: bad.append((fn,sid))
 assert not bad, bad[:10]
node=shutil.which('node')
if node:
 for name in ['app.js','data.js','pedagogy.js','legal-basis.js']:
  p=subprocess.run([node,'--check',str(ROOT/name)],capture_output=True,text=True)
  assert p.returncode==0,(name,p.stderr)
print('OK — v16.2 audited: structure, compteur, modules, taux, dossier final, sources et syntaxe vérifiés.')
