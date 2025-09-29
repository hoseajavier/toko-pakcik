import bodyOsh from "../assets/product/body-osh.jpg"
import gloveBiru from "../assets/product/glove-biru.jpg"
import gloveMerah from "../assets/product/glove-merah.jpg"
import gumshield from "../assets/product/gumshield.jpeg"
import sabukCoklat from "../assets/product/sabuk-coklat.jpg"
import sabukHijau from "../assets/product/sabuk-hijau.jpg"
import sabukHitam from "../assets/product/sabuk-hitam.jpg"
import sabukMerahBiru from "../assets/product/sabuk-merah-biru.jpg"
import sabukPutih from "../assets/product/sabuk-putih.jpg"
import shinpadBiru from "../assets/product/shinpad-biru.jpg"
import shinpadMerah from "../assets/product/shinpad-merah.jpg"
import shinpadMerah2 from "../assets/product/shinpad-merah2.jpg"
import tasOsh from "../assets/product/tas-osh.jpg"
import tasOsh2 from "../assets/product/tas-osh2.jpg"
import tasOsh3 from "../assets/product/tas-osh3.jpg"
import tegiOsh from "../assets/product/tegi-osh.jpg"

const dataDetailProduct = [
  {
    id: 1,
    name: "Tegi OSH",
    type: "Uniform",
    variants: [
      { size: "3S", stock: 2, price: "Rp 110.000" },
      { size: "2S", stock: 3, price: "Rp 110.000" },
      { size: "S", stock: 5, price: "Rp 115.000" },
      { size: "M", stock: 4, price: "Rp 120.000" },
      { size: "L", stock: 6, price: "Rp 125.000" },
      { size: "XL", stock: 6, price: "Rp 130.000" },
      { size: "XXL", stock: 6, price: "Rp 135.000" },
      { size: "XXXL", stock: 6, price: "Rp 140.000" },
    ],
    image: tegiOsh,
  },
  {
    id: 2,
    name: "Hand Pro Merah",
    type: "Protective",
    variants: [
      { size: "S", stock: 1, price: "Rp 100.000" },
      { size: "M", stock: 1, price: "Rp 100.000" },
      { size: "L", stock: 3, price: "Rp 100.000" },
      { size: "XL", stock: 2, price: "Rp 100.000" },
    ],
    image: gloveMerah,
  },
  {
    id: 3,
    name: "Hand Pro Biru",
    type: "Protective",
    variants: [
      { size: "S", stock: 1, price: "Rp 100.000" },
      { size: "M", stock: 0, price: "Rp 100.000" },
      { size: "L", stock: 2, price: "Rp 100.000" },
      { size: "XL", stock: 2, price: "Rp 100.000" },
    ],
    image: gloveBiru,
  },
  {
    id: 4,
    name: "Shinpadd OSH Merah",
    type: "Protective",
    variants: [
      { size: "S", stock: 0, price: "Rp 200.000" },
      { size: "M", stock: 0, price: "Rp 200.000" },
      { size: "L", stock: 1, price: "Rp 200.000" },
      { size: "XL", stock: 3, price: "Rp 200.000" },
    ],
    image: [shinpadMerah2, shinpadMerah,],
  },
  {
    id: 5,
    name: "Shinpadd OSH Biru",
    type: "Protective",
    variants: [
      { size: "S", stock: 0, price: "Rp 200.000" },
      { size: "M", stock: 0, price: "Rp 200.000" },
      { size: "L", stock: 3, price: "Rp 200.000" },
      { size: "XL", stock: 5, price: "Rp 200.000" },
    ],
    image: shinpadBiru,
  },
  {
    id: 6,
    name: "Karate Belt",
    type: "Accessories",
    variants: [
      { color: "Black", stock: 1, price: "Rp 30.000" },
      { color: "White", stock: 1, price: "Rp 30.000" },
      { color: "Red", stock: 1, price: "Rp 30.000" },
      { color: "Blue", stock: 1, price: "Rp 30.000" },
      { color: "Green", stock: 1, price: "Rp 30.000" },
      { color: "Brown", stock: 1, price: "Rp 30.000" },
      { color: "Dark Blue", stock: 19, price: "Rp 30.000" },
    ],
    image: [sabukHitam, sabukCoklat, sabukHijau, sabukMerahBiru, sabukPutih,],
  },
  {
    id: 7,
    name: "Gumshield Anak",
    type: "Protective",
    variants: [{ size: "Kids", stock: 2, price: "Rp 35.000" }],
    image: gumshield,
  },
  {
    id: 8,
    name: "Tas OSH",
    type: "Bags",
    variants: [{ size: "All Size", stock: 9, price: "Rp 300.000" }],
    image: [tasOsh,tasOsh2, tasOsh3],
  },
  {
    id: 9,
    name: "Body Pro OSH",
    type: "Protective",
    variants: [
      { size: "S", stock: 1, price: "Rp 200.000" },
      { size: "M", stock: 1, price: "Rp 200.000" },
      { size: "L", stock: 8, price: "Rp 200.000" },
      { size: "XL", stock: 0, price: "Rp 200.000" },
    ],
    image: bodyOsh,
  },
];

export default dataDetailProduct;
