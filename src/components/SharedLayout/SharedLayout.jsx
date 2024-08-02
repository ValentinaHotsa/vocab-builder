import React, { Suspense } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Header from "../Header/Header";
import css from "./SharedLayout.module.css";
const SharedLayout = () => {
  return (
    <>
      <header className={css.headerContainer}>
        <Header />
      </header>
      <div className={css.mainContainer}>
        <main>
          <Suspense fallback={<h3>Loading....</h3>}>
            <Outlet />
          </Suspense>
        </main>
      </div>
      <ToastContainer position="bottom-left" reverseOrder={false} />
    </>
  );
};

export default SharedLayout;
