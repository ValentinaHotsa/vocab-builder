import css from "./BurgerMenu.module.css";
import svg from "../../assets/icon.svg";
import { useState } from "react";
import Modal from "../Modal/Modal";

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
      <button type="button" onClick={handleClick}>
        <svg>
          <use href={`${svg}#icon-burger`} />
        </svg>
      </button>

      {modalOpen && <Modal onClose={closeModal}></Modal>}
    </>
  );
};

export default BurgerMenu;
