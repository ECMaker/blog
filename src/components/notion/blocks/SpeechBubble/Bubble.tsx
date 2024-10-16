import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  isReverse?: boolean;
};

export const Bubble = ({ children, isReverse }: Props) => {
  return (
    <div
      className={`${
        isReverse ? 'rounded-br-sm' : 'rounded-bl-sm'
      } rounded-xl bg-slate-100 p-4`}
    >
      {children}
    </div>
  );
};
