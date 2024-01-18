import request from '~/_lib/axios';
import { IBanner, TFilterParams } from '~types';

const bannerAPI = {
  getAll(params: TFilterParams<IBanner>) {
    const url = '/banner';
    return request.get(url, { params });
  },
  create(params: IBanner) {
    const url = '/banner';
    return request.post(url, params);
  },
  edit(params: IBanner) {
    const url = `/banner/${params?.id}`;
    return request.patch(url, params);
  },
  getDetail(id: IBanner['id']) {
    const url = `/banner/${id}`;
    return request.get(url);
  },
  remove(id: IBanner['id']) {
    const url = `/banner/${id}`;
    return request.delete(url);
  },
};

export default bannerAPI;
