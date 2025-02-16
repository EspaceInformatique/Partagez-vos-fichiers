const express = require('express');
const fileRoutes = require('./routes/fileRoutes');
const path = require('path');
const fileUpload = require('express-fileupload');

const app = express();
const PORT = 3000;

// Middleware pour parser les requêtes JSON et les fichiers
app.use(express.json());
app.use(fileUpload());

// Servir les fichiers statiques (frontend)
app.use(express.static(path.join(__dirname, '../')));

// Routes pour les fichiers
app.use('/api/files', fileRoutes);

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
