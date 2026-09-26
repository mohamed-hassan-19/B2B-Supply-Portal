import { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "../data/mockData";

interface CartItem {
  product: Product;
  qty: number;
}

interface AppContextType {
  isLoggedIn: boolean;
  isPendingApproval: boolean;
  isCreditApproved: boolean;
  cartItems: CartItem[];
  login: () => void;
  logout: () => void;
  addToCart: (product: Product, qty: number) => void;
  removeFromCart: (sku: string) => void;
  updateQty: (sku: string, qty: number) => void;
  cartTotal: number;
  cartCount: number;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPendingApproval] = useState(false);
  const [isCreditApproved] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const login = () => setIsLoggedIn(true);
  const logout = () => {
    setIsLoggedIn(false);
    setCartItems([]);
  };

  const addToCart = (product: Product, qty: number) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.product.sku === product.sku);
      if (existing) {
        return prev.map((i) => i.product.sku === product.sku ? { ...i, qty: i.qty + qty } : i);
      }
      return [...prev, { product, qty }];
    });
  };

  const removeFromCart = (sku: string) => {
    setCartItems((prev) => prev.filter((i) => i.product.sku !== sku));
  };

  const updateQty = (sku: string, qty: number) => {
    if (qty <= 0) { removeFromCart(sku); return; }
    setCartItems((prev) => prev.map((i) => i.product.sku === sku ? { ...i, qty } : i));
  };

  const cartTotal = cartItems.reduce((sum, i) => sum + i.product.price * i.qty, 0);
  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);

  return (
    <AppContext.Provider value={{ isLoggedIn, isPendingApproval, isCreditApproved, cartItems, login, logout, addToCart, removeFromCart, updateQty, cartTotal, cartCount }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
