import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import logoUrl from "@assets/pellazgo_logo.jpeg";

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 1000); // Wait for fade out
    }, 2000); // 2 seconds of showing

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="flex flex-col items-center gap-8"
          >
            <img 
              src={logoUrl} 
              alt="Pellazgo Logo" 
              className="w-32 h-32 md:w-48 md:h-48 rounded-full shadow-[0_0_50px_rgba(164,128,70,0.2)]" 
            />
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="font-serif text-3xl md:text-4xl tracking-[0.3em] text-primary uppercase"
            >
              Pellazgo
            </motion.h1>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
