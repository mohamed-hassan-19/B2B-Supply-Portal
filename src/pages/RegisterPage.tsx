import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Eye, EyeOff } from 'lucide-react';
import { api } from "../lib/api";

type PaymentPref = "cod" | "credit" | "";
type Step = "form" | "pending";

export default function RegisterPage() {
  const [step, setStep] = useState<Step>("form");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [paymentPref, setPaymentPref] = useState<PaymentPref>("");
  const [form, setForm] = useState({
    companyName: "",
    email: "",
    password: "",
    taxReg: "",
    commercialReg: "",
    phone: "",
    contactName: "",
    city: "",
  });

  const [error, setError] = useState("");

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.post("/api/client/auth/register", {
        company_name: form.companyName,
        tax_id: form.taxReg,
        email: form.email,
        password: form.password,
        contact_phone: form.phone,
        contact_address: form.city,
        preferred_payment_method: paymentPref === "cod" ? "COD" : "Credit"
      });
      setStep("pending");
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    background: "#F4F2EC",
    border: "1.5px solid rgba(17,20,28,0.15)",
    color: "#11141C",
  };

  const inputClass = "w-full px-3.5 py-2.5 rounded-lg text-sm outline-none transition-all";

  if (step === "pending") {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
        style={{ background: "#F4F2EC" }}
      >
        <div
          className="w-full max-w-md rounded-xl p-10 text-center"
          style={{ background: "#fff", border: "1px solid rgba(17,20,28,0.1)" }}
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: "rgba(255,90,31,0.1)" }}
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M14 3l2 6h6l-5 3.5 2 6L14 15l-5 3.5 2-6L6 9h6l2-6z" stroke="#FF5A1F" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
          </div>
          <div
            className="stamp-badge inline-block px-4 py-1.5 mb-5 font-mono text-xs font-bold tracking-widest uppercase rounded border"
            style={{ background: "rgba(255,90,31,0.1)", color: "#FF5A1F", borderColor: "rgba(255,90,31,0.4)" }}
          >
            قيد المراجعة
          </div>
          <h2 className="font-display font-bold text-2xl mb-3" style={{ color: "#11141C" }}>
            تم استلام طلب التسجيل
          </h2>
          <p className="text-sm leading-relaxed mb-6" style={{ color: "#8A8D9B" }}>
            سيقوم فريقنا بمراجعة بيانات شركتك والتحقق من السجلات التجارية. ستصلك رسالة بريد إلكتروني خلال 24-48 ساعة عمل.
          </p>
          <div
            className="rounded-lg p-4 mb-6 text-right"
            style={{ background: "#F4F2EC", border: "1px dashed rgba(17,20,28,0.15)" }}
          >
            <div className="font-mono text-xs" style={{ color: "#8A8D9B" }}>رقم الطلب</div>
            <div className="font-mono font-bold text-sm mt-0.5" style={{ color: "#FF5A1F" }}>
              REG-{Date.now().toString().slice(-8)}
            </div>
          </div>
          <Link
            to="/login"
            className="inline-block px-6 py-2.5 rounded-lg font-semibold text-sm"
            style={{ background: "#FF5A1F", color: "#fff" }}
          >
            العودة لتسجيل الدخول
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center px-4 py-12"
      style={{ background: "#F4F2EC" }}
    >
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
        className="w-full max-w-lg rounded-xl p-8"
        style={{ background: "#fff", border: "1px solid rgba(17,20,28,0.1)", boxShadow: "0 4px 24px rgba(17,20,28,0.06)" }}
      >
        <h1 className="font-display font-bold text-2xl mb-1" style={{ color: "#11141C" }}>
          تسجيل شركة جديدة
        </h1>
        <p className="text-sm mb-7" style={{ color: "#8A8D9B" }}>
          للوصول إلى الكتالوج الكامل والأسعار التجارية
        </p>

        {error && <div className="mb-4 p-3 bg-red-50 text-red-700 border border-red-200 rounded text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Company info */}
          <div
            className="p-4 rounded-lg mb-1"
            style={{ background: "#F4F2EC", border: "1px solid rgba(17,20,28,0.08)" }}
          >
            <div className="font-mono text-[10px] font-semibold mb-3 uppercase" style={{ color: "#8A8D9B" }}>
              بيانات الشركة
            </div>
            <div className="flex flex-col gap-3">
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: "#11141C" }}>اسم الشركة</label>
                <input value={form.companyName} onChange={set("companyName")} required placeholder="شركة النيل للإنشاءات" className={inputClass} style={inputStyle} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: "#11141C" }}>السجل التجاري</label>
                  <input value={form.commercialReg} onChange={set("commercialReg")} required placeholder="12345678" className={`${inputClass} font-mono`} style={inputStyle} />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: "#11141C" }}>الرقم الضريبي</label>
                  <input value={form.taxReg} onChange={set("taxReg")} required placeholder="987654321" className={`${inputClass} font-mono`} style={inputStyle} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: "#11141C" }}>المدينة</label>
                <select value={form.city} onChange={set("city")} required className={inputClass} style={inputStyle}>
                  <option value="">اختر المدينة</option>
                  <option>القاهرة</option>
                  <option>الجيزة</option>
                  <option>الإسكندرية</option>
                  <option>المنصورة</option>
                  <option>طنطا</option>
                  <option>أسيوط</option>
                  <option>بورسعيد</option>
                  <option>السويس</option>
                </select>
              </div>
            </div>
          </div>

          {/* Contact info */}
          <div
            className="p-4 rounded-lg mb-1"
            style={{ background: "#F4F2EC", border: "1px solid rgba(17,20,28,0.08)" }}
          >
            <div className="font-mono text-[10px] font-semibold mb-3 uppercase" style={{ color: "#8A8D9B" }}>
              بيانات المسؤول
            </div>
            <div className="flex flex-col gap-3">
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: "#11141C" }}>الاسم الكامل</label>
                <input value={form.contactName} onChange={set("contactName")} required placeholder="أحمد محمد السيد" className={inputClass} style={inputStyle} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: "#11141C" }}>البريد الإلكتروني</label>
                  <input type="email" value={form.email} onChange={set("email")} required placeholder="ahmed@company.com" className={`${inputClass} font-mono`} style={inputStyle} />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: "#11141C" }}>رقم الهاتف</label>
                  <input type="tel" value={form.phone} onChange={set("phone")} required placeholder="01xxxxxxxxx" className={`${inputClass} font-mono`} style={inputStyle} />
                </div>
              </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: "#11141C" }}>كلمة المرور</label>
                  <div className="relative">
                    <input type={showPassword ? "text" : "password"} value={form.password} onChange={set("password")} required placeholder="••••••••" className={`${inputClass} pr-10`} style={inputStyle} />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
            </div>
          </div>

          {/* Payment preference */}
          <div
            className="p-4 rounded-lg"
            style={{ background: "#F4F2EC", border: "1px solid rgba(17,20,28,0.08)" }}
          >
            <div className="font-mono text-[10px] font-semibold mb-3 uppercase" style={{ color: "#8A8D9B" }}>
              طريقة الدفع المفضلة
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { val: "cod" as PaymentPref, label: "دفع عند الاستلام", sub: "COD", desc: "متاح فوراً" },
                { val: "credit" as PaymentPref, label: "ائتمان تجاري", sub: "NET 30", desc: "يتطلب اعتماد" },
              ].map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => setPaymentPref(opt.val)}
                  className="p-3 rounded-lg text-right border-2 transition-all"
                  style={{
                    borderColor: paymentPref === opt.val ? (opt.val === "credit" ? "#3A5CFF" : "#FF5A1F") : "rgba(17,20,28,0.12)",
                    background: paymentPref === opt.val ? (opt.val === "credit" ? "rgba(58,92,255,0.06)" : "rgba(255,90,31,0.06)") : "transparent",
                  }}
                >
                  <div className="font-mono text-[9px] font-bold mb-1" style={{ color: opt.val === "credit" ? "#3A5CFF" : "#FF5A1F" }}>
                    {opt.sub}
                  </div>
                  <div className="font-semibold text-xs" style={{ color: "#11141C" }}>{opt.label}</div>
                  <div className="text-[10px] mt-0.5" style={{ color: "#8A8D9B" }}>{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg font-bold text-sm mt-1 transition-opacity"
            style={{ background: "#FF5A1F", color: "#fff", opacity: loading ? 0.7 : 1 }}
          >
            {loading ? "جاري إرسال الطلب..." : "إرسال طلب التسجيل"}
          </button>
        </form>

        <p className="text-center text-sm mt-5" style={{ color: "#8A8D9B" }}>
          لديك حساب بالفعل؟{" "}
          <Link to="/login" className="font-semibold" style={{ color: "#FF5A1F" }}>
            تسجيل الدخول
          </Link>
        </p>
      </div>
    </div>
  );
}
