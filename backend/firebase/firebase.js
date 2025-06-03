import admin from "firebase-admin";
import { readFileSync } from "fs";
import path from "path";

const serviceAccount = JSON.parse(
    readFileSync(path.resolve("firebase/firebaseKey.json"), "utf-8")
);

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: "findmybite-e8cce.appspot.com",
    });
}

const db = admin.firestore();

export { db };