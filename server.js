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