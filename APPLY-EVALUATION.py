from pathlib import Path
import shutil
import sys

root = Path(__file__).resolve().parent
index = root / 'index.html'
js = root / 'evaluation.js'
css = root / 'evaluation.css'

if not index.exists():
    print('ERREUR: index.html introuvable. Placez ces fichiers dans la racine du projet tva-tdfn.')
    sys.exit(1)
if not js.exists() or not css.exists():
    print('ERREUR: evaluation.js ou evaluation.css introuvable.')
    sys.exit(1)

text = index.read_text(encoding='utf-8')
backup = root / 'index.before-evaluation.html'
if not backup.exists():
    shutil.copy2(index, backup)

css_tag = '  <link rel="stylesheet" href="evaluation.css?v=17.0.0">\n'
js_tag = '  <script type="module" src="evaluation.js?v=17.0.0"></script>\n'

if 'evaluation.css' not in text:
    if '</head>' not in text:
        print('ERREUR: balise </head> introuvable dans index.html.')
        sys.exit(1)
    text = text.replace('</head>', css_tag + '</head>', 1)

if 'evaluation.js' not in text:
    if '</body>' not in text:
        print('ERREUR: balise </body> introuvable dans index.html.')
        sys.exit(1)
    text = text.replace('</body>', js_tag + '</body>', 1)

index.write_text(text, encoding='utf-8')
print('OK: evaluation finale installee.')
print('Fichiers a publier: index.html, evaluation.js, evaluation.css')
print('Sauvegarde creee: index.before-evaluation.html')
