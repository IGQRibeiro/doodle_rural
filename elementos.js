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
  "agroecologia+energia solar": "sustentabilidade",
  "terra+codigo": "framework rural",
  "codigo+plataforma cooperativa": "app de cooperativa",
  "greve digital+assembleia": "votacao digital",
  "cafe+ide": "debugador acelerado",
  "terra+agroecologia": "horta permacultural",
  "cafe+hacktivismo": "criptocafe",
  "sustentabilidade+plataforma cooperativa": "mercado solidario",
  "sindicato+script de protesto": "campanha de boicote",
  "energia solar+plataforma cooperativa": "rede energetica popular",
  "framework rural+automacao rural": "infraestrutura digital no campo",
  "codigo+automacao rural": "controle remoto agricola",
  "greve digital+criptocafe": "blockchain de resistencia",
  "ide+votacao digital": "sistema de eleicao participativa",
  "debugador acelerado+assembleia": "resolucao de bugs coletivos",
  "sindicato+app de cooperativa": "central sindical digital",
  "horta permacultural+automacao rural": "colheita regenerativa",
  "rede energetica popular+terra": "biodiversidade energizada",
  "criptocafe+terra": "plantacao descentralizada",
  "mercado solidario+codigo": "economia de codigo aberto"
};

const TOTAL_ELEMENTOS = Array.from(
  new Set([
    ...ELEMENTOS_INICIAIS,
    ...Object.keys(COMBINACOES).flatMap(k => k.split("+")),
    ...Object.values(COMBINACOES),
  ])
);

