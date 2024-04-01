const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = '.' + req.url; // Construct the file path based on the request URL

    // Default to serving index.html if the request URL is '/'
    if (filePath === './') {
        filePath = './index.html';
    }
    if (req.url === '/iss') {
        filePath = './iss.html';
    } else if (req.url === '/apod') {
        filePath = './apod.html';
    } else if (req.url === '/mars') {
        filePath = './mars_tracker.html';
    } else if (req.url === '/home') {
        filePath = './index.html'; // Redirect to index.html for home icon click
    }


    // Determine the content type based on the file extension
    const extname = path.extname(filePath);
    let contentType = 'text/html';

    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpeg';
            break;
    }

    // Read the file and serve it with the appropriate content type
    fs.readFile(filePath, (err, content) => {
        if (!err) {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        } else {
            // Handle file not found error
            if (err.code === 'ENOENT') {
                res.writeHead(404);
                res.end('File not found');
            } else {
                // Handle other errors
                res.writeHead(500);
                res.end('Server error');
            }
        }
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

