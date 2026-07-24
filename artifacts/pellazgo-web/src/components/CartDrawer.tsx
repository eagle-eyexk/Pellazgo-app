import { useState } from "react";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { Link } from "wouter";
import { toast } from "sonner";

export function CartDrawer() {
  const { isOpen, setIsOpen, items, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const { t } = useLanguage();
  const { user } = useAuth();
  
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "form" | "success">("cart");
  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(0);

  const applyPromo = () => {
    if (promo === "PELLAZGO10") {
      setDiscount(0.1);
      toast.success(t("Promo u aplikua", "Promo applied"));
    } else {
      toast.error(t("Kodi i gabuar", "Invalid code"));
      setDiscount(0);
    }
  };

  const finalTotal = cartTotal * (1 - discount);

  const submitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData(e.target as HTMLFormElement);
    
    const orders = JSON.parse(localStorage.getItem("pellazgo_orders") || "[]");
    orders.push({
      id: Math.floor(Math.random()*100000).toString(),
      userId: user?.id || "guest",
      userName: fd.get("name") as string,
      userEmail: fd.get("email") as string,
      items: items,
      total: finalTotal,
      status: "pending",
      createdAt: new Date().toISOString(),
      shippingAddress: fd.get("address") as string,
      notes: fd.get("notes") as string,
      isWholesale: user?.role === "business"
    });
    localStorage.setItem("pellazgo_orders", JSON.stringify(orders));
    
    setCheckoutStep("success");
    clearCart();
  };

  const closeDrawer = () => {
    setIsOpen(false);
    setTimeout(() => {
      setCheckoutStep("cart");
    }, 500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            onClick={closeDrawer}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-background border-l border-primary/20 shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-primary/20 flex items-center justify-between">
              <h2 className="font-serif text-2xl tracking-widest text-primary uppercase">
                {checkoutStep === "cart" ? t("Shporta Juaj", "Your Cart") : checkoutStep === "form" ? t("Përfundo Blerjen", "Checkout") : "Success"}
              </h2>
              <button 
                onClick={closeDrawer}
                className="p-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {checkoutStep === "cart" && (
                <div className="p-6 h-full flex flex-col">
                  {items.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                      <ShoppingBag className="w-16 h-16 text-primary/30" />
                      <div className="space-y-2">
                        <p className="font-serif text-xl text-primary">{t("Shporta është bosh.", "Your cart is empty.")}</p>
                        <p className="text-muted-foreground">{t("Zbuloni artin e aromës.", "Discover the art of scent.")}</p>
                      </div>
                      <Link href="/shop" onClick={closeDrawer}>
                        <span className="inline-block mt-4 border border-primary text-primary px-8 py-3 uppercase tracking-widest text-sm hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                          {t("Kthehu në Dyqan", "Explore Collection")}
                        </span>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-8 flex-1">
                      {items.map((item) => (
                        <div key={item.productId} className="flex gap-4">
                          <div className="w-24 h-32 bg-muted/20 flex-shrink-0 border border-primary/20">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-start">
                                <h3 className="font-serif text-lg text-primary leading-tight">{item.name}</h3>
                                <button 
                                  onClick={() => removeFromCart(item.productId)}
                                  className="text-muted-foreground hover:text-destructive transition-colors ml-2"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                              <p className="font-serif text-muted-foreground mt-1">€{item.price}</p>
                            </div>
                            <div className="flex items-center gap-4 mt-4">
                              <div className="flex items-center border border-primary/30">
                                <button 
                                  onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                  className="p-2 text-primary hover:bg-primary/10 transition-colors"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="w-8 text-center text-sm font-serif">{item.quantity}</span>
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
              )}

              {checkoutStep === "form" && (
                <div className="p-6">
                  <button onClick={() => setCheckoutStep("cart")} className="text-xs uppercase tracking-widest text-primary mb-6 hover:underline">← {t("Kthehu mbrapa", "Back to cart")}</button>
                  <form id="checkoutForm" onSubmit={submitOrder} className="space-y-6">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-primary/60 mb-2">{t("Emri", "Name")}</label>
                      <input name="name" defaultValue={user?.name} required className="w-full bg-transparent border-b border-primary/30 py-3 text-primary outline-none focus:border-primary" />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-primary/60 mb-2">Email</label>
                      <input name="email" type="email" defaultValue={user?.email} required className="w-full bg-transparent border-b border-primary/30 py-3 text-primary outline-none focus:border-primary" />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-primary/60 mb-2">{t("Adresa", "Address")}</label>
                      <input name="address" defaultValue={user?.address} required className="w-full bg-transparent border-b border-primary/30 py-3 text-primary outline-none focus:border-primary" />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-primary/60 mb-2">{t("Metoda e Pagesës", "Payment Method")}</label>
                      <select required className="w-full bg-card border border-primary/30 py-3 px-3 text-primary outline-none focus:border-primary">
                        <option value="bank">Transfertë Bankare / Bank Transfer</option>
                        <option value="card">Kartë / Credit Card</option>
                        <option value="cash">Paguaj në Dorëzim / Cash on Delivery</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-primary/60 mb-2">{t("Shënime", "Notes")}</label>
                      <textarea name="notes" rows={2} className="w-full bg-transparent border-b border-primary/30 py-3 text-primary outline-none focus:border-primary resize-none"></textarea>
                    </div>
                  </form>
                </div>
              )}

              {checkoutStep === "success" && (
                <div className="p-6 h-full flex flex-col items-center justify-center text-center space-y-6">
                   <div className="w-16 h-16 rounded-full border-2 border-primary flex items-center justify-center text-primary mb-4">
                     ✓
                   </div>
                   <h2 className="font-serif text-3xl text-primary">{t("Porosia u konfirmua", "Order Confirmed")}</h2>
                   <p className="text-muted-foreground">{t("Ju falenderojmë për besimin. Ekipi ynë do t'ju kontaktojë së shpejti.", "Thank you for your trust. Our team will contact you shortly.")}</p>
                   <button onClick={closeDrawer} className="mt-8 border border-primary text-primary px-8 py-3 uppercase tracking-widest text-sm hover:bg-primary hover:text-background transition-colors">
                     Mbyll
                   </button>
                </div>
              )}
            </div>

            {items.length > 0 && checkoutStep !== "success" && (
              <div className="border-t border-primary/20 p-6 space-y-6 bg-card">
                {checkoutStep === "cart" && (
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Promo Code" 
                      value={promo}
                      onChange={(e) => setPromo(e.target.value)}
                      className="bg-transparent border border-primary/30 px-4 py-2 flex-1 text-sm outline-none focus:border-primary uppercase placeholder:normal-case"
                    />
                    <button onClick={applyPromo} className="bg-primary/10 text-primary border border-primary/30 px-4 py-2 text-xs uppercase tracking-widest hover:bg-primary hover:text-background transition-colors">Apply</button>
                  </div>
                )}
                
                <div className="space-y-2">
                   <div className="flex justify-between items-center font-serif text-lg text-muted-foreground">
                     <span>Subtotal</span>
                     <span>€{cartTotal}</span>
                   </div>
                   {discount > 0 && (
                     <div className="flex justify-between items-center font-serif text-lg text-green-500">
                       <span>Discount (10%)</span>
                       <span>-€{cartTotal * discount}</span>
                     </div>
                   )}
                   <div className="flex justify-between items-center font-serif text-2xl text-primary pt-4 border-t border-primary/20">
                     <span>Total</span>
                     <span>€{finalTotal}</span>
                   </div>
                </div>

                <p className="text-[10px] uppercase tracking-widest text-muted-foreground text-center">{t("Dërgesa llogaritet falas", "Complimentary shipping included")}</p>
                
                {checkoutStep === "cart" ? (
                  <button 
                    onClick={() => setCheckoutStep("form")}
                    className="w-full bg-primary text-primary-foreground py-4 uppercase tracking-widest text-sm hover:bg-accent hover:text-background transition-colors"
                  >
                    {t("Përfundo", "Checkout")}
                  </button>
                ) : (
                  <button 
                    type="submit"
                    form="checkoutForm"
                    className="w-full bg-primary text-primary-foreground py-4 uppercase tracking-widest text-sm hover:bg-accent hover:text-background transition-colors"
                  >
                    {t("Konfirmo Porosinë", "Confirm Order")}
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
