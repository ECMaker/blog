import Link from 'next/link';
import Script from 'next/script';
import { useState, useEffect } from 'react';

type Props = {
  url: string;
  caption?: string;
};

export const TikTok = ({ url, caption }: Props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const TikTokVideoId = url.match(/\/video\/(\d+)/)?.[1];

  useEffect(() => {
    const handleLoad = () => setIsLoaded(true);
    window.addEventListener('tiktok-load', handleLoad);

    return () => {
      window.removeEventListener('tiktok-load', handleLoad);
    };
  }, []);

  return (
    <div className="my-5 text-center mx-auto">
      {!isLoaded && <Skeleton url={url} />}
      {isLoaded && (
        <blockquote
          className="tiktok-embed min-w-[325px] max-w-[605px]"
          data-video-id={TikTokVideoId}
          cite={url}
        >
          <section></section>
        </blockquote>
      )}
      <Script async defer src="https://www.tiktok.com/embed.js" onLoad={() => setIsLoaded(true)} />
      {caption && (
        <figcaption className="-mt-4 text-xs text-gray-400 text-center">
          {caption}
        </figcaption>
      )}
    </div>
  );
};

const Skeleton = ({ url }: { url: string }) => {
  return (
    <div className="mb-4 relative w-80 left-1/2 transform -translate-x-1/2 flex flex-col items-center bg-white drop-shadow ">
      <div className="animate-pulse">
        <div className="flex items-center gap-2 p-[10px]"></div>
        <div className="h-80 w-60 bg-gray-200"></div>
          <div className="h-14 p-3">
            <div className="h-3 w-36 rounded bg-gray-200"></div>
            <div className="mt-1 h-3 w-28 rounded bg-gray-200"></div>
          </div>
        </div>
      <div className="absolute top-40 left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center gap-4 z-10">
        <div className="mx-auto w-[200px]">
          <Link
            href={url}
            className="text-center text-sm font-semibold text-blue-600"
            target="_blank"
            style={{ color: '#2563EB' }} 
          >
            View on TikTok
          </Link>
        </div>
      </div>
    </div>
  );
};
