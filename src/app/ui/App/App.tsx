import { Header, Routing } from '@/common';
import s from './App.module.css';
import { ToastContainer } from 'react-toastify';

export const App = () => {
  return (
    <>
      <Header />
      <div className={s.layout}>
        <Routing />
      </div>
      <ToastContainer />
    </>
  );
};
