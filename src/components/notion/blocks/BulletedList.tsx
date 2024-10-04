import type { BulletedListBlockObjectResponse } from '~/types/notion';

import { blockToJsx } from '~/components/notion/blockToJsx';

type Props = {
  block: BulletedListBlockObjectResponse;
};

export const BulletedList = ({ block }: Props) => {
  return (
    <ul className="my-5 list-disc pl-7">
      {block.bulleted_list.children.map((child, index) => (
        <li key={index}>{blockToJsx(child)}</li>
      ))}
    </ul>
  );
};
