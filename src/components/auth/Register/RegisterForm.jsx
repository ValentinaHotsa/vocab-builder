import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { signupThunk } from "../../../redux/auth/operation.js";
import svg from "../../../assets/icon.svg";
import css from "./RegisterForm.module.css";

const registerSchema = Yup.object().shape({
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

const RegisterForm = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = (data) => {
    dispatch(signupThunk(data));
  };

  return (
    <div className={css.containerForm}>
      <h4 className={css.titleForm}>Register</h4>
      <p className={css.subtitle}>
        To start using our services, please fill out the registration form
        below. All fields are mandatory:
      </p>
      <form className={css.registerForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={css.containerInput}>
          <label className={css.hiddenLabel} htmlFor="name">
            Enter your name
          </label>
          <input
            className={`${css.input} ${
              errors.name ? css.error : dirtyFields.name ? css.valid : ""
            }`}
            id="name"
            {...register("name")}
            type="text"
            placeholder="Name"
          />
          {(dirtyFields.name || errors.name) && (
            <div className={css.validationContainer}>
              <svg className={css.iconInput}>
                <use
                  href={`${svg}#${errors.name ? "icon-error" : "icon-success"}`}
                />
              </svg>
              <span
                className={errors.name ? css.errorMessage : css.successMessage}
              >
                {errors.name?.message || "Success name"}
              </span>
            </div>
          )}
        </div>

        <div className={css.containerInput}>
          <label className={css.hiddenLabel} htmlFor="email">
            Enter your email
          </label>
          <input
            className={`${css.input} ${
              errors.email ? css.error : dirtyFields.email ? css.valid : ""
            }`}
            {...register("email")}
            id="email"
            type="email"
            placeholder="Email"
          />
          {(dirtyFields.email || errors.email) && (
            <div className={css.validationContainer}>
              <svg className={css.iconInput}>
                <use
                  href={`${svg}#${
                    errors.email ? "icon-error" : "icon-success"
                  }`}
                />
              </svg>
              <span
                className={errors.email ? css.errorMessage : css.successMessage}
              >
                {errors.email?.message || "Success email"}
              </span>
            </div>
          )}
        </div>
        <div className={css.containerInput}>
          <label className={css.hiddenLabel} htmlFor="password">
            Create password
          </label>
          <input
            className={`${css.input} ${
              errors.password
                ? css.error
                : dirtyFields.password
                ? css.valid
                : ""
            }`}
            {...register("password")}
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
          />
          <svg onClick={togglePassword} className={css.iconEye}>
            <use
              href={showPassword ? `${svg}#icon-eye` : `${svg}#icon-eye-off`}
            ></use>
          </svg>
          {(dirtyFields.password || errors.password) && (
            <div className={css.validationContainer}>
              <svg className={css.iconInput}>
                <use
                  href={`${svg}#${
                    errors.password ? "icon-error" : "icon-success"
                  }`}
                />
              </svg>
              <span
                className={
                  errors.password ? css.errorMessage : css.successMessage
                }
              >
                {errors.password?.message || "Success password"}
              </span>
            </div>
          )}
        </div>

        <button className={css.btnSubmit} type="submit">
          Register
        </button>
      </form>

      <div className={css.linkContainer}>
        <Link className={css.link} to="/login">
          Login
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
