import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import css from "./Modal.module.css";
// ==========додати іконку. перевірити роботу=============================
const Modal = ({ onClose, children }) => {
  const targetElement = document.getElementById("modal-root");
  const backdrop = useRef();

  const handleClickOutside = (event) => {
    if (event.target === backdrop.current) {
      onClose();
    }
    document.body.style.overflow = "";
    document.body.style.position = "";
    event.stopPropagation();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      document.body.style.overflow = "";
      document.body.style.position = "";
      onClose();
    }
  };

  useEffect(() => {
    const eventHandler = (e) => handleKeyDown(e);
    document.addEventListener("keydown", eventHandler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", eventHandler);
    };
  }, []);

  return ReactDOM.createPortal(
    <div className={css.modalDrop} onClick={handleClickOutside} ref={backdrop}>
      <div className={css.modalWrap}>
        <button className={css.btnClose} onClick={onClose}>
          <svg className={css.iconClose}>
            <use />
          </svg>
        </button>
        {children}
      </div>
    </div>,
    targetElement
  );
};

export default Modal;
