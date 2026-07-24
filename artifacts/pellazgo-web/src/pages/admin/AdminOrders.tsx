import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { toast } from "sonner";

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("pellazgo_orders") || "[]");
    setOrders(data);
  }, []);

  const updateStatus = (id: string, status: string) => {
    const updated = orders.map(o => o.id === id ? { ...o, status } : o);
    setOrders(updated);
    localStorage.setItem("pellazgo_orders", JSON.stringify(updated));
    toast.success("Statusi u përditësua");
  };

  const downloadCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "ID,Client,Email,Total,Status,Date\n"
      + orders.map(e => `${e.id},${e.userName},${e.userEmail},${e.total},${e.status},${e.createdAt}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "pellazgo_orders.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="font-serif text-3xl text-primary tracking-widest uppercase">Porositë</h1>
        <button onClick={downloadCSV} className="border border-primary text-primary px-6 py-3 text-xs uppercase tracking-widest hover:bg-primary hover:text-background transition-colors flex items-center gap-2">
          <Download className="w-4 h-4" /> Eksporto CSV
        </button>
      </div>

      <div className="bg-card border border-primary/20 overflow-x-auto">
        <table className="w-full text-left min-w-[800px]">
          <thead className="border-b border-primary/20 bg-background/50">
            <tr>
              <th className="p-4 text-[10px] uppercase tracking-widest text-primary">ID</th>
              <th className="p-4 text-[10px] uppercase tracking-widest text-primary">Klienti</th>
              <th className="p-4 text-[10px] uppercase tracking-widest text-primary">Artikuj</th>
              <th className="p-4 text-[10px] uppercase tracking-widest text-primary">Total</th>
              <th className="p-4 text-[10px] uppercase tracking-widest text-primary">Data</th>
              <th className="p-4 text-[10px] uppercase tracking-widest text-primary">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id} className="border-b border-primary/10 hover:bg-primary/5 transition-colors">
                <td className="p-4 text-sm font-serif text-primary">#{o.id}</td>
                <td className="p-4">
                  <p className="text-sm text-foreground">{o.userName}</p>
                  <p className="text-xs text-muted-foreground">{o.userEmail}</p>
                </td>
                <td className="p-4 text-sm text-muted-foreground">{o.items.length}</td>
                <td className="p-4 text-sm text-primary font-bold">€{o.total}</td>
                <td className="p-4 text-sm text-muted-foreground">{new Date(o.createdAt).toLocaleDateString()}</td>
                <td className="p-4">
                  <select 
                    value={o.status}
                    onChange={(e) => updateStatus(o.id, e.target.value)}
                    className="bg-transparent border border-primary/30 text-xs uppercase tracking-widest text-primary py-1 px-2 focus:outline-none focus:border-primary"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">Nuk ka porosi.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
