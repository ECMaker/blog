import type { AudioBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import type { BlockWithChildren } from '~/types/notion';

import { useState, useEffect } from 'react';

type Props = {
  block: BlockWithChildren<AudioBlockObjectResponse>;
};

export const Audio = ({ block: { audio } }: Props) => {
  const [loaded, setLoaded] = useState(false);
  const [audioUrl, setAudioUrl] = useState(audio.type === 'file' ? audio.file.url : audio.external.url);

  useEffect(() => {
    const newUrl = audio.type === 'file' ? audio.file.url : audio.external.url;
    if (audioUrl !== newUrl) {
      setAudioUrl(newUrl);
      setLoaded(false); // URLが変わったら再度ローディングを開始
      // eslint-disable-next-line no-console
      console.log('!U Audio url', audioUrl);
    }
  }, [audio, audioUrl]);

  const handleLoadedData = () => {
    setLoaded(true);
  };



  return (
    <div className="my-4 flex flex-col items-center">
      {!loaded && <div className="text-gray-500">Loading audio...</div>}
      <audio controls className="w-full" onLoadedData={handleLoadedData}>
        <source src={audioUrl} type="audio/ogg" />
        <source src={audioUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      {audio.caption.length > 0 && (
        <figcaption className="text-xs text-gray-400 text-center mt-1">
          {audio.caption[0].plain_text}
        </figcaption>
      )}
    </div>
  );
};
