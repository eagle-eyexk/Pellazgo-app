import { motion } from "framer-motion";
import { toast } from "sonner";

export default function AdminSettings() {
  const save = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Cilësimet u ruajtën me sukses");
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 max-w-3xl">
      <h1 className="font-serif text-3xl text-primary tracking-widest uppercase">Cilësimet e Sistemit</h1>

      <form onSubmit={save} className="space-y-12">
        <div className="bg-card border border-primary/20 p-8 space-y-6">
          <h2 className="font-serif text-xl text-primary border-b border-primary/20 pb-4">Njoftimi në Header</h2>
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-primary/60 mb-2">Teksti SQ</label>
            <input type="text" defaultValue="Dërgesë falas për porosi mbi 150€" className="w-full bg-transparent border-b border-primary/30 py-3 text-primary focus:border-primary outline-none" />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-primary/60 mb-2">Teksti EN</label>
            <input type="text" defaultValue="Free shipping on orders over €150" className="w-full bg-transparent border-b border-primary/30 py-3 text-primary focus:border-primary outline-none" />
          </div>
          <label className="flex items-center gap-3">
             <input type="checkbox" className="accent-primary w-4 h-4" defaultChecked />
             <span className="text-sm text-foreground">Aktivizo Njoftimin</span>
          </label>
        </div>

        <div className="bg-card border border-primary/20 p-8 space-y-6">
          <h2 className="font-serif text-xl text-primary border-b border-primary/20 pb-4">Valuta Baza</h2>
          <select className="w-full bg-background border border-primary/30 py-3 px-4 text-primary focus:border-primary outline-none">
             <option value="EUR">Euro (€)</option>
             <option value="ALL">Lek (ALL)</option>
          </select>
        </div>

        <div className="bg-card border border-primary/20 p-8 space-y-6">
          <h2 className="font-serif text-xl text-primary border-b border-primary/20 pb-4">Mbrojtja dhe Siguria</h2>
          <label className="flex items-center gap-3">
             <input type="checkbox" className="accent-primary w-4 h-4" />
             <span className="text-sm text-foreground">Aktivizo "Maintenance Mode" (Vetëm Admin mund ta shohë faqen)</span>
          </label>
        </div>

        <button type="submit" className="bg-primary text-background px-8 py-4 text-xs uppercase tracking-widest hover:bg-accent transition-colors">
           Ruaj Cilësimet
        </button>
      </form>
    </motion.div>
  );
}
