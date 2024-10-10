import type { ToDoListBlockObjectResponse } from '~/types/notion';

import { blockToJsx } from '~/components/notion/blockToJsx';

type Props = {
  block: ToDoListBlockObjectResponse;
};

export const ToDoList = ({ block }: Props) => {
  return (
    <ul className="my-5 pl-7">
      {block.to_do_list.children.map((child) => (
        <div key={child.id}>{blockToJsx(child)}</div>
      ))}
    </ul>
  );
};
