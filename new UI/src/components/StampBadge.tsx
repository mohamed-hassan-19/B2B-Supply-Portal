interface StampBadgeProps {
  status: string;
  label: string;
  size?: "sm" | "md";
}

const statusColors: Record<string, { bg: string; text: string; border: string }> = {
  pending: { bg: "rgba(255,198,41,0.15)", text: "#b8860b", border: "rgba(255,198,41,0.5)" },
  approved: { bg: "rgba(58,92,255,0.12)", text: "#3A5CFF", border: "rgba(58,92,255,0.5)" },
  processing: { bg: "rgba(58,92,255,0.12)", text: "#3A5CFF", border: "rgba(58,92,255,0.5)" },
  shipped: { bg: "rgba(58,92,255,0.15)", text: "#3A5CFF", border: "rgba(58,92,255,0.6)" },
  delivered: { bg: "rgba(34,197,94,0.12)", text: "#16a34a", border: "rgba(34,197,94,0.5)" },
  cancelled: { bg: "rgba(138,141,155,0.15)", text: "#8A8D9B", border: "rgba(138,141,155,0.4)" },
  sent: { bg: "rgba(255,198,41,0.15)", text: "#b8860b", border: "rgba(255,198,41,0.5)" },
  accepted: { bg: "rgba(34,197,94,0.12)", text: "#16a34a", border: "rgba(34,197,94,0.5)" },
  rejected: { bg: "rgba(239,68,68,0.12)", text: "#dc2626", border: "rgba(239,68,68,0.5)" },
  expired: { bg: "rgba(138,141,155,0.15)", text: "#8A8D9B", border: "rgba(138,141,155,0.4)" },
  paid: { bg: "rgba(34,197,94,0.12)", text: "#16a34a", border: "rgba(34,197,94,0.5)" },
  pending_inv: { bg: "rgba(255,198,41,0.15)", text: "#b8860b", border: "rgba(255,198,41,0.5)" },
  overdue: { bg: "rgba(255,198,41,0.2)", text: "#92610a", border: "rgba(255,198,41,0.6)" },
};

export default function StampBadge({ status, label, size = "md" }: StampBadgeProps) {
  const colors = statusColors[status] || statusColors.pending;
  const padding = size === "sm" ? "px-2 py-0.5" : "px-3 py-1";
  const fontSize = size === "sm" ? "text-[9px]" : "text-[10px]";

  return (
    <span
      className={`stamp-badge inline-block ${padding} ${fontSize} font-mono font-semibold tracking-widest uppercase border rounded`}
      style={{
        background: colors.bg,
        color: colors.text,
        borderColor: colors.border,
        letterSpacing: "0.12em",
      }}
    >
      {label}
    </span>
  );
}
