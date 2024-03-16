import type {
  BlockObjectResponse,
  CommentObjectResponse,
  CreateCommentParameters,
  DatabaseObjectResponse,
  ListCommentsResponse,
  PageObjectResponse,
  RichTextItemResponse,
  BulletedListItemBlockObjectResponse,
  NumberedListItemBlockObjectResponse,
  ToDoBlockObjectResponse
} from '@notionhq/client/build/src/api-endpoints';

/* Replace */
export type NotionDatabaseObjectResponse = DatabaseObjectResponse;
export type NotionPageObjectResponse = PageObjectResponse;
export type NotionBlockObjectResponse = BlockObjectResponse;
export type NotionListCommentsResponse = ListCommentsResponse;
export type NotionCommentObjectResponse = CommentObjectResponse;
export type NotionRichTextItemResponse = RichTextItemResponse;
export type NotionCreateCommentParameters = CreateCommentParameters; // Request only

/* Extract */
export type NotionDatabaseProperty = NotionDatabaseObjectResponse['properties'];
export type NotionDatabasePropertyConfigResponse =
  NotionDatabaseObjectResponse['properties'][string];
export type NotionSelectPropertyResponse = Extract<
  NotionDatabasePropertyConfigResponse,
  { type: 'select' }
>['select']['options'][number];
export type NotionSelectColor = NotionSelectPropertyResponse['color'];
export type NotionRichTextItemRequest =
  CreateCommentParameters['rich_text'][number]; // Request only

/* Custom */
export type NotionPostMeta = {
  id: string;
  icon: string;
  title: string;
  description?: string;
  category: NotionSelectPropertyResponse;
  createdAt: string;
  updatedAt: string;
  tags: NotionSelectPropertyResponse[];
  likes: number;
  slug: string;
};
export type NotionPost = NotionPostMeta & {
  children: NotionBlockObjectResponse[];
};
export type NotionBlogProperties = {
  categories: NotionSelectPropertyResponse[];
  tags: NotionSelectPropertyResponse[];
};
export type NotionBlogPropertiesWithCount = {
  categories: (NotionSelectPropertyResponse & { count: number })[];
  tags: (NotionSelectPropertyResponse & { count: number })[];
};

export type BulletedListBlockObjectResponse = {
  id: string;
  type: "bulleted_list";
  bulleted_list: {
    children: Array<BulletedListItemBlockObjectResponse>;
  };
};

export type NumberedListBlockObjectResponse = {
  id: string;
  type: "numbered_list";
  numbered_list: {
    children: Array<NumberedListItemBlockObjectResponse>;
  };
};

export type ToDoListBlockObjectResponse = {
  id: string;
  type: "to_do_list";
  to_do_list: {
    children: Array<ToDoBlockObjectResponse>;
  };
};

export type ExpandedBlockObjectResponse =
  | ({
      children?: ExpandedBlockObjectResponse[];
    } & BlockObjectResponse)
  | BulletedListBlockObjectResponse
  | NumberedListBlockObjectResponse
  | ToDoListBlockObjectResponse;

export type BlockWithChildren<P = unknown> = P & {
  children?: ExpandedBlockObjectResponse[];
};
