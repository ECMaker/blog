import type { NumberedListBlockObjectResponse } from '~/types/notion';

import { clsx } from '@mantine/core';

import { blockToJsx } from '~/components/notion/blockToJsx';

type Props = {
  block: NumberedListBlockObjectResponse;
  isNested?: boolean;
};

export const NumberedList = ({ block, isNested = false }: Props) => {
  return (
    <ol className={clsx("my-5", isNested ? "pl-5" : "pl-11")}>
      {block.numbered_list.children.map((child) => (
        <div key={child.id}>
          {blockToJsx(child, { isNested: true })}
        </div>
      ))}
    </ol>
  );
};
