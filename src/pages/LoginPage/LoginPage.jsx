import React from "react";
import LoginForm from "../../components/auth/Login/LoginForm";
import css from "./LoginPage.module.css";
import MainImage from "../../components/MainImage/MainImage";

const LoginPage = () => {
  return (
    <section className={css.sectionWrap}>
      <MainImage />
      <LoginForm />
    </section>
  );
};

export default LoginPage;
