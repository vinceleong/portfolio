import { ThemeProvider } from "next-themes";
import Head from "next/head";
import MainLayout from "../layouts/MainLayout";
import "styles/globals.css";
import "styles/tailwind.css";

function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
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
