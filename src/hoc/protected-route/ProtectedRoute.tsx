import { Navigate, Outlet } from "react-router-dom";
import type { UserDetail } from "../../models/user-detail.model";

type ProtectedRouteProps = {
  user: UserDetail | null;
  redirectPath?: string;
  children?: React.ReactNode;
};

const ProtectedRoute = ({
  user,
  redirectPath = "/",
  children,
}: ProtectedRouteProps) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};
export default ProtectedRoute;