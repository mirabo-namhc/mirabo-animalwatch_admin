import request from '~/_lib/axios';

const headers = {
    'Content-Type': 'multipart/form-data',
};

const uploadAPI = {
    image(params: FormData) {
        const url = '/upload/image'
        return request.post(url, params, { headers});
    },
};

export default uploadAPI;
