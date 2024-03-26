import type { Heading3BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import type { FC } from 'react';
import type { BlockWithChildren } from '~/types/notion';

import { useIntersection } from '@mantine/hooks';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { RichText } from '~/components/notion/RichText';
import { inViewHeadingIdsAtom } from '~/recoil/atoms';

type Props = {
  block: BlockWithChildren<Heading3BlockObjectResponse>;
};

export const Heading3: FC<Props> = ({ block }: Props) => {
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
    <h3
      id={block.id}
      className="my-4 flex items-center gap-2 px-3 border-0 border-b border-solid border-slate-500 pl-2 text-lg font-bold sp:border-slate-500 sp:text-base"
      ref={ref}
    >
      {/*<OutlineCheckIcon size={22} />*/}
      <RichText text={block.heading_3.rich_text} />
    </h3>
  );
};
