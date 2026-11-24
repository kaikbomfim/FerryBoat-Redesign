import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Info, MapPin } from "lucide-react"

import { GradeHorarios } from "@/components/site/grade-horarios"
import { PageIntro, Secao } from "@/components/site/page-intro"
import { horarios, terminais } from "@/data/ferry"
import Image from "next/image"
import banner from "@/assets/img/banner-horarios.webp"
import mapa from "@/assets/img/mapa-travessia.webp"
import fotoSJ from "@/assets/img/terminal-sao-joaquim.webp"
import fotoBD from "@/assets/img/terminal-bom-despacho.webp"

const fotos = { salvador: fotoSJ, itaparica: fotoBD } as const

export const metadata: Metadata = {
  title: "Horários",
  description: "Horários de saída do ferry-boat entre Salvador (São Joaquim) e Itaparica (Bom Despacho).",
}

export default function HorariosPage() {
  return (
    <>
      <PageIntro
        atual="Horários"
        banner={banner}
        bannerPosicao="center 60%"
        titulo="Horários do ferry-boat"
        descricao="Saídas de hora em hora, ao mesmo tempo, de Salvador e de Itaparica. Já marcamos a grade que vale para hoje."
      />

      <div className="mx-auto max-w-6xl space-y-12 px-4 py-10 sm:px-6">
        <Secao id="grade" titulo="Grade de saídas">
          <GradeHorarios />
        </Secao>

        <Secao id="sentidos" titulo="De onde sai">
          <figure className="mb-5 overflow-hidden rounded-2xl border bg-card">
            <Image
              src={mapa}
              alt="Mapa da travessia: linha ligando o Terminal São Joaquim, em Salvador, ao Terminal Bom Despacho, na Ilha de Itaparica, cruzando a Baía de Todos-os-Santos"
              className="h-auto w-full"
              sizes="(min-width: 1152px) 1152px, 100vw"
              placeholder="blur"
            />
          </figure>
          <ul className="grid gap-4 md:grid-cols-2">
            {Object.values(terminais).map((t) => (
              <li key={t.id} className="overflow-hidden rounded-2xl border bg-card">
                <Image
                  src={fotos[t.id]}
                  alt={`Vista aérea do ${t.nome}`}
                  className="aspect-[514/314] w-full object-cover"
                  sizes="(min-width: 768px) 50vw, 100vw"
                  placeholder="blur"
                />
                <div className="p-5">
                <p className="text-sm font-semibold text-muted-foreground">Saindo de {t.cidade}</p>
                <p className="mt-1 text-lg font-bold text-ink">{t.nome}</p>
                <p className="mt-1 flex gap-2 text-ink">
                  <MapPin className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                  {t.endereco}
                </p>
                <a
                  href={t.mapa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex min-h-11 items-center font-semibold text-primary underline"
                >
                  Abrir no mapa<span className="sr-only"> (abre em nova aba)</span>
                </a>
                </div>
              </li>
            ))}
          </ul>
        </Secao>

        <Secao id="atencao" titulo="Antes de ir">
          <ul className="space-y-3">
            {horarios.observacoes.map((o) => (
              <li key={o} className="flex gap-3 text-ink">
                <Info className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                <span>{o}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/filometro"
              className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border-2 border-primary px-4 font-semibold text-primary no-underline hover:bg-secondary"
            >
              Ver a fila agora
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link
              href="/tarifas"
              className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border-2 border-primary px-4 font-semibold text-primary no-underline hover:bg-secondary"
            >
              Quanto custa
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </Secao>
      </div>
    </>
  )
}
