"use client"

import Link from "next/link"
import { ArrowRight, Clock } from "lucide-react"

import { faltam, formatarHora, proximasSaidas } from "@/lib/tempo"
import { useInfoDia } from "@/lib/hooks"
import { horarios } from "@/data/ferry"

export function ProximasSaidas() {
  const info = useInfoDia()

  const saidas = info ? proximasSaidas(info, 3) : []
  const grade = info?.grade === "domEFeriados" ? "Domingos e feriados" : "Segunda a sábado"

  return (
    <section
      aria-labelledby="proxima-titulo"
      className="rounded-2xl border bg-card p-5 text-card-foreground shadow-sm sm:p-6"
    >
      <div className="flex items-center gap-2 text-primary">
        <Clock className="size-5" aria-hidden="true" />
        <h2 id="proxima-titulo" className="text-base font-bold">
          Próxima saída
        </h2>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">De São Joaquim (Salvador) e de Bom Despacho (Itaparica), ao mesmo tempo.</p>

      <div aria-live="polite" className="mt-4">
        {!info ? (
          <p className="text-muted-foreground">Calculando com o horário de Salvador…</p>
        ) : saidas.length === 0 ? (
          <div>
            <p className="text-2xl font-extrabold text-ink">Sem mais saídas hoje</p>
            <p className="mt-1 text-muted-foreground">
              Amanhã a primeira saída é às{" "}
              <strong className="text-ink">
                {formatarHora(info.diaSemana === 6 ? horarios.domEFeriados[0] : horarios.segASab[0])}
              </strong>
              {info.diaSemana === 6 ? " (domingo)" : ""}.
            </p>
          </div>
        ) : (
          <>
            <p className="flex flex-wrap items-baseline gap-x-3">
              <span className="text-5xl font-extrabold tracking-tight text-ink">{formatarHora(saidas[0])}</span>
              <span className="rounded-full bg-brand px-3 py-1 text-sm font-bold text-brand-foreground">
                {faltam(info, saidas[0])}
              </span>
            </p>
            {saidas.length > 1 && (
              <p className="mt-3 text-muted-foreground">
                Depois:{" "}
                {saidas.slice(1).map((s, i) => (
                  <span key={s}>
                    <strong className="text-ink">{formatarHora(s)}</strong>
                    {i < saidas.length - 2 ? " e " : ""}
                  </span>
                ))}
              </p>
            )}
          </>
        )}
      </div>

      {info && (
        <p className="mt-4 rounded-lg bg-muted px-3 py-2 text-sm text-ink">
          Hoje é <strong>{info.nomeDia}</strong>
          {info.feriado ? <> (feriado: {info.feriado})</> : null}: vale a grade de <strong>{grade}</strong>.
        </p>
      )}

      <Link
        href="/horarios"
        className="mt-4 inline-flex min-h-11 items-center gap-1.5 font-semibold text-primary underline"
      >
        Ver todos os horários
        <ArrowRight className="size-4" aria-hidden="true" />
      </Link>
    </section>
  )
}
