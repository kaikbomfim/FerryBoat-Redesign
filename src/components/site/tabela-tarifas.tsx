"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { brl, tarifas } from "@/data/ferry"
import type { TipoDia } from "@/data/types"
import { useInfoDia } from "@/lib/hooks"

const grupos = [
  { id: "pessoa", titulo: "Pessoas" },
  { id: "veiculo", titulo: "Veículos leves" },
  { id: "pesado", titulo: "Veículos pesados" },
] as const

const abas: { id: TipoDia; rotulo: string; legenda: string }[] = [
  { id: "util", rotulo: "Segunda a sexta", legenda: "Tarifas de segunda a sexta-feira (exceto feriados)" },
  { id: "fimDeSemana", rotulo: "Sábado, domingo e feriados", legenda: "Tarifas de sábado, domingo e feriados" },
]

export function TabelaTarifas() {
  const hoje = useInfoDia()?.tipoTarifa ?? null
  const [escolhido, setTipo] = useState<TipoDia | null>(null)
  const tipo: TipoDia = escolhido ?? hoje ?? "util"

  return (
    <Tabs value={tipo} onValueChange={(v) => setTipo(v as TipoDia)}>
      <TabsList className="grid w-full grid-cols-1 gap-1 rounded-xl p-1 group-data-horizontal/tabs:h-auto sm:inline-grid sm:w-fit sm:grid-cols-2">
        {abas.map((a) => (
          <TabsTrigger key={a.id} value={a.id} id={`aba-tarifas-${a.id}`} aria-controls={`painel-tarifas-${a.id}`} className="min-h-11 rounded-lg px-4 text-[0.95rem] font-semibold whitespace-normal">
            {a.rotulo}
            {hoje === a.id && (
              <span className="ml-1 rounded-full bg-brand px-2 py-0.5 text-xs font-bold text-brand-foreground">hoje</span>
            )}
          </TabsTrigger>
        ))}
      </TabsList>

      {abas.map((a) => (
        <TabsContent key={a.id} value={a.id} id={`painel-tarifas-${a.id}`} aria-labelledby={`aba-tarifas-${a.id}`} className="mt-4">
          <div className="overflow-hidden rounded-2xl border bg-card">
            <Table className="text-base">
              <TableCaption className="sr-only">{a.legenda}</TableCaption>
              <TableHeader>
                <TableRow className="bg-muted hover:bg-muted">
                  <TableHead scope="col" className="h-12 px-4 text-sm font-bold text-ink">
                    Categoria
                  </TableHead>
                  <TableHead scope="col" className="h-12 px-4 text-right text-sm font-bold text-ink">
                    Preço por travessia
                  </TableHead>
                </TableRow>
              </TableHeader>
              {grupos.map((g) => (
                <TableBody key={g.id}>
                  <TableRow className="bg-secondary hover:bg-secondary">
                    <TableHead scope="colgroup" colSpan={2} className="h-10 px-4 text-sm font-bold text-primary">
                      {g.titulo}
                    </TableHead>
                  </TableRow>
                  {tarifas
                    .filter((t) => t.grupo === g.id)
                    .map((t) => (
                      <TableRow key={t.id}>
                        <TableHead scope="row" className="h-auto px-4 py-3 font-normal whitespace-normal text-ink">
                          <span className="font-semibold">{t.categoria}</span>
                          {t.detalhe && <span className="block text-sm text-muted-foreground">{t.detalhe}</span>}
                        </TableHead>
                        <TableCell className="px-4 py-3 text-right font-bold whitespace-nowrap text-ink tabular-nums">
                          {brl(t[a.id])}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              ))}
            </Table>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}
