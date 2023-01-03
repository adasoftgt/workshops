# Manual

## Activar API kms GCP

![image](https://user-images.githubusercontent.com/47198640/210296262-0ad2f9ff-f4de-49cb-96d2-eb78f39c03fa.png)

## Panel de KMS de GCP


![image](https://user-images.githubusercontent.com/47198640/210296379-72c000fd-5f3b-4b99-9df0-0fbe52599ffd.png)

## Crear llave

![image](https://user-images.githubusercontent.com/47198640/210296494-6ea2e589-c26b-46bc-b930-a5b6756b577a.png)

## ingresar datos

![image](https://user-images.githubusercontent.com/47198640/210296550-61dd0050-19f1-4f19-9268-5cc7fab35f51.png)

## Por fines practicos lo vamos a dejar en una sola region

![image](https://user-images.githubusercontent.com/47198640/210296622-7612bf6c-8d83-472d-88b3-d6233e53381b.png)

## Se va crear una `clave generada`

Esto significa que la codificacion de la clave, se va tener que guardar en un sistema en una base de datos del solicitante, para luego pedir una decoficacion.

### caso de uso
Se necesita codificar informacion de tarjetas de credito, para luego decodificar para poder hacer un cobro en linea recurrente dentro del sistema. 
Si es para una implementacion real, se recomienda claves asimetricas con curva eliptica tomando en cuenta la siguiente recomendacion
Para las firmas digitales, la recomendación es usar los algoritmos de firma de curva elíptica. EC_SIGN_P256_SHA256 es el algoritmo de curva elíptica recomendado. Si vas a usar algoritmos de firma RSA, el algoritmo de firma RSA recomendado es RSA_SIGN_PSS_3072_SHA256. Las firmas asimetricas no las vemos en este ejemplo

En los casos de encriptación asimétrica, el algoritmo recomendado es RSA_DECRYPT_OAEP_3072_SHA256.

### se van a seleccionar las siguiente opciones

# Crea una clave

1. Ve a la página Administración de claves en la consola de Google Cloud.

2. Ir a la página Administración de claves

3. Haz clic en el nombre del llavero de claves para el que crearás la clave.

4. Haz clic en Crear clave.

5. En ¿Qué tipo de clave quieres crear?, elige `Clave generada`.

6. Ingresa el nombre en el campo Nombre de la clave.

7. Haz clic en el menú desplegable Nivel de protección y selecciona `software`.

8. Haz clic en el menú desplegable Propósito y selecciona `Encriptación/desencriptación simétrica.`

9. Acepta los valores predeterminados de Período de rotación y A partir del.

Haz clic en Crear.

![image](https://user-images.githubusercontent.com/47198640/210297347-e6d5f2a0-fab8-4678-9620-d697ee7c7441.png)

![image](https://user-images.githubusercontent.com/47198640/210298592-6f50531b-7366-4e2d-b704-c1fcd30c5c41.png)

# autenticar aplicacion

## Create service account google cloud
[google cloud dns service account](./GOOGLE-CLOUD-DNS.MD#cloud-dns-google)

### roles
- Administrador de Cloud KMS
- Desencriptador de CryptoKeys de Cloud KMS
- Encriptador de CryptoKeys de Cloud KMS


variables de entorno 
```
GOOGLE_APPLICATION_CREDENTIALS="C:\Users\username\Downloads\service-account-file.json"
PROJECT_ID=<id proyecto google>
LOCATION_ID=<location || global>
KEY_RING_ID=<nombre del llavero>
KEY_ID=<nombre de la lleve>
```

[provide-credentials-adc](https://cloud.google.com/docs/authentication/provide-credentials-adc)

## donde obtner el KEY_RING_ID Y KEY_ID

```
projects/<id proyecto google>/locations/<location || global>/keyRings/<nombre del llavero>/cryptoKeys/<nombre de la lleve>
```
![image](https://user-images.githubusercontent.com/47198640/210302386-ec977715-dfe1-4697-83dd-b051f2594ecd.png)





# como probar

## clonar repositorio

```
git clone https://github.com/adasoftgt/workshops.git
```

## desplazarce hacia

```
cd aws/gcp/kms/symmetric-nodejs
```
## instalar dependencias

```
npm install
```

## iniciar servidor

```
npm start
```

## 

```
localhost:4015/encrypt/<texto>
```

Dar click en `decrypt` para ver la funcionalidad 

# referencias

https://cloud.google.com/kms/docs/encrypt-decrypt?hl=es-419

https://cloud.google.com/docs/authentication/application-default-credentials


