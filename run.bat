@echo off
title MyLove Birthday Web App
cd /d "%~dp0"
echo ==============================================
echo   กำลังเริ่มรันเว็บ ถึงเธอ (MyLove)...
echo   เปิดบราวเซอร์ไปที่: http://localhost:3000
echo ==============================================
node node_modules/next/dist/bin/next dev -p 3000
pause
