var multer = require('multer')
var upload = multer({ dest: 'uploads/' })

module.exports = (express, app) => {

    app.get('/helloword', upload.any(), async function (req, res) {
      return res.status(200).send('hello word')
    });
}

