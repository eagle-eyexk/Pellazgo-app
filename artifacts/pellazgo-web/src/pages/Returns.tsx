import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";

export default function Returns() {
  const { lang } = useLanguage();
  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12 text-foreground/80 font-light leading-relaxed">
          <h1 className="font-serif text-4xl text-primary uppercase tracking-widest mb-12 text-center border-b border-primary/20 pb-8">
            {lang === 'sq' ? 'Politika e Kthimit' : 'Returns Policy'}
          </h1>
          
          {lang === 'sq' ? (
            <>
              <h2 className="font-serif text-2xl text-primary mt-8">Kthime 30-Ditore</h2>
              <p>Ne ofrojmë një politikë kthimi 30-ditore për të gjitha produktet e pahapura, në paketimin e tyre origjinal dhe me vulën e paprekur.</p>
              
              <h2 className="font-serif text-2xl text-primary mt-8">Përjashtimet</h2>
              <p>Për arsye higjiene dhe cilësie, parfumet e hapura, të spërkatura qoftë edhe një herë, nuk mund të kthehen as të rimbursohen. Prandaj, çdo porosi shoqërohet me kampione zbulimi, që ju të mund ta provoni aromën para se të hapni shishen kryesore.</p>
              
              <h2 className="font-serif text-2xl text-primary mt-8">Procesi i Rimbursimit</h2>
              <p>Sapo të marrim mbrapsht artikullin tuaj të pahapur, rimbursimi do të procesohet brenda 5-7 ditëve të punës në të njëjtën formë pagese të përdorur fillimisht.</p>
            </>
          ) : (
            <>
              <h2 className="font-serif text-2xl text-primary mt-8">30-Day Returns</h2>
              <p>We offer a 30-day return policy for all unopened products in their original packaging with intact seals.</p>
              
              <h2 className="font-serif text-2xl text-primary mt-8">Exceptions</h2>
              <p>For reasons of hygiene and quality control, opened perfumes that have been sprayed even once cannot be returned or refunded. Therefore, every full-size order includes discovery samples so you can test the fragrance before opening the main bottle.</p>
              
              <h2 className="font-serif text-2xl text-primary mt-8">Refund Process</h2>
              <p>Once we receive your unopened return, refunds will be processed within 5-7 business days to the original payment method.</p>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
