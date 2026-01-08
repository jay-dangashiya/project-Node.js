const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8000;

const server = http.createServer((req, res) => {

    console.log("Request URL:", req.url);

    let filePath = '';
    let statusCode = 200;

    switch (req.url) {
        case '/':
            filePath = 'index.html';
            break;

        case '/contact':
            filePath = 'contact.html';
            break;

        case '/blog':
            filePath = 'blog.html';
            break;

        case '/gallery':
            filePath = 'gallery.html';
            break;

        default:
            filePath = '404.html';
            statusCode = 404;
            break;
    }

    fs.readFile(path.join(__dirname, filePath), (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Server Error');
            return;
        }

        res.writeHead(statusCode, { 'Content-Type': 'text/html' });
        res.end(data);
    });
});

server.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
