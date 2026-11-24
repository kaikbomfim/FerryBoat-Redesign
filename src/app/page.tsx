import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CalendarClock, CreditCard, ExternalLink, Phone, ReceiptText } from "lucide-react"

import { HeroVideo } from "@/components/site/hero-video"
import { ProximasSaidas } from "@/components/site/proximas-saidas"
import { TarifaHoje } from "@/components/site/tarifa-hoje"
import { avisos, contatos, frota, links } from "@/data/ferry"
import { ferryCultural, fotosFrota } from "@/data/imagens"
import bannerFerryCard from "@/assets/img/banner-ferry-card.webp"
import bannerHoraMarcada from "@/assets/img/banner-hora-marcada.webp"
import boletim from "@/assets/img/boletim.webp"
import icDuvida from "@/assets/img/ic-duvida.webp"
import icFilometro from "@/assets/img/ic-filometro.webp"
import poster from "@/assets/img/ferry-hero-poster.webp"

const tarefas = [
  { href: "/horarios", titulo: "Horários", texto: "Saídas de hora em hora, das 5h às 23h30.", icone: CalendarClock },
  { href: "/tarifas", titulo: "Tarifas", texto: "Pedestre, carro, moto e calculadora de preço.", icone: ReceiptText },
  { href: "/filometro", titulo: "Filômetro", texto: "Veja a fila nos terminais antes de sair.", img: icFilometro },
  { href: "/cartoes", titulo: "Cartões", texto: "Ferry Card, Tarifa Social e Estudante.", icone: CreditCard },
]

const dataCurta = (iso: string) =>
  new Date(iso + "T12:00:00").toLocaleDateString("pt-BR", { day: "2-digit", month: "long" })

export default function Home() {
  const aviso = avisos[0]
  return (
    <>
      {/* Topo com o vídeo institucional do site original, agora com a informação mais buscada por cima */}
      <div className="relative isolate overflow-hidden bg-ink">
        <Image
          src={poster}
          alt=""
          fill
          preload
          sizes="100vw"
          className="-z-20 object-cover"
        />
        <HeroVideo />
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/30"
          aria-hidden="true"
        />
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:px-6 md:grid-cols-[1.15fr_1fr] md:gap-x-10 md:py-16">
          <div className="text-white md:col-start-1 md:row-start-1">
            <p className="inline-flex items-center rounded-full bg-brand px-3 py-1 text-sm font-bold text-brand-foreground">
              Sistema Ferry-Boat
            </p>
            <h1 className="mt-4 text-[2.6rem] leading-none font-extrabold sm:text-6xl">
              Salvador ⇄ Itaparica, sem surpresa na travessia
            </h1>
            <p className="mt-4 max-w-xl text-lg text-white/90">
              Confira a próxima saída, quanto vai pagar e como está a fila antes de sair de casa.
            </p>
          </div>
          <div className="md:col-start-2 md:row-span-2 md:row-start-1 md:self-center">
            <ProximasSaidas />
          </div>
          <div className="md:col-start-1 md:row-start-2">
            <dl className="grid max-w-md grid-cols-2 gap-3">
              <div className="rounded-xl border-l-4 border-brand bg-white p-4">
                <dt className="text-sm font-semibold text-muted-foreground">Pedestre</dt>
                <dd className="mt-1 text-ink">
                  <TarifaHoje id="pedestre" />
                </dd>
              </div>
              <div className="rounded-xl border-l-4 border-brand bg-white p-4">
                <dt className="text-sm font-semibold text-muted-foreground">Carro pequeno</dt>
                <dd className="mt-1 text-ink">
                  <TarifaHoje id="auto-pequeno" />
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl space-y-16 px-4 py-12 sm:px-6">
        <section aria-labelledby="tarefas-titulo">
          <h2 id="tarefas-titulo" className="border-l-[6px] border-brand pl-3 text-3xl font-bold text-ink">
            O que você precisa?
          </h2>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {tarefas.map((t) => {
              const Icone = t.icone
              return (
                <li key={t.href}>
                  <Link
                    href={t.href}
                    className="group flex h-full flex-col rounded-2xl border bg-card p-5 no-underline shadow-xs transition hover:border-primary hover:shadow-md"
                  >
                    <span className="grid size-12 place-items-center rounded-full bg-brand text-ink">
                      {Icone ? <Icone className="size-6" aria-hidden="true" /> : <Image src={t.img!} alt="" className="size-8" />}
                    </span>
                    <span className="font-marca mt-4 text-2xl font-bold text-ink italic group-hover:underline">{t.titulo}</span>
                    <span className="mt-1 text-muted-foreground">{t.texto}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </section>

        <section aria-labelledby="aviso-titulo" className="grid gap-5 overflow-hidden rounded-2xl border bg-card sm:grid-cols-[300px_1fr]">
          <Image src={boletim} alt="" className="h-auto w-full self-center" sizes="(min-width: 640px) 300px, 100vw" />
          <div className="p-5 sm:py-6 sm:pr-6 sm:pl-0">
            <p className="text-sm font-bold tracking-wide text-primary uppercase">Fique por dentro</p>
            <h2 id="aviso-titulo" className="mt-1 text-2xl font-bold text-ink">
              {aviso.titulo} · <time dateTime={aviso.data}>{dataCurta(aviso.data)}</time>
            </h2>
            <p className="mt-2 text-ink">{aviso.texto}</p>
            <Link href="/filometro" className="mt-3 inline-flex min-h-11 items-center gap-1.5 font-semibold text-primary underline">
              Ver a fila agora no Filômetro
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </section>

        <section aria-labelledby="servicos-titulo">
          <h2 id="servicos-titulo" className="border-l-[6px] border-brand pl-3 text-3xl font-bold text-ink">
            Viaje com mais praticidade
          </h2>
          <ul className="mt-5 grid gap-5 md:grid-cols-2">
            <li className="overflow-hidden rounded-2xl border bg-card">
              <Link href="/cartoes" className="group block no-underline">
                <Image
                  src={bannerFerryCard}
                  alt="Faça o seu Ferry Card: praticidade no embarque"
                  className="h-auto w-full"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
                <span className="block p-5">
                  <span className="font-marca block text-2xl font-bold text-ink italic group-hover:underline">Ferry Card</span>
                  <span className="text-muted-foreground">Cartão recarregável: passe direto pela catraca, sem fila na bilheteria.</span>
                </span>
              </Link>
            </li>
            <li className="overflow-hidden rounded-2xl border bg-card">
              <a href={links.horaMarcada} target="_blank" rel="noopener noreferrer" className="group block no-underline">
                <Image
                  src={bannerHoraMarcada}
                  alt="Hora Marcada: garanta sua passagem"
                  className="h-auto w-full"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
                <span className="block p-5">
                  <span className="font-marca flex items-center gap-2 text-2xl font-bold text-ink italic group-hover:underline">
                    Hora Marcada <ExternalLink className="size-5" aria-hidden="true" />
                    <span className="sr-only">(abre o portal de vendas em nova aba)</span>
                  </span>
                  <span className="text-muted-foreground">
                    Carro de passeio com horário garantido e fila exclusiva. Compra com até 30 dias, taxa de serviço de 30%.
                  </span>
                </span>
              </a>
            </li>
          </ul>
        </section>

        <section aria-labelledby="frota-titulo">
          <h2 id="frota-titulo" className="border-l-[6px] border-brand pl-3 text-3xl font-bold text-ink">
            Nossa frota
          </h2>
          <p className="mt-2 text-muted-foreground">Sete embarcações. Role para o lado para ver todas.</p>
          {/* Lista com rolagem horizontal: sem carrossel automático e sem itens repetidos */}
          <ul className="mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3" tabIndex={0} aria-label="Embarcações da frota">
            {frota.map((f) => (
              <li key={f.nome} className="w-72 shrink-0 snap-start overflow-hidden rounded-2xl border bg-card">
                <Image
                  src={fotosFrota[f.nome as keyof typeof fotosFrota]}
                  alt={`Ferry ${f.nome} navegando`}
                  className="aspect-[990/520] w-full object-cover"
                  sizes="288px"
                  placeholder="blur"
                />
                <div className="p-4">
                  <p className="font-marca text-xl font-bold text-ink italic">FB {f.nome}</p>
                  <p className="text-sm text-muted-foreground">
                    {f.passageiros.toLocaleString("pt-BR")} passageiros · {f.veiculos} veículos
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="cultural-titulo">
          <h2 id="cultural-titulo" className="border-l-[6px] border-brand pl-3 text-3xl font-bold text-ink">
            Ferry Cultural
          </h2>
          <p className="mt-2 text-muted-foreground">A travessia também é lugar de cultura baiana.</p>
          <ul className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {ferryCultural.map((c) => (
              <li key={c.titulo} className="overflow-hidden rounded-2xl border bg-card">
                <a href={c.href} target="_blank" rel="noopener noreferrer" className="group block no-underline">
                  <Image src={c.img} alt="" className="aspect-square w-full object-cover" sizes="(min-width: 1024px) 25vw, 50vw" />
                  <span className="block p-4">
                    <span className="font-marca block text-xl font-bold text-ink italic group-hover:underline">
                      {c.titulo}
                      <span className="sr-only"> (abre o site oficial em nova aba)</span>
                    </span>
                    <span className="text-sm text-muted-foreground">{c.texto}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="ajuda-titulo" className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border bg-card p-6">
            <div className="flex items-center gap-3">
              <Image src={icDuvida} alt="" className="size-9" />
              <h2 id="ajuda-titulo" className="text-2xl font-bold text-ink">
                Dúvidas mais comuns
              </h2>
            </div>
            <ul className="mt-4 space-y-2">
              {[
                ["Posso levar meu cachorro ou gato?", "/duvidas?q=animais"],
                ["Quem tem direito à gratuidade?", "/duvidas?q=gratuidade"],
                ["Como peço reembolso da Hora Marcada?", "/duvidas?q=reembolso"],
                ["Caminhões podem atravessar no fim de semana?", "/duvidas?q=pesados"],
              ].map(([p, href]) => (
                <li key={href}>
                  <Link href={href} className="inline-flex min-h-10 items-center gap-1.5 font-semibold text-primary underline">
                    {p}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-ink p-6 text-white">
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-full bg-brand text-ink">
                <Phone className="size-5" aria-hidden="true" />
              </span>
              <h2 className="text-2xl font-bold">Fale com a gente</h2>
            </div>
            <ul className="mt-4 space-y-3">
              <li>
                <span className="block text-sm font-semibold text-white/80">{contatos.sac.rotulo}</span>
                <a href={contatos.sac.href} className="text-xl font-bold text-white underline">
                  {contatos.sac.valor}
                </a>
              </li>
              <li>
                <span className="block text-sm font-semibold text-white/80">{contatos.whatsapp.rotulo}</span>
                <a href={contatos.whatsapp.href} className="text-xl font-bold text-white underline">
                  {contatos.whatsapp.valor}
                </a>
              </li>
              <li>
                <Link href="/contato" className="font-semibold text-brand underline">
                  Ver e-mails de reembolso, ouvidoria e solicitações
                </Link>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </>
  )
}
