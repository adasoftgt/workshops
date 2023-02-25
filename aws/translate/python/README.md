# manual

## Crear un entorno virtual

### si no tiene instalado `virtualenv`
si estas en windows 10 64 bits
```
python -m pip install --upgrade pip
python -m pip install virtualenvwrapper-win
```

### Crear un entorno virtual

```
python -m virtualenv -p python3 env
```

### Activar entorno

```
.\env\Scripts\activate
```

### salir del entorno

```
deactivate
```

Si tienes problemas par ejecutar activate en VS

### abrir powerShell como adminsitrador

ejecutar lo siguiente
```
Set-ExecutionPolicy RemoteSigned
```

verificar que esta aplicado en `LocalMachine`

```
Get -ExecutionPolicy list
```

### instalar paquetes para variables de entorno

```
pip install python-dotenv python-decouple 
```

## configuracion de aws windows
 

- [credentials y config aws boto3](https://www.youtube.com/watch?v=tW3HoYRnABs)

# run

1. Crear el entorno virtual

2. 
```
pip install -r requirements.txt
```

3. 
```
python ./src/translate.py
```

Se vera la traduccion del ejemplo




# referencias

- [crear entornos virtuales](https://www.youtube.com/watch?v=TNtrAvNNxTY)
- [variables de entorno python](https://www.youtube.com/watch?v=E0Ys_ntvshY)
- [documentacion de boto3](https://boto3.amazonaws.com/v1/documentation/api/latest/guide/credentials.html#:~:text=Boto3%20will%20check%20these%20environment%20variables%20for%20credentials%3A,only%20needed%20when%20you%20are%20using%20temporary%20credentials.)
- [amazon-translate-python-nodejs](https://www.fernandomc.com/posts/amazon-translate-python-nodejs/)
