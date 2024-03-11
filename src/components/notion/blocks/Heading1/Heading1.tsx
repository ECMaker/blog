import type { Heading1BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import type { FC } from 'react';

import { OutlineBlockIcon } from '~/components/@commons/icons';
import { RichText } from '~/components/notion/RichText';

type Props = {
  block: Heading1BlockObjectResponse;
};

export const Heading1: FC<Props> = ({ block }) => {
  return (
    <h1 
      className="my-2 flex items-center gap-2 px-3 text-2xl shadow-[-1px_-1px_6px_#ccc,4px_4px_1px_#1E293B] sp:text-lg"
    >
      <OutlineBlockIcon size={28} />
      <RichText text={block.heading_1.rich_text} />
    </h1>
  );
};
