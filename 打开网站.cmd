@echo off
chcp 65001 >nul
cd /d "%~dp0"
if not exist "index.html" (
  echo 找不到网站入口 index.html。
  pause
  exit /b 1
)
start "" "%~dp0index.html"
exit /b 0
