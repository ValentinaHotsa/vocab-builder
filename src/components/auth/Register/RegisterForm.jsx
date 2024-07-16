import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import css from "./RegisterForm.module.css";
import { useState } from "react";
import svg from "../../../assets/icon.svg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signinThunk, signupThunk } from "../../../redux/auth/operation.js";

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
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      <form className={css.registerForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={css.containerInput}>
          <label className={css.hiddenLabel} htmlFor="name">
            Enter your name
          </label>
          <input
            className={`${css.input} ${
              dirtyFields.name ? (errors.name ? css.error : css.valid) : ""
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
              <span className={css.validationMessage}>
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
              dirtyFields.name ? (errors.name ? css.error : css.valid) : ""
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
              <span className={css.validationMessage}>
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
              dirtyFields.name ? (errors.name ? css.error : css.valid) : ""
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
              <span className={css.validationMessage}>
                {errors.password?.message || "Success password"}
              </span>
            </div>
          )}
        </div>

        <button className={css.btnSubmit} type="submit">
          Register
        </button>
      </form>

      <Link className={css.link} to="/login">
        Login
      </Link>
    </div>
  );
};

export default RegisterForm;
