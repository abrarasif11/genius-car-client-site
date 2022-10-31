import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Main from './Layout/Main';
import Home from './Page/Home/Home/Home';
import Login from './Page/Login/Login';
import SignUp from './Page/SignUp/SignUp';

function App() {
  const router = createBrowserRouter([
   {
    path: '/',
    element : <Main></Main>,
    children : [
      {
        path: '/',
        element : <Home></Home>
      },
      {
        path: '/login',
        element : <Login></Login>
      },
      {
        path : '/signup',
        element: <SignUp></SignUp>
      }
    ]
   }
  ])
  return (
    <div className='max-w-screen-xl mx-auto'>
    <RouterProvider router={router}></RouterProvider> 
    </div>
  );
}

export default App;
