import type { Metadata } from "next"
import { CheckCircle2 } from "lucide-react"

import { PageIntro, Secao } from "@/components/site/page-intro"
import { contatos } from "@/data/ferry"

export const metadata: Metadata = {
  title: "Acessibilidade",
  description: "Recursos de acessibilidade deste site e como relatar problemas.",
}

const recursos = [
  "Atalho \"Pular para o conteúdo\" como primeiro item da página (tecla Tab).",
  "Todos os botões, links, abas e perguntas funcionam pelo teclado, com foco sempre visível.",
  "Zoom do navegador liberado até 400%, sem perder conteúdo nem criar rolagem lateral.",
  "Contraste de texto de pelo menos 4,5:1 (a maior parte acima de 7:1).",
  "Situação da fila informada por texto, ícone e cor, nunca só pela cor.",
  "Estrutura com regiões (cabeçalho, navegação, conteúdo, rodapé) e títulos em ordem, para leitores de tela.",
  "Textos na fonte Atkinson Hyperlegible, criada para leitura por pessoas com baixa visão. Títulos na fonte condensada da marca, sem itálico nos parágrafos.",
  "Animações reduzidas quando o sistema pede menos movimento.",
  "Tradução para Libras com o VLibras em todas as páginas (ferramenta gratuita do Governo Federal).",
]

export default function AcessibilidadePage() {
  return (
    <>
      <PageIntro
        atual="Acessibilidade"
        titulo="Acessibilidade"
        descricao="Este site busca seguir as diretrizes WCAG 2.2, nível AA, e o eMAG (Modelo de Acessibilidade em Governo Eletrônico)."
      />
      <div className="mx-auto max-w-4xl space-y-12 px-4 py-10 sm:px-6">
        <Secao id="recursos" titulo="Recursos disponíveis">
          <ul className="space-y-3">
            {recursos.map((r) => (
              <li key={r} className="flex gap-3 text-ink">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-ok" aria-hidden="true" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </Secao>

        <Secao id="libras" titulo="Libras">
          <p className="text-ink">
            Todas as páginas têm o <strong>VLibras</strong>, ferramenta gratuita do Governo Federal que traduz o conteúdo
            para a Língua Brasileira de Sinais. Use o botão azul com o símbolo de mãos, no canto direito da tela, ou
            selecione um trecho de texto para o avatar traduzir.
          </p>
        </Secao>

        <Secao id="testes" titulo="Como testamos">
          <p className="text-ink">
            Testes automáticos com Google Lighthouse, axe-core e o validador do W3C. Testes manuais com navegação só pelo
            teclado, zoom de 200% e 400% (tela de 320 px) e roteiro de teste com o leitor de tela NVDA.
          </p>
        </Secao>

        <Secao id="problema" titulo="Encontrou alguma barreira?">
          <p className="text-ink">
            Conte para a gente pelo e-mail{" "}
            <a href={contatos.demandas.href} className="font-semibold break-all text-primary underline">
              {contatos.demandas.valor}
            </a>{" "}
            ou pelo telefone{" "}
            <a href={contatos.sac.href} className="font-semibold text-primary underline">
              {contatos.sac.valor}
            </a>
            .
          </p>
        </Secao>
      </div>
    </>
  )
}
