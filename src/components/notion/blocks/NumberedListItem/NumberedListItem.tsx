import type { NumberedListItemBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import type { FC } from 'react';
import type { BlockWithChildren } from '~/types/notion';

import { blockToJsx } from '~/components/notion/blockToJsx';
import { RichText } from '~/components/notion/RichText';

type Props = {
  block: BlockWithChildren<NumberedListItemBlockObjectResponse>;
};

export const NumberedListItem: FC<Props> = ({ block }: Props) => {
  return (
    <li className="pl-1 sp:text-sm compact-list-item">
      <RichText text={block.numbered_list_item.rich_text} />
      {block.children?.map((child) => (
        <div key={child.id} className="compact-list-item">{blockToJsx(child)}</div>
      ))}
    </li>
  );
};
