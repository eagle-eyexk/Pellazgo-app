import { motion } from "framer-motion";
import founderPortrait from "@assets/founder_portrait.jpg";
import heroBg from "@assets/hero_bg.jpg";

export default function About() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-32">
      {/* Header */}
      <div className="container mx-auto px-6 py-16 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif text-5xl md:text-7xl text-primary tracking-[0.2em] mb-8 uppercase"
        >
          Our Heritage
        </motion.h1>
        <motion.div 
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "100px" }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="h-px bg-primary mx-auto"
        />
      </div>

      {/* Main Story */}
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center my-16">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-primary tracking-widest leading-snug">
              A COLLISION OF TWO WORLDS: THE PARISIAN ATELIER AND THE MOROCCAN MEDINA.
            </h2>
            <p className="text-lg text-foreground/80 leading-relaxed font-light">
              Pellazgo was born from a singular vision: to create a house of fragrance that refuses to compromise. We are not interested in the mass-produced or the easily accessible. We are interested in art.
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed font-light">
              Every drop of a Pellazgo creation contains weeks of maceration, months of conceptualization, and years of generational knowledge. We source our raw materials directly from the farmers and distillers who have mastered their craft over centuries.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="aspect-[4/5] bg-muted relative p-4 border border-primary/20"
          >
            <img src={heroBg} alt="Craftsmanship" className="w-full h-full object-cover filter brightness-75" />
          </motion.div>
        </div>
      </div>

      {/* Philosophy Banner */}
      <div className="bg-primary/5 border-y border-primary/20 py-32 my-32">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <h3 className="font-serif text-4xl text-primary leading-tight mb-8">
            "We do not design for the moment. We design for the memory."
          </h3>
          <div className="w-16 h-px bg-primary mx-auto"></div>
        </div>
      </div>

      {/* Founder Section */}
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1 aspect-square bg-muted relative border border-primary/20"
          >
            <img src={founderPortrait} alt="Founder" className="w-full h-full object-cover grayscale mix-blend-luminosity opacity-80" />
            <div className="absolute inset-0 bg-primary/10"></div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 space-y-8"
          >
            <p className="text-sm uppercase tracking-widest text-muted-foreground">The Architect</p>
            <h2 className="font-serif text-4xl text-primary tracking-widest">AMELIA PELLAZGO</h2>
            <div className="w-12 h-px bg-primary"></div>
            <p className="text-lg text-foreground/80 leading-relaxed font-light">
              Trained in Grasse and raised between Paris and Marrakech, Amelia sought to bottle the profound emotional resonance of her dual heritage.
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed font-light">
              Her approach to perfumery is sculptural. She treats notes not as smells, but as textures—building fragrances the way an architect builds a cathedral: with intention, gravity, and awe.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Timeline/Values */}
      <div className="container mx-auto px-6 mt-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {[
            { title: "RAW MATERIALS", desc: "Sourced without compromise. From the deepest Oud to the most fragile Rose, only the absolute finest enters our atelier." },
            { title: "MATURATION", desc: "Time is the ultimate luxury. Our extraits undergo extensive aging processes, allowing notes to seamlessly fuse and deepen." },
            { title: "PRESENTATION", desc: "Heavy glass, hand-polished gold, and tactile textures. The physical vessel is as considered as the liquid within." }
          ].map((val, i) => (
            <div key={i} className="p-8 border border-primary/20 bg-card hover:bg-primary/5 transition-colors duration-500">
              <h4 className="font-serif text-2xl text-primary mb-4 tracking-widest">{val.title}</h4>
              <div className="w-8 h-px bg-primary/50 mx-auto mb-6"></div>
              <p className="text-muted-foreground leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
