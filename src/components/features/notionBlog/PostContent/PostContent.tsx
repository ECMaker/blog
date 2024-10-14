import type { FC } from 'react';
import type { ExpandedBlockObjectResponse } from '~/types/notion';

import { blockToJsx } from '~/components/notion/blockToJsx';

type Props = {
  title: string;
  blocks: ExpandedBlockObjectResponse[];
};

export const PostContent: FC<Props> = ({ blocks }: Props) => {
  return (
    <div className="rounded bg-white px-10 py-8 sp:rounded-none sp:px-4 sp:py-2">
      <div className="">
         {blocks.map((block) => (
          <div key={block.id}>{blockToJsx(block)}</div>
        ))}
      </div>
    </div>
  );
};
