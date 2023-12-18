const nodeStatic = require('node-static');
const files = new nodeStatic.Server('./public');

require('http')
  .createServer(function (request, response) {
    request
      .addListener('end', function () {
        files.serve(request, response);
      })
      .resume();
  })
  .listen(8000, 'localhost', () => {
    console.log(`Local widget.js server is running...`);
  });
