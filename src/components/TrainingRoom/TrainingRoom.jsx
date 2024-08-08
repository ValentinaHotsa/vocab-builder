import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";
import { selectTasks } from "../../redux/word/selectors";
import { addAnswers } from "../../redux/word/operations";
import Modal from "../Modal/Modal";
import DoneModal from "../DoneModal/DoneModal";
import ProgressBar from "../ProgressBar/ProgressBar";
import svg from "../../assets/icon.svg";
import css from "./TrainingRoom.module.css";
import style from "../ProgressBar/ProgressBar.module.css";

const TrainingRoom = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tasks = useSelector(selectTasks);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [error, setError] = useState("");
  const currentTask = tasks[currentTaskIndex];
  const isLastTask = currentTaskIndex === tasks.length - 1;

  const closeModal = () => {
    setModalOpen(false);
  };

  const validateInput = (input) => {
    const enPattern = /^[A-Za-z]+$/;
    const uaPattern = /^[А-ЯІЄЇҐа-яієїґ]+$/;

    if (currentTask.task === "en" && !enPattern.test(input)) {
      return "Please enter valid English words.";
    }
    if (currentTask.task === "ua" && !uaPattern.test(input)) {
      return "Будь ласка, введіть слово українською.";
    }
    return "";
  };

  const handleChange = (e) => {
    const input = e.target.value;
    setCurrentAnswer(input);
    const validationError = validateInput(input);
    if (input.trim() !== "") {
      setError(validationError);
    } else {
      setError("");
    }
  };

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
    setError("");
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
    if (newAnswers.length > 0 && !error) {
      dispatch(addAnswers(newAnswers))
        .unwrap()
        .then(() => {
          toast.success("Your answers have been saved!");
          setCurrentTaskIndex(0);
          setCurrentAnswer("");
          setAnswers([]);
          setModalOpen(true);
        })
        .catch((error) => {
          toast.error(
            error.message || "An error occurred while saving your answers."
          );
        });
    } else {
      toast.info("No answers to save or there is an error.");
    }
  };

  const handleCancel = () => {
    setAnswers([]);
    setCurrentAnswer("");
    navigate("/dictionary");
  };

  const progress = Math.round((answers.length / tasks.length) * 100);

  return (
    <div>
      <div className={css.wrapProgress}>
        <ProgressBar
          progress={progress}
          pageType="training"
          classWrap={style.progressWrapTrain}
          classBox={style.boxTrain}
          count={answers.length}
        />
      </div>
      {currentTask && (
        <div className={css.inputContainer}>
          <div className={css.answerContainer}>
            <input
              className={css.inputAnswer}
              type="text"
              id="answer"
              value={currentAnswer}
              onChange={handleChange}
              placeholder={
                currentTask.task === "en"
                  ? "Enter translate"
                  : "Введіть переклад"
              }
            />
            {error && <p className={css.error}>{error}</p>}
            {!isLastTask && (
              <button
                disabled={!!error}
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
      {modalOpen && (
        <Modal onClose={closeModal}>
          <DoneModal />
        </Modal>
      )}
    </div>
  );
};

export default TrainingRoom;
