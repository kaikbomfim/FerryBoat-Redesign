import type { Metadata } from "next"
import Image from "next/image"
import { Car, ExternalLink, Footprints } from "lucide-react"

import { PageIntro, Secao } from "@/components/site/page-intro"
import { links, terminais } from "@/data/ferry"
import { cn } from "@/lib/utils"
import { fotosFrota } from "@/data/imagens"
import banner from "@/assets/img/banner-filometro.webp"

export const metadata: Metadata = {
  title: "Filômetro: fila agora",
  description: "Situação das filas de pedestres e veículos nos terminais São Joaquim e Bom Despacho.",
}

type Nivel = 0 | 1 | 2 | 3 | 4

// Escala oficial do Filômetro (mesmas cores e faixas de espera do site original).
// A informação nunca depende só da cor (WCAG 1.4.1): cada nível tem nome, tempo de espera e escudo numerado.
const niveis: Record<Nivel, { rotulo: string; espera: string; cor: string }> = {
  0: { rotulo: "Sem fila", espera: "Até 50 minutos de espera", cor: "var(--fila-0)" },
  1: { rotulo: "Pouca fila", espera: "De 60 a 90 minutos de espera", cor: "var(--fila-1)" },
  2: { rotulo: "Fila moderada", espera: "De 2 a 3 horas de espera", cor: "var(--fila-2)" },
  3: { rotulo: "Fila intensa", espera: "Mais de 3 horas de espera", cor: "var(--fila-3)" },
  4: { rotulo: "Fila muito intensa", espera: "Acima de 4 horas de espera", cor: "var(--fila-4)" },
}

/** Escudo da identidade visual do filômetro, com o número do nível dentro. */
function Escudo({ nivel, className }: { nivel: Nivel; className?: string }) {
  return (
    <svg viewBox="0 0 40 46" className={cn("shrink-0", className)} aria-hidden="true">
      <path d="M20 2 L37 7 V22 C37 33 29 40 20 44 C11 40 3 33 3 22 V7 Z" fill={niveis[nivel].cor} stroke="#00355c" strokeWidth="2.5" />
      <text x="20" y="29" textAnchor="middle" fontSize="17" fontWeight="800" fill="#00355c" fontFamily="Arial">
        {nivel + 1}
      </text>
    </svg>
  )
}

// Veículos: situação registrada no filômetro oficial em 24/11/2026 ("Fila Intensa – mais de 3 horas de espera"
// nos dois terminais). A separação pedestres x veículos é uma proposta do redesign (dado ilustrativo).
const situacao: { terminal: (typeof terminais)[keyof typeof terminais]; atualizado: string; veiculos: Nivel; pedestres: Nivel }[] = [
  { terminal: terminais.salvador, atualizado: "há 11 minutos", veiculos: 3, pedestres: 0 },
  { terminal: terminais.itaparica, atualizado: "há 9 minutos", veiculos: 3, pedestres: 0 },
]

const emOperacao = [
  { nome: "Dorival Caymmi", passageiros: 987, veiculos: 108, prioritarios: 12 },
  { nome: "Ivete Sangalo", passageiros: 629, veiculos: 45, prioritarios: 5 },
  { nome: "Maria Bethânia", passageiros: 793, veiculos: 36, prioritarios: 4 },
]

function Status({ nivel, tipo }: { nivel: Nivel; tipo: "veiculos" | "pedestres" }) {
  const n = niveis[nivel]
  const TipoIcone = tipo === "veiculos" ? Car : Footprints
  return (
    <div className="rounded-xl border-2 border-l-[10px] bg-card p-4" style={{ borderColor: n.cor }}>
      <dt className="flex items-center gap-2 text-sm font-bold text-ink">
        <TipoIcone className="size-4" aria-hidden="true" />
        {tipo === "veiculos" ? "Veículos" : "Pedestres"}
      </dt>
      <dd className="mt-2 flex items-center gap-3">
        <Escudo nivel={nivel} className="h-11 w-10" />
        <span>
          <span className="font-marca block text-2xl leading-tight font-extrabold text-ink italic">
            {n.rotulo}
            <span className="sr-only">.</span>
          </span>
          <span className="block text-sm text-ink">{n.espera}</span>
        </span>
      </dd>
    </div>
  )
}

export default function FilometroPage() {
  return (
    <>
      <PageIntro
        atual="Filômetro"
        banner={banner}
        bannerPosicao="center"
        titulo="Como está a fila agora"
        descricao="Situação das filas em cada terminal, separada para quem vai de carro e quem vai a pé."
      />

      <div className="mx-auto max-w-6xl space-y-12 px-4 py-10 sm:px-6">
        <p className="rounded-xl border-2 border-dashed border-primary/40 bg-secondary p-4 text-ink">
          <strong>Protótipo:</strong> situação de veículos copiada do filômetro oficial em 24/11/2026. A divisão entre pedestres e veículos é uma proposta; no site real, os dados viriam do sistema do filômetro.{" "}
          <a href={links.filometroOficial} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline">
            Ver o filômetro oficial
            <ExternalLink className="ml-1 inline size-4" aria-hidden="true" />
            <span className="sr-only"> (abre em nova aba)</span>
          </a>
        </p>

        <Secao id="terminais" titulo="Situação por terminal">
          <div className="grid gap-6 md:grid-cols-2">
            {situacao.map((s) => (
              <article key={s.terminal.id} aria-labelledby={`t-${s.terminal.id}`} className="rounded-2xl border bg-card p-5 sm:p-6">
                <h3 id={`t-${s.terminal.id}`} className="text-xl font-bold text-ink">
                  {s.terminal.nome}{" "}
                  <span className="font-semibold text-muted-foreground">({s.terminal.cidade})</span>
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">Atualizado {s.atualizado}</p>
                <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                  <Status nivel={s.veiculos} tipo="veiculos" />
                  <Status nivel={s.pedestres} tipo="pedestres" />
                </dl>
              </article>
            ))}
          </div>
        </Secao>

        <Secao id="legenda" titulo="O que cada nível significa">
          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {([0, 1, 2, 3, 4] as Nivel[]).map((k) => (
              <li key={k} className="flex items-center gap-3 rounded-xl border-2 bg-card p-3" style={{ borderColor: niveis[k].cor }}>
                <Escudo nivel={k} className="h-11 w-10" />
                <span>
                  <strong className="font-marca block text-lg leading-tight text-ink italic">{niveis[k].rotulo}</strong>
                  <span className="text-sm text-ink">{niveis[k].espera}</span>
                </span>
              </li>
            ))}
          </ol>
        </Secao>

        <Secao
          id="frota"
          titulo="Embarcações em operação hoje"
          descricao="Vagas de prioridade limitadas a 10% da capacidade de cada embarcação, conforme acordo com o Ministério Público."
        >
          <ul className="grid gap-4 md:grid-cols-3">
            {emOperacao.map((f) => (
              <li key={f.nome} className="overflow-hidden rounded-2xl border bg-card">
                <Image
                  src={fotosFrota[f.nome as keyof typeof fotosFrota]}
                  alt={`Ferry ${f.nome}`}
                  className="aspect-[990/520] w-full object-cover"
                  sizes="(min-width: 768px) 33vw, 100vw"
                  placeholder="blur"
                />
                <div className="p-5">
                <p className="font-marca text-2xl font-bold text-ink italic">FB {f.nome}</p>
                <dl className="mt-3 grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-lg bg-muted p-2">
                    <dt className="text-xs font-semibold text-muted-foreground">Pessoas</dt>
                    <dd className="text-lg font-bold text-ink tabular-nums">{f.passageiros}</dd>
                  </div>
                  <div className="rounded-lg bg-muted p-2">
                    <dt className="text-xs font-semibold text-muted-foreground">Veículos</dt>
                    <dd className="text-lg font-bold text-ink tabular-nums">{f.veiculos}</dd>
                  </div>
                  <div className="rounded-lg bg-muted p-2">
                    <dt className="text-xs font-semibold text-muted-foreground">Prioridade</dt>
                    <dd className="text-lg font-bold text-ink tabular-nums">{f.prioritarios}</dd>
                  </div>
                </dl>
                </div>
              </li>
            ))}
          </ul>
        </Secao>
      </div>
    </>
  )
}
