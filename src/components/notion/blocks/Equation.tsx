import type { EquationBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import type { BlockWithChildren } from '~/types/notion';

import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

type Props = {
  block: BlockWithChildren<EquationBlockObjectResponse>;
};

export const Equation = ({ block: { equation } }: Props) => {
  return (
    <div className="my-4">
      <BlockMath math={equation.expression} />
    </div>
  );
};
