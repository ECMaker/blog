import type { ExpandedBlockObjectResponse } from '~/types/notion';

import { StopIcon } from '~/commons/icons';
import { LinkPreview } from '~/components/notion/blocks/LinkPreview';

import { Audio } from './blocks/Audio';
import { Bookmark } from './blocks/Bookmark';
import { BulletedList } from './blocks/BulletedList';
import { BulletedListItem } from './blocks/BulletedListItem';
import { Callout } from './blocks/Callout';
import { Code } from './blocks/Code';
import { Column } from './blocks/Column';
import { ColumnList } from './blocks/ColumnList';
import { Divider } from './blocks/Divider';
import { Embed } from './blocks/Embed';
import { File } from './blocks/File';
import { Heading1 } from './blocks/Heading1';
import { Heading2 } from './blocks/Heading2';
import { Heading3 } from './blocks/Heading3';
import { Image } from './blocks/Image';
import { NumberedList } from './blocks/NumberedList';
import { NumberedListItem } from './blocks/NumberedListItem';
import { Paragraph } from './blocks/Paragraph';
import { Pdf } from './blocks/Pdf';
import { Quote } from './blocks/Quote';
import { Table } from './blocks/Table';
import { ToDo } from './blocks/ToDo';
import { ToDoList } from './blocks/ToDoList';
import { Toggle } from './blocks/Toggle';
import { Video } from './blocks/Video';



export const blockToJsx = (block: ExpandedBlockObjectResponse) => {
  const blockType = block.type;

  switch (blockType) {
    case 'audio':
      return <Audio block={block} />;
    case 'paragraph':
      return <Paragraph block={block} />;
    case 'heading_1':
      return <Heading1 block={block} />;
    case 'heading_2':
      return <Heading2 block={block} />;
    case 'heading_3':
      return <Heading3 block={block} />;
    case 'callout':
      return <Callout block={block} />;
    case 'column':
      return <Column block={block} />;
    case 'column_list':
      return <ColumnList block={block} />;
    case 'embed':
      return <Embed block={block} />;
    case 'file':
      return <File block={block} />;
    case 'bulleted_list':
      return <BulletedList block={block} />;
    case 'bulleted_list_item':
      return <BulletedListItem block={block} />;
    case 'numbered_list':
      return <NumberedList block={block} />;
    case 'numbered_list_item':
      return <NumberedListItem block={block} />;
    case 'to_do':
      return <ToDo block={block} />;
    case 'code':
      return <Code block={block} />;
    case 'quote':
      return <Quote block={block} />;
    case 'bookmark':
      return <Bookmark block={block} />;
    case 'link_preview':
      return <LinkPreview block={block} />;
    case 'image':
      // eslint-disable-next-line jsx-a11y/alt-text
      return <Image block={block} />;
    case 'divider':
      return <Divider />;
    case 'pdf':
      return <Pdf block={block} />;
    case 'quote':
      return <Quote block={block} />;
    case 'table':
      return <Table block={block} />;
    case 'to_do':
      return <ToDo block={block} />;
    case 'to_do_list':
      return <ToDoList block={block} />;
    case 'toggle':
      return <Toggle block={block} />;
    case 'video':
      return <Video block={block} />;
    case 'table_of_contents':
      return null;
    default:
      return (
        <div className='my-6 flex items-center justify-center gap-4 rounded-lg bg-slate-200 p-4 sp:flex-col sp:text-center'>
          <StopIcon size={40} />
          <div className='sp:text-sm'>
            <div>ここで、対応していない NotionのBlockが使用されています。</div>
            <div className='mt-2 font-firaCode'>
              Not supported:
              {blockType
                ? ` '${blockType}' type is not supported.`
                : 'Unsupported at Notion API.'}
            </div>
          </div>
        </div>
      );
  }
};
