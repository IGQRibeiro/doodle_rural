// Elementos iniciais
const ELEMENTOS_INICIAIS = ["terra", "laptop", "sindicato", "cafe"];

// Combinações válidas
const COMBINACOES = {
  "terra+laptop": "energia solar",
  "cafe+laptop": "codigo",
  "sindicato+laptop": "hacktivismo",
  "sindicato+terra": "reforma agraria",
  "codigo+energia solar": "automacao rural",
  "codigo+reforma agraria": "plataforma cooperativa",
  "cafe+sindicato": "assembleia",
  "laptop+codigo": "ide",
  "hacktivismo+codigo": "script de protesto",
  "sindicato+hacktivismo": "greve digital",
  "terra+reforma agraria": "agroecologia",
  "cafe+assembleia": "consenso",
  "agroecologia+energia solar": "sustentabilidade"
};

const TOTAL_ELEMENTOS = Array.from(
  new Set([
    ...ELEMENTOS_INICIAIS,
    ...Object.keys(COMBINACOES).flatMap(k => k.split("+")),
    ...Object.values(COMBINACOES),
  ])
);
