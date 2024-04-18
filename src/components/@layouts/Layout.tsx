import type { FC, ReactNode } from 'react';
import type { NotionPost } from '~/types/notion';

import { clsx } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { ScrollTopButton } from '~/components/@layouts/ScrollTopButton';
import { SearchButton } from '~/components/@layouts/SearchButton';
import { Breadcrumbs } from '~/layouts/Breadcrumbs';

import { NavMenu } from './NavMenu';

type Props = {
  children: ReactNode;
};

export const Layout: FC<Props> = ({ children, ...pageProps }) => {
  const router = useRouter();
  const titleEnum = useMemo(() => {
    if ('post' in pageProps) {
      return {
        ['[slug]']: (pageProps.post as NotionPost).title,
      };
    } else {
      return undefined;
    }
  }, [pageProps]);

  return (
    <div className="bg-gray-200">
      <div className="fixed z-50 flex w-fit items-start justify-between">
        <NavMenu />
      </div>
      <div className="fixed right-2 top-2 z-50 hidden w-fit md:block">
        <SearchButton />
      </div>

      <header className="py-1">
        <div
          className={clsx(
            'mx-auto w-fit cursor-pointer text-slate-800 py-4',
            'hover:title-drop-shadow transition duration-1000 ease-in hover:text-white'
          )}
          onClick={() => router.push('/')}
        >
          <h1 className="flex -ml-20 gap-3 items-center font-CutiveMono text-5xl leading-none">
            <Image
              src="/400^2inside600^2_tomei.gif"
              alt="site logo"
              width={80}
              height={80}
              priority
              className="-mt-2 responsive-image"
            />
            EC maker
          </h1>
        </div>
      </header>
      <main className="relative z-10 mb-40 min-h-[calc(100vh-102px)] w-full bg-gray-200">
        <div className=" mx-auto max-w-[1280px]">
          <div className="ml-auto w-fit max-w-full overflow-x-scroll pr-8 sp:ml-0 sp:pr-0 sp:pl-4">
            <Breadcrumbs currentPath={router.pathname} titleEnum={titleEnum} />
          </div>
          {children}
        </div>
        <div className="sticky bottom-0 p-4 text-right sp:p-2">
          <ScrollTopButton />
        </div>
      </main>
      <footer className="fixed bottom-0 left-0 flex h-40 w-full flex-col justify-between bg-slate-800 px-8 text-white">
        <div className="mt-6">
          <div className="flex gap-2 items-center">
            <Image
              src="/400^2inside600^2_tomei.gif"
              alt="site logo"
              width={100}
              height={100}
              sizes="265px"
              priority
              className="-mt-1"
            />
            <Link href="/" className="font-CutiveMono text-4xl text-slate-200">
              EC maker
            </Link>
          </div>
          {/*<div className="mt-2 text-xs">
            Notion API と Next.js / Tailwind CSS で本格ブログを作ってみました。
          </div>*/}
        </div>
        <div className="py-2 text-center text-xs text-slate-400">
          Made with Notion by EC maker @2024
        </div>
      </footer>
    </div>
  );
};
