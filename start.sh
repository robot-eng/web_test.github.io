#!/bin/bash

# Pastel Finance - Quick Start Script
# macOS/Linux Shell Script

echo ""
echo "╔══════════════════════════════════════════╗"
echo "║    🎨 Pastel Finance - Quick Launcher   ║"
echo "╚══════════════════════════════════════════╝"
echo ""

echo "เลือกวิธีรันแอป:"
echo ""
echo "[1] Python Server (ง่ายที่สุด)"
echo "[2] Node.js Server"
echo "[3] npm http-server"
echo "[4] Open in Browser Only"
echo "[5] View Documentation"
echo ""

read -p "พิมพ์ตัวเลือก (1-5): " choice

case $choice in
    1)
        echo ""
        echo "🚀 กำลังเปิด Python Server..."
        echo "📱 เปิด http://localhost:8000 ในเบราว์เซอร์"
        echo ""
        python3 -m http.server 8000 || python -m http.server 8000
        ;;
    2)
        echo ""
        echo "🚀 กำลังเปิด Node.js Server..."
        if [ -f "server.js" ]; then
            node server.js
        else
            echo "❌ ไฟล์ server.js ไม่พบ"
        fi
        ;;
    3)
        echo ""
        echo "🚀 กำลังเปิด npm http-server..."
        if command -v http-server &> /dev/null; then
            http-server -p 8080
        else
            echo "❌ http-server ไม่พบ - ติดตั้ง: npm install -g http-server"
        fi
        ;;
    4)
        echo ""
        echo "🌐 กำลังเปิดในเบราว์เซอร์..."
        if [ -f "index.html" ]; then
            open index.html || xdg-open index.html
        fi
        ;;
    5)
        echo ""
        echo "📖 กำลังเปิด Documentation..."
        if [ -f "README.md" ]; then
            cat README.md | less
        elif [ -f "INSTALL.md" ]; then
            cat INSTALL.md | less
        fi
        ;;
    *)
        echo ""
        echo "❌ ตัวเลือกไม่ถูกต้อง"
        ;;
esac
