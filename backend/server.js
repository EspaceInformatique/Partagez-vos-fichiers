const express = require('express');
const fileRoutes = require('./routes/fileRoutes');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Servir les fichiers statiques (frontend)
app.use(express.static(path.join(__dirname, '../frontend')));

// Routes pour les fichiers
app.use('/api/files', fileRoutes);

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
