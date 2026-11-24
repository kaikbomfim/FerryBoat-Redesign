// Dados reais coletados do site oficial (internacionaltravessias.com.br) em 24/11/2026.
// Tarifas: Resolução AGERBA nº 11 de 3 de março de 2026 (em vigor desde 06/03/2026).
import type { Tarifa } from "./types"

export const FONTE_DADOS = "internacionaltravessias.com.br, consultado em 24/11/2026"

export const resolucaoTarifas = {
  nome: "Resolução AGERBA nº 11, de 3 de março de 2026",
  vigencia: "em vigor desde 6 de março de 2026",
}

export const terminais = {
  salvador: {
    id: "salvador",
    nome: "Terminal São Joaquim",
    cidade: "Salvador",
    endereco: "Av. Eng. Oscar Pontes, 1051 – Água de Meninos, Salvador – BA",
    mapa: "https://www.google.com/maps/search/?api=1&query=Terminal+Ferry+Boat+S%C3%A3o+Joaquim+Salvador",
  },
  itaparica: {
    id: "itaparica",
    nome: "Terminal Bom Despacho",
    cidade: "Itaparica",
    endereco: "Bom Despacho, s/n – Ilha de Itaparica – BA",
    mapa: "https://www.google.com/maps/search/?api=1&query=Terminal+Bom+Despacho+Itaparica",
  },
} as const

export type TerminalId = keyof typeof terminais

/** Saídas regulares (iguais nos dois sentidos, simultâneas em cada terminal). */
const seqHoras = (inicio: number, fim: number) =>
  Array.from({ length: fim - inicio + 1 }, (_, i) => `${String(inicio + i).padStart(2, "0")}:00`)

export const horarios = {
  segASab: [...seqHoras(5, 22), "23:30"],
  domEFeriados: [...seqHoras(6, 22), "23:30"],
  funcionamento: {
    segASab: "das 5h às 23h30",
    domEFeriados: "das 6h às 23h30",
  },
  observacoes: [
    "As saídas acontecem de hora em hora, ao mesmo tempo, nos dois terminais.",
    "A última saída do dia é às 23h30 (não há saída às 23h).",
    "Podem ocorrer viagens extras quando o movimento aumenta.",
    "A duração da travessia e os horários podem variar por causa da maré, do clima e de ajustes de segurança.",
  ],
}

export const tarifas: Tarifa[] = [
  { id: "pedestre", categoria: "Pedestre", grupo: "pessoa", detalhe: "Quem atravessa a pé", util: 7.2, fimDeSemana: 9.5 },
  { id: "passageiro", categoria: "Passageiro de veículo", grupo: "pessoa", detalhe: "Cada ocupante além do motorista", util: 7.2, fimDeSemana: 9.5, horaMarcada: { util: 9.36, fimDeSemana: 12.35 } },
  { id: "estudante", categoria: "Estudante (Cartão Estudante)", grupo: "pessoa", detalhe: "Meia-passagem com cartão cadastrado", util: 3.6, fimDeSemana: 4.8 },
  { id: "bicicleta", categoria: "Bicicleta", grupo: "veiculo", util: 10.6, fimDeSemana: 14.9 },
  { id: "carro-de-mao", categoria: "Carro de mão", grupo: "veiculo", util: 22.7, fimDeSemana: 39.7 },
  { id: "moto", categoria: "Motocicleta ou lambreta", grupo: "veiculo", util: 27.0, fimDeSemana: 37.8 },
  { id: "auto-pequeno", categoria: "Carro pequeno", grupo: "veiculo", detalhe: "Até 4,23 m de comprimento", util: 64.7, fimDeSemana: 91.7, horaMarcada: { util: 84.11, fimDeSemana: 119.21 } },
  { id: "triciclo", categoria: "Triciclo ou quadriciclo", grupo: "veiculo", util: 64.7, fimDeSemana: 91.7 },
  { id: "auto-grande", categoria: "Carro grande", grupo: "veiculo", detalhe: "A partir de 4,231 m de comprimento", util: 82.7, fimDeSemana: 116.9, horaMarcada: { util: 107.51, fimDeSemana: 151.97 } },
  { id: "reboque", categoria: "Reboque", grupo: "veiculo", util: 62.9, fimDeSemana: 88.1, horaMarcada: { util: 81.77, fimDeSemana: 114.53 } },
  { id: "utilitario", categoria: "Utilitário ou micro-ônibus", grupo: "pesado", util: 118.7, fimDeSemana: 167.3 },
  { id: "caminhao", categoria: "Caminhão simples", grupo: "pesado", util: 196.0, fimDeSemana: 275.2 },
  { id: "onibus", categoria: "Ônibus", grupo: "pesado", util: 264.4, fimDeSemana: 372.3 },
  { id: "caminhao-trucado", categoria: "Caminhão trucado", grupo: "pesado", util: 264.4, fimDeSemana: 372.3 },
  { id: "jamanta", categoria: "Jamanta (carreta)", grupo: "pesado", util: 383.1, fimDeSemana: 539.5 },
]

export const estacionamento = {
  local: "Terminal São Joaquim (Salvador)",
  funcionamento: "Todos os dias, das 4h30 às 23h30 (ou conforme o funcionamento do terminal)",
  pagamento: "Cartão de débito ou crédito. Para pagar em dinheiro, retire o ticket e vá ao posto do pedágio.",
  linhas: [
    { faixa: "Por hora (até a 4ª hora)", carro: 3.5, moto: 2.0 },
    { faixa: "Da 5ª à 12ª hora", carro: 27.7, moto: 15.0 },
    { faixa: "Da 13ª à 24ª hora", carro: 54.2, moto: 30.0 },
    { faixa: "Mensalista", carro: 150.0, moto: 100.0 },
  ],
}

export const contatos = {
  sac: { rotulo: "SAC (Central telefônica)", valor: "(71) 3103-2050", href: "tel:+557131032050" },
  whatsapp: { rotulo: "WhatsApp", valor: "(71) 99984-7244", href: "https://wa.me/5571999847244" },
  demandas: { rotulo: "Solicitações gerais", valor: "demandas@internacionaltravessias.com.br", href: "mailto:demandas@internacionaltravessias.com.br" },
  reembolso: { rotulo: "Cancelamento e reembolso", valor: "atendimentoarrecadacao@internacionaltravessias.com.br", href: "mailto:atendimentoarrecadacao@internacionaltravessias.com.br" },
  ouvidoria: { rotulo: "Ouvidoria", valor: "ouvidoria@internacionaltravessias.com.br", href: "mailto:ouvidoria@internacionaltravessias.com.br" },
}

export const links = {
  horaMarcada: "https://portalsigomits.internacionaltravessias.com.br:8744/wbc-st5/login.faces?uat=12",
  filometroOficial: "https://www.internacionaltravessias.com.br/?page_id=5347",
  siteOficial: "https://www.internacionaltravessias.com.br/",
  sacDigital: "https://www.sacdigital.ba.gov.br",
  agerba: "https://www.ba.gov.br/agerba/",
}

export const avisos = [
  {
    data: "2026-11-24",
    titulo: "Boletim do dia",
    texto:
      "Operam hoje os ferries Dorival Caymmi, Ivete Sangalo e Maria Bethânia. Movimento tranquilo para veículos e pedestres nos dois terminais.",
  },
  {
    data: "2026-11-19",
    titulo: "Setor de Cartões e Tarifa Social",
    texto:
      "Atendimento em horário normal: das 8h às 12h e das 13h às 17h.",
  },
]

export const frota = [
  { nome: "Zumbi dos Palmares", passageiros: 1094, veiculos: 122 },
  { nome: "Dorival Caymmi", passageiros: 987, veiculos: 108 },
  { nome: "Pinheiro", passageiros: 800, veiculos: 36 },
  { nome: "Maria Bethânia", passageiros: 793, veiculos: 36 },
  { nome: "Rio Paraguaçu", passageiros: 789, veiculos: 36 },
  { nome: "Ivete Sangalo", passageiros: 629, veiculos: 45 },
  { nome: "Anna Nery", passageiros: 618, veiculos: 45 },
]

/** Feriados nacionais e estaduais (BA) de 2026 usados para escolher a grade de horários e a tarifa. */
export const feriados2026: Record<string, string> = {
  "2026-01-01": "Confraternização Universal",
  "2026-02-16": "Carnaval",
  "2026-02-17": "Carnaval",
  "2026-04-03": "Sexta-feira Santa",
  "2026-04-21": "Tiradentes",
  "2026-05-01": "Dia do Trabalho",
  "2026-06-04": "Corpus Christi",
  "2026-07-02": "Independência da Bahia",
  "2026-09-07": "Independência do Brasil",
  "2026-10-12": "Nossa Senhora Aparecida",
  "2026-11-02": "Finados",
  "2026-11-15": "Proclamação da República",
  "2026-11-20": "Consciência Negra",
  "2026-12-25": "Natal",
}

export const brl = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
