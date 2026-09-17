require('dotenv').config();
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const baseDir = 'uploads'
        let subfolder = ''

        const ext= path.extname(file.originalname).toLowerCase()

        switch (ext) {
    // Imagens
    case '.jpg':
    case '.jpeg':
    case '.png':
    case '.gif':
    case '.bmp':
    case '.webp':
    case '.svg':
    case '.tiff':
    case '.ico':
        subfolder = 'imagens'
        break

    // Documentos
    case '.pdf':
    case '.doc':
    case '.docx':
    case '.txt':
    case '.rtf':
    case '.odt':
    case '.md':
        subfolder = 'documentos'
        break

    // Planilhas
    case '.xls':
    case '.xlsx':
    case '.csv': // 
    case '.ods':
        subfolder = 'planilhas'
        break

    // Apresentações
    case '.ppt':
    case '.pptx':
    case '.odp':
        subfolder = 'apresentacoes'
        break

    // Vídeos
    case '.mp4':
    case '.mkv':
    case '.avi':
    case '.mov':
    case '.webm':
    case '.wmv':
    case '.flv':
        subfolder = 'videos'
        break

    // Áudio
    case '.mp3':
    case '.wav':
    case '.flac':
    case '.aac':
    case '.ogg':
    case '.m4a':
        subfolder = 'audio'
        break

    // Compactados
    case '.zip':
    case '.rar':
    case '.7z':
    case '.tar':
    case '.gz':
    case '.bz2':
        subfolder = 'compactados'
        break

    // Executáveis / Instalações
    case '.exe':
    case '.msi':
    case '.apk':
    case '.deb':
    case '.rpm':
    case '.dmg':
        subfolder = 'executaveis'
        break

    // Scripts / Código
    case '.py':
    case '.js':
    case '.ts':
    case '.sh':
    case '.bat':
    case '.html':
    case '.css':
    case '.xml': // 
        subfolder = 'scripts'
        break

    // Dados
    case '.json':
    case '.sql':
    case '.db':
        subfolder = 'dados'
        break

    // Fontes
    case '.ttf':
    case '.otf':
    case '.woff':
    case '.woff2':
        subfolder = 'fontes'
        break

    default:
        subfolder = 'outros'
}

const uploadDir = path.join(__dirname, baseDir, subfolder)
fs.mkdirSync(uploadDir, { recursive: true })

req.uploadDir = uploadDir
cb(null, uploadDir)
    },

    filename: (req, file, cb) => {
        const filename = Date.now() + '-' + file.originalname
        cb(null, filename)
    }
})

const upload = multer({storage})

app.post('/upload', upload.array('arquivos', 10), (req, res) => {
    if (!req.files) return res.status(400).send('Arquivo invalido!')

    return res.json({ message: 'Arquivo enviado com sucesso!' })
})
app.listen(PORT, () => console.log(`Servidor ${PORT} rodando`))