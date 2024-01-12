import request from '~/_lib/axios';
import { ICoupon, TFilterParams } from '~types';

const couponAPI = {
  getAll(params: TFilterParams<ICoupon>) {
    const url = '/coupon';
    return request.get(url, { params });
  },
  create(params: ICoupon) {
    const url = '/coupon';
    return request.post(url, params);
  },
  edit(params: ICoupon) {
    const url = `/coupon/${params?.id}`;
    return request.patch(url, params);
  },
  getDetail(id: ICoupon['id']) {
    const url = `/coupon/${id}`;
    return request.get(url);
  },
  remove(id: ICoupon['id']) {
    const url = `/coupon/${id}`;
    return request.delete(url);
  },
};

export default couponAPI;
