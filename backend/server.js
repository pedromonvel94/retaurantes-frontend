import express from "express";
import multer from "multer";
import fs from "fs";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { Buffer } from "buffer";

// Configuración de __dirname para módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const uploadPath = path.join(__dirname, "uploads");
const jsonFilePath = path.join(__dirname, "datos.json");

// Configurar Multer para la carga de imágenes
const storage = multer.memoryStorage(); // No guarda archivos en disco
const upload = multer({ storage });


// Middleware para permitir CORS y JSON
app.use(cors());
app.use(express.json());

// Ruta para guardar datos nuevos
app.post("/guardar", upload.single("image"), (req, res) => {
  const { name, description, address } = req.body;

  let imageBase64 = "";
  if (req.file) {
    imageBase64 = req.file.buffer.toString("base64"); // Convertir directamente desde buffer
  }

  fs.readFile(jsonFilePath, (err, data) => {
    if (err && err.code !== "ENOENT") {
      return res.status(500).send("Error reading data.");
    }

    const savedData = data ? JSON.parse(data.toString()) : [];
    const newData = {
      id: Date.now(),
      name,
      description,
      address,
      image: imageBase64,
    };

    savedData.push(newData);

    fs.writeFile(jsonFilePath, JSON.stringify(savedData, null, 2), (err) => {
      if (err) {
        return res.status(500).send("Error saving data.");
      }
      res.send({ message: "Data saved successfully." });
    });
  });
});


// Ruta para listar los datos
app.get("/listar", (req, res) => {
  fs.readFile(jsonFilePath, (err, data) => {
    if (err) {
      return res.status(500).send("Error reading data.");
    }

    const savedData = JSON.parse(data.toString() || "[]");
    res.json(savedData);
  });
});

// Ruta para eliminar un dato
app.delete("/eliminar/:id", (req, res) => {
  const id = parseInt(req.params.id);

  fs.readFile(jsonFilePath, (err, data) => {
    if (err) {
      return res.status(500).send("Error reading data.");
    }

    const savedData = JSON.parse(data.toString() || "[]");
    const index = savedData.findIndex((d) => d.id === id);

    if (index === -1) {
      return res.status(404).send("Data not found.");
    }

    // Eliminar el dato
    savedData.splice(index, 1);

    fs.writeFile(jsonFilePath, JSON.stringify(savedData, null, 2), (err) => {
      if (err) {
        return res.status(500).send("Error deleting data.");
      }
      res.send({ message: "Data deleted successfully." });
    });
  });
});

// Ruta para actualizar un dato
app.put("/actualizar/:id", upload.single("image"), (req, res) => {
  const { name, description, address } = req.body;
  const id = parseInt(req.params.id);

  fs.readFile(jsonFilePath, (err, data) => {
    if (err) {
      return res.status(500).send("Error reading data.");
    }

    const savedData = JSON.parse(data.toString() || "[]");
    const index = savedData.findIndex((d) => d.id === id);

    if (index === -1) {
      return res.status(404).send("Data not found.");
    }

    // Convertir imagen a Base64 si se proporciona una nueva
    let imageBase64 = savedData[index].image;
    if (req.file && req.file.buffer) {
      imageBase64 = req.file.buffer.toString("base64");
    }

    // Actualizar el dato (solo si se proporcionan nuevos valores)
    const updatedData = {
      ...savedData[index],
      name: name || savedData[index].name,
      description: description || savedData[index].description,
      address: address || savedData[index].address,
      image: imageBase64,
    };

    savedData[index] = updatedData;

    fs.writeFile(jsonFilePath, JSON.stringify(savedData, null, 2), (err) => {
      if (err) {
        return res.status(500).send("Error updating data.");
      }
      res.send({ message: "Data updated successfully." });
    });
  });
});



// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
