import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectIsRefreshing } from "../redux/auth/selectors";

const PrivateRoute = ({ component: Component, redirectTo = "/register" }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);

  const shouldRedirect = !isLoggedIn && !isRefreshing;
  return shouldRedirect ? <Navigate to={redirectTo} replace /> : Component;
};

export default PrivateRoute;
//  */ ===========ПЕРЕВІРИТИ РОБОТУ, ВНЕСТИ ЗМІНИ ЯКЩО ТРЕБА==============**
