import type { VideoBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import type { BlockWithChildren } from '~/types/notion';

import { useState } from 'react';

import { Facebook } from './embed/Facebook';
import { YouTube } from './embed/YouTube';

type Props = {
  block: BlockWithChildren<VideoBlockObjectResponse>;
};

export const Video = ({ block }: Props) => {
  const caption = block.video.caption.length > 0 ? block.video.caption[0].plain_text : '';
  const [loaded, setLoaded] = useState(false);

  const handleLoadedData = () => {
    setLoaded(true);
  };

  if (block.video.type === 'file') {
    return (
      <div className="my-5 flex flex-col text-center justify-center items-center">
        {!loaded && <div className="text-gray-500">Loading video...</div>}
        <video controls className="w-full max-h-[400px] max-w-[550px]" onLoadedData={handleLoadedData}>
          <source src={block.video.file.url} type="video/mp4" />
          <source src={block.video.file.url} type="video/ogg" />
          Your browser does not support the video tag.
        </video>
        {caption && (
          <figcaption className="text-xs text-gray-400 text-center mt-1">
            {caption}
          </figcaption>
        )}
      </div>
    );
  } else if (block.video.type === 'external') {
    const { url } = block.video.external;
    if (url.includes('youtu.be') || url.includes('youtube.com'))
      return <YouTube url={url} caption={caption} />;
    if (url.includes('facebook') || url.includes('fb.watch'))
      return <Facebook url={url} caption={caption} />;

    return (
      <div className="my-5 flex flex-col text-center justify-center items-center">
        {!loaded && <div className="text-gray-500">Loading video...</div>}
        <video controls className="w-full max-h-[400px] max-w-[550px]" onLoadedData={handleLoadedData}>
          <source src={block.video.external.url} />
        </video>
        {caption && (
          <figcaption className="text-xs text-gray-400 text-center mt-1">
            {caption}
          </figcaption>
        )}
      </div>
    );
  }

  return null;
};
