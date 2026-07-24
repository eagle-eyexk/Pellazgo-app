import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "sq" | "en";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (sq: string, en: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window === "undefined") return "sq";
    const saved = localStorage.getItem("pellazgo_lang");
    return (saved as Language) || "sq";
  });

  useEffect(() => {
    localStorage.setItem("pellazgo_lang", lang);
  }, [lang]);

  const t = (sq: string, en: string) => (lang === "sq" ? sq : en);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
