import React from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectUser } from "../redux/auth/selectors";

const MainPage = () => {
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  if (!isLoggedIn) {
    return <div>Please log in.</div>;
  }
  return (
    <div>
      <div>
        <h1>Welcome, {user.name}!</h1>
        <p>Email: {user.email}</p>
      </div>
    </div>
  );
};

export default MainPage;
