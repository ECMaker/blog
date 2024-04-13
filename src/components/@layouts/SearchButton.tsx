import type { FC } from 'react';

import { Kbd } from '@mantine/core';
import { useOs } from '@mantine/hooks';

import { SearchIcon } from '~/commons/icons';

type Props = {
  onClick: () => void;
};
export const SearchButton: FC<Props> = ({ onClick }) => {
  const os = useOs();

  return (
    <button
      className="flex cursor-pointer items-center gap-2 rounded-md border-none bg-gray-700 px-2 py-1.5 font-Baloo text-base text-white shadow hover:brightness-125"
      tabIndex={0}
      onClick={onClick}
    >
      <SearchIcon size={18} />
      Search
      <Kbd
        className="border-gray-400 bg-gray-700 py-0.5 text-xs text-white"
        color="dark"
      >
        {os === 'windows' ? 'Ctrl' : '⌘'} + K
      </Kbd>
    </button>
  );
};
