## Configuración del Backend con Firebase Firestore

Para que el backend (Node.js) se conecte y persista los datos en Firebase Firestore, es necesario realizar una configuración inicial.

### 1. Crear y Configurar tu Proyecto en Firebase

1.  Ve a la [Consola de Firebase](https://console.firebase.google.com/).
2.  Crea un proyecto nuevo.
3.  En tu proyecto de Firebase, navega a **"Firestore Database"** y haz clic en "Crear base de datos". Elige "Iniciar en modo de prueba" para empezar (o configura las reglas de seguridad si prefieres el modo de producción).
4.  **Importante:** Este proyecto está diseñado para funcionar con el plan **"Spark (gratuito)"**. Las imágenes de los restaurantes se manejan mediante URLs externas, NO a través de Firebase Storage, para evitar costos.

### 2. Obtener Credenciales de Servicio para el Backend

El servidor Node.js necesita autenticarse con tu proyecto de Firebase:

1.  En la Consola de Firebase, ve a **"Configuración del proyecto"** (el icono de engranaje ⚙️) > **"Cuentas de servicio"**.
2.  Haz clic en **"Generar nueva clave privada"**. Se descargará un archivo JSON.
3.  **Renombra** este archivo a `firebaseKey.json`.
4.  **Copia** `firebaseKey.json` y pégalo dentro de la carpeta `backend/firebase/` de tu proyecto.

    ```
    tu-proyecto/
    ├── backend/
    │   ├── firebase/
    │   │   └── firebaseKey.json  <-- ¡Va aquí!
    │   └── ...
    └── frontend/
        └── ...
    ```

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
