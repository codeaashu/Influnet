import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react"; // Optional: Replace with your spinner icon
import Logo from "@/components/ui/logo/logo";

type PrivateRouteProps = {
  children?: React.ReactNode;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user, userLoading } = useAuth();
  const location = useLocation();

  if (userLoading) {
    return (
      <div className="flex items-center justify-center gap-3 min-h-screen bg-white dark:bg-black">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
        {/* <Logo /> */}
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default PrivateRoute;
