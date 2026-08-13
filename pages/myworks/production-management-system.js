import {
  FiDatabase,
  FiGrid,
  FiKey,
  FiMaximize,
  FiUpload,
} from "react-icons/fi";
import Link from "next/link";
import ImageCarousel from "../../components/ImageCarousel";
import Section from "../../components/Section";
import Highlight from "../../components/Highlight";

const carouselImages = [
  {
    src: "/images/works/production-management-system/add-material-receipt.png",
    alt: "Add Material Receipt",
    caption: "Allow user to record incoming material receipts.",
  },
  {
    src: "/images/works/production-management-system/material-receipt.png",
    alt: "Add Material Receipt",
    caption: "View and manage material receipts.",
  },
  {
    src: "/images/works/production-management-system/add-stock.png",
    alt: "Add Stock",
    caption: "Record new stock additions after stock is processed.",
  },
  {
    src: "/images/works/production-management-system/stocks-management.png",
    alt: "Stocks Management",
    caption: "View and manage stock levels and movements.",
  },
  {
    src: "/images/works/production-management-system/adjust-stock-movement.png",
    alt: "Adjust Stock Movement",
    caption: "Allows user to manually adjust stock if there is a discrepancy in stock count or other reasons.",
  },
  {
    src: "/images/works/production-management-system/view-stock-details.png",
    alt: "View Stock Details",
    caption: "View stock details, including change logs, and the movement history of the stock.",
  },
  {
    src: "/images/works/production-management-system/stock-qr-print.png",
    alt: "Stock QR Print",
    caption: "Print stock item QR labels to be pasted on the stock for easy scanning actions via mobile app.",
  },
  {
    src: "/images/works/production-management-system/add-load-order.png",
    alt: "Add Load Order",
    caption: "Allow user to create and manage load orders for delivery.",
  },
  {
    src: "/images/works/production-management-system/team-roles.png",
    alt: "Team Roles",
    caption: "Manage the list of roles avaialble to be assigned to team members.",
  },
  {
    src: "/images/works/production-management-system/team-roles-edit.png",
    alt: "Team Roles Edit",
    caption: "Manage team role with fine graind permissions for each module and action.",
  },
  {
    src: "/images/works/production-management-system/team-members.png",
    alt: "Team Members",
    caption: "Manage team members and their roles.",
  },
  {
    src: "/images/works/production-management-system/master-data-setting.png",
    alt: "Master Data Setting",
    caption: "Manage master data for the select inputs available in system.",
  },
];

const caseSections = [
  {
    title: "The Problem",
    body: "A manufacturing company was running production tracking on a legacy system that charged a monthly per-head fee and was riddled with bugs. They also looked to digitalize more of their processes and documents.",
  },
  {
    title: "The Solution",
    body: "My team designed and built a web and mobile system covering the full workflow — material receipt, processing, stock management, sales, and delivery — with reporting, access control, master data management, and QR-based stock tracking.",
  },
  {
    title: "Result",
    body: "The inventory department now tracks stock more efficiently, and information flows between departments in real time.",
  },
  {
    title: "My Role",
    body: "Lead developer - I designed the system architecture and built the foundation of the web platform that other features were built on. I owned the material, report, and team modules, and built the companion Flutter mobile app with stock QR scanning and info retrieval.",
  },
];

const technicalHighlights = [
  {
    title: "Weighbridge Excel import pipeline",
    text: "A import wizard that does: client-side XLSX parsing, per-row validation with error pinning, duplicate detection against approved records, supplier auto-matching, and batched transactional upserts.",
    icon: FiUpload,
  },
  {
    title: "Server-driven data grid engine",
    text: "A generic hook that translates ag-grid filter/sort models into paginated Prisma queries.",
    icon: FiGrid,
  },
  {
    title: "QR stock labeling & mobile scan-to-adjust",
    text: "Bulk print-ready QR label sheets for produced stock. The companion Flutter app scans a label, resolves it to the stock record, and supports live quantity adjustment with reason codes.",
    icon: FiMaximize,
  },
  {
    title: "RBAC permission matrix",
    text: "10 modules × 7 actions, enforced at menu, button, and column level in the web UI abd mobile app.",
    icon: FiKey,
  },
];

export default function ProductionManagementSystem() {
  return (
    <main className="pb-16">
      <Link className="text-sm opacity-70 hover:opacity-100" href="/myworks">
        Back to My Works
      </Link>
      <ImageCarousel images={carouselImages} />
      <section className="mt-6">
        {caseSections.map((section, index) => (
          <Section key={section.title} {...section} index={index} />
        ))}
      </section>
      <section className="border-t border-black/10 pt-8 dark:border-white/20">
        <h2 className="text-2xl font-bold">Technical Highlights</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {technicalHighlights.map((highlight) => (
            <Highlight key={highlight.title} {...highlight} />
          ))}
        </div>
      </section>
      <section className="mt-12 rounded-lg border border-black/10 p-5 dark:border-white/20">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-100 text-sky-700 dark:bg-sky-400/20 dark:text-sky-200">
            <FiDatabase />
          </div>
          <div>
            <h2 className="text-xl font-bold">Tech Stack</h2>
            <p className="mt-1 opacity-75">
              Next.js, React, TypeScript, Flutter, PostgreSQL, Prisma, Cloudflare R2.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
