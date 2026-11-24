import { feriados2026, horarios } from "@/data/ferry"
import type { TipoDia } from "@/data/types"

const TZ = "America/Bahia"

export type InfoDia = {
  iso: string
  diaSemana: number // 0 = domingo
  nomeDia: string
  feriado?: string
  grade: "segASab" | "domEFeriados"
  tipoTarifa: TipoDia
  minutosAgora: number
}

/** Data/hora atual no fuso de Salvador, independente do fuso do aparelho. */
export function infoDia(agora: Date = new Date()): InfoDia {
  const partes = new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    weekday: "short",
  }).formatToParts(agora)
  const get = (t: string) => partes.find((p) => p.type === t)?.value ?? ""
  const iso = `${get("year")}-${get("month")}-${get("day")}`
  const mapa: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }
  const diaSemana = mapa[get("weekday")] ?? 0
  const hora = Number(get("hour")) % 24
  const minuto = Number(get("minute"))
  const feriado = feriados2026[iso]
  const nomeDia = new Intl.DateTimeFormat("pt-BR", { timeZone: TZ, weekday: "long" }).format(agora)
  return {
    iso,
    diaSemana,
    nomeDia,
    feriado,
    grade: diaSemana === 0 || feriado ? "domEFeriados" : "segASab",
    tipoTarifa: diaSemana === 0 || diaSemana === 6 || feriado ? "fimDeSemana" : "util",
    minutosAgora: hora * 60 + minuto,
  }
}

export const paraMinutos = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number)
  return h * 60 + m
}

export function formatarHora(hhmm: string) {
  const [h, m] = hhmm.split(":")
  return m === "00" ? `${Number(h)}h` : `${Number(h)}h${m}`
}

export function proximasSaidas(info: InfoDia, quantidade = 3) {
  const lista = horarios[info.grade]
  const futuras = lista.filter((h) => paraMinutos(h) >= info.minutosAgora)
  return futuras.slice(0, quantidade)
}

export function faltam(info: InfoDia, hhmm: string) {
  const diff = paraMinutos(hhmm) - info.minutosAgora
  if (diff <= 0) return "saindo agora"
  if (diff < 60) return `em ${diff} min`
  const h = Math.floor(diff / 60)
  const m = diff % 60
  return m ? `em ${h} h ${m} min` : `em ${h} h`
}

export const rotuloTipoDia: Record<TipoDia, string> = {
  util: "Segunda a sexta",
  fimDeSemana: "Sábado, domingo e feriados",
}
