import css from "./DoneModal.module.css";
import img1x from "../../assets/images/open-book@1x.png";
import img2x from "../../assets/images/open-book@2x.png";
import { useSelector } from "react-redux";
import { selectAnswer } from "../../redux/word/selectors";

const DoneModal = () => {
  const results = useSelector(selectAnswer);

  const correctResults = results.filter((word) => word.isDone);
  const failResults = results.filter((word) => !word.isDone);

  return (
    <div className={css.container}>
      <h3 className={css.title}>Well done</h3>
      <div className={css.listsWrap}>
        <div className={css.correct}>
          <h4 className={css.subtitle}>Correct answers:</h4>
          <ul>
            {correctResults.map((res) => (
              <li key={res._id} className={css.result}>
                {res.en}
              </li>
            ))}
          </ul>
        </div>
        <div className={css.mistake}>
          <h4 className={css.subtitle}>Mistakes:</h4>
          <ul className={css.mistakeList}>
            {failResults.map((res) => (
              <li key={res._id} className={css.result}>
                {res.en}
              </li>
            ))}
          </ul>
          <div className={css.image}>
            <img
              src={img1x}
              srcSet={`${img1x} 1x, ${img2x} 2x`}
              alt="open-book"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoneModal;
