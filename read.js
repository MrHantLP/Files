/**
 * Created by MrHant on 05.10.2015.
 */
var http = require('http');
var fs = require('fs');

new http.Server(function (req, res) {
    if (req.url == '/index.html') {
        var file = new fs.ReadStream('index.html');
        sendFile(file, res);
    }

}).listen(1336);

function sendFile (file, res) {
    file.pipe(res);

    file.on('error', function (err) {
        res.statusCode = 500;
        res.end("Server Error");
        console.error(err);
    });

    file
        .on('open', function () {
            console.log('file open');
        })
        .on('close', function () {
            console.log('file close');
        });
    res.on('close', function () {
        file.destroy();

    });
}


/*

fs.readFile(__filename, {encoding: 'utf-8'}, function (err, data) {
    if (err) {
        console.log(err);
    } else {
        //console.log(data.toString('utf-8'));
        console.log(data);
    }
});
*/
