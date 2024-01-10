import { useLocation, useParams } from 'react-router-dom';

function useURLInfo() {
    const location = useLocation();
    const params = useParams();

    const id = params?.id
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
