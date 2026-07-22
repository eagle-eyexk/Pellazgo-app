import { Link } from "wouter";
import logoUrl from "@assets/pellazgo_logo.jpeg";

export function Footer() {
  return (
    <footer className="bg-background border-t border-primary/20 pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 text-center md:text-left">
          
          <div className="col-span-1 md:col-span-1 flex flex-col items-center md:items-start">
            <Link href="/" className="inline-block mb-6">
              <img src={logoUrl} alt="Pellazgo" className="w-16 h-16 rounded-full border border-primary/50" />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              The art of scent. Curated for the modern connoisseur, crafted with heritage and devotion.
            </p>
          </div>

          <div>
            <h4 className="font-serif tracking-widest text-primary mb-6">EXPLORE</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/shop"><span className="hover:text-primary transition-colors cursor-pointer">All Fragrances</span></Link></li>
              <li><Link href="/shop"><span className="hover:text-primary transition-colors cursor-pointer">Oud Collection</span></Link></li>
              <li><Link href="/shop"><span className="hover:text-primary transition-colors cursor-pointer">Home Scents</span></Link></li>
              <li><Link href="/about"><span className="hover:text-primary transition-colors cursor-pointer">Our Story</span></Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif tracking-widest text-primary mb-6">CLIENT CARE</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/contact"><span className="hover:text-primary transition-colors cursor-pointer">Contact Us</span></Link></li>
              <li><span className="hover:text-primary transition-colors cursor-pointer">Shipping & Returns</span></li>
              <li><span className="hover:text-primary transition-colors cursor-pointer">FAQ</span></li>
              <li><span className="hover:text-primary transition-colors cursor-pointer">Fragrance Guide</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif tracking-widest text-primary mb-6">ATELIER</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li>12 Rue de la Paix</li>
              <li>75002 Paris, France</li>
              <li className="pt-4"><a href="mailto:concierge@pellazgo.com" className="hover:text-primary transition-colors">concierge@pellazgo.com</a></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-primary/10 flex flex-col md:flex-row items-center justify-between text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Pellazgo. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span className="hover:text-primary cursor-pointer transition-colors">Terms</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
