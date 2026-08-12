from pathlib import Path
import shutil

root = Path.cwd()
backups = sorted([p for p in root.glob('.v15-backup-before-v16-refined*') if p.is_dir()])
if not backups:
    raise SystemExit('Aucune sauvegarde v15 trouvée.')
backup = backups[-1]
for name in ('index.html', 'app.js', 'styles.css'):
    src = backup / name
    if not src.exists():
        raise SystemExit(f'Fichier manquant dans la sauvegarde: {src}')
    shutil.copy2(src, root / name)
print(f'OK — fichiers restaurés depuis {backup.name}/')
