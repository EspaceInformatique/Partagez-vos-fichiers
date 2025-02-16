const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// Stockage temporaire des fichiers (en mémoire)
const files = {};

// Route pour envoyer un fichier
router.post('/upload', (req, res) => {
    if (!req.files || !req.files.file) {
        return res.status(400).json({ error: 'Aucun fichier téléversé.' });
    }

    const file = req.files.file;
    const fileId = uuidv4(); // Générer un code unique

    // Sauvegarder le fichier en mémoire (ou dans un dossier)
    files[fileId] = file.data;

    res.json({ code: fileId });
});

// Route pour télécharger un fichier
router.get('/download/:code', (req, res) => {
    const fileId = req.params.code;
    const file = files[fileId];

    if (!file) {
        return res.status(404).json({ error: 'Fichier non trouvé.' });
    }

    res.setHeader('Content-Disposition', `attachment; filename=${fileId}`);
    res.send(file);
});

module.exports = router;
