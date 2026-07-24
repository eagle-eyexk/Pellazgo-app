import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";

export type Role = "admin" | "business" | "client";

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  phone?: string;
  address?: string;
  company?: string;
  vatNumber?: string;
  wishlist: string[];
  createdAt: string;
  isApproved?: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (data: Partial<User>, password: string) => Promise<boolean>;
  updateProfile: (data: Partial<User>) => void;
  addToWishlist: (id: string) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const SEED_USERS: User[] = [
  { id: "admin-1", email: "admin@pellazgo.al", name: "Admin Pellazgo", role: "admin", phone: "+355 69 000 0001", createdAt: "2018-01-01", wishlist: [], isApproved: true },
  { id: "biz-1", email: "biznes@pellazgo.al", name: "Andi Hoxha — Parfume Prestige SH.P.K", role: "business", company: "Parfume Prestige SH.P.K", vatNumber: "L62309042S", phone: "+355 69 555 1234", createdAt: "2022-03-15", wishlist: [], isApproved: true },
  { id: "client-1", email: "klient@pellazgo.al", name: "Elena Duka", role: "client", phone: "+355 68 234 5678", createdAt: "2023-06-20", wishlist: ["oud-royale", "rose-de-minuit"], address: "Rruga Ismail Qemali 7, Tiranë" }
];

const SEED_PASSWORDS = {
  "admin@pellazgo.al": "Admin@2024!",
  "biznes@pellazgo.al": "Biznes@2024!",
  "klient@pellazgo.al": "Klient@2024!"
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!localStorage.getItem("pellazgo_users")) {
        localStorage.setItem("pellazgo_users", JSON.stringify(SEED_USERS));
      }
      if (!localStorage.getItem("pellazgo_passwords")) {
        localStorage.setItem("pellazgo_passwords", JSON.stringify(SEED_PASSWORDS));
      }

      const activeUserId = localStorage.getItem("pellazgo_active_user");
      if (activeUserId) {
        const users = JSON.parse(localStorage.getItem("pellazgo_users") || "[]");
        const found = users.find((u: User) => u.id === activeUserId);
        if (found) setUser(found);
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem("pellazgo_users") || "[]");
    const passwords = JSON.parse(localStorage.getItem("pellazgo_passwords") || "{}");

    const foundUser = users.find((u: User) => u.email === email);
    if (foundUser && passwords[email] === password) {
      setUser(foundUser);
      localStorage.setItem("pellazgo_active_user", foundUser.id);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("pellazgo_active_user");
  };

  const register = async (data: Partial<User>, password: string): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem("pellazgo_users") || "[]");
    const passwords = JSON.parse(localStorage.getItem("pellazgo_passwords") || "{}");

    if (users.find((u: User) => u.email === data.email)) return false;

    const newUser: User = {
      id: `user-${Date.now()}`,
      email: data.email!,
      name: data.name!,
      role: data.role || "client",
      phone: data.phone,
      address: data.address,
      company: data.company,
      vatNumber: data.vatNumber,
      wishlist: [],
      createdAt: new Date().toISOString(),
      isApproved: data.role === "business" ? false : undefined,
    };

    users.push(newUser);
    passwords[newUser.email] = password;

    localStorage.setItem("pellazgo_users", JSON.stringify(users));
    localStorage.setItem("pellazgo_passwords", JSON.stringify(passwords));

    if (newUser.role === "client") {
      setUser(newUser);
      localStorage.setItem("pellazgo_active_user", newUser.id);
    }
    
    return true;
  };

  const updateProfile = (data: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    
    const users = JSON.parse(localStorage.getItem("pellazgo_users") || "[]");
    const idx = users.findIndex((u: User) => u.id === user.id);
    if (idx !== -1) {
      users[idx] = updated;
      localStorage.setItem("pellazgo_users", JSON.stringify(users));
    }
  };

  const addToWishlist = (id: string) => {
    if (!user) {
      toast.error("Please login to save to wishlist");
      return;
    }
    if (!user.wishlist.includes(id)) {
      updateProfile({ wishlist: [...user.wishlist, id] });
      toast.success("Added to wishlist");
    }
  };

  const removeFromWishlist = (id: string) => {
    if (!user) return;
    updateProfile({ wishlist: user.wishlist.filter(item => item !== id) });
    toast.success("Removed from wishlist");
  };

  const isInWishlist = (id: string) => {
    return user ? user.wishlist.includes(id) : false;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, updateProfile, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}

export function ProtectedRoute({ children, roles }: { children: ReactNode, roles: Role[] }) {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (user === null) {
      // Small delay to allow context hydration
      const t = setTimeout(() => {
        if (!localStorage.getItem("pellazgo_active_user")) setLocation("/login");
      }, 100);
      return () => clearTimeout(t);
    } else if (user && !roles.includes(user.role)) {
      setLocation("/");
    }
  }, [user, roles, setLocation]);

  if (!user || !roles.includes(user.role)) return null;
  return <>{children}</>;
}
