import type { FC } from 'react';
import type { NotionPageObjectResponse } from '~/types/notion';

import { BsChatText } from 'react-icons/bs';

import { BookIcon, GitHubIcon } from '~/commons/icons';
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

        <div>
          <h2 className="flex items-center gap-1 text-lg font-bold">
            この Blog について
            <BsChatText size={20} />
          </h2>
          <p className="px-4 py-2 leading-loose">
          Knobさんの”noblog”を参考にさせていただき、作成しました。
          <br />
          素敵な記事をありがとうございます。この場をお借りして御礼申し上げます。
          <br />
          Keywords: Next.js, TypeScript, Tailwind CSS, Notion API ...
          </p>
          <div className="ml-auto w-fit">
            <ReadMoreButton
              href="https://github.com/nbr41to/noblog"
              blank
              rightIcon={<GitHubIcon size={20} />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
