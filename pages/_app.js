import Head from "next/head";
import { ThemeProvider } from "next-themes";
import "styles/globals.css";
import "styles/tailwind.css";

import MainLayout from "../layouts/MainLayout";

function App({ Component, pageProps }) {
  return (
    <ThemeProvider
      attribute="class"
      storageKey="vincel-theme"
      defaultTheme="system"
      enableSystem={true}
    >
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </ThemeProvider>
  );
}
export default App;
