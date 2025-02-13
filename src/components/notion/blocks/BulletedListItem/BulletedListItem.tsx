import type { BulletedListItemBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import type { FC } from 'react';
import type { BlockWithChildren } from '~/types/notion';

import { blockToJsx } from '~/components/notion/blockToJsx';
import { RichText } from '~/components/notion/RichText';

type Props = {
  block: BlockWithChildren<BulletedListItemBlockObjectResponse>;
};

export const BulletedListItem: FC<Props> = ({ block }: Props) => {
  const hasNestedList = block.children?.some(child => 
    child.type === 'bulleted_list' || child.type === 'numbered_list'
  );

  return (
    <li className="pt-1 pr-4 sp:text-sm compact-list-item">
      <RichText text={block.bulleted_list_item.rich_text} />
      {block.children?.map((child) => (
        <div key={child.id} className="compact-list-item">
          {blockToJsx(child, { 
            isNested: hasNestedList || child.type === 'bulleted_list' || child.type === 'numbered_list'
          })}
        </div>
      ))}
    </li>
  );
};
