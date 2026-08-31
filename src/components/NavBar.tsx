import { Link, useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function NavBar() {
  const { logout, cartCount, isPendingApproval } = useApp();
  const location = useLocation();

  const links = [
    { to: "/catalog", label: "الكتالوج" },
    { to: "/orders", label: "طلباتي" },
    { to: "/quotes", label: "عروض الأسعار" },
    { to: "/invoices", label: "الفواتير" },
  ];

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <>
      {isPendingApproval && (
        <div
          className="w-full text-center py-2 text-xs font-mono font-semibold"
          style={{ background: "rgba(255,90,31,0.15)", color: "#FF5A1F", borderBottom: "1px solid rgba(255,90,31,0.3)" }}
        >
          حسابك قيد المراجعة — سيتم تفعيل الخدمة الكاملة بعد الاعتماد
        </div>
      )}
      <nav
        className="sticky top-0 z-50 w-full"
        style={{
          background: "#1B2030",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 select-none">
            <div
              className="w-7 h-7 rounded flex items-center justify-center font-display font-bold text-xs"
              style={{ background: "#FF5A1F", color: "#fff" }}
            >
              L
            </div>
            <span className="font-display font-bold text-base tracking-tight" style={{ color: "#F4F2EC" }}>
              LISTO
            </span>
          </Link>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-3 py-1.5 rounded text-sm font-medium transition-colors"
                style={{
                  color: isActive(link.to) ? "#FF5A1F" : "#8A8D9B",
                  background: isActive(link.to) ? "rgba(255,90,31,0.1)" : "transparent",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <Link
              to="/cart"
              className="relative flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-medium transition-colors"
              style={{
                color: isActive("/cart") ? "#FF5A1F" : "#F4F2EC",
                background: isActive("/cart") ? "rgba(255,90,31,0.1)" : "rgba(255,255,255,0.05)",
              }}
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M1 1h2l2 8h7l1.5-5H4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="6" cy="12.5" r="0.8" fill="currentColor" />
                <circle cx="10" cy="12.5" r="0.8" fill="currentColor" />
              </svg>
              السلة
              {cartCount > 0 && (
                <span
                  className="absolute -top-1 -left-1 w-4 h-4 rounded-full flex items-center justify-center font-mono text-[9px] font-bold"
                  style={{ background: "#FF5A1F", color: "#fff" }}
                >
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              onClick={logout}
              className="text-xs font-mono px-3 py-1.5 rounded border transition-colors"
              style={{ color: "#8A8D9B", borderColor: "rgba(138,141,155,0.2)", background: "transparent" }}
            >
             خروج
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        <div
          className="flex md:hidden overflow-x-auto px-4 pb-2 gap-1"
          style={{ scrollbarWidth: "none" }}
        >
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="flex-shrink-0 px-3 py-1 rounded text-xs font-medium"
              style={{
                color: isActive(link.to) ? "#FF5A1F" : "#8A8D9B",
                background: isActive(link.to) ? "rgba(255,90,31,0.1)" : "transparent",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
