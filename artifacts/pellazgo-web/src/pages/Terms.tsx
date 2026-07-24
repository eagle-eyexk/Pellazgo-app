import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";

export default function Terms() {
  const { lang } = useLanguage();
  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12 text-foreground/80 font-light leading-relaxed">
          <h1 className="font-serif text-4xl text-primary uppercase tracking-widest mb-12 text-center border-b border-primary/20 pb-8">
            {lang === 'sq' ? 'Kushtet e Përdorimit' : 'Terms & Conditions'}
          </h1>
          
          {lang === 'sq' ? (
            <>
              <h2 className="font-serif text-2xl text-primary mt-8">1. Pranimi i Kushteve</h2>
              <p>Duke vizituar ose duke blerë në platformën tonë, ju bini dakord të jeni të detyruar nga këto Kushte Përdorimi. Kjo përfshin të gjitha politikat e tjera të lidhura në këtë faqe.</p>
              
              <h2 className="font-serif text-2xl text-primary mt-8">2. Produktet dhe Çmimet</h2>
              <p>Pellazgo rezervon të drejtën të ndryshojë çmimet e produkteve pa njoftim paraprak. Të gjitha përshkrimet e produkteve dhe imazhet janë sa më të sakta që është e mundur, por lejohen gabime të vogla vizuale për shkak të natyrës artizanale të shisheve tona.</p>
              
              <h2 className="font-serif text-2xl text-primary mt-8">3. Ligji në Fuqi</h2>
              <p>Këto Kushte rregullohen dhe interpretohen në përputhje me ligjet e Republikës së Shqipërisë. Çdo mosmarrëveshje do të zgjidhet në gjykatat e Tiranës.</p>
            </>
          ) : (
            <>
              <h2 className="font-serif text-2xl text-primary mt-8">1. Acceptance of Terms</h2>
              <p>By visiting or purchasing from our platform, you agree to be bound by these Terms & Conditions. This includes all other policies linked on this site.</p>
              
              <h2 className="font-serif text-2xl text-primary mt-8">2. Products and Pricing</h2>
              <p>Pellazgo reserves the right to change product prices without prior notice. All product descriptions and images are as accurate as possible, though slight visual variations may occur due to the artisanal nature of our bottles.</p>
              
              <h2 className="font-serif text-2xl text-primary mt-8">3. Governing Law</h2>
              <p>These Terms shall be governed by and construed in accordance with the laws of the Republic of Albania. Any disputes shall be resolved in the courts of Tirana.</p>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
