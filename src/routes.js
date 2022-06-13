import { Navigate, useRoutes } from "react-router-dom"
import Home from './pages/HomePage'
import RegisterLayout from './pages/RegisterLayout'
import PersonalDetails from './pages/PersonalDetails'
import CarDetails from './pages/CarDetails'
import RegisterSuccess from './pages/RegisterSuccess'

const Router = () => {

  const contents = useRoutes([
    {
      path: '/',
      element: <Navigate to="/home" replace={true} />,
    },
    {
      path: 'home',
      element: <Home />,
    },
    {
      path: 'register',
      element: <RegisterLayout />,
      children: [
        { path: '', element: <Navigate to='personal' replace={true} /> },
        { path: 'personal', element: <PersonalDetails /> },
        { path: 'car', element: <CarDetails /> },
        { path: 'success', element: <RegisterSuccess /> }
      ]
    }
  ])

  return contents
}



export default Router