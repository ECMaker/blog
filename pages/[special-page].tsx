import type { GetStaticPaths, InferGetStaticPropsType, NextPage } from 'next';
import type { ExpandedBlockObjectResponse, NotionPageObjectResponse, NotionPost, NotionPostMeta } from '~/types/notion';

import { ArticleJsonLd, NextSeo } from 'next-seo';

import { useExpiredFile } from '~/hooks/apiHooks/useExpiredFile';
import dummy_notion_about_post from '~/mocks/notion_about_post.json';
import dummy_notion_special_pages_array from '~/mocks/notion_special-pages_array.json';
import { getAllBlocks } from '~/server/notion/getAllBlocks';
import { getAllPosts } from '~/server/notion/getAllPosts';
import { getPage } from '~/server/notion/pages';
import { saveToAlgolia } from '~/server/utils/algolia';
import { setOgp } from '~/server/utils/ogp';
import { ProfileTemplate } from '~/templates/ProfileTemplate';
import { toPostMeta, toMetaDescription } from '~/utils/meta';

type Params = {
  'special-page': string;
};

let allPostsCache: NotionPostMeta[] | null = null;
export const getStaticProps = async (context: { params: Params }) => {
  if (process.env.ENVIRONMENT === 'local') {
    return {
      props: {
        post: dummy_notion_about_post as NotionPost,
      },
    };
  }

  const specialPageId = process.env.NOTION_PROFILE_PAGE_ID || '';

  if (!allPostsCache) {
    allPostsCache = await getAllPosts(specialPageId);
  }
  const targetPost = allPostsCache.find((v) => v.slug === context.params['special-page']);
  if (!targetPost) return { notFound: true };
  const page_id = targetPost.id;
  const page = (await getPage(page_id)) as NotionPageObjectResponse;
  const children = (await getAllBlocks(page_id)) as ExpandedBlockObjectResponse[];
  const childrenWithOgp = await setOgp(children);

  const post = {
    ...toPostMeta(page),
    description: toMetaDescription(children),
    children: childrenWithOgp,
  };

  await saveToAlgolia(post);

  return {
    props: {
      post,
    },
    revalidate: 60, //[s] added ISR.
  };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  if (process.env.ENVIRONMENT === 'local') {
    const posts = dummy_notion_special_pages_array.flat() as unknown as NotionPostMeta[];
    const paths = posts.map(({ slug }) => ({ params: { 'special-page': slug } }));
    const validPaths = paths.filter(path => typeof path.params['special-page'] === 'string');

    return {
      paths: validPaths,
      fallback: 'blocking', // HTMLを生成しない
    };
  }
  const specialPageId = process.env.NOTION_PROFILE_PAGE_ID || '';

  if (!allPostsCache) {
    allPostsCache = await getAllPosts(specialPageId);
  }
  const paths = allPostsCache.map(({ slug }) => ({ params: { 'special-page': slug } }));

  return {
    paths,
    fallback: 'blocking',
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Post: NextPage<Props> = ({ post }) => {
  const { data: postMediaUpdated } = useExpiredFile(post);  

  let imageUrl;
  if (postMediaUpdated.image === '/logos/900^2_tomei_textBlack.gif') {
    imageUrl = `https://blog.ec-maker.com/api/notion-blog/og?title=${postMediaUpdated.title}`;
  } else {
    imageUrl = postMediaUpdated.image;
  }

  return (
    <>
      <ProfileTemplate post={post} />

      {/* meta seo */}
      <NextSeo
        title={`${postMediaUpdated.title} | EC maker`}
        description={postMediaUpdated.description}
        openGraph={{
          url: `https://blog.ec-maker.com/${postMediaUpdated.slug}`,
          title: `${postMediaUpdated.title} | EC maker`,
          description: postMediaUpdated.description,
          images: [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: 'Site Image',
              type: 'image/png',
            },
          ],
        }}
      />
      <ArticleJsonLd
        type="BlogPosting"
        url={`https://blog.ec-maker.com/${postMediaUpdated.slug}`}
        title={`${postMediaUpdated.title} | EC maker`}
        images={[imageUrl]}
        datePublished={postMediaUpdated.createdAt}
        dateModified={postMediaUpdated.updatedAt}
        authorName={[
          {
            name: 'EC maker',
            url: 'https://blog.ec-maker.com',
          },
        ]}
        description={postMediaUpdated?.description || ''}
        isAccessibleForFree={true}
      />
    </>
  );
};

export default Post;
