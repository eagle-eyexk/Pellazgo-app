import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function AdminBusinesses() {
  const [biz, setBiz] = useState<any[]>([]);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("pellazgo_users") || "[]");
    setBiz(users.filter((u: any) => u.role === "business"));
  }, []);

  const toggleApproval = (id: string, isApproved: boolean) => {
    const users = JSON.parse(localStorage.getItem("pellazgo_users") || "[]");
    const updatedUsers = users.map((u: any) => u.id === id ? { ...u, isApproved } : u);
    localStorage.setItem("pellazgo_users", JSON.stringify(updatedUsers));
    setBiz(updatedUsers.filter((u: any) => u.role === "business"));
    toast.success(`Biznesi u ${isApproved ? 'aprovua' : 'pezullua'}`);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      <h1 className="font-serif text-3xl text-primary tracking-widest uppercase">Partnerët B2B</h1>

      <div className="bg-card border border-primary/20 overflow-x-auto">
        <table className="w-full text-left min-w-[800px]">
          <thead className="border-b border-primary/20 bg-background/50">
            <tr>
              <th className="p-4 text-[10px] uppercase tracking-widest text-primary">Kompania</th>
              <th className="p-4 text-[10px] uppercase tracking-widest text-primary">NIPT</th>
              <th className="p-4 text-[10px] uppercase tracking-widest text-primary">Përfaqësuesi</th>
              <th className="p-4 text-[10px] uppercase tracking-widest text-primary">Data</th>
              <th className="p-4 text-[10px] uppercase tracking-widest text-primary">Statusi</th>
              <th className="p-4 text-[10px] uppercase tracking-widest text-primary text-right">Veprime</th>
            </tr>
          </thead>
          <tbody>
            {biz.map(b => (
              <tr key={b.id} className="border-b border-primary/10 hover:bg-primary/5 transition-colors">
                <td className="p-4">
                  <p className="text-sm font-serif text-primary">{b.company}</p>
                </td>
                <td className="p-4 text-sm text-foreground">{b.vatNumber}</td>
                <td className="p-4">
                  <p className="text-sm text-foreground">{b.name}</p>
                  <p className="text-xs text-muted-foreground">{b.email}</p>
                </td>
                <td className="p-4 text-sm text-muted-foreground">{new Date(b.createdAt).toLocaleDateString()}</td>
                <td className="p-4">
                  <span className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded ${b.isApproved ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'}`}>
                    {b.isApproved ? 'Aprovuar' : 'Në Pritje'}
                  </span>
                </td>
                <td className="p-4 text-right">
                   {!b.isApproved ? (
                     <button onClick={() => toggleApproval(b.id, true)} className="text-xs uppercase tracking-widest bg-primary text-background px-3 py-1 hover:bg-accent transition-colors">Aprovo</button>
                   ) : (
                     <button onClick={() => toggleApproval(b.id, false)} className="text-xs uppercase tracking-widest border border-destructive text-destructive px-3 py-1 hover:bg-destructive hover:text-white transition-colors">Pezullo</button>
                   )}
                </td>
              </tr>
            ))}
            {biz.length === 0 && (
               <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">Asnjë biznes i gjetur.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
