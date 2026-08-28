import express from 'express';

const app = express();
const PORT = 3037;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('O servidor Node está rodando com ES Modules!');
});

app.listen(3037, () => {
    console.log(`Servidor rodando certinho em http://localhost:${3037}`);
});