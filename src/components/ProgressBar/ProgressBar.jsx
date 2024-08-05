import { CircularProgress, Box } from "@mui/material";
import css from "./ProgressBar.module.css";

const ProgressBar = ({ progress, pageType, classWrap, classBox, count }) => {
  const isTable = pageType === "table";
  const size = isTable ? 24 : 44;

  return (
    <div className={classWrap}>
      {isTable ? (
        <span className={css.tablePrcent}>{progress}%</span>
      ) : (
        <span className={css.trainPrcent}>{count}</span>
      )}

      <Box className={classBox} sx={{ width: size, height: size }}>
        <svg width={0} height={0}>
          <defs>
            <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgb(255, 255, 255)" />
              <stop offset="100%" stopColor="#85AA9F" />
            </linearGradient>
          </defs>
        </svg>
        <CircularProgress
          variant="determinate"
          value={100}
          size={size}
          thickness={isTable ? 6 : 4}
          sx={{
            color: pageType === "table" ? "#D4F8D3" : "#FFFFFF",
          }}
        />
        <CircularProgress
          variant="determinate"
          value={progress}
          size={size}
          thickness={isTable ? 6 : 4}
          sx={{
            color: "transparent",
            position: "absolute",
            left: 0,
            top: 0,
            "svg circle": {
              stroke: pageType === "table" ? "#2BD627" : "url(#my_gradient)",
              strokeLinecap: "round",
            },
          }}
        />
      </Box>
    </div>
  );
};

export default ProgressBar;
