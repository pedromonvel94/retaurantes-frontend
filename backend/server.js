import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { db } from "./firebase/firebase.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'https://findmybite.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

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
    console.log("Documento guardado con ID:", docRef.id);
    res.status(201).send({ message: "Data saved in Firestore!", id: docRef.id });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).send("Error saving data.");
  }
});

app.get("/listar", async (req, res) => {
  try {
    const snapshot = await db.collection("restaurantes").get();
    const datos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(datos);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error listing data.");
  }
});

app.delete("/eliminar/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await db.collection("restaurantes").doc(id).delete();
    console.log("Documento eliminado con ID:", id);
    res.send({ message: "Data deleted successfully." });
  } catch (error) {
    console.error(`Error deleting data with ID ${id}:`, error);
    res.status(500).send("Error deleting data.");
  }
});

app.put("/actualizar/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description, address, image } = req.body;

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
    console.log("Documento actualizado con ID:", id);
    res.send({ message: "Data updated successfully." });
  } catch (error) {
    console.error(`Error updating data with ID ${id}:`, error);
    res.status(500).send("Error updating data.");
  }
});

app.get("/test-firebase", async (req, res) => {
  try {
    const doc = await db.collection("test").add({ connected: true, timestamp: new Date() });
    console.log("Documento de prueba de Firebase creado:", doc.id);
    res.send(`Firebase is connected. Document ID: ${doc.id}`);
  } catch (error) {
    console.error("Firebase connection error:", error);
    res.status(500).send("Failed to connect to Firebase. Check backend logs for details.");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});