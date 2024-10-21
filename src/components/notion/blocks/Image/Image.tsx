/* eslint-disable no-console */
import type { ImageBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import type { FC } from 'react';
import type { BlockWithChildren } from '~/types/notion';

import { Button } from '@mantine/core';
import NextImage from 'next/image';
import { useState } from 'react';
import MediumZoom from 'react-medium-image-zoom'; // Import react-medium-image-zoom

import { DangerIcon, UpdateIcon } from '~/commons/icons';
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
    block.image.caption.length > 0 ? block.image.caption[0].plain_text : '';
  block.image.caption ? richTextToString(block.image.caption) : '';
  const [isError, setIsError] = useState(false);

  // !U 画像の縦横比を管理するための状態を定義 画像の縦横比に基づいて適切なクラス名を決定する
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);     
  const imageClassName = aspectRatio && aspectRatio > 1 ? "object-contain h-auto w-full" : "object-contain h-auto w-auto";

  return (
    <div className="relative mx-auto mt-4 mb-4 flex flex-col items-center">
      <MediumZoom zoomMargin={40}>
          <NextImage
            className={imageClassName} // !U className を動的に変更
            src={url}
            alt={caption || ''}
            width={3840}
            height={2160}
            title={caption}
            priority
            onError={(e) => {
              console.error(e);
              setIsError(true);
            }}
            // !U 画像の読み込み完了時に縦横比を計算
            onLoadingComplete={({naturalWidth, naturalHeight}) => {
              setAspectRatio(naturalWidth / naturalHeight);
            }}
          />
        </MediumZoom>
      {caption && (
        <figcaption className="text-xs text-gray-400 text-center">
          {caption}
        </figcaption>
      )}
      {isError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div
              className="mx-auto mt-1 w-60 text-ellipsis text-sm line-clamp-1"
              title={url}
            >
              {url}
            </div>
            <div className="item-center mt-2 flex gap-2 text-2xl font-bold">
              <DangerIcon size={36} />
              画像の取得に失敗しました 🥺
            </div>
            <div className="mt-3">
              <Button
                rightIcon={<UpdateIcon size={20} />}
                onClick={() => window.location.reload()}
              >
                更新する
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
