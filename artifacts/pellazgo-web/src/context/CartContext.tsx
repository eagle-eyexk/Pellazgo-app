import { createContext, useContext, useState, ReactNode, useMemo } from 'react';

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addToCart = (newItem: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.productId === newItem.productId);
      if (existingItem) {
        return currentItems.map((item) =>
          item.productId === newItem.productId
            ? { ...item, quantity: item.quantity + (newItem.quantity || 1) }
            : item
        );
      }
      return [...currentItems, { ...newItem, quantity: newItem.quantity || 1 }];
    });
    setIsOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setItems((currentItems) => currentItems.filter((item) => item.productId !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const cartCount = useMemo(() => items.reduce((total, item) => total + item.quantity, 0), [items]);
  const cartTotal = useMemo(() => items.reduce((total, item) => total + item.price * item.quantity, 0), [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isOpen,
        setIsOpen,
        cartCount,
        cartTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
