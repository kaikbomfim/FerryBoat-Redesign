"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ExternalLink, Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { links } from "@/data/ferry"
import icContatos from "@/assets/img/ic-contatos.webp"
import icFilometro from "@/assets/img/ic-filometro.webp"
import icHoraMarcada from "@/assets/img/ic-hora-marcada.webp"
import { Logo } from "./logo"
import { navItems } from "./nav-items"

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(href + "/")
}

/** Atalhos com os ícones da identidade visual original (Contatos, Hora marcada, Filômetro). */
function Atalhos({ className }: { className?: string }) {
  const item =
    "flex min-h-11 items-center gap-2 rounded-lg px-2 text-[0.95rem] font-semibold text-ink no-underline hover:bg-secondary"
  return (
    <ul className={cn("flex items-center gap-1", className)}>
      <li>
        <Link href="/contato" className={item}>
          <Image src={icContatos} alt="" className="size-8" />
          Contatos
        </Link>
      </li>
      <li>
        <a href={links.horaMarcada} target="_blank" rel="noopener noreferrer" className={item}>
          <Image src={icHoraMarcada} alt="" className="size-8" />
          Hora Marcada
          <ExternalLink className="size-4" aria-hidden="true" />
          <span className="sr-only">(abre o portal de vendas em nova aba)</span>
        </a>
      </li>
      <li>
        <Link href="/filometro" className={item}>
          <Image src={icFilometro} alt="" className="size-8" />
          Filômetro
        </Link>
      </li>
    </ul>
  )
}

export function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 border-b-4 border-brand bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6 lg:py-3">
        <Logo />

        <div className="hidden flex-col items-end gap-1 lg:flex">
          <nav aria-label="Atalhos">
            <Atalhos />
          </nav>
          <nav aria-label="Menu principal" className="border-t border-border pt-1">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => {
                const active = isActive(pathname, item.href)
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative inline-flex min-h-10 items-center rounded-md px-3 text-[1.05rem] font-semibold text-ink no-underline transition-colors hover:bg-secondary",
                        active &&
                          "bg-secondary after:absolute after:inset-x-2 after:-bottom-[3px] after:h-[3px] after:rounded-full after:bg-brand"
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>

        <Sheet>
          <SheetTrigger
            render={<Button variant="outline" size="lg" className="h-11 gap-2 border-2 border-primary px-3 text-ink lg:hidden" />}
          >
            <Menu className="size-5" aria-hidden="true" />
            Menu
          </SheetTrigger>
          <SheetContent side="right" className="w-[88%] max-w-sm overflow-y-auto">
            <SheetHeader className="border-b-4 border-brand">
              <SheetTitle className="font-marca text-2xl font-bold text-ink">Menu</SheetTitle>
              <SheetDescription>Escolha o que você quer ver.</SheetDescription>
            </SheetHeader>
            <nav aria-label="Menu principal (celular)" className="px-2">
              <ul className="flex flex-col gap-1">
                {[{ href: "/", label: "Início" }, ...navItems].map((item) => {
                  const active = item.href === "/" ? pathname === "/" : isActive(pathname, item.href)
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex min-h-12 items-center rounded-lg px-3 text-base font-semibold text-ink no-underline hover:bg-secondary",
                          active && "border-l-4 border-brand bg-secondary"
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>
            <nav aria-label="Atalhos (celular)" className="mt-2 border-t px-2 pt-3">
              <Atalhos className="flex-col items-stretch" />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
