import { createBrowserRouter, RouterProvider } from 'react-router';
import RootLayout from './components/RootLayout';
import Register from './components/Register';
import Home from './components/Home';
import Login from "./components/Login";
import { useEffect } from 'react';
import { useAuth } from './store/authStore';
import Articles from './components/Articles';

function App() {

  const routerObj = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: 'register',
          element: <Register />
        },
        {
          path: "login",
          element: <Login />
        },
        {
          path: 'articles',
          element: <Articles />
        }
      ]
    }
  ])

  return (
    <RouterProvider router={routerObj} />
  )
}
export default App;