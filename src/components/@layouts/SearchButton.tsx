import type { FC } from 'react';

import { Kbd } from '@mantine/core';

import { SearchIcon } from '~/commons/icons';

type Props = {
  onClick: () => void;
};
export const SearchButton: FC<Props> = ({ onClick }) => {

  const isMac = typeof window !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0;

  const keyLabel = isMac ? '⌘' : 'Ctrl';

  return (
    <button
      className="flex cursor-pointer items-center gap-2 sp:gap-1 rounded-md border-none bg-gray-700 px-2 py-1 md:py-1.5 sp:pr-5 sm:pr-5 md:pr-1 font-Baloo text-base sp:text-sm text-white shadow hover:brightness-125"
      tabIndex={0}
      onClick={onClick}
    >
      <SearchIcon size={18} />
      Search
      <Kbd
        className="border-gray-400 bg-gray-700 py-0.5 text-xs text-white hidden md:block"
        color="dark"
      >
        {keyLabel} + K
      </Kbd>
    </button>
  );
};
