import { motion } from "framer-motion";
import { useState } from "react";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "submitted">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitted");
    setTimeout(() => setStatus("idle"), 3000);
  };

  return (
    <div className="min-h-screen bg-background pt-32 pb-32">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-24">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl md:text-7xl text-primary tracking-[0.2em] mb-8 uppercase"
          >
            Contact
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "100px" }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-px bg-primary mx-auto"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          
          {/* Contact Details */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-16"
          >
            <div>
              <h2 className="font-serif text-3xl text-primary tracking-widest mb-6">THE ATELIER</h2>
              <p className="text-lg text-muted-foreground font-light mb-2">12 Rue de la Paix</p>
              <p className="text-lg text-muted-foreground font-light mb-8">75002 Paris, France</p>
              <p className="text-sm uppercase tracking-widest text-primary/80">By appointment only.</p>
            </div>

            <div>
              <h2 className="font-serif text-3xl text-primary tracking-widest mb-6">CONCIERGE</h2>
              <p className="text-lg text-muted-foreground font-light mb-8">
                For inquiries regarding bespoke creations, corporate gifting, or detailed fragrance consultations.
              </p>
              <a href="mailto:concierge@pellazgo.com" className="block font-serif text-2xl text-primary hover:text-accent transition-colors mb-4">
                concierge@pellazgo.com
              </a>
              <p className="text-sm text-muted-foreground">+33 1 42 68 53 00</p>
            </div>

            <div>
              <a 
                href="#" 
                className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 uppercase tracking-widest text-sm hover:bg-[#1DA851] transition-colors"
                onClick={(e) => { e.preventDefault(); window.open('https://wa.me/33142685300', '_blank'); }}
              >
                Message via WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card border border-primary/20 p-10 md:p-16"
          >
            <h2 className="font-serif text-3xl text-primary tracking-widest mb-8 text-center">SEND A MESSAGE</h2>
            
            {status === "submitted" ? (
              <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center">
                <div className="w-16 h-px bg-primary mb-6"></div>
                <h3 className="font-serif text-2xl text-primary mb-4">Message Received</h3>
                <p className="text-muted-foreground">Our concierge will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-primary mb-3">Name</label>
                  <input 
                    type="text" 
                    required
                    className="w-full bg-transparent border-b border-primary/30 py-3 text-foreground focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/30"
                    placeholder="Monsieur / Madame..."
                  />
                </div>
                
                <div>
                  <label className="block text-xs uppercase tracking-widest text-primary mb-3">Email</label>
                  <input 
                    type="email" 
                    required
                    className="w-full bg-transparent border-b border-primary/30 py-3 text-foreground focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/30"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-xs uppercase tracking-widest text-primary mb-3">Inquiry</label>
                  <select className="w-full bg-card border-b border-primary/30 py-3 text-foreground focus:outline-none focus:border-primary transition-colors">
                    <option value="general">General Inquiry</option>
                    <option value="bespoke">Bespoke Fragrance</option>
                    <option value="order">Order Status</option>
                    <option value="press">Press & Media</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs uppercase tracking-widest text-primary mb-3">Message</label>
                  <textarea 
                    required
                    rows={4}
                    className="w-full bg-transparent border-b border-primary/30 py-3 text-foreground focus:outline-none focus:border-primary transition-colors resize-none placeholder:text-muted-foreground/30"
                    placeholder="How may we assist you?"
                  ></textarea>
                </div>
                
                <button 
                  type="submit"
                  className="w-full border border-primary text-primary py-4 uppercase tracking-widest text-sm hover:bg-primary hover:text-primary-foreground transition-colors mt-8"
                >
                  Send Message
                </button>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </div>
  );
}
