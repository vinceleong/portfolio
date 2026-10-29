import Head from "next/head";
import { useRouter } from "next/router";

const SITE_URL = "https://vincel.vercel.app";

function SEO({
  title = "Vince",
  ogTitle,
  description = "Open Whatsapp chat without adding contact",
  siteName = "Vince",
  ogType = "website",
  ogImage = `${SITE_URL}/icons/vince.png`,
  ogImageWidth,
  ogImageHeight,
  ogImageAlt,
  twitterCard = "summary",
  canonicalUrl,
  locale,
}) {
  const router = useRouter();
  const url = canonicalUrl || `${SITE_URL}${router.asPath.split(/[?#]/)[0]}`;
  const shareTitle = ogTitle || title;

  return (
    <Head>
      <title>{title}</title>
      <meta name="robots" content="follow, index" key="robots" />
      <meta name="description" content={description} key="description" />
      <link rel="canonical" href={url} key="canonical" />
      <meta property="og:url" content={url} key="og:url" />
      <meta property="og:type" content={ogType} key="og:type" />
      <meta property="og:site_name" content={siteName} key="og:site_name" />
      <meta property="og:title" content={shareTitle} key="og:title" />
      <meta property="og:description" content={description} key="og:description" />
      <meta property="og:image" content={ogImage} key="og:image" />
      {ogImageWidth && <meta property="og:image:width" content={ogImageWidth} key="og:image:width" />}
      {ogImageHeight && <meta property="og:image:height" content={ogImageHeight} key="og:image:height" />}
      {ogImageAlt && <meta property="og:image:alt" content={ogImageAlt} key="og:image:alt" />}
      {locale && <meta property="og:locale" content={locale} key="og:locale" />}
      <meta name="twitter:card" content={twitterCard} key="twitter:card" />
      <meta name="twitter:title" content={shareTitle} key="twitter:title" />
      <meta name="twitter:description" content={description} key="twitter:description" />
      <meta name="twitter:image" content={ogImage} key="twitter:image" />
    </Head>
  );
}

export default SEO;
