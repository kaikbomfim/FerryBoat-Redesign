import type { Metadata, Viewport } from "next"
import { Atkinson_Hyperlegible_Next, Barlow_Condensed } from "next/font/google"
import "./globals.css"

import { Header } from "@/components/site/header"
import { Footer } from "@/components/site/footer"
import { VLibras } from "@/components/site/vlibras"

const atkinson = Atkinson_Hyperlegible_Next({
  variable: "--font-atkinson",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
  adjustFontFallback: false,
  fallback: ["system-ui", "Segoe UI", "Arial", "sans-serif"],
})

const barlow = Barlow_Condensed({
  variable: "--font-barlow-cond",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
})

export const metadata: Metadata = {
  // Protótipo acadêmico: não deve aparecer em buscadores no lugar do site oficial
  robots: { index: false, follow: false },
  title: {
    default: "Ferry-Boat Salvador–Itaparica | Horários, tarifas e fila",
    template: "%s | Ferry-Boat Salvador–Itaparica",
  },
  description:
    "Horários, tarifas, situação da fila e cartões do Sistema Ferry-Boat Salvador–Itaparica. Protótipo acadêmico de redesign centrado no usuário.",
}

// Zoom liberado (sem maximum-scale): WCAG 1.4.4
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#00355c",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${atkinson.variable} ${barlow.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <a
          href="#conteudo"
          className="sr-only z-50 rounded-lg bg-primary px-4 py-3 font-semibold text-primary-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Pular para o conteúdo
        </a>
        <p className="bg-ink px-4 py-1.5 text-center text-sm text-white">
          <strong className="text-brand">Protótipo acadêmico</strong> de redesign · não é o site oficial da Internacional
          Travessias Salvador
        </p>
        <Header />
        <main id="conteudo" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <Footer />
        <VLibras />
      </body>
    </html>
  )
}
