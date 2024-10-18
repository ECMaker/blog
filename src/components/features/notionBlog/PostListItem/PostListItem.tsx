import type { FC } from 'react';
import type { NotionPageObjectResponse } from '~/types/notion';

import Image from 'next/image';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { toPostMeta } from '~/utils/meta';

type Props = {
  post: NotionPageObjectResponse;
};

export const PostListItem: FC<Props> = ({ post }) => {
  const router = useRouter();
  const meta = useMemo(() => toPostMeta(post), [post]);
  const expandPost = { ...toPostMeta(post) };
 
  return (
    <div
      className="flex h-24 cursor-pointer items-start gap-5 rounded bg-gray-50 px-5 py-3 shadow transition-transform hover:scale-105 sm:relative md:h-48"
      onClick={() => router.push(`/posts/${expandPost.slug}`)}
    >
      <Image
        src={expandPost.image}
        alt="cover-image"
        width={256}
        height={192}
        priority
        className="h-full w-20 rounded-l-md object-cover md:w-64"
      />
      <div
        /*icon+tag+Updated,Categoy+Title*/ className="flex-col justify-between w-full"
      >
        <div
          /*icon+tag+Updated,Categoy*/ className="flex justify-between w-full"
        >
          <div /*icon+tag*/ className="flex items-center">
            <div
              /*icon*/ className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-white shadow sm:absolute sm:-top-2 sm:-left-2 sm:h-9 sm:w-9"
            >
              <div className="pb-1 text-3xl sm:text-base">{meta.icon}</div>
            </div>
            <div /*tag*/ className="flex flex-wrap gap-1 ml-3">
              {meta.tags.map((tag, index) => (
                <span
                  key={index}
                  className="rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-bold text-gray-800"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
          <div
            /*Updated,Category*/ className="whitespace-nowrap text-sm justify-between font-bold sm:absolute sm:top-1.5 sm:right-2 sm:text-xs"
          >
            <div>{meta.updatedAt}</div>
            <div className="font-bold">{meta.category.name}</div>
          </div>
        </div>
        <h3 className="font-bold line-clamp-2 sm:text-base mt-4">
          {meta.title}
        </h3>
      </div>
    </div>
  );
};
