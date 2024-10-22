import type { AudioBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import type { BlockWithChildren } from '~/types/notion';

type Props = {
  block: BlockWithChildren<AudioBlockObjectResponse>;
};

export const Audio = ({ block: { audio } }: Props) => {
  const caption = audio.caption.length > 0 ? audio.caption[0].plain_text : '';

  return (
    <div className="my-4 flex flex-col items-center">
      <audio controls className="w-full">
        <source
          src={audio.type === 'file' ? audio.file.url : audio.external.url}
          type="audio/ogg"
        />
        <source
          src={audio.type === 'file' ? audio.file.url : audio.external.url}
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
