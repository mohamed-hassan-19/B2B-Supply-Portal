import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { formatPrice } from "../data/mockData";
import NavBar from "../components/NavBar";

const CATEGORIES = ["الكل", "مواد البناء", "كهرباء وطاقة", "معدات السلامة", "معدات صناعية", "أخشاب", "دهانات", "أدوات ومستلزمات"];

export default function CatalogPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("الكل");
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const PER_PAGE = 6;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = `http://localhost:3000/api/catalog?page=${page}&limit=${PER_PAGE}`;
        if (search) url += `&search=${encodeURIComponent(search)}`;
        if (category !== "الكل") url += `&category=${encodeURIComponent(category)}`;
        
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          // Map backend items to frontend format
          const mapped = data.items.map((p: any) => ({
            id: p.id,
            sku: p.sku || `SKU-${p.id}`,
            nameAr: p.name,
            nameEn: p.name,
            category: p.category,
            price: Number(p.price),
            originalPrice: p.original_price ? Number(p.original_price) : undefined,
            unit: "قطعة",
            stock: p.stock_level,
            stockStatus: p.stock_level > 100 ? "in_stock" : p.stock_level > 0 ? "low_stock" : "out_of_stock",
            image: p.images && p.images.length > 0 
              ? (p.images[0].startsWith('http') || p.images[0].startsWith('/uploads') ? (p.images[0].startsWith('http') ? p.images[0] : `http://localhost:3000${p.images[0]}`) : p.images[0]) 
              : "https://via.placeholder.com/300",
          }));
          setProducts(mapped);
          setTotalPages(data.totalPages);
          setTotalCount(data.total);
        }
      } catch (err) {
        console.error("Failed to fetch catalog", err);
      }
    };
    
    // Add debounce for search
    const timer = setTimeout(() => {
      fetchProducts();
    }, 300);
    return () => clearTimeout(timer);
  }, [page, search, category]);

  return (
    <div style={{ background: "#F4F2EC", minHeight: "100vh" }}>
      <NavBar />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        {/* Page header */}
        <div className="mb-6">
          <h1 className="font-display font-bold text-2xl" style={{ color: "#11141C" }}>الكتالوج</h1>
          <p className="font-mono text-xs mt-1" style={{ color: "#8A8D9B" }}>
            {totalCount} صنف
          </p>
        </div>

        {/* Search + filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <svg
              className="absolute top-1/2 -translate-y-1/2 right-3.5"
              width="14" height="14" viewBox="0 0 14 14" fill="none"
              style={{ color: "#8A8D9B" }}
            >
              <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.3" />
              <path d="M9.5 9.5l2.5 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="بحث بالاسم أو رقم SKU..."
              className="w-full pr-9 pl-4 py-2.5 rounded-lg text-sm outline-none font-mono"
              style={{
                background: "#fff",
                border: "1.5px solid rgba(17,20,28,0.12)",
                color: "#11141C",
              }}
            />
          </div>
        </div>

        {/* Category filters */}
        <div className="flex gap-2 flex-wrap mb-7">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => { setCategory(cat); setPage(1); }}
              className="px-3 py-1.5 rounded-full text-xs font-semibold transition-colors"
              style={{
                background: category === cat ? "#11141C" : "#E7E3D8",
                color: category === cat ? "#F4F2EC" : "#6b7280",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {products.length === 0 ? (
          <div className="text-center py-20">
            <div className="font-mono text-4xl mb-3" style={{ color: "#E7E3D8" }}>◻</div>
            <p style={{ color: "#8A8D9B" }}>لا توجد نتائج لهذا البحث</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((p) => (
              <Link
                key={p.id}
                to={`/catalog/${p.id}`}
                className="group rounded-xl overflow-hidden block transition-shadow hover:shadow-md"
                style={{ background: "#fff", border: "1px solid rgba(17,20,28,0.08)" }}
              >
                <div className="relative h-48 overflow-hidden" style={{ background: "#E7E3D8" }}>
                  <img
                    src={p.image.startsWith('http') ? p.image : `https://images.unsplash.com/${p.image}?w=600&h=400&fit=crop&auto=format`}
                    alt={p.nameAr}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2 flex gap-1.5">
                    <span
                      className="font-mono text-[9px] px-2 py-0.5 rounded font-semibold"
                      style={{
                        background: p.stockStatus === "in_stock" ? "rgba(34,197,94,0.85)" : p.stockStatus === "low_stock" ? "rgba(255,90,31,0.85)" : "rgba(138,141,155,0.85)",
                        color: "#fff",
                      }}
                    >
                      {p.stockStatus === "in_stock" ? "متوفر" : p.stockStatus === "low_stock" ? "ينفد سريعاً" : "نفد"}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="font-mono text-[10px] mb-1" style={{ color: "#3A5CFF" }}>
                    {p.sku} • {p.category}
                  </div>
                  <h3 className="font-bold text-sm mb-3" style={{ color: "#11141C" }}>
                    {p.nameAr}
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="font-mono font-bold text-base" style={{ color: "#FF5A1F" }}>
                      {formatPrice(p.price)}
                    </div>
                    {p.originalPrice && (
                      <div className="font-mono font-medium text-xs line-through" style={{ color: "#8A8D9B" }}>
                        {formatPrice(p.originalPrice)}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-9 h-9 rounded font-mono text-sm flex items-center justify-center border transition-colors"
              style={{
                color: page === 1 ? "#E7E3D8" : "#11141C",
                borderColor: page === 1 ? "#E7E3D8" : "rgba(17,20,28,0.2)",
                background: "transparent",
              }}
            >
              ›
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className="w-9 h-9 rounded font-mono text-sm flex items-center justify-center transition-colors"
                style={{
                  background: n === page ? "#11141C" : "transparent",
                  color: n === page ? "#F4F2EC" : "#8A8D9B",
                  border: n === page ? "none" : "1px solid rgba(17,20,28,0.15)",
                }}
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="w-9 h-9 rounded font-mono text-sm flex items-center justify-center border transition-colors"
              style={{
                color: page === totalPages ? "#E7E3D8" : "#11141C",
                borderColor: page === totalPages ? "#E7E3D8" : "rgba(17,20,28,0.2)",
                background: "transparent",
              }}
            >
              ‹
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
