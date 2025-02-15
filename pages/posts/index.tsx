import type { InferGetStaticPropsType, NextPage } from 'next';
import type {
  NotionDatabaseProperty,
  NotionPageObjectResponse,
} from '~/types/notion';

import { ArticleJsonLd, NextSeo } from 'next-seo';
import useSWR from 'swr';

import dummy_notion_database_properties from '~/mocks/notion_database_properties.json';
import dummy_notion_pages_array from '~/mocks/notion_pages_array.json';
import { getDatabase, getDatabaseContentsAll } from '~/server/notion/databases';
import { blogDatabaseId } from '~/server/notion/ids';
import { PostsTemplate } from '~/templates/PostsTemplate';
import { includeExpiredArrayImages, reFetchArrayPages } from '~/utils/expiredImage';

export const getStaticProps = async () => {
  if (process.env.ENVIRONMENT === 'local') {
    return {
      props: {
        postsArray: dummy_notion_pages_array as NotionPageObjectResponse[][],
        properties: dummy_notion_database_properties as NotionDatabaseProperty,
      },
    };
  }

  const { properties } = await getDatabase(blogDatabaseId);
  const postsArray = (await getDatabaseContentsAll({
    database_id: blogDatabaseId,
    page_size: 12,
    filter: {
      property: 'Published',
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: 'UpdatedAt',
        direction: 'descending',
      },
    ],
  })) as NotionPageObjectResponse[][];

  return {
    props: {
      postsArray,
      properties,
    },
    revalidate: 60, //[s] added ISR.
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const PostIndex: NextPage<Props> = ({ postsArray, properties }) => {
  const { data: postImgUpdArray} = useSWR(includeExpiredArrayImages(postsArray) && postsArray, reFetchArrayPages, { fallbackData: postsArray })

  return (
    <>
      <PostsTemplate postsArray={postImgUpdArray} properties={properties} />
      {/* meta seo */}
      <NextSeo
        title="Blog | EC maker"
        openGraph={{
          url: 'https://blog.ec-maker.com/posts/',
        }}
      />
      <ArticleJsonLd
        type="BlogPosting"
        title="Blog | EC maker"
        url="https://blog.ec-maker.com/posts/"
        images={['https://blog.ec-maker.com/ECmaker.gif']}
        datePublished="2015-02-05T08:00:00+08:00"
        dateModified={postImgUpdArray[0][0].last_edited_time}
        authorName="Nobuyuki Kobayashi"
        description="Notionに追加した記事一覧"
      />
    </>
  );
};

export default PostIndex;
