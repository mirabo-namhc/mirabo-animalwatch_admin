import { LazyExoticComponent, Suspense } from 'react';
import { ComponentType } from 'react';
import OLoadingView from '~organisms/o-loading-view';

interface LoadableInterface<Props> {
  (Component: LazyExoticComponent<ComponentType<Props>>): React.FC<Props>;
}

const Loadable: LoadableInterface<any> = (Component) => (props) => (
  <Suspense fallback={<OLoadingView />}>
    <Component {...props} />
  </Suspense>
);

export default Loadable;
