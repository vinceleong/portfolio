import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import {
  FiArrowRight,
  FiCheck,
  FiDatabase,
  FiFileText,
  FiInfo,
  FiMail,
  FiMonitor,
  FiShield,
} from "react-icons/fi";
import SEO from "components/SEO";
import LeadForm from "components/php2shell/LeadForm";
import { captureAttribution } from "utils/attribution";
import { ADVISORY_URL, CAMPAIGN, CONTACT, OG_IMAGE, SITE_URL } from "content/php2shell/shared";

const WRAP = "mx-auto w-full max-w-2xl px-4 sm:px-6";
const BTN =
  "inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl px-6 text-base font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";
const BTN_MINT = `${BTN} bg-ada-mint text-ada-ink hover:bg-[#7DD7B8] focus-visible:outline-ada-mint`;
const BTN_GHOST = `${BTN} border border-white/20 text-ada-paper hover:border-white/50 focus-visible:outline-white`;
const BTN_GREEN = `${BTN} bg-ada-green text-white hover:bg-ada-green-dark focus-visible:outline-ada-green`;
const WHY_ICONS = [FiMonitor, FiDatabase, FiFileText];

function withRef(text, t, ref) {
  return ref ? `${text}\n\n${t.contact.refLabel}: ${ref}` : text;
}

function whatsappLink(t, ref) {
  const text = withRef(t.contact.whatsapp.message, t, ref);
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`;
}

function mailtoLink(t, ref) {
  const { subject, body } = t.contact.email;
  const params = `subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(withRef(body, t, ref))}`;
  return `mailto:${CONTACT.email}?${params}`;
}

function Section({ id, title, white, children }) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`${white ? "bg-white" : "bg-ada-paper"} py-14 sm:py-20`}
    >
      <div className={WRAP}>
        <h2 id={`${id}-title`} className="text-2xl font-bold tracking-tight sm:text-3xl">
          {title}
        </h2>
        <div className="mt-6">{children}</div>
      </div>
    </section>
  );
}

function CheckItem({ children }) {
  return (
    <li className="flex gap-2.5">
      <FiCheck className="mt-1 shrink-0 text-ada-green" aria-hidden />
      <span>{children}</span>
    </li>
  );
}

export default function Landing({ t, path }) {
  const [attribution, setAttribution] = useState({});

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAttribution(captureAttribution());
  }, []);

  const ref = attribution.biz;
  const whatsappHref = whatsappLink(t, ref);
  const { hero, what, why, affected, offer, steps, about, contact, footer } = t;

  return (
    <div className="min-h-screen bg-ada-paper text-ada-ink antialiased">
      <SEO
        title={t.meta.title}
        ogTitle={t.meta.ogTitle}
        description={t.meta.description}
        siteName="ADA Technologies"
        canonicalUrl={`${SITE_URL}${path}`}
        ogImage={OG_IMAGE.url}
        ogImageWidth={OG_IMAGE.width}
        ogImageHeight={OG_IMAGE.height}
        ogImageAlt={t.meta.ogImageAlt}
        twitterCard="summary_large_image"
        locale={t.locale}
      />

      <header className="bg-ada-ink text-ada-paper">
        <div className={`${WRAP} pb-16 pt-5 sm:pb-24 sm:pt-8`}>
          <div className="flex items-center justify-between">
            <Image
              src="/images/logo/ada-logo-stacked-dark.svg"
              alt="ADA Technologies"
              width={128}
              height={57}
              priority
            />
            <a
              href="#contact"
              className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium transition-colors hover:border-ada-mint hover:text-ada-mint"
            >
              {t.nav.cta}
            </a>
          </div>
         
          <h1 className="mt-10 text-[2.125rem] font-bold leading-[1.12] tracking-tight sm:text-5xl sm:leading-[1.08]">
            {hero.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ada-stone sm:text-xl">{hero.subtitle}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#contact" className={BTN_MINT}>
              {hero.cta}
              <FiArrowRight aria-hidden />
            </a>
            <a href="#what-happened" className={BTN_GHOST}>
              {hero.secondary}
            </a>
          </div>

          <ul className="mt-8 space-y-2 text-[15px] text-ada-stone sm:flex sm:flex-wrap sm:gap-x-6 sm:space-y-0">
            {hero.reassurance.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <FiCheck className="shrink-0 text-ada-mint" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </header>

      <main>
        <Section id="what-happened" title={what.title} white>
          <div className="space-y-4 text-lg leading-relaxed text-ada-muted">
            {what.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <dl className="mt-8 grid overflow-hidden rounded-2xl border border-ada-sand sm:grid-cols-3">
            {what.facts.map((fact, i) => (
              <div
                key={fact.label}
                className={`px-5 py-4 ${i ? "border-t border-ada-sand sm:border-l sm:border-t-0" : ""}`}
              >
                <dt className="text-sm text-ada-muted">{fact.label}</dt>
                <dd className="mt-1 text-xl font-bold">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section id="why-it-matters" title={why.title}>
          <p className="text-lg leading-relaxed text-ada-muted">{why.intro}</p>
          <ul className="mt-6 space-y-4">
            {why.points.map((point, i) => {
              const Icon = WHY_ICONS[i];
              return (
                <li key={point.title} className="flex gap-4 rounded-2xl bg-white p-5 ring-1 ring-ada-sand">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ada-mint/15 text-ada-green">
                    <Icon size={20} aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold">{point.title}</h3>
                    <p className="mt-1 leading-relaxed text-ada-muted">{point.body}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Section>

        <Section id="am-i-affected" title={affected.title} white>
          <p className="text-lg font-semibold">{affected.answer}</p>
          <ol className="mt-5 space-y-4">
            {affected.conditions.map((condition, i) => (
              <li key={condition} className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ada-ink text-sm font-bold text-ada-paper">
                  {i + 1}
                </span>
                <span className="text-lg leading-relaxed text-ada-muted">{condition}</span>
              </li>
            ))}
          </ol>
          <div className="mt-8 flex gap-3 rounded-2xl bg-ada-mint/15 p-5">
            <FiInfo className="mt-1 shrink-0 text-ada-green" size={20} aria-hidden />
            <p className="leading-relaxed">{affected.reassurance}</p>
          </div>
          <p className="mt-6 leading-relaxed text-ada-muted">{affected.unsure}</p>
          <a href="#contact" className={`${BTN_GREEN} mt-6 w-full sm:w-auto`}>
            {affected.cta}
            <FiArrowRight aria-hidden />
          </a>
        </Section>

        <Section id="what-i-offer" title={offer.title}>
          <div className="grid gap-5 md:grid-cols-2">
            <article className="rounded-2xl bg-white p-6 ring-2 ring-ada-green">
              <span className="inline-block rounded-full bg-ada-green px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                {offer.free.badge}
              </span>
              <h3 className="mt-4 text-xl font-bold">{offer.free.title}</h3>
              <p className="mt-2 leading-relaxed text-ada-muted">{offer.free.body}</p>
              <ul className="mt-5 space-y-2.5">
                {offer.free.points.map((point) => (
                  <CheckItem key={point}>{point}</CheckItem>
                ))}
              </ul>
            </article>
            <article className="rounded-2xl bg-white p-6 ring-1 ring-ada-sand">
              <span className="inline-block rounded-full bg-ada-sand px-3 py-1 text-xs font-bold uppercase tracking-wider text-ada-muted">
                {offer.paid.badge}
              </span>
              <h3 className="mt-4 text-xl font-bold">{offer.paid.title}</h3>
              <p className="mt-2 leading-relaxed text-ada-muted">{offer.paid.body}</p>
              <dl className="mt-5 space-y-3">
                {offer.paid.points.map((point) => (
                  <div key={point.title}>
                    <dt className="font-semibold">{point.title}</dt>
                    <dd className="text-ada-muted">{point.body}</dd>
                  </div>
                ))}
              </dl>
            </article>
          </div>
        </Section>

        <Section id="how-it-works" title={steps.title} white>
          <ol className="space-y-8">
            {steps.items.map((step, i) => (
              <li key={step.title} className="relative flex gap-4">
                {i < steps.items.length - 1 && (
                  <span aria-hidden className="absolute -bottom-7 left-5 top-12 w-px bg-ada-sand" />
                )}
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ada-ink font-bold text-ada-paper">
                  {i + 1}
                </span>
                <div className="pt-1.5">
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-ada-muted">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="about" title={about.title}>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
            <Image
              src="/images/logo/ada-avatar-circle.svg"
              alt=""
              width={64}
              height={64}
              className="shrink-0"
            />
            <div className="space-y-3 text-lg leading-relaxed text-ada-muted">
              {about.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <Link
                href={about.link.href}
                prefetch={false}
                className="inline-flex items-center gap-1.5 font-semibold text-ada-green underline-offset-4 hover:underline"
              >
                {about.link.label}
                <FiArrowRight aria-hidden />
              </Link>
            </div>
          </div>
        </Section>

        <section id="contact" aria-labelledby="contact-title" className="bg-ada-ink py-14 text-ada-paper sm:py-20">
          <div className={WRAP}>
            <h2 id="contact-title" className="text-3xl font-bold tracking-tight sm:text-4xl">
              {contact.title}
            </h2>
            <p className="mt-3 text-lg text-ada-stone">{contact.body}</p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className={`${BTN} bg-[#25D366] text-ada-ink hover:bg-[#4BDD82] focus-visible:outline-[#25D366]`}
              >
                <FaWhatsapp size={22} aria-hidden />
                {contact.whatsapp.label}
              </a>
              <a href={mailtoLink(t, ref)} className={BTN_GHOST}>
                <FiMail size={20} aria-hidden />
                {contact.email.label}
              </a>
            </div>
            <p className="mt-3 text-sm text-ada-stone">
              {CONTACT.whatsappDisplay} · {CONTACT.email}
            </p>

            <div className="mt-10 rounded-2xl bg-white p-5 text-ada-ink sm:p-8">
              <h3 className="text-xl font-bold">{contact.formTitle}</h3>
              <LeadForm
                t={contact.form}
                lang={t.lang}
                campaign={CAMPAIGN}
                email={CONTACT.email}
                whatsappHref={whatsappHref}
                getAttribution={() => attribution}
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-ada-paper py-10 text-sm leading-relaxed text-ada-muted">
        <div className={WRAP}>
          <p>
            <span className="font-semibold text-ada-ink">{footer.technicalLabel}:</span> {footer.technical}{" "}
            <a
              href={ADVISORY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-ada-green underline underline-offset-2"
            >
              {footer.advisoryLink}
            </a>
            .
          </p>
          <div className="mt-6 flex items-center gap-3 border-t border-ada-sand pt-6">
            <Image src="/images/logo/ada-avatar-circle.svg" alt="" width={28} height={28} />
            <span>© {footer.company}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
