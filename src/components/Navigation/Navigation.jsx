import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";

const Navigation = () => {
  return (
    <nav className={css.navWrap}>
      <NavLink
        className={({ isActive }) =>
          isActive ? `${css.navLink} ${css.active}` : css.navLink
        }
        to="/dictionary"
      >
        Dictionary
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? `${css.navLink} ${css.active}` : css.navLink
        }
        to="/recommend"
      >
        Recommend
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? `${css.navLink} ${css.active}` : css.navLink
        }
        to="/training"
      >
        Training
      </NavLink>
    </nav>
  );
};

export default Navigation;
