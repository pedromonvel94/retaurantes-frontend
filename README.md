## Configuración del Backend con Firebase Firestore

Para que el backend (Node.js) se conecte y persista los datos en Firebase Firestore, es necesario realizar una configuración inicial.

### 1. Crear y Configurar tu Proyecto en Firebase

1.  Ve a la [Consola de Firebase](https://console.firebase.google.com/).
2.  Crea un proyecto nuevo.
3.  En tu proyecto de Firebase, navega a **"Firestore Database"** y haz clic en "Crear base de datos". Elige "Iniciar en modo de prueba" para empezar (o configura las reglas de seguridad si prefieres el modo de producción).
4.  **Importante:** Este proyecto está diseñado para funcionar con el plan **"Spark (gratuito)"**. Las imágenes de los restaurantes se manejan mediante URLs externas, NO a través de Firebase Storage, para evitar costos.

### 2. Configuración del Archivo .env

1. En la carpeta `backend/`, crea un archivo llamado `.env`:

   ```bash
   cd backend
   touch .env
   ```

2. Copia el siguiente contenido en el archivo `.env` y reemplaza los valores con tus credenciales:

   ```
   # Puerto del servidor
   PORT=3000

   # Configuración de Firebase
   FIREBASE_PROJECT_ID=tu-project-id
   FIREBASE_PRIVATE_KEY=tu-private-key
   FIREBASE_CLIENT_EMAIL=tu-client-email

   # Configuración de la base de datos
   DB_NAME=restaurantes
   ```

3. Para obtener los valores de Firebase:
   - Ve a la Consola de Firebase > Configuración del proyecto (⚙️) > Cuentas de servicio
   - Haz clic en "Generar nueva clave privada"
   - Abre el archivo JSON descargado
   - Copia los valores correspondientes:
     - `project_id` → FIREBASE_PROJECT_ID
     - `private_key` → FIREBASE_PRIVATE_KEY (mantén las comillas)
     - `client_email` → FIREBASE_CLIENT_EMAIL

### 3. Ejecutar el Backend

Antes de iniciar el frontend, el backend debe estar corriendo:

1.  Abre una terminal y navega a la carpeta `backend/`.
    ```bash
    cd backend
    ```
2.  Instala las dependencias:
    ```bash
    npm install
    ```
3.  Inicia el servidor:
    ```bash
    node server.js
    ```
    El servidor estará escuchando en `http://localhost:3000`. Mantén esta terminal abierta.

## Servidor de Desarrollo

Ejecuta `ng serve` para un servidor de desarrollo. Navega a `http://localhost:4200/`. La aplicación se recargará automáticamente si cambias cualquiera de los archivos fuente.

## Notas

- Asegúrate de que el backend esté corriendo en [http://localhost:3000](http://localhost:3000) para que la aplicación funcione correctamente.
- El diseño utiliza TailwindCSS y Bootstrap.
- **IMPORTANTE**: Nunca subas el archivo `.env` a control de versiones. Está incluido en `.gitignore` por seguridad.
