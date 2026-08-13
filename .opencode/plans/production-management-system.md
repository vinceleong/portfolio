# Production Management System — Detail Page Plan

## Decisions locked in

1. Mobile app is real — repo `/Users/admin/karich_mobile_flutter` (Flutter companion app). Keep "web and mobile" claim + `fluttermobile` tag.
2. My Role text (from user): lead developer, architecture + foundation, material/report/team modules, mobile app with scanning.
3. Technical highlights: picks 1–4 (weighbridge import, ag-grid engine, QR labeling, RBAC) — mobile app woven into #3 and #4.
4. Slug: `/myworks/production-management-system`.
5. **No Mermaid diagram** — workflow is standard CRUD; diagram adds no value. Page structure: carousel → sections → highlights → tech stack.

---

## 1. List entry (`pages/myworks.js`)

```js
{
  title: "Production Management System",
  description: "A warehouse & production ERP for a materials recycling company — digitizing weighbridge intake, QR-labelled stock tracking, and dispatch, with approval workflows, RBAC, and full audit trails.",
  caseStudyPath: "/myworks/production-management-system",
  imagePath: "/images/works/production-management-system/thumbnail.png",
  alt: "Production Management System thumbnail",
  tags: ["nextjs", "typescript", "fluttermobile", "postgresql"]
},
```

## 2. Detail page content (`pages/myworks/production-management-system.js`)

### Case sections

| Section | Text |
|---------|------|
| **The Problem** | A manufacturing company was running production tracking on a legacy system that charged a monthly per-head fee and was riddled with bugs. They also looked to digitalize more of their processes and documents. |
| **The Solution** | My team designed and built a web and mobile system covering the full workflow — material receipt, processing, stock management, sales, and delivery — with reporting, access control, master data management, and QR-based stock tracking. |
| **Result** | The inventory department now tracks stock more efficiently, and information flows between departments in real time. |
| **My Role** | Lead developer — I designed the system architecture and built the foundation of the web platform that other features were built on. I owned the material, report, and team modules, and built the companion Flutter mobile app with stock QR scanning and info retrieval. |

### Technical highlights (4)

| # | Title | Text | Icon |
|---|-------|------|------|
| 1 | **Weighbridge Excel import pipeline** | 4-step import wizard: client-side XLSX parsing, per-row zod validation with error pinning, duplicate detection against approved records, supplier auto-matching via a configurable mapping table, and batched transactional upserts. | `FiUpload` |
| 2 | **Server-driven data grid engine** | A generic hook that translates ag-grid filter/sort models into paginated Prisma queries with relation sorting and mirrored count queries — one implementation reused across every module's list view. | `FiGrid` |
| 3 | **QR stock labeling & mobile scan-to-adjust** | Bulk print-ready QR label sheets for produced stock. The companion Flutter app scans a label, resolves it to the stock record, and supports live quantity adjustment with reason codes. | `FiMaximize` |
| 4 | **RBAC permission matrix** | 10 modules × 7 actions (VIEW/EDIT/CREATE/DELETE/EXPORT/APPROVE/IMPORT), enforced at menu, button, and column level in the web UI — and mirrored in the mobile app, which filters its home grid by the same permissions. | `FiKey` |

### Tech stack card

`Next.js, React, TypeScript, Flutter, PostgreSQL, Prisma, Cloudflare R2.` — icon: `FiDatabase`

### Carousel

Starts with `thumbnail.png` (karich-logo.png copied from repo) as placeholder.

## 3. Screenshots to capture later

From web app (`public/images/works/production-management-system/`):

| File | What to capture |
|------|-----------------|
| `mrn-grid.png` | Material receipt list with status filters |
| `mrn-entry.png` | MRN entry dialog — dynamic item rows, attachments |
| `weighbridge-import.png` | 4-step import wizard with validation/progress |
| `stock-qr-print.png` | Stock multi-select → QR label print sheet |
| `rbac-matrix.png` | Team → Roles × Permissions matrix |
| `report.png` | Material receipt report with summary-by-type pivot |

From mobile app (optional, 1–2):

| File | What to capture |
|------|-----------------|
| `mobile-scan.png` | QR camera scan screen |
| `mobile-stock-detail.png` | Scanned stock detail / adjustment screen |

## 4. Files touched

| Action | File |
|--------|------|
| Edit | `pages/myworks.js` (entry update) |
| Create | `pages/myworks/production-management-system.js` |
| Copy | karich-logo.png → `public/images/works/production-management-system/thumbnail.png` |
| Reuse | `components/Section.js`, `components/Highlight.js`, `components/ImageCarousel.js` (no Mermaid imports) |

## 5. Verification

`npm run build` — expect clean compile with new route `/myworks/production-management-system`.
