import React from 'react';
import AButton from '~atoms/a-button';

export default function VideoPage() {
  return (
    <div className="h-full w-full dis-flex jc-center ai-center">
      <AButton className="w-350 h-100 mb-100" type="primary">
        <span className="fs-20">動画データを同期する</span>
      </AButton>
    </div>
  );
}
