import { clsx, Transition } from '@mantine/core';
import { useHover, useMergedRef } from '@mantine/hooks';
import Image from 'next/image';
import { useState, type FC, useEffect, useRef } from 'react';

import {
  ExperimentIcon,
  GitHubOctocatIcon,
  HomeIcon,
  ProfileIcon,
  TwitterIcon,
  YouTubeIcon,
  MailIcon,
  BookIcon,
  MenuIcon,
} from '~/commons/icons';

import { NavMenuExternalLink } from './NavMenuExternalLink';
import { NavMenuLink } from './NavMenuLink';

export const EcmakerIcon = '/icon.svg';

export const NavMenu: FC = () => {
  const { hovered, ref: useHoverRef } = useHover();
  const menuRef = useRef<HTMLDivElement>(null);
  const ref = useMergedRef(menuRef, useHoverRef);
  const [focused, setFocused] = useState(false);
  const mounted = hovered || focused;

  useEffect(() => {
    const handleFocusOutside = (event: FocusEvent) => {
      if (!event.target) return;
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setFocused(false);
      }
    };

    document.addEventListener('focusin', handleFocusOutside);

    return () => {
      document.removeEventListener('focusin', handleFocusOutside);
    };
  }, [ref, setFocused]);

  return (
    <nav ref={ref} className="w-fit cursor-pointer p-3 sp:p-0 sp:pl-2">
      <div
        role="button"
        tabIndex={0}
        onFocus={() => setFocused(true)}
        // onBlur={() => setFocused(false)}
        className={clsx(
          'flex flex-col items-center justify-center transition-colors duration-300',
          mounted && 'text-white',
        )}
      >
        <MenuIcon size={36} />
        <div className="font-Baloo font-bold sp:text-sm">MENU</div>
      </div>

      <Transition
        mounted={mounted}
        transition="slide-right"
        timingFunction="ease"
        duration={400}
      >
        {(styles) => (
          <div
            className="fixed top-0 left-0 -z-10 h-screen space-y-2 bg-slate-800 px-6 pt-28"
            role="navigation"
            style={styles}
          >
            <NavMenuLink
              leftIcon={<HomeIcon size={18} />}
              href="/"
              label="Home"
            />
            <NavMenuLink
              leftIcon={<BookIcon size={16} />}
              href="/posts"
              label="Blogs"
            />
            <NavMenuLink
              leftIcon={<ExperimentIcon size={20} />}
              href="/sandbox"
              label="Sandbox"
            />
            <NavMenuLink
              leftIcon={<ProfileIcon size={20} />}
              href="/profile"
              label="Profile"
            />
            <NavMenuLink
              leftIcon={<MailIcon size={20} />}
              href="/contact"
              label="Contact"
            />

            <div className="pt-8" />

            {/* External */}
            <NavMenuExternalLink
              icon={<TwitterIcon size={18} />}
              href="https://twitter.com/u_ecmaker"
              label="X (twitter)"
            />
            <NavMenuExternalLink
              icon={<GitHubOctocatIcon size={18} />}
              href="https://github.com/orgs/ECMaker/people"
              label="GitHub"
            />
            <NavMenuExternalLink
              icon={<YouTubeIcon size={18} />}
              href="https://www.youtube.com/channel/hoge"
              label="YouTube"
            />

            <div className="pt-8" />

            <NavMenuLink
              leftIcon={
                <Image
                  src="/icon.svg"
                  alt="site logo"
                  width={18}
                  height={18}
                  priority
                />
              }
              href="/900^2_black.gif"
              label="logo"
            />
          </div>
        )}
      </Transition>
    </nav>
  );
};
