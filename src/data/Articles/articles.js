import comeDegustare from "./comeDegustare.jsx";
import comeSpillare from "./comeSpillare.jsx";
import esperienzaBeverage from "./esperienzaBeverage.jsx";
import birraDellAnno from "./birraDellAnno.jsx"
import storiaBirra from "./storiaBirra.jsx";
import ciboeBirra from "./ciboEBirra.jsx";
import birraEAcqua from "./birraEAcqua.jsx";
import dryHopping from "./dryHopping.jsx";
import bicchiereGiusto from "./bicchieregiusto.jsx";
import falsiMiti from "./falsiMiti.jsx";

const articles = [
  {
    id: 1,
    slug: "come-spillare-una-birra-nel-modo-giusto",
    title: "Come spillare una birra nel modo giusto",
    author: "Jurij Rossi",
    date: "29-07-2020",
    image: "/imgs/blog/spillare-birra.jpg",
    excerpt:
      "Una corretta spillatura permette di valorizzare aromi, schiuma e gusto della birra.",
    content: comeSpillare,
  },

  {
    id: 2,
    slug: "come-degustare-una-birra-artigianale",
    title: "Come degustare una birra artigianale",
    author: "Marco Bianchi",
    date: "10-03-2024",
    image: "/imgs/blog/degustazione.jpg",
    excerpt:
      "Osservare, annusare e assaggiare: tre semplici passaggi per apprezzare ogni birra.",
    content: comeDegustare,
  },

  {
    id: 3,
    slug: "come-sta-cambiando-lesperienza-beverage",
    title: "Come sta cambiando l'esperienza beverage nel settore",
    author: "Elena Ferri",
    date: "18-02-2025",
    image: "/imgs/blog/beverage.jpg",
    excerpt:
      "Dall'intentional drinking alla sostenibilità: come stanno cambiando i consumatori.",
    content: esperienzaBeverage,
  },

  {
    id: 4,
    slug: "birra-dellanno-2026",
    title: "Birra dell'Anno 2026",
    author: "Luca Moretti",
    date: "16-02-2026",
    image: "/imgs/blog/birra-anno.jpg",
    excerpt:
      "I risultati del più importante concorso italiano dedicato alla birra artigianale.",
    content: birraDellAnno,
  },

  {
    id: 5,
    slug: "la-storia-della-birra",
    title: "La storia della birra: un viaggio lungo oltre 5.000 anni",
    author: "Sara Conti",
    date: "08-11-2025",
    image: "/imgs/blog/storia-birra.jpg",
    excerpt:
      "Dai Sumeri alla rivoluzione della birra artigianale: oltre cinque millenni di storia.",
    content: storiaBirra,
  },

  {
    id: 6,
    slug: "abbinare-la-birra-al-cibo",
    title: "Abbinare la birra al cibo: qualche consiglio",
    author: "Davide Rinaldi",
    date: "21-09-2025",
    image: "/imgs/blog/food-pairing.jpg",
    excerpt:
      "Scopri come scegliere la birra giusta per valorizzare ogni piatto.",
    content: ciboeBirra ,
  },

  {
    id: 7,
    slug: "limportanza-dellacqua-nella-produzione-della-birra",
    title: "L'importanza dell'acqua nella produzione della birra",
    author: "Giulia Ferraro",
    date: "12-06-2025",
    image: "/imgs/blog/acqua.jpg",
    excerpt:
      "L'acqua rappresenta oltre il 90% della birra ed è fondamentale per ogni stile.",
    content: birraEAcqua,
  },

  {
    id: 8,
    slug: "dry-hopping-quando-il-luppolo-diventa-protagonista",
    title: "Il dry hopping: quando il luppolo diventa protagonista",
    author: "Andrea Vitale",
    date: "27-04-2025",
    image: "/imgs/blog/dry-hopping.jpg",
    excerpt:
      "La tecnica che ha rivoluzionato il modo di utilizzare il luppolo nelle birre moderne.",
    content: dryHopping,
  },

  {
    id: 9,
    slug: "il-bicchiere-giusto-fa-davvero-la-differenza",
    title: "Il bicchiere giusto fa davvero la differenza?",
    author: "Francesca Neri",
    date: "03-08-2025",
    image: "/imgs/blog/bicchiere.jpg",
    excerpt:
      "Forma e apertura del bicchiere possono cambiare completamente la degustazione.",
    content: bicchiereGiusto,
  },

  {
    id: 10,
    slug: "i-falsi-miti-sulla-birra",
    title: "I falsi miti sulla birra: sfatiamo qualche leggenda",
    author: "Matteo Gallo",
    date: "14-12-2025",
    image: "/imgs/blog/falsi-miti.jpg",
    excerpt:
      "Dalla 'doppio malto' alla schiuma: scopri quali sono i luoghi comuni più diffusi.",
    content: falsiMiti,
  },
   

]

export default articles;