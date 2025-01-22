import type { FC } from 'react';
import type { NotionRichTextItemResponse } from '~/types/notion';

import { clsx } from '@mantine/core';

type Props = {
  text: Array<NotionRichTextItemResponse>;
  className?: string;
};

const codeAnnotationClasses =
  'bg-slate-900 rounded px-2 py-1 mx-1 font-mono text-teal-400';

const colorClasses = {
  gray: 'text-gray-500',
  brown: 'text-brown-500',
  orange: 'text-orange-500',
  yellow: 'text-yellow-500',
  green: 'text-green-500',
  blue: 'text-blue-500',
  purple: 'text-purple-500',
  pink: 'text-pink-500',
  red: 'text-red-500',
  default: 'text-black',
  gray_background: 'bg-gray-100',
  brown_background: 'bg-brown-100',
  orange_background: 'bg-orange-100',
  yellow_background: 'bg-yellow-100',
  green_background: 'bg-green-100',
  blue_background: 'bg-blue-100',
  purple_background: 'bg-purple-100',
  pink_background: 'bg-pink-100',
  red_background: 'bg-red-100',
};

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
            const { annotations } = textItem;
            const { color } = textItem.annotations;
            const { href } = textItem;
            const annotationClasses = Object.keys(annotations).filter(
              (param) =>
                annotations[param as keyof typeof annotations] === true,
            );
            const key = `${index}`;
            const colorClass = colorClasses[color] || colorClasses.default;
            if (href)
              return (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={clsx(
                    'transition-opacity hover:opacity-50',
                    colorClass,
                    className,
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
                    colorClass,
                    className,
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

            return <span key={key} className={clsx(colorClass, className)}>{textItem.plain_text}</span>;
          })}
        </>
      )}
    </p>
  );
};
