import type { Metadata } from "next"
import Link from "next/link"
import { AlertCircle, ArrowRight, CheckCircle2, FileText, MapPin, Wallet } from "lucide-react"

import { PageIntro } from "@/components/site/page-intro"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cartoes } from "@/data/cartoes"
import Image from "next/image"
import imgRecarregavel from "@/assets/img/cartao-recarregavel.webp"
import imgSocial from "@/assets/img/cartao-tarifa-social.webp"
import imgEstudante from "@/assets/img/cartao-estudante.webp"
import icCartao from "@/assets/img/ic-cartao.webp"
import banner from "@/assets/img/banner-horarios.webp"

const imagens = { "ferry-card": imgRecarregavel, "tarifa-social": imgSocial, estudante: imgEstudante } as const

export const metadata: Metadata = {
  title: "Cartões",
  description: "Ferry Card recarregável, Tarifa Social e Cartão Estudante: quem pode pedir, quanto custa e como solicitar.",
}

function Bloco({ titulo, icone: Icone, children }: { titulo: string; icone: typeof Wallet; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border bg-card p-5">
      <h3 className="flex items-center gap-2 text-xl font-bold text-ink">
        <Icone className="size-5 text-primary" aria-hidden="true" />
        {titulo}
      </h3>
      <div className="mt-3 text-base text-ink">{children}</div>
    </section>
  )
}

export default function CartoesPage() {
  return (
    <>
      <PageIntro
        atual="Cartões"
        banner={banner}
        titulo="Cartões do ferry"
        descricao="Compare os três cartões e veja, em passos simples, como pedir o seu."
      />

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <Tabs defaultValue={cartoes[0].id}>
          <TabsList className="grid w-full grid-cols-1 gap-1 rounded-xl p-1 group-data-horizontal/tabs:h-auto sm:grid-cols-3">
            {cartoes.map((c) => (
              <TabsTrigger
                key={c.id}
                value={c.id}
                id={`aba-cartao-${c.id}`}
                aria-controls={`painel-cartao-${c.id}`}
                className="min-h-12 gap-2 rounded-lg px-4 text-base font-semibold whitespace-normal"
              >
                <Image src={icCartao} alt="" className="h-5 w-auto" />
                {c.nome}
              </TabsTrigger>
            ))}
          </TabsList>

          {cartoes.map((c) => (
            <TabsContent
              key={c.id}
              value={c.id}
              id={`painel-cartao-${c.id}`}
              aria-labelledby={`aba-cartao-${c.id}`}
              className="mt-6"
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <Image
                  src={imagens[c.id as keyof typeof imagens]}
                  alt={`Cartão ${c.nome}`}
                  className="h-auto w-44 shrink-0 sm:w-52"
                  sizes="208px"
                />
                <div>
                  <h2 className="text-3xl font-bold text-ink">{c.nome}</h2>
                  <p className="mt-2 max-w-3xl text-xl text-ink">{c.resumo}</p>
                </div>
              </div>

              <div className="mt-6 grid gap-5 lg:grid-cols-2">
                <Bloco titulo="Quem pode pedir" icone={CheckCircle2}>
                  <ul className="list-disc space-y-1.5 pl-5">
                    {c.paraQuem.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </Bloco>
                <Bloco titulo="Quanto custa" icone={Wallet}>
                  <p>{c.custo}</p>
                </Bloco>
                <Bloco titulo="Como pedir, passo a passo" icone={ArrowRight}>
                  <ol className="space-y-3">
                    {c.passos.map((x, i) => (
                      <li key={x} className="flex gap-3">
                        <span
                          className="grid size-7 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground"
                          aria-hidden="true"
                        >
                          {i + 1}
                        </span>
                        <span>{x}</span>
                      </li>
                    ))}
                  </ol>
                </Bloco>
                <div className="grid gap-5">
                  <Bloco titulo="Documentos" icone={FileText}>
                    <ul className="list-disc space-y-1.5 pl-5">
                      {c.documentos.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  </Bloco>
                  <Bloco titulo="Onde e quando" icone={MapPin}>
                    <ul className="space-y-1.5">
                      {c.ondeQuando.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  </Bloco>
                </div>
              </div>

              <section className="mt-5 rounded-2xl border-2 border-warn bg-warn-bg p-5">
                <h3 className="flex items-center gap-2 text-lg font-bold text-ink">
                  <AlertCircle className="size-5 text-warn" aria-hidden="true" />
                  Fique atento
                </h3>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-ink [overflow-wrap:anywhere]">
                  {c.atencao.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
                {c.baseLegal && <p className="mt-3 text-sm text-ink">Base legal: {c.baseLegal}.</p>}
              </section>
            </TabsContent>
          ))}
        </Tabs>

        <p className="mt-10">
          <Link href="/duvidas?categoria=ferry-card" className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-primary underline">
            Mais dúvidas sobre cartões
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </p>
      </div>
    </>
  )
}
