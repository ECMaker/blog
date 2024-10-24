import type { FileBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import type { BlockWithChildren } from '~/types/notion';

import Image from 'next/image';
import Link from 'next/link';

import { richTextToString } from '~/utils/richTextToString';

type Props = {
  block: BlockWithChildren<FileBlockObjectResponse>;
};

export const File = ({ block }: Props) => {
  const src_file =
    block.file.type === 'external'
      ? block.file.external.url
      : block.file.file.url;
  const splitSourceArray = src_file.split('/');
  const lastElementInArray = splitSourceArray[splitSourceArray.length - 1];
  const caption_file = block.file.caption
    ? richTextToString(block.file.caption)
    : '';

  return (
    <figure className="my-5">
      <Link
        href={src_file}
        passHref
        className="font-medium text-blue-600 dark:text-blue-500"
      >
        <span className="group flex w-fit items-center gap-2">
          <Image src="/blocks-images/clip-icon.svg" alt="clip-icon" width={16} height={16} />
          <span className="group-hover:underline">
            {lastElementInArray.split('?')[0]}
          </span>
        </span>
      </Link>
      {caption_file && (
        <figcaption className="text-xs text-gray-400 mt-1 ml-7">
          {caption_file}
        </figcaption>
      )}
    </figure>
  );
};
