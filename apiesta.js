// Importa los módulos necesarios
const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


// Configura Express
const app = express();
const PORT = process.env.PORT || 3001;

// Configura CORS
app.use(cors());

// Conecta a MongoDB Atlas
const uri = 'mongodb+srv://lupitapb:root@cluster0.3qz2pqw.mongodb.net/estadiometro?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(uri);

async function connect() {
  try {
    await client.connect();
    console.log('Conectado a MongoDB Atlas');
  } catch (err) {
    console.error('Error al conectar a MongoDB Atlas', err);
  }
}

connect();

app.get('/ultimodato', async (req, res) => {
  try {
    const database = client.db('estadiometro');
    const collection = database.collection('tabla');
    
    // Ordenar los documentos por _id de forma descendente y limitar el resultado a 1
    const data = await collection.find({}).sort({_id: -1}).limit(1).toArray();
    
    // Si hay datos, extraer los campos específicos
    if (data.length > 0) {
      const { _id, Altura, Temperatura,Frecuencia Cardiaca} = data[0]; // Ajuste aquí para incluir _id si lo necesitas
      res.json({ _id, Altura, Temperatura,Frecuencia Cardiaca}); // Ajuste aquí para incluir _id si lo necesitas
    } else {
      res.status(404).send('No se encontraron datos en la colección');
    }
  } catch (err) {
    console.error('Error al obtener el último dato de la colección', err);
    res.status(500).send('Error interno del servidor');
  }
});



// Ruta de prueba para verificar la conexión
app.get('/conexion', (req, res) => {
  res.send('Conexión exitosa');
});
// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor backend en ejecución en el puerto ${PORT}`);
});

