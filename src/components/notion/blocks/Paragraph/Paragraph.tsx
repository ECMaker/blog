import type { ParagraphBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import type { FC } from 'react';
import type { BlockWithChildren } from '~/types/notion';

import { blockToJsx } from '~/components/notion/blockToJsx';
import { RichText } from '~/components/notion/RichText';

type Props = {
  block: BlockWithChildren<ParagraphBlockObjectResponse>;
};

export const Paragraph: FC<Props> = ({ block }: Props) => {
  return (
    <>
      <div className="mt-1 min-h-[18px]">
        <RichText text={block.paragraph.rich_text} />
      </div>
      {block.children && (
        <div className="ml-4">
          {block.children.map((child) => (
            <div key={block.id}>{blockToJsx(child)}</div>
          ))}
        </div>
      )}
    </>
  );
};
