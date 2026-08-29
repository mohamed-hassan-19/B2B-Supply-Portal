Design a B2B procurement storefront called "Lista" — a bold, industrial-modern web app where companies browse a supply catalog and order or request quotes. This is not a consumer e-commerce site — it should feel like professional infrastructure for procurement teams, not a retail shop.

## Design Direction
Bold and modern with strong, deliberate color use — not minimal, not corporate-beige. Draw from industrial/logistics visual language: purchase orders, packing slips, warehouse hazard-tape coloring, shipping manifests.

## Color Palette
- Ink (primary dark): #11141C
- Ink Soft (dark surface): #1B2030
- Paper (light background): #F4F2EC
- Paper Dim (light surface): #E7E3D8
- Signal Orange (primary accent — warehouse/hazard tone): #FF5A1F
- Electric Blue (secondary accent — trust/verified signal): #3A5CFF
- Muted text: #8A8D9B

Use Ink as the dominant background for marketing/hero sections and Paper as the dominant background for functional/dashboard-style screens (catalog, cart, orders). Signal Orange is the primary CTA and price/highlight color. Electric Blue is reserved for status/verification indicators (e.g. "Credit approved," "Verified"), so it never competes with orange for attention.

## Typography
- Display face: Space Grotesk (bold, 600–700 weight) for headlines and product names
- Body face: Inter (400–500 weight) for paragraph text and UI labels
- Mono face: IBM Plex Mono for SKUs, order numbers, quantities, prices, and any tabular/data content — this is a signature detail, used consistently anywhere a real purchase order or manifest would use monospace type

## Signature Element
A "manifest card" motif: a purchase-order-styled card with a dashed divider under its header, a rotated stamp-style badge (e.g. "Credit · Net 30", "Verified", "Pending Approval") in the top right, line items in a table-like row format using mono type for SKU/quantity, and a dark footer bar showing the total. Reuse this card style anywhere an order, quote, or invoice summary appears — it's the recurring visual signature across the whole product, not just the homepage.

## Pages to Design

1. **Homepage** — dark (Ink) hero with a bold headline, a manifest-card visual on the right showing a sample order, a stat strip (SKU count, quote turnaround, fulfillment rate, credit terms), a two-path section ("Direct order" vs "Request for quotation"), a product grid preview, and a 3-step "how it works" section.

2. **Login** and **Register** — clean forms on a Paper background. Register includes company name, email, password, commercial/tax registration numbers, contact details, and payment method preference (Cash on Delivery or Credit). Show a clear "pending approval" state after registering.

3. **Catalog / Product Listing** — grid of products (image, category label in mono caps, name, price in mono, stock level), search bar, category filters, pagination. Use "In stock" / "Low stock" badges.

4. **Product Detail** — large image, name, category, price, stock level, quantity selector, "Add to cart" CTA, full description.

5. **Cart / Checkout** — manifest-card-styled order summary (line items, quantities, unit prices, total), payment method selector (COD or Credit — show Credit as disabled/locked if the account isn't approved for it), submit order CTA.

6. **Order History** — list of past orders as manifest cards, each showing status as a rotated stamp badge (Pending, Approved, Processing, Shipped, Delivered, Cancelled), with a detail view per order.

7. **Quotes (RFQ)** — list of quotes sent to the account with status stamps (Sent, Accepted, Rejected, Expired), a quote detail view with negotiated line-item pricing, and Accept/Reject actions. Accepting prompts a payment method choice, styled consistently with checkout.

8. **Invoices** — list of invoices as manifest cards showing amount, due date, and payment status (Paid / Pending / Overdue — Overdue should read clearly urgent, using Signal Orange).

9. **Account nav** — a persistent top nav for logged-in clients linking to Catalog, Orders, Quotes, Invoices, and Account, plus a visible banner/indicator if the account is still pending approval.

## Interaction & Detail Notes
- Buttons: solid Signal Orange for primary actions, solid Electric Blue for secondary/status-related actions, ghost/outline style for tertiary actions.
- Keep hover and focus states visible and intentional — this is a professional tool used daily, not a marketing site, so clarity matters more than flourish.
- Numbered steps (01/02/03) are only used where there's a real sequence (the "how it works" flow) — don't apply numbering decoratively elsewhere.
- Responsive down to a reasonable tablet/mobile breakpoint for the account-facing pages (catalog, cart, orders), since procurement staff may check status on the go.

Design this as a connected system — component styles (buttons, badges, manifest cards, form fields) should be consistent across all pages, not restyled per screen.