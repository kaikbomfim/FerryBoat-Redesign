"use client"

import { useSyncExternalStore } from "react"
import { infoDia, type InfoDia } from "./tempo"

/* Relógio de Salvador: atualiza a cada 15 s. No servidor (HTML estático) retorna null. */
let cacheInfo: { chave: string; info: InfoDia } | null = null
function snapshotInfo() {
  const i = infoDia()
  const chave = `${i.iso}-${i.minutosAgora}`
  if (!cacheInfo || cacheInfo.chave !== chave) cacheInfo = { chave, info: i }
  return cacheInfo.info
}
function assinarRelogio(cb: () => void) {
  const id = setInterval(cb, 15_000)
  return () => clearInterval(id)
}
export function useInfoDia(): InfoDia | null {
  return useSyncExternalStore(assinarRelogio, snapshotInfo, () => null)
}

/* Parâmetros da URL (?q=...&categoria=...) lidos só no navegador. */
const semAssinatura = () => () => {}
export function useBuscaUrl(): string {
  return useSyncExternalStore(semAssinatura, () => window.location.search, () => "")
}

/* Preferência salva no navegador (ex.: VLibras ativo). */
export function useLocalStorageFlag(chave: string): boolean {
  return useSyncExternalStore(
    (cb) => {
      window.addEventListener("storage", cb)
      return () => window.removeEventListener("storage", cb)
    },
    () => {
      try {
        return localStorage.getItem(chave) === "1"
      } catch {
        return false
      }
    },
    () => false
  )
}
