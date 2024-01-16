import { useLocation, useParams } from 'react-router-dom';

function useURLInfo() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const id = params.get('id');

    const isDetail = location?.pathname?.includes('/detail')
    const isCreate = location?.pathname?.includes('/create')
    const isEdit = location?.pathname?.includes('/edit')

    const isFormPage = isDetail || isEdit || isCreate

    return {
        pathname: location.pathname,
        id,
        isDetail,
        isCreate,
        isEdit,
        isFormPage,
        params,
    };
}

export default useURLInfo;
