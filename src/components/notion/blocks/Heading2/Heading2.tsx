import type { Heading2BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import type { FC } from 'react';
import type { BlockWithChildren } from '~/types/notion';

import { useIntersection } from '@mantine/hooks';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { OutlineBlockIcon } from '~/commons/icons';
import { RichText } from '~/components/notion/RichText';
import { inViewHeadingIdsAtom } from '~/recoil/atoms';

type Props = {
  block: BlockWithChildren<Heading2BlockObjectResponse>;
};

export const Heading2: FC<Props> = ({ block }: Props) => {
  const setInViewHeading = useSetRecoilState(inViewHeadingIdsAtom);
  const { ref, entry } = useIntersection({
    threshold: 1,
    rootMargin: '0px',
  });

  useEffect(() => {
    if (!entry) return;

    if (entry?.isIntersecting) {
      setInViewHeading((prev) => [...prev, block.id]);
    } else {
      setInViewHeading((prev) => prev.filter((id) => id !== block.id));
    }
  }, [entry, block.id, setInViewHeading]);

  return (
    <h2
      id={block.id}
      className="scroll-mt-[90px] my-6 flex items-center gap-2 px-3 border-0 border-b-2 border-solid border-slate-800 pl-2 text-xl font-bold sp:border-slate-500 sp:text-base"
      ref={ref}
    >
      <OutlineBlockIcon size={24} />
      <RichText text={block.heading_2.rich_text} />
    </h2>
  );
};
