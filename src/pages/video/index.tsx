import React from 'react';
import { useAppDispatch, useAppSelector } from '~/_lib/redux/hooks';
import AButton from '~atoms/a-button';
import { videoActions } from '~store/video/videoSlice';

export default function VideoPage() {
  const { loading } = useAppSelector((state) => state.video);
  const dispatch = useAppDispatch();

  const handleSyncVideo = () => {
    dispatch(videoActions.syncVideo());
  };

  return (
    <div className="h-full w-full dis-flex jc-center ai-center">
      <AButton
        disabled={loading}
        onClick={handleSyncVideo}
        className="dis-flex ai-center jc-center w-350 h-100 mb-100"
        type="primary"
      >
        <span className="fs-20">動画データを同期する</span>
      </AButton>
    </div>
  );
}
