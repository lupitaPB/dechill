const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();
const PORT = process.env.PORT || 3000;

// Configurar CORS
app.use(cors());

// Middleware para analizar el cuerpo de las solicitudes JSON
app.use(bodyParser.json());

// Conectarse a MongoDB Atlas
const uri = 'mongodb+srv://lupitapb:root@cluster0.3qz2pqw.mongodb.net/ejemplo?retryWrites=true&w=majority&appName=Cluster0';
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

// Definición del esquema para los datos
const respuestaSchema = new mongoose.Schema({
  Sexo: String,
  Edad: Number,
  Fumador: String,
  'Dedos Amarillos': String,
  Ansiedad: String,
  'Presión de grupo': String,
  'Enfermedad crónica': String,
  Fatiga: String,
  Alergia: String,
  Silbilancias: String,
  'Consumo Alcohol': String,
  Tos: String,
  'Dificultad respirar': String,
  'Dificultad tragar': String,
  'Dolor en pecho': String,
});

const Respuesta = mongoose.model('Respuesta', respuestaSchema);

// Ruta para manejar las solicitudes POST desde la aplicación Flutter
app.post('/enviardatos', async (req, res) => {
  try {
    const respuesta = new Respuesta(req.body);
    await respuesta.save();
    res.status(201).send('Datos guardados correctamente');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al guardar los datos');
  }
});




// Ruta para obtener datos de la base de datos
app.get('/obtenerdatos', async (req, res) => {
  try {
    const db = client.db('ejemplo'); // Selecciona la base de datos 'ejemplo'
    const collection = db.collection('tabla1'); // Selecciona la colección donde están los datos

    // Realiza una consulta a la colección para obtener los datos
    const datos = await collection.find({}).toArray();

    // Contar el número de "SÍ" y "NO" en el campo "Cáncer de pulmón"
    let contadorSi = 0;
    let contadorNo = 0;
    datos.forEach(registro => {
      if (registro["Cancer de pulmon"] === "YES") {
        contadorSi++;
      } else if (registro["Cancer de pulmon"] === "NO") {
        contadorNo++;
      }
   });

    // Devolver los datos junto con los recuentos de "SÍ" y "NO"
    res.json({
      datos: datos,
      contadorSi: contadorSi,
      contadorNo: contadorNo
    });
  } catch (err) {
    console.error('Error al obtener datos de MongoDB Atlas', err);
    res.status(500).send('Error al obtener datos de MongoDB Atlas');
  }
});

// Ruta para obtener datos de cáncer de pulmón por sexo
app.get('/obtenerdatossexo', async (req, res) => {
  try {
    const db = client.db('ejemplo');
    const collection = db.collection('tabla1');

    const datos = await collection.find({}).toArray();

    let contadorSiConM = 0; // Contador para "YES" con Sexo M
    let contadorNoConM = 0; // Contador para "NO" con Sexo M
    let contadorSiConF = 0; // Contador para "YES" con Sexo F
    let contadorNoConF = 0; // Contador para "NO" con Sexo F

    datos.forEach(registro => {
      if (registro["Cancer de pulmon"] === "YES") {
        if (registro["Sexo"] === "M") {
          contadorSiConM++;
        } else if (registro["Sexo"] === "F") {
          contadorSiConF++;
        }
      } else if (registro["Cancer de pulmon"] === "NO") {
        if (registro["Sexo"] === "M") {
          contadorNoConM++;
        } else if (registro["Sexo"] === "F") {
          contadorNoConF++;
        }
      }
    });

    res.json({
      contadorSiConM: contadorSiConM,
      contadorNoConM: contadorNoConM,
      contadorSiConF: contadorSiConF,
      contadorNoConF: contadorNoConF
    });
  } catch (err) {
    console.error('Error al obtener datos de MongoDB Atlas', err);
    res.status(500).send('Error al obtener datos de MongoDB Atlas');
  }
});



// Ruta para obtener fumadordes por sexo
app.get('/obtenerdatosFsexo', async (req, res) => {
  try {
    const db = client.db('ejemplo');
    const collection = db.collection('tabla1');

    const datos = await collection.find({}).toArray();

    let contadorSiFM = 0; // Contador para "2" con Sexo M
    let contadorNoFM = 0; // Contador para "1" con Sexo M
    let contadorSiFF = 0; // Contador para "2" con Sexo F
    let contadorNoFF = 0; // Contador para "1" con Sexo F

    datos.forEach(registro => {
      if (registro["Fumador"] === 2) {
        if (registro["Sexo"] === "M") {
          contadorSiFM++;
        } else if (registro["Sexo"] === "F") {
          contadorSiFF++;
        }
      } else if (registro["Fumador"] === 1) {
        if (registro["Sexo"] === "M") {
          contadorNoFM++;
        } else if (registro["Sexo"] === "F") {
          contadorNoFF++;
        }
      }
    });

    res.json({
      contadorSiFM: contadorSiFM,
      contadorNoFM: contadorNoFM,
      contadorSiFF: contadorSiFF,
      contadorNoFF: contadorNoFF
    });
  } catch (err) {
    console.error('Error al obtener datos de MongoDB Atlas', err);
    res.status(500).send('Error al obtener datos de MongoDB Atlas');
  }
});

// Ruta para obtener dedos Amarillos por sexo
app.get('/obtenerdatosDAsexo', async (req, res) => {
  try {
    const db = client.db('ejemplo');
    const collection = db.collection('tabla1');

    const datos = await collection.find({}).toArray();

    let contadorSiDAM = 0; // Contador para "2" con Sexo M
    let contadorNoDAM = 0; // Contador para "1" con Sexo M
    let contadorSiDAF = 0; // Contador para "2" con Sexo F
    let contadorNoDAF = 0; // Contador para "1" con Sexo F

    datos.forEach(registro => {
      if (registro["dedos amarillos"] === 2) {
        if (registro["Sexo"] === "M") {
          contadorSiDAM++;
        } else if (registro["Sexo"] === "F") {
          contadorSiDAF++;
        }
      } else if (registro["dedos amarillos"] === 1) {
        if (registro["Sexo"] === "M") {
          contadorNoDAM++;
        } else if (registro["Sexo"] === "F") {
          contadorNoDAF++;
        }
      }
    });

    res.json({
      contadorSiDAM: contadorSiDAM,
      contadorNoDAM: contadorNoDAM,
      contadorSiDAF: contadorSiDAF,
      contadorNoDAF: contadorNoDAF
    });
  } catch (err) {
    console.error('Error al obtener datos de MongoDB Atlas', err);
    res.status(500).send('Error al obtener datos de MongoDB Atlas');
  }
});

// Ruta para obtener Ansiedad por sexo
app.get('/obtenerdatosAsexo', async (req, res) => {
  try {
    const db = client.db('ejemplo');
    const collection = db.collection('tabla1');

    const datos = await collection.find({}).toArray();

    let contadorSiAM = 0; // Contador para "2" con Sexo M
    let contadorNoAM = 0; // Contador para "1" con Sexo M
    let contadorSiAF = 0; // Contador para "2" con Sexo F
    let contadorNoAF = 0; // Contador para "1" con Sexo F

    datos.forEach(registro => {
      if (registro["Ansiedad"] === 2) {
        if (registro["Sexo"] === "M") {
          contadorSiAM++;
        } else if (registro["Sexo"] === "F") {
          contadorSiAF++;
        }
      } else if (registro["Ansiedad"] === 1) {
        if (registro["Sexo"] === "M") {
          contadorNoAM++;
        } else if (registro["Sexo"] === "F") {
          contadorNoAF++;
        }
      }
    });

    res.json({
      contadorSiAM: contadorSiAM,
      contadorNoAM: contadorNoAM,
      contadorSiAF: contadorSiAF,
      contadorNoAF: contadorNoAF
    });
  } catch (err) {
    console.error('Error al obtener datos de MongoDB Atlas', err);
    res.status(500).send('Error al obtener datos de MongoDB Atlas');
  }
});

// Ruta para obtener Enfermedad cronica por sexo
app.get('/obtenerdatosECsexo', async (req, res) => {
  try {
    const db = client.db('ejemplo');
    const collection = db.collection('tabla1');

    const datos = await collection.find({}).toArray();

    let contadorSiECM = 0; // Contador para "2" con Sexo M
    let contadorNoECM = 0; // Contador para "1" con Sexo M
    let contadorSiECF = 0; // Contador para "2" con Sexo F
    let contadorNoECF = 0; // Contador para "1" con Sexo F

    datos.forEach(registro => {
      if (registro["enfermedad cronica"] === 2) {
        if (registro["Sexo"] === "M") {
          contadorSiECM++;
        } else if (registro["Sexo"] === "F") {
          contadorSiECF++;
        }
      } else if (registro["enfermedad cronica"] === 1) {
        if (registro["Sexo"] === "M") {
          contadorNoECM++;
        } else if (registro["Sexo"] === "F") {
          contadorNoECF++;
        }
      }
    });

    res.json({
      contadorSiECM: contadorSiECM,
      contadorNoECM: contadorNoECM,
      contadorSiECF: contadorSiECF,
      contadorNoECF: contadorNoECF
    });
  } catch (err) {
    console.error('Error al obtener datos de MongoDB Atlas', err);
    res.status(500).send('Error al obtener datos de MongoDB Atlas');
  }
});

// Ruta para obtener Fatiga por sexo
app.get('/obtenerdatosFAsexo', async (req, res) => {
  try {
    const db = client.db('ejemplo');
    const collection = db.collection('tabla1');

    const datos = await collection.find({}).toArray();

    let contadorSiFAM = 0; // Contador para "2" con Sexo M
    let contadorNoFAM = 0; // Contador para "1" con Sexo M
    let contadorSiFAF = 0; // Contador para "2" con Sexo F
    let contadorNoFAF = 0; // Contador para "1" con Sexo F

    datos.forEach(registro => {
      if (registro["fatiga"] === 2) {
        if (registro["Sexo"] === "M") {
          contadorSiFAM++;
        } else if (registro["Sexo"] === "F") {
          contadorSiFAF++;
        }
      } else if (registro["fatiga"] === 1) {
        if (registro["Sexo"] === "M") {
          contadorNoFAM++;
        } else if (registro["Sexo"] === "F") {
          contadorNoFAF++;
        }
      }
    });

    res.json({
      contadorSiFAM: contadorSiFAM,
      contadorNoFAM: contadorNoFAM,
      contadorSiFAF: contadorSiFAF,
      contadorNoFAF: contadorNoFAF
    });
  } catch (err) {
    console.error('Error al obtener datos de MongoDB Atlas', err);
    res.status(500).send('Error al obtener datos de MongoDB Atlas');
  }
});

// Ruta para obtener Alergia por sexo
app.get('/obtenerdatosALsexo', async (req, res) => {
  try {
    const db = client.db('ejemplo');
    const collection = db.collection('tabla1');

    const datos = await collection.find({}).toArray();

    let contadorSiALM = 0; // Contador para "2" con Sexo M
    let contadorNoALM = 0; // Contador para "1" con Sexo M
    let contadorSiALF = 0; // Contador para "2" con Sexo F
    let contadorNoALF = 0; // Contador para "1" con Sexo F

    datos.forEach(registro => {
      if (registro["Alergia"] === 2) {
        if (registro["Sexo"] === "M") {
          contadorSiALM++;
        } else if (registro["Sexo"] === "F") {
          contadorSiALF++;
        }
      } else if (registro["Alergia"] === 1) {
        if (registro["Sexo"] === "M") {
          contadorNoALM++;
        } else if (registro["Sexo"] === "F") {
          contadorNoALF++;
        }
      }
    });

    res.json({
      contadorSiALM: contadorSiALM,
      contadorNoALM: contadorNoALM,
      contadorSiALF: contadorSiALF,
      contadorNoALF: contadorNoALF
    });
  } catch (err) {
    console.error('Error al obtener datos de MongoDB Atlas', err);
    res.status(500).send('Error al obtener datos de MongoDB Atlas');
  }
});

// Ruta para obtener Silbilancias por sexo
app.get('/obtenerdatosSsexo', async (req, res) => {
  try {
    const db = client.db('ejemplo');
    const collection = db.collection('tabla1');

    const datos = await collection.find({}).toArray();

    let contadorSiSM = 0; // Contador para "2" con Sexo M
    let contadorNoSM = 0; // Contador para "1" con Sexo M
    let contadorSiSF = 0; // Contador para "2" con Sexo F
    let contadorNoSF = 0; // Contador para "1" con Sexo F

    datos.forEach(registro => {
      if (registro["Silbilancias"] === 2) {
        if (registro["Sexo"] === "M") {
          contadorSiSM++;
        } else if (registro["Sexo"] === "F") {
          contadorSiSF++;
        }
      } else if (registro["Silbilancias"] === 1) {
        if (registro["Sexo"] === "M") {
          contadorNoSM++;
        } else if (registro["Sexo"] === "F") {
          contadorNoSF++;
        }
      }
    });

    res.json({
      contadorSiSM: contadorSiSM,
      contadorNoSM: contadorNoSM,
      contadorSiSF: contadorSiSF,
      contadorNoSF: contadorNoSF
    });
  } catch (err) {
    console.error('Error al obtener datos de MongoDB Atlas', err);
    res.status(500).send('Error al obtener datos de MongoDB Atlas');
  }
});

// Ruta para obtener Consumo de Alcohol por sexo
app.get('/obtenerdatosCAsexo', async (req, res) => {
  try {
    const db = client.db('ejemplo');
    const collection = db.collection('tabla1');

    const datos = await collection.find({}).toArray();

    let contadorSiCAM = 0; // Contador para "2" con Sexo M
    let contadorNoCAM = 0; // Contador para "1" con Sexo M
    let contadorSiCAF = 0; // Contador para "2" con Sexo F
    let contadorNoCAF = 0; // Contador para "1" con Sexo F

    datos.forEach(registro => {
      if (registro["Consumo Alcohol"] === 2) {
        if (registro["Sexo"] === "M") {
          contadorSiCAM++;
        } else if (registro["Sexo"] === "F") {
          contadorSiCAF++;
        }
      } else if (registro["Consumo Alcohol"] === 1) {
        if (registro["Sexo"] === "M") {
          contadorNoCAM++;
        } else if (registro["Sexo"] === "F") {
          contadorNoCAF++;
        }
      }
    });

    res.json({
      contadorSiCAM: contadorSiCAM,
      contadorNoCAM: contadorNoCAM,
      contadorSiCAF: contadorSiCAF,
      contadorNoCAF: contadorNoCAF
    });
  } catch (err) {
    console.error('Error al obtener datos de MongoDB Atlas', err);
    res.status(500).send('Error al obtener datos de MongoDB Atlas');
  }
});

// Ruta para obtener Tos por sexo
app.get('/obtenerdatosTsexo', async (req, res) => {
  try {
    const db = client.db('ejemplo');
    const collection = db.collection('tabla1');

    const datos = await collection.find({}).toArray();

    let contadorSiTM = 0; // Contador para "2" con Sexo M
    let contadorNoTM = 0; // Contador para "1" con Sexo M
    let contadorSiTF = 0; // Contador para "2" con Sexo F
    let contadorNoTF = 0; // Contador para "1" con Sexo F

    datos.forEach(registro => {
      if (registro["Tos"] === 2) {
        if (registro["Sexo"] === "M") {
          contadorSiTM++;
        } else if (registro["Sexo"] === "F") {
          contadorSiTF++;
        }
      } else if (registro["Tos"] === 1) {
        if (registro["Sexo"] === "M") {
          contadorNoTM++;
        } else if (registro["Sexo"] === "F") {
          contadorNoTF++;
        }
      }
    });

    res.json({
      contadorSiTM: contadorSiTM,
      contadorNoTM: contadorNoTM,
      contadorSiTF: contadorSiTF,
      contadorNoTF: contadorNoTF
    });
  } catch (err) {
    console.error('Error al obtener datos de MongoDB Atlas', err);
    res.status(500).send('Error al obtener datos de MongoDB Atlas');
  }
});

// Ruta para obtener Dificultad para respirar por sexo
app.get('/obtenerdatosDRsexo', async (req, res) => {
  try {
    const db = client.db('ejemplo');
    const collection = db.collection('tabla1');

    const datos = await collection.find({}).toArray();

    let contadorSiDRM = 0; // Contador para "2" con Sexo M
    let contadorNoDRM = 0; // Contador para "1" con Sexo M
    let contadorSiDRF = 0; // Contador para "2" con Sexo F
    let contadorNoDRF = 0; // Contador para "1" con Sexo F

    datos.forEach(registro => {
      if (registro["Dificultad respirar"] === 2) {
        if (registro["Sexo"] === "M") {
          contadorSiDRM++;
        } else if (registro["Sexo"] === "F") {
          contadorSiDRF++;
        }
      } else if (registro["Dificultad respirar"] === 1) {
        if (registro["Sexo"] === "M") {
          contadorNoDRM++;
        } else if (registro["Sexo"] === "F") {
          contadorNoDRF++;
        }
      }
    });

    res.json({
      contadorSiDRM: contadorSiDRM,
      contadorNoDRM: contadorNoDRM,
      contadorSiDRF: contadorSiDRF,
      contadorNoDRF: contadorNoDRF
    });
  } catch (err) {
    console.error('Error al obtener datos de MongoDB Atlas', err);
    res.status(500).send('Error al obtener datos de MongoDB Atlas');
  }
});

// Ruta para obtener Dificultad para tragar por sexo
app.get('/obtenerdatosDTsexo', async (req, res) => {
  try {
    const db = client.db('ejemplo');
    const collection = db.collection('tabla1');

    const datos = await collection.find({}).toArray();

    let contadorSiDTM = 0; // Contador para "2" con Sexo M
    let contadorNoDTM = 0; // Contador para "1" con Sexo M
    let contadorSiDTF = 0; // Contador para "2" con Sexo F
    let contadorNoDTF = 0; // Contador para "1" con Sexo F

    datos.forEach(registro => {
      if (registro["Dificultad tragar"] === 2) {
        if (registro["Sexo"] === "M") {
          contadorSiDTM++;
        } else if (registro["Sexo"] === "F") {
          contadorSiDTF++;
        }
      } else if (registro["Dificultad tragar"] === 1) {
        if (registro["Sexo"] === "M") {
          contadorNoDTM++;
        } else if (registro["Sexo"] === "F") {
          contadorNoDTF++;
        }
      }
    });

    res.json({
      contadorSiDTM: contadorSiDTM,
      contadorNoDTM: contadorNoDTM,
      contadorSiDTF: contadorSiDTF,
      contadorNoDTF: contadorNoDTF
    });
  } catch (err) {
    console.error('Error al obtener datos de MongoDB Atlas', err);
    res.status(500).send('Error al obtener datos de MongoDB Atlas');
  }
});


// Ruta para obtener Dolor en pecho por sexo
app.get('/obtenerdatosDPsexo', async (req, res) => {
  try {
    const db = client.db('ejemplo');
    const collection = db.collection('tabla1');

    const datos = await collection.find({}).toArray();

    let contadorSiDPM = 0; // Contador para "2" con Sexo M
    let contadorNoDPM = 0; // Contador para "1" con Sexo M
    let contadorSiDPF = 0; // Contador para "2" con Sexo F
    let contadorNoDPF = 0; // Contador para "1" con Sexo F

    datos.forEach(registro => {
      if (registro["Dolor en pecho"] === 2) {
        if (registro["Sexo"] === "M") {
          contadorSiDPM++;
        } else if (registro["Sexo"] === "F") {
          contadorSiDPF++;
        }
      } else if (registro["Dolor en pecho"] === 1) {
        if (registro["Sexo"] === "M") {
          contadorNoDPM++;
        } else if (registro["Sexo"] === "F") {
          contadorNoDPF++;
        }
      }
    });

    res.json({
      contadorSiDPM: contadorSiDPM,
      contadorNoDPM: contadorNoDPM,
      contadorSiDPF: contadorSiDPF,
      contadorNoDPF: contadorNoDPF
    });
  } catch (err) {
    console.error('Error al obtener datos de MongoDB Atlas', err);
    res.status(500).send('Error al obtener datos de MongoDB Atlas');
  }
});


// Ruta de prueba para verificar la conexión
app.get('/conexion', (req, res) => {
  res.send('Conexión exitosa');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor backend en ejecución en el puerto ${PORT}`);
});


