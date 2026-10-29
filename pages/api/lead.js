import { normalizeLead, toWhatsAppNumber, validateLead } from "utils/lead";

const RESEND_URL = "https://api.resend.com/emails";
const TO = process.env.LEAD_TO_EMAIL || "vince@adatech.com.my";
const FROM = process.env.LEAD_FROM_EMAIL || "ADA Technologies <onboarding@resend.dev>";

function buildEmail(lead) {
  const tags = Object.entries(lead.attribution);
  const ref = lead.attribution.biz || lead.attribution.utm_source;
  const subject = `Free check request: ${lead.business}${ref ? ` (${ref})` : ""}`;
  const text = [
    `Name: ${lead.name}`,
    `Business: ${lead.business}`,
    `Website: ${lead.website}`,
    `Phone: ${lead.phone}`,
    `WhatsApp: https://wa.me/${toWhatsAppNumber(lead.phone)}`,
    `PDPA consent: given at ${lead.submittedAt}`,
    "",
    "Attribution:",
    ...(tags.length ? tags.map(([key, value]) => `  ${key}: ${value}`) : ["  none (direct visit)"]),
    "",
    `Campaign: ${lead.campaign}`,
    `Language: ${lead.lang || "-"}`,
    `User agent: ${lead.userAgent}`,
  ].join("\n");
  return { subject, text };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false });
  }

  const body = req.body && typeof req.body === "object" ? req.body : {};
  if (body.hp) return res.status(200).json({ ok: true });

  const lead = normalizeLead(body);
  const errors = validateLead(lead);
  if (Object.keys(errors).length) return res.status(400).json({ ok: false, errors });

  lead.submittedAt = new Date().toISOString();
  lead.userAgent = String(req.headers["user-agent"] || "").slice(0, 300);
  console.log("[lead]", JSON.stringify(lead));

  if (!process.env.RESEND_API_KEY) {
    console.warn("[lead] RESEND_API_KEY is not set, email not sent");
    const isProd = process.env.NODE_ENV === "production";
    return res.status(isProd ? 500 : 200).json({ ok: !isProd });
  }

  try {
    const response = await fetch(RESEND_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from: FROM, to: [TO], ...buildEmail(lead) }),
    });
    if (!response.ok) {
      console.error("[lead] email failed", response.status, await response.text());
      return res.status(502).json({ ok: false });
    }
  } catch (error) {
    console.error("[lead] email failed", error);
    return res.status(502).json({ ok: false });
  }

  return res.status(200).json({ ok: true });
}
