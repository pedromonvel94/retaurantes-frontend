import admin from "firebase-admin";
import { readFileSync } from "fs";
import path from "path";

// Ruta absoluta al archivo firebaseKey.json
const serviceAccount = JSON.parse(
    readFileSync(path.resolve("firebase/firebaseKey.json"), "utf-8")
);

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: "findmybite-e8cce.appspot.com", // 👈 tu bucket
    });
}

const db = admin.firestore();
const bucket = admin.storage().bucket(); // 👈 nuevo

export { db, bucket };
