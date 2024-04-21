import type { FC } from 'react';

type Props = {
  onClick: () => void;
};
export const ContentsButton: FC<Props> = ({ onClick }) => {

  return (
    <button
      className="flex cursor-pointer items-center gap-2 sp:gap-1 rounded-md border-none bg-gray-700 px-2 py-1.5 font-Baloo text-base text-white shadow hover:brightness-125"
      onClick={onClick}
    >
      Contents
    </button>
  );
};
