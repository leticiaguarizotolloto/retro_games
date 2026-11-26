
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const porta = 3000;

// Conexão com o banco de dados
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
   database: "db_retrogames"
});

db.connect((erro) => {
    if (erro) {
        console.error("Erro ao conectar ao banco:", erro);
        return;
    }

    console.log("Banco de dados conectado!");
});

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Listar jogos
const mostrarJogos = (req, res) => {
    const sql = "SELECT * FROM jogos";

    db.query(sql, (erro, resultado) => {
        if (erro) {
            console.error(erro);
            return res.status(500).send("Erro ao listar jogos");
        }

        res.json(resultado);
    });
};

// Cadastrar jogo
const novoJogo = (req, res) => {
    const { titulo, plataforma, desenvolvedora, imagem_url, preco } = req.body;

    if (
        !titulo ||
        !plataforma ||
        !desenvolvedora ||
        !imagem_url ||
        preco === undefined ||
        preco === "" ||
        !Number.isFinite(Number(preco)) ||
        Number(preco) < 0
    ) {
        return res.status(400).send("Erro: Preencha todos os campos corretamente");
    }

    const sql = `
        INSERT INTO jogos
        (titulo, plataforma, desenvolvedora, imagem_url, preco)
        VALUES (?, ?, ?, ?, ?)
    `;

    const valores = [
        titulo,
        plataforma,
        desenvolvedora,
        imagem_url,
        Number(preco)
    ];

    db.query(sql, valores, (erro, resultado) => {
        if (erro) {
            console.error(erro);
            return res.status(500).send("Erro ao cadastrar jogo");
        }

        res.send("Jogo cadastrado com sucesso!");
    });
};

// Atualizar jogo
const atualizarJogo = (req, res) => {
    const { id } = req.params;
    const { titulo, plataforma, desenvolvedora, imagem_url, preco } = req.body;

    if (
        !titulo ||
        !plataforma ||
        !desenvolvedora ||
        !imagem_url ||
        preco === undefined ||
        preco === "" ||
        !Number.isFinite(Number(preco)) ||
        Number(preco) < 0
    ) {
        return res.status(400).send("Erro: Preencha todos os campos corretamente");
    }

    const sql = `
        UPDATE jogos
        SET titulo = ?, plataforma = ?, desenvolvedora = ?,
            imagem_url = ?, preco = ?
        WHERE id = ?
    `;

    const valores = [
        titulo,
        plataforma,
        desenvolvedora,
        imagem_url,
        Number(preco),
        id
    ];

    db.query(sql, valores, (erro, resultado) => {
        if (erro) {
            console.error(erro);
            return res.status(500).send("Erro ao atualizar jogo");
        }

        res.send("Jogo atualizado com sucesso!");
    });
};

// Deletar jogo
const deletarJogo = (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM jogos WHERE id = ?";

    db.query(sql, [id], (erro, resultado) => {
        if (erro) {
            console.error(erro);
            return res.status(500).send("Erro ao deletar jogo");
        }

        res.send("Jogo deletado com sucesso!");
    });
};

// Rotas
app.get("/listar", mostrarJogos);
app.post("/cadastrar", novoJogo);
app.put("/atualizar/:id", atualizarJogo);
app.delete("/deletar/:id", deletarJogo);

// Iniciar servidor
app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
});
