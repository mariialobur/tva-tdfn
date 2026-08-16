@echo off
cd /d "%~dp0"
where py >nul 2>nul
if %errorlevel%==0 (
  py APPLY-EVALUATION.py
) else (
  python APPLY-EVALUATION.py
)
echo.
pause
