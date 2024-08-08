import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { refreshUserThunk } from "./redux/auth/operation";
import { RestrictedRoute } from "./routes/RestrictedRoute";
import PrivateRoute from "./routes/PrivateRoute";
import Loader from "./components/Loader/Loader";

const Login = lazy(() => import("./pages/LoginPage/LoginPage"));
const Register = lazy(() => import("./pages/RegisterPage/RegisterPage"));
const NotFound = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));
const Recommend = lazy(() => import("./pages/RecommendPage/RecommendPage"));
const Dictionary = lazy(() => import("./pages/DictionaryPage/DictionaryPage"));
const Training = lazy(() => import("./pages/TrainingPage/TrainingPage"));
const SharedLayout = lazy(() =>
  import("./components/SharedLayout/SharedLayout")
);

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUserThunk());
  }, [dispatch]);

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Navigate to="login" />} />
          <Route
            path="register"
            element={
              <RestrictedRoute
                redirectTo="/dictionary"
                component={<Register />}
              />
            }
          />
          <Route
            path="login"
            element={
              <RestrictedRoute redirectTo="/dictionary" component={<Login />} />
            }
          />

          <Route
            path="training"
            element={
              <PrivateRoute redirectTo="/register" component={<Training />} />
            }
          />
          <Route
            path="dictionary"
            element={
              <PrivateRoute redirectTo="/register" component={<Dictionary />} />
            }
          />
          <Route
            path="recommend"
            element={
              <PrivateRoute redirectTo="/register" component={<Recommend />} />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
