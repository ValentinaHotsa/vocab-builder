import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTasks } from "../../redux/word/operations";
import { selectTasks } from "../../redux/word/selectors";
import TrainingRoom from "../../components/TrainingRoom/TrainingRoom";
import NoTasks from "../../components/NoTasks/NoTasks";

const TrainingPage = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  return <>{tasks.length === 0 ? <NoTasks /> : <TrainingRoom />}</>;
};

export default TrainingPage;
