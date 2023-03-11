import { Navigate } from "react-router-dom";

interface ProtectRoutesProps {
  children?: React.ReactNode;
}

const ProtectRoutes = ({ children }: ProtectRoutesProps) => {
  if (!localStorage.getItem("userId")) {
    return <Navigate to="/warning" replace />;
  }
  return <>{children}</>;
};

export default ProtectRoutes;
