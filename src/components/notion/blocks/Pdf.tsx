import type { PdfBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import type { BlockWithChildren } from '~/types/notion';

import Link from 'next/link';

type Props = {
  block: BlockWithChildren<PdfBlockObjectResponse>;
};

export const Pdf = ({ block: { pdf } }: Props) => {
  const caption = pdf.caption.length > 0 ? pdf.caption[0].plain_text : '';

  return (
    <div className="my-4 leading-8 flex flex-col items-center">
      <object
        data={pdf.type === 'file' ? pdf.file.url : pdf.external.url}
        type="application/pdf"
        className="w-full max-w-[700px] sm:max-w-[450px] h-auto min-h-[500px]"
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
      {caption && (
        <figcaption className="text-xs text-gray-400 text-center mt-1">
          {caption}
        </figcaption>
      )}
    </div>
  );
};
