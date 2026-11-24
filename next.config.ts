import type { NextConfig } from "next"

// Build para o GitHub Pages: exportação estática servida em /<nome-do-repositório>
const githubPages = process.env.GITHUB_PAGES === "true"
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ""

const nextConfig: NextConfig = {
  // Recursos de servidor (PPR) não existem na exportação estática
  cacheComponents: !githubPages,
  partialPrefetching: !githubPages,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  ...(githubPages && {
    output: "export",
    basePath,
    trailingSlash: true,
    // Exportação estática não tem servidor de otimização: as imagens já foram convertidas para WebP no projeto.
    images: { unoptimized: true },
  }),
}

export default nextConfig
