type Props = {
  url: string;
  caption?: string;
};

export const YouTube = ({ url, caption }: Props) => {
  const YouTubeVideoId = url.match(
    /(?:\?v=|&v=|youtu\.be\/)(.*?)(?:\?|&|$)/,
  )?.[1];

  return (
    <div className="m-1.5 flex flex-col text-center justify-center items-center">
      <iframe
        width={560}
        height={315}
        src={`https://www.youtube.com/embed/${YouTubeVideoId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="w-full max-h-[400px] max-w-[550px]"
      ></iframe>
      {caption && (
        <figcaption className="text-xs text-gray-400 text-center">
          {caption}
        </figcaption>
      )}
    </div>
  );
};
