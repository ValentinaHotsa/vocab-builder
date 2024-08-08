import LoginForm from "../../components/auth/Login/LoginForm";
import MainImage from "../../components/MainImage/MainImage";
import css from "./LoginPage.module.css";

const LoginPage = () => {
  return (
    <section className={css.sectionWrap}>
      <MainImage pageType="login" />
      <LoginForm />
      <div className={css.spot}></div>
    </section>
  );
};

export default LoginPage;
