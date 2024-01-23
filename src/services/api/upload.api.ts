import request from '~/_lib/axios';

const headers = {
    'Content-Type': 'multipart/form-data',
};

const uploadAPI = {
    image(file: FormData) {
        const url = '/upload/image'
        return request.post(url, file, { headers });
    },
};

export default uploadAPI;
