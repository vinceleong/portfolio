import { useState } from "react";
import { FiCheckCircle } from "react-icons/fi";
import { validateLead } from "utils/lead";

const FIELDS = [
  { name: "name", type: "text", autoComplete: "name" },
  { name: "business", type: "text", autoComplete: "organization" },
  {
    name: "website",
    type: "text",
    inputMode: "url",
    autoComplete: "url",
    autoCapitalize: "none",
    spellCheck: false,
  },
  { name: "phone", type: "tel", inputMode: "tel", autoComplete: "tel" },
];

const EMPTY = { name: "", business: "", website: "", phone: "", consent: false };

const inputBase =
  "mt-1.5 block h-12 w-full rounded-xl border bg-white px-4 text-base text-ada-ink placeholder:text-[#8C8A82] focus:border-ada-green focus:outline-none focus:ring-2 focus:ring-ada-green/30";

export default function LeadForm({ t, lang, campaign, email, whatsappHref, getAttribution }) {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  function update(event) {
    const { name, type, checked, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  async function onSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const found = validateLead(values);
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      form.elements[firstInvalid]?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          hp: form.elements.hp.value,
          campaign,
          lang,
          attribution: getAttribution(),
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (response.ok && data.ok) return setStatus("success");
      if (data.errors) {
        setErrors(data.errors);
        return setStatus("idle");
      }
      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="mt-5 flex gap-3 rounded-xl bg-ada-mint/15 p-5">
        <FiCheckCircle className="mt-0.5 shrink-0 text-ada-green" size={22} aria-hidden />
        <div>
          <p className="font-semibold">{t.success.title}</p>
          <p className="mt-1 leading-relaxed text-ada-muted">{t.success.body}</p>
        </div>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form className="relative mt-5 space-y-5" onSubmit={onSubmit} noValidate>
      {FIELDS.map(({ name, ...attrs }) => {
        const id = `lead-${name}`;
        const invalid = Boolean(errors[name]);
        return (
          <div key={name}>
            <label htmlFor={id} className="block text-[15px] font-semibold">
              {t[name].label}
            </label>
            <input
              id={id}
              name={name}
              value={values[name]}
              onChange={update}
              placeholder={t[name].placeholder}
              aria-invalid={invalid}
              aria-describedby={invalid ? `${id}-error` : undefined}
              className={`${inputBase} ${invalid ? "border-red-600" : "border-[#D4D2CA]"}`}
              {...attrs}
            />
            {invalid && (
              <p id={`${id}-error`} className="mt-1.5 text-sm text-red-700">
                {t.errors[name]}
              </p>
            )}
          </div>
        );
      })}

      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Leave this empty
          <input type="text" name="hp" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      <div>
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            name="consent"
            checked={values.consent}
            onChange={update}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? "lead-consent-error" : undefined}
            className="mt-1 h-5 w-5 shrink-0 accent-ada-green"
          />
          <span className="text-[15px] leading-relaxed">{t.consent}</span>
        </label>
        {errors.consent && (
          <p id="lead-consent-error" className="mt-1.5 text-sm text-red-700">
            {t.errors.consent}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex min-h-[52px] w-full items-center justify-center rounded-xl bg-ada-green px-6 text-base font-semibold text-white transition-colors hover:bg-ada-green-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ada-green disabled:opacity-60"
      >
        {submitting ? t.submitting : t.submit}
      </button>

      {status === "error" && (
        <p role="alert" className="rounded-xl bg-red-50 p-4 text-[15px] leading-relaxed text-red-800">
          {t.error}{" "}
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="font-semibold underline">
            WhatsApp
          </a>
        </p>
      )}

      <div className="space-y-2 text-sm leading-relaxed text-ada-muted">
        <p>
          {t.privacy}{" "}
          <a href={`mailto:${email}`} className="font-medium text-ada-green underline underline-offset-2">
            {email}
          </a>
          .
        </p>
      </div>
    </form>
  );
}
