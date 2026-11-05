
const API_URL = "http://localhost:3000";

const btnCadastrar = document.getElementById("btnCadastrar");
const btnCancelar = document.getElementById("btnCancelar");
const modal = document.getElementById("modalCadastro");
const form = document.getElementById("formJogo");
const lista = document.getElementById("listarJogos");
const mensagemVazia = document.getElementById("mensagemVazia");

btnCadastrar.addEventListener("click", () => {
    modal.showModal();
});

btnCancelar.addEventListener("click", () => {
    modal.close();
});

// Listar jogos
async function carregarJogos() {
    try {
        const resposta = await fetch(API_URL + "/listar");

        if (!resposta.ok) {
            throw new Error("Erro ao buscar jogos");
        }

        const jogos = await resposta.json();

        lista.innerHTML = "";

        if (jogos.length === 0) {
            mensagemVazia.hidden = false;
            lista.appendChild(mensagemVazia);
            return;
        }

        mensagemVazia.hidden = true;

        jogos.forEach(jogo => {
            criarCard(
                jogo.titulo,
                jogo.plataforma,
                jogo.desenvolvedora,
                jogo.imagem_url,
                jogo.preco
            );
        });

    } catch (erro) {
        console.error("Erro ao carregar jogos:", erro);
        alert("Não foi possível conectar ao servidor");
    }
}

// Cadastrar jogo
form.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const novoJogo = {
        titulo: document.getElementById("jogo").value.trim(),
        plataforma: document.getElementById("plataforma").value.trim(),
        desenvolvedora: document.getElementById("criador").value.trim(),
        imagem_url: document.getElementById("imagem").value.trim(),
        preco: Number(document.getElementById("preco").value)
    };

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
            alert(mensagem || "Erro ao cadastrar jogo");
        }

    } catch (erro) {
        console.error("Erro na requisição:", erro);
        alert("Erro de conexão com o servidor");
    }
});

// Criar cards dos jogos
function criarCard(jogo, plataforma, criador, imagem, preco) {
    const card = document.createElement("article");
    card.classList.add("card-disco");

    const capa = document.createElement("div");
    capa.classList.add("capa");

    const imagemCapa = document.createElement("img");
    imagemCapa.src = imagem;
    imagemCapa.alt = "Capa do jogo " + jogo;

    capa.appendChild(imagemCapa);

    const info = document.createElement("div");
    info.classList.add("info-disco");

    const titulo = document.createElement("h3");
    titulo.textContent = jogo;

    const nomePlataforma = document.createElement("p");
    nomePlataforma.textContent = "Plataforma: " + plataforma;

    const nomeCriador = document.createElement("p");
    nomeCriador.textContent = "Desenvolvedora: " + criador;

    const valor = document.createElement("strong");
    valor.classList.add("preco");

    valor.textContent = Number(preco).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    info.append(titulo, nomePlataforma, nomeCriador, valor);

    card.append(capa, info);

    lista.appendChild(card);
}

// Carregar jogos ao abrir a página
carregarJogos();
