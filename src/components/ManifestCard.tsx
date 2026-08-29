import StampBadge from "./StampBadge";
import { formatPrice, statusLabels } from "../data/mockData";

interface LineItem {
  sku: string;
  nameAr: string;
  qty: number;
  unit: string;
  unitPrice: number;
}

interface ManifestCardProps {
  id: string;
  date: string;
  status: string;
  items: LineItem[];
  total: number;
  paymentMethod?: string;
  dark?: boolean;
  onClick?: () => void;
  actionLabel?: string;
  onAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  extraInfo?: string;
  compact?: boolean;
}

export default function ManifestCard({
  id,
  date,
  status,
  items,
  total,
  paymentMethod,
  dark = false,
  onClick,
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  extraInfo,
  compact = false,
}: ManifestCardProps) {
  const bg = dark ? "#1B2030" : "#F4F2EC";
  const border = dark ? "rgba(255,255,255,0.08)" : "rgba(17,20,28,0.12)";
  const text = dark ? "#F4F2EC" : "#11141C";
  const muted = dark ? "#8A8D9B" : "#6b7280";
  const footerBg = dark ? "#11141C" : "#11141C";
  const divider = dark ? "rgba(255,255,255,0.1)" : "rgba(17,20,28,0.1)";
  const rowHover = dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)";

  const displayItems = compact ? items.slice(0, 3) : items;

  return (
    <div
      className={`relative rounded-lg overflow-hidden transition-shadow ${onClick ? "cursor-pointer hover:shadow-lg" : ""}`}
      style={{ background: bg, border: `1px solid ${border}`, color: text }}
      onClick={onClick}
    >
      {/* Stamp badge - positioned top left (RTL) */}
      <div className="absolute top-4 left-4 z-10">
        <StampBadge status={status === "pending" && !paymentMethod ? "pending_inv" : status} label={statusLabels[status] || status} />
      </div>

      {/* Header */}
      <div className="pt-4 pb-3 px-5" style={{ paddingLeft: "7rem" }}>
        <div className="font-mono text-xs font-semibold" style={{ color: "#FF5A1F", letterSpacing: "0.08em" }}>
          {id}
        </div>
        <div className="font-mono text-xs mt-0.5" style={{ color: muted }}>
          {new Date(date).toLocaleDateString("ar-EG", { year: "numeric", month: "long", day: "numeric" })}
          {extraInfo && <span className="mr-3">{extraInfo}</span>}
        </div>
      </div>

      {/* Dashed divider */}
      <div className="manifest-divider mx-5" style={{ borderColor: divider }} />

      {/* Line items */}
      <div className="px-5 py-2">
        {/* Table header */}
        <div
          className="grid text-[10px] font-mono font-semibold pb-1.5 pt-1"
          style={{
            color: muted,
            letterSpacing: "0.08em",
            gridTemplateColumns: "1fr auto auto auto",
            gap: "0 16px",
          }}
        >
          <span>الصنف</span>
          <span className="text-center">الكمية</span>
          <span className="text-left">سعر الوحدة</span>
          <span className="text-left">الإجمالي</span>
        </div>
        <div className="manifest-divider mb-1" style={{ borderColor: divider }} />

        {displayItems.map((item) => (
          <div
            key={item.sku}
            className="line-item-row grid py-1.5 text-[11px]"
            style={{
              gridTemplateColumns: "1fr auto auto auto",
              gap: "0 16px",
              transition: "background 0.15s",
            }}
          >
            <div>
              <div className="font-medium" style={{ color: text }}>{item.nameAr}</div>
              <div className="font-mono text-[9px] mt-0.5" style={{ color: muted }}>{item.sku}</div>
            </div>
            <div className="font-mono text-center self-center" style={{ color: text }}>
              {item.qty} <span style={{ color: muted, fontSize: "9px" }}>{item.unit}</span>
            </div>
            <div className="font-mono text-left self-center" style={{ color: muted }}>
              {formatPrice(item.unitPrice)}
            </div>
            <div className="font-mono text-left self-center font-semibold" style={{ color: text }}>
              {formatPrice(item.qty * item.unitPrice)}
            </div>
          </div>
        ))}

        {compact && items.length > 3 && (
          <div className="text-[10px] font-mono py-1" style={{ color: muted }}>
            +{items.length - 3} أصناف أخرى
          </div>
        )}
      </div>

      {/* Footer bar */}
      <div
        className="flex items-center justify-between px-5 py-3 mt-1"
        style={{ background: footerBg }}
      >
        <div className="flex items-center gap-3">
          {paymentMethod && (
            <span className="font-mono text-[10px]" style={{ color: "#8A8D9B", letterSpacing: "0.08em" }}>
              {statusLabels[paymentMethod] || paymentMethod}
            </span>
          )}
          {(actionLabel || secondaryActionLabel) && (
            <div className="flex gap-2">
              {actionLabel && onAction && (
                <button
                  className="font-mono text-[10px] px-3 py-1 rounded font-semibold transition-colors"
                  style={{ background: "#FF5A1F", color: "#fff" }}
                  onClick={(e) => { e.stopPropagation(); onAction(); }}
                >
                  {actionLabel}
                </button>
              )}
              {secondaryActionLabel && onSecondaryAction && (
                <button
                  className="font-mono text-[10px] px-3 py-1 rounded font-semibold border transition-colors"
                  style={{ color: "#8A8D9B", borderColor: "rgba(138,141,155,0.3)", background: "transparent" }}
                  onClick={(e) => { e.stopPropagation(); onSecondaryAction(); }}
                >
                  {secondaryActionLabel}
                </button>
              )}
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono" style={{ color: "#8A8D9B" }}>الإجمالي</span>
          <span className="font-mono font-bold text-base" style={{ color: "#FF5A1F" }}>
            {formatPrice(total)}
          </span>
        </div>
      </div>
    </div>
  );
}
