import { Link, useNavigate } from "react-router-dom";
import css from "./NoTasks.module.css";
import img1x from "../../assets/images/report@1x.png";
import img2x from "../../assets/images/report@2x.png";

const NoTasks = () => {
  const navigate = useNavigate();

  return (
    <div className={css.container}>
      <div className={css.image}>
        <img src={img1x} srcSet={`${img1x} 1x, ${img2x} 2x`} alt="report" />
      </div>
      <div className={css.contentWrap}>
        <h3 className={css.title}>
          You don't have a single word to learn right now.{" "}
        </h3>
        <p className={css.text}>
          Please create or add a word to start the workout. We want to improve
          your vocabulary and develop your knowledge, so please share the words
          you are interested in adding to your study.
        </p>

        <div className={css.btnsWrap}>
          <Link className={css.linkAdd} to="/dictionary">
            Add word
          </Link>
          <button
            className={css.btnCancel}
            type="button"
            onClick={() => {
              navigate("/dictionary");
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoTasks;
