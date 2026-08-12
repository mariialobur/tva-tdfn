@echo off
setlocal
set "SCRIPT_DIR=%~dp0"
if exist "%SCRIPT_DIR%index.html" (
  cd /d "%SCRIPT_DIR%"
) else if exist "%SCRIPT_DIR%..\index.html" (
  cd /d "%SCRIPT_DIR%.."
) else (
  echo ERREUR: index.html introuvable. Placez le dossier v16 dans la racine du depot tva-tdfn ou copiez ces fichiers directement dans cette racine.
  pause
  exit /b 1
)
where py >nul 2>nul
if %errorlevel%==0 (
  py "%SCRIPT_DIR%apply-v16-refined.py"
) else (
  python "%SCRIPT_DIR%apply-v16-refined.py"
)
echo.
pause
