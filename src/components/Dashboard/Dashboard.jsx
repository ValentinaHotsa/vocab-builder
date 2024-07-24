import { Link } from "react-router-dom";
import AddWord from "../AddWord/AddWord";
import Filters from "../Filters/Filters";
import Statistics from "../Statistics/Statistics";
import WordsTable from "../WordsTable/WordsTable";
import css from "./Dashboard.module.css";

const Dashboard = () => {
  return (
    <div>
      <Filters />
      <Statistics />
      <AddWord />
      <Link to="/training">Train oneself</Link>
      <WordsTable />
    </div>
  );
};

export default Dashboard;
