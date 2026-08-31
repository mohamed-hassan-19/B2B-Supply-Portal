import { useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { formatPrice } from "../data/mockData";
import NavBar from "../components/NavBar";
import StampBadge from "../components/StampBadge";
import { api } from "../lib/api";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQty, cartTotal, isCreditApproved } = useApp();
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "credit">("cod");
  const [submitted, setSubmitted] = useState(false);
  const [orderId] = useState(`ORD-2024-${String(Math.floor(1000 + Math.random() * 9000))}`);

  if (submitted) {
    return (
      <div style={{ background: "#F4F2EC", minHeight: "100vh" }}>
        <NavBar />
        <div className="max-w-xl mx-auto px-4 py-20 text-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: "rgba(34,197,94,0.1)" }}
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M6 14l5 5 11-11" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="mb-4">
            <StampBadge status="approved" label="تم إرسال الطلب" size="md" />
          </div>
          <h2 className="font-display font-bold text-2xl mb-3" style={{ color: "#11141C" }}>
            تم تأكيد طلبك
          </h2>
          <div className="font-mono text-sm mb-2" style={{ color: "#FF5A1F" }}>{orderId}</div>
          <p className="text-sm mb-8" style={{ color: "#8A8D9B" }}>
            سيصلك تأكيد بالبريد الإلكتروني وسنتواصل معك لتحديد موعد التسليم.
          </p>
          <div className="flex gap-3 justify-center">
            <Link
              to="/orders"
              className="px-5 py-2.5 rounded-lg font-semibold text-sm"
              style={{ background: "#FF5A1F", color: "#fff" }}
            >
              متابعة الطلبات
            </Link>
            <Link
              to="/catalog"
              className="px-5 py-2.5 rounded-lg font-semibold text-sm border"
              style={{ color: "#6b7280", borderColor: "rgba(17,20,28,0.15)", background: "transparent" }}
            >
              مواصلة التسوق
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div style={{ background: "#F4F2EC", minHeight: "100vh" }}>
        <NavBar />
        <div className="max-w-xl mx-auto px-4 py-20 text-center">
          <div className="font-mono text-5xl mb-4" style={{ color: "#E7E3D8" }}>⬡</div>
          <h2 className="font-display font-bold text-xl mb-2" style={{ color: "#11141C" }}>سلتك فارغة</h2>
          <p className="text-sm mb-6" style={{ color: "#8A8D9B" }}>أضف أصناف من الكتالوج لبدء الطلب</p>
          <Link
            to="/catalog"
            className="inline-block px-6 py-2.5 rounded-lg font-semibold text-sm"
            style={{ background: "#FF5A1F", color: "#fff" }}
          >
            تصفح الكتالوج
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#F4F2EC", minHeight: "100vh" }}>
      <NavBar />
      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8">
        <h1 className="font-display font-bold text-2xl mb-6" style={{ color: "#11141C" }}>مراجعة الطلب</h1>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Manifest card */}
          <div className="lg:col-span-2">
            <div
              className="rounded-xl overflow-hidden"
              style={{ background: "#fff", border: "1px solid rgba(17,20,28,0.1)" }}
            >
              {/* Header */}
              <div className="px-6 py-4" style={{ borderBottom: "1px solid rgba(17,20,28,0.08)" }}>
                <div className="font-mono text-xs font-semibold" style={{ color: "#FF5A1F" }}>
                  طلب جديد — {new Date().toLocaleDateString("ar-EG")}
                </div>
              </div>

              {/* Items */}
              <div className="px-6 py-2">
                <div
                  className="grid text-[10px] font-mono font-semibold py-2"
                  style={{ gridTemplateColumns: "1fr 100px 80px 80px 32px", color: "#8A8D9B", gap: "0 8px" }}
                >
                  <span>الصنف</span>
                  <span className="text-center">الكمية</span>
                  <span className="text-left">السعر</span>
                  <span className="text-left">الإجمالي</span>
                  <span />
                </div>
                <div className="manifest-divider" style={{ borderColor: "rgba(17,20,28,0.08)" }} />

                {cartItems.map(({ product: p, qty }) => (
                  <div
                    key={p.sku}
                    className="grid items-center py-3"
                    style={{ gridTemplateColumns: "1fr 100px 80px 80px 32px", gap: "0 8px", borderBottom: "1px solid rgba(17,20,28,0.04)" }}
                  >
                    <div>
                      <div className="font-medium text-sm" style={{ color: "#11141C" }}>{p.nameAr}</div>
                      <div className="font-mono text-[10px] mt-0.5" style={{ color: "#8A8D9B" }}>{p.sku}</div>
                    </div>
                    <div className="flex items-center gap-1 justify-center">
                      <button
                        onClick={() => updateQty(p.sku, qty - 1)}
                        className="w-6 h-6 rounded border flex items-center justify-center text-sm"
                        style={{ borderColor: "rgba(17,20,28,0.15)", color: "#11141C" }}
                      >
                        −
                      </button>
                      <span className="font-mono text-xs w-8 text-center" style={{ color: "#11141C" }}>{qty}</span>
                      <button
                        onClick={() => updateQty(p.sku, qty + 1)}
                        className="w-6 h-6 rounded border flex items-center justify-center text-sm"
                        style={{ borderColor: "rgba(17,20,28,0.15)", color: "#11141C" }}
                      >
                        +
                      </button>
                    </div>
                    <div className="font-mono text-xs" style={{ color: "#8A8D9B", textAlign: "left" }}>{formatPrice(p.price)}</div>
                    <div className="font-mono text-xs font-semibold" style={{ color: "#11141C", textAlign: "left" }}>{formatPrice(p.price * qty)}</div>
                    <button
                      onClick={() => removeFromCart(p.sku)}
                      className="w-6 h-6 flex items-center justify-center rounded transition-colors hover:bg-red-50"
                      style={{ color: "#8A8D9B" }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div
                className="flex items-center justify-between px-6 py-4"
                style={{ background: "#11141C" }}
              >
                <span className="font-mono text-xs" style={{ color: "#8A8D9B" }}>
                  {cartItems.length} صنف
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs" style={{ color: "#8A8D9B" }}>الإجمالي</span>
                  <span className="font-mono font-bold text-xl" style={{ color: "#FF5A1F" }}>
                    {formatPrice(cartTotal)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right panel */}
          <div className="flex flex-col gap-4">
            {/* Payment method */}
            <div
              className="rounded-xl p-5"
              style={{ background: "#fff", border: "1px solid rgba(17,20,28,0.1)" }}
            >
              <div className="font-mono text-[10px] font-semibold uppercase mb-3" style={{ color: "#8A8D9B" }}>
                طريقة الدفع
              </div>
              <div className="flex flex-col gap-2">
                {[
                  { val: "cod" as const, label: "دفع عند الاستلام", sub: "COD", available: true },
                  { val: "credit" as const, label: "ائتمان صافي 30", sub: "NET·30", available: isCreditApproved },
                ].map((opt) => (
                  <button
                    key={opt.val}
                    type="button"
                    disabled={!opt.available}
                    onClick={() => opt.available && setPaymentMethod(opt.val)}
                    className="flex items-center gap-3 p-3 rounded-lg border-2 text-right transition-all"
                    style={{
                      borderColor: paymentMethod === opt.val ? "#FF5A1F" : "rgba(17,20,28,0.1)",
                      background: paymentMethod === opt.val ? "rgba(255,90,31,0.04)" : "transparent",
                      opacity: opt.available ? 1 : 0.4,
                      cursor: opt.available ? "pointer" : "not-allowed",
                    }}
                  >
                    <div
                      className="w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                      style={{
                        borderColor: paymentMethod === opt.val ? "#FF5A1F" : "rgba(17,20,28,0.2)",
                      }}
                    >
                      {paymentMethod === opt.val && (
                        <div className="w-2 h-2 rounded-full" style={{ background: "#FF5A1F" }} />
                      )}
                    </div>
                    <div>
                      <div className="text-xs font-semibold" style={{ color: "#11141C" }}>{opt.label}</div>
                      <div className="font-mono text-[9px]" style={{ color: opt.available ? "#3A5CFF" : "#8A8D9B" }}>
                        {opt.available ? opt.sub : "يتطلب اعتماد الائتمان"}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div
              className="rounded-xl p-5"
              style={{ background: "#fff", border: "1px solid rgba(17,20,28,0.1)" }}
            >
              <div className="font-mono text-[10px] font-semibold uppercase mb-3" style={{ color: "#8A8D9B" }}>
                ملخص الطلب
              </div>
              <div className="flex justify-between text-xs mb-1.5">
                <span style={{ color: "#6b7280" }}>المجموع الفرعي</span>
                <span className="font-mono font-semibold" style={{ color: "#11141C" }}>{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-xs mb-3">
                <span style={{ color: "#6b7280" }}>الشحن</span>
                <span className="font-mono text-xs" style={{ color: "#3A5CFF" }}>يُحدد لاحقاً</span>
              </div>
              <div className="manifest-divider mb-3" style={{ borderColor: "rgba(17,20,28,0.1)" }} />
              <div className="flex justify-between items-center">
                <span className="font-semibold text-sm" style={{ color: "#11141C" }}>الإجمالي</span>
                <span className="font-mono font-bold text-lg" style={{ color: "#FF5A1F" }}>{formatPrice(cartTotal)}</span>
              </div>
            </div>

            <button
              onClick={async () => {
                try {
                  await api.post('/api/storefront/orders', {
                    paymentMethod: paymentMethod === "cod" ? "COD" : "Credit",
                    items: cartItems.map(i => ({
                       productId: parseInt(i.product.id),
                       quantity: i.qty
                    }))
                  });
                  setSubmitted(true);
                } catch (err: any) {
                  alert("Failed to submit order: " + (err.response?.data?.message || err.message));
                }
              }}
              className="w-full py-3.5 rounded-xl font-bold text-sm transition-opacity hover:opacity-90"
              style={{ background: "#FF5A1F", color: "#fff" }}
            >
              تأكيد الطلب
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
