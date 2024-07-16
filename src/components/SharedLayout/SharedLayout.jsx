import React, { Suspense } from "react";
import { NavLink, Outlet } from "react-router-dom";

const SharedLayout = () => {
  return (
    <>
      <header>
        <NavLink to="/">Main</NavLink>

        <NavLink to="/training">Training</NavLink>
        <NavLink to="/dictionary">Dictionary</NavLink>
        <NavLink to="/recommend">Recommend</NavLink>
      </header>
      <main>
        <Suspense fallback={<h3>Loading....</h3>}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
};

export default SharedLayout;
