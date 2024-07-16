import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import css from "./Login.module.css";
import { useState } from "react";
import svg from "../../../assets/icon.svg";
import { Link, useNavigate } from "react-router-dom";
import { signinThunk } from "../../../redux/auth/operation.js";
import { useDispatch } from "react-redux";

const loginSchema = Yup.object().shape({
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

const LoginForm = ({ onSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, emptyInput },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data) => {
    dispatch(signinThunk(data));
    onSuccess();
  };

  return (
    <div className={css.containerForm}>
      <form className={css.loginForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={css.containerInput}>
          <label className={css.hiddenLabel} htmlFor="email">
            Enter your email
          </label>
          <input
            className={
              emptyInput.name || errors.name
                ? errors.name
                  ? "error"
                  : "valid"
                : ""
            }
            {...register("email")}
            id="email"
            type="email"
            placeholder="Email"
          />
          {(emptyInput.email || errors.email) && (
            //============================================= ПЕРЕВІРИТИ РОБОТУ ПОМИЛКИ!!!!!==================================================
            <div error={errors.email !== undefined}>
              <svg className={css.iconInput}>
                <use
                  href={`${svg}#${errors ? "icon-error" : "icon-success"} `}
                />
              </svg>
              {errors.email?.message || "Success email"}
            </div>
          )}
        </div>
        <div className={css.containerInput}>
          <label className={css.hiddenLabel} htmlFor="password">
            Enter your password
          </label>
          <input
            className={
              emptyInput.name || errors.name
                ? errors.name
                  ? "error"
                  : "valid"
                : ""
            }
            id="password"
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
          />
          <svg onClick={togglePassword} className={css.iconEye}>
            <use
              href={showPassword ? `${svg}#icon-eye` : `${svg}#icon-eye-off`}
            ></use>
          </svg>
          {(emptyInput.password || errors.password) && (
            //============================================= ПЕРЕВІРИТИ РОБОТУ ПОМИЛКИ!!!!!==================================================
            <div error={errors.password !== undefined}>
              <svg className={css.iconInput}>
                <use
                  href={`${svg}#${errors ? "icon-error" : "icon-success"} `}
                />
              </svg>
              {errors.password?.message || "Success password"}
            </div>
          )}
        </div>

        <button className={css.btnSubmit} type="submit">
          Login
        </button>
      </form>

      <Link className={css.link} to="/register">
        Register
      </Link>
    </div>
  );
};

export default LoginForm;
