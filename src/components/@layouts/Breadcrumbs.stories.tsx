import type { Meta, StoryObj } from '@storybook/react';

import { Breadcrumbs as Component } from './Breadcrumbs';

export default {
  component: Component,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
} as Meta<typeof Component>;

export const UseTitleEnum: StoryObj<typeof Component> = {
  args: {
    currentPath: '/posts/[slug]',
    titleEnum: {
      '[slug]': '記事タイトル',
    },
  },
};
