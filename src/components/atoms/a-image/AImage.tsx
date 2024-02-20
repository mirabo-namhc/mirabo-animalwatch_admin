import { Image } from 'antd';
import React from 'react';

interface IAImage {
  src?: string;
}

export default function AImage({ src }: IAImage) {
  return <Image src={src} alt="a-image" />;
}
