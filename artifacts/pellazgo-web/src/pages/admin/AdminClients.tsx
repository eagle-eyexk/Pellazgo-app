import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

export default function AdminClients() {
  const [clients, setClients] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("pellazgo_users") || "[]");
    setClients(users.filter((u: any) => u.role === "client"));
  }, []);

  const filtered = clients.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      <h1 className="font-serif text-3xl text-primary tracking-widest uppercase">Klientët</h1>

      <div className="relative max-w-md">
         <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50" />
         <input 
          type="text"
          placeholder="Kërko klient..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-transparent border-b border-primary/30 py-3 pl-10 text-primary focus:outline-none focus:border-primary transition-colors"
        />
      </div>

      <div className="bg-card border border-primary/20 overflow-x-auto">
        <table className="w-full text-left min-w-[800px]">
          <thead className="border-b border-primary/20 bg-background/50">
            <tr>
              <th className="p-4 text-[10px] uppercase tracking-widest text-primary">Emri</th>
              <th className="p-4 text-[10px] uppercase tracking-widest text-primary">Email</th>
              <th className="p-4 text-[10px] uppercase tracking-widest text-primary">Telefoni</th>
              <th className="p-4 text-[10px] uppercase tracking-widest text-primary">Data e Regjistrimit</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.id} className="border-b border-primary/10 hover:bg-primary/5 transition-colors cursor-pointer">
                <td className="p-4 text-sm font-serif text-primary">{c.name}</td>
                <td className="p-4 text-sm text-foreground">{c.email}</td>
                <td className="p-4 text-sm text-muted-foreground">{c.phone || '-'}</td>
                <td className="p-4 text-sm text-muted-foreground">{new Date(c.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
               <tr><td colSpan={4} className="p-8 text-center text-muted-foreground">Asnjë klient i gjetur.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
