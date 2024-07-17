import css from "./Header.module.css";
import svg from "../../assets/icon.svg";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import Navigation from "../Navigation/Navigation";
import UserBar from "../UserBar/UserBar";

const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <div>
      <div className={css.logoContainer}>
        <svg className={css.logoIcon}>
          <use href={`${svg}#icon-logo`} />
        </svg>
        <span className={css.logoText}>VocabBuilder</span>
      </div>
      {isLoggedIn && (
        <>
          <Navigation />
          <UserBar />
        </>
      )}
    </div>
  );
};

export default Header;
