import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import React, { useEffect } from 'react';
import Main from './routes/main';
import Login from './routes/login';
import { retriveToken } from './state/functions';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  useEffect(()=>{
    retriveToken()
  },[])
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Main/>
      ),
    },
    {
      path: "/c/:chatId",
      element: (
        <Main/>
      ),
    },
    {
      path: "/join",
      element: (
        <Login/>
      ),
    },
  ]);
  return (<>
    <RouterProvider router={router} />
    <ToastContainer />

    </>
  );
}

export default App;
