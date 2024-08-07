import svg from "../../assets/icon.svg";
import css from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={css.container}>
      <svg className={css.icon}>
        <use href={`${svg}#icon-logo`} />
      </svg>
    </div>
  );
};

export default Loader;
