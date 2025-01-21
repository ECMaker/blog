import type { FC } from 'react';
import type {
  NotionCommentObjectResponse,
  NotionPost,
  NotionRichTextItemRequest,
} from '~/types/notion';

import { Bio } from '~/commons/Bio';
import { AdSense } from '~/components/features/adsense/AdSense';
import { useTableOfContentsContext } from '~/components/features/notionBlog/TableOfContentsContext';
import { CommentForm } from '~/features/notionBlog/CommentForm';
import { Comments } from '~/features/notionBlog/Comments';
import { PostContent } from '~/features/notionBlog/PostContent';
import { PostMeta } from '~/features/notionBlog/PostMeta/PostMeta';
import { TableOfContents } from '~/features/notionBlog/TableOfContents';

type Props = {
  post: NotionPost;
  comments: NotionCommentObjectResponse[];
  onSubmit: (rich_text: NotionRichTextItemRequest[]) => Promise<void>;
};

export const PostDetailTemplate: FC<Props> = ({ post, comments, onSubmit }) => {
  const { showTableOfContents } = useTableOfContentsContext();
  
  return (
    <div className=" sp:bg-gray-200">
      <h1 className="py-8 text-center text-3xl sp:p-4 sp:text-xl">
        {post.title}
      </h1>

      <div className="flex justify-center gap-6">
        <div className="w-main flex flex-col gap-6 sp:gap-4">
          <PostContent title={post.title} blocks={post.children} />
          {comments.length > 0 && <Comments comments={comments} />}
          <div className="md:hidden">
            <Bio />
          </div>
          <CommentForm onSubmit={onSubmit} />
        </div>

        <div className="w-aside">
          <div className="sticky top-[112px] space-y-4">
            {/* スクエア広告の<!-- サイドバー -->部分 */}
            <div>
              {/* className="bg-white p-2 rounded-lg shadow" */}
              {process.env.NODE_ENV === 'production'
                ? <AdSense slot="7515574692"/>
                : <p> (広告予定置) </p>
              }
            </div>
            <TableOfContents blocks={post.children} />
            <PostMeta meta={post} commentCount={comments.length} />
            <Bio />
          </div>
        </div>
      </div>
      <div className="md:hidden fixed top-[114px] right-2 rounded-md border-solid border-2  border-gray-700 ">
        {showTableOfContents && <TableOfContents blocks={post.children} />}
      </div>
    </div>
  );
};
