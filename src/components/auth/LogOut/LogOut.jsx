import { useDispatch } from "react-redux";
import { signoutThunk } from "../../../redux/auth/operation";
import svg from "../../../assets/icon.svg";
import css from "./LogOut.module.css";

const LogOut = () => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(signoutThunk());
  };
  return <button onClick={handleClick}>Log out</button>;
};

export default LogOut;
