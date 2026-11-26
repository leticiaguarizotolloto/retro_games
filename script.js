
async function cadastrarJogo() {

    const novoJogo = {
        titulo: document.getElementById("jogo").value.trim(),
        plataforma: document.getElementById("plataforma").value.trim(),
        desenvolvedora: document.getElementById("criador").value.trim(),
        imagem_url: document.getElementById("imagem").value.trim(),
        preco: Number(document.getElementById("preco").value)
    };

    console.log(novoJogo);

    try {
        const resposta = await fetch(API_URL + "/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(novoJogo)
        });

        if (resposta.ok) {
            form.reset();
            modal.close();
            carregarJogos();
        } else {
            const mensagem = await resposta.text();
            alert("Erro ao cadastrar jogo: " + mensagem);
        }

    } catch (erro) {
        console.error("Erro na requisição:", erro);
        alert("Erro de conexão com o servidor");
    }
}
