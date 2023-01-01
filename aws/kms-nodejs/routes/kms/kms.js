var multer = require('multer')
var upload = multer({ dest: 'uploads/' })
var aws = require('aws-sdk');

module.exports = (express, app) => {

    app.get('/encrypt', upload.any(), async function (req, res) {
        encrypt('hola',app).then((CiphertextBlob) =>{
            return res.status(200).send(CiphertextBlob)
        }).catch((err) => {
            return res.status(500).send(err)
        })

        
    });
}

function encrypt(buffer,app) {
    const kms = new aws.KMS(app.config.aws.credentials);
    return new Promise((resolve, reject) => {
        const params = {
            KeyId: '965d2884-b2cd-4d79-8773-6b1f57133300', // The identifier of the CMK to use for encryption. You can use the key ID or Amazon Resource Name (ARN) of the CMK, or the name or ARN of an alias that refers to the CMK.
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

