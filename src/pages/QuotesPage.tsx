import { useState, useEffect } from "react";
import { statusLabels, formatPrice } from "../data/mockData";
import NavBar from "../components/NavBar";
import StampBadge from "../components/StampBadge";
import ManifestCard from "../components/ManifestCard";
import { api } from "../lib/api";

export default function QuotesPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [quotes, setQuotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPayment, setShowPayment] = useState<string | null>(null);
  const [payment, setPayment] = useState<"cod" | "credit">("cod");

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const res = await api.get('/api/storefront/quotes');
      const data = res.data;
      const mapped = data.map((q: any) => ({
        id: `RFQ-${q.id}`,
        rawId: q.id,
        date: q.createdAt,
        validUntil: q.valid_until,
        status: q.status,
        total: Number(q.total_amount),
        notes: "",
        items: q.QuoteItems?.map((i: any) => ({
          sku: i.product_id,
          nameAr: i.product_name,
          qty: i.quantity,
          unit: "قطعة",
          unitPrice: Number(i.unit_price)
        })) || []
      }));
      setQuotes(mapped);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const quote = quotes.find((q) => q.id === selected);

  if (selected && quote) {
    const currentStatus = quote.status;
    const canAct = currentStatus === "sent";

    return (
      <div style={{ background: "#F4F2EC", minHeight: "100vh" }}>
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
            onSecondaryAction={canAct ? async () => {
              try {
                await api.post(`/api/storefront/quotes/${quote.rawId}/reject`);
                fetchQuotes();
                setSelected(null);
              } catch (err) {
                alert("Failed to reject quote");
              }
            } : undefined}
          />

          {/* Payment modal */}
          {showPayment === quote.id && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center px-4"
              style={{ background: "rgba(17,20,28,0.7)" }}
            >
              <div
                className="w-full max-w-sm rounded-2xl p-6"
                style={{ background: "#F4F2EC" }}
              >
                <h3 className="font-display font-bold text-lg mb-1" style={{ color: "#11141C" }}>
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
                        borderColor: payment === opt.val ? "#FF5A1F" : "rgba(17,20,28,0.12)",
                        background: payment === opt.val ? "rgba(255,90,31,0.06)" : "#fff",
                      }}
                    >
                      <div
                        className="w-4 h-4 rounded-full border-2 flex items-center justify-center"
                        style={{ borderColor: payment === opt.val ? "#FF5A1F" : "rgba(17,20,28,0.2)" }}
                      >
                        {payment === opt.val && <div className="w-2 h-2 rounded-full" style={{ background: "#FF5A1F" }} />}
                      </div>
                      <div>
                        <div className="text-xs font-semibold" style={{ color: "#11141C" }}>{opt.label}</div>
                        <div className="font-mono text-[9px]" style={{ color: "#3A5CFF" }}>{opt.sub}</div>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={async () => {
                      try {
                        await api.post(`/api/storefront/quotes/${quote.rawId}/accept`, {
                          paymentMethod: payment === "cod" ? "COD" : "Credit"
                        });
                        setShowPayment(null);
                        setSelected(null);
                        fetchQuotes();
                      } catch (err: any) {
                        alert("Failed to accept quote: " + (err.response?.data?.message || err.message));
                      }
                    }}
                    className="flex-1 py-2.5 rounded-lg font-bold text-sm"
                    style={{ background: "#FF5A1F", color: "#fff" }}
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
              <p className="text-sm" style={{ color: "#11141C" }}>{quote.notes}</p>
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
        <h1 className="font-display font-bold text-2xl mb-2" style={{ color: "#11141C" }}>عروض الأسعار</h1>
        {loading ? (
          <p className="font-mono text-xs mb-7" style={{ color: "#8A8D9B" }}>جاري التحميل...</p>
        ) : (
          <>
            <p className="font-mono text-xs mb-7" style={{ color: "#8A8D9B" }}>{quotes.length} عروض</p>

            <div className="flex flex-col gap-5">
              {quotes.map((q) => {
                const st = q.status;
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
                      <div className="font-mono text-xs font-semibold" style={{ color: "#FF5A1F" }}>{q.id}</div>
                      <div className="font-mono text-[10px] mt-0.5" style={{ color: "#8A8D9B" }}>
                        {new Date(q.date).toLocaleDateString("ar-EG")} · صالح حتى {new Date(q.validUntil).toLocaleDateString("ar-EG")}
                      </div>
                    </div>
                    <div className="px-5 py-3 flex items-center justify-between">
                      <div className="text-xs" style={{ color: "#6b7280" }}>
                        {q.items.length} صنف
                      </div>
                      <div className="font-mono font-bold" style={{ color: "#FF5A1F" }}>
                        {formatPrice(q.total)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
