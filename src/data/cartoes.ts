// Conteúdo reescrito em linguagem simples a partir das páginas oficiais
// /cartao/cartao-recarregavel, /cartao/cartao-tarifa-social e /cartao/cartao-estudante (24/11/2026).

export type Cartao = {
  id: string
  nome: string
  resumo: string
  paraQuem: string[]
  custo: string
  passos: string[]
  documentos: string[]
  ondeQuando: string[]
  atencao: string[]
  baseLegal?: string
}

export const cartoes: Cartao[] = [
  {
    id: "ferry-card",
    nome: "Ferry Card (recarregável)",
    resumo: "Cartão com créditos para passar direto na catraca, sem enfrentar a fila da bilheteria.",
    paraQuem: ["Qualquer passageiro, pessoa física ou empresa (CNPJ)."],
    custo:
      "R$ 40,00 na primeira carga: R$ 8,00 pagam a confecção e R$ 32,00 ficam como saldo para usar nas travessias.",
    passos: [
      "Faça o cadastro e peça o cartão no portal de vendas, pagando com cartão de crédito.",
      "Aguarde 3 dias úteis após a confirmação do pagamento.",
      "Retire o cartão no Setor de Cartões do Terminal São Joaquim, com documento de identidade.",
      "Recarregue nas bilheterias dos terminais São Joaquim ou Bom Despacho.",
    ],
    documentos: ["Documento oficial com foto, RG e CPF do titular (a retirada é só pelo titular)."],
    ondeQuando: [
      "Setor de Cartões, Terminal São Joaquim (Salvador).",
      "Segunda a sexta, das 8h30 às 12h e das 13h30 às 17h (exceto feriados).",
    ],
    atencao: [
      "Limite de R$ 1.000,00 em créditos por mês para pessoa física.",
      "Até 5 passagens por dia em cada sentido.",
      "O cartão fica inativo após 3 meses sem uso. Para desbloquear, vá ao Setor de Arrecadação em São Joaquim.",
      "Perdeu ou foi roubado? Peça o bloqueio por e-mail (demandas@internacionaltravessias.com.br). A 2ª via custa 1 passagem de pedestre em dia útil.",
      "Créditos não são devolvidos em dinheiro.",
    ],
  },
  {
    id: "tarifa-social",
    nome: "Tarifa Social",
    resumo: "Ida e volta pagando só a ida, para moradores de Itaparica e Vera Cruz atendidos pelo Bolsa Família.",
    paraQuem: [
      "Pedestres que moram em Itaparica ou Vera Cruz.",
      "Beneficiários do Programa Bolsa Família do Governo Federal.",
      "Cadastrados na concessionária como beneficiários da Tarifa Social.",
    ],
    custo: "Paga-se a ida (saindo de Bom Despacho) e a volta no mesmo dia, saindo de São Joaquim, é gratuita.",
    passos: [
      "Leve os documentos ao Setor de Arrecadação do Terminal Bom Despacho.",
      "Faça o cadastro e receba o cartão eletrônico.",
      "Embarque em Bom Despacho nas saídas das 5h ou 6h e volte no mesmo dia sem pagar.",
    ],
    documentos: [
      "Documento de identificação pessoal.",
      "Comprovante de residência (água ou luz) em Itaparica ou Vera Cruz, no seu nome ou no do pai, da mãe ou do cônjuge (com certidão).",
      "Comprovante do benefício do Bolsa Família.",
    ],
    ondeQuando: [
      "Setor de Arrecadação, Terminal Bom Despacho (Itaparica).",
      "Atualização cadastral até 31/12/2026: segunda a sexta, das 8h às 18h, e sábado, das 8h às 13h.",
    ],
    atencao: [
      "Vale uma vez por dia, só no sentido Bom Despacho → São Joaquim com volta no mesmo dia.",
      "Quem não atualizar o cadastro até 31/12/2026 terá o cartão bloqueado.",
    ],
  },
  {
    id: "estudante",
    nome: "Cartão Estudante",
    resumo: "Meia-passagem para estudantes de Itaparica e Vera Cruz que estudam em Salvador ou cidades vizinhas.",
    paraQuem: [
      "Moradores de Itaparica ou Vera Cruz.",
      "Matriculados em curso presencial superior ou técnico, em Salvador ou cidade vizinha, reconhecido pelo MEC (inclui FIES, PROUNI e Educa Mais Brasil).",
    ],
    custo:
      "No primeiro cadastro, paga-se no guichê a taxa do Ferry Card. Depois, cada travessia custa meia-passagem (R$ 3,60 em dia útil).",
    passos: [
      "Vá ao Setor de Cartões do Terminal São Joaquim com os documentos (menores de 18 anos vão com o responsável).",
      "Faça o cadastro e receba o Ferry Card Estudantil.",
      "Use 2 passagens com desconto por dia (1 ida e 1 volta), de segunda a sábado.",
      "Renove o cadastro a cada semestre.",
    ],
    documentos: [
      "Comprovante de matrícula do semestre atual.",
      "Comprovante de residência em Itaparica ou Vera Cruz (água, luz ou declaração da prefeitura).",
      "RG e CPF.",
    ],
    ondeQuando: ["Setor de Cartões, Terminal São Joaquim (Salvador).", "Cadastro em qualquer época do ano."],
    atencao: [
      "Não vale aos domingos e feriados. Passagens além das 2 diárias são cobradas pelo valor cheio.",
      "O benefício é suspenso se você se mudar, trancar ou concluir o curso, ou emprestar o cartão.",
      "Ao fim do semestre o cartão é bloqueado até a renovação.",
    ],
    baseLegal: "Resolução AGERBA nº 05, de 8 de fevereiro de 2024",
  },
]
