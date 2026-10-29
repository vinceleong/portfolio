const ATTRIBUTION_KEY = /^[a-z_]{1,30}$/;

function text(value, max) {
  return String(value ?? "").replace(/\s+/g, " ").trim().slice(0, max);
}

export function normalizeWebsite(raw) {
  const value = text(raw, 300);
  if (!value) return "";
  const withScheme = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  try {
    const url = new URL(withScheme);
    return /\.[a-z]{2,}$/i.test(url.hostname) ? url.href : "";
  } catch {
    return "";
  }
}

export function phoneDigits(phone) {
  return String(phone ?? "").replace(/\D/g, "");
}

// Local Malaysian numbers (012-345 6789) become 60123456789 for wa.me links.
export function toWhatsAppNumber(phone) {
  const digits = phoneDigits(phone);
  if (digits.startsWith("0")) return `6${digits}`;
  if (digits.startsWith("1") && digits.length <= 10) return `60${digits}`;
  return digits;
}

export function validateLead(values) {
  const errors = {};
  if (!text(values.name, 100)) errors.name = "required";
  if (!text(values.business, 150)) errors.business = "required";
  if (!normalizeWebsite(values.website)) errors.website = "invalid";
  const digits = phoneDigits(values.phone);
  if (digits.length < 9 || digits.length > 15) errors.phone = "invalid";
  if (values.consent !== true) errors.consent = "required";
  return errors;
}

function cleanAttribution(raw) {
  if (!raw || typeof raw !== "object") return {};
  return Object.fromEntries(
    Object.entries(raw)
      .filter(([key, value]) => ATTRIBUTION_KEY.test(key) && typeof value === "string")
      .slice(0, 15)
      .map(([key, value]) => [key, value.slice(0, 500)])
  );
}

export function normalizeLead(body) {
  return {
    name: text(body.name, 100),
    business: text(body.business, 150),
    website: normalizeWebsite(body.website),
    phone: text(body.phone, 30),
    consent: body.consent === true,
    campaign: text(body.campaign, 50) || "unknown",
    lang: text(body.lang, 10),
    attribution: cleanAttribution(body.attribution),
  };
}
