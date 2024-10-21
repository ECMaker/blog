import type { QuoteBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import type { FC } from 'react';
import type { BlockWithChildren } from '~/types/notion';

import { clsx } from '@mantine/core';

import { RichText } from '~/components/notion/RichText';

type Props = {
  block: BlockWithChildren<QuoteBlockObjectResponse>;
};

export const Quote: FC<Props> = ({ block }: Props) => {
  return (
    <blockquote
      className={clsx(
        /*囲い*/'relative rounded my-4 bg-slate-100 px-6 py-2 text-sm text-slate-600 sp:text-base',
        /*左棒*/'before:absolute before:top-1/2 before:left-1 before:h-[85%] before:w-1 before:-translate-y-1/2 before:rounded-full before:bg-slate-500 before:content-[""]',
      )}
    >
      <RichText text={block.quote.rich_text} />
    </blockquote>
  );
};
