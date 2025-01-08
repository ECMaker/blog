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
  const imageClassName = aspectRatio && aspectRatio > 1 ? "object-contain h-auto w-full" : "object-contain h-auto w-auto";

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
    <div className="relative mx-auto mt-4 mb-4 flex flex-col items-center">
      <MediumZoom zoomMargin={40}>
        <NextImage
          className={imageClassName} // className を動的に変更
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
            setAspectRatio(naturalWidth / naturalHeight);
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
