import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { App } from './app/ui/App/App';
import '@/index.css';
import { Provider } from 'react-redux';
import { store } from './app/ui/model/store';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
);
