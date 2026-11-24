import Link from "next/link"

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
      <p className="text-sm font-bold text-primary">Erro 404</p>
      <h1 className="mt-2 text-3xl font-extrabold text-ink">Página não encontrada</h1>
      <p className="mt-3 text-lg text-muted-foreground">O endereço pode ter mudado. Tente um destes caminhos:</p>
      <ul className="mt-6 flex flex-wrap justify-center gap-3">
        {[["/", "Início"], ["/horarios", "Horários"], ["/tarifas", "Tarifas"], ["/duvidas", "Dúvidas"]].map(([h, l]) => (
          <li key={h}>
            <Link href={h} className="inline-flex min-h-11 items-center rounded-xl border-2 border-primary px-4 font-semibold text-primary no-underline hover:bg-secondary">
              {l}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
