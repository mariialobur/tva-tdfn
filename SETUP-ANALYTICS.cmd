@echo off
setlocal
cd /d "%~dp0.."
if not exist index.html (
  echo ERREUR: placez le dossier tva-tdfn-v16-final dans la racine du depot puis lancez ce fichier.
  pause
  exit /b 1
)
py "%~dp0SETUP-ANALYTICS.py"
if errorlevel 1 python "%~dp0SETUP-ANALYTICS.py"
pause
