from pathlib import Path
import re

p = Path.cwd() / 'index.html'
if not p.exists():
    raise SystemExit('ERREUR: index.html introuvable.')
text = p.read_text(encoding='utf-8')
start = '<!-- cloudflare-web-analytics:start -->'
end = '<!-- cloudflare-web-analytics:end -->'
pattern = re.compile(r'\s*' + re.escape(start) + r'.*?' + re.escape(end) + r'\s*', re.S)
new, n = pattern.subn('\n', text, count=1)
if n:
    p.write_text(new, encoding='utf-8')
    print('Cloudflare Web Analytics retiré de index.html.')
else:
    print('Aucun bloc Cloudflare Web Analytics trouvé.')
