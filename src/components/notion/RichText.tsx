import type { FC } from 'react';
import type { NotionRichTextItemResponse } from '~/types/notion';

import { clsx } from '@mantine/core';

type Props = {
  text: Array<NotionRichTextItemResponse>;
  className?: string;
};

const codeAnnotationClasses =
  'bg-slate-900 rounded px-2 py-1 mx-2 font-mono text-teal-400';

/* Notion の Block Object内のrich_textの配列をいい感じに変換する */
export const RichText: FC<Props> = ({ text, className }) => {
  return (
    <p className={clsx("inline whitespace-pre-wrap break-words", className)}>
      {text.length === 0 ? (
        /* textがない場合が空白の改行を入れる */
        <span className="block h-6" />
      ) : (
        <>
          {text.map((textItem, index: number) => {
            const { annotations } = textItem; // アノテーションを取得
            const { color } = textItem.annotations; // アノテーションの色を取得
            const { href } = textItem; // リンクを取得
            const annotationClasses = Object.keys(annotations).filter(
              (param) =>
                annotations[param as keyof typeof annotations] === true,
            );
            const key = `${index}`;

            if (href)
              return (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={clsx(
                    'transition-opacity hover:opacity-50',
                    color !== 'default' && `notion-${color}`,
                    annotationClasses.includes('bold') && 'font-bold',
                    annotationClasses.includes('italic') && 'font-italic',
                    annotationClasses.includes('underline') && 'underline',
                    annotationClasses.includes('strikethrough') &&
                      'line-through',
                    annotationClasses.includes('code') && codeAnnotationClasses,
                  )}
                >
                  {textItem.plain_text}
                </a>
              );

            if (annotationClasses.length > 0)
              return (
                <span
                  key={key}
                  className={clsx(
                    '',
                    color !== 'default' && `notion-${color}`,
                    annotationClasses.includes('bold') && 'font-bold',
                    annotationClasses.includes('italic') && 'font-italic',
                    annotationClasses.includes('underline') && 'underline',
                    annotationClasses.includes('strikethrough') &&
                      'line-through',
                    annotationClasses.includes('code') && codeAnnotationClasses,
                  )}
                >
                  {textItem.plain_text}
                </span>
              );

            return textItem.plain_text;
          })}
        </>
      )}
    </p>
  );
};
