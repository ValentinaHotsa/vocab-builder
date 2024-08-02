import { useDispatch, useSelector } from "react-redux";
import { selectTasks } from "../../redux/word/selectors";
import { useEffect, useState } from "react";
import { addAnswers, getTasks } from "../../redux/word/operations";
import css from "./TrainingRoom.module.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import svg from "../../assets/icon.svg";
const TrainingRoom = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tasks = useSelector(selectTasks);

  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const currentTask = tasks[currentTaskIndex];
  const isLastTask = currentTaskIndex === tasks.length - 1;

  const handleNext = () => {
    if (currentAnswer.trim()) {
      const newAnswer = {
        _id: currentTask._id,
        en: currentTask.en,
        ua: currentTask.ua,
        task: currentTask.task,
        [currentTask.task]: currentAnswer,
      };
      setAnswers([...answers, newAnswer]);
    }
    setCurrentAnswer("");
    if (!isLastTask) {
      setCurrentTaskIndex(currentTaskIndex + 1);
    }
  };

  const handleSave = () => {
    let newAnswers = [...answers];

    if (currentAnswer.trim()) {
      newAnswers.push({
        _id: currentTask._id,
        en: currentTask.en,
        ua: currentTask.ua,
        task: currentTask.task,
        [currentTask.task]: currentAnswer,
      });
    }
    dispatch(addAnswers(newAnswers))
      .unwrap()
      .then(() => {
        toast.success("Your answers have been saved!");
        setCurrentTaskIndex(0);
        setCurrentAnswer("");
        setAnswers([]);
      })
      .catch((error) => {
        toast.error("Failed to save your answers. Please try again!");
      });
  };

  const handleCancel = () => {
    setAnswers([]);
    setCurrentAnswer("");
    navigate("/dictionary");
  };

  return (
    <div>
      {currentTask && (
        <div className={css.inputContainer}>
          <div className={css.answerContainer}>
            <input
              className={css.inputAnswer}
              type="text"
              id="answer"
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              placeholder={
                currentTask.task === "en"
                  ? "Enter translate"
                  : "Введіть переклад"
              }
            />
            {!isLastTask && (
              <button
                className={css.btnNext}
                type="button"
                onClick={handleNext}
              >
                Next
                <svg className={css.iconArrow}>
                  <use href={`${svg}#icon-arrow-right`} />
                </svg>
              </button>
            )}
            {currentTask.task === "en" ? (
              <div className={css.labelWrap}>
                <svg className={css.iconCountry}>
                  <use href={`${svg}#icon-en`} />
                </svg>
                <label className={css.label} htmlFor="answer">
                  English
                </label>
              </div>
            ) : (
              <div className={css.labelWrap}>
                <svg className={css.iconCountry}>
                  <use href={`${svg}#icon-ukraine`} />
                </svg>
                <label className={css.label} htmlFor="answer">
                  Ukrainian
                </label>
              </div>
            )}
          </div>
          <div className={css.taskContainer}>
            <p className={css.task}>
              {currentTask.task === "en" ? currentTask.ua : currentTask.en}
            </p>
            {currentTask.task === "ua" ? (
              <div className={css.labelWrap}>
                <svg className={css.iconCountry}>
                  <use href={`${svg}#icon-en`} />
                </svg>
                <span className={css.span}>English</span>
              </div>
            ) : (
              <div className={css.labelWrap}>
                <svg className={css.iconCountry}>
                  <use href={`${svg}#icon-ukraine`} />
                </svg>
                <span className={css.span}>Ukrainian</span>
              </div>
            )}
          </div>
        </div>
      )}

      <div className={css.btnsWrap}>
        <button className={css.btnSave} type="submit" onClick={handleSave}>
          Save
        </button>
        <button className={css.btnCancel} type="button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default TrainingRoom;
