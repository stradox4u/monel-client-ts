import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AuthLayout from "./layouts/AuthLayout";
import AppLayout from "./layouts/AppLayout";
import "./App.css"
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import SalePage from "./pages/SalePage";
import { useFetchUserQuery } from "../store";

const App: React.FC = () => {
  // eslint-disable-next-line prefer-const
  let { data: user, error, isLoading } = useFetchUserQuery();

  if (error) {
    user = undefined;
  }

  const isAdmin = user?.role === "admin" || user?.role === "super user";

  const relevantLanding = isAdmin ? (<LandingPage />) : (<Navigate replace to={`/user/${user?._id}/sales`} />);

  if (!isLoading) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={!user ? (
              <Navigate replace to='/auth' />
            ) : (
                relevantLanding
            )} />
            <Route path='/user/:userId/sales' element={<SalePage />} />
          </Route>
          <Route path='/auth' element={<AuthLayout />}>
            <Route index element={user ? (
              <Navigate replace to='/' />
            ) : (
              <LoginPage />
            )} />
          </Route>
        </Routes>
      </BrowserRouter>
    )
  }
  return (
    <div>Loading...</div>
  )
}

export default App
