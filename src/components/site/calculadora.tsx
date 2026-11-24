"use client"

import { useId, useMemo, useState } from "react"
import { Calculator, Info } from "lucide-react"

import { brl, tarifas } from "@/data/ferry"
import type { TipoDia } from "@/data/types"
import { useInfoDia } from "@/lib/hooks"

const opcoes = [
  { id: "pedestre", rotulo: "A pé (pedestre)" },
  ...tarifas.filter((t) => t.grupo !== "pessoa").map((t) => ({ id: t.id, rotulo: t.categoria })),
]

const campo =
  "mt-1.5 block h-12 w-full rounded-xl border-2 border-input bg-background px-3 text-base text-ink focus-visible:border-ring"

export function Calculadora() {
  const uid = useId()
  const hoje = useInfoDia()?.tipoTarifa
  const [escolhido, setTipo] = useState<TipoDia | null>(null)
  const tipo: TipoDia = escolhido ?? hoje ?? "util"
  const [modo, setModo] = useState("pedestre")
  const [pessoas, setPessoas] = useState(1)
  const [horaMarcada, setHoraMarcada] = useState(false)


  const veiculo = tarifas.find((t) => t.id === modo)
  const aPe = modo === "pedestre"
  const podeHoraMarcada = !!veiculo?.horaMarcada
  const usaHM = horaMarcada && podeHoraMarcada

  const resultado = useMemo(() => {
    const pedestre = tarifas.find((t) => t.id === "pedestre")!
    const passageiro = tarifas.find((t) => t.id === "passageiro")!
    if (aPe) {
      return { linhas: [{ rotulo: `${pessoas} × pedestre`, valor: pessoas * pedestre[tipo] }] }
    }
    const v = usaHM ? veiculo!.horaMarcada![tipo] : veiculo![tipo]
    const extras = Math.max(0, pessoas - 1)
    const pp = usaHM ? passageiro.horaMarcada![tipo] : passageiro[tipo]
    const linhas = [{ rotulo: `${veiculo!.categoria} com motorista${usaHM ? " (Hora Marcada)" : ""}`, valor: v }]
    if (extras > 0) linhas.push({ rotulo: `${extras} × passageiro${usaHM ? " (Hora Marcada)" : ""}`, valor: extras * pp })
    return { linhas }
  }, [aPe, pessoas, tipo, usaHM, veiculo])

  const total = resultado.linhas.reduce((s, l) => s + l.valor, 0)

  return (
    <div className="grid gap-6 rounded-2xl border bg-card p-5 sm:p-6 lg:grid-cols-[1fr_1fr]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-describedby={`${uid}-dica`}>
        <p id={`${uid}-dica`} className="text-muted-foreground">
          Responda três perguntas e veja o valor de uma travessia (só ida).
        </p>

        <div>
          <label htmlFor={`${uid}-modo`} className="font-semibold text-ink">
            1. Como você vai atravessar?
          </label>
          <select id={`${uid}-modo`} className={campo} value={modo} onChange={(e) => setModo(e.target.value)}>
            {opcoes.map((o) => (
              <option key={o.id} value={o.id}>
                {o.rotulo}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor={`${uid}-pessoas`} className="font-semibold text-ink">
            2. Quantas pessoas vão {aPe ? "atravessar" : "no veículo, contando o motorista"}?
          </label>
          <input
            id={`${uid}-pessoas`}
            type="number"
            inputMode="numeric"
            min={1}
            max={60}
            className={campo}
            value={pessoas}
            onChange={(e) => setPessoas(Math.min(60, Math.max(1, Number(e.target.value) || 1)))}
          />
        </div>

        <fieldset>
          <legend className="font-semibold text-ink">3. Em que dia?</legend>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {(
              [
                ["util", "Segunda a sexta"],
                ["fimDeSemana", "Sábado, domingo ou feriado"],
              ] as const
            ).map(([v, r]) => (
              <label
                key={v}
                className="flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border-2 px-3 has-checked:border-primary has-checked:bg-secondary"
              >
                <input
                  type="radio"
                  name={`${uid}-dia`}
                  value={v}
                  checked={tipo === v}
                  onChange={() => setTipo(v)}
                  className="size-5 accent-primary"
                />
                <span className="font-semibold text-ink">{r}</span>
              </label>
            ))}
          </div>
        </fieldset>

        {!aPe && (
          <div>
            <label className="flex min-h-12 items-start gap-3">
              <input
                type="checkbox"
                className="mt-1 size-5 accent-primary disabled:opacity-60"
                checked={usaHM}
                disabled={!podeHoraMarcada}
                onChange={(e) => setHoraMarcada(e.target.checked)}
                aria-describedby={`${uid}-hm`}
              />
              <span className="font-semibold text-ink">Comprar com Hora Marcada (+30% de taxa de serviço)</span>
            </label>
            <p id={`${uid}-hm`} className="mt-1 flex gap-2 text-sm text-muted-foreground">
              <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              {podeHoraMarcada
                ? "Disponível para carros de passeio e reboque. A compra é só pelo site."
                : "Indisponível para este veículo: a Hora Marcada vale só para carros de passeio e reboque."}
            </p>
          </div>
        )}
      </form>

      <div className="flex flex-col rounded-2xl bg-primary p-5 text-primary-foreground sm:p-6">
        <div className="flex items-center gap-2">
          <Calculator className="size-5" aria-hidden="true" />
          <h3 className="text-lg font-bold">Valor estimado</h3>
        </div>
        <div aria-live="polite" aria-atomic="true">
          <p className="mt-4 text-5xl font-extrabold tracking-tight tabular-nums">{brl(total)}</p>
          <p className="mt-1 text-white/85">
            por travessia, {tipo === "util" ? "de segunda a sexta" : "no fim de semana ou feriado"}
          </p>
          <ul className="mt-5 space-y-2 border-t border-white/25 pt-4">
            {resultado.linhas.map((l) => (
              <li key={l.rotulo} className="flex justify-between gap-4">
                <span>{l.rotulo}</span>
                <span className="font-bold tabular-nums">{brl(l.valor)}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-auto pt-5 text-sm text-white/85">
          Idosos a partir de 65 anos e crianças até 5 anos têm gratuidade. Os valores seguem a tabela oficial vigente.
        </p>
      </div>
    </div>
  )
}
