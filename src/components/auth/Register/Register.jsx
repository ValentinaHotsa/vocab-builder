import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./Register.module.css";
import { useState } from "react";
import svg from "../../../assets/icon.svg";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signupThunk } from "../../../redux/auth/operation.js";

const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Too Short!")
    .max(15, "Too Long!"),
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

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const { name, email, password } = values;
    try {
      await dispatch(signupThunk({ name, email, password }));
      resetForm();
    } catch (error) {
      console.error("Registration error: ", error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className={css.containerForm}>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        validationSchema={RegisterSchema}
        onSubmit={handleSubmit}
        validateOnChange
        validateOnBlur
      >
        <Form className={css.registerForm}>
          <div className={css.containerInput}>
            <label className={css.hiddenLabel} htmlFor="name">
              Enter your name
            </label>
            <Field
              className={css.input}
              name="name"
              id="name"
              type="text"
              placeholder="Name"
            />
            <ErrorMessage
              className={css.errorMessage}
              name="name"
              component="div"
            />
          </div>
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
              Create password
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
            Register
          </button>
        </Form>
      </Formik>
      <Link className={css.link} to="/login">
        Login
      </Link>
    </div>
  );
};

export default Register;
