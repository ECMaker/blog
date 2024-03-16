import type { ToDoListBlockObjectResponse } from '~/types/notion';

import { NotionBlock } from '~/components/notion';

type Props = {
  block: ToDoListBlockObjectResponse;
};

export const ToDoList = ({ block }: Props) => {
  return (
    <ul className="my-5 pl-7">
      {block.to_do_list.children.map((child) => (
        <NotionBlock block={child} key={child.id} />
      ))}
    </ul>
  );
};
