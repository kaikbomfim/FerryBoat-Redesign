// Pós-build do GitHub Pages: o Next 16 grava os payloads de navegação como "__next.rota/__PAGE__.txt",
// mas o navegador os solicita como "__next.rota.__PAGE__.txt". Criamos cópias com o nome esperado.
import fs from "node:fs"
import path from "node:path"

const raiz = path.resolve("out")
let copias = 0
function varrer(dir) {
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const atual = path.join(dir, item.name)
    if (!item.isDirectory()) continue
    if (item.name.startsWith("__next.")) {
      for (const arq of fs.readdirSync(atual, { withFileTypes: true })) {
        if (arq.isFile()) {
          fs.copyFileSync(path.join(atual, arq.name), path.join(dir, `${item.name}.${arq.name}`))
          copias++
        }
      }
    }
    varrer(atual)
  }
}
varrer(raiz)
console.log(`ajustar-export: ${copias} arquivos de navegação copiados`)
