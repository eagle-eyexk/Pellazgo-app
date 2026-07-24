import { useState } from "react";
import { motion } from "framer-motion";
import { products as initialProducts, Product } from "@/data/products";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState("");

  const filtered = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="font-serif text-3xl text-primary tracking-widest uppercase">Katalogu</h1>
        <button className="bg-primary text-background px-6 py-3 text-xs uppercase tracking-widest hover:bg-accent transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" /> Shto Produkt
        </button>
      </div>

      <input 
        type="text"
        placeholder="Kërko produkt..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full max-w-md bg-transparent border-b border-primary/30 py-3 text-primary focus:outline-none focus:border-primary transition-colors"
      />

      <div className="bg-card border border-primary/20 overflow-x-auto">
        <table className="w-full text-left min-w-[800px]">
          <thead className="border-b border-primary/20 bg-background/50">
            <tr>
              <th className="p-4 text-[10px] uppercase tracking-widest text-primary w-16">Foto</th>
              <th className="p-4 text-[10px] uppercase tracking-widest text-primary">Emri</th>
              <th className="p-4 text-[10px] uppercase tracking-widest text-primary">Kategoria</th>
              <th className="p-4 text-[10px] uppercase tracking-widest text-primary">Retail</th>
              <th className="p-4 text-[10px] uppercase tracking-widest text-primary">B2B</th>
              <th className="p-4 text-[10px] uppercase tracking-widest text-primary">Stoku</th>
              <th className="p-4 text-[10px] uppercase tracking-widest text-primary text-right">Veprime</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id} className="border-b border-primary/10 hover:bg-primary/5 transition-colors">
                <td className="p-4">
                  <div className="w-10 h-12 bg-muted/20">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                </td>
                <td className="p-4">
                  <p className="text-sm font-serif text-primary">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.nameSq}</p>
                </td>
                <td className="p-4 text-sm text-muted-foreground">{p.category}</td>
                <td className="p-4 text-sm text-foreground">€{p.price}</td>
                <td className="p-4 text-sm text-foreground">€{p.wholesalePrice}</td>
                <td className="p-4">
                  <span className={`text-xs ${p.stock < 10 ? 'text-red-500' : 'text-green-500'}`}>{p.stock} copë</span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 text-muted-foreground hover:text-primary transition-colors"><Edit2 className="w-4 h-4" /></button>
                    <button 
                      onClick={() => {
                        if(confirm("Jeni i sigurt?")) {
                          setProducts(products.filter(x => x.id !== p.id));
                          toast.success("Produkti u fshi");
                        }
                      }}
                      className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
