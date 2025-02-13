import type { FC, ReactNode } from 'react';
import type { NotionPost } from '~/types/notion';

import { clsx } from '@mantine/core';
import { useSpotlight } from '@mantine/spotlight';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useMemo } from 'react';

import { ContentsButton } from '~/components/@layouts/ContentsButton';
import { NavMenu } from '~/components/@layouts/NavMenu';
import { ScrollTopButton } from '~/components/@layouts/ScrollTopButton';
import { SearchButton } from '~/components/@layouts/SearchButton';
import { useTableOfContentsContext } from '~/components/features/notionBlog/TableOfContentsContext';
import { Breadcrumbs } from '~/layouts/Breadcrumbs';

type Props = {
  children: ReactNode;
  post?: NotionPost;
};

export const Layout: FC<Props> = ({ children, ...pageProps }) => {
  const { setShowTableOfContents } = useTableOfContentsContext();
  const router = useRouter();
  const post = pageProps.post as NotionPost;
  const pathname = usePathname();
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
  
  const showContentsButton = useMemo(() => {
    return (pathname === '/posts/');
  }, [pathname]);

  // ここ app\layout\Layout.tsx は変更しても変わらない？ src\components\@layouts\Layout.tsx も変更する !U

  return (
    <div className="bg-gray-200">
      <div className="flex items-center justify-between bg-gradient-to-b from-gray-200 from-50% via-gray-200 to-transparent sticky-topbar pb-4 sp:pb-6">
        <div className="flex items-center w-fit justify-between">
          <NavMenu />
        </div>
        <header className="py-1 sp:py-5">
          <div
            className={clsx(
              'mx-auto w-fit cursor-pointer text-slate-800 py-4',
              'hover:title-drop-shadow transition duration-1000 ease-in hover:text-white',
            )}
            onClick={() => router.push('/')}
          >
            <h1 className="flex gap-3 items-center font-CutiveMono leading-none text-5xl sp:text-4xl">
              <Image
                src="/logos/400^2inside600^2_tomei.gif"
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
        <div className="flex flex-col items-end mr-2">
          <div className="flex items-center mb-2 sb-2 sm:mb-1 sp:mb-1">
            <SearchButton onClick={handleClickSearchButton} />
          </div>
          {showContentsButton && (
          <div className="md:hidden">
            <ContentsButton onClick={() => setShowTableOfContents(prev => !prev)} />
          </div>
        )}
        </div>
      </div>
      <main className="relative z-10 mb-60 min-h-[calc(100vh-102px)] w-full bg-gray-200">
        <div className=" mx-auto max-w-[1280px]">
          <div className="ml-auto w-fit max-w-full overflow-x-scroll pr-8 sp:ml-0 sp:pr-0 sp:pl-4">
            <Breadcrumbs currentPath={pathname || '/'} titleEnum={titleEnum} />
          </div>
          {children}
        </div>
        <div className="sticky bottom-0 p-4 text-right sp:p-2">
          <ScrollTopButton />
        </div>
      </main>
      <footer className="fixed bottom-0 left-0 flex w-full flex-col bg-slate-800 px-8 text-white sp:py-4 sp:px-4">
        <div className="mt-10">
          <div className="flex gap-2 items-center">
            <Image
              src="/logos/400^2inside600^2_tomei.gif"
              alt="site logo"
              width={100}
              height={100}
              sizes="265px"
              priority
              className="-mt-1"
            />
            <Link href="/" className="font-CutiveMono text-4xl text-slate-200 sp:text-3xl">
              EC maker
            </Link>
          </div>
          <nav className="flex justify-center gap-8 sp:gap-4 mt-4 mb-4 items-center text-slate-200 sp:text-sm">
            <Link href="/" className="text-slate-200 hover:text-white">Home</Link>
            <Link href="/about" className="text-slate-200 hover:text-white">About</Link>
            <Link href="/contact" className="text-slate-200 hover:text-white">Contact</Link>
            <Link href="/privacy-policy" className="text-slate-200 hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="text-slate-200 hover:text-white">Terms of Service</Link>
          </nav>
        </div>
        <div className="py-2 mt-4 text-center text-xs text-slate-400">
          Made with Notion by EC maker @2024
        </div>
      </footer>
    </div>
  );
};
