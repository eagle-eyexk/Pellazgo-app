export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
}

import oudRoyaleImg from "@assets/oud_royale.jpg";
import amberNoirImg from "@assets/amber_noir.jpg";
import roseMinuitImg from "@assets/rose_minuit.jpg";
import santalMystiqueImg from "@assets/santal_mystique.jpg";

// The rest of the products use a generated placeholder or reuse
const defaultImg = santalMystiqueImg;

export const products: Product[] = [
  {
    id: "oud-royale",
    name: "Oud Royale",
    price: 380,
    description: "An opulent expression of pure agarwood. Dark, resonant, and unapologetically majestic, wrapped in layers of spiced resin and smoked woods.",
    category: "Oud",
    image: oudRoyaleImg,
    topNotes: ["Saffron", "Black Pepper"],
    heartNotes: ["Cambodian Oud", "Rose Absolute"],
    baseNotes: ["Amber", "Sandalwood"]
  },
  {
    id: "amber-noir",
    name: "Amber Noir",
    price: 245,
    description: "A shadowy embrace of golden amber and charred vanilla. Sensual and warm, an invitation into the depths of a moonless night.",
    category: "Oriental",
    image: amberNoirImg,
    topNotes: ["Bergamot", "Incense"],
    heartNotes: ["Labdanum", "Patchouli"],
    baseNotes: ["Vanilla Absolute", "Tonka Bean"]
  },
  {
    id: "rose-de-minuit",
    name: "Rose de Minuit",
    price: 210,
    description: "A velvety, gothic rose plucked at midnight. Intoxicating and deep, balancing the fragility of petals with the strength of dark woods.",
    category: "Floral",
    image: roseMinuitImg,
    topNotes: ["Plum", "Cardamom"],
    heartNotes: ["Damask Rose", "Violet"],
    baseNotes: ["Patchouli", "Olibanum"]
  },
  {
    id: "santal-mystique",
    name: "Santal Mystique",
    price: 195,
    description: "A spiritual journey through ancient forests. Creamy sandalwood meets wisps of sacred smoke, offering profound serenity.",
    category: "Woody",
    image: santalMystiqueImg,
    topNotes: ["Coriander", "Cypress"],
    heartNotes: ["Mysore Sandalwood", "Cedar"],
    baseNotes: ["Musk", "Vetiver"]
  },
  {
    id: "iris-imperiale",
    name: "Iris Imperiale",
    price: 260,
    description: "The epitome of aristocratic elegance. Powdery and cool, a refined veil of regal florals over a structured base.",
    category: "Floral",
    image: defaultImg,
    topNotes: ["Bergamot", "Carrot Seed"],
    heartNotes: ["Orris Root", "Jasmine"],
    baseNotes: ["Vetiver", "Ambrette"]
  },
  {
    id: "jasmin-dore",
    name: "Jasmin Doré",
    price: 185,
    description: "Sun-drenched blossoms dripping with golden nectar. A luminous and joyful floral that sings with vitality.",
    category: "Floral",
    image: defaultImg,
    topNotes: ["Mandarin", "Neroli"],
    heartNotes: ["Sambac Jasmine", "Ylang-Ylang"],
    baseNotes: ["White Musk", "Honey"]
  },
  {
    id: "vetiver-sombre",
    name: "Vétiver Sombre",
    price: 175,
    description: "Earthy and enigmatic. Roots torn from the soil, refined into a sharp, green masterpiece.",
    category: "Woody",
    image: defaultImg,
    topNotes: ["Grapefruit", "Pink Pepper"],
    heartNotes: ["Haitian Vetiver", "Geranium"],
    baseNotes: ["Oakmoss", "Leather"]
  },
  {
    id: "patchouli-grande",
    name: "Patchouli Grande",
    price: 190,
    description: "A decadent, chocolate-tinged patchouli. Rich, expansive, and eternally glamorous.",
    category: "Oriental",
    image: defaultImg,
    topNotes: ["Bitter Orange", "Cinnamon"],
    heartNotes: ["Indonesian Patchouli", "Cacao"],
    baseNotes: ["Ambergris", "Vanilla"]
  },
  {
    id: "musc-blanc",
    name: "Musc Blanc",
    price: 160,
    description: "Pure, pristine, and intimately close to the skin. A soft whisper of clean sensuality.",
    category: "Fragrances",
    image: defaultImg,
    topNotes: ["Aldehydes", "White Tea"],
    heartNotes: ["White Rose", "Cotton Flower"],
    baseNotes: ["White Musk", "Cashmeran"]
  },
  {
    id: "neroli-lumiere",
    name: "Neroli Lumière",
    price: 155,
    description: "A burst of Mediterranean sunshine. Crisp citrus and blossoming orange trees capture endless summer days.",
    category: "Floral",
    image: defaultImg,
    topNotes: ["Petitgrain", "Lemon"],
    heartNotes: ["Neroli", "Orange Blossom"],
    baseNotes: ["Cedarwood", "Musk"]
  },
  {
    id: "cedre-precieux",
    name: "Cèdre Précieux",
    price: 170,
    description: "The architectural majesty of cedar, polished to perfection. Dry, warming, and distinguished.",
    category: "Woody",
    image: defaultImg,
    topNotes: ["Juniper", "Black Pepper"],
    heartNotes: ["Atlas Cedar", "Nutmeg"],
    baseNotes: ["Labdanum", "Vetiver"]
  },
  {
    id: "encens-sacre",
    name: "Encens Sacré",
    price: 220,
    description: "Plumes of divine incense echoing through high-vaulted ceilings. Mystical, airy, and deeply moving.",
    category: "Oriental",
    image: defaultImg,
    topNotes: ["Elemi", "Clove"],
    heartNotes: ["Frankincense", "Myrrh"],
    baseNotes: ["Oud", "Benzoin"]
  }
];
