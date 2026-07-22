import { useState, useEffect } from "react";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { ChevronRight, Minus, Plus } from "lucide-react";

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("100ml");

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

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

  const relatedProducts = products.filter(p => p.id !== id && p.category === product.category).slice(0, 3);
  // Fallback if not enough related
  if (relatedProducts.length < 3) {
    relatedProducts.push(...products.filter(p => p.id !== id && !relatedProducts.includes(p)).slice(0, 3 - relatedProducts.length));
  }

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: `${product.name} (${selectedSize})`,
      price: product.price,
      image: product.image,
      quantity
    });
  };

  return (
    <div className="min-h-screen pt-24 bg-background">
      {/* Breadcrumb */}
      <div className="container mx-auto px-6 py-6 flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
        <Link href="/"><span className="hover:text-primary transition-colors cursor-pointer">Home</span></Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/shop"><span className="hover:text-primary transition-colors cursor-pointer">Shop</span></Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-primary">{product.name}</span>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Image Gallery */}
          <div className="relative group overflow-hidden border border-primary/20 bg-muted/10 h-[60vh] lg:h-[80vh]">
            <motion.img 
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Product Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col pt-4"
          >
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">{product.category}</p>
            <h1 className="font-serif text-5xl md:text-6xl text-primary tracking-widest mb-6">{product.name}</h1>
            <p className="font-serif text-3xl mb-8">${product.price}</p>
            
            <p className="text-foreground/80 leading-relaxed font-light mb-12 text-lg">
              {product.description}
            </p>

            <div className="space-y-8 mb-12 border-y border-primary/20 py-8">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-primary mb-2">Top Notes</h4>
                  <p className="text-sm text-muted-foreground">{product.topNotes.join(" • ")}</p>
                </div>
                <div className="border-x border-primary/20">
                  <h4 className="text-xs uppercase tracking-widest text-primary mb-2">Heart Notes</h4>
                  <p className="text-sm text-muted-foreground">{product.heartNotes.join(" • ")}</p>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-primary mb-2">Base Notes</h4>
                  <p className="text-sm text-muted-foreground">{product.baseNotes.join(" • ")}</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Select Size</h4>
              <div className="flex gap-4">
                {["50ml", "100ml"].map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-8 py-3 border text-sm uppercase tracking-widest transition-colors ${
                      selectedSize === size 
                        ? "border-primary bg-primary/5 text-primary" 
                        : "border-primary/30 text-muted-foreground hover:border-primary/60"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center border border-primary justify-between px-4 h-14 sm:w-32">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-primary hover:text-accent transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-lg font-serif">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-primary hover:text-accent transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-primary text-primary-foreground h-14 uppercase tracking-widest text-sm hover:bg-accent hover:text-background transition-colors"
              >
                Add to Cart
              </button>
            </div>
            
            <div className="mt-12 space-y-4 text-xs uppercase tracking-widest text-muted-foreground border-t border-primary/20 pt-8">
              <p>• Complimentary shipping on all orders</p>
              <p>• Includes 2 samples with every purchase</p>
              <p>• Secure and elegant packaging</p>
            </div>

          </motion.div>

        </div>
      </div>

      {/* Related Products */}
      <div className="bg-card py-24 mt-24 border-t border-primary/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl text-primary tracking-widest mb-4">YOU MAY ALSO DESIRE</h2>
            <div className="w-16 h-px bg-primary/50 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProducts.map(p => (
              <div key={p.id} className="group cursor-pointer">
                <Link href={`/product/${p.id}`}>
                  <div className="aspect-[4/5] bg-muted overflow-hidden mb-6 border border-primary/20">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-serif text-xl text-primary mb-2">{p.name}</h3>
                    <p className="text-sm uppercase tracking-widest text-muted-foreground">${p.price}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
