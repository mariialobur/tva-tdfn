@echo off
setlocal
cd /d "%~dp0.."
py "%~dp0RESTORE-ORIGINAL.py"
if errorlevel 9009 python "%~dp0RESTORE-ORIGINAL.py"
pause
