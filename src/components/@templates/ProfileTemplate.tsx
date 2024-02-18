import type { FC } from 'react';
import type { NotionBlockObjectResponse } from '~/types/notion';

import Image from 'next/image';
import Link from 'next/link';

import { GitHubIcon } from '~/commons/icons';
import { PageTitle } from '~/commons/PageTitle';
import { blockToJsx } from '~/components/notion/blockToJsx';


type Props = {
  blocks: NotionBlockObjectResponse[];
};

export const ProfileTemplate: FC<Props> = ({ blocks }) => {
  return (
    <div className="space-y-2">
      <PageTitle title="Profile" />

      <div className="w-main mx-auto rounded bg-white py-6 px-10 leading-loose sp:mt-2 sp:px-4">
        <div className="relative mx-auto h-40 w-40 border-2 border-solid border-slate-300">
          <Image
            className="object-cover"
            src="/900^2_black.gif"
            alt="my icon"
            fill
            sizes="160px"
          />
        </div>
        {blocks?.map((block) => (
          <div key={block.id}>{blockToJsx(block)}</div>
        ))}
        <div>
          <br />
          <h2 className="flex items-center gap-1 text-lg font-bold">
            <GitHubIcon size={20} />
            GitHubの草
          </h2>

          <h2 className="flex items-center gap-1 text-lg font-bold ml-4 mt-5">
            - keit
          </h2>
          <Link
            href="https://github.com/keit0728"
            target="_blank"
            rel="noreferrer"
            className="relative mx-auto block h-32 w-full cursor-pointer transition-transform duration-300 hover:scale-105 sp:h-20"
          >
          <Image
            className="h-full w-full object-contain -mt-4"
            src="https://github-contributions-api.deno.dev/keit0728.svg?no-legend=true&no-total=true&scheme=green"
            alt="GitHub Contributions"
            fill
            sizes="800px"
            priority
            unoptimized
          />
          </Link>

          <h2 className="flex items-center gap-1 text-lg font-bold ml-4">
            - K
          </h2>
          <Link
            href="https://github.com/kei880"
            target="_blank"
            rel="noreferrer"
            className="relative mx-auto block h-32 w-full cursor-pointer transition-transform duration-300 hover:scale-105 sp:h-20"
          >
          <Image
            className="h-full w-full object-contain -mt-4"
            src="https://github-contributions-api.deno.dev/kei880.svg?no-legend=true&no-total=true&scheme=green"
            alt="GitHub Contributions"
            fill
            sizes="800px"
            priority
            unoptimized
          />
          </Link>

          <h2 className="flex items-center gap-1 text-lg font-bold ml-4">
            - Taka
          </h2>
          <Link
            href="https://github.com/taka707"
            target="_blank"
            rel="noreferrer"
            className="relative mx-auto block h-32 w-full cursor-pointer transition-transform duration-300 hover:scale-105 sp:h-20"
          >
          <Image
            className="h-full w-full object-contain -mt-4"
            src="https://github-contributions-api.deno.dev/taka707.svg?no-legend=true&no-total=true&scheme=green"
            alt="GitHub Contributions"
            fill
            sizes="800px"
            priority
            unoptimized
          />
          </Link>

          <h2 className="flex items-center gap-1 text-lg font-bold ml-4">
            - U
          </h2>
          <Link
            href="https://github.com/u-ecmaker"
            target="_blank"
            rel="noreferrer"
            className="relative mx-auto block h-32 w-full cursor-pointer transition-transform duration-300 hover:scale-105 sp:h-20"
          >
          <Image
            className="h-full w-full object-contain -mt-4"
            src="https://github-contributions-api.deno.dev/u-ecmaker.svg?no-legend=true&no-total=true&scheme=green"
            alt="GitHub Contributions"
            fill
            sizes="800px"
            priority
            unoptimized
          />
          </Link>
        </div>
      </div>
    </div>
  );
};