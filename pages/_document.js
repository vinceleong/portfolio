import Document, { Html, Head, Main, NextScript } from "next/document";
class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className="scroll-smooth">
        <Head>
          <meta
            name="google-site-verification"
            content="ISq8IpU9RM48UUBfTdITLF_rYefjUWwWP_bUwsgwJXs"
          />
          <meta name="application-name" content="VinceL" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content="VinceL" />
          <meta
            name="description"
            content="Open Whatsapp chat without adding contact"
          />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta
            name="msapplication-config"
            content="/icons/browserconfig.xml"
          />
          <meta name="msapplication-TileColor" content="#2B5797" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#000000" />

          <link rel="apple-touch-icon" href="/icons/vince.png" />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/icons/vince.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/icons/vince.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="167x167"
            href="/icons/vince.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href="/icons/vince.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/icons/vince.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/icons/vince.png"
          />
          <link rel="manifest" href="/manifest.json" />
          {/* <link
            rel="mask-icon"
            href="/icons/safari-pinned-tab.svg"
            color="#5bbad5"
          /> */}
          <link rel="shortcut icon" href="/favicon.ico" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
          />

          <meta
            name="twitter:card"
            content="Open Whatsapp chat without adding contact"
          />
          <meta name="twitter:url" content="https://vincel.vercel.app" />
          <meta name="twitter:title" content="vince" />
          <meta
            name="twitter:description"
            content="Open Whatsapp chat without adding contact"
          />
          <meta
            name="twitter:image"
            content="https://vincel.vercel.app/icons/vince.png"
          />
          <meta name="twitter:creator" content="@vteneleven" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Vince" />
          <meta
            property="og:description"
            content="Open Whatsapp chat without adding contact"
          />
          <meta property="og:site_name" content="Vince" />
          <meta property="og:url" content="https://vincel.vercel.app" />
          <meta
            property="og:image"
            content="https://vincel.vercel.app/icons/vince.pngg"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
