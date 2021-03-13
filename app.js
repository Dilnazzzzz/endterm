var http = require('http')
var fs = require('fs')


function serveStaticFile (messageType, path, contentType, responseCode) {
    if (!responseCode) responseCode = 200;
    fs.readFile(__dirname + path, function(error,data) {
        if (error) {
            messageType.writeHead(500, {"Content-Type": "text/plain"});
            messageType.end("Internal error")
        }
        else {
            messageType.writeHead(responseCode, {"Content-Type":contentType})
            messageType.end(data)
        }
    })
}


http.createServer(function(req, res) {
    var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
    switch(path) {
        case "":
           serveStaticFile(res, "/index.html", "text/html")
           break;
        case "/about":
            serveStaticFile(res, "/about.html", "text/html")
            break;
        case "/img/gallery/graduation":
            serveStaticFile(res, "/img/gallery/graduation.jpg", "image/jpeg")
            break;
        case "/img/gallery/study":
            serveStaticFile(res, "/img/gallery/study.jpg", "image/jpeg")
            break;
        case "/video/memes":
            serveStaticFile(res, "/video/students/memes.mp4", "video/mp4")
            break;
        default:
            serveStaticFile(res, "/error.html", "text/html", 404)
           break;
    }


}).listen(3000)

