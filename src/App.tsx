import { useQuery } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AuthLayout from "./layouts/AuthLayout";
import AppLayout from "./layouts/AppLayout";
import "./App.css"
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import SalePage from "./pages/SalePage";
import { fetchUser } from "./util/queries";


const App: React.FC = () => {

  const { isLoading, isError, data: user, error } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });

  const isAdmin = user?.role === "admin" || user?.role === "super user";
  console.log(isAdmin)

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
