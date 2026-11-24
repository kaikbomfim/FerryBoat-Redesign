import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, ExternalLink } from "lucide-react"

import { Calculadora } from "@/components/site/calculadora"
import { PageIntro, Secao } from "@/components/site/page-intro"
import { TabelaTarifas } from "@/components/site/tabela-tarifas"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { brl, estacionamento, links, resolucaoTarifas, tarifas } from "@/data/ferry"
import banner from "@/assets/img/banner-tarifas.webp"

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
        bannerPosicao="center"
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
          titulo="Hora Marcada (carros de passeio)"
          descricao="Passagem comprada pela internet para um horário fixo, com fila exclusiva. Inclui taxa de serviço de 30%, que não é reembolsada em caso de cancelamento."
        >
          <div className="overflow-hidden rounded-2xl border bg-card">
            <Table className="text-base">
              <TableCaption className="sr-only">Tarifas da Hora Marcada por tipo de dia</TableCaption>
              <TableHeader>
                <TableRow className="bg-muted hover:bg-muted">
                  <TableHead scope="col" className="h-12 px-4 text-sm font-bold text-ink">
                    Categoria
                  </TableHead>
                  <TableHead scope="col" className="h-auto px-3 py-3 text-right text-sm font-bold whitespace-normal text-ink sm:px-4">
                    Seg. a sex.
                  </TableHead>
                  <TableHead scope="col" className="h-auto px-3 py-3 text-right text-sm font-bold whitespace-normal text-ink sm:px-4">
                    Sáb., dom. e feriados
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

        <Secao id="estacionamento" titulo="Estacionamento" descricao={`${estacionamento.local}. ${estacionamento.funcionamento}.`}>
          <div className="overflow-hidden rounded-2xl border bg-card">
            <Table className="text-base">
              <TableCaption className="sr-only">Preços do estacionamento para carros e motos</TableCaption>
              <TableHeader>
                <TableRow className="bg-muted hover:bg-muted">
                  <TableHead scope="col" className="h-12 px-4 text-sm font-bold text-ink">
                    Período
                  </TableHead>
                  <TableHead scope="col" className="h-12 px-4 text-right text-sm font-bold text-ink">
                    Carro
                  </TableHead>
                  <TableHead scope="col" className="h-12 px-4 text-right text-sm font-bold text-ink">
                    Moto
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {estacionamento.linhas.map((l) => (
                  <TableRow key={l.faixa}>
                    <TableHead scope="row" className="h-auto px-3 py-3 font-semibold whitespace-normal text-ink sm:px-4">
                      {l.faixa}
                    </TableHead>
                    <TableCell className="px-3 py-3 text-right font-bold text-ink tabular-nums sm:px-4">{brl(l.carro)}</TableCell>
                    <TableCell className="px-3 py-3 text-right font-bold text-ink tabular-nums sm:px-4">{brl(l.moto)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <p className="mt-3 text-muted-foreground">{estacionamento.pagamento}</p>
        </Secao>
      </div>
    </>
  )
}
