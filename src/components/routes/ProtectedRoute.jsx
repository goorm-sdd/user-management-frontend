import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = useAuthStore((state) => state.user);
  const location = useLocation();

  if (!user) {
    const isAdminRoute = location.pathname.startsWith("/admin");
    return <Navigate to={isAdminRoute ? "/admin-signin" : "/"} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/403" replace />;
  }

  return children;
};

export default ProtectedRoute;
