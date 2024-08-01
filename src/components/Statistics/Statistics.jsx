import { useDispatch, useSelector } from "react-redux";
import css from "./Statistics.module.css";
import { useEffect } from "react";
import { getStatistics } from "../../redux/word/operations";
import { selectStatistics } from "../../redux/word/selectors";

const Statistics = () => {
  const statistics = useSelector(selectStatistics);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStatistics());
  }, [dispatch]);
  return (
    <div className={css.wrap}>
      <p className={css.title}>To study:</p>
      <span className={css.count}>{statistics}</span>
    </div>
  );
};

export default Statistics;
