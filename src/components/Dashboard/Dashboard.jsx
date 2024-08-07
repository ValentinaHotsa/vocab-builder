import { Link } from "react-router-dom";
import AddWord from "../AddWord/AddWord";
import Filters from "../Filters/Filters";
import Statistics from "../Statistics/Statistics";
import css from "./Dashboard.module.css";
import svg from "../..//assets/icon.svg";

const Dashboard = ({ onFilterChange, pageType }) => {
  return (
    <div className={css.dashboarContainer}>
      <Filters onFilterChange={onFilterChange} />

      <div className={css.infoContainer}>
        <Statistics />
        <div className={css.btnWrap}>
          {pageType === "dictionary" && <AddWord />}
          <Link to="/training" className={css.link}>
            Train oneself
            <svg className={css.icon}>
              <use href={`${svg}#icon-arrow-right`} />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
