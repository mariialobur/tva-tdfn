from pathlib import Path
import shutil
ROOT=Path.cwd(); b=ROOT/'.backup-before-v16.2-audit'
files=['index.html','app.js','styles.css','data.js','pedagogy.js','legal-basis.js']
if not b.exists(): raise SystemExit('Sauvegarde .backup-before-v16.2-audit introuvable.')
for f in files:
 if not (b/f).exists(): raise SystemExit(f'Sauvegarde incomplète: {f}')
for f in files: shutil.copy2(b/f,ROOT/f)
print('OK — état pré-v16.2 restauré.')
