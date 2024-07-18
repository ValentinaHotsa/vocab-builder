import css from "./Header.module.css";
import svg from "../../assets/icon.svg";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import Navigation from "../Navigation/Navigation";
import UserBar from "../UserBar/UserBar";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import LogOut from "../auth/LogOut/LogOut";
import { useEffect, useState } from "react";

const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isMinimumMobile, setIsMininmumMobile] = useState(
    window.innerWidth <= 375
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767.9);
      setIsMininmumMobile(window.innerWidth <= 374.9);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={css.headerContent}>
      <div className={css.logoContainer}>
        <svg className={css.logoIcon}>
          <use href={`${svg}#icon-logo`} />
        </svg>
        <span className={css.logoText}>VocabBuilder</span>
      </div>
      {isLoggedIn && (
        <>
          <div
            className={`${css.navUserContainer} ${isMobile ? css.hidden : ""}`}
          >
            <Navigation />
          </div>
          <div
            className={`${css.navUserContainer} ${
              isMinimumMobile ? css.hidden : ""
            }`}
          >
            <UserBar />
          </div>
          <div
            className={`${css.navUserContainer} ${isMobile ? css.hidden : ""}`}
          >
            <LogOut />
          </div>
        </>
      )}
      {isLoggedIn && (
        <div
          className={`${css.navUserContainer} ${!isMobile ? css.hidden : ""}`}
        >
          <BurgerMenu />
        </div>
      )}
    </div>
  );
};

export default Header;
