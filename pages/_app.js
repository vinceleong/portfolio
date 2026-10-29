import Head from "next/head";
import { ThemeProvider } from "next-themes";
import "styles/globals.css";
import "styles/tailwind.css";

import MainLayout from "../layouts/MainLayout";

const withMainLayout = (page) => <MainLayout>{page}</MainLayout>;

function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || withMainLayout;

  return (
    <ThemeProvider
      attribute="class"
      storageKey="vincel-theme"
      defaultTheme="system"
      enableSystem={true}
      forcedTheme={Component.theme || null}
    >
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      {getLayout(<Component {...pageProps} />)}
    </ThemeProvider>
  );
}
export default App;
