## Manual de explicacion

## Crear grupo aws

![image](https://user-images.githubusercontent.com/47198640/210157372-d360659f-8ff7-4b9a-8050-60bf8b63fd58.png)

## Agregar estos permisos a un usuario de aws y obtener los keys de acceso

![image](https://user-images.githubusercontent.com/47198640/210183679-c6e85704-9b0e-4e98-bec3-f18ce358b024.png)

## Configura KMS

### buscar KMS en aws

![image](https://user-images.githubusercontent.com/47198640/210183691-6a364814-914e-4ba6-9450-76b470195bf7.png)

## panel de KMS

click en `create key`

![image](https://user-images.githubusercontent.com/47198640/210183709-cebe4a3e-61a6-4474-8cc7-aec420a35f4c.png)

## panel para elegir el tipo de cifrado

![image](https://user-images.githubusercontent.com/47198640/210183736-c4db4e2c-aeb2-4463-ad40-24e3ae773081.png)

## elegir un cifrado `symmetric`

![image](https://user-images.githubusercontent.com/47198640/210183746-55e14bf2-87cd-41b3-ac19-a3cb34a68761.png)

El `cifrado symmetric`, es una sola sola clave para desencriptar y encriptar

El `cifrado Asymmetric` se crea una clave public y otra privada para poder realizar la desencripcion

En este caso vamos a utilizar, `symmetric`, para este ejemplo

## typear un alias de la llave

![image](https://user-images.githubusercontent.com/47198640/210183882-3afd4d16-3ad6-4631-afbc-eb87cfbd9823.png)


## agregar descripcion opcional

![image](https://user-images.githubusercontent.com/47198640/210183892-fcdf1fcf-797a-44d2-a501-46c4fb9564a4.png)

## Pueden agregar tags para organizar recursos

![image](https://user-images.githubusercontent.com/47198640/210183904-2d70aec8-c32b-4d46-8f28-b4901f55f862.png)

## elegir al usuario que tiene accesos a KMS

![image](https://user-images.githubusercontent.com/47198640/210183934-bc02c50a-cf65-4f54-a730-5ed1d5f661d2.png)

## dejar con check esta opcion

![image](https://user-images.githubusercontent.com/47198640/210183938-58466da7-94f9-4bde-b86f-1b5420fdd79e.png)

## elegir usuario `Define key usage permissions` es el que define llaves

![image](https://user-images.githubusercontent.com/47198640/210183953-41129500-2efe-408c-b3d5-a857351c48ff.png)

## si no se tiene otro usuario que agregar se deja igual

![image](https://user-images.githubusercontent.com/47198640/210183989-2c979975-da79-4928-85cb-236e4cb0373a.png)

## ahora nos muestra un resumen

![image](https://user-images.githubusercontent.com/47198640/210184018-b8d966eb-94c8-47ec-ac0e-a00a8cbb1250.png)


## tambien nos muestra una politica

```
{
    "Id": "key-consolepolicy-3",
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "Enable IAM User Permissions",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::857142825667:root"
            },
            "Action": "kms:*",
            "Resource": "*"
        },
        {
            "Sid": "Allow access for Key Administrators",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::857142825667:user/wbetos3"
            },
            "Action": [
                "kms:Create*",
                "kms:Describe*",
                "kms:Enable*",
                "kms:List*",
                "kms:Put*",
                "kms:Update*",
                "kms:Revoke*",
                "kms:Disable*",
                "kms:Get*",
                "kms:Delete*",
                "kms:TagResource",
                "kms:UntagResource",
                "kms:ScheduleKeyDeletion",
                "kms:CancelKeyDeletion"
            ],
            "Resource": "*"
        },
        {
            "Sid": "Allow use of the key",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::857142825667:user/wbetos3"
            },
            "Action": [
                "kms:Encrypt",
                "kms:Decrypt",
                "kms:ReEncrypt*",
                "kms:GenerateDataKey*",
                "kms:DescribeKey"
            ],
            "Resource": "*"
        },
        {
            "Sid": "Allow attachment of persistent resources",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::857142825667:user/wbetos3"
            },
            "Action": [
                "kms:CreateGrant",
                "kms:ListGrants",
                "kms:RevokeGrant"
            ],
            "Resource": "*",
            "Condition": {
                "Bool": {
                    "kms:GrantIsForAWSResource": "true"
                }
            }
        }
    ]
}
```

![image](https://user-images.githubusercontent.com/47198640/210184038-d1e91f93-d513-4821-ba2b-1e7293e524cd.png)

## Luego click en `finish`


## ahora se podran dar cuenta que ya esta la llave

![image](https://user-images.githubusercontent.com/47198640/210184079-7e669478-484c-4cbf-91ad-827da3eb7730.png)


al ingresar a la llave en busca de ARN

![image](https://user-images.githubusercontent.com/47198640/210184105-018a6899-f0f3-4e6f-b8ec-2e385d662657.png)

Este ARN es el que nos va servir, para poder utilizar el `symmetric`


dentro de:

```
kms-nodejs->routes->kms->kms.js
```

alli se encotrara lo siguiente

```
function encrypt(buffer,app) {
    const kms = new aws.KMS(app.config.aws.credentials);
    return new Promise((resolve, reject) => {
        const params = {
            KeyId: '<ARN LLAVE AWS>', // The identifier of the CMK to use for encryption. You can use the key ID or Amazon Resource Name (ARN) of the CMK, or the name or ARN of an alias that refers to the CMK.
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
```









