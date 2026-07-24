import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X, Heart, User as UserIcon } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import logoUrl from "@assets/pellazgo_logo.jpeg";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  
  const { cartCount, setIsOpen } = useCart();
  const { lang, setLang, t } = useLanguage();
  const { user, logout } = useAuth();
  const [location, setLocation] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
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
        <nav className="hidden lg:flex items-center gap-10">
          {[
            { href: "/shop", label: t("Dyqani", "Shop") },
            { href: "/about", label: t("Historia Jonë", "Our Story") },
            { href: "/contact", label: t("Kontakt", "Contact") }
          ].map((link) => (
            <Link key={link.href} href={link.href}>
              <span className={`text-sm uppercase tracking-widest transition-colors hover:text-primary cursor-pointer relative group ${
                location.startsWith(link.href) ? "text-primary" : "text-muted-foreground"
              }`}>
                {link.label}
                <span className={`absolute -bottom-2 left-0 w-full h-px bg-primary transition-transform origin-left ${
                  location.startsWith(link.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`} />
              </span>
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4 lg:gap-6">
          <button 
            onClick={() => setLang(lang === "sq" ? "en" : "sq")}
            className="text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
          >
            {lang === "sq" ? "SQ" : "EN"}
          </button>

          <div className="relative">
            <button 
              onClick={() => user ? setUserMenuOpen(!userMenuOpen) : setLocation("/login")}
              className="text-primary p-2 group hover:text-accent transition-colors"
            >
              {user ? (
                <div className="w-6 h-6 rounded-full border border-primary flex items-center justify-center text-[10px] bg-primary/10 group-hover:bg-primary/20">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              ) : (
                <UserIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              )}
            </button>

            {userMenuOpen && user && (
              <div className="absolute right-0 mt-2 w-48 bg-card border border-primary/20 py-2 shadow-2xl">
                <div className="px-4 py-2 border-b border-primary/10 mb-2">
                  <p className="text-sm text-primary truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground uppercase">{user.role}</p>
                </div>
                <Link href={user.role === 'admin' ? '/admin' : user.role === 'business' ? '/business' : '/account'}>
                  <span className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 cursor-pointer">
                    {t("Pulti", "Dashboard")}
                  </span>
                </Link>
                <button 
                  onClick={() => { logout(); setUserMenuOpen(false); setLocation("/"); }}
                  className="w-full text-left px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5"
                >
                  {t("Dil", "Logout")}
                </button>
              </div>
            )}
          </div>

          <Link href={user ? "/account?tab=wishlist" : "/login"}>
            <span className="relative text-primary p-2 group cursor-pointer hidden sm:block">
              <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {user && user.wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                  {user.wishlist.length}
                </span>
              )}
            </span>
          </Link>

          <button 
            onClick={() => setIsOpen(true)}
            className="relative text-primary p-2 group"
          >
            <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
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
                { href: "/", label: t("Kreu", "Home") },
                { href: "/shop", label: t("Dyqani", "Shop") },
                { href: "/about", label: t("Historia Jonë", "Our Story") },
                { href: "/contact", label: t("Kontakt", "Contact") },
                user ? { href: user.role === 'admin' ? '/admin' : user.role === 'business' ? '/business' : '/account', label: t("Llogaria", "Account") } : { href: "/login", label: t("Hyr", "Login") }
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
