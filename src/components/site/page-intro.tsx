import Image, { type StaticImageData } from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

import icCavalo from "@/assets/img/ic-cavalo-marinho.webp"

export function PageIntro({
  titulo,
  descricao,
  atual,
  banner,
  children,
}: {
  titulo: string
  descricao?: React.ReactNode
  atual: string
  /** Banner original do site, exibido inteiro como no site oficial (decorativo: a mensagem está no título). */
  banner?: StaticImageData
  children?: React.ReactNode
}) {
  return (
    <div>
      {banner && (
        <Image
          src={banner}
          alt=""
          preload
          sizes="100vw"
          className="block h-auto w-full"
          placeholder="blur"
        />
      )}
      {/* Faixa verde com o escudo do cavalo-marinho e o título, como nas páginas internas do site original */}
      <div className="bg-brand">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6">
          <Image src={icCavalo} alt="" className="h-12 w-auto sm:h-14" />
          <h1 className="text-[2rem] leading-tight font-extrabold text-ink sm:text-5xl">{titulo}</h1>
        </div>
      </div>
      <div className="border-b bg-secondary">
        <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6">
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
          {descricao && <p className="mt-2 max-w-3xl text-lg text-ink">{descricao}</p>}
          {children}
        </div>
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
