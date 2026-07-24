import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";

export default function Privacy() {
  const { lang } = useLanguage();
  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12 text-foreground/80 font-light leading-relaxed">
          <h1 className="font-serif text-4xl text-primary uppercase tracking-widest mb-12 text-center border-b border-primary/20 pb-8">
            {lang === 'sq' ? 'Politika e Privatësisë' : 'Privacy Policy'}
          </h1>
          
          {lang === 'sq' ? (
            <>
              <p>E përditësuar së fundmi: 15 Mars 2024</p>
              <h2 className="font-serif text-2xl text-primary mt-8">1. Mbledhja e të Dhënave</h2>
              <p>Në Pellazgo ne respektojmë privatësinë tuaj. Ne mbledhim informacione si emri, adresa, emaili dhe numri i telefonit vetëm kur ju i jepni vullnetarisht për procesimin e porosive ose krijimin e llogarisë.</p>
              
              <h2 className="font-serif text-2xl text-primary mt-8">2. Përdorimi i të Dhënave</h2>
              <p>Të dhënat tuaja përdoren ekskluzivisht për: procesimin e pagesave, dërgimin e porosive, suportin ndaj klientit dhe njoftimet e personalizuara (nëse jeni abonuar në buletin).</p>
              
              <h2 className="font-serif text-2xl text-primary mt-8">3. Palët e Treta</h2>
              <p>Ne nuk shesim, japim me qira apo ndajmë të dhënat tuaja personale me palë të treta, përveç partnerëve të logjistikës të nevojshëm për dorëzimin e porosisë (p.sh. DHL, Posta).</p>
            </>
          ) : (
            <>
              <p>Last updated: March 15, 2024</p>
              <h2 className="font-serif text-2xl text-primary mt-8">1. Data Collection</h2>
              <p>At Pellazgo, we respect your privacy. We collect information such as name, address, email, and phone number only when voluntarily provided by you for order processing or account creation.</p>
              
              <h2 className="font-serif text-2xl text-primary mt-8">2. Data Usage</h2>
              <p>Your data is used exclusively for: processing payments, shipping orders, customer support, and personalized notifications (if subscribed to the newsletter).</p>
              
              <h2 className="font-serif text-2xl text-primary mt-8">3. Third Parties</h2>
              <p>We do not sell, rent, or share your personal data with third parties, except for logistics partners necessary for order delivery (e.g., DHL, Postal services).</p>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
