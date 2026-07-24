import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import logoUrl from "@assets/pellazgo_logo.jpeg";

export default function Login() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const { login, register } = useAuth();
  const { t } = useLanguage();
  const [, setLocation] = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const success = await login(email, password);
    if (success) {
      setLocation("/");
    } else {
      setError(t("Kredenciale të gabuara.", "Invalid credentials."));
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const success = await register({ email, name, phone, role: "client" }, password);
    if (success) {
      setLocation("/");
    } else {
      setError(t("Ky email ekziston tashmë.", "Email already exists."));
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center py-32 px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-card border border-primary/20 p-8 md:p-12"
      >
        <div className="text-center mb-10">
          <img src={logoUrl} alt="Logo" className="w-16 h-16 mx-auto rounded-full border border-primary/30 mb-6" />
          <h1 className="font-serif text-3xl text-primary tracking-widest uppercase">Pellazgo</h1>
        </div>

        <div className="flex border-b border-primary/20 mb-8">
          <button 
            className={`flex-1 py-4 text-xs uppercase tracking-widest transition-colors ${activeTab === 'login' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-primary'}`}
            onClick={() => { setActiveTab('login'); setError(""); }}
          >
            {t("Hyrje", "Login")}
          </button>
          <button 
            className={`flex-1 py-4 text-xs uppercase tracking-widest transition-colors ${activeTab === 'register' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-primary'}`}
            onClick={() => { setActiveTab('register'); setError(""); }}
          >
            {t("Regjistrohu", "Register")}
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 border border-red-500/50 bg-red-500/10 text-red-500 text-sm text-center">
            {error}
          </div>
        )}

        {activeTab === "login" ? (
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-primary/60 mb-2">Email</label>
              <input 
                type="email" required value={email} onChange={e => setEmail(e.target.value)}
                className="w-full bg-transparent border-b border-primary/30 py-3 text-primary focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-primary/60 mb-2">{t("Fjalëkalimi", "Password")}</label>
              <input 
                type="password" required value={password} onChange={e => setPassword(e.target.value)}
                className="w-full bg-transparent border-b border-primary/30 py-3 text-primary focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <button type="submit" className="w-full bg-primary text-background py-4 text-xs uppercase tracking-widest hover:bg-accent transition-colors mt-4">
              {t("Hyr", "Sign In")}
            </button>
            <div className="text-center mt-4">
               <span className="text-xs text-muted-foreground">Biznes? </span>
               <span className="text-xs text-primary cursor-pointer hover:underline" onClick={() => setLocation("/business")}>{t("Aplikoni këtu", "Apply here")}</span>
            </div>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-primary/60 mb-2">{t("Emri i Plotë", "Full Name")}</label>
              <input 
                type="text" required value={name} onChange={e => setName(e.target.value)}
                className="w-full bg-transparent border-b border-primary/30 py-3 text-primary focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-primary/60 mb-2">Email</label>
              <input 
                type="email" required value={email} onChange={e => setEmail(e.target.value)}
                className="w-full bg-transparent border-b border-primary/30 py-3 text-primary focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-primary/60 mb-2">{t("Telefoni", "Phone")}</label>
              <input 
                type="tel" required value={phone} onChange={e => setPhone(e.target.value)}
                className="w-full bg-transparent border-b border-primary/30 py-3 text-primary focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-primary/60 mb-2">{t("Fjalëkalimi", "Password")}</label>
              <input 
                type="password" required value={password} onChange={e => setPassword(e.target.value)}
                className="w-full bg-transparent border-b border-primary/30 py-3 text-primary focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <button type="submit" className="w-full bg-primary text-background py-4 text-xs uppercase tracking-widest hover:bg-accent transition-colors mt-4">
              {t("Krijo Llogari", "Create Account")}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
