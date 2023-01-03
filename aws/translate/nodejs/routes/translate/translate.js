var multer = require('multer')
var upload = multer({ dest: 'uploads/' })

module.exports = (express, app) => {

    app.get('/translate/:source/:target/:texto', upload.any(), async function (req, res) {
        var AWS = require("aws-sdk");
        
        var translate = new AWS.Translate();
        
        var params = {
          SourceLanguageCode: req.params.source,
          TargetLanguageCode: req.params.target,
          Text: decodeURIComponent(req.params.texto)
        };
        
        translate.translateText(params, function (err, data) {
            if (err) console.log(err);
            else {
                return res.status(200).send(`
                    <!DOCTYPE html>
                    <html>
                    <body>
                    
                    <h1>Traduccion source: ${req.params.source} ~ target: ${req.params.target}</h1>
                    ${data['TranslatedText']}
                    
                    </body>
                    </html>
                `)  
            } 
          });    
        
    });
}



