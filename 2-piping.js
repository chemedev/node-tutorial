const fs = require('fs');
const fsp = require('fs/promises');
const http = require('http');

// const myReadStream = fs.createReadStream(__dirname + '/readStream.txt', 'utf8');
// const myWriteStream = fs.createWriteStream(__dirname + '/writeStream.txt');
// ! LISTEN TO STREAM
// myReadStream.on('data', (chunk) => {
//   console.log('Chunk received');
//   myWriteStream.write(chunk)
// });
//! PIPING
// myReadStream.pipe(myWriteStream);

const server = http.createServer((req, res) => {
  console.log('request:' + req.url);
  res.writeHead(200, { 'Content-Type': 'text/html' });
  const myReadStream = fs.createReadStream(__dirname + '/index.html', 'utf8');
  myReadStream.pipe(res);
});

server.listen(3000, '127.0.0.1', () => {
  console.log('listening on port:3000');
});
