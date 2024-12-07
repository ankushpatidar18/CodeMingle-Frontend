import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './AppLayout'
import Body from './Body'
import SignUp from './SignUp'
import LogIn from './LogIn'
import { Provider } from 'react-redux'
import store from '../utils/store'
import Profile from './Profile'
import Password from './Password'
import PrivateRoute from './PrivateRoute'
import Requests from './Requests'

const MainApp = () => {
  const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: [
            {
                path: "/",
                element: <Body />
            },
            {
                path: "/signup",
                element: <SignUp />
            },
            {
                path: "/login",
                element: <LogIn />
            },
            {
                path: "/profile",
                element: (
                    <PrivateRoute>
                        <Profile /> 
                    </PrivateRoute>
                )
            },
            {
                path: "/password",
                element: (
                    <PrivateRoute>
                        <Password />
                    </PrivateRoute>
                )
            },
            {
                path: "/requests",
                element: (
                    <PrivateRoute>
                        <Requests />
                    </PrivateRoute>
                )
            }
        ]
    }
]);
  return (
    <div>
      <Provider store={store}>
      <RouterProvider router={appRouter} />
      </Provider>
    </div>
  )
}

export default MainApp
