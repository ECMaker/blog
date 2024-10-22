import type { EmbedBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import type { BlockWithChildren } from '~/types/notion';

import { Facebook } from './embed/Facebook';
import { Instagram } from './embed/Instagram';
import { TikTok } from './embed/TikTok';
import { Twitter } from './embed/Twitter';

type Props = {
  block: BlockWithChildren<EmbedBlockObjectResponse>;
};

export const Embed = ({ block }: Props) => {
  const { url } = block.embed;
  const caption = block.embed.caption.length > 0 ? block.embed.caption[0].plain_text : ''; 

  if (url.includes('instagram.com')) return <Instagram url={url} caption={caption} />;
  if (url.includes('facebook.com'))  return <Facebook  url={url} caption={caption} />;
  if (url.includes('twitter.com'))   return <Twitter   url={url} caption={caption} />;
  if (url.includes('x.com'))         return <Twitter   url={url} caption={caption} />;
  if (url.includes('tiktok.com'))    return <TikTok    url={url} caption={caption} />;

  return (
    <div className="my-5 text-center">
      <iframe
        src={url}
        height={500}
        className="w-full overflow-hidden"
      ></iframe>
      {caption && (
        <figcaption className="text-xs text-gray-400 text-center">
          {caption}
        </figcaption>
      )}
    </div>
  );
};
