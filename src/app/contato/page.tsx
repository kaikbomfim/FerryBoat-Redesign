import type { Metadata } from "next"
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react"

import { PageIntro, Secao } from "@/components/site/page-intro"
import { contatos, terminais } from "@/data/ferry"
import Image from "next/image"
import atendente from "@/assets/img/atendente-contato.webp"

export const metadata: Metadata = {
  title: "Contato",
  description: "Telefone, WhatsApp e e-mails do Sistema Ferry-Boat, organizados por tipo de pedido.",
}

// Canais organizados pela necessidade do usuário, não pelo organograma da empresa
const porNecessidade = [
  { preciso: "Tirar uma dúvida rápida", canal: contatos.sac, icone: Phone },
  { preciso: "Falar por mensagem", canal: contatos.whatsapp, icone: MessageCircle },
  { preciso: "Cancelar ou pedir reembolso da Hora Marcada", canal: contatos.reembolso, icone: Mail },
  { preciso: "Bloquear cartão, pedir nota fiscal ou outras solicitações", canal: contatos.demandas, icone: Mail },
  { preciso: "Reclamar de um atendimento que não resolveu", canal: contatos.ouvidoria, icone: Mail },
]

export default function ContatoPage() {
  return (
    <>
      <PageIntro
        atual="Contato"
        titulo="Fale com a gente"
        descricao="Escolha o que você precisa e use o canal certo. Assim seu pedido é resolvido mais rápido."
      />
      <div className="mx-auto max-w-6xl space-y-12 px-4 py-10 sm:px-6">
        <Secao id="canais" titulo="O que você precisa?">
          <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
          <Image src={atendente} alt="" className="mx-auto hidden h-auto w-60 self-start lg:block" sizes="240px" />
          <ul className="grid gap-4 md:grid-cols-2">
            {porNecessidade.map(({ preciso, canal, icone: Icone }) => (
              <li key={preciso} className="flex gap-4 rounded-2xl border bg-card p-5">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-secondary text-primary">
                  <Icone className="size-6" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="font-bold text-ink">{preciso}</p>
                  <p className="text-sm text-muted-foreground">{canal.rotulo}</p>
                  <a href={canal.href} className="mt-1 inline-block text-lg font-bold break-all text-primary underline">
                    {canal.valor}
                  </a>
                </div>
              </li>
            ))}
          </ul>
          </div>
        </Secao>

        <Secao id="presencial" titulo="Atendimento presencial">
          <ul className="grid gap-4 md:grid-cols-2">
            <li className="rounded-2xl border bg-card p-5">
              <p className="flex items-center gap-2 text-lg font-bold text-ink">
                <MapPin className="size-5 text-primary" aria-hidden="true" />
                {terminais.salvador.nome}
              </p>
              <p className="mt-1 text-ink">{terminais.salvador.endereco}</p>
              <p className="mt-3 font-semibold text-ink">Setor de Cartões (Ferry Card e Cartão Estudante)</p>
              <p className="text-ink">Segunda a sexta, das 8h30 às 12h e das 13h30 às 17h.</p>
            </li>
            <li className="rounded-2xl border bg-card p-5">
              <p className="flex items-center gap-2 text-lg font-bold text-ink">
                <MapPin className="size-5 text-primary" aria-hidden="true" />
                {terminais.itaparica.nome}
              </p>
              <p className="mt-1 text-ink">{terminais.itaparica.endereco}</p>
              <p className="mt-3 font-semibold text-ink">Tarifa Social (cadastro e atualização)</p>
              <p className="text-ink">Segunda a sexta, das 8h às 18h. Sábado, das 8h às 13h.</p>
            </li>
          </ul>
        </Secao>
      </div>
    </>
  )
}
