import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import logoUrl from "@assets/pellazgo_logo.jpeg";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount, setIsOpen } = useCart();
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={`fixed top-0 w-full z-40 transition-all duration-500 border-b ${
        isScrolled 
          ? "bg-background/95 backdrop-blur-md border-primary/20 py-3" 
          : "bg-background/50 backdrop-blur-sm border-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        
        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden text-primary"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-4 group">
          <img 
            src={logoUrl} 
            alt="Pellazgo" 
            className="w-10 h-10 rounded-full border border-primary/50 group-hover:border-primary transition-colors"
          />
          <span className="font-serif text-2xl tracking-[0.2em] text-primary uppercase hidden sm:block">Pellazgo</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-12">
          {[
            { href: "/shop", label: "Shop" },
            { href: "/about", label: "Our Story" },
            { href: "/contact", label: "Contact" }
          ].map((link) => (
            <Link key={link.href} href={link.href}>
              <span className={`text-sm uppercase tracking-widest transition-colors hover:text-primary cursor-pointer relative group ${
                location === link.href ? "text-primary" : "text-muted-foreground"
              }`}>
                {link.label}
                <span className={`absolute -bottom-2 left-0 w-full h-px bg-primary transition-transform origin-left ${
                  location === link.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`} />
              </span>
            </Link>
          ))}
        </nav>

        {/* Cart Icon */}
        <button 
          onClick={() => setIsOpen(true)}
          className="relative text-primary p-2 group"
        >
          <ShoppingBag className="w-6 h-6 group-hover:scale-110 transition-transform" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 bg-background flex flex-col pt-24 px-6 pb-6 border-b border-primary/20"
          >
            <button 
              className="absolute top-6 right-6 text-primary p-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="w-8 h-8" />
            </button>
            <div className="flex flex-col gap-8 text-center mt-12">
              {[
                { href: "/", label: "Home" },
                { href: "/shop", label: "Shop" },
                { href: "/about", label: "Our Story" },
                { href: "/contact", label: "Contact" }
              ].map((link) => (
                <Link key={link.href} href={link.href}>
                  <span className="font-serif text-3xl tracking-widest text-primary block py-2" onClick={() => setMobileMenuOpen(false)}>
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>
            
            <div className="mt-auto flex justify-center pb-12">
               <img src={logoUrl} alt="Pellazgo" className="w-16 h-16 opacity-50" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
