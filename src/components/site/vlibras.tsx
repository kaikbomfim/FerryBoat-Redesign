"use client"

import Script from "next/script"

declare global {
  interface Window {
    VLibras?: { Widget: new (url: string) => unknown }
  }
}

/**
 * Widget oficial do VLibras (Governo Federal), integrado conforme a documentação:
 * https://vlibras.gov.br/doc/widget/installation/webpageintegration.html
 * O script carrega depois da página (lazyOnload) para não atrasar o conteúdo principal.
 */
export function VLibras() {
  return (
    <>
      <div {...{ vw: "" }} className="enabled">
        <div {...{ "vw-access-button": "" }} className="active" />
        <div {...{ "vw-plugin-wrapper": "" }}>
          <div className="vw-plugin-top-wrapper" />
        </div>
      </div>
      <Script
        src="https://vlibras.gov.br/app/vlibras-plugin.js"
        strategy="lazyOnload"
        onLoad={() => {
          if (!window.VLibras) return
          new window.VLibras.Widget("https://vlibras.gov.br/app")
          // O plugin se inicializa no evento "load"; como o script chega depois, disparamos de novo.
          window.dispatchEvent(new Event("load"))
        }}
      />
    </>
  )
}
