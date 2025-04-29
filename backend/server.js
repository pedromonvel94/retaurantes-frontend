import express from 'express';
import multer from 'multer';
import fs from 'fs';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { Buffer } from 'buffer';

// Configuración de __dirname para módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const uploadPath = path.join(__dirname, 'uploads');
const jsonFilePath = path.join(__dirname, 'datos.json');

// Configurar Multer para la carga de imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Middleware para permitir CORS y JSON
app.use(cors());
app.use(express.json());

// Ruta para guardar datos nuevos
app.post('/guardar', upload.single('imagen'), (req, res) => {
  const { nombre, descripcion, direccion } = req.body;
  const imagen = req.file ? req.file.filename : null;

  // Leer la imagen y convertirla a Base64
  let imagenBase64 = '';
  if (imagen) {
    const imagenPath = path.join(uploadPath, imagen);
    try {
      const imagenBuffer = fs.readFileSync(imagenPath);
      imagenBase64 = imagenBuffer.toString('base64'); // Convertir imagen a Base64
    } catch (error) {
      return res.status(500).send('Error al leer la imagen.');
    }
  }

  // Leer el archivo JSON
  fs.readFile(jsonFilePath, (err, data) => {
    if (err && err.code !== 'ENOENT') {
      return res.status(500).send('Error al leer los datos.');
    }

    const datosGuardados = data ? JSON.parse(data.toString()) : []; // Si el archivo no existe, inicializamos como array vacío.
    const nuevoDato = {
      id: Date.now(), // Usamos el timestamp como ID único
      nombre,
      descripcion,
      direccion,
      imagen: imagenBase64, // Guardar la imagen en Base64
    };

    datosGuardados.push(nuevoDato);

    // Escribir los datos actualizados al archivo JSON
    fs.writeFile(jsonFilePath, JSON.stringify(datosGuardados, null, 2), (err) => {
      if (err) {
        return res.status(500).send('Error al guardar los datos.');
      }
      res.send({ mensaje: 'Datos guardados correctamente.' });
    });
  });
});

// Ruta para listar los datos
app.get('/listar', (req, res) => {
  fs.readFile(jsonFilePath, (err, data) => {
    if (err) {
      return res.status(500).send('Error al leer los datos.');
    }

    const datosGuardados = JSON.parse(data.toString() || '[]');
    res.json(datosGuardados);
  });
});

// Ruta para eliminar un dato
app.delete('/eliminar/:id', (req, res) => {
  const id = parseInt(req.params.id);

  fs.readFile(jsonFilePath, (err, data) => {
    if (err) {
      return res.status(500).send('Error al leer los datos.');
    }

    const datosGuardados = JSON.parse(data.toString() || '[]');
    const index = datosGuardados.findIndex(d => d.id === id);

    if (index === -1) {
      return res.status(404).send('Dato no encontrado.');
    }

    // Eliminar el dato
    datosGuardados.splice(index, 1);

    fs.writeFile(jsonFilePath, JSON.stringify(datosGuardados, null, 2), (err) => {
      if (err) {
        return res.status(500).send('Error al eliminar el dato.');
      }
      res.send({ mensaje: 'Dato eliminado correctamente.' });
    });
  });
});

// Ruta para actualizar un dato
app.put('/actualizar/:id', upload.single('imagen'), (req, res) => {
  const { nombre, descripcion, direccion } = req.body;
  const imagen = req.file ? req.file.filename : null;
  const id = parseInt(req.params.id);

  fs.readFile(jsonFilePath, (err, data) => {
    if (err) {
      return res.status(500).send('Error al leer los datos.');
    }

    const datosGuardados = JSON.parse(data.toString() || '[]');
    const index = datosGuardados.findIndex(d => d.id === id);

    if (index === -1) {
      return res.status(404).send('Dato no encontrado.');
    }

    // Convertir la nueva imagen a Base64 si existe
    let imagenBase64 = datosGuardados[index].imagen; // Si no se proporciona imagen nueva, mantener la anterior
    if (imagen) {
      const imagenPath = path.join(uploadPath, imagen);
      try {
        const imagenBuffer = fs.readFileSync(imagenPath);
        imagenBase64 = imagenBuffer.toString('base64');
      } catch (error) {
        return res.status(500).send('Error al leer la imagen.');
      }
    }

    // Actualizar el dato
    const updatedDato = {
      ...datosGuardados[index],
      nombre,
      descripcion,
      direccion,
      imagenBase64: imagenBase64, // Actualizar con la nueva imagen en Base64
    };

    datosGuardados[index] = updatedDato;

    // Escribir los datos actualizados al archivo JSON
    fs.writeFile(jsonFilePath, JSON.stringify(datosGuardados, null, 2), (err) => {
      if (err) {
        return res.status(500).send('Error al actualizar los datos.');
      }
      res.send({ mensaje: 'Datos actualizados correctamente.' });
    });
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
