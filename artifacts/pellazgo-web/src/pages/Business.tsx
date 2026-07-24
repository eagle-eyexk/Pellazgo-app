import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { useAuth, ProtectedRoute } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { products } from "@/data/products";
import { ShoppingBag, Briefcase, FileText, Settings, LogOut, Package } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

function BusinessContent() {
  const { user, logout } = useAuth();
  const { t, lang } = useLanguage();
  const [, setLocation] = useLocation();
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState("overview");

  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const allOrders = JSON.parse(localStorage.getItem("pellazgo_orders") || "[]");
    if (user) {
      setOrders(allOrders.filter((o: any) => o.userId === user.id));
    }
  }, [user]);

  if (!user) return null;

  if (user.role === 'client') {
    return (
      <div className="min-h-screen bg-background pt-32 pb-24 flex items-center justify-center">
        <div className="bg-card border border-primary/20 p-12 max-w-xl text-center">
          <Briefcase className="w-12 h-12 text-primary mx-auto mb-6" />
          <h1 className="font-serif text-3xl text-primary mb-4 uppercase">{t("Aplikim për Biznes", "Business Application")}</h1>
          <p className="text-muted-foreground mb-8">
            Pellazgo ofron çmime speciale B2B për partnerë, hotele dhe butikë. Plotësoni formularin më poshtë për të kthyer llogarinë tuaj në llogari biznesi.
          </p>
          <form onSubmit={(e) => { e.preventDefault(); toast.success("Aplikimi u dërgua me sukses!"); setLocation("/account"); }} className="space-y-6 text-left">
             <input type="text" placeholder="Emri i Kompanisë" required className="w-full bg-transparent border-b border-primary/30 py-3 text-primary focus:border-primary outline-none" />
             <input type="text" placeholder="NIPT" required className="w-full bg-transparent border-b border-primary/30 py-3 text-primary focus:border-primary outline-none" />
             <textarea placeholder="Mesazhi / Sasia e pritur mujore" rows={3} className="w-full bg-transparent border-b border-primary/30 py-3 text-primary focus:border-primary outline-none resize-none"></textarea>
             <button type="submit" className="w-full bg-primary text-background py-4 uppercase tracking-widest text-xs hover:bg-accent transition-colors">
               Dërgo Aplikimin
             </button>
          </form>
        </div>
      </div>
    );
  }

  if (!user.isApproved) {
     return (
       <div className="min-h-screen bg-background pt-32 pb-24 flex items-center justify-center">
        <div className="bg-card border border-primary/20 p-12 max-w-xl text-center">
          <Briefcase className="w-12 h-12 text-primary mx-auto mb-6" />
          <h1 className="font-serif text-3xl text-primary mb-4 uppercase">Aplikimi në Shqyrtim</h1>
          <p className="text-muted-foreground">
            Llogaria juaj e biznesit ({user.company}) po shqyrtohet nga stafi ynë. Do të njoftoheni sapo të aprovohet për të parë çmimet B2B.
          </p>
        </div>
       </div>
     );
  }

  // Dashboard for approved businesses
  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-primary/60 mb-2">B2B Portal</p>
            <h1 className="font-serif text-4xl text-primary tracking-widest uppercase mb-2">{user.company}</h1>
            <p className="text-muted-foreground">NIPT: {user.vatNumber}</p>
          </div>
          <div className="bg-primary/10 border border-primary/30 px-4 py-2 flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]"></div>
             <span className="text-[10px] uppercase tracking-widest text-primary">Status: Aprovuar</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <div className="w-full lg:w-64 space-y-2 flex-shrink-0">
            {[
              { id: "overview", icon: Briefcase, label: "Përmbledhje" },
              { id: "catalog", icon: ShoppingBag, label: "Katalogu B2B" },
              { id: "orders", icon: Package, label: "Porositë B2B" },
              { id: "profile", icon: Settings, label: "Profili i Biznesit" }
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
              Dil
            </button>
          </div>

          {/* Content */}
          <div className="flex-1">
             {activeTab === "overview" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                      <div className="bg-card border border-primary/20 p-6">
                         <p className="text-[10px] uppercase tracking-widest text-primary/60 mb-2">Total Porosi</p>
                         <p className="font-serif text-3xl text-primary">{orders.length}</p>
                      </div>
                      <div className="bg-card border border-primary/20 p-6">
                         <p className="text-[10px] uppercase tracking-widest text-primary/60 mb-2">Shpenzuar</p>
                         <p className="font-serif text-3xl text-primary">€{orders.reduce((acc, o) => acc + o.total, 0)}</p>
                      </div>
                      <div className="bg-primary/10 border border-primary/30 p-6">
                         <p className="text-[10px] uppercase tracking-widest text-primary/80 mb-2">Kursyer (B2B)</p>
                         <p className="font-serif text-3xl text-primary">~30%</p>
                      </div>
                   </div>
                   
                   <h2 className="font-serif text-2xl text-primary mb-6">Porositë e Fundit</h2>
                   {orders.length === 0 ? (
                      <p className="text-muted-foreground bg-card border border-primary/20 p-6 text-center">Asnjë porosi e gjetur.</p>
                   ) : (
                      <div className="bg-card border border-primary/20 overflow-hidden">
                         <table className="w-full text-left">
                            <thead className="border-b border-primary/20 bg-background/50">
                               <tr>
                                  <th className="p-4 text-[10px] uppercase tracking-widest text-primary">ID</th>
                                  <th className="p-4 text-[10px] uppercase tracking-widest text-primary">Data</th>
                                  <th className="p-4 text-[10px] uppercase tracking-widest text-primary">Total</th>
                                  <th className="p-4 text-[10px] uppercase tracking-widest text-primary">Status</th>
                               </tr>
                            </thead>
                            <tbody>
                               {orders.slice(0,5).map(o => (
                                  <tr key={o.id} className="border-b border-primary/10">
                                     <td className="p-4 text-sm font-serif text-primary">#{o.id}</td>
                                     <td className="p-4 text-sm text-muted-foreground">{new Date(o.createdAt).toLocaleDateString()}</td>
                                     <td className="p-4 text-sm text-primary font-bold">€{o.total}</td>
                                     <td className="p-4">
                                        <span className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded ${o.status === 'delivered' ? 'bg-green-500/20 text-green-500' : 'bg-primary/20 text-primary'}`}>
                                          {o.status}
                                        </span>
                                     </td>
                                  </tr>
                               ))}
                            </tbody>
                         </table>
                      </div>
                   )}
                </motion.div>
             )}

             {activeTab === "catalog" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {products.map(p => (
                         <div key={p.id} className="bg-card border border-primary/20 flex flex-col group">
                            <Link href={`/product/${p.id}`} className="block relative aspect-square overflow-hidden bg-muted/20 border-b border-primary/20">
                               <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                               <div className="absolute top-2 left-2 bg-primary text-background text-[10px] uppercase tracking-widest px-2 py-1">
                                 B2B
                               </div>
                            </Link>
                            <div className="p-4 flex flex-col flex-grow">
                               <h3 className="font-serif text-lg text-primary truncate mb-2">{p.name}</h3>
                               <div className="flex justify-between items-end mb-4">
                                  <div>
                                     <p className="text-xs text-muted-foreground line-through">Retail: €{p.price}</p>
                                     <p className="font-serif text-xl text-primary font-bold">€{p.wholesalePrice}</p>
                                  </div>
                                  <p className="text-[10px] text-green-500 bg-green-500/10 px-2 py-1">- {Math.round((1 - p.wholesalePrice/p.price)*100)}%</p>
                               </div>
                               <button 
                                 onClick={() => {
                                    addToCart({ productId: p.id, name: p.name + " (B2B)", price: p.wholesalePrice, image: p.image, quantity: 5 });
                                    toast.success("Shtuar 5 copë në shportë");
                                 }}
                                 className="w-full mt-auto py-2 bg-primary/10 text-primary border border-primary/30 text-xs uppercase tracking-widest hover:bg-primary hover:text-background transition-colors"
                               >
                                 Shto min. 5 copë
                               </button>
                            </div>
                         </div>
                      ))}
                   </div>
                </motion.div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Business() {
  return (
    <ProtectedRoute roles={["client", "business", "admin"]}>
      <BusinessContent />
    </ProtectedRoute>
  );
}
