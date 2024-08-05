import css from "./UserBar.module.css";
import svg from "../../assets/icon.svg";
import LogOut from "../auth/LogOut/LogOut";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import BurgerMenu from "../BurgerMenu/BurgerMenu";

const UserBar = ({ styleName, styleIcon }) => {
  const userName = useSelector(selectUser);

  return (
    <div className={css.userContainer}>
      <span className={styleName}>{userName}</span>
      <div className={css.iconWrap}>
        <svg className={styleIcon}>
          <use href={`${svg}#icon-user`} />
        </svg>
      </div>
    </div>
  );
};

export default UserBar;
