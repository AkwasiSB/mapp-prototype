/* A simple server for uploading, processing and serving point cloud files */

var express = require('express');
var fs = require('fs');
var multer = require('multer');
var bodyParser = require('body-parser');
var shell = require('shelljs');
const siteurl = require('url');

var app = express();
var server;

// application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// middleware for uploading files
app.use(multer({ dest: '/storage/uploads' }).single('pcfile'));

// middleware for displaying static pages
app.use(express.static(__dirname + '/public/src'));
app.use(express.static(__dirname + '/potree'));
app.use('/pointcloudfile', express.static(__dirname + '/potree/examples'));

// route for root path i.e index.html
app.get('/', function(request, response) {
	response.sendFile(__dirname + '/public/src/index.html');
});

// route for uploading a file
app.post('/upload', function(request, response) {
	var saveFile;
	var inStream;
	var outStream;

	// server-side filesize checking
	if (request.file.size > 2147483648) {
		response.set("Connection", "close");
		response.status(413);
		response.json({ "status": "error", "message": "File size too large." });
		fs.unlink(request.file.path);

		return;
	}

	saveFile = __dirname + request.file.destination + "/" + request.file.originalname;
	inStream = fs.createReadStream(request.file.path);
	outStream = fs.createWriteStream(saveFile);

	inStream.pipe(outStream);

	// on successful file upload start processing file
	outStream.on('finish', function() {
		processPCFile(response, saveFile, request.file.originalname);
	});

	// on error abort file upload
	outStream.on('error', function(err) {
		fs.unlink(request.file.path);
		response.header('Connection', 'close');
		response.status(500);
		response.json({ "status": "error", "message": "Failed to upload file." });
		response.end();
	});
});

// route for sendind processed point-cloud file to client
app.get('/pointcloudfile', function(request, response) {
	// do something here
});

// point-cloud file processing function
function processPCFile(res, fileToConvert, fileName) {
	var urlAddress = 'http://' + server.address().address + ':' + server.address().port;
	var potreePath = __dirname + '/resources/PotreeConverter';
	var outputDir = __dirname + '/potree';
	var pageName = fileName + '.html';
	var child;

	// call shell to start converter for converting point-cloud file
	shell.cd(potreePath);
	child = shell.exec('PotreeConverter.exe "' + fileToConvert + '" -o ' + outputDir + ' -p ' + pageName,  { async: true, silent: true });

	// on converter finish notify client with file info
	child.stdout.on('end', function() {
		res.status(200);
		res.json({ "thumbnail": urlAddress + "/potree.jpg", "title": fileName, "url": urlAddress + '/pointcloudfile/' + pageName });
	});
}

// server starts listening for connection on given address
server = app.listen(3000, 'localhost', function() {
	console.log('Express Server started...Listening at "http://' + server.address().address + ':' + server.address().port + '"');
});
