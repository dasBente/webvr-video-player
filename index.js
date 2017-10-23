let app = require('./app.js');

// TODO normalization/ error handling
const port = process.env.PORT || 8080;

app.listen(port, function () {
    console.log('Listening on port '+ port +'!');
});

app.on('error', function (err) {
    if (error.syscall !== 'listen') throw err;

    switch (error.code) {
	case 'EACCES':
	    console.error(port +' requires elevated privileges');
	    process.exit(1);
	    break;

	case 'EADDRINUSE':
	    console.error(port +' already in use');
	    process.exit(1);
	    break;

	default:
	    throw err;
    }
});
