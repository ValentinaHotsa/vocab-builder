import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";

const Navigation = () => {
  return (
    <div className={css.navWrap}>
      <NavLink className={css.navLink} to="/training">
        Training
      </NavLink>
      <NavLink className={css.navLink} to="/dictionary">
        Dictionary
      </NavLink>
      <NavLink className={css.navLink} to="/recommend">
        Recommend
      </NavLink>
    </div>
  );
};

export default Navigation;
