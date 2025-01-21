'use client';
import 'src/styles/globals.css';
import type { ReactNode } from 'react';

import { SpotlightProvider as MantineSpotlightProvider } from '@mantine/spotlight';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

import {
  BookIcon,
  ExperimentIcon,
  HomeIcon,
  MailIcon,
  ProfileIcon,
  SearchIcon,
  PrivacyIcon,
  TermsIcon,
} from '~/components/@commons/icons';

export const SpotlightProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const actions = useMemo(
    () => [
      {
        title: 'Home',
        description:
          'サイトのトップページに移動します。サイトロゴをクリックすることでも移動できます。',
        icon: <HomeIcon size={28} />,
        onTrigger: () => router.push('/'),
      },
      {
        title: 'Blogs',
        description: 'ブログの記事一覧ページに移動します。',
        icon: <BookIcon size={28} />,
        onTrigger: () => router.push('/posts'),
      },
      {
        title: 'Sandbox',
        description: 'サイト作成者が好き勝手遊んでいる実験用のページ',
        icon: <ExperimentIcon size={28} />,
        onTrigger: () => router.push('/sandbox'),
      },
      {
        title: 'About',
        description: 'サイト作成者の詳細ページに移動します。',
        icon: <ProfileIcon size={28} />,
        onTrigger: () => router.push('/about'),
      },
      {
        title: 'Contact',
        description: 'サイト作成者と連絡を取りたい方はこちら',
        icon: <MailIcon size={28} />,
        onTrigger: () => router.push('/contact'),
      },
      {
        title: 'Privacy',
        description: 'プライバシーポリシーに関するページ',
        icon: <PrivacyIcon size={28} />,
        onTrigger: () => router.push('/privacy-policy'),
      },
      {
        title: 'Terms',
        description: '利用規約に関するページ',
        icon: <TermsIcon size={28} />,
        onTrigger: () => router.push('/terms'),
      },
    ],
    [router],
  );

  return (
    <MantineSpotlightProvider
      shortcut="mod + k"
      actions={actions}
      limit={20}
      searchIcon={<SearchIcon size={18} />}
      searchPlaceholder="Search..."
      nothingFoundMessage="Nothing found..."
      withinPortal
      highlightQuery
      overlayOpacity={0.3}
      styles={{
        spotlight: {
          maxHeight: '60vh',
        },
      }}
    >
      {children}
    </MantineSpotlightProvider>
  );
};
