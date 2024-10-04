import type { NumberedListBlockObjectResponse } from '~/types/notion';

import { blockToJsx } from '~/components/notion/blockToJsx';

type Props = {
  block: NumberedListBlockObjectResponse;
};

export const NumberedList = ({ block }: Props) => {
  return (
    <ol className="my-5 list-decimal pl-7">
      {block.numbered_list.children.map((child, index) => (
        <li key={index}>
          {blockToJsx(child)}
        </li>
      ))}
    </ol>
  );
};
