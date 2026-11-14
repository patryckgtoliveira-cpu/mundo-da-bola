// ===== script.js - JavaScript puro =====
// O mesmo arquivo é usado em todas as páginas.
// Cada bloco só roda na página onde o elemento existe (por isso o "if").


// ---------- 1. INDEX: saudação e botão Gol ----------
const botaoGol = document.getElementById("btn-gol");

if (botaoGol) {
    const saudacao = document.getElementById("saudacao");
    const placar = document.getElementById("placar");
    const hora = new Date().getHours();      // SEQUENCIAL: linhas executadas em ordem

    // CONDICIONAL
    if (hora < 12) {
        saudacao.textContent = "Bom dia, torcedor!";
    } else if (hora < 18) {
        saudacao.textContent = "Boa tarde, torcedor!";
    } else {
        saudacao.textContent = "Boa noite, torcedor!";
    }

    let gols = 0;

    // EVENTO: a cada clique soma 1 e muda o texto na tela (DOM)
    botaoGol.addEventListener("click", function () {
        gols = gols + 1;
        placar.textContent = gols;
    });
}


// ---------- 2. HISTÓRIA: botão Ler mais / Ocultar ----------
const botaoLer = document.getElementById("btn-ler-mais");

if (botaoLer) {
    const textoExtra = document.getElementById("texto-extra");

    botaoLer.addEventListener("click", function () {
        const estaOculto = textoExtra.classList.toggle("oculto");
        botaoLer.textContent = estaOculto ? "Ler mais" : "Ocultar";
        botaoLer.setAttribute("aria-expanded", String(!estaOculto));
    });
}


// ---------- 3. PALPITES (com localStorage) ----------
const formPalpite = document.getElementById("form-palpite");

if (formPalpite) {
    const lista = document.getElementById("lista-palpites");

    // DADOS: array de palpites, lido do localStorage (ou vazio)
    let palpites = JSON.parse(localStorage.getItem("palpites")) || [];

    // Desenha a lista na tela
    function mostrar() {
        lista.innerHTML = "";

        // REPETIÇÃO: um <li> para cada palpite do array
        for (let i = 0; i < palpites.length; i++) {
            const item = document.createElement("li");
            item.className = "list-group-item";
            item.textContent = palpites[i];
            lista.appendChild(item);
        }
    }

    // EVENTO: envio do formulário
    formPalpite.addEventListener("submit", function (evento) {
        evento.preventDefault();   // não deixa a página recarregar

        const casa = document.getElementById("timeA").value;
        const fora = document.getElementById("timeB").value;
        const golsCasa = document.getElementById("golsA").value;
        const golsFora = document.getElementById("golsB").value;

        // CONDICIONAL: os times precisam ser diferentes
        if (casa === fora) {
            alert("Escolha dois times diferentes!");
        } else {
            palpites.push(casa + " " + golsCasa + " x " + golsFora + " " + fora);
            localStorage.setItem("palpites", JSON.stringify(palpites));
            mostrar();
            formPalpite.reset();
        }
    });

    // EVENTO: apagar todos
    document.getElementById("btn-limpar").addEventListener("click", function () {
        palpites = [];
        localStorage.removeItem("palpites");
        mostrar();
    });

    mostrar();   // ao abrir a página, mostra o que estava salvo
}


// ---------- 4. CONTATO ----------
const formContato = document.getElementById("form-contato");

if (formContato) {
    formContato.addEventListener("submit", function (evento) {
        evento.preventDefault();
        const nome = document.getElementById("nome").value;
        alert("Obrigado, " + nome + "! Mensagem enviada.");
        formContato.reset();
    });
}
