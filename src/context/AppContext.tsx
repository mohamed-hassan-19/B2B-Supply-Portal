import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Product } from "../data/mockData";
import { jwtDecode } from "jwt-decode";

interface CartItem {
  product: Product;
  qty: number;
  purchase_unit?: 'single' | 'dozen';
}

interface AppContextType {
  isLoggedIn: boolean;
  isPendingApproval: boolean;
  isCreditApproved: boolean;
  cartItems: CartItem[];
  login: (token: string) => void;
  logout: () => void;
  addToCart: (product: Product, qty: number, purchase_unit?: 'single' | 'dozen') => void;
  removeFromCart: (sku: string, purchase_unit?: 'single' | 'dozen') => void;
  updateQty: (sku: string, qty: number, purchase_unit?: 'single' | 'dozen') => void;
  cartTotal: number;
  cartCount: number;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const token = localStorage.getItem("client_token");
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        if (decoded.exp * 1000 >= Date.now()) return true;
      } catch (err) {}
    }
    return false;
  });

  const [isPendingApproval, setIsPendingApproval] = useState(() => {
    const token = localStorage.getItem("client_token");
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        if (decoded.exp * 1000 >= Date.now()) return decoded.status === "pending";
      } catch (err) {}
    }
    return false;
  });

  const [isCreditApproved, setIsCreditApproved] = useState(() => {
    const token = localStorage.getItem("client_token");
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        if (decoded.exp * 1000 >= Date.now()) return decoded.status === "approved";
      } catch (err) {}
    }
    return false;
  });

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("client_token");
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem("client_token");
        } else {
          setIsLoggedIn(true);
          setIsPendingApproval(decoded.status === "pending");
          // Just assume true if they are approved for this simple setup
          setIsCreditApproved(decoded.status === "approved"); 
        }
      } catch (err) {
        localStorage.removeItem("client_token");
      }
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem("client_token", token);
    const decoded: any = jwtDecode(token);
    setIsLoggedIn(true);
    setIsPendingApproval(decoded.status === "pending");
    setIsCreditApproved(decoded.status === "approved"); 
  };

  const logout = () => {
    localStorage.removeItem("client_token");
    setIsLoggedIn(false);
    setCartItems([]);
  };

  const addToCart = (product: Product, qty: number, purchase_unit: 'single' | 'dozen' = 'single') => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.product.sku === product.sku && i.purchase_unit === purchase_unit);
      if (existing) {
        return prev.map((i) => i.product.sku === product.sku && i.purchase_unit === purchase_unit ? { ...i, qty: i.qty + qty } : i);
      }
      return [...prev, { product, qty, purchase_unit }];
    });
  };

  const removeFromCart = (sku: string, purchase_unit: 'single' | 'dozen' = 'single') => {
    setCartItems((prev) => prev.filter((i) => !(i.product.sku === sku && i.purchase_unit === purchase_unit)));
  };

  const updateQty = (sku: string, qty: number, purchase_unit: 'single' | 'dozen' = 'single') => {
    if (qty <= 0) { removeFromCart(sku, purchase_unit); return; }
    setCartItems((prev) => prev.map((i) => i.product.sku === sku && i.purchase_unit === purchase_unit ? { ...i, qty } : i));
  };

  const cartTotal = cartItems.reduce((sum, i) => {
    const price = i.purchase_unit === 'dozen' ? (i.product as any).dozenPrice : i.product.price;
    return sum + (price || i.product.price) * i.qty;
  }, 0);
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
