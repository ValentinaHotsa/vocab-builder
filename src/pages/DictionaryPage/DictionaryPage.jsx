import React from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/selectors";
import Dashboard from "../../components/Dashboard/Dashboard";

const DictionaryPage = () => {
  return (
    <div>
      <Dashboard />
    </div>
  );
};

export default DictionaryPage;
