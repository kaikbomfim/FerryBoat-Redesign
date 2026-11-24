// Imagens oficiais do site da Internacional Travessias (wp-content), mantidas para preservar a identidade visual.
import ferryAnnaNery from "@/assets/img/ferry-anna-nery.webp"
import ferryDorival from "@/assets/img/ferry-dorival-caymmi.webp"
import ferryIvete from "@/assets/img/ferry-ivete-sangalo.webp"
import ferryMaria from "@/assets/img/ferry-maria-betania.webp"
import ferryPinheiro from "@/assets/img/ferry-pinheiro.webp"
import ferryRio from "@/assets/img/ferry-rio-paraguacu.webp"
import ferryZumbi from "@/assets/img/ferry-zumbi-dos-palmares.webp"
import cultural1 from "@/assets/img/ferry-cultural.webp"
import cultural2 from "@/assets/img/ferry-cultural-02.webp"
import cultural3 from "@/assets/img/ferry-cultural-03.webp"
import cultural4 from "@/assets/img/ferry-cultural-04.webp"

export const fotosFrota = {
  "Zumbi dos Palmares": ferryZumbi,
  "Dorival Caymmi": ferryDorival,
  Pinheiro: ferryPinheiro,
  "Maria Bethânia": ferryMaria,
  "Rio Paraguaçu": ferryRio,
  "Ivete Sangalo": ferryIvete,
  "Anna Nery": ferryAnnaNery,
} as const

export const ferryCultural = [
  {
    titulo: "Ferry Celebra",
    texto: "Eventos em datas festivas, em especial da cultura baiana.",
    img: cultural2,
    href: "https://www.internacionaltravessias.com.br/ferrycultural/ferry-celebra/",
  },
  {
    titulo: "Ferry do Bem",
    texto: "Palestras e eventos com foco em trabalho social.",
    img: cultural1,
    href: "https://www.internacionaltravessias.com.br/ferrycultural/ferry-do-bem/",
  },
  {
    titulo: "Vem cá, pode chegar",
    texto: "Manifestações espontâneas e oficinas a bordo.",
    img: cultural3,
    href: "https://www.internacionaltravessias.com.br/ferrycultural/vem-ca-pode-chegar/",
  },
  {
    titulo: "Mar de Arte",
    texto: "Programação artística durante a travessia.",
    img: cultural4,
    href: "https://www.internacionaltravessias.com.br/ferrycultural/mar-de-arte/",
  },
]
