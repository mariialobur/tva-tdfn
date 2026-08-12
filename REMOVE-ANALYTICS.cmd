@echo off
setlocal
cd /d "%~dp0.."
py "%~dp0REMOVE-ANALYTICS.py"
if errorlevel 1 python "%~dp0REMOVE-ANALYTICS.py"
pause
