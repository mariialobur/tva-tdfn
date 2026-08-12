from pathlib import Path
import re
import shutil
import sys

ROOT = Path.cwd()
INDEX = ROOT / 'index.html'
if not INDEX.exists():
    raise SystemExit('ERREUR: index.html introuvable. Lancez ce script depuis la racine du dépôt tva-tdfn.')

token = sys.argv[1].strip() if len(sys.argv) > 1 else input('Collez le Site Token Cloudflare Web Analytics: ').strip()
if not re.fullmatch(r'[A-Za-z0-9_-]{8,160}', token):
    raise SystemExit('ERREUR: token invalide. Copiez uniquement la valeur du Site Token affichée par Cloudflare Web Analytics.')

text = INDEX.read_text(encoding='utf-8')
backup = ROOT / '.backup-before-analytics-index.html'
if not backup.exists():
    shutil.copy2(INDEX, backup)

start_marker = '<!-- cloudflare-web-analytics:start -->'
end_marker = '<!-- cloudflare-web-analytics:end -->'
block = f'''{start_marker}\n<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{{"token":"{token}"}}'></script>\n{end_marker}'''

pattern = re.compile(re.escape(start_marker) + r'.*?' + re.escape(end_marker), re.S)
if pattern.search(text):
    text = pattern.sub(block, text, count=1)
    action = 'mis à jour'
else:
    pos = text.lower().rfind('</body>')
    if pos < 0:
        raise SystemExit('ERREUR: balise </body> introuvable dans index.html.')
    text = text[:pos].rstrip() + '\n\n' + block + '\n' + text[pos:]
    action = 'installé'

INDEX.write_text(text, encoding='utf-8')
print(f'Cloudflare Web Analytics {action} dans index.html.')
print('Sauvegarde: .backup-before-analytics-index.html')
print('Étape suivante: commit + push vers GitHub Pages, puis consultez Cloudflare > Web Analytics.')
