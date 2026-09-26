import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function LoginPage() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login();
      navigate("/catalog");
    }, 800);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
      style={{ background: "#FAF7EE" }}
    >
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 mb-10">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
          style={{ background: "#FFC629", color: "#1A1F2E" }}
        >
          M
        </div>
        <span className="font-display font-bold text-xl tracking-tight" style={{ color: "#1A1F2E" }}>
          Masnood
        </span>
      </Link>

      <div
        className="w-full max-w-md rounded-xl p-8"
        style={{ background: "#fff", border: "1px solid rgba(17,20,28,0.1)", boxShadow: "0 4px 24px rgba(17,20,28,0.06)" }}
      >
        <h1 className="font-display font-bold text-2xl mb-1" style={{ color: "#1A1F2E" }}>
          تسجيل الدخول
        </h1>
        <p className="text-sm mb-7" style={{ color: "#8A8D9B" }}>
          مرحباً بك في منصة Masnood للمشتريات
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: "#1A1F2E" }}>
              البريد الإلكتروني
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="info@company.com"
              required
              className="w-full px-3.5 py-2.5 rounded-lg text-sm outline-none transition-all font-mono"
              style={{
                background: "#FAF7EE",
                border: "1.5px solid rgba(17,20,28,0.15)",
                color: "#1A1F2E",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#FFC629")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(17,20,28,0.15)")}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold" style={{ color: "#1A1F2E" }}>
                كلمة المرور
              </label>
              <button type="button" className="text-xs" style={{ color: "#3A5CFF" }}>
                نسيت كلمة المرور؟
              </button>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-3.5 py-2.5 rounded-lg text-sm outline-none transition-all"
              style={{
                background: "#FAF7EE",
                border: "1.5px solid rgba(17,20,28,0.15)",
                color: "#1A1F2E",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#FFC629")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(17,20,28,0.15)")}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg font-bold text-sm mt-1 transition-opacity"
            style={{ background: "#FFC629", color: "#1A1F2E", opacity: loading ? 0.7 : 1 }}
          >
            {loading ? "جاري الدخول..." : "دخول"}
          </button>
        </form>

        <div className="manifest-divider mt-6 mb-5" style={{ borderColor: "rgba(17,20,28,0.1)" }} />

        <p className="text-center text-sm" style={{ color: "#8A8D9B" }}>
          ليس لديك حساب؟{" "}
          <Link to="/register" className="font-semibold" style={{ color: "#FFC629", textDecoration: "underline", textDecorationColor: "#FFC629" }}>
            سجّل شركتك
          </Link>
        </p>
      </div>
    </div>
  );
}
