import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/client/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to login");
      
      login(data.access_token);
      navigate("/catalog");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
      style={{ background: "#F4F2EC" }}
    >
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 mb-10">
        <div
          className="w-8 h-8 rounded flex items-center justify-center font-bold text-sm"
          style={{ background: "#FF5A1F", color: "#fff" }}
        >
          L
        </div>
        <span className="font-display font-bold text-xl tracking-tight" style={{ color: "#11141C" }}>
          Lista
        </span>
      </Link>

      <div
        className="w-full max-w-md rounded-xl p-8"
        style={{ background: "#fff", border: "1px solid rgba(17,20,28,0.1)", boxShadow: "0 4px 24px rgba(17,20,28,0.06)" }}
      >
        <h1 className="font-display font-bold text-2xl mb-1" style={{ color: "#11141C" }}>
          تسجيل الدخول
        </h1>
        <p className="text-sm mb-7" style={{ color: "#8A8D9B" }}>
          مرحباً بك في منصة Lista للمشتريات
        </p>

        {error && <div className="mb-4 rounded p-3 text-sm" style={{ background: "#FFEBEB", color: "#E02D2D" }}>{error}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: "#11141C" }}>
              البريد الإلكتروني
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="info@company.com"
              required
              dir="ltr"
              className="w-full px-3.5 py-2.5 rounded-lg text-sm outline-none transition-all font-mono text-left"
              style={{
                background: "#F4F2EC",
                border: "1.5px solid rgba(17,20,28,0.15)",
                color: "#11141C",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#FF5A1F")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(17,20,28,0.15)")}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold" style={{ color: "#11141C" }}>
                كلمة المرور
              </label>
              {/*
              <button type="button" className="text-xs" style={{ color: "#3A5CFF" }}>
                نسيت كلمة المرور؟
              </button>
              */}
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                dir="ltr"
                className="w-full px-3.5 py-2.5 rounded-lg text-sm outline-none transition-all pr-10 text-left"
                style={{
                  background: "#F4F2EC",
                  border: "1.5px solid rgba(17,20,28,0.15)",
                  color: "#11141C",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#FF5A1F")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(17,20,28,0.15)")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg font-bold text-sm mt-1 transition-opacity"
            style={{ background: "#FF5A1F", color: "#fff", opacity: loading ? 0.7 : 1 }}
          >
            {loading ? "جاري الدخول..." : "دخول"}
          </button>
        </form>

        <div className="manifest-divider mt-6 mb-5" style={{ borderColor: "rgba(17,20,28,0.1)", borderTopWidth: "1px" }} />

        <p className="text-center text-sm" style={{ color: "#8A8D9B" }}>
          ليس لديك حساب؟{" "}
          <Link to="/register" className="font-semibold" style={{ color: "#FF5A1F" }}>
            سجّل شركتك
          </Link>
        </p>
      </div>
    </div>
  );
}
