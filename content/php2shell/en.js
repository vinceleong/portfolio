const en = {
  lang: "en",
  locale: "en_MY",

  meta: {
    title: "Is your business website affected by the PHP security flaw? | ADA Technologies",
    ogTitle: "A serious security flaw may affect your business website",
    description:
      "A critical flaw in PHP, the software behind many business websites, was made public on 21 Oct 2026. Find out if your website is affected with a free check.",
    ogImageAlt: "A serious PHP security flaw may affect your business website. Free check by ADA Technologies.",
  },

  nav: {
    cta: "Free check",
  },

  hero: {
    eyebrow: "Website security notice",
    title: "A serious security flaw may affect your business website",
    subtitle:
      "If your website runs on PHP, including most WordPress sites, it's worth a quick check. I'll do it for free.",
    cta: "Get a free check",
    secondary: "What happened?",
    reassurance: [
      "Free, no obligation",
      "Checked only with your permission",
      "Check summary",
    ],
  },

  what: {
    title: "What happened",
    body: [
      "On 21 October 2026, a critical security flaw in PHP was made public. PHP is the software that runs many business websites behind the scenes, including most WordPress sites. The flaw is known as PHP2Shell.",
      "Attackers started trying to use it within hours. Security researchers and government agencies around the world have rated it critical and asked website owners to update.",
    ],
    facts: [
      { value: "21 Oct 2026", label: "Made public" },
      { value: "Within hours", label: "Attack attempts seen" },
      { value: "Critical", label: "Rated by researchers worldwide" },
    ],
  },

  why: {
    title: "Why it matters",
    intro: "If the flaw is used against your website, it could lead to:",
    points: [
      {
        title: "Your website being taken over",
        body: "An attacker could take control of the site and change or remove what's on it.",
      },
      {
        title: "Customer data being accessed",
        body: "Such as contact details, orders and logins stored behind the website.",
      },
      {
        title: "PDPA obligations",
        body: "If customer data leaks, your business may have duties under Malaysia's Personal Data Protection Act, such as reporting the breach.",
      },
    ],
  },

  affected: {
    title: "Am I affected?",
    answer: "Possibly. Your website may be affected if both of these are true:",
    conditions: [
      "It runs on PHP. Most WordPress, WooCommerce and Joomla sites do, as do many custom-built websites.",
      "Its server hasn't been updated since 21 October 2026.",
    ],
    reassurance:
      "Many hosting providers have already applied the fix, so there's a good chance you're fine. It's still worth confirming rather than assuming.",
    unsure: "Not sure what your website runs on? That's normal. Finding out is part of the free check.",
    cta: "Get a free check",
  },

  offer: {
    title: "What I offer",
    free: {
      badge: "Free",
      title: "Website check",
      body: "I'll check your website's PHP server directly to confirm whether it's running a vulnerable version, then send you a short summary in plain language.",
      points: [
        "On-site/ remote check with summary",
        "What to do next, if anything",
      ],
    },
    paid: {
      badge: "Only if needed",
      title: "Fixing and upkeep",
      body: "If your website needs work, I can help. You'll get a quote before anything starts.",
      points: [
        { title: "Patching", body: "Apply the security fix to your server." },
        { title: "PHP upgrade", body: "Move your site to a current, supported PHP version." },
        { title: "Ongoing maintenance", body: "Keep your website updated and looked after." },
      ],
    },
  },

  steps: {
    title: "How the free check works",
    items: [
      {
        title: "You get in touch",
        body: "By WhatsApp, email or the form below. Just tell me your business and website address.",
      },
      {
        title: "We agree how I'll access the website",
        body: "If you host the website on your own server, I'll come on site and check it with you. If a vendor or hosting company looks after it, you give me access to it. Nothing is checked until you've agreed in writing.",
      },
      {
        title: "I check and send you a summary",
        body: "A short, plain-language summary of what I found and what, if anything, to do next.",
      },
    ],
  },

  about: {
    title: "About me",
    body: [
      "I'm Vince, and I run ADA Technologies from Sungai Buloh, Selangor.",
      "I build and look after software for Malaysian businesses, from websites and mobile apps to access control and e-invoicing systems. I'm offering these checks because most small businesses don't have an IT team to ask when news like this breaks.",
    ],
    link: { label: "See my work", href: "/myworks" },
  },

  contact: {
    title: "Get your free check",
    body: "Choose whichever is easiest for you.",
    refLabel: "Ref",
    whatsapp: {
      label: "Chat on WhatsApp",
      message:
        "Hi Vince, I'd like a free check of my business website for the PHP security flaw (PHP2Shell).",
    },
    email: {
      label: "Email me",
      subject: "Free website check (PHP2Shell)",
      body: "Hi Vince,\n\nI'd like a free check of my business website.\n\nBusiness name:\nWebsite:\nPhone:",
    },
    formTitle: "Or leave your details and I'll contact you",
    form: {
      name: { label: "Your name", placeholder: "e.g. Aisyah" },
      business: { label: "Business name", placeholder: "e.g. Klinik Sri Damai" },
      website: { label: "Website address", placeholder: "e.g. yourbusiness.com.my" },
      phone: { label: "Phone / WhatsApp", placeholder: "e.g. 012-345 6789" },
      consent:
        "I agree that ADA Technologies may use these details to contact me about this website check, in line with the Personal Data Protection Act 2010.",
      submit: "Request my free check",
      submitting: "Sending…",
      note: "Sending this form doesn't give me access to anything. I'll only check your website after you've agreed in writing.",
      privacy:
        "Your details are only used to arrange this check and are never shared or sold. To see, correct or delete them, email",
      success: {
        title: "Thanks, I've got your details",
        body: "I'll be in touch by WhatsApp or phone to arrange your free check.",
      },
      error: "Sorry, that didn't go through. Please try again, or message me on WhatsApp.",
      errors: {
        name: "Please enter your name.",
        business: "Please enter your business name.",
        website: "Please enter your website address, e.g. yourbusiness.com.my",
        phone: "Please enter a phone number we can reach you on.",
        consent: "Please tick the box so I can contact you.",
      },
    },
  },

  footer: {
    technicalLabel: "Technical details",
    technical:
      "PHP2Shell refers to two flaws in PHP (CVE-2026-109618 and CVE-2026-109619), fixed in PHP 8.5.12, 8.4.27, 8.3.36 and 8.2.35. Some hosting providers apply the fix without changing the version number.",
    advisoryLink: "Read the official PHP advisory",
    company: "ADA Technologies · Sungai Buloh, Selangor",
  },
};

export default en;
