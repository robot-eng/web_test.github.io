@echo off
REM Pastel Finance - Quick Start Script
REM Windows Batch Script

setlocal enabledelayedexpansion

echo.
echo ╔══════════════════════════════════════════╗
echo ║    🎨 Pastel Finance - Quick Launcher   ║
echo ╚══════════════════════════════════════════╝
echo.

echo เลือกวิธีรันแอป:
echo.
echo [1] Python Server (ง่ายที่สุด)
echo [2] Node.js Server
echo [3] Open in Browser Only
echo [4] View Documentation
echo.

set /p choice="พิมพ์ตัวเลือก (1-4): "

if "%choice%"=="1" (
    echo.
    echo 🚀 กำลังเปิด Python Server...
    echo.
    python -m http.server 8000
    if errorlevel 1 (
        echo.
        echo ❌ Python ไม่พบ - ลองติดตั้ง Python หรือใช้ตัวเลือกอื่น
        pause
    )
) else if "%choice%"=="2" (
    echo.
    echo 🚀 กำลังเปิด Node.js Server...
    echo.
    if exist "server.js" (
        node server.js
    ) else (
        echo ❌ ไฟล์ server.js ไม่พบ
        pause
    )
) else if "%choice%"=="3" (
    echo.
    echo 🌐 กำลังเปิดในเบราว์เซอร์...
    start index.html
) else if "%choice%"=="4" (
    echo.
    echo 📖 กำลังเปิด Documentation...
    if exist "README.md" (
        start notepad README.md
    ) else if exist "INSTALL.md" (
        start notepad INSTALL.md
    )
) else (
    echo.
    echo ❌ ตัวเลือกไม่ถูกต้อง
    pause
)
