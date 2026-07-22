import { motion } from "framer-motion";
import { Link } from "wouter";
import { products } from "@/data/products";

export function ProductCard({ product }: { product: typeof products[0] }) {
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="group flex flex-col h-full bg-background border border-primary/20"
    >
      <Link href={`/product/${product.id}`} className="block overflow-hidden relative aspect-[4/5] bg-muted/20">
        <motion.img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-background/0 group-hover:bg-background/10 transition-colors duration-500" />
      </Link>
      
      <div className="p-6 flex flex-col flex-grow text-center items-center justify-between border-t border-primary/20">
        <div className="mb-4">
          <Link href={`/product/${product.id}`} className="block">
            <h3 className="font-serif text-xl mb-1 text-primary hover:text-accent transition-colors">{product.name}</h3>
          </Link>
          <p className="text-sm text-muted-foreground uppercase tracking-wider">{product.category}</p>
        </div>
        <p className="font-serif text-lg">${product.price}</p>
      </div>
    </motion.div>
  );
}
