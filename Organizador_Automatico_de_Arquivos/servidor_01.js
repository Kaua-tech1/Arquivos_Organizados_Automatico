const http = require('http');

http.createServer((req, res) => {
    res.writeHead(200,{
        'Content-Type': 'text/plain'
    });
    res.write('Hello, World!\n');
    res.end();
}).listen(1337);