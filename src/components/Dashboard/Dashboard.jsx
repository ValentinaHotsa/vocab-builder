import { Link } from "react-router-dom";
import AddWord from "../AddWord/AddWord";
import Filters from "../Filters/Filters";
import Statistics from "../Statistics/Statistics";
import WordsTable from "../WordsTable/WordsTable";
import css from "./Dashboard.module.css";

const Dashboard = ({ onFilterChange }) => {
  return (
    <div>
      <Filters onFilterChange={onFilterChange} />
      <Statistics />
      <AddWord />
      <Link to="/training">Train oneself</Link>
    </div>
  );
};

export default Dashboard;
