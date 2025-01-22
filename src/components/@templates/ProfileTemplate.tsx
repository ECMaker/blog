import type { FC } from 'react';
import type { NotionPost } from '~/types/notion';

import { Bio } from '../@commons/Bio';
import { AdSense } from '../features/adsense/AdSense';
import { PostContent } from '../features/notionBlog/PostContent';
import { TableOfContents } from '../features/notionBlog/TableOfContents';
import { useTableOfContentsContext } from '../features/notionBlog/TableOfContentsContext';


type Props = {
  post: NotionPost;
};

export const ProfileTemplate: FC<Props> = ({ post }) => {
  const { showTableOfContents } = useTableOfContentsContext();

  return (
    <div className="space-y-2">
      <h1 className="py-8 text-center text-3xl sp:p-4 sp:text-xl">
        {post.title}
      </h1>
      <div className="flex justify-center gap-6">
        <div className="w-main flex flex-col gap-6 sp:gap-4">
          <PostContent title={post.title} blocks={post.children} />
          <div className="md:hidden">
            <Bio />
          </div>
        </div>

        <div className="w-aside">
          <div className="sticky top-[112px] space-y-4">
            <TableOfContents blocks={post.children} />
            <Bio />
            <div>
              {/* スクエア広告の<!-- サイドバー -->部分 */}
              {process.env.NODE_ENV === 'production'
                ? <AdSense slot="7515574692"/>
                : <p> (広告予定置) </p>
              }
            </div>
          </div>
        </div>
      </div>
      <div className="md:hidden fixed top-[114px] right-2 rounded-md border-solid border-2  border-gray-700 ">
        {showTableOfContents && <TableOfContents blocks={post.children} />}
      </div>
    </div>
  );
};
