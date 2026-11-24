import Image, { type StaticImageData } from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

import icCavalo from "@/assets/img/ic-cavalo-marinho.webp"

export function PageIntro({
  titulo,
  descricao,
  atual,
  banner,
  bannerPosicao = "center",
  children,
}: {
  titulo: string
  descricao?: React.ReactNode
  atual: string
  /** Banner original do site (decorativo: a mensagem está no título e na descrição). */
  banner?: StaticImageData
  bannerPosicao?: string
  children?: React.ReactNode
}) {
  return (
    <div className="bg-secondary">
      {banner && (
        <div className="relative h-36 overflow-hidden sm:h-52 lg:h-64">
          <Image
            src={banner}
            alt=""
            fill
            preload
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: bannerPosicao }}
            placeholder="blur"
          />
        </div>
      )}
      {/* Faixa verde com o cavalo-marinho, como nas páginas internas do site original */}
      <div className="h-2 bg-brand" aria-hidden="true" />
      <div className="mx-auto max-w-6xl px-4 py-7 sm:px-6 sm:py-9">
        <nav aria-label="Você está em">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="font-semibold text-primary underline">
                Início
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="size-4" />
            </li>
            <li aria-current="page" className="font-semibold text-ink">
              {atual}
            </li>
          </ol>
        </nav>
        <div className="mt-3 flex items-center gap-3">
          <Image src={icCavalo} alt="" className="hidden h-12 w-auto sm:block" />
          <h1 className="text-4xl font-extrabold text-ink sm:text-5xl">{titulo}</h1>
        </div>
        {descricao && <p className="mt-3 max-w-2xl text-lg text-muted-foreground">{descricao}</p>}
        {children}
      </div>
    </div>
  )
}

export function Secao({
  id,
  titulo,
  descricao,
  children,
  className,
}: {
  id: string
  titulo: string
  descricao?: React.ReactNode
  children: React.ReactNode
  className?: string
}) {
  return (
    <section aria-labelledby={`${id}-titulo`} className={className}>
      <h2 id={`${id}-titulo`} className="border-l-[6px] border-brand pl-3 text-3xl font-bold text-ink">
        {titulo}
      </h2>
      {descricao && <p className="mt-2 max-w-3xl text-muted-foreground">{descricao}</p>}
      <div className="mt-5">{children}</div>
    </section>
  )
}
