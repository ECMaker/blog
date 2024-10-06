import type { InferGetStaticPropsType, NextPage } from 'next';
import type { NotionPageObjectResponse } from '~/types/notion';

import { IndexTemplate } from '~/components/@templates/IndexTemplate';
import dummy_notion_pages_latest from '~/mocks/notion_pages_latest.json';
import { getDatabaseContents } from '~/server/notion/databases';

export const getStaticProps = async () => {
  if (process.env.ENVIRONMENT === 'local') {
    return {
      props: {
        posts:
          dummy_notion_pages_latest as unknown as NotionPageObjectResponse[],
      },
    };
  }

  const { results } = await getDatabaseContents({
    database_id: process.env.NOTION_DATABASE || '',
    page_size: 5,
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
  });

  return {
    props: {
      posts: results as NotionPageObjectResponse[],
    },
    revalidate: 1, //[s] added ISR.
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <>
      <IndexTemplate posts={posts} />
    </>
  );
};

export default Home;
