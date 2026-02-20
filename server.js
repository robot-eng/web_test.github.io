#!/usr/bin/env node

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// MIME types
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.woff2': 'application/font-woff2',
    '.ttf': 'application/font-ttf',
    '.otf': 'application/font-otf',
    '.eot': 'application/vnd.ms-fontobject'
};

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, req.url);
    
    // Decode URI component
    filePath = decodeURIComponent(filePath);
    
    // For root, serve index.html
    if (req.url === '/') {
        filePath = path.join(__dirname, 'index.html');
    }
    
    // Get file extension
    const ext = path.extname(filePath).toLowerCase();
    
    // Set Content-Type
    const contentType = mimeTypes[ext] || 'application/octet-stream';
    
    // Headers for offline support
    const headers = {
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*',
        'Service-Worker-Allowed': '/',
        'Cache-Control': ext === '.html' || ext === '.json' ? 'no-cache' : 'public, max-age=3600'
    };
    
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // For SPA, redirect to index.html
                res.writeHead(404, headers);
                res.end('Not found', 'utf-8');
            } else {
                res.writeHead(500, headers);
                res.end('Server error', 'utf-8');
            }
        } else {
            res.writeHead(200, headers);
            res.end(content);
        }
    });
});

server.listen(PORT, HOST, () => {
    console.log(`
╔═══════════════════════════════════════╗
║   🎨 Pastel Finance - PWA Server     ║
╚═══════════════════════════════════════╝

📱 Open: http://localhost:${PORT}
🌐 Network: http://<your-ip>:${PORT}

📌 Tips:
  • To find your IP: ipconfig (Windows) or ifconfig (Mac/Linux)
  • Android device should be on same network
  • Press Ctrl+C to stop server

🚀 Ready to go!
    `);
});

process.on('SIGTERM', () => {
    console.log('Server terminated');
    process.exit(0);
});
