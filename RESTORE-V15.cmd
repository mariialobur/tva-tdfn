@echo off
setlocal
set "SCRIPT_DIR=%~dp0"
if exist "%SCRIPT_DIR%index.html" (
  cd /d "%SCRIPT_DIR%"
) else if exist "%SCRIPT_DIR%..\index.html" (
  cd /d "%SCRIPT_DIR%.."
) else (
  echo ERREUR: index.html introuvable.
  pause
  exit /b 1
)
where py >nul 2>nul
if %errorlevel%==0 (
  py "%SCRIPT_DIR%RESTORE-V15.py"
) else (
  python "%SCRIPT_DIR%RESTORE-V15.py"
)
echo.
pause
