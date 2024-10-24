import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import { useEffect } from 'react';

type Props = {
  url: string;
  caption?: string;
};

export const Instagram = ({ url, caption }: Props) => {
  return (
    <div className="my-5 text-center mx-auto max-w-[360px]">
      <blockquote
        className="instagram-media w-full rounded border-2 border-gray-100 bg-white drop-shadow-md"
        data-instgrm-captioned
        data-instgrm-permalink={url}
        data-instgrm-version="14"
      >
        <Skeleton url={url} />
      </blockquote>
      <Script async defer src="//www.instagram.com/embed.js" />
      {caption && (
        <figcaption className="text-xs text-gray-400 text-center mt-1">
          {caption}
        </figcaption>
      )}
    </div>
  );
};

type SkeletonProps = {
  url: string;
};

const Skeleton = ({ url }: SkeletonProps) => {
  useEffect(() => {
    const checkSkeletonVisibility = () => {
      setTimeout(() => {
        const skeletonElement = document.querySelector('.animate-pulse');
        if (skeletonElement && !sessionStorage.getItem('reloaded')) {
          const event = new Event('trigger-reload');
          window.dispatchEvent(event);
        }
      }, 5000);
    };

    checkSkeletonVisibility();
  }, []);

  return (
    <div className="relative w-full bg-white drop-shadow">
      <div className="animate-pulse">
        <div className="flex items-center gap-2 p-[10px]">
          <div className="m-0.5 h-[30px] w-[30px] rounded-full bg-gray-200"></div>
          <div className="flex-1">
            <div className="h-3 w-24 rounded bg-gray-200"></div>
            <div className="mt-1 h-3 w-16 rounded bg-gray-200"></div>
          </div>
        </div>
        <div className="h-64 bg-gray-200"></div>
        <div className="h-20 p-3">
          <div className="h-3 w-36 rounded bg-gray-200"></div>
          <div className="mt-1 h-3 w-28 rounded bg-gray-200"></div>
        </div>
      </div>
      <div className="absolute top-36 left-1/2 flex -translate-x-1/2 flex-col items-center justify-center gap-4">
        <div className="mx-auto w-[50px]">
          <Image
            src="/blocks-images/instagram-icon.svg"
            alt="instagram-icon"
            width={50}
            height={50}
          />
        </div>
        <Link
          href={url}
          className="text-center text-sm font-semibold text-blue-600"
          target="_blank"
        >
          View this post on Instagram
        </Link>
      </div>
    </div>
  );
};
