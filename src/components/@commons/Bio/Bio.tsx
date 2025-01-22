import type { FC } from 'react';

import Image from 'next/image';

import { GitHubIcon, TwitterIcon } from '~/commons/icons';

//各記事ページに右上に出てくる著者欄の編集
export const Bio: FC = () => {
  return (
    <div className="rounded bg-white p-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs">Created by</div>
          <div className="text-xl font-CutiveMono font-bold leading-tight">
            EC maker
          </div>
          <div className="mt-2 space-x-2 text-slate-800">
            <a
              className="text-slate-800"
              href="https://github.com/orgs/ECMaker/people"
              target="_blank"
              rel="noreferrer"
            >
              <GitHubIcon size={24} />
            </a>
            <a
              className="text-slate-800"
              href="https://twitter.com/u_ecmaker"
              target="_blank"
              rel="noreferrer"
            >
              <TwitterIcon size={24} />
            </a>
          </div>
        </div>
        <div className="relative h-24 w-24  rounded-full border">
          <Image
            className="rounded-full object-cover"
            src="/logos/400^2inside600^2_tomei.gif"
            alt="my icon"
            fill
            sizes="100px"
            priority
          />
        </div>
      </div>

      <div className="mt-3 text-sm leading-relaxed">
        電機/自動車メーカ系 エンジニア
        <br />
        → フロントエンド エンジニア
        <br />
        - Flutter / スマホアプリ 開発中。
        <br />
        - Next.js / TypeScript /
         <br /> <span className="ml-2">TailwindCSS を学習中。</span>
      </div>
    </div>
  );
};
