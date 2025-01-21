import type { FC } from 'react';

import { clsx, Transition } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import Image from 'next/image';

import {
  ExperimentIcon,
  GitHubOctocatIcon,
  HomeIcon,
  ProfileIcon,
  TwitterIcon,
  // YouTubeIcon,
  MailIcon,
  BookIcon,
  MenuIcon,
  PrivacyIcon,
  TermsIcon,
} from '~/commons/icons';


import { NavMenuExternalLink } from './NavMenuExternalLink';
import { NavMenuLink } from './NavMenuLink';


export const EcmakerIcon =  '/icon.svg';
 
export const NavMenu: FC = () => {
  const { hovered, ref } = useHover();

  return (
    <nav ref={ref} className="w-fit cursor-pointer p-3 sp:p-0 sp:pl-2">
      <div
        className={clsx(
          'flex flex-col items-center justify-center transition-colors duration-300',
          hovered && 'text-white'
        )}
      >
        <MenuIcon size={36} />
        <div className="font-Baloo font-bold sp:text-sm">MENU</div>
      </div>

      <Transition
        mounted={hovered}
        transition="slide-right"
        timingFunction="ease"
        duration={400}
      >
        {(styles) => (
          <div
            className="fixed top-0 left-0 -z-10 h-screen space-y-2 bg-slate-800 px-6 pt-28"
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


            {/* External Links */}
            <div className="pt-8 space-y-2 border-t border-slate-700">
              <NavMenuLink
                leftIcon={<ProfileIcon size={20} />}
                href="/about"
                label="About"
              />
              <NavMenuLink
                leftIcon={<MailIcon size={20} />}
                href="/contact"
                label="Contact"
              />
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
              {/* <NavMenuExternalLink */}
                {/* icon={<YouTubeIcon size={18} />} */}
                {/* href="https://www.youtube.com/channel/hoge" */}
                {/* label="YouTube" */}
              {/* /> */}
            </div>

            {/* Legal Links */}
            <div className="pt-8 space-y-2 border-t border-slate-700">
              <NavMenuLink
                leftIcon={<PrivacyIcon size={18} />}
                href="/privacy-policy"
                label="Privacy"
              />
              <NavMenuLink
                leftIcon={<TermsIcon size={18} />}
                href="/terms"
                label="Terms"
              />
            </div>

            {/* Logo */}
            <div className="pt-8">
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
                href="/logos/900^2_black.gif"
                label="logo"
              />
            </div>
          </div>
        )}
      </Transition>
    </nav>
  );
};
