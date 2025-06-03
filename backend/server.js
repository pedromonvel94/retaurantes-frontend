import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { db } from "./firebase/firebase.js";


// Configuración de __dirname para módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Middleware para permitir CORS y JSON
app.use(cors());
app.use(express.json());

// Ruta para guardar datos nuevos
app.post("/guardar", async (req, res) => {
  const { name, description, address, image } = req.body;

  try {
    const newData = {
      name,
      description,
      address,
      image: image || "",
      createdAt: new Date(),
    };

    const docRef = await db.collection("restaurantes").add(newData);
    res.send({ message: "Data saved in Firestore!", id: docRef.id });
  } catch (error) {
    console.error("Error saving:", error);
    res.status(500).send("Error saving data.");
  }
});



// Ruta para listar los datos
app.get("/listar", async (req, res) => {
  try {
    const snapshot = await db.collection("restaurantes").get();
    const datos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(datos);
  } catch (error) {
    console.error("Error fetching:", error);
    res.status(500).send("Error listing data.");
  }
});

// Ruta para eliminar un dato
app.delete("/eliminar/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await db.collection("restaurantes").doc(id).delete();
    res.send({ message: "Data deleted successfully." });
  } catch (error) {
    console.error("Error deleting:", error);
    res.status(500).send("Error deleting data.");
  }
});

// Ruta para actualizar un dato
app.put("/actualizar/:id", async (req, res) => {
  const { id } = req.params;

  let updateData = {
    ...(name && { name }),
    ...(description && { description }),
    ...(address && { address }),
  };

  if (image !== undefined) {
    updateData.image = image;
  }

  try {
    await db.collection("restaurantes").doc(id).update(updateData);
    res.send({ message: "Data updated successfully." });
  } catch (error) {
    console.error("Error updating:", error);
    res.status(500).send("Error updating data.");
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

//Testeo conexion firebase
app.get("/test-firebase", async (req, res) => {
  try {
    const doc = await db.collection("test").add({ connected: true, timestamp: new Date() });
    res.send(`Firebase is connected. Document ID: ${doc.id}`);
  } catch (error) {
    console.error("Firebase connection error:", error);
    res.status(500).send("Failed to connect to Firebase");
  }
});