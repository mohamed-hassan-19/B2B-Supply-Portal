import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import NavBar from "../components/NavBar";
import { api } from "../lib/api";

const PER_PAGE = 8;

export default function CatalogPage() {
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState<number | "all">("all");
  const [categories, setCategories] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get('/api/catalog/categories');
        setCategories(res.data);
      } catch (err) {
        console.error("Failed to load categories", err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const fetchProducts = async () => {
        try {
          const params: any = { page, limit: PER_PAGE };
          if (search) params.search = search;
          if (categoryId !== "all") params.category_id = categoryId;
          
          const res = await api.get('/api/catalog', { params });
          const data = res.data;
          
          setTotalPages(data.totalPages);
          setProducts(data.items.map((p: any) => ({
            id: p.id,
            sku: p.sku || `SKU-${p.id}`,
            nameAr: p.name,
            nameEn: p.name,
            category: p.Category?.name || 'Uncategorized',
            price: Number(p.price),
            originalPrice: p.original_price ? Number(p.original_price) : undefined,
            unit: "قطعة",
            stock: p.stock_level,
            image: p.images?.[0] || "https://placehold.co/400x300/E7E3D8/11141C?text=Product",
            isNew: false
          })));
        } catch (error) {
          console.error("Failed to fetch catalog:", error);
        }
      };
      fetchProducts();
    }, 300);
    return () => clearTimeout(timer);
  }, [page, search, categoryId]);

  return (
    <div style={{ background: "#F4F2EC", minHeight: "100vh" }}>
      <NavBar />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4" style={{ color: "#11141C" }}>Our Products</h1>
          <div className="relative max-w-md mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full pl-12 pr-4 py-3 rounded-xl outline-none"
              style={{ background: "#fff", border: "1px solid #E7E3D8", color: "#11141C" }}
            />
          </div>

          {/* Category filters */}
          <div className="flex gap-2 flex-wrap mb-7">
            <button
              onClick={() => { setCategoryId("all"); setPage(1); }}
              className="px-3 py-1.5 rounded-full text-xs font-semibold transition-colors"
              style={{
                background: categoryId === "all" ? "#11141C" : "#E7E3D8",
                color: categoryId === "all" ? "#F4F2EC" : "#6b7280",
              }}
            >
              All Categories
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setCategoryId(cat.id); setPage(1); }}
                className="px-3 py-1.5 rounded-full text-xs font-semibold transition-colors"
                style={{
                  background: categoryId === cat.id ? "#11141C" : "#E7E3D8",
                  color: categoryId === cat.id ? "#F4F2EC" : "#6b7280",
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <Link key={p.id} to={`/catalog/${p.id}`} className="block group">
              <div 
                className="rounded-2xl overflow-hidden transition-transform duration-300 group-hover:-translate-y-1"
                style={{ background: "#fff", border: "1px solid #E7E3D8" }}
              >
                <div className="relative aspect-[4/3] bg-gray-100 p-4 flex items-center justify-center">
                  {p.isNew && (
                    <span className="absolute top-3 left-3 bg-[#3A5CFF] text-white text-[10px] font-bold px-2 py-1 rounded-sm z-10">
                      NEW
                    </span>
                  )}
                  <img src={p.image} alt={p.nameEn} className="w-full h-full object-contain mix-blend-multiply" />
                </div>
                <div className="p-4">
                  <div className="font-mono text-[10px] mb-1" style={{ color: "#3A5CFF" }}>
                    {p.sku} • {p.category}
                  </div>
                  <h3 className="font-bold text-sm mb-3" style={{ color: "#11141C" }}>
                    {p.nameAr}
                  </h3>
                  <div className="flex items-end justify-between mt-auto">
                    <div>
                      {p.originalPrice && (
                        <div className="text-xs line-through" style={{ color: "#9CA3AF" }}>
                          EGP {p.originalPrice.toFixed(2)}
                        </div>
                      )}
                      <div className="font-bold text-lg" style={{ color: "#11141C" }}>
                        EGP {p.price.toFixed(2)} <span className="text-[10px] font-normal text-gray-500">/{p.unit}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            <button 
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
              className="p-2 rounded-lg border disabled:opacity-50"
              style={{ borderColor: "#E7E3D8", background: "#fff" }}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm font-semibold mx-4 text-gray-600">
              Page {page} of {totalPages}
            </span>
            <button 
              disabled={page === totalPages}
              onClick={() => setPage(p => p + 1)}
              className="p-2 rounded-lg border disabled:opacity-50"
              style={{ borderColor: "#E7E3D8", background: "#fff" }}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
