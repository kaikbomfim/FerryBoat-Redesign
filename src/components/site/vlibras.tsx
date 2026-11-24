"use client"

import Script from "next/script"
import { useRef } from "react"

declare global {
  interface Window {
    VLibras?: { Widget: new (url: string) => unknown }
  }
}

/**
 * Widget oficial do VLibras (Governo Federal), integrado conforme a documentação:
 * https://vlibras.gov.br/doc/widget/installation/webpageintegration.html
 * - O script carrega depois da página (lazyOnload) para não atrasar o conteúdo principal.
 * - A marcação com os atributos próprios do VLibras (vw, vw-access-button...) é criada no navegador,
 *   para o HTML entregue continuar válido no W3C. Fica dentro de uma região identificada.
 */
export function VLibras() {
  const ref = useRef<HTMLElement>(null)

  return (
    <aside ref={ref} aria-label="Tradução para Libras (VLibras)">
      <Script
        src="https://vlibras.gov.br/app/vlibras-plugin.js"
        strategy="lazyOnload"
        onLoad={() => {
          const alvo = ref.current
          if (!window.VLibras || !alvo || alvo.querySelector("[vw]")) return
          const raiz = document.createElement("div")
          raiz.setAttribute("vw", "")
          raiz.className = "enabled"
          const botao = document.createElement("div")
          botao.setAttribute("vw-access-button", "")
          botao.className = "active"
          const plugin = document.createElement("div")
          plugin.setAttribute("vw-plugin-wrapper", "")
          const topo = document.createElement("div")
          topo.className = "vw-plugin-top-wrapper"
          plugin.appendChild(topo)
          raiz.append(botao, plugin)
          alvo.appendChild(raiz)
          new window.VLibras.Widget("https://vlibras.gov.br/app")
          // O plugin se inicializa no evento "load"; como o script chega depois, disparamos de novo.
          window.dispatchEvent(new Event("load"))
        }}
      />
    </aside>
  )
}
