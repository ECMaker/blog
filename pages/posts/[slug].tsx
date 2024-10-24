import type { GetStaticPaths, InferGetStaticPropsType, NextPage } from 'next';
import type {
  ExpandedBlockObjectResponse,
  NotionPageObjectResponse,
  NotionPostMeta,
  NotionRichTextItemRequest,
} from '~/types/notion';

import { ArticleJsonLd, NextSeo } from 'next-seo';

import { useComments } from '~/hooks/apiHooks/useComments';
import { getAllBlocks } from '~/server/notion/getAllBlocks';
import { getAllPosts } from '~/server/notion/getAllPosts';
import { getPage } from '~/server/notion/pages';
import { saveToAlgolia } from '~/server/utils/algolia';
import { setOgp } from '~/server/utils/ogp';
import { PostDetailTemplate } from '~/templates/PostDetailTemplate';
import { toMetaDescription, toPostMeta } from '~/utils/meta';

type Params = {
  slug: string;
};

let allPostsCache: NotionPostMeta[] | null = null;

export const getStaticProps = async (context: { params: Params }) => {
  if (!allPostsCache) {
    allPostsCache = await getAllPosts();
  }
  const targetPost = allPostsCache.find((v) => v.slug === context.params.slug);
  
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
    revalidate: 1, //[s] added ISR.
  };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  if (!allPostsCache) {
    allPostsCache = await getAllPosts();
  }
  const paths = allPostsCache.map(({ slug }) => ({ params: {slug: slug}}));
  
  return {
    paths,
    fallback: 'blocking', // HTMLを生成しない
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Post: NextPage<Props> = ({ post }) => {
  const { data: comments, trigger } = useComments(post.id);

  const handleCommentSubmit = async (
    rich_text: NotionRichTextItemRequest[],
  ) => {
    await trigger({
      parent: {
        page_id: post.id,
      },
      rich_text,
    });
  };

  let imageUrl;
  if (post.image === '/logos/900^2_tomei_textBlack.gif') {
    imageUrl = `https://blog.ec-maker.com/api/notion-blog/og?title=${post.title}`;
  } else {
    imageUrl = post.image;
  }

  return (
    <>
      <PostDetailTemplate
        post={post}
        comments={comments}
        onSubmit={handleCommentSubmit}
      />

      {/* meta seo */}
      <NextSeo
        title={`${post.title} | EC maker`}
        description={post.description}
        openGraph={{
          url: `https://blog.ec-maker.com/posts/${post.slug}`,
          title: `${post.title} | EC maker`,
          description: post.description,
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
        url={`https://blog.ec-maker.com/posts/${post.slug}`}
        title={`${post.title} | EC maker`}
        images={[imageUrl]}
        datePublished="2015-02-05T08:00:00+08:00"
        dateModified={post.updatedAt}
        authorName={[
          {
            name: 'EC maker',
            url: 'https://blog.ec-maker.com',
          },
        ]}
        description={post?.description || ''}
        isAccessibleForFree={true}
      />
    </>
  );
};

export default Post;
