import type { AppProps } from "next/app";
import { Footer } from "@/components/Footer";
import GoogleTagManager, { GtmId } from '@/components/GoogleTagManager'
import { Header } from "@/components/Header";
import { gtmId } from '@/libs/utils/gtm'
import "@/styles/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Header />
        <GoogleTagManager gtmId={gtmId as GtmId} />
        <main>
          <Component {...pageProps} />
        </main>
      <Footer />
    </>
  );
};

export default MyApp;
