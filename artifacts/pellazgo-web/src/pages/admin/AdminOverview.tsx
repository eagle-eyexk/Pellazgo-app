import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { products } from "@/data/products";

const data = [
  { name: 'Jan', rev: 12000 },
  { name: 'Feb', rev: 19000 },
  { name: 'Mar', rev: 15000 },
  { name: 'Apr', rev: 22000 },
  { name: 'May', rev: 28000 },
  { name: 'Jun', rev: 35000 },
];

export default function AdminOverview() {
  const allOrders = JSON.parse(localStorage.getItem("pellazgo_orders") || "[]");
  const users = JSON.parse(localStorage.getItem("pellazgo_users") || "[]");

  const totalRev = allOrders.reduce((acc: number, o: any) => acc + o.total, 0);
  const clients = users.filter((u: any) => u.role === 'client').length;
  const biz = users.filter((u: any) => u.role === 'business').length;
  const lowStock = products.filter(p => p.stock < 10).length;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
      <h1 className="font-serif text-3xl text-primary tracking-widest uppercase">Përmbledhje</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card border border-primary/20 p-6">
           <p className="text-[10px] uppercase tracking-widest text-primary/60 mb-2">Të Ardhurat</p>
           <p className="font-serif text-3xl text-primary">€{totalRev.toLocaleString()}</p>
        </div>
        <div className="bg-card border border-primary/20 p-6">
           <p className="text-[10px] uppercase tracking-widest text-primary/60 mb-2">Klientë</p>
           <p className="font-serif text-3xl text-primary">{clients}</p>
        </div>
        <div className="bg-card border border-primary/20 p-6">
           <p className="text-[10px] uppercase tracking-widest text-primary/60 mb-2">Biznese B2B</p>
           <p className="font-serif text-3xl text-primary">{biz}</p>
        </div>
        <div className="bg-card border border-red-500/30 p-6 bg-red-500/5">
           <p className="text-[10px] uppercase tracking-widest text-red-400 mb-2">Stok i Ulët</p>
           <p className="font-serif text-3xl text-red-500">{lowStock} <span className="text-sm font-sans">produkte</span></p>
        </div>
      </div>

      <div className="bg-card border border-primary/20 p-6">
         <h2 className="font-serif text-xl text-primary mb-6">Të ardhurat (Gjashtëmujor)</h2>
         <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--primary)/0.2)" vertical={false} />
                <XAxis dataKey="name" stroke="hsl(var(--primary)/0.5)" fontSize={12} tickLine={false} />
                <YAxis stroke="hsl(var(--primary)/0.5)" fontSize={12} tickLine={false} tickFormatter={(v) => `€${v}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--primary)/0.5)', color: 'hsl(var(--primary))' }}
                  itemStyle={{ color: 'hsl(var(--primary))' }}
                />
                <Line type="monotone" dataKey="rev" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: 'hsl(var(--primary))', r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
         </div>
      </div>

      <div>
         <h2 className="font-serif text-xl text-primary mb-6">Porositë e Fundit</h2>
         <div className="bg-card border border-primary/20 overflow-hidden">
            <table className="w-full text-left">
               <thead className="border-b border-primary/20 bg-background/50">
                  <tr>
                     <th className="p-4 text-[10px] uppercase tracking-widest text-primary">ID</th>
                     <th className="p-4 text-[10px] uppercase tracking-widest text-primary">Klienti</th>
                     <th className="p-4 text-[10px] uppercase tracking-widest text-primary">Data</th>
                     <th className="p-4 text-[10px] uppercase tracking-widest text-primary">Total</th>
                     <th className="p-4 text-[10px] uppercase tracking-widest text-primary">Status</th>
                  </tr>
               </thead>
               <tbody>
                  {allOrders.slice(0, 5).map((o: any) => (
                     <tr key={o.id} className="border-b border-primary/10">
                        <td className="p-4 text-sm font-serif text-primary">#{o.id}</td>
                        <td className="p-4 text-sm text-foreground">{o.userName}</td>
                        <td className="p-4 text-sm text-muted-foreground">{new Date(o.createdAt).toLocaleDateString()}</td>
                        <td className="p-4 text-sm text-primary font-bold">€{o.total}</td>
                        <td className="p-4">
                           <span className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded ${o.status === 'delivered' ? 'bg-green-500/20 text-green-500' : 'bg-primary/20 text-primary'}`}>
                             {o.status}
                           </span>
                        </td>
                     </tr>
                  ))}
                  {allOrders.length === 0 && (
                     <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">Nuk ka porosi.</td></tr>
                  )}
               </tbody>
            </table>
         </div>
      </div>
    </motion.div>
  );
}
