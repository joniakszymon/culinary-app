const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const port = 3000;

const { MongoClient } = require('mongodb');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.get('/uploads', (req, res) => {
  res.send('Hello, /uploads')
})


app.post("/uploads", (req, res) => {
  try {
    const uploadedFiles = [];

    for (const fieldname in req.files) {
      const file = req.files[fieldname];
      const fileName = file.name;
      const uploadPath = path.join(__dirname, 'uploads', fileName); // Ścieżka do folderu "uploads"

      file.mv(uploadPath, err => {
        if (err) {
          console.error(`Błąd podczas zapisywania pliku ${fileName}:`, err);
        } else {
          console.log(`Plik ${fileName} zapisany w folderze uploads.`);
          uploadedFiles.push(fileName);
        }
      });
    }

    console.log('Przesłane pliki:', uploadedFiles);
    res.json({ message: 'File Uploaded', uploadedFiles });
  } catch (error) {
    console.error('Error', error);
    res.status(500).json({ error: 'An error occurred while processing the request.' });
  }
});


app.post('/recipes', async (req, res) => {
  const newRecipes = req.body;
  try {
    await collection.insertOne(newRecipes);
    console.log(`Document successfully inserted.\n`);
  } catch (err) {
    console.error(`Something went wrong trying to insert the new documents: ${err}\n`);
  }

});


app.get('/recipes', async (req, res) => {
  try {
    const recipes = await collection.find({}).toArray();
    res.json(recipes);
  } catch (error) {
    console.error('Błąd podczas pobierania przepisów:', error);
    res.status(500).json({ error: 'Wystąpił błąd' });
  }
});

app.listen(port, async () => {
  const uri = "mongodb+srv://joniakszymon:4Razypo2Razy@cluster0.zv8zrdv.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const dbName = "recipes";
    const collectionName = "recipes";
    const db = client.db(dbName);
    global.collection = db.collection(collectionName);

    console.log('Połączono z MongoDB');

    // Tutaj możesz umieścić inne operacje na bazie danych

    process.on('SIGINT', async () => {
      await client.close();
      console.log('Rozłączono z MongoDB');
      process.exit();
    });
  } catch (err) {
    console.error('Błąd połączenia z MongoDB:', err);
  }
  console.log(`Server is running on port ${port}`);
});
