import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './AppLayout'
import Body from './Body'
import SignUp from './SignUp'
import LogIn from './LogIn'
import { Provider } from 'react-redux'
import store from '../utils/store'

const MainApp = () => {
    const appRouter = createBrowserRouter([
        {
            path : '/',
            element : <AppLayout/>,
            children : [
                {
                    path : "/",
                    element : <Body/>
                },
                {
                  path : "/signup",
                  element : <SignUp/>
                },
                {
                  path : "/login",
                  element : <LogIn/>
                }
            ]
        }
    ])
  return (
    <div>
      <Provider store={store}>
      <RouterProvider router={appRouter} />
      </Provider>
    </div>
  )
}

export default MainApp
