import { useState, useMemo } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "@/data/products";
import hero1 from "@assets/hero_1.jpg";
import hero2 from "@assets/hero_2.jpg";
import hero3 from "@assets/hero_3.jpg";
import hero4 from "@assets/hero_4.jpg";
import hero5 from "@assets/hero_5.jpg";
import hero6 from "@assets/hero_6.jpg";
import logoUrl from "@assets/pellazgo_logo.jpeg";
import { useLanguage } from "@/context/LanguageContext";

const HERO_IMAGES = [
  { src: hero1, headSq: "ARTI I AROMËS", headEn: "THE ART OF SCENT", subSq: "Atelieja jonë e fshehur në Paris.", subEn: "Our hidden Parisian atelier." },
  { src: hero2, headSq: "TRADITË MAROKIENE", headEn: "MOROCCAN HERITAGE", subSq: "Përbërësit më të rrallë në botë.", subEn: "The rarest ingredients in the world." },
  { src: hero3, headSq: "LUKSI PA KOMPROMIS", headEn: "UNCOMPROMISING LUXURY", subSq: "Krijuar për konossuerin.", subEn: "Crafted for the connoisseur." },
  { src: hero4, headSq: "MJESHTËRI E THELLË", headEn: "PROFOUND CRAFTSMANSHIP", subSq: "Çdo pikë është një histori.", subEn: "Every drop is a story." },
  { src: hero5, headSq: "FRYMËZIM NGA ALPET", headEn: "ALPINE INSPIRATION", subSq: "Aromat e egra të maleve tona.", subEn: "The wild scents of our mountains." },
  { src: hero6, headSq: "KRYEVEPRA TË LËNGSHME", headEn: "LIQUID MASTERPIECES", subSq: "Qelq i rëndë, ar i vërtetë.", subEn: "Heavy glass, pure gold." }
];

export default function Home() {
  const { t, lang } = useLanguage();
  const bestSellers = products.filter(p => p.tags.includes("bestseller")).slice(0, 6);
  if (bestSellers.length < 6) bestSellers.push(...products.slice(0, 6 - bestSellers.length));

  const [currentHero, setCurrentHero] = useState(0);

  // Auto-rotate heroes
  useState(() => {
    const timer = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[100dvh] w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentHero}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img 
              src={HERO_IMAGES[currentHero].src} 
              alt="Pellazgo Luxury Fragrance" 
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-background/50" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
          </motion.div>
        </AnimatePresence>
        
        <div className="absolute inset-0 z-10 text-center px-6 flex flex-col items-center justify-center pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentHero}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1 }}
              className="pointer-events-auto"
            >
              <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl text-primary tracking-[0.15em] mb-6 uppercase">
                {lang === 'sq' ? HERO_IMAGES[currentHero].headSq : HERO_IMAGES[currentHero].headEn}
              </h1>
              <p className="font-sans text-foreground/80 text-lg md:text-xl tracking-widest uppercase max-w-2xl mx-auto mb-12">
                {lang === 'sq' ? HERO_IMAGES[currentHero].subSq : HERO_IMAGES[currentHero].subEn}
              </p>
              <Link href="/shop">
                <span className="inline-block border border-primary text-primary px-10 py-4 uppercase tracking-widest text-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-pointer backdrop-blur-md">
                  {t("Zbulo Koleksionin", "Discover Collection")}
                </span>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-primary z-10"
        >
          <span className="text-[10px] uppercase tracking-widest">{t("Lëviz poshtë", "Scroll to explore")}</span>
          <div className="w-px h-16 bg-gradient-to-b from-primary to-transparent" />
        </motion.div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 px-6 bg-background relative border-b border-primary/10">
        <div className="container mx-auto max-w-5xl text-center">
          <img src={logoUrl} alt="Logo" className="w-20 h-20 mx-auto mb-16 rounded-full border border-primary/30 opacity-50" />
          <h2 className="font-serif text-3xl md:text-5xl text-primary leading-snug mb-12 italic">
            "{t('Sipër çdo aromë, ekziston një histori.', 'Above every scent, there is a story.')}"
          </h2>
          <div className="w-16 h-px bg-primary mx-auto"></div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-32 px-6 bg-background relative overflow-hidden">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="font-serif text-4xl text-primary tracking-widest mb-4 uppercase">{t("Koleksione të Zgjedhura", "Curated Visions")}</h2>
              <p className="text-muted-foreground">{t("Eksploroni familjet tona olfaktive.", "Explore our definitive fragrance families.")}</p>
            </div>
            <Link href="/shop">
              <span className="text-xs uppercase tracking-widest text-primary border-b border-primary pb-1 hover:text-accent transition-colors cursor-pointer">
                {t("Shiko të Gjitha", "View All Categories")}
              </span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "Oud", image: products.find(p=>p.category==="Oud")?.image },
              { name: "Floral", image: products.find(p=>p.category==="Floral")?.image },
              { name: "Woody", image: products.find(p=>p.category==="Woody")?.image },
              { name: "Oriental", image: products.find(p=>p.category==="Oriental")?.image }
            ].map((col, idx) => (
              <motion.div 
                key={col.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.8 }}
                className="group relative aspect-[3/4] overflow-hidden border border-primary/20"
              >
                <Link href={`/shop?category=${col.name}`}>
                  <div className="absolute inset-0 cursor-pointer">
                    <img src={col.image} alt={col.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-background/40 group-hover:bg-background/20 transition-colors duration-500" />
                    <div className="absolute inset-0 p-8 flex flex-col justify-end text-center">
                      <h3 className="font-serif text-3xl text-primary mb-4 uppercase tracking-widest">{col.name}</h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-20 border-y border-primary/20 bg-card">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-primary/20">
            <div>
              <p className="font-serif text-4xl text-primary mb-2">52</p>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">{t("Krijime", "Fragrances")}</p>
            </div>
            <div>
              <p className="font-serif text-4xl text-primary mb-2">6</p>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">{t("Vite Traditë", "Years Heritage")}</p>
            </div>
            <div>
              <p className="font-serif text-4xl text-primary mb-2">3</p>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">{t("Kontinente", "Continents")}</p>
            </div>
            <div>
              <p className="font-serif text-4xl text-primary mb-2">10k+</p>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">{t("Klientë", "Clients")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-32 px-6 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-serif text-4xl text-primary tracking-widest mb-6 uppercase">{t("Më të Kërkuarat", "Iconic Creations")}</h2>
            <div className="w-24 h-px bg-primary/50 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {bestSellers.map((product, idx) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="group flex flex-col h-full bg-background border border-primary/20"
              >
                <Link href={`/product/${product.id}`} className="block overflow-hidden relative aspect-[4/5] bg-muted/20">
                  <motion.img 
                    src={product.image} 
                    alt={lang === 'sq' ? product.nameSq : product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 mix-blend-luminosity hover:mix-blend-normal"
                  />
                </Link>
                <div className="p-8 flex flex-col flex-grow text-center items-center justify-between border-t border-primary/20">
                  <div className="mb-6">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-3">{product.category}</p>
                    <Link href={`/product/${product.id}`} className="block">
                      <h3 className="font-serif text-2xl text-primary hover:text-accent transition-colors">
                        {lang === 'sq' ? product.nameSq : product.name}
                      </h3>
                    </Link>
                  </div>
                  <p className="font-serif text-xl text-primary/80">€{product.price}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-20">
            <Link href="/shop">
              <span className="inline-block border border-primary text-primary px-12 py-4 uppercase tracking-widest text-sm hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                {t("Zbulo të Gjitha", "View Full Collection")}
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Instagram Feed Mock */}
      <section className="py-32 px-6 border-t border-primary/20 bg-card">
         <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl text-primary tracking-widest mb-4">@PELLAZGO.AL</h2>
            <p className="text-sm uppercase tracking-widest text-muted-foreground">{t("Na ndiqni", "Follow our journey")}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-1">
            {[hero1, hero2, hero3, hero4, hero5, hero6].map((img, i) => (
              <div key={i} className="aspect-square bg-muted relative group overflow-hidden cursor-pointer">
                <img src={img} alt="Instagram post" className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-110" />
                <div className="absolute inset-0 bg-background/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-primary"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></span>
                </div>
              </div>
            ))}
          </div>
         </div>
      </section>

      {/* Newsletter */}
      <section className="py-32 px-6 border-t border-primary/20 bg-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, var(--color-primary) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        <div className="container mx-auto max-w-2xl text-center relative z-10">
          <h2 className="font-serif text-4xl text-primary tracking-widest mb-6 uppercase">{t("Anëtarësohuni", "Join the Inner Circle")}</h2>
          <p className="text-muted-foreground mb-12">
            {t("Regjistrohuni për të marrë ftesa private për publikime të reja dhe evente olfaktive.", "Subscribe to receive private invitations to new releases and exclusive olfactory events.")}
          </p>
          <form className="flex flex-col md:flex-row gap-4" onSubmit={(e) => { e.preventDefault(); alert('Subscribed!'); }}>
            <input 
              type="email" 
              placeholder={t("Adresa juaj e emailit", "Your email address")} 
              className="flex-1 bg-transparent border border-primary/30 px-6 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors rounded-none"
              required
            />
            <button 
              type="submit"
              className="bg-primary text-primary-foreground px-10 py-4 uppercase tracking-widest text-sm hover:bg-accent hover:text-background transition-colors"
            >
              {t("Dërgo", "Subscribe")}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
