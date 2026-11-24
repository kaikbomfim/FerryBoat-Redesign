import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, ExternalLink } from "lucide-react"

import { Calculadora } from "@/components/site/calculadora"
import { PageIntro, Secao } from "@/components/site/page-intro"
import { TabelaTarifas } from "@/components/site/tabela-tarifas"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { brl, estacionamento, links, resolucaoTarifas, tarifas } from "@/data/ferry"
import Image from "next/image"
import banner from "@/assets/img/banner-tarifas.webp"
import bannerFerryCard from "@/assets/img/banner-ferry-card.webp"
import bannerHoraMarcada from "@/assets/img/banner-hora-marcada.webp"
import icCarro from "@/assets/img/ic-carro.webp"
import icMoto from "@/assets/img/ic-moto.webp"
import icHoraMarcada from "@/assets/img/ic-hora-marcada.webp"

export const metadata: Metadata = {
  title: "Tarifas",
  description: "Quanto custa atravessar no ferry-boat: pedestres, carros, motos, Hora Marcada e estacionamento.",
}

export default function TarifasPage() {
  const comHM = tarifas.filter((t) => t.horaMarcada)
  return (
    <>
      <PageIntro
        atual="Tarifas"
        banner={banner}
        titulo="Quanto custa a travessia"
        descricao={
          <>
            O preço muda entre dias úteis e fins de semana/feriados. Valores da {resolucaoTarifas.nome},{" "}
            {resolucaoTarifas.vigencia}.
          </>
        }
      />

      <div className="mx-auto max-w-6xl space-y-14 px-4 py-10 sm:px-6">
        <Secao id="calculadora" titulo="Calcule o valor da sua travessia">
          <Calculadora />
        </Secao>

        <Secao
          id="tabela"
          titulo="Tabela de tarifas"
          descricao="Preço de uma travessia (só ida). Sábado conta como fim de semana."
        >
          <TabelaTarifas />
        </Secao>

        <Secao
          id="hora-marcada"
          titulo="Hora Marcada: 30% de taxa de serviço"
          descricao="Passagem comprada pela internet para um horário fixo, com fila exclusiva. Inclui taxa de serviço de 30%, que não é reembolsada em caso de cancelamento."
        >
          <div className="overflow-hidden rounded-2xl border bg-card">
            <Table className="text-base">
              <TableCaption className="sr-only">Tarifas da Hora Marcada por tipo de dia</TableCaption>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead scope="col" className="h-12 bg-muted px-4 text-sm font-bold text-ink">
                    Categoria
                  </TableHead>
                  <TableHead scope="col" className="font-marca h-auto bg-brand px-3 py-3 text-right text-base font-bold whitespace-normal text-ink italic sm:px-4">
                    Segunda a sexta
                  </TableHead>
                  <TableHead scope="col" className="font-marca h-auto bg-ink px-3 py-3 text-right text-base font-bold whitespace-normal text-white italic sm:px-4">
                    Fim de semana e feriados
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comHM.map((t) => (
                  <TableRow key={t.id}>
                    <TableHead scope="row" className="h-auto px-3 py-3 font-semibold whitespace-normal text-ink sm:px-4">
                      {t.categoria}
                    </TableHead>
                    <TableCell className="px-3 py-3 text-right font-bold text-ink tabular-nums sm:px-4">{brl(t.horaMarcada!.util)}</TableCell>
                    <TableCell className="px-3 py-3 text-right font-bold text-ink tabular-nums sm:px-4">
                      {brl(t.horaMarcada!.fimDeSemana)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={links.horaMarcada}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-4 font-semibold text-primary-foreground no-underline hover:bg-primary/90"
            >
              Comprar Hora Marcada
              <ExternalLink className="size-4" aria-hidden="true" />
              <span className="sr-only">(abre o portal de vendas em nova aba)</span>
            </a>
            <Link
              href="/duvidas?categoria=hora-marcada"
              className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-primary underline"
            >
              Regras de remarcação e reembolso
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </Secao>

        <ul className="grid gap-5 md:grid-cols-2" aria-label="Serviços">
          <li>
            <Link href="/cartoes" className="block overflow-hidden rounded-2xl no-underline shadow-sm hover:shadow-md">
              <Image src={bannerFerryCard} alt="Faça o seu Ferry Card: praticidade no embarque" className="h-auto w-full" sizes="(min-width: 768px) 50vw, 100vw" />
            </Link>
          </li>
          <li>
            <a href={links.horaMarcada} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-2xl no-underline shadow-sm hover:shadow-md">
              <Image src={bannerHoraMarcada} alt="Hora Marcada: garanta sua passagem (abre o portal de vendas em nova aba)" className="h-auto w-full" sizes="(min-width: 768px) 50vw, 100vw" />
            </a>
          </li>
        </ul>

      </div>

      {/* Faixa azul do estacionamento, como no site original, com os ícones de carro e moto */}
      <section aria-labelledby="estacionamento-titulo" className="bg-ink text-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <h2 id="estacionamento-titulo" className="border-l-[6px] border-brand pl-3 text-3xl font-bold">
            Estacionamento
          </h2>
          <p className="mt-2 text-white/85">{estacionamento.local}</p>
          <div className="mt-6 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
            <div className="space-y-5">
              {([
                ["Veículos", "carro", icCarro],
                ["Motos", "moto", icMoto],
              ] as const).map(([titulo, chave, icone]) => (
                <table key={chave} className="w-full border-separate border-spacing-y-1 text-base">
                  <caption className="sr-only">Preços do estacionamento para {titulo.toLowerCase()}</caption>
                  <thead>
                    <tr>
                      <th scope="col" className="rounded-l-lg bg-brand px-4 py-2.5 text-left text-ink">
                        <span className="font-marca flex items-center gap-3 text-xl font-bold italic">
                          <span className="grid size-9 place-items-center rounded-full bg-ink">
                            <Image src={icone} alt="" className="h-5 w-auto" />
                          </span>
                          {titulo}
                        </span>
                      </th>
                      <th scope="col" className="rounded-r-lg bg-brand px-4 py-2.5 text-right text-sm font-bold text-ink">
                        Preço
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {estacionamento.linhas.map((l) => (
                      <tr key={l.faixa}>
                        <th scope="row" className="rounded-l-lg bg-white/95 px-4 py-2.5 text-left font-semibold text-ink">
                          {l.faixa}
                        </th>
                        <td className="rounded-r-lg bg-[#d9e2ea] px-4 py-2.5 text-right font-bold text-ink tabular-nums">
                          {brl(chave === "carro" ? l.carro : l.moto)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ))}
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="font-marca text-2xl font-bold italic">Formas de pagamento</h3>
                <p className="font-marca mt-1 text-xl font-bold text-brand italic">Cartão de débito ou crédito</p>
                <p className="mt-2 text-white/90">Para pagar em dinheiro, retire o ticket e vá ao posto do pedágio. Depois do pagamento, retire seu veículo.</p>
              </div>
              <div className="border-t border-white/25 pt-6">
                <h3 className="font-marca flex items-center gap-2 text-2xl font-bold text-brand italic">
                  <span className="grid size-9 place-items-center rounded-full bg-white">
                    <Image src={icHoraMarcada} alt="" className="size-7" />
                  </span>
                  Horário de atendimento
                </h3>
                <p className="mt-2 text-white/90">{estacionamento.funcionamento}.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
