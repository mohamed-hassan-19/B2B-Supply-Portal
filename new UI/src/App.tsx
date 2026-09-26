import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider, useApp } from "./context/AppContext";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CatalogPage from "./pages/CatalogPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import QuotesPage from "./pages/QuotesPage";
import InvoicesPage from "./pages/InvoicesPage";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useApp();
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/catalog"
        element={<ProtectedRoute><CatalogPage /></ProtectedRoute>}
      />
      <Route
        path="/catalog/:id"
        element={<ProtectedRoute><ProductDetailPage /></ProtectedRoute>}
      />
      <Route
        path="/cart"
        element={<ProtectedRoute><CartPage /></ProtectedRoute>}
      />
      <Route
        path="/orders"
        element={<ProtectedRoute><OrderHistoryPage /></ProtectedRoute>}
      />
      <Route
        path="/quotes"
        element={<ProtectedRoute><QuotesPage /></ProtectedRoute>}
      />
      <Route
        path="/invoices"
        element={<ProtectedRoute><InvoicesPage /></ProtectedRoute>}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </BrowserRouter>
  );
}
