@echo off
setlocal
cd /d "%~dp0\.."
python "%~dp0VALIDATE-FINAL.py"
pause
