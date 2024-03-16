import type { ColumnListBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import type { BlockWithChildren } from "~/types/notion";

import { NotionBlock } from '~/components/notion';

type Props = {
  block: BlockWithChildren<ColumnListBlockObjectResponse>;
};

export const ColumnList = ({ block }: Props) => {
  return (
    <div className="my-5 flex w-full justify-around gap-4">
      {block.children &&
        block.children.map((block) => (
          <NotionBlock block={block} key={block.id} />
        ))}
    </div>
  );
};
