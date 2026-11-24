export type FaqCategoria =
  | "geral"
  | "ferry-card"
  | "hora-marcada"
  | "sac-digital"
  | "prioridade"
  | "tarifa-social"

export type Faq = {
  id: string
  categoria: FaqCategoria
  pergunta: string
  resposta: string[]
}

export type TipoDia = "util" | "fimDeSemana"

export type Tarifa = {
  id: string
  categoria: string
  grupo: "pessoa" | "veiculo" | "pesado"
  detalhe?: string
  util: number
  fimDeSemana: number
  horaMarcada?: { util: number; fimDeSemana: number }
}
