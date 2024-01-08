const nodeStatic = require('node-static');
const https = require('https');
const fs = require('fs');
const files = new nodeStatic.Server('./public');
const httpsOptions = {
  key: fs.readFileSync('./ssl/localhost.key'),
  cert: fs.readFileSync('./ssl/localhost.crt')
};

https
  .createServer(httpsOptions, (request, response) => {
    request
      .addListener('end', function () {
        files.serve(request, response);
      })
      .resume();
  })
  .listen(8000, 'localhost', () => {
    console.log(`Local widget.js server is running...`);
  });
