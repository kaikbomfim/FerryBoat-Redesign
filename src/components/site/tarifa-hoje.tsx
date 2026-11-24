"use client"

import { brl, tarifas } from "@/data/ferry"
import { useInfoDia } from "@/lib/hooks"

/** Mostra o preço do dia para uma categoria, escolhendo automaticamente dia útil ou fim de semana. */
export function TarifaHoje({ id }: { id: string }) {
  const tipo = useInfoDia()?.tipoTarifa ?? null
  const t = tarifas.find((x) => x.id === id)
  if (!t) return null
  if (!tipo) {
    return (
      <>
        <span className="block text-2xl font-extrabold tabular-nums">{brl(t.util)}</span>
        <span className="block text-sm text-muted-foreground">segunda a sexta</span>
      </>
    )
  }
  return (
    <>
      <span className="block text-2xl font-extrabold tabular-nums">{brl(t[tipo])}</span>
      <span className="block text-sm text-muted-foreground">
        {tipo === "util" ? "hoje (dia útil)" : "hoje (fim de semana/feriado)"}
      </span>
    </>
  )
}
