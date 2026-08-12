import {
  FiCloud,
  FiLock,
  FiEye,
  FiShield,
  FiUsers,
} from "react-icons/fi";
import { useState } from "react";
import Link from "next/link";
import Script from "next/script";
import ImageCarousel from "../../components/ImageCarousel";
import Section from "../../components/Section";
import MermaidDiagram from "../../components/MermaidDiagram";
import Highlight from "../../components/Highlight";

const carouselImages = [
  {
    src: "/images/works/jagacount/individual-invoice.png",
    alt: "individual invoice submission",
    caption: "Allow selection of individual invoices for submission, and display of submission status.",
  },
  {
    src: "/images/works/jagacount/consolidated-submission-select.png",
    alt: "consolidated e-invoice submission-select",
    caption: "Filter financial documents for consolidated submission.",
  },
  {
    src: "/images/works/jagacount/consolidated-submission-preview.png",
    alt: "consolidated e-invoice submission-preview",
    caption: "Preview and select the consolidated e-invoice before submission.",
  },
  {
    src: "/images/works/jagacount/consolidated-invoice-dashboard.png",
    alt: "consolidated e-invoice submission dashboard",
    caption: "Dashboard showing consolidated e-invoice submission status,",
  },
  {
    src: "/images/works/jagacount/company-einvoice-config.png",
    alt: "company e-invoice configuration",
    caption: "Step by step guide that helps client property to configure their own LHDN-compliant company profile for e-invoice submission.",
  },
];

const caseSections = [
  {
    title: "The Problem",
    body: "With LHDN's e-invoicing mandate requiring businesses to submit compliant e-invoices, JaGaCount needed a way for clients to meet the requirement without leaving the platform.",
  },
  {
    title: "The Solution",
    body: "I built and integrated an easy-to-use e-invoice module supporting individual, batch, and consolidated submissions, with a submission tracker and an automatic retry-on-failure mechanism to handle failed submission status pollings. The module seamlessly integrates into the existing modules.",
  },
  {
    title: "Result",
    body: "The module now serves 20+ clients and has processed over 300,000 e-invoice submissions.",
  },
  {
    title: "My Role",
    body: "I designed and built the full e-invoice module, from the UI to the backend LHDN MyInvois integration.",
  },
];

const technicalHighlights = [
  {
    title: "Multi-client intermediary submission",
    text: "Acts as an intermediary platform, submitting e-invoices on behalf of client properties. Each with independent LHDN compliant company profiles.",
    icon: FiUsers,
  },
  {
    title: "Submssion tracking",
    text: "Each submission, no matter inidividual or consolidated, is tracked in the database. Allowing display of e-invoice statuses right from JaGaCount interface.",
    icon: FiEye,
  },
  {
    title: "Scheduled & on-demand status refresh",
    text: "A global scheduled/ manual trigger function is in place to ensure all e-invoice submission statuses are updated.",
    icon: FiCloud,
  },
  {
    title: "XAdES XML Digital Signature",
    text: "UBL 2.1 compliant e-invoice generation with XAdES enveloped signing, X.509 certificate chain parsing, and SHA-256 digest computation. As required by LHDN's MyInvois system.",
    icon: FiShield,
  },
];

const einvoiceFlowDiagramMd = [
  "```mermaid",
  "flowchart TD",
  '  subgraph App["JaGaCount Admin Panel"]',
  '    CreateInvoice["Create invoice, debit note,<br/>or credit note in AR/AP"]',
  '    EInvSetting["Configure e-invoice profile<br/>TIN, SST, classification codes"]',
  "  end",
  "",
  '  subgraph Submit["E-Invoice Submission"]',
  '    Consolidate["Consolidate documents<br/>into batch or submit individually"]',
  '    SignDoc["XAdES sign document<br/>SHA-256 + X.509 certificate"]',
  '    PostLHDN["POST signed documents<br/>to MyInvois API"]',
  "  end",
  "",
  '  subgraph LHDN["LHDN MyInvois"]',
  '    MyInvoisResp["Returns submission ID"]',
  '    Poll["Poll submission status<br/>up to 10 retries × 2s interval"]',
  '    Status{"Status?"}',
  '    Valid["Valid ✓"]',
  '    Invalid["Invalid / Rejected<br/>user fixes & re-submits"]',
  '    ExceedRetry["EXCEED_RETRIES<br/>still in progress"]',
  '    Partial["PARTIALLY_SUCCESS<br/>some docs still pending"]',
  "  end",
  "",
  '  subgraph Reconcile["Status Reconciliation"]',
  '    Scheduled["Scheduled job every 30 min<br/>re-polls non-terminal submissions"]',
  '    OnDemand["On-demand refresh<br/>from admin panel"]',
  "  end",
  "",
  "  CreateInvoice --> Consolidate",
  "  EInvSetting --> SignDoc",
  "  Consolidate --> SignDoc",
  "  SignDoc --> PostLHDN",
  "  PostLHDN --> MyInvoisResp",
  "  MyInvoisResp --> Poll",
  "  Poll --> Status",
  "  Status -- valid --> Valid",
  "  Status -- invalid/rejected --> Invalid",
  "  Status -- still in progress --> ExceedRetry",
  "  Status -- some valid, some pending --> Partial",
  "  ExceedRetry --> Scheduled",
  "  Partial --> Scheduled",
  "  Scheduled --> Poll",
  "  OnDemand --> Poll",
  "```",
].join("\n");

const diagramList = [
  {
    title: "E-Invoice Submission Flow",
    description:
      "How JaGaCount processes e-invoices end-to-end — from invoice creation through LHDN validation to automatic status reconciliation.",
    markdown: einvoiceFlowDiagramMd,
  },
];

export default function JagacountEinvoice() {
  const [isMermaidReady, setIsMermaidReady] = useState(false);

  return (
    <main className="pb-16">
      <Script
        src="https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js"
        strategy="afterInteractive"
        onLoad={() => setIsMermaidReady(true)}
      />
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
        <h2 className="text-2xl font-bold">How It Works</h2>
        <div className="mt-5 grid gap-5">
          {diagramList.map((diagram) => (
            <MermaidDiagram
              key={diagram.title}
              {...diagram}
              isMermaidReady={isMermaidReady}
            />
          ))}
        </div>
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
            <FiLock />
          </div>
          <div>
            <h2 className="text-xl font-bold">Tech Stack</h2>
            <p className="mt-1 opacity-75">
              Next.js, Node.js, TypeScript, Firestore, LHDN MyInvois API.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
