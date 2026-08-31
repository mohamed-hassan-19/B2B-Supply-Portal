import { useState, useEffect } from "react";
import { statusLabels, formatPrice } from "../data/mockData";
import NavBar from "../components/NavBar";
import ManifestCard from "../components/ManifestCard";
import StampBadge from "../components/StampBadge";
import { api } from "../lib/api";

const invStatus = (s: string) => (s === "pending" ? "pending_inv" : s);

export default function InvoicesPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/storefront/invoices")
      .then(res => res.data)
      .then(data => {
        const mapped = data.map((inv: any) => ({
          id: `INV-${inv.id}`,
          orderId: `ORD-${inv.order_id}`,
          date: inv.createdAt,
          dueDate: inv.due_date,
          status: inv.status, // paid, pending, overdue
          total: Number(inv.amount),
          items: [] // Invoices API doesn't include items right now, just amount
        }));
        setInvoices(mapped);
        setLoading(false);
      });
  }, []);

  const invoice = invoices.find((i) => i.id === selected);

  if (selected && invoice) {
    return (
      <div style={{ background: "#F4F2EC", minHeight: "100vh" }}>
        <NavBar />
        <div className="max-w-3xl mx-auto px-4 sm:px-8 py-8">
          <button
            onClick={() => setSelected(null)}
            className="flex items-center gap-2 text-sm mb-6 font-medium"
            style={{ color: "#8A8D9B" }}
          >
            › العودة للفواتير
          </button>

          <ManifestCard
            id={invoice.id}
            date={invoice.date}
            status={invStatus(invoice.status)}
            items={invoice.items}
            total={invoice.total}
            extraInfo={`تاريخ الاستحقاق: ${new Date(invoice.dueDate).toLocaleDateString("ar-EG")}`}
          />

          {invoice.status === "overdue" && (
            <div
              className="mt-4 rounded-xl p-4 flex items-start gap-3"
              style={{ background: "rgba(255,90,31,0.08)", border: "1px solid rgba(255,90,31,0.25)" }}
            >
              <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "#FF5A1F" }}>
                <span className="text-white text-[10px] font-bold">!</span>
              </div>
              <div>
                <div className="font-semibold text-sm mb-0.5" style={{ color: "#FF5A1F" }}>الفاتورة متأخرة</div>
                <p className="text-xs" style={{ color: "#c2410c" }}>
                  تجاوزت هذه الفاتورة تاريخ الاستحقاق. يرجى التواصل مع فريق المشتريات على الفور.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#F4F2EC", minHeight: "100vh" }}>
      <NavBar />
      <div className="max-w-3xl mx-auto px-4 sm:px-8 py-8">
        <h1 className="font-display font-bold text-2xl mb-2" style={{ color: "#11141C" }}>الفواتير</h1>
        {loading ? (
          <p className="font-mono text-xs mb-7" style={{ color: "#8A8D9B" }}>جاري التحميل...</p>
        ) : (
          <>
            <p className="font-mono text-xs mb-7" style={{ color: "#8A8D9B" }}>{invoices.length} فواتير</p>

            <div className="flex flex-col gap-5">
              {invoices.map((inv) => (
                <div
                  key={inv.id}
                  className="rounded-xl overflow-hidden cursor-pointer transition-shadow hover:shadow-md"
                  style={{ background: "#fff", border: "1px solid rgba(17,20,28,0.08)" }}
                  onClick={() => setSelected(inv.id)}
                >
                  <div className="relative px-5 py-4" style={{ borderBottom: "1px solid rgba(17,20,28,0.06)" }}>
                    <div className="absolute top-4 left-4">
                      <StampBadge status={invStatus(inv.status)} label={statusLabels[invStatus(inv.status)] || inv.status} size="sm" />
                    </div>
                    <div className="font-mono text-xs font-semibold" style={{ color: "#11141C" }}>{inv.id}</div>
                    <div className="font-mono text-[10px] mt-0.5" style={{ color: "#8A8D9B" }}>
                      مرتبط بـ {inv.orderId}
                    </div>
                  </div>
                  <div className="px-5 py-3 flex items-center justify-between">
                    <div className="text-xs" style={{ color: "#6b7280" }}>
                      تاريخ الاستحقاق: <span className="font-mono font-medium">{new Date(inv.dueDate).toLocaleDateString("ar-EG")}</span>
                    </div>
                    <div className="font-mono font-bold" style={{ color: "#FF5A1F" }}>
                      {formatPrice(inv.total)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div
              className="mt-6 rounded-xl p-5"
              style={{ background: "#11141C", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="font-mono text-[10px] mb-3 uppercase" style={{ color: "#8A8D9B" }}>ملخص الفواتير</div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "مسددة", val: invoices.filter((i) => i.status === "paid").reduce((s, i) => s + i.total, 0), color: "#16a34a" },
                  { label: "قيد الانتظار", val: invoices.filter((i) => i.status === "pending").reduce((s, i) => s + i.total, 0), color: "#8A8D9B" },
                  { label: "متأخرة", val: invoices.filter((i) => i.status === "overdue").reduce((s, i) => s + i.total, 0), color: "#FF5A1F" },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="font-mono font-bold text-sm" style={{ color: s.color }}>
                      {formatPrice(s.val)}
                    </div>
                    <div className="font-mono text-[9px] mt-0.5" style={{ color: "#8A8D9B" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
