import request from '~/_lib/axios';
import { IVideoPlayer, TFilterParams } from '~types';

const videoAPI = {
  syncVideo() {
    const url = '/sync-video';
    return request.get(url);
  },
  getAll(params: TFilterParams<IVideoPlayer>) {
    const url = '/video';
    return request.get(url, { params });
  },
};

export default videoAPI;
