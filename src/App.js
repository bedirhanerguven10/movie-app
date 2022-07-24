import React from 'react';
import { ToastContainer } from 'react-toastify';
import AuthContextProvider from './context/AuthContext';
import AppRouter from './router/AppRouter';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";



const App = () => {
  return (
    <div>
      <AuthContextProvider>
        <AppRouter />
        <ToastContainer />
      </AuthContextProvider>
    </div>
  );
};

export default App;
