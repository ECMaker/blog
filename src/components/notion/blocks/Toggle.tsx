import type { ToggleBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import type { BlockWithChildren } from '~/types/notion';

import { blockToJsx } from '~/components/notion/blockToJsx';
import { RichText } from '~/components/notion/RichText';

type Props = {
  block: BlockWithChildren<ToggleBlockObjectResponse>;
};

export const Toggle = ({ block }: Props) => {
  return (
    <div className="pl-2">
    <details className="my-5 rounded-md border-2 border-gray-200 py-2 px-4">
      <summary className="cursor-pointer">
        <span className="ml-1">
          <RichText text={block.toggle.rich_text} />
        </span>
      </summary>
      {block.children && (
        <div className="ml-2">
          {block.children.map((child) => (
            <div key={child.id}>{blockToJsx(child)}</div>
          ))}
        </div>
      )}
    </details>
    </div>
  );
};
