import { lazy, Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import { RestrictedRoute } from "./routes/RestrictedRoute";
import { refreshUserThunk } from "./redux/auth/operation";
import { useDispatch } from "react-redux";

const Main = lazy(() => import("./pages/MainPage/MainPage"));
const Login = lazy(() => import("./pages/LoginPage/LoginPage"));
const Register = lazy(() => import("./pages/RegisterPage/RegisterPage"));
const NotFound = lazy(() => import("./pages/NotFoundPage"));
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
    <Suspense fallback={<h3>Loading...</h3>}>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
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
