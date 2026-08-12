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

const carouselImages = [
  {
    src: "/images/works/qr-access-control-system/thumbnail.png",
    alt: "QR Access Control System thumbnail",
    caption: "QR access device that includes a box containing RPI, a QR reader, and a cable for relay.",
  },
  {
    src: "/images/works/qr-access-control-system/device-dashboard.png",
    alt: "Device dashboard thumbnail",
    caption: "Dashboard for monitoring live device heartbeats, status, and for adding new devices.",
  },
];

const caseSections = [
  {
    title: "The Problem",
    body: "As JaGaApp's client base grew, visitor check-ins at guarded entrances became a bottleneck. Guards had to manually verify visitor details, queues built up during busy hours, and each site needed more operational attention than it should.",
  },
  {
    title: "The Solution/ What I Built",
    body: "A QR-based access control system from scratch, with custom hardware, firmware, and full integration with the JaGaApp VMS. Enabling visitor verification, two-layer approval via the Android app, and offline operation.",
  },
  {
    title: "Result",
    body: "Visitor entry time dropped from 2 minutes to near-instant, and the guard headcount needed per site was reduced.",
  },
  {
    title: "My Role",
    body: "I designed and built all the softwares in this project including edge service, monitoring dashboard, and worked with local hardware team to produce the hardware that this system runs on.",
  },
];

const technicalHighlights = [
  {
    title: "Real-time device sync",
    text: "Listens to Firestore collections for visitors, units, tenants, device config, facility bookings, and access-control groups.",
    icon: FiDatabase,
  },
  {
    title: "Edge decision logic",
    text: "Routes each QR type into the correct visitor, facility, checkout, moderator, or access-control flow.",
    icon: FiGitBranch,
  },
  {
    title: "Physical hardware control",
    text: "Triggers relay switches, signal lights, and guard-device callbacks through local hardware APIs.",
    icon: FiZap,
  },
  {
    title: "Operational visibility",
    text: "Reports heartbeats, app version, access logs, validation errors, and Sentry runtime errors.",
    icon: FiActivity,
  },
];

const architectureDiagramMd = [
  "```mermaid",
  "flowchart LR",
  '  subgraph Apps["Resident, Guard, and Admin Apps"]',
  '    Resident["Resident App<br/>Visitor invites<br/>Facility bookings"]',
  '    Guard["Guard App<br/>Manual check-in/out<br/>Access card/pass actions"]',
  '    Admin["Admin Portal<br/>Device config<br/>Access rules"]',
  "  end",
  "",
  '  subgraph Cloud["Firebase Cloud"]',
  '    AppDb["Firestore DB"]',
  '    IotDb["Firestore DB"]',
  "  end",
  "",
  '  subgraph Edge["Linux QR Access Device"]',
  '    Scanner["QR Reader"]',
  '    HardwareComm["Hardware Communication Layer"]',
  '    Api["Express API<br/>/onQrScanned"]',
  '    Service["Node.js TypeScript Service<br/>QR routing, validation, sync logic"]',
  '    Cache["Realtime Local State<br/>visitors, units, tenants<br/>bookings, device config"]',
  '    Telemetry["Sentry<br/>Error monitoring"]',
  "  end",
  "",
  '  subgraph Hardware["Physical Hardware"]',
  '    Relay["Door Relay / Gate Lock"]',
  '    Signal["Signal Light / Display"]',
  "  end",
  "",
  "  Resident --> AppDb",
  "  Admin --> AppDb",
  "  Admin --> IotDb",
  "  AppDb -- realtime listeners --> Cache",
  "  IotDb -- realtime listeners --> Cache",
  "  Scanner --> HardwareComm",
  "  HardwareComm --> Api",
  "  Api --> Service",
  "  Cache --> Service",
  "  Service -- approved access --> Relay",
  "  Service -- display status --> Signal",
  "  Service -- manual approval callbacks --> Guard",
  "  Service -- check-in/out updates --> AppDb",
  "  Service -- facility access logs --> AppDb",
  "  Service -- heartbeat + app version --> IotDb",
  "  Service -- runtime errors --> Telemetry",
  "  Guard -- guard actions --> AppDb",
  "```",
].join("\n");

const qrScanFlowDiagramMd = [
  "```mermaid",
  "flowchart TD",
  '  Start["QR code scanned"] --> Receive["Receive QR via /onQrScanned"]',
  '  Receive --> Debounce{"Duplicate scan<br/>within debounce window?"}',
  '  Debounce -- yes --> Ignore["Ignore duplicate scan"]',
  '  Debounce -- no --> Enabled{"Device enabled?"}',
  '  Enabled -- no --> DisabledLog["Log: device disabled"]',
  '  Enabled -- yes --> Module{"Device module"}',
  "",
  '  Module -- Facility --> FacilityType{"QR type"}',
  '  FacilityType -- FacilityBooking --> ValidateBooking["Validate facility booking<br/>approved, active time window,<br/>facility status, operating hours"]',
  "  FacilityType -- GuardFacilityBooking --> ValidateBooking",
  '  FacilityType -- Moderator --> ValidateModerator["Validate moderator QR<br/>active and not expired"]',
  '  FacilityType -- JaGaID --> ValidateFacilityJaga["Find user valid facility booking"]',
  '  FacilityType -- Unsupported --> DenyFacility["Deny and write facility access log"]',
  "  ValidateBooking --> FacilityResult{Valid?}",
  "  ValidateModerator --> FacilityResult",
  "  ValidateFacilityJaga --> FacilityResult",
  '  FacilityResult -- yes --> GrantFacility["Write granted access log"]',
  '  GrantFacility --> OpenRelay1["Open relay switch"]',
  "  FacilityResult -- no --> DenyFacility",
  '  DenyFacility --> Stop1["Stop"]',
  "",
  '  Module -- Visitor --> VisitorType{"Visitor QR type"}',
  '  VisitorType -- PreVisitorId --> FindVisit["Find pre-visitor / visitor record"]',
  '  VisitorType -- VisitorPass --> FindByPass["Find visitor by pass number"]',
  '  VisitorType -- JaGaID --> FindByJaga["Resolve JaGaID to user<br/>match approved pre-visitors"]',
  '  VisitorType -- CheckOutPrefix --> InvalidCheckout["Log unsupported checkout QR"]',
  "  FindByPass --> FindVisit",
  "  FindByJaga --> FindVisit",
  '  FindVisit --> Found{"Record found?"}',
  '  Found -- no --> LogMissing["Log validation error"]',
  '  Found -- yes --> DeviceFunction{"Device function"}',
  '  DeviceFunction -- Access Control --> AccessRules["Check access control groups<br/>block, floor, visit purpose"]',
  '  AccessRules --> Allowed{"Allowed?"}',
  '  Allowed -- yes --> OpenRelay2["Open relay switch"]',
  '  Allowed -- no --> LogDenied["Log access control denial"]',
  '  DeviceFunction -- Check In --> CheckInMode{"Auto or manual?"}',
  '  CheckInMode -- manual --> PingGuardIn["Ping guard app for approval"]',
  '  CheckInMode -- auto --> CheckIn["Create visitor check-in<br/>update pre-visitor<br/>send notification"]',
  '  CheckIn --> OpenRelay3["Open relay switch"]',
  '  DeviceFunction -- Check Out --> CheckOutMode{"Auto or manual?"}',
  '  CheckOutMode -- manual --> PingGuardOut["Ping guard app for checkout"]',
  '  CheckOutMode -- auto --> CheckOut["Update visitor checkout<br/>deactivate card/pass if needed<br/>send notification"]',
  '  CheckOut --> OpenRelay4["Open relay switch"]',
  "",
  "  Ignore --> End[End]",
  "  DisabledLog --> End",
  "  Stop1 --> End",
  "  InvalidCheckout --> End",
  "  LogMissing --> End",
  "  LogDenied --> End",
  "  OpenRelay1 --> End",
  "  OpenRelay2 --> End",
  "  OpenRelay3 --> End",
  "  OpenRelay4 --> End",
  "  PingGuardIn --> End",
  "  PingGuardOut --> End",
  "```",
].join("\n");

const diagramList = [
  {
    title: "System Architecture",
    description:
      "How the access device connects the mobile apps, Firestore, on-site QR reader, relay hardware, and monitoring.",
    markdown: architectureDiagramMd,
  },
];

export default function QrAccessControlSystem() {
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
              Node.js, TypeScript, Firestore, IoT, Raspberry Pi.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
