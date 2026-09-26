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

function ArrowIcon() {
  return (
    <span
      className="inline-flex items-center justify-center rounded"
      style={{ width: 24, height: 24, background: "rgba(26,31,46,0.13)", fontSize: 13 }}
    >
      ↗
    </span>
  );
}

export default function HomePage() {
  const { isLoggedIn } = useApp();
  const previewProducts = PRODUCTS.slice(0, 4);

  return (
    <div style={{ background: "#FAF7EE", minHeight: "100vh" }}>
      {/* Announcement bar — amber-yellow, matches reference */}
      <div className="announce-bar">
        Masnood لأعمالك | احتياجات شركتك في مكان واحد
      </div>

      {/* Top nav for home */}
      <nav
        className="w-full sticky top-0 z-50"
        style={{ background: "#1A1F2E", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between h-14">
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
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
          </div>
          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <Link to="/catalog" className="btn-primary" style={{ padding: "8px 18px", fontSize: "0.82rem" }}>
                <ArrowIcon />
                الكتالوج
              </Link>
            ) : (
              <>
                <Link to="/login" className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.55)" }}>
                  تسجيل الدخول
                </Link>
                <Link to="/register" className="btn-primary" style={{ padding: "8px 18px", fontSize: "0.82rem" }}>
                  <ArrowIcon />
                  ابدأ الآن
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero — cream background matching reference */}
      <section style={{ background: "#FAF7EE" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-14 pb-0">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: text */}
            <div className="pb-12">
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6 text-xs font-semibold"
                style={{ background: "rgba(255,198,41,0.15)", color: "#1A1F2E", border: "1px solid rgba(255,198,41,0.35)" }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#FFC629" }} />
                توريدات وخدمات للشركات في مصر
              </div>

              {/* Headline with yellow underline on emphasis word — matches reference treatment */}
              <h1
                className="font-display font-bold leading-tight mb-6"
                style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", color: "#1A1F2E", lineHeight: 1.1 }}
              >
                ركّز في شغلك.
                <br />
                إنت{" "}
                <span className="headline-underline">مسنود</span>
                .
              </h1>

              <p
                className="text-base leading-relaxed mb-10 max-w-lg"
                style={{ color: "#6b7280", fontSize: "1rem" }}
              >
                نظافة، بوفيه، ومستهلكات يومية. اجمع احتياجات شركتك في طلب واحد، وسيب تفاصيل التوريد لـ Masnood.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to={isLoggedIn ? "/catalog" : "/register"}
                  className="btn-primary"
                >
                  <ArrowIcon />
                  {isLoggedIn ? "استكشف الكتالوج" : "استكشف الكتالوج"}
                </Link>
                <Link
                  to={isLoggedIn ? "/quotes" : "/login"}
                  className="btn-ghost"
                >
                  <span style={{ fontSize: 16, fontWeight: 700 }}>+</span>
                  تعرّف على خدماتنا
                </Link>
              </div>
            </div>

            {/* Right: manifest card */}
            <div className="relative pb-0 hidden lg:block">
              <div
                className="absolute -top-3 -right-3 w-full h-full rounded-xl"
                style={{ border: "1.5px dashed rgba(255,198,41,0.3)" }}
              />
              <ManifestCard {...SAMPLE_ORDER} dark compact />
            </div>
          </div>
        </div>

        {/* Hero image — warm-toned still-life on dark navy, matches reference */}
        <div className="relative overflow-hidden mt-8" style={{ height: "340px" }}>
          <img
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1400&h=600&fit=crop&auto=format"
            alt="منتجات الشركات"
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 40%" }}
          />
          {/* Navy overlay at top — matches reference gradient fade */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, #FAF7EE 0%, transparent 15%, transparent 70%, rgba(26,31,46,0.6) 100%)" }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 px-6 py-5"
          >
            <div
              className="inline-block px-4 py-2 rounded font-mono text-xs font-bold uppercase"
              style={{ background: "#FAF7EE", color: "#1A1F2E", letterSpacing: "0.12em" }}
            >
              Masnood FOR BUSINESS
            </div>
            <p className="text-sm mt-1.5 font-semibold" style={{ color: "rgba(255,255,255,0.85)" }}>
              احتياجات شركتك. في مكان واحد.
            </p>
          </div>
        </div>
      </section>

      {/* Stats strip — dark navy */}
      <section style={{ background: "#1A1F2E" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className={`font-bold text-2xl mb-1 ${stat.mono ? "font-mono" : ""}`}
                style={{ color: "#FFC629" }}
              >
                {stat.value}
              </div>
              <div className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Two-path section — cream */}
      <section className="py-20" style={{ background: "#FAF7EE" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl mb-3" style={{ color: "#1A1F2E" }}>
              اختر ما يناسب{" "}
              <span className="headline-underline">احتياجك</span>
            </h2>
            <p className="text-sm" style={{ color: "#8A8D9B" }}>
              طريقتان للشراء — مصممتان لفرق المشتريات المحترفة
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Direct Order */}
            <div
              className="rounded-2xl p-8 relative overflow-hidden"
              style={{ background: "#1A1F2E", border: "1px solid rgba(255,198,41,0.2)" }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{ background: "#FFC629" }}
              />
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                style={{ background: "rgba(255,198,41,0.15)" }}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <rect x="2" y="2" width="14" height="14" rx="2" stroke="#FFC629" strokeWidth="1.5" />
                  <path d="M6 9h6M6 6h4M6 12h3" stroke="#FFC629" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="font-display font-bold text-xl mb-3" style={{ color: "#FAF7EE" }}>
                طلب مباشر
              </h3>
              <p className="text-sm leading-relaxed mb-7" style={{ color: "rgba(255,255,255,0.5)" }}>
                أضف أصناف الكتالوج إلى سلتك وأرسل الطلب فوراً. مثالي للاحتياجات الثابتة بأسعار محددة.
              </p>
              <Link to={isLoggedIn ? "/catalog" : "/register"} className="btn-primary">
                <ArrowIcon />
                تصفح الكتالوج
              </Link>
            </div>

            {/* RFQ */}
            <div
              className="rounded-2xl p-8 relative overflow-hidden"
              style={{ background: "#EDE8D5", border: "1px solid rgba(26,31,46,0.1)" }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{ background: "#3A5CFF" }}
              />
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                style={{ background: "rgba(58,92,255,0.1)" }}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M3 4h12v10a1 1 0 01-1 1H4a1 1 0 01-1-1V4z" stroke="#3A5CFF" strokeWidth="1.5" />
                  <path d="M6 7h6M6 10h4M14 4V2H4v2" stroke="#3A5CFF" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="font-display font-bold text-xl mb-3" style={{ color: "#1A1F2E" }}>
                طلب عرض سعر (RFQ)
              </h3>
              <p className="text-sm leading-relaxed mb-7" style={{ color: "#6b7280" }}>
                أرسل قائمة الأصناف والكميات وانتظر عرض أسعار مخصص. مناسب للكميات الكبيرة والتفاوض.
              </p>
              <Link to={isLoggedIn ? "/quotes" : "/register"} className="btn-ghost">
                <span style={{ fontSize: 16, fontWeight: 700 }}>+</span>
                إرسال طلب عرض سعر
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Product grid preview */}
      <section className="py-16" style={{ background: "#EDE8D5" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="font-display font-bold text-2xl" style={{ color: "#1A1F2E" }}>
                من الكتالوج
              </h2>
              <p className="text-xs mt-1 font-mono" style={{ color: "#8A8D9B" }}>أصناف مختارة</p>
            </div>
            <Link to="/catalog" className="text-sm font-bold flex items-center gap-1" style={{ color: "#1A1F2E" }}>
              عرض الكل ←
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {previewProducts.map((p) => (
              <div
                key={p.id}
                className="rounded-xl overflow-hidden group cursor-pointer"
                style={{ background: "#FAF7EE", border: "1px solid rgba(26,31,46,0.08)" }}
              >
                <div className="relative h-44 overflow-hidden" style={{ background: "#EDE8D5" }}>
                  <img
                    src={`https://images.unsplash.com/${p.image}?w=400&h=300&fit=crop&auto=format`}
                    alt={p.nameAr}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2">
                    <span
                      className="font-mono text-[9px] px-2 py-0.5 rounded font-semibold"
                      style={{
                        background: p.stockStatus === "in_stock" ? "rgba(34,197,94,0.85)" : p.stockStatus === "low_stock" ? "rgba(255,198,41,0.9)" : "rgba(138,141,155,0.85)",
                        color: p.stockStatus === "low_stock" ? "#1A1F2E" : "#fff",
                        backdropFilter: "blur(4px)",
                      }}
                    >
                      {p.stockStatus === "in_stock" ? "متوفر" : p.stockStatus === "low_stock" ? "كمية محدودة" : "نفد"}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="font-mono text-[9px] mb-1.5 uppercase" style={{ color: "#8A8D9B" }}>{p.category}</div>
                  <div className="font-semibold text-sm mb-2" style={{ color: "#1A1F2E" }}>{p.nameAr}</div>
                  <div className="flex items-end justify-between">
                    <div>
                      <span className="font-mono font-bold text-base" style={{ color: "#1A1F2E" }}>
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

      {/* How it works — dark navy */}
      <section className="py-20" style={{ background: "#1A1F2E" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-14">
            <h2 className="font-display font-bold text-3xl" style={{ color: "#FAF7EE" }}>
              كيف تعمل{" "}
              <span
                className="relative"
                style={{
                  color: "#FFC629",
                }}
              >
                المنصة
              </span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 relative">
            <div
              className="absolute top-8 right-[16.67%] left-[16.67%] h-px hidden md:block"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,198,41,0.3), rgba(255,198,41,0.3), transparent)" }}
            />
            {STEPS.map((step) => (
              <div key={step.num} className="relative text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 font-mono font-bold text-xl relative z-10"
                  style={{ background: "#222840", border: "1.5px solid rgba(255,198,41,0.35)", color: "#FFC629" }}
                >
                  {step.num}
                </div>
                <h3 className="font-display font-bold text-lg mb-2" style={{ color: "#FAF7EE" }}>
                  {step.titleAr}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{step.descAr}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-14">
            <Link
              to={isLoggedIn ? "/catalog" : "/register"}
              className="btn-primary"
              style={{ fontSize: "1rem", padding: "14px 32px" }}
            >
              <span
                className="inline-flex items-center justify-center rounded"
                style={{ width: 26, height: 26, background: "rgba(26,31,46,0.13)", fontSize: 14 }}
              >
                ↗
              </span>
              {isLoggedIn ? "تصفح الكتالوج" : "سجّل شركتك مجاناً"}
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-10 text-center"
        style={{ background: "#131828", borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="font-mono text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
          © 2026 Masnood — منصة مشتريات B2B للسوق المصري
        </div>
      </footer>
    </div>
  );
}
