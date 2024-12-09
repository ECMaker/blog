import type { AudioBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import type { BlockWithChildren } from '~/types/notion';

import { useState, useEffect } from 'react';

type Props = {
  block: BlockWithChildren<AudioBlockObjectResponse>;
};

export const Audio = ({ block: { audio } }: Props) => {
  const caption = audio.caption.length > 0 ? audio.caption[0].plain_text : '';
  const [audioUrl, setAudioUrl] = useState(audio.type === 'file' ? audio.file.url : audio.external.url);

  useEffect(() => {
    setAudioUrl(audio.type === 'file' ? audio.file.url : audio.external.url);
  }, [audio]);


  return (
    <div className="my-4 flex flex-col items-center">
      <audio controls className="w-full">
        <source
          src={audioUrl}
          type="audio/ogg"
        />
        <source
          src={audioUrl}
          type="audio/mpeg"
        />
        Your browser does not support the audio element.
      </audio>
      {caption && (
        <figcaption className="text-xs text-gray-400 text-center mt-1">
          {caption}
        </figcaption>
      )}
    </div>
  );
};
