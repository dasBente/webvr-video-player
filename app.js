let express = require('express');
let app = express();

let path = require('path');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/video', function (req, res) {
    res.render('video', {});
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
