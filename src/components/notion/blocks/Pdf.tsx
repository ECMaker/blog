import type { PdfBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import type { BlockWithChildren } from '~/types/notion';

import Link from 'next/link';

type Props = {
  block: BlockWithChildren<PdfBlockObjectResponse>;
};

export const Pdf = ({ block: { pdf } }: Props) => {
  return (
    <div className="my-4 leading-8">
      <object
        data={pdf.type === 'file' ? pdf.file.url : pdf.external.url}
        type="application/pdf"
        className="h-auto w-full"
        aria-labelledby="PDF document"
      >
        <div>Your browser does not support PDFs.</div>
        <Link
          href={pdf.type === 'file' ? pdf.file.url : pdf.external.url}
          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
        >
          Download the PDF
        </Link>
      </object>
    </div>
  );
};
