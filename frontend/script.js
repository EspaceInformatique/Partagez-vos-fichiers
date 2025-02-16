document.getElementById('generateCode').addEventListener('click', async () => {
    const fileInput = document.getElementById('fileInput');
    if (fileInput.files.length === 0) {
        alert('Veuillez sélectionner un fichier.');
        return;
    }

    const formData = new FormData();
    formData.append('file', fileInput.files[0]);

    try {
        const response = await fetch('/api/files/upload', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        document.getElementById('codeDisplay').textContent = `Code de partage : ${data.code}`;
    } catch (error) {
        console.error('Erreur lors de l\'envoi du fichier :', error);
    }
});

document.getElementById('downloadFile').addEventListener('click', async () => {
    const code = document.getElementById('codeInput').value;
    if (!code) {
        alert('Veuillez entrer un code de partage.');
        return;
    }

    try {
        const response = await fetch(`/api/files/download/${code}`);
        if (!response.ok) {
            throw new Error('Fichier non trouvé.');
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = code;
        a.click();
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Erreur lors du téléchargement du fichier :', error);
        alert('Fichier non trouvé.');
    }
});
