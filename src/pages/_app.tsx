import type { AppProps } from "next/app";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import "@/styles/globals.css";

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || '';
const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Header />
      <main>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_TRACKING_ID}`}
        />
       <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.GA_TRACKING_ID}');
            `,
          }}
        />
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
};

export default MyApp;
