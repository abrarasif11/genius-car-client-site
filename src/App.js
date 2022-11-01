import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Main from './Layout/Main';
import CheckOut from './Page/CheckOut/CheckOut';
import Home from './Page/Home/Home/Home';
import Login from './Page/Login/Login';
import Orders from './Page/Orders/Orders';
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
      },
      {
        path : '/checkout/:_id',
        element : <CheckOut></CheckOut>,
        loader : ({params}) => fetch(`http://localhost:5000/services/${params._id}`)
      },
      {
        path : '/orders',
        element : <Orders></Orders>
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
