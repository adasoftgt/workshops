const port = (process.env.ALL_MICROSERVICE_PORT || 4015);

if (process.platform == 'linux') {
    "use strict";
}

var app = require('./server')

var server = app.listen(port, function () {
    console.log(`App listening at http://localhost:${port}`);
});



