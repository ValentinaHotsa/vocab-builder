import css from "./BurgerMenu.module.css";
import svg from "../../assets/icon.svg";
import { useState } from "react";
import Modal from "../Modal/Modal";
import Navigation from "../Navigation/Navigation";
import LogOut from "../auth/LogOut/LogOut";

const BurgerMenu = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = () => {
    setModalOpen(false);
  };
  const handleClick = () => {
    setModalOpen(true);
  };
  return (
    <>
      <button className={css.button} type="button" onClick={handleClick}>
        <svg className={css.iconBurger}>
          <use href={`${svg}#icon-burger`} />
        </svg>
      </button>

      {modalOpen && (
        <Modal onClose={closeModal}>
          <Navigation />
          <LogOut />
        </Modal>
      )}
    </>
  );
};

export default BurgerMenu;
