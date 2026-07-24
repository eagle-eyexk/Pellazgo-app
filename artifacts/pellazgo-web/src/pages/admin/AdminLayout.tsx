import { useAuth, ProtectedRoute } from "@/context/AuthContext";
import { Link, Route, Switch, useLocation } from "wouter";
import { LayoutDashboard, PackageSearch, ShoppingCart, Users, Briefcase, Settings, LogOut, Menu } from "lucide-react";
import { useState } from "react";

// Admin Sub-pages
import AdminOverview from "./AdminOverview";
import AdminProducts from "./AdminProducts";
import AdminOrders from "./AdminOrders";
import AdminClients from "./AdminClients";
import AdminBusinesses from "./AdminBusinesses";
import AdminSettings from "./AdminSettings";

function AdminSidebar({ isOpen, setOpen }: { isOpen: boolean, setOpen: (v: boolean) => void }) {
  const [location, setLocation] = useLocation();
  const { logout } = useAuth();

  const links = [
    { href: "/admin", icon: LayoutDashboard, label: "Përmbledhje" },
    { href: "/admin/products", icon: PackageSearch, label: "Katalogu" },
    { href: "/admin/orders", icon: ShoppingCart, label: "Porositë" },
    { href: "/admin/clients", icon: Users, label: "Klientët" },
    { href: "/admin/businesses", icon: Briefcase, label: "Bizneset" },
    { href: "/admin/settings", icon: Settings, label: "Cilësimet" },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-background/80 z-40 lg:hidden" onClick={() => setOpen(false)} />
      )}
      
      <div className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-card border-r border-primary/20 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} flex flex-col`}>
        <div className="p-6 border-b border-primary/20 flex justify-between items-center">
          <div>
            <h2 className="font-serif text-2xl text-primary tracking-widest uppercase">Admin</h2>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Pellazgo Control</p>
          </div>
        </div>
        
        <nav className="flex-1 py-6 space-y-2 px-4">
          {links.map(link => {
            const active = location === link.href;
            return (
              <Link key={link.href} href={link.href}>
                <span onClick={() => setOpen(false)} className={`flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-widest cursor-pointer transition-colors ${
                  active ? "bg-primary text-background" : "text-primary hover:bg-primary/10"
                }`}>
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-primary/20">
          <button 
            onClick={() => { logout(); setLocation("/"); }}
            className="w-full flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-widest text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Dalje
          </button>
        </div>
      </div>
    </>
  );
}

function AdminLayoutContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex pt-24 pb-0">
      <AdminSidebar isOpen={sidebarOpen} setOpen={setSidebarOpen} />
      
      <div className="flex-1 flex flex-col overflow-hidden max-w-full">
        {/* Mobile Header for Admin */}
        <div className="lg:hidden p-4 border-b border-primary/20 flex justify-between items-center bg-card">
          <h2 className="font-serif text-xl text-primary">Admin Panel</h2>
          <button onClick={() => setSidebarOpen(true)} className="text-primary"><Menu /></button>
        </div>
        
        <main className="flex-1 overflow-auto p-6 md:p-10">
          <Switch>
            <Route path="/admin" component={AdminOverview} />
            <Route path="/admin/products" component={AdminProducts} />
            <Route path="/admin/orders" component={AdminOrders} />
            <Route path="/admin/clients" component={AdminClients} />
            <Route path="/admin/businesses" component={AdminBusinesses} />
            <Route path="/admin/settings" component={AdminSettings} />
          </Switch>
        </main>
      </div>
    </div>
  );
}

export default function AdminLayout() {
  return (
    <ProtectedRoute roles={["admin"]}>
      <AdminLayoutContent />
    </ProtectedRoute>
  );
}
