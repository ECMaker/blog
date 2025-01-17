import { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

type Props = {
  slot: string;
  style?: React.CSSProperties;
  format?: string;
  responsive?: boolean;
  testMode?: boolean;
};

export const AdSense: React.FC<Props> = ({
  slot,
  style = { display: 'block', width: '300px', height: '250px' },
  format = 'auto',
  responsive = true,
  testMode = false,
}) => {
  useEffect(() => {
    try {
      const pushAd = () => {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      };
      
      if (document.readyState === 'complete') {
        pushAd();
      } else {
        window.addEventListener('load', pushAd);

        return () => window.removeEventListener('load', pushAd);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <div className="min-h-[250px]">
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client={`ca-pub-${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
        data-ad-test={testMode ? 'on' : undefined}
      />
    </div>
  );
}; 