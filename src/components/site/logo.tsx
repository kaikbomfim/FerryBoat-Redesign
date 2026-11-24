import Image from "next/image"
import Link from "next/link"

import logo from "@/assets/img/logo-its.webp"
import logoBranco from "@/assets/img/logo-its-branco.webp"

export function Logo({ variante = "cor" }: { variante?: "cor" | "branco" }) {
  return (
    <Link href="/" className="inline-flex shrink-0 items-center rounded-lg no-underline">
      <Image
        src={variante === "cor" ? logo : logoBranco}
        alt="Internacional Travessias Salvador, página inicial"
        className="h-11 w-auto sm:h-12"
        preload
      />
    </Link>
  )
}
