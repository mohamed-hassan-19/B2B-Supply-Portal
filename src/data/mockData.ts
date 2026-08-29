export interface Product {
  id: string;
  sku: string;
  nameAr: string;
  nameEn: string;
  category: string;
  price: number;
  unit: string;
  stock: number;
  stockStatus: "in_stock" | "low_stock" | "out_of_stock";
  image: string;
  description: string;
}

export interface OrderItem {
  sku: string;
  nameAr: string;
  qty: number;
  unit: string;
  unitPrice: number;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  status: "pending" | "approved" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentMethod: "cod" | "credit";
  total: number;
}

export interface Quote {
  id: string;
  date: string;
  items: OrderItem[];
  status: "sent" | "accepted" | "rejected" | "expired";
  validUntil: string;
  total: number;
  notes?: string;
}

export interface Invoice {
  id: string;
  orderId: string;
  date: string;
  dueDate: string;
  total: number;
  status: "paid" | "pending" | "overdue";
  items: OrderItem[];
}

export const PRODUCTS: Product[] = [
  {
    id: "p001",
    sku: "STL-PIPE-001",
    nameAr: "أنابيب فولاذية مجلفنة",
    nameEn: "Galvanized Steel Pipes",
    category: "مواد البناء",
    price: 850,
    unit: "طن",
    stock: 240,
    stockStatus: "in_stock",
    image: "photo-1504328345606-18bbc8c9d7d1",
    description: "أنابيب فولاذية مجلفنة عالية الجودة للاستخدام في مشاريع البناء والبنية التحتية. مطابقة للمواصفات القياسية المصرية.",
  },
  {
    id: "p002",
    sku: "ELC-CBL-002",
    nameAr: "كابلات كهربائية NYY",
    nameEn: "NYY Power Cables",
    category: "كهرباء وطاقة",
    price: 1200,
    unit: "كم",
    stock: 18,
    stockStatus: "low_stock",
    image: "photo-1558618666-fcd25c85cd64",
    description: "كابلات طاقة NYY مقاومة للحرارة والرطوبة، مناسبة للتركيبات الكهربائية الصناعية والسكنية.",
  },
  {
    id: "p003",
    sku: "SAF-HELM-003",
    nameAr: "خوذات أمان صناعية",
    nameEn: "Industrial Safety Helmets",
    category: "معدات السلامة",
    price: 95,
    unit: "قطعة",
    stock: 500,
    stockStatus: "in_stock",
    image: "photo-1504917595217-d4dc5ebe6122",
    description: "خوذات حماية معتمدة للاستخدام في مواقع البناء والمصانع. مطابقة لمعايير السلامة الأوروبية EN397.",
  },
  {
    id: "p004",
    sku: "CEM-GRY-004",
    nameAr: "أسمنت بورتلاندي رمادي",
    nameEn: "Grey Portland Cement",
    category: "مواد البناء",
    price: 180,
    unit: "طن",
    stock: 850,
    stockStatus: "in_stock",
    image: "photo-1585771724684-38269d6639fd",
    description: "أسمنت بورتلاندي عادي درجة 42.5 N، مناسب لجميع أعمال البناء الإنشائية.",
  },
  {
    id: "p005",
    sku: "HYD-PUMP-005",
    nameAr: "مضخات هيدروليكية صناعية",
    nameEn: "Industrial Hydraulic Pumps",
    category: "معدات صناعية",
    price: 12500,
    unit: "وحدة",
    stock: 7,
    stockStatus: "low_stock",
    image: "photo-1581092580497-e0d23cbdf1dc",
    description: "مضخات هيدروليكية عالية الضغط للاستخدام الصناعي الثقيل. ضمان سنتان.",
  },
  {
    id: "p006",
    sku: "PLY-WD-006",
    nameAr: "ألواح خشب رقائقي",
    nameEn: "Marine Plywood Sheets",
    category: "أخشاب",
    price: 320,
    unit: "ورقة",
    stock: 1200,
    stockStatus: "in_stock",
    image: "photo-1566041510639-8d95a2490bfb",
    description: "ألواح خشب رقائقي بحري مقاومة للرطوبة، سماكة 18مم، مقاس 122×244 سم.",
  },
  {
    id: "p007",
    sku: "PNT-WH-007",
    nameAr: "دهان أبيض خارجي",
    nameEn: "Exterior White Paint",
    category: "دهانات",
    price: 420,
    unit: "جالون 20 لتر",
    stock: 0,
    stockStatus: "out_of_stock",
    image: "photo-1562259949-e8e7689d7828",
    description: "دهان خارجي مقاوم للعوامل الجوية والأشعة الفوق بنفسجية. مناسب للأسطح الخارجية الخرسانية.",
  },
  {
    id: "p008",
    sku: "BOLT-SS-008",
    nameAr: "براغي ومسامير ستانلس ستيل",
    nameEn: "Stainless Steel Bolts & Screws",
    category: "أدوات ومستلزمات",
    price: 65,
    unit: "علبة 100 قطعة",
    stock: 3000,
    stockStatus: "in_stock",
    image: "photo-1591017403286-fd8493524e1e",
    description: "براغي ومسامير ستانلس ستيل A2-70 مقاومة للصدأ، مقاسات متعددة.",
  },
];

export const ORDERS: Order[] = [
  {
    id: "ORD-2024-0041",
    date: "2024-11-15",
    status: "delivered",
    paymentMethod: "credit",
    total: 47500,
    items: [
      { sku: "STL-PIPE-001", nameAr: "أنابيب فولاذية مجلفنة", qty: 40, unit: "طن", unitPrice: 850 },
      { sku: "BOLT-SS-008", nameAr: "براغي ومسامير ستانلس ستيل", qty: 150, unit: "علبة", unitPrice: 65 },
      { sku: "SAF-HELM-003", nameAr: "خوذات أمان صناعية", qty: 50, unit: "قطعة", unitPrice: 95 },
    ],
  },
  {
    id: "ORD-2024-0038",
    date: "2024-11-08",
    status: "shipped",
    paymentMethod: "cod",
    total: 21600,
    items: [
      { sku: "CEM-GRY-004", nameAr: "أسمنت بورتلاندي رمادي", qty: 120, unit: "طن", unitPrice: 180 },
    ],
  },
  {
    id: "ORD-2024-0035",
    date: "2024-10-28",
    status: "processing",
    paymentMethod: "credit",
    total: 87500,
    items: [
      { sku: "HYD-PUMP-005", nameAr: "مضخات هيدروليكية صناعية", qty: 5, unit: "وحدة", unitPrice: 12500 },
      { sku: "ELC-CBL-002", nameAr: "كابلات كهربائية NYY", qty: 10, unit: "كم", unitPrice: 1200 },
      { sku: "PLY-WD-006", nameAr: "ألواح خشب رقائقي", qty: 200, unit: "ورقة", unitPrice: 320 },
    ],
  },
  {
    id: "ORD-2024-0029",
    date: "2024-10-12",
    status: "cancelled",
    paymentMethod: "cod",
    total: 9600,
    items: [
      { sku: "PNT-WH-007", nameAr: "دهان أبيض خارجي", qty: 24, unit: "جالون", unitPrice: 420 },
      { sku: "BOLT-SS-008", nameAr: "براغي ومسامير ستانلس ستيل", qty: 40, unit: "علبة", unitPrice: 65 },
    ],
  },
  {
    id: "ORD-2024-0021",
    date: "2024-09-20",
    status: "approved",
    paymentMethod: "credit",
    total: 34000,
    items: [
      { sku: "STL-PIPE-001", nameAr: "أنابيب فولاذية مجلفنة", qty: 40, unit: "طن", unitPrice: 850 },
    ],
  },
];

export const QUOTES: Quote[] = [
  {
    id: "RFQ-2024-0019",
    date: "2024-11-10",
    validUntil: "2024-11-25",
    status: "sent",
    total: 156000,
    notes: "يرجى تضمين تكلفة الشحن إلى موقع المشروع في القاهرة الجديدة",
    items: [
      { sku: "STL-PIPE-001", nameAr: "أنابيب فولاذية مجلفنة", qty: 120, unit: "طن", unitPrice: 850 },
      { sku: "BOLT-SS-008", nameAr: "براغي ومسامير ستانلس ستيل", qty: 500, unit: "علبة", unitPrice: 65 },
      { sku: "SAF-HELM-003", nameAr: "خوذات أمان صناعية", qty: 200, unit: "قطعة", unitPrice: 95 },
    ],
  },
  {
    id: "RFQ-2024-0016",
    date: "2024-10-22",
    validUntil: "2024-11-06",
    status: "accepted",
    total: 62500,
    items: [
      { sku: "HYD-PUMP-005", nameAr: "مضخات هيدروليكية صناعية", qty: 5, unit: "وحدة", unitPrice: 12500 },
    ],
  },
  {
    id: "RFQ-2024-0012",
    date: "2024-09-15",
    validUntil: "2024-09-30",
    status: "expired",
    total: 28800,
    items: [
      { sku: "PLY-WD-006", nameAr: "ألواح خشب رقائقي", qty: 90, unit: "ورقة", unitPrice: 320 },
    ],
  },
  {
    id: "RFQ-2024-0008",
    date: "2024-08-28",
    validUntil: "2024-09-12",
    status: "rejected",
    total: 7200,
    items: [
      { sku: "ELC-CBL-002", nameAr: "كابلات كهربائية NYY", qty: 6, unit: "كم", unitPrice: 1200 },
    ],
  },
];

export const INVOICES: Invoice[] = [
  {
    id: "INV-2024-0041",
    orderId: "ORD-2024-0041",
    date: "2024-11-16",
    dueDate: "2024-12-16",
    total: 47500,
    status: "paid",
    items: [
      { sku: "STL-PIPE-001", nameAr: "أنابيب فولاذية مجلفنة", qty: 40, unit: "طن", unitPrice: 850 },
      { sku: "BOLT-SS-008", nameAr: "براغي ومسامير ستانلس ستيل", qty: 150, unit: "علبة", unitPrice: 65 },
      { sku: "SAF-HELM-003", nameAr: "خوذات أمان صناعية", qty: 50, unit: "قطعة", unitPrice: 95 },
    ],
  },
  {
    id: "INV-2024-0035",
    orderId: "ORD-2024-0035",
    date: "2024-10-29",
    dueDate: "2024-11-28",
    total: 87500,
    status: "overdue",
    items: [
      { sku: "HYD-PUMP-005", nameAr: "مضخات هيدروليكية صناعية", qty: 5, unit: "وحدة", unitPrice: 12500 },
      { sku: "ELC-CBL-002", nameAr: "كابلات كهربائية NYY", qty: 10, unit: "كم", unitPrice: 1200 },
      { sku: "PLY-WD-006", nameAr: "ألواح خشب رقائقي", qty: 200, unit: "ورقة", unitPrice: 320 },
    ],
  },
  {
    id: "INV-2024-0038",
    orderId: "ORD-2024-0038",
    date: "2024-11-09",
    dueDate: "2024-12-09",
    total: 21600,
    status: "pending",
    items: [
      { sku: "CEM-GRY-004", nameAr: "أسمنت بورتلاندي رمادي", qty: 120, unit: "طن", unitPrice: 180 },
    ],
  },
];

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("ar-EG", { style: "currency", currency: "EGP", maximumFractionDigits: 0 }).format(n);

export const statusLabels: Record<string, string> = {
  pending: "قيد الانتظار",
  approved: "معتمد",
  processing: "جاري التجهيز",
  shipped: "تم الشحن",
  delivered: "تم التسليم",
  cancelled: "ملغي",
  sent: "مرسل",
  accepted: "مقبول",
  rejected: "مرفوض",
  expired: "منتهي",
  paid: "مسدد",
  overdue: "متأخر",
  cod: "دفع عند الاستلام",
  credit: "ائتمان صافي 30",
};
