import type { NumberedListBlockObjectResponse } from '~/types/notion';

import { NotionBlock } from '~/components/notion';

type Props = {
  block: NumberedListBlockObjectResponse;
};

export const NumberedList = ({ block }: Props) => {
  return (
    <ol className="my-5 list-decimal pl-7">
      {block.numbered_list.children.map((child) => (
        <NotionBlock block={child} key={child.id} />
      ))}
    </ol>
  );
};
