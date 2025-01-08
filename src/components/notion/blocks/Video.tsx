import type { VideoBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import type { BlockWithChildren } from '~/types/notion';

import { useState, useEffect } from 'react';

import { Facebook } from './embed/Facebook';
import { YouTube } from './embed/YouTube';

type Props = {
  block: BlockWithChildren<VideoBlockObjectResponse>;
};

export const Video = ({ block }: Props) => {
  const caption = block.video.caption.length > 0 ? block.video.caption[0].plain_text : '';
  const [loaded, setLoaded] = useState(false);
  const [videoUrl, setVideoUrl] = useState(
    block.video.type === 'file' ? block.video.file.url : block.video.external.url
  );

  useEffect(() => {
    const newUrl = block.video.type === 'file' ? block.video.file.url : block.video.external.url;
    if (videoUrl !== newUrl) {
      setVideoUrl(newUrl);
      setLoaded(false); // URLが変わったら再度ローディングを開始
    }
  }, [block.video, videoUrl]);

  const handleLoadedData = () => {
    setLoaded(true);
  };

  if (block.video.type === 'file') {
    return (
      <div className="my-5 flex flex-col text-center justify-center items-center">
        {!loaded && <div className="text-gray-500">Loading video...</div>}
        <video
          key={videoUrl} // URLが変わったときにvideo要素を再レンダリング
          controls
          className="w-full max-h-[400px] max-w-[550px]"
          onLoadedData={handleLoadedData}
        >
          <source src={videoUrl} type="video/mp4" />
          <source src={videoUrl} type="video/ogg" />
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
    if (url.includes('youtu.be') || url.includes('youtube.com')) {
      return <YouTube key={url} url={url} caption={caption} />; // URLが変わったときにYouTubeコンポーネントを再レンダリング
    }
    if (url.includes('facebook') || url.includes('fb.watch')) {
      return <Facebook key={url} url={url} caption={caption} />; // URLが変わったときにFacebookコンポーネントを再レンダリング
    }

    return (
      <div className="my-5 flex flex-col text-center justify-center items-center">
        {!loaded && <div className="text-gray-500">Loading video...</div>}
        <video
          key={videoUrl} // URLが変わったときにvideo要素を再レンダリング
          controls
          className="w-full max-h-[400px] max-w-[550px]"
          onLoadedData={handleLoadedData}
        >
          <source src={videoUrl} />
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
