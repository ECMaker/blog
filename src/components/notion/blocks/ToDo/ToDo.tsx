import type { ToDoBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import type { FC } from 'react';
import type { BlockWithChildren } from '~/types/notion';

import { CheckedBoxIcon, UnCheckedBoxIcon } from '~/commons/icons';
import { RichText } from '~/components/notion/RichText';

type Props = {
  block: BlockWithChildren<ToDoBlockObjectResponse>;
};

export const ToDo: FC<Props> = ({ block }: Props) => {
  return (
    <li className="flex list-none items-start">
      <input
        className="hidden"
        type="checkbox"
        checked={block.to_do.checked}
        disabled
      />
      <div className="mt-2.5 sp:mt-2">
        {block.to_do.checked ? <CheckedBoxIcon /> : <UnCheckedBoxIcon />}
      </div>
      <span className="mt-2 ml-2 sp:text-sm">
        <RichText text={block.to_do.rich_text} className="todo-para" />
      </span>
    </li>
  );
};
