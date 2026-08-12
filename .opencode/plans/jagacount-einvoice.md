# Jagacount E-Invoice Detail Page — Implementation Plan

## Summary

- Add `caseStudyPath` + `imagePath` to Jagacount entry in `myworks.js`
- Extract 4 shared components from `qr-access-control-system.js` into `/components/`
- Create new detail page `pages/myworks/jagacount-einvoice.js`
- Update `qr-access-control-system.js` to use shared components

---

## Files to create/modify

### 1. Create `components/Section.js`

```js
export default function Section({ title, body, index }) {
  return (
    <section className={`${index === 0 ? '' : 'border-t'} border-black/10 py-8 dark:border-white/20`}>
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="mt-3 text-lg leading-relaxed opacity-80">{body}</p>
    </section>
  );
}
```

### 2. Create `components/MermaidDiagram.js`

```js
import { useEffect, useId, useState } from "react";

function getMermaidSource(markdown) {
  return markdown
    .replace(/^```mermaid\s*/u, "")
    .replace(/\s*```$/u, "")
    .trim();
}

export default function MermaidDiagram({ title, description, markdown, isMermaidReady }) {
  const reactId = useId();
  const diagramId = `mermaid-${reactId.replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const [svg, setSvg] = useState("");
  const [error, setError] = useState("");
  const mermaidSource = getMermaidSource(markdown);

  useEffect(() => {
    if (!isMermaidReady || !window.mermaid) return;

    let isActive = true;
    const isDarkMode = document.documentElement.classList.contains("dark");

    window.mermaid.initialize({
      startOnLoad: false,
      securityLevel: "strict",
      theme: isDarkMode ? "dark" : "default",
    });

    window.mermaid
      .render(diagramId, mermaidSource)
      .then(({ svg: renderedSvg }) => {
        if (!isActive) return;
        setSvg(renderedSvg);
        setError("");
      })
      .catch(() => {
        if (!isActive) return;
        setSvg("");
        setError("Unable to render diagram. Showing Mermaid source instead.");
      });

    return () => {
      isActive = false;
    };
  }, [diagramId, isMermaidReady, mermaidSource]);

  return (
    <div className="rounded-lg border border-black/10 p-5 dark:border-white/20">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-2 leading-relaxed opacity-75">{description}</p>
      <div className="mt-5 overflow-x-auto rounded-lg bg-black/5 p-4 dark:bg-white/5">
        {svg ? (
          <div
            className="min-w-[720px]"
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        ) : (
          <pre className="min-w-[720px] whitespace-pre-wrap text-sm leading-relaxed">
            <code>{error ? `${error}\n\n${markdown}` : markdown}</code>
          </pre>
        )}
      </div>
    </div>
  );
}
```

### 3. Create `components/Highlight.js`

```js
export default function Highlight({ title, text, icon: Icon }) {
  return (
    <div className="rounded-lg border border-black/10 p-5 dark:border-white/20">
      <Icon className="mb-4 text-sky-500" size={24} />
      <div className="font-bold">{title}</div>
      <p className="mt-2 leading-relaxed opacity-75">{text}</p>
    </div>
  );
}
```

### 4. Create `components/ImageCarousel.js`

```js
import { useState } from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function ImageCarousel({ images }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex];
  const hasMultipleImages = images.length > 1;

  const goToPrevious = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? images.length - 1 : currentIndex - 1,
    );
  };

  const goToNext = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === images.length - 1 ? 0 : currentIndex + 1,
    );
  };

  return (
    <section className="mt-8">
      <div className="relative overflow-hidden rounded-lg border border-black/10 bg-black/5 dark:border-white/20 dark:bg-white/5">
        <div className="relative aspect-[16/10] w-full">
          <Image
            src={activeImage.src}
            alt={activeImage.alt}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-contain"
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-4 py-3 text-white">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm md:text-base">{activeImage.caption}</p>
            <span className="shrink-0 text-sm opacity-80">
              {activeIndex + 1} / {images.length}
            </span>
          </div>
        </div>
        {hasMultipleImages && (
          <>
            <button
              aria-label="Previous image"
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white"
              type="button"
              onClick={goToPrevious}
            >
              <FiChevronLeft />
            </button>
            <button
              aria-label="Next image"
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white"
              type="button"
              onClick={goToNext}
            >
              <FiChevronRight />
            </button>
          </>
        )}
      </div>
    </section>
  );
}
```

### 5. Edit `pages/myworks/qr-access-control-system.js` — Replace inline components with imports

**Remove lines 196–333** (the Section, MermaidDiagram, Highlight, ImageCarousel function definitions).

**Replace the imports at the top (lines 1–13)** with:

```js
import {
  FiActivity,
  FiDatabase,
  FiGitBranch,
  FiLock,
  FiZap,
} from "react-icons/fi";
import { useState } from "react";
import Link from "next/link";
import Script from "next/script";
import ImageCarousel from "../../components/ImageCarousel";
import Section from "../../components/Section";
import MermaidDiagram from "../../components/MermaidDiagram";
import Highlight from "../../components/Highlight";
```

**Remove lines 189–194** (the `getMermaidSource` function — now in the shared component).

Everything else (carouselImages, caseSections, technicalHighlights, architectureDiagramMd, qrScanFlowDiagramMd, diagramList, and the main page component) stays the same.

### 6. Create `pages/myworks/jagacount-einvoice.js`

```js
import {
  FiArrowUp,
  FiCloud,
  FiLock,
  FiRefreshCw,
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
    src: "/images/works/jagacount/thumbnail.png",
    alt: "Jagacount e-invoice module",
    caption: "Jagacount — Property management accounting platform with integrated LHDN e-invoice submission.",
  },
];

const caseSections = [
  {
    title: "The Problem",
    body: "With LHDN's e-invoicing mandate requiring businesses to submit compliant e-invoices, JaGaCount needed a way for clients to meet the requirement without leaving the platform.",
  },
  {
    title: "The Solution",
    body: "I built and integrated an easy-to-use e-invoice module supporting individual, batch, and consolidated submissions, with a submission tracker and an automatic retry-on-failure mechanism to handle failed transmissions. The module seamlessly integrates into the existing modules.",
  },
  {
    title: "Result",
    body: "The module now serves 20+ clients and has processed over 300,000 e-invoice submissions.",
  },
  {
    title: "My Role",
    body: "I designed and built the full e-invoice module from scratch — including LHDN MyInvois API integration, UBL 2.1 document generation with XAdES digital signing, and cross-module accounting integration.",
  },
];

const technicalHighlights = [
  {
    title: "Multi-client intermediary submission",
    text: "Acts as an intermediary platform, submitting e-invoices on behalf of 20+ client properties — each with independent LHDN company profiles, TIN/SST registrations, and isolated submission queues.",
    icon: FiUsers,
  },
  {
    title: "Resilient auto-retry on failure",
    text: "Failed MyInvois submissions are automatically retried with up to 10 polling attempts at 2-second intervals. A scheduled Firebase function continuously reconciles any submission stuck in a pending state.",
    icon: FiRefreshCw,
  },
  {
    title: "Scheduled & on-demand status refresh",
    text: "A global scheduled function refreshes all non-terminal submissions every 30 minutes. Admins can also trigger per-property status refreshes on demand from the admin panel.",
    icon: FiCloud,
  },
  {
    title: "XAdES XML Digital Signature",
    text: "Full UBL 2.1 compliant e-invoice generation with XAdES enveloped signing, X.509 certificate chain parsing, and SHA-256 digest computation — as required by LHDN's MyInvois system.",
    icon: FiShield,
  },
];

const einvoiceFlowDiagramMd = [
  "```mermaid",
  "flowchart TD",
  "  subgraph App[\"JaGaCount Admin Panel\"]",
  "    CreateInvoice[\"Create invoice, debit note,<br/>or credit note in AR/AP\"]",
  "    EInvSetting[\"Configure e-invoice profile<br/>TIN, SST, classification codes\"]",
  "  end",
  "",
  "  subgraph Submit[\"E-Invoice Submission\"]",
  "    Consolidate[\"Consolidate documents<br/>into batch submission\"]",
  "    SignDoc[\"XAdES sign document<br/>SHA-256 + X.509 certificate\"]",
  "    PostLHDN[\"Post to MyInvois API<br/>with 10-retry polling\"]",
  "  end",
  "",
  "  subgraph LHDN[\"LHDN MyInvois\"]",
  "    Validate[\"Validate submission\"]",
  "    Status{\"Status?\"}",
  "    Valid[\"Valid\"]",
  "    Invalid[\"Invalid<br/>Rejected\"]",
  "  end",
  "",
  "  subgraph Reconcile[\"Status Reconciliation\"]",
  "    Scheduled[\"Scheduled job<br/>every 30 min\"]",
  "    OnDemand[\"On-demand refresh<br/>from admin panel\"]",
  "    RetryFail[\"Auto-retry<br/>failed submissions\"]",
  "  end",
  "",
  "  CreateInvoice --> Consolidate",
  "  EInvSetting --> SignDoc",
  "  Consolidate --> SignDoc",
  "  SignDoc --> PostLHDN",
  "  PostLHDN --> Validate",
  "  Validate --> Status",
  "  Status -- valid --> Valid",
  "  Status -- invalid/rejected --> Invalid",
  "  Valid --> Reconcile",
  "  Invalid --> RetryFail",
  "  Scheduled --> PostLHDN",
  "  OnDemand --> PostLHDN",
  "  RetryFail --> PostLHDN",
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
              Next.js, Node.js, TypeScript, Firestore, Firebase Cloud Functions, LHDN MyInvois API.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
```

### 7. Edit `pages/myworks.js` — Update Jagacount entry

**Change the Jagacount entry (lines 129–135)** from:

```js
{
  title: "E-invoice integration for JaGaCount (Accounting Software)",
  description: "With LHDN's e-invoicing mandate requiring businesses to submit compliant e-invoices, JaGaCount needed a way for clients to meet the requirement without leaving the platform. I built and integrated an easy-to-use e-invoice module to   supporting  individual, batch, and consolidated submissions, with a submission tracker and an automatic retry-on-failure mechanism to handle failed transmissions. The module seamlessly integrates into the modules and now serves 20+ clients and has processed over 300,000 e-invoice submissions.",
  url: "",
  imagePath: "",
  alt: "",
  tags: ["nextjs", "nodejs", "firestore"]
},
```

to:

```js
{
  title: "E-invoice integration for JaGaCount (Accounting Software)",
  description: "Built an e-invoice module for a property management accounting SaaS, enabling LHDN-compliant individual, batch, and consolidated submissions directly within the platform.",
  caseStudyPath: "/myworks/jagacount-einvoice",
  imagePath: "/images/works/jagacount/thumbnail.png",
  alt: "Jagacount e-invoice thumbnail",
  tags: ["nextjs", "nodejs", "firestore"]
},
```

---

## Execution order

1. `mkdir -p /Users/admin/portfolio/public/images/works/jagacount` ✓ (already done)
2. `cp jagacount logo → thumbnail.png` ✓ (already done)
3. Create `components/Section.js`
4. Create `components/MermaidDiagram.js`
5. Create `components/Highlight.js`
6. Create `components/ImageCarousel.js`
7. Edit `pages/myworks/qr-access-control-system.js` — replace inline components with imports
8. Create `pages/myworks/jagacount-einvoice.js`
9. Edit `pages/myworks.js` — update Jagacount entry
10. Run `npm run build` to verify

---

## Verification

After all changes, run:
```bash
cd /Users/admin/portfolio && npm run build
```

Should compile without errors and produce routes:
- `/myworks` — list page with clickable Jagacount entry
- `/myworks/qr-access-control-system` — unchanged detail page
- `/myworks/jagacount-einvoice` — new detail page
