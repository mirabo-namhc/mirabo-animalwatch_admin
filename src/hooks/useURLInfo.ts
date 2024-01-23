import { useLocation, useParams } from 'react-router-dom';

function useURLInfo() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const id = params.get('id');

    const isCreate = location?.pathname?.includes('/create')
    const isEdit = location?.pathname?.includes('/edit')

    const isFormPage = isEdit || isCreate

    const pageName = `/${location.pathname.split('/')[1]}`

    return {
        pathname: location.pathname,
        pageName,
        id,
        isCreate,
        isEdit,
        isFormPage,
        params,
    };
}

export default useURLInfo;
