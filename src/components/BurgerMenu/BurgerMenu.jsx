import css from "./BurgerMenu.module.css";
import style from "../UserBar/UserBar.module.css";
import svg from "../../assets/icon.svg";
import { useState } from "react";
import Navigation from "../Navigation/Navigation";
import UserBar from "../UserBar/UserBar";
import LogOut from "../auth/LogOut/LogOut";
import img1x from "../../assets/images/illustration@1x.png";
import img2x from "../../assets/images/illustration@2x.png";

const BurgerMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleClick = () => {
    setMenuOpen(true);
  };

  return (
    <>
      <button className={css.button} type="button" onClick={handleClick}>
        <svg className={css.iconBurger}>
          <use href={`${svg}#icon-burger`} />
        </svg>
      </button>

      <div className={css.menuModal + (menuOpen ? " " + css.open : "")}>
        <UserBar styleIcon={style.iconWrapMenu} styleName={style.nameMenu} />
        <button className={css.btnClose} onClick={closeMenu}>
          <svg className={css.iconClose}>
            <use href={`${svg}#icon-close`} />
          </svg>
        </button>
        <div className={css.listWrap}>
          <Navigation />
          <LogOut />
        </div>
        <div className={css.imgThumb}>
          <img
            src={img1x}
            srcSet={`${img1x} 1x, ${img2x} 2x`}
            alt="young-couple-sitting-on-the-floor-and-reading-books"
          />
        </div>
      </div>
    </>
  );
};

export default BurgerMenu;
