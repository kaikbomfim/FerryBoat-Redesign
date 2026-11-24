"use client"

import Image from "next/image"
import { useState } from "react"
import icRelogio from "@/assets/img/ic-hora-marcada.webp"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { horarios } from "@/data/ferry"
import { formatarHora, paraMinutos } from "@/lib/tempo"
import { useInfoDia } from "@/lib/hooks"
import { cn } from "@/lib/utils"

type Grade = "segASab" | "domEFeriados"

const rotulos: Record<Grade, { aba: string; titulo: string }> = {
  segASab: { aba: "Segunda a sábado", titulo: `Segunda a sábado, ${horarios.funcionamento.segASab}` },
  domEFeriados: { aba: "Domingos e feriados", titulo: `Domingos e feriados, ${horarios.funcionamento.domEFeriados}` },
}

export function GradeHorarios() {
  const info = useInfoDia()
  const [escolhida, setGrade] = useState<Grade | null>(null)
  // Por padrão mostra a grade que vale hoje; o usuário pode trocar.
  const grade: Grade = escolhida ?? info?.grade ?? "segASab"

  return (
    <Tabs value={grade} onValueChange={(v) => setGrade(v as Grade)}>
      <TabsList className="grid w-full grid-cols-1 gap-1 rounded-xl p-1 group-data-horizontal/tabs:h-auto sm:inline-grid sm:w-fit sm:grid-cols-2">
        {(Object.keys(rotulos) as Grade[]).map((g) => (
          <TabsTrigger key={g} value={g} id={`aba-horarios-${g}`} aria-controls={`painel-horarios-${g}`} className="min-h-12 gap-2 rounded-lg px-4 text-[0.95rem] font-semibold whitespace-normal">
            <Image src={icRelogio} alt="" className="size-7" />
            {rotulos[g].aba}
            {info?.grade === g && (
              <span className="ml-1 rounded-full bg-brand px-2 py-0.5 text-xs font-bold text-brand-foreground">hoje</span>
            )}
          </TabsTrigger>
        ))}
      </TabsList>

      {(Object.keys(rotulos) as Grade[]).map((g) => {
        const lista = horarios[g]
        const ehHoje = info?.grade === g
        const proxima = ehHoje ? lista.find((h) => paraMinutos(h) >= info!.minutosAgora) : undefined
        return (
          <TabsContent key={g} value={g} id={`painel-horarios-${g}`} aria-labelledby={`aba-horarios-${g}`} className="mt-4">
            <h3 className="text-lg font-bold text-ink">{rotulos[g].titulo}</h3>
            <p className="mt-1 text-muted-foreground">
              {lista.length} saídas por dia em cada terminal.
              {ehHoje && proxima && (
                <>
                  {" "}
                  A próxima é às <strong className="text-ink">{formatarHora(proxima)}</strong>.
                </>
              )}
            </p>
            <ol className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-7">
              {lista.map((h) => {
                const passou = ehHoje && paraMinutos(h) < info!.minutosAgora
                const ehProxima = h === proxima
                return (
                  <li
                    key={h}
                    className={cn(
                      "flex min-h-14 flex-col items-center justify-center rounded-xl border bg-card px-2 py-2 text-center",
                      passou && "border-dashed bg-muted",
                      ehProxima && "border-2 border-primary bg-secondary"
                    )}
                  >
                    <span className={cn("text-xl font-bold text-ink", passou && "text-muted-foreground")}>
                      <time>{h}</time>
                    </span>
                    {ehProxima && <span className="text-xs font-bold text-primary">próxima</span>}
                    {passou && <span className="text-xs font-semibold text-muted-foreground">já saiu</span>}
                  </li>
                )
              })}
            </ol>
          </TabsContent>
        )
      })}
    </Tabs>
  )
}
