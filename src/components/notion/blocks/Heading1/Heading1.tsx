import type { Heading1BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import type { FC } from 'react';
import type { BlockWithChildren } from '~/types/notion';

import { useIntersection } from '@mantine/hooks';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { OutlineBlockIcon } from '~/commons/icons';
import { RichText } from '~/components/notion/RichText';
import { inViewHeadingIdsAtom } from '~/recoil/atoms';

type Props = {
  block: BlockWithChildren<Heading1BlockObjectResponse>;
};

export const Heading1: FC<Props> = ({ block }: Props) => {
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
    <h1 
      id={block.id}
      className="scroll-mt-[98px] my-6 flex items-center gap-2 px-3 text-2xl shadow-[-1px_-1px_6px_#ccc,4px_4px_1px_#1E293B] sp:text-lg"
      ref={ref}
    >
      <OutlineBlockIcon size={28} />
      <RichText text={block.heading_1.rich_text} />
    </h1>
  );
};
