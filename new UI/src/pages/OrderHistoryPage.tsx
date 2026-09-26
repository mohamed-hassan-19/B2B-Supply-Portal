import { useState } from "react";
import { ORDERS, statusLabels } from "../data/mockData";
import ManifestCard from "../components/ManifestCard";
import NavBar from "../components/NavBar";
import StampBadge from "../components/StampBadge";

export default function OrderHistoryPage() {
  const [selected, setSelected] = useState<string | null>(null);

  const order = ORDERS.find((o) => o.id === selected);

  if (selected && order) {
    return (
      <div style={{ background: "#FAF7EE", minHeight: "100vh" }}>
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
                    <div className={`text-xs font-semibold ${item.mono ? "font-mono" : ""}`} style={{ color: "#1A1F2E" }}>
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
    <div style={{ background: "#FAF7EE", minHeight: "100vh" }}>
      <NavBar />
      <div className="max-w-3xl mx-auto px-4 sm:px-8 py-8">
        <h1 className="font-display font-bold text-2xl mb-2" style={{ color: "#1A1F2E" }}>طلباتي</h1>
        <p className="font-mono text-xs mb-7" style={{ color: "#8A8D9B" }}>{ORDERS.length} طلبات</p>

        <div className="flex flex-col gap-5">
          {ORDERS.map((order) => (
            <ManifestCard
              key={order.id}
              id={order.id}
              date={order.date}
              status={order.status}
              items={order.items}
              total={order.total}
              paymentMethod={order.paymentMethod}
              compact
              onClick={() => setSelected(order.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
