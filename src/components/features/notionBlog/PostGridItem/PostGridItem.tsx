import type { FC } from 'react';
import type { NotionPageObjectResponse } from '~/types/notion';

import Image from 'next/image';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { toPostMeta } from '~/utils/meta';

type Props = {
  post: NotionPageObjectResponse;
};

export const PostGridItem: FC<Props> = ({ post }) => {
  const router = useRouter();
  const meta = useMemo(() => toPostMeta(post), [post]);
  const expandPost = {...toPostMeta(post)};

  return (
    <div
    className="flex flex-col h-auto w-64 cursor-pointer rounded bg-gray-50 px-5 py-3 shadow transition-transform hover:scale-105 sp:w-80 justify-between"
    onClick={() => router.push(`/posts/${expandPost.slug}`)}
    >
      <div className="space-y-3">
        <div className="flex justify-between">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-4xl shadow">
            <div className="pb-1 text-3xl">{meta.icon}</div>
          </div>
          <div className="text-right text-sm">
            <div>{meta.updatedAt}</div>
            <div className="font-bold">{meta.category.name}</div>
          </div>
        </div>

        <div className="flex items-center">
          <h3 className="overflow-hidden font-bold line-clamp-3">
            {meta.title}
          </h3>
        </div>
        <div className="flex flex-wrap gap-1">
          {meta.tags.map((tag, index) => (
            <span
              key={index}
              className="rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-bold text-gray-800 mb-4"
            >
              {tag.name}
            </span>
          ))}
        </div>
      </div>
      <Image
        src={expandPost.image}
        alt="cover-image"
        width={256}
        height={192}
        priority
        className="h-full w-full rounded-l-md object-cover"
        onError={(e) => {
          e.currentTarget.src = '/logos/300^2_tomei_textBlack_loading.gif';
        }}
        unoptimized={true} //Vercelの無料プランにおける next/image コンポーネントの画像最適化機能の制限（月1000件まで)最適化をスキップ。
      />
    </div>
  );
};
