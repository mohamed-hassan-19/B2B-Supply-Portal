import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { PRODUCTS, formatPrice } from "../data/mockData";
import { useApp } from "../context/AppContext";
import NavBar from "../components/NavBar";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useApp();
  const product = PRODUCTS.find((p) => p.id === id);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div style={{ background: "#FAF7EE", minHeight: "100vh" }}>
        <NavBar />
        <div className="flex items-center justify-center h-96">
          <p style={{ color: "#8A8D9B" }}>الصنف غير موجود</p>
        </div>
      </div>
    );
  }

  const handleAdd = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const stockColor = product.stockStatus === "in_stock" ? "#16a34a" : product.stockStatus === "low_stock" ? "#FFC629" : "#8A8D9B";
  const stockLabel = product.stockStatus === "in_stock" ? "متوفر في المخزون" : product.stockStatus === "low_stock" ? "كمية محدودة" : "نفد المخزون";

  return (
    <div style={{ background: "#FAF7EE", minHeight: "100vh" }}>
      <NavBar />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 font-mono text-xs" style={{ color: "#8A8D9B" }}>
          <Link to="/catalog" style={{ color: "#8A8D9B" }}>الكتالوج</Link>
          <span>/</span>
          <span style={{ color: "#1A1F2E" }}>{product.nameAr}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Image */}
          <div
            className="rounded-xl overflow-hidden aspect-square"
            style={{ background: "#EDE8D5", maxHeight: "480px" }}
          >
            <img
              src={`https://images.unsplash.com/${product.image}?w=800&h=800&fit=crop&auto=format`}
              alt={product.nameAr}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <div className="font-mono text-[10px] uppercase mb-2" style={{ color: "#8A8D9B" }}>
              {product.category}
            </div>
            <h1 className="font-display font-bold text-3xl mb-2 leading-tight" style={{ color: "#1A1F2E" }}>
              {product.nameAr}
            </h1>
            <div className="font-mono text-xs mb-5" style={{ color: "#8A8D9B" }}>
              {product.sku}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-4">
              <span className="font-mono font-bold text-3xl" style={{ color: "#1A1F2E" }}>
                {formatPrice(product.price)}
              </span>
              <span className="font-mono text-sm" style={{ color: "#8A8D9B" }}>/ {product.unit}</span>
            </div>

            {/* Stock */}
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full mb-6 w-fit"
              style={{
                background: `${stockColor}15`,
                border: `1px solid ${stockColor}40`,
                color: stockColor,
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: stockColor }} />
              <span className="font-mono text-xs font-semibold">{stockLabel}</span>
              {product.stock > 0 && (
                <span className="font-mono text-xs opacity-70">({product.stock} {product.unit})</span>
              )}
            </div>

            {/* Description */}
            <p className="text-sm leading-relaxed mb-7" style={{ color: "#6b7280" }}>
              {product.description}
            </p>

            {/* Divider */}
            <div className="manifest-divider mb-6" style={{ borderColor: "rgba(17,20,28,0.1)" }} />

            {/* Quantity + Add to cart */}
            <div className="flex items-center gap-4 mb-4">
              <div
                className="flex items-center gap-0 rounded-lg overflow-hidden border"
                style={{ borderColor: "rgba(17,20,28,0.15)" }}
              >
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center transition-colors hover:bg-black/5 font-bold text-lg"
                  style={{ color: "#1A1F2E" }}
                >
                  −
                </button>
                <span
                  className="w-14 h-10 flex items-center justify-center font-mono font-semibold text-sm border-x"
                  style={{ borderColor: "rgba(17,20,28,0.15)", color: "#1A1F2E" }}
                >
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="w-10 h-10 flex items-center justify-center transition-colors hover:bg-black/5 font-bold text-lg"
                  style={{ color: "#1A1F2E" }}
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAdd}
                disabled={product.stockStatus === "out_of_stock"}
                className="flex-1 py-3 rounded-lg font-bold text-sm transition-all"
                style={{
                  background: added ? "#16a34a" : product.stockStatus === "out_of_stock" ? "#EDE8D5" : "#FFC629",
                  color: product.stockStatus === "out_of_stock" ? "#8A8D9B" : "#fff",
                }}
              >
                {added ? "✓ تمت الإضافة" : product.stockStatus === "out_of_stock" ? "نفد المخزون" : "إضافة إلى السلة"}
              </button>
            </div>

            <button
              onClick={() => navigate("/catalog")}
              className="py-2.5 rounded-lg text-sm font-medium border transition-colors hover:bg-black/5"
              style={{ color: "#6b7280", borderColor: "rgba(17,20,28,0.12)", background: "transparent" }}
            >
              العودة للكتالوج
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
