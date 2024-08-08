import React from "react";
import LoginForm from "../../components/auth/Login/LoginForm";
import css from "./LoginPage.module.css";
import MainImage from "../../components/MainImage/MainImage";

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
