import { useState } from "react";
import { QUOTES, statusLabels, formatPrice } from "../data/mockData";
import NavBar from "../components/NavBar";
import StampBadge from "../components/StampBadge";
import ManifestCard from "../components/ManifestCard";

export default function QuotesPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [accepted, setAccepted] = useState<Record<string, boolean>>({});
  const [rejected, setRejected] = useState<Record<string, boolean>>({});
  const [showPayment, setShowPayment] = useState<string | null>(null);
  const [payment, setPayment] = useState<"cod" | "credit">("cod");

  const quote = QUOTES.find((q) => q.id === selected);

  const getStatus = (q: typeof QUOTES[0]) => {
    if (accepted[q.id]) return "accepted";
    if (rejected[q.id]) return "rejected";
    return q.status;
  };

  if (selected && quote) {
    const currentStatus = getStatus(quote);
    const canAct = currentStatus === "sent";

    return (
      <div style={{ background: "#FAF7EE", minHeight: "100vh" }}>
        <NavBar />
        <div className="max-w-3xl mx-auto px-4 sm:px-8 py-8">
          <button
            onClick={() => { setSelected(null); setShowPayment(null); }}
            className="flex items-center gap-2 text-sm mb-6 font-medium"
            style={{ color: "#8A8D9B" }}
          >
            › العودة لعروض الأسعار
          </button>

          <ManifestCard
            id={quote.id}
            date={quote.date}
            status={currentStatus}
            items={quote.items}
            total={quote.total}
            extraInfo={`صالح حتى: ${new Date(quote.validUntil).toLocaleDateString("ar-EG")}`}
            actionLabel={canAct ? "قبول العرض" : undefined}
            onAction={canAct ? () => setShowPayment(quote.id) : undefined}
            secondaryActionLabel={canAct ? "رفض العرض" : undefined}
            onSecondaryAction={canAct ? () => setRejected((r) => ({ ...r, [quote.id]: true })) : undefined}
          />

          {/* Payment modal */}
          {showPayment === quote.id && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center px-4"
              style={{ background: "rgba(17,20,28,0.7)" }}
            >
              <div
                className="w-full max-w-sm rounded-2xl p-6"
                style={{ background: "#FAF7EE" }}
              >
                <h3 className="font-display font-bold text-lg mb-1" style={{ color: "#1A1F2E" }}>
                  قبول العرض
                </h3>
                <div className="font-mono text-xs mb-4" style={{ color: "#8A8D9B" }}>{quote.id}</div>
                <div className="manifest-divider mb-4" style={{ borderColor: "rgba(17,20,28,0.1)" }} />

                <p className="text-sm mb-4" style={{ color: "#6b7280" }}>اختر طريقة الدفع لهذا العرض:</p>
                <div className="flex flex-col gap-2 mb-5">
                  {[
                    { val: "cod" as const, label: "دفع عند الاستلام", sub: "COD" },
                    { val: "credit" as const, label: "ائتمان صافي 30", sub: "NET·30" },
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      onClick={() => setPayment(opt.val)}
                      className="flex items-center gap-3 p-3 rounded-lg border-2 text-right transition-all"
                      style={{
                        borderColor: payment === opt.val ? "#FFC629" : "rgba(17,20,28,0.12)",
                        background: payment === opt.val ? "rgba(255,90,31,0.06)" : "#fff",
                      }}
                    >
                      <div
                        className="w-4 h-4 rounded-full border-2 flex items-center justify-center"
                        style={{ borderColor: payment === opt.val ? "#FFC629" : "rgba(17,20,28,0.2)" }}
                      >
                        {payment === opt.val && <div className="w-2 h-2 rounded-full" style={{ background: "#FFC629" }} />}
                      </div>
                      <div>
                        <div className="text-xs font-semibold" style={{ color: "#1A1F2E" }}>{opt.label}</div>
                        <div className="font-mono text-[9px]" style={{ color: "#3A5CFF" }}>{opt.sub}</div>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setAccepted((a) => ({ ...a, [quote.id]: true }));
                      setShowPayment(null);
                    }}
                    className="flex-1 py-2.5 rounded-lg font-bold text-sm"
                    style={{ background: "#FFC629", color: "#1A1F2E" }}
                  >
                    تأكيد القبول — {formatPrice(quote.total)}
                  </button>
                  <button
                    onClick={() => setShowPayment(null)}
                    className="px-4 py-2.5 rounded-lg text-sm border"
                    style={{ color: "#6b7280", borderColor: "rgba(17,20,28,0.15)", background: "transparent" }}
                  >
                    إلغاء
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Notes */}
          {quote.notes && (
            <div
              className="mt-4 rounded-xl p-4"
              style={{ background: "#fff", border: "1px solid rgba(17,20,28,0.1)" }}
            >
              <div className="font-mono text-[10px] mb-1.5" style={{ color: "#8A8D9B" }}>ملاحظات</div>
              <p className="text-sm" style={{ color: "#1A1F2E" }}>{quote.notes}</p>
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
        <h1 className="font-display font-bold text-2xl mb-2" style={{ color: "#1A1F2E" }}>عروض الأسعار</h1>
        <p className="font-mono text-xs mb-7" style={{ color: "#8A8D9B" }}>{QUOTES.length} عروض</p>

        <div className="flex flex-col gap-5">
          {QUOTES.map((q) => {
            const st = getStatus(q);
            return (
              <div
                key={q.id}
                className="rounded-xl overflow-hidden cursor-pointer transition-shadow hover:shadow-md"
                style={{ background: "#fff", border: "1px solid rgba(17,20,28,0.08)" }}
                onClick={() => setSelected(q.id)}
              >
                <div className="relative px-5 py-4" style={{ borderBottom: "1px solid rgba(17,20,28,0.06)" }}>
                  <div className="absolute top-4 left-4">
                    <StampBadge status={st} label={statusLabels[st] || st} size="sm" />
                  </div>
                  <div className="font-mono text-xs font-semibold" style={{ color: "#1A1F2E" }}>{q.id}</div>
                  <div className="font-mono text-[10px] mt-0.5" style={{ color: "#8A8D9B" }}>
                    {new Date(q.date).toLocaleDateString("ar-EG")} · صالح حتى {new Date(q.validUntil).toLocaleDateString("ar-EG")}
                  </div>
                </div>
                <div className="px-5 py-3 flex items-center justify-between">
                  <div className="text-xs" style={{ color: "#6b7280" }}>
                    {q.items.length} صنف
                  </div>
                  <div className="font-mono font-bold" style={{ color: "#1A1F2E" }}>
                    {formatPrice(q.total)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
