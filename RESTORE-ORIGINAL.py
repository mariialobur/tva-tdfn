from pathlib import Path
import shutil
ROOT=Path.cwd()
backup=ROOT/'.backup-before-v16-final'
files=['index.html','app.js','styles.css','data.js','pedagogy.js','legal-basis.js']
if not backup.exists():
    raise SystemExit('ERREUR: .backup-before-v16-final introuvable.')
for name in files:
    src=backup/name
    if not src.exists():
        raise SystemExit(f'ERREUR: sauvegarde incomplète: {name}')
for name in files:
    shutil.copy2(backup/name, ROOT/name)
print('OK — version originale restaurée depuis .backup-before-v16-final/.')
