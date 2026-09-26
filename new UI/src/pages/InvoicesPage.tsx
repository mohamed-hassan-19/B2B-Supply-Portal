import { useState } from "react";
import { INVOICES, statusLabels, formatPrice } from "../data/mockData";
import NavBar from "../components/NavBar";
import ManifestCard from "../components/ManifestCard";
import StampBadge from "../components/StampBadge";

const invStatus = (s: string) => (s === "pending" ? "pending_inv" : s);

export default function InvoicesPage() {
  const [selected, setSelected] = useState<string | null>(null);

  const invoice = INVOICES.find((i) => i.id === selected);

  if (selected && invoice) {
    return (
      <div style={{ background: "#FAF7EE", minHeight: "100vh" }}>
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
              <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "#FFC629" }}>
                <span className="text-white text-[10px] font-bold">!</span>
              </div>
              <div>
                <div className="font-semibold text-sm mb-0.5" style={{ color: "#FFC629" }}>الفاتورة متأخرة</div>
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
    <div style={{ background: "#FAF7EE", minHeight: "100vh" }}>
      <NavBar />
      <div className="max-w-3xl mx-auto px-4 sm:px-8 py-8">
        <h1 className="font-display font-bold text-2xl mb-2" style={{ color: "#1A1F2E" }}>الفواتير</h1>
        <p className="font-mono text-xs mb-7" style={{ color: "#8A8D9B" }}>{INVOICES.length} فواتير</p>

        <div className="flex flex-col gap-4">
          {INVOICES.map((inv) => (
            <div
              key={inv.id}
              className="rounded-xl overflow-hidden cursor-pointer transition-shadow hover:shadow-md"
              style={{
                background: "#fff",
                border: `1px solid ${inv.status === "overdue" ? "rgba(255,90,31,0.3)" : "rgba(17,20,28,0.08)"}`,
              }}
              onClick={() => setSelected(inv.id)}
            >
              {inv.status === "overdue" && (
                <div className="h-0.5" style={{ background: "#FFC629" }} />
              )}
              <div className="relative px-5 py-4" style={{ borderBottom: "1px solid rgba(17,20,28,0.06)" }}>
                <div className="absolute top-4 left-4">
                  <StampBadge status={invStatus(inv.status)} label={statusLabels[inv.status] || inv.status} size="sm" />
                </div>
                <div className="font-mono text-xs font-semibold" style={{ color: "#1A1F2E" }}>{inv.id}</div>
                <div className="font-mono text-[10px] mt-0.5" style={{ color: "#8A8D9B" }}>
                  صادرة: {new Date(inv.date).toLocaleDateString("ar-EG")} · استحقاق: {new Date(inv.dueDate).toLocaleDateString("ar-EG")}
                </div>
              </div>
              <div className="px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="font-mono text-[10px]" style={{ color: "#8A8D9B" }}>
                    طلب رقم: <span style={{ color: "#1A1F2E" }}>{inv.orderId}</span>
                  </div>
                </div>
                <div
                  className="font-mono font-bold text-base"
                  style={{ color: inv.status === "overdue" ? "#FFC629" : "#1A1F2E" }}
                >
                  {formatPrice(inv.total)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div
          className="mt-6 rounded-xl p-5"
          style={{ background: "#1A1F2E", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="font-mono text-[10px] mb-3 uppercase" style={{ color: "#8A8D9B" }}>ملخص الفواتير</div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "مسددة", val: INVOICES.filter((i) => i.status === "paid").reduce((s, i) => s + i.total, 0), color: "#16a34a" },
              { label: "قيد الانتظار", val: INVOICES.filter((i) => i.status === "pending").reduce((s, i) => s + i.total, 0), color: "#8A8D9B" },
              { label: "متأخرة", val: INVOICES.filter((i) => i.status === "overdue").reduce((s, i) => s + i.total, 0), color: "#FFC629" },
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
      </div>
    </div>
  );
}
