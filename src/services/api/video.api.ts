import request from '~/_lib/axios';

const videoAPI = {
    syncVideo() {
        const url = '/sync-video'
        return request.get(url);
    },
};

export default videoAPI;
