import type { ColumnBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import type { BlockWithChildren } from '~/types/notion';

import { blockToJsx } from '~/components/notion/blockToJsx';

type Props = {
  block: BlockWithChildren<ColumnBlockObjectResponse>;
};

export const Column = ({ block }: Props) => {
  return (
    <div className="min-w-0 flex-1 break-words">
      {block.children &&
        block.children.map((child) => (
          <div key={block.id}>{blockToJsx(child)}</div>
        ))}
    </div>
  );
};
