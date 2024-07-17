import React, { Suspense } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LogOut from "../auth/LogOut/LogOut";
import Navigation from "../Navigation/Navigation";
import Header from "../Header/Header";

const SharedLayout = () => {
  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        <Suspense fallback={<h3>Loading....</h3>}>
          <Outlet />
        </Suspense>
      </main>
      <ToastContainer position="top-right" reverseOrder={false} />
    </div>
  );
};

export default SharedLayout;
