import '../src/styles/globals.css';
import { RecoilRoot } from 'recoil';
import { SessionProvider } from 'next-auth/react';

export const parameters = {
  backgrounds: {
    default: 'gray',
    values: [
      { name: 'gray', value: '#e5e7eb' }, /* bg-gray-200 */
      { name: 'slate', value: '#1e293b' }, /* text-slate-800 */
      { name: 'white', value: '#ffffff' }, /* bg-white */
      { name: 'black', value: '#000000' }, /* bg-black */
    ],
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => {
    return (
      <SessionProvider>
        <RecoilRoot>
          <Story />
        </RecoilRoot>
      </SessionProvider>
    );
  },
];
