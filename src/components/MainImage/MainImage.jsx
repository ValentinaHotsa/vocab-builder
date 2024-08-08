import img1x from "../../assets/images/illustration@1x.png";
import img2x from "../../assets/images/illustration@2x.png";
import css from "./MainImage.module.css";

const MainImage = ({ pageType }) => {
  return (
    <div className={css.container}>
      <div className={css.imgThumb}>
        <img
          className={css.mainImg}
          src={img1x}
          srcSet={`${img1x} 1x, ${img2x} 2x`}
          alt="young-couple-sitting-on-the-floor-and-reading-books"
        />
      </div>
      <span
        className={`${css.subtitle} ${pageType === "login" ? css.show : ""}`}
      >
        Word · Translation · Grammar · Progress
      </span>
    </div>
  );
};

export default MainImage;
