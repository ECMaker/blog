import type { ImageBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import type { FC } from 'react';
import type { BlockWithChildren } from '~/types/notion';

import NextImage from 'next/image';
import { useState, useEffect } from 'react';
import MediumZoom from 'react-medium-image-zoom';

import { richTextToString } from '~/utils/richTextToString';

type Props = {
  block: BlockWithChildren<ImageBlockObjectResponse>;
};

export const Image: FC<Props> = ({ block }: Props) => {
  const url = 
    block.image.type === 'external'
      ? block.image.external.url
      : block.image.file.url;
  const caption =
    block.image.caption.length > 0 ? richTextToString(block.image.caption) : '';
  const [isError] = useState(false);
  const [loaded, setLoaded] = useState(false);
    // 画像の縦横比を管理するための状態を定義 画像の縦横比に基づいて適切なクラス名を決定する
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);
  const [imageWidth, setImageWidth] = useState<number | null>(null);
  const getImageClassName = (width: number | null, ratio: number | null) => {
    if (!width || !ratio) return "object-contain h-auto w-auto";
    
    // 縦長画像（ratio < 1）の場合
    if (ratio < 1) {
      // 実際の画像幅がコンテナより大きい場合はw-full
      return width > 350 ? "object-contain h-auto w-full" : "object-contain h-auto w-auto";
    }

    // 横長画像の場合は常にw-full
    return "object-contain h-auto w-full";
  };

  useEffect(() => {
    if (isError && !sessionStorage.getItem('reloaded')) {
      const event = new Event('trigger-reload');
      // eslint-disable-next-line no-console
      console.error("event", event);
      window.dispatchEvent(event);
    }
  }, [isError]);

  const handleLoad = () => {
    setLoaded(true);
  };

  return (
    <div className="relative mx-auto p-6 flex flex-col items-center">
      <MediumZoom zoomMargin={40}>
        <NextImage
          className={getImageClassName(imageWidth, aspectRatio)}
          src={url}
          alt={caption || ''}
          width={3840}
          height={2160}
          title={caption}
          priority
          onError={(e) => {
            e.currentTarget.src = '/logos/300^2_tomei_textBlack_loading.gif';
          }}
          onLoadingComplete={({ naturalWidth, naturalHeight }) => {
            const ratio = naturalWidth / naturalHeight;
            setAspectRatio(ratio);
            setImageWidth(naturalWidth);
            handleLoad();
          }}
          unoptimized={true} //Vercelの無料プランにおける next/image コンポーネントの画像最適化機能の制限（月1000件まで)最適化をスキップ。
        />
      </MediumZoom>
      {loaded && (
        <figcaption className="text-xs text-gray-400 text-center">
          {caption}
        </figcaption>
      )}
    </div>
  );
};
