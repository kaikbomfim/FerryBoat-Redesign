"use client"

import { useId, useMemo, useState } from "react"
import { useBuscaUrl } from "@/lib/hooks"
import Link from "next/link"
import Image from "next/image"
import { Search, X } from "lucide-react"
import icDuvida from "@/assets/img/ic-duvida.webp"
import icAbrir from "@/assets/img/ic-abrir.webp"
import icFechar from "@/assets/img/ic-fechar.webp"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { faqs } from "@/data/faq"
import type { FaqCategoria } from "@/data/types"
import { cn } from "@/lib/utils"

export const categorias: { id: FaqCategoria | "todas"; rotulo: string }[] = [
  { id: "todas", rotulo: "Todas" },
  { id: "geral", rotulo: "Viagem e horários" },
  { id: "hora-marcada", rotulo: "Hora Marcada" },
  { id: "ferry-card", rotulo: "Ferry Card" },
  { id: "prioridade", rotulo: "Prioridade e gratuidade" },
  { id: "sac-digital", rotulo: "SAC Digital" },
  { id: "tarifa-social", rotulo: "Tarifa Social" },
]

// Termos que a pessoa digita x palavras usadas no texto oficial
const sinonimos: Record<string, string[]> = {
  pesados: ["pesados", "caminh"],
  animais: ["animais", "cachorro", "gato", "pet", "cães"],
  horario: ["horário", "horarios", "hora em hora"],
  reembolso: ["reembolso", "cancel", "devolu"],
}

const normalizar = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")

export function FaqExplorer({
  queryInicial = "",
  categoriaInicial = "todas",
}: {
  queryInicial?: string
  categoriaInicial?: string
}) {
  const uid = useId()
  const params = new URLSearchParams(useBuscaUrl())
  const catUrl = params.get("categoria") ?? categoriaInicial
  const [digitado, setQ] = useState<string | null>(null)
  const [escolhida, setCat] = useState<string | null>(null)
  // Links diretos como /duvidas?q=reembolso ou /duvidas?categoria=hora-marcada
  const q = digitado ?? params.get("q") ?? queryInicial
  const cat = escolhida ?? (categorias.some((c) => c.id === catUrl) ? catUrl : "todas")

  const resultados = useMemo(() => {
    const termo = normalizar(q.trim())
    const extras = Object.entries(sinonimos).find(([k]) => normalizar(k) === termo)?.[1].map(normalizar) ?? []
    const ordem = (c: string) => categorias.findIndex((x) => x.id === c)
    return faqs
      .filter((f) => {
        if (cat !== "todas" && f.categoria !== cat) return false
        if (!termo) return true
        const texto = normalizar(f.pergunta + " " + f.resposta.join(" "))
        return texto.includes(termo) || extras.some((e) => texto.includes(e))
      })
      .sort((a, b) => ordem(a.categoria) - ordem(b.categoria))
  }, [q, cat])

  const abertosIniciais = q.trim() && resultados.length <= 3 ? resultados.map((r) => r.id) : []

  return (
    <div>
      <div role="search" className="rounded-2xl border bg-card p-5 sm:p-6">
        <label htmlFor={`${uid}-busca`} className="text-lg font-bold text-ink">
          Busque sua dúvida
        </label>
        <div className="relative mt-2">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-5 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <input
            id={`${uid}-busca`}
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Ex.: reembolso, cachorro, idoso, horário"
            className="h-12 w-full rounded-xl border-2 border-input bg-background pr-12 pl-11 text-base text-ink placeholder:text-muted-foreground focus-visible:border-ring"
            aria-describedby={`${uid}-total`}
          />
          {q && (
            <button
              type="button"
              onClick={() => setQ("")}
              className="absolute top-1/2 right-2 grid size-9 -translate-y-1/2 place-items-center rounded-lg hover:bg-muted"
            >
              <X className="size-5" aria-hidden="true" />
              <span className="sr-only">Limpar busca</span>
            </button>
          )}
        </div>

        <fieldset className="mt-5">
          <legend className="font-semibold text-ink">Filtrar por assunto</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {categorias.map((c) => (
              <button
                key={c.id}
                type="button"
                aria-pressed={cat === c.id}
                onClick={() => setCat(c.id)}
                className={cn(
                  "min-h-11 rounded-full border-2 px-4 text-[0.95rem] font-semibold text-ink",
                  cat === c.id ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background hover:border-primary"
                )}
              >
                {c.rotulo}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <h2 className="mt-8 text-xl font-bold text-ink">Perguntas e respostas</h2>
      <p id={`${uid}-total`} aria-live="polite" className="mt-1 font-semibold text-muted-foreground">
        {resultados.length === 0
          ? "Nenhuma pergunta encontrada."
          : `${resultados.length} ${resultados.length === 1 ? "pergunta encontrada" : "perguntas encontradas"}.`}
      </p>

      {resultados.length === 0 ? (
        <div className="mt-4 rounded-2xl border bg-card p-6">
          <p className="text-ink">Tente outra palavra ou fale com o atendimento.</p>
          <Link href="/contato" className="mt-3 inline-flex min-h-11 items-center font-semibold text-primary underline">
            Ver canais de contato
          </Link>
        </div>
      ) : (
        <Accordion
          key={`${cat}-${q}`}
          multiple
          defaultValue={abertosIniciais}
          className="mt-4 rounded-2xl border bg-card px-4 sm:px-6"
        >
          {resultados.map((f) => (
            <AccordionItem key={f.id} value={f.id}>
              <AccordionTrigger
                className="min-h-14 items-center gap-3 py-4 text-base font-bold text-ink hover:no-underline"
                iconeFechado={<Image src={icAbrir} alt="" className="h-5 w-auto" />}
                iconeAberto={<Image src={icFechar} alt="" className="h-5 w-auto" />}
              >
                <Image src={icDuvida} alt="" className="size-7 shrink-0" />
                <span className="flex-1">{f.pergunta}</span>
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-base text-ink">
                {f.resposta.map((p, i) => (
                  <p key={i} className="mb-2 last:mb-0">
                    {p}
                  </p>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  )
}
