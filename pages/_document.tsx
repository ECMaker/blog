import { Html, Head, Main, NextScript } from 'next/document';

import { googleTagManagerId } from '~/types/gtm';

export default function Document() {
  return (
    <Html lang="ja-JP" className="scroll-smooth">
      <Head>
        {/* Google AdSense メタタグの追加 */}
        <meta name="google-adsense-account" content={process.env.NEXT_PUBLIC_ADSENSE_ID} />
        {/* メタタグのここまで */}
      </Head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `
              <iframe
                src="https://www.googletagmanager.com/ns.html?id=${googleTagManagerId}"
                height="0"
                width="0"
                style="display:none;visibility:hidden"
              />`,
          }}
        />
        {/* End Google Tag Manager (noscript) */}
        <Main />
        <NextScript />
        {/* Google AdSense スクリプトの追加 */}
        <script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
          crossOrigin="anonymous"></script>
        {/* スクリプトのここまで */}
      </body>
    </Html>
  );
}
