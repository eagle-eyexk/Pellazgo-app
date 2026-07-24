import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { useAuth, ProtectedRoute } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { products } from "@/data/products";
import { ShoppingBag, Heart, User as UserIcon, MapPin, Package, LogOut } from "lucide-react";
import { toast } from "sonner";

function AccountContent() {
  const { user, updateProfile, logout, removeFromWishlist } = useAuth();
  const { t, lang } = useLanguage();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("profile");

  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const allOrders = JSON.parse(localStorage.getItem("pellazgo_orders") || "[]");
    if (user) {
      setOrders(allOrders.filter((o: any) => o.userId === user.id));
    }
  }, [user]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("tab")) setActiveTab(params.get("tab") as string);
  }, []);

  if (!user) return null;

  const wishlistedProducts = products.filter(p => user.wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <h1 className="font-serif text-4xl text-primary tracking-widest uppercase mb-4">{t("Llogaria Ime", "My Account")}</h1>
          <p className="text-muted-foreground">{t("Mirësevini", "Welcome back")}, {user.name}</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <div className="w-full lg:w-64 space-y-2 flex-shrink-0">
            {[
              { id: "profile", icon: UserIcon, label: t("Profili", "Profile") },
              { id: "orders", icon: Package, label: t("Porositë", "Orders") },
              { id: "wishlist", icon: Heart, label: t("Lista e Dëshirave", "Wishlist") },
              { id: "addresses", icon: MapPin, label: t("Adresat", "Addresses") }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-4 px-6 py-4 text-xs uppercase tracking-widest transition-colors ${
                  activeTab === tab.id ? "bg-primary text-background" : "bg-card text-primary hover:bg-primary/10 border border-primary/20"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
            <button
              onClick={() => { logout(); setLocation("/"); }}
              className="w-full flex items-center gap-4 px-6 py-4 text-xs uppercase tracking-widest bg-card text-destructive hover:bg-destructive/10 border border-destructive/20 mt-8 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              {t("Dil", "Logout")}
            </button>
          </div>

          {/* Content */}
          <div className="flex-1">
            {activeTab === "profile" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-card border border-primary/20 p-8">
                <h2 className="font-serif text-2xl text-primary mb-8">{t("Të Dhënat Personale", "Personal Details")}</h2>
                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); toast.success(t("Ruajtur", "Saved")); }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-primary/60 mb-2">{t("Emri", "Name")}</label>
                      <input type="text" defaultValue={user.name} className="w-full bg-transparent border-b border-primary/30 py-3 text-primary focus:border-primary outline-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-primary/60 mb-2">Email</label>
                      <input type="email" defaultValue={user.email} disabled className="w-full bg-transparent border-b border-primary/30 py-3 text-primary/50 outline-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-primary/60 mb-2">{t("Telefoni", "Phone")}</label>
                      <input type="tel" defaultValue={user.phone} className="w-full bg-transparent border-b border-primary/30 py-3 text-primary focus:border-primary outline-none" />
                    </div>
                  </div>
                  <button className="bg-primary text-background px-8 py-3 text-xs uppercase tracking-widest mt-6 hover:bg-accent transition-colors">
                    {t("Ruaj Ndryshimet", "Save Changes")}
                  </button>
                </form>
              </motion.div>
            )}

            {activeTab === "orders" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                {orders.length === 0 ? (
                  <div className="bg-card border border-primary/20 p-12 text-center">
                    <Package className="w-12 h-12 text-primary/30 mx-auto mb-4" />
                    <p className="font-serif text-xl text-primary mb-2">{t("Nuk keni asnjë porosi.", "No orders yet.")}</p>
                    <Link href="/shop"><span className="text-sm text-muted-foreground hover:text-primary underline cursor-pointer">{t("Fillo Blerjet", "Start Shopping")}</span></Link>
                  </div>
                ) : (
                  orders.map(order => (
                    <div key={order.id} className="bg-card border border-primary/20 p-6">
                      <div className="flex justify-between items-center mb-6 pb-6 border-b border-primary/10">
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-primary/60">Order #{order.id}</p>
                          <p className="text-sm text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-serif text-xl text-primary">€{order.total}</p>
                          <span className={`text-[10px] uppercase tracking-widest px-3 py-1 rounded-full ${order.status === 'delivered' ? 'bg-green-500/20 text-green-500' : 'bg-primary/20 text-primary'}`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-4">
                        {order.items.map((item: any, i: number) => (
                          <div key={i} className="flex justify-between text-sm">
                            <span className="text-primary">{item.quantity}x {item.name}</span>
                            <span className="text-muted-foreground">€{item.price * item.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </motion.div>
            )}

            {activeTab === "wishlist" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {wishlistedProducts.length === 0 ? (
                  <div className="bg-card border border-primary/20 p-12 text-center">
                    <Heart className="w-12 h-12 text-primary/30 mx-auto mb-4" />
                    <p className="font-serif text-xl text-primary mb-2">{t("Lista juaj është bosh.", "Your wishlist is empty.")}</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistedProducts.map(p => (
                      <div key={p.id} className="bg-card border border-primary/20 p-4 flex flex-col text-center">
                        <Link href={`/product/${p.id}`}>
                          <img src={p.image} alt={p.name} className="w-full aspect-[4/5] object-cover mix-blend-luminosity hover:mix-blend-normal mb-4 border border-primary/10 cursor-pointer" />
                        </Link>
                        <h3 className="font-serif text-lg text-primary mb-1">{lang === 'sq' ? p.nameSq : p.name}</h3>
                        <p className="text-sm text-muted-foreground mb-4">€{p.price}</p>
                        <div className="mt-auto flex gap-2">
                          <button 
                            onClick={() => removeFromWishlist(p.id)}
                            className="flex-1 py-2 border border-destructive text-destructive text-xs uppercase tracking-widest hover:bg-destructive hover:text-white transition-colors"
                          >
                            Hiq
                          </button>
                          <Link href={`/product/${p.id}`} className="flex-1 py-2 bg-primary text-background text-xs uppercase tracking-widest hover:bg-accent transition-colors flex items-center justify-center">
                            Shiko
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === "addresses" && (
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-card border border-primary/20 p-8">
                <h2 className="font-serif text-2xl text-primary mb-8">{t("Adresat", "Saved Addresses")}</h2>
                <div className="border border-primary/20 p-6 bg-background relative">
                   <span className="absolute top-4 right-4 text-[10px] bg-primary text-background px-2 py-1 uppercase tracking-widest">Default</span>
                   <p className="font-serif text-lg text-primary mb-2">{user.name}</p>
                   <p className="text-muted-foreground mb-1">{user.address || t("Nuk keni adresë të ruajtur", "No address saved")}</p>
                   <p className="text-muted-foreground">{user.phone}</p>
                </div>
               </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Account() {
  return (
    <ProtectedRoute roles={["client", "business"]}>
      <AccountContent />
    </ProtectedRoute>
  );
}
