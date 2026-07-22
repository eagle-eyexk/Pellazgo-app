import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { Link } from "wouter";

export function CartDrawer() {
  const { isOpen, setIsOpen, items, updateQuantity, removeFromCart, cartTotal } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-background border-l border-primary/20 shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-primary/20 flex items-center justify-between">
              <h2 className="font-serif text-2xl tracking-widest text-primary">YOUR CART</h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                  <ShoppingBag className="w-16 h-16 text-primary/30" />
                  <div className="space-y-2">
                    <p className="font-serif text-xl">Your cart is empty.</p>
                    <p className="text-muted-foreground">Discover the art of scent.</p>
                  </div>
                  <Link href="/shop" onClick={() => setIsOpen(false)}>
                    <span className="inline-block mt-4 border border-primary text-primary px-8 py-3 uppercase tracking-widest text-sm hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                      Explore Collection
                    </span>
                  </Link>
                </div>
              ) : (
                <div className="space-y-8">
                  {items.map((item) => (
                    <div key={item.productId} className="flex gap-4">
                      <div className="w-24 h-32 bg-muted/20 flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="font-serif text-lg">{item.name}</h3>
                            <button 
                              onClick={() => removeFromCart(item.productId)}
                              className="text-muted-foreground hover:text-destructive transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="font-serif text-primary mt-1">${item.price}</p>
                        </div>
                        <div className="flex items-center gap-4 mt-4">
                          <div className="flex items-center border border-primary/30">
                            <button 
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                              className="p-2 text-primary hover:bg-primary/10 transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              className="p-2 text-primary hover:bg-primary/10 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-primary/20 p-6 space-y-6 bg-background">
                <div className="flex justify-between items-center font-serif text-xl">
                  <span>Subtotal</span>
                  <span className="text-primary">${cartTotal}</span>
                </div>
                <p className="text-sm text-muted-foreground text-center">Shipping and taxes calculated at checkout.</p>
                <button 
                  onClick={() => {
                    alert("Proceeding to checkout");
                  }}
                  className="w-full bg-primary text-primary-foreground py-4 uppercase tracking-widest text-sm hover:bg-accent transition-colors"
                >
                  Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
