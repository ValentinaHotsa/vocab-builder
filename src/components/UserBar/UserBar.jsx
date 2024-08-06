import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import css from "./UserBar.module.css";
import svg from "../../assets/icon.svg";

const UserBar = ({ styleName, styleIcon }) => {
  const userName = useSelector(selectUser);

  return (
    <div className={css.userContainer}>
      <span className={styleName}>{userName}</span>
      <div className={styleIcon}>
        <svg>
          <use href={`${svg}#icon-user`} />
        </svg>
      </div>
    </div>
  );
};

export default UserBar;
