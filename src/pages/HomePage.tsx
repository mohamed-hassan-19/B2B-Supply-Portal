import { Link } from "react-router-dom";
import ManifestCard from "../components/ManifestCard";
import { PRODUCTS, formatPrice } from "../data/mockData";
import { useApp } from "../context/AppContext";

const SAMPLE_ORDER = {
  id: "ORD-2024-0041",
  date: "2024-11-15",
  status: "approved" as const,
  paymentMethod: "credit",
  total: 47500,
  items: [
    { sku: "STL-PIPE-001", nameAr: "أنابيب فولاذية مجلفنة", qty: 40, unit: "طن", unitPrice: 850 },
    { sku: "BOLT-SS-008", nameAr: "براغي ومسامير", qty: 150, unit: "علبة", unitPrice: 65 },
    { sku: "SAF-HELM-003", nameAr: "خوذات أمان صناعية", qty: 50, unit: "قطعة", unitPrice: 95 },
  ],
};

const STATS = [
  { value: "+٤٢٠٠٠", label: "صنف في الكتالوج", mono: true },
  { value: "٢٤ ساعة", label: "متوسط الرد على عروض الأسعار", mono: true },
  { value: "٩٨٪", label: "معدل الوفاء بالطلبات", mono: false },
  { value: "صافي ٣٠", label: "شروط الائتمان المتاحة", mono: true },
];

const STEPS = [
  { num: "01", titleAr: "تصفح وأضف إلى السلة", descAr: "استعرض الكتالوج وابحث بالصنف أو رقم SKU. أضف الكميات المطلوبة مباشرة." },
  { num: "02", titleAr: "اختر طريقة الدفع", descAr: "الدفع عند الاستلام أو الائتمان التجاري صافي 30 يوم للحسابات المعتمدة." },
  { num: "03", titleAr: "تتبع حالة الطلب", descAr: "سجل الطلبات، والفواتير، وعروض الأسعار — كلها في مكان واحد." },
];

export default function HomePage() {
  const { isLoggedIn } = useApp();
  const previewProducts = PRODUCTS.slice(0, 4);

  return (
    <div style={{ background: "#F4F2EC", minHeight: "100vh" }}>
      {/* Top mini-nav for home */}
      <nav
        className="w-full sticky top-0 z-50"
        style={{ background: "rgba(17,20,28,0.97)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between h-14">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded flex items-center justify-center font-bold text-xs"
              style={{ background: "#FF5A1F", color: "#fff" }}
            >
              L
            </div>
            <span className="font-display font-bold text-base tracking-tight" style={{ color: "#F4F2EC" }}>
              Lista
            </span>
          </div>
          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <Link
                to="/catalog"
                className="px-4 py-1.5 rounded text-sm font-semibold"
                style={{ background: "#FF5A1F", color: "#fff" }}
              >
                الكتالوج
              </Link>
            ) : (
              <>
                <Link to="/login" className="text-sm font-medium" style={{ color: "#8A8D9B" }}>
                  تسجيل الدخول
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-1.5 rounded text-sm font-semibold"
                  style={{ background: "#FF5A1F", color: "#fff" }}
                >
                  ابدأ الآن
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero section — dark */}
      <section
        className="relative overflow-hidden"
        style={{ background: "#11141C", minHeight: "88vh" }}
      >
        {/* Background grid texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, #fff 0, #fff 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, #fff 0, #fff 1px, transparent 1px, transparent 60px)",
          }}
        />

        {/* Hazard stripe accent */}
        <div
          className="absolute top-0 right-0 w-1 h-full"
          style={{
            background: "repeating-linear-gradient(180deg, #FF5A1F 0, #FF5A1F 24px, transparent 24px, transparent 48px)",
            opacity: 0.6,
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: text */}
            <div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6 text-xs font-mono font-semibold"
                style={{ background: "rgba(255,90,31,0.12)", color: "#FF5A1F", border: "1px solid rgba(255,90,31,0.25)" }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "#FF5A1F" }}
                />
                منصة المشتريات B2B — السوق المصري
              </div>

              <h1
                className="font-display font-bold leading-tight mb-6"
                style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", color: "#F4F2EC", lineHeight: 1.1 }}
              >
                مشتريات تجارية
                <br />
                <span style={{ color: "#FF5A1F" }}>بدون تعقيدات</span>
              </h1>

              <p
                className="text-base leading-relaxed mb-8 max-w-lg"
                style={{ color: "#8A8D9B", fontSize: "1.05rem" }}
              >
                كتالوج صناعي شامل للشركات المصرية — طلب مباشر أو عرض سعر، فواتير منظمة، وشروط ائتمان مرنة لفرق المشتريات.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  to={isLoggedIn ? "/catalog" : "/register"}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded font-semibold text-sm transition-all hover:opacity-90"
                  style={{ background: "#FF5A1F", color: "#fff" }}
                >
                  {isLoggedIn ? "تصفح الكتالوج" : "تسجيل الشركة"}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ transform: "rotate(180deg)" }}>
                    <path d="M8 2L3 7l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <Link
                  to={isLoggedIn ? "/quotes" : "/login"}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded font-semibold text-sm border transition-all hover:bg-white/5"
                  style={{ color: "#3A5CFF", borderColor: "rgba(58,92,255,0.35)" }}
                >
                  طلب عرض سعر
                </Link>
              </div>
            </div>

            {/* Right: manifest card */}
            <div className="relative">
              <div className="absolute -top-4 -right-4 w-full h-full rounded-lg border" style={{ borderColor: "rgba(255,90,31,0.15)" }} />
              <ManifestCard {...SAMPLE_ORDER} dark compact />
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section style={{ background: "#1B2030", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className={`font-bold text-2xl mb-1 ${stat.mono ? "font-mono" : ""}`}
                style={{ color: "#FF5A1F" }}
              >
                {stat.value}
              </div>
              <div className="text-xs" style={{ color: "#8A8D9B" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Two-path section */}
      <section className="py-20" style={{ background: "#F4F2EC" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl mb-3" style={{ color: "#11141C" }}>
              اختر ما يناسب احتياجك
            </h2>
            <p className="text-sm" style={{ color: "#8A8D9B" }}>
              طريقتان للشراء — مصممتان لفرق المشتريات المحترفة
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Direct Order */}
            <div
              className="rounded-xl p-8 relative overflow-hidden group"
              style={{ background: "#11141C", border: "1px solid rgba(255,90,31,0.2)" }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-0.5"
                style={{ background: "linear-gradient(90deg, #FF5A1F, transparent)" }}
              />
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-5"
                style={{ background: "rgba(255,90,31,0.12)" }}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <rect x="2" y="2" width="14" height="14" rx="2" stroke="#FF5A1F" strokeWidth="1.5" />
                  <path d="M6 9h6M6 6h4M6 12h3" stroke="#FF5A1F" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="font-display font-bold text-xl mb-3" style={{ color: "#F4F2EC" }}>
                طلب مباشر
              </h3>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "#8A8D9B" }}>
                أضف أصناف الكتالوج إلى سلتك وأرسل الطلب فوراً. مثالي للاحتياجات الثابتة بأسعار محددة.
              </p>
              <Link
                to={isLoggedIn ? "/catalog" : "/register"}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded font-semibold text-sm"
                style={{ background: "#FF5A1F", color: "#fff" }}
              >
                تصفح الكتالوج
              </Link>
            </div>

            {/* RFQ */}
            <div
              className="rounded-xl p-8 relative overflow-hidden"
              style={{ background: "#F4F2EC", border: "1px solid rgba(17,20,28,0.12)" }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-0.5"
                style={{ background: "linear-gradient(90deg, #3A5CFF, transparent)" }}
              />
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-5"
                style={{ background: "rgba(58,92,255,0.1)" }}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M3 4h12v10a1 1 0 01-1 1H4a1 1 0 01-1-1V4z" stroke="#3A5CFF" strokeWidth="1.5" />
                  <path d="M6 7h6M6 10h4M14 4V2H4v2" stroke="#3A5CFF" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="font-display font-bold text-xl mb-3" style={{ color: "#11141C" }}>
                طلب عرض سعر (RFQ)
              </h3>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "#6b7280" }}>
                أرسل قائمة الأصناف والكميات وانتظر عرض أسعار مخصص. مناسب للكميات الكبيرة والتفاوض.
              </p>
              <Link
                to={isLoggedIn ? "/quotes" : "/register"}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded font-semibold text-sm border"
                style={{ color: "#3A5CFF", borderColor: "rgba(58,92,255,0.35)", background: "transparent" }}
              >
                إرسال طلب عرض سعر
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Product grid preview */}
      <section className="py-16" style={{ background: "#E7E3D8" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="font-display font-bold text-2xl" style={{ color: "#11141C" }}>
                من الكتالوج
              </h2>
              <p className="text-xs mt-1 font-mono" style={{ color: "#8A8D9B" }}>أصناف مختارة</p>
            </div>
            <Link to="/catalog" className="text-sm font-semibold" style={{ color: "#FF5A1F" }}>
              عرض الكل ←
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {previewProducts.map((p) => (
              <div
                key={p.id}
                className="rounded-lg overflow-hidden group cursor-pointer"
                style={{ background: "#F4F2EC", border: "1px solid rgba(17,20,28,0.1)" }}
              >
                <div className="relative h-44 overflow-hidden" style={{ background: "#E7E3D8" }}>
                  <img
                    src={`https://images.unsplash.com/${p.image}?w=400&h=300&fit=crop&auto=format`}
                    alt={p.nameAr}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2">
                    <span
                      className="font-mono text-[9px] px-2 py-0.5 rounded font-semibold uppercase"
                      style={{
                        background: p.stockStatus === "in_stock" ? "rgba(34,197,94,0.15)" : p.stockStatus === "low_stock" ? "rgba(255,90,31,0.15)" : "rgba(138,141,155,0.15)",
                        color: p.stockStatus === "in_stock" ? "#16a34a" : p.stockStatus === "low_stock" ? "#FF5A1F" : "#8A8D9B",
                      }}
                    >
                      {p.stockStatus === "in_stock" ? "متوفر" : p.stockStatus === "low_stock" ? "كمية محدودة" : "نفد"}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="font-mono text-[9px] mb-1 uppercase" style={{ color: "#8A8D9B" }}>{p.category}</div>
                  <div className="font-semibold text-sm mb-2" style={{ color: "#11141C" }}>{p.nameAr}</div>
                  <div className="flex items-end justify-between">
                    <div>
                      <span className="font-mono font-bold text-base" style={{ color: "#FF5A1F" }}>
                        {formatPrice(p.price)}
                      </span>
                      <span className="font-mono text-[10px] mr-1" style={{ color: "#8A8D9B" }}>/{p.unit}</span>
                    </div>
                    <div className="font-mono text-[10px]" style={{ color: "#8A8D9B" }}>{p.sku}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20" style={{ background: "#11141C" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-14">
            <h2 className="font-display font-bold text-3xl" style={{ color: "#F4F2EC" }}>
              كيف تعمل المنصة
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connector line */}
            <div
              className="absolute top-8 right-[16.67%] left-[16.67%] h-px hidden md:block"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,90,31,0.3), rgba(255,90,31,0.3), transparent)" }}
            />
            {STEPS.map((step) => (
              <div key={step.num} className="relative text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 font-mono font-bold text-xl relative z-10"
                  style={{ background: "#1B2030", border: "1px solid rgba(255,90,31,0.3)", color: "#FF5A1F" }}
                >
                  {step.num}
                </div>
                <h3 className="font-display font-bold text-lg mb-2" style={{ color: "#F4F2EC" }}>
                  {step.titleAr}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#8A8D9B" }}>{step.descAr}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-14">
            <Link
              to={isLoggedIn ? "/catalog" : "/register"}
              className="inline-flex items-center gap-2 px-8 py-4 rounded font-bold text-base"
              style={{ background: "#FF5A1F", color: "#fff" }}
            >
              {isLoggedIn ? "تصفح الكتالوج" : "سجّل شركتك مجاناً"}
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-10 text-center"
        style={{ background: "#0d1018", borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="font-mono text-xs" style={{ color: "#8A8D9B" }}>
          © 2026 Lista — منصة مشتريات B2B للسوق المصري
        </div>
      </footer>
    </div>
  );
}
