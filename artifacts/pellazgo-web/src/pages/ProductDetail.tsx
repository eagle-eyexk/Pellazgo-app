import { useState, useEffect } from "react";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { ChevronRight, Minus, Plus, Heart, Share2 } from "lucide-react";
import { toast } from "sonner";

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const { addToCart } = useCart();
  const { t, lang } = useLanguage();
  const { user, addToWishlist, removeFromWishlist, isInWishlist } = useAuth();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<number>(100);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (product && product.ml.length > 0) {
      setSelectedSize(product.ml[0]);
    }
  }, [id, product]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <div>
          <h1 className="font-serif text-4xl text-primary mb-4">Fragrance Not Found</h1>
          <Link href="/shop">
            <span className="border-b border-primary text-primary pb-1 hover:text-accent transition-colors">Return to Boutique</span>
          </Link>
        </div>
      </div>
    );
  }

  const isBusiness = user?.role === "business";
  const displayPrice = isBusiness ? product.wholesalePrice : product.price;

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: `${lang === 'sq' ? product.nameSq : product.name} (${selectedSize}ml)`,
      price: displayPrice,
      image: product.image,
      quantity
    });
    toast.success(t("Shtuar në shportë", "Added to cart"));
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success(t("Linku u kopjua", "Link copied to clipboard"));
  };

  return (
    <div className="min-h-screen pt-24 bg-background pb-32">
      {/* Breadcrumb */}
      <div className="container mx-auto px-6 py-6 flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground border-b border-primary/10 mb-8">
        <Link href="/"><span className="hover:text-primary transition-colors cursor-pointer">{t("Kreu", "Home")}</span></Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/shop"><span className="hover:text-primary transition-colors cursor-pointer">{t("Dyqani", "Shop")}</span></Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-primary">{lang === 'sq' ? product.nameSq : product.name}</span>
      </div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Image Gallery */}
          <div className="relative group overflow-hidden border border-primary/20 bg-muted/10 h-[60vh] lg:h-[80vh] sticky top-32">
            <motion.img 
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover object-center mix-blend-luminosity hover:mix-blend-normal transition-all duration-1000"
            />
            <div className="absolute top-6 right-6 flex flex-col gap-4">
               <button 
                  onClick={() => isInWishlist(product.id) ? removeFromWishlist(product.id) : addToWishlist(product.id)}
                  className="p-3 bg-background/50 backdrop-blur-md rounded-full border border-primary/20 text-primary hover:bg-primary hover:text-background transition-colors"
                >
                  <Heart className="w-5 h-5" fill={isInWishlist(product.id) ? "currentColor" : "none"} />
               </button>
               <button 
                  onClick={handleShare}
                  className="p-3 bg-background/50 backdrop-blur-md rounded-full border border-primary/20 text-primary hover:bg-primary hover:text-background transition-colors"
                >
                  <Share2 className="w-5 h-5" />
               </button>
            </div>
          </div>

          {/* Product Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col pt-4"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-primary/60 mb-3">{product.category}</p>
                <h1 className="font-serif text-5xl md:text-6xl text-primary tracking-widest uppercase">
                  {lang === 'sq' ? product.nameSq : product.name}
                </h1>
              </div>
            </div>

            <div className="mb-8 border-b border-primary/20 pb-8">
              {isBusiness ? (
                <div className="space-y-2">
                  <p className="font-serif text-4xl text-primary">€{product.wholesalePrice} <span className="text-sm font-sans uppercase tracking-widest text-muted-foreground ml-2">B2B Price</span></p>
                  <p className="text-lg text-muted-foreground line-through">Retail: €{product.price}</p>
                </div>
              ) : (
                <p className="font-serif text-4xl text-primary">€{product.price}</p>
              )}
              
              <div className="mt-4 flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <div className={`w-2 h-2 rounded-full ${product.stock > 10 ? 'bg-green-500' : product.stock > 0 ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">
                    {product.stock > 10 ? t("Në Gjendje", "In Stock") : product.stock > 0 ? t("Sasi e Kufizuar", "Low Stock") : t("E Shitur", "Out of Stock")}
                  </span>
                </div>
              </div>
            </div>
            
            <p className="text-foreground/80 leading-relaxed font-light mb-12 text-lg text-justify">
              {lang === 'sq' ? product.descriptionSq : product.description}
            </p>

            {/* Notes Pyramid */}
            <div className="space-y-8 mb-12 border-y border-primary/20 py-8 bg-card/50">
              <h4 className="text-center font-serif text-2xl text-primary tracking-widest mb-8">{t("Piramida Olfaktive", "Olfactory Pyramid")}</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-primary/20">
                <div className="pt-4 md:pt-0">
                  <h4 className="text-[10px] uppercase tracking-widest text-primary/60 mb-3">{t("Notat e Kokës", "Top Notes")}</h4>
                  <p className="text-sm text-primary font-serif italic">{product.topNotes.join(" • ")}</p>
                </div>
                <div className="pt-4 md:pt-0">
                  <h4 className="text-[10px] uppercase tracking-widest text-primary/60 mb-3">{t("Notat e Zemrës", "Heart Notes")}</h4>
                  <p className="text-sm text-primary font-serif italic">{product.heartNotes.join(" • ")}</p>
                </div>
                <div className="pt-4 md:pt-0">
                  <h4 className="text-[10px] uppercase tracking-widest text-primary/60 mb-3">{t("Notat e Bazës", "Base Notes")}</h4>
                  <p className="text-sm text-primary font-serif italic">{product.baseNotes.join(" • ")}</p>
                </div>
              </div>
            </div>

            <div className="mb-10">
              <h4 className="text-[10px] uppercase tracking-widest text-muted-foreground mb-4">{t("Madhësia", "Select Size")}</h4>
              <div className="flex gap-4">
                {product.ml.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-8 py-3 border text-xs uppercase tracking-widest transition-colors ${
                      selectedSize === size 
                        ? "border-primary bg-primary text-background" 
                        : "border-primary/30 text-primary hover:border-primary"
                    }`}
                  >
                    {size}ML
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <div className="flex items-center border border-primary justify-between px-6 h-16 sm:w-40 bg-card">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-primary hover:text-accent transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-xl font-serif text-primary">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-primary hover:text-accent transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button 
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 bg-primary text-primary-foreground h-16 uppercase tracking-widest text-sm hover:bg-accent hover:text-background transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {product.stock === 0 ? t("E Shitur", "Out of Stock") : t("Shto në Shportë", "Add to Cart")}
              </button>
            </div>
            
            <div className="space-y-4 text-[10px] uppercase tracking-widest text-primary/60 border-t border-primary/20 pt-8">
              <p>• {t("Dërgesë falas kudo në Shqipëri", "Complimentary shipping on all orders")}</p>
              <p>• {t("Përfshihen 2 kampione", "Includes 2 samples with every purchase")}</p>
              <p>• {t("Paketim luksoz i personalizuar", "Secure and elegant packaging")}</p>
            </div>

          </motion.div>

        </div>
      </div>
    </div>
  );
}
