export interface Product {
  id: string;
  name: string;
  nameSq: string;
  price: number;
  wholesalePrice: number;
  description: string;
  descriptionSq: string;
  category: string;
  image: string;
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  stock: number;
  featured: boolean;
  tags: string[];
  ml: number[];
}

import oudRoyaleImg from "@assets/oud_royale.jpg";
import amberNoirImg from "@assets/amber_noir.jpg";
import roseMinuitImg from "@assets/rose_minuit.jpg";
import santalMystiqueImg from "@assets/santal_mystique.jpg";
import prod1 from "@assets/prod_1.jpg";
import prod2 from "@assets/prod_2.jpg";
import prod3 from "@assets/prod_3.jpg";
import prod4 from "@assets/prod_4.jpg";
import prod5 from "@assets/prod_5.jpg";
import prod6 from "@assets/prod_6.jpg";
import prod7 from "@assets/prod_7.jpg";
import prod8 from "@assets/prod_8.jpg";
import prod9 from "@assets/prod_9.jpg";
import prod10 from "@assets/prod_10.jpg";
import prod11 from "@assets/prod_11.jpg";
import prod12 from "@assets/prod_12.jpg";
import prod13 from "@assets/prod_13.jpg";
import prod14 from "@assets/prod_14.jpg";
import prod15 from "@assets/prod_15.jpg";
import prod16 from "@assets/prod_16.jpg";

export const products: Product[] = [
  {
    id: "oud-royale",
    name: "Oud Royale",
    nameSq: "Oud Mbretëror",
    price: 380,
    wholesalePrice: 250,
    description: "An opulent expression of pure agarwood. Dark, resonant, and unapologetically majestic, wrapped in layers of spiced resin and smoked woods.",
    descriptionSq: "Një shprehje e pasur e drurit të agarit. E errët, tingëlluese dhe madhështore pa kompromis, e mbështjellë në shtresa rrëshire pikante dhe drurë të tymosur.",
    category: "Oud",
    image: oudRoyaleImg,
    topNotes: ["Saffron", "Black Pepper"],
    heartNotes: ["Cambodian Oud", "Rose Absolute"],
    baseNotes: ["Amber", "Sandalwood"],
    stock: 50,
    featured: true,
    tags: ["bestseller", "exclusive"],
    ml: [50, 100]
  },
  {
    id: "amber-noir",
    name: "Amber Noir",
    nameSq: "Qelibar i Zi",
    price: 245,
    wholesalePrice: 160,
    description: "A shadowy embrace of golden amber and charred vanilla. Sensual and warm, an invitation into the depths of a moonless night.",
    descriptionSq: "Një përqafim i errët i qelibarit të artë dhe vaniljes së thekur. Sensuale dhe e ngrohtë, një ftesë në thellësitë e një nate pa hënë.",
    category: "Oriental",
    image: amberNoirImg,
    topNotes: ["Bergamot", "Incense"],
    heartNotes: ["Labdanum", "Patchouli"],
    baseNotes: ["Vanilla Absolute", "Tonka Bean"],
    stock: 120,
    featured: false,
    tags: [],
    ml: [50, 100]
  },
  {
    id: "rose-de-minuit",
    name: "Rose de Minuit",
    nameSq: "Trëndafili i Mesnatës",
    price: 210,
    wholesalePrice: 140,
    description: "A velvety, gothic rose plucked at midnight. Intoxicating and deep, balancing the fragility of petals with the strength of dark woods.",
    descriptionSq: "Një trëndafil gotik, i butë, i këputur në mesnatë. Dehës dhe i thellë, duke balancuar brishtësinë e petaleve me forcën e drurëve të errët.",
    category: "Floral",
    image: roseMinuitImg,
    topNotes: ["Plum", "Cardamom"],
    heartNotes: ["Damask Rose", "Violet"],
    baseNotes: ["Patchouli", "Olibanum"],
    stock: 80,
    featured: true,
    tags: ["bestseller"],
    ml: [50, 100]
  },
  {
    id: "santal-mystique",
    name: "Santal Mystique",
    nameSq: "Santal Mistik",
    price: 195,
    wholesalePrice: 130,
    description: "A spiritual journey through ancient forests. Creamy sandalwood meets wisps of sacred smoke, offering profound serenity.",
    descriptionSq: "Një udhëtim shpirtëror nëpër pyje të lashta. Druri i sandalit kremoz takohet me tym të shenjtë, duke ofruar qetësi të thellë.",
    category: "Woody",
    image: santalMystiqueImg,
    topNotes: ["Coriander", "Cypress"],
    heartNotes: ["Mysore Sandalwood", "Cedar"],
    baseNotes: ["Musk", "Vetiver"],
    stock: 45,
    featured: false,
    tags: [],
    ml: [100]
  },
  {
    id: "oud-al-malik",
    name: "Oud Al Malik",
    nameSq: "Oud i Mbretit",
    price: 450,
    wholesalePrice: 300,
    description: "A crown jewel of the collection. The deepest, most aged Oud sourced exclusively for Pellazgo, woven with golden saffron.",
    descriptionSq: "Një xhevahir kurore e koleksionit. Oud-i më i thellë dhe më i vjetëruar siguruar ekskluzivisht për Pellazgo, i endur me shafran të artë.",
    category: "Oud",
    image: prod1,
    topNotes: ["Saffron", "Pink Pepper"],
    heartNotes: ["Aged Assam Oud", "Taif Rose"],
    baseNotes: ["Ambergris", "Musk"],
    stock: 15,
    featured: true,
    tags: ["exclusive", "new"],
    ml: [50]
  },
  {
    id: "qelibar-i-zi",
    name: "Black Amber",
    nameSq: "Qelibar i Zi",
    price: 220,
    wholesalePrice: 145,
    description: "Mysterious and consuming. Black amber resin distilled over slow fires to produce a thick, syrupy and unforgettable aroma.",
    descriptionSq: "Misterioz dhe konsumues. Rrëshirë qelibari i zi distiluar mbi zjarre të ngadalta për të prodhuar një aromë të trashë, si shurup dhe të paharrueshme.",
    category: "Oriental",
    image: prod2,
    topNotes: ["Black Cardamom", "Cinnamon"],
    heartNotes: ["Black Amber", "Myrrh"],
    baseNotes: ["Leather", "Patchouli"],
    stock: 90,
    featured: false,
    tags: [],
    ml: [100]
  },
  {
    id: "jasmin-imperial",
    name: "Jasmin Impérial",
    nameSq: "Jasemin Perandorak",
    price: 230,
    wholesalePrice: 155,
    description: "A cascade of night-blooming jasmine flowers. Head-turning, intensely floral, and grounded by a clean, white musk.",
    descriptionSq: "Një kaskadë lulesh jasemini që çelin natën. Tërheq vëmendjen, intensivisht lulore, dhe e mbështetur në një myshk të pastër e të bardhë.",
    category: "Floral",
    image: prod3,
    topNotes: ["Neroli", "Mandarin"],
    heartNotes: ["Sambac Jasmine", "Tuberose"],
    baseNotes: ["White Musk", "Cedar"],
    stock: 60,
    featured: false,
    tags: [],
    ml: [50, 100]
  },
  {
    id: "dru-i-shenjte",
    name: "Sacred Wood",
    nameSq: "Dru i Shenjtë",
    price: 210,
    wholesalePrice: 140,
    description: "Inspired by the Albanian Alps. Dry woods, pine needles, and crisp mountain air captured in a bottle.",
    descriptionSq: "Frymëzuar nga Alpet Shqiptare. Drurë të thatë, gjethe pishe dhe ajri i pastër malor kapur në një shishe.",
    category: "Woody",
    image: prod4,
    topNotes: ["Juniper", "Pine"],
    heartNotes: ["Cedarwood", "Incense"],
    baseNotes: ["Oakmoss", "Vetiver"],
    stock: 75,
    featured: true,
    tags: ["bestseller"],
    ml: [100]
  },
  {
    id: "signature-pellazgo",
    name: "Signature Pellazgo",
    nameSq: "Firma Pellazgo",
    price: 320,
    wholesalePrice: 210,
    description: "The house signature. A perfectly balanced masterpiece of iris, fine leather, and subtle oud that wears like a tailored suit.",
    descriptionSq: "Firma e shtëpisë. Një kryevepër e balancuar në mënyrë të përsosur prej irisi, lëkure të imët dhe oud të lehtë që mbahet si një kostum i qepur me masë.",
    category: "Fragrances",
    image: prod5,
    topNotes: ["Bergamot", "Angelica"],
    heartNotes: ["Iris", "Leather"],
    baseNotes: ["Oud", "Sandalwood"],
    stock: 40,
    featured: true,
    tags: ["exclusive"],
    ml: [100]
  },
  {
    id: "lumiere-citrus",
    name: "Lumière Citrus",
    nameSq: "Dritë Agrumesh",
    price: 180,
    wholesalePrice: 120,
    description: "A bright, explosive burst of Mediterranean citrus. Uplifting, extremely long-lasting, and effortlessly chic.",
    descriptionSq: "Një shpërthim i ndritshëm dhe eksploziv agrumesh mesdhetare. Ngritës, jashtëzakonisht afatgjatë dhe elegant pa mundim.",
    category: "Citrus",
    image: prod6,
    topNotes: ["Sicilian Lemon", "Bergamot"],
    heartNotes: ["Orange Blossom", "Petitgrain"],
    baseNotes: ["White Musk", "Ambroxan"],
    stock: 100,
    featured: false,
    tags: ["new"],
    ml: [100, 150]
  },
  {
    id: "akull-detar",
    name: "Sea Ice",
    nameSq: "Akull Detar",
    price: 185,
    wholesalePrice: 125,
    description: "The freezing spray of the deep ocean crashing against coastal rocks. Salty, mineral, and wildly refreshing.",
    descriptionSq: "Spërkatja e ngrirë e oqeanit të thellë që përplaset pas shkëmbinjve bregdetarë. E kripur, minerale dhe jashtëzakonisht freskuese.",
    category: "Aquatic",
    image: prod7,
    topNotes: ["Sea Salt", "Calone"],
    heartNotes: ["Seaweed", "Clary Sage"],
    baseNotes: ["Driftwood", "Ambergris"],
    stock: 80,
    featured: false,
    tags: [],
    ml: [50, 100]
  },
  {
    id: "lule-e-nates",
    name: "Night Flower",
    nameSq: "Lule e Natës",
    price: 240,
    wholesalePrice: 160,
    description: "Hypnotic white florals that only release their scent under the moonlight. Intoxicating and dangerously alluring.",
    descriptionSq: "Lule të bardha hipnotike që lëshojnë aromën e tyre vetëm nën dritën e hënës. Dehëse dhe në mënyrë të rrezikshme tërheqëse.",
    category: "Floral",
    image: prod8,
    topNotes: ["Tuberose", "Ylang Ylang"],
    heartNotes: ["Gardenia", "Jasmine"],
    baseNotes: ["Vanilla", "Sandalwood"],
    stock: 55,
    featured: true,
    tags: [],
    ml: [50, 100]
  },
  {
    id: "sandalwood-mystique",
    name: "Sandalwood Mystique",
    nameSq: "Santal Mistik",
    price: 215,
    wholesalePrice: 145,
    description: "Pure Australian sandalwood elevated with delicate spices. A second-skin fragrance that provides comfort all day.",
    descriptionSq: "Dru sandali i pastër australian i lartësuar me erëza delikate. Një aromë lëkure e dytë që ofron rehati gjatë gjithë ditës.",
    category: "Woody",
    image: prod9,
    topNotes: ["Cardamom", "Carrot Seed"],
    heartNotes: ["Australian Sandalwood", "Iris"],
    baseNotes: ["Musk", "Cedar"],
    stock: 110,
    featured: false,
    tags: [],
    ml: [100]
  },
  {
    id: "cypress-noir",
    name: "Cypress Noir",
    nameSq: "Selvi e Errët",
    price: 200,
    wholesalePrice: 135,
    description: "A dark, green forest at twilight. Sharp cypress needles over a bed of damp earth and crushed leaves.",
    descriptionSq: "Një pyll i errët, i gjelbër në muzg. Gjilpëra të mprehta selvie mbi një shtrat toke të lagur dhe gjethe të shtypura.",
    category: "Woody",
    image: prod10,
    topNotes: ["Galbanum", "Black Pepper"],
    heartNotes: ["Cypress", "Pine"],
    baseNotes: ["Vetiver", "Oakmoss"],
    stock: 70,
    featured: false,
    tags: [],
    ml: [100]
  },
  {
    id: "trendafili-i-kurores",
    name: "Crown Rose",
    nameSq: "Trëndafili i Kurorës",
    price: 260,
    wholesalePrice: 175,
    description: "A majestic, unabashedly pure Bulgarian rose. Dewy, fresh, and fit for royalty.",
    descriptionSq: "Një trëndafil bullgar madhështor dhe i pastër. I vesuar, i freskët dhe i përshtatshëm për mbretër.",
    category: "Floral",
    image: prod11,
    topNotes: ["Lychee", "Bergamot"],
    heartNotes: ["Bulgarian Rose", "Peony"],
    baseNotes: ["White Musk", "Cedar"],
    stock: 45,
    featured: false,
    tags: ["bestseller"],
    ml: [50, 100]
  },
  {
    id: "oud-safran",
    name: "Oud Safran",
    nameSq: "Oud me Shafran",
    price: 340,
    wholesalePrice: 225,
    description: "The marriage of the two most expensive ingredients in perfumery. Spicy, metallic saffron melting into thick, animalic oud.",
    descriptionSq: "Martesa e dy përbërësve më të shtrenjtë në parfumeri. Shafran pikant e metalik që shkrihet në oud të trashë e kafshëror.",
    category: "Oud",
    image: prod12,
    topNotes: ["Saffron", "Rose"],
    heartNotes: ["Oud", "Leather"],
    baseNotes: ["Patchouli", "Amber"],
    stock: 30,
    featured: true,
    tags: ["exclusive"],
    ml: [50]
  },
  {
    id: "bergamot-royal",
    name: "Bergamot Royal",
    nameSq: "Bergamot Mbretëror",
    price: 190,
    wholesalePrice: 125,
    description: "The finest Calabrian bergamot, extended by an innovative musk structure to last from morning until night.",
    descriptionSq: "Bergamoti më i mirë kalabrez, i zgjatur nga një strukturë inovative myshku për të zgjatur nga mëngjesi deri në mbrëmje.",
    category: "Citrus",
    image: prod13,
    topNotes: ["Calabrian Bergamot", "Lemon"],
    heartNotes: ["Lavender", "Orange Blossom"],
    baseNotes: ["Ambroxan", "Vetiver"],
    stock: 85,
    featured: false,
    tags: [],
    ml: [100, 150]
  },
  {
    id: "oqean-i-thelle",
    name: "Deep Ocean",
    nameSq: "Oqean i Thellë",
    price: 195,
    wholesalePrice: 130,
    description: "Inky depths and cold currents. A powerful aquatic fragrance with an unexpected woody dry down.",
    descriptionSq: "Thellësi me ngjyrë boje dhe rryma të ftohta. Një aromë e fuqishme detare me një tharje drusore të papritur.",
    category: "Aquatic",
    image: prod14,
    topNotes: ["Marine Notes", "Grapefruit"],
    heartNotes: ["Rosemary", "Water Lily"],
    baseNotes: ["Patchouli", "Incense"],
    stock: 65,
    featured: false,
    tags: [],
    ml: [100]
  },
  {
    id: "edition-limitee-1",
    name: "Edition Limitée Nº1",
    nameSq: "Edicion i Limituar Nº1",
    price: 550,
    wholesalePrice: 380,
    description: "A rare, unrepeatable harvest of absolute iris and pure gold leaf flakes suspended in the parfum. Only 100 bottles made.",
    descriptionSq: "Një korrje e rrallë, e papërsëritshme e irisit absolut dhe fletëve të arit të pastër të pezulluara në parfum. Prodhuar vetëm 100 shishe.",
    category: "Fragrances",
    image: prod15,
    topNotes: ["White Truffle", "Aldehydes"],
    heartNotes: ["Orris Butter", "Jasmine Grandiflorum"],
    baseNotes: ["Ambrette", "Sandalwood"],
    stock: 12,
    featured: true,
    tags: ["exclusive"],
    ml: [50]
  },
  {
    id: "notte-orientale",
    name: "Notte Orientale",
    nameSq: "Natë Orientale",
    price: 250,
    wholesalePrice: 165,
    description: "A bazaar at dusk. Cinnamon, clove, sweet dates and rich resins blending in the warm desert air.",
    descriptionSq: "Një pazar në muzg. Kanellë, karafil, hurma të ëmbla dhe rrëshira të pasura që përzihen në ajrin e ngrohtë të shkretëtirës.",
    category: "Oriental",
    image: prod16,
    topNotes: ["Cinnamon", "Clove"],
    heartNotes: ["Dates", "Plum"],
    baseNotes: ["Benzoin", "Vanilla"],
    stock: 75,
    featured: false,
    tags: [],
    ml: [100]
  }
];

// Re-export products for backward compatibility
export const getAllProducts = () => products;
export const getProductById = (id: string) => products.find(p => p.id === id);
