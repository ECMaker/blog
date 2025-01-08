import type { PdfBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import type { BlockWithChildren } from '~/types/notion';

import Link from 'next/link';
import { useState, useEffect } from 'react';

type Props = {
  block: BlockWithChildren<PdfBlockObjectResponse>;
};

export const Pdf = ({ block: { pdf } }: Props) => {
  const caption = pdf.caption.length > 0 ? pdf.caption[0].plain_text : '';
  const [loaded, setLoaded] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(
    pdf.type === 'file' ? pdf.file.url : pdf.external.url
  );

  useEffect(() => {
    const newUrl = pdf.type === 'file' ? pdf.file.url : pdf.external.url;
    if (pdfUrl !== newUrl) {
      setPdfUrl(newUrl);
      setLoaded(false); // URLが変わったら再度ローディングを開始
    }
  }, [pdf, pdfUrl]);

  const handleLoad = () => {
    setLoaded(true);
  };

  return (
    <div className="my-4 leading-8 flex flex-col items-center">
      {!loaded && <div className="text-gray-500">Loading PDF...</div>}
      <object
        key={pdfUrl} // URLが変わったときにobject要素を再レンダリング
        data={pdfUrl}
        type="application/pdf"
        className="w-full max-w-[700px] sm:max-w-[450px] h-auto min-h-[500px]"
        aria-labelledby="PDF document"
        onLoad={handleLoad}
      >
        <div>Your browser does not support PDFs.</div>
        <Link
          href={pdfUrl}
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
