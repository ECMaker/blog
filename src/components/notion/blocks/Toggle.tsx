import type { ToggleBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import type { BlockWithChildren } from '~/types/notion';

import { NotionBlock } from '~/components/notion';
import { RichText } from '~/components/notion/RichText';

type Props = {
  block: BlockWithChildren<ToggleBlockObjectResponse>;
};

export const Toggle = ({ block }: Props) => {
  return (
    <details className="my-5 rounded-md border-2 border-gray-200 py-2 px-4">
      <summary className="cursor-pointer">
        <span className="ml-2">
          <RichText text={block.toggle.rich_text} />
        </span>
      </summary>
      {block.children && (
        <div className="ml-4">
          {block.children.map((child) => (
            <NotionBlock block={child} key={child.id} />
          ))}
        </div>
      )}
    </details>
  );
};