import { Link } from "wouter";
import logoUrl from "@assets/pellazgo_logo.jpeg";
import { useLanguage } from "@/context/LanguageContext";
import { SiInstagram, SiFacebook, SiTiktok, SiWhatsapp } from "react-icons/si";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-card border-t border-primary/20 pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 text-center md:text-left">
          
          <div className="col-span-1 md:col-span-1 flex flex-col items-center md:items-start">
            <Link href="/" className="inline-block mb-6">
              <img src={logoUrl} alt="Pellazgo" className="w-16 h-16 rounded-full border border-primary/50" />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mb-6">
              {t("Arti i Parfumit të Mirë.", "The Art of Fine Fragrance.")}
            </p>
            <div className="flex gap-4 text-primary/80">
              <a href="#" className="hover:text-primary transition-colors"><SiInstagram size={20} /></a>
              <a href="#" className="hover:text-primary transition-colors"><SiFacebook size={20} /></a>
              <a href="#" className="hover:text-primary transition-colors"><SiTiktok size={18} /></a>
              <a href="#" className="hover:text-primary transition-colors"><SiWhatsapp size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="font-serif tracking-widest text-primary mb-6">{t("ZBULONI", "EXPLORE")}</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/shop"><span className="hover:text-primary transition-colors cursor-pointer">{t("Të gjitha", "All Fragrances")}</span></Link></li>
              <li><Link href="/about"><span className="hover:text-primary transition-colors cursor-pointer">{t("Historia Jonë", "Our Story")}</span></Link></li>
              <li><Link href="/contact"><span className="hover:text-primary transition-colors cursor-pointer">{t("Kontakt", "Contact")}</span></Link></li>
              <li><Link href="/login"><span className="hover:text-primary transition-colors cursor-pointer">{t("Llogaria", "Account")}</span></Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif tracking-widest text-primary mb-6">{t("KLIENTËT", "CLIENT CARE")}</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/returns"><span className="hover:text-primary transition-colors cursor-pointer">{t("Dërgesa & Kthime", "Shipping & Returns")}</span></Link></li>
              <li><Link href="/terms"><span className="hover:text-primary transition-colors cursor-pointer">{t("Kushtet", "Terms & Conditions")}</span></Link></li>
              <li><Link href="/privacy"><span className="hover:text-primary transition-colors cursor-pointer">{t("Privatësia", "Privacy Policy")}</span></Link></li>
              <li><Link href="/business"><span className="hover:text-primary transition-colors cursor-pointer">{t("Partneritet B2B", "Business Inquiries")}</span></Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif tracking-widest text-primary mb-6">{t("ATELIER", "ATELIER")}</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li>Rruga e Kavajës 42</li>
              <li>Tiranë 1001, Shqipëri</li>
              <li>{t("E Hënë–E Shtunë: 09:00–19:00", "Monday–Saturday: 09:00–19:00")}</li>
              <li className="pt-4"><a href="mailto:info@pellazgo.al" className="hover:text-primary transition-colors">info@pellazgo.al</a></li>
              <li><a href="tel:+355691234567" className="hover:text-primary transition-colors">+355 69 123 4567</a></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-primary/10 flex flex-col md:flex-row items-center justify-between text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Pellazgo. {t("Të gjitha të drejtat e rezervuara.", "All rights reserved.")}</p>
          <div className="flex gap-4 mt-4 md:mt-0 text-primary/50 uppercase tracking-widest">
            <span>Visa</span>
            <span>Mastercard</span>
            <span>{t("Transfertë Bankare", "Bank Transfer")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
