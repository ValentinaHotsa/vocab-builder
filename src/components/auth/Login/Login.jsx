import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./Login.module.css";
import { useState } from "react";
import svg from "../../../assets/icon.svg";
import { Link } from "react-router-dom";
import { signinThunk } from "../../../redux/auth/operation.js";
import { useDispatch } from "react-redux";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, "Invalid email format"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-zA-Z]{6})(?=.*\d)[a-zA-Z\d]{7}$/,
      "Password must contain  six English letters and one number"
    ),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const { email, password } = values;
    try {
      await dispatch(signinThunk({ email, password }));
      resetForm();
    } catch (error) {
      console.error("Login error: ", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={css.containerForm}>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
        validateOnChange
        validateOnBlur
      >
        <Form className={css.loginForm}>
          <div className={css.containerInput}>
            <label className={css.hiddenLabel} htmlFor="email">
              Enter your email
            </label>
            <Field
              className={css.input}
              name="email"
              id="email"
              type="email"
              placeholder="Email"
            />
            <ErrorMessage
              className={css.errorMessage}
              name="email"
              component="div"
            />
          </div>
          <div className={css.containerInput}>
            <label className={css.hiddenLabel} htmlFor="password">
              Enter your password
            </label>
            <Field
              className={css.input}
              name="password"
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
            />
            <svg onClick={togglePassword} className={css.iconEye}>
              <use
                href={showPassword ? `${svg}#icon-eye` : `${svg}#icon-eye-off`}
              ></use>
            </svg>
            <ErrorMessage
              className={css.errorMessage}
              name="password"
              component="div"
            />
          </div>

          <button className={css.btnSubmit} type="submit">
            Login
          </button>
        </Form>
      </Formik>
      <Link className={css.link} to="/register">
        Register
      </Link>
    </div>
  );
};

export default Login;
