import type { FC, ReactNode } from 'react';
import type { NotionPost } from '~/types/notion';

import { clsx } from '@mantine/core';
import { useSpotlight } from '@mantine/spotlight';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { ContentsButton } from '~/components/@layouts/ContentsButton';
import { ScrollTopButton } from '~/components/@layouts/ScrollTopButton';
import { SearchButton } from '~/components/@layouts/SearchButton';
import { useTableOfContentsContext } from '~/components/features/notionBlog/TableOfContentsContext';
import { Breadcrumbs } from '~/layouts/Breadcrumbs';

import { NavMenu } from './NavMenu';

type Props = {
  children: ReactNode;
  post?: NotionPost;
};

export const Layout: FC<Props> = ({ children, ...pageProps }) => {
  const { setShowTableOfContents } = useTableOfContentsContext();
  const router = useRouter();
  const post = pageProps.post as NotionPost;
  const titleEnum = useMemo(() => {
    if (post) {
      return {
        [post.slug]: post.title,
      };
    } else {
      return undefined;
    }
  }, [post]);

  const spotlight = useSpotlight();
  const handleClickSearchButton = () => spotlight.openSpotlight();

  // app\layout\Layout.tsx も変更する !U

  return (
    <div className="bg-gray-200">
      <div className="flex items-center justify-between bg-gradient-to-b from-gray-200 from-50% via-gray-200 to-transparent sticky-topbar">
        <div className="flex items-center w-fit justify-between">
          <NavMenu />
        </div>
        <header className="py-1">
          <Link
            href="/"
            tabIndex={0}
            className={clsx(
              'mx-auto w-fit cursor-pointer text-slate-800 py-4',
              'hover:title-drop-shadow transition duration-1000 ease-in hover:text-white',
            )}
          >
            <h1 className="flex gap-3 items-center font-CutiveMono text-5xl leading-none">
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
          </Link>
        </header>
        <div className="flex flex-col items-end mr-2">
          <div className="flex items-center mb-2 sb-2 sm:mb-1 sp:mb-1">
            <SearchButton onClick={handleClickSearchButton} />
          </div>
          <div className="md:hidden">
            <ContentsButton
              onClick={() => setShowTableOfContents((prev) => !prev)}
            />
          </div>
        </div>
      </div>
      <main className="relative z-10 mb-40 min-h-[calc(100vh-102px)] w-full bg-gray-200">
        <div className=" mx-auto max-w-[1280px]">
          <div className="ml-auto w-fit max-w-full overflow-x-scroll pr-8 sp:ml-0 sp:pr-0 sp:pl-4">
            <Breadcrumbs currentPath={router.asPath} titleEnum={titleEnum} />
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
