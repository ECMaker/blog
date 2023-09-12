import type { GetStaticPaths, InferGetStaticPropsType, NextPage } from 'next';
import type {
  NotionBlockObjectResponse,
  NotionPageObjectResponse,
  NotionPost,
  NotionRichTextItemRequest,
} from '~/types/notion';

import { ArticleJsonLd, NextSeo } from 'next-seo';

import { useComments } from '~/hooks/apiHooks/useComments';
import dummy_notion_pages_array from '~/mocks/notion_pages_array.json';
import dummy_notion_post from '~/mocks/notion_post.json';
import { getChildrenAllInBlock } from '~/server/notion/blocks';
import { getAllPosts } from '~/server/notion/getAllPosts';
import { getPage } from '~/server/notion/pages';
import { saveToAlgolia } from '~/server/utils/algolia';
import { setOgp } from '~/server/utils/ogp';
import { PostDetailTemplate } from '~/templates/PostDetailTemplate';
import { toMetaDescription, toPostMeta } from '~/utils/meta';

type Params = {
  slug: string;
  page_id: string;
};

export const getStaticProps = async (context: { params: Params }) => {
  if (process.env.ENVIRONMENT === 'local') {
    return {
      props: {
        post: dummy_notion_post as NotionPost,
      },
    };
  }

  const allPosts = await getAllPosts();
  const targetPost = allPosts.find((v) => v.slug === context.params.page_id);
  if (!targetPost) return { notFound: true };
  const page_id = targetPost.id;

  const page = (await getPage(page_id)) as NotionPageObjectResponse;
  const children = (await getChildrenAllInBlock(
    page_id
  )) as NotionBlockObjectResponse[];

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

type Params2 = {
  page_id: string;
};

export const getStaticPaths: GetStaticPaths<Params2> = async () => {
  if (process.env.ENVIRONMENT === 'local') {
    const posts = dummy_notion_pages_array.flat() as NotionPageObjectResponse[];
    const paths = posts.map(({ id }) => ({ params: { page_id: id } }));

    return {
      paths,//本番環境はslugに変更したが、local環境はidのまま変更していない。
      fallback: 'blocking', // HTMLを生成しない
    };
  }
  const posts = await getAllPosts();
  const paths = posts.map(({ slug }) => ({ params: {page_id: slug}})); // !U page_idではなく slug にするべき。

  return {
    paths,
    fallback: 'blocking', // HTMLを生成しない
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Post: NextPage<Props> = ({ post }) => {
  const { data: comments, trigger } = useComments(post.id);

  const handleCommentSubmit = async (
    rich_text: NotionRichTextItemRequest[]
  ) => {
    await trigger({
      parent: {
        page_id: post.id,
      },
      rich_text,
    });
  };

  return (
    <>
      <PostDetailTemplate
        post={post}
        comments={comments}
        onSubmit={handleCommentSubmit}
      />

      {/* meta seo */}
      <NextSeo
        title={`${post.title} | noblog`}
        description={post.description}
        openGraph={{
          url: `https://www.nbr41.com/posts/${post.id}`,
          title: `${post.title} | noblog`,
          description: post.description,
          images: [
            {
              url: `https://www.nbr41.com/api/notion-blog/og?title=${post.title}`,
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
        url={`https://www.nbr41.com/posts/${post.id}`}
        title={`${post.title} | noblog`}
        images={[
          `https://www.nbr41.com/api/notion-blog/og?title=${post.title}`,
        ]}
        datePublished="2015-02-05T08:00:00+08:00"
        dateModified={post.updatedAt}
        authorName={[
          {
            name: 'Nobuyuki Kobayashi',
            url: 'https://www.nbr41.com',
          },
        ]}
        description={post?.description || ''}
        isAccessibleForFree={true}
      />
    </>
  );
};

export default Post;
