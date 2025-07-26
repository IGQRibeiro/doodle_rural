let descobertos = JSON.parse(localStorage.getItem("descobertos")) || [...ELEMENTOS_INICIAIS];
let selecionados = [];
let historico = JSON.parse(localStorage.getItem("historico")) || [];

function salvarProgresso() {
  localStorage.setItem("descobertos", JSON.stringify(descobertos));
  localStorage.setItem("historico", JSON.stringify(historico));
}

function atualizarElementos() {
  const div = document.getElementById("descobertos");
  div.innerHTML = "";
  descobertos.forEach(el => {
    const item = criarElementoVisual(el);
    item.onclick = () => selecionar(el);
    div.appendChild(item);
  });

  // Atualiza elementos selecionados
  const selDiv = document.getElementById("selecionados");
  selDiv.innerHTML = "";
  selecionados.forEach(el => {
    selDiv.appendChild(criarElementoVisual(el));
  });

  // Atualiza histórico
  atualizarHistorico();

  // Atualiza contador
  document.getElementById("contador").innerText =
    `Evolução: ${descobertos.length} / ${TOTAL_ELEMENTOS.length} ⚗️`;
}

function criarElementoVisual(nome) {
  const div = document.createElement("div");
  div.className = "elemento";
  const img = document.createElement("img");
  img.src = `imagens/${nome}.png`;
  img.alt = nome;
  const label = document.createElement("span");
  label.innerText = nome;
  div.appendChild(img);
  div.appendChild(label);
  return div;
}

function selecionar(el) {
  if (selecionados.length < 2 && !selecionados.includes(el)) {
    selecionados.push(el);
    atualizarElementos();
  }
}

function combinar() {
  if (selecionados.length !== 2) return;

  const [a, b] = selecionados;
  const chave1 = `${a}+${b}`;
  const chave2 = `${b}+${a}`;
  const resultado = COMBINACOES[chave1] || COMBINACOES[chave2];
  const resEl = document.getElementById("resultado");

  if (resultado) {
    historico.push(`${a} + ${b} = ${resultado}`);
    if (!descobertos.includes(resultado)) {
      descobertos.push(resultado);
      resEl.innerText = `✨ Novo elemento criado: ${resultado}`;
      somDescoberta.volume = 0.2;
      somDescoberta.currentTime = 0;
      somDescoberta.play();
    } else {
      resEl.innerText = `Você já conhece ${resultado}`;
    }
  } else {
    historico.push(`${a} + ${b} = nada`);
    resEl.innerText = "❌ Não houve reação.";
  }

  selecionados = [];
  salvarProgresso();
  atualizarElementos();

  if (
  descobertos.length === TOTAL_ELEMENTOS.length &&
  !localStorage.getItem("final_exibido")
) {
  mostrarHistoria(false);
  localStorage.setItem("final_exibido", "true");
}

}

function atualizarHistorico() {
  const lista = document.getElementById("lista-historico");
  lista.innerHTML = "";
  historico.slice().reverse().forEach(item => {
    const li = document.createElement("li");
    li.innerText = item;
    lista.appendChild(li);
  });
}

function resetarJogo() {
  if (confirm("Tem certeza que deseja resetar o jogo? Todo o progresso será perdido.")) {
    localStorage.removeItem("descobertos");
    localStorage.removeItem("historico");
    localStorage.removeItem("final_exibido");
    descobertos = [...ELEMENTOS_INICIAIS];
    historico = [];
    selecionados = [];
        const musica = document.getElementById("musicaFundo");
    if (musica && !musica.paused) {
      musica.pause();
      musica.currentTime = 0;
    }
    atualizarElementos();
    document.getElementById("resultado").innerText = "Jogo resetado!";
        mostrarHistoria(true);

  }
}

function mostrarHistoria(inicio = true) {
  const texto = document.getElementById("textoHistoria");
  texto.innerText = inicio
    ? `🏞️ Em um mundo onde a tecnologia domina as cidades e o campo é deixado para trás, nasce um novo movimento...

Você é a centelha que une o conhecimento técnico, o poder do coletivo e a força da terra.

Combine ideias, construa soluções e descubra como a união entre o rural e o digital pode transformar o futuro.

🌱 Bem-vindo ao Doodle dos Programadores Rurais.`
    : `✨ Parabéns! Você desvendou todos os caminhos possíveis da programação rural!

Da simples terra ao ideal da sustentabilidade, você conectou cafeína, cooperativismo, energia e protesto em uma só rede.

Seu sindicato digital está forte. A assembleia é permanente. O campo é livre e conectado.

🌾 Viva a automação com consciência.
✊ Viva o código coletivo.
🌞 Viva a reforma agrária digital!

Obrigado por jogar.`;

  document.getElementById("modalHistoria").style.display = "flex";
}

function fecharModal() {
  document.getElementById("modalHistoria").style.display = "none";
  const musica = document.getElementById("musicaFundo");
  if (musica.paused) {
    musica.volume = 0.08; // opcional: diminui volume
    musica.play().catch(() => {});
  }
}

function alternarMusica() {
  const musica = document.getElementById("musicaFundo");
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
}

function iniciarJogo() {
  document.getElementById("telaMenu").style.display = "none";
  atualizarElementos();
  mostrarHistoria(true);

  const musica = document.getElementById("musicaFundo");
  if (musica && musica.paused) {
    musica.volume = 0.3;
    musica.play().catch(() => {});
  }
}



// Inicializa o jogo
window.onload = () => {
};

