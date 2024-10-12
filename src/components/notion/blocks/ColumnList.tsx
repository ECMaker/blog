import type { ColumnListBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import type { BlockWithChildren } from '~/types/notion';

import { blockToJsx } from '~/components/notion/blockToJsx';

type Props = {
  block: BlockWithChildren<ColumnListBlockObjectResponse>;
};

export const ColumnList = ({ block }: Props) => {
  return (
    <div className="my-5 flex w-full justify-around gap-4">
      {block.children &&
        block.children.map((child) => (
          <div key={child.id}>{blockToJsx(child)}</div>
        ))}
    </div>
  );
};
