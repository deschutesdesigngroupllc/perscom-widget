/**
 * Local web server used to serve widget.js for local development
 *
 * @type {{Server?: function(*, *): void, version?: number[], mime?: Mime | mime}}
 */
var nodeStatic = require('node-static')
var files = new nodeStatic.Server('./dist')

/**
 * Start the web server and serve the dist folder
 */
require('http')
  .createServer(function (request, response) {
    request
      .addListener('end', function () {
        files.serve(request, response)
      })
      .resume()
  })
  .listen(8000, 'localhost', () => {
    console.log(`Local widget.js server is running...`)
  })
