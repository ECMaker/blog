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
    block.image.type === "external"
      ? block.image.external.url
      : block.image.file.url;
  const caption =
   block.image.caption.length > 0 ? block.image.caption[0].plain_text : '';
   block.image.caption
    ? richTextToString(block.image.caption)
    : "";
  const [isError, setIsError] = useState(false);

  return (
    <div className="relative mx-auto">
        <MediumZoom
          zoomMargin={40}
        >
          <NextImage
            className="object-contain h-auto w-full"
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
          />
        </MediumZoom>
      {caption && (
        <figcaption className="text-xs text-gray-400">{caption}</figcaption>
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
