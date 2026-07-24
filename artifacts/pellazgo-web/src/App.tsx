import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';

import { LanguageProvider } from '@/context/LanguageContext';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { SplashScreen } from '@/components/SplashScreen';

import Home from '@/pages/Home';
import Shop from '@/pages/Shop';
import ProductDetail from '@/pages/ProductDetail';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/not-found';
import Login from '@/pages/Login';
import Privacy from '@/pages/Privacy';
import Terms from '@/pages/Terms';
import Returns from '@/pages/Returns';
import Account from '@/pages/Account';
import Business from '@/pages/Business';
import AdminLayout from '@/pages/admin/AdminLayout';

const queryClient = new QueryClient();

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/shop" component={Shop} />
          <Route path="/product/:id" component={ProductDetail} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/login" component={Login} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/terms" component={Terms} />
          <Route path="/returns" component={Returns} />
          <Route path="/account" component={Account} />
          <Route path="/business" component={Business} />
          <Route path="/admin" component={AdminLayout} nest />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <AuthProvider>
            <CartProvider>
              {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
              <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
                <Router />
              </WouterRouter>
              <Toaster />
            </CartProvider>
          </AuthProvider>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

import { useState } from "react";
export default App;
