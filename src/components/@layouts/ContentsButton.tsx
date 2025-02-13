import type { FC } from 'react';

import { CircleDownIcon, CircleUpIcon } from '~/commons/icons';
import { useTableOfContentsContext } from '~/components/features/notionBlog/TableOfContentsContext';

type Props = {
  onClick: () => void;
};
export const ContentsButton: FC<Props> = ({ onClick }) => {
  const { showTableOfContents } = useTableOfContentsContext();

  return (
    <button
      className="flex cursor-pointer items-center gap-2 sp:gap-1 rounded-md border-none bg-gray-700 px-2 py-1 md:py-1.5 text-base sp:text-sm text-white shadow hover:brightness-125"
      onClick={onClick}
    >
      {showTableOfContents ? <CircleUpIcon size={18} /> : <CircleDownIcon size={18} />}
      Contents
    </button>
  );
};
