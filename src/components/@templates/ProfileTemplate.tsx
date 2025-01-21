import type { FC } from 'react';
import type { NotionPost } from '~/types/notion';

import { blockToJsx } from '~/components/notion/blockToJsx';

type Props = {
  post: NotionPost;
};

export const ProfileTemplate: FC<Props> = ({ post }) => {
  return (
    <div className="space-y-2">
      <h1 className="py-8 text-center text-3xl sp:p-4 sp:text-xl">
        {post.title}
      </h1>
      <div className="w-main mx-auto rounded bg-white py-6 px-10 leading-loose sp:mt-2 sp:px-4">
        {post.children?.map((block) => (
          <div key={block.id}>{blockToJsx(block)}</div>
        ))}
      </div>
    </div>
  );
};
