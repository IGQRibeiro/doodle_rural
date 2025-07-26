let descobertos = JSON.parse(localStorage.getItem("descobertos")) || [...ELEMENTOS_INICIAIS];
let selecionados = [];
let historico = JSON.parse(localStorage.getItem("historico")) || [];

let podeDarDica = true;
let tempoRestante = 0;
let intervaloDica = null;

function salvarProgresso() {
  localStorage.setItem("descobertos", JSON.stringify(descobertos));
  localStorage.setItem("historico", JSON.stringify(historico));
}

function atualizarElementos() {
  const div = document.getElementById("descobertos");
  div.innerHTML = "";
  descobertos.forEach(el => {
    const item = criarElementoVisual(el);
    item.onclick = () => selecionar(el); // seleciona ou desmarca ao clicar
    div.appendChild(item);
  });

  // Atualiza elementos selecionados (área de combinação)
  const selDiv = document.getElementById("selecionados");
  selDiv.innerHTML = "";
  selecionados.forEach(el => {
    const item = criarElementoVisual(el);
    item.onclick = () => selecionar(el); // remover ao clicar aqui
    selDiv.appendChild(item);
  });

  atualizarHistorico();

  // Atualiza contador
  document.getElementById("contador").innerText =
    `Elementos descobertos: ${descobertos.length} / ${TOTAL_ELEMENTOS.length}`;
}


function criarElementoVisual(nome) {
  const div = document.createElement("div");
  div.className = "elemento";
  if (selecionados.includes(nome)) {
    div.classList.add("selecionado");
  }
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
  const index = selecionados.indexOf(el);

  if (index !== -1) {
    // se ja estava selecionado remove
    selecionados.splice(index, 1);
  } else if (selecionados.length < 2) {
    // se nao estava e tem espaço adiciona
    selecionados.push(el);
  }

  atualizarElementos();
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
      somDescoberta.volume = 0.1;
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

    clearInterval(intervaloDica);
    podeDarDica = true;
    tempoRestante = 0;
    document.getElementById("dicaTexto").innerText = "Nenhuma dica exibida ainda.";
    document.getElementById("dicaTimer").innerText = "Você ainda não pediu nenhuma dica.";

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
    musica.volume = 0.03;
    musica.play().catch(() => {});
  }
}

function alternarMusica() {
  const musica = document.getElementById("musicaFundo");
  const botao = document.getElementById("botaoMusica");

  if (musica.paused) {
    musica.play();
    botao.innerText = "🔊 Música Ligada";
  } else {
    musica.pause();
    botao.innerText = "🔇 Música Pausada";
  }
}


function iniciarJogo() {
  document.getElementById("telaMenu").style.display = "none";
  atualizarElementos();
  mostrarHistoria(true);

  const musica = document.getElementById("musicaFundo");
  if (musica && musica.paused) {
    musica.volume = 0.03;
    musica.play().catch(() => {});
  }
}

function mostrarDica() {
  const dicaTexto = document.getElementById("dicaTexto");
  const dicaTimer = document.getElementById("dicaTimer");

  if (!podeDarDica) {
    dicaTimer.innerText = `⏳ Aguarde ${tempoRestante}s para a próxima dica.`;
    return;
  }

  // Filtra dicas que são possíveis com elementos já descobertos
  const dicasPossiveis = Object.entries(COMBINACOES).filter(([chave, resultado]) => {
    const [a, b] = chave.split("+");
    return (
      descobertos.includes(a) &&
      descobertos.includes(b) &&
      !descobertos.includes(resultado)
    );
  });

  if (dicasPossiveis.length === 0) {
    dicaTexto.innerText = "🎉 Você já descobriu todos os elementos disponíveis no momento!";
    dicaTimer.innerText = "";
    return;
  }

  const [comb] = dicasPossiveis[Math.floor(Math.random() * dicasPossiveis.length)];
  const [a, b] = comb.split("+");

  // Mostra dica sem sobrescrever no futuro
  dicaTexto.innerText = `💡 Dica: tente combinar "${a}" + "${b}"`;
  dicaTimer.innerText = `⏳ Próxima dica disponível em 30s`;

  // Inicia cooldown
  podeDarDica = false;
  tempoRestante = 30;

  intervaloDica = setInterval(() => {
    tempoRestante--;
    if (tempoRestante > 0) {
      dicaTimer.innerText = `⏳ Próxima dica disponível em ${tempoRestante}s`;
    } else {
      clearInterval(intervaloDica);
      podeDarDica = true;
      dicaTimer.innerText = `💡 Pronto para uma nova dica!`;
    }
  }, 1000);
}

// Inicializa o jogo
window.onload = () => {
};

