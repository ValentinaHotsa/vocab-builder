import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./pages/PrivateRoute";

const Main = lazy(() => import("./pages/MainPage"));
const Login = lazy(() => import("./pages/LoginPage"));
const Register = lazy(() => import("./pages/RegisterPage"));
const NotFound = lazy(() => import("./pages/NotFoundPage"));
const Recommend = lazy(() => import("./pages/RecommendPage"));
const Dictionary = lazy(() => import("./pages/DictionaryPage"));
const Training = lazy(() => import("./pages/TrainingPage"));
const SharedLayout = lazy(() =>
  import("./components/SharedLayout/SharedLayout")
);

const App = () => {
  return (
    <Suspense fallback={<h3>Loading...</h3>}>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>

        <Route
          path="/"
          element={
            <PrivateRoute>
              <SharedLayout />
            </PrivateRoute>
          }
        >
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Main />
              </PrivateRoute>
            }
          >
            <Route
              path="training"
              element={
                <PrivateRoute>
                  <Training />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="dictionary"
              element={
                <PrivateRoute>
                  <Dictionary />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="recommend"
              element={
                <PrivateRoute>
                  <Recommend />
                </PrivateRoute>
              }
            ></Route>
          </Route>
        </Route>

        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </Suspense>
  );
};

export default App;
