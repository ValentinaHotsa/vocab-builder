import css from "./Statistics.module.css";

const Statistics = () => {
  return (
    <div className={css.wrap}>
      <p className={css.title}>To study:</p>
      <span className={css.count}>0</span>
    </div>
  );
};

export default Statistics;
