import ScrollToTop from "@/components/scrolling/scroll-to-top";
import AuthProvider from "@/providers/auth-provider";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <>
      <ScrollToTop />
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    </>
  );
}

export default MainLayout;
