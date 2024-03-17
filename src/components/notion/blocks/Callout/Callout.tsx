import type { CalloutBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import type { BlockWithChildren } from "~/types/notion";

import { useMemo } from 'react';

import { SpeechBubble } from '~/components/notion/blocks/SpeechBubble';
import { RichText } from '~/components/notion/RichText';

type Props = {
  block: BlockWithChildren<CalloutBlockObjectResponse>;
};

export const Callout = ({ block }: Props) => {
  const emoji = useMemo(() => {
    if (!!block.callout.icon && block.callout.icon.type === 'emoji')
      return block.callout.icon.emoji;

    return '📣';
  }, [block.callout.icon]);

  if (block.callout.icon?.type === "emoji") {
    const isRam = block.callout.icon.emoji === "🐏";
    const isGorilla = block.callout.icon.emoji === "🦍";
    if (isRam || isGorilla)
      return (
        <div className="my-4">
          <SpeechBubble
            iconImageSrc={isRam ? "/images/ram.png" : "/images/gorilla.png"}
            isReverse={isGorilla}
          >
            <RichText text={block.callout.rich_text} />
          </SpeechBubble>
        </div>
      );
  }

  return (
    <div className="flex items-center gap-4 rounded border border-solid border-slate-300 p-4 shadow">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200">
        {emoji}
      </div>
      <div className="sp:text-sm">
        <RichText text={block.callout.rich_text} />
      </div>
    </div>
  );
};
