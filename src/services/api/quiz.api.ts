import request from '~/_lib/axios';
import { IQuiz, TFilterParams } from '~types';

const quizAPI = {
  getAll(params: TFilterParams<IQuiz>) {
    const url = '/quiz';
    return request.get(url, { params });
  },
  create(params: IQuiz) {
    const url = '/quiz';
    return request.post(url, params);
  },
  edit(params: IQuiz) {
    const url = `/quiz/${params?.id}`;
    return request.put(url, params);
  },
  getDetail(id: IQuiz['id']) {
    const url = `/quiz/${id}`;
    return request.get(url);
  },
  remove(id: IQuiz['id']) {
    const url = `/quiz/${id}`;
    return request.delete(url);
  },
};

export default quizAPI;
