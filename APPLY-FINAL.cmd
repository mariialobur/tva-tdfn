@echo off
setlocal
cd /d "%~dp0\.."
python "%~dp0APPLY-FINAL.py"
if errorlevel 1 (
  echo.
  echo ERREUR - aucune publication ne doit etre faite avant correction.
  pause
  exit /b 1
)
echo.
echo Installation v16.2 audited terminee.
pause
