import { atom } from 'recoil';

export const inViewHeadingIdsAtom = atom<string[]>({
  key: 'uniqueInViewHeadingAtom', // キーを一意に変更
  default: [],
});
