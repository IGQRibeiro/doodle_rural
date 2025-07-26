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

/*

"ide+codigo": "framework rural",
"energia solar+automacao rural": "trator autonomo",
"codigo+plataforma cooperativa": "app de cooperativa",
"greve digital+assembleia": "votacao digital",
"cafe+ide": "debugador acelerado",
"terra+agroecologia": "horta permacultural",
"cafe+hacktivismo": "criptocafe",
"sustentabilidade+plataforma cooperativa": "mercado solidario",
"sindicato+script de protesto": "campanha de boicote",
"energia solar+plataforma cooperativa": "rede energetica popular",
"framework rural+automacao rural": "infraestrutura digital no campo",
"codigo+trator autonomo": "controle remoto agricola",
"greve digital+criptocafe": "blockchain de resistência",
"ide+votacao digital": "sistema de eleição participativa",
"debugador acelerado+assembleia": "resolução de bugs coletivos",
"sindicato+app de cooperativa": "central sindical digital",
"horta permacultural+trator autonomo": "colheita regenerativa",
"rede energetica popular+terra": "biodiversidade energizada",
"criptocafe+terra": "plantacao descentralizada",
"mercado solidario+codigo": "economia de código aberto"

*/