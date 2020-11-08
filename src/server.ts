import express from 'express';

const app = express();

app.use(express.json())
app.post('/', (req, res) => {
    const { name, email } = req.body;

    const user = {
        name,
        email,
    };

    res.json(user)
});
app.listen(3333, () => {
    console.log("servidor rodando na porta 3333")
});
