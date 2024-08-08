import svg from "../../assets/icon.svg";
import css from "./Loader.module.css";

const Loader = () => {
  return (
    <>
      <svg className={css.icon}>
        <use href={`${svg}#icon-logo`} />
      </svg>
    </>
  );
};

export default Loader;
