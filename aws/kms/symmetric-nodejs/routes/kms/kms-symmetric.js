var multer = require('multer')
var upload = multer({ dest: 'uploads/' })
var AWS = require('aws-sdk');
const { base64encode, base64decode } = require('nodejs-base64');
module.exports = (express, app) => {

    app.get('/encrypt/:plaintext', upload.any(), async function (req, res) {
        encrypt(Buffer.from(req.params.plaintext,'utf-8')).then((CiphertextBlob) =>{
            var saveBD = CiphertextBlob.toString('base64')
            /*return res.status(200).json({
                base64: saveBD,
                base64forurl:encodeURIComponent(saveBD)
            })*/
            return res.status(200).send(`
                <!DOCTYPE html>
                <html>
                <body>
                
                <h1>Cifrado base64</h1>
                ${saveBD}
                <h1>Cifrado base64forurl codificado para url click hire</h1>
                <a href="http://localhost:4015/decrypt/${encodeURIComponent(saveBD)}">Decrypt</a>
                
                </body>
                </html>
            `)
        }).catch((err) => {
            return res.status(500).send(err)
        })

        
    });

    app.get('/decrypt/:cipherbase64blob', upload.any(), async function (req, res) {
        var cipherbase64blob = decodeURIComponent(req.params.cipherbase64blob)
        decrypt(Buffer.from(cipherbase64blob,'base64')).then((Plaintext) =>{
            return res.status(200).send(Plaintext.toString('utf-8'))
        }).catch((err) => {
            return res.status(500).send(err)
        })        
    });


    
}

function encrypt(buffer) {
    return new Promise((resolve, reject) => {
        console.log('llego aqui 4')
        var kms = new AWS.KMS();
        
        const params = {
            KeyId: process.env.KMS_KEYID, // The identifier of the CMK to use for encryption. You can use the key ID or Amazon Resource Name (ARN) of the CMK, or the name or ARN of an alias that refers to the CMK.
            Plaintext: buffer// The data to encrypt.
        };
        kms.encrypt(params, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data.CiphertextBlob);
            }
        });
    });
}

function decrypt(buffer) {
    
    return new Promise((resolve, reject) => {
        const kms = new AWS.KMS();
        const params = {
            CiphertextBlob: buffer// The data to dencrypt.
        };
        kms.decrypt(params, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data.Plaintext);
            }
        });
    });
}

