import type { GetStaticPaths, InferGetStaticPropsType, NextPage } from 'next';
import type {
  ExpandedBlockObjectResponse,
  NotionPageObjectResponse,
  NotionPost,
  NotionPostMeta,
  NotionRichTextItemRequest,
} from '~/types/notion';

import { ArticleJsonLd, NextSeo } from 'next-seo';

import { useComments } from '~/hooks/apiHooks/useComments';
import { useExpiredImg } from '~/hooks/apiHooks/useExpiredImg';
import dummy_notion_pages_array from '~/mocks/notion_pages_array.json';
import dummy_notion_post from '~/mocks/notion_post.json';
import dummy_notion_post_blockPreview from '~/mocks/notion_post_previewBlocks.json';
import { getAllBlocks } from '~/server/notion/getAllBlocks';
import { getAllPosts } from '~/server/notion/getAllPosts';
import { getPage } from '~/server/notion/pages';
import { saveToAlgolia } from '~/server/utils/algolia';
import { setOgp } from '~/server/utils/ogp';
import { PostDetailTemplate } from '~/templates/PostDetailTemplate';
import { toPostMeta, toMetaDescription } from '~/utils/meta';

type Params = {
  slug: string;
};

let allPostsCache: NotionPostMeta[] | null = null;

export const getStaticProps = async (context: { params: Params }) => {
  if (process.env.ENVIRONMENT === 'local') {
    const debugPost = true; // true: normal, false: blockPreview

    return {
      props: {
        post: debugPost ? dummy_notion_post as NotionPost : dummy_notion_post_blockPreview as NotionPost,
      },
    };
  }

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
    revalidate: 60, //[s] added ISR.
  };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  if (process.env.ENVIRONMENT === 'local') {
    const posts = dummy_notion_pages_array.flat() as unknown as NotionPostMeta[];
    const paths = posts.map(({ slug }) => ({ params: { slug: slug } }));
    const validPaths = paths.filter(path => typeof path.params.slug === 'string');

    return {
      paths: validPaths,
      fallback: 'blocking', // HTMLを生成しない
    };
  }

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

  // eslint-disable-next-line no-console
  console.log("!U post", post);
  const { data: postImgUpdated } = useExpiredImg(post);
  // eslint-disable-next-line no-console
  console.log("!U postImgUpdated", postImgUpdated);
  
  const { data: comments, trigger } = useComments(postImgUpdated.id);
  const handleCommentSubmit = async (
    rich_text: NotionRichTextItemRequest[],
  ) => {
    await trigger({
      parent: {
        page_id: postImgUpdated.id,
      },
      rich_text,
    });
  };

  let imageUrl;
  if (postImgUpdated.image === '/logos/900^2_tomei_textBlack.gif') {
    imageUrl = `https://blog.ec-maker.com/api/notion-blog/og?title=${postImgUpdated.title}`;
  } else {
    imageUrl = postImgUpdated.image;
  }

  return (
    <>
      <PostDetailTemplate
        post={postImgUpdated}
        comments={comments}
        onSubmit={handleCommentSubmit}
      />

      {/* meta seo */}
      <NextSeo
        title={`${postImgUpdated.title} | EC maker`}
        description={postImgUpdated.description}
        openGraph={{
          url: `https://blog.ec-maker.com/posts/${postImgUpdated.slug}`,
          title: `${postImgUpdated.title} | EC maker`,
          description: postImgUpdated.description,
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
        url={`https://blog.ec-maker.com/posts/${postImgUpdated.slug}`}
        title={`${postImgUpdated.title} | EC maker`}
        images={[imageUrl]}
        datePublished="2015-02-05T08:00:00+08:00"
        dateModified={postImgUpdated.updatedAt}
        authorName={[
          {
            name: 'EC maker',
            url: 'https://blog.ec-maker.com',
          },
        ]}
        description={postImgUpdated?.description || ''}
        isAccessibleForFree={true}
      />
    </>
  );
};

export default Post;
