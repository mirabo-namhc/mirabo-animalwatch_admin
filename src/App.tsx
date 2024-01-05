import { Provider } from 'react-redux';
import AppRoutes from './routes';
import { store } from './store';
import { BrowserRouter as Router } from 'react-router-dom';
import AntdProvider from './_lib/antd/AntdProvider';

import './styles/index.scss';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AntdProvider >
          <AppRoutes />
        </AntdProvider>
      </Router>
    </Provider>
  );
}

export default App;
