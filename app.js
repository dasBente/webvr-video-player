const express = require('express');
const app = express();

const path = require('path');
const fs = require('fs');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.render('video', {});
});

app.get('/video', function (req, res) {
    const path = 'public/sample.mkv';
    const stat = fs.statSync(path);
    const fileSize = stat.size;
    const range = req.header.range;

    if (range) {
	const parts = range.replace(/bytes=/, '').split('-');
	const start = parseInt(parts[0], 10);
	const end = parts[1] ? parseInt([1], 10) : fileSize - 1;

	const chunksize = (end - start) + 1;
	const file = fs.createReadStream(path, {start, end});
	let head = {
	    'Content-Range': `bytes ${start}-${end}/${fileSize}`,
	    'Accept-Ranges': 'bytes',
	    'Content-Length': chunksize,
	    'Content-Type': 'video/mkv',
	}

	res.writeHead(206, head);
	file.pipe(res);
    } else {
	let head = {
	    'Content-Length': fileSize,
	    'Content-Type': 'video/mp4',
	}

	res.writeHead(200, head);
	fs.createReadStream(path).pipe(res);
    }
});

app.use(function (req, res, next) {
    let err = new Error('Not found');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {
    res.status(err.status || 500);

    res.render('error', {
	message: err.message,
	error: app.get('env') === 'development' ? err : {}
    });
});

module.exports = app;
