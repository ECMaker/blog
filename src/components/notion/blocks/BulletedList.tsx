import type { BulletedListBlockObjectResponse } from '~/types/notion';

import { clsx } from '@mantine/core';

import { blockToJsx } from '~/components/notion/blockToJsx';

type Props = {
  block: BulletedListBlockObjectResponse;
  isNested?: boolean;
};

export const BulletedList = ({ block, isNested = false }: Props) => {
  return (
    <ul className={clsx("my-5", isNested ? "pl-7" : "pl-11")}>
      {block.bulleted_list.children.map((child) => (
        <div key={child.id}>
          {blockToJsx(child, { isNested: true })}
        </div>
      ))}
    </ul>
  );
};
