import type { FC } from 'react';
import type { NotionPageObjectResponse } from '~/types/notion';


import { BookIcon } from '~/commons/icons';
import { ReadMoreButton } from '~/commons/ReadMoreButton';
import { PostList } from '~/features/notionBlog/PostList';

type Props = {
  posts: NotionPageObjectResponse[];
};

export const IndexTemplate: FC<Props> = ({ posts }) => {
  return (
    <div>
      <div className="w-main mx-auto mt-4 space-y-4 px-4 pb-10">
        <div>
          <h2 className="flex items-center gap-1 text-lg font-bold">
            最近の記事
            <BookIcon size={20} />
          </h2>
          <div className="mt-3">
            <PostList posts={posts} />
          </div>
          <div className="ml-auto mt-4 w-fit">
            <ReadMoreButton href="/posts" />
          </div>
        </div>
      </div>
    </div>
  );
};
