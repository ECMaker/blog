import type { NumberedListItemBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import type { FC } from 'react';
import type { BlockWithChildren } from "~/types/notion";

import { blockToJsx } from '~/components/notion/blockToJsx';
import { RichText } from '~/components/notion/RichText';

type Props = {
  block: BlockWithChildren<NumberedListItemBlockObjectResponse>;
};

export const NumberedListItem: FC<Props> = ({ block }: Props) => {
  return (
    <li className="pl-2 list-decimal sp:text-sm">
      <RichText text={block.numbered_list_item.rich_text} />
      {block.children?.map((child) => (
        <div key={block.id}>{blockToJsx(child)}</div>
      ))}
    </li>
  );
};
