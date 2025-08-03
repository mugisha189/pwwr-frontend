import React from 'react';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

export default function Image({ src, alt, width, height, className, ...props }: ImageProps) {
  return <img src={src} alt={alt} width={width} height={height} className={className} {...props} />;
}
