import type { NextRequest } from 'next/server';

import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};
const fontBallo = fetch(
  // !U font #45
  new URL('../../../src/styles/Baloo-Regular.ttf', import.meta.url),
).then((res) => res.arrayBuffer());

export default async function handler(req: NextRequest) {
  try {
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
            <img
              src="https://blog.ec-maker.com/1333x500_yoko_tomei.png"
              alt="EC Maker Logo"
              tw="absolute bottom-15 right-25  h-[200px]"
            />
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
  } catch (error) {
    const imageData = await fetch(
      new URL('/public/ECmaker.png', import.meta.url),
    );
    const buffer = await imageData.arrayBuffer();

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            background: '#f6f6f6',
            width: '100%',
            height: '100%',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            // @ts-expect-error @vercel/ogの仕様都合
            src={buffer}
            width="256"
            height="256"
            alt="og image"
          />{' '}
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  }
}
