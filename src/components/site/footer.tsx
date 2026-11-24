import Link from "next/link"
import { contatos, FONTE_DADOS, terminais } from "@/data/ferry"
import { Logo } from "./logo"
import { navItems } from "./nav-items"

export function Footer() {
  return (
    <footer className="mt-16 border-t-4 border-brand bg-ink text-white">
      <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6">
        <Logo variante="branco" />
      </div>
      <div className="mx-auto grid max-w-6xl gap-10 px-4 pt-8 pb-12 sm:px-6 md:grid-cols-3">
        <div>
          <h2 className="font-marca text-xl font-bold text-brand">Atendimento</h2>
          <ul className="mt-3 space-y-2 text-[0.95rem]">
            <li>
              SAC:{" "}
              <a className="font-semibold text-white underline" href={contatos.sac.href}>
                {contatos.sac.valor}
              </a>
            </li>
            <li>
              WhatsApp:{" "}
              <a className="font-semibold text-white underline" href={contatos.whatsapp.href}>
                {contatos.whatsapp.valor}
              </a>
            </li>
            <li>
              <Link className="font-semibold text-white underline" href="/contato">
                Todos os canais de contato
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-marca text-xl font-bold text-brand">Terminais</h2>
          <ul className="mt-3 space-y-3 text-[0.95rem] text-white/90">
            {Object.values(terminais).map((t) => (
              <li key={t.id}>
                <span className="font-semibold text-white">{t.nome}</span>
                <br />
                {t.endereco}
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Rodapé">
          <h2 className="font-marca text-xl font-bold text-brand">Navegação</h2>
          <ul className="mt-3 grid grid-cols-2 gap-2 text-[0.95rem]">
            <li>
              <Link className="text-white underline" href="/">
                Início
              </Link>
            </li>
            {navItems.map((i) => (
              <li key={i.href}>
                <Link className="text-white underline" href={i.href}>
                  {i.label}
                </Link>
              </li>
            ))}
            <li>
              <Link className="text-white underline" href="/acessibilidade">
                Acessibilidade
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-white/15">
        <p className="mx-auto max-w-6xl px-4 py-5 text-sm text-white/85 sm:px-6">
          <strong className="text-white">Protótipo acadêmico</strong> (redesign de UX/UI). Não é o site oficial
          da Internacional Travessias Salvador. Dados reais coletados de {FONTE_DADOS}.
        </p>
      </div>
    </footer>
  )
}
