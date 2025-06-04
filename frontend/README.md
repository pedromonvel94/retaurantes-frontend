# RetaurantesFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.6.

## Backend Configuration with Firebase Firestore

For the backend (Node.js) to connect and persist data in Firebase Firestore, an initial setup is required.

### 1. Create and Configure Your Firebase Project

1.  Go to the [Firebase Console](https://console.firebase.google.com/).
2.  Create a new project.
3.  In your Firebase project, navigate to **"Firestore Database"** and click "Create database". Choose "Start in test mode" to begin (or configure security rules if you prefer production mode).
4.  **Important:** This project is designed to work with the **"Spark (free) plan"**. Restaurant images are handled via external URLs, NOT through Firebase Storage, to avoid costs.

### 2. Obtain Service Account Credentials for the Backend

The Node.js server needs to authenticate with your Firebase project:

1.  In the Firebase Console, go to **"Project settings"** (the gear icon ⚙️) > **"Service accounts"**.
2.  Click **"Generate new private key"**. A JSON file will be downloaded.
3.  **Rename** this file to `firebaseKey.json`.
4.  **Copy** `firebaseKey.json` and paste it inside the `backend/firebase/` folder of your project.

    ```
    your-project/
    ├── backend/
    │   ├── firebase/
    │   │   └── firebaseKey.json  <-- Place it here!
    │   └── ...
    └── frontend/
        └── ...
    ```

### 3. Run the Backend

Before starting the frontend, the backend must be running:

1.  Open a terminal and navigate to the `backend/` folder.
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the server:
    ```bash
    node server.js
    ```
    The server will be listening on `http://localhost:3000`. Keep this terminal open.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
