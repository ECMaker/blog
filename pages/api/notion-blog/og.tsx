import type { NextRequest } from 'next/server';

import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};
const fontBallo = fetch(
  new URL('../../../src/styles/Baloo-Regular.ttf', import.meta.url),
).then((res) => res.arrayBuffer());

export default async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const fontBalooData = await fontBallo;

  const hasTitle = searchParams.has('title');
  const title = hasTitle ? searchParams.get('title')?.slice(0, 50) : '';

  return new ImageResponse(
    (
      <div tw="relative flex h-full w-full flex-col flex-wrap items-center justify-center bg-gray-200 text-slate-800">
        {title ? (
          <div tw="absolute top-50 left-15 tw-[1000px] whitespace-pre-wrap text-[72px] font-bold mx-auto">
            {title}
          </div>
        ) : (
          <div tw="text-[140px]">EC maker</div>
        )}
        {title ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src="https://blog.ec-maker.com/logos/1333x500_yoko_tomei.png" alt="EC Maker Logo" tw="absolute bottom-15 right-25  h-[200px]" />
        ) : (
          <div tw="h-2 w-60 rounded-full bg-slate-800" />
        )}
      </div>
    ),
    {
      width: 1200,
      height: 630,
      emoji: 'fluentFlat',
      fonts: [
        {
          name: 'Baloo',
          data: fontBalooData,
          style: 'normal',
        },
      ],
    },
  );
}
