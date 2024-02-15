import type { FC } from 'react';

import { clsx } from '@mantine/core';

import { DummyIcon, LineIcon, TwitterIcon } from '~/commons/icons';

export const ContactBySns: FC = () => {
  return (
    <div className="flex justify-center gap-8">
      <a
        className="relative"
        //href="https://nolink"
        target="_blank"
        rel="noopener noreferrer"
      >
        {/* background */}
        <div
          className={clsx(
            'absolute top-0.5 left-0.5',
            'h-20 w-20 rounded-full bg-slate-600'
          )}
        />
        {/* button */}
        <div
          className={clsx(
            'absolute top-[calc(50%+2px)] left-[calc(50%+2px)] -translate-x-1/2 -translate-y-1/2',
            'h-14 w-14 rounded-full bg-slate-400',
            'shadow-[2px_2px_#222c]'
          )}
        />
        <div
          className={clsx(
            'absolute top-[calc(50%+2px)] left-[calc(50%+2px)] -translate-x-1/2 -translate-y-1/2',
            'h-10 w-10 rounded-full bg-gray-300',
            'shadow-[inset_2px_2px_3px_#222c,inset_-1px_-1px_2px_#222c]'
          )}
        />
        {/* label cover */}
        <div
          className={clsx(
            'relative h-20 w-20 cursor-pointer rounded-full bg-gray-500 text-white',
            'flex items-center justify-center',
            'origin-[40px_6px] transition-transform hover:rotate-12 active:rotate-[120deg]'
          )}
        >
          <LineIcon size={40} />
        </div>
        {/* pin */}
        <div className="absolute top-1 right-1/2 h-1.5 w-1.5 translate-x-1/2 rounded-full bg-slate-300 shadow-sm" />
      </a>

      {/* Twitter !U Xに変更する*/}
      <a
        className="relative"
        href="https://twitter.com/u_ecmaker"
        target="_blank"
        rel="noopener noreferrer"
      >
        {/* background */}
        <div
          className={clsx(
            'absolute top-0.5 left-0.5',
            'h-20 w-20 rounded-full bg-slate-600'
          )}
        />
        {/* button */}
        <div
          className={clsx(
            'absolute top-[calc(50%+2px)] left-[calc(50%+2px)] -translate-x-1/2 -translate-y-1/2',
            'h-14 w-14 rounded-full bg-slate-400',
            'shadow-[2px_2px_#222c]'
          )}
        />
        <div
          className={clsx(
            'absolute top-[calc(50%+2px)] left-[calc(50%+2px)] -translate-x-1/2 -translate-y-1/2',
            'h-10 w-10 rounded-full bg-sky-300',
            'shadow-[inset_2px_2px_3px_#222c,inset_-1px_-1px_2px_#222c]'
          )}
        />
        {/* label cover */}
        <div
          className={clsx(
            'relative h-20 w-20 cursor-pointer rounded-full bg-sky-500 text-white',
            'flex items-center justify-center',
            'origin-[40px_6px] transition-transform hover:rotate-12 active:rotate-[120deg]'
          )}
        >
          <TwitterIcon size={40} />
        </div>
        {/* pin */}
        <div className="absolute top-1 right-1/2 h-1.5 w-1.5 translate-x-1/2 rounded-full bg-slate-300 shadow-sm" />
      </a>

      {/* Mock */}
      <div className="relative">
        {/* background */}
        <div
          className={clsx(
            'absolute top-0.5 left-0.5',
            'h-20 w-20 rounded-full bg-slate-600'
          )}
        />
        {/* button */}
        <div
          className={clsx(
            'absolute top-[calc(50%+2px)] left-[calc(50%+2px)] -translate-x-1/2 -translate-y-1/2',
            'h-14 w-14 rounded-full bg-slate-400',
            'shadow-[2px_2px_#222c]'
          )}
        />
        <div
          className={clsx(
            'absolute top-[calc(50%+2px)] left-[calc(50%+2px)] -translate-x-1/2 -translate-y-1/2',
            'h-10 w-10 rounded-full bg-gray-300',
            'shadow-[inset_2px_2px_3px_#222c,inset_-1px_-1px_2px_#222c]'
          )}
        />
        {/* label cover */}
        <div
          className={clsx(
            'relative h-20 w-20 cursor-pointer rounded-full bg-gray-500 text-white',
            'flex items-center justify-center',
            'origin-[40px_6px] transition-transform duration-300 hover:rotate-12 active:rotate-[120deg]'
          )}
        >
          <DummyIcon size={40} />
        </div>
        {/* pin */}
        <div className="absolute top-1 right-1/2 h-1.5 w-1.5 translate-x-1/2 rounded-full bg-slate-300 shadow-sm" />
      </div>
    </div>
  );
};
