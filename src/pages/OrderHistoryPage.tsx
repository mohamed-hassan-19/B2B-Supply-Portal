import { useState, useEffect } from "react";
import { statusLabels } from "../data/mockData";
import ManifestCard from "../components/ManifestCard";
import NavBar from "../components/NavBar";
import StampBadge from "../components/StampBadge";
import { api } from "../lib/api";

export default function OrderHistoryPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/api/storefront/orders')
      .then(res => res.data)
      .then(data => {
        // Map backend orders to match mock shape
        const mapped = data.map((o: any) => ({
          id: `ORD-${o.id}`,
          rawId: o.id,
          date: o.createdAt,
          status: o.status, // approved, cancelled, delivered, etc
          paymentMethod: o.payment_method.toLowerCase(),
          total: Number(o.total_amount),
          items: o.OrderItems?.map((i: any) => ({
            sku: i.product_id,
            nameAr: i.product_name,
            qty: i.quantity,
            unit: "قطعة",
            unitPrice: Number(i.unit_price)
          })) || []
        }));
        setOrders(mapped);
        setLoading(false);
      });
  }, []);

  const order = orders.find((o) => o.id === selected);

  if (selected && order) {
    return (
      <div style={{ background: "#F4F2EC", minHeight: "100vh" }}>
        <NavBar />
        <div className="max-w-3xl mx-auto px-4 sm:px-8 py-8">
          <button
            onClick={() => setSelected(null)}
            className="flex items-center gap-2 text-sm mb-6 font-medium"
            style={{ color: "#8A8D9B" }}
          >
            › العودة للطلبات
          </button>
          <ManifestCard
            id={order.id}
            date={order.date}
            status={order.status}
            items={order.items}
            total={order.total}
            paymentMethod={order.paymentMethod}
            dark={false}
          />

          {/* Additional metadata */}
          <div
            className="mt-4 rounded-xl p-5"
            style={{ background: "#fff", border: "1px solid rgba(17,20,28,0.1)" }}
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { label: "رقم الطلب", val: order.id, mono: true },
                { label: "تاريخ الطلب", val: new Date(order.date).toLocaleDateString("ar-EG", { year: "numeric", month: "long", day: "numeric" }), mono: false },
                { label: "طريقة الدفع", val: statusLabels[order.paymentMethod], mono: true },
                { label: "الحالة", val: "", mono: false, badge: order.status },
                { label: "عدد الأصناف", val: String(order.items.length), mono: true },
              ].map((item) => (
                <div key={item.label}>
                  <div className="font-mono text-[10px] mb-1" style={{ color: "#8A8D9B" }}>{item.label}</div>
                  {item.badge ? (
                    <StampBadge status={item.badge} label={statusLabels[item.badge] || item.badge} size="sm" />
                  ) : (
                    <div className={`text-xs font-semibold ${item.mono ? "font-mono" : ""}`} style={{ color: "#11141C" }}>
                      {item.val}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#F4F2EC", minHeight: "100vh" }}>
      <NavBar />
      <div className="max-w-3xl mx-auto px-4 sm:px-8 py-8">
        <h1 className="font-display font-bold text-2xl mb-2" style={{ color: "#11141C" }}>طلباتي</h1>
        {loading ? (
          <p className="font-mono text-xs mb-7" style={{ color: "#8A8D9B" }}>جاري التحميل...</p>
        ) : (
          <>
            <p className="font-mono text-xs mb-7" style={{ color: "#8A8D9B" }}>{orders.length} طلبات</p>
            <div className="flex flex-col gap-5">
              {orders.map((o) => (
                <ManifestCard
                  key={o.id}
                  id={o.id}
                  date={o.date}
                  status={o.status}
                  items={o.items}
                  total={o.total}
                  paymentMethod={o.paymentMethod}
                  compact
                  onClick={() => setSelected(o.id)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
