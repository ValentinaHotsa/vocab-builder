import { CircularProgress } from "@mui/material";
import css from "./ProgressBar.module.css";
const ProgressBar = ({ word }) => {
  return (
    <div>
      <span>{word.progress}%</span>
      <div className={css.box}>
        <CircularProgress
          variant="determinate"
          value={100}
          sx={{ color: "#D4F8D3" }}
        />
        <CircularProgress
          variant="determinate"
          value={word.progress}
          sx={{ color: "#2BD627", position: "absolute", left: 0 }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
