import type { FC } from 'react'

import Script from 'next/script'

export type GtmId = `GTM-${string}`

type Props = {
  gtmId: GtmId
}

const GoogleTagManager: FC<Props> = ({ gtmId }) => {
  return (
    <Script
      id="gtm"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');
        `
      }}
    />
  )
}

export default GoogleTagManager