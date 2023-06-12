import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AuthLayout from "./layouts/AuthLayout";
import AppLayout from "./layouts/AppLayout";
import "./App.css"
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import SalePage from "./pages/SalePage";
import { getCurrentUser, store, useFetchUserQuery } from "../store";
import StockPage from "./pages/StockPage";

const App: React.FC = () => {
  const { isLoading } = useFetchUserQuery();
  const user = getCurrentUser(store.getState());

  const isAdmin = user?.role === "admin" || user?.role === "super user";

  const relevantLanding = user && isAdmin ? (<LandingPage />) : (<Navigate replace to={`/user/${user?._id}/sales`} />);

  if (!isLoading) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={Object.keys(user).length === 0  ? (
              <Navigate replace to='/auth' />
            ) : (
                relevantLanding
            )} />
            <Route path='/stock' element={<StockPage />} />
            <Route path='/user/:userId/sales' element={<SalePage />} />
          </Route>
          <Route path='/auth' element={<AuthLayout />}>
            <Route index element={Object.keys(user).length > 0 ? (
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

export default App;
