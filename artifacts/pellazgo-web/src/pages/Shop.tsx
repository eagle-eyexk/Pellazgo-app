import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  
  const categories = ["All", "Fragrances", "Oud", "Floral", "Oriental", "Woody"];

  const filteredProducts = useMemo(() => {
    if (activeCategory === "All") return products;
    return products.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="min-h-screen flex flex-col pt-32 pb-24 bg-background">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl md:text-6xl text-primary tracking-[0.2em] mb-6 uppercase"
          >
            The Collection
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "100px" }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-px bg-primary mx-auto mb-8"
          />
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            A library of memories. Each composition is a study in texture, emotion, and unparalleled raw materials.
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar / Filters */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="sticky top-32 border border-primary/20 p-8 bg-card">
              <h3 className="font-serif text-xl text-primary tracking-widest mb-8">CATEGORIES</h3>
              <ul className="space-y-4">
                {categories.map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => setActiveCategory(cat)}
                      className={`text-sm tracking-widest uppercase transition-colors flex items-center gap-3 w-full text-left ${
                        activeCategory === cat ? "text-primary" : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full border border-primary transition-colors ${
                        activeCategory === cat ? "bg-primary" : "bg-transparent"
                      }`} />
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
              
              <div className="mt-12 pt-12 border-t border-primary/20">
                <h3 className="font-serif text-xl text-primary tracking-widest mb-6">SERVICES</h3>
                <ul className="space-y-4 text-sm text-muted-foreground">
                  <li className="hover:text-primary transition-colors cursor-pointer">Bespoke Engraving</li>
                  <li className="hover:text-primary transition-colors cursor-pointer">Sample Discovery Set</li>
                  <li className="hover:text-primary transition-colors cursor-pointer">Fragrance Consultation</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
            
            {filteredProducts.length === 0 && (
              <div className="py-32 text-center text-muted-foreground">
                No products found in this category.
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
