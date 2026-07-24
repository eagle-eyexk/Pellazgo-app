import { useState, useMemo } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { Heart, ShoppingBag } from "lucide-react";

export default function Shop() {
  const { t, lang } = useLanguage();
  const { user, addToWishlist, removeFromWishlist, isInWishlist } = useAuth();
  const { addToCart } = useCart();
  const [searchParams] = useLocation();
  
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState<number>(500);

  const categories = ["All", "Oud", "Floral", "Woody", "Oriental", "Citrus", "Aquatic", "Fragrances"];

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchCat = activeCategory === "All" || p.category === activeCategory;
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.nameSq.toLowerCase().includes(search.toLowerCase());
      const matchPrice = p.price <= priceRange;
      return matchCat && matchSearch && matchPrice;
    });
  }, [activeCategory, search, priceRange]);

  const isBusiness = user?.role === "business";

  return (
    <div className="min-h-screen flex flex-col pt-32 pb-24 bg-background">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16 border-b border-primary/20 pb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl md:text-6xl text-primary tracking-[0.2em] mb-6 uppercase"
          >
            {t("Koleksioni", "The Collection")}
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "100px" }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-px bg-primary mx-auto mb-8"
          />
          <input 
            type="text"
            placeholder={t("Kërko një aromë...", "Search for a fragrance...")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md mx-auto bg-transparent border-b border-primary/30 py-3 text-center text-lg text-primary placeholder:text-primary/30 focus:outline-none focus:border-primary transition-colors block"
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Sidebar / Filters */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="sticky top-32 space-y-12">
              <div>
                <h3 className="font-serif text-xl text-primary tracking-widest mb-6 uppercase">{t("Kategoritë", "Categories")}</h3>
                <ul className="space-y-4">
                  {categories.map((cat) => (
                    <li key={cat}>
                      <button
                        onClick={() => setActiveCategory(cat)}
                        className={`text-xs tracking-widest uppercase transition-colors flex items-center gap-3 w-full text-left ${
                          activeCategory === cat ? "text-primary" : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <div className={`w-1.5 h-1.5 rounded-full border border-primary transition-colors ${
                          activeCategory === cat ? "bg-primary" : "bg-transparent"
                        }`} />
                        {cat === "All" ? t("Të gjitha", "All") : cat}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-serif text-xl text-primary tracking-widest mb-6 uppercase">{t("Çmimi Max", "Max Price")}</h3>
                <div className="flex items-center gap-4">
                  <input 
                    type="range" 
                    min="50" max="600" step="10"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full accent-primary"
                  />
                  <span className="text-sm font-serif text-primary">€{priceRange}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="mb-8 flex justify-between items-center text-xs uppercase tracking-widest text-muted-foreground">
              <span>{filteredProducts.length} {t("rezultate", "results")}</span>
            </div>

            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8"
            >
              {filteredProducts.map((product) => (
                <motion.div 
                  key={product.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="group flex flex-col h-full bg-background border border-primary/20 relative"
                >
                  {/* Wishlist Button */}
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      isInWishlist(product.id) ? removeFromWishlist(product.id) : addToWishlist(product.id);
                    }}
                    className="absolute top-4 right-4 z-10 p-2 bg-background/50 backdrop-blur-md rounded-full border border-primary/20 text-primary hover:bg-primary hover:text-background transition-colors"
                  >
                    <Heart className="w-4 h-4" fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                  </button>

                  <Link href={`/product/${product.id}`} className="block overflow-hidden relative aspect-[4/5] bg-muted/20">
                    <img 
                      src={product.image} 
                      alt={lang === 'sq' ? product.nameSq : product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-background/0 group-hover:bg-background/10 transition-colors duration-500" />
                  </Link>
                  
                  <div className="p-6 flex flex-col flex-grow text-center items-center justify-between border-t border-primary/20">
                    <div className="mb-4 w-full">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-2">{product.category}</p>
                      <Link href={`/product/${product.id}`} className="block">
                        <h3 className="font-serif text-xl mb-1 text-primary hover:text-accent transition-colors truncate">
                          {lang === 'sq' ? product.nameSq : product.name}
                        </h3>
                      </Link>
                    </div>
                    
                    <div className="w-full">
                      {isBusiness ? (
                        <div className="flex flex-col items-center mb-4">
                          <p className="font-serif text-lg text-primary">B2B: €{product.wholesalePrice}</p>
                          <p className="text-xs text-muted-foreground line-through">Retail: €{product.price}</p>
                        </div>
                      ) : (
                        <p className="font-serif text-xl mb-4 text-primary">€{product.price}</p>
                      )}
                      
                      <button 
                        onClick={() => addToCart({
                          productId: product.id,
                          name: lang === 'sq' ? product.nameSq : product.name,
                          price: isBusiness ? product.wholesalePrice : product.price,
                          image: product.image,
                          quantity: 1
                        })}
                        className="w-full py-3 border border-primary text-primary text-xs uppercase tracking-widest hover:bg-primary hover:text-background transition-colors flex items-center justify-center gap-2"
                      >
                        <ShoppingBag className="w-4 h-4" /> {t("Shto", "Add")}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            {filteredProducts.length === 0 && (
              <div className="py-32 text-center text-muted-foreground font-serif text-2xl border border-primary/20">
                {t("Nuk u gjet asnjë aromë.", "No fragrances found.")}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
