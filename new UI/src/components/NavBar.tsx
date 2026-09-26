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
        <div className="announce-bar">
          حسابك قيد المراجعة — سيتم تفعيل الخدمة الكاملة بعد الاعتماد
        </div>
      )}
      <nav
        className="sticky top-0 z-50 w-full"
        style={{ background: "#1A1F2E", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
          <Link to="/" className="flex items-center gap-2.5 select-none">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
              style={{ background: "#FFC629", color: "#1A1F2E" }}
            >
              M
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display font-bold text-base" style={{ color: "#FFC629", lineHeight: 1.1 }}>
                Masnood
              </span>
              <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.4)", lineHeight: 1.2 }}>
                توريدات وخدمات الشركات
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-3 py-1.5 rounded text-sm font-medium transition-colors"
                style={{
                  color: isActive(link.to) ? "#FFC629" : "rgba(255,255,255,0.55)",
                  background: isActive(link.to) ? "rgba(255,198,41,0.1)" : "transparent",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/cart"
              className="relative flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-medium transition-colors"
              style={{
                color: isActive("/cart") ? "#FFC629" : "rgba(255,255,255,0.75)",
                background: isActive("/cart") ? "rgba(255,198,41,0.1)" : "rgba(255,255,255,0.06)",
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
                  style={{ background: "#FFC629", color: "#1A1F2E" }}
                >
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              onClick={logout}
              className="text-xs font-mono px-3 py-1.5 rounded border transition-colors"
              style={{ color: "rgba(255,255,255,0.4)", borderColor: "rgba(255,255,255,0.1)", background: "transparent" }}
            >
              خروج
            </button>
          </div>
        </div>

        <div className="flex md:hidden overflow-x-auto px-4 pb-2 gap-1" style={{ scrollbarWidth: "none" }}>
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="flex-shrink-0 px-3 py-1 rounded text-xs font-medium"
              style={{
                color: isActive(link.to) ? "#FFC629" : "rgba(255,255,255,0.5)",
                background: isActive(link.to) ? "rgba(255,198,41,0.1)" : "transparent",
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
