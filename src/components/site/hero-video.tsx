"use client"

import { useRef, useState, useSyncExternalStore } from "react"
import { Pause, Play } from "lucide-react"

// No GitHub Pages o site fica em uma subpasta (basePath); arquivos de /public precisam do prefixo.
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? ""

/**
 * Vídeo institucional do site original como fundo do topo.
 * - Só carrega em telas largas, sem "reduzir movimento" e sem economia de dados (protege o plano de dados no celular).
 * - Tem botão de pausa (WCAG 2.2.2: conteúdo em movimento por mais de 5 s precisa poder ser pausado).
 */
function podeTocar() {
  const conexao = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
  return (
    window.matchMedia("(min-width: 768px)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
    !conexao?.saveData
  )
}
function assinar(cb: () => void) {
  const m1 = window.matchMedia("(min-width: 768px)")
  const m2 = window.matchMedia("(prefers-reduced-motion: reduce)")
  m1.addEventListener("change", cb)
  m2.addEventListener("change", cb)
  return () => {
    m1.removeEventListener("change", cb)
    m2.removeEventListener("change", cb)
  }
}

export function HeroVideo() {
  const ativo = useSyncExternalStore(assinar, podeTocar, () => false)
  const ref = useRef<HTMLVideoElement>(null)
  const [pausado, setPausado] = useState(false)

  if (!ativo) return null
  return (
    <>
      <div className="absolute inset-0 -z-10" aria-hidden="true">
      <video
        ref={ref}
        className="h-full w-full object-cover"
        src={`${BASE}/video/ferry-hero.mp4`}
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        tabIndex={-1}
      />
      </div>
      <button
        type="button"
        onClick={() => {
          const v = ref.current
          if (!v) return
          if (v.paused) {
            v.play()
            setPausado(false)
          } else {
            v.pause()
            setPausado(true)
          }
        }}
        className="absolute right-4 bottom-4 z-20 inline-flex min-h-11 items-center gap-2 rounded-full bg-ink/80 px-4 text-sm font-semibold text-white backdrop-blur hover:bg-ink"
      >
        {pausado ? <Play className="size-4" aria-hidden="true" /> : <Pause className="size-4" aria-hidden="true" />}
        {pausado ? "Tocar vídeo de fundo" : "Pausar vídeo de fundo"}
      </button>
    </>
  )
}
