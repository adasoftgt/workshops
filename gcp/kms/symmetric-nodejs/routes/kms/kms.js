var multer = require('multer')
var upload = multer({ dest: 'uploads/' })

module.exports = (express, app) => {

    app.get('/encrypt/:plainttext', upload.any(), async function (req, res) {
       
        encrypt(Buffer.from(req.params.plainttext,'utf-8')).then((CiphertextBlob) =>{
            var saveBD = CiphertextBlob
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

function encrypt(buffer){
    //
    // TODO(developer): Uncomment these variables before running the sample.
    //
    const projectId = process.env.PROJECT_ID;
    const locationId = process.env.LOCATION_ID;
    const keyRingId = process.env.KEY_RING_ID;
    const keyId = process.env.KEY_ID;
    const plaintextBuffer = buffer; //Buffer.from('hola','utf-8');

    // Imports the Cloud KMS library
    const {KeyManagementServiceClient} = require('@google-cloud/kms');

    // Instantiates a client
    const client = new KeyManagementServiceClient();

    // Build the key name
    const keyName = client.cryptoKeyPath(projectId, locationId, keyRingId, keyId);

    // Optional, but recommended: compute plaintext's CRC32C.
    const crc32c = require('fast-crc32c');
    const plaintextCrc32c = crc32c.calculate(plaintextBuffer);
    return new Promise( async (resolve, reject) => {
        
        const [encryptResponse] = await client.encrypt({
            name: keyName,
            plaintext: plaintextBuffer,
            plaintextCrc32c: {
                value: plaintextCrc32c,
            },
        });

        const ciphertext = encryptResponse.ciphertext;

        // Optional, but recommended: perform integrity verification on encryptResponse.
        // For more details on ensuring E2E in-transit integrity to and from Cloud KMS visit:
        // https://cloud.google.com/kms/docs/data-integrity-guidelines
        if (!encryptResponse.verifiedPlaintextCrc32c) {
            throw new Error('Encrypt: request corrupted in-transit');
        }
        if (
            crc32c.calculate(ciphertext) !==
            Number(encryptResponse.ciphertextCrc32c.value)
        ) {
            throw new Error('Encrypt: response corrupted in-transit');
        }

        //console.log(`Ciphertext: ${}`);
        resolve(ciphertext.toString('base64'))
    })
}

function decrypt(buffer){
    //
    // TODO(developer): Uncomment these variables before running the sample.
    //
    const projectId = process.env.PROJECT_ID;
    const locationId = process.env.LOCATION_ID;
    const keyRingId = process.env.KEY_RING_ID;
    const keyId = process.env.KEY_ID;
    const ciphertext = buffer; //Buffer.from('hola','utf-8');

    // Imports the Cloud KMS library
    const {KeyManagementServiceClient} = require('@google-cloud/kms');

    // Instantiates a client
    const client = new KeyManagementServiceClient();

    // Build the key name
    const keyName = client.cryptoKeyPath(projectId, locationId, keyRingId, keyId);

    // Optional, but recommended: compute plaintext's CRC32C.
    const crc32c = require('fast-crc32c');
    const ciphertextCrc32c = crc32c.calculate(ciphertext);
    return new Promise( async (resolve, reject) => {
        const [decryptResponse] = await client.decrypt({
            name: keyName,
            ciphertext: ciphertext,
            ciphertextCrc32c: {
              value: ciphertextCrc32c,
            },
          });
        
          // Optional, but recommended: perform integrity verification on decryptResponse.
          // For more details on ensuring E2E in-transit integrity to and from Cloud KMS visit:
          // https://cloud.google.com/kms/docs/data-integrity-guidelines
          if (
            crc32c.calculate(decryptResponse.plaintext) !==
            Number(decryptResponse.plaintextCrc32c.value)
          ) {
            throw new Error('Decrypt: response corrupted in-transit');
          }
        
          const plaintext = decryptResponse.plaintext.toString();
        
          //console.log(`Plaintext: ${plaintext}`);
          resolve(plaintext)
    })
}

