import type { FC } from 'react';
import type { NotionPageObjectResponse } from '~/types/notion';

import { PostGridItem } from '~/features/notionBlog/PostGridItem';
import { PostListItem } from '~/features/notionBlog/PostListItem';

type Props = {
  posts: NotionPageObjectResponse[];
};

export const PostList: FC<Props> = ({ posts }) => {
  return (
    <div className="space-y-3">
      {posts.map((post) => (
        <div key={post.id}>
          <div className="sp:hidden">
            <PostListItem post={post} />
          </div>
          <div className="hidden sp:flex sp:justify-center">
            <PostGridItem post={post} />
          </div>
        </div>
      ))}
    </div>
  );
};
