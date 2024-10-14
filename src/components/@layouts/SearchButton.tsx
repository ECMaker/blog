import type { FC } from 'react';

import { Kbd } from '@mantine/core';

import { SearchIcon } from '~/commons/icons';

type Props = {
  onClick: () => void;
};
export const SearchButton: FC<Props> = ({ onClick }) => {
  const isMac =
    typeof window !== 'undefined' &&
    navigator.platform.toUpperCase().indexOf('MAC') >= 0;

  const keyLabel = isMac ? '⌘' : 'Ctrl';

  return (
    <button
      className="font-Baloo flex cursor-pointer items-center gap-2 rounded-md border-none bg-gray-700 px-2 py-1 text-base text-white shadow hover:brightness-125 sp:gap-1 sp:pr-5 sm:pr-5 md:py-1.5 md:pr-1"
      tabIndex={0}
      onClick={onClick}
    >
      <SearchIcon size={18} />
      Search
      <Kbd
        className="hidden border-gray-400 bg-gray-700 py-0.5 text-xs text-white md:block"
        color="dark"
      >
        {keyLabel} + K
      </Kbd>
    </button>
  );
};
