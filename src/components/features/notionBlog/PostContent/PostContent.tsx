import type { FC } from 'react';
import type { NotionBlockObjectResponse } from '~/types/notion';

import { NotionBlock } from '~/components/notion';
import { blockToJsx } from '~/components/notion/blockToJsx';

type Props = {
  title: string;
  blocks: NotionBlockObjectResponse[];
};

export const PostContent: FC<Props> = ({ blocks }: Props) => {
  return (
    <div className="rounded bg-white px-10 py-8 sp:rounded-none sp:px-4 sp:py-2">
      <div className="">
{/* !U 以下、のぶs方式  */}
         {blocks.map((block) => (
          <div key={block.id}>{blockToJsx(block)}</div>
        ))} 
{/* !U 以下、かなるs方式 */}
        {blocks.map((block) => (
          <NotionBlock block={block} key={block.id} />
        ))}
      </div>
    </div>
  );
};
