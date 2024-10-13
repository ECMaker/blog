import type { FC } from 'react';
import type { ExpandedBlockObjectResponse } from '~/types/notion';

import { clsx } from '@mantine/core';
import { useState, useEffect, useMemo } from 'react';
import { useRecoilValue } from 'recoil';

import { inViewHeadingIdsAtom } from '~/recoil/atoms';

type Props = {
  blocks: ExpandedBlockObjectResponse[];
  isAll?: boolean;
};

export const TableOfContents: FC<Props> = ({ blocks, isAll = false }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const inViewHeadingIds = useRecoilValue(inViewHeadingIdsAtom);

const headingList = useMemo(
  () =>
    blocks.flatMap((block) => {
      if (isAll) {
        const type = block.type;
        const title =
          // @ts-expect-error ignore
          block[type]?.rich_text
            ? // @ts-expect-error ignore
              block[type]?.rich_text[0]?.plain_text
            : `empty: ${type}`;

        return {
          id: block.id,
          type,
          title,
        };
      }
      if (block.type === 'heading_1') {
        return {
          id: block.id,
          type: block.type,
          title: block.heading_1.rich_text[0].plain_text,
        };
      }
      if (block.type === 'heading_2') {
        return {
          id: block.id,
          type: block.type,
          title: /*"└ " +*/ block.heading_2.rich_text[0].plain_text,
        };
      }
      if (block.type === 'heading_3') {
        return {
          id: block.id,
          type: block.type,
          title: /*" └ " +*/block.heading_3.rich_text[0].plain_text,
        };
      }

      return [];
    }),
    [blocks, isAll],
);

  useEffect(() => {
    const index = headingList.findIndex((item) =>
      inViewHeadingIds.includes(item.id),
    );
    if (index < 0) return;
    setActiveIndex(index);
  }, [headingList, inViewHeadingIds]);

  return (
    <div className="rounded bg-white p-4">
      <div className="text-center font-Baloo font-bold text-lg">
        - Contents -
      </div>
      <div className="mx-auto mt-0.5 h-0.5 w-20 rounded-full bg-slate-800" />
      <div className="mt-4 max-h-[456px] overflow-y-scroll">
        <div
          className={clsx(
            'relative flex flex-col gap-2 py-2 pl-6 text-sm',
            'before:absolute before:top-4 before:left-2 before:h-[calc(100%-36px)] before:w-0.5 before:bg-slate-300 before:content-[""]',
          )}
        >
          {headingList.map((item, index) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={clsx(
                'text relative transition-colors duration-150 hover:text-slate-400',
                activeIndex === index
                  ? 'font-bold text-gray-900'
                  : 'text-slate-400',
                item.type === 'heading_1' && 'font-bold',
                item.type === 'heading_1' && 'underline',
                item.type === 'heading_1' && 'text-lg',
              //item.type === 'heading_1' && 'thick-underline',
                item.type === 'heading_2' && 'pl-0',
                item.type === 'heading_2' && 'font-bold',
                item.type === 'heading_2' && 'text-base',
                item.type === 'heading_3' && 'pl-0',
                'before:absolute before:rounded-full before:border-solid before:border-white before:content-[""]',
                item.type === 'heading_1'
                  ? 'before:top-[8px] before:-left-[21px] before:h-[9px] before:w-[9px] before:border-[2px]'
                  : item.type === 'heading_2'
                    ? 'before:top-[7px] before:-left-[21px] before:h-[8px] before:w-[8px] before:border-[2px]'
                    : 'before:top-[5px] before:-left-[19px] before:h-[7px] before:w-[7px] before:border-[1px]',
                'before:border-slate-100',
                activeIndex === index
                  ? 'before:bg-slate-600'
                  : 'before:bg-slate-400',
              )}
            >
              {item.title}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
