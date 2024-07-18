import React from "react";
import RegisterForm from "../../components/auth/Register/RegisterForm";
import MainImage from "../../components/MainImage/MainImage";
import css from "./RegisterPage.module.css";

const RegisterPage = () => {
  return (
    <section className={css.sectionWrap}>
      <MainImage />
      <RegisterForm />
    </section>
  );
};

export default RegisterPage;
