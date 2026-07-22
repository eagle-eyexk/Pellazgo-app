import { motion } from "framer-motion";
import { Link } from "wouter";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import heroBg from "@assets/hero_bg.jpg";
import logoUrl from "@assets/pellazgo_logo.jpeg";

export default function Home() {
  const bestSellers = products.slice(0, 6);
  const collections = [
    { name: "The Oud Collection", desc: "Dark, resonant, majestic.", image: products[0].image },
    { name: "Midnight Florals", desc: "Velvety, intoxicating, deep.", image: products[2].image },
    { name: "Sacred Woods", desc: "Spiritual, calm, grounding.", image: products[3].image }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "easeOut" }}
            src={heroBg} 
            alt="Pellazgo Luxury Fragrance" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-background/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
        </div>
        
        <div className="relative z-10 text-center px-6 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-primary tracking-[0.15em] mb-6">
              THE ART OF SCENT
            </h1>
            <p className="font-sans text-muted-foreground text-lg md:text-xl tracking-widest uppercase max-w-2xl mx-auto mb-12">
              Unapologetically opulent. Crafted for the connoisseur.
            </p>
            <Link href="/shop">
              <span className="inline-block border border-primary text-primary px-10 py-4 uppercase tracking-widest text-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-pointer backdrop-blur-sm">
                Discover Collection
              </span>
            </Link>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-primary"
        >
          <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
          <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
        </motion.div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 px-6 bg-background relative">
        <div className="container mx-auto max-w-4xl text-center">
          <img src={logoUrl} alt="Logo" className="w-16 h-16 mx-auto mb-12 rounded-full border border-primary/30 opacity-50" />
          <h2 className="font-serif text-3xl md:text-5xl text-foreground leading-tight mb-8">
            "A fragrance should not merely be worn; it should be experienced. A tactile memory etched in gold and glass."
          </h2>
          <div className="w-12 h-px bg-primary mx-auto"></div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-24 px-6 border-y border-primary/20 bg-background relative overflow-hidden">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="font-serif text-4xl text-primary tracking-widest mb-4">CURATED VISIONS</h2>
              <p className="text-muted-foreground">Explore our definitive fragrance families.</p>
            </div>
            <Link href="/shop">
              <span className="text-sm uppercase tracking-widest text-primary border-b border-primary pb-1 hover:text-accent transition-colors cursor-pointer">
                View All Categories
              </span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {collections.map((col, idx) => (
              <motion.div 
                key={col.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: idx * 0.2, duration: 0.8 }}
                className="group relative h-[600px] overflow-hidden cursor-pointer"
              >
                <img src={col.image} alt={col.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-80" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h3 className="font-serif text-3xl text-primary mb-2">{col.name}</h3>
                  <p className="text-foreground/80 mb-6">{col.desc}</p>
                  <div className="w-0 h-px bg-primary group-hover:w-full transition-all duration-500"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Story */}
      <section className="py-32 px-6 bg-secondary text-center md:text-left relative">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            <h2 className="font-serif text-4xl md:text-5xl text-primary tracking-widest">ATELIER PELLAZGO</h2>
            <div className="w-16 h-px bg-primary hidden md:block"></div>
            <p className="text-lg text-foreground/80 leading-relaxed font-light">
              Born from a desire to bridge the gap between Parisian high fashion and ancient Moroccan olfactory traditions. Pellazgo does not compromise. Every bottle is a testament to unhurried craftsmanship, utilizing the world's most rare and fiercely protected raw materials.
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed font-light">
              We believe true luxury is tactile, emotional, and timeless.
            </p>
            <Link href="/about">
              <span className="inline-block border border-primary text-primary px-8 py-3 uppercase tracking-widest text-sm hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer mt-4">
                Read Our Story
              </span>
            </Link>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="h-[500px] bg-muted relative"
          >
             <img src={heroBg} alt="Atelier" className="w-full h-full object-cover filter grayscale opacity-60 mix-blend-overlay" />
             <div className="absolute inset-0 border-4 border-primary/20 m-6"></div>
          </motion.div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-32 px-6 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-serif text-4xl text-primary tracking-widest mb-6">ICONIC CREATIONS</h2>
            <div className="w-24 h-px bg-primary/50 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center mt-20">
            <Link href="/shop">
              <span className="inline-block border border-primary text-primary px-12 py-4 uppercase tracking-widest text-sm hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                View Full Collection
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-32 px-6 border-t border-primary/20 bg-card relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, var(--color-primary) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        <div className="container mx-auto max-w-2xl text-center relative z-10">
          <h2 className="font-serif text-4xl text-primary tracking-widest mb-6">JOIN THE INNER CIRCLE</h2>
          <p className="text-muted-foreground mb-12">
            Subscribe to receive private invitations to new releases, exclusive olfactory events, and editorial insights.
          </p>
          <form className="flex flex-col md:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 bg-transparent border border-primary/30 px-6 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors rounded-none"
              required
            />
            <button 
              type="submit"
              className="bg-primary text-primary-foreground px-10 py-4 uppercase tracking-widest text-sm hover:bg-accent hover:text-background transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
