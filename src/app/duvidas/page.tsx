import type { Metadata } from "next"
import { FaqExplorer } from "@/components/site/faq-explorer"
import { PageIntro } from "@/components/site/page-intro"
import banner from "@/assets/img/banner-duvidas.webp"

export const metadata: Metadata = {
  title: "Dúvidas frequentes",
  description: "Respostas sobre horários, Hora Marcada, Ferry Card, gratuidade, animais e reembolso.",
}

export default function DuvidasPage() {
  return (
    <>
      <PageIntro
        atual="Dúvidas"
        banner={banner}
        titulo="Dúvidas frequentes"
        descricao="Digite uma palavra ou escolha um assunto. As 60 perguntas do atendimento estão aqui."
      />
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <FaqExplorer />
      </div>
    </>
  )
}
