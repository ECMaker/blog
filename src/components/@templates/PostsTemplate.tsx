import type { FC } from 'react';
import type { ViewControl } from '~/types/form';
import type {
  NotionBlogPropertiesWithCount,
  NotionDatabaseProperty,
  NotionPageObjectResponse,
} from '~/types/notion';

import { Pagination } from '@mantine/core';
import { usePagination } from '@mantine/hooks';
import { useMemo, useState, useEffect, useRef } from 'react';

import { PageTitle } from '~/commons/PageTitle';
import { PostsViewControl } from '~/components/features/notionBlog/PostsViewControl';
import { PostGrid } from '~/features/notionBlog/PostGrid';
import { PostList } from '~/features/notionBlog/PostList';
import {
  getControlledPosts,
  getPropertiesWithCount,
} from '~/utils/postsControl';

type Props = {
  postsArray: NotionPageObjectResponse[][];
  properties: NotionDatabaseProperty;
};

export const PostsTemplate: FC<Props> = ({ postsArray, properties }) => {
  const [viewControlValue, setViewControlValue] = useState<ViewControl>({
    type: 'grid',
    categoryId: '',
    tagIds: [],
  });
  const flatPosts = useMemo(() => postsArray.flat(), [postsArray]);

  const controlledPostsArray = useMemo(() => {
    const filteredPosts = getControlledPosts(flatPosts, viewControlValue);

    const chunkedPosts = filteredPosts.reduce((acc, post, index) => {
      const chunkIndex = Math.floor(index / 12);
      if (!acc[chunkIndex]) {
        acc[chunkIndex] = [];
      }
      acc[chunkIndex].push(post);

      return acc;
    }, [] as NotionPageObjectResponse[][]);

    return chunkedPosts.length > 0 ? chunkedPosts : [[]];
  }, [flatPosts, viewControlValue]);

  const totalPage = useMemo(
    () => controlledPostsArray.length,
    [controlledPostsArray],
  );

  const pagination = usePagination({
    total: totalPage,
    initialPage: 1,
  });

  const isInitialMount = useRef(true);

  // ページネーションの状態をsessionStorageから復元
  useEffect(() => {
    if (isInitialMount.current) {
      const savedPage = sessionStorage.getItem('currentPage');
      if (savedPage) {
        pagination.setPage(Number(savedPage));
      }
      isInitialMount.current = false;
    }
  }, [pagination]);

  // ページネーションの状態をsessionStorageに保存
  useEffect(() => {
    if (!isInitialMount.current) {
      sessionStorage.setItem('currentPage', String(pagination.active));
    }
  }, [pagination.active]);

  const controlledCurrentPosts = useMemo(
    () => controlledPostsArray[pagination.active - 1],
    [controlledPostsArray, pagination.active],
  );

  const blogPropertiesWithCount: NotionBlogPropertiesWithCount = useMemo(
    () => getPropertiesWithCount(properties, flatPosts),
    [flatPosts, properties],
  );

  return (
    <div className="px-6 sp:px-0">
      <PageTitle title="Notion Blogs" />

      <div className="mx-auto w-fit py-4">
        <Pagination
          page={pagination.active}
          total={totalPage}
          onChange={pagination.setPage}
        />
      </div>

      <div className="flex justify-center gap-6">
        <div className="w-main min-h-[840px]">
          {viewControlValue.type === 'list' && (
            <PostList posts={controlledCurrentPosts} />
          )}
          {viewControlValue.type === 'grid' && (
            <PostGrid posts={controlledCurrentPosts} />
          )}
        </div>

        <div className="w-aside">
          <div className="sticky top-4">
            <PostsViewControl
              properties={blogPropertiesWithCount}
              value={viewControlValue}
              onChange={setViewControlValue}
            />
          </div>
        </div>
      </div>

      <div className="mx-auto w-fit py-4">
        <Pagination
          page={pagination.active}
          total={totalPage}
          onChange={pagination.setPage}
        />
      </div>
    </div>
  );
};
