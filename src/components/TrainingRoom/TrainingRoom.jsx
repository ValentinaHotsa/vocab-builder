import { useDispatch, useSelector } from "react-redux";
import { selectTasks } from "../../redux/word/selectors";
import { useEffect, useState } from "react";
import { addAnswers, getTasks } from "../../redux/word/operations";
import css from "./TrainingRoom.module.css";

const TrainingRoom = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);

  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const currentTask = tasks[currentTaskIndex];
  const isLastTask = currentTaskIndex === tasks.length - 1;

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);
  console.log(currentTask);

  const handleNext = () => {
    if (currentAnswer.trim()) {
      handleSave(currentTask, currentAnswer);
    }
    setCurrentAnswer("");
    if (currentTaskIndex < tasks.length - 1) {
      setCurrentTaskIndex(currentTaskIndex + 1);
    }
  };

  const handleSave = (currentTask, value) => {
    const key = currentTask.task;
    const newValue = {
      ...currentTask,
      [key]: value,
    };
    const newResults = [...answers, newValue];
    setAnswers(newResults);
  };

  const fetchAnswers = () => {
    const newResults = handleSave(currentTask, currentAnswer);

    dispatch(addAnswers(newResults));
  };

  return (
    <>
      {currentTask && (
        <>
          <div>
            <h3>Translate the word:</h3>
            <p>{currentTask.task === "en" ? currentTask.ua : currentTask.en}</p>
          </div>

          <div>
            <input
              type="text"
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              placeholder={
                currentTask.task === "en"
                  ? "Enter translate"
                  : "Введіть переклад"
              }
            />
          </div>
          <div>
            {!isLastTask && (
              <button type="button" onClick={handleNext}>
                Next
              </button>
            )}
            <button type="submit" onClick={fetchAnswers}>
              Save
            </button>
          </div>
        </>
      )}

      <div>{tasks.length}</div>
    </>
  );
};

export default TrainingRoom;
